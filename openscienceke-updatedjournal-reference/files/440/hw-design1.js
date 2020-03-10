$(document).ready(function() {
	// updateFormInput(labelMatchString, inputMatchString, defaultColorString, textColorString) {
	var inputSuggColor="#A0A0A0"
	$("#hdr-login input").css("color",inputSuggColor);
	$("#hdr-login input").each( function(){
			var myid = $(this).attr("id");
			var labelmatch = "#hdr-login label[for='"+myid+"']";
			var mylabel = $(labelmatch);
			if (mylabel.length) {
				$(this).val(mylabel.text()).css("color",inputSuggColor);
			}
	})
	$("#hdr-login input").focus(
		function(e) {
			var myid = $(this).attr("id");
			var labelmatch = "#hdr-login label[for='"+myid+"']";
			var mylabel = $(labelmatch);
			if (mylabel.length && $(this).val() == mylabel.text()) {
				$(this).val('').css("color","black");
			}
		}
	);
	$("#hdr-login input").blur(
		function(e) {
			if ($(this).val() == '') {
				var myid = $(this).attr("id");
				var labelmatch = "#hdr-login label[for='"+myid+"']";
				var mylabel = $(labelmatch);
				if (mylabel.length) {
					$(this).val(mylabel.text()).css("color",inputSuggColor);
				}
			}
		}
	);
	$("#hdr-login-signin-label").wrap('<a href="#" id="hdr-login-signin-label-a"></a>').click(
		function(e) {
			$("#hdr-login form").submit();
		}
	);
	
	// moved to hw-shared
	// updateFormInput("#header-qs-search-label", "#header-qs-input", '', '');

	$("#header div.header-qs label[for='header-qs-search']").wrap('<a href="#" id="hdr-qs-search-a"></a>').click(
		function(e) {
			$("#header div.header-qs form").submit();
		}
	);

});
