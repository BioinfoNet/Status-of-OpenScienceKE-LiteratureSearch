/**
 * Namespace for DG specific functionality to prevent conflicting
 */
var DG = {
	/**
	 * This references the current doc uri for any page
	 */
	currentDocUri: (function() { // self executing function
		// we are not manipulating the dom here, and this element should be available prior to the script, so we shouldn't have to run this after dom:loaded
		var c = $("currentDocUri");
		if(c && c.length > 0) {
			return c.readAttribute("content");
		}
		return null;
	})(),
		
	/**
	 * Handles all the Modules functionality
	 */
	Modules: {
		openClass: 'moduleOpen',
		shutClass: 'moduleShut',
		
		/**
		 * Return true when it was toggled to open, and false if shut
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to toggle its associated module
		 */
		toggle: function(win, module) {
			var Modules = win.DG.Modules; // local scope
			
			module = Modules.module(module); // make sure we have the module, not some child element 
			if(module.hasClassName(Modules.openClass)) {
				Modules.shut(module);
				return false;
			} else {
				Modules.open(module);
				return true;
			}
		}.curry(window),
		
		/**
		 * Shuts a module's sibling modules (and their children)
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to shut its associated sibling modules
		 */
		shutSiblings: function(win, module) {
			var Modules = win.DG.Modules; // local scope
			
			module = Modules.module(module); // make sure we have the module, not some child element
			var shutMe = module.up().select(".moduleOpen").each(function(Modules, module, elm) {
				//console.log("sibling shut: ", module,  elm);
				if (module != elm) {
					Modules.shut(elm);
				}
			}.curry(Modules, module));
			
		}.curry(window),
		
		/**
		 * Shuts a module
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to shut its associated module
		 * @return true if it was closed successfully
		 */
		shut: function(win, module) {
			if(!module) return;
			var Modules = win.DG.Modules; // local scope
			//console.log("shutting: ",  module);
			
			module = Modules.module(module); // make sure we have the module, not some child element
			if(module.hasClassName(Modules.openClass)) { // only want to fire the event when it actually changes
				module.removeClassName(Modules.openClass).addClassName(Modules.shutClass);
				module.fire("module:shut", {module:module}); // fire an event so actions can be taken
				return true;
			}
		}.curry(window),
		
		/**
		 * Opens a module
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to open its associated module
		 * @return true if it was opened successfully
		 */
		open: function(win, module) {
			if(!module) return;
			var Modules = win.DG.Modules; // local scope
			//console.log("opening: ", module);
			
			module = $(Modules.module(module)); // make sure we have the module, not some child element
			if(module && module.up) {
				var opened = Modules.open(module.up(".module")); // open all ancestor modules (they will be recursively called)
				if(opened || module.hasClassName(Modules.shutClass)) { 
					// only want to fire the event when it actually changes (either a parent, or this node was opened)
					module.removeClassName(Modules.shutClass).addClassName(Modules.openClass);
					module.fire("module:open", {module:module}); // fire an event so actions can be taken
					return true;
				}
			}
		}.curry(window),
		
		/**
		 * Returns the module for an element (either itself, or an ancestor, or null if it is not within a module)
		 * 
		 * @param the element to get the associated module for
		 */
		module: function(elm) {
			if(elm && !elm.hasClassName("module")) {
				//console.log("Finding Module: ", elm, elm.up(".module"));
				return elm.up(".module"); // make sure we are working with the module
			}
			return elm;
		},
		
		/**
		 * Adds the mousedown listener to the elements specified to handle opening and closing base on toggles
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param elms a(n) element to add a mousedown listener to that will toggle the module 
		 */
		addListener: function(win, elms) {
			if(!Object.isArray(elms)) {
				elms = new Array(elms); // turn into an array if it is not already
			}
			
			elms.invoke('observe', 'click', function(DG, evt) {
				var el = $(evt.target);
				if(el.hasClassName('stopToggle')) { return true; }
				var isOpen = DG.Modules.toggle(el),
					dataTextOpen = 'data-textopen',
					dataTextShut = 'data-textshut'
				if(isOpen && el.hasAttribute(dataTextOpen)) {
					el.innerHTML = el.readAttribute(dataTextOpen);
				} else if (!isOpen && el.hasAttribute(dataTextShut)) {
					el.innerHTML = el.readAttribute(dataTextShut);
				}
				
                // prevent selecting of the toggle... (which clicking more than once was causing)
				el.addClassName("unselectable");
				
				// invoke external complete callback when module has opened/closed
				(evt.onModuleComplete || Prototype.emptyFunction)();
			}.curry(win.DG));
			
		}.curry(window),
		
		/**
		 * Initializes the Module behavior on pages
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 */
		init: function(win) {
			// add listener that will invoke behavior for modules to open or close
			win.DG.Modules.addListener($$('.module .toggle'));

			elms = $$('.module');
			if (!Object.isArray(elms)) {
				elms = new Array(elms); // turn into an array if it is not already
			};
			
			// Initialize all toggles to be closed
			if ( ($$('.searchPage').length != 0) || ($$('.browsePage').length != 0) ) { 
				elms.each(function(elm) {
						win.DG.Modules.shut(elm);
					});
			}
			
		}.curry(window)
	},
	
	/**
	 * Initialization methods for DG
	 */
	Init: {
		/**
		 * Initializes DG features
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 */
		all: function(win) {
			var i = win.DG.Init; // local scope
			i.modules();
			console.log("Initializing Modules")
			// 'q_value' was the field which used to have the fake value of the quick search
			// input, but this was replaced by the use of the 'placeholder' attribute
		    // i.localizeQuickSearchField('q', 'q_value'); 
		    i.hashEvents();
		    $(win.document).fire("dg:loaded"); // fire this event so other features can know it is safe to load (see dgtoc.js for an example)
		}.curry(window),
		
		/**
		 * Initializes modules
		 */ 
		modules: function(win) {
			win.DG.Modules.init();
		}.curry(window),
		
		/**
		 * Setup quick search localization
		 */ 
		localizeQuickSearchField: function(fieldId, fieladValue) {
			var field = $(fieldId), // the quick search field
				value = field.value = $(fieladValue).innerHTML, // the quick search display value
				// a method to update the field text based on the value's input
				writeTextAndValue = function(e, testText, writeText) {
					if (e.value == testText) {
						e.value = writeText;
						e.writeAttribute('value', writeText);
					}
				}.curry(field),
				// a method that will reset the field text to be "clear" (aka empty)
				clearText = writeTextAndValue.curry(value, '');
			// stop observe events from app.js
		    Event.stopObserving(field, 'focus');
		    Event.stopObserving(field, 'blur');
		
		    field.observe('focus', clearText);
		    field.observe('blur', writeTextAndValue.curry('', value));
		
		    if (field.form) {
		        $(field.form).observe('submit', clearText);
		    }
		},

		/**
		 * Setups the handling of a new event type "hash:changed" that is cross-browser compatible
		 */ 
		hashEvents: function(win) {
			var doc = $(win.document), // local scope
				location = win.location, // local scope
				hashChanged = "hash:changed";
			
			// start monitoring for hash changes
			win.hashChangeTimer = null;
			if ("onhashchange" in win) { // if the onhashchange event exists, tweak it to 
				win.onhashchange = win.hashChangeTimer = function(doc, location) {
			        doc.fire(hashChanged, {hash: "" + location.hash});
			    }.curry(doc, location)
			} else { // event not supported:
				var storedHash = location.hash;
			    win.hashChangeTimer = win.setInterval(function (win, doc) {
					var hash = win.location.hash;
			        if (hash != storedHash) {
			            storedHash = hash;
			            doc.fire("hash:changed", {hash: "" + storedHash});
			        }
			    }.curry(win, doc), 100); // poll every 100 ms
			}
			
			var expandModule = function(win, DG) {
				var module,
					elm,
					shutModuleClass = '.moduleShut',
					hash = win.location.hash;
				
				// is there a hash? is the not hash empty?
				if(hash && !hash.empty()) {
					if(hash.startsWith("#")) {
						hash = hash.substring(1); // clean up to make consistent across all browsers
					}
					elm = $(hash); // find the element by id
					if(!elm) {
						// not found by id? find it by old-school <a name="">
						elm = $$("*[name=" + hash + "]").first();
						if(!elm) {
							return; // no matching elements could be found exit the function
						}
					}
					
					DG.Modules.open(elm); // opens all module up to the current element... 
					elm.scrollTo(); // scroll to the target element
				}
			}.curry(win, DG); // pass win and DG for local scope access
			
			doc.observe(hashChanged, expandModule); // observe hash future hash changes
			expandModule(); // execute it on DOM load as well, so if modules where closed, they will open
		}.curry(window)
	}
};

// setup the initialization
document.observe("dom:loaded", DG.Init.all);

// Cookie functions for use in db entries (and elsewhere)
// http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	var expires = ""
	if(days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*86400000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=",
		ca = document.cookie.split(';');
	for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}


(function($) {
	if(typeof DG === 'undefined') { DG = {}; }
	
	var FILTERS = DG.FILTERS = {
		init: function() {
			var navGroup = $('.js-faceted-nav'),
				navToggle = $('.js-faceted-nav-toggle'),
				navState = "open";

			if ((!navGroup.hasClass('shut')) && (!navGroup.hasClass('open'))) {
				navGroup.addClass(navState);
			}
			
			navToggle.click(function() {
				// DG-286 to get this to work with base app JS
				// we just need to add the "shut" class (to support existing button styling), as base app
				// has already toggled the "open" status
				// long-term probably better to remove this and get to work from base app code alone
				if (navGroup.hasClass('open')) {
					navGroup.removeClass('shut');
				} else {
					navGroup.addClass('shut');
				}
				return false;
			});
		}
	};

	$(function() {
		FILTERS.init();
	});

})
(jQuery);



(function($) {
	$(document)
			.ready(
					function() {

						// DG-2429
						jQuery('#pluspunkte a[href]')
								.each(
										function() {
											var t = jQuery(this);
											if (t.attr('href').indexOf('manuscriptcentral.com') >= 0) {
												t.attr('id', 'callForPapersLinkInsideOverviewSection')
											}
										});

						$(
								'.home .carouselFrame .inner, .page-mystuff .carouselFrame .inner')
								.slick({
									dots : true,
									infinite : false,
									speed : 300,
									slidesToShow : 5,
									slidesToScroll : 5,
									prevArrow : $('.prev'),
									nextArrow : $('.next'),
									dots : true,
									responsive : [ {
										breakpoint : 1200,
										settings : {
											slidesToShow : 4,
											slidesToScroll : 4
										}
									}, {
										breakpoint : 1000,
										settings : {
											slidesToShow : 5,
											slidesToScroll : 5
										}
									}, {
										breakpoint : 800,
										settings : {
											slidesToShow : 4,
											slidesToScroll : 4
										}
									}, {
										breakpoint : 600,
										settings : {
											slidesToShow : 3,
											slidesToScroll : 3
										}
									}, {
										breakpoint : 400,
										settings : {
											slidesToShow : 2,
											slidesToScroll : 2
										}
									}
									// You can unslick at a given breakpoint now
									// by adding:
									// settings: "unslick"
									// instead of a settings object
									]
								});

						$('.browseResults .carouselFrame .inner').slick({
							dots : true,
							infinite : false,
							speed : 300,
							slidesToShow : 2,
							slidesToScroll : 2,
							prevArrow : $('.prev'),
							nextArrow : $('.next'),
							dots : true,
							responsive : [ {
								breakpoint : 900,
								settings : {
									slidesToShow : 1,
									slidesToScroll : 1
								}
							}
							// You can unslick at a given breakpoint now by
							// adding:
							// settings: "unslick"
							// instead of a settings object
							]
						});

						// Move menus for mobile navigation
						duplicateMenus = function() {
							var submenu = $('#localeSelector > ul').html(), target = $('#userNav ul');
							target.append(submenu);

							if ($('#pageLinks').html() != undefined) {
								var menu = '<div class="pageLinks mobileOnly">'
										+ $('#pageLinks').html() + '</div>', target = $('.js-user-nav');
								target.append(menu);
							}
						}
						duplicateMenus();

						// Add Wrapper around Abstract Image (remove after
						// engineer adds wrapper if possible)
						$("#abstractImage").wrap(
								"<div class='abstractWrapper'></div>");

						

						if (Modernizr.mq('(max-width: 1000px)')) {
							if ($('body.page-viewbook, body.page-viewjournal, body.page-viewseries').length > 0) {
								var allToggles = $('h2.js-toggle-region'),
									allRegions = $('div.region-collapsable');
								allToggles.removeClass('expanded');
								allRegions.hide();
								$(allToggles[0]).addClass('expanded');
								$(allRegions[0]).show();
							}
						}

						
						var addToggleClick = function(linkSelection, idOfArea, callback, excludeArea) {
							console.log("Adding onclick event for " + idOfArea + "(" + linkSelection + "): ", callback)
							var area = $(idOfArea),
								linkSelection = $(linkSelection);
							area.click(function(e) {
								var target = $(e.target);
								if (e.alreadyToggled) {
									console.log(area, "already toggled, skipping redudant onclick handler", target)
									return; // we've already handled this if the default has been prevented
								}
								console.log(area, "clicked with target", target)
								//console.log((excludeArea && target == area), target.is(linkSelection), linkSelection.find(target) > 0)
								var exec = ((excludeArea && target == area) || target.is(linkSelection));
								console.log("Execute: " + exec);
								if(!exec) {
									var targetInLink = linkSelection.find(target);
									console.log(targetInLink, targetInLink.length);
									exec = exec || targetInLink.length > 0;
								}
								if(exec) {
									console.log(area, "clicked")
									if(callback) {
										callback(area);
									}
									e.preventDefault();
									e.alreadyToggled = true;
								}
							});
						}, 
						toggleClass = function(className) {
							return function(area) {
								area.toggleClass(className);
							}
						},
						addOpenToggle = function(linkSelection, idOfArea) {
							addToggleClick(linkSelection, idOfArea, toggleClass('open'))
						}
						
						addOpenToggle('a.js-issue-menu-toggle', '#currentVolumeAndIssue')
						addOpenToggle('a.js-format-menu', '#seeAllFormats')
						addOpenToggle('a.js-user-nav-toggle', '#loginNav')
						addOpenToggle('a.js-locale-toggle', '#localeSelector')
						addOpenToggle('a.js-site-search-toggle', '#quickSearch')
						addOpenToggle('a.menuBtn', '#navigation')

						addToggleClick('a.section-toggle', '#leftContent', toggleClass('expanded'))
						
//						$('> ul > li').click(function(e) {
//							var target = $(e.target);
//							if(target.is('a, #navigation')) { // don't include a or the navigation
//								e.stopPropagation();
//								return;
//							}
//							$(this).toggleClass('open');
//						});
						
						// FIXME: I think we can remove the next 2 blocks, because they should be covered by the addOpenToggle('a.menuBtn', '#navigation') above? 
						$('> ul > li', '#navigation').click(function(e) {
							$(this).toggleClass('open');
						});
						$('> ul li a', '#navigation').click(function(e) {
							e.stopPropagation();
						});

						// FIXME: I don't know if this is needed anymore either, this seems to be legacy toggling
						if ($('.contentPage #toc').length > 0) {
							$('a.section-toggle').addClass('show-toggle');
						}
						var b = $('body');

						// close all menus if click anywhere outside of menus
						b.on('click', function(e) {
								$('.js-issue-menu-toggle, .js-format-menu, .js-user-nav-toggle, .js-locale-toggle, .js-site-search-toggle, a.menuBtn')
										.each(
												function() {
													var menu = $(this).parent('div');
																// if click
																// target not
																// within menu
																// and menu
																// open, close
																// menu
													if ((menu.has(e.target).length <= 0) && (menu.hasClass('open'))) {
														menu.removeClass('open');
													}
												});
							});

						$('div#footerLists h2').on('click', function() {
							$(this).parents('ul').toggleClass('expanded');
						});

						// Hack to move Alerts to center column
						if (b.is('.page-viewarticle, .page-viewbookchapter')) { // on these two pages, we need to do something special
							var alertButton = $("#alertButtons"),
								alertContent = alertButton.html();
								alertButton.remove();
							$(".gs-fullrightdocheader").prepend(alertContent);
						}
						// Period Tables Scripts
						$('div.cell:not(.not-selectable)').on(
								'click',
								function() {
									var t = $(this);
									if (!t.is('.not-selectable.inactive')) { // neither of these
										t.toggleClass('selected');
									}
								});

						if ($('body.page-viewjournal').length > 0) {

							// DG-2528
							var link = $('#callForPapersLink');
							var header = $('#callForPapersHeader');
							if (link != null && header != null) {
								var content = $('#callForPapersArea');
								link.click(function(event) {
									event.preventDefault();
									if (!header.hasClass('expanded')) {
										header.addClass('expanded');
										content.show();
									}
									window.location.hash = 'callForPapersHeader';
								});
							}
						}
					});
		 	$('h2.js-toggle-region,#readPanel,h2.toggle').click(
			function() {
				var t = $(this)
				if (t.parent('#periodic-table').length == 0) {
					t.toggleClass('expanded').nextUntil('h2','div.region-collapsable').slideToggle(300,updatePanelHeight);
				} else {
					updatePanelHeight();
				}
			});
	
	
		 var waitForFinalEvent = (function() {
			var timers = {};
			return function(callback, ms, uniqueId) {
				if (!uniqueId) {
					uniqueId = "Don't call this twice without a uniqueId";
				}
				if (timers[uniqueId]) {
					clearTimeout(timers[uniqueId]);
				}
				timers[uniqueId] = setTimeout(callback, ms);
			};
		})(),
		rightContent = $('#rightContent'),
		leftContent = $('#leftContent'),
		navAndAlerts = $('.browseResults #navAndAlerts'),
		containingDiv = rightContent.closest('#mainContent, #subContent, #pageBody, body'),
		searchBoxHeight = $('#sideSearchBox')
		rightAndLeft = $.merge(rightContent, leftContent),
		thingsNeedingResize = $.merge(navAndAlerts, rightAndLeft),
		allPanelLog = $.merge(thingsNeedingResize, containingDiv);
		 
		 if(navAndAlerts) {
			 thingsNeedingResize.splice($.inArray(leftContent, thingsNeedingResize), 1); // don't need to resize the left content if we have the navAndAlerts section, as that is in the left content...
		 }
	
		$.fn.redraw = function(){
			this.offsetHeight; // forces a redraw https://stackoverflow.com/questions/8840580/force-dom-redraw-refresh-on-chrome-mac
			//console.log($(this).innerHeight(), $(this).outerHeight())
//		  $(this).each(function(){
//		    var redraw = this.offsetHeight;
//		  });
		};
		
		containingDiv.css("position", "relative");
		
    function updatePanelHeight(delay){
		waitForFinalEvent(function(){
			var mh = 'min-height';
			thingsNeedingResize.css(mh, '').redraw(); // remove the min-heights	
			var	height = containingDiv.height(), // now, determine the new height
				log = function(state) {
					if(console && console.log) {
						console.log("----- " + state + " of column height update -----");
						console.log("Height calculated at " + height);
						allPanelLog.each(function() {
							var t = $(this);
							console.log(t.attr("id") + ": heights at " + state + " are [" + t.height() + "/" + t.innerHeight() + "/" + t.outerHeight(true) + "]");
						})
					}
				},
				setHeight = function() {
					var node = $(this),
						i = 0,
						marginTop = node.outerHeight(true) - node.innerHeight(); // margin and border
						offset = node.offset().top + marginTop, // offset doesn't include margins http://api.jquery.com/offset/
						containingBorder = containingDiv.outerHeight() - height, // https://stackoverflow.com/questions/7420434/jquery-how-to-get-elements-margin-and-padding ... this includes the border and padding calculation
						containingOffset = containingDiv.offset().top + containingBorder,
						totalOffset = containingOffset - offset;

					var handheld = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 1000;
					
					// DG-3365: don't resize anything on the no search results page.
					if (jQuery('body.noResultsPage').length == 0 && !handheld) {
						node.css(mh, height + totalOffset);
						if(console && console.log) {
							console.log(node.attr("id"), "total offset = " + totalOffset, "margin top = " + marginTop, "offset = " + offset, "containingBorder = " + containingBorder, "containingOffset = " + containingOffset, "height = " + height, "calculated height = " + (height + totalOffset))
						}
					}
					
					// remove previous min-height
					if (handheld) {
						node.css(mh, "");
					}
					
				}
				
			log('start');
			thingsNeedingResize.each(setHeight);
			log('end');
		}, delay ? delay : 50, "panelHeight")
	}
	
	var w = $(window), moduleToggle = function() { updatePanelHeight(10) };
	w.resize(updatePanelHeight);
	w.load(updatePanelHeight);
	containingDiv.on("module:open", moduleToggle);
	containingDiv.on("module:shut", moduleToggle);
	moduleToggle();
})(jQuery);