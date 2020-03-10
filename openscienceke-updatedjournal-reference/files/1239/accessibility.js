var AOP = AOP || {};
var modalSelectorString = 'a.delete-modal, a[data-reveal-id], a[class*=export-citation], a[class*=ip-address]';
var modalFocusableSelectorString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

var qtipSelectorString = 'a[classG*="hasTooltipCustom"], a[data-hasqtip], a[data-qtip-event]';

var tooltipIconSelectorString = 'a.tooltip-icon';

AOP.toolTipCloseLinkHtml = '<p> \
    <a style="float: right; color:#0072cf;" class="button small transparent-no-border radius tooltip-close-btn" \
    id="tooltip-close-link" href="#" aria-label="Close get access information" \
    onclick="$(AOP.lastElementBeforeRevealModal).focus(); return false;"> \
      <span class="custom-tooltip-button-remove"></span> \
  </a> \
</p>';

AOP.lastElementBeforeRevealModal = '';

AOP.enableKeyboardAccessInQtipTooltip = function () {

  setTimeout(function () {
    AOP.enableKeyboardAccessOnQtip($('.qtip-content'));
  }, 300);
};

AOP.attatchCloseLinkToQtip = function (qtipAPI) {
  setTimeout(function () {
    var closeLink = $('.qtip-content').find('#tooltip-close-link');
    if (closeLink.length === 0) {
      return false;
    }
    closeLink.on('click', function (e) {
      e.preventDefault();
      qtipAPI.toggle(false);
      $(AOP.lastElementBeforeRevealModal).focus();
    });
    closeLink.on('keydown', function (e) {
      var keyPressed = e.keyCode || e.which;
      var enterKey = 13;

      if (keyPressed === enterKey) {
        e.preventDefault();
        qtipAPI.toggle(false);
        $(AOP.lastElementBeforeRevealModal).focus();
      }
    });
  }, 300);
};

/* This relies on the behaviour set by AOP.attatchCloseLinkToQtip
 * This will simulate a click on the close button when the escape key
 * is pressed.
 */
AOP.closeQtipOnEsc = function (qtipAPI) {
  setTimeout(function() {
    var closeLink = $('.qtip-content').find('#tooltip-close-link');
    var qtip = $('.qtip-content');
    qtip.on('keydown', function (e) {
      var keyPressed = e.keyCode || e.which;
      var escKey = 27;

      if (keyPressed === escKey) {
        closeLink.click();
      }
    });

  }, 300);
}

AOP.enableKeyboardAccessOnQtip = function ($DOMElement) {
  var tabAbles = $DOMElement.find('select:visible, input:visible, textarea:visible, button:visible, a.button:visible, a.button-no-transition:visible').filter(function (index, element) {
    var $element = $(element);
    var elementClass = $element.attr('class');
    var elementType = $element.attr('type');
    var isHidden = elementType && elementType.split(' ').indexOf('hidden') > -1;
    return isHidden !== true;
  });

  var firstTabAble = tabAbles.first();
  var lastTabAble = tabAbles.last();

  if (tabAbles.length > 1) {
    var firstNonCloseTabable = $(tabAbles[0]).hasClass('tooltip-close-btn') ? tabAbles[1] : tabAbles[0];
  } else {
    var firstNonCloseTabable = tabAbles[0];
  }

  $(firstNonCloseTabable).focus();

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

$(document).on('keydown', qtipSelectorString + ', ' + modalSelectorString + ', ' + tooltipIconSelectorString, function (e) {
  var keyPressed = e.keyCode || e.which;
  var enterKey = 13;
  if (keyPressed === enterKey) {
    AOP.lastElementBeforeRevealModal = e.target;
  }
});

/**
 * For the give switch, toggle the aria-label text, based on switch state.
 * @param $switch
 */
AOP.toggleSwitchAriaLabel = function($switch) {
  if (typeof $switch !== 'object') {
    return;
  }
  var dataOnMessage = $switch.data('onMessage');
  var dataOffMessage = $switch.data('offMessage');
  $switch.attr('aria-label', $switch.hasClass('off') ? dataOnMessage : dataOffMessage);
};

$(document).on('ready', function () {
  // On switch click/keydown, toggle the aria-label.
  $('.switch-wrapper').on('click', function (e) {
    e.preventDefault();
    var disableAriaToggle = $(this).data('disableAriaToggle');
    // Check if this action is disabled on the element - sometimes we want to manually control when this happens.
    if (disableAriaToggle !== true) {
      AOP.toggleSwitchAriaLabel($(this));
    }
  });
});

/* Start - Accessible Modals */

// Prevent mouse clicks outside modal
$(document).foundation({ 'reveal': { close_on_background_click: false } });

$(document).on('closed.fndtn.reveal', '[data-reveal], [data-reveal-id]', function () {
  $(AOP.lastElementBeforeRevealModal).focus();
  AOP.lastElementBeforeRevealModal = null;
});

$(document).on('opened.fndtn.reveal', '[data-reveal], [data-reveal-id]', function () {
  if (!AOP.lastElementBeforeRevealModal) {
    AOP.lastElementBeforeRevealModal = document.activeElement;
  }

  // if loader is visible, then don't call enableKeyboardAccess when modal has shown, instead, call manually after ajax call
  if (!$(this).find('div.loader:visible').length) {
    AOP.enableKeyboardAccess($(this));
  }
});

$(document).on('focus', 'input[type="checkbox"]', function (e) {
  // var keyPressed = e.keyCode || e.which;
  // var tabKey = 9;

  // if (keyPressed === tabKey) {
    $(e.target).focus(function () {
      $(this).next('span').css('outline', '#649FF9 auto 3px');
    });
    $(e.target).blur(function () {
      $(this).next('span').css('outline', 'none');
    });
  // }
});

$(document).on('keydown', tooltipIconSelectorString, function (e) {
  var keyPressed = e.keyCode || e.which;
  var enterKey = 13;
  var $tooltipIcon = $(this);
  var toolTipContentId = $tooltipIcon.attr('aria-controls');

  if (keyPressed === enterKey) {
    setTimeout(function () {
      var $dataDropdownContent = $('#' + toolTipContentId);
      var contentHTML = $dataDropdownContent.html();
      var closeLinkExists = $dataDropdownContent.find('a#tooltip-close-link');

      if (closeLinkExists.length === 0) {
        $dataDropdownContent.html(
          AOP.toolTipCloseLinkHtml +
          contentHTML
        );
      }

      AOP.enableKeyboardAccess($('[data-dropdown-content]'));
    }, 200);
  }
});
