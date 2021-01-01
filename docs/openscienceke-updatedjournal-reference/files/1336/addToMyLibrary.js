window.addToMyLibrary = function(ev, userId, abstractId, url, auth, isFav) {
		ev.preventDefault();
		var pos = url.indexOf("static");
		env = url.substring(0, pos);

		var sActionSend = 'https://' + url + '/cfc/webservices/briefcaseServices.cfc';	
		var message= "";
		var linkText = "";

		if (isFav) {
			var parameters = {
				"method" : "removeFavPaper",
				"user_id" : userId,
				"ab_id" : abstractId
			};
			window.pageDataTracker.trackEvent('conversionDriverClick', {conversionDriver:{name : 'article-page:remove-from-briefcase'}});
		} else {
			var parameters = {
				"method" : "addFavPaper",
				"user_id" : userId,
				"ab_id" : abstractId
			};
			message = "This article has been added to your library.";
			linkText = "Click here to view all your papers";
			window.pageDataTracker.trackEvent('conversionDriverClick', {conversionDriver:{name : 'article-page:add-to-my-briefcase'}});
		}

		var briefcaseUrl = "https://" + env + "hq.ssrn.com/Library/myLibrary.cfm"

		if (auth == false && userId == 1) {
			window.location = briefcaseUrl + "?abid="+ abstractId;
		} else {
			$.ajax({
				url : sActionSend,
				type: "POST",
				data : parameters,
				success: function(data, textStatus, jqXHR) {
					if(data.SUCCESS == true){
						if (parameters.method == "addFavPaper") {
							pageDataTracker.trackEvent('saveToList', { 
							    content : [{
							        id : abstractId
							    }]
							});
							window.showToastr({
								message: message,
								linkUrl: briefcaseUrl,
								linkText: linkText
							});
						}
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		}
	}