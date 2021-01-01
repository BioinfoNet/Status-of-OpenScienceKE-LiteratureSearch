var ns6 = (!document.all && document.getElementById);
var fdDiv, fdTop, fdLeft, fdDelta,fdAnim, fdLang;
var fdDelay = 5000;
var fdDeltaX = 0;

/*  ---------------------------------------------- */
function FeedbackRand(seed)
{ return Math.round(Math.random() * seed); }

/*  ---------------------------------------------- */
function FeedbackDock()
{ fdLeft = -135+fdDeltaX;
  fdDiv.style.left = fdLeft+'px';
  fdDiv.style.top = fdDelta+'px';
}

/*  ---------------------------------------------- */
function FeedbackSlideIn(i)
{ fdLeft = fdLeft+1;
  clearTimeout(fdAnim);
  fdDiv.style.left = fdLeft+'px';
  if (fdLeft<0) { fdAnim = setTimeout('FeedbackSlideIn('+i+')',5) }
  else
  { if (i == 1) { fdAnim = setTimeout('FeedbackSlideOut()',fdDelay) } }
}

/*  ---------------------------------------------- */
function FeedbackSlideOut()
{ fdLeft = fdLeft-1;
  clearTimeout(fdAnim);
  fdDiv.style.left = fdLeft+'px';
  if (fdLeft>(-135+fdDeltaX)) { fdAnim = setTimeout('FeedbackSlideOut()',5) }
}
/* Main Feedback function ----------------------------------------------
   parameters are:
   random	true | false
   delay	time, in seconds, to stay visible
   position	left | right | top
   delta	pixels from top | pixels from left
   average	number of times for which it appears once
   deltax	pixels to be added to the left property
   lang		pt | en
*/

function Feedback(fdParam)
{ ns = (!document.all && document.getElementById);
  if (fdParam.random && fdParam.random == true) { if (FeedbackRand(4) > 1) return }

  if (fdParam.delay && fdParam.delay == -1) { fdDelay = 0 }
  else if (fdParam.delay) { fdDelay = fdParam.delay * 1000 }

  fdDelta = 0; 
  if (fdParam.delta) { fdDelta = fdParam.delta }

  if (fdParam.deltax) { fdDeltaX = fdParam.deltax }

  fdLang = 'pt';
  if (fdParam.lang) { fdLang = fdParam.lang }

  document.write('<div id="feedbackDiv" '+
		 'style="position: absolute; z-index: 99; '+
		 'font-family: Arial Narrow, Helvetica; font-size: 2px; '+ 
		 'top: '+fdDelta+'px; left: '+(-135+fdDeltaX)+'px; width: 150px; height: 100px; background-color: transparent; visibility: visible">'+
		 '<a href="http://w2.cria.org.br/feedback/'+fdLang+'/index?'+document.domain+'+'+fdParam.image+'" target="feedback"><img src="http://w2.cria.org.br/feedback/label_'+fdLang+'.png" border="0" '+
		 'onMouseOver="FeedbackSlideIn(0)" '+
		 'onMouseOut="FeedbackSlideOut(0)" '+
		 '/></a>'+
		 '</div>');
  fdDiv = document.getElementById('feedbackDiv');
  FeedbackDock();
  if (fdParam.average && (FeedbackRand(fdParam.average) < 1)) { fdAnim = setTimeout('FeedbackSlideIn(1)',5) }
}
