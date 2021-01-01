$('.js-related-content-load').click(function()  {
	var parentContainer = $(this).closest('li');
	
	    if (!$(this).hasClass('opened')) {
	        
	        $(this).addClass('opened');       
		var moreLikeThisContainer = parentContainer.find('.morelikethiscontainer');
 
         var morelikethisurl = $("#hiddenContext").text() + '/search/morelikethis';
         
         var pubrelatedcontentids = moreLikeThisContainer.children(".hiddenmorelikethisids").text();
         var webid = moreLikeThisContainer.children(".hiddenmorelikethiswebid").text();
         var fields = moreLikeThisContainer.children(".hiddenmorelikethisfields").text();
         var restrictions = moreLikeThisContainer.children(".hiddenmorelikethisrestrictions").text();
         var number = moreLikeThisContainer.children(".hiddenmorelikethisnumber").text();
         var numbershown = moreLikeThisContainer.children(".hiddenmorelikethisnumbershown").text();
         var data = {'pubrelatedcontentids': pubrelatedcontentids, 'webid': webid, 'fields': fields, 'restrictions': restrictions, 'number': number, 'numbershown': numbershown, 'fmt' : 'ahah'};
         
 
         
         if (fields && webid && number && numbershown){
             $.post(morelikethisurl, data, function(resp) {
                moreLikeThisContainer.children(".hiddenmorelikethisids").after(resp);
                moreLikeThisContainer.children(".fa-spinner").remove();
                ingentaCMSApp.displayElipsisDescription();
            
                // this is a check to see if the response attached OK if not we want to say a friendly message to the user.
                var responseAttached = moreLikeThisContainer.children(".listitemhorizontal");
                
                if (responseAttached.size() == 0) {
                   moreLikeThisContainer.siblings(".tocitem").show();
                   
                   var ahahUrl = $("#hiddenContext").text() + "/content/ahahbrowse",
                   
                   containerInner = "articleMetadata",
                   target = "articleMetadataInner",
                   title = "articleTitle";

                   ECApp.displayAccessIcons(containerInner, target, ahahUrl, title, "");
                   
                }
         }); 
             
         }
	    }
   
});
   
   