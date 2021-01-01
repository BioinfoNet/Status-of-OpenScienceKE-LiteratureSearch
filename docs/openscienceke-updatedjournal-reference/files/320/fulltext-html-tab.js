$(document).ready(function() {
	// SGM toggle highlighted text on full text.
   if($(".hiddenHighlight").length > 0) { 
      //if there is highlighted text
      //show the tool and set up a click handler
      $(".fullTextHighlight").css("display","block");
      $(".fullTextHighlight").click(function() {
         //console.log("clicked");
         var fullTextOption= $(this).hasClass("Show");
         //console.log(fullTextOption);
         if(fullTextOption === true) {
            $(this).parent().parent().find(".hiddenHighlight").addClass("jp-concept");
         } else {
            $(this).parent().parent().find(".jp-concept").removeClass("jp-concept").addClass("hiddenHighlight");
         }
      });
   } else {
      //if there is no highlighted text
      //do nothing the tool is hidden by default   
   }

   //
   // Two actions to support FullText in article and chapter...
   //
   
   $("body").on("click",".menuButton",function(){
        var parentContainer = $(this).parent(".sectionDivider").parent(".articleSection");
        var currentMenu = $(parentContainer).find(".dropDownMenu");
        $(currentMenu).slideToggle("slow");
        return false;
   });
   
   
   $("body").on("click",".menuLink", function(){
        $(".dropDownMenu").hide();
        return true;
   });
   
  if ($("#articlefulltext.active").length > 0) {
	  // Trigger the display of the text...
      $("#articlefulltext a").trigger("click");
   }

    //
    // As needed, retrieve the full text of an article, a chapter or contributors...
    //
    var numCount = 0; // needed to count clicks on the links to stop duplicate ahah calls when back button is clicked and tab called. Not great, revisit this more elegent
    $("#articlefulltext a").on( "click", function(){

    	// check if #itemFullTextId div exists, if not them removed the spinner and gives no full text message
    	// else it goes and get the full text.
    	      
    	// NEW - now getting the value from the data attribute
    	var fulltextCheck = $("div.itemFullTextHtml").data('fulltexturl');
    	// if ($("#itemFullTextId").length > 0) {   
    	
    	// NEW - and now check against data attribute
        if (fulltextCheck && fulltextCheck.length > 0) {   
        	numCount++;
        	//console.log("numCount = " + numCount);    	
        	if (numCount <= 1){
        		//console.log("renderFullTextHTML called");
        		renderFullTextHTML();
        	}else{
        		return true;
        	}
        	    	   
    	}else{
    		// Remove the spinning icon...
            $(".itemFullTextLoading").html("No full text exists for this article.");
    	}
    });
    
    
    
    $("#supplements a").on( "click", function(){
        var thisLink =  $(this);
        //notice the NOT
        if (!thisLink.hasClass("ajaxTrigged")){
            thisLink.addClass("ajaxTrigged"); // this ensures the ajax request is only triggered once
            
            var suppTabContent = thisLink.parents(".transformer-tabs").next("#tabbedpages").children(".supplements");
            var ajaxURL = suppTabContent.data("ajaxurl");
            
            //necessary hack for dev!
            var hiddenContext = $('#hiddenContext').text();
            if (hiddenContext) {
                ajaxURL = hiddenContext + ajaxURL;
            }
            
            
            
            if (ajaxURL){
            
                $.ajax({
                    type   : "GET",
                    url    : ajaxURL,
                    success: function(resp){
                        suppTabContent.find(".loading-message").replaceWith(resp);
                    },
                    error: function(resp){
                        console.log("ajax call fails for url:" + ajaxURL );
                        suppTabContent.find(".loading-message").remove();
                    }
                });
            } else {
                console.log("ajax url missing! please check DOM! AJAX variable URL value is:" + ajaxURL);
                suppTabContent.find(".loading-message").remove();
            }
            
        }
       
    });
    
    $("#dataandmedia a").on( "click", function(){
        var thisLink =  $(this);
        //notice the NOT
        if (!thisLink.hasClass("ajaxTrigged")){
            thisLink.addClass("ajaxTrigged"); // this ensures the ajax request is only triggered once
            
            var figuresTabContent = thisLink.parents(".transformer-tabs").next("#tabbedpages").children(".dataandmedia");
            var ajaxURL = figuresTabContent.data("ajaxurl");
            
            //necessary hack for dev!
            var hiddenContext = $('#hiddenContext').text();
            if (hiddenContext) {
                ajaxURL = hiddenContext + ajaxURL;
            }

            
            if (ajaxURL){
            
                $.ajax({
                    type   : "GET",
                    url    : ajaxURL,
                    success: function(resp){
                        figuresTabContent.find(".loading-message").replaceWith(resp);
                    },
                    error: function(resp){
                        console.log("ajax call fails for url:" + ajaxURL );
                        figuresTabContent.find(".loading-message").remove();
                    }
                });
            } else {
                console.log("ajax url missing! please check DOM! AJAX variable URL value is:" + ajaxURL);
                figuresTabContent.find(".loading-message").remove();
            }
            
        }
       
    });
    
 function renderFullTextHTML(){
  if( $(".itemFullTextHtml").hasClass("retrieveFullTextHtml") ) {
	  // var fulltextUrl = $(".itemFullTextHtml").html();      
	  // NEW - now getting url from Data attribute
	  var fulltextUrl = $(".itemFullTextHtml").data('fulltexturl');
	  	  
            fulltextUrl = fulltextUrl.replace(/&amp;/g,"&");
            //console.log("Fulltext URL Stage 1: " + fulltextUrl);
            $("#itemFullTextId").empty();
            var docserverReq = "";
            
            //
            // A full jQuery AJAX call is made to allow for different callbacks for success and failure...
            //
            $.ajax({
                type   : "GET",
                url    : fulltextUrl,
                success: function(resp){
                    docserverReq = resp;
                    var a = $('<a>', { href:docserverReq } )[0];
                    var dsUrl = a.pathname + a.search;
                    if ( ! dsUrl.match(/^\//)) {
                        dsUrl = "/" + dsUrl;
                    }
                    //console.log("Fulltext URL Stage 2: " + resp);
                    $.ajax({
                        type   : "GET",
                        url    : dsUrl,
                        success: function(ftresp){
                            $(".itemFullTextHtml").removeClass("retrieveFullTextHtml");
                            $(".itemFullTextHtml").removeClass("hidden-js-div");
                            $(".itemFullTextHtml").html();

                            // Remove the spinning icon...
                            $(".itemFullTextLoading").remove();
                                
                            var container = document.getElementById('itemFullTextId');
                            var ajaxNode  = document.createElement('span');
                            ajaxNode.innerHTML = ftresp;
                            container.insertBefore(ajaxNode, container.firstChild);
//                            var mathscript = document.createElement("script");
//                            mathscript.type = "text/javascript";
//                            mathscript.src  = "/js/jp/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full";
//
//                            var config = 'MathJax.Hub.Startup.onload();';
//
//                            if (window.opera) {
//                                mathscript.innerHTML = config;
//                            } else {
//                            	mathscript.text = config;
//                            }
//
//                            container.insertBefore(mathscript, container.firstChild);
                            if(MathJax){
    	                        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                            }
                            else{
                            	myVar = setInterval(function(){
                					if(MathJax){
                						MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                						clearInterval(myVar);
                					}
                				}, 1000);
                            }
                            
                            // Now try and load in the Reference Matches...
                            // fetchReferenceMatches() is in referencematching.js

                            var itemWebId = $("#itemWebIdForRefs").text();

                            // If there are no references then this will not be loaded, so check before calling...

                            if (typeof fetchReferenceMatches === "function") {
                                fetchReferenceMatches(itemWebId, "fulltext");
                            }
                            
                            /* now replace the supp data section */
                            if($('a#supplementalmaterial-1').length > 0){
                            	if($('ul#SuppDataIndexList').length > 0){
                                	var styledSuppData = $('ul#SuppDataIndexList').clone();
                                	$('a#supplementalmaterial-1').parent().parent().parent().nextAll().remove(); 
                   	              $('a#supplementalmaterial-1').parent().parent().parent().after(styledSuppData);
                           		
                            	}
                            }
                            /*hack to move headings with class "t1-default" inside there adjacent sibling paragraph where it exists*/
                            $('#itemFullTextId #article-level-0-front-and-body > .articleSection .tl-default').each(function () {
                                var $this = $(this);
                                var adjacentSiblingParagraph = $this.next("p");
                                if (adjacentSiblingParagraph.length > 0) {
                                    var c_b_headsheading = $this.clone();
                                    adjacentSiblingParagraph.prepend(c_b_headsheading);
                                    $this.remove();
                                }
                            });
                            
                            
                        },
                        error  : function(ftresp){
                            $("#itemFullTextId").html("The full text of this article is not currently available.").removeClass("hidden-js-div");
                            var cMsg = "'fulltext' AJAX GET (Stage 2) to '" + resp + "' failed: " + ftresp.status + " (" + ftresp.statusText + ")";
                            //console.log(cMsg);

                            // Remove the spinning icon...
                            $(".itemFullTextLoading").remove();
                        }
                    });
                },
                error  : function(resp){
                    $("#itemFullTextId").html("The full text of this article is not currently available.").removeClass("hidden-js-div");
                    var cMsg = "'fulltext' AJAX GET (Stage 1) to '" + fulltextUrl + "' failed: " + resp.status + " (" + resp.statusText + ")";
                    //console.log(cMsg);

                    // Remove the spinning icon...
                    $(".itemFullTextLoading").remove();
                }
            });
        }
    }
    
   // magazine article page  fulltext should be rendered on page load 
    $('#magazinearticlefulltext a').trigger('click');

});

//
// This next function is invoked from within the files containing the figures and tables...
//
function popupImage(filename) {
    //
    // Use the same proportions as the dialog box
    //
    var w_width  = $(window).width()  * 0.8;
    var w_height = $(window).height() * 0.8;
    var w_params  = "menubar=no,width=" + w_width + ",height=" + w_height + ",toolbar=no,resizeable=yes,scrollbars=yes"; 
    window.open(filename, "figWindow", w_params);
}
