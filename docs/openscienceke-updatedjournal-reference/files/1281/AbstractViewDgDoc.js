document.observe("dom:loaded", function() {

	var print = document.URL.toQueryParams().print;
	if (print == 'pdf') {
		var fullUrlStart = window.location.href.toString().split(window.location.host)[0] + window.location.host;
		$$('a').each(function(item) {
			if (item.offsetWidth > 0 && item.offsetHeight > 0) {
				var href = item.getAttribute('href');
				if (href.startsWith && !href.startsWith('http')) {
					if (href.startsWith('/')) {
						href = fullUrlStart + href;
					} else {
						href = fullUrlStart + '/' + href;
					}
					item.setAttribute('href', href);
				}
			}
		});
	}


	
	// FOR AN UPDATED METHODOLOGY, SEE
	$$('.externalPopup').invoke('observe', 'click', function(event) {
		// FUTURE REFERENCE:
		// If we ever need to know the natural height/width of the img:
		// https://developer.mozilla.org/en/DOM/window.screen
		// http://www.jacklmoore.com/notes/naturalwidth-and-naturalheight-in-ie
		var link = $(this),
		target = (link.target ? link.target : "_blank"), // use the target if it is defined... otherwise use _blank... this will allow for popups to not open multiple times when unnecessary
		wl = window.location,
		nW = screen.availWidth,
		nH = screen.availHeight,
		oURL = wl.protocol + '//' + wl.host + link.readAttribute('href'),
		left,
		top,
		width,
		height;
		if(link.href.match(/footnote/g)) {
			left = nW/3;
			top = nH/3;
			width = nW*0.25;
			height = nH*0.25;
		} else {
			left = nW/4;
			top = nH/4;
			width = nW*0.5;
			height = nH*0.5;
		}
		window.open(oURL, target, "dependent=yes,location=no,addressbar=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,left="+left+",top="+top+",width="+width+",height="+height);
		event.stop();
	});
	
	$$('.videoGroup .flowplayer').each(function(element) {
		flowplayer(element, "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf", {clip:{autoPlay: false}});
	});
	
	addAbstractPopupHandlers();

	//FIXME: it'd be better to have one click observer on .footnoteGroup, which handles both cases below. Eg:
	// $$('.footnoteGroup').invoke('observe', 'click', function(event) { var el = event.target; if(target.hasClassName("footnote") { /* do stuff here */ }
	$$('.footnoteGroup .footnote').invoke('observe', 'click', function(event) {
		var el = $(this),
		tooltip = el.next();
		// TODO: tooltip.toggle() should do the same thing
		if(tooltip.style.display === 'block') {
			tooltip.style.display = 'none';
		} else {
			tooltip.style.display = 'block';
		}
		event.stop();
	});
	$$('.footnoteGroup .tooltip .close').invoke('observe', 'click', function(event) {
		$(this).up().up().style.display = 'none'; // TODO: $(this).up(2).hide() should do the same thing
	});

    $$('.moduleShut').each(function(e) {
        if(Selector.findChildElements(e, [".highlight", ".hi"]).length !== 0) {
            e.className = "module moduleOpen";
        }
    });
    
	// DG-1782: ensure MathJax has finished rendering when printing a PDF
	// Adapted from http://stackoverflow.com/questions/40669585/how-can-i-force-phantomjs-to-wait-until-mathjax-is-finished
	// Using a timeout because, in Dev, the mathJaxEnabled variable is turning out false.
	setTimeout(function() {

		// Only wait for MathJax if it was actually included in the page.
		var mathJaxEnabled = "undefined" !== typeof MathJax;
		
		function handleMathJax(message) {
			var usageLoggingDiv = jQuery('usageLoggingDiv');
			if (usageLoggingDiv != null) {
				usageLoggingDiv.append('mathJaxEnabled : ' + mathJaxEnabled)
			}
			// No matter what happened, MathJax finishing or timing out,
			// we consider it done. 
			window.status = "MathJaxDone";
			// console.log('handle ' + message);
		};
		
		if (mathJaxEnabled) {
			MathJax.Hub.Queue(
				["Typeset",MathJax.Hub],
	      		[handleMathJax,'MathJaxDone']
	    	);
			setTimeout(function () { handleMathJax("MathJaxTimeout")}, 30000); 
		}
		else {
			handleMathJax("MathJaxDone");
		}
	}, 3000);   

//	if($('formats')) {
//		$('formats').hide();
//
//		$('seeAllFormats').observe('click', function(event){
//				if ($('formats').visible()) {
//					$('formats').hide();
//				} else {
//					$('formats').show();
//				}
//		});
//	}
});

function addAbstractPopupHandlers() {
//	// show popups on mouseover on a result title link
//	if($('mvwTitle0')) {
//		$('mvwTitle0').observe("mouseover", function(event) {
//			showAbstractPopup( event.findElement() , event);
//			event.stop();
//		});
//	}
}

function showAbstractPopup(el, ev) {
	var content = $("popupShow").readAttribute('href');
	var t_el = $(el);
	var abstractPopup = $T(t_el).abstractPopup;
	if (! abstractPopup) {
		abstractPopup = new Popup(t_el, content, popupOptions);
		$T(t_el).abstractPopup = abstractPopup;
	}
	abstractPopup.show(ev);
	abstractPopup.reposition(ev);
}

function hideToggleBox(){
    alert("Hide toggle box called");
}

function toggleNextUl(element) {
	if (element.innerHTML == " [+] ") {
		element.innerHTML = " [-] ";
		element.next("ul").show();
	} else {
		element.innerHTML = " [+] ";
		element.next("ul").hide();
	}
}

var popupOptions = {showOnClick:false, linkOnDblClick:false, showOnMouseOver:true,//hideHover:true, 
		xAxisOffset: 0, yAxisOffset: 0, noCloseButton : true, dontFocusTargetOnClose : true};

var Popup = Class.create({
	/** content may be either an element or id which will be displayed in the popup or an absolute url to load via ajax. */
	initialize: function(target, content, options) {
		this.options = {
			delay: 0.4,		// mouseover delay in seconds
			title: null		// popup window title. defaults to the content of the trigger element.
		};
		
		this.target = $(target);
		
		if(!options.dontFocusTargetOnClose)
			linkToFocusOnClose = $(target);
		
		this.ajax = false;
		if (Object.isString(content) && (content.startsWith('http') || content.startsWith('/'))) {
			this.ajax = true;
			this.url = content;
		} else {
			this.content = content = $(content);
		}
		
		if (options)
			this.options = Object.extend(this.options, options);
		
		// only show popup if hovering for a certain delay
		var inst = this;
				
		if (!options.hideHover){//only For CrossReferencePopup
			var closeFunction = function() {
				
				function closePopupFunction() {
					inst.clearTimeout();
					if (!options.hideHover) {//only For CrossReferencePopup
						inst.close();
					}
					isShowCrossReferencePopup = false;
				}

				var appjsPopupTimer = setTimeout(closePopupFunction, 500);				
			}
			
			target.observe('mouseout', closeFunction);
			target.observe('blur', closeFunction);
		}
		
		Event.observe(document.onresize ? document : window, "resize", function() {
			if (window._active_popup)
				window._active_popup.reposition(null);
		});
	},
	
	clearTimeout: function() {
		
		// the following lines fail in ie6
		if(typeof document.body.style.minWidth == "undefined") { return false; }
		
		if ($T(this.target).handle)
			window.clearTimeout($T(this.target).handle);
		$T(this.target).handle = null;
		
	},

	/** Creates (if necessary) and displays the popup. */
	show: function(event) {
		
		this.clearTimeout();	// allows showing the popup manually rather than just on hover
		
		if (!this.popup) {
			// REFACTOR could probably build all the html at once and then update afterwards
			var popup = this.popup = new Element('div', {'class':'popup', style:'left: -9999px; position: absolute; z-index: 99997;'
				});//window._active_popup.close();
			$$('body').first().insert(popup);	// won't display (or give you a height) if it's not in the document
			
			var title = this.options.title;
			if (!title)
				title = this.target.innerHTML;
			//by default, don't display the top arrow; switching between above and below the target is left up to subclasses.
			//popup.insert('<div class="top"><h2>' + title + '</h2><span class="balloonArrow2" style="display:none"></span></div>');
			
			if (!this.options.noCloseButton) {
				var closeLink = new Element('a', {'class': 'close', onclick:'return false;', href:'#'});
			
				closeLink.update('<span>close</span>');
				closeLink.observe('click', this.close.bindAsEventListener(this));
				popup.insert(closeLink);
			}	

			//popup.insert('<div class="popupWindow"><div class="popupContent"></div></div><div class="bot"><span class="balloonArrow"></span></div>');
			//var popupContent = popup.down('.popupContent');
			var popupContent = popup; 
	
			if (this.content) {
				popupContent.update(this.content.innerHTML);
			} else {
				popupContent.update('<span class="loadingIcon"><span>Loading...</span></span>');
				// TODO hide the popup if the response came back in error
				var success = function(transport) {

					if(transport.responseJSON)
						popupContent.update(transport.responseJSON.content);
					
					else
						popupContent.update(transport.responseText);
						
					this.reposition(event);
				}.bind(this);
				Tapestry.ajaxRequest(this.url, success);
			}
		}
		
		// only one popup is allowed at a time
		if (window._active_popup)
			window._active_popup.close();
		window._active_popup = this;

		this.popup.setStyle({'left': '-9999px'});
					
		this.popup.show();
			
		this.reposition(event);
	},
	
	/** Repositions the popup. Should be called after content is updated.
	 * By default, positions the popup so the lower-left is directly above where
	 * the user triggered.
	 * event is the mouse event that trigger the popup to display.
	 */
	reposition: function(event) {
		var height = this.popup.getHeight();
		var targetOffset = this.target.cumulativeOffset();
		
		// ensure that popups are on-screen as much as possible
		var halfHeight = height = 0 ? height : height / 2;
		var top = targetOffset.top - halfHeight;
		var viewportOffset = this.popup.viewportOffset();
		var portionMissingOffTop = 0 - this.popup.viewportOffset().top;
		if (portionMissingOffTop > 0) {
			top = top + portionMissingOffTop;
		}
		if (event)
			var left = Math.max(0, event.pointerX());
		this.popup.setStyle({'top': '' + top + 'px', 'left': '' + (left + 10) + 'px'});
		
	},
	
	/** Hides the popup and returns focus to the link that opened it. */
	close: function() {
		if (window._active_popup == this)
			window._active_popup = null;
		
		if (this.popup)
			this.popup.hide();
		
		if (this.options.hideHover && linkToFocusOnClose) { 
			// not for cross ref popups
			$(linkToFocusOnClose).focus();
		}
	}
	
});