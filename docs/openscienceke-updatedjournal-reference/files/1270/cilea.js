function confirmMessageWithUrl(msg,url) {   
    ans = confirm(msg);
    if (ans) 
        location.href=url;
}

function showPopup(href) {
	showPopupByName('win',href);
}
function showPopupByName(name,href) {
	na_open_window(name,href, 10, 10, 930, 630, 0, 0, 0, 1, 1);
}
function showPopupByNameFullScreen(name,href) {
	na_open_window_fullscreen(name,href, 0, 0, 0, 1, 1, true);
}
function showNewTab(href) {
	var win=window.open(href, '_blank');
	win.focus();
}

function cileaUnescape (value) {
	value=value.replace(/&#039;/g,"'");
	value=value.replace(/&#034;/g,'"');
	return value;
}

function evaluateEmbeddedScript(fragment){
	/*
	*ATTENZIONE: 
	*I tag <script> che ritornano dagli AJAX vengono "rimaneggiati" dai browser 
	*per l'inserimento nel DOM.
	*IE vede <SCRIPT>
	*FF vede <script>
	*document.write(fragment);
	*/
	var fragmentLowerCase=fragment.toLowerCase();
	var startIndex=fragmentLowerCase.indexOf('<script');	
	
	while (startIndex!=-1 && startIndex<fragment.length){				
		startIndex = fragment.indexOf(">", startIndex)+1;
		var endIndex = fragmentLowerCase.indexOf("</script", startIndex);
		/*JQ("scriptViewer").innerHTML=$("scriptViewer").innerHTML+fragment.substring(startIndex,endIndex)
		*JQ.globalEval( fragment.substring(startIndex,endIndex));
		*/
		eval( fragment.substring(startIndex,endIndex));
		startIndex=fragmentLowerCase.indexOf("<script", endIndex);
		
	}		
}

function serializeFormInputInDiv(divId){
	/*var inputs=JQ('#'+divId).getElementsByTagName("input");
	var selects=JQ('#'+divId).getElementsByTagName("select");
	var textareas=JQ('#'+divId).getElementsByTagName("textarea");
	
	var results = new Array();
	var counter=0;

	for(var i=0;i<inputs.length;i++,counter++){
		results[counter]=inputs[i];
	}

	for(var i=0;i<selects.length;i++,counter++){
		results[counter]=selects[i];
	}

	for(var i=0;i<textareas.length;i++,counter++){
		results[counter]=textareas[i];
	}	

	var serializedForm="";
	for (var i=0;i<results.length;i++){
		var serializedItem=Form.Element.serialize(JQ('#'+results[i]));
		if (serializedItem!=null && serializedItem!='') {
			if (i!=0)		
				serializedForm+="&";
			serializedForm+=serializedItem;
		} 
	}*/
	/* ALERT: DONT USE FIELDSET IN A FRAGMENT FORM */
	var serializedForm=JQ('#'+divId+" *").serialize();
	//alert(serializedForm);
	
	//recupero tutti gli iframe presenti in questo div
	//gli iframe vengono usati per la gestione dell'upload dei file
	//serializzo SOLO gli input ad eccezione di quelli di tipo file
	//questo perch� l'upload effettivo del file viene fatto a parte
	//devo utilizzare un meccanismo di serializzazione differente rispetto agli 
	//input normali perch� il codice di serializzazione di prototype suppone
	//che tutti gli input facciano parte dello stesso document javascript
	//ma l'iframe ha un DOM separato
	//alert(divId);
	var iframes=[];
	if (document.getElementById(divId))
		iframes=document.getElementById(divId).getElementsByTagName("iframe");
	//var iframes=JQ('#'+divId)//.getElementsByTagName("iframe");
	//alert(iframes);
	for (i=0;i<iframes.length;i++){		
		var inputsIframe=iframes[i].contentWindow.document.getElementsByTagName("input");
		
		for (j=0;j<inputsIframe.length;j++){
			//escludo gli input file, submit e quello con nome uniqueIdentifier
			//perch� gi� presente nel documento principale
			if (
					"file"!=inputsIframe[j].type.toLowerCase() 
					&& 
					"submit"!=inputsIframe[j].type.toLowerCase()
					&& 
					"uniqueIdentifier"!=inputsIframe[j].name
					
			){
				var inputName=inputsIframe[j].name;
				var inputValue=inputsIframe[j].value.replace("\"", "\\\"");
				//serializzazione della copia nome/parametro								
				//var command ="{"+inputName+":\""+inputValue+"\"}";
				//var serializedCommandItem=eval(command);
				//var serializedItem=JQ.param(serializedCommandItem);
				serializedForm+="&"+inputName+"="+inputValue;				
			}				
		}
	}	

	return serializedForm;	
}

function addEvent(obj, evType, fn){
	if (obj.addEventListener){ 
		  obj.addEventListener(evType, fn, false); 
		  return true; 
	} else if (obj.attachEvent){ 
		  var r = obj.attachEvent("on"+evType, fn); 
		  return r; 
	} else {
		return false; 
	} 	
}


function getAmpersand(pars){
	if (pars!="")
		return "&";
	else
		return "";
}
function getAmpersandOnUrl(url){
	if (url.indexOf('?')==-1)
		return "?";
	else
		return "&";
}

function serializeArray(paramsArray){
	var result="";	
	for (var i=0;i<paramsArray.length;i++) {
		if (paramsArray[i]){
			var paramName=paramsArray[i].substring(0, paramsArray[i].indexOf("="));
			var paramValue=paramsArray[i].substring(paramsArray[i].indexOf("=")+1);
			if (paramName=='parentFQClassName' || (paramValue && paramValue.trim()!="")){
				if (i!=0)
					result+="&";
				result+=paramName+"="+encodeURIComponent(paramValue);
			}
		}
	}
	return result;	
}

function getHTTPHeaderValue(jqXHR, headerName){
	return jqXHR.getResponseHeader(headerName);
}


//Per aprire pop-up formattati
function na_open_window(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
toolbar_str = toolbar ? 'yes' : 'no';
menubar_str = menubar ? 'yes' : 'no';
statusbar_str = statusbar ? 'yes' : 'no';
scrollbar_str = scrollbar ? 'yes' : 'no';
resizable_str = resizable ? 'yes' : 'no';
window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

function na_open_window_fullscreen(name, url, toolbar, menubar, statusbar, scrollbar, resizable, fullscreen)
{
toolbar_str = toolbar ? 'yes' : 'no';
menubar_str = menubar ? 'yes' : 'no';
statusbar_str = statusbar ? 'yes' : 'no';
scrollbar_str = scrollbar ? 'yes' : 'no';
resizable_str = resizable ? 'yes' : 'no';
fullscreen_str = fullscreen ? 'yes' : 'no';
window.open(url, name, 'toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str+',fullscreen='+fullscreen_str);
}

/*
 * This javascript constructs a new url based on the current one appending the breadCrumbBack parameter
 * with the value passed in. If no value is passed then the default value (-1) is used.
 * breadCrumbBack is the parameter intercepted by NavigationFilter to restore parameters associated with that url.
 * 
 * breadCrumbBack MUST BE a negative number. If a positive number is passed in it is inverted 
 */
function navigationBack(breadCrumbBack){
	
	if(!breadCrumbBack){
		breadCrumbBack=-1;
	} else if(breadCrumbBack>=0){
		breadCrumbBack=breadCrumbBack*(-1);
	}
	
	var currentUrl=document.location.href;
	var questionMarkFound=currentUrl.indexOf("?");
	if (questionMarkFound!=-1){
		currentUrl=currentUrl.substring(0, questionMarkFound);
	}
	
	currentUrl+="?breadCrumbBack="+breadCrumbBack;
	
	document.location.href=currentUrl;	
}
function checkModuleCalls(mapToCheck, postHandler) {
	var areAllImageLoaded=true;
	JQ.each(mapToCheck, function(module, value) { 
		areAllImageLoaded=areAllImageLoaded&value;
	});
	if (!areAllImageLoaded) 
		setTimeout(function(){checkModuleCalls(mapToCheck, postHandler);}, 100);
	else {
		if (postHandler)
			postHandler();
		else
			setTimeout("reloadCurrentUrl();",300);
	}		
}

/*wf*/
function wfFormSubmit() {
	JQ('#wfCommandForm').submit();
}
function wfFormSubmitPage(nextPage,successView) {
	JQ('#wfNextPage').val(nextPage);
	JQ('#successPage').val(successView);
	checkAllSelectMovable();
	JQ('#wfCommandForm').submit();
}
function wfFormForward(wfNextState) {
	JQ('#wfNextState').val(wfNextState);
	checkAllSelectMovable();
	wfFormSubmit();
}

function wfDetailSubmitPage(nextPage, successView) {
	JQ('#wfPage').val(nextPage);
	JQ('#successPage').val(successView);
	JQ('#wfCommandForm').submit();
}


var fineMese = new Array();
	fineMese[1]=31;
	fineMese[2]=28;
	fineMese[3]=31;
	fineMese[4]=30;
	fineMese[5]=31;
	fineMese[6]=30;
	fineMese[7]=31;
	fineMese[8]=31;
	fineMese[9]=30;
	fineMese[10]=31;
	fineMese[11]=30;
	fineMese[12]=31;

function addMesiToDate(dateString,mesi) {
	var giorno = Number(dateString.substr(0,2));
	var mese = Number(dateString.substr(3,2));
	var anno = Number(dateString.substr(6,4));
	var incrementoAnno = Math.floor(mesi/12);
	var incrementoMese = mesi-(incrementoAnno*12);
	anno=anno+incrementoAnno;
	mese=mese+incrementoMese;
	if (mese>12) {
		mese-=12;
		anno++;
	}
	
	if (giorno>fineMese[mese]) {
		if (anno%4==0&&mese==2&&giorno>28)
			giorno=29;
		else{
			giorno=fineMese[mese];
		}
	}
	
	var dateFinale = new Date(anno,mese-1,giorno);
	var millisFinale = dateFinale.getTime();
	millisFinale=millisFinale-86400000;
	dateFinale = new Date(millisFinale);
	meseFinale=""+(dateFinale.getMonth()+1);
	giornoFinale=""+dateFinale.getDate();
	annoFinale=""+dateFinale.getFullYear();
	if (meseFinale.length==1)
		meseFinale="0"+meseFinale;
	if (giornoFinale.length==1)
		giornoFinale="0"+giornoFinale;
	return giornoFinale+"/"+meseFinale+"/"+annoFinale;
}


function refreshDataAsSumOfDateAndMounth(inizioId,meseId,fineId) {
	var dataDecorrenza=JQ('#'+inizioId).val();
	var durata=JQ('#'+meseId).val();
	
	if (dataDecorrenza!=""){
		if(durata == "") {
			JQ('#'+fineId).val(dataDecorrenza);
		} else {
			var dataScadenza=addMesiToDate(dataDecorrenza,durata);
			if (dataScadenza.indexOf("NaN")==-1)
				JQ('#'+fineId).val(dataScadenza);
			else {
				JQ('#'+fineId).val('');
			}
		}
	}
}

function refreshDataAsSumOfDateAndYear(inizioId,annoId,fineId) {
	var dataDecorrenza=JQ('#'+inizioId).val();
	var durata=JQ('#'+annoId).val();
	
	if (dataDecorrenza!=""){
		if(durata == "") {
			JQ('#'+fineId).val(dataDecorrenza);
		} else {
			var dataScadenza=addMesiToDate(dataDecorrenza,durata*12);
			if (dataScadenza.indexOf("NaN")==-1)
				JQ('#'+fineId).val(dataScadenza);
			else {
				JQ('#'+fineId).val('');
			}
		}
	}
}

function parseDate(str) {
	var mdy = str.split('/');
	return new Date(mdy[2], mdy[1], mdy[0]-1);
}
function daydiff(first, second) {
	return Math.round((second-first)/(1000*60*60*24));
}

function unformatNumber(text) {
	if (text==null) return null;
	var finale = text;
	finale = finale.replace(/\./g,"");
	finale = finale.replace(/,/g,".");
	return finale;
}


function formatNumber(text) {
	var error = false;
	var msg = "OK";
	var finale = "";
	if  (text!=null && text != '' && text!='undefined') {
		finale = text;
		if ("," == finale || "." == finale)
			finale = "0,";		
		else {
			var minusPresent=false;
			var comaPresent=false;
			if (finale.lastIndexOf(".")==finale.length-1)
				finale=finale.substr(0,finale.length-1)+",";

			finale = unformatNumber(finale);

			if (finale.search(/\./)!=-1)
				comaPresent=true;
				
			if (finale.search(/\-/)!=-1)
				minusPresent=true;
			
			var parteIntera;
			var parteDecimale;
			if (comaPresent) {
				var separatore = finale.search(/\./);
				parteIntera=finale.substring(0,separatore);
				parteDecimale=finale.substring(separatore+1, finale.length);
			}
			else {
				parteIntera=finale;
				parteDecimale="";
			}
			
			if (minusPresent){
				parteIntera=parteIntera.substring(1,parteIntera.length);
			}
			
			//elimino gli zeri iniziali di parte intera (pu� iniziare con zero solo se poi � "0,"
			var controllo=true;
			while(controllo) {
				if (parteIntera.charAt(0)==0&&parteIntera.length!=1)
					parteIntera=parteIntera.substring(1,finale.length);
				else
					controllo=false;
				
			}
		
			finale='';
			if (parteIntera.length<4)
				finale = parteIntera;
			else {
				for (i=parteIntera.length-3;i>0;i=i-3) {
					finale = "."+parteIntera.substr(i,3)+finale;
				}
				if (parteIntera.length%3==0)
					finale = parteIntera.substr(0,3)+finale;
				else
					finale = parteIntera.substr(0,parteIntera.length%3)+finale;
			}
			
			if (comaPresent) {
				if (parteDecimale.length>2) 
					parteDecimale=parteDecimale.substr(0,2);
				finale = finale + "," + parteDecimale;
			}
			
			if (minusPresent){
				finale="-"+finale;
			}
		}
	}
	var ritorno=new Object();
	ritorno.errore=error;
	ritorno.msg=msg;
	ritorno.finale=finale;
	return ritorno;
}	

function confirmExit() {
	if (confirmExitVarPassato){
		if (confirmExitVar) {
			if (confirmExitMessage!=null && confirmExitMessage!="")
				return confirmExitMessage;		
		}
	}
}
function removeConfirmExit() {
	confirmExitVar=false;	
	confirmExitVarPassato=true;
}
function addConfirmExit() {
	confirmExitVar=true;	
	confirmExitVarPassato=false;
}
function submitPost(url,buttonName,buttonValue) {
	var form = JQ('<form method="post" action="'+url+'"></form>');
	form.html('<input type="hidden" name="'+buttonName+'" value="'+buttonValue+'" />');
	form.appendTo(JQ('body')).submit();
}


function openForwardMessageDialogue(nextState) {	
	JQ("#forwardMessageNextState").val(nextState);	
	JQ("#dialogueForwardMessageDiv").modal({backdrop: 'static', keyboard: false});
	return false;	
}

function closeForwardMessageDialogueAndSubmit() {	
	closeForwardMessageDialogue();
	var message = JQ("#forwardMessageTextarea").val();
	var nextState = JQ("#forwardMessageNextState").val();

	var input = document.createElement("input");
	input.name = "clobMap[forwardMessage_"+nextState+"]";
	input.id = "clobMap__forwardMessage_"+nextState+"__";
	input.type = "hidden";
	input.value = message;
	document.getElementById('wfCommandForm').appendChild(input);
	
	wfFormForward(nextState);
}

function closeForwardMessageDialogue() {
	JQ("#dialogueForwardMessageDiv").modal('toggle');
}


function reloadCurrentUrl(){
	location.reload(true) ;		
}

function postAjaxCommandForm(url, nodeId, callback){
	var pars=JQ("#"+nodeId+" *").serialize();
	JQ.ajax({
		url: url,
		data: pars,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "POST",
		success: function(data, textStatus, jqXHR) {
			if (getHTTPHeaderValue(jqXHR,"FragmentError")=="1"){				
				var $modal = jQuery(data);				
	            $modal.filter('.modal').modal();
	            $modal.filter('.modal').on('hidden.bs.modal', function(){
	            	$modal.remove();
				});	            
	            JQ("#editAssigned").html($modal);
	            
			} else {
			    JQ('#editAssigned').modal('hide');
			    JQ('.modal-backdrop').remove();
				callback();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert("errore");
		}
	});	
}

//script di gestione delle eliminazioni delle unità organizzative 
//con eliminazione delle referenze intermodulo
//trovo tutti le associazioni legate a quella OrgUnit
function searchOrgUnit(organizationUnitId){

	var div1 = document.createElement("div");
	div1.setAttribute("class", "modal fade");
	div1.setAttribute("id", "modal-show-linkOrgUnit");
	div1.setAttribute("role", "dialog");
	div1.setAttribute("style","visibility: visible; display: none;");
	div1.setAttribute("aria-hidden","false")
	div1.setAttribute("data-keyboard","false");
	div1.setAttribute("data-backdrop","static");
	var div2 = document.createElement("div");
	div2.setAttribute("class", "modal-dialog");
	var div3 = document.createElement("div");
	div3.setAttribute("class", "modal-content");
	var div4 = document.createElement("div"); 
	div4.setAttribute("class", "modal-header");
	var div5 = document.createElement("div"); 
	div5.setAttribute("id", "modal-body-list");
	div5.setAttribute("style", "padding: 10px;");
	var div6 = document.createElement("div");
	div6.setAttribute("id","modal-body-searchOrgUnitAjaxWait");
	var div7 = document.createElement("div"); 
	div7.setAttribute("id", "modal-body-searchOrgUnit");
	div7.setAttribute("style", "display: block;");
	var div8 = document.createElement("div"); 
	div8.setAttribute("class", "modal-footer");
	var div9 = document.createElement("div");
	div9.setAttribute("id", "labelNewOrgUnit");
	div9.setAttribute("class", "modal-footer");
	var div10 = document.createElement("div");
	div10.setAttribute("class", "line-label col-sm-6");
	var div11 = document.createElement("div");
	div11.setAttribute("class", "line-content col-sm-2");

	document.body.appendChild(div1);
	div1.appendChild(div2);
	div2.appendChild(div3);
	div3.appendChild(div4);
	div3.appendChild(div5);
	div3.appendChild(div8);
	
	var text2 = document.createElement("p");
	text2.setAttribute("id", "info1");
	text2.textContent = "Cliccando su Elimina con sgancio verrà eliminata l'Unità organizzativa e tutti gli oggetti collegati verranno sganciati da essa";
	
	div5.appendChild(text2);
	
	var text3 = document.createElement("p");
	text3.setAttribute("id", "info2");
	text3.textContent = "Cliccando su Elimina con riassocizione verrà eliminata l'Unità organizzativa e tutti gli oggetti collegati verranno riassociati ad un'altra Unità organizzativa";
	
	div5.appendChild(text3);
	
	div5.appendChild(div6);
	div5.appendChild(div7);
	div5.appendChild(div9);

	var btn1 = document.createElement("button");
	btn1.setAttribute("id", "close");
	btn1.setAttribute("class", "close");
	btn1.setAttribute("data-dismiss", "modal");
	btn1.textContent = "x";
	
	var text1 = document.createElement("h4");
	text1.setAttribute("class", "modal-title");
	text1.textContent = "Conferma eliminazione";

	div4.appendChild(btn1);
	div4.appendChild(text1);
	
	var span1 = document.createElement("span");
	span1.setAttribute("class", "fa fa-spinner fa-spin");
	span1.setAttribute("id", "spinner");
	
	div6.appendChild(span1);
	
	var text4 = document.createElement("p");
	text4.setAttribute("id", "waiting");
	text4.textContent = "Ricerca di elementi collegati...";

	div6.appendChild(text4);

	var text5 = document.createElement("p");
	text5.setAttribute("id", "message");
	var text6 = document.createElement("p");
	text6.setAttribute("id", "result");
	var text10 = document.createElement("p");
	text10.setAttribute("id", "listCount");

	div7.appendChild(text5);
	div7.appendChild(text6);
	div7.appendChild(text10);
	
	var btn2 = document.createElement("BUTTON");
	btn2.setAttribute("id", "cancel");
	btn2.setAttribute("class", "btn btn-default");
	btn2.setAttribute("data-dismiss", "modal");
	btn2.setAttribute("aria-label", "Close");
	btn2.textContent = "Annulla";
	
	div8.appendChild(btn2);
	
	var boolean1 = false;
	var text9 = document.createElement("p");
	text9.setAttribute("id", "confirmDeleteWithRelease");
	text9.setAttribute("class", "btn btn-primary");
	text9.setAttribute("title", "elimina con sgancio");
	text9.textContent = "Elimina con sgancio";
	text9.setAttribute("onclick","confirmDelete("+organizationUnitId+","+boolean1+")");

	div8.appendChild(text9);
	
	var text7 = document.createElement("p");
	text7.setAttribute("id", "deleteWithReAssociation");
	text7.setAttribute("class", "btn btn-primary");
	text7.setAttribute("title", "elemina con riassociazione");
	text7.textContent = "Elemina con riassociazione";
	text7.setAttribute("onclick","deleteWithReAssociation("+organizationUnitId+")");

	div8.appendChild(text7);
	
	var boolean2 = true;
	var text7 = document.createElement("p");
	text7.setAttribute("id", "confirmdeleteWithReAssociation");
	text7.setAttribute("class", "btn btn-primary");
	text7.setAttribute("title", "conferma");
	text7.textContent = "Conferma";
	text7.setAttribute("onclick","confirmDelete("+organizationUnitId+","+boolean2+")");

	div8.appendChild(text7);
	
	var text8 = document.createElement("i");
	text8.setAttribute("id", "OperationCanceled");
	text8.setAttribute("class", "btn btn-primary");
	text8.setAttribute("title", "OperationCanceled");
	text8.textContent = "OK";
	text8.setAttribute("onclick","window.location.reload()");

	div8.appendChild(text8);
	
	var label1 = document.createElement('label');
	label1.setAttribute("class", "control-label");
	
	var span2 = document.createElement("span");
	span2.setAttribute("class", "line-label-text");
	span2.textContent = "ID della nuova Unità organizzativa";
	
	label1.appendChild(span2);
	div10.appendChild(label1);
	
	var input1 = document.createElement("input");
	input1.setAttribute("id", "idNewOrgUnit");
	input1.setAttribute("value", "");
	input1.setAttribute("class", "form-control");
	input1.type = "text";
	input1.name = "idNewOrgUnit";
	
	div11.appendChild(input1);
	
	div9.appendChild(div10);
	div9.appendChild(div11);
	
	document.getElementById("modal-show-linkOrgUnit").style.visibility = "visible";
	$("#info1").hide();
	$("#info2").hide();
	$("#modal-body-searchOrgUnit").hide();
	$("#labelNewOrgUnit").hide();
	$("#confirmdeleteWithReAssociation").hide();
	$("#OperationCanceled").hide();
	$("#confirmDeleteWithRelease").hide();
	$("#deleteWithReAssociation").hide();
	$("#cancel").hide();
	document.getElementById("message").innerHTML = "";
	document.getElementById("result").innerHTML = "";
	document.getElementById("listCount").innerHTML = "";

	$("#modal-show-linkOrgUnit").modal('show');
	$("#modal-body-list").show();
	$("#modal-body-searchOrgUnitAjaxWait").show();
	
	var result="";
	var ajaxCallList = [0,0,0,0,0]; //0=call ajax unanswered, 1=ajax call ok, 2=ajax call with error
	//Cerca WfItem
	var url='/ap/linkChecker/wfItem/selectable/widgetSearch.json';
	url+='?rnd='+Math.random(9999);
	url+='&organizationUnitValueId='+organizationUnitId;
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(data){
			ajaxCallList[0]=1;
			var i;
			var count = data.length;
			if(count>5){
				count = 5;
			}
			var text ="<h1 id= \"wfList\">Entità con flusso ("+data.length+")</h1>"+ "<ul>";
			for (i=0;i<count;i++){
				text += "<li><b>Descrizione: </b>"+ data[i].displayValue + " <b>ID:</b> "+ data[i].identifyingValue +" <b>Identificativo: </b>"+ data[i].identifier +" <b>Tipo: </b>"+ data[i].wfItemType.displayValue + "</li>";
			}
			if(data.length>5){
				text += "<li>Etc...</li>";
			}
			text += "</ul> <hr>";
			if( data[0]!= null){
				result = result + text;
			}
		},
		error: function (data) {
			ajaxCallList[0]=2;
			var text ="<h1 id= \"wfList\">Entità con flusso</h1>"+ "<ul>";
			text += "<li>Ci sono stati dei problemi nel recuperare le entità con flusso</li>";
			text += "</ul> <hr>";
			result = result + text;
		}
	});
	//Cerca Person
	var url='/rm/linkChecker/person/selectable/widgetSearch.json';
	url+='?rnd='+Math.random(9999);
	url+='&organizationUnitValueId='+organizationUnitId;
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(data){
			ajaxCallList[1]=1;
			var i;
			var count = data.length;
			if(count>5){
				count = 5;
			}
			var text ="<h1 id= \"person\">Persone ("+data.length+")</h1>"+ "<ul>";
			for (i=0;i<count;i++){
				text += "<li><b>Descrizione: </b>"+ data[i].displayValue + " <b>ID:</b> "+ data[i].identifyingValue +"</li>";
			}
			if(data.length>5){
				text += "<li>Etc...</li>";
			}
			text += "</ul> <hr>";
			if( data[0] != null ){
				result = result + text;
			}
		},
		error: function (data) {
			ajaxCallList[1]=2;
			var text ="<h1 id= \"person\">Persone</h1>"+ "<ul>";
			text += "<li>Ci sono stati dei problemi nel recuperare le persone</li>";
			text += "</ul> <hr>";
			result = result + text;
		}
	});
	//Cerca RmItem
	var url='/rm/linkChecker/rmItem/selectable/widgetSearch.json';
	url+='?rnd='+Math.random(9999);
	url+='&organizationUnitValueId='+organizationUnitId;
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(data){
			ajaxCallList[2]=1;
			var i;
			var count = data.length;
			if(count>5){
				count = 5;
			}
			var text ="<h1 id= \"rmItem\">Entità senza flusso ("+data.length+")</h1>"+ "<ul>";
			for (i=0;i<count;i++){	
				text += "<li><b>Descrizione: </b>"+ data[i].displayValue + " <b>ID:</b> "+ data[i].identifyingValue +" <b>Tipo:</b> "+ data[i].rmItemType.displayValue+"</li>";
			}
			if(data.length>5){
				text += "<li>Etc...</li>";
			}
			text += "</ul> <hr>";
			if(data[0] != null ){
				result = result + text;
			}
		},
		error: function (data) {
			ajaxCallList[2]=2;
			var text ="<h1 id= \"rmItem\">Entità senza flusso</h1>"+ "<ul>";
			text += "<li>Ci sono stati dei problemi nel recuperare le entità senza flusso</li>";
			text += "</ul> <hr>";
			result = result + text;
		}
	});
	//Cerca Position
	var url='/rm/linkChecker/position/selectable/widgetSearch.json';
	url+='?rnd='+Math.random(9999);
	url+='&organizationUnitValueId='+organizationUnitId;
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(data){
			ajaxCallList[3]=1;
			var i;
			var count = data.length;
			if(count>5){
				count = 5;
			}
			var text ="<h1 id= \"position\">Rapporti di lavoro ("+data.length+")</h1>"+ "<ul>";
			for (i=0;i<count;i++){
				text += "<li><b>Descrizione:</b> "+ data[i].discriminator + " <b>ID-Persona</b>: "+ data[i].person.identifyingValue +"</li>";
			}
			if(data.length>5){
				text += "<li>Etc...</li>";
			}
			text += "</ul> <hr>";
			if(data[0] != null){
				result = result + text;
			}
		},
  	  	error: function (data) {
  	  		ajaxCallList[3]=2;
  	  		var text ="<h1 id= \"position\">Rapporti di lavoro</h1>"+ "<ul>";
  	  		text += "<li>Ci sono stati dei problemi nel recuperare i rapporti di lavoro</li>";
  	  		text += "</ul> <hr>";
  	  		result = result + text;
		}
	});
	//Cerca OrgUnit
	var url='/rm/linkChecker/orgUnit/selectable/widgetSearch.json';
	url+='?rnd='+Math.random(9999);
	url+='&organizationUnitValueId='+organizationUnitId;
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(data){
			ajaxCallList[4]=1;
			var i=data.length;
			var text ="<h1 id= \"orgUnit\">Unit&aacute organizzative figlie ("+data.length+")</h1>"+" <hr>";
			if(data[0] != null){
				result = result + text;
			}
		},
  	  	error: function (data) {
  	  		ajaxCallList[4]=2;
  	  		var text ="<h1 id= \"orgUnit\">Unit&aacute organizzative figlie </h1>"+ "<ul>";
  	  		text += "<li>Ci sono stati dei problemi nel recuperare le Unit&aacute organizzative figlie</li>";
  	  		text += "</ul> <hr>";
  	  		result = result + text;
		}
	});
	
	var stop= false;
	
	var intervalID = setInterval(function(){ 
		if(ajaxCallList[0] == 1 && ajaxCallList[1] == 1 && ajaxCallList[2] == 1 && ajaxCallList[3] == 1 && ajaxCallList[4] == 1){
			if(result==""){
				$("#info1").show();
				$("#modal-body-searchOrgUnitAjaxWait").hide();
				$("#modal-body-searchOrgUnit").show();
				$("#result").hide();
				$("#listCount").hide();
				$("#message").show();
				document.getElementById("message").innerHTML = "Non ci sono elementi collegati";
				$("#confirmDeleteWithRelease").show();
				$("#cancel").show();
				var timeout1 = setTimeout(function(){
					confirmDelete(organizationUnitId, false);
				}, 4000);
			}else{
				var lastIndex = result.lastIndexOf(" ");
				result = result.substring(0, lastIndex);
				$("#info1").show();
				$("#info2").show();
				$("#modal-body-searchOrgUnitAjaxWait").hide();
				$("#modal-body-searchOrgUnit").show();
				$("#result").show();
				$("#message").show();
				$("#listCount").hide();
				document.getElementById("result").innerHTML = result;
				$("#confirmDeleteWithRelease").show();
				$("#deleteWithReAssociation").show();
				$("#cancel").show();
			}
			window.clearInterval(intervalID);
			stop = true;
		}
		if((ajaxCallList[0] == 2 && ajaxCallList[1] !=0 && ajaxCallList[2] != 0 && ajaxCallList[3] != 0 && ajaxCallList[4] != 0) || (ajaxCallList[1] == 2 && ajaxCallList[0] !=0 && ajaxCallList[2] != 0 && ajaxCallList[3] != 0 && ajaxCallList[4] != 0) || (ajaxCallList[2] == 2 && ajaxCallList[1] !=0 && ajaxCallList[0] != 0 && ajaxCallList[3] != 0 && ajaxCallList[4] != 0) || (ajaxCallList[3] == 2 && ajaxCallList[1] !=0 && ajaxCallList[2] != 0 && ajaxCallList[0] != 0 && ajaxCallList[4] != 0) || (ajaxCallList[4] == 2 && ajaxCallList[1] !=0 && ajaxCallList[2] != 0 && ajaxCallList[3] != 0 && ajaxCallList[0] != 0)){
			window.clearInterval(intervalID);
			stop = true;
			var lastIndex = result.lastIndexOf(" ");
			result = result.substring(0, lastIndex);
			$("#info1").hide();
			$("#info2").hide();
			$("#modal-body-searchOrgUnitAjaxWait").hide();
			$("#modal-body-searchOrgUnit").show();
			$("#result").show();
			$("#listCount").hide();
			$("#message").hide();
			document.getElementById("result").innerHTML = result;
			$("#OperationCanceled").show();
		}
	}, 1000);
	
	var timeout5 = setTimeout(function(){
		if(ajaxCallList[0] == 2 || ajaxCallList[1] == 2 || ajaxCallList[2] == 2 || ajaxCallList[3] == 2 || ajaxCallList[4] == 2){
			if(stop==false){
				window.clearInterval(intervalID);
				stop = true;
				var lastIndex = result.lastIndexOf(" ");
				result = result.substring(0, lastIndex);
				$("#info1").hide();
				$("#info2").hide();
				$("#modal-body-searchOrgUnitAjaxWait").hide();
				$("#modal-body-searchOrgUnit").show();
				$("#result").show();
				$("#listCount").hide();
				$("#message").hide();
				document.getElementById("result").innerHTML = result;
				$("#OperationCanceled").show();
				window.clearInterval(intervalID);
				stop = true;
			}
		}else{
			if(ajaxCallList[0] == 1 && ajaxCallList[1] == 1 && ajaxCallList[2] == 1 && ajaxCallList[3] == 1 && ajaxCallList[4] == 1){
				if(stop==false){
					window.clearInterval(intervalID);
					stop = true;
					if(result==""){
						$("#info1").show();
						$("#modal-body-searchOrgUnitAjaxWait").hide();
						$("#modal-body-searchOrgUnit").show();
						$("#result").hide();
						$("#listCount").hide();
						$("#message").show();
						document.getElementById("message").innerHTML = "Non ci sono elementi collegati";
						$("#confirmDeleteWithRelease").show();
						$("#cancel").show();
						var timeout1 = setTimeout(function(){
							confirmDelete(organizationUnitId,false);
						}, 4000);
					}else {
						var lastIndex = result.lastIndexOf(" ");
						result = result.substring(0, lastIndex);
						$("#info1").show();
						$("#info2").show();
						$("#modal-body-searchOrgUnitAjaxWait").hide();
						$("#modal-body-searchOrgUnit").show();
						$("#result").show();
						$("#message").show();
						$("#listCount").hide();
						document.getElementById("result").innerHTML = result;
						$("#confirmDeleteWithRelease").show();
						$("#deleteWithReAssociation").show();
						$("#cancel").show();	
					}
				}
			}
		}
		if(stop==false){
			window.clearInterval(intervalID);
			$("#info1").hide();
			$("#info2").hide();
			$("#modal-body-searchOrgUnitAjaxWait").hide();
			$("#modal-body-searchOrgUnit").show();
			$("#result").show();
			document.getElementById("result").innerHTML = "A causa di un problema non è stato possibile recuperare le associazioni legate all'Unità organizzativa:" + organizationUnitId;
			$("#OperationCanceled").show();
			var timeout4 = setTimeout(function(){
				window.location.reload();
			}, 4000);
		}
	}, 120000);
}

function confirmDelete(organizationUnitId, reassociation){
	var stop = false;
	var idNewOrgUnit = 0;
	var countPosition = 0;
	var countRmItemElementData = 0;
	var countRmItemData = 0;
	var countPersonElementData = 0;
	var countPersonLinkData = 0;
	var countOrganizationUnitChild = 0;
	var countTeam = 0;
	var countWfItemData = 0;
	var countWfElementData = 0;
	var countWfItemLinkData = 0;
	var countWfTask = 0;
	var resultList = [];
	var result1 = {result:0, message:""};
	var result2 = {result:0, message:""};
	resultList[0]=result1;
	resultList[1]=result2;
	var countCompleteRM = false;
	var countCompleteAP = false;
	var errorMessage = null;
	
	var text10 = document.getElementById("listCount");
	var listCount ="<h1 id= \"eliminazione\">Eliminazione in corso</h1>"+ "<ul>";
	
	var title = document.createElement("h1");
	title.setAttribute("id", "eliminazione");
	title.textContent = "Eliminazione in corso";
	
	var ul = document.createElement('ul');
	ul.setAttribute('id','countList');
	ul.setAttribute('style','font-size:100%;');
	var li1 = document.createElement('li');
	li1.setAttribute('id','countWfItemData');  
	li1.setAttribute('style','font-size:100%;');
	var li2 = document.createElement('li');
	li2.setAttribute('id','countWfElementData');
	li2.setAttribute('style','font-size:100%;');
	var li3 = document.createElement('li');
	li3.setAttribute('id','countWfItemLinkData');
	li3.setAttribute('style','font-size:100%;');
    var li4 = document.createElement('li');
    li4.setAttribute('id','countWfTask');
    li4.setAttribute('style','font-size:100%;');
	var li5 = document.createElement('li');
	li5.setAttribute('id','countTeam');
	li5.setAttribute('style','font-size:100%;');
	var li6 = document.createElement('li');
	li6.setAttribute('id','countPosition');
	li6.setAttribute('style','font-size:100%;');
	var li7 = document.createElement('li');
	li7.setAttribute('id','countRmItemElementData');
	li7.setAttribute('style','font-size:100%;');
	var li8 = document.createElement('li');
	li8.setAttribute('id','countRmItemData');
	li8.setAttribute('style','font-size:100%;');
	var li9 = document.createElement('li');
	li9.setAttribute('id','countPersonElementData');
	li9.setAttribute('style','font-size:100%;');
	var li10 = document.createElement('li');
	li10.setAttribute('id','countPersonLinkData');
	li10.setAttribute('style','font-size:100%;');
	
	text10.appendChild(title);
	title.appendChild(ul);
	ul.appendChild(li1);
	ul.appendChild(li2);
	ul.appendChild(li3);
	ul.appendChild(li4);
	ul.appendChild(li5);
	ul.appendChild(li6);
	ul.appendChild(li7);
	ul.appendChild(li8);
	ul.appendChild(li9);
	ul.appendChild(li10);
	
	$("#listCount").hide();
	
	if(reassociation == true){
		idNewOrgUnit = document.getElementById("idNewOrgUnit");
		if(idNewOrgUnit == "" || idNewOrgUnit == null){
			deleteWithReAssociation(organizationUnitId);
		}
	}
	
	var confirmMessage = confirm("Sei sicuro di voler cancella l'Unità organizzativa: "+organizationUnitId+"!?  L'OPERAZIONE E' IRREVERSIBILE");
	if (confirmMessage == true) {
		document.getElementById("deleteWithReAssociation").onclick = null;
		document.getElementById("confirmDeleteWithRelease").onclick = null;
		document.getElementById("confirmdeleteWithReAssociation").onclick = null;
		document.getElementById("cancel").disabled = true;
		document.getElementById("close").disabled = true;
		$("#info1").hide();
		$("#info2").hide();
		$("#labelNewOrgUnit").hide();
		$("#deleteWithReAssociation").hide();
		$("#confirmDeleteWithRelease").hide();
		$("#confirmdeleteWithReAssociation").hide();
		$("#OperationCanceled").hide();
		$("#message").hide();
		$("#result").show();
		$("#listCount").hide();
		$("#countWfItemData").hide();
		$("#countWfElementData").hide();
		$("#countWfItemLinkData").hide();
		$("#countWfTask").hide();
		$("#countPosition").hide();
		$("#countRmItemElementData").hide();
		$("#countRmItemData").hide();
		$("#countPersonElementData").hide();
		$("#countPersonLinkData").hide();
		$("#countTeam").hide();
		
		if(reassociation == true){
			document.getElementById("result").innerHTML = "Eliminazione dell'Unità organizzativa " +organizationUnitId +", e riassociazione di tutti gli oggetti collegati alla nuova Unità organizzativa:" +idNewOrgUnit.value;
		}else{
			document.getElementById("result").innerHTML = "Eliminazione dell'Unità organizzativa " +organizationUnitId;
		}
		$("#modal-body-searchOrgUnit").show();
		
		var urlAP='/ap/organizationUnitAP/count.htm';
		urlAP+='?rnd='+Math.random(9999);
		urlAP+='&organizationUnitId='+organizationUnitId;
		$.ajax({
			url:urlAP,
			headers: {},
			type: "GET",
			success: function (data, textStatus, request) {
				var list = null;
				list = JSON.parse(request.getResponseHeader('json'));
				if(list != null){
				for (var i = 0; i < list.length; i++){
				    var obj = list[i];
				        if(obj["Tipo"] == "wfItemData"){
				        	countWfItemData = obj["Contatore"];
				        	if(countWfItemData > 0){
				        		document.getElementById("countWfItemData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfItemData +" <b>Già fatti</b>: "+  (countWfItemData - obj["Contatore"]) +"</li>";
				        		$("#countWfItemData").show();
				        	}else{
				        		$("#countWfItemData").hide();
				        	}
				        }
				        if(obj["Tipo"] == "wfItemElement"){
				        	countWfElementData = obj["Contatore"];
				        	if(countWfElementData > 0){
				        		document.getElementById("countWfElementData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfElementData +" <b>Già fatti</b>: "+  (countWfElementData - obj["Contatore"]) +"</li>";
				        		$("#countWfElementData").show();
				        	}else{
				        		$("#countWfElementData").hide();
				        	}
				        }
				        if(obj["Tipo"] == "wfItemLinkData"){
				        	countWfItemLinkData = obj["Contatore"];
				        	if(countWfItemLinkData > 0){
				        		document.getElementById("countWfItemLinkData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfItemLinkData +" <b>Già fatti</b>: "+  (countWfItemLinkData - obj["Contatore"]) +"</li>";
				        		$("#countWfItemLinkData").show();
				        	}else{
				        		$("#countWfItemLinkData").hide();
				        	}
				        }
				        if(obj["Tipo"] == "wfTask"){
				        	countWfTask = obj["Contatore"];
				        	if(countWfTask > 0){
				        		document.getElementById("countWfTask").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfTask +" <b>Già fatti</b>: "+  (countWfTask - obj["Contatore"]) +"</li>";
				        		$("#countWfTask").show();
				        	}else{
				        		$("#countWfTask").hide();
				        	}
				        }
				    }
				}
				countCompleteAP = true;
			},
		  	error: function (XMLHttpRequest, textStatus, errorThrown) {
	
			}
		});
		
		var urlRm='/rm/organizationUnit/count.htm';
		urlRm+='?rnd='+Math.random(9999);
		urlRm+='&organizationUnitId='+organizationUnitId;
		$.ajax({
			url:urlRm,
			headers: {},
			type: "GET",
			success: function (data, textStatus, request) {
				var list = null;
				list = JSON.parse(request.getResponseHeader('json'));   
				if(list != null){
				for (var i = 0; i < list.length; i++){
				    var obj = list[i];
				        if(obj["Tipo"] == "position"){
							 countPosition = obj["Contatore"];
							 if(countPosition > 0){
								 document.getElementById("countPosition").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countPosition +" <b>Già fatti</b>: "+  (countPosition - obj["Contatore"]) +"</li>";
								 $("#countPosition").show();
							 }
							 else{
								 $("#countPosition").hide(); 
							 }
						}
						if(obj["Tipo"] == "rmItemElementData"){
							countRmItemElementData = obj["Contatore"];
							if(countRmItemElementData > 0){
								document.getElementById("countRmItemElementData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countRmItemElementData +" <b>Già fatti</b>: "+  (countRmItemElementData - obj["Contatore"]) +"</li>";	
								$("#countRmItemElementData").show(); 
							}else{
								$("#countRmItemElementData").hide(); 
							}
						}
						if(obj["Tipo"] == "rmItemData"){
							countRmItemData = obj["Contatore"];
							if(countRmItemData > 0){
								document.getElementById("countRmItemData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countRmItemData +" <b>Già fatti</b>: "+   (countRmItemData- obj["Contatore"]) +"</li>";
								$("#countRmItemData").show(); 
							}else{
								$("#countRmItemData").hide(); 
							}
						}
						if(obj["Tipo"] == "personElementData"){
							 countPersonElementData = obj["Contatore"];
							 if(countPersonElementData > 0){
								 document.getElementById("countPersonElementData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countPersonElementData +" <b>Già fatti</b>: "+  (countPersonElementData - obj["Contatore"]) +"</li>";	
								 $("#countPersonElementData").show(); 
							 }else{
								 $("#countPersonElementData").hide();  
							 }
						}
						if(obj["Tipo"] == "personLinkData"){
							countPersonLinkData = obj["Contatore"];
							if(countPersonLinkData > 0){
								document.getElementById("countPersonLinkData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countPersonLinkData +" <b>Già fatti</b>: "+  (countPersonLinkData - obj["Contatore"]) +"</li>";
								$("#countPersonLinkData").show();  
							}else{
								$("#countPersonLinkData").hide();  
							}
						}
						if(obj["Tipo"] == "team"){
							countTeam = obj["Contatore"];
							if(countTeam > 0){
								document.getElementById("countTeam").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countTeam +" <b>Già fatti</b>: "+  (countTeam - obj["Contatore"]) +"</li>";
								$("#countTeam").show();  
							}else{
								$("#countTeam").hide();  
							}
						}
				    }
				}
				countCompleteRM = true;
			},
		  	error: function (XMLHttpRequest, textStatus, errorThrown) {
		  	
			}
		});

		var intervalID4 = setInterval(function(){ 
			if(countCompleteRM == true && countCompleteAP == true ){
				window.clearInterval(intervalID4);
				//Elimino tutti i collegamenti in ap
				var url='/ap/organizationUnitAP/confirmDelete.htm';
				url+='?rnd='+Math.random(9999);
				url+='&organizationUnitId='+organizationUnitId;
				$.ajax({
					url:url,
					headers: {confirm:"true",idNewOrgUnit:idNewOrgUnit.value,reassociation:reassociation},
					type: "GET",
					success: function (data, textStatus, request) {
						var result = {result:1, message:request.getResponseHeader('Success-Message')};
						resultList[0] = result;
					},
				  	error: function (XMLHttpRequest, textStatus, errorThrown) {
				  		var result = {result:2, message:XMLHttpRequest.getResponseHeader('Error-Message')};
				  		resultList[0] = result;
					}
				});
			}else{
				if(errorMessage != null){
					window.clearInterval(intervalID4);
					window.clearInterval(intervalID2);
					window.clearInterval(intervalID3);
					$("#cancel").hide();
					$("#OperationCanceled").show();
					document.getElementById("result").innerHTML = errorMessage;
					var timeout3 = setTimeout(function(){
						window.location.reload();
					}, 10000);
				}
			}
		}, 1000);
		var intervalID2 = setInterval(function(){ 
			if(resultList[0].result != 0){
				window.clearInterval(intervalID2);
				if(resultList[0].result==1){
				//Elimino tutti i collegamenti in rm
				var url='/rm/organizationUnit/confirmDelete.htm';
				url+='?rnd='+Math.random(9999);
				url+='&organizationUnitId='+organizationUnitId;
				$.ajax({
					url:url,
					headers: {confirm:"true",idNewOrgUnit:idNewOrgUnit.value,reassociation:reassociation},
					type: "GET",
					success: function (data, textStatus, request) {
						var result = {result:1,  message:request.getResponseHeader('Success-Message')};
						resultList[1] = result;
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						if(XMLHttpRequest.getResponseHeader('Error-Message') == null){
				  			var result = {result:2,  message:"Non è stato possibile comunicare con il server"};
				  			resultList[1] = result;
				  		}else{
				  			var result = {result:2, message:XMLHttpRequest.getResponseHeader('Error-Message')};
				  			resultList[1] = result;
				  		}
					}
				});
				}else{
					var result = {result:2, message:"Operazione annullata, perché c'è stato un problema in AP"};
					resultList[1] = result;
				}
			}
		}, 1500);
	
		var intervalID3 = setInterval(function(){ 
			if(resultList[0].result != 0 && resultList[1].result != 0){
				stop = true;
				window.clearInterval(intervalID3);
				if(resultList[0].result == 1 && resultList[1].result == 1){
					window.location.reload();
				}else{
					$("#cancel").hide();
					$("#listCount").hide();
					$("#OperationCanceled").show();
					document.getElementById("result").innerHTML = "A causa di un problema non è stato possibile eliminare l'Unità organizzativa " +organizationUnitId +", riprova o contatta l'assistenza.<br>Questi sono i messaggi:<br>(AP) "+ resultList[0].message+"<br>(RM) "+ resultList[1].message;
					var timeout2 = setTimeout(function(){
						window.location.reload();
					}, 10000);
				}
			}else{
				var urlAP='/ap/organizationUnitAP/count.htm';
				urlAP+='?rnd='+Math.random(9999);
				urlAP+='&organizationUnitId='+organizationUnitId;
				$.ajax({
					url:urlAP,
					headers: {},
					type: "GET",
					success: function (data, textStatus, request) {
						var list = null;
						list = JSON.parse(request.getResponseHeader('json'));
						if(list != null){
						for (var i = 0; i < list.length; i++){
						    var obj = list[i];
						        if(obj["Tipo"] == "wfItemData"){
						        	document.getElementById("countWfItemData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfItemData +" <b>Già fatti</b>: "+  (countWfItemData - obj["Contatore"]) +"</li>";
								}
						        if(obj["Tipo"] == "wfItemElement"){
						        	document.getElementById("countWfElementData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfElementData +" <b>Già fatti</b>: "+  (countWfElementData - obj["Contatore"]) +"</li>";
								}
						        if(obj["Tipo"] == "wfItemLinkData"){
						        	document.getElementById("countWfItemLinkData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfItemLinkData +" <b>Già fatti</b>: "+  (countWfItemLinkData - obj["Contatore"]) +"</li>";
								}
						        if(obj["Tipo"] == "wfTask"){
						        	document.getElementById("countWfTask").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countWfTask +" <b>Già fatti</b>: "+  (countWfTask - obj["Contatore"]) +"</li>";
								}
							}
						}
					},
				  	error: function (XMLHttpRequest, textStatus, errorThrown) {
				
					}
				});

				var urlRM='/rm/organizationUnit/count.htm';
				urlRM+='?rnd='+Math.random(9999);
				urlRM+='&organizationUnitId='+organizationUnitId;
				$.ajax({
					url:urlRM,
					headers: {},
					type: "GET",
					success: function (data, textStatus, request) {
						var list = null;
						list = JSON.parse(request.getResponseHeader('json'));
						if(list != null){
						for (var i = 0; i < list.length; i++){
						    var obj = list[i];
						        if(obj["Tipo"] == "position"){
						        	document.getElementById("countPosition").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countPosition +" <b>Già fatti</b>: "+  (countPosition - obj["Contatore"]) +"</li>";
								}
								if(obj["Tipo"] == "rmItemElementData"){	
									document.getElementById("countRmItemElementData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countRmItemElementData +" <b>Già fatti</b>: "+  (countRmItemElementData - obj["Contatore"]) +"</li>";	
								}
								if(obj["Tipo"] == "rmItemData"){
									document.getElementById("countRmItemData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countRmItemData +" <b>Già fatti</b>: "+   (countRmItemData- obj["Contatore"]) +"</li>";
								}
								if(obj["Tipo"] == "personElementData"){
									document.getElementById("countPersonElementData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countPersonElementData +" <b>Già fatti</b>: "+  (countPersonElementData - obj["Contatore"]) +"</li>";	
								}
								if(obj["Tipo"] == "personLinkData"){
									document.getElementById("countPersonLinkData").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countPersonLinkData +" <b>Già fatti</b>: "+  (countPersonLinkData - obj["Contatore"]) +"</li>";
								}
								if(obj["Tipo"] == "team"){
									document.getElementById("countTeam").innerHTML = "<li><b>Oggetto:</b> "+ obj["Tipo"] + " <b><br>Totali da elaborare</b>: "+ countTeam +" <b>Già fatti</b>: "+  (countTeam - obj["Contatore"]) +"</li>";
								}
							}
						$("#listCount").show();
						}
					},
				  	error: function (XMLHttpRequest, textStatus, errorThrown) {
				
					}
				});
			}
		}, 4000);
	} else {
		 window.location.reload();
	}
}

function deleteWithReAssociation(organizationUnitId){
	$("#info1").hide();
	$("#info2").hide();
	$("#message").show();
	$("#result").hide();
	$("#listCount").hide();
	document.getElementById("message").innerHTML = "Inserisci l'ID dell'Unità organizzativa alla quale vuoi associare tutti gli oggetti della precedente Unità oragnizzativa";
	$("#labelNewOrgUnit").show();
	$("#confirmdeleteWithReAssociation").show();
	$("#confirmDeleteWithRelease").hide();
	$("#deleteWithReAssociation").hide();
	$("#cancel").show();
}
