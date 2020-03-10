var AOP = AOP || {};

AOP.shareContent = {

  // Services
  SERVICE_CREATE_SHARE: AOP.baseUrl + '/services/platform-share-content/create',

  // Classes/IDs
  SHARE_MODAL_ID: 'shareProduct',
  PRODUCT_BUTTON_CLASS: 'share-product',
  COPY_SHARE_LINK: 'copyShareLink',
  SHARE_LINK_DISPLAY_ID: 'shareLinkDisplay',
  SHARE_LINK_DISPLAY_TEXT: 'shareLinkText',

  $shareTool: null,
  $loader: null,
  $modalContent: null,

  messages: {
    error: 'Could not share the content. Please <a href="' + AOP.baseUrl + '/contact">contact customer services</a>.',
    copyText: 'Copying text is not supported in this browser'
  },

  /**
   * Construct the share modal and add it to the page
   */
  initContainer: function () {
    var _self = this;
    _self.$shareTool = $('#' + _self.SHARE_MODAL_ID);
    var sharingPolicyLink = AOP.baseUrl + '/services/open-access-policies/social-sharing';
    if (_self.$shareTool.length === 0) {
      var container = '';
      container += '<div id="' + _self.SHARE_MODAL_ID + '" class="reveal-modal medium" data-reveal role="dialog" aria-labelledby="shareContentModalHeader" aria-describedby="shareContentModalDescription">';
      container += '<div class="header">';
      container += '<div class="heading_07" id="shareContentModalHeader">' + AOP.translate('Share content') + '</div>';
      container += '<p id="shareContentModalDescription">';
      container += AOP.translate('Anyone you share the following link with will be able to freely read this content') + '. ';
      container += AOP.translate('Copy and paste the link or use the option below to share it via email') + '. ';
      container += AOP.translate('Alternatively you can download a PDF containing the link which can be freely shared online') + '. ';
      container += AOP.translate('For more information, please') + ' ';
      container += '<a href="' + sharingPolicyLink + '" target="_blank">' + AOP.translate('view our content sharing policy') + '</a>.';
      container += '</p>';
      container += '</div>';
      container += '<div class="flash-message-container">';
      container += '<div class="flash-message">';
      container += '<div id="ajaxMessages" class="ajaxMessages"></div>';
      container += '</div>';
      container += '</div>';
      container += '<div class="row wrapper no-padding-top">';
      container += '<div class="loader"><img src="/core/system/public/img/ajax_loader_gray_256.gif" alt=""><span>' + AOP.translate('Sharing content') + '...</span></div>';
      container += '<div class="small-12 columns content" style="display:none"></div>';
      container += '<a href="#" class="close-reveal-modal" aria-label="' + AOP.translate('Close share content') + '"><span aria-hidden="true">×</span></a>';
      container += '</div>';
      container += '</div>';
      $('body').append(container);
      _self.$shareTool = $('#' + _self.SHARE_MODAL_ID);
      _self.$loader = _self.$shareTool.find('.loader');
      _self.$modalContent = _self.$shareTool.find('.content');
    }
  },


  /**
   * Initialise the share tool & bind events.
   */
  init: function () {
    var _self = this;
    $(document).ready(function () {
      // Create the modal and add to DOM
      _self.initContainer();
      // Init events
      _self.initEvents();
    });
  },

  /**
   * Bind share tool events
   */
  initEvents: function () {

    var _self = this;

    // Share button
    $('.' + _self.PRODUCT_BUTTON_CLASS).on('click', function (e) {
      e.preventDefault();
      _self.doShareAction(this);
    });

    // Copy share link to clipboard
    _self.$shareTool.on('click', '#' + _self.COPY_SHARE_LINK, function (e) {
      e.preventDefault();
      // Remove formatting for the DIV so we can select the contents for copying without styles
      var $shareLinkDisplay = $('#' + _self.SHARE_LINK_DISPLAY_ID);
      $shareLinkDisplay.addClass('copy-version');
      _self.copyText(_self.SHARE_LINK_DISPLAY_TEXT, function (err) {
        if (err) {
          _self.showMessage(err);
        } else {
          _self.showMessage(AOP.translate('The content link has been copied to your clipboard'), {alertType: 'info'});
        }
      });
      $shareLinkDisplay.removeClass('copy-version');
    });

    // Close modal
    _self.$shareTool.on('click', '#cancel', function (e) {
      e.preventDefault();
      _self.closeModal();
    });

  },

  /**
   * Reset modal state
   */
  resetModal: function () {
    this.$modalContent.html('').hide();
    this.showLoader();
  },

  /**
   * Get current article url, without the base url.
   * be added via service.
   * @returns {string}
   */
  getProductUrl: function () {
    return window.location.pathname;
  },

  /**
   * Generate the share link
   * @param button
   */
  doShareAction: function (button) {

    var _self = this;

    _self.resetModal();
    _self.openModal();

    const data = {
      productId: $(button).data('prodId'),
      productUrl: _self.getProductUrl(),
      _csrf: $('input[name="_csrf"]').val()
    };

    $.post(_self.SERVICE_CREATE_SHARE, data).done(function (response) {
      _self.hideLoader();
      if (!response.success) {
        const errorCode = (response.code && response.code > 0 ? ' (Error ' + response.code + ')' : '');
        _self.showMessage(_self.messages.error + errorCode);
      } else {
        _self.$modalContent.html(response.html).show();
      }

      _self.translateModal();
      // after loading modal content, call enableKeyboardAccess
      AOP.enableKeyboardAccess($('#' + _self.SHARE_MODAL_ID));
    });

  },

  translateModal: function () {
    var _self = this;

    var elementsToTranslate = [
      '#' + _self.COPY_SHARE_LINK,
      'div.share-link p.section-header',
      'p.section-header.margin-top-large',
      'div.or',
      '#emailButtonText',
      '#pdfButtonText',
      '#shareThisLinkHeadingText'
    ];

    elementsToTranslate.forEach(function (elementIdentifier) {
      var $element = $(elementIdentifier);
      $element.text(AOP.translate($element.text()));
    });
  },

  /**
   * Open the share tool modal
   */
  openModal: function () {
    this.$shareTool.foundation('reveal', 'open');
  },

  /**
   * Close the share tool modal
   */
  closeModal: function () {
    this.$shareTool.foundation('reveal', 'close');
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
   * Attempt to copy the text in the target element to the clipboard.
   * @param elementId
   * @param callback
   * @returns {*}
   */
  copyText: function (elementId, callback) {
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

  /*
   * Show an error/info message
   * Wrapper for AOP.createAlertBox()
   */
  showMessage: function (errorMessage, opts) {
    opts = opts || {};
    opts.scroll = opts.scroll || false;
    opts.alertType = opts.alertType || 'error';
    opts.alertElement = opts.alertElement || (this.$shareTool ? this.$shareTool.find('#ajaxMessages') : $('#ajaxMessages'));
    AOP.createAlertBox(errorMessage || this.messages.error, opts);
  }

};

AOP.shareContent.init();
