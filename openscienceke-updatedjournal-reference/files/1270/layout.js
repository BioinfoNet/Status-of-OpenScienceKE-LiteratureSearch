JQ().ready(function(){ 
	defaultJsInitialize();
	JQ.ajaxSetup({
		complete: function(jqXHR, textStatus){
			defaultJsInitialize();
		  }
		});
}); 

function defaultJsInitialize() {
    
}

function jqueryToBootstrapTabInitializer(tabId, activeTabId){
  $(tabId ).tabs({
             create: function( event, ui ) {
                 $( "div.ui-tabs" ).toggleClass( "ui-tabs ui-widget ui-widget-content ui-corner-all tabbable" );
                 $( "ul.ui-tabs-nav>li.ui-tabs-active" ).toggleClass( "ui-tabs-active ui-state-active active" );
                 $( "ul.ui-tabs-nav>li" ).toggleClass( "ui-state-default ui-corner-top" );
                 $( "ul.ui-tabs-nav" ).toggleClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all nav nav-tabs" );
             },
             activate: function( event, ui ) {
                 $( "li.ui-tabs-active" ).toggleClass( "ui-tabs-active ui-state-active active" );
             },
              beforeActivate: function( event, ui ) {
                 $( "ul > li.active" ).toggleClass( "active" );
              },active: activeTabId
     });
 }

function startWait() {
	$('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner2 spin"></i></div>');
	$('.overlay').fadeIn(150);
}
function endWait() {
	$('.overlay').fadeOut(150, function() {
		$(this).remove();
	});
}

(function($){

    $.fn.displayTagAjax = function() {
        var links = new Array();
        var container = this;
        addItemsToArray(this.find("table .sorting a"),links);
        addItemsToArray(this.find(".dataTables_paginate > a"),links);
        addItemsToArray(this.find(".dataTables_paginate > span a"),links);
        $.each(links,function()
            {
                    var url = $(this).attr("href");
                    addClickEvent(container, this,url);
                    $(this).removeAttr("href");
            }
        );
        return true;
    };

  function addClickEvent(ctx, element,url){
        $(element).click(
            function(){
                jQuery.ajax(
                {
                    url: url,
                    success: function(data){
                       filteredResponse =  $(data).find(this.selector);
                       if(filteredResponse.size() == 1){
                            $(this).html(filteredResponse);
                       }else{
                            $(this).html(data);
                       }
                       $(this).displayTagAjax();
                    },
                    data: ({"time":new Date().getTime()}),
                    context: ctx,
                    beforeSend: function(jqXHR, settings){
                    	startWait();
                    },
                    complete: function(jqXHR,textStatus) {
                    	endWait();
                    	defaultJsInitialize();
                    }
                });
            }
        );
    }

   function addItemsToArray(items,array){
        $.each(items,function()
            {
                    array.push(this);
            }
        );        
    }
    
})(jQuery);



