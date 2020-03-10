//globals window
var AOP = AOP || {};

AOP.createAlertBox = (function ($) {
  var alertSettings = {
    error: {
      boxClass: 'alert',
      messageClass: 'alert-danger'
    },
    warn: {
      boxClass: 'warning',
      messageClass: 'alert-danger'
    },
    info: {
      boxClass: 'info',
      messageClass: 'alert'
    },
    success: {
      boxClass: 'success',
      messageClass: 'alert'
    }
  };

  var defaultOptions = {
    alertElement: '#ajaxMessages',
    alertType: 'error',
    closeAfter: 3000,
    scroll: true
  };
  return function (message, opts) {
    if (message) {
      var lastFocusElement = $("*:focus");
      opts = $.extend(defaultOptions, opts);
      if (!opts.alertType || !alertSettings[opts.alertType]) {
        console.log('couldn\'t match the alert type. Provided:', opts.alertType);
        opts.alertType = 'error';
      }
      
      var alertElement = $(opts.alertElement);
      var alertBox = $('<div data-alert class="alert-box ' + alertSettings[opts.alertType].boxClass + '"><div role="alert" class="alert ' + alertSettings[opts.alertType].messageClass + '">' + message + '</div><a href="#" class="close" aria-label="Close alert" tabindex="0"><span aria-hidden="true">&times;</span></a></div>');
      alertElement.append(alertBox).foundation();
      AOP.enableKeyboardAccess($(".alert-box"));

      if (opts.scroll) {
        var scrollOffset = $(alertBox).offset().top - 100;
        $('html, body').animate({scrollTop: scrollOffset}, 'fast');
      }
      if (opts.autoClose) {
        setTimeout(function () {
          alertBox.fadeOut('fast', function () {
            alertBox.remove();
          });
        }, opts.closeAfter);
      }
      $(document).on('close.fndtn.alert', function(event) {
      lastFocusElement.focus();
    });
    }
  };
})(jQuery);

/**
 *
 * @param $DOMElement - search for elements in this wrapper
 */
AOP.enableKeyboardAccess = function ($DOMElement) {
  // $DOMElement = $DOMElement.first();
  $DOMElement.on('keydown', function (e) {
    var keyPressed = e.keyCode || e.which;
    var escKey = 27;

    if (keyPressed === escKey) {
      e.preventDefault();
      var elementRole = $DOMElement.attr('role');
      // if element is not a modal
      if (elementRole !== 'dialog') {
        // Do not remove tooltip elements from the DOM, just hide them.
        if (elementRole === 'tooltip') {
          $DOMElement.find('#tooltip-close-link').click();
        } else {
          // Remove the alert box
          $DOMElement.fadeOut('fast', function () {
            $DOMElement.remove();
          });
        }
      }
    }
  });

  var tabAbles = $DOMElement.find('select:visible, input:visible, textarea:visible, button:visible, a:visible, a.section-button').filter(function (index, element) {
    var $element = $(element);
    var elementClass = $element.attr('class');
    var elementType = $element.attr('type');
    var isCloseModalIcon = elementClass && elementClass.split(' ').indexOf('close-reveal-modal') > -1;
    var isHidden = elementType && elementType.split(' ').indexOf('hidden') > -1;
    return !isHidden;
  });

  var firstTabAble = tabAbles.first();
  var lastTabAble = tabAbles.last();

  
  firstTabAble.focus();

  lastTabAble.on('keydown', function (e) {
    var keyPressed = e.keyCode || e.which;
    if (keyPressed === 9 && !e.shiftKey) {
      e.preventDefault();
      var firstTabAbleDisplayed = firstTabAble.is(':visible');
      if (firstTabAbleDisplayed) {
        firstTabAble.focus();
        return true;
      }
      if (tabAbles.length >= 2) {
        tabAbles[1].focus();
      }
      return true;
    }
  });
};
