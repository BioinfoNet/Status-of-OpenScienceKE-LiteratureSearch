


var ECApp = ECApp || {
    stdTimeout: 60000,
    /**
     * Displays the access icons ahead of the article name
     *  
     * @param {string} containerOuter   The outer containing class
     * @param {string} containerInner   The inner containing class
     * @param {string} target           The target class
     * @param {string} url              The url for the AHAH call
     * @param {string} title            The title class
     * @param {string} callback         An additional function to be executed upon AHAH success
     *  
     */
    displayAccessIcons: function(containerInner, target, ahahUrl, title, callback) {
        //if (ingentaCMSApp.consoleOK) {console.info("displayAccessIcons() parameters:\n1. Inner container: " + containerInner + "\n2. Target: " + target + "\n3. AHAHUrl: " + ahahUrl + "\n4. Title: " + title);}
        var overallContainer,
            postdata,
            $imageObjs,
            $resultItemHeadingContainer,
            $resultItemHeadingContainerIcons,
            $spinnerImageObj
            overallContainer = "." + containerInner;
        
         if (!containerInner) {
             console.log("Empty containerInner this is required!");
         }
  
        $resultItemHeadingContainer = $(overallContainer).not(".accessDetermined");
        
        $resultItemHeadingContainerIcons = $resultItemHeadingContainer.find(".accessIcons");

        if (!$resultItemHeadingContainerIcons.find("img.loading-access-icon").length) {
            $resultItemHeadingContainerIcons.prepend('<img src="/images/admin/spinner.gif" alt="" class="loading-access-icon" />');
        }

        $imageObjs = $resultItemHeadingContainer.children("span.keyicon");
        $imageObjs.css({"cursor":"progress"});
        $spinnerImageObj = $(".loading-access-icon"); 
        
        var articleIds = "";
        $("form.ahahTocArticles").each(function(form){
		if(articleIds.length) articleIds += ",";
		articleIds += $(this).find('input[name="articleIds"]').val();
	});
	$("form.ahahTocArticles").find('input[name="articleIds"]').val(articleIds);

        postdata = $("form.ahahTocArticles").serialize();

        // Only run if data have been serialised...
        if (postdata) {
            $.ajax({
                url: ahahUrl,
                timeout: ECApp.stdTimeout,
                type: "POST",
                data: postdata,
                cache: true,
                success: function(resp, statusText) {
                    var here,
                        iconLocation,
                        responseItem,
                        responseItemUrl,
                        responseObj = $(resp),
                        responseObjImage,
                        url;

                    $resultItemHeadingContainer.find("." + target).find("." + title).find("a").each(function(index) {
                        here = $(this);
                        url = here.attr("href");
                        responseItem = $(responseObj).children("a").eq(index);
                        responseObjImage = responseItem.children("span.keyicon");
                        responseItemUrl = $.trim(responseItem.attr("href")); 
        
                        // Sometimes the url in (browseItem.tag) will have querystring parameters appending to it) we need to remove these
                        if (url.indexOf("?") > 0) {
                            url = url.substr(0, url.indexOf("?"));
                        }
        
                        // We also need to remove jsessionid from Ajax request on first view
                        if (url.indexOf(";jsessionid") > 0) {
                            url = url.substr(0, url.indexOf(";jsessionid"));
                        }
 
                        // There are several reasonable (although unusual) reasons why the indexes wouldn't line up - in 
                        // these cases just iterate through looking for the right one       
                        if (responseItemUrl.indexOf(url) == -1) {
                            $(responseObj).children("a").each(function() {
                                var ri = $(this);
                                var u = $.trim(ri.attr("href"));
                                if (u.indexOf(url) !== -1) {
                                    responseItem = ri;
                                    responseItemUrl = u;
                                    responseObjImage = ri.children("span.keyicon")
                                }
                            });
                        }

                        $spinnerImageObj.remove();
                        if (responseItemUrl.indexOf(url) !== -1) {
                            here.closest(overallContainer).addClass("accessDetermined");
                            iconLocation = here.parents("." + target).find(".accessIcons");

                            if ($.trim(responseItem.text()) !== "EMPTY" && !iconLocation.find("span.keyicon").length) {
                                iconLocation.prepend(responseObjImage);
                           }
                        }
                    });
        
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                },
                error: function(req, statusText) {
                    var cMsg = "displayAccessIcons() AJAX POST failed due to: " + req.status + " (" + req.statusText + ")";
                    $spinnerImageObj.remove();
                    if (ingentaCMSApp.consoleOK) {console.warn(cMsg);}
                },
                complete: function(req, statusText) {
                    $spinnerImageObj.remove();
                }
            });
        } else {
            $spinnerImageObj.remove();
        }
    },
    /**
     * Shows e-commerce and other details in the description
     *  
     * @param {obj}    here      Current location (this)
     * @param {string} container The containing class
     * @param {string} ahahurl   The url for the AHAH call
     * @param {string} title     The title class
     *
     */
    showDescription: function(here, container, ahahUrl, title) {
         //if (ingentaCMSApp.consoleOK) {console.info("showDescription() parameters:\n1. Here     : " + here + "\n2. Container: " + container + "\n3. AHAHUrl  : " + ahahUrl + "\n4. Title    : " + title);}
        var accessIcon,
            appendPoint,
            $currentLoc,
            deepDyveRequired,
            itemUrl,
            postdata,
            selectedObjContainer,
            signalClass,
            spinnerImageObj;

        $currentLoc = $(here);
        $currentLoc.parent().find(".minus").show();
        $currentLoc.hide();

        deepDyveRequired = true;
        signalClass = "descriptionOpened";
        selectedObjContainer = $currentLoc.closest("." + container);
        accessIcon = selectedObjContainer.siblings(".accessIcons").find("span");

        // Check for a key icon...
        if (accessIcon.hasClass("keyicon")) {
            deepDyveRequired = false;
        }

        // Let's slide down the hidden li now to show the description
        $(selectedObjContainer).find(".description").slideDown();

        // Append and test for a class to determine if items description has already been opened notice the NOT
        if (!$(selectedObjContainer).hasClass(signalClass)) {
            $(selectedObjContainer).addClass(signalClass);

            // First things first lets get the URI of the Item (we can get this from the URL of the search listing title)
            itemUrl = $(selectedObjContainer).find("." + title).children("a").attr("href");
            
            //remove any parameter added to the URL
             if (itemUrl.indexOf('?') != -1){
                 itemUrl = itemUrl.substring(0, itemUrl.indexOf('?'));
             }
             
          

            // Let's now define the point in which the fulltext / price should be appended into the HTML
            appendPoint = $(selectedObjContainer).find(".description").children(".extraitems");

            // Let's append a temp spinner image while we wait on the ahah response
            // We only wish to append once before load
            if (appendPoint.not(".loading-fulltextorprice").length) {
                appendPoint.prepend('<img src="/images/admin/spinner.gif" alt="" class="loading-fulltextorprice" style="float:left;" />');
            }
            spinnerImageObj = appendPoint.children("img.loading-fulltextorprice");

            // We now need to create the data for the AHAH page
            postdata = {
                fmt: "ahah",
                ahahcontent: "itemaccess",
                ahahitem: itemUrl
            };
            
            // OK this is where the fun begins now we add Ajax
            if (itemUrl) {
                $.ajax({
                    url: ahahUrl,
                    data: postdata,
                    timeout: ECApp.stdTimeout,
                    type: "POST",
                    success: function(resp, statusText) {
                        // We just need to append the response and remove the spinner image
                        spinnerImageObj.remove();
                        appendPoint.append(resp);
                        ingentaCMSApp.addPdfMessageLogging(appendPoint);
                     /*   if (deepDyveRequired) {
                            var deepDyveInsertion = $(appendPoint).find(".deepdyve");
                            if ((deepDyveInsertion.length > 0) ) {
                               // ingentaCMSApp.insertDeepDyveLink("button", deepDyveInsertion);
                            }
                        }*/
                    },
                    error: function(req, statusText) {
                        var cMsg = "showDescription() AHAH POST request failed due to: " + req.status + " (" + req.statusText + ")";
                        spinnerImageObj.remove();
                        if (ingentaCMSApp.consoleOK) {console.warn(cMsg);}
                    },
                    complete: function(req, statusText) {
                        spinnerImageObj.remove();
                    }
                });
            }
        }
    },
    /**
     * Shows e-commerce and other details in all the descriptions
     *  
     * @param {string} containerOuter   The outer containing class
     * @param {string} containerInner   The inner containing class
     * @param {string} ahahurl          The url for the AHAH call
     * @param {string} title            The title class
     *
     */
    showAllDescriptions: function(containerOuter, containerInner, ahahUrl) {
        // if (ingentaCMSApp.consoleOK) {console.info("showAllDescriptions() parameters:\n1. Outer Container: " + containerOuter + "\n2. Inner container: " + containerInner + "\n3. AHAHUrl  : " + ahahUrl);}
        var itemList,
            postdata,
            postSelector,
            resultItemHeadingContainer,
            signalClass,
            target;

        // Construct a jQuery selector...
        if (containerOuter) {
            itemList = $("." + containerOuter + " ." + containerInner);
            postSelector = "." + containerOuter + " ";
        } else {
            itemList = $("." + containerInner + " ");
            postSelector = "";
        }
        
        signalClass = "descriptionOpened";
        
        // Toggle all individual SHOW/HIDE...
        itemList.find(".showhide").find("span.plus").hide();
        itemList.find(".showhide").find("span.minus").show();
        
        // Slide down all descriptions...
        itemList.find(".description").slideDown();

        target = itemList.find(".itemDescription").not("." + signalClass).find(".description").find(".extraitems");
     
        // Add a spinner to indicate more work...
        if (!target.hasClass("spinner")) {
            target.addClass("spinner");
            target.prepend('<img src="/images/admin/spinner.gif" alt="loading" class="loading-fulltextorprice" style="float:left;" />');
        }
        
        // Grab the ids
        postdata = $(postSelector + "form.ahahTocArticles").serialize();
        
        // Now update as needed...
        postdata = postdata.replace("ahahcontent=toc", "ahahcontent=allitemaccess");
        
        if (postdata) {
            $.ajax({
                url: ahahUrl,
                timeout: ECApp.stdTimeout,
                type: "POST",
                data: postdata,
                success: function(resp, statusText) {
                    var appendPoint,
                        currDesc,
                        currIcon,
                        currItem,
                        here;
                    // Loop through the response
                    $(".fulltextandtools", resp).each(function(index) {
                    	var seeMoreIndex = 0;
                    	if ($(".search-results-options-container .showAllDescriptions").css("display") == 'none') {
                    		seeMoreIndex = parseInt($("#currentPageNum").val() - 1) * parseInt($("#defaultPageSize").val());
                    	}
                        here = $(this);
                        currItem = itemList.eq(seeMoreIndex + index);
                        currDesc = currItem.find(".itemDescription");
                        currIcon = currItem.find(".accessIcons").find("span");
                        appendPoint = currItem.find(".description").find(".extraitems");
                        if (!currDesc.hasClass(signalClass)) {
                            currDesc.addClass(signalClass);
                            // We just need to append the response and remove the spinner image
                            appendPoint.find("img.loading-fulltextorprice").remove();
                            appendPoint.append(here);
                            ingentaCMSApp.addPdfMessageLogging(appendPoint);
                            // DeepDyve only needed if not otherwise available...
                           if (!currIcon.hasClass("keyicon")) {
                   
                            }
                        } else {
                            appendPoint.find("img.loading-fulltextorprice").remove();
                        }
                        
                    });
                },
                error: function(req, statusText) {
                    var cMsg = "showAllDescriptions() AHAH POST request failed due to: " + req.status + " (" + statusText + ")";
                    itemList.find("img.loading-fulltextorprice").remove();
                    if (ingentaCMSApp.consoleOK) {console.warn(cMsg);}
                }
            });
        }
    }
};

$(document).ready(function() {

    $(".showDescriptions").click(function(e) {
        var $this = $(this);
        e.preventDefault();
        $this.next(".hideDescriptions").removeClass("inactive");
        $this.addClass("inactive");
        $(".resultItem .plus").each(function(index) {
            $(this).trigger("click");
        });
    });

    $(".hideDescriptions").click(function(e) {
        var $this = $(this);
        e.preventDefault();
        $this.prev(".showDescriptions").removeClass("inactive");
        $this.addClass("inactive");
        $(".resultItem .minus").trigger("click");
    });
    
});
