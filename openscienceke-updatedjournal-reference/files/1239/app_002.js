var AOP = AOP || {};

AOP.easybib = {
  // Services
  SERVICE_URL_CITE: AOP.baseUrl + '/services/aop-easybib/cite',
  SERVICE_URL_EXPORT: AOP.baseUrl + '/services/aop-easybib/export',
  // Easybib widget form base url
  FORM_BASE_URL_EASYBIB: 'http://www.easybib.com/cite',
  FORM_EASYBIB_ID: 'easybibCitation',
  EASYBIB_MODAL_ID: 'easybib-warning-modal',
  EASYBIB_MAX_EXPORT: 20,
  // Classes
  CITATION_TOOL_MODAL_ID: 'exportCitation',
  CITATION_UI_CLASS: 'citation-ui',
  PRODUCT_BUTTON_CLASS: 'export-citation-product',
  COMPONENT_BUTTON_CLASS: 'export-citation-component',
  COMPONENT_LIST_BUTTON_CLASS: 'export-citation-list',
  CITATION_EXPORT_OPTIONS_CLASS: 'citation-export-options',
  COPY_CITATION_ID: 'copyCitationData',
  CITATION_DATA_DISPLAY_ID: 'citationDataDisplay',
  CITATION_HTML_TEXT_ID: 'citationText',
  CITATION_STYLE_INPUT_ID: 'citationStyle',
  EASYBIB_DATA_ID: 'easybibData',
  // Cookie settings
  COOKIE_NAME: 'CORE_CITATION_STYLE',
  COOKIE_EXPIRES: 365,
  // Kill switch
  SHOULD_USE_CITATION_TOOL: AOP.shouldUseCitationTool || true,
  // Defaults
  DEFAULT_CITATION_STYLE: {
    KEY: 'apa',
    DISPLAY: 'APA'
  },
  SITE_URL: window.location.protocol + '//' + window.location.host,
  // Key codes
  KEYCODE_DOWN_ARROW: 40,
  KEYCODE_UP_ARROW: 38,
  KEYCODE_TAB: 9,
  KEYCODE_RETURN: 13,
  KEYCODE_SHIFT: 16,

  keyDownTimeout: false,
  initialised: false,
  productIds: [],
  productData: false,
  productDataForEasybibExport: false,
  shiftKeyPressed: false,
  reviewTitle: false,
  reviewDoi: false,
  reviewerFirstName: false,
  reviewerLastName: false,
  prevButton: false,


  // We can only generate a citation for the following product types
  // Product types are being repeated as the My Core Bookmarks page uses different type keys (the lower case ones).
  validProductTypes: ['JOURNAL_ARTICLE', 'BOOK_PART', 'BOOK', 'ELEMENT', 'book', 'chapter', 'article', 'element'],
  invalidProductsSelected: false,

  $exportCitationTool: null,
  $citationUi: null,
  $loader: null,
  $citationStyleKeyHiddenInput: null,
  $citationStyleInput: null,
  $citationSelectedStyle: null,
  $citationExportOptions: null,
  $citationStyleList: null,
  $clearCitationStyleButton: null,
  $changeCitationStyleButton: null,
  $citationStyleSearch: null,
  $citationData: null,
  $citationDataDisplay: null,
  $citationsNotFound: null,
  $citationsFound: null,
  $easybibForm: null,
  $easybibWarningModal: null,
  $copyToClipboardMessageForSr: null,

  messages: {
    error: 'Could not export the citation. Please <a href="' + AOP.baseUrl + '/contact">contact customer services</a>.',
    noContent: 'No content selected. Please select items you would like to export a citation for.',
    copyText: 'Copying text is not supported in this browser',
    citationToolSwitchOff: 'Apologies, this service is temporarily unavailable. We are working to restore this as soon as possible.',
    invalidProductsSelected: 'A citation could not be generated for these products. Citations can only be generated for articles, books or chapters.'
  },

  /**
   * Create the citation tool modal and add it to the DOM
   */
  initContainer: function () {
    var _self = this;
    _self.$exportCitationTool = $('#' + _self.CITATION_TOOL_MODAL_ID);
    if (_self.$exportCitationTool.length === 0) {
      var container = '';
      container += '<div id="' + _self.CITATION_TOOL_MODAL_ID + '" class="reveal-modal medium" data-reveal role="dialog" aria-labelledby="exportCitationModalHeader" aria-describedby="exportCitationModalDescription">';
      container += '<input id="citationStyleKey" type="hidden" value="">';
      container += '<div class="header">';
      container += '<h1 class="heading_07" id="exportCitationModalHeader">' + AOP.translate('Citation Tools') + '</h1>';
      container += '<p id="exportCitationModalDescription">' + AOP.translate('Copy and paste a formatted citation or use one of the options to export in your chosen format') + '</p>';
      container += '</div>';
      container += '<div class="row wrapper no-padding-top">';
      container += '<div class="loader"><img src="/core/system/public/img/ajax_loader_gray_256.gif" alt=""><span role="alert" aria-live="polite">Loading citation...</span></div>';
      container += '<div class="small-12 columns content" style="display:none"></div>';
      container += '</div>';
      container += '<a href="#" class="close-reveal-modal" aria-label="Close Citation Tools"><span aria-hidden="true">×</span></a>';
      container += '</div>';
      $('body').append(container);
      _self.$exportCitationTool = $('#' + _self.CITATION_TOOL_MODAL_ID);
      _self.$loader = _self.$exportCitationTool.find('.loader');
    }
  },

  /**
   * Bind citation tool events
   */
  initEvents: function () {

    var _self = this;

    // Wrapper for all citation sections
    _self.$citationUi = $('.' + _self.CITATION_UI_CLASS);
    // The currently selected style
    _self.$citationSelectedStyle = $('#selectedStyle');
    _self.$changeCitationStyleButton = $('#changeStyle');

    _self.multilingualTranslation();

    // Citation search area
    _self.$citationStyleSearch = $('.citation-selection');
    _self.$citationsNotFound = $('#citationNotFound');
    _self.$citationsFound = $('#citationFound');
    _self.$clearCitationStyleButton = $('#clearCitationStyle');
    // Citation search input field and search listing results
    _self.$citationStyleInput = $('#' + _self.CITATION_STYLE_INPUT_ID);
    _self.$citationStyleList = $('#citationList');
    _self.$citationStyleKeyHiddenInput = $('#citationStyleKey');
    // Formatted citation results
    _self.$citationData = $('.citation-data');
    // Export citation options
    _self.$citationExportOptions = $('.' + _self.CITATION_EXPORT_OPTIONS_CLASS);
    // When the formatted citation is rendered
    _self.$citationDataDisplay = $('#' + _self.CITATION_DATA_DISPLAY_ID);
    // Easybib widget form
    _self.$easybibForm = $('#' + _self.FORM_EASYBIB_ID);
    // Easybib widget warning modal
    _self.$easybibWarningModal = $('#' + _self.EASYBIB_MODAL_ID);
    // Accessibility
    _self.$copyToClipboardMessageForSr = $('#clipboardAlertForSr');
    var $message = _self.$easybibWarningModal.find('.message');
    // Set message to show max number of products that can be cited at a time
    $message.html($message.html().replace(/#MAX#/g, _self.EASYBIB_MAX_EXPORT));

    /**
     * Reset citation search
     */
    function resetSearch(searchStr) {
      _self.$citationsNotFound.text('No matching citation styles found for ' + searchStr).hide();
      return _self.$citationStyleList.find('li:visible').attr('aria-hidden', true).hide();
    }

    // Search auto complete citation styles
    _self.$citationStyleInput.on('keyup', function (e) {

      var searchStr = $(this).val().toLowerCase();

      // Reset search keyboard timeout
      clearTimeout(_self.keyDownTimeout);

      // Add a short timeout to try and detect when a user has finished typing their search term, before
      // firing the search. This improves the experience for the accessible user, so it will (hopefully)
      // only read out the search result alert on search completion. Otherwise it is constantly searching
      // on each keypress and showing way too many alerts to the accessible user.
      _self.keyDownTimeout = setTimeout(function () {

        // Filter out all character that cause search issues
        searchStr = searchStr.replace(/["']/g, '').trim();
        if (searchStr.length >= 1) {
          _self.$citationsNotFound.hide();
          _self.$citationsFound.hide();
          resetSearch(searchStr).promise().done(function () {
            _self.$citationStyleList.find('li[data-citation-value*="' + searchStr + '"]')
              .attr('aria-hidden', false)
              .show()
              .promise()
              .done(function () {
                if (this.length === 0) {
                  _self.$citationsNotFound.show();
                }
                _self.$citationsFound.text(this.length + ' citation style' + (this.length > 1 ? 's' : '') + ' found matching ' + searchStr).show();
                _self.$citationStyleList.css({width: _self.$citationStyleInput.outerWidth()}).show();
              });
          });
        } else if (searchStr.length === 0) {
          resetSearch().promise().done(function () {
            _self.$citationStyleList.hide();
          });
        }

      }, 500);

    });

    // Select citation style
    _self.$citationStyleList.find('li').not('#citationNotFound').on('click', function (e) {
      e.preventDefault();
      _self.$clearCitationStyleButton.hide();
      var citationStyleKey = $(this).data('citationKey');
      var citationStyleName = $(this).text();
      // Update selected style on screen
      _self.$citationSelectedStyle.find('span')
        .attr('role', 'alert')
        .attr('aria-live', 'polite')
        .attr('aria-label', 'Citation style selected: ' + citationStyleName)
        .text(citationStyleName);
      // Update selected style hidden input
      _self.$citationStyleKeyHiddenInput.val(citationStyleKey);
      // Save preference
      _self.saveCookie(citationStyleKey, citationStyleName);
      // Clear the search and rebuild the citation with the new citation style
      resetSearch().promise().done(function () {
        _self.$citationStyleSearch.hide();
        _self.$citationStyleList.hide();
        _self.showLoader();
        _self.getCitation();
      });
    });

    _self.$clearCitationStyleButton.on('keydown', function (e) {
      var keyPressed = e.keyCode || e.which;
      if (keyPressed === 9) {
        e.preventDefault();
        // If tab pressed, while on clear citation style, navigate back to the close modal button.
        $('.close-reveal-modal').focus();
      }
    });

    // Clear citation style when searching, return back to selected style.
    _self.$clearCitationStyleButton.on('click', function (e) {
      e.preventDefault();
      _self.resetModalState();
      resetSearch();
      _self.$changeCitationStyleButton.focus();
    });

    // Show citation search section
    _self.$changeCitationStyleButton.on('click', function (e) {
      e.preventDefault();
      // Hide current citation style and export options
      _self.$citationSelectedStyle.hide();
      _self.$citationData.hide();
      _self.$citationExportOptions.hide();
      // Show search field
      _self.$citationStyleSearch.show();
      _self.$clearCitationStyleButton.show();
      _self.$citationStyleInput.show().val('').focus();
    });

    // Copy citation data to clipboard
    _self.$exportCitationTool.on('click', '#' + _self.COPY_CITATION_ID, function (e) {
      e.preventDefault();
      _self.clearMessages();
      var $button = this;
      var successMessage = 'The citation has been copied to your clipboard';
      // Remove background formatting, so this is not copied.
      _self.$citationDataDisplay.addClass('transparent');
      _self.copyRichText(_self.CITATION_HTML_TEXT_ID, function (err) {
        if (err) {
          _self.showMessage(err);
          _self.copyToClipboardAlertForSr(err);
        } else {
          _self.showMessage(successMessage, {alertType: 'info'});
          _self.copyToClipboardAlertForSr(successMessage);
        }
        // Add back background colour
        _self.$citationDataDisplay.removeClass('transparent');
        // Send focus back to clicked button
        $($button).focus();
      });
    });

    // Export citation data in selected format
    _self.$exportCitationTool.find('.export').on('click', function (e) {
      e.preventDefault();

      const $button = $(this);
      const type = $button.data('exportType') || false;
      const styleOverride = $button.data('styleOverride');
      const exportAction = $button.data('exportAction') || 'stream';

      if (!type) {
        _self.showMessage(_self.messages.error);
        return;
      }
      // Construct url
      const url = _self.SERVICE_URL_EXPORT +
        '/?exportType=' + type +
        '&productIds=' + _self.productIds.join(',') +
        '&citationStyle=' + (styleOverride || _self.getCurrentCitationStyle());

      // Send the data to a defined handler
      if (exportAction === 'thirdPartyExportService') {
        // Handle form post
        var handlerFn = _self.getExportHandler(type);
        if (!handlerFn) {
          return _self.showMessage(_self.messages.error);
        }
        handlerFn({exportUrl: url});
      } else {
        // Simply stream the file
        window.location = url;
      }

    });

    // Do the export to EasyBib after showing the warning modal
    _self.$easybibWarningModal.find('#continue-export').on('click', function (e) {
      e.preventDefault();
      _self.$easybibWarningModal.foundation('reveal', 'close');
      _self.$easybibForm.submit();
    });

    // On load, set the last used citation style.
    var citationStyle = _self.getSavedCitationStyle();
    _self.$citationStyleKeyHiddenInput.val(citationStyle.key);
    _self.$citationSelectedStyle.find('span').text(citationStyle.name);
  },

  multilingualTranslation: function () {
    var _self = this;
    var translateText = function (domObject) {
      var originalText = domObject.text();
      var translation = AOP.translate(originalText);
      return domObject.text().replace(originalText, translation);
    };
    _self.$changeCitationStyleButton.text(function () {
      return translateText($(this));
    });
    _self.$citationSelectedStyle.find('strong').text(function () {
      return translateText($(this));
    });
    $('#' + _self.COPY_CITATION_ID).text(function () {
      return translateText($(this));
    });
    $('#citation-export-options-heading-download').text(function () {
      return translateText($(this));
    });
    $('#citation-export-options-heading-export').text(function () {
      return translateText($(this));
    });
  },

  /**
   * Save preferred citation style in cookie
   * @param citationStyleKey
   * @param citationStyleName
   */
  saveCookie: function (citationStyleKey, citationStyleName) {
    var _self = this;
    $.cookie(_self.COOKIE_NAME, JSON.stringify({
      key: citationStyleKey,
      name: citationStyleName
    }), {expires: _self.COOKIE_EXPIRES, path: '/'});
  },

  /**
   * Get the saved citation style from cookie
   * @returns {{key: string, name: string}}
   */
  getSavedCitationStyle: function () {
    var citationStyle = $.cookie(this.COOKIE_NAME);
    // Set default if no cookie found
    var savedCitationStyle = {
      key: this.DEFAULT_CITATION_STYLE.KEY,
      name: this.DEFAULT_CITATION_STYLE.DISPLAY
    };
    // Set data if cookie found
    if (typeof citationStyle === 'string') {
      citationStyle = JSON.parse(citationStyle);
      savedCitationStyle = {
        key: citationStyle.key,
        name: citationStyle.name
      };
    }
    return savedCitationStyle;
  },

  /**
   * Attempt to copy the currently selected text to the clipboard
   * @param callback
   * @returns {*}
   */
  copyText: function (callback) {
    if (!document.execCommand) {
      return callback(new Error(this.messages.copyText));
    }
    if (!document.execCommand('copy')) {
      return callback(new Error(this.messages.copyText));
    }
    return callback();
  },

  /**
   * Attempt to copy the text in the target element to the clipboard, with HTML formatting.
   * @param elementId
   * @param callback
   * @returns {*}
   */
  copyRichText: function (elementId, callback) {
    const copyError = new Error(this.messages.copyText);
    if (!window.getSelection || !document.execCommand || !document.createRange) {
      return callback(copyError);
    }

    var range = document.createRange();
    // Focus on the element where we want to copy the text from
    $('#' + elementId).focus();

    try {
      // Clear selection (Chrome fails otherwise)
      window.getSelection().removeAllRanges();
      // Select the text in the element
      range.selectNode(document.getElementById(elementId));
      if (!range) {
        return callback(copyError);
      }
      try {
        window.getSelection().addRange(range);
      } catch (error) {
        return callback(copyError);
      }
      // Copy to clipboard
      if (!document.execCommand('copy')) {
        return callback(copyError);
      }
      // Clear selected text
      window.getSelection().removeAllRanges();
      return callback();
    } catch (error) {
      return callback(copyError);
    }
  },

  /**
   * Create a accessible alert for screen readers, on citation copy.
   * @param message
   */
  copyToClipboardAlertForSr: function (message) {
    // We have to clear/set the role, for the screenreader to pick this up, if it's clicked more than once.
    this.$copyToClipboardMessageForSr.attr('role', '').attr('role', 'alert').text(message);
  },

  /**
   * Simply open the citation tool modal
   */
  openModal: function () {
    this.clearMessages();
    this.$exportCitationTool.foundation('reveal', 'open');
  },

  /**
   * Simply close the citation tool modal
   */
  closeModal: function () {
    this.$exportCitationTool.foundation('reveal', 'close');
  },

  /**
   * Hide the loader
   */
  hideLoader: function () {
    this.$loader.hide();
  },

  /**
   * Show the loader
   */
  showLoader: function () {
    this.$loader.show();
  },

  /**
   * Clear the stored product data
   */
  clearProductData: function () {
    this.productData = false;
  },

  /**
   * Grab the current citation style
   * @returns {string}
   */
  getCurrentCitationStyle: function () {
    var savedCitationStyle = this.getSavedCitationStyle();
    return this.$exportCitationTool.find('#citationStyleKey').val() || savedCitationStyle.key;
  },

  /**
   * Get product data and the formatted citation
   */
  getCitation: function () {
    var _self = this;
    var cite = {
      citationStyle: _self.getCurrentCitationStyle(),
      initialised: _self.initialised,
      productIds: _self.productIds,
      productData: JSON.stringify(_self.productData)
    };

    if (_self.reviewTitle) {
      cite.reviewTitle = _self.reviewTitle;
      cite.reviewDoi = _self.reviewDoi;
      cite.reviewerFirst = _self.reviewerFirstName;
      cite.reviewerLast = _self.reviewerLastName;
    }

    $.post(_self.SERVICE_URL_CITE, cite).done(function (response) {
      var error = null;
      if (response.success) {
        // Store the current product data, we can re-use this if the user wants to change citation
        // format for the same product(s)
        if (response.productData) {
          _self.productData = !Array.isArray(response.productData) ? [response.productData] : response.productData;
          _self.productDataForEasybibExport = _self.formatForEasybib();
        }
      } else {
        error = new Error('Failed to get citation');
      }
      _self.updateInterface(error, response);
    });
  },

  /**
   * Return the first product if available
   * @returns {*|boolean}
   */
  getFirstProductId: function () {
    return this.productIds[0] || false;
  },

  /**
   * Return the first product id if available
   * @returns {*|boolean}
   */
  getFirstProduct: function () {
    return this.productData[0] || false;
  },

  /**
   * Build a standard core product url
   * @param productId
   * @returns {string}
   */
  buildProductUrl: function (productId) {
    return this.SITE_URL + '/core/product/' + productId;
  },

  /**
   * Return the desired handler to send the data somewhere.
   * @param handlerKey
   * @returns {*|boolean}
   */
  getExportHandler: function (handlerKey) {
    var _self = this;
    var exportHandlers = {
      refworks: function (opts) {
        if (!opts.exportUrl) {
          return _self.showMessage(_self.messages.error);
        }
        var $form = $('#exportRefworks');
        // Form data already populated, just re-submit.
        if ($form.find('textarea').text().length) {
          $form.submit();
          return;
        }
        $.get(opts.exportUrl).done(function (response) {
          if (!response.success || !response.data) {
            return _self.showMessage(_self.messages.error);
          }
          // Populate reform post
          $form.find('textarea').text(response.data);
          // Trigger the form submission
          $form.submit();
        });
      },
      easybib: function () {
        // If too many products have been selected, show a warning that the EasyBib widget has limits
        // on many products it can cite at a time.
        if (_self.productData.length > _self.EASYBIB_MAX_EXPORT) {
          _self.$easybibWarningModal.foundation('reveal', 'open');
        } else {
          _self.$easybibForm.submit();
        }
      },
      mendeley: function () {
        // Grab the current product id, build a product url and send to Mendeley web importer.
        // Mendeley only supports one product export at a time.
        const productId = _self.getFirstProductId();
        if (productId) {
          window.open('https://www.mendeley.com/import/?url=' + encodeURIComponent(_self.buildProductUrl(productId)));
        } else {
          _self.showMessage(_self.messages.error);
        }
      },
      citeulike: function () {
        // The CiteULike importer tool requires a DOI to be supplied to their importer tool. We get this from the
        // product data generated for the EasyBib service. The nested productData.doi.doi looks a little odd, but
        // that's the way it's required to be structured.
        // CiteULike only supports one product export at a time.
        const productData = _self.getFirstProduct();
        const productId = _self.getFirstProductId();
        if (productData || productId) {
          var url = '';
          // First check if we have a DOI value, this is the preferred way to export to CiteULike.
          if (productData && productData.doi) {
            url = productData.doi.doi;
          } else {
            // Fall back to using the product url. This currently fails as there is no “Cambridge Core” driver that
            // CiteULike can use to parse our web page, but it will at least open the CiteULike form.
            url = _self.buildProductUrl(productId);
          }
          window.open('http://www.citeulike.org/posturl?url=' + encodeURIComponent(url) + '&src=post_page');
        } else {
          _self.showMessage(_self.messages.error);
        }
      }
    };

    return exportHandlers[handlerKey] || false;

  },

  /**
   * Clear data in all third part export forms
   */
  resetExportHandlerForms: function () {
    $('#thirdPartyForms textarea').text('');
  },

  /**
   * Update the EasyBib form url and data
   */
  updateEasybibForm: function () {
    var $form = $('#' + this.FORM_EASYBIB_ID);
    var formUrlStub = '/bulk';
    var easyBibData = this.productDataForEasybibExport;
    // If it's a single product, set the correct end point and data
    if (easyBibData.length === 1) {
      easyBibData = easyBibData[0];
      formUrlStub = '/form';
    }
    // Set the form data to post
    $form.find('#' + this.EASYBIB_DATA_ID).val(encodeURIComponent(JSON.stringify(easyBibData)));
    // Set the form endpoint - single or bulk citation style
    $form.prop('action', this.FORM_BASE_URL_EASYBIB + formUrlStub);
  },

  /**
   * Take the generated product data, clone into new object with only the allowed keys. This data is
   * then supplied directly to the EasyBib citation widget.
   * http://developer.easybib.com/citation-formatting-api/formatting-api-populate-easybib-form-fields-with-citation-data/examples-cite-with-easybib-forms/
   * @returns {Array}
   */
  formatForEasybib: function () {
    var _self = this;
    var easyBibData = [];
    var disabledProperties = ['key', 'style'];
    var count = 0;
    _self.productData.forEach(function (product) {
      var newObj = {};
      Object.keys(product).map(function (key) {
        if (disabledProperties.indexOf(key) === -1) {
          newObj[key] = product[key];
        }
      });
      count++;
      // EasyBib can only cite up to N products at a time.
      if (count > _self.EASYBIB_MAX_EXPORT) {
        return false;
      }
      easyBibData.push(newObj);
    });
    return easyBibData;
  },

  /**
   * Render the citation data in the scrolling div
   * @param citationData
   */
  renderCitationData: function (citationData) {
    var _self = this;
    var citationDataDisplay = !Array.isArray(citationData) ? [{citation: citationData}] : citationData;
    citationDataDisplay = citationDataDisplay.map(function (obj) {
      return '<div>' + obj.citation + '</div>';
    }).join('');
    _self.$exportCitationTool.find('#' + _self.CITATION_HTML_TEXT_ID).html(citationDataDisplay).scrollTop(0);
  },

  /**
   * Update the user interface with new data or an error message
   * @param err
   * @param data
   */
  updateInterface: function (err, data) {
    var _self = this;
    _self.hideLoader();
    if (err) {
      _self.closeModal();
      _self.showMessage(_self.messages.error, {scroll: true, alertElement: $('#ajaxMessages')});
    } else {
      if (!_self.initialised) {
        // Populate modal with data and extra UI elements
        _self.$exportCitationTool.find('.content').html(data.html).show();
        _self.initEvents();
        _self.initialised = true;
      } else {
        _self.resetModalState();
      }
      // Render the citation data
      _self.renderCitationData(data.citationData);
      // Format product data to send directly to the EasyBib citation tool
      _self.updateEasybibForm();
      // If more than one product is selected, hide the export options that only support single product exports.
      _self.toggleMultiProductExportButtons();

      AOP.enableKeyboardAccess($('#' + _self.CITATION_TOOL_MODAL_ID));
    }
  },

  /*
   * For any selected components, return the all matching reference data.
   * @return {array}
   */
  getProductIds: function () {
    var _self = this;
    var selectedComponents = [];
    _self.invalidProductsSelected = false;
    $('input[name="productParts"]:checked').each(function () {
      if ($(this).is(':visible')) {
        if (_self.checkValidProductType(this)) {
          // Only add valid product types to our citation request list
          selectedComponents.push($(this).attr('data-prod-id'));
        } else {
          // Keep track if any invalid product types selected
          _self.invalidProductsSelected = true;
        }
      }
    });
    return selectedComponents;
  },

  /**
   * Check if we can generate a citation for the product type
   * @param item
   * @returns {boolean}
   */
  checkValidProductType: function (item) {
    return this.validProductTypes.indexOf($(item).data('prodType')) !== -1;
  },

  /**
   * Check if two arrays contain the same values
   * @param arr1
   * @param arr2
   * @returns {boolean}
   */
  arraysEqual: function (arr1, arr2) {
    var same = false;
    if (arr1.length === arr2.length) {
      // Provision assumption that they may be the same
      same = true;
      $.each(arr1, function (index, val) {
        if (arr2.indexOf(val) === -1) {
          // Match not found, fail it.
          same = false;
          return false;
        }
      });
    }
    return same;
  },

  /*
   * Show an error/info message
   * Wrapper for AOP.createAlertBox()
   */
  showMessage: function (errorMessage, opts) {
    opts = opts || {};
    opts.scroll = opts.scroll || false;
    opts.alertType = opts.alertType || 'error';
    opts.alertElement = opts.alertElement || (this.$exportCitationTool ? this.$exportCitationTool.find('#ajaxMessages') : $('#ajaxMessages'));
    AOP.createAlertBox(errorMessage || this.messages.error, opts);
  },

  /**
   * Clear any AOP alert messages
   */
  clearMessages: function () {
    this.$exportCitationTool.find('#ajaxMessages > .alert-box').remove();
  },

  /**
   * Test if the export citation button has been disable OR if the function has been disabled in the config
   * @param button
   * @returns {boolean}
   */
  checkEnabled: function (button) {
    var _self = this;
    var $button = $(button);
    var enabled = true;
    if ($button.hasClass('disabled')) {
      enabled = false;
    }
    if ($button.attr('data-export-citation-disabled') === 'true') {
      enabled = false;
      AOP.createAlertBox(_self.messages.invalidProductsSelected, {alertElement: $('#ajaxMessages')});
    }
    return enabled;
  },

  /**
   * Reset modal back to default state, with the the previously loaded data.
   */
  resetModalState: function () {
    this.$citationStyleSearch.hide();
    this.$citationStyleList.hide();
    this.$citationStyleInput.hide();
    this.$citationSelectedStyle.show();
    this.$citationExportOptions.show();
    this.$clearCitationStyleButton.hide();
    this.$citationUi.show();
  },

  /**
   * Reset the modal to loader state and create a new citation
   */
  loadNewCitation: function () {
    $('.' + this.CITATION_UI_CLASS).hide();
    this.showLoader();
    this.clearProductData();
    this.getCitation();
  },

  /**
   * Save the products for which to search and create a citation
   * @param productIds
   */
  setProductIds: function (productIds) {
    this.productIds = Array.isArray(productIds) ? productIds : [productIds];
  },

  /**
   * Toggle the visibility of export types that do not support more than one product at a time
   */
  toggleMultiProductExportButtons: function () {
    var $unsupportedMultiProductExportTypes = this.$citationExportOptions.find('[data-multi-product-export=false]');
    if (this.productIds.length > 1) {
      $unsupportedMultiProductExportTypes.hide();
    } else {
      $unsupportedMultiProductExportTypes.show();
    }
  },

  /**
   * Bind export citation buttons
   */
  initButtons: function () {

    var _self = this;

    function doSingleCitation(button) {
      if (_self.checkEnabled(button)) {
        const productId = $(button).data('prodId');
        if ($(button).hasClass('reviewer')) {
          _self.reviewTitle = $(button).attr('review-title');
          _self.reviewDoi = $(button).attr('review-doi');
          _self.reviewerFirstName = $(button).attr('reviewer-first-name');
          _self.reviewerLastName = $(button).attr('reviewer-last-name');
        } else {
          _self.reviewDoi = false;
          _self.reviewTitle = false;
          _self.reviewerFirstName = false;
          _self.reviewerLastName = false;
        }
        // Citation already generated, just open modal
        if (_self.productIds.length === 1 && _self.productIds.indexOf(productId) !== -1 && _self.prevButton === button) {
          _self.resetModalState();
        } else {
          _self.setProductIds(productId);
          _self.loadNewCitation();
          _self.resetExportHandlerForms();
        }
        if (_self.prevButton !== button) {
          _self.prevButton = button;
        }
        _self.openModal();
      }
    }

    // Product page main export citation function
    $('.' + _self.PRODUCT_BUTTON_CLASS).on('click', function (e) {
      e.preventDefault();
      doSingleCitation(this);
    });

    // Single component in a listing
    $('body').on('click', '.' + _self.COMPONENT_BUTTON_CLASS, function (e) {
      e.preventDefault();
      doSingleCitation(this);
    });

    // Multiple product citation
    $('.' + _self.COMPONENT_LIST_BUTTON_CLASS).on('click', function (e) {
      e.preventDefault();
      // Get all selected components
      const productIds = _self.getProductIds();
      // If only invalid product types have been selected, stop the citation and we can't generate one for the
      // selected type(s).
      if (_self.invalidProductsSelected && productIds.length === 0) {
        _self.showMessage(_self.messages.invalidProductsSelected, {scroll: true, alertElement: $('#ajaxMessages')});
        return;
      }
      // Check we have something to cite
      if (productIds.length === 0) {
        _self.showMessage(_self.messages.noContent, {scroll: true, alertElement: $('#ajaxMessages')});
        return;
      }
      // If there has been no change in the products selected, just open the modal.
      if (_self.arraysEqual(productIds, _self.productIds)) {
        _self.resetModalState();
      } else {
        _self.setProductIds(productIds);
        _self.loadNewCitation();
        _self.resetExportHandlerForms();
      }
      _self.openModal();
    });
  },

  /**
   * Add keyboard bindings for navigating around the search dropdown
   */
  initCitationSearchKeyboardAccess: function () {
    var _self = this;
    var $body = $('body');

    // Navigate straight to results list from search input, if the down arrow is pressed
    $body.on('keydown', '#' + _self.CITATION_STYLE_INPUT_ID, function (e) {
        if (e.keyCode === _self.KEYCODE_DOWN_ARROW) {
          if (_self.$citationStyleList.find('li.citation-style:visible').length) {
            e.preventDefault();
            $($('.citation-style:visible')[0]).find('a').focus();
          }
        } else if (e.keyCode === _self.KEYCODE_TAB) {
          e.preventDefault();
          _self.$clearCitationStyleButton.focus();
        }
    });

    $body.on('keyup', '#citationList a', function (e) {
      // Track modifier key no longer pressed
      _self.shiftKeyPressed = false;
    });

    $body.on('keydown', '#citationList a', function (e) {

      if (e.keyCode === _self.KEYCODE_SHIFT) {
        // Track modifier key pressed
        _self.shiftKeyPressed = true;
      }
      // Return key is used on other bindings to select the new citation style.
      if (e.keyCode === _self.KEYCODE_RETURN) {
        return;
      }
      e.preventDefault();
      // If Shift key press, go to back to search input
      if (e.keyCode === _self.KEYCODE_TAB) {
        if (_self.shiftKeyPressed) {
          _self.$citationStyleInput.focus();
        } else {
          // If Shift key NOT pressed, go to clear search element
          _self.$clearCitationStyleButton.focus();
        }
      }
      // Go to next item
      if (e.keyCode === _self.KEYCODE_DOWN_ARROW) {
        var $nextItem = _self.goToCitationStyle($(this).parent(), 'next');
        if ($nextItem) {
          $nextItem.focus();
        }
      }
      // Go to previous item
      if (e.keyCode === _self.KEYCODE_UP_ARROW) {
        var $prevItem = _self.goToCitationStyle($(this).parent(), 'previous');
        if ($prevItem) {
          $prevItem.focus();
        }
      }
    });
  },

  /**
   * Get next/previous available citation style
   * @param $current
   * @param direction
   * @returns {{length}|*|*}
   */
  goToCitationStyle: function ($current, direction) {
    var $sibling = direction === 'next' ? $current.next() : $current.prev();
    var $citationStyle = $sibling.find('a');
    if (!$citationStyle.length) {
      return;
    }
    if ($citationStyle.length === 1 && $citationStyle.is(':visible')) {
      return $citationStyle;
    }
    return this.goToCitationStyle($citationStyle.parent(), direction);
  },

  /**
   * If export citation tool has been turned off, bind all buttons to the relevant message.
   */
  disableTool: function () {
    var _self = this;
    var buttons = [
      _self.PRODUCT_BUTTON_CLASS,
      _self.COMPONENT_BUTTON_CLASS,
      _self.COMPONENT_LIST_BUTTON_CLASS
    ];
    $.each(buttons, function (key, button) {
      $('body').on('click', '.' + button, function (e) {
        e.preventDefault();
        _self.showMessage(_self.messages.citationToolSwitchOff, {scroll: true});
      });
    });
  },

  /**
   * Initialise the citation tool & bind button events.
   */
  init: function () {
    var _self = this;
    $(document).ready(function () {
      // If export citation tool has been turned off, bind all buttons to the relevant message.
      if (!_self.SHOULD_USE_CITATION_TOOL) {
        _self.disableTool();
        return;
      }
      // Create the modal and add to DOM
      _self.initContainer();
      // Bind buttons
      _self.initButtons();
      // Bind keyboard access
      _self.initCitationSearchKeyboardAccess();

    });
  }

};

AOP.easybib.init();
