

function showXcerpts(aForm)
{
    var x, divs=aForm.getElementsByTagName("div");

    for(x in divs) {
        var div=divs[x];

        if(div.className == 'article-summary' && div.innerHTML.length > 0) {
            var display=div.style.display;

            if(display == 'block')
                div.style.display='none';
            else
                div.style.display='block';
        }
    }
}


function checkEmptyField(aForm)
{
    var i, kids=aForm.elements, hasQuery=false;

    for(i in kids) {
        var kid=kids[i];

        if(kid.type == "text" && kid.value != "") {
            hasQuery=true;
            break;
        }
    }

    if(!hasQuery) {
        alert("Please enter a search term");
        return false;
    }

    return true;
}


function showHelpDesc(id, msg)
{
    desc=$(id).innerHTML=msg;
}


function clearFields(aForm)
{
    for(var i=0; i < aForm.elements.length; i++) {
        var elem=aForm.elements[i];

        if(elem.type == "text")
            elem.value="";
        else if(elem.type.match("select-(one|multiple)"))
            elem.selectedIndex=0;
    }
}

function toggleBookInfo(link) {
    var box = $(link).up().select('.main')[0];
    if (box.style.display!="none") {
        box.style.display="none";
        link.innerHTML="+";
    }
    else {
        box.style.display="block";
        link.innerHTML="&#150;";
    }
}

function submitOnlyOneArticle(aForm,action) {
    var hasMarked = false;
    var elmts = aForm.elements;
    var count =0;
    for (var i = 0; i < elmts.length; i++) {
        if ((elmts[i].name == "doi") &&
            (elmts[i].type == "checkbox") &&
            (elmts[i].checked)) {
            hasMarked = true;
            break;
        }
    }

    for (var i = 0; i < elmts.length; i++) {
        if ((elmts[i].type == "checkbox") &&(elmts[i].checked)) {
            count++;
        }
    }

    if (!hasMarked) {

        alert("Please Select one article/chapter to be tracked.");
        return;

    }

     if(count!=1) {
         alert("Please Note that one article/chapter can be tracked at a time.");return;}

    for (var i = 0; i < elmts.length; i++) {
        if ((elmts[i].name == "doi") &&
            (elmts[i].type != "checkbox")) {
            elmts[i].name = "xdoi";
        }
    }
    aForm.action = action;
    aForm.method = "post";
    aForm.submit();
    return false;
}
