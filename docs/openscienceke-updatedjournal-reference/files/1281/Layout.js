document.observe("dom:loaded", function() {

	// bind event handlers for subject menu
	$('subjectLi').observe('click', function (event) {
		$('subjectMenu').toggleClassName('on');
	})
	// norlov: #2616 hack for IE since dom:loaded event fired differently for IE/firefox(chrome)
	// the event is caught in AdPlacement.tml script
    setTimeout(function(){document.fire('dom:loaded:afterTimeout')}, 500);
    /*
    We using special request parameter in URL, and javascript after page was loaded identify it and click on hidden link to show notification lightbox.
    That's a hack and please let us know if you know another way to display lightbox after page was reloaded.
    */
    var lightboxLinkId = getUrlVars()['showLightbox'];
    if (lightboxLinkId) {
        if (parent.$(lightboxLinkId)) {
            parent.$(lightboxLinkId).onclick.delay(.5);
        }
    }

});

/*
 * return two-dimensional array:
 * "requestParamName1" : "value1"
 * "requestParamName2" : "value2"
 */
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}