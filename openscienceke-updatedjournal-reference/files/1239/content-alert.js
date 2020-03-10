/* global cmsModal, confirmModal, editMode, createAlertBox, window */

var AOP = AOP || {};

AOP.contentAlerts = {};

(function ($) {

  var productCheckBoxes = '.check-alert';
  var DATA_ATTR_NAME_PROD_ID = 'data-prod-id';
  var DATA_ATTR_NAME_PROD_TYPE = 'data-prod-type';
  var DATA_ATTR_NAME_MNEMONIC = 'data-prod-mnemonic';
  var SERVICE_PREFIX = AOP.baseUrl + '/services/aop-cambridge-core/content-alerts';

  //var $alertsButton = $('.send-to-my-alerts');
  var openAlertModalButton = $('.add-alerts');
  var addSingleAlertButton = $('[data-content-alert]');
  var removeAllAlertsButton = $('.remove-all-alerts');
  var removeSingleAlertButton = $('.my-alerts .remove-single-alert');
  var saveSelectedAlertsButton = $('.save-selected-alerts');
  var searchAndFilterModal = $('#searchAndFilterModal');
  var productEntries = $('div.product-list-entry');
  var bulkSelector = $('#bulkSelector');
  var articleFreqSelectors = $('.article-frequency');


  var ProductTypeFriendlyNameMap = {
    ELEMENT: 'element',
    BOOK: 'book',
    BOOK_PART: 'chapter',
    JOURNAL: 'journal',
    JOURNAL_VOLUME: 'volume',
    JOURNAL_ISSUE: 'issue',
    JOURNAL_ARTICLE: 'article',
    PUBLISHER_SERIES_COLLECTION: 'collection',
    COLLECTION_COLLECTION: 'collection'
  };

  function _getAlertCount(alertCollection) {
    var alerts;
    var alertCount = 0;
    for (var alertType in alertCollection) {
      if (alertCollection.hasOwnProperty(alertType)) {
        alerts = alertCollection[alertType].product;
        alertCount += alerts.length;
      }
    }
    return alertCount;
  }

  function _isLoggedIn() {
    return $('meta[data-logged-in]').length >= 1;
  }

  function _getAttributeFilter(attributeName) {
    return function () {
      return $(this).get(0).hasAttribute(attributeName);
    };
  }

  function _getItemInputs() {
    return $('input[type="checkbox"]')
      .filter(_getAttributeFilter(DATA_ATTR_NAME_PROD_ID))
      .filter(_getAttributeFilter(DATA_ATTR_NAME_PROD_TYPE))
      .filter(_getAttributeFilter(DATA_ATTR_NAME_MNEMONIC));
  }

  function _getSelectedItemInputs() {
    return _getItemInputs().filter(':checked');
  }

  function _getCurrentPath() {
    return window.location.pathname + window.location.search;
  }

  function _buildAlertCollection($itemNodes) {

    var alertCollection = {};
    $itemNodes.each(function () {

      var $item = $(this);
      var itemType = ProductTypeFriendlyNameMap[$item.attr(DATA_ATTR_NAME_PROD_TYPE)];
      var itemProductId = $item.attr(DATA_ATTR_NAME_PROD_ID);
      var itemMnemonic = $item.attr(DATA_ATTR_NAME_MNEMONIC);

      alertCollection[itemType] = alertCollection[itemType] || {};
      alertCollection[itemType].product = alertCollection[itemType].product || [];

      alertCollection[itemType].product.push({
        productId: itemProductId,
        identifier: itemMnemonic,
        frequency: 'WEEKLY'
      });
    });

    return alertCollection;
  }

  /**
   * If the alert save was successful, hide the add button and replace it with the "already added" button state.
   * We use the buttonProductId to find the correct set of buttons to toggle. With companion journals there may be
   * two alert buttons. Need to make sure we target the right one.
   * @param savedResponse
   * @param buttonProductId
   * @private
   */
  function _toggleButtonState(savedResponse, buttonProductId) {

    if (savedResponse && buttonProductId) {
      var selector = '[data-prod-id=' + buttonProductId + ']';
      $(selector + '.alert-not-stored').hide();
      $(selector + '.alert-stored').show();
    }
  }

  function _saveSingleAlert(alertCollection, opts) {

    opts = opts || {};
    var service = SERVICE_PREFIX + '/save';
    var serviceSaveForLogin = SERVICE_PREFIX + '/save-for-login';

    var $loginModal = $('#login-modal');

    if (!_getAlertCount(alertCollection)) {
      createAlertBox(
        null, $('#ajaxMessages'), 'alert',
        'No content selected. Please select the content you would like to receive alerts for.'
      );
    } else {
      if (_isLoggedIn()) {
        $.post(service, {
          alerts: JSON.stringify(alertCollection),
          _csrf: $('input[name="_csrf"]').val()
        }).done(function (resp) {

          var userMessage = '';

          if (resp.data) {
            userMessage = resp.data.message;
          } else if (resp.error) {
            userMessage = resp.error.message;
          }

          createAlertBox(null,
            $('#ajaxMessages'),
            resp.success ? 'info' : 'alert',
            userMessage
          );
          _toggleButtonState(resp.success, opts.buttonProductId);
        });
      } else {
        // Temporarily store the selected alerts so we can save them when the user logs in. hide-for-small register
        $.post(serviceSaveForLogin, {
          alerts: JSON.stringify(alertCollection),
          sourceId: window.location.pathname,
          redirectUrl: _getCurrentPath(),
          _csrf: $('input[name="_csrf"]').val()
        }, function (result) {
          if (result.success) {
            // Set correct text on reusable login modal and reveal it
            var html = 'You need to be logged in to your Cambridge Core account in order to set content alerts. ';
            html += 'Don\'t have an account? <a href="' + AOP.baseUrl + '/register">Register for a free account now.</a>';
            $loginModal.find('.message')
              .html(html);
            $('.qtip').hide();
            $loginModal.foundation('reveal', 'open');
          } else {
            createAlertBox(null, $('#ajaxMessages'), 'alert', 'Error saving content alert');
          }
        });
      }
    }
  }

  function _saveSelectedAlerts(alertCollection, opts) {

    opts = opts || {};
    var service = SERVICE_PREFIX + '/save';

    if (!_getAlertCount(alertCollection)) {
      $('.alert-modal-warning').show();
    } else {
      //Session check server side
      $.post(service, {
        alerts: JSON.stringify(alertCollection),
        _csrf: $('input[name="_csrf"]').val()
      }).done(function (resp) {
        if (resp.error) {
          $('.alert-modal-warning').html(resp.error.message);
          $('.alert-modal-warning').show();
        } else {
          window.location.reload();
        }
      });
    }
  }

  function _runFilterQuery(container, searchText) {
    var showSelection = $(container);

    // Must at least have one alpha numeric character to perform a search
    if (searchText && /[a-z0-9]/.test(searchText)) {

      var filterFn = function (idx, el) {
        var haystack = $(el).data('searchable');

        if (haystack.indexOf(searchText) !== -1) {
          return true;
        } else {
          return false;
        }
      };

      showSelection = $(showSelection).filter(filterFn);
      $('.product-list-entry').addClass('hide');

    }

    $(showSelection).removeClass('hide');

    if ($(container).find(':visible').size() === 0) {
      $('.no-results').removeClass('hide');
    } else {
      $('.no-results').addClass('hide');
    }
  }

  function _resetFilterQuery() {
    //reset the search box (autocomplete="false" isn't reliable)
    searchAndFilterModal.val('');
    $(productEntries).removeClass('hide');
    $('.check-alert').prop('checked', false);
    $('.alert-modal-warning').hide();
  }

  function _toggleSelectProducts(input) {
    if (input.is(':checked')) {
      $(productCheckBoxes + ':visible').prop('checked', true);
    } else {
      $(productCheckBoxes).prop('checked', false);
    }
  }

  function _cleanUpPostRemoval() {

    $('.all-alerts-added').hide();
    $('.alerts-to-add-switcher').show();

    if ($('.content-item').length === 0) {
      $('.alerts-items-header').hide();
      $('.remove-all-alerts-layer').hide();
      $('.no-content-alerts').show();
    }
  }


  /**
   * Call to service to remove all alerts and update UI.
   */
  AOP.contentAlerts.removeAllAlerts = function () {

    var service = SERVICE_PREFIX + '/remove';
    $.post(service, {
      alerts: JSON.stringify({removeAll: true}),
      _csrf: $('input[name="_csrf"]').val()
    }).done(function (resp) {
      if (!resp.success) {
        createAlertBox(null, $('#ajaxMessages'), 'alert', resp.message);
      } else {
        $('.content-item').remove();
        $('.product-list-entry').show();
        _cleanUpPostRemoval();
        createAlertBox(null, $('#ajaxMessages'), 'info', resp.message);
      }
    });
  };


  /**
   * Call to service to remove alerts and update UI.
   * @param {object} alerts - items for removal
   * @param {string} productType - the alert content type
   */
  AOP.contentAlerts.removeSingleAlert = function (alertData) {

    if (alertData) {
      var productType = alertData[0];
      var alertCollection = {
        productType: productType,
        productId: alertData[1]
      };

      var service = SERVICE_PREFIX + '/remove';
      $.post(service, {
        alerts: JSON.stringify(alertCollection),
        _csrf: $('input[name="_csrf"]').val()
      }).done(function (resp) {
        if (!resp.success) {
          createAlertBox(null, $('#ajaxMessages'), 'alert', resp.message);
        } else {
          $('#listing-prod' + alertCollection.productId).remove();
          $('#modal-prod' + alertCollection.productId).show();
          _cleanUpPostRemoval();
          createAlertBox(null, $('#ajaxMessages'), 'info', resp.message);
        }
      });
    }
  };


  AOP.contentAlerts.saveMultiple = function () {

    var selectedInputs = _getSelectedItemInputs();
    var alertCollection = _buildAlertCollection(selectedInputs);

    _saveSelectedAlerts(alertCollection);
  };


  AOP.contentAlerts.saveSingle = function (el) {
    el = !el ? $('[data-content-alert]').first() : el;
    var alertCollection = _buildAlertCollection(el);
    _saveSingleAlert(alertCollection, {buttonProductId: el.data('prodId')});
  };


  AOP.contentAlerts.forceQtip = function () {

    //Qtip can fire before journal content has loaded on WWP.
    //This function forces a loaded check on mouseover to ensure the tips are present

    $('#maincontent .listings').on('mouseover', 'a.render-as-qtip', function () {
      $(this).qtip({
        overwrite: false, // Make sure another tooltip can't overwrite this one without it being explicitly destroyed
        content: $(this).attr('data-hasqtip'),
        show: {
          ready: true // Needed to make it show on first mouseover event
        },
        position: {
          my: 'right center',
          at: 'left center',
        }
      });
    });

  };


  /**
   * Immediate call to update frequency
   * @param {object} alertToUpdate - item for update
   */
  AOP.contentAlerts.updateFrequency = function (alertToUpdate) {

    var service = SERVICE_PREFIX + '/update';
    if (alertToUpdate) {
      $.post(service, {
        alert: JSON.stringify(alertToUpdate),
        _csrf: $('input[name="_csrf"]').val()
      }).done(function (resp) {
        if (!resp.success) {
          createAlertBox(null, $('#ajaxMessages'), 'alert', resp.data.message);
        } else {
          createAlertBox(null, $('#ajaxMessages'), 'info', resp.data.message);
        }
      });
    }
  };




  $(function () {

    AOP.contentAlerts.forceQtip();

    // Add a single alert
    addSingleAlertButton.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      if($(this).hasClass('alert-disabled') === false ) {
        AOP.contentAlerts.saveSingle($(this));
      }
    });


    // Remove all alerts
    removeAllAlertsButton.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      AOP.confirmModal('Remove all your content alerts', 'Are you sure you want to remove all Cambridge Core alerts? Any previous alerts you added will be removed and you will no longer receive content alerts.', function (e) {
        AOP.contentAlerts.removeAllAlerts();
      });
    });


    // Remove a single alert
    removeSingleAlertButton.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      var alertData = $(this).attr('data-remove').split(':');
      var title =  $(this).attr('data-title');

      if (alertData.length === 2) {
        AOP.confirmModal('Remove alert', 'Are you sure you want to remove alerts for ' + title + '?', function (e) {
          AOP.contentAlerts.removeSingleAlert(alertData);
        });
      }
    });


    articleFreqSelectors.on('change', function () {
      var $item = $(this);
      var alertToUpdate = {
        productId: $item.attr(DATA_ATTR_NAME_PROD_ID),
        productType: $item.attr(DATA_ATTR_NAME_PROD_TYPE),
        frequency: $item.val()
      };
      AOP.contentAlerts.updateFrequency(alertToUpdate);
    });


    //Init searchbox functionality in alerts modal
    searchAndFilterModal.on('keyup', function (e) {
      var searchText = $(this).val().trim().toLowerCase();
      _runFilterQuery(productEntries, searchText);
    });


    bulkSelector.on('change', function () {
      _toggleSelectProducts($(this));
    });


    // Open the Add alerts modal
    openAlertModalButton.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      _resetFilterQuery();
      cmsModal(null, null, 'add-alerts-modal');
    });


    // Save selected alerts from modal and update UI
    saveSelectedAlertsButton.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      AOP.contentAlerts.saveMultiple();
    });

  });

} (jQuery));
