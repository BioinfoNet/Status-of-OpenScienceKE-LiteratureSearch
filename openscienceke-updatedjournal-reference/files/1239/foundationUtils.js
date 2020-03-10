'use strict';

/* global AOP */

(function ($, AOP) {
  AOP.validation = AOP.validation || {};
  AOP.validation.reflow = function () {
    var oldOff = $.fn.off;
    $.fn.off = function () {
      oldOff.apply(this, ['submit.fndtn.abide']);
      oldOff.apply(this, ['validate.fndtn.abide']);
      return this;
    };
    $(this).foundation('abide', 'reflow');
    $.fn.off = oldOff;
  };

  AOP.validation.reflowForm = function (form) {
    AOP.validation.reflow.call($(form));
  };

})(jQuery, AOP || {});
