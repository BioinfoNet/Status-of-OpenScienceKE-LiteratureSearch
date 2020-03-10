(function ($) {
  Drupal.behaviors.jnl_sci_social_icons = {
    attach: function(context, settings) {
    $URL = location.href;
    // Facebook Shares Count
    $.getJSON( 'http://graph.facebook.com/?id=' + $URL, function( fbdata ) {
      $('.facebook__count').text(_sci_social_count_format(fbdata.share.share_count));
    });  
   }
  }
})(jQuery);

function _sci_social_count_format(social_count){
  social_count = isNaN(social_count) ? 0 : parseInt(social_count);
  return (social_count >= 1000 ? (social_count >= 1000000 ? Math.round(social_count / 10000)/100 + 'm' : Math.round(social_count / 10)/100 + 'k') : social_count);
}
