'use strict';

$(document).ready(function() {
	$('.feedback-tab-container .feedback-tab')
		.on('click keypress', function(e) {
			if (e.which === 13 || e.type === 'click') {
				openFeedbackModal();
			}
		});

	$('#feedbackModule .modal-close')
		.on('click keypress', function(e) {
			if (e.which === 13 || e.type === 'click') {
				closeFeedbackModal();
			}
		});

	$(document).on('click touchstart',function(event) {
		if (!$(event.target).closest('.feedback').length
		&& $(event.target)[0] != $('.feedback-tab')[0]
		&& $(event.target)[0] != $('.feedback-tab i')[0]
		&& $(event.target)[0] != $('.feedback-tab span')[0]
		&& $(event.target).html() != $('.feedback-tab').html()
		&& $(event.target).html() != $('.feedback-tab span').html()
		&& $(event.target).html() != $('.feedback-tab i').html()) {
			if ($('#feedbackModule.modal-wrapper').hasClass("visible")) {
				closeFeedbackModal();
			}
		}
	});

	setServerVars("https://" + strServer + "/AjaxStatic.cfm?file=SuggBoxProcess", strSugPageName, strIP, strFullUrl, sEmail);
});

$('form[name="formSuggestions"]').submit(function(e) {
	e.preventDefault();
	if($('form[name="formSuggestions"]')[0].checkValidity()){
		sendSuggest('https://' + strServer + '/AjaxStatic.cfm?file=SuggBoxProcess');
	}
});

function openFeedbackModal() {
	$('#feedbackModule')
		.show()
		.addClass('visible')
		.find('.modal-custom')
			.addClass('visible');
	$('#txtEmail').val(emailValue);
	$('#txtFeedback').val("");
}

function closeFeedbackModal() {
	$('#feedbackModule')
		.hide()
		.removeClass('visible')
		.find('.modal-custom')
			.removeClass('visible');
}

var SugPageFrom ;
var IpAddr;
var FullUrl;
var url;
var windowwidth ;
var windowheight;
var TZOffset;
var w_width ;
var w_height;
var emailValue;

function setServerVars(serverUrl, strSugPageName, strIP, strFullUrl, email){
	url = serverUrl; // The server-side script
	windowwidth = 0;
	windowheight = 0;
	TZOffset = 0;
	w_width = 0;
	w_height = 0;
	if (window.outerWidth) {
		w_width = window.outerWidth;
		w_height = window.outerHeight;
	} else if (document.body.clientWidth) {
		w_width = document.body.clientWidth;
		w_height = document.body.clientHeight;
	}
	var mydate= new Date();
	TZOffset = mydate.getTimezoneOffset()/60;

	SugPageFrom = strSugPageName;
	IpAddr = strIP;
	FullUrl = strFullUrl;
	emailValue = email;

}

function Trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

/*
This function prepare string for special characteres.
javascript use:	str = str.replace(/stringToSearch/g,'stringToReplace');
cfscript use:		str = replaceAll(str, 'stringToSearch','stringToReplace');
*/
function prepareString ( str ){
	str = str.replace(/%/g,'|-.2.-|');
	str = encodeURI(str);
	str = str.replace(/&/g,'|-.1.-|');
	str = str.replace(/�/g,'|-.7.-|');
	str = str.replace(/�/g,'|-.8.-|');
	// need to make these replacement b/c a bug that appeared after the CF upgrade
	str = str.replace(/%u2019/g,"'");
	str = str.replace(/%u2018/g,"'");
	// need to make these replacement b/c a bug in Safari
	str = str.replace(/%u201C/g,'%22');
	str = str.replace(/%u201D/g,'%22');
	str = str.replace(/%u2013/g,'-');
	str = str.replace(/%u2014/g,'-');
	str = str.replace(/%uF0FC/g,'*');
	str = str.replace(/%u2022/g,'*');
	str = str.replace(/%uF0A7/g,'*');
	return str;
}

function sendSuggest(url) {
	var strEmail = document.getElementById("txtEmail").value;
	var strFeedback = Trim(document.getElementById("txtFeedback").value);
	strFeedback = Trim(prepareString(strFeedback));
	url += "&txtFeedback="+strFeedback+"&txtEmail="+strEmail+"&SugPageFrom="+SugPageFrom+"&IPAddr="+IpAddr+"&FullUrl="+FullUrl+"&w_width="+w_width+"&w_height="+w_height+"&TZOffset="+TZOffset;
	var message = "Your feedback has been submitted.";
	$.post(url, function(data, status, jqXHR) {
		console.log(status);
		closeFeedbackModal();
		showToastr({message: message});
	});
}
