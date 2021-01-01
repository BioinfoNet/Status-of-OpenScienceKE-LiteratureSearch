document.observe("dom:loaded", function() {
	
	// need to make it so you can't double click on the link to get access via token - throws a 500 error
	var alreadyClicked = false;
	if ($("tokenAccess")) {		
		$("tokenAccess").observe("click", function(event) {
			
			if (alreadyClicked) {
				// it was already clicked once, so stop the event
				event.stop();	
			}
			
			// this was the first	 time clicking it, so set it as clicked
			alreadyClicked = true;
			
		})
	}
	
});