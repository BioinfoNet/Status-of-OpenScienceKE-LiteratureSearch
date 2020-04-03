function checkInputLength(id, limite) {
	if (JQ('#'+id).val().length>limite)
		JQ('#'+id).val(JQ('#'+id).val().substr(0,limite));
	JQ('#'+id+'Numchar').html(limite-JQ('#'+id).val().length);
}
function characterCounter(inputId) {
	JQ('#'+inputId+'_counter').html(JQ('#'+inputId).val().replace(/\n/g, "\r\n").length);
}
function characterMaxCounter(inputId, maxlength) {
	if (JQ('#'+inputId).val().length>maxlength)
		JQ('#'+inputId).val(JQ('#'+inputId).val().substr(0,maxlength));
	JQ('#'+inputId+'_maxcounter').html(maxlength-JQ('#'+inputId).val().length);
}

function refreshOptions(parentId,childId,url,emptyOption, selectedValue, i18nEmptyOptionValue) {
	var parentValue = JQ('#'+parentId).val();
	JQ('#'+childId).find('option').remove();
	var matchedOption=false;
	JQ.getJSON(url+parentValue, { }, function(data) {
		JQ(data).each(function() {
			var selectedAttribute="";
			if (this.identifyingValue==selectedValue){
				matchedOption=true;
				selectedAttribute=" selected=\"selected\"";
			}
			JQ("<option value=" + this.identifyingValue + selectedAttribute+ ">" + this.displayValue + "</option>").appendTo(JQ('#'+childId));
		});
		if (emptyOption!=null && emptyOption=="true"){
			var selectedAttribute="";
			if (!matchedOption)
				selectedAttribute=" selected=\"selected\"";
			if (i18nEmptyOptionValue)
				JQ('#'+childId).prepend("<option value='' "+selectedAttribute+">"+i18nEmptyOptionValue+"</option>");
			else 
				JQ('#'+childId).prepend("<option value='' "+selectedAttribute+"></option>");
		}
			
					
	});
}
function refreshSelectAndMoveOptions(parentId,childId,url,emptyOption,parentType) {
	var parentValue = JQ('#'+parentId).val();
	if (parentType=='SelectAndMove') {
		parentValue="";
		JQ('#'+parentId).find('option').each(function() {
			parentValue+=this.value+",";
		});
		if(parentValue.length>=1);
			parentValue = parentValue.substring(0, parentValue.length - 1);
	}
	JQ('#'+childId).find('option').remove();
	JQ('#'+childId+'_toSelect').find('option').remove();
	JQ.getJSON(url+parentValue, { }, function(data) {
		JQ(data).each(function() {
			JQ("<option value=" + this.identifyingValue + ">" + this.displayValue + "</option>").appendTo(JQ('#'+childId+'_toSelect'));
		});
		if (emptyOption!=null && emptyOption!="" && emptyOption=="true")
			JQ('#'+childId+'_toSelect').prepend("<option value='' selected='selected'>Select</option>");
	});
}

function moveSelectOption(select1Id,select2Id) {
	var select1 = document.getElementById(select1Id);
	var select2 = document.getElementById(select2Id);
	var optionSelected=new Array();
	var j=0;
	for (var i = 0; i < select1.options.length; i++) {
		if (select1.options[i].selected) {
			optionSelected[j]=select1.options[i];
			j++;
		}
	}
	for (var i = 0; i < optionSelected.length; i++) {
		select2.appendChild(optionSelected[i]);
	}	
	JQ(select1).trigger('change');
	JQ(select2).trigger('change');
	
}
function moveAllSelectOption(select1Id,select2Id) {
	var select1 = document.getElementById(select1Id);
	var select2 = document.getElementById(select2Id);
	var optionSelected=new Array();
	var j=0;
	for (var i = 0; i < select1.options.length; i++) {
		optionSelected[j]=select1.options[i];
		j++;
	}
	for (var i = 0; i < optionSelected.length; i++) {
		select2.appendChild(optionSelected[i]);
	}	
	JQ(select1).trigger('change');
	JQ(select2).trigger('change');
}

function moveUpOptionOfSelect(selectId){
	JQ('#'+selectId+' option:selected').each(function(){
		JQ(this).insertBefore(JQ(this).prev());
	});
}
function moveDownOptionOfSelect(selectId){
	JQ('#'+selectId+' option:selected').each(function(){
		JQ(this).insertAfter(JQ(this).next());
	});
}

function checkAllSelectMovable(){
	var a = JQ('select[id$="_toSelect"]').each(function(index) {
		var selectId=JQ(this).attr('id').replace('_toSelect','');
		JQ('#'+selectId+' option').prop("selected",true);
	});
	return true;
}

function submitSearchBuilderAjax(formDivId,listDivId,listUrl) {
	checkAllSelectMovable();
	var url=listUrl;
	url+=getAmpersandOnUrl(url)+'rnd='+Math.random(9999);
	url+=getAmpersandOnUrl(url)+JQ('#'+formDivId).serialize();
	JQ.ajax({
		  url: url,
		  beforeSend: function(jqXHR, settings){
            startWait();
		  },
		  success: function(data) {
			JQ('#'+listDivId).html(data);
			JQ('#'+listDivId).displayTagAjax();
          },
          complete: function(jqXHR,textStatus) {
              endWait();
              defaultJsInitialize();
		  }
	});

}

function submitSearchBuilderPrint(formDivId,printUrl) {
	checkAllSelectMovable();
	var url=printUrl;
	url+=getAmpersandOnUrl(url)+'rnd='+Math.random(9999);
	url+=getAmpersandOnUrl(url)+JQ('#'+formDivId).serialize();
	location.href=url;
}
function submitSearchBuilderExport(formDivId,printUrl,mediaType) {
	checkAllSelectMovable();
	var url=printUrl;
	url+=getAmpersandOnUrl(url)+'rnd='+Math.random(9999);
	url+=getAmpersandOnUrl(url)+'_mediaType='+mediaType;
	url+=getAmpersandOnUrl(url)+JQ('#'+formDivId).serialize();
	location.href=url;
}

function submitSearchBuilderExportView(formDivId,printUrl) {
	checkAllSelectMovable();
	var url=printUrl;
	url+=getAmpersandOnUrl(url)+'rnd='+Math.random(9999);
	url+=getAmpersandOnUrl(url)+JQ('#'+formDivId).serialize();
	location.href=url;
}
function submitSearchBuilderNewMediaType(formDivId,mediaType,message) {
	checkAllSelectMovable();
	if (mediaType!=null&&mediaType!=''&&mediaType!='html') {
		var mediaInput=JQ('<input type="hidden" name="_mediaType" value="'+mediaType+'"/>');
		JQ('#'+formDivId).append(mediaInput);
		if (message!=null&&message!='')
			$.jGrowl(message, { sticky: true });
		JQ('#'+formDivId).submit();
		mediaInput.remove();
	} else {
		JQ('#'+formDivId).submit();
	}
}
function showDescriptionDialog(dialogDivId, dialogWidht, dialogHeight) {
	JQ("#"+dialogDivId).dialog( { width: dialogWidht, height: dialogHeight } );
}
function findWidgetDisplayHtml(selector) {
	var html='';
	$(selector).find('.line').each(function(index) {
		var label=JQ(this).find('.line-label').find('.line-label-text').html();
		var value='';
		var $lineContent=JQ(this).find('.line-content')
		if ($lineContent.find('.select2-offscreen').length>0) {
			$lineContent.find('.select2-offscreen').find('option:selected').each(function(index) {
				value+=JQ(this).text()+', ';
			});
			if (value.length>0)
				value = value.substring(0, value.length - 2);
		} else if ($lineContent.find('.form-control .select-right').length>0) {
			$lineContent.find('.form-control .select-right').find('option').each(function(index) {
				value+=JQ(this).text()+', ';
			});
			if (value.length>0)
				value = value.substring(0, value.length - 2);
		} else if ($lineContent.find('select').length>0) {
			$lineContent.find('select').find('option:selected').each(function(index) {
				value+=JQ(this).text()+', ';
			});
			if (value.length>0)
				value = value.substring(0, value.length - 2);
		} else if ($lineContent.find('input').length>0)
			value=$lineContent.find('input').val();
		html+='<p>'+label+': '+(value=='' || value==null ? 'Non definito':value)+'</p>';
	});
	return html;
}
function isJsonArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
function selectMoveFilter(inputId,selectId)  {
	var value=$('#'+inputId).val();
	if (value==null || value=='') {
		$('#'+selectId+ ' option').removeClass('display-none');
	} else {
		$('#'+selectId+ ' option').addClass('display-none');
		$('#'+selectId+ ' option:icontains("'+value+'")').removeClass('display-none');
	}
}
jQuery.expr[':'].icontains = function(a, i, m) {
	  return jQuery(a).text().toUpperCase()
	      .indexOf(m[3].toUpperCase()) >= 0;
	};