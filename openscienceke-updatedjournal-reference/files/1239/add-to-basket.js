(function ($, AOP) {

  'use strict';

  var ADD_TO_CART_ANCHORS = 'a[data-kk-action="addToCart"]';
  var $cartItemCountContainer = $('.no-of-items');
  var buyPrintCopyButton = $('.buy-print-copy-btn');
  var basketItemIds = new Array(); // jshint ignore:line

  /**
   * Triggers an ajax request to the server to add an item to the basket
   *
   * @param productId
   * @param sku
   */
  function addToBasket(productId, sku) {

    function onSuccess() {
      var itemCount = getCartItemCount();
      itemCount = itemCount + 1;
      updateCartItemCount(itemCount);
      basketItemIds.push(productId);
    }

    function onError() {
      var $element = $('a[data-kk-action="addToCart"][data-product-id="' + productId + '"]');
      var $inBasketMessage = $element.parent().find('.inBasket');
      var $error = $element.parent().find('.errorAdding');
      $inBasketMessage.hide();
      $error.show();
      setTimeout(function restore() {
        $element.show();
        $error.hide();
      }, 2000);
    }

    $.post(AOP.baseUrl + '/shopping-cart/add', {
      productId: productId,
      sku: sku,
    }, onSuccess).fail(onError);
  }

  /**
   * Disable 'Add to cart' if item already in the basket
   */
  function labelAddedProducts() {
    var selector = $.map(basketItemIds, function (productId) {
      return new Array('a[data-kk-action="addToCart"][data-product-id="', productId, '"]').join(''); // jshint ignore:line
    }).join(',');
    $.each($(selector), function () {
      $(this).hide();
      $(this).parent().find('.inBasket').show();
    });
  }

  /**
   * Executed once the document loads
   *
   * Will bind an ajax request to "Add to cart" buttons
   */
  function initializeAddToCartHandlers() {
    $(document).delegate(ADD_TO_CART_ANCHORS, 'click', function () {
      var sku = $(this).data('productSku') || $(this).data('productId');
      var productId = $(this).data('productId');
      var $element = $('a[data-kk-action="addToCart"][data-product-id="' + productId + '"]');
      $element.hide();
      $element.parent().find('.inBasket').show();
      addToBasket(productId, sku);
      return false;
    });
  }

  /**
   * Returns number parsed from DOM
   *
   * @returns {Number}
   */
  function getCartItemCount() {
    // Call first() as there are 2 item counts - mobile and desktop.
    return parseInt($cartItemCountContainer.find('span').first().text());
  }

  /**
   * Updates cart item count in DOM
   *
   * @param value
   */
  function updateCartItemCount(value) {
    $cartItemCountContainer.html('( <span>' + value + '</span> )');
  }

  /**
   * Fetches count if cart items from the server.
   *
   * To be executed once the document loaded
   */
  function fetchCartItemCount() {
    $.get(AOP.baseUrl + '/shopping-cart/count', { '_': $.now()}, function (data) {
      updateCartItemCount(data.itemIds.length);
      basketItemIds = data.itemIds;
      labelAddedProducts();
    });
  }

  /**
   * Present confirm Modal before buy print copy redirection
   */
  function initializePrintCopyModal() {
    buyPrintCopyButton.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      var url = $(this).attr('href');

      var fnConfirm = function () {
        window.open(url, '_blank');
      };

      var message = 'To complete your purchase of print-on-demand copies, you will be directed to Sheridan Custom Publishing. ' +
        'Any items added to your basket for purchase on the Cambridge Core site will remain in your basket and can be purchased ' +
        'separately from print-on-demand purchases.';
      AOP.confirmModal(null, message, fnConfirm, null, {confirmLabel: 'Proceed'});
    });

  }

  initializePrintCopyModal();
  fetchCartItemCount();
  initializeAddToCartHandlers();

/* global AOP */
})(jQuery, window.AOP || {});
