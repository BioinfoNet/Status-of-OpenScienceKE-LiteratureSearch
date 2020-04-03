function responseveIframe() {
  jQuery('iframe').height(
    jQuery('iframe').attr("height") / jQuery('iframe').attr("width") * jQuery('iframe').width()
  );
}

responseveIframe();

jQuery(document).ready(function() {
  responseveIframe();
});

jQuery(window).resize(function() {
  responseveIframe();
});
