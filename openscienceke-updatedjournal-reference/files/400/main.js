// Article template reference viewer
// note: needed to weed out Opera because it doesn't display properly
function showRef(ref, ids) {
  var label = initReferencesBaloon(ref, ids);     // Added by Atypon
  ref = jQuery(ref);

  if (label) label = ref.html();
  else label = '';

  var browserName = navigator.appName;
  if (browserName != "Opera" || /\d+/.exec(navigator.appVersion)[0] >= 9) {
    var baloon = ref.next().children();
    if (baloon) { // Atypon: degrade gracefully when baloon is not found
      baloon.css("display", "none");
      Tip(baloon.html(), ABOVE, true, LEFT, true, SHADOW, false, TITLE, label, TITLEBGCOLOR, '#B9A95F', BORDERCOLOR, '#000000', CLOSEBTNCOLORS, ['#DDD29F', '#B9A95F', '#FFFFFF', '#B9A95F'], BGCOLOR, '#FFFFFF', WIDTH, 300, PADDING, 9, CLICKSTICKY, true, CLOSEBTN, true, STICKY, true, DELAY, 0);
      return;
    }
  }
  parent.location = "#references";
}

function hideRef(ref) {
	var link = jQuery(ref).closest('.ref').prev();
	showRef(link);
}


function initReferencesBaloon(link, ids) {
  if (!ids || !link) return;
  var label ='';
  link = jQuery(link);
  var bv = link.next();
  if (!bv || !bv[0] || bv[0].tagName.toLowerCase()!= 'span' || bv.className!='ref') {
    if (typeof ids == "string") ids = ids.split(' ');
    var content = "";
    for (var i = 0; i < ids.length; i++) {
      var curr_el = jQuery('#' + ids[i]);
      var refLabel = link.children('.refLabel');
      if (refLabel.length > 0 && ids.length == 1) {
        //remove label only for display purposes.
        label = refLabel.html();
        refLabel.html("");
        content += '<span>' + curr_el.html() + "</span>";
        //insert it back after display incase the same reference is used with another one (multiple references should display labels)
        refLabel.html(label);
      } else {
        label = link.html();
        content += '<span>' + curr_el.html() + "</span>";
      }
    }
    link.after('<span class="ref"><span class="balloon-wrap"><span class="balloon">' + content + '<a class="refLink" title="View References" href="#references"> See All References</a></span></span></span>');
  }

  return label;
}

function isSelectTitlesDisabled(){
    var radio = document.getElementById("selectedTitlesRadio")
    alert('test')
    if(radio.checked) {
       return 'false'
    }
    else
    {
       return 'true'
    }


    }

function checkSelect(radio) {
   var select=document.getElementById("searchCategoryId")
   if(radio.id=="selectedTitlesRadio")
   {
     select.disabled = false;
     select.focus();
     }
   else
   {
     select.disabled = true;
   }
}

function popupFull(id, doi, ptype, area, width, height) {
    var popupURL = "/action/showFullPopup?dispaly=simple&id=" + id + "&doi=" + doi;
    if (area) popupURL += "&area=" + area;
    if (ptype) ptype = ptype.replace(/\W/g, '');
    var winname = ptype ? ptype : 'popupRef';
	var n = window.open(popupURL, winname, 'resizable=yes,scrollbars=yes,width='+width+',height='+height);
	n.moveTo(10,10);
	n.focus();
}


function setResultsPerPage(aForm,perPage){

    for(var i=0; i < aForm.elements.length; i++) {
        if(aForm.elements[i].name == 'pageSize') {
            aForm.elements[i].value = perPage;

            break;
        }
    }

    searchShowFirstPage(aForm, false)
}


function setSearchAlertValue(aForm,value){

    for(var i=0; i < aForm.elements.length; i++) {
        if(aForm.elements[i].id == 'searchAlert') {
            aForm.elements[i].value = value;

            break;
        }
    }

}


 function populateAbstract(msg,div)
{


        $(div).innerHTML = msg;

}
function showAbstract(doi_param,div)
{
    if (toggleLayer(div,div+'Img','true')) {
    var data={
        ajax: 'true',
        doi: doi_param
       };

    jQuery.ajax({
        url: '/action/showAbstract',
        type: 'POST',
        data: data,
        success: function(data, status) { populateAbstract(data,div); }
    });

    }
}

// Escape key on keyboard should close the pop up
var KEYCODE_ESC = 27;
jQuery(document).keyup(function (e) {
    if (e.keyCode == KEYCODE_ESC) jQuery(".pop-over").hide();
});

jQuery(document).ready(function () {

    jQuery.noConflict(); // Disable "$" to be used with jQuery because BioOne is using "$" sign as a  js function (document.getElementById)

    jQuery("#aTag").bind('click', function () {
        // Author & Article Info click to show and hide the section.
        jQuery('#articleInfo').toggle( "slow" );
        var condition = jQuery("#aTag").attr("aria-expanded");
        if (condition == 'false') {
            jQuery("#aTag").attr("aria-expanded", "true");
            jQuery("#aTag").html("[-] Author & Article Info");
        }
        else if (condition == 'true') {
            jQuery("#aTag").attr("aria-expanded", "false");
            jQuery("#aTag").html("[+] Author & Article Info");
        }
    });

    jQuery(".pop-over-container>a").bind('click mouseover', function () {
        // Authors information's pop up handling
        jQuery(".pop-over").hide();
        jQuery("#pop-over-" + this.id).css("display", "block");
    });

    jQuery(".pop-over-container").bind('mouseleave', function (e) {
        // handling if the user move down from author's name without getting in the pop up
        var bottomEdge = jQuery(this).offset().top + jQuery(this).outerHeight();
        if (e.pageY >= bottomEdge) jQuery(".pop-over").hide();
    });

    jQuery(".close").click(function () {
        jQuery(".pop-over").hide();
    });

    jQuery(".pop-over").bind('mouseleave', function () {
        jQuery(".pop-over").hide();
    });

  jQuery('img.closeJumpTo').click(function() {
    closeJumpToMenu();
  });

  jQuery('a.popupLink').click(function(event) {
    var clicked = jQuery(this);
    event.preventDefault();
    var w = 768;
    var h = 578;
    clicked.figDimension = {w:w,h:h};
    if (clicked.figDimension) {
      var d = clicked.figDimension;
      if (d.w) w = d.w + 230; // add sidebar width and some padding
      if (d.h) h = d.h + 280; // add top navigation an some space for captipn
      if (w > screen.width) w = screen.width; // do not make it bigger than the screen
      if (h > screen.height) h = screen.height;
      if (document.body.id == "fullPopup") {
          // Is in popup already, reuse the window instead of opening new one with same name so we don't lose connection to original opener
          self.resizeTo(w, h);
          window.location = clicked.attr('href');
      } else {
          var articlePopup = window.open(clicked.attr('href'), 'articlePopup', 'height=' + h + ',width=' + w + ',status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes');
          if (articlePopup.focus) articlePopup.focus();
      }

    }
  });

  jQuery('a.supplementLink').click(function() {
    var supplement = window.open(jQuery(this).attr('href'), 'supplement', 'height=600,width=700,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes');
    supplement.focus();
    return false;
  });

  jQuery('a.external').click(function() {
    window.open(jQuery(this).attr('href'));
  });

  jQuery('#commentaryDisclaimer a').click(function() {
    window.open(jQuery(this).attr('href'), 'commentaryDisclaimer', 'width=450,height=220,status=no,toolbar=no,menubar=no,location=no,resizable=yes');
  });
});


(function () {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('#') + 1);
    if (id == 'BioOne.1' || id == 'BioOne.2' || id == 'Open Access' || id == 'Open%20Access') {
        window.location.href='http://www.bioone.org/search/advanced';
    }
})();