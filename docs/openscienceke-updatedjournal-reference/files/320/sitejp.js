/* JS DEFAULTS (override on a per-site basis) 
 * 
 * This file has dependancies on:
 * JQuery
 * jQuery UI
 * jQuery.bookmarks.js
 * jQuery.form.js
 * 
 * */

var Site = {
    fontSizes : { one: "75%", two: "85%", three: "95%", four: "105%", five: "115%", six: "125%", seven: "135%" }
};

var findToggleContent = function(obj) {
    return $(obj).siblings(".togglecontent").add($(obj).parent().siblings(".togglecontent"));
};

/* */

/* ONLOAD ACTIONS */
$(document).ready(function(){

    // cookies policy
    var ShowHidePopUp = true;

    function checkForCookie(){
        var ca = document.cookie.split(";");
        var c, i;
        var cookiePopup = $(".mainCookiesPopUp");
        
      if (cookiePopup.length > 0){
        var nameEQ = "cookiepolicypopup=";
        for (i = 0; i < ca.length; i++) {
            c = ca[i];

            if (c.indexOf(nameEQ) === 1) {
                return ShowHidePopUp = false;
            } else {
                ShowHidePopUp = true;
            }
        }

        if (ShowHidePopUp) {
            cookiePopup.fadeIn().delay(7000).fadeOut();
        	}
    	}
 	}
    // sets cookie if they agree to it..
        $(".setCookie").click(function(e) {
            // alert("work?");
            document.cookie="cookiepolicypopup=1; expires=Sunday, 15-Jan-2018 08:00:00 GMT; path=/";
            $(".setCookie").text("Cookie Policy Aproved");
            e.preventDefault();
        });
        $(".closePolicyPopup").click(function(){
            $(".mainCookiesPopUp").hide();
        });
    // checks for Cookie on first load
        checkForCookie();
        

    /* set up the toggle action on expandable lists */
    $(".expandable span.toggle").wrap("<a href='#' class='toggle'></a>");

    /* actions */
     $("body").on("click", "a.toggle", function(e) {
	     var $this = $(this);
	     if ($this.hasClass("expanded")) {
	         findToggleContent($this).slideUp(function() {
	             $this.removeClass("expanded");
	             $this.blur();
	         });
	     } else {
	         findToggleContent($this).slideDown();
	         $this.addClass("expanded");
	     }
	     e.preventDefault();
	 });

   $("#sizeswitcher a").click(function(){
      $("#sizeswitcher a").removeClass("selectedsize");
      var index = $(this).attr("class");
      var size = Site.fontSizes[index];
      $("body").css({"font-size":size});
      Site.cookie("fontSize",size, {path:"/"});
      $("#sizeswitcher a." + index).addClass("selectedsize");
      return false;
   });
   var size = Site.cookie("fontSize");
   if (size) {
      for (var key in Site.fontSizes) {
         if (size === Site.fontSizes[key]) {
            $("#sizeswitcher a." + key).addClass("selectedsize");
         }
      }
   }

    $("#bookmarking a").click(function() {
        window.open(($(this).attr("href") + "?url=" + window.location.href), "bookmarking", "toolbar=no,width=700,height=400");
        return false;
    });

    $(".jumper").change(function() {
        if (($(this).val() !== null) && ($(this).val() !== "")) {
            window.location.href = $(this).val();
        }
    });

    //- jQuery UI instantiations -------------------------------------------------------------- -->

    var skinPublishingDates = $("#skinPublishingDates").html();
    var newDateValue = skinPublishingDates !== null ? skinPublishingDates + ":+nn" : "";

    $(".xdate").datepicker({changeMonth: true, changeYear: true, yearRange: newDateValue, showButtonPanel: false, numberOfMonths: 1, dateFormat: "yy-mm-dd"});


    $(".showAbstracts").click(function() {
        $(".hideAbstracts").removeClass("inactive");
        $(this).addClass("inactive");
        $(".abstract").slideDown("slow");
        return false;
    });

    $(".hideAbstracts").click(function() {
        $(".showAbstracts").removeClass("inactive");
        $(this).addClass("inactive");
        $(".abstract").slideUp("slow");
        return false;
    });

    $(".showDescriptions").click(function() {
        $(".hideDescriptions").removeClass("inactive");
        $(this).addClass("inactive");
        $(".description").slideDown("slow");
        $(".minus").show();
        $(".plus").hide();
        return false;
    });

    $(".hideDescriptions").click(function() {
        $(".showDescriptions").removeClass("inactive");
        $(this).addClass("inactive");
        $(".description").slideUp("slow");
        $(".plus").show();
        $(".minus").hide();
        return false;
    });

    /* replace all broken images with placeholder images*/
    $("img.cover").error(function () {
          $(this).unbind("error").attr("src", "/images/jp/placeholdercover_small.gif");
        });



    function parseDate(value) {
        var parts = value.split("-");
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    
    if ($.validator) {

        $("form.validated").validate({
            onfocusout: function(element) {
                if (!this.checkable(element)) {
                    this.element(element);
                }
            }
        });

        // Add generic validation methods
        $.validator.addMethod("email", function(value, element) {
            var localhostregex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@localhost$/;
            if (localhostregex.test(value)) {
                return true;
            } else {
                // from original validation library
                return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
            }
        }, $.validator.messages.email);

        $.validator.addMethod("date", function(value, element) {
            var d, parts;
            if (value === "") {
                return true;
            }
            parts = value.split("-");
            if (parts.length !== 3) {
                return false;
            }
            d = new Date(parts[0], parts[1] - 1, parts[2]);

            return d.getFullYear() == parts[0] && d.getMonth() + 1 == parts[1] && d.getDate() == parts[2];
        }, $.validator.messages.date);

        $.validator.addMethod("dateAfter", function(value, element, params) {
            if (value === "") {
                return true;
            }
            var otherValue = $(params).val();
            if (otherValue === "") {
                return true;
            }

            return parseDate(value) > parseDate(otherValue);
        });

        $("form.validated .xdate").each(function() {
            $(this).rules("add", {
                date: true,
                messages: {
                    date: $("#valid_date").html()
                }
            });
        });
        
        $("form.validated .todate").each(function() {
            $(this).rules("add", {
                dateAfter: "#" + this.id.replace("end", "start").replace("to", "from"),
                messages: {
                    dateAfter: $("#date_after").html()
                }
            });
        });
        
        $("form.validated .email").each(function() {
            $(this).rules("add", {
                email: true,
                messages: {
                    email: $("#valid_email_address").html()
                }
            });
        });
        
        $("form.validated .required").each(function() {
            $(this).rules("add", {
                required: true,
                messages: {
                    required: $("#required_field").html()
                }
            });
        });
    }

    $("#recommendForm").dialog({
        autoOpen:false,
        height:500,
        width:800,
        modal: true,
        title: $("#recommend_this_title").html()
    });

    $("#recommendForm").dialog({
        autoOpen:false,
        height:500,
        width:800,
        modal: true,
        title: $("#recommend_this_title").html()
    });

    $("#recommendToLibrarian").click(function() {
       if ($("#recommendToLibraryUrl").size() > 0) {
          $("#recommendToLibraryIFrame").load($("#recommendToLibraryUrl").text(), {}, function() {
             var form = $("#recommendForm");
             form.dialog({
                autoOpen:false,
                height:500,
                width:800,
                modal: true,
                title: $("#recommend_this_title").html()
             });
             var formElement = $("#recommendToLibraryForm");
             formElement.validate({
                onfocusout: function(element) {
                   if (!this.checkable(element)) {
                      this.element(element);
                   }
                }
             });
             $.extend($.validator.messages, {
                required: $("#required_field").html(),
                email: $("#valid_email_address").html()
             });
             form.dialog("open");
             form.dialog("option", "buttons", {
                Recommend: function() {
                   if (formElement.valid()) {
                      form.dialog("option", "buttons", {
                         Close: function() {
                            form.dialog("close");
                         }
                      });
                      $.post(formElement.attr("action"), formElement.serialize(), function(data) {
                         form.empty().append(data);
                      });
                   }
                },
                Close: function() {
                   form.dialog("close");
                }
             });
          });
       } else {
          $("#recommendForm").dialog("open");
          // If the form isn't currently visible (e.g. if we are showing the thank you page) then show it
          $("#recommendToLibraryForm").show();
          // Similarly hide the thank you message
          $("#recommendation_sent").hide();
          return false;
       }
    });

    if ($("#recommendToLibraryForm").size() > 0) {
        $.extend($.validator.messages, {
            required: $("#required_field").html(),
            email: $("#valid_email_address").html()
        });
        
        $("#recommendToLibraryForm").each(function() {
            // Replace the default submit handling with an ajax submit
            this.submit = function() {
               $(this).ajaxSubmit({
                  success: function() {
                     var formContents = $("#recommendForm").clone(true).children();
                     // Here we do the opposite, hide the form and make sure the thank you message shows
                     $("#recommendToLibraryForm").hide();
                     $("#recommendation_sent").remove().insertBefore($("#recommendToLibraryForm")).show();

                     var event = $(".statsevent").html();
                     var statsurl = $("#hiddenContext").text() + "/statslogredirect";

                     if (event !== null) {
                        $.post(statsurl, {statsLogContents:event});
                     }
                 }});
                 return false;
              };
        });
        $("#recommendToLibraryForm").submit(function(e) {
            this.submit();
            e.preventDefault();
            return false;
        });
    }

    var previouslySavedSearch = false;
    $(".savesearchlink").click(function(e) {
      e.preventDefault();
      if (previouslySavedSearch) {
         return;
      }
      previouslySavedSearch = true;
      $.post($(this).attr("href") + "&ajax=true", function(response) {
         if (response.status === "success") {
            $("#savedSearchMessage").show();
            $("#savedSearchUndoLink").attr("href",
               $("#savedSearchUndoLink").attr("href").replace(/searchId=[0-9]*/, "searchId=" + response.id)
            );
         }
      });
      return false;
    });
    $("#savedSearchUndoLink").click(function(e) {
        e.preventDefault();
        $("#savedSearchMessage").hide();
        $.post($(this).attr("href"), function(response) {
            previouslySavedSearch = false;
        });
    });



    var fulltextwidth = (screen.width / 100) * 80;

    if (fulltextwidth > $(window).width()) {
        fulltextwidth = $(window).width();
    }

    $("#fulltext").dialog({
        autoOpen: false,
        height: "auto",
        width: fulltextwidth,
        modal: true,
        resizable: false,
        dialogClass: "fulltextoverlay",
        position: {
            my: "top",
            at: "top",
            of: $("body")
        }
    });

    $("#fulltexttoc .toclist li:first").addClass("first");
    $("#fulltexttoc .toclist li:last").addClass("last");

    $("#fulltext").bind("dialogbeforeclose", function(event) {
        $("#fulltext #contentarea #fulltextframe").remove();
    });

    $("a.fulltextviewtoclink").toggle(function() {
        $("#fulltexttoc").slideDown();
        $("#fulltexttoc .toclist li .sectionlist").hide();
        $("#fulltexttoc .toclist .active .sectionlist").show();
        $(this).addClass("expanded");
        return false;
    },function(){
        $("#fulltexttoc").slideUp();
        $(this).removeClass("expanded");
        return false;
    });

    $(".launchfulltextlink").click(function() {
        $("#fulltext").dialog("open");
        if ($("#fulltexttoc .toclist .active").size() > 0) {
            var current = $("#fulltexttoc .toclist .active");
            $(current).find(".sectionlist").slideUp();
            $(current).find(".sectionlist").removeClass("expanded");
            $(current).removeClass("active");
        }
        $("#fulltexttoc .toclist li:first").addClass("active");
        var sectionsurl = $("#hiddenContext").html() + $("#fulltexttoc .toclist .active a").attr("rel") + "?fmt=ahah&contenttype=chaptersections";

        $("#fulltexttoc .toclist .active .sectionlist").slideDown();
        $("#fulltexttoc .toclist .active .sectionlist").addClass("expanded");
        $("#fulltext #contentarea .fulltextnavigation .nav .previouschapter").addClass("inactive");
        $("#fulltext #contentarea .fulltextnavigation .nav .firstchapter").addClass("inactive");
        $("#fulltext #contentarea .fulltextnavigation .nav .nextchapter").removeClass("inactive");
        $(".fulltextoverlay").prepend($(".fulltextoverlay .ui-dialog-titlebar .ui-dialog-titlebar-close"));
        $(".fulltextoverlay .ui-dialog-titlebar").remove();
        var srcurl = $(this).attr("href");
        $("#fulltext #contentarea").append("<iframe id=\"fulltextframe\" name=\"fulltextframe\" src=\"" + srcurl + "\"  frameborder=\"0\" border=\"0\"  ></iframe><div class=\"hiddenurl\">" + srcurl + "</div>");
        return false;
    });

    $("#fulltext #contentarea .fulltextnavigation .new").click(function() {
        var frameposition = 0,
            i,
            newurl;

        for (i = 0; i < frames.length; i++) {
            if (frames[i].name === "fulltextframe") {
                frameposition = i;
            }
        }
        newurl = jQuery.trim(String(frames[frameposition].location));
        window.open(newurl);
        return false;
    });
    
    function moveDocument(linkurl) {
        var frameposition = 0,
            i,
            newurl;

        for (i = 0; i < frames.length; i++) {
            if (frames[i].name === "fulltextframe") {
                frameposition = i;
            }
        }
        newurl = jQuery.trim(String(frames[frameposition].location).split("#")[0]) + jQuery.trim(linkurl);
        if (newurl !== String(frames[frameposition].location)) {
            $("#fulltext #contentarea #fulltextframe").remove();
            $("#fulltext #contentarea").append("<iframe id=\"fulltextframe\" name=\"fulltextframe\" src=\"" + newurl + "\"  frameborder=\"0\" border=\"0\"  ></iframe>");
        }
    }

    $("body").on("click", "#fulltexttoc .toclist .sectionlink", function(e) {
        moveDocument($(this).attr("href"));
        return false;
    });



    $("#fulltexttoc .toclist .chapterlink").click(function() {
        if ($(this).parent("li").hasClass("active")) {
            if ($(this).parent("li").find(".sectionlist").size() > 0) {
                var sectionlist = $(this).parent("li").find(".sectionlist");
                if ($(sectionlist).hasClass("expanded")) {
                    $(sectionlist).slideUp();
                    $(sectionlist).removeClass("expanded");
                } else {
                    $(sectionlist).slideDown();
                    $(sectionlist).addClass("expanded");
                }
            }

        } else {
            var current = $("#fulltexttoc .toclist .active");
            $(current).find(".sectionlist").slideUp();
                $(current).find(".sectionlist").removeClass("expanded");
            $(current).removeClass("active");
            current = $(this).parent("li");
            $(current).addClass("active");
                if ($(current).find(".sectionlist").size() > 0) {
                    if ($(current).find(".sectionlist").is(":empty")) {
                        var sectionsurl = $("#hiddenContext").html() + $(this).attr("rel") + "?fmt=ahah&contenttype=chaptersections";
                        $.get(sectionsurl, function(resp) {
                            $(current).find(".sectionlist").html(resp);
                            $(current).find(".loadingspinner").remove();
                        });
                    }
            $(current).find(".sectionlist").slideDown();
                    $("#fulltexttoc .toclist .active .sectionlist").addClass("expanded");
                }
            if ($(current).hasClass("first")) {
                $("#fulltext #contentarea .fulltextnavigation .nav .previouschapter").addClass("inactive");
                $("#fulltext #contentarea .fulltextnavigation .nav .firstchapter").addClass("inactive");
            } else {
                $("#fulltext #contentarea .fulltextnavigation .nav .previouschapter").removeClass("inactive");
                $("#fulltext #contentarea .fulltextnavigation .nav .firstchapter").removeClass("inactive");
            }
            if ($(current).hasClass("last")) {
                $("#fulltext #contentarea .fulltextnavigation .nav .nextchapter").addClass("inactive");
            } else {
                $("#fulltext #contentarea .fulltextnavigation .nav .nextchapter").removeClass("inactive");
            }
            moveDocument($(this).attr("href"));
            return false;
        }
    });


    $("#fulltext #contentarea .fulltextnavigation .nav .previouschapter").click(function() {
        if ($(this).hasClass("inactive")) {
            return false;
        } else {
            var current = $("#fulltexttoc .toclist .active");
            current = $(current).prev("li");
            $(current).find(".chapterlink").click();
            return false;
        }
    });

    $("#fulltext #contentarea .fulltextnavigation .nav .firstchapter").click(function() {
        if ($(this).hasClass("inactive")) {
            return false;
        } else {
            $("#fulltexttoc .toclist li:first").find(".chapterlink").click();
            return false;
        }
    });

    $("#fulltext #contentarea .fulltextnavigation .nav .nextchapter").click(function() {
        if ($(this).hasClass("inactive")) {
            return false;
        } else {
            var current = $("#fulltexttoc .toclist .active");
            current = $(current).next("li");
            $(current).find(".chapterlink").click();
        return false;
        }
    });



    $(".browsefacetterm a").click(function() {
        var facetNames = $(".facets #facetnamessofar").html();
        var facetValues = $(".facets #facetvaluessofar").html();
        if (facetNames !== "") {
            facetNames = facetNames + ",";
        }
        if (facetValues !== "") {
            facetValues = facetValues + ",";
        }
        $("#facetedbrowseform #facetnames").val(facetNames + $(this).parent("li").find(".facetid").text());
        $("#facetedbrowseform #facetvalues").val(facetValues + $(this).parent("li").find(".termid").text());
        $("#facetedbrowseform").submit();
        return false;
    });

    $(".anysearchfacetlink").click(function() {
        var addedToNewParams,
            facetNames,
            facetNames_split,
            facetOptions,
            facetOptions_split,
            indices,
            indices_split,
            i,
            j,
            name_value_split,
            newFacetNames,
            newFacetOptions,
            newUrl,
            newParams,
            options,
            options_split,
            param_split = window.location.search.substring(1).split("&"),
            theFacet = $(this).attr("href");
        	

        for (i = 0; i < param_split.length; i++){
            name_value_split = param_split[i].split("=");
            if (name_value_split[0] === "facetNames") {
                facetNames = name_value_split[1];
            }
            if (name_value_split[0] === "facetOptions") {
                facetOptions = name_value_split[1];
            }
        }
        if (facetNames.length > 0){
        	facetNames_split = facetNames.split("+");
        }
        facetOptions_split = facetOptions.split("+");
        newFacetNames = "";
        newFacetOptions = "";
        for (i = 0; i < facetNames_split.length; i++){
            if (facetNames_split[i] === theFacet) {
                if (indices === "" || indices === undefined) {
                    indices = i;
                } else {
                    indices = indices + "," + i;
                }
                indices = indices + "";
            } else {
                if (newFacetNames === "" || newFacetNames === undefined) {
                    newFacetNames = facetNames_split[i];
                    newFacetOptions = facetOptions_split[i];
                } else {
                    newFacetNames = newFacetNames + "+" + facetNames_split[i];
                    newFacetOptions = newFacetOptions + "+" + facetOptions_split[i];
                }
                newFacetNames = newFacetNames + "";
                newFacetOptions = newFacetOptions + "";
            }
        }
        indices_split = indices.split(",");
        for (i = 0; i < indices_split.length; i++){
            if (options === "" || options === undefined) {
                options = facetOptions_split[indices_split[i]];
            } else {
                options = options + "," + facetOptions_split[indices_split[i]];
            }
            options = options + "";
        }

        options_split = options.split(",");
        for (i = 0; i < param_split.length; i++){
            name_value_split = param_split[i].split("=");
            addedToNewParams = false;
            for (j = 0; j < options_split.length; j++){
                if ((name_value_split[0] === ("option" + options_split[j])) || (name_value_split[0] === ("value" + options_split[j])) || (name_value_split[0] === ("operator" + options_split[j]))) {
                    if (newParams === "" || newParams === undefined) {
                        newParams = name_value_split[0] + "=";
                    } else {
                        newParams = newParams + "&" + name_value_split[0] + "=";
                    }
                    newParams = newParams + "";
                    addedToNewParams = true;
                }
            }
            if (!addedToNewParams) {
                if (name_value_split[0] === "facetNames") {
                    if (newFacetNames !== "") {
                        if (newParams === "" || newParams === undefined) {
                            newParams = name_value_split[0] + "=" + newFacetNames;
                        } else {
                            newParams = newParams + "&" + name_value_split[0] + "=" + newFacetNames;
                        }
                        newParams = newParams + "";
                    }
                } else if (name_value_split[0] === "facetOptions") {
                    if (newFacetOptions !== "") {
                        if (newParams === "" || newParams === undefined) {
                            newParams = name_value_split[0] + "=" + newFacetOptions;
                        } else {
                            newParams = newParams + "&" + name_value_split[0] + "=" + newFacetOptions;
                        }
                        newParams = newParams + "";
                    }
                } else {
                    if (newParams === "" || newParams === undefined) {
                        newParams = param_split[i];
                    } else {
                        newParams = newParams + "&" + param_split[i];
                    }
                    newParams = newParams + "";
                }
            }

        }

        newUrl = $("#hiddenContext").text() + (newParams.indexOf("ssid=") >= 0 ? "/runsavedsearch?" : "/search?") + newParams;
        window.location = newUrl;

        return false;
    });
    
    $(".anyfacetlink").click(function() {
        var facetNames,
            facetNames_split,
            facetValues,
            facetValues_split,
            found,
            i,
            indices,
            indices_split,
            j,
            newFacetNames,
            newFacetValues;
        var indeces = '';
        facetNames = $(".facets #facetnamessofar").html();
        facetNames_split = facetNames.split(",");
        facetValues = $(".facets #facetvaluessofar").html();
        facetValues_split = facetValues.split(",");

        for (i = 0; i < facetNames_split.length; i++){
            if (facetNames_split[i] == $(this).attr("href")) {
                if (indices == "") {
                    indices = i;
                } else {
                    indices = indices + "," + i;
                }
                indices = indices + "";
            }
        }
        indices = indices + "";
        indices_split = indices.split(",");
        newFacetNames = "";
        for (i = 0; i < facetNames_split.length; i++) {
            found = false;
            for (j = 0; j < indices_split.length; j++) {
                if (indices_split[j] == i) {
                    found = true;
                }
            }
            if (!found) {
                if (newFacetNames == "") {
                    newFacetNames = facetNames_split[i];
                } else {
                    newFacetNames = newFacetNames + "," + facetNames_split[i];
                }
            }
        }
        newFacetValues = "";
        for (i = 0; i < facetValues_split.length; i++) {
            found = false;
            for (j = 0; j < indices_split.length; j++) {
                if (indices_split[j] == i) {
                    found = true;
                }
            }
            if (!found) {
                if (newFacetValues == "") {
                    newFacetValues = facetValues_split[i];
                } else {
                    newFacetValues = newFacetValues + "," + facetValues_split[i];
                }
            }
        }
        $("#facetedbrowseform #facetnames").val(newFacetNames);
        $("#facetedbrowseform #facetvalues").val(newFacetValues);
        $("#facetedbrowseform").submit();
        return false;
    });

    $("a.morelink").click(function() {
        $(this).parent().parent().find(".more").hide();
        $(this).parent().parent().find(".morehidden").show();
        return false;
    });

   $("input.clickonce").click(function(event) {
      event.stopPropagation();

      var self = $(this);
      self.attr("disabled", "disabled");
      var form = self.parents("form");
      if ($.data != null && $.data(form.get(0), "validator") != null) {
         // Then the validator is set up on the form, in this case we only want to disable multiple clicking if the
         // form is valid
         if (!form.valid()) {
            self.removeAttr("disabled");
            return false;
         }
      }
      form.submit();
      return false;
   });

   $("#navbar ul li img, #navbar ul li a").click(function(e) {
      if ($(this).is("#subjdropdown")) {
         e.preventDefault();
         var subjectList = $("#subjectList");

         subjectList.show();
         subjectList.css("z-index", 99999);

         // If you're logged in as an admin the offset there will be slightly wrong due to the locale picker
         var navbar = $("#navbar");
         var navbarOffset = navbar.offset();
         var listOffset = subjectList.offset();
         listOffset.top = navbarOffset.top + navbar.outerHeight() + 1;
         subjectList.offset(listOffset);
      } else {
         $("#subjectList").hide();
      }
   });

    $("#content").mouseover(function() {
        $("#subjectList").hide();
    });
    $("#sidebar_right").mouseover(function() {
        $("#subjectList").hide();
    });


    $("body").on("click", ".plus", function(e){
        var here = $(this);
        here.parent().find(".minus").show();
        here.hide();
        here.parent().parent().find(".description").slideDown();
        e.preventDefault();
        
    });
    
    $("body").on("click", ".minus", function(e){
        var here = $(this);
        here.parent().find(".plus").show();
        here.hide();
        here.parent().parent().find(".description").slideUp();
        e.preventDefault(); 
    });

    $(".showlink").click(function(){
        var here = $(this);
        here.parent(".showhideall").find(".hidelink").removeClass("inactive");
        here.addClass("inactive");
        $(".toc ul li ul .showhide .plus").hide();
        $(".toc ul li ul .showhide .minus").show();
        $(".toc ul li ul .description").slideDown();
        return false;
    });
    $(".hidelink").click(function(){
        var here = $(this);
        here.parent(".showhideall").find(".showlink").removeClass("inactive");
        here.addClass("inactive");
        $(".toc ul li ul .showhide .minus").hide();
        $(".toc ul li ul .showhide .plus").show();
        $(".toc ul li ul .description").slideUp();
        return false;
    });


	
   var bookmarkSites = ["facebook"];
   if ($(".fb-like").length > 0) {
      bookmarkSites = [];
   }
   bookmarkSites = bookmarkSites.concat(["twitter", "google", "bibsonomy", "digg", "delicious", "linkedin", "blogmarks", "bloglines"]);
   $(".bookmarks").bookmark({
      icons: "/images/jp/bookmarks.png",
      sites: bookmarkSites
   });

    $(".printButton").click(function() {
        window.print();
        return false;
    });

    $("#global-search-form").one("submit", function(){
        var term=$("#quickSearchBox").val();

        var statsurlwrapper = $("#hiddenContext").text() + "/statslogwrapper";
        var statsurlredirect = $("#hiddenContext").text() + "/statslogredirect";

        $.get(statsurlwrapper,{searchterm:term},function(contents){
            $.post(statsurlredirect,{statsLogContents:contents},function(){
                $("#global-search-form").submit();
            });
        });
        return false;
    });

    if ($(".searchcomplete").size() > 0) {
        $(".searchcomplete").autocomplete({
            source: $("#hiddenContext").text() + "/search/autosuggest",
            minLength: 3,
            select: function( event, ui ) {
             $(".searchcomplete").val(ui.item.value);
                $("#global-search-form").submit();
            }
        });

        // Overrides the $.ui.autocomplete.prototype._renderMenu function to only show 5 suggestions for autocomplete
        // While we're there we can also insert the 'Search Suggestions' text
 /*       $.ui.autocomplete.prototype._renderMenu = function( ul, items ) {
            var self = this;
            var searchSuggestionText = $("#searchsuggestiontext");
            if (searchSuggestionText.length > 0) {
               ul.append("<li class='autocompletesuggestiontext'>" + searchSuggestionText.html() + "</li>");
            }
            $.each( items, function( index, item ) {
                // here we define how many results to show
                if (index < 5) {
                    self._renderItem( ul, item );
                }
            });
        }; */
    }

    $(".searchWithinField").click(function() {
        $(this).val("");
        $(this).removeClass("searchWithinField");
    });
/*
    if ($(".hiddenmorelikethisids").size() > 0) {
        var morelikethisurl = $("#hiddenContext").text() + "/search/morelikethis",
            pubrelatedcontentids = $("#hiddenmorelikethisids").text(),
            webid = $("#hiddenmorelikethiswebid").text(),
            fields = $("#hiddenmorelikethisfields").text(),
            restrictions = $("#hiddenmorelikethisrestrictions").text(),
            number = $("#hiddenmorelikethisnumber").text(),
            numbershown = $("#hiddenmorelikethisnumbershown").text(),
            data = {
                "pubrelatedcontentids": pubrelatedcontentids,
                "webid": webid,
                "fields": fields,
                "restrictions": restrictions,
                "number": number,
                "numbershown": numbershown
            };

        $.ajax({
            type: "POST",
            url: morelikethisurl, 
            data: data,
            dataType: "text",
            success: function(resp) {
                var target = $("#morelikethiscontent").get(0);
                target.innerHTML = resp;
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, target]);
                $(".morelikethisloading").remove();
            }
        });
    }
  */  
    $("#bellowheadercontainer").on("click",".moreRelated",function(e){
	    	var $this = $(this);	
	    	$this.closest(".separated-list").find(".hidden-js-div").addClass("show");
	    	$this.addClass("hidden-js-div");
	    	$this.next().removeClass("hidden");
	    	e.preventDefault();
   	});

    	$("#bellowheadercontainer").on("click",".lessRelated",function(e){
	    	var $this = $(this);	
	    	$this.closest(".separated-list").find(".show").removeClass("show");
	    	$this.addClass("hidden");
	    	$this.prev().removeClass("hidden-js-div");	
	    	e.preventDefault();
    	});    

    	$("#relatedContent.relatedContentLists").click(function(){

    	   $(".relatedjournalahah").each( function(index) {
    	   // console.log("index" + index);
    	         var ithis = $(this);
    	           
    	         var morelikethisurl = $("#hiddenContext").text() + '/search/morelikethis';
    	         
    	         var pubrelatedcontentids = ithis.find(".hiddenmorelikethisids").text();
    	         var webid = ithis.find(".hiddenmorelikethiswebid").text();
    	         var fields = ithis.find(".hiddenmorelikethisfields").text();
    	         var restrictions = ithis.find(".hiddenmorelikethisrestrictions").text();
    	         var number = ithis.find(".hiddenmorelikethisnumber").text();
    	         var numbershown = ithis.find(".hiddenmorelikethisnumbershown").text();
    	         var data = {'pubrelatedcontentids': pubrelatedcontentids, 'webid': webid, 'fields': fields, 'restrictions': restrictions, 'number': number, 'numbershown': numbershown, 'fmt' : 'ahah'};

    	    // console.log("data= " + data);
    	  
    	        $.ajax({
    	            type: "POST",
    	            url: morelikethisurl, 
    	            data: data,
    	            dataType: "text",
    	            success: function(resp) {
    	           // ithis.find(".hiddenmorelikethisidsahah").after(resp);
    	                var target = ithis.find("#morelikethiscontent").get(0);
    	                target.innerHTML = resp;
    	                MathJax.Hub.Queue(["Typeset", MathJax.Hub, target]);
    	                 ithis.find(".morelikethisloading").remove();
    	            },
    	            error : function(){
    		     var target = ithis.find("#morelikethiscontent").get(0);
    	            target.innerHTML = "Error getting journals";
    	            }
    	        });

    	        });

    	});
    	

    if ($("#hiddenmostviewedtype").size() > 0) {
        var url = $("#hiddenContext").text() + "/mostviewed/mostviewed",
            type = $("#hiddenmostviewedtype").text(),
            parent = $("#hiddenmostviewedparent").text(),
            parentType = $("#hiddenmostviewedparenttype").text(),
            number = $("#hiddenmostviewednumber").text(),
            numberShown = $("#hiddenmostviewednumbershown").text(),
            data,
            ahahUrl = $("#hiddenContext").text() + "/content/ahahbrowse",
        	containerInner = "articleMetadata",
        	target = "articleMetadataInner",
        	title = "articleTitle";

        if (!number && !numberShown) {
            data = {
                "type": type,
                "parent": parent,
                "parentType": parentType
            };
        } else {
            data = {
                "type": type,
                "parent": parent,
                "parentType": parentType,
                "number": number,
                "numberShown": numberShown
            };
        }

        $.post(url, data, function(resp) {
            $("#hiddenmostviewedtype").after(resp);
            ECApp.displayAccessIcons(containerInner, target, ahahUrl, title, "");
            $(".mostviewedloading").remove();
        });
    }
    $("body").on("click", "#morelikethis .morelink, #mostviewed .morelink, .mostcited .morelink", function(e) {
        var here = $(this);
        here.parent().parent().find(".hide").show();
        here.hide();
        return false;
    });
 
    $("body").on("click", ".externallink", function() {
        window.open($(this).attr("href"));
        return false;
    });

    $(".tokentoggle").toggle(
        function() {
            $(".token").slideDown();
            return false;
        },
        function() {
            $(".token").slideUp();
            return false;
        }
    );

    if ($(".journalcart .itemInCart").length > 0) {
        $(".journalcarttoggle").addClass("expanded");
        $(".journalcart").show();
    }


    $(".useCarnet").click(function() {
        $("#hiddenCarnetForm").empty().append($(this).parents(".carnetlicence").find("input[type=hidden]")).submit();
        return false;
    });

    // Renewal links of my accounts
    $(".renewalbox .renewallink").click(function() {
        $("#renewalItemId").val(this.id);
        $("#renewalForm").submit();
        return false;
    });

    /* this is a fix for IE7 and IE8 that wont submit on 'ENTER' (the login form with an image button) */
    if ($.browser.msie) {
        $("input").keydown(function(e){
            if (e.keyCode === 13) {
                $(this).parents("form").submit();
                return false;
            }
        });
    }
    
    
    $("#bellowheadercontainer").on("click", ".LogInaddToFavouritesButton", function(e){
		e.preventDefault();
		 $("#loginFavorites").dialog({
		        autoOpen: false,
		        height: "180",
		        width:"250",
		        modal: true,
		        resizable: false,
				buttons:{
				"Okay":function(){
					$(this).dialog("close");
				}
		       }
		    }).dialog("open");

	});
    
    
    $(".toggler").click(function() {
        if ($(this).parents(".expandable").hasClass("display")) {
            $(this).parents(".expandable").removeClass("display");
            $(this).parents(".expandable").find(".referencematch").addClass("hidden").removeClass("active").slideUp("slow");
        } else {
            $(this).parents(".expandable").addClass("display");
            $(this).parents(".expandable").find(".referencematch").addClass("active").removeClass("hidden").slideDown("slow");
        }
        return false;
    });
    
	if ($("#signInTarget").val() == "") {
        p = window.location.pathname;
        ctx = $("#hiddenContext").html();
        if (p.indexOf(ctx) == 0)
           p = p.substring(ctx.length);
        
        if (p.charAt(0) != '/')
           p = "/" + p;
        
        $("#signInTarget").val(p);
     }
});

/* COOKIE HANDLING */
Site.cookie = function(name, value, options) {
    var cookie,
        cookies,
        cookieValue,
        date,
        domain,
        expires,
        i,
        path,
        secure;

    if (typeof value !== "undefined") { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1;
        }
        expires = "";
        if (options.expires && (typeof options.expires === "number" || options.expires.toUTCString)) {
            if (typeof options.expires === "number") {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = "; expires=" + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        path = options.path ? "; path=" + (options.path) : "";
        domain = options.domain ? "; domain=" + (options.domain) : "";
        secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else { // only name given, get cookie
        cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            cookies = document.cookie.split(";");
            for (i = 0; i < cookies.length; i++) {
                cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/* */

if(fontSize = Site.cookie("fontSize")){
    //document.write('<style type="text/css">body{font-size:'+fontSize+'}</'+'style>');
    $("body").css("font-size", fontSize);
}

//document.write('<style type="text/css">.expandable .togglecontent{display:none}</'+'style>');
$(".expandable .togglecontent").css("display","none");
