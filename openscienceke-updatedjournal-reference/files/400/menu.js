// return "id" object on all browsers
function getObject(id) {
	if(document.getElementById) {
		obj = document.getElementById(id);
	}
	else if(document.all) {
		obj = document.all.item(id);
	}
	else {
		obj = null;
	}
	return obj;
}
// show "id" drop menu
function showMenu(id) {
	getObject("dropMenu" + id).className = "dropMenu";
}
// hide "id" drop menu
function hideMenu(id) {
	getObject("dropMenu" + id).className = "dropMenuHidden";
}
var t = setTimeout('',0);

/* popup windows */
function enlargeFigure(url) {
	var tableWindow=window.open(url,'biopop','height=420,width=760');
}
function referencePop(title,content) {
	var referenceWindow=window.open('','refpop','height=150,width=250,scrollbars=1,resizable=1');
	referenceWindow.document.open();
	referenceWindow.document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\"><head><title>" + title + "</title><link rel=\"stylesheet\" type=\"text/css\" href=\"styles/default.css\" /></head><body class=\"referencePop\"><h1>" + title + "</h1><p>" + content + "</p></body></html>");
	referenceWindow.document.close();
}