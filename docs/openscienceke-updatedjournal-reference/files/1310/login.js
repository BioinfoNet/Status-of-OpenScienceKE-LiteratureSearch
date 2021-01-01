(function ($) {
	var name = "application",
		user = null;

	function checkLogin(success, failure) {
		if (user) {
			success.call(this, { user: user });
		} else {
			failure.call(this);
		}
	}

	function authenticate(success, failure) {
			failure.call(this, "You can't authenticate with this login method.");
	}
	
	//console.log("About to add ", name, " to list of providers");
	LOGIN.addProvider(
		name,
		{
			priority: 100,
			ready: true,
			name: name,
			user: user,
			authenticate: authenticate,
			checkLogin: checkLogin,
			toString: function () { return name }
		}
	);
}(jQuery));