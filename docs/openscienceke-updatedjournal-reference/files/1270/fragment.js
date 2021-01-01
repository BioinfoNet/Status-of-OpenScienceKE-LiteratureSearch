/**
* fragmentUtil cilea v. 2.1// 2011.04.22 // jQuery 1.5.1+
*/


var isFragmentEditActive=false;
var currentFragmentEditNestingLevel=0;

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

function getNestingLevelForFragmentDivId(fragmentDivId){	
	var paramArray=getFragmentCurrentParamArray(fragmentDivId);	
	var nestingLevel=0;
	for (var i=0;i<paramArray.length;i++){
		var keyString=""+paramArray[i];
		if (keyString.startsWith("nestingLevel")){
			var nestingLevelString=paramArray[i].split("=")[1];
			if (nestingLevelString!="")
				nestingLevel=parseInt(nestingLevelString);
			break;
		}
	}
	return nestingLevel;
}

function getEditToken(fragmentDivId){
	var nestingLevel=getNestingLevelForFragmentDivId(fragmentDivId);
	var isEditTokenAvailable=true;
	
	if (nestingLevel<currentFragmentEditNestingLevel){		
		isEditTokenAvailable=false;
	} else if (nestingLevel==currentFragmentEditNestingLevel){
		if(isFragmentEditActive)
			isEditTokenAvailable=false;
		else{			
			isFragmentEditActive=true;
			currentFragmentEditNestingLevel=nestingLevel;
			isEditTokenAvailable=true;
		}
	} else if (nestingLevel>currentFragmentEditNestingLevel){
		currentFragmentEditNestingLevel=nestingLevel;
		isEditTokenAvailable=true;
	}
	
	if (!isEditTokenAvailable){
		var message="L'operazione precedente &egrave; <strong>ancora in corso</strong> o l'operazione corrente non &egrave; consentita. <br/>Chiudere questa finestra e attenderne l'ultimazione.<br/>Nel caso in cui l'operazione non dovesse terminare in breve tempo, ricaricare la pagina.";
		JQ("#genericFragmentErrorModalContent").html(message);
		JQ("#genericFragmentErrorModal").modal({backdrop: 'static'});
	}
	
	return isEditTokenAvailable;
}

function releaseEditToken(fragmentDivId){
	var nestingLevel=getNestingLevelForFragmentDivId(fragmentDivId);	

	if (nestingLevel==0){
		isFragmentEditActive=false;
	} else if (nestingLevel>=1){
		nestingLevel--;
		currentFragmentEditNestingLevel=nestingLevel;
	}	
}



function fragmentElementList(fragmentDivId){
	var url=globalFragmentListUrl;
	var pars=serializeArray(getFragmentCurrentParamArray(fragmentDivId));		
	pars+=getAmpersand(pars)+"rand="+Math.random(10000000);
	showFragmentWait(fragmentDivId);
	/*recupero l'array dei parametri*/
	var paramArray=getFragmentCurrentParamArray(fragmentDivId);
	/*
	 *scorro l'array e se trovo la stringa firstAccess=1
	 *allora devo cancellare il valore associato in quanto
	 *questo param viene usato per pulire la sessione SOLO 
	 *in fase di primo accesso.
	 *Lo stesso script infatti viene lanciato in seguito ad 
	 *un inserimento ajax di un nuovo item 
	 */
	for (i=0;i<paramArray.length;i++){
		if (paramArray[i]=="firstAccess=1"){
			paramArray[i]="firstAccess=0";
		}
	}	
	JQ.ajax({
		url: url+'?'+pars,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "POST",
		success: function(data, textStatus, jqXHR) {
			showFragmentElementList(data,jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			showFragmentError(jqXHR);
		}
	});
}

function fragmentElementForm(fragmentDivId,elementoId,uniqueIdentifier){
	if (!getEditToken(fragmentDivId))
		return;
	var url=globalFragmentFormUrl;	
	var pars=serializeArray(getFragmentCurrentParamArray(fragmentDivId));	
	pars+=getAmpersand(pars)+"uniqueIdentifier="+uniqueIdentifier;
	pars+=getAmpersand(pars)+"currentFragmentElementId="+elementoId;
	pars+=getAmpersand(pars)+"rand="+Math.random(10000000);	
	showFragmentWait(fragmentDivId);
	JQ.ajax({
		url: url+'?'+pars,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "GET",
		success: function(data, textStatus, jqXHR) {
			showFragmentElementForm(data,jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			showFragmentError(jqXHR);
		}
	});
}

function fragmentElementDetail(fragmentDivId,elementoId,uniqueIdentifier){	
	var url=globalFragmentDetailUrl;		
	var pars=serializeArray(getFragmentCurrentParamArray(fragmentDivId));	
	pars+=getAmpersand(pars)+"uniqueIdentifier="+uniqueIdentifier;
	pars+=getAmpersand(pars)+"currentFragmentElementId="+elementoId;
	pars+=getAmpersand(pars)+"rand="+Math.random(10000000);	
	showFragmentWait(fragmentDivId);
	JQ.ajax({
		url: url+'?'+pars,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "GET",
		success: function(data, textStatus, jqXHR) {
			showFragmentElementForm(data,jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			showFragmentError(jqXHR);
		}
	});
}


var isFragmentMoving=false;
function fragmentElementMove(fragmentDivId,elementoId,uniqueIdentifier,direction,priorityProperty, object){		
	if (isFragmentMoving){		
		return;
	}
	var previousRow=JQ(object).parent().parent().prev();
	var nextRow=JQ(object).parent().parent().next();
	
	var thisElementId=object.data("id");
	var previousElementId=previousRow.find("i.fa-arrow-up").data("id")
	var nextElementId=nextRow.find(".fa-arrow-up").data( "id");
	
	var thisElementPriority=object.data("priority");
	var previousElementPriority=previousRow.find(".fa-arrow-up").data( "priority");
	var nextElementPriority=nextRow.find(".fa-arrow-up").data( "priority");
	
	if (direction=="up"){
		if (!previousElementId || !previousElementPriority|| !thisElementId || !thisElementPriority)
			return;		
		var serializedObject1 = {};
		serializedObject1["currentFragmentElementId"]=thisElementId;
		serializedObject1[priorityProperty]=previousElementPriority;
		serializedObject1["it.cilea.core.fragment.moveAction"]=1;		
		isFragmentMoving=true;
		fragmentElementPost(fragmentDivId, 'save', JQ.param(serializedObject1, true), function(){
			var serializedObject2 = {};
			serializedObject2["currentFragmentElementId"]=previousElementId;
			serializedObject2[priorityProperty]=thisElementPriority
			serializedObject2["it.cilea.core.fragment.moveAction"]=1;
			fragmentElementPost(fragmentDivId, 'save', JQ.param(serializedObject2, true), function(data,jqXHR){
				showFragmentElementPost(data,jqXHR,null,'undo');
				isFragmentMoving=false;
			});			
		});		
		
	} else if (direction=="down"){
		if (!nextElementId || !nextElementPriority|| !thisElementId || !thisElementPriority)
			return;
		var serializedObject1 = {};
		serializedObject1["currentFragmentElementId"]=thisElementId;
		serializedObject1[priorityProperty]=nextElementPriority
		serializedObject1["it.cilea.core.fragment.moveAction"]=1;
		isFragmentMoving=true;
		fragmentElementPost(fragmentDivId, 'save', JQ.param(serializedObject1, true), function(){
			var serializedObject2 = {};
			serializedObject2["currentFragmentElementId"]=nextElementId;
			serializedObject2[priorityProperty]=thisElementPriority
			serializedObject2["it.cilea.core.fragment.moveAction"]=1;
			fragmentElementPost(fragmentDivId, 'save', JQ.param(serializedObject2, true), function(data,jqXHR){
				showFragmentElementPost(data,jqXHR,null,'undo');
				isFragmentMoving=false;
			});
		});		
	}
}


function fragmentElementMoveInitPriority(fragmentDivId, priority){	
	var newFragmentPriorityFound=false;
	var paramArray=getFragmentCurrentParamArray(fragmentDivId);
	for (i=0;i<paramArray.length;i++){
		if ((""+paramArray[i]).startsWith("newFragmentPriority=")){
			paramArray[i]="newFragmentPriority="+(priority+1);
			newFragmentPriorityFound=true;
		}
	}	
	if (!newFragmentPriorityFound)
		paramArray[paramArray.length]="newFragmentPriority="+(priority+1);	
}

function showRememberToSaveMessage(message) {
	var successfulSaveMessage;
	if (message)
		successfulSaveMessage=message;
	else 
		successfulSaveMessage=JQ('#rememberToSaveText').html();
	if (successfulSaveMessage)
		JQ.jGrowl(successfulSaveMessage, { theme: 'growl-warning', life: 10000, position: 'top-right'
			/*, beforeOpen: function(e,m,o){
				$(e).width( "550px" );
			}*/
		});
}

function fragmentElementDelete(fragmentDivId, confirmMessage ,elementoId, uniqueIdentifier){
	if (confirm(confirmMessage)){
		var url=globalFragmentDeleteUrl;		
		var pars=serializeArray(getFragmentCurrentParamArray(fragmentDivId));		
		pars+=getAmpersand(pars)+"currentFragmentElementId="+elementoId;
		pars+=getAmpersand(pars)+"rand="+Math.random(10000000);
		pars+=getAmpersand(pars)+"_form=1";
		showFragmentWait(fragmentDivId);
		JQ.ajax({
			url: url+'?'+pars,
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			type: "GET",
			success: function(data, textStatus, jqXHR) {		
				var error=getHTTPHeaderValue(jqXHR,"FragmentErrorDetail");
				var fragmentForceListReload=getHTTPHeaderValue(jqXHR,"FragmentForceListReload");
				var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
				if (error){					
					JQ("#genericFragmentErrorModalContent").html(error)
					JQ("#genericFragmentErrorModal").modal({backdrop: 'static'});
				} else {					
					var paramArray=getFragmentCurrentParamArray(fragmentDivId);
					var successfulSaveMessage=null;
					for (i=0;i<paramArray.length;i++){
						if ((""+paramArray[i]).startsWith("successfulSaveMessage=")){
							var successfulSaveMessageParam=(""+paramArray[i]).split("=");
							if (successfulSaveMessageParam.length==2){
								successfulSaveMessage=successfulSaveMessageParam[1];
							}
						}
					}				
					showRememberToSaveMessage(successfulSaveMessage);
				}
				
				if (!fragmentForceListReload){
					showFragmentElementList(data,jqXHR);
				} else {
					fragmentElementList(fragmentDivId);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				showFragmentError(jqXHR);
			}
		});
	}		
}

function isAdditionAllowed(fragmentDivId){
	var addButton=JQ('#'+fragmentDivId+"AddButton");
	if(addButton.length){
		var addButtonEnabled=JQ('#'+fragmentDivId+"AddButton").data("enable");	
		if (!addButtonEnabled){
			JQ("#genericFragmentErrorModalContent").html("Raggiunto il numero massimo di elementi")
			JQ("#genericFragmentErrorModal").modal({backdrop: 'static'});
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}


function fragmentElementAdd(fragmentDivId, linkedItemId, linkedItemStringValue, jumpToListDirectly){
	if (!isAdditionAllowed(fragmentDivId))
		return;	
	
	if (!getEditToken(fragmentDivId))
		return;
	
	
	var pars="";
	var paramArray=getFragmentCurrentParamArray(fragmentDivId);
	/*recupero il paramentro fragmentElementInsert e lo setto a 1*/
	/*for (i=0;i<paramArray.length;i++){
		if (paramArray[i]=="fragmentElementInsert=0"){
			paramArray[i]="fragmentElementInsert=1";
		}
	}*/	
	var url=globalFragmentFormUrl;
	var pars=serializeArray(paramArray);
	
	/*
	
	if (linkedItemId!=null && linkedItemId!=""){
				
		
		var tempLinkedItemId;
		if(linkedItemId.indexOf(".")!=-1)
			tempLinkedItemId=linkedItemId.substring(0, linkedItemId.indexOf("."));
		else
			tempLinkedItemId=linkedItemId;
		linkedItemId.substring(0, linkedItemId.indexOf("."))
		pars+=getAmpersand(pars)+"linkedItemId="+tempLinkedItemId;
	} else if (linkedItemStringValue!=null && linkedItemStringValue!=""){
		pars+=getAmpersand(pars)+"linkedItemStringValue="+linkedItemStringValue;
	}
	if (jumpToListDirectly!=null && jumpToListDirectly!="" && (jumpToListDirectly=="true"||jumpToListDirectly=="1"))
		pars+=getAmpersand(pars)+"jumpToListDirectly=true";
	
	if (!linkedItemId && !linkedItemStringValue && jumpToListDirectly){
		var parsFromForm=serializeFormInputInDiv(fragmentDivId+"EditContainer");
		parsFromForm=parsFromForm.replace(/uniqueIdentifier/g, "mockUniqueIdentifier");		
		pars+=getAmpersand(pars)+parsFromForm;
	}
	*/
	
	pars+=getAmpersand(pars)+"rand="+Math.random(10000000);
	showFragmentWait(fragmentDivId);		
	JQ.ajax({
		url: url+'?'+pars,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "GET",
		success: function(data, textStatus, jqXHR) {
			showFragmentElementAdd(data,jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			showFragmentError(jqXHR);
		}
	});
}
//ripristinato per IRIS-10210. Da rimuovere utilizzando fragmentPost
function fragmentElementAddSetDefaults(fragmentDivId,defaultParams){
	if (!isAdditionAllowed(fragmentDivId))
		return;	
	var pars="";
	var paramArray=getFragmentCurrentParamArray(fragmentDivId);
	/*recupero il paramentro fragmentElementInsert e lo setto a 1*/
	/*for (i=0;i<paramArray.length;i++){
		if (paramArray[i]=="fragmentElementInsert=0"){
			paramArray[i]="fragmentElementInsert=1";
		}
	}*/	
	var url=globalFragmentFormUrl;
	var pars=serializeArray(paramArray);	
	pars+=getAmpersand(pars)+defaultParams;
	pars+=getAmpersand(pars)+"rand="+Math.random(10000000);
	showFragmentWait(fragmentDivId);		
	JQ.ajax({
		url: url+'?'+pars,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "GET",
		success: function(data, textStatus, jqXHR) {
			showFragmentElementAdd(data,jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			showFragmentError(jqXHR);
		}
	});
}


function fragmentElementPost(fragmentDivId, buttonLabel, alternativeSerializedParameters, successHandler, showRememberToSave){	
	var paramArray=getFragmentCurrentParamArray(fragmentDivId);
	var pars=serializeArray(paramArray);
	/* ALERT: DONT USE FIELDSET IN A FRAGMENT FORM */
	if (!alternativeSerializedParameters){
		var parsFromForm=serializeFormInputInDiv(fragmentDivId+"EditContainer");
		if (parsFromForm!="")
			pars+=getAmpersand(pars)+ parsFromForm;
		JQ('#'+fragmentDivId+'EditContainer').modal('hide');
		JQ('#'+fragmentDivId+'EditContainer').html('');
	} else {		
		pars+=getAmpersand(pars)+ alternativeSerializedParameters;
		pars+=getAmpersand(pars)+ "jumpToListDirectly=true";
	}
	var url=globalFragmentFormUrl;	
	pars+=getAmpersand(pars)+"posting="+buttonLabel;	
	showFragmentWait(fragmentDivId);	
	JQ.ajax({
		url: url,
		data: pars,		
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		type: "POST",
		success: function(data, textStatus, jqXHR) {
			if (successHandler===undefined||successHandler==null){
				showFragmentElementPost(data,jqXHR,showRememberToSave,buttonLabel);
			} else {
				successHandler(data,jqXHR);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			showFragmentError(jqXHR);
		}
	});
	/* checking for AdvancedSearchViewModal used before and that could make not work properly the next ones*/
	JQ("body").children("[id$='AdvancedSearchViewModal']").remove();
}

function showFragmentElementPost(data,jqXHR,showRememberToSave,buttonLabel){	
	if (getHTTPHeaderValue(jqXHR,"FragmentError")=="1"){
		if (getHTTPHeaderValue(jqXHR,"FragmentErrorDetail")){
			JQ("#genericFragmentErrorModalContent").html(getHTTPHeaderValue(jqXHR,"FragmentErrorDetail"))
			JQ("#genericFragmentErrorModal").modal({backdrop: 'static'});
			var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
			fragmentElementList(fragmentDivId);
		} else{
			showFragmentElementForm(data,jqXHR);
		}
	} else {
		var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
		var successfulSaveMessage=null;
		var paramArray=getFragmentCurrentParamArray(fragmentDivId);
		for (i=0;i<paramArray.length;i++){
			/*if (paramArray[i]=="fragmentElementInsert=1"){
				paramArray[i]="fragmentElementInsert=0";
			} else 
			*/if ((""+paramArray[i]).startsWith("successfulSaveMessage=")){
				var successfulSaveMessageParam=(""+paramArray[i]).split("=");
				if (successfulSaveMessageParam.length==2){
					successfulSaveMessage=successfulSaveMessageParam[1];
				}
			}
		}
		hideFragmentElementForm(data,jqXHR);
		
		if((showRememberToSave===undefined || showRememberToSave==null || showRememberToSave==true) && (buttonLabel=='save'))
			showRememberToSaveMessage(successfulSaveMessage);
		
		releaseEditToken(fragmentDivId);		
		
		//showFragmentElementList(data,jqXHR);
		fragmentElementList(fragmentDivId);
	}	
}


function showFragmentElementList(data,jqXHR) {	
	var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
	hideFragmentWait(fragmentDivId);
	//pippo
	var error=getHTTPHeaderValue(jqXHR,"FragmentErrorDetail");
	if (error){		
		var message="Durante la sua richiesta si &egrave; verificato un errore.<br/><strong>Ricaricare la pagina</strong> e riprovare.<br/>Nel caso in cui l'errore si ripresenti la preghiamo di annotare il numero del ticket e contattare l'help desk.<br/>";			
		JQ("#genericFragmentErrorModalContent").html(message+error);
		JQ("#genericFragmentErrorModal").modal({backdrop: 'static'});
		return;
	}
	
	JQ('#'+fragmentDivId+"ListContainer").html(data);
	defaultJsInitialize();
	eval(fragmentDivId+"AfterSuccessfulLisLoadertHandler(fragmentDivId)");
	
	var showAddButton=getHTTPHeaderValue(jqXHR,"showAddButton");
	var addButton=JQ('#'+fragmentDivId+"AddButton");
	
	if (addButton){
		if (showAddButton)
			addButton.data("enable", true);
		else 
			addButton.data("enable", false);
	}	
}

function showFragmentElementAdd(data,jqXHR){	
	var jumpToListDirectly=getHTTPHeaderValue(jqXHR,"jumpToListDirectly");
	if (jumpToListDirectly!=null && jumpToListDirectly!="" && (jumpToListDirectly=="true"||jumpToListDirectly=="1")){
		var error=getHTTPHeaderValue(jqXHR,"FragmentErrorDetail");
		if (!error){
			showRememberToSaveMessage();
		}
		
		showFragmentElementList(data,jqXHR);
	} else {
		showFragmentElementForm(data,jqXHR);
	}	
}

function showFragmentElementForm(data,jqXHR) {
	var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
	var framedWindowHeight=parseInt(getHTTPHeaderValue(jqXHR,"framedWindowHeight"));
	var framedWindowWidth=parseInt(getHTTPHeaderValue(jqXHR,"framedWindowWidth"));
	
	if (isNaN(framedWindowHeight))
		framedWindowHeight=500;
	if (isNaN(framedWindowWidth))
		framedWindowWidth=500;	
	
	hideFragmentWait(fragmentDivId);	
	var $modal = jQuery(data);	
	jQuery('body').append($modal);	
	$modal.attr('id',fragmentDivId+"EditContainer");
	$modal.filter('.modal').modal({backdrop: 'static', keyboard: false});
    $modal.filter('.modal').on('hidden.bs.modal', function(){
    	$modal.remove();
	});
    
    $modal.filter('.modal').on('shown.bs.modal', function(){    	
    	$modal.find('.modal-dialog').css({
            width:framedWindowWidth+"px", 
            height:framedWindowHeight+"px"
    	});
	});
    
	defaultJsInitialize();
}

function hideFragmentElementForm(data,jqXHR) {	
	//var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
	//JQ('#'+fragmentDivId+"EditContainer").html("");
}

function showFragmentError(jqXHR) {
	var fragmentDivId=getHTTPHeaderValue(jqXHR,"fragmentDivId");
	hideFragmentWait(fragmentDivId);
	releaseEditToken(fragmentDivId);
	//alert ("Errore");
}

function getFragmentCurrentParamArray(fragmentDivId){	
	return eval("fragmentParametersArray"+fragmentDivId);
}

function showFragmentWait(fragmentDivId) {	
	JQ('#'+fragmentDivId+"AjaxWait").attr('style','display: block;');
}

function hideFragmentWait(fragmentDivId) {	
	JQ('#'+fragmentDivId+"AjaxWait").attr('style','display: none;');
	
}

//funzioni usate per la gestione degli allegati
function deleteAttachment(url, currentFragmentElementId, fragmentDivId, iframeId, iframeFormId, iframeShowDivId, iframeUploadDivId,  modelAttributeNameForFileName, modelAttributeNameForFileBlob){
		
	if (confirm("Eliminare allegato?")){
		var iframe=document.getElementById(iframeId);		
		var fileInfo=modelAttributeNameForFileName+"|"+modelAttributeNameForFileBlob+"||";
		var pars=serializeArray(eval("fragmentParametersArray"+fragmentDivId));		
		pars+="&currentFragmentElementId="+currentFragmentElementId;
		pars+="&fileInfo="+fileInfo;
		
		var iframeForm=iframe.contentWindow.document.getElementById(iframeFormId);
		var iframeShowDivId=iframe.contentWindow.document.getElementById(iframeShowDivId);		
		var iframeUploadDivId=iframe.contentWindow.document.getElementById(iframeUploadDivId);	


		JQ.ajax({
			url: url+'?'+pars,
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			type: "POST",
			success: function(data, textStatus, jqXHR) {
				//recupero il valore del campo fileInfo
				//lo ricostruisco eliminando il file name 
				//in modo tale che se elimino il file, salvo il fragment in sessione 
				//(e quindi non faccio l'effettivo salvataggio su db)
				//e poi vado ancora in edit non veda ancora il file 
				var fileInfoId=iframe.contentWindow.document.getElementById("fileInfoId");		
				var fileInfoValue=fileInfoId.value;
				var splittedfileInfoValue=fileInfoValue.split("|");		
				fileInfoId.value=splittedfileInfoValue[0]+"|"+splittedfileInfoValue[1]+"||"+splittedfileInfoValue[3];		
			
				var input=iframe.contentWindow.document.createElement("input");
				input.setAttribute("type","hidden");
			   	input.setAttribute("name",modelAttributeNameForFileName);
			   	input.setAttribute("value","");   		   	
			   	iframeForm.appendChild(input);
			
			   	//input=iframe.contentWindow.document.createElement("input");
			   	//input.setAttribute("type","hidden");
			   	//input.setAttribute("name","removeFile");
			   	//input.setAttribute("value",modelAttributeNameForFileBlob);   		   	
			   	//iframeForm.appendChild(input);   	
			   	iframeShowDivId.style.display='none';
			   	iframeUploadDivId.style.display='block';
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error in deleting file");
			}
		});	   	
	}
}


function viewAttachment(url, currentFragmentElementId, fragmentDivId, fileInfo){	
	var pars=serializeArray(eval("fragmentParametersArray"+fragmentDivId));
	document.location.href=url+"?currentFragmentElementId="+currentFragmentElementId+"&fileInfo="+fileInfo+"&"+pars;
}

function addHiddenInputFromParamArrayToFormInIframe(fragmentDivId, iframeId, iframeFormId){
	var iframe=document.getElementById(iframeId);
	var pars=eval("fragmentParametersArray"+fragmentDivId);
	var iframeForm=iframe.contentWindow.document.getElementById(iframeFormId);
	var str="";	
	for (i=0;i<pars.length;i++){
		if (pars[i]){			
			var equalSignCount = (pars[i].match(/=/g) || []).length;
			if (equalSignCount==1){				
				var pieces=pars[i].split("=");
				var input=iframe.contentWindow.document.createElement("input");
				input.setAttribute("type","hidden");
			   	input.setAttribute("name",pieces[0]);
			   	
			   	input.setAttribute("value",pieces[1]);
			   	str+=input.name+"="+input.value;	   	
			   	iframeForm.appendChild(input);			   	
			}			
		}		
	}	
	return true;
}

function showChildFragmentDialog(fragmentDivId, fragmentWidth, fragmentHeight) {
	if (fragmentWidth == "" || fragmentWidth == null)
		fragmentWidth = 600;
	if (fragmentHeight == "" || fragmentHeight == null)
		fragmentHeight = 300;
	JQ("#"+fragmentDivId).modal({backdrop: 'static', keyboard: false});
}