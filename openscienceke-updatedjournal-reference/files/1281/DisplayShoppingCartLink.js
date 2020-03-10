document.observe("dom:loaded", function() {
	( $("cart") ).observe(Tapestry.ZONE_UPDATED_EVENT, function() { 
		
		( $("cart") ).setAttribute('data-updating', 'true');
		
		( $("cart") ).setAttribute('data-updating', 'false');
		
		$('cart').addClassName('open');
		$('topControls').addClassName('disableZ-index');
		
		$('closeCart').observe('click', function(evt) {
			if ($('cart').hasClassName('emptyCart')) {
				$("checkoutLink").show();
				$("cart").removeClassName('emptyCart');
				$("cart").addClassName('filledCart');
			}
			$('cart').removeClassName('open');
			$('topControls').removeClassName('disableZ-index');
			evt.stop();
		});
	});
	
	if ($('shoppingCartInfoLink')) {
		$('shoppingCartInfoLink').writeAttribute('onclick', 'return false;');
	}
});