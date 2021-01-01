// Commented out by Mark on 28 Nov 2017 because "sticky" was causing error
//  
//  (function(a,b,c,d){for(c in a)(d=a[c].hash)&&a[c].href==b+d&&a[c].addEventListener&&a[c].addEventListener("click",function(a,b,c,d){if(a=(b=document).getElementById(c=this.hash.slice(1))||b.getElementsByName(c)[0])(d=!a.getAttribute(b="tabindex"))&&a.setAttribute(b,-1),a.focus(),d&&a.removeAttribute(b)})})(document.links,location.href.split("#")[0]);
//  
//  $(document).ready(function(){
//  	$('#search_banner').sticky({ topSpacing: 0 });
//  	$('.filter_interact_title_wrap').sticky({ topspacing: 200 });
//  });


$(window).on('load',function(){

// =================================
// recommend email submission
	$('#recommend_email').submit(
	  function( evt ) {
		var email = $('#email_address').val();
		var ajax = '1';
		var type = $('#recommend_type').val();
		var id = $('#recommend_id').val();
		var result = $.post('/email_link', {
		  'email': email,
		  'type': type,
		  'id': id,
		  'ajax':ajax
		},
		function( data, txtStatus ) {
		  $('#email_result').text(data);
		});

		evt.preventDefault();
	});
	
// =================================
// feedback email submission
	/*
      $(document).on("click",".feedbk_button", function(){
            if (!$('#feedbk_email').val() || !$('#feedbk_name').val() || !$('#feedbk_msg').val() ) {
                  alert("Please supply a name, email and comment.");
                  return;
            }
            
            var msg = $('#feedbk_msg').val();
            var msg_sanitized = sanitize(msg);
            var email = $('#feedbk_email').val();
            var email_sanitized = sanitize(email);
            var name = $('#feedbk_name').val();
            var name_sanitized = sanitize(name);
            var formData = new FormData();
            formData.append('email', email_sanitized);
            formData.append('name', name_sanitized);
            formData.append('comment', msg_sanitized);  
            formData.append('action', "feedback");   
            $.ajax({
		type: 'POST',
		url: '/account',
		data : formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
		success: function (response) {
                  alert("Thank you for your feedback.");
                  $('#feedback_modal.open').hide();
		  $('#feedback_modal').removeClass('open');
		  $('body').removeClass('modalopen');
                  $('#feedbk_msg').val("");
                }
            });

            return false;
      });
      */     
   
         
function sanitize(s) {
	return s.replace(/<script>.*<\/script>/g,' SCRIPT REMOVED ').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g, '&gt;').replace(/"/g,'&quot;').replace(/drop table/g,'');
}

// =================================
// Addthis
	var addthis_config = {
			"data_track_clickback":true,
			ui_508_compliant: true,
			services_exclude:'email'};
		
		  var addthis_share =  { 
		templates: {
					   twitter: 'check out {{url}} (from @ProjectMUSE)'
				   }
	  }	


});

$(document).ready(function(){
	
	// beta header menu
	function toggleMobileNav() {
		if($(this).hasClass("nav-toggle")) {
		  $(".nav-toggle, .nav-mobile").toggleClass("visible");
		} else {
		  $(".nav-toggle, .nav-mobile").removeClass("visible");
		}
	}
	
	$('.menu-icon-wrap').on('click', function(e){
		e.preventDefault();
	});
	$("body, .nav-toggle").on("click", toggleMobileNav);
	$(".nav-mobile, .nav-toggle").on("click", function(e){
		e.stopPropagation();
	});
	
	
	// feedback form modal
	$(".modal_trigger").click(function(e) {
		e.preventDefault();
		if ($('#feedback_modal').length > 0) {
			$('#feedback_modal').show();
			$('#feedback_modal').addClass('open');
			$('body').addClass('modalopen');
		
		} else {
			//create HTML
			/*
			var feedback_box =
			'<div id="feedback_modal" class="open">' +
			    '<div id="content">' +
				    '<p><a id="modal_close">Close</a></p>' +
			        '<div class="form_wrap">' +
			        	'$error' +
						'$response' +
				        '<form id="feedback_form" name="feedback_form" method="post" enctype="multipart/form-data">' +
				        	'<div class="req">* <em>Required fields</em></div>' +
					        '<label for="feedbk_name">Name <span class="req">*</span></label><br>' +
					        '<input type="text" id="feedbk_name" name="name"><br>' +
					        '<label for="feedbk_email">Email <span class="req">*</span></label><br>' +
					        '<input type="email" id="feedbk_email" name="email"><br>' +
					        '<label for="feedbk_msg">Comments <span class="req">*</span></label><br>' +
					        '<textarea rows="6" id="feedbk_msg" name="message"></textarea><br>' +
					        '<label class="label_attach" for="file">Attach Screenshot (image file only)</label><br>' +
						    '<input type="file" id="fileupload" name="file"><br><br>' +
					        '<div>$captcha_html</div><br>' +
					        '<div id="feedbk_response"></div>' +
					        '<div class="fdbk_btn">' +
					        	'<input type="hidden" name="action" value="submit_form">' +
					        	'<input type="button" id="submit_form" class="feedbk_button" value="Send"><br>' +
					        '</div>' +
				        '</form>' +
			        '</div>' +
			    '</div>' +
			'</div>';
			//insert HTML into page
			$('body').append(feedback_box);
			*/
			$('#feedback_modal').show();
			$('body').addClass('modalopen');
		}
	});
	$('body').on('click', '#feedback_modal', function(event) {
		if(!$(event.target).closest('#feedback_modal #content').length && !$(event.target).is('#feedback_modal #content')) {
			$('#feedback_modal.open').hide();
			$('#feedback_modal').removeClass('open');
			$('body').removeClass('modalopen');
		}
	});
	$('body').on('click', '#modal_close', function() {
		$('#feedback_modal.open').hide();
		$('#feedback_modal').removeClass('open');
		$('body').removeClass('modalopen');
	});
	
	// accordion nav
	$(".accordion .acc_trig.open").next(".acc_block").slideDown(300);
	$(".accordion .acc_trig").click(function(e) {
        e.preventDefault();
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).next(".acc_block").slideUp(300);
        } else {
            $(this).parent(".acc_item").siblings(".acc_item").children(".acc_trig").removeClass("open");
            $(this).addClass("open");
            $(this).parent(".acc_item").siblings(".acc_item").children(".acc_block").slideUp(300);
            $(this).next(".acc_block").slideDown(300);
        }
	});
	
	// account mobile nav
	$(document.body).on('click', "#leftnav_account_wrap .mobile_toggle", function (e) {
        e.preventDefault();
        $("#leftnav_account_wrap .leftnav").slideToggle(300);
	});
	
	// guide mobile nav
	$(document.body).on('click', "#resource_content .mobile_toggle", function (e) {
        e.preventDefault();
        $("#resource_content .leftnav").slideToggle(300);
	});
    
	
});
