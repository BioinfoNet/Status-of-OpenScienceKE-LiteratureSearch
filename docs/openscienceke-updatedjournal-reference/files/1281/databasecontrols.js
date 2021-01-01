// Here we handle interactivity for database search form 

// TODO: get newStyle and originalStyle from the page DOM on load
var newDatabaseSearchFormStyle = 'no-repeat scroll 11px 12px #F5F5F5',
	originalDatabaseSearchFormStyle = 'url("../images/input_searchwithin.png") no-repeat scroll 11px 12px #F5F5F5';
(function($) {
	DG_SRA = {
	    setSelectedSearchResults : function () {
	        $('input[name=exportSearchResults], input[name=printSearchResults]').val (
	            $('.search-result-select-box:checkbox:checked').map( function() { return this.value;}).get().join(',')
	        );
	    },
	    
	    clearSelectedSearchResults : function () {
	        $('input[name=exportSearchResults], input[name=printSearchResults]').val("");
	    },
	
	    initializeSearchResultEvents : function() {
	    		var searchResultCheckBox = $('.search-result-select-box:checkbox'),
	    			allResults = $('#allResults');
	        allResults.change( function () { 
	            searchResultCheckBox.each( function () { $(this).prop('checked', allResults.prop('checked')); } ); 
	            		DG_SRA.setSelectedSearchResults();
	            } );
	
	        searchResultCheckBox.change( function() { DG_SRA.setSelectedSearchResults(); } );
	    }
	}
})(jQuery);

// init controls
document.observe("dg:loaded", function(win) {
	// we need to limit the pages this runs on pages that have a database search form 
	if(!document.getElementById("databaseSearchForm")) {
		return;
	}
	
	// Initialize DG Search Result Acctions
	DG_SRA.initializeSearchResultEvents();

	/*win.DG.Init.localizeQuickSearchField("dbquick", 'dbquick_value'); */// we need to observe the default value, so it is not submitted... TODO: Switch the javascript to use the @placeholder attribute rather than some other hidden element
	
	// TODO: look into making this fire hash change event, even if the hash doesn't change?
	$$('.contentBase h2.toggle').invoke('observe', 'click', function(evt) {
		if (window.location.hash) {
			window.location.hash = '_';
		}
	});

	// norlov: #1491 move entered text from quicksearch field to 'more search options' and back
	var dbSearchWithin = $$('.databaseSearchWithinFields').first();
	if (dbSearchWithin && dbSearchWithin.hasClassName('moduleOpen') && !multipleSearchModules()) {
		$$('.searchWithin').first().style.background = newDatabaseSearchFormStyle;
		$$('.inputWrap').first().toggle();
	}
	
	jQuery('#mainContent select').selectric();	
		
	$$('.advancedSearchModule h2.toggle').invoke('observe', 'click', function(evt) {
		var module = this.up();

		// lift a callback up to the next .module 'onClick' handler in skin.js to handle
		// close and open events
		evt.onModuleComplete = hideOrShowQuickSearch;

		var inputWrap = $$('.inputWrap').first();
		if (!inputWrap.visible()) {
			inputWrap.show();
			$$('.searchWithin').first().style.cssText = originalDatabaseSearchFormStyle;
			var firstFullTextInput = getFirstFullTextInput(module);
			
			if (firstFullTextInput != null) { 
				/*DG.Init.localizeQuickSearchField(firstFullTextInput, 'dbquick_value');*/ // we need to observe the default value, so it is not submitted
				$('dbquick').value = firstFullTextInput.value;
				firstFullTextInput.value = "";
			}
		} 
		else {
			var firstFullTextInput = getFirstFullTextInput(module);

			if (firstFullTextInput != null) {
				/*DG.Init.localizeQuickSearchField(firstFullTextInput, 'dbquick_value'); */// we need to observe the default value, so it is not submitted
				firstFullTextInput.value = $('dbquick').value;
			}

			if (!multipleSearchModules()) {
				$$('.searchWithin').first().style.background = newDatabaseSearchFormStyle;
				$$('.inputWrap').first().hide();
				$('dbquick').value = "";
			}
		}
	});
	$$('#advanced-search-toggle').invoke('observe', 'click', function(evt) {
		var module = jQuery('#advancedsearchModule');
		module.attr('class','databaseSearchWithinFields advancedSearchModule module moduleOpen');

		// lift a callback up to the next .module 'onClick' handler in skin.js to handle
		// close and open events
		evt.onModuleComplete = hideOrShowQuickSearch;

		var firstFullTextInput = getFirstFullTextInput(module);

		if (firstFullTextInput != null) {
			/*DG.Init.localizeQuickSearchField(firstFullTextInput, 'dbquick_value'); */// we need to observe the default value, so it is not submitted
			firstFullTextInput.value = $('dbquick').value;
		}
			$$('.searchWithin').first().style.background = newDatabaseSearchFormStyle;
			$$('.inputWrap').first().hide();
			$('dbquick').value = "";
	});
	function hideOrShowQuickSearch() {
		if (!multipleSearchModules()) {			
			if ($$('.module.searchWithin .moduleOpen').size() > 0) {
	            $$('.inputWrap').first().hide();
	        }

	        if ($$('.module.searchWithin .moduleShut').size() == $$('.module.searchWithin').size()) {
	            $$('.inputWrap').first().show();
	        }
		}
	}

	function multipleSearchModules() {
		return $$('.advancedSearchModule').size() > 1;
	}


	// init database search fields autocompleter
	if (typeof(Autocompleter) != 'undefined') {
		Ajax.Autocompleter.addMethods(
			{
				getUpdatedChoices: Ajax.Autocompleter.prototype.getUpdatedChoices.wrap(
					function(proceed){
						/*
						console.log("Current proceed value:");
						console.log(proceed);
						console.log("Current this value:");
						console.log(this);
						console.log("Current element value:");
						console.log(this.element);
						console.log("Current up from element:");
						console.log(this.element.up());
						console.log("Current previous from up:");
						console.log(this.element.up().previous('.selectric-dbf').down('.selectric-hide-select').down('select'));
						*/
				   // The if condition will be true when a quick search is performed and hence take the value of the hidden field.
						if(this.element.up().previous('.selectric-dbf') === undefined) {
							this.options.defaultParams = 'field=' +this.element.up().previous('#qsAutoComplete').getValue();
						}else {
							this.options.defaultParams = 'field=' + this.element.up().previous('.selectric-dbf').down('.selectric-hide-select').down('select').getValue();
						}
						return proceed.apply(this);
					}
				)
			}
		);
	}

	// init database TOC children show/hide
	$$('.sectionHandler').each(function(e) {
		e.observe('click', function (event) {
			
			for(var i=0; i < e.childNodes.length; i++) {
				var s = e.childNodes[i];
				if (s.nodeType == 1) {
					if (s.visible()) {
						s.hide();
					} else {
						s.show();
					}
				}
			}
		});
	});
	
	// handlers for wdg-tll outline sense togglers
	$$('.outline_sense_toggle').each(function(e) {
		e.observe('click', function (event) {
			
			for(var i=0; i < e.up().up().childNodes.length; i++) {
				var s = $(e.up().up().childNodes[i]);
				if (s.nodeType == 1 && s.nodeName == 'DIV' && s.hasClassName('removable')) {
					if (!s.hasClassName('hidden')) {
						s.addClassName('hidden');
						e.src = e.src.replace('senset_auf.png', 'senset.png');
					} else {
						s.removeClassName('hidden');
						e.src = e.src.replace('senset.png', 'senset_auf.png');
					}
				}
			}
		});
	});

	window.evnts = [];
	
	// norlov: #1620 Clear all the additional search fields on search by quicksearch field
	var dbSearchWithinButton = $('databaseSearchWithinButton');
	if (dbSearchWithinButton) {
		dbSearchWithinButton.observe('click', function(evt) {
			// only want to do this if the quick search input is shown
			var inputWrap = $$(".inputWrap").first();
			if (inputWrap && inputWrap.visible())
				removeAllMoreSearchOptions();
		});
	}
}.curry(window));

function removeAllMoreSearchOptions() {
	var fragments = $$('#databaseSearchWithinFields .moduleDetail div');
	for (var i = 0; i < fragments.length; i++) {
		var fragment = fragments[i];
		if (fragment.id.indexOf('fragment') == -1) {
			continue;
		}
		var input = fragment.down('fieldset div input');
		if (input.type == "text") {
			input.value = "";
		}
	}
}

function getFirstFullTextInput(module) {

	if (!module) {
		return null;
	}

	var fragments = module.select('.moduleDetail div');
	for (var i = 0; i < fragments.length; i++) {
		var fragment = fragments[i];
		if (fragment.id.indexOf('fragment') == -1) {
			continue;
		}
		var fieldset = fragment.down('fieldset');
		if (fieldset.down('select').value.indexOf("fulltext") != -1) {
			return fieldset.down('div').down('input');
		}
	}
	return null;
}

// handle search field change event - load search input
// according to selected field type
function searchFieldChange(event) {
	
	// TODO add an error message when you try to submit the form before this returns, as we are disabling the form elements so it may cause unexpected side effects
	
	var field = Event.findElement(event);
	var	inputValue = "";
	var	advancedSearchModule = field.up('.advancedSearchModule');
	//console.log("Advanced Search Module:");
	//console.log(advancedSearchModule);
	
	var formInjector = field.up('.searchFields').down('div.t-forminjector');
	//console.log("Form Injector:");
	//console.log(formInjector);

	var input = formInjector.down('input');
	//console.log("Input:");
	//console.log(input);

	var selectRadio = formInjector.down('select, .radio');
	//console.log("Select or Radio:");
	//console.log(selectRadio);
	
	var toggleDisabled = [field];
	
    if(selectRadio) {
    	toggleDisabled.push(selectRadio);
    } else if (input) {
    	toggleDisabled.push(input);
    	// don't save for comboboxes:
        inputValue  = input.getValue();
    }
    
    advancedSearchModule.addClassName("busy");
    toggleDisabled.invoke('disable');
    
    var revert = function(advancedSearchModule, field) {
        advancedSearchModule.removeClassName("busy");
        toggleDisabled.invoke('enable');
    }.curry(advancedSearchModule, field)
    
	var timeout = setTimeout(revert, 15000);
    
	var successHandler = function(timeout, revert, field, inputValue, formInjector, transport) {
		clearTimeout(timeout);
		revert();
		
	    var reply = transport.responseJSON;

        // Update container element with the content from the server
        Tapestry.loadScriptsInReply(reply, function(reply, field, inputValue, formInjector){

        	formInjector.update(reply.content);
        	formInjector.down('input').focus();

        	var dbInput = formInjector.down('input.databaseSearchInput')
            // restore search value
            if(dbInput) {
            		dbInput.setValue(inputValue);
            }
			
		}.curry(reply, field, inputValue, formInjector));
		    
	    jQuery('#mainContent select').selectric({expandToItemText:true});
	    
	}.curry(timeout, revert, field, inputValue, formInjector);

	// customize inject event context - set it to selected search field value
	var url = formInjector.readAttribute('url').replace('DEFAULT_CONTEXT', field.getValue());

	// get response from the server
	Tapestry.ajaxRequest(url, successHandler);

	return false;
}