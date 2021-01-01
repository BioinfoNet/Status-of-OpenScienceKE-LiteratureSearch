function cileaPrintPage(printerUrl) {
	/*
	print_modal = JQ('<div id="print-modal"></div>');
	print_controls = JQ('<div id="print-modal-controls">' + '<a href="#" class="print" title="Print page">Print page</a>' + '<a href="#" class="close" title="Close print preview">Close</a>').hide();
	var print_frame = JQ('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');
	print_modal.hide().append(print_controls).append(print_frame).appendTo('body');
	for (var i=0; i < window.frames.length; i++) {
		if (window.frames[i].name == "print-frame") {    
			var print_frame_ref = window.frames[i].document;
			break;
		}
	}
	print_frame_ref.open();
	print_frame_ref.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
		'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' + 
		'<head><title>' + document.title + '</title></head>' +
		'<body></body>' +
		'</html>');
	print_frame_ref.close();
	var $iframe_head = JQ('head link[media*=print], head link[media=all]').clone(),	$iframe_body = JQ('body > *:not(#print-modal):not(script)').clone();
	$iframe_head.each(function() {
		JQ(this).attr('media', 'all');
	});
	if (!JQ.browser.msie && !(JQ.browser.version < 7) ) {
		JQ('head', print_frame_ref).append($iframe_head);
		JQ('body', print_frame_ref).append($iframe_body);
	}
	else {
		JQ('body > *:not(#print-modal):not(script)').clone().each(function() {
			JQ('body', print_frame_ref).append(this.outerHTML);
		});
		JQ('head link[media*=print], head link[media=all]').each(function() {
			JQ('head', print_frame_ref).append(JQ(this).clone().attr('media', 'all')[0].outerHTML);
		});
	}
	print_form= JQ('<form method="post" id="print-form" action="'+printerUrl+'"></form>');
	print_hidden_head= JQ('<input type="hidden" id="printHead" name="head"/>');
	print_hidden_body= JQ('<input type="hidden" id="printBody" name="body"/>');
	print_hidden_title= JQ('<input type="hidden" id="printTitle" name="title" value="'+document.title+'"/>');
	print_form.hide().append(print_hidden_head).append(print_hidden_body).append(print_hidden_title).appendTo('body');
	JQ('#printHead').val(JQ('head', print_frame_ref).html());
	JQ('#printBody').val(JQ('body', print_frame_ref).html());
	print_form.submit();
	print_form.remove();
	*/
	var $iframe_head = JQ('head link[media*=print], head link[media=all]');
	var iframe_head_html='';
	$iframe_head.each(function() {
		iframe_head_html+=JQ(this).outerHTML();
	});
	var $iframe_body = JQ('body > *:not(#print-modal):not(script)');
	var iframe_body_html='';
	$iframe_body.each(function() {
		var $cloned=JQ(this).clone();
		iframe_body_html+=$cloned.outerHTML();
	});
	print_form= JQ('<form method="post" id="print-form" action="'+printerUrl+'"></form>');
	print_hidden_head= JQ('<input type="hidden" id="printHead" name="head"/>');
	print_hidden_body= JQ('<input type="hidden" id="printBody" name="body"/>');
	print_hidden_title= JQ('<input type="hidden" id="printTitle" name="title" value="'+document.title+'"/>');
	print_form.hide().append(print_hidden_head).append(print_hidden_body).append(print_hidden_title).appendTo('body');
	JQ('#printHead').val(iframe_head_html);
	JQ('#printBody').val(iframe_body_html);
	
	
	print_form.submit();
	print_form.remove();
	
}
