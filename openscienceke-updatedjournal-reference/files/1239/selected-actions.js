/* global AOP, createAlertBox */

(function (AOP, $) {
  AOP.getSelectedItems = function getSelectedItems($selectedItems) {
    var valid = [];
    var inValid = [];
    var turnAways = [];

    $.each($selectedItems, function () {
      var $item = $(this);
      var id = $item.data('prodId');
      if (id) {
        if ($item.data('hasPdf')) {
          if ($item.data('hasEntitlement')) {
            valid.push(id);
          } else {
            inValid.push(id);
            turnAways.push(id);
          }
        } else {
          inValid.push(id);
        }
      }
    });

    return {
      valid: valid,
      inValid: inValid,
      turnAways: turnAways
    };
  };

  AOP.isOver10mb = function isOver10mb($selectedItems) {
    var totalSize = 0;

    $.each($selectedItems, function () {
      var $item = $(this);
      var id = $item.data('prodId');
      if (id) {
        totalSize += Number($item.data('fileSize'));
      }
    });

    if (totalSize >= 10485760) { // higher than or equal to 10mb
      return true;
    }
    return false;
  };

  AOP.dispatchTurnawayEvents =  function dispatchTurnawayEvents(turnAways, eventType) {
    if (!$.isArray(turnAways)) {
      return false;
    }
    for (var i = 0; i < turnAways.length; i++) {
      $.cupEvent.dispatchEvent({
        'eventContext': window.location.href,
        'eventCode': 'TA-NL',
        'eventType' : eventType,
        'productId': turnAways[i],
        'usedIdentities': []
      });
    }
    return true;
  };
})(AOP || {}, jQuery);

$('.select-all').on('click', function (e) {
  e.preventDefault();
  $('.representation input[name="productParts"]').prop('checked', true).trigger('change');
  $('.search-results-listing .accessible-alert').html('All content has been selected');
});
$('.deselect-all').on('click', function (e) {
  e.preventDefault();
  $('.representation input[name="productParts"]').prop('checked', false).trigger('change');
  $('.search-results-listing .accessible-alert').html('All content has been deselected');
});

$('#viewSelectedProductParts').on('click', function (e) {
  e.preventDefault();
  var selectedItems = $('.representation input[name="productParts"]:checked');

  if (!selectedItems.length) {
    createAlertBox(null, $('#ajaxMessages'), 'error', 'No content selected. Please select items you would like to view.');
    return false;
  }

  var blocked = false;
  $.each(selectedItems, function () {
    var id = $(this).data('prodId');
    if (id) {
      var partLinkUrl = AOP.baseUrl + '/product/' + id;
      var newTab = window.open(partLinkUrl, '_blank');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        blocked = true;
      }
    }
  });

  if (blocked === true) {
    createAlertBox(null, $('#ajaxMessages'), 'error', 'Please ensure popups are enabled for this website.');
  }
});

$('#downloadSelectedProductParts').on('click', function (e) {

  e.preventDefault();
  AOP.lastElementBeforeRevealModal = $(this);
  var $selectedItems = $('.representation input[name="productParts"]:checked');

  if (!$selectedItems.length) {
    createAlertBox(null, $('#ajaxMessages'), 'error', 'No content selected. Please select items you would like to download the PDF for.');
    return false;
  }

  var selectedItems = AOP.getSelectedItems($selectedItems);

  AOP.dispatchTurnawayEvents(selectedItems.turnAways, 'DLD');

  var message = 'You are about to download ' + selectedItems.valid.length + ' PDF files.';
  if (selectedItems.inValid.length) {
    message += '<p class="margin-top">Please note, ' + selectedItems.inValid.length;
    message += selectedItems.inValid.length > 1 ? ' items ' : ' item ';
    message += 'selected';
    message += selectedItems.inValid.length > 1 ? ' are ' : ' is ';
    message += 'not downloadable.</p>';
  }

  var renderedFrom = $(this).data('renderedfrom');
  // If rendered from a book page, append an extra message to the modal, explaining that the downloaded file list
  // will have renamed files, so they appear in the correct order when downloaded.
  if (renderedFrom === 'BOOK') {
    message += '<p class="margin-top">Please note, the PDFs are prefixed by a number to ensure the parts are ordered sequentially.</p>';
  }

  var url = AOP.baseUrl + '/services/aop-cambridge-core/content/download/pdf/zip/' + selectedItems.valid.join(',');

  if ($(this).data('downloadcontextid')) {
    url += '/' + $(this).data('downloadcontextid');
  }

  if (selectedItems.valid.length) {
    AOP.confirmModal(
      'Confirm download',
      message,
      function () {
        window.location = url;
      }
    );
  } else {
    createAlertBox(null, $('#ajaxMessages'), 'error', 'None of the items selected are downloadable.');
  }
});

$('.sendSelectedItems').on('click', function (e) {
  e.preventDefault();
  var $selectedItems = $('.representation input[name="productParts"]:checked');
  var serviceName = $(this).data('service');
  var serviceDisplayName = $(this).data('serviceDisplayName');
  var displayLocation = $(this).data('location');
  var serviceModal = $('#sendToMultipleModal');

  if (serviceName === 'kindle' && AOP.isOver10mb($selectedItems)) {
    var errorMessage = 'The content you have selected exceeds 10MB and cannot be sent by email to your Kindle account. ';
    errorMessage += displayLocation === 'landingPage' ? '' : 'Please try again selecting fewer items.<br />';
    createAlertBox(null, $('#ajaxMessages'), 'error',
      errorMessage + 'For more information please see our <a href=\'https://www.cambridge.org/core/help/FAQs#using-cambridge-core\'>FAQs</a>'
    );
    AOP.gaEvents.sendGaTrackingEvent('content_actions', 'kindle_exceed_max_filesize');
    return false;
  }

  if (!$selectedItems.length) {
    createAlertBox(null, $('#ajaxMessages'), 'error', 'No content selected. Please select content in order to send to ' + serviceDisplayName + '.');
    return false;
  }

  var selectedItems = AOP.getSelectedItems($selectedItems);

  AOP.dispatchTurnawayEvents(selectedItems.turnAways, 'CLD');

  if (selectedItems.valid.length === 0) {
    createAlertBox(null, $('#ajaxMessages'), 'error', 'None of the items selected are downloadable.');
    return false;
  }

  $.get(AOP.baseUrl + '/services/aop-cambridge-core/product/get/' + selectedItems.valid.join(','), function (data) {
    var niceNames = [];
    var niceNamesMarkup = [];

    $.each(data.data, function (i, el) {
      niceNames.push(el.title);

      var markup = '<li><a href="' + AOP.baseUrl + '/product/' + el.productId + '" target="_blank">' + el.title + '</a></li>';
      niceNamesMarkup.push(markup);
    });

    // pass the information to placeholders
    $('span.placeholder[rel=itemsNumber]', serviceModal).text(selectedItems.valid.length);
    $('span.placeholder[rel=items]', serviceModal).html(niceNamesMarkup.join(''));
    $('span.placeholder[rel=serviceDisplayName]', serviceModal).text(serviceDisplayName);


    // inform the user about some content not being available
    $('div.contentNotAvailablePanel').hide();
    var itemsNotAvailableAmount = selectedItems.inValid.length;
    if (itemsNotAvailableAmount !== 0) {
      $('div.contentNotAvailablePanel').show();
      $('span.placeholder[rel=contentNotAvailableAmount]').text(itemsNotAvailableAmount);
    }


    // populate form inputs
    $('input[name=service]', serviceModal).val(serviceName);
    $('input[name=documents]', serviceModal).val(selectedItems.valid);
    $('input[name=finalReturn]', serviceModal).val(document.location.href);

    // set aria-label for modal close button
    var closeButton = serviceModal.find('a.close-reveal-modal')[0];
    if (closeButton) {
      $(closeButton).attr('aria-label', 'Close send content to ' + serviceName);
    }

    serviceModal.foundation('reveal', 'open');
  });

});
