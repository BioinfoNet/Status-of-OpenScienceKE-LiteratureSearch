/*! PubReader - vSTABLE - 2017-09-22
* Author: Andrey Kolotev;
* Contributors: Christopher Maloney, Barton Trawick, Edwin Sequeira, Stan Misiurev;

* ===========================================================================
*
*                            PUBLIC DOMAIN NOTICE
*               National Center for Biotechnology Information
*
*  This software/database is a "United States Government Work" under the
*  terms of the United States Copyright Act.  It was written as part of
*  the author's official duties as a United States Government employee and
*  thus cannot be copyrighted.  This software/database is freely available
*  to the public for use. The National Library of Medicine and the U.S.
*  Government have not placed any restriction on its use or reproduction.
*
*  Although all reasonable efforts have been taken to ensure the accuracy
*  and reliability of the software and data, the NLM and the U.S.
*  Government do not and cannot warrant the performance or results that
*  may be obtained by using this software or data. The NLM and the U.S.
*  Government disclaim all warranties, express or implied, including
*  warranties of performance, merchantability or fitness for any particular
*  purpose.
*
*  Please cite the author in any work or product based on this material.
*
* ===========================================================================
*/
(function(){(function(){function f(){d.parentNode&&d.parentNode.removeChild(d)}var a=window,b=document,c=b.documentElement,d=b.createElement("style");d.textContent="body{visibility:hidden}";var e=b.getElementsByTagName("script")[0];e.parentNode.insertBefore(d,e),a.addEventListener?a.addEventListener("load",f,!1):a.attachEvent("onload",f),setTimeout(f,3e3)})();var a=document,b=a.documentElement,c=function(a,b){var c,d,e,f;if(b&&typeof b=="string"){c=b.split(/\s+/);if(a.nodeType===1)if(!a.className&&c.length===1)a.className=b;else{d=" "+a.className+" ";for(e=0,f=c.length;e<f;e++)~d.indexOf(" "+c[e]+" ")||(d+=c[e]+" ");d.trim?a.className=d.trim():0}}},d=function(a,b){var c,d,e,f="",g,h;if(b&&typeof b=="string"){c=b.split(/\s+/);if(a.nodeType===1&&a.className){f=(" "+a.className+" ").replace(/\s+/," ");for(g=0,h=c.length;g<h;g++)f=f.replace(" "+c[g]+" "," ")}a.className=f.trim?f.trim():f}},e=window.localStorage;if(!!e){var f="";try{var g=e.getItem("fontSizeClassName"),h=e.getItem("colCountClassName");g!=null&&(f+=" "+g),h!=null&&(f+=" "+h),f.replace(/["']/g,"")}catch(b){console.error(b.message)}f.length>0&&c(b,f)}var i="no-js",j="js",k=b.style;if(k.webkitColumnCount===""||k.MozColumnCount===""||k.columnCount==="")i+=" no-jr",j+=" jr";d(b,i),c(b,j),String.prototype.rot13=function(a){return(a==null?this:a).replace(/[a-zA-Z]/g,function(a){return String.fromCharCode((a<="Z"?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})},String.prototype.reverse=function(a){return(a==null?this:a).split("").reverse().join("")},typeof HANDJS=="undefined"&&(HANDJS={}),HANDJS.doNotProcessCSS=!0})();