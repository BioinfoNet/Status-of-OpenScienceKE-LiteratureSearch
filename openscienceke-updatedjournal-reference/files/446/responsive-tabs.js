$(document).ready(function() {
		//responsive tabs API code.
	var Tabs = {

		  init: function() {
		    this.bindUIfunctions();
		    this.pageLoadCorrectTab();
		  },

		  bindUIfunctions: function() {

		    // Delegation
		    $(document)
		      .on("click", ".transformer-tabs a[href^='#']:not('.active, .disabled')", function(event) {
		        Tabs.changeTab(this.hash);
		        event.preventDefault();
		      })
		      .on("click", ".transformer-tabs a.active, .transformer-tabs a.disabled", function(event) {
		        Tabs.toggleMobileMenu(event, this);
		        event.preventDefault();
		      })
		     .on("click", ".textoptionsFulltext a.html:not('.disabled')", function(event) {		
					//console.log("tab?" + this.hash);
					event.preventBubble=true;
					 var anchorTab = Tabs.changeTab(this.hash);
					 anchorTab.trigger("click"); //trigger click event in this case it will be html fulltext.
					//event.preventDefault();        
				});	
		    
		  },

		  changeTab: function(hash) {
			 
		    var anchor = $(".transformer-tabs a[href='" + hash + "']");
		    
		    function displayTab(anchortab) {
		    	var url = anchortab.attr("href");
		    	//console.log("url" + url);
		    	var divtabContent = $(url);
		    	
			    // activate correct anchor (visually)
		    	anchortab.addClass("active").parent().siblings().find("a").removeClass("active");
		    	
		    	
			    // activate correct div (visually)
		    	divtabContent.addClass("active").siblings().removeClass("active");
			    
			    anchortab.closest("ul").removeClass("open");

			    
		    }
		    	displayTab(anchor);

		    // update history stack adding additional history entries.
		    
			    // pushState is supported!
				history.pushState(null, null,  hash);

		    
		    
		   //We also need to handle the backstate by telling the brower to trigger the tab behaviour!   
			$(window).on('popstate', function(e) {
			   anchor = $('[href="' + document.location.hash + '"]');
			   if (anchor.length) {
				   displayTab(anchor);
			   } else {
				  defaultAnchor =  $('.transformer-tabs li.active a');
				  displayTab(defaultAnchor);
			   }
		    });

		    // Close menu, in case mobile
		   
		    return anchor; // make property available outside the function

		  },

		  // If the page has a hash on load, go to that tab
		  pageLoadCorrectTab: function() {
			  //console.log("document.location.hash: " + document.location.hash);
			if   (document.location.hash.length > 0) {
			     var anchor = $(".transformer-tabs a[href='" + document.location.hash + "']");
			     if (!anchor.hasClass("disabled")) {
			         var anchorTab = this.changeTab(document.location.hash);
				 
				 
				     // this is a further amendment to allow the fulltext and 
				     //(any future event if its attached) to load when bookmarking a page with a particular tab. 
				     anchorTab.trigger("click");
				 }
			  }
		  },

		  toggleMobileMenu: function(event, el) {
		    $(el).closest("ul").toggleClass("open");
		  }

	}


	Modernizr.load([{
	//test
	test : Modernizr.history,
		//if yes then do nothing as nothing extra needs loading....
		
		//if no then we need to load the history API via AJAX
	nope : ['/js/sabinet/vendor/history.min.js'],
		
	complete : function() {
		
		var location = window.history.location || window.location; 
			Tabs.init();


	}


	}])

	//end of responsive tabs API code.
	});