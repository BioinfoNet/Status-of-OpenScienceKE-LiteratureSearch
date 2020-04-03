
var MOBILEBREAKPOINT = 800;

$(function () {
    $("body").on("click touchstart", "#topbar-menu, #navmask", function (event) {
        var $body = $("body");
        $body.toggleClass("navopen");
        $body.toggleClass("navclosed", !$body.hasClass("navopen"));
        event.preventDefault();
    });

    var $nav = $('<div id="nav"><ul>' + $("#tabs").html() + '</ul></div>');
    $nav.insertAfter($("#topbar"));

    $("div.message").fadeTo(1000, 1);

    $("#datepicker, input.datepicker").datepicker({ dateFormat: "dd/mm/yy" });

    $("#adminicon").click(function () {
        $("#adminmenu").fadeToggle(400);
    });

    $("#emailennoffice").attr("href", "mailto" + ":office" + "@" + "ennonline.net");

    $("a.notavailable").click(function (event) {
        alert("Sorry, this feature isn't available yet.");
        event.preventDefault();
        return false;
    });
    
    if ($("div.equalheights").length > 1 && $(window).width() > MOBILEBREAKPOINT) {
        var maxHeight = 0;
        $("div.equalheights").each(function () {
            if ($(this).height() > maxHeight) maxHeight = $(this).height();
        });
        $("div.equalheights").css("height", maxHeight);
    }


    // clickable
    $("tr.clickable").addClass("active");
    $("tr.clickable").on("click", function () {
        window.location.href = $(this).find("td.clickable a").attr('href');
    });

    $("div.clickable").on("click", function () {
        window.location.href = $(this).find("a").first().attr('href');
    });

    var morelikethistoshow = 3;
    if ($("#morelikethis div.pagesummary").length > morelikethistoshow) {
        $("#morelikethis div.pagesummary:gt(" + (morelikethistoshow - 1) + ")").hide().addClass("hidden");
        $("#morelikethis").append('<a href="#" class="showall">Show more...</a>');
        $("#morelikethis a.showall").click(function (event) {
            $("#morelikethis div.pagesummary.hidden").fadeIn();
            $(this).hide();
            event.preventDefault();
            return false;
        });
    }

    $(".readmorelink").click(function (event) {
        var index = $("body").index($(this));
        $(".readmorecontent:eq(" + index + ")").fadeIn();
        $(this).hide();
        event.preventDefault();
        return false;
    });

    $("a[href=#footnotes]").click(function (event) {
        event.preventDefault();
        $("div.readmorecontent.footnotes").show();
        $("a.readmorelink").hide();
        $('html, body').animate({
            scrollTop: $("div.readmorecontent.footnotes").offset().top - 150
        }, 600);
        
    });

    $("#minisearch input.textbox").focus(function () {
        $(this).animate({ width: 397 }, 300);
    }).blur(function() {
        $(this).animate({ width: 179 }, 300);
    });

    $("img.imgleft, img.imgright, img.imgleftsmall, img.imgrightsmall, img.imghero, img.imgcenter").each(function () {
        var $img = $(this);

        if ($img.closest("div.imagecontainer").length == 0) {          // Avoid double wrapping
            $img.wrap('<div class="imagecontainer ' + $img.attr("class") + '"></div>');
            var caption = $img.attr("alt");
            var credits = $img.attr("title");
            $img.attr("title", "");

            if ($img.attr("class") == "imghero") $img.after('<div class="clear"></div>');

            if (credits.length > 0) {
                $img.after('<p class="credits">&copy; ' + credits + '</p>');
            }

            if (caption.length > 0 && ($("body").hasClass("fex") || $("body").hasClass("nex"))) {
                $img.after('<p class="caption">' + caption + '</p>');
            }

            $img.dblclick(function () {
                if ($img.attr("data-websiteimageid") != "") alert($img.attr("data-websiteimageid"));
            });
        }
    });

    $("#referenceclose, #referencemask").bind("click", function () {
        event.preventDefault();
        $("#reference").hide();
        $("#referencemask").hide();
    });

    $("li.reference a").click(function (event) {
        event.preventDefault();
        $("#reference").fadeIn(500);
        $("#referencemask").fadeIn(500);
        $("#referencemask").css({ 'width': $(window).width(), 'height': $(window).height() });

        $(window).resize(function () {
            $("#referencemask").css({ 'width': $(window).width(), 'height': $(window).height() });
        });
    });


    // Admin attachments (in page not in CK Editor)

    $("#attachmentpickermask, #attachmentcancel").bind("click", function () {
        event.preventDefault();
        $("#attachmentpicker").hide();
        $("#attachmentpickermask").hide();
    });

    $("#attachfile").click(function (event) {
        event.preventDefault();
        $("#attachmentpicker div").html('<iframe name="attachmentpickeriframe" src="/file/attachmentpicker" />');
        $("#attachmentpicker").fadeIn(500);
        $("#attachmentpickermask").fadeIn(500);
        $("#attachmentpickermask").css({ 'width': $(window).width(), 'height': $(window).height() });

        $(window).resize(function () {
            $("#attachmentpickermask").css({ 'width': $(window).width(), 'height': $(window).height() });
        });
    });

    $("#attachmentlist").on("click", "img.delete", function () {
        var attachmentid = $(this).closest("li").attr("data-attachmentid");
        var oldIds = $("#attachmentids").val().toString().split(",");
        var newIds = "";
        for (var i = 0; i < oldIds.length; i++) {
            if (oldIds[i] != attachmentid) {
                if (newIds.length > 0) newIds += ",";
                newIds += oldIds[i];
            }
        }
        $("#attachmentids").val(newIds);

        $(this).closest("li").remove();
    });

    $("#attachmentok").click(function (event) {
        var filesrc = window.frames["attachmentpickeriframe"].window.document.getElementById('WebsiteFileTagPath').value;
        var fileid = window.frames["attachmentpickeriframe"].window.document.getElementById('WebsiteFileId').value;

        if (filesrc == '') {
            alert('Please upload an file or select an existing file.');
            return false;
        }
        else
        {
            if ($("#attachmentids").val().length > 0) $("#attachmentids").val($("#attachmentids").val() + ",");
            $("#attachmentids").val($("#attachmentids").val() + fileid);

            var link
            if (filesrc.indexOf('href=') != -1) 
                link = filesrc.replace('href=', 'class="attachment icon-unknown" href=');
            else                 
                link = '<a href="http://s3.ennonline.net' + '/' + filesrc + '" class="attachment icon-unknown" target="_blank">' + filesrc.toString().split("/").pop() + '</a>';

            $("#attachmentlist li:last-child").before('<li data-attachmentid="' + fileid + '">' + link + ' <img src="/Content/icons/Bin.gif" alt="Unattach" class="delete" /></li>');

            $("#attachmentpicker").hide();
            $("#attachmentpickermask").hide();
            return true;
        }

    });

    // Sidebar filters
    $("div.sidebar-filter h2").click(function () {
        $(this).closest("div.sidebar-filter").toggleClass("open");
    });

    // en-net
    if ($("#ctl00_cphContent_hidHumanChallange")) {
        setTimeout(function() {
            var challange = parseInt($("#ctl00_cphContent_hidHumanChallange").val());
            $("#ctl00_cphContent_hidHumanResponse").val(challange.toString(16));
        }, 1000);
    }

    // Proportional height
    if ($("[data-proportionalheight]").length > 0) {
        ProportionalHeight();
        $(window).resize(function () {
            ProportionalHeight();
        });
    }

    function ProportionalHeight() {
        $("[data-proportionalheight]").each(function() {
            var width = $(this).width();
            var height = width * parseFloat($(this).attr("data-proportionalheight"));
            $(this).height(height);
        });
    }
});




