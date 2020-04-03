(function ($) {
	var name = "facebook",
		$fbroot = $('#fb-root'),
		fbActive = false,
		checkLoginFun = null,
		authenticateFun = null,
		ready = false,
		appId;
	
	appId = $('meta[property="fb:app_id"]').attr('content');
	if (!$fbroot.length) {
		if (!appId) {
			throw {
				type: "Login.Facebook.MissingRoot",
				message: "Could not find root facebook element.",
				toString: function () { return this.type + ': ' + this.message }
			}
		} else {
			$fbroot = $("<div>").attr('id', 'fb-root').attr('data-app-id', appId).prependTo('body').hide();
		}
	} else {
		appId = appId || $fbroot.data('app-id');
	}
	
	if (!appId) {
		throw {
			type: "Login.Facebook.MissingApiKey",
			message: "FB Api Key not provided.",
			toString: function () { return this.type + ': ' + this.message }
		}
	}

	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_UK/all.js', function() {
		FB.init({
		  appId: appId
		});
		checkLoginFun = FB.getLoginStatus;
		authenticateFun = FB.login;
		FB.getLoginStatus(function (response) {
			//console.debug("LOGIN", new Date(), "Facebook is ready!");
			ready = true;
		});
	});
	
	function checkLogin(success, failure) {
		//console.debug("FACEBOOK", "checkLogin function");
		if (!checkLoginFun) {
			throw {
				type: "Login.Facebook.MissingCheckLoginFunction",
				message: "Can't find the function for checking login.",
				toString: function () { return this.type + ': ' + this.message }
			}
		}
		//console.log("About to check facebook");
		checkLoginFun(function (response) {
			//console.log("Checking login");
			if (response.status === 'connected') {
				//console.debug("FACEBOOK", "connected");
				success.call(this, response.authResponse);
			} else {
				failure.call(this, response);
			}
		});
	}

	function authenticate(success, failure) {
		if (!authenticateFun) {
			throw {
				type: "Login.Facebook.MissingAuthenticateFunction",
				message: "Can't find the function for authenticating.",
				toString: function () { return this.type + ': ' + this.message }
			}
		}
		authenticateFun(function (response) {
			//console.debug("FACEBOOK", "Authenticating!", this, arguments);
			var error = {};
			if (response.authResponse) {
				success.call(this, response.authResponse);
			} else {
				error.status = response.status;
				if (response.status === 'not_authorized') {
					error.message = "Because you clicked cancel, you cannot log in using Facebook.";
				} else {
					error.message = "The Facebook login process was not successful. Therefore, you were not able to log in using Facebook.";
				}
				failure.call(this, error);
			}
		}, { scope: "email" });
	}
	
	//console.log("About to add ", name, " to list of providers");	
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
