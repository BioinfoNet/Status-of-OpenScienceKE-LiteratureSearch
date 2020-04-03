/* Copyright 2014 Sidnei de Souza 
 * 
 * usage: 
 *
 * in the header:
 * 	<script type="text/javascript" src="http://w2.cria.org.br/watermark/watermark.js"></script>
 *
 * in the body:
 * 	<script type='text/javascript'>watermark('BR',20,20)</script>
 *
 * 	parameters are: pos: TL | TR | BL | BR | TC | BC | CL | CR | CC
 * 			deltax
 * 			deltay
 */

// --------------------------------------------------------
var wmPos= 'BR';
var wmDx = 20;
var wmDy = 20;
var wmIw = 80;
var wmIh = 34;
//
// Set emergency to true to display message contained in emergency.html on all sites
// when user clicks on emergency flag
// Set to false to remove the flag on pages
//
var emergency = false;

onscroll=watermarkPosition;
onresize=watermarkPosition;
// --------------------------------------------------------
function watermarkPosition()
{ p = watermarkCalculate();

  if (document.getElementById && !document.all)
  { document.getElementById("watermarkBox").style.top = window.pageYOffset  + p[1] + "px";
    document.getElementById("watermarkBox").style.left = window.pageXOffset + p[0] + "px";
  }
  if (document.all)
  { document.all["watermarkBox"].style.top  = document.body.scrollTop  + p[1] + "px";
    document.all["watermarkBox"].style.left = document.body.scrollLeft + p[0] + "px";
  }
//  window.setTimeout("watermarkPosition()", 2000);
}
// --------------------------------------------------------
function watermarkCalculate()
{ var w = (document.getElementById && !document.all) ? window.innerWidth :
	   document.all ? document.body.clientWidth : 0;
  var h = (document.getElementById && !document.all) ? window.innerHeight :
	   document.all ? document.body.clientHeight : 0;

  switch (wmPos)
  { case 'TR' : x1 = w-wmIw-wmDx;	y1 = wmDy;	break;
    case 'BL' : x1 = wmDx;		y1 = h-wmIh-wmDy;	break;
    case 'BR' : x1 = w-wmIw-wmDx;	y1 =  h-wmIh-wmDy;	break;
    case 'TC' : x1 = ((w-wmIw)/2)-wmDx;	y1 = wmDy;	break;
    case 'BC' : x1 = ((w-wmIw)/2)-wmDx;	y1 = h-wmIh-wmDy;	break;
    case 'CL' : x1 = 0;			y1 = 0;		break;
    case 'CR' : x1 = 0;			y1 = 0;		break;
    default   : x1 = wmDx;		y1 = wmDy; // TL
  }

  return [x1,y1];
}
// --------------------------------------------------------
function watermark(pos,dx,dy)
{ if (pos) { wmPos = pos }
  if (dx)  { wmDx = dx }
  if (dy)  { wmDy = dy }
  document.write('<div id="watermarkBox" style="position:absolute;left:-100px;visibility:visible;z-index:1000;">');
  document.write('<a href="http://www.cria.org.br" target="_blank">');
  document.write('<img src="http://w2.cria.org.br/watermark/cria.png" style="border: none; width: '+wmIw+'px; height: '+wmIh+'px" border="0" width="'+wmIw+'" height="'+wmIh+'"/>');
  document.write('</a>'); 
  document.write('</div>'); 

  if (emergency)
  { document.write('<div id="emergencyBox" style="position:absolute;left:0px;top:0px;visibility:visible;z-index:9999;">');
    document.write('<a href="http://w2.cria.org.br/watermark/emergency.html" target="_blank">');
    document.write('<img src="http://w2.cria.org.br/watermark/emergency.png" style="border: none; width: 100px; height: 100px" border="0" width="100px" height="100px"');
    document.write(' onLoad="setTimeout(function(){top.document.getElementById(\'emergencyBox\').style.visibility=\'hidden\'},10000);"');
    document.write('/>');
    document.write('</a>'); 
    document.write('</div>'); 
  }

  watermarkPosition();
}
// --------------------------------------------------------
function watermarkReset(pos,dx,dy)
{ if (pos) { wmPos = pos }
  if (dx)  { wmDx  = dx  }
  if (dy)  { wmDy  = dy  }
}
// --------------------------------------------------------
