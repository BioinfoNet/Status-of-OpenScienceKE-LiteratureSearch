// toggle hide and display, switch graphics
function toggleLayer(whichLayer,imgObj, returnStatus)
{

    // switch images
    img = getObject(imgObj);
    if(img.src.indexOf("images/button_minus.gif") != -1) {
        var new_src = img.src.replace("button_minus.gif","button_plus.gif")
        img.src = new_src;
    }
    else if (img.src.indexOf("images/button_plus.gif") != -1) {

        var new_src = img.src.replace("button_plus.gif","button_minus.gif")
        img.src = new_src;
    }
    else if (img.src.indexOf("images/button_plus_small.gif") != -1) {
        var new_src = img.src.replace("button_plus_small.gif","button_minus_small.gif")
        img.src = new_src;
    }
    else if (img.src.indexOf("images/button_minus_small.gif") != -1) {
        var new_src = img.src.replace("button_minus_small.gif","button_plus_small.gif")
        img.src = new_src;
    }
    else if (img.src.indexOf("images/button_plus_green.gif") != -1) {
        var new_src = img.src.replace("button_plus_green.gif","button_minus_green.gif")
        img.src = new_src;
    }
    else if (img.src.indexOf("images/button_minus_green.gif") != -1) {
        var new_src = img.src.replace("button_minus_green.gif","button_plus_green.gif")
        img.src = new_src;
    }
    // toggle layer visibility
    var elem, vis;
    if( document.getElementById ) // this is the way the standards work
        elem = document.getElementById( whichLayer );
    else if( document.all ) // this is the way old msie versions work
        elem = document.all[whichLayer];
    else if( document.layers ) // this is the way nn4 works
        elem = document.layers[whichLayer];
    vis = elem.style;  // if the style.display value is blank we try to figure it out here
    if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
        vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
    vis.display = (vis.display==''||vis.display=='block')?'none':'block';

    if(returnStatus=='true')
    {
        if (vis.display=='block')
            return true;
        else
            return false;
    }
}

function expandAll() {
    var elements = jQuery('.browseDesc')
    for(var i = 0; i < elements.length; i++) {
        showLayer = elements[i];
        imgLayer = getObject(showLayer.id+ "_img");
        // if closed, open the panel
        if(showLayer.style.display=='none'||showLayer.style.display=='')
        {
            toggleLayer(showLayer.id, imgLayer.id);
        }
    }
}

function collapseAll() {
    var elements = jQuery('.browseDesc')
    for(var i = 0; i < elements.length; i++) {
        showLayer = elements[i];
        imgLayer = getObject(showLayer.id+ "_img");
        // if open, close the panel
        if(showLayer.style.display=='block')
        {
            toggleLayer(showLayer.id, imgLayer.id);
        }
    }
}

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