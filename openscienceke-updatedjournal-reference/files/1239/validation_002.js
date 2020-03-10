'use strict';

/* global AOP */

(function ($, AOP) {
  $(document).foundation({
    tab: {
      callback: function (tab) {
        $(tab.find('> a').attr('href')).find('form').each(AOP.validation.reflow);
      }
    }
  });
})(jQuery, AOP);