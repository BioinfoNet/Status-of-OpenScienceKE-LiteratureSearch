(function ($) {
	var name = "google",
		$fbroot = $('#fb-root'),
		fbActive = false,
		checkLoginFun = null,
		authenticateFun = null,
		ready = false,
		appId;

	var GoogleAuth;
	var SCOPE = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

	function windowScopedCallback(fun, name) {
		var callbackName = name, sfx;
		while (window[callbackName]) {
			sfx = callbackName.replace(/.+(?:_(\d+))?$/, "$1") || 0;
			sfx = parseInt(sfx, 10);
			callbackName = callbackName.replace(/(.+?)(?:_\d+)?$/, "$1") + '_' + sfx.toString();
		}
		window[callbackName] = fun;
		return callbackName;
	}
	
	appId = $('meta[property="google-signin-clientid"]').attr('content');

	if (!appId) {
		throw {
			type: "Login.Google.MissingApiKey",
			message: "Google Api Id not provided.",
			toString: function () { return this.type + ': ' + this.message }
		}
	}

	$.getScript('//apis.google.com/js/platform.js', function() {
		gapi.load('auth2', function () {
			gapi.auth2.init({ 
				client_id: appId,
				scope: SCOPE
			}).then(
				function (auth) {
					console.debug("Successful Google Auth init", auth);
					GoogleAuth = auth;
					ready = true;
				},
				function (error) {
					console.debug("Error initializing Google Auth", error);
					throw {
						type: "Login.Google.InitializationError",
						message: "Error on initialization: " + error,
						toString: function () { return this.type + ': ' + this.message }
					}
				}
			);
			checkLoginFun = function (callback) {
				gapi.auth.checkSessionState({ client_id: appId }, callback);
			};
			authenticateFun = function (callback) {
				return GoogleAuth.signIn().then(callback);
			};
			/*
			gapi.auth.checkSessionState({ client_id: appId }, function (authResponse) {
				ready = true;
			});
			*/
		});
	});
	
	function checkLogin(success, failure) {
		//console.debug("GOOGLE", "checkLogin function", this, arguments);
		if (!checkLoginFun) {
			throw {
				type: "Login.Google.MissingCheckLoginFunction",
				message: "Can't find the function for checking login.",
				toString: function () { return this.type + ': ' + this.message }
			}
		}
		//console.debug("GOOGLE", "About to call checkLoginFun", checkLoginFun, typeof checkLoginFun);
		checkLoginFun(function (response) {
			//console.debug("GOOGLE", "Got back from google", this, arguments);
			if (response.status === 'connected') {
				success.call(this, response.authResponse);
			} else {
				//console.log("Calling failure because of ", response, " within checkLogin");
				failure.call(this, response);
			}
		});
	}

	function authenticate(success, failure, tries) {
		//alert("Authenticating!")
		tries = tries || 0;
		if (!authenticateFun) {
			throw {
				type: "Login.Facebook.MissingAuthenticateFunction",
				message: "Can't find the function for authenticating.",
				toString: function () { return this.type + ': ' + this.message }
			}
		}
		authenticateFun(function (data) {
			var user, authResponse;
			//console.debug("GOOGLE", new Date(), "called back");
			var error = {}
			if (data.error && data.error.length) {
				error.status = data.error;
				if (data.error === "immediate_failed") {
					// immediate_failed always called on first load of Google OAuth
					// just request a second time
					// but if it's tried more than twice, give up
					if (tries < 2) {
						authenticate(success, failure, tries + 1);
						return false;
					}
				} else if (data.error === "access_denied") {
					error.message = "Because you did not accept Google login, you were not logged in.";
				} else {
					error.message = "Unknown error: " + data.error;
				}
				//console.debug("GOOGLE", new Date(), "calling failure", failure);
				failure.call(null, error);
			}
			//alert("It was successful. Data is \n" + JSON.stringify(data));
			user = data;
			console.debug("Returned from sign in with data", user);
			authResponse = user.getAuthResponse()
			console.log("Authorization Response", authResponse);
			success.call(null, authResponse);
		});
	}
	
	LOGIN.addProvider(
		name,
		{
			name: name,
			authenticate: authenticate,
			checkLogin: checkLogin,
			ready: function () { return ready; },
			toString: function () { return name; }
		}
	);
}(jQuery));