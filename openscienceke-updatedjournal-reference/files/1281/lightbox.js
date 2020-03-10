var currentLightbox = null;
function showLightbox(url, width, height, closable) {
	showLightbox(url, width, height, '&nbsp;', closable);
}

function showNewLightbox(anchorElement, width, height, title, closable) {
	var lightBoxHref = anchorElement.href.replace(/\?nojs=true/g, "");
	lightBoxHref = lightBoxHref.replace(/&nojs=true/g, "");
	showLightbox(lightBoxHref, width, height, title, closable);
	return false;
}

function showLightbox(url, width, height, title, closable) {
	(function($) {
		$.fancybox({
	        href: url,
	        type: 'iframe', 
			width: width, 
			height: height,
			autoSize: height == "auto",
			beforeClose: function() {
				window.dispatchEvent(new CustomEvent('fancyBoxClosing'));
				return true;
			}
	    });
	    return false;
	})(jQuery);
}