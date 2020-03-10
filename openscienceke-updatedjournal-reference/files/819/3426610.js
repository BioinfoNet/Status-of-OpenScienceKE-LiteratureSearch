jQuery(function($j) {
      var formState = {
          overrideBackends: false,
          backends: {}
      };
      
      // Name of the cookie
      var cookieName;
      
      // Mostly just for debugging, store the cookie string value here
      // rather than in the sub-function scope
      var cookieStr;
      
      // An object representation of the cookie.  This is converted from the
      // XML cookie value on init.  The form controls will manipulate this,
      // and when the user clicks "Go", this will be converted back into
      // XML.
      var cookieObj;

      ///////////////////////////////////////////////////////////////////////////////
      function cbChanged(event) {
          //console.info("Event caught: " + event);
          var target = $j(event.target);
          var id = target.attr("id");
          var value = target.attr("value");
          var checked = target.attr("checked");
          /*console.info("target id: '" + id + 
                       "', value: '" + value + 
                       "', checked: '" + checked + "'");*/
          
          
          if (id == "besetsel-cb") {
              if (checked) {
                  $j("#besetsel-sel").removeAttr("disabled");
                  besetSelFormToObj();
              }
              else {
                  $j("#besetsel-sel").attr("disabled", 1);
                  delete cookieObj.besetName;
              }
          }
          else if (id == "besetsel-sel") {
              besetSelFormToObj();
          }
          else {
              var m;
              if (m = id.match(/besetsel-be-(.*?)-cb/)) {
                  var backend = m[1];
                  //console.info(">>>backend checkbox:  " + backend);
                  if (checked) {
                      $j("#besetsel-be-" + backend + "-text").removeAttr("disabled");
                      beUrlFormToObj(backend);
                  }
                  else {
                      $j("#besetsel-be-" + backend + "-text").attr("disabled", 1);
                      delete cookieObj.backendUrls[backend];
                  }
              }
              else if (m = id.match(/besetsel-be-(.*?)-text/)) {
                  backend = m[1];
                  //console.info(">>>backend text:  " + backend);
                  beUrlFormToObj(backend);
              }
          }
          
          // PMC-11784 and PMC-11785.
          // This fixes a nasty IE bug.  It causes a slight flash when the user
          // clicks a checkbox, but it works.
          if (jQuery.browser.msie){
              target.hide();
              window.setTimeout( function(){ target.show();}, 0 );
          }
          
      }

      ///////////////////////////////////////////////////////////////////////////////
      // besetSelFormToObj()
      // This is called by a couple of event handlers and decodes the
      // currently selected BESet (in the drop-down form) and sets the
      // cookieObj.besetName accordingly.

      function besetSelFormToObj()
      {
          cookieObj.besetName = $j("#besetsel-sel").val();
      }

      ///////////////////////////////////////////////////////////////////////////////
      // beUrlFormToObj(backend)
      // This is similar, and takes care of reading the text value from the
      // form and stuffing it into the object

      function beUrlFormToObj(backend) {
          var value = $j("#besetsel-be-" + backend + "-text").attr("value");
          if (value) cookieObj.backendUrls[backend] = value;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function init() {
          if ($j("#besetsel-form").length < 1)
          {
              return;
          }
          
          cookieName = $j("#besetsel-form").attr("cookieName");
          cookieObj = cookieXmlToJson(cookieName);
          initFormState();

          // Set event handers
          $j("#besetsel-form .besetsel-control").change(function(event) {
              cbChanged(event);
          });
          $j("#besetsel-go-button").click(function(event) {
              goButton(event);
          });
          $j("#besetsel-reset-button").click(function(event) {
              resetButton(event);
          });
          
          // This "pullout" might be empty, in the case of the BESet being
          // selected by path segment instead of cookie.  In that case, the
          // tab acts as a watermark, just to identify the BESet, and we
          // don't want to allow it to be "pulled out".  So we'll set the
          // width to 0 in that case.
          var w = $j("#besetsel-go-button").length > 0 ? "400px" : "0px";

          // Put it into the sidecontent pullout
          $j("#besetsel-form").sidecontent({
              /*classmodifier: "besetsel",*/
              attachto: "rightside",
              width: w,
              opacity: "0.8",
              pulloutpadding: "5",
              textdirection: "vertical",
              clickawayclose: 0,
              titlenoupper: 1
          });
          
          var pulloutColor = $j("#besetsel-form").attr("pulloutColor");
          //alert("color is " + pulloutColor);
          $j("#besetsel-form").data("pullout").css("background-color", pulloutColor || '#663854');
          
          if ($j("#besetsel-go-button").size() > 0) {
              $j("#besetsel-form").data("pullout").css({
                  "border-top": "ridge gray 5px",
                  "border-bottom": "ridge gray 5px",
                  "border-left": "ridge gray 5px"
              });
          }
      }

      ///////////////////////////////////////////////////////////////////////////////
      // goButton(event)
      // Handle the user-click of the "Go!" button.
      
      function goButton(event) {
          // Convert the object into XML
          var cookieXml = "<Backends><BESet" + ( cookieObj.besetName ? (" name='" + cookieObj.besetName + "'>") : ">" );
          for (var backend in cookieObj.backendUrls) {
              //console.info("+++ backend " + backend);
              cookieXml += 
                "<Backend name='" + backend + "'>" + xmlEscape(cookieObj.backendUrls[backend]) + "</Backend>";
          }
          cookieXml += "</BESet></Backends>";
          //console.info(cookieXml);
          
          // Set the cookie
          document.cookie = cookieName + "=" + encodeURIComponent(cookieXml) +
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // resetButton(event)
      // Handle the user-click of the "Reset" button.
      // Does the same thing as "Go!", but sets the cookie to the empty string.

      function resetButton(event) {
          // Clear the cookie
          document.cookie = cookieName + "=" + 
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      function xmlEscape(str) {
          str = str.replace(/\&/g, '&amp;')
                   .replace(/\</g, '&lt;')
                   .replace(/\>/g, '&gt;')
                   .replace(/\"/g, '&quot;')
                   .replace(/\'/g, '&apos;');
          return str;
      }

      ///////////////////////////////////////////////////////////////////////////////
      // This function reads the cookie value and initializes the form state
      // Don't assume anything about the form state -- redo everything.
      function initFormState() {

          var besetName = cookieObj.besetName;

          if (!besetName) {
              $j("#besetsel-cb").removeAttr("checked");
              $j("#besetsel-sel").attr("disabled", 1);
          }
          else {
              var selBESet = $j("#besetsel-opt-" + besetName);
              if (selBESet.length != 0) {
                  $j("#besetsel-cb").attr("checked", 1);
                  $j("#besetsel-sel").removeAttr("disabled");
                  selBESet.attr("selected", 1);
              }
              else {
                  $j("#besetsel-cb").removeAttr("checked");
                  $j("#besetsel-sel").attr("disabled", 1);
              }
          }
          
          // Foreach backend in the form
          $j(".besetsel-be-cb").each(function(i) {
              var id = $j(this).attr("id");
              var beName = id.match(/besetsel-be-(.*?)-cb/)[1];
              //console.info("### backend, id is '" + id + "', beName is '" + beName + "'");
              if (!beName) return;
              
              // See if there's a corresponding element in the cookie
              if (!cookieObj.backendUrls ||
                  !cookieObj.backendUrls[beName]) {
                  //console.info("Didn't find " + beName);
                  $j("#besetsel-be-" + beName + "-cb").removeAttr("checked");
                  $j("#besetsel-be-" + beName + "-text").attr("disabled", 1);
              }
              else {
                  //console.info("Found " + beName);
                  $j("#besetsel-be-" + beName + "-cb").attr("checked", 1);
                  var textbox = $j("#besetsel-be-" + beName + "-text");
                  textbox.removeAttr("disabled");
                  textbox.attr("value", cookieObj.backendUrls[beName]);
              }
          });
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // This gets the value of the <snapshot>_beset cookie, which is in XML, and turns it
      // from this:
      //   <BESet name='test'>
      //     <BackendUrl backend='tagserver' url='bingo'/>
      //     ...
      //   </BESet>
      // Into this (note that everything is optional):
      //   { besetName: 'test',
      //     backendUrls: {
      //         tagserver: 'bingo', ... }
      //   }
      // If there is no cookie set or parsing fails, this returns {}.
      
      function cookieXmlToJson(cookieName) {
          var cookieObj = {
              backendUrls: {}
          };

          cookieStr = getCookie(cookieName);
          //console.info("cookie value is '" + cookieStr + "'");

          // Parse XML
          try {
              var cookieXml = $j(cookieStr);
          }
          catch(err) {
              return cookieObj;
          }
          
          var besetElem = cookieXml.find('BESet');
          if (besetElem.length == 0) {
              // No valid cookie value found.
              return cookieObj;
          }
          
          var besetName = besetElem.attr("name");
          if (besetName) {
              cookieObj.besetName = besetName; 
          }
          
          var backends = besetElem.find("backend");
          if (backends.length != 0) {
              backends.each(function (i) {
                  var e = $j(backends[i]);
                  cookieObj.backendUrls[e.attr("name")] = e.text();
                  //console.info("Setting " + e.attr("backend") + ": " + e.attr("url"));
              })
          }
          
          return cookieObj;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function getCookie(name) {
          var allCookies = document.cookie;
          //console.info("allCookies = " + allCookies);
          var pos = allCookies.indexOf(name + "=");
          if (pos != -1) {
              var start = pos + (name + "=").length;
              var end = allCookies.indexOf(";", start);
              if (end == -1) end = allCookies.length;
              return decodeURIComponent(allCookies.substring(start, end)); 
          }
          return "";
      }
        
    init();
    
});



;
(function($)
{
    // http-all-ok - no https problems here
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Side-Content/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.2
	
	var classModifier = "";
	var sliderCount = 0;
	var sliderWidth = "400px";
	
	var attachTo = "rightside";
	
	var totalPullOutHeight = 0;
	
	function CloseSliders (thisId) {
		// Reset previous sliders
		for (var i = 0; i < sliderCount; i++) {
			var sliderId = classModifier + "_" + i;
			var pulloutId = sliderId + "_pullout";
			
			// Only reset it if it is shown
			if ($("#" + sliderId).width() > 0) {

				if (sliderId == thisId) {
					// They have clicked on the open slider, so we'll just close it
					showSlider = false;
				}

				// Close the slider
				$("#" + sliderId).animate({
					width: "0px"
				}, 100);
				
				// Reset the pullout
				if (attachTo == "leftside") {
					$("#" + pulloutId).animate({
						left: "0px"
					}, 100);
				} else {
					$("#" + pulloutId).animate({
						right: "0px"
					}, 100);
				}
			}
		}
	}
	
	function ToggleSlider () {
		var rel = $(this).attr("rel");

		var thisId = classModifier + "_" + rel;
		var thisPulloutId = thisId + "_pullout";
		var showSlider = true;
		
		if ($("#" + thisId).width() > 0) {
			showSlider = false;
		}

        CloseSliders(thisId);
		
		if (showSlider) {
			// Open this slider
			$("#" + thisId).animate({
				width: sliderWidth
			}, 250);
			
			// Move the pullout
			if (attachTo == "leftside") {
				$("#" + thisPulloutId).animate({
					left: sliderWidth
				}, 250);
			} else {
				$("#" + thisPulloutId).animate({
					right: sliderWidth
				}, 250);
			}
		}
		
		return false;
	};

	$.fn.sidecontent = function (settings) {
	
		var config = {
			classmodifier: "sidecontent",
			attachto: "rightside",
			width: "300px",
			opacity: "0.8",
			pulloutpadding: "5",
			textdirection: "vertical",
			clickawayclose: false
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		return this.each(function () {
		
			$This = $(this);
			
			// Hide the content to avoid flickering
			$This.css({ opacity: 0 });
			
			classModifier = config.classmodifier;
			sliderWidth = config.width;
			attachTo = config.attachto;
			
			var sliderId = classModifier + "_" + sliderCount;
			var sliderTitle = config.title;
			
			// Get the title for the pullout
			sliderTitle = $This.attr("title");
			
			// Start the totalPullOutHeight with the configured padding
			if (totalPullOutHeight == 0) {
				totalPullOutHeight += parseInt(config.pulloutpadding);
			}

			if (config.textdirection == "vertical") {
				var newTitle = "";
				var character = "";
				for (var i = 0; i < sliderTitle.length; i++) {
					character = sliderTitle.charAt(i).toUpperCase();
					if (character == " ") {
						character = "&nbsp;";
					}
					newTitle = newTitle + "<span>" + character + "</span>";
				}
				sliderTitle = newTitle;
			}
			
			// Wrap the content in a slider and add a pullout			
			$This.wrap('<div class="' + classModifier + '" id="' + sliderId + '"></div>').wrap('<div style="width: ' + sliderWidth + '"></div>');
            var pullout = $('<div class="' + classModifier + 'pullout" id="' + sliderId + '_pullout" rel="' + sliderCount + '">' + sliderTitle + '</div>').insertBefore($("#" + sliderId));
            
            // Store reference to the tab element in parent 
            $This.data('pullout', pullout);
			
			if (config.textdirection == "vertical") {
				$("#" + sliderId + "_pullout span").css({
					display: "block",
					textAlign: "center"
				});
			}
			
			// Hide the slider
			$("#" + sliderId).css({
				position: "absolute",
				overflow: "hidden",
				top: "0",
				width: "0px",
				zIndex: "1",
				opacity: config.opacity
			});
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId).css({
					left: "0px"
				});
			} else {
				$("#" + sliderId).css({
					right: "0px"
				});
			}
			
			// Set up the pullout
			$("#" + sliderId + "_pullout").css({
				position: "absolute",
				top: totalPullOutHeight + "px",
				zIndex: "1000",
				cursor: "pointer",
				opacity: config.opacity
			})
			
			$("#" + sliderId + "_pullout").live("click", ToggleSlider);
			
			var pulloutWidth = $("#" + sliderId + "_pullout").width();
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId + "_pullout").css({
					left: "0px",
					width: pulloutWidth + "px"
				});
			} else {
				$("#" + sliderId + "_pullout").css({
					right: "0px",
					width: pulloutWidth + "px"
				});
			}
			
			totalPullOutHeight += parseInt($("#" + sliderId + "_pullout").height());
			totalPullOutHeight += parseInt(config.pulloutpadding);
			
			var suggestedSliderHeight = totalPullOutHeight + 30;
			if (suggestedSliderHeight > $("#" + sliderId).height()) {
				$("#" + sliderId).css({
					height: suggestedSliderHeight + "px"
				});
			}
			
			if (config.clickawayclose) {
				$("body").click( function () {
					CloseSliders("");
				});
			}
			
			// Put the content back now it is in position
			$This.css({ opacity: 1 });
			
			sliderCount++;
		});
		
		return this;
	};
})(jQuery);
;
/* Override this file with one containing code that belongs on every page of your application */


;
/*
  IIFE to control the glossary poppers.  See BK-4287.
*/
PBooksGlossary = (function($) {

    // This is a cache of ajax results, so that we don't do an ajax request twice
    // for two instances of the same glossary term.
    var popperTexts = {};

    // This stores the jQuery set of all glossary links on the page, so we only have
    // to find them once.
    var $glossaryLinks;
    // Same thing but as a set of DOM elements
    var glossaryLinks;

    /*
      The getGlossary function is called by JIG when the user hovers over a glossary
      item (see BK-4287).  Normally, it will do an ajax request to retrieve the
      glossary item, and will use asynchronous mode, invoking callback after the
      ajax request is done.  For glossary terms we've seen before, we'll use the cache,
      and will return immediately (synchronous mode).
    */
    var getGlossary = function(callback) {
        var href = $(this).attr('href');
        if (!href) return;  // not much we can do.

        // If we've already found a glossary item with this href, then use that
        if (popperTexts[href]) {
            return popperTexts[href];
        }

        // Otherwise, do an AJAX request, and store the result.
        var ajaxUrl = href + '?report=bare';
        $.ajax({
            url: ajaxUrl,
            success: function(data) {
                var bc = $(data).find('div.main-content');
                popperTexts[href] = bc;
                callback(bc);
            }
        });
    }



    /*
      Bind to an event that will fire from the "enable/disable glossary links"
      handler, in books.js.  This fires once on document ready, and once each time the user
      clicks on that control.
    */
    $('body').bind("glossarylinks", function() {
        // First time?  If so then find all the glossary links on the page
        if (typeof $glossaryLinks == "undefined") {
            $glossaryLinks = $('a.def');
            glossaryLinks = $glossaryLinks.get();
        }

        // If there are no glossary links, then there's nothing to do
        if ($glossaryLinks.length == 0) return;
        var $gl1 = $glossaryLinks.first();  // first one; use to determine our state

        // Are we enabling or disabling?
        var enabling = ! $gl1.hasClass('def_inactive');

        // Were they ever enabled before, or not?  This will be true if we have ever
        // stored off the popper options to data.popperopts
        var enabledBefore = $gl1.data.popperopts;

        // We'll enable the ncbipoppers on the links in batches, because sometimes there
        // can be thousands on a single page (e.g. NBK65951, see BK-4287).
        // The function doGlossLinkBatch() will do one batch, and then set a timeout
        // to re-invoke itself after a delay.
        var numGlossaryLinks = glossaryLinks.length;
        var batchSize = 100;
        var start = 0;
        function doGlossLinkBatch() {
            var end = Math.min(start + batchSize, numGlossaryLinks);
            //console.info("doGlossLinkBatch: start = " + start + ", end = " + end);
            
            for (var i = start; i < end; ++i) {
                $this = $(glossaryLinks[i]);

                // There are really only three cases: enabling for the first time, re-enabling,
                // or disabling.
   
                if (enabling && !enabledBefore) {      // enabling for the first time
                    // Instantiate and store the results
                    $this.ncbipopper({
                        destText: getGlossary,
                        hasArrow: true,
                        arrowDirection: "top",
                        width: "600px",
                        triggerPosition: "bottom left",
                        destPosition: "top left",
                        adjustFit: "autoAdjust",
                        //adjustFit: "none",
                        isTriggerElementCloseClick: false
                    });
                    $this.data.popperopts = $this.data('ncbipopper').options;
                }
        
                else if (enabling && enabledBefore) {       // re-enabling
                    $this.ncbipopper($this.data.popperopts);
                }
          
                else if (enabledBefore) {                   // disabling
                    $this.ncbipopper('destroy');
                }

            }
            
            
            start += batchSize;
            if (start < numGlossaryLinks) {
                window.setTimeout(doGlossLinkBatch, 1);
            }
        }
        
        // Kick off the first batch.
        doGlossLinkBatch();
        
    });

    /*
      This return makes the getGlossary function globally visible (as
      PBooksGlossary.getGlossary), in case we want to fix the HTML markup,
      as described above.
      For now, since we're setting the popper in the JS function above, this
      really isn't necessary.
      I also added popperTexts, to allow some debugging.
    */
    return {
        "getGlossary": getGlossary,
        "popperTexts": popperTexts
    };
})(jQuery);



;
// Pinger for video play button.  See BK-8000

if (typeof jQuery != "undefined") {
    (function($) {
        $(document).ready(function() {
        
            $('img[src="/corehtml/pmc/flowplayer/play-large.png"]').on('click', function() {
                if (ncbi && ncbi.sg && ncbi.sg.ping) {
                    ncbi.sg.ping({
                        "pagearea": "body",
                        "targetsite": "control",
                        "targetcat": "control",
                        "targettype": "video-play-button"
                    });
                }
            });
        
        });
    })(jQuery);
}
;
jQuery(function($) {
    // Set event listener to scroll the nav poppers to the current page when opened
    $("#source-link-top, #source-link-bottom").bind(
        "ncbipopperopencomplete",
        function() {
            var dest = $(this).attr('href');
            var selected_link = $(dest).find('.current-toc-entry');

            if (selected_link.length > 0) 
            {
                $(dest).scrollTo(selected_link, { offset: -100, duration:  400 });
            }
        }
    );  
});


;
/**
 * Report search in a book
 * BK-11561
 */
jQuery(function($) {
    $('#bk_srch').on('submit', pingLocalSearch);
});

function pingLocalSearch()
{
    var $ = jQuery,
        params = {
            jsevent: "localsearch"
        },
        book_id = $('meta[name="ncbi_acc"]').attr('content'),
        domain = $('meta[name="ncbi_domain"]').attr('content'),
        collection = $('meta[name="book-collection"]').attr('content');
    
    if (typeof book_id !== "undefined")
    {
        params['log_nbknum'] = book_id;
    }
    
    if (typeof domain !== "undefined")
    {
        params['domain'] = domain;
    }

    if (typeof collection !== "undefined")
    {
        params['collection'] = collection;
    }

    ncbi.sg.ping(params);
    
    return true;
}

;
/* I hate to do this, but it is just faster to create the version in Common Components now. Later settle on the interface and remove the versions from PMH 
This will likely be moved to jig anyway
*/

/********
Add a class 'ncbi_share' to your anchor to get the NCBI share popup. The URL shared will be the href of the anchor or the URL of the page if href is empty or '#'
If html attached after render, call $.ncbi.share.scanNcbiSocial(rootNode);

By default the widget attaches a popup with the sharing options. To get an inplace list of sharing buttons set the popup option to false as follows

<a href="#" class="ncbi_share" style="visibility:hidden" data-ncbi_share_config="popup:false">Share1</a>

The anchor <a> will be replaced with an unordered list <ul> containing the icons to the social media sites (twitter,facebook,google+)

To override behavior in js

    $.extend($.ncbi.share,{
        'sharePopupHtml': 'Your Share popup html';
        'shareLabel':'Your share text / label',
        'urlLabel':'Your url text / label'
    });
    
To do that on the server side, which also allows to have different share and url texts / labels on each poupup, 
add a data attribute to the anchor triggering the pop up e.g. 
<a href="/pubmed/" class="ncbi_share" data-ncbi_share_config="share_label:'Share',url_label:'URL'">Share1</a>
<a href="/pubmed/" class="ncbi_share" data-ncbi_share_config="share_label:'Spread the truth',url_label:'Permalink'">Share2</a>

Other configuration parameters (data-ncbi_share_config):
- shortern:true : false by default. If set to true, the URL to be shared is shortened by the bit.ly service

The value of the parameters passed to the sites can be overriden as follows

    $.ncbi.share.setProcessShareParamFunc(function (shareName,paramKey,paramValue,node){
        if (shareName == 'twitter' && paramKey == 'text'){
            return 'New Text';
        }
        else
            return paramValue;
    });

After customization, you may have to adjust the corresponding css

**/

(function ($){
        // http-all-ok: no https problems here
        // Create a "namespace" for our use:
        var socialButtons = {
        };
        
        socialButtons.shareServices = {
            facebook: {
                postUrl: 'https://www.facebook.com/sharer.php',
                shareParameters: {
                    u: 'shareURLPlaceholder'
                    /*p[url] and p[title]*/
                },
                width: 655,
                height: 430
            },
            twitter: {
                postUrl: 'https://twitter.com/intent/tweet',
                shareParameters: {
                    url: 'shareURLPlaceholder',
                    text: jQuery('meta[property="og:title"]').length ?
                        jQuery('meta[property="og:title"]').attr('content'): document.title,
                    related: jQuery('meta[name="twitter:site"]').length ? jQuery('meta[name="twitter:site"]').attr('content').substring(1): ''
                },
                width: 600,
                height: 450
            },
            google: {
                postUrl: 'https://plus.google.com/share',
                shareParameters: {
                    url: 'shareURLPlaceholder',
                    hl: 'en-US'
                },
                width: 600,
                height: 600
            },
            reddit: {
                postUrl: 'https://reddit.com/submit',
                shareParameters: {
                    url: 'shareURLPlaceholder',
                    hl: 'en-US'
                },
                width: 600,
                height: 600
            }
        };
        
        socialButtons.socialShare = function (shareName, shareURL,node) {
            var postUrlTuple = socialButtons.buildUrl(shareName, shareURL,node);
            if(socialButtons.readShareWidgetConfig(node.closest('.social-buttons').data('ncbi_share_config')).shorten === true){
                //console.log('postUrl',postUrlTuple);
                //IE error SEC7112, can't be caught by js or jQuery, this has to be done thru a backend proxy anyway
                //socialButtons.shortenAndOpenShareWindow(shareName,postUrlTuple);
                socialButtons.openShareWindow(shareName,postUrlTuple);
            }
            else{
                socialButtons.openShareWindow(shareName,postUrlTuple);
            }
        };
        
        socialButtons.shortenAndOpenShareWindow = function(shareName,postUrlTuple){
            var paramsArr = postUrlTuple[1];
            var len = paramsArr.length,urlInd=0,urlParamName,urlVal;
            for (var i=0 ; i<len; i++){
                var res = paramsArr[i].match(/^(u|url)=(.*)/);
                if (res){
                    urlInd = i;
                    urlParamName = res[1];
                    urlVal = res[2];
                    break;
                }
            }
            var longUrl = decodeURIComponent(urlVal),shortUrl = longUrl;
            $.ajax({
                    url:'http://api.bit.ly/v3/shorten',  // http-ok: not available on https
                    dataType:'jsonp',
                    timeout: 5000,
                    async:false,//doesn't work for jsonp
                    data:{
                        longUrl:longUrl,
                        apiKey:'R_bdcabe9f3ec74d680ad066b4c49dd90f',
                        login:'abebaw'
                    }
                }
            ).done(function(res){
                //console.log('socialButtons.shorten.done',res,res.data.url);
                if(res.status_code == 200){
                    shortUrl = res.data.url;
                    //console.log('shortUrl - 1 - ',shortUrl);
                    paramsArr[urlInd]= urlParamName + '=' + encodeURIComponent(shortUrl);
                }     
            }).fail(function(e){
                //console.log('socialButtons.shorten.fail',e);
            }).always(function(){
                socialButtons.openShareWindow(shareName,postUrlTuple);
            });
            
            
        }
        
        socialButtons.openShareWindow = function(shareName,postUrlTuple){
            var defaultWidth = 655;
            var defaultHeight = 600;
            var options = socialButtons.shareServices[shareName];
            var width = options.width ? options.width: defaultWidth;
            var height = options.height ? options.height: defaultHeight;
            var postUrl = postUrlTuple[0] + socialButtons.paramChar(postUrlTuple[0]) + postUrlTuple[1].join('&amp;');
            window.open(postUrl, shareName + 'Share', 'toolbar=0,status=0,height=' + height + ',width=' + width + ',scrollbars=yes,resizable=yes');
        }
        
        socialButtons.buildUrl = function (shareName, shareURL,node) {
            var options = socialButtons.shareServices[shareName];
            var urlToShare = shareURL && shareURL !== '' && shareURL !== '#' ? shareURL: window.location.href.replace(/#.*/, '');
            var parameters =[];
            var postUrl = options.postUrl;
            
            // collect the query string parameters (url, etc.):
            jQuery.each(options.shareParameters, function (paramKey, paramValue) {
                // walk through parameters
                paramValue = socialButtons.processShareParam(shareName,paramKey,paramValue,node);
                if (paramKey == 'url' || paramValue == 'shareURLPlaceholder'){
                    paramValue = paramValue == 'shareURLPlaceholder' ? urlToShare: paramValue;
                }
                if (paramValue !== '') {
                    parameters.push(paramKey + '=' + encodeURIComponent(paramValue));
                }
            });
            // assemble the parameters:
            //parameters = parameters.join('&amp;');
            // append them to the URL:
            //postUrl = postUrl + socialButtons.paramChar(postUrl) + parameters;
            //return postUrl;
            return [postUrl,parameters];
        };
        
        //override to change the default values of the params
        socialButtons.processShareParam = function (shareName,paramKey,paramValue,node){
            return paramValue;
        };
        
        socialButtons.paramChar = function (paramString) {
            return paramString.indexOf('?') !== -1 ? '&amp;': '?';
        };
        
        socialButtons.readShareWidgetConfig = function (configStr){
            var shareConfigJ = {}
            if (configStr) {
                try{
                    shareConfigJ = eval('({' + configStr + '})');
                }catch(e){}
            }
            return shareConfigJ;
        }

         if(!$.ncbi)
            $.extend($,{ncbi:{}});
        if(!$.ncbi.share)
            $.extend($.ncbi,{share:{}});
            
        $.extend($.ncbi.share,
            (function(){
                /*******************private attributes / functions ********************/                
                var _shareLabel = 'Share';
                var _urlLabel = 'URL';
                var _shareUL = '<ul class="social-buttons inline_list">' +
                                '<li><button data-share="Facebook" title="Share on Facebook" class="share_facebook">Share on Facebook</button></li>' +
                                '<li><button data-share="Twitter" title="Share on Twitter" class="share_twitter">Share on Twitter</button></li>' +
                                '<li><button data-share="Google" title="Share on Google+" class="share_google">Share on Google+</button></li>' +
                           '</ul>';
                var _sharePopup = '<div style="display:none;" id="ncbi_share_box"> ' +
                       '<label id="ncbi_share_label">Share</label>' +
                        _shareUL + 
                       '<span class="clearfix"/>' +
                       '<label for="ncbi_share_inp" id="ncbi_share_url_label">URL</label>' +
                       '<input type="text" id="ncbi_share_inp"/>' +
                  '</div>';
                return {
                    //*****************exposed attributes / functions ******************/
                    'sharePopupHtml':_sharePopup,
                    'shareLabel':_shareLabel,
                    'urlLabel':_urlLabel,
                    'shareUL':_shareUL,
                    'setProcessShareParamFunc':function(func){socialButtons.processShareParam=func;},
                    'beforeShare':function(node){},
                    'scanNcbiSocial':function(root){
                        root = root || document;
                        //append the popup if not already there
                        if (!$('#ncbi_share_box')[0]){
                              $($.ncbi.share.sharePopupHtml).insertAfter($('body').children().last());
                        }
                        var allShareNodes = $(root).find('.ncbi_share');
                        //attach the popups
                        var sharePNodes = allShareNodes.not('.jig-ncbipopper').filter(function(ind){
                            return socialButtons.readShareWidgetConfig($(this).data('ncbi_share_config')).popup !== false;
                        });
                        sharePNodes.addClass('jig-ncbipopper').data('jigconfig',"destSelector: '#ncbi_share_box',closeEvent : 'click', openEvent: 'click', " +
                                "adjustFit: 'autoAdjust', openAnimation: 'none',addCloseButton:true, hasArrow:true, destPosition: 'top left', " + 
                                "triggerPosition: 'bottom center', arrowDirection: 'top'");
                        $.ui.jig.scan(sharePNodes);
                        ncbi.sg.scanLinks(sharePNodes.get());
                        
                        //now the inplace share buttons
                        var shareInPNodes = allShareNodes.filter(function(ind){
                            return socialButtons.readShareWidgetConfig($(this).data('ncbi_share_config')).popup === false;
                        });
                        shareInPNodes.each(function(index,elem){
                           var self = $(this);
                           var dataConfig = self.data('ncbi_share_config');
                           var shareUL = $($.ncbi.share.shareUL);
                           var ref = self.attr('ref');
                           if (ref){
                               shareUL.find('button').attr('ref', ref); 
                           }
                           self.replaceWith(shareUL.data('ncbi_share_config',dataConfig));
                        });
                        
                        if(isTouchDevice){
                            allShareNodes.each(function(index,elem){
                               var self = $(this);
                               var url = self.attr('href');
                               self.attr('href','#');
                               self.data('share_link',url);
                            });
                        }
                    },
                    'doPing':function(){
                        
                    }
                };//end of return 
             })() //end of the self executing anon
        );//end of $.extend($.ncbi.share
        
     var isTouchDevice = !!('ontouchstart' in window);

     //DOM Ready begin
     $(function(){
        
        //scan for social button links
        $.ncbi.share.scanNcbiSocial();
        
        //event listners
        var $doc = $(document);
        $doc.on('click','.social-buttons button',function(e){
            e.preventDefault();
            var self = $(this);
            $.ncbi.share.beforeShare(self);
            var shareURL = self.closest('#ncbi_share_box').find('#ncbi_share_inp').val();
            $.ncbi.share.doPing();
            socialButtons.socialShare(self.data('share').toLowerCase(), shareURL,self);
        });
        
        $doc.on('ncbipopperopen','.ncbi_share',function(e){
            var self = $(this);
            var shareConfig = self.data('ncbi_share_config');
            var shareConfigJ = socialButtons.readShareWidgetConfig(shareConfig);
            var shareURL = isTouchDevice ? self.data('share_link') : self.attr('href');
            shareURL = shareURL !== '' && shareURL !== '#' ? shareURL: window.location.href;
            $('#ncbi_share_label').text(shareConfigJ.share_label ? shareConfigJ.share_label : $.ncbi.share.shareLabel);
            $('#ncbi_share_url_label').text(shareConfigJ.url_label ? shareConfigJ.url_label : $.ncbi.share.urlLabel);
            $('#ncbi_share_box button').attr('ref',self.attr('ref') + '&link_href=' + shareURL);
            $('#ncbi_share_box .social-buttons').data('ncbi_share_config',shareConfig);
            var txtInput = $('#ncbi_share_inp').val(shareURL);
            window.setTimeout(function(){
                txtInput.select();
            },10);
        }) 
        
        if(isTouchDevice){
            $(document).on('touchstart', function (e) {
                if (!$(e.target).closest('#ncbi_share_box').length) {
                    $('.ncbi_share').ncbipopper('close');
                }
            });
        }
        
        
    });//DOM ready
})(jQuery);




;
(function($){

    $(function() {    

        var theSearchInput = $("#term");
        var originalTerm = $.trim(theSearchInput.val());
        var theForm = jQuery("form").has(theSearchInput);
        var dbNode = theForm.find("#database");
        var currDb = dbNode.val();
        var sbConfig = {};
        try{
            sbConfig = eval("({" + theSearchInput.data("sbconfig") + "})");
        }catch(e){}
        var defaultSubmit =  sbConfig.ds == "yes";
        var searched = false;
        var dbChanged = null; //since db.change is triggered as a work around for JSL-2067 
        var searchModified = false; //this is used to allow searching when something esle changed on the page with out the term changing
    
        if(!$.ncbi)
            $.extend($,{ncbi:{}});
        if(!$.ncbi.searchbar)
            $.extend($.ncbi,{searchbar:{}});
            
        $.extend($.ncbi.searchbar,
            (function(){
                //*****************private ******************/
               function doSearchPing() {
                   try{
                    var cVals = ncbi.sg.getInstance()._cachedVals;
                    var searchDetails = {}
                    searchDetails["jsEvent"] = "search";
                    var app = cVals["ncbi_app"];
                    var db = cVals["ncbi_db"];
                    var pd = cVals["ncbi_pdid"];
                    var pc = cVals["ncbi_pcid"];
                    var sel = dbNode[0];
                    var searchDB = sel.options[sel.selectedIndex].value;
                    var searchText = theSearchInput[0].value;
                    if( app ){ searchDetails["ncbi_app"] = app.value; }
                    if( db ){ searchDetails["ncbi_db"] = db.value; }
                    if( pd ){ searchDetails["ncbi_pdid"] = pd.value; }
                    if( pc ){ searchDetails["ncbi_pcid"] = pc.value; }
                    if( searchDB ){ searchDetails["searchdb"] = searchDB;}
                    if( searchText ){ searchDetails["searchtext"] = searchText;}
                    ncbi.sg.ping( searchDetails );
                   }catch(e){
                       console.log(e);
                   }
                }
                function getSearchUrl(term){
                    var url = "";
                    if (typeof(NCBISearchBar_customSearchUrl) == "function") 
                            url = NCBISearchBar_customSearchUrl();
                    if (!url) {
                        var searchURI = dbNode.find("option:selected").data("search_uri");
                        url = searchURI ?  searchURI.replace('$',term) : 
                             "/" + dbNode.val() + "/" + ( term !="" ? "?term=" + term : "");
                        }
                    return url;
                }
            
                return {
                    //*****************exposed attributes and functions ******************/
                    'theSearchInput':theSearchInput,
                    'theForm':theForm,
                    'dbNode':dbNode,
                    'searched':searched,
                    'setSearchModified':function() { searchModified = true; },
                    'setSearchUnmodified':function() { searchModified = false; },
                    'searchModified':function(){return searchModified;},
                    'doSearch':function(e){
                           e.stopPropagation();
                           e.preventDefault();
                           //checking for the searched flag is necessary because the autocompelete control fires on enter key, the form submit also fires on enter key
                           if(searched == false){
                               searched = true;
                               theForm.find('input[type="hidden"][name^="p$"]').attr('disabled', 'disabled');
                               //$("input[name]").not(jQuery(".search_form *")).attr('disabled', 'disabled');
                               if (defaultSubmit)
                                   $.ncbi.searchbar.doSearchPing();
                               else {
                                   var term = $.trim(theSearchInput.val());
                                   if (dbChanged || searchModified || term !== originalTerm){
                                       $.ncbi.searchbar.doSearchPing();
                                       var searchUrl = $.ncbi.searchbar.getSearchUrl(encodeURIComponent(term).replace(/%20/g,'+'));
                                       var doPost = (term.length  > 2000) ? true : false; 
                                       if (doPost){
                                           if (e.data.usepjs){
                                               Portal.$send('PostFrom',{"theForm":theForm,"term":term,"targetUrl":searchUrl.replace(/\?.*/,'')});
                                           }
                                           else{
                                               theForm.attr('action',searchUrl.replace(/\?.*/,''));
                                               theForm.attr('method','post');
                                           }
                                       }
                                       else {
                                           window.location = searchUrl;
                                       }
                                   }
                                   else{ //if (term !== originalTerm){
                                       searched = false;
                                   }
                               }
                           }
                    },
                    'onDbChange':function(e){
                         if (dbChanged === null)
                             dbChanged = false;
                         else
                             dbChanged = true;
                         var optionSel = $(e.target).find("option:selected");
                         var dict = optionSel.data("ac_dict");
                         if (dict){
                             //theSearchInput.ncbiautocomplete("option","isEnabled",true).ncbiautocomplete("option","dictionary",dict);
                             theSearchInput.ncbiautocomplete().ncbiautocomplete({
                                    isEnabled: true,
                                    dictionary: dict
                                });
                             theSearchInput.attr("title","Search " + optionSel.text() + ". Use up and down arrows to choose an item from the autocomplete.");
                         }
                         else{
                           theSearchInput.ncbiautocomplete().ncbiautocomplete("turnOff",true);
                           theSearchInput.attr("title", "Search " + optionSel.text());
                         }
                         if (defaultSubmit)
                            theForm.attr('action','/' + dbNode.val() + '/');  
                    },
                    'doSearchPing':function(){
                        doSearchPing();
                    },
                    'getSearchUrl':function(term){
                        return getSearchUrl(term);
                    }
                    
                };//end of return 
             })() //end of the self executing anon
        );//end of $.extend($.ncbi.searchbar
    
         function initSearchBar(usepjs){
            //enable the controls for the back button
            theForm.find('input[type="hidden"][name^="p$"]').removeAttr('disabled');
             if (usepjs)
                 portalSearchBar();
         }
         
        
    
        function portalSearchBar(){
            
            Portal.Portlet.NcbiSearchBar = Portal.Portlet.extend ({
                init:function(path,name,notifier){
                    this.base (path, name, notifier);
                },
                send:{
                    "Cmd":null,
                    "Term":null
                },
                "listen":{
                    "PostFrom":function(sMessage,oData,sSrc){
                        this.postForm(oData.theForm,oData.term,oData.targetUrl);
                    }
                },
                "postForm":function(theForm,term,targetUrl){
                       //console.log('targetUrl = ' + targetUrl);
                       theForm.attr('action',targetUrl);
                       theForm.attr('method','post');
                       this.send.Cmd({
                            'cmd' : 'Go'
                        });
                           this.send.Term({
                            'term' : term
                        });
                        Portal.requestSubmit();
                },
                'getPortletPath':function(){
                    return this.realpath + '.Entrez_SearchBar';
                }
            });
    
        }//portalSearchBar
        


         //portal javascript is required to make a POST when the rest of the app uses portal forms 
         var usepjs = sbConfig.pjs == "yes"; 
         //console.log('sbConfig',sbConfig);
         initSearchBar(usepjs);
         
         dbNode.on("change",$.ncbi.searchbar.onDbChange);
        
        theForm.on("submit",{'usepjs':usepjs},$.ncbi.searchbar.doSearch);
        theSearchInput.on("ncbiautocompleteenter ncbiautocompleteoptionclick", function(){theForm.submit();});
        //a work around for JSL-2067
        dbNode.trigger("change");
        //iOS 8.02 changed behavior on autofocus, should probably check other mobile devices too
        if (sbConfig.afs == "yes" && !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) ){ 
            window.setTimeout(function(){
                try{
                	var x = window.scrollX, y = window.scrollY; // EZ-8676
                	
                    var size= originalTerm.length;
                    if (size == 0 || /\s$/.test(originalTerm))
                        theSearchInput.focus()[0].setSelectionRange(size, size);
                    else
                        theSearchInput.focus().val(originalTerm + " ")[0].setSelectionRange(size+1, size+1);
                        
                    window.scrollTo(x, y);
                }
                catch(e){} //setSelectionRange not defined in IE8
            },1);
        }
        
        //set the query changed flag true after a few seconds, still prevents scripted clicking or stuck enter key
        window.setTimeout(function(){$.ncbi.searchbar.setSearchModified();},2000);
         
     });//End of DOM Ready

})(jQuery);

/*
a call back for the 'Turn off' link at the bottom of the auto complete list
*/
function NcbiSearchBarAutoComplCtrl(){
    jQuery("#term").ncbiautocomplete("turnOff",true);
    if (typeof(NcbiSearchBarSaveAutoCompState) == 'function')
        NcbiSearchBarSaveAutoCompState();
 }

 



;
(function($) {
    $('div.portlet, div.section').each(function() { 
        PageSectionInit(this); 
    });
})(jQuery);
    
function PageSectionInit(element) {
    var post_url = '/myncbi/session-state/',
        $ = jQuery,
        self = $(element),
        anchor = self.find('a.portlet_shutter'),
        content = self.find('div.portlet_content, div.sensor_content');

    // we need an id on the body, make one if it doesn't exist already
    // then set toggles attr on anchor to point to body
    var id = content.attr('id') || $.ui.jig._generateId('portlet_content');
    
    // Check if attribute is present
    if (anchor.attr('toggles'))
    {
        // Already initialized
        return;
    }
    
    anchor.attr('toggles', id);
    content.attr('id', id);

    // initialize jig toggler with proper configs, then remove some classes that interfere with 
    // presentation
    var togglerOpen = anchor.hasClass('shutter_closed')  ?  false  :  true; 

    anchor.ncbitoggler({
        isIcon: false,
        initOpen: togglerOpen 
    })
        .removeClass('ui-ncbitoggler-no-icon')
        .removeClass('ui-widget');

    // get rid of ncbitoggler css props that interfere with portlet styling, this is hack
    // we should change how this works for next jig release
    anchor.css('position', 'absolute')
        .css('padding', 0 );

    // trigger an event with the id of the node when closed
    anchor.bind( 'ncbitogglerclose', function() {
        anchor.addClass('shutter_closed');
        
        $.post(post_url, { section_name: anchor.attr('pgsec_name'), new_section_state: 'true' });
    });

    anchor.bind('ncbitoggleropen', function() {
        anchor.removeClass('shutter_closed');
        $.post(post_url, { section_name: anchor.attr('pgsec_name'), new_section_state: 'false' });
    });

    /* Popper for brieflink */
    self.find('li.brieflinkpopper').each( function(){
        var $this = $( this );
        var popper = $this.find('a.brieflinkpopperctrl') ;
        var popnode = $this.find('div.brieflinkpop');
        var popid = popnode.attr('id') || $.ui.jig._generateId('brieflinkpop');
        popnode.attr('id', popid);
        popper.ncbipopper({
            destSelector: "#" + popid,
            destPosition: 'top right', 
            triggerPosition: 'middle left', 
            hasArrow: true, 
            arrowDirection: 'right',
            isTriggerElementCloseClick: false,
            adjustFit: 'none',
            openAnimation: 'none',
            closeAnimation: 'none',
            delayTimeout : 130
        });
    });    
        
} // end each loop

;
(function( $ ){ // pass in $ to self exec anon fn
    // on page ready
    $( function() {
    
        // Initialize popper
        $('li.ralinkpopper').each( function(){
            var $this = $( this );
            var popper = $this;
            var popnode = $this.find('div.ralinkpop');
            var popid = popnode.attr('id') || $.ui.jig._generateId('ralinkpop');
            popnode.attr('id', popid);
            popper.ncbipopper({
                destSelector: "#" + popid,
                destPosition: 'top right', 
                triggerPosition: 'middle left', 
                hasArrow: true, 
                arrowDirection: 'right',
                isTriggerElementCloseClick: false,
                adjustFit: 'none',
                openAnimation: 'none',
                closeAnimation: 'none',
                delayTimeout : 130
            });
        }); // end each loop
        
    });// end on page ready

})( jQuery );


function historyDisplayState(cmd)
{
    var post_url = '/myncbi/session-state/';

    if (cmd == 'ClearHT')
    {
        if (!confirm('Are you sure you want to delete all your saved Recent Activity?'))
        {
            return;
        }
    }

    var ajax_request = jQuery.post(post_url, { history_display_state: cmd })
        .complete(function(jqXHR, textStatus) {    
        
            var htdisplay = jQuery('#HTDisplay');
            var ul = jQuery('#activity');

            if (cmd == 'HTOn') 
            { 
                // so that the following msg will show up
                htdisplay.removeClass();
                
                if (jqXHR.status == 408) 
                { 
                    htdisplay.html("<p class='HTOn'>Your browsing activity is temporarily unavailable.</p>");
                    return;
                }
                
                if (htdisplay.find('#activity li').length > 0)
                {
                    ul.removeClass('hide');    
                }
                else
                {
                    htdisplay.addClass('HTOn');
                }
                
            }         
            else if (cmd == 'HTOff') 
            {                         
                ul.addClass('hide'); 
                htdisplay.removeClass().addClass('HTOff');    // make "Activity recording is turned off." and the turnOn link show up             
            }
            else if (cmd == 'ClearHT') 
            { 
                if (htdisplay.attr('class') == '') 
                {                 
                    htdisplay.addClass('HTOn');  // show "Your browsing activity is empty." message                                  

                    ul.removeClass().addClass('hide'); 
                    ul.html('');
                }
            } 
        });

}


;
/*
  The following is adapted from the "highlight" jQuery extension by Johann Burkard:
  <http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
  
  Calling patterns:
  
    - Highlight the word "fleegle" wherever it appears in something with 
      class "content", using the default highlight-class "highlight":
          $('.content').highlight("fleegle");

    - Use a different class name for highlighting:
          $('.content').highlight("fleegle", {
              'highlight-class': 'term-highlight'
          });
  
  Options:
    - highlight-class:  string; class name to add to the <span> that
      marks matched text.
    - match-word:  boolean; default true.

  Original heading info:

    highlight v3
    Highlights arbitrary terms.
    <http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
    
    MIT license.
    
    Johann Burkard
    <http://johannburkard.de>
    <mailto:jb@eaio.com>
*/

if (typeof(jQuery) != "undefined") {

    jQuery.fn.highlight = function(t, opts) {
        var term = t.toUpperCase();
        var defaults = {
            'highlight-class': 'highlight',
            'match-word': true
        }
        var options = jQuery.extend({}, defaults, opts);

        // The jQuery extension applies the function below to each 
        // jQuery object that matches the selector.
        return this.each(function() {
            innerHighlight(this, term);
        });

        // Here we define the function that does the work.  This highlights
        // all the occurrences of term within text node descendants of node.
        function innerHighlight(node, term) {
            // skip will be the return value.  It is set to one if we add a 
            // new <span> node.
            var skip = 0;
            
            // If this is a TEXT_NODE
            if (node.nodeType == 3) {
                // Find the pattern
                var re = options['match-word'] ? '\\b' + term + '\\b' : term; 
                var matchResult = node.data.toUpperCase().match(re);
                if (matchResult) {
                    var pos = matchResult.index;
                    
                    // Pattern was found, create a <span>
                    var spannode = document.createElement('span');
                    spannode.className = options['highlight-class'];
                    // splitText() creates two sibling DOM text nodes
                    // where there used to be one.
                    var middlebit = node.splitText(pos);
                    // After the next operation, we have three
                    var endbit = middlebit.splitText(term.length);
                    // Make a copy of the matched text node, and insert
                    // it into the span.
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    // Replace the original matched text node with the span
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            }
            
            // If this is an element that has children, and is not <script> or 
            // <style>, then recurse into the child nodes.
            else if (node.nodeType == 1 && 
                     node.childNodes && 
                     !/(script|style)/i.test(node.tagName)) 
            {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    // Note the "i +=" in the next line.  If the current iteration of 
                    // innerHighlight causes a (span) node to be added, then we don't
                    // want to rerun innerHighlight on that.  We skip over it.
                    i += innerHighlight(node.childNodes[i], term);
                }
            }
            
            return skip;
        }
    };

    // This function is part of the original jQuery extension, but we dont' use it 
    // in PBooks, because there is no way (currently) of removing the highlighting.
    // If we do ever decide to implement that, then this could be improved by
    // just changing the class name, instead of putting the DOM back the way it was.
    
    jQuery.fn.removeHighlight = function() {
      return this.find("span.highlight").each(function() {
        this.parentNode.firstChild.nodeName;
        with (this.parentNode) {
          replaceChild(this.firstChild, this);
          normalize();
        }
      }).end();
    };
}



;
/*
  PBooksSearchTermHighlighter
  This drives the highlighting of search terms in a book part.
  It depends on a global JSON object named PBooksSearchTermData, which is
  dynamically generated, and contains the highlight color and the list of
  search terms that should be highlighted.
*/

   
if (typeof jQuery != "undefined" &&
    typeof jQuery.fn.highlight == "function" &&
    typeof PBooksSearchTermData != "undefined") 
{
    (function($) {

        // First check the date to see if the highlighting has expired or not.
        // If the search occurred on the same day as today, we'll highlight.
        var expired = true;   // assume expired.
        
        var searchDate = PBooksSearchTermData.dateTime;
        if (searchDate) {
            var da = searchDate.match(/(\d+)\/(\d+)\/(\d+)/);
            if (da && da[0]) {
                // "- 0" converts each of these into an integer.
                var searchDay = da[2] - 0;
                var searchMonth = da[1] - 0;
                var searchYear = da[3] - 0;

                var now = new Date();
                var nowDay = now.getDate();
                var nowMonth = now.getMonth() + 1;
                var nowYear = now.getFullYear();
                if (nowDay == searchDay &&
                    nowMonth == searchMonth &&
                    nowYear == searchYear) 
                {
                    expired = false;
                }
              /*
                console.info("searchDate = " + searchDate)
                console.info("search: day = " + searchDay + ", month = " + searchMonth + 
                             ", year = " + searchYear);
                console.info("current date/time is " + now);
                console.info("now:  day = " + nowDay + ", month = " + nowMonth + 
                             ", year = " + nowYear);
              */
            }
        }
        if (expired) { return; }



        // Let's first add a CSS rule to cause the highlighting to occur in the
        // right style.  The value of this is either "none", "bold", or a CSS
        // color name or numeric code.
        var highlighter = PBooksSearchTermData.highlighter;
        var highlightStyle;
        if (highlighter == "none") {
            highlightStyle = "";
        }
        else if (highlighter == "bold") { 
            highlightStyle = "font-weight: bold;";
        }
        else {
            highlightStyle = "background-color: " + highlighter + ";";
        }
        
        var style = 
            "<style type='text/css'>\n" +
            "  .term-highlight { " + highlightStyle + " }\n" +
            "</style>\n";
        $(style).appendTo("head");
        
        var main = $('div.main-content');
        var terms = PBooksSearchTermData.terms;
        for (var i = 0; i < terms.length; ++i) {
            main.highlight(terms[i], {
                'highlight-class': 'term-highlight'
            });
        }
    })(jQuery);
}