
function TreeView(pInputId, pDisplayInputId, pRestEndpoint, pParameterMap, pCloseOnSelect, pOnLeafSelectedImplementation) {
	var inputId = pInputId;
	var displayInputId = pDisplayInputId;		
	var restEndpoint = pRestEndpoint;
	var parameterMap = pParameterMap;	
	var closeOnSelect = pCloseOnSelect;	
	var superObj=this;
	var onLeafSelectedImplementation=pOnLeafSelectedImplementation;
	
	if (!onLeafSelectedImplementation){		
		onLeafSelectedImplementation= function(event){
			var node=JQ(event.target);
			JQ("#"+superObj.getInputId()).val(node.attr("data-nodeId"));
			JQ("#"+superObj.getDisplayInputId()).val(node.text());
		};
	} 
	
	
	this.getInputId = function(){
		return inputId;
	};
	
	this.getDisplayInputId = function(){
		return displayInputId;
	};
	
	this.getRestEndpoint = function(){
		return restEndpoint;
	};
	
	this.getParameterMap = function(){
		return parameterMap;
	};	
	
	this.getCloseOnSelect = function(){
		return closeOnSelect;
	};	
	
	this.showModal = function(){		
		JQ("#"+superObj.getInputId()+"TreeviewRoot").css("display", "none");
		JQ("#"+superObj.getInputId()+"TreeviewModal").modal({backdrop: 'static'});
		superObj.invokeRest();
	};

	this.invokeRest= function (parentId){
		var defaultParameterMap=superObj.getParameterMap();
		var parameterMap= {};
		for(var propertyName in defaultParameterMap) {
			parameterMap[propertyName] = defaultParameterMap[propertyName];
		}				
		if (!parentId){
			parameterMap.rootOnly=1;
			JQ("#"+superObj.getInputId()+"Treeview span i.fa-spinner:first").toggleClass('hide').toggleClass('show');
			JQ("#"+superObj.getInputId()+"TreeviewSpinner").show();
		}
		else 
			parameterMap.parentId=parentId;
		
		parameterMap.posting=1;
		
		JQ.ajax({
			url: superObj.getRestEndpoint(),
			dataType: "json",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			data: parameterMap,
			success: function(data) {
				var nodeIdentifier=null;						
				if (parentId){					
					nodeIdentifier=superObj.getInputId()+parentId;
				} else {
					JQ("#"+superObj.getInputId()+"TreeviewSpinner").hide();												
					nodeIdentifier=superObj.getInputId()+"TreeviewRoot";
				}
				superObj.render(data, nodeIdentifier);
			}
		});
	};
	
	this.render= function (data, parentNodeId){				
		var currentNode=JQ("#"+parentNodeId);				
		currentNode.empty();
		JQ(data).each(function( index, element ) {
			var a=JQ("<a>");			
			JQ(currentNode).append(a);
			if (element.childrenCount>0){
				var i=JQ("<i>");
				i.addClass("fa fa-chevron-right");
				a.append(i)
				
				var spinner=JQ("<i>");
				spinner.addClass("fa fa-spinner fa-spin hide");
				a.append(spinner);			
				
				a.attr("href", "#"+superObj.getInputId()+element.id);
				a.on("click", superObj.toggle);
				var div=JQ("<div>");				
				div.addClass("list-group");
				div.attr("style", "display:none;");
				div.attr("id", superObj.getInputId()+element.id);
				JQ(currentNode).append(div)
			} else {
				a.on("click", superObj.onLeafSelected);
			}
			a.append(element.text)
			a.addClass("list-group-item");
			a.attr("data-nodeId", element.id);			
		});
		
		var selector="#"+superObj.getInputId()+"TreeviewRoot a[href='#"+parentNodeId+"']";
		var prevNode=JQ(selector);
		if (prevNode){
			JQ("i.fa-spinner", prevNode).toggleClass('hide').toggleClass('show');			
			
			if(currentNode.css('display')=="none"){
				currentNode.slideDown();
				JQ("i.fa-chevron-right", prevNode).toggleClass('fa-chevron-right').toggleClass('fa-chevron-down');
			}
			else {
				currentNode.slideUp();
				JQ("i.fa-chevron-down", prevNode).toggleClass('fa-chevron-right').toggleClass('fa-chevron-down');
			}
		}
	};
	
	this.toggle= function(event){
		//node is the widget got clicked (usually <a>)
		var node=JQ(event.target);
		// if the element clicked is <i> (containing the bootstrap markup to render the ">")
		// get the parent element that should be <a> on which there must be defined the attribute data-nodeId
		if (!node.attr("data-nodeId"))
			node=node.parent();
		JQ("i.fa-spinner", node).toggleClass('hide').toggleClass('show');
		superObj.invokeRest(node.attr("data-nodeId"));
		return false;
	};
	
	this.onLeafSelected = function(event){
		onLeafSelectedImplementation(event);
		if(superObj.getCloseOnSelect())
			JQ("#"+superObj.getInputId()+"TreeviewModal").modal('hide');
	};
	
}


