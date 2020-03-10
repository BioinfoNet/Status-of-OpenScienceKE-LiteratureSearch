$(document).ready(function(){

	var filename, index = 0, height, width;	

   var preview = $("#preview");
	preview.dialog({
		autoOpen:false,
		height:500,
		width:800,
		modal: true,
		title: 'Preview',
      resize: function() {
         var dialogHeight = preview.height();
         var tabHeight = $("#top", $(this).get(0).contentDocument).height();
         $(".image", $(this).get(0).contentDocument).height(dialogHeight - tabHeight - 12); // -12 is the same offset as hardcoded in css 
      }
	});	
	
	var loadPreview = function(){
		if($("#preview .image .notfirst").size() > 0)						
			$("#preview .image .notfirst").remove();
		if(index > 0)						
		{
			$("#preview .image .first").hide();
			filename = $('#preview .filename:eq('+index+')').text();
			var newImg = new Image();
			newImg.src = filename;	
			newImg.onload = function() {
				height = newImg.height;
				width = newImg.width;
				//$("#preview .image").append("<img src=\"" + filename + "\" class=\"notfirst\" />");
				$("#preview .image").append("<img src=\"" + filename + "?" + new Date().getTime() +  "\" class=\"notfirst\" />");
			}	
		}
		else {
			height = $("#preview .image .first").height();
			width = $("#preview .image .first").width();
			$("#preview .image .first").show();
		}
	}	    	
	
	if ($("#openPreview").size() > 0) {
	   var imgHeight = $("#preview .image img").get(0).height,
	       imgWidth = $("#preview .image img").get(0).width,
	       dialogHeight = imgHeight + $("#top").height() * 2,
	       dialogWidth = imgWidth + 35;
      $("#preview").dialog("option", "width", dialogWidth);
      $("#preview").dialog("option", "height", dialogHeight);
      $("#preview .image").height(imgHeight);
      $("#preview .image").width(imgWidth);
      $("#preview .image").css("overflow", "visible");

      $("#preview").dialog("option", "position", { my: "top", at: "top", of: $(".publisherBrandingContainer"), collision: "none",
         using: function( pos ) {
            var topOffset = $( this ).css( pos ).offset().top;
            $(this).css("left", pos.left + 135);
            if ( topOffset < 0 ) {
               $( this ).css( "top", pos.top - topOffset );
            }
         }}
      );
      $("#preview").dialog("open");
	}

	$(".previewthumbnailink").click(function() {
		$("#preview .previous").addClass("previewNavGrey");	
		$("#preview .navdivider").addClass("previewNavGrey");
		// we need to be able to test to see if there is only one fulltext thumbnail and if that is the case we can grey out the link.
		if ($("#preview .filename").size() == 1) {
			$("#preview .next").addClass("previewNavGrey");
		}
		index = 0;	
		$("#preview").dialog("open");
		loadPreview();	
		return false;
	});
	
	$("#preview .next").click(function() {
		if (($("#preview .filename").size() >0)  && (index < ($("#preview .filename").size()-1)))
		{
			$("#preview .previous").removeClass("previewNavGrey");
			$("#preview .navdivider").removeClass("previewNavGrey");
			index++;
			loadPreview();
			$("#preview #pagenum").html(index + 1);
			if (index == ($("#preview .filename").size()-1))
			{
				$("#preview .next").addClass("previewNavGrey");
				$("#preview .navdivider").addClass("previewNavGrey");
			}
		}
		return false;
	});

	$("#preview .previous").click(function() {
		if (($("#preview .filename").size() >0)  && (index > 0))
		{
			$("#preview .next").removeClass("previewNavGrey");
			$("#preview .navdivider").removeClass("previewNavGrey");
			index--;
			loadPreview();
			$("#preview #pagenum").html(index + 1);
			if (index == 0)
			{
				$("#preview .previous").addClass("previewNavGrey");
				$("#preview .navdivider").addClass("previewNavGrey");
			}
		}
		return false;
	});

	$("#preview #zoomcontrols #zoomin").click(function() {
		var newWidth = width + ((width/100)*10);
		$("#preview .image img").css('width',newWidth);
		width = newWidth;
		var newHeight = height + ((height/100)*10);
		$("#preview .image img").css('height',newHeight);
		height = newHeight;		
	});

	$("#preview #zoomcontrols #zoomout").click(function() {
		var newWidth = width - ((width/100)*10);
		$("#preview .image img").css('width',newWidth);
		width = newWidth;
		var newHeight = height - ((height/100)*10);
		$("#preview .image img").css('height',newHeight);
		height = newHeight;		
	});
	
	
});
