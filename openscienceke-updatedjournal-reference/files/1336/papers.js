function WinOpen(id) {
	sUrl = "PIP_Journal.cfm?pip_jrnl=" + id;
	currWindow = window.open (sUrl,"PIP","toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,width=500,height=350");
}

function trackEventsArticle(page, type){
		var track = "";
		switch (type) {
			case "references":
				track = "article-page:references";
				break;
			case "citations":
				track = "article-page:citations";
				break;
			case "footnotes":
				track = "article-page:footnotes";
				break;
			case "related-journal":
				track = "article-page:related-journal-follow";
				break;
		}
		pageDataTracker.trackEvent('conversionDriverClick', {conversionDriver:{name : track}});
		if (type == 'related-journal') {
			window.location.href = page;
		} else {
			window.open(page,'_blank');
		}
};

$(document).ready(function() {
	setTimeout(function(){
		$('.cite-reader-info').tooltip({
			html: true,
			title: $('.cite-reader-tooltip-content').html()
		});
	}, 1000);
	
	var $sugCitation = $('.suggested-citation'),
	$selection = $('#selection');

	$sugCitation
		.on('click', function(ev) {
			if (!$(ev.target).is('a')) {
				var el = $sugCitation[0];
				selectAll(el);
			}
		});

	var height = 0;

	for (var i = 0; i<4; i++) {
		height += $($('.authors.cell').children()[i]).height();
	}
	height += 30;

	if($('.authors.cell').children()[5]){
		$('#more-collapse').show();
	}
	$('.authors.cell').css("max-height", height);
	$('#more-collapse').on('click', function(ev) {
		ev.preventDefault();
		if($(this).html() != "More..."){
			$('.authors.cell').css("max-height", height +"px");
			$(this).html("More...");
			$(document).scrollTop(0);
		}else{
			$('.authors.cell').css("max-height", "5000000px");
			$(this).html("Collapse...");
		} 
		
	});

	$('.suggested-citation-btn').on('click', function(ev) {
		ev.preventDefault();
		$(this).toggleClass('open');
		$('.suggested-citation').slideToggle();
	});

	$('.show-contact-btn').on('click', function(ev) {
		ev.preventDefault();
		$(this).toggleClass('open');
		$('.contact-information').slideToggle();
	});
 
	$('.star-container a').on('click', function(ev) {
		ev.preventDefault();
		var $icon = $(this).find('i'),
			userId = $icon.data('user-id'),
			abstractId = $icon.data('abstract-id'),
			url = $icon.data('abstract-url'),
			auth = $icon.data('abstract-auth');
		/*We need to know in which enviroment we are*/
		var pos = url.indexOf("static");
		env = url.substring(0, pos);

		var sActionSend = 'https://' + url + '/cfc/webservices/briefcaseServices.cfc';	
		var message= "";
		var linkText = "";
		if ($icon.hasClass('icon-gizmo-star-fill')) {
			$icon
				.removeClass('icon-gizmo-star-fill')
				.addClass('icon-gizmo-star-outline');
			// Remove fav functionality
			var parameters = {
				"method" : "removeFavPaper",
				"user_id" : userId,
				"ab_id" : abstractId
			};
			pageDataTracker.trackEvent('conversionDriverClick', {conversionDriver:{name : 'article-page:remove-from-briefcase'}});
			$('.star-container a span').html('Add Paper to My Library');
		} else {
			$icon
			.removeClass('icon-gizmo-star-outline')
			.addClass('icon-gizmo-star-fill');
			// Add fav functionality
			var parameters = {
				"method" : "addFavPaper",
				"user_id" : userId,
				"ab_id" : abstractId
			};
			message = "This article has been added to your library.";
			linkText = "Click here to view all your papers";
			pageDataTracker.trackEvent('conversionDriverClick', {conversionDriver:{name : 'article-page:add-to-my-briefcase'}});
			$('.star-container a span').html('Remove Paper from My Library');
		}

		var briefcaseUrl = "https://" + env + "hq.ssrn.com/Library/myLibrary.cfm"

		if (auth == false && userId == 1) {
			window.location = briefcaseUrl + "?abid="+ abstractId;
		} else {
			$.ajax({
				url : sActionSend,
				type: "POST",
				data : parameters,
				success: function(data, textStatus, jqXHR) {
					if(data.SUCCESS == true){
						if (parameters.method == "addFavPaper") {
							pageDataTracker.trackEvent('saveToList', { 
							    content : [{
							        id : abstractId
							    }]
							});
							showToastr({
								message: message,
								linkUrl: briefcaseUrl,
								linkText: linkText
							});
						}
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		}
	});

	$('.box-recommended-papers .view-more').on('click', function(ev) {
		ev.preventDefault();
		var hasClass = $(this).hasClass('open');
		$(this).toggleClass('open');
		$('.list-recommended-papers .more').slideToggle(function(){
			var div = $('.box-recommended-papers')[0]
			if (hasClass) {
				$('.box-recommended-papers')[0].scrollIntoView();	
			} else {
				div.scrollTop = div.scrollHeight - div.clientHeight;
			}
		});
	});

	$('#permalink').click(function(e) {
		$('.permalink-tooltip').toggle();
	});

	var isIE = navigator.appName == 'Microsoft Internet Explorer' || !!window.MSInputMethodContext && !!document.documentMode || (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1);
	$('#copyURL').click(function(e) {
		if (isIE) {
			$('#parmalinkURL').select();
			document.execCommand("copy");
		} else {
			selectAllAndCopy($('#parmalinkURL')[0]);
		}
	});

	$('#copyDOI').click(function(e) {	
		if (isIE) {
			$('#parmalinkDOI').select();
			document.execCommand("copy");
		} else {
			selectAllAndCopy($('#parmalinkDOI')[0]);
		}
	});

	$('.box-related-journals .icon-gizmo-information').click(function(ev){
		ev.preventDefault();
		$(this).parent().find('.related-journals-tooltip').show();
	});

	$('.related-journals-tooltip .icon-gizmo-delete').click(function(){
		$(this).closest('.related-journals-tooltip').hide();
	});

	$('.box-related-journals .view-more').on('click', function(ev) {
		ev.preventDefault();
		var div = $($('.quick-links')[0]);
		var nonVisibleRJ = $('.box-related-journals .more').children();
		if(nonVisibleRJ.length > 0 && nonVisibleRJ.length <= 3){
			$('.box-related-journals .view-more').hide();
		}
		for (var i = 0; i < nonVisibleRJ.length; i++) {
			if(i < 3){
				div.append(nonVisibleRJ[i]);
			}
		}
	});
	
});

$(document).on('click touchstart',function(event) {
	if (!$(event.target).closest('.permalink-tooltip').length && $(event.target)[0] != $('#permalink i')[0]) {
		if ($('.permalink-tooltip').is(":visible")) {
			$('.permalink-tooltip').hide();
		}
	}
});