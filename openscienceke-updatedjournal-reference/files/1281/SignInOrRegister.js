document.observe("dom:loaded", function() {
	if ($('signUpLink')) {
		$('signUpLink').observe('click', function(evt) {
		    $('signUpLinkHidden').onclick.delay(.5);
		});
	}
	
	if ($('signInLink')) {
		$('signInLink').observe('click', function(evt) {
		    $('signInLinkHidden').onclick.delay(.5);
		});
	}
	
});