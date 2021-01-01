/**
 * GBS Cover Script by Tim Spalding/LibraryThing
 * Adapted and improved for Wageningen BCMS
 * $Id$
 */

function addTheCover(booksInfo) {
    var gbsnames = new Array("No information", "book info", "partial view", "full text");
    var qualities = {
        "noview": 1, "partial": 2, "full": 3
    };
    
    for (i in booksInfo) {
        var book = booksInfo[i];
        // nu moet ik achterhalen welke key tot deze call heeft geleid, en welk plaatje ik dus moet updaten (als er meer dan 1 op het scherm staat)
        oclc = book.bib_key.substr(5);
        // adh daarvan kan ik de ISN terugvinden
        var isn = $("input[value='" + oclc + "']").attr("id").substr(9);
        var quality = qualities[book.preview];
        if (quality > 1) {
            // plaats de link in de juiste (door isn aangegeven) div
            $("#gbslink_" + isn).html("<div style='clear:both;padding-bottom:15px;'><a href='" + book.preview_url + "'><img src='/images/google.gif'/>" + "&nbsp;Google " + gbsnames[quality] + "</a></div>");
        }
        var cover = $("#cover_" + isn).val();
        if (cover != 'off') {
            if (book.thumbnail_url != undefined) {
                // de thumbnail moet in een LI of in een DIV worden geplaatst!
                $("li[isn='" + isn + "']").html('<img src="' + book.thumbnail_url.replace("zoom=5", "zoom=1") + '">');
                $("div[isn='" + isn + "']").html('<img src="' + book.thumbnail_url.replace("zoom=5", "zoom=1") + '">');
            }
        }
    }
}

$(document).ready(function () {
    $("input[id^='type_']").each(function () {
        var type = $(this).val();
        var isn = $(this).attr('id').substring(5);
        var lookupnr = $("#lookupnr_" + isn).val()
        var bibkeys = (type == 'oclc') ? "OCLC:" + lookupnr: "ISBN:" + lookupnr
        var myhost = document.location.hostname;
        
        var serviceurl = '';
        
        if (myhost.indexOf('wageningenur.nl') != -1) {
            serviceurl = '/library-app';
        }
        
        $.ajax({
            url: serviceurl + '/googlebooks',
            data: {
                'jscmd': 'viewapi',
                'bibkeys': bibkeys
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: addTheCover // Niet: jsonpCallback gebruiken (gaat fout bij meer dan 1 te tonen cover)
        });
    });
});
