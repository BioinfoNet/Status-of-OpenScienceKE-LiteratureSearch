(function ($) {
  // Add toggleable element js.
  Drupal.behaviors.jnlSciStylesToggleable = {
    attach: function(context, settings) {
      // Initially hide any toggleable elements if not shown by default.
      $('.toggleable:not(.is-revealed)', context).addClass('is-visually-hidden');
      $('[data-click-to-toggle]', context).click(function(){
        var revealTarget = $(this).data('click-to-toggle');
        $(revealTarget).toggleClass('is-revealed is-visually-hidden');
        $(this).toggleClass('is-revealed-target');
        return false;
      });
    }
  }
})(jQuery);