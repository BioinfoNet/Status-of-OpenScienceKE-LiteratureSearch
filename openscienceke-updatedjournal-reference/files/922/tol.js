var COOKIE_MENU_PREFIX = "showMenu";

function addMouseEvents(elementId) {
   var element = document.getElementById(elementId);
   if (element != null) {
     var sfEls = document.getElementById(elementId).getElementsByTagName("LI");
     for (var i=0; i<sfEls.length; i++) {
         sfEls[i].onmouseover=function() {
             this.className+=" sfhover";
         }
         sfEls[i].onmouseout=function() {
             this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
         }
     }
   }
}

sfHover = function() {
   addMouseEvents("sitenav");
   addMouseEvents("advanced");
   addMouseEvents("homesearch");
}

function changeclass()
    {arg = changeclass.arguments;
     var elementName = arg[0];
     var class1 = arg[1];
     var class2 = arg[2];
     if (document.getElementById(elementName) != null) {
     if (document.getElementById(elementName).className == class1)
        {document.getElementById(elementName).className = class2;
         updateCookies(elementName, class2);
        }
     else
        {document.getElementById(elementName).className = class1;
         updateCookies(elementName, class1);
        }
    }
    }

function changehtml() {
	var args = changehtml.arguments;
	var elementName = args[0];
	var html1 = args[1];
	var html2 = args[2];
	var element = document.getElementById(elementName);
	if (element != null) {
		if (element.innerHTML == html1) {
			element.innerHTML = html2;
		} else {
			element.innerHTML = html1;
		}
	}
}

function updateCookies() {
    var arg = updateCookies.arguments;
    var elementName = arg[0];
    var className = arg[1];
    var cookieName = COOKIE_MENU_PREFIX + elementName;
    if (className == "open" || className == "shown") {
	createCookie(cookieName, "1",365);
    } else {
	eraseCookie(cookieName);
    }
}
    
function closeRightSidebarMenus ()
	{

	closemenusifnotnull("buildingtrhsopen");
	closemenusifnotnull("buildingtrhsopenmenu"); 
	closemenusifnotnull("pagecontent");
	closemenusifnotnull("contentmenu");
	closemenusifnotnull("bonus");
	closemenusifnotnull("bonusmenu");
	closemenusifnotnull("treehouses");
	closemenusifnotnull("treehmenu");
	closemenusifnotnull("biographies");
	closemenusifnotnull("biogmenu");
	closemenusifnotnull("navother");
	closemenusifnotnull("navothermenu");
	closemenusifnotnull("navdown");
	closemenusifnotnull("navdownmenu");
	closemenusifnotnull("navup");
	closemenusifnotnull("navupmenu");
	closemenusifnotnull("navlinked");
	closemenusifnotnull("navlinkedmenu");
	closemenusifnotnull("navprefs");
	closemenusifnotnull("navprefsmenu");
	closemenusifnotnull("navpeople");
	closemenusifnotnull("navpeoplemenu");
	closemenusifnotnull("navquality");
	closemenusifnotnull("navqualitymenu");
	closemenusifnotnull("navprojectdev");
	closemenusifnotnull("navprojectdevmenu");
	closemenusifnotnull("historyfuture");
	closemenusifnotnull("historyfuturemenu");
	closemenusifnotnull("navpolicies");
	closemenusifnotnull("navpoliciesmenu");
	closemenusifnotnull("navthanks");
	closemenusifnotnull("navthanksmenu");
	closemenusifnotnull("builderstoolkit");
	closemenusifnotnull("builderstoolkitmenu");
	closemenusifnotnull("aboutlearn");
	closemenusifnotnull("aboutlearnmenu");
	closemenusifnotnull("teacherresources");
	closemenusifnotnull("teacherresmenu");
	closemenusifnotnull("addingmedia");
	closemenusifnotnull("addingmediamenu");
	closemenusifnotnull("phylobio");
	closemenusifnotnull("phylobiomenu");
	closemenusifnotnull("learningoverview");
	closemenusifnotnull("learningoverviewmenu");
	closemenusifnotnull("articles");
	closemenusifnotnull("articlesmenu");
	closemenusifnotnull("notes");
	closemenusifnotnull("notesmenu");
	closemenusifnotnull("corecont");
	closemenusifnotnull("corecontmenu");
	closemenusifnotnull("notecont");
	closemenusifnotnull("notecontmenu");
	closemenusifnotnull("tipscont");
	closemenusifnotnull("tipscontmenu");
	closemenusifnotnull("contlearn");
	closemenusifnotnull("contlearnmenu");
	closemenusifnotnull("contimg");
	closemenusifnotnull("contimgmenu");
	closemenusifnotnull("buildingtrhs");
	closemenusifnotnull("buildingtrhsmenu");
	closemenusifnotnull("treehouseclose");
	closemenusifnotnull("treehouseclosemenu");
	closemenusifnotnull("trhstoolkit");
	closemenusifnotnull("trhstoolkitmenu");
	closemenusifnotnull("tipsguidetrhs");
	closemenusifnotnull("tipsguidetrhsmenu"); 
	closemenusifnotnull("people");
	closemenusifnotnull("peoplemenu");
	closemenusifnotnull("collections");
	closemenusifnotnull("collectionsmenu");
	openmenusifnotnull("hidden_nav", 1);
	}  
	
function closemenusifnotnull(elementName,ignoreCookie) {
	if (ignoreCookie == null) {
		ignoreCookie = false;
	}
	if (document.getElementById(elementName)) {
		if (ignoreCookie || readCookie(COOKIE_MENU_PREFIX + elementName) == null) {
			document.getElementById(elementName).className="closed";
		}
	}
	// In the case where we are closing the left sidebar, then make sure
	// to close all of the menu elements as well (IE doesn't know how to deal with this)
	if (ignoreCookie) {
		if (elementName.indexOf("menu") > 0) {
		} else {
			closemenusifnotnull(elementName + "menu", true);
		}
	}
}

function openmenusifnotnull(elementName, isQuicknav) {
	var className = "open";
	if (isQuicknav) {
		className = "shown";
	}
	if (document.getElementById(elementName)) {
		if (readCookie(COOKIE_MENU_PREFIX + elementName) != null) {
			document.getElementById(elementName).className=className;
			if (isQuicknav) {	
				if (document.getElementById("compass") != null) {			
					// If the hidden quick nav tool is open, we need to set the
					// compass to not be shown
					document.getElementById("compass").className = "hidden";
				}
			}
		}
	}
	if (elementName.indexOf("menu") > 0) {
	} else {
		openmenusifnotnull(elementName + "menu");
	}
}

function updatePreference(name) {
	var returnVal = readCookie(name);
	if (returnVal && returnVal != 0) {
		eraseCookie(name);
	} else {
		createCookie(name, 1, 365);
	}
	window.location.reload();
}

function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; domain=.tolweb.org; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}

function switchClass()
    {arg = switchClass.arguments;
     var actualClass;
     if (document.getElementById(arg[0]).className == arg[1]) 
       {document.getElementById(arg[0]).className = arg[2];
	actualClass = arg[2];	
        }
     else
        {document.getElementById(arg[0]).className = arg[1];
	actualClass = arg[1];
        }
        updateCookies(arg[0], actualClass);
    }

startList = function()
    {if (document.all && document.getElementById)
        {navRoot = document.getElementById("hidden_nav");
	 if (navRoot != null) {
         list_elements = navRoot.getElementsByTagName('li');
         for (i = 0; i <list_elements.length; i++)
            {node = list_elements[i];
             if (node.nodeName.toLowerCase() == "li" && node.className != "disabled")
                {node.onmouseover = function()
                    {this.className += " over";
                    }
                 node.onmouseout = function()
                    {this.className = this.className.replace(" over", "");
                    }
                }
            }
        }
	}
    }
