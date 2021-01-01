
(function($){$.fn.pbAjax=function(args){var widgetId=$(this).attr('widget-id');if(!widgetId){widgetId=$(this).data('widget-id');}
if(!widgetId){widgetId=$(this).attr('id');}
var pbContext=$("[name='pbContext']").attr('content');if((widgetId!==null)&&(widgetId!=="undefined")){var data=args['data']?args['data']:{};data['pbContext']=pbContext;data['widgetId']=widgetId;var targetUrl=args['url'];var requestMethod=args.hasOwnProperty('type')?args['type']:'GET';var requestDataType=args.hasOwnProperty('dataType')?args['dataType']:'html';var asyncRequest=args.hasOwnProperty('async')?args['async']:true;var successFunction=args['success'];var failFunction=args['error'];return $.ajax({type:requestMethod,dataType:requestDataType,async:asyncRequest,url:targetUrl,data:data,success:successFunction,error:failFunction});}
else{console.log("widgetId not found");}};})(jQuery);var literatum = {};literatum.events = (function() {
    var instance = {};
    var listenersMap = {};

    instance.register = function(eventName, callback) {
        var listeners = listenersMap[eventName];
        if (!listeners) {
            listenersMap[eventName] = listeners = [];
        }
        listeners.push(callback);
    };

    instance.deregisterAll = function() {
        listenersMap = {};
    };

    instance.notify = function(eventName, data) {
        //console.log("Event '" + eventName + "' triggered.")
        var listeners = listenersMap[eventName];
        if (listeners) {
            listeners.forEach(function(listener) {
                listener(data);
            });
        }
    };

    return instance;
}());literatum.Widget = function(widgetDef, element) {
    this.state = -1;
    this.$element = $(element);
    this.widgetDef = widgetDef;
    if (widgetDef) {
        this.registerListeners();
    }
};

literatum.Widget.prototype.get = function() {
    return this.$element;
};

literatum.Widget.prototype.resize = function(e) {};

literatum.Widget.prototype.render = function(model, params, callback, renderer) {
    if (this.widgetDef.action) {
        return literatum.widgets.getWidget(this, model, params, callback, renderer);
    }
};

literatum.Widget.prototype.lostFocus = function() {
    // nothing
};

literatum.Widget.prototype.updateView = function(view, model) {
    var $this = this.get();
    var $html = $(view.trim());
    if ($html.length > 0) {
        $this.replaceWith($html);
        this.$element = $("*[widget-id='" + $html.attr('widget-id') + "']");
        if (this.$element.length === 0) {
            this.$element = $("#" + $html.attr('id'));
        }
        if (this.$element.length === 0) {
            this.$element = $("*[data-widget-id='" + $html.attr('data-widget-id') + "']");
        }
    } else {
        this.$element.html("");
    }
    this.registerListeners();
    this.triggerInfoHandlers(this, model);
};

literatum.Widget.prototype.triggerInfoHandlers = function(widget, model) {
    var infoHandlers = widget.widgetDef.infoHandlers;
    if (model && model.attributes && infoHandlers) {
        Object.keys(model.attributes).forEach(function(key) {
            var infoHandler = infoHandlers[key];
            if (infoHandler) {
                infoHandler(model.attributes[key], widget, model);
            }
        });
    }
};

literatum.Widget.prototype.registerListeners = function() {
    try {
        this.unbind();
    } catch(e) {
        console.log(e);
    }
    try {
        //console.log("Binding events to candidate elements");
        this.bind();
    } catch (e) {
        console.log("Failed to bind events, rolling back...");
        this.unbind();
    }
};

literatum.Widget.prototype.update = function(model) {
    var result;
    console.log("Updating " + this.widgetDef.id + "...");
    if (!literatum.utils.hasErrors(model.attributes)) {
        result = this.render(model, {});
        console.log("Updating " + this.widgetDef.id + "... Content");
    } else {
        this.triggerInfoHandlers(this, model);
        this.loaded();
        console.log("Updating " + this.widgetDef.id + "... Info");
        result = $.Deferred().resolve();
    }
    return result;
};

literatum.Widget.prototype.bind = function() {
    var thisWidget = this;

    if (!thisWidget.widgetDef.binders)
        return;

    this.find("*[data-bind]").each(function() {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('click', function (e) {
                //literatum.events.notify('user-action');
                binder.call(this, e, thisWidget);
            });
        }
    });

    this.find("*[data-bind-change]").each(function() {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('change', function (e) {
                literatum.events.notify('user-action');
                binder.call(this, e, thisWidget);
            });
        }
    });
};

literatum.Widget.prototype.unbind = function() {
    this.find("*[data-bind]").each(function() {
        $(this).off();
    });
};

literatum.Widget.prototype.find = function(selector) {
    return this.get().find(selector);
};

literatum.Widget.prototype.collectForms = function() {
    var $elements = this.find("form");
    var forms = {};
    $elements.each(function() {
        var $this = $(this);
        var name = $(this).attr('name');
        if (name) {
            var form = {};
            forms[name] = form;
            $this.find("input[type!='checkbox'], textarea").each(function() {
                form[$(this).attr('name')] = $(this).val();
            });

            $this.find("input[type='checkbox']").each(function() {
                if ($(this).is(":checked")) {
                    form[$(this).attr('name')] = $(this).val();
                }
            });

            $this.find("select").each(function() {
                form[$(this).attr('name')] =  $(this).find('option:selected').val();
            });
        }
    });
    this.find("*[data-form]").each(function() {
        var name = $(this).data('form');
        if (name) {
            var form = {};
            forms[name] = form;
            $(this).find("*[data-field]").each(function() {
                var $this = $(this);
                var value = $this.data('value');
                if (!value) {
                    value = $this.text().trim();
                }
                form[$this.data('field')] = value;
            });
        }
    });
    return forms;
};

literatum.Widget.prototype.updateForm = function(formName, sourceForm, merge) {
    var forms = this.find("form[name='" + formName + "']");
    if (forms) {
        var form = forms[0];
        if (form) {
            var $form = $(form);
            $form.find("input").each(function() {
                var $this = $(this);
                if ($this.attr("type") == 'submit') {
                    return;
                }

                var value = sourceForm[$this.attr('name')];
                if (merge && !value)
                    return;

                $this.val(value);
            });

            var $select = $form.find("select");
            $select.each(function() {
                var $this = $(this);
                var value = sourceForm[$this.attr('name')];

                if (merge && !value)
                    return;

                if (value) {
                    $this.closest(".input-group").show();
                }

                $this.find('option').prop('selected', false);
                $this.find("option[value='" + value + "']").prop('selected',true);
            });
        }
    }
};

literatum.Widget.prototype.initialize = function() {
    this.registerListeners();
};

literatum.Widget.prototype.loading = function() {
    $("body").addClass("widget-loading");
};

literatum.Widget.prototype.error = function() {
    //$("body").addClass("widget-error");
};

literatum.Widget.prototype.loaded = function() {
    //$("body").removeClass("widget-loading");
};

literatum.Widget.prototype.reset = function() {
    this.getNotifications().forEach(function(item) {
        item.reset();
    });
};

literatum.Widget.prototype.getNotifications = function() {
    var result = [];
    this.find("*[data-notification]").each(function() {
        if (this.literatumNotification) {
            result.push(this.literatumNotification);
        }
    });
    return result;
};

literatum.Widget.prototype.getNotification = function(name) {
    if (!this.widgetDef.notifications)
        return null;

    var thisWidget = this;

    var notification = null;

    this.find("*[data-notification='" + name + "']").each(function() {
        var notificationType = thisWidget.widgetDef.notifications[name];
        if (!this.literatumNotification) {
            this.literatumNotification = new notificationType(this);
        }
        notification = this.literatumNotification;
    });

    return notification;
};

literatum.Widget.prototype.register = function(service) {
    var thisWidget = this;
    commerce.cart.register(service, function(model) {
        return thisWidget.update(model);
    });
};
literatum.widgets = (function() {
    var instance = {};
    var widgetDefs = [];
    var widgets = [];


    function render(template, model) {
        Object.keys(model).forEach(function(key) {
            var re = new RegExp('\\{{' + key + '\\}}', 'g');
            template = template.replace(re, model[key]);
        });
        template = template.replace(/{{.+?}}/g,'');
        return template;
    }

    $(window).on('resize', function(e) {
        widgets.forEach(function(widget) {
            widget.resize(e);
        });
    });

    instance.render = function(widget, model, params, callback, renderer) { // FIXME: clean me
        return widget.render(model, params, callback, renderer);
    };

    instance.getWidget = function(widget, model, params, callback, renderer) {
        return widget.get().pbAjax({
            type: 'GET',
            url: widget.widgetDef.action,
            dataType: 'html',
            data: params,
            async: true,
            success: function(html) {
                var result = render(html, model);
                if (renderer) {
                    renderer(html, model);
                } else {
                    widget.updateView(result, model);
                }
                //widget.get().fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400); // For debugging
                widget.loaded(); // This is not needed, confirm and remove
                if (callback) {
                    callback();
                }
                literatum.events.notify('widget-rendered');
            },
            error: function(data) {
                widget.error();
            }
        });
    };

    instance.get = function(id) {
        var result = [];
        widgets.forEach(function(item){
            if (item.widgetDef.id == id)
                result.push(item);
        });
        return result;
    };
    //instance.find = function(widgetId) {
    //    var $result = $("*[widget-def='" + widgetId +"']");
    //    if ($result.length > 0) {
    //        return $result;
    //    }
    //    return $("." + widgetId);
    //};
    instance.all = function() {
        return widgets.slice(0);
    };

    instance.collapse = function() {
        widgets.forEach(function(widget) {
            widget.hide();
        });
    };

    instance.register = function(widgetDef) {
        widgetDefs.push(widgetDef);
    };

    instance.initialize = function() {
        widgetDefs.forEach(function(WidgetDef) {
            WidgetDef.find().each(function() {
                var instance = Object.create(WidgetDef.prototype);
                WidgetDef.call(instance, WidgetDef, this);
                widgets.push(instance);
            });
        });
    };

    return instance;
}());

$(document).ready(function() {
    literatum.widgets.initialize();
});

console.log("Widgets initialized!");literatum.Loading = function(deferred) {
    this.start();
    this.deferred = deferred;
    $.when(deferred).then(this.done);
};

literatum.Loading.prototype.start = function() {};

literatum.Loading.prototype.done = function() {};literatum.FullPageLoading = function() {
    this.message = '';
};

literatum.FullPageLoading.prototype = new literatum.Loading();

literatum.FullPageLoading.prototype.start = function() {
    $("body").append('<div class="loading-overlay"><div class="loading-container"><div class="loading"></div><div class="loading-message">' + this.message + '</div></div></div></div>');
    $(".loading-overlay").fadeIn(200);
    return this;
};

literatum.FullPageLoading.prototype.done = function() {
    var $overlay = $(".loading-overlay");
    $overlay.fadeOut(200);
    $overlay.remove();
    literatum.widgets.initialize();
};

literatum.FullPageLoading.prototype.setMessage = function(message) {
    this.message = message;
};/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,m=_.height,g=_.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+_+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);/*! jQuery UI menu - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){t.widget("ui.menu",{version:"1.10.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,t.proxy(function(t){this.options.disabled&&t.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(t){t.preventDefault()},"click .ui-state-disabled > a":function(t){t.preventDefault()},"click .ui-menu-item:has(a)":function(e){var i=t(e.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(e),i.has(".ui-menu").length?this.expand(e):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){var i=t(e.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.children(".ui-menu-item").eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){t(e.target).closest(".ui-menu").length||this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,n,a,o,r,h=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:h=!1,n=this.previousFilter||"",a=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),a===n?o=!0:a=n+a,r=RegExp("^"+i(a),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())}),s=o&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(a=String.fromCharCode(e.keyCode),r=RegExp("^"+i(a),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())})),s.length?(this.focus(e,s),s.length>1?(this.previousFilter=a,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i=this.options.icons.submenu,s=this.element.find(this.options.menus);s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),s=e.prev("a"),n=t("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",s.attr("id"))}),e=s.add(this.element),e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),e.children(":not(.ui-menu-item)").each(function(){var e=t(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")}),e.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=e.height(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(e),undefined)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(e),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){var t=0;e.widget("ui.autocomplete",{version:"1.10.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,undefined;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:case a.NUMPAD_ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,s.preventDefault(),undefined;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),undefined):(this._searchTimeout(e),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(e),this._change(e),undefined)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({input:e(),role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),undefined;var s=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",t,{item:s})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(s.value):this.liveRegion.text(s.value)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):undefined},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,i=++t;return function(s){i===t&&e.__response(s),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<a>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[e](t),undefined):(this.search(null,t),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.text(t))}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.2",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,a=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=a),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function a(t){l.of=t,o.is(":hidden")||o.position(l)}var o,r,h,l=t.extend({},this.options.position);if(n){if(o=this._find(s),o.length)return o.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),o=this._tooltip(s),e(s,o.attr("id")),o.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:a}),a(i)):o.position(t.extend({of:s},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(a(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:o}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(o)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),a=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),a.stop(!0),this._hide(a,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:a}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);/* (c) Atypon
 This provides support for search related widgets */
(function ($) {
    var desktopWidth = 992;
    $(document).ready(function() {

    if ($(window).width() > desktopWidth) {
        $('.fancy-tooltip').tooltip({
            show: {
                effect: "fadeIn",
                delay: 250
            }
        });
    }
    $('.citationSearchBoxContainer input').each(function(index,input){
        $(input).attr('disabled','disabled')
    });

    $('.quickSearchForm').submit(function(e){
        var submit;
        ($('.quickSearchForm input[type=search]')).each(function(index,input){
            if($(input).attr('disabled') != 'disabled' &&  $(input).val() != ''){
                submit = true;
                return false;
            }
        });
        ($('.quickSearchForm input[type=text]')).each(function(index,input){
            if($(input).attr('disabled') != 'disabled' &&  $(input).val() != ''){
                submit = true;
                return false;
            }
        });
        if(submit){
            return true;
        }
        window.location = '/search/advanced';
        return false;

    });

    quickSearch.initAutoComplete();

    $(".js__searchInSelector").on('change',quickSearch.quickSearchSelectionHandler);

});

quickSearch = function(){

    function _citationSearchMode($dropdown) {
        var container = $dropdown.closest("form");
        container.find('.simpleSearchHelp').hide();
        container.find('.simpleSearchBoxContainer').hide();
        _disableInputs(container.find('.simpleSearchBoxContainer'));
        _enableInputs(container.find('.citationSearchBoxContainer'));
        container.find(".citationSearchBoxContainer").find("input[name='quickLinkYear']").attr("disabled", true);
        container.find(".citationSearchBoxContainer").find("input[name='quickLinkVolume']").attr("disabled", true);
        container.find(".citationSearchBoxContainer").find("input[name='quickLinkPage']").attr("disabled", true);
        if(container.find(".citationSearchBoxContainer").find("input[name='quickLinkIssue']").attr("type")!="hidden"){
            container.find(".citationSearchBoxContainer").find("input[name='quickLinkIssue']").attr("disabled", true);
        }
        if ($('.quickSearchFormContainer input[name="quickLinkJournal"]').val()!="") {
            $(".quickSearchFormContainer .mainSearchButton").removeAttr("disabled");
        }
        else {
            $(".quickSearchFormContainer .mainSearchButton").attr('disabled', true);
        }
        setupCitationSubmitButton('quickSearchFormContainer');
        container.find('.citationHelp').show();
        container.find('.citationSearchBoxContainer').show();
        container.attr('action','/action/quickLink');
    };

    function _simpleSearchMode($dropdown){
        var container = $dropdown.closest("form");
        container.find('.citationHelp').hide();
        container.find('.citationSearchBoxContainer').hide();
        _disableInputs(container.find('.citationSearchBoxContainer'));
        _enableInputs(container.find('.simpleSearchBoxContainer'));
        container.find('.simpleSearchBoxContainer').show();
        container.find('.simpleSearchHelp').show();
        container.attr('action','/action/doSearch');
        container.find("input[type='hidden'][name='SeriesKey']").attr('disabled',true);
        $(".quickSearchFormContainer .mainSearchButton").removeAttr("disabled");
    };

    function _disableInputs($selector){
        $selector.find('input').each(function(index,input){
            $(input).attr('disabled','disabled')
        });
    };

    function _enableInputs($selector){
        $selector.find('input').each(function(index,input){
            $(input).removeAttr("disabled");
        });
    };
    function setupCitationSubmitButton(container) {

        $('.quickSearchFormContainer input[name="quickLinkJournal"]').on('keyup', function () {
            if ($('.quickSearchFormContainer  input[name="quickLinkJournal"]').val() == '') {
                $(".quickSearchFormContainer .mainSearchButton").attr('disabled', true);
            }
            else {
                $(".quickSearchFormContainer .mainSearchButton").removeAttr("disabled");
            }
        });

    };

    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().addClass('quickSearchAutocomplete');
            this.widget().menu( "option", "items", "> :not(.qsaCategory)" );
        },
        _renderMenu: function( ul, items ) {
            var fuzzySuggesterEnabled = $(this.element).data('fuzzy-suggester');
            var that = this;
            if(fuzzySuggesterEnabled){$(ul).addClass('newSuggester')}
            $.each(items, function (index, item) {
                if(fuzzySuggesterEnabled){
                    var catSelector = ".ui-autocomplete-category[data-category='" + item.category + "']";
                    if ($(catSelector).length < 1) {
                        if(item.category === 'Quick Links'){
                            ul.prepend("<li class='ui-autocomplete-category' data-category='" + item.category + "'>" + item.category + "</li>");
                        }else{
                            ul.append("<li class='ui-autocomplete-category' data-category='" + item.category + "'>" + item.category + "</li>");
                        }

                    }
                    var $item = that._renderItemData(ul, item);
                    $(ul).children(catSelector).after($item);
                }else{
                    var $item = that._renderItemData(ul, item);
                    $(ul).append($item);
                }

            });
            if($('.ui-autocomplete-category').size() < 2){
                $('.ui-autocomplete-category').remove();
            }
        },
        _renderItem:function (ul, item) {
            var fuzzySuggesterEnabled = $(this.element).data('fuzzy-suggester');

            var $aWrap = $('<a>').addClass("qsaHistoryItem");
            if (item.history){
                var itemSpan = $.parseHTML(item.highlight);
                var removeDiv = $('<a>').attr('href','#').addClass("qsaRemove").html('[Remove]');
                removeDiv.bind('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var selectedHistoryItem = $(e.target.parentNode.parentNode).data().qsaItem;
                    var autoCompeteSearchUri = ['/action/doDeleteHistory?ajax=true&uri=', encodeURIComponent(selectedHistoryItem.value)].join('');
                    $.ajax(autoCompeteSearchUri).done(function(result) {
                        if (result === 'true') {
                            e.target.parentNode.remove();
                        }
                    });
                });
                $aWrap.append(removeDiv);
                $aWrap.append(itemSpan);
            }else{
                $aWrap.html(item.highlight).attr('title',item.label);
            }
            var $elm = $("<li>").data("qsaItem", item).data("item-param", item.param).append($aWrap).addClass('qsaItem');
            if (item.category && fuzzySuggesterEnabled) {
                $elm.attr("aria-label", item.category + " : " + item.label);
                $elm.attr("data-category", item.category);
            }
            return $elm;

        },
        _resizeMenu: function() {
            var ul = this.menu.element;

            if (this.element.outerWidth() < 250) {
                ul.outerWidth(this.element.outerWidth() + 40 / 100 * this.element.outerWidth());
            }else{
                ul.outerWidth(this.element.outerWidth());
            }
        }
    });

    return {

        initAutoComplete: function (dropOption) {

            var that = this;

            $('.quickSearchFormContainer .autocomplete').catcomplete({
                source: function (request, response) {
                    var enteredTerm = request.term;
                    var $inputElem = $(this.element);

                    var maxWords = $inputElem.data("auto-complete-max-words");
                    var maxChars = $inputElem.data("auto-complete-max-chars");
                    if(enteredTerm.split(" ").length > maxWords || enteredTerm.length > maxChars || !enteredTerm.replace(/\s/g, '').length){
                        return false;
                    }
                    var selectedOption = $('.js__searchInSelector option:selected').val();

                    var autoCompleteSearchType = '';

                    if (selectedOption === 'Title' ||  selectedOption =='citation') {
                        autoCompleteSearchType = 'title-';
                    } else if (selectedOption === 'Contrib') {
                        autoCompleteSearchType = 'contrib-';
                    }
                    var isDisabled = disableAutoCompleteIfAllSetToZero($inputElem);

                    if(isDisabled === 'false') {
                        sendAjaxRequest($inputElem, dropOption, enteredTerm, autoCompleteSearchType, selectedOption, response);
                    }

                },
                //To prevent showing value when user is using up/down arrow key
                focus: function (event, ui) {
                    return false;
                },
                //autoFocus:true,
                select: function (event, ui) {
                    if($(event.target).attr('name') != 'quickLinkJournal'){
                        $(event.target).val(ui.item.label);
                        window.location.href = ui.item.value;
                    }else{
                        $(event.target).val(ui.item.label);
                    }
                    return false;
                }
            }).bind('click', function (e) {
                    $(this).catcomplete({minLength: 2});
                }
            )
        },
        quickSearchSelectionHandler: function () {

            var selectedValue = $("option:selected", this).data('search-in')
                , $searchInSelector = $('.js__searchInSelector');
            //if selected value = journals,books
            if (selectedValue == 'journal' || selectedValue == 'book') {
                _simpleSearchMode($(this));
                $($searchInSelector).attr('name', 'pubType');
                $('#searchText').attr('name', 'AllField');
            }
            //else if selected value = all, author
            else if (selectedValue == 'AllField' || selectedValue == 'Contrib') {
                _simpleSearchMode($(this));
                $($searchInSelector).attr('name', 'field1');
                $('#searchText').attr('name', 'text1');
            }

            else if (selectedValue == 'citation') {
                _citationSearchMode($(this));
            }
            else if (selectedValue == 'thisIssue') {
                _simpleSearchMode($(this));
                $('.searchText').attr('name', 'AllField');
                $($searchInSelector).attr('name', 'Issue');
                $('.quickSearchForm').find("input[type='hidden'][name='SeriesKey']").removeAttr('disabled');

            }
            else
            if (selectedValue == 'thisJournal' || selectedValue == "thisSeries") {
                _simpleSearchMode($(this));
                $($searchInSelector).attr('name', 'SeriesKey');
                $('.searchText').attr('name', 'AllField');
            }
            else{
                _simpleSearchMode($(this));
                if (selectedValue == "default"){
                    $($searchInSelector).attr('name', '');
                }
                else {
                    $($searchInSelector).attr('name', 'publication');
                }
                $('.searchText').attr('name', 'AllField');

            }
        }
    };
}();

function disableAutoCompleteIfAllSetToZero($inputSearchText){
    var confNumOfHistoryItems = $inputSearchText.data('historyItemsConf');
    var confNumOfPublicationTitles = $inputSearchText.data('publication-titles-conf');
    var confNumOfGroupItems= $inputSearchText.data('group-titles-conf');
    var confNumOfPublicationItems = $inputSearchText.data('publication-items-conf');
    var confNumOfTopics = $inputSearchText.data('topics-conf');
    var confNumOfContributors = $inputSearchText.data('contributors-conf');
    if(confNumOfHistoryItems == 0 && confNumOfGroupItems == 0 && confNumOfPublicationTitles == 0 && confNumOfTopics == 0 && confNumOfContributors == 0 && confNumOfPublicationItems == 0)
        return 'true';
    return 'false';
}

function sendAjaxRequest($inputSearchText,dropOption,enteredTerm ,autoCompleteSearchType,selectedOption ,response){
    var results = [];
    var confNumOfHistoryItems = $inputSearchText.data('history-items-conf');
    var confNumOfPublicationTitles = $inputSearchText.data('publication-titles-conf');
    var confNumOfGroupItems= $inputSearchText.data('group-titles-conf');
    var confNumOfPublicationItems = $inputSearchText.data('publication-items-conf');
    var confNumOfTopics = $inputSearchText.data('topics-conf');
    var confNumOfContributors = $inputSearchText.data('contributors-conf');
    var fuzzySuggesterEnabled = $inputSearchText.data('fuzzy-suggester');
    var displayLabels = $inputSearchText.data('display-labels');

    if (dropOption === 'citation'){ //quick fix for LIT-138406
        var autoCompeteSearchUrl = ['/action/doSuggest?target=title-auto-complete&query=', enteredTerm,
            '&pts=', confNumOfPublicationTitles, '&fl=PubID'].join('');
    }else{
        var autoCompeteSearchUrl = ['/action/doSuggest?target=', autoCompleteSearchType, 'auto-complete&query=', enteredTerm,
            '&hs=', confNumOfHistoryItems, '&pts=', confNumOfPublicationTitles, '&ptgs=' , confNumOfGroupItems , '&ptfs=', confNumOfPublicationItems , '&ts=', confNumOfTopics,
            '&cs=', confNumOfContributors, '&fl=PubID'].join('');
    }
    $.getJSON(autoCompeteSearchUrl)
        .done(function (resultData) {

            var numOfTitles, NumOfGroupItems, numOfItems, numOfTopics, numOfContrib, numOfHistory;
            numOfTitles = NumOfGroupItems = numOfItems = numOfTopics = numOfContrib = numOfHistory = 0;

            var getSuggestion = function(item){
                var suggestion = {
                    'label' : item.label,
                    'highlight' : item.highlight,
                    'category': item.param == 'DOI' ? 'Quick Links' : 'Suggested Search',
                    'param': item.param,
                    'history' : false
                };
                if (item.param === 'history') {
                    suggestion['value'] = decodeURI(item.value);
                    suggestion['history'] = true;
                }else if(selectedOption =='citation'){
                    suggestion['value'] = item.value;
                }
                else{
                    suggestion['value'] =  item.url;
                }


                if(fuzzySuggesterEnabled && displayLabels){
                    switch(item.param){
                        case 'SeriesKey':
                            suggestion['highlight'] += '<span class="pull-right suggestionType">Journal</span>';
                            break;
                        case 'ConceptID':
                            suggestion['highlight'] += '<span class="pull-right suggestionType">Topic</span>';
                            break;
                        case 'ContribAuthorStored':
                            suggestion['highlight'] += '<span class="pull-right suggestionType">Author</span>';
                            break;
                        case 'Book':
                            suggestion['highlight'] += '<span class="pull-right suggestionType">Book</span>';
                            break;
                        case 'Issue':
                            suggestion['highlight'] += '<span class="pull-right suggestionType">Issue</span>';
                            break;
                    }
                }

                return suggestion;
            };

            $.each(resultData, function (i, item) {
                if ( (item.param === 'history') && (numOfHistory < confNumOfHistoryItems) ) {
                    results.push(getSuggestion(item));
                    numOfHistory++;
                } else if ( (item.param === 'SeriesKey') && (numOfTitles < confNumOfPublicationTitles) ) {
                    results.push(getSuggestion(item));
                    numOfTitles++;
                } else if ( (item.param === 'DOI') && (numOfItems < confNumOfPublicationItems) ) {
                    results.push(getSuggestion(item));
                    numOfItems++;
                } else if ( (item.param === 'Book') && (NumOfGroupItems < confNumOfGroupItems) ) {
                    results.push(getSuggestion(item));
                    NumOfGroupItems++;
                } else if ( (item.param === 'Issue') && (NumOfGroupItems < confNumOfGroupItems) ) {
                    results.push(getSuggestion(item));
                    NumOfGroupItems++;
                } else if ( (item.param === 'ConceptID') && (numOfTopics < confNumOfTopics) ) {
                    results.push(getSuggestion(item));
                    numOfTopics++;
                } else if ( (item.param === 'ContribAuthorStored') && (numOfContrib < confNumOfContributors) ) {
                    results.push(getSuggestion(item));
                    numOfContrib++;
                }
            });
            response(results);
        }).fail(function () {
        console.log('failed');
    });
}
})(jQuery);
function loadRecaptcha(){if(typeof grecaptcha=='undefined')
return;$('.g-recaptcha').filter(function(){return!$(this).hasClass('explicit');}).each(function(){grecaptcha.render($(this)[0],$(this).data());});}
function clearCapcha(){if(typeof grecaptcha!='undefined')
grecaptcha.reset(0);}
function captchaChallengeSubmit(){$('.g-recaptcha').closest('form').submit();};$(function() {
    $('.avg-score-histogram').each(function() {
        var $this = $(this);
        var context = $this.find('canvas');
        var data = JSON.parse($this.find('.data').text());
        var values = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                values.push(data[key] * 100);
            }
        }
        new Chart(context, {
            type: 'line',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Avg score',
                    data: values,
                    borderColor: '#9fce70',
                    borderWidth: 2,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBackgroundColor: '#425e6a',
                    pointHoverBorderColor: '#425e6a',
                    tension: 0,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 10
                        }
                    }]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Average Exam Score Tracked Over Time'
                },
                tooltips: {
                    mode: 'label'
                },
                hover: {
                    mode: 'label'
                }
            }
        });
    })
});
$(function() {
    var $timers = $('.timer .value');
    if ($timers.length) {
        var interval = 0;
        var format = function(total) {
            var hours = Math.floor(total / 3600);
            var minutes = Math.floor((total - (hours * 3600)) / 60);
            var seconds = total - (hours * 3600) - (minutes * 60);

            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            return hours + ':' + minutes + ':' + seconds;
        };
        var increment = function() {
            console.log(interval);
            interval++;
            $.get('/exam/updateTimeSpent/' + $("input[name='questionIndex']").val());
            $timers.each(function() {
                var $value = $(this);
                var original = parseInt($value.data().value, 10);
                $value.html(format(original + interval));
            });
        };
        setInterval(increment, 1000);
    }
});
$(function() {
    $('.show-subjects').change(function() {
        $('.subjects-table').removeClass('hidden');
    });
    $('.hide-subjects').change(function() {
        $('.subjects-table').addClass('hidden');
    });
});
$(function() {
    $('.show-areas').change(function() {
        $('.areas-table').removeClass('hidden');
    });
    $('.hide-areas').change(function() {
        $('.areas-table').addClass('hidden');
        $('.questions-area')[0].checked = false;
        $('.questions-area')[1].checked = false;
        $('.questions-area')[2].checked = false;
    });
});

$(function() {
    $("input[name='dryRun']").click(function (e) {
        var url = "/pb/widgets/digitalQuestion/calculate"; // the script where you handle the form input.
        $.ajax({
            type: "POST",
            url: url,
            data: $(".create__test__form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                var jsonData = JSON.parse(data);
                if(jsonData.errorMsg) {
                    $("div.error").text(jsonData.errorMsg); // show response from the php script.
                    $("span.result-count").text("");
                }else {
                    $("span.result-count").text(" There are "+jsonData.resultCount+" available questions.");
                    $("div.error").text("");
                }
            }
        });
        e.preventDefault();// avoid to execute the actual submit of the form.
    });
});
var Track={};(function(undefined){var jquery=typeof jQuery!='undefined';var elements={};var userAgent=navigator.userAgent.toLowerCase();var defaultAjaxSettings={async:!/webkit/.test(userAgent),asynchronous:!/webkit/.test(userAgent),cache:false,timeout:/msie/.test(userAgent)?0:100,requestTimeout:/msie/.test(userAgent)?0:100,contentType:'application/x-www-form-urlencoded',url:'/action/clickThrough'};var extend=function(dst,src){if(jquery){extend=jQuery.extend;}else{extend=Object.extend;}
return extend(dst,src);};var each=function(o,iterator){if(jquery){each=jQuery.each;}else{each=function(object,callback){var name,i=0,length=object.length,isObj=length===undefined||typeof object==="function";if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}else{for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}
return object;};}
return each(o,iterator);};var bind=function(selector,options,callback){var jQueryBind=function(selector,options,callback){if(options.selector){jQuery(selector).on(options.on,options.selector,options,callback);}else{jQuery(selector).on(options.on,options,callback);}};var oldJQueryBind=function(selector,options,callback){var callbackToUse=callback;if(options.selector){callbackToUse=function(event){var $target=$(event.currentTarget);while(!$target.is(options.selector)&&$target.children().length){$target.children().each(function(){$target=$(this);if($target.is(options.selector)){return false;}});}
if($target.is(options.selector)){callback.call(event.target,event,options);}};jQuery(selector).data('TrackCallback',callbackToUse);}
jQuery(selector).bind(options.on,options,callbackToUse);};var prototypeBind=function(selector,options,callback){$$(selector).each(function(el){Event.observe(el,options.on,callback.bindAsEventListener(this,options));});};if(jquery){if(jQuery.fn.on){bind=jQueryBind;}else{bind=oldJQueryBind;}}else{bind=prototypeBind;}
return bind(selector,options,callback);};var unbind=function(selector,options,callback){var jQueryUnbind=function(selector,options,callback){if(options.selector){jQuery(selector).off(options.on,options.selector,options,callback);}else{jQuery(selector).off(options.on,options,callback);}};var oldJQueryUnbind=function(selector,options,callback){if(options.selector){callback=jQuery(selector).data('TrackCallback');}
if(callback){jQuery(selector).unbind(options.on,callback);}else{jQuery(selector).unbind(options.on);}};var prototypeUnbind=function(selector,options,callback){$$(selector).each(function(el){Event.stopObserving(el,options.on);});};if(jquery){if(jQuery.fn.on){unbind=jQueryUnbind;}else{unbind=oldJQueryUnbind;}}else{unbind=prototypeUnbind;}
return unbind(selector,options,callback);};var sendBeacon=function(options){var formData=new FormData();for(var key in options.data){if(options.data.hasOwnProperty(key)){formData.append(key,options.data[key]);}}
navigator.sendBeacon(options.url,formData);};var ajax=function(ajaxOptions){if(ajaxOptions.useBeacon&&navigator.sendBeacon){ajax=sendBeacon;}else if(jquery){ajax=jQuery.ajax;}else{ajax=function(options){options.parameters=options.data;new Ajax.Request(options.url,options);}}
ajax(ajaxOptions);};var defaultFire=function(options,data){var ajaxSettings=extend(extend({},defaultAjaxSettings),options.ajaxSettings);ajaxSettings.data=extend(extend({},ajaxSettings.data),data);ajax(ajaxSettings);};var defaultOptions={on:'mouseup',fire:defaultFire,acceptEvent:function(e){return e.which===1||e.which===2;},data:{}};var methods={setup:function(options){if(options.fire!==undefined){defaultFire=options.fire;}
if(options.options!==undefined){defaultOptions=extend(extend({},defaultOptions),options.options);}
if(options.ajax!==undefined){defaultAjaxSettings=extend(extend({},defaultAjaxSettings),options.ajax);}},init:function(el){each(elements=el,function(selector,options){if(Object.prototype.toString.call(options)==='[object Array]'){var array=options;for(var i=0;i<array.length;++i){options=array[i];options=extend(extend({},defaultOptions),options);if(options.fire!==undefined){bind(selector,options,methods.onEvent);}}}else{options=extend(extend({},defaultOptions),options);if(options.fire!==undefined){bind(selector,options,methods.onEvent);}}});return this;},destroy:function(){elements.each(function(selector,options){unbind(selector,options.on,options.fire);});return this;},onEvent:function(event,options){if(options==undefined){options=event.data;}
var data=options.data;if(typeof options.acceptEvent=='function'&&!options.acceptEvent(event)){return true;}
var addData=options.addData;if(typeof addData=='function'){try{extend(data,addData.call(event.target,options,event));}catch(ex){if(console&&console.log){console.log('Failed to extract data:'+ex);return;}}}
options.fire(options,data);return true;}};Track=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}};})();
(function(){window.TrackPageTransitions=function(Track,$,o){o=o||{};var $elements=$('*[data-track]');if(!$elements.length){return;}
Track('setup',{ajax:{url:o.url||'/action/analytics',method:'POST',useBeacon:true}});var captureAllPageTransitions=$('html[data-track]').length!=0;Track({body:[{on:'mousedown keydown',selector:captureAllPageTransitions?'a[href]':'*[data-track] a[href], a[href][data-track]',addData:extractData,acceptEvent:function(e){return e.which==1||e.keyCode==13;},data:{EventType:'PageTransition'}},{on:'submit',selector:captureAllPageTransitions?'form':'*[data-track] form, form[data-track]',addData:extractData,data:{EventType:'PageTransition'}}]});};if(typeof Track!='undefined'){if(typeof jQuery!='undefined'){jQuery(document).ready(function(){TrackPageTransitions(Track,jQuery);});}else if(typeof window.Prototype!='undefined'){document.observe('dom:loaded',function(){TrackPageTransitions(Track,$$);});}}
function collectData(el){var d={};$.each(el.attributes,function(i,attrib){var name=attrib.name;if(name.indexOf('data-')==0){name=name.substring("data-".length);name=name.replace(/-([a-z])/g,function(g){return g[1].toUpperCase();});d[name]=attrib.value;}});return d;}
function extractData(options,event){var data={};var $html=$(document.documentElement);var requestId=$html.data('requestId');if(requestId){data.OriginRequestId=requestId;data.OriginUrl=window.location.href;var date=new Date();date.setTime(date.getTime()+60*1000);var expires=date.toGMTString();document.cookie='OriginRequestId='+requestId+'; expires='+expires+"; path=/";}
var $this=$(this);var href;if($this.is("a")){data.LinkText=$this.text();href=$this.attr('href');}else if($this.is("form")){href=$this.attr('action');}
if(href){data.LinkHref=href;if(href.indexOf('/doi/')!=-1){data.doi=href.split("/doi/")[1];}}
var innerFound=false;$.each($this.add($this.parents()),function(){var $ancestor=$(this);var d=null;try{d=$ancestor.data();}catch(ex){d=false;}
if(d===false){d=collectData($ancestor.get(0));}
for(var property in d){if(d.hasOwnProperty(property)&&property.indexOf("track")==0){var name=property.substring("track".length);if(name=="Func"&&d[property]){var func=window[d[property]];if($.isFunction(func)){try{var extra=func.call($ancestor);if(extra){$.extend(data,extra);}}catch(ex){}}
continue;}
if(name.length){data['Track'+name]=d[property];}
if(!innerFound){innerFound=true;if($this.is('a')){var linkIndex=$('a[href*="/doi"], a[href*="/loi"], a[href*="/toc"]',$ancestor).index($this);if(linkIndex>-1){data.LinkIndex=linkIndex+1;}}}}}});if(event.which==1){data.ClickPageX=event.pageX;data.ClickPageY=event.pageY;}
return data;}})();
(function(){var TrackSearchResults=function(Track,$,undefined){var $searchResults=$('.searchResultContainer, #frmSearchResults, #frmSearch, #searchResultsAll, #searchResults, .searchResult, .search-result, #searchResultContent');if(!$searchResults.length){return;}
Track('setup',{ajax:{url:'/action/analytics',useBeacon:true}});var resultSelectorAction={selector:'a[href^="/doi"], a[href^="/article"]',addData:extractDataSearchResult,data:{EventType:'SearchResultClicked'}};Track({'.searchResultContainer .articleLinks, #frmSearch .articleEntry td, .searchResultsListing li':resultSelectorAction,'#searchResultsAll .articleEntry td, #searchResults .searchResultItem .articleInfo':resultSelectorAction,'#frmSearchResults .articleEntry td, #frmSearchResults .articleEntry div, #frmSearchResults .searchResultItem span':resultSelectorAction,'#frmSearchResults .searchResultItem .atcl-item, #frmSearchResults .searchResultItem div':resultSelectorAction,'#frmSearchResults .searchEntry .searchEntryTools, .searchResult .result-list li':resultSelectorAction,'.contentContainer .searchResult td, .search-result .items-results li span':resultSelectorAction,'#frmSearch .article-details, #frmSearchResults .search-results .search-result-item':resultSelectorAction,'#searchResultContent .o-results .m-result, #frmSearchResults .search-results li':resultSelectorAction});};if(typeof Track!='undefined'){if(typeof jQuery!='undefined'){jQuery(document).ready(function(){TrackSearchResults(Track,jQuery);});}else if(typeof window.Prototype!='undefined'){document.observe('dom:loaded',function(){TrackSearchResults(Track,$$);});}}
function extractCommonData(data,options,event){var $this=$(this);var searchResultRows;var clickedRow;var $searchResultRow=$this.closest('#searchResultItems, .search-results, .searchEntry, .contentContainer, #frmSearch, #frmSearchResults, #searchResultContent .o-results');if($searchResultRow.length){searchResultRows=$searchResultRow.find('.articleEntry, .searchResultItem, .searchEntry, .article-details, .search-result-item, .m-result');if(searchResultRows.length){clickedRow=$this.closest('.articleEntry, .searchResultItem, .searchEntry, .article-details, .search-result-item, .m-result');}else{searchResultRows=$searchResultRow.children('li');clickedRow=$this.closest('li');}}else{$searchResultRow=$this.closest('.searchResultsListing, .result-list, .items-results');if($searchResultRow.length){searchResultRows=$searchResultRow.children('li');clickedRow=$this.closest('li');}}
if(searchResultRows.length&&clickedRow.length){data.searchPageRank=searchResultRows.index(clickedRow)+1;}
var $container=$this.closest('.searchResultContainer, .type-search-results, .searchNav, .searchResult, .search-result, #searchResultContent');if(!$container.length){$container=$('.searchResults_paging, .searchResultsCont, .searchResults');}
if($container.length){var $selectedPage=$container.find('.pages .selected, .pages .activeLink, .pages .current, .searchPages .activeLink, .pagination .activeLink, .pagination .active, .pageLinks .selected, .paginationLinks .s-active ');if($selectedPage.length){data.resultPageNum=parseInt($selectedPage.text());}else{var $paginationElements=$container.find('.paginationControls, .paginationLinks').first().find('li:not(:has(a))');if($paginationElements.length){$paginationElements.each(function(){var $innerMostChildOfPagination=$(this).children();while($innerMostChildOfPagination.length){$innerMostChildOfPagination=$innerMostChildOfPagination.children();}
$selectedPage=$.trim($innerMostChildOfPagination.end().text());if($selectedPage.length&&isInt($selectedPage)){data.resultPageNum=parseInt($selectedPage);return false;}});}}}
if(!data.resultPageNum){var startPageFromSearchForm=$('#searchResultsAll, #frmSearch, #frmSearchResults').find('input[name=startPage]');if(startPageFromSearchForm.length){data.resultPageNum=parseInt(startPageFromSearchForm.val())+1;}}}
function isInt(n){return parseInt(n)+0===parseInt(n);}
function extractDataSearchResult(options,event){var data={};var $this=$(this);var $articleEntry=$this.closest('.articleEntry, .searchResultItem, .articleCitation, .m-result');if($articleEntry.length){data.doi=$articleEntry.find(':input[name="doi"]').val();if(!data.doi){data.pii=$articleEntry.find(':input[name="pii"]').val();}}
if(!data.doi&&!data.pii){var href=$this.attr('href');if(typeof href=='undefined'){var link=$this.closest('a');href=link.attr('href');}
if(href.includes("doi")){var doi=href.split("/doi/")[1];var doiPattern=new RegExp('^10\\.\\d\\d\\d\\d(\\d*)/(.+)');if(doiPattern.test(doi)){data.doi=doi;}else{data.doi=doi.substring(doi.indexOf('/')+1);}}else if(href.includes("article/")){var pii=href.split("/article/")[1];data.pii=pii.substring(0,pii.indexOf("/"));}}
extractCommonData.call(this,data,options,event);return data;}
function extractDataForPagination(options,event){var data={};var $this=$(this);var page=$this.text();if(page){data.SearchResultsPageClicked=page;}
extractCommonData(data,options,event);return data;}})();
$(document).ready(function(){$(".allowance__trigger").click(function(){$(".allowance__text").toggleClass("hidden");$(".allowance__message .arrow_d_n").toggleClass("openAllowance");});$(".preview_button").click(function(){$(".preview__modal.popup").removeClass("hidden");$("body.pb-ui").addClass("noscroll");});$(".preview__modal .icon-preview-close_thin,.preview__options .btn-cancel,.preview__content .close").click(function(){$(".preview__modal.popup").addClass("hidden");$("body.pb-ui").removeClass("noscroll");})});var commerce = {};

commerce.page = {};

commerce.page.cart = {};literatum.utils = {
    send: function (request, callback, error) {
        if (!request)
            return;

        request.ajaxRequest = true;

        return $.ajax({
            url: '/action/' + request.action,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            crossDomain: true,
            xhrFields: {withCredentials: true},
            data: request,
            success: callback,
            error: error
        });
    },
    copyForm: function (source, to) {
        $(source).find('input').each(function () {
            var name = $(this).attr('name');
            var targetField = $(to).find("input[name='" + name + "']");
            targetField.val($(this).val());
        });

        $(source).find('select').each(function () {
            var value = $(this).find('option:selected').val();
            $(to).find("select[name='" + $(this).attr('name') + "']").find("option[value='" + value + "']").attr('selected', '');
        });
    },
    clearForm: function (form) {
        $(form).click(function () {
            $(this).find("input[type=text], select, textarea").val('');
        });
    },
    hasErrors: function (attributes) {
        var hasErrors = false;
        Object.keys(attributes).forEach(function (key) {
            hasErrors |= (key.toLowerCase().indexOf("error") > -1);
        });
        return hasErrors;
    },
    hasAttributes: function (attributes) {
        return attributes && Object.keys(attributes).length > 0;
    },
    scroll: function(selector, speed, offset) {
        var $object = null;

        if (selector instanceof jQuery) {
            $object = selector;
        } else {
            $object = $(selector);
        }

        if (!$object || $object.length == 0)
            return;

        if (typeof speed === 'undefined') {
            speed = 2000;
        }

        if (typeof offset === 'undefined') {
            offset = $object.offset().top;
        } else {
            offset = $object.offset().top - offset
        }

        $('html, body').animate({
            scrollTop: offset
        }, speed);
    },
    nextCheckoutSection: function () {
        var $widget = $(".eCommerceCheckoutFieldsWidget .scroll-focus").closest('.widget');
        if ($(window).width() > 992) {
            literatum.utils.scroll($widget, 800, 10);
        }else{
            literatum.utils.scroll($widget, 800, 60);
        }
    },
    getCountryState: function(iso2Alpha, callback) {
        return literatum.utils.send({
            action: 'getCountryStates',
            country: iso2Alpha
        }, callback);
    }
};


///////////////////////////////// TEMP

/*$(".add-to-cart").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("opened");
    $(this).find(".purchaseArea").slideToggle();

    var purchaseAreaWidth = $(this).parent().width();
    $(this).find(".purchaseArea").css('width', purchaseAreaWidth);

});*/

if ($(".add-to-cart").length > 0) {
    $("body").click(function (e) {
        var $target = $(e.target);
        if (!$target.hasClass("add-to-cart") && $target.closest(".add-to-cart").length == 0) {
            $(".add-to-cart").removeClass("opened");
            $(".add-to-cart").find(".purchaseArea").slideUp();
        }
    });
}

// Needs review
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    console.log("Form");
    console.log(a);
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};commerce.cart = (function () {
    var instance = {};
    var cartInfo;
    var listeners = {};
    var callbacks = [];
    var errorHandler;

    function triggerRefresh(updatedCartInfo) {
        console.log("Trying to refresh current cart state...");

        Object.keys(listeners).forEach(function(key) {
            commerce.cart.notify(key, updatedCartInfo);
        });

        cartInfo = updatedCartInfo;
    }

    instance.refresh = function () {
        literatum.utils.send({
            action: 'showCart'
        }, triggerRefresh, errorHandler);
    };

    instance.identity = {
        name: 'identity',
        guest: function (email, acceptTermsConditions) {
            literatum.utils.send({
                action: 'guestCheckout',
                email: email,
                acceptTermsConditions: acceptTermsConditions
            }, commerce.cart.identity.refresh, errorHandler);
        },
        login: function (email, password) {
            literatum.utils.send({
                action: 'doLogin',
                email: email,
                password: password
            }, commerce.cart.identity.refresh, errorHandler);
        },
        registration: function (email) {
            literatum.utils.send({
                action: 'register',
                email: email
            }, commerce.cart.identity.refresh, errorHandler);
        },
        clear: function () {
            literatum.utils.send({
                action: 'resetCartAction'
            }, commerce.cart.identity.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.identity, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.identityHash != updatedCartInfo.identityHash);
        }
    };

    instance.buyingList = {
        name: 'buyingList',
        addItem: function (itemId) {
            literatum.utils.send({
                action: 'addToCart',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        remove: function (itemId) {
            literatum.utils.send({
                action: 'removeCartItem',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        decreaseQuantity: function (itemId) {
            literatum.utils.send({
                action: 'decreaseQuantity',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        increaseQuantity: function (itemId) {
            literatum.utils.send({
                action: 'increaseQuantity',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.buyingList, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.buyingItemHash != updatedCartInfo.buyingItemHash);
        }
    };

    instance.restoreAccess = {
        name: 'restoreAccess',
        request: function(email) {
            literatum.utils.send({
                action: 'restoreContentAccess',
                email: email
            }, commerce.cart.restoreAccess.refresh, errorHandler);
        },
        refresh: function(cartInfo) {
            commerce.cart.notify(commerce.cart.restoreAccess, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return true;
        }
    };

    instance.discounts = {
        name: 'discounts',
        apply: function (discountCode) {
            literatum.utils.send({
                action: 'applyDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        remove: function (discountCode) {
            literatum.utils.send({
                action: 'removeDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        enable: function (discountCode) {
            literatum.utils.send({
                action: 'enableDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        disable: function (discountCode) {
            literatum.utils.send({
                action: 'disableDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.discounts, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.cartHash != updatedCartInfo.cartHash);
        }
    };

    instance.summary = {
        name: 'summary',
        refresh: function () {
            commerce.cart.notify(commerce.cart.summary, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.cartHash != updatedCartInfo.cartHash);
        }
    };

    instance.shipping = {
        name: 'shipping',
        update: function (form) {
            var request = {};
            $.extend(request, {
                action: 'updateShippingAddress'
            }, form);
            literatum.utils.send(request, commerce.cart.shipping.refresh, errorHandler);
        },
        getShippingCosts: function(country, callback) {
            literatum.utils.send({
                action: 'getShippingCosts',
                country: country
            }, callback);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.shipping, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.shippingHash != updatedCartInfo.shippingHash || cartInfo.buyingItemHash != updatedCartInfo.buyingItemHash);
        }
    };

    instance.tax = {
        name: 'tax',
        update: function (form) {
            var request = {};
            $.extend(request, {
                action: 'updateTax'
            }, form);
            literatum.utils.send(request, commerce.cart.tax.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.tax, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.cartHash != updatedCartInfo.cartHash);
        }
    };

    instance.billing = {
        name: 'billing',
        update: function (form) {
            var request = {};
            $.extend(request, {
                action: 'updateBillingAddress'
            }, form);
            literatum.utils.send(request, commerce.cart.billing.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.billing, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.billingHash != updatedCartInfo.billingHash);
        }
    };

    instance.savedItems = {
        name: 'savedItems',
        saveById: function (itemId) {
            literatum.utils.send({
                action: 'saveItem',
                id: itemId
            }, commerce.cart.savedItems.refresh, errorHandler);
        },
        saveByDoi: function (doi) {
            literatum.utils.send({
                action: 'saveItem',
                doi: doi
            }, commerce.cart.savedItems.refresh, errorHandler);
        },
        remove: function (id) {
            literatum.utils.send({
                action: 'removeSavedItem',
                id: id
            }, commerce.cart.savedItems.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.savedItems, cartInfo);
        },
        changed: function(updatedCartInfo) {
            return (cartInfo == null || cartInfo.savedItemsHash != updatedCartInfo.savedItemsHash);
        }
    };


    instance.register = function (service, callback) {
        console.log("Commerce Cart :: Registering service " + service.name + " listener...");
        if (service) {
            if (!listeners[service.name]) {
                listeners[service.name] = [];
            }
            listeners[service.name].push(callback);
        }
    };
    instance.notify = function (service, updatedCartInfo) {
        if (updatedCartInfo) {
            if (updatedCartInfo.sessionChanged) {
                location.reload();
                return;
            }
        }
        if (updatedCartInfo && cartInfo) {
            if (cartInfo.sessionHash != updatedCartInfo.sessionHash) {
                location.reload();
                return;
            }
        }

        var result = [];

        console.log("Commerce Cart :: Notifying " + service.name + " listeners...");
        if (service && service.changed && service.changed(updatedCartInfo) || literatum.utils.hasAttributes(updatedCartInfo.attributes)) {
            if (listeners[service.name]) {
                listeners[service.name].forEach(function (listener) {
                    var value = listener(updatedCartInfo);
                    result.push(value);
                });
            }
        }

        var clone = callbacks;

        $.when.apply($, result).then(function() {
            clone.forEach(function(callback) {
                callback();
            });
        });

        commerce.cart.clearCallbacks();

        if (updatedCartInfo) {
            cartInfo = updatedCartInfo;
        }
    };

    instance.setErrorHandler = function(handler) {
        errorHandler = handler;
    };

    instance.addCallback = function(callback) {
        callbacks.push(callback);
    };

    instance.clearCallbacks = function() {
        callbacks = [];
    };

    return instance;
}());
console.log("Cart Service initialized!");
// Later might be a better idea to create form objects so they can be overridden and each handled separately
commerce.validators = (function() {
    var instance = {};

    var creditCardsPattern = {};
    creditCardsPattern['visa'] = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    creditCardsPattern['mastercard'] = new RegExp("^5[1-5][0-9]{14}$");
    creditCardsPattern['amex'] = new RegExp("^3[47][0-9]{13}$");
    creditCardsPattern['dinner'] = new RegExp("^3(?:0[0-5]|[68][0-9])[0-9]{11}$");
    creditCardsPattern['discover'] = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
    creditCardsPattern['jcb'] = new RegExp("^(?:2131|1800|35\\d{3})\\d{11}$");

    instance.creditcard = function(value, element) {

        var number = value.match(/\d/g);

        if (!number)
            return true;

        value = number.join("");

        var invalid = true;

        $(element).closest(".input-group").prop("class", "input-group cc-number");
        Object.keys(creditCardsPattern).forEach(function(k) {
            if (creditCardsPattern[k].test(value) && invalid && /^\d+$/.test($("#realNumber").val())) {
                invalid = false;
                $(element).closest(".input-group").addClass(k);
            }
        });
        return invalid;
    };

    instance.creditcardDate = function (value, element, form) {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth(5) + 1;
        var currentYear = currentDate.getFullYear();
        var monthExpiry = form.find("select[name='expMonth']").val();
        var yearExpiry = form.find("select[name='expYear']").val();
        var expireMonth = parseInt(monthExpiry);
        var expireYear = parseInt(yearExpiry);

        var expireDate = new Date();
        expireDate.setMonth(expireMonth-1);
        expireDate.setYear(expireYear);

        if (currentYear > expireYear) {
            return true;
        }

        if (currentMonth > expireMonth && monthExpiry == "00") {
            return true;
        }

        return expireDate < currentDate;
    };

    instance.notEmpty =  function(value) {
        return !(!!(value));
    };

    instance.validate = function(form) {
        var $form = null;
        var invalid = true;

        if (form instanceof jQuery) {
            $form = form;
        } else {
            $form = $(form);
        }

        $form.find("input[data-validate]").each(function() {
            var $this = $(this);
            invalid = commerce.validators.validateField($this, $form) && invalid;
        });
        return invalid;
    };

    instance.validateField = function(field, form) {
        var $field = null;

        if (field instanceof jQuery) {
            $field = field;
        } else {
            $field = $(field);
        }

        var validatorName = $field.data("validate");
        var validator = instance[validatorName];
        var value = $field.val();
        return validator(value, $field, form);
    };

    instance.securityCode = function (value) {
        return !(/^[0-9]{3,4}$/.test(value));
    };

    return instance;
}());commerce.binders = (function() {
    var instance = {};

    instance.removeDiscount = function(e) {
        e.preventDefault();
        commerce.cart.discounts.remove($(this).data('discount'));
    };

    instance.disableDiscount = function(e) {
        e.preventDefault();
        commerce.cart.discounts.disable($(this).data('discount'));
    };

    instance.removeItem = function(e) {
        e.preventDefault();
        commerce.cart.buyingList.remove($(this).data("item-id"));
    };







    instance.submitBilling = function(e) {
        e.preventDefault();
        commerce.cart.billing.update($("form.billing").serializeObject());
    };

    instance.editBilling = function(e) {
        e.preventDefault();
        literatum.widgets.billing.render({}, {editing: true});
    };

    instance.expandBilling = function(e) {
        e.preventDefault();
        $(".billingAddress").slideToggle();
    };

    instance.sameAsShipping = function(e) {
        if ($(this).is(":checked")) {
            literatum.utils.copyForm('.checkoutShipping form', '.billingPayment form')
        } else {
            literatum.utils.clearForm('.billingPayment form');
        }
    };

    instance.countryChanged = function(e) {
        var countryCode = $(this).val();

        var $state = $(this).closest("form").find("select[name='state']");

        if ($state.find("option[data-country='" + countryCode + "']").length > 0) {
            $state.find("option:not([data-country='" + countryCode + "'])").hide();
            $state.find("option[data-country='" + countryCode + "']").show();
            if (!$state.is(":visible")) {
                $state.parent().slideDown(); // review
            }
        } else {
            $state.parent().slideUp(); // review
        }

        $state.val(null);
    };

    instance.bind = function() {
        $("*[data-bind]").each(function() {
            var binderName = $(this).data("bind");
            console.log("Binding '" + binderName + "' to element '" + this + "'");
            var binder = instance[binderName];
            $(this).on('click', binder);
        });
    };

    instance.unbind = function() {
        $("*[data-bind]").each(function() {
            try {
                var binderName = $(this).data("bind");
                //console.log("Unbinding '" + binderName + "' to element '" + this + "'");
                var binder = instance[binderName];
                $(this).off('click', binder);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return instance;
}());

function registerListeners() {
    // Always unbind before binding again
    try {
        commerce.binders.unbind();
    } catch(e) {
        console.log(e);
    }
    try {
        //console.log("Binding events to candidate elements");
        commerce.binders.bind();
    } catch (e) {
        //console.log("Failed to bind events, rolling back...");
        commerce.binders.unbind();
    }
}
;commerce.Notification = function(element) {
    if (element instanceof jQuery) {
        this.$element = element;
    } else {
        this.$element = $(element);
    }
    this.$p = $(this.$element.find("p"));
};

commerce.Notification.dummy = new commerce.Notification("<div></div>");

commerce.Notification.prototype.show = function() {
    this.$element.show();
};

commerce.Notification.prototype.showFlex = function() {
    this.$element.css('display','flex');
};

commerce.Notification.get = function(element) {
    return new commerce.Notification(element);
};

commerce.Notification.create = function(element) {
    if (!(element instanceof jQuery)) {
        element = $(element);
    }
    element.html("<p></p>");
    return new commerce.Notification(element);
};

commerce.Notification.prototype.hide = function() {
    this.$element.hide();
};

commerce.Notification.prototype.reset = function() {
    this.$p.removeClass("itemAddedMsgBox");
    this.$p.removeClass("errorMsgBox");
    this.$element.hide();
};

commerce.Notification.prototype.error = function() {
    this.$p.removeClass("itemAddedMsgBox");
    this.$p.addClass("errorMsgBox");
    this.$p.parent(".purchaseMessage").addClass("errorMsgParent");
};

commerce.Notification.prototype.warning = function() {
    this.$p.removeClass("itemAddedMsgBox");
    this.$p.addClass("errorMsgBox");
};

commerce.Notification.prototype.info = function() {
    this.$p.removeClass("errorMsgBox");
    this.$p.addClass("itemAddedMsgBox");
};

commerce.Notification.prototype.setMessage = function(message) {
    this.$p.html(message);
};

/////////////////////////////////////////
commerce.FieldNotification = function(element) {
    if (element instanceof jQuery) {
        this.$element = element;
    } else {
        this.$element = $(element);
    }
    this.$message = $(this.$element.find(".message"));
    this.$label = $(this.$element.find(".label"));
    this.$show = $(this.$element.find(".field-info"));
};


commerce.FieldNotification.prototype.show = function() {
    if (this.$message.text().length > 0) {
        this.$show.show();
    } else {
        this.$show.hide();
    }
};

commerce.FieldNotification.get = function(element) {
    return new commerce.FieldNotification(element);
};

commerce.FieldNotification.prototype.hide = function() {
    this.$show.hide();
};

commerce.FieldNotification.prototype.error = function() {
    this.$label.removeClass("warning");
    this.$label.removeClass("info");
    this.$label.addClass("error");
};

commerce.FieldNotification.prototype.warning = function() {
    this.$label.removeClass("error");
    this.$label.removeClass("info");
    this.$label.addClass("warning");
};

commerce.FieldNotification.prototype.info = function() {
    this.$label.removeClass("warning");
    this.$label.removeClass("error");
    this.$label.addClass("info");
};

commerce.FieldNotification.prototype.reset = function() {
    this.hide();
    this.$label.removeClass("warning");
    this.$label.removeClass("error");
    this.$label.removeClass("info");
    this.setMessage("");
};

commerce.FieldNotification.prototype.setMessage = function(message) {
    this.$message.html(message);
};commerce.BuyingItemWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.summary);
};

commerce.BuyingItemWidget.prototype = new literatum.Widget();

commerce.BuyingItemWidget.id = 'eCommerceCheckoutBuyingItemsWidget';
commerce.BuyingItemWidget.action = '/pb/widgets/commerce/buyingItems';

commerce.BuyingItemWidget.notifications = {
    info: commerce.Notification
};

commerce.BuyingItemWidget.binders = {
    applyDiscount: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.apply(widget.find("input[name='discount']").val());
    },
    removeDiscount: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.remove($(this).data('discount'));
    },
    disableDiscount: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.disable($(this).data('discount'));
    },
    enableDiscount: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.enable($(this).data('discount'));
    },
    saveItem: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var itemId = $(this).data("item-id");
        if (itemId) {
            commerce.cart.savedItems.saveById(itemId);
        } else {
            commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));
        }
    },
    removeItem: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.buyingList.remove($(this).data("item-id"));
    },
    increaseQuantity: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.buyingList.increaseQuantity($(this).data("item-id"));
    },
    decreaseQuantity: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.buyingList.decreaseQuantity($(this).data("item-id"));
    }
};

commerce.BuyingItemWidget.prototype.reset = function() {
    Object.getPrototypeOf(commerce.BuyingItemWidget.prototype).reset.call(this);
    this.find("input[name='discount']").removeClass("errorMsg");
    this.find(".promoCodeMsg .errorMsg").hide();
    this.find(".promoCodeMsg .infoMsg").hide();
};

commerce.BuyingItemWidget.infoHandlers = {
    discountError: function(message, widget) {
        widget.find(".promoCodeMsg .infoMsg").hide();
        widget.find("input[name='discount']").addClass("errorMsg");
        var $error = widget.find(".promoCodeMsg .errorMsg");
        $error.html(message);
        $error.show();
    },
    discountInfo: function(message, widget) {
        widget.find(".promoCodeMsg .errorMsg").hide();
        widget.find("input[name='discount']").removeClass("errorMsg");
        var $info = widget.find(".promoCodeMsg .infoMsg");
        $info.html(message);
        $info.show();
    },
    discount: function(message, widget) {
        $(widget.find("input[name='promoCode']")).val(message);
    },
    savedItemError: function(message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    },
    error: function(message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    }
};

commerce.BuyingItemWidget.prototype.registerListeners = function() {
    Object.getPrototypeOf(commerce.BuyingItemWidget.prototype).registerListeners.call(this);

    var widget = this;

    var $applyButton = this.find("#applyDiscountForm input.applyDiscount");
    var $discountField = this.find("input[name='discount']");

    $discountField.on('keyup', function () {
        if ($discountField.val()) {
            $applyButton.addClass('primary');
            $applyButton.prop('disabled', false);
        } else {
            $applyButton.removeClass('primary');
            $applyButton.prop('disabled', true);
            widget.find(".promoCodeMsg .errorMsg").hide();
            widget.find("input[name='discount']").removeClass("errorMsg");
            var $info = widget.find(".promoCodeMsg .infoMsg");
            $info.html(message);
            $info.show();
        }
    });
};

commerce.BuyingItemWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.BuyingItemWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.BuyingItemWidget.id);
};

literatum.widgets.register(commerce.BuyingItemWidget);
commerce.SavedItemsWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.SavedItemsWidget.prototype = new literatum.Widget();

commerce.SavedItemsWidget.id = 'eCommerceCheckoutSavedForLaterItemsWidget';
commerce.SavedItemsWidget.action = '/pb/widgets/commerce/savedItems';

commerce.SavedItemsWidget.notifications = {
    info: commerce.Notification
};

commerce.SavedItemsWidget.binders = {
    saveItem: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var itemId = $(this).data("item-id");
        if (itemId) {
            commerce.cart.savedItems.saveById(itemId);
        } else {
            commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));
        }
    },
    removeSavedItem: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.savedItems.remove($(this).data("item-id"));
    },
    expand: function (e) {
        e.preventDefault();
        $(this).closest(".add-to-cart").toggleClass("opened");
        var offerVisibility = $(this).next(".purchaseArea").is(':visible');
        $(".purchaseArea").slideUp();
        if (!offerVisibility) {
            $(this).next(".purchaseArea").slideToggle();
            var subject = $(".demo");
            if (e.target.id != subject.attr('id')) {
                subject.show();
            }
        }
    },
    addItem: function(e, widget) {
        if (!$(e.target).parents('.disable-click').length) {
            var loading = new literatum.FullPageLoading();
            loading.start();
            commerce.cart.addCallback(loading.done);
            e.preventDefault();
            var key = $(this).attr("data-key");
            commerce.cart.buyingList.addItem(key);
        }
    }
};

commerce.SavedItemsWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.SavedItemsWidget.prototype).registerListeners.call(this);
    if ($(window).width() >= 992) {
        $(document).on('touchend click', function (e) {
            var container = $(".demoContainer");
            if (!$(e.target).closest('.superDemo').length) {
                $(".add-to-cart.opened").removeClass("opened");
                container.hide();
                container.find('.add-journal-to-cart').removeClass('disable-click');
                container.find('.add-journal-to-cart header').removeClass('open');
                container.find('.add-journal-to-cart').css('margin-bottom', '10px');
                e.stopPropagation();
            }
        });
    }
};

commerce.SavedItemsWidget.infoHandlers = {
    savedItemError: function (message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    }
};


commerce.SavedItemsWidget.find = function () {
    var $result = $("*[data-widget-def='" + commerce.SavedItemsWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.SavedItemsWidget.id);
};

literatum.widgets.register(commerce.SavedItemsWidget);
commerce.RecommendedWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.RecommendedWidget.prototype = new literatum.Widget();

commerce.RecommendedWidget.id = 'eCommerceCheckoutRecommendedItemsWidget';
commerce.RecommendedWidget.action = '/pb/widgets/commerce/recommended';

commerce.RecommendedWidget.binders = {
    expand: function (e) {
        e.preventDefault();
        $(this).closest(".add-to-cart").toggleClass("opened");
        var offerVisibility = $(this).next(".purchaseArea").is(':visible');
        $(".purchaseArea").slideUp();
        if (!offerVisibility) {
            $(this).next(".purchaseArea").slideToggle();
            var subject = $(".demo");
            if (e.target.id != subject.attr('id')) {
                subject.show();
            }
        }
    },
    addItem: function(e) {
        if (!$(e.target).parents('.disable-click').length) {
            var loading = new literatum.FullPageLoading();
            loading.start();
            commerce.cart.addCallback(loading.done);
            e.preventDefault();
            var key = $(this).attr("data-key");
            commerce.cart.buyingList.addItem(key);
        }
    },
    saveItem: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var itemId = $(this).data("item-id");
        if (itemId) {
            commerce.cart.savedItems.saveById(itemId);
        } else {
            commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));
        }
    }
};

commerce.RecommendedWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.RecommendedWidget.prototype).registerListeners.call(this);
    if ($(window).width() >= 992) {
        $(document).on('touchend click', function (e) {
            var container = $(".demoContainer");
            if (!$(e.target).closest('.superDemo').length) {
                $(".add-to-cart.opened").removeClass("opened");
                container.hide();
                container.find('.add-journal-to-cart').removeClass('disable-click');
                container.find('.add-journal-to-cart header').removeClass('open');
                container.find('.journal-options-expanded').hide();
                container.find('.add-journal-to-cart').css('margin-bottom', '10px');
                e.stopPropagation();
            }
        });
    }
};


commerce.RecommendedWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.RecommendedWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RecommendedWidget.id);
};

literatum.widgets.register(commerce.RecommendedWidget);
commerce.RecentlyViewedWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.RecentlyViewedWidget.prototype = new literatum.Widget();

commerce.RecentlyViewedWidget.id = 'eCommerceCheckoutRecentlyViewedItemsWidget';
commerce.RecentlyViewedWidget.action = '/pb/widgets/commerce/recentlyViewed';

commerce.RecentlyViewedWidget.binders = {
    expand: function (e) {
        e.preventDefault();
        $(this).closest(".add-to-cart").toggleClass("opened");
        var offerVisibility =$(this).next(".purchaseArea").is(':visible');
        $(".purchaseArea").slideUp();
        if (!offerVisibility) {
            $(this).next(".purchaseArea").slideToggle();
            var subject = $(".demo");
            if (e.target.id != subject.attr('id')) {
                subject.show();
            }
        }
    },
    addItem: function(e, widget) {
        if (!$(e.target).parents('.disable-click').length) {
            var loading = new literatum.FullPageLoading();
            loading.start();
            commerce.cart.addCallback(loading.done);
            e.preventDefault();
            var key = $(this).attr("data-key");
            commerce.cart.buyingList.addItem(key);
        }
    },
    saveItem: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var itemId = $(this).data("item-id");
        if (itemId) {
            commerce.cart.savedItems.saveById(itemId);
        } else {
            commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));
        }
    }
};

commerce.RecentlyViewedWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.RecentlyViewedWidget.prototype).registerListeners.call(this);
    if ($(window).width() >= 992) {
        $(document).on('touchend', function (e) {
            var container = $(".demoContainer");
            if (!$(e.target).closest('.superDemo').length) {
                $(".add-to-cart.opened").removeClass("opened");
                container.hide();
                container.find('.add-journal-to-cart').removeClass('disable-click');
                container.find('.add-journal-to-cart header').removeClass('open');
                container.find('.journal-options-expanded').hide();
                container.find('.add-journal-to-cart').css('margin-bottom', '10px');
                e.stopPropagation();
            }
        });
    }
};

commerce.RecentlyViewedWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.RecentlyViewedWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RecentlyViewedWidget.id);
};

literatum.widgets.register(commerce.RecentlyViewedWidget);
commerce.OrderSummaryWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.tax);
    this.register(commerce.cart.summary);
};

commerce.OrderSummaryWidget.prototype = new literatum.Widget();

commerce.OrderSummaryWidget.id = 'eCommerceCheckoutSummaryWidget';
commerce.OrderSummaryWidget.action = '/pb/widgets/commerce/orderSummary';

commerce.OrderSummaryWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.OrderSummaryWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.OrderSummaryWidget.id);
};

literatum.widgets.register(commerce.OrderSummaryWidget);
commerce.IdentityWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.IdentityWidget.prototype = new literatum.Widget();

commerce.IdentityWidget.id = 'eCommerceCheckoutIdentityWidget';
commerce.IdentityWidget.action = '/pb/widgets/commerce/identity';

commerce.IdentityWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.IdentityWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.IdentityWidget.id);
};

commerce.IdentityWidget.notifications = {
    identity: commerce.Notification,
    email: commerce.FieldNotification,
    acceptTermsConditions: commerce.FieldNotification
};

commerce.IdentityWidget.binders = {
    guest: function(e, widget) {
        e.preventDefault();
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        var acceptTermsConditions = widget.find("input[name='acceptTermsConditions']").is(":checked");
        commerce.cart.identity.guest(widget.find("input[name='email'].user").val(), acceptTermsConditions);
    },
    showUserLogin: function(e, widget) {
        e.preventDefault();
        var $loginForm = widget.find(".frmLogin");
        var email = widget.find("input[name='email'].user").val();

        widget.find(".checkoutLogin").hide();
        if($loginForm.length >0) {
            $loginForm.show();
            if (email != undefined) {
                $loginForm.find("input[name='login']").val(email).focus();
            }
        }
    },
    register: function(e, widget) {
        var email = widget.find("input[name='email'].user").val();
        if (email) {
            e.preventDefault();
            window.location = "/action/registration?email=" + encodeURIComponent(email) + "&redirectUri=" + encodeURIComponent(location.href);
        }
    },
    cancelLogin: function(e, widget) {
        e.preventDefault();
        var notification =  widget.getNotification("identity");
        if (notification) {
            notification.reset();
        }
        widget.find(".message.error").remove();
        widget.find(".checkoutLogin").show();
        if(widget.find(".frmLogin").length >0) {
            widget.find(".frmLogin").hide();
        }
    },
    userLogin: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
    },
    resetCart: function(e) {
        //e.preventDefault();
        //commerce.cart.identity.clear();
        var loading = new literatum.FullPageLoading();
        loading.start();
    },
    expand: function(e, widget) {
        widget.find(".checkout-expand").slideToggle();
    }
};

commerce.IdentityWidget.prototype.registerListeners = function() {
    Object.getPrototypeOf(commerce.IdentityWidget.prototype).registerListeners.call(this);

    if(this.find(".frmLogin").length >0) {
        var $loginInput = this.find(".frmLogin .login");
        var $passwordInput = this.find(".frmLogin .password");
        var $continueButton = this.find(".frmLogin input[type='submit']");

        $continueButton.removeClass("primary");
        $continueButton.prop('disabled', true);

        $loginInput.on('keyup', function () {
            if ($loginInput.val() && $passwordInput.val()) {
                $continueButton.addClass("primary");
                $continueButton.prop('disabled', false);
            } else {
                $continueButton.removeClass("primary");
                $continueButton.prop('disabled', true);
            }
        });

        $passwordInput.on('keyup', function () {
            if ($loginInput.val() && $passwordInput.val()) {
                $continueButton.addClass("primary");
                $continueButton.prop('disabled', false);
            } else {
                $continueButton.removeClass("primary");
                $continueButton.prop('disabled', true);
            }
        });
    }
};

commerce.IdentityWidget.prototype.triggerInfoHandlers = function (widget, model) {
    Object.getPrototypeOf(commerce.IdentityWidget.prototype).triggerInfoHandlers.call(this, widget, model);

    widget.find("input,select").each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        var errorName = name + "Error";
        var notification = widget.getNotification(name);
        if (notification) {
            notification.reset();
            if (model && model.attributes && model.attributes[errorName]) {
                notification.error();
                notification.setMessage(model.attributes[errorName]);
                notification.show();
            }
        }
    });
};

commerce.IdentityWidget.infoHandlers = {
    identityError: function(message, widget) {
        var notification = widget.getNotification("identity");
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    },
    emailError: function(message, widget) {
        var notification = widget.getNotification("email");
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    },
    acceptTermsConditionsError: function(message, widget) {
        var notification = widget.getNotification("acceptTermsConditions");
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    }
};

literatum.widgets.register(commerce.IdentityWidget);
commerce.ShippingWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.shipping);
};

commerce.ShippingWidget.prototype = new literatum.Widget();

commerce.ShippingWidget.id = 'eCommerceCheckoutShippingWidget';
commerce.ShippingWidget.action = '/pb/widgets/commerce/shipping';

commerce.ShippingWidget.notifications = {
    info: commerce.Notification,
    givennames: commerce.FieldNotification,
    surname: commerce.FieldNotification,
    email: commerce.FieldNotification,
    phone: commerce.FieldNotification,
    organization: commerce.FieldNotification,
    address1: commerce.FieldNotification,
    address2: commerce.FieldNotification,
    city: commerce.FieldNotification,
    country: commerce.FieldNotification,
    state: commerce.FieldNotification,
    zipCode: commerce.FieldNotification,
    shippingCost: commerce.FieldNotification

};

commerce.ShippingWidget.prototype.lostFocus = function() {
    if (this.find("form").length) {
        return literatum.widgets.render(this, {}, {});
    }
};

commerce.ShippingWidget.binders = {
    editShipping: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        e.preventDefault();

        var d = literatum.widgets.render(widget, {}, {editing: true});
        literatum.widgets.all().forEach(function(item) {
            if (widget.widgetDef.id != item.widgetDef.id) {
                d = d.then(item.lostFocus());
            }
        });
        d.then(function() {
            literatum.utils.nextCheckoutSection();
            loading.done();
        });
    },
    submitShipping: function(e, widget) {
        e.preventDefault();
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        commerce.cart.shipping.update(widget.find("form").serializeObject());
    },
    shippingOptions: function(e, widget) {
        e.preventDefault();
        var forms = widget.collectForms();
        commerce.cart.shipping.shippingOptions(forms.shipping.country, forms.shipping.state)
    },
    expand: function(e, widget) {
        widget.find(".checkout-expand").slideToggle();
    },
    countryChanged: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        var notification = widget.getNotification('shippingCost');
        if (notification) {
            notification.reset();
        }
        var countryCode = $(this).val();
        if (countryCode == "US"){
            widget.find(".zipcode label").text(widget.find(".zipcode-text").text())
        }else{
            widget.find(".zipcode label").text(widget.find(".postcode-text").text())
        }

        literatum.utils.getCountryState(countryCode, function (model) {
            var $states = widget.find(".state");
            var $select = $states.find("select");

            if (e.type == 'change') {
                $select.val(null);
            }

            $select.find("option:not([value='-1'])").remove();
            if (model.states.length > 0) {
                model.states.forEach(function (item) {
                    $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>'); // seriously?!
                });

                $states.show();
            } else {
                $states.hide();
            }

            commerce.cart.shipping.getShippingCosts(countryCode, function(model) {
                if (model.shippingOptions.length != 1) {
                    var $shippingOptions = widget.find(".shipping-cost-select");
                    var $select = $shippingOptions.find("select");
                    $select.find("option:not([value='-1'])").remove();
                    model.shippingOptions.forEach(function (item) {
                        $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>'); // seriously?!
                    });
                    if (model.error) {
                        notification.reset();
                        notification.error();
                        notification.setMessage(model.error);
                        notification.show();
                    }
                    widget.find(".shipping-cost-one input").prop('disabled', true);
                    widget.find(".shipping-cost-select select").prop('disabled', false);
                    widget.find(".shipping-cost-one").hide();
                    widget.find(".shipping-cost-select").show();
                } else {
                    widget.find(".shipping-cost-select select").prop('disabled', true);
                    widget.find(".shipping-cost-one input[name='shippingCost']").prop('disabled', false);
                    widget.find(".shipping-cost-select").hide();
                    widget.find("input[name='shippingCost']").val(model.shippingOptions[0].id);
                    widget.find("input[name='shippingCostDescription']").val(model.shippingOptions[0].description);
                    widget.find(".shipping-cost-one").show();
                }
                loading.done();
            });
        });
    },
    selectAddress: function(e, widget) {
        var addressUuid = $(this).val();
        if (e.type == 'change'){
            if (addressUuid != '-1') {
                var loading = new literatum.FullPageLoading();
                loading.start();
                widget.render({}, {editing: true, uuid: addressUuid}, function () {
                    var $country = widget.find("select[name='country']");
                    if ($country.val() != '') {
                        commerce.cart.shipping.getShippingCosts($country.val(), function(model) {
                            if (model.shippingOptions.length != 1) {
                                var $shippingOptions = widget.find(".shipping-cost-select");
                                var $select = $shippingOptions.find("select");
                                $select.find("option:not([value='-1'])").remove();
                                model.shippingOptions.forEach(function (item) {
                                    $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>'); // seriously?!
                                });
                                if (model.error) {
                                    notification.reset();
                                    notification.error();
                                    notification.setMessage(model.error);
                                    notification.show();
                                }
                                widget.find(".shipping-cost-one input").prop('disabled', true);
                                widget.find(".shipping-cost-select select").prop('disabled', false);
                                widget.find(".shipping-cost-one").hide();
                                widget.find(".shipping-cost-select").show();
                            } else {
                                widget.find(".shipping-cost-select select").prop('disabled', true);
                                widget.find(".shipping-cost-one input[name='shippingCost']").prop('disabled', false);
                                widget.find(".shipping-cost-select").hide();
                                widget.find("input[name='shippingCost']").val(model.shippingOptions[0].id);
                                widget.find("input[name='shippingCostDescription']").val(model.shippingOptions[0].description);
                                widget.find(".shipping-cost-one").show();
                            }
                            loading.done();
                        });
                    } else {
                        loading.done();
                    }
                });
            } else {
                widget.updateForm('shipping', {});
            }
        }
    }
};

commerce.ShippingWidget.infoHandlers = {
    addressError: function(message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
        literatum.utils.scroll('.errorMsgBox:visible', 0);
    }
};

commerce.ShippingWidget.prototype.triggerInfoHandlers = function(widget, model) {
    Object.getPrototypeOf(commerce.ShippingWidget.prototype).triggerInfoHandlers.call(this, widget, model);

    widget.find("input,select").each(function() {
        var $this = $(this);
        var name = $this.attr('name');
        var errorName = name + "Error";
        var notification = widget.getNotification(name);
        if (notification) {
            notification.reset();
            if (model && model.attributes && model.attributes[errorName]) {
                notification.error();
                notification.setMessage(model.attributes[errorName]);
                notification.show();
            }
        }
    });

};

commerce.ShippingWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.ShippingWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.ShippingWidget.id);
};

literatum.widgets.register(commerce.ShippingWidget);
commerce.TaxWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.tax);
};

commerce.TaxWidget.prototype = new literatum.Widget();

commerce.TaxWidget.id = 'eCommerceCheckoutTaxWidget';
commerce.TaxWidget.action = '/pb/widgets/commerce/tax';

commerce.TaxWidget.prototype.lostFocus = function() {
    if (this.find("form").length) {
        return literatum.widgets.render(this, {}, {});
    }
};

commerce.TaxWidget.binders = {
    updateTax: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        e.preventDefault();

        var d = literatum.widgets.render(widget, {}, {editing: true});
        literatum.widgets.all().forEach(function(item) {
            if (widget.widgetDef.id != item.widgetDef.id) {
                d = d.then(item.lostFocus());
            }
        });
        d.then(function() {
            literatum.utils.nextCheckoutSection();
            loading.done();
        });
    },
    tax: function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.tax.update($("form.tax").serializeObject());
    }
};

commerce.TaxWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.TaxWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.TaxWidget.id);
};

literatum.widgets.register(commerce.TaxWidget);
commerce.BillingWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.BillingWidget.prototype = new literatum.Widget();

commerce.BillingWidget.id = 'eCommerceCheckoutBillingWidget';
commerce.BillingWidget.action = '/pb/widgets/commerce/billing';

commerce.BillingWidget.notifications = {
    info: commerce.Notification,
    givennames: commerce.FieldNotification,
    surname: commerce.FieldNotification,
    email: commerce.FieldNotification,
    phone: commerce.FieldNotification,
    organization: commerce.FieldNotification,
    address1: commerce.FieldNotification,
    address2: commerce.FieldNotification,
    city: commerce.FieldNotification,
    country: commerce.FieldNotification,
    state: commerce.FieldNotification,
    zipCode: commerce.FieldNotification
};

commerce.BillingWidget.prototype.lostFocus = function() {
    if (this.find("form").length) {
        return literatum.widgets.render(this, {}, {});
    }
};

commerce.BillingWidget.binders = {
    submitBilling: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.billing.update($("form[name='billing']").serializeObject());
    },
    editBilling: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();

        var d = literatum.widgets.render(widget, {}, {editing: true});
        literatum.widgets.all().forEach(function(item) {
            if (widget.widgetDef.id != item.widgetDef.id) {
                d = d.then(item.lostFocus());
            }
        });
        d.then(function() {
            literatum.utils.nextCheckoutSection();
            loading.done();
            var countryCode = $("#country").val();
            if (countryCode == "US"){
                widget.find(".zipcode label").text(widget.find(".zipcode-text").text())
            }else {
                widget.find(".zipcode label").text(widget.find(".postcode-text").text())
            }
        });
    },
    sameAsShipping: function (e, widget) {
        if ($(this).is(":checked")) {
            var shippingWidgets = literatum.widgets.get('eCommerceCheckoutShippingWidget');
            var shippingWidget = shippingWidgets[0];
            if (shippingWidget) {
                var forms = shippingWidget.collectForms();
                widget.updateForm('billing', forms['shipping'], true);
                widget.find("select[name='country']").change();
            }

            var identityWidgets = literatum.widgets.get('eCommerceCheckoutIdentityWidget');
            var identityWidget = identityWidgets[0];
            if (identityWidget) {
                var forms = identityWidget.collectForms();
                widget.updateForm('billing', forms['personal-info'], true);
            }
        } else {
            literatum.utils.clearForm('billing', {});
        }
    },
    placeOrder: function (e, widget) {
        if (!commerce.validators.validate(widget.find("form[name='apg']"))) {
            e.preventDefault();
        }
    },
    expand: function (e, widget) {
        widget.find(".checkout-expand").slideToggle();
    },
    countryChanged: function (e, widget) {
        if (e.type == 'change') {
            var loading = new literatum.FullPageLoading();
            loading.start();
            var countryCode = $(this).val();
            if (countryCode == "US"){
                widget.find(".zipcode label").text(widget.find(".zipcode-text").text())
            }else {
                widget.find(".zipcode label").text(widget.find(".postcode-text").text())
            }

            literatum.utils.getCountryState(countryCode, function (model) {
                var $states = widget.find(".state");
                var $select = $states.find("select");

                if (e.type == 'change') {
                    $select.val(null);
                }
                var shippingWidget;
                var shippingForm;
                if (literatum.widgets.get('eCommerceCheckoutShippingWidget').length !== 0){
                    shippingWidget = literatum.widgets.get('eCommerceCheckoutShippingWidget');
                    shippingForm = shippingWidget[0].collectForms()['shipping'];
                }
                else {
                    shippingForm = "";
                }

                var state = "";
                if(shippingForm!==undefined)
                    state = shippingForm['state'];

                $select.find("option:not([value='-1'])").remove();
                if (model.states.length > 0) {
                    model.states.forEach(function (item) {
                        if(state===item['id'])
                            $select.append('<option value="' + item['id'] + '" selected>' + item['description'] + '</option>');
                        else
                            $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>');
                    });

                    $states.show();
                } else {
                    $states.hide();
                }
                loading.done();
            });
        }
    },
    selectAddress: function (e, widget) {
        var addressUuid = $(this).val();
        if (e.type == 'change'){
            if (addressUuid != '-1') {
                var loading = new literatum.FullPageLoading();
                loading.start();
                widget.render({}, {editing: true, uuid: addressUuid}, function () {
                    loading.done();
                });
            } else {
                widget.updateForm('billing', {});
            }
        }
    }
};

commerce.BillingWidget.infoHandlers = {
    addressError: function (message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
        literatum.utils.scroll('.errorMsgBox:visible', 0);
    }
};

commerce.BillingWidget.prototype.triggerInfoHandlers = function (widget, model) {
    Object.getPrototypeOf(commerce.BillingWidget.prototype).triggerInfoHandlers.call(this, widget, model);

    widget.find("input,select").each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        var errorName = name + "Error";
        var notification = widget.getNotification(name);
        if (notification) {
            notification.reset();
            if (model && model.attributes && model.attributes[errorName]) {
                notification.error();
                notification.setMessage(model.attributes[errorName]);
                notification.show();
            }
        }
    });
};

commerce.BillingWidget.prototype.validateForm = function (cartInfo) {

};

commerce.BillingWidget.find = function () {
    var $result = $("*[data-widget-def='" + commerce.BillingWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.BillingWidget.id);
};

literatum.widgets.register(commerce.BillingWidget);
commerce.PaymentWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.tax);

    var $error = this.find('.errorMsgBox').not('.hidden');

    if ($error.length == 0) {
        $error = this.find(".label.error");
    }

    if ($error.length > 0) {
        commerce.page.cart.show();
        literatum.utils.scroll($error, 800, 100);
    }
};

commerce.PaymentWidget.prototype = new literatum.Widget();

commerce.PaymentWidget.id = 'eCommerceCheckoutPaymentWidget';
commerce.PaymentWidget.action = '/pb/widgets/commerce/payment';

commerce.PaymentWidget.notifications = {
    holderName: commerce.FieldNotification,
    realNumber: commerce.FieldNotification,
    creditcardDate: commerce.FieldNotification,
    secNumber: commerce.FieldNotification
};

commerce.PaymentWidget.binders = {
    expandPayment: function (e, widget) {
        e.preventDefault();
        widget.find(".payment").slideToggle();
    },
    placeOrder: function (e, widget) {
        var $form = widget.find("form[name='apg']");

        var valid = true;
        $form.find("input[data-validate],select[data-validate]").each(function () {
            var $this = $(this);
            var $group = $this.closest(".input-group");
            var invalid = commerce.validators.validateField($this, $form);
            var notification = widget.getNotification($group.data('notification'));
            if (!notification) {
                return;
            }
            if (invalid) {
                notification.reset();
                notification.setMessage('');
                notification.error();
                notification.show();
            } else {
                notification.reset()
            }
            valid = !invalid && valid;
        });

        if (!valid) {
            e.preventDefault();
        } else {
            var loading = new literatum.FullPageLoading();
            loading.setMessage("Do not close your browser while we are processing your payment"); // Figure out later how to move it to resource bundle
            loading.start();
        }
    },
    expand: function (e, widget) {
        var $header = widget.find(".checkout-expand");
        $header.stop(true, true);
        $header.slideToggle();
    }
};

commerce.PaymentWidget.find = function () {
    var $result = $("*[data-widget-def='" + commerce.PaymentWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.PaymentWidget.id);
};

commerce.PaymentWidget.prototype.registerListeners = function () {

    Object.getPrototypeOf(commerce.PaymentWidget.prototype).registerListeners.call(this);

    var widget = this;
    var $date = $(this.find("input[name='expireDate']"));

    $date.on('keyup', function (e) {
        var thisVal = $(this).val();

        if (thisVal.length == 0)
            $(this).closest(".input-group").removeClass("focused");
        else
            $(this).closest(".input-group").addClass("focused");

        var numChars = $(this).val().length;

        if (numChars === 2) {
            if (thisVal > 12) {
                thisVal = 12;
            }
            if (!/\//.test(thisVal)) {
                thisVal += '/';
            }
            $(this).val(thisVal);
        }

        if (e.which == 8 && numChars === 2) {
            thisVal = thisVal.substring(0, thisVal.length - 2);
            $(this).val(thisVal);
        }
    });

    $date.on('blur', function () {
        var dateValue = $date.val().split('/');
        var numChars = $date.val().length;
        var thisVal = $date.val();
        if (this.value) {
            $(widget.find("input[name='expYear']")).val(dateValue[1]);
            $(widget.find("input[name='expMonth']")).val(dateValue[0]);
        } else {
            $(widget.find("input[name='expYear']")).val("");
            $(widget.find("input[name='expMonth']")).val("");
        }
        if (numChars > 6) {
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var value = thisVal.split('/');
            var yearExpiry = value[1];
            var expireYear = parseInt(yearExpiry);

            // if (currentYear > expireYear) {
            //     thisVal = value[0] + '/' + currentYear;
            //     $date.val(thisVal);
            // }
        }
    });


    $(this.find("#realNumber")).on("blur", function (e) {
        var $value = $("#realNumber").val();
        var $cElement = $("#realNumber");
        var creditCard = commerce.validators.creditcard($value, $cElement);
    });

    $(this.find(".creditCarPayment .actions .primary")).on("click", function (e) {
        var $form = widget.find("form[name='apg']");
        var $dropdowns = $(".credit-card-date-field select");
        var $ccNumber = $("#realNumber");
        var $secNumber = $("#secNumber");
        var $this = $('input[data-validate]');
        var $group = $this.closest(".input-group");
        var invalid = commerce.validators.validateField($this, $form);
        var notification = widget.getNotification($group.data('notification'));
        var $message = [];
        if ($("#expYear").val() == "0000") {
            $message.push("year ");
        }

        if ($("#expMonth").val() == "00") {
            $message.push(" month");
        }

        if ($("#expMonth").val() == "00" && $("#expYear").val() == "0000") {
            $message = $message.join("and");
        }

        if ($("#expMonth").val() != "00" && $("#expYear").val() != "0000") {
            $message.push("a valid date");
        }

        if (!notification) {
            return;
        }
        if (invalid) {
            notification.reset();
            notification.setMessage('');
            notification.error();
            notification.show();
        } else {
            notification.reset()
        }

        if ($(".credit-card-date-field .error").length > 0) {
            if ($dropdowns.closest(".input-group").find(".invalid-cc").length > 0) { // check if message already exists
                $($dropdowns).closest(".input-group").find(".invalid-cc").remove(); // remove message if it already exists
            }
            $($dropdowns).parent().find(".field-info").after("<div class='invalid-cc'>Please enter " + $message + "</div>");
        }
        else {
            $($dropdowns).closest(".input-group").find(".invalid-cc").remove();
        }

        if ($(".cc-number .error").length > 0) {
            if ($ccNumber.closest(".input-group").find(".invalid-cc").length > 0) { // check if message already exists
                $($ccNumber).closest(".input-group").find(".invalid-cc").remove(); // remove message if it already exists
            }
            $($ccNumber).parent().find(".field-info").after("<div class='invalid-cc'>- IS INVALID</div>");
        }
        else {
            $($ccNumber).closest(".input-group").find(".invalid-cc").remove();
        }

        if ($("[data-notification='secNumber'] .error").length > 0) {
            if ($secNumber.closest(".input-group").find(".invalid-cc").length > 0) { // check if message already exists
                $($secNumber).closest(".input-group").find(".invalid-cc").remove(); // remove message if it already exists
            }
            $($secNumber).parent().find(".field-info").after("<div class='invalid-cc'>- IS INVALID</div>");
        }
        else {
            $($secNumber).closest(".input-group").find(".invalid-cc").remove();
        }

    });

    if (commerce.PaymentWidget.registerAdditionalListeners)
        commerce.PaymentWidget.registerAdditionalListeners();

};


literatum.widgets.register(commerce.PaymentWidget);
commerce.PaymentWidget.registerAdditionalListeners = function () {
    $(document).ready(function () {
        var $confirmOrderMsg = $('.eCommerceCheckoutPaymentWidget .infoMsgBox');
        if ($confirmOrderMsg.is(':visible')) {
            $confirmOrderMsg[0].scrollIntoView();
        }
        var $errMsgBox = $(".checkout-expand > .errorMsgBox");
        if ($errMsgBox.length > 0 && !$errMsgBox.hasClass("hidden") && $errMsgBox.html() !== "") {
            $('html, body').animate({
                scrollTop: $(".checkout-expand > .errorMsgBox").offset().top
            }, 1000);
        }
    });
};commerce.PurchaseOptionsWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.buyingList);
    var $obj = this.find(".scroll-into-view").closest(".purchaseArea");
    if ($obj && $obj.length > 0) {
        literatum.utils.scroll($obj, 1000, 50);
        var $expandSection = this.find("*[data-bind='expandSection']");
        if ($expandSection.length && !$expandSection.hasClass('active')) {
            $expandSection.click();
        }
    }
};

commerce.PurchaseOptionsWidget.prototype = new literatum.Widget();

commerce.PurchaseOptionsWidget.id = 'eCommercePurchaseAccessWidget';
commerce.PurchaseOptionsWidget.action = '/pb/widgets/commerce/purchaseOptions';

commerce.PurchaseOptionsWidget.find = function() {
    var $result = $("*[widget-def='" + commerce.PurchaseOptionsWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.PurchaseOptionsWidget.id);
};

commerce.PurchaseOptionsWidget.binders = {
    saveItem: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-doi");
        commerce.cart.savedItems.saveByDoi(key);
    },
    addItem: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-key");
        commerce.cart.buyingList.addItem(key);
    },
    expandSection: function(e, widget) {
        e.preventDefault();
        // TODO: UI Review if all of this still needed
        widget.find('.purchaseAreaList_expanded').slideUp();
        widget.find('.purchaseAreaList_expand').attr("aria-expanded", false);
        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
            $(e.target).siblings('.purchaseAreaList_expanded').slideUp();
            $(e.target).attr("aria-expanded", false);
        } else {
            $(e.target).addClass('active');
            widget.find(".purchaseAreaList_expand").not($(e.target)).removeClass('active');
            $(e.target).siblings('.purchaseAreaList_expanded').slideDown();
            $(e.target).attr("aria-expanded", true);
        }
    }
};


commerce.PurchaseOptionsWidget.prototype.update = function(model) {
    // no need to update this widget's view, only trigger info handlers
    this.triggerInfoHandlers(this, model);
    this.loaded();
};

commerce.PurchaseOptionsWidget.infoHandlers = {
    info: function(message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get(widget.find(".purchaseMessage[data-item='" + key + "'].info"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
            notification.$element.siblings("a").find(".add-to-cart-msg").remove();
            $(widget.find("*[data-entity='" + key + "']")).hide();
            setTimeout(function () {
                notification.$element.fadeOut();
                $(widget.find("*[data-entity='" + key + "']")).parent().hide();
                commerce.Notification.get(widget.find(".addedMessage[data-item='" + key + "']")).showFlex();
            }, 2000);

        }
    },
    error: function(message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get(widget.find(".purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
        $(widget.find("*[data-entity='" + key + "']")).hide();
    },
    savedItemInfo: function(message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            // notification.show();
        }
        $(widget.find(".save-for-later-link")).hide();
    },
    savedItemError: function(message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    },
    nextAction: function(message) {
        if (message == 'refreshPage') {
            setTimeout(function () {
                location.reload();
            }, 5000);
        }
    }
};

literatum.widgets.register(commerce.PurchaseOptionsWidget);commerce.CartIndicatorWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.CartIndicatorWidget.prototype = new literatum.Widget();

commerce.CartIndicatorWidget.id = 'eCommerceCartIndicatorWidget';
commerce.CartIndicatorWidget.action = null;

commerce.CartIndicatorWidget.prototype.update = function(model) {
    var $cartSize = this.find("*[data-id='cart-size']");
    if (model.size == 0) {
        $cartSize.hide();
        $cartSize.html(model.size);
    } else {
        $cartSize.show("hidden");
        $cartSize.html(model.size);
    }
};

commerce.CartIndicatorWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.CartIndicatorWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.CartIndicatorWidget.id);
};

literatum.widgets.register(commerce.CartIndicatorWidget);
commerce.AddToCartWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
};

commerce.AddToCartWidget.prototype = new literatum.Widget();

commerce.AddToCartWidget.id = 'eCommerceCheckoutAddToCartWidget';
commerce.AddToCartWidget.action = '/pb/widgets/commerce/addToCart';

commerce.AddToCartWidget.binders = {
    expand: function (e, widget) {
        e.preventDefault();
        if (widget.find(".add-journal-to-cart-container").length > 0) {
            var addToCart = document.createElement('div');
            $(addToCart).addClass('eCommerceCheckoutAddToCartWidgetExpanded');
            $(addToCart).appendTo('body');
            $('body').css('overflow', 'hidden');
            widget.find(".add-journal-to-cart-container").clone().prepend('<a href="#" class="close float-right"><i class="icon-close_thin"></i></a>').appendTo(addToCart).slideToggle().find("a").first().focus();
            var overlay = document.createElement('div');
            $(overlay).addClass('overlay-fixed');
            $(overlay).appendTo('.eCommerceCheckoutAddToCartWidgetExpanded');
            $(overlay).find("a").first().focus();
        }
        widget.registerListeners();
    },
    addItem: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-key");
        commerce.cart.buyingList.addItem(key);
    }
};

commerce.AddToCartWidget.find = function () {
    var $result = $("*[data-widget-def='" + commerce.AddToCartWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.AddToCartWidget.id);
};

commerce.AddToCartWidget.infoHandlers = {
    info: function(message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get($(".eCommerceCheckoutAddToCartWidgetExpanded .purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
            notification.$element.siblings("a").find(".add-to-cart-msg").remove();
            setTimeout(function () {
                notification.$element.fadeOut();
                $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-entity='" + key + "']").hide();
                notification.$element.siblings(".addedMessage[data-item='" + key + "']").show();
            }, 2000);
        }
    },
    error: function(message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get($(".eCommerceCheckoutAddToCartWidgetExpanded .purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
        $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-entity='" + key + "']").hide();

    },
    savedItemInfo: function(message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
        $(".eCommerceCheckoutAddToCartWidgetExpanded .save-for-later-link").hide();
    },
    savedItemError: function(message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    },
    nextAction: function(message) {
        if (message == 'refreshPage') {
            setTimeout(function () {
                location.reload();
            }, 5000);
        }
    }
};

commerce.AddToCartWidget.prototype.render = function(model, params) {
    params['doi'] = this.find("a[data-doi]").attr("data-doi");
    Object.getPrototypeOf(commerce.AddToCartWidget.prototype).render.call(this, model, params);
};

commerce.AddToCartWidget.prototype.registerListeners = function() {

    Object.getPrototypeOf(commerce.AddToCartWidget.prototype).registerListeners.call(this);

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.eCommerceCheckoutAddToCartWidgetExpanded').length && !$(event.target).closest('.eCommerceCheckoutAddToCartWidget').length && $('.eCommerceCheckoutAddToCartWidgetExpanded').is(':visible')) {
            event.preventDefault();
            $('.eCommerceCheckoutAddToCartWidgetExpanded').remove();
            $('body').css('overflow','auto');
        }
    });

    $(document).on('click', '.eCommerceCheckoutAddToCartWidgetExpanded .close', function () {
        $('.eCommerceCheckoutAddToCartWidgetExpanded').remove();
        $('body').css('overflow','auto');
    });
    // FIXME: this is a workaround because of how currently the content of this widget is being copied
    // FIXME: which ruins how this widget works.

    $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-bind='addItem']").off();

    $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-bind='addItem']").click(function(e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-key");
        commerce.cart.buyingList.addItem(key);
    });
};

literatum.widgets.register(commerce.AddToCartWidget);
commerce.CartInfoWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.shipping);
};

commerce.CartInfoWidget.prototype = new literatum.Widget();

commerce.CartInfoWidget.id = 'eCommerceCartInfoWidget';
commerce.CartInfoWidget.action = null;

commerce.CartInfoWidget.prototype.update = function() {
    var notification = commerce.Notification.get(this.find(".cartInfo"));
    if (notification) {
        notification.reset();
    }
};

commerce.CartInfoWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.CartInfoWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.CartInfoWidget.id);
};

literatum.widgets.register(commerce.CartInfoWidget);
commerce.IdentityBarWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
};

commerce.IdentityBarWidget.prototype = new literatum.Widget();

commerce.IdentityBarWidget.id = 'literatumNavigationLoginBar';
commerce.IdentityBarWidget.action = '/pb/widgets/commerce/identityBar';

commerce.IdentityBarWidget.binders = {
    expand: function (e, widget) {
        widget.find(".navigation-login-dropdown-container").toggle();
    }
};

commerce.IdentityBarWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.IdentityBarWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.IdentityBarWidget.id);
};

commerce.IdentityBarWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.RecommendedWidget.prototype).registerListeners.call(this);
    var $popups = $('.popup');
    var $popup = $('.login-popup');

    $('.show-login').off();

    $('.show-login').click(function(event) {
        if ($popups.length) {
            $popups.addClass('hidden');
            $popup.removeClass('hidden');
            $('body').addClass('noscroll');
            event.preventDefault();
        }
    });
};

literatum.widgets.register(commerce.IdentityBarWidget);
commerce.RestoreAccessWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.restoreAccess);
};

commerce.RestoreAccessWidget.prototype = new literatum.Widget();

commerce.RestoreAccessWidget.id = 'eCommerceRestoreContentAccessWidget';
commerce.RestoreAccessWidget.action = '/pb/widgets/commerce/restoreAccess';

commerce.RestoreAccessWidget.find = function() {
    var $result = $("*[data-widget-def='" + commerce.RestoreAccessWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RestoreAccessWidget.id);
};

commerce.RestoreAccessWidget.binders = {
    request: function(e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.restoreAccess.request(widget.find("input[name='email']").val());
    }
};

commerce.RestoreAccessWidget.prototype.update = function(model) {
    // no need to update this widget's view, only trigger info handlers
    this.triggerInfoHandlers(this, model);
    this.loaded();
};

commerce.RestoreAccessWidget.infoHandlers = {
    restoreError: function(message, widget) {
        widget.find('.restore-info').hide();
        widget.find('.restore-error').hide();
        var notification = commerce.Notification.get(widget.find(".restore-error"));
        notification.setMessage(message);
        notification.error();
        notification.show();
    },
    error: function(message, widget) {
        widget.find('.restore-info').hide();
        var $inputGroup = widget.find("input[name='email']").closest(".input-group");
        var notification = commerce.FieldNotification.get($inputGroup);
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    },
    info: function(message, widget) {
        widget.find('.restore-error').hide();
        var $inputGroup = widget.find("input[name='email']").closest(".input-group");
        var notification = commerce.Notification.get(widget.find(".restore-info"));
        var fieldNotification = commerce.FieldNotification.get($inputGroup);
        if (fieldNotification) {
            fieldNotification.reset();
            fieldNotification.hide();
        }
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
    }
};

literatum.widgets.register(commerce.RestoreAccessWidget);
commerce.page.cart.checkoutButton = function (data) {
    var $leftCol = $('.checkoutProcessLeftCol');
    if (data.size == 0) {
        $leftCol.removeClass('no-buying');
    } else {
        $leftCol.addClass('no-buying');
    }

    if (data.size > 0 && $(window).width() < 993 && $('.checkoutStickyBtn').length == 0 && $leftCol.length) {
        $leftCol.append('<div><div class="checkoutStickyBtn"><input class="button primary" type="button" title="checkout" value="checkout"></div></div>');
    }
    if (!data.size || $(window).width() >= 993) {
        $('.checkoutStickyBtn').remove();
    }
};

commerce.cart.register(commerce.cart.buyingList, commerce.page.cart.checkoutButton);
commerce.cart.register(commerce.cart.savedItems, commerce.page.cart.checkoutButton);
$(document).ready(function() {

    var checkout = location.hash.indexOf("checkout") > -1 || location.href.indexOf('checkout') > -1;

    if (checkout && $(".cartLabel .shopping-cart").html() > 0) {
        commerce.page.cart.show();
    }

    if (checkout) {
        literatum.utils.nextCheckoutSection();
    }
    if (commerce.page.cart.checkoutButton !== undefined)
        commerce.page.cart.checkoutButton({size: $(".cartLabel .shopping-cart").html()});

    $(document).on('click', '.add-journal-to-cart .prevent-fix, .add-journal-to-cart .tab-nav a', function (e) {

        if ($(this).parent().hasClass('disable-click')) {
            return false;
        } else {
            $(this).next(".journal-options-expanded").slideToggle();
            $(this).toggleClass("open");
            setTimeout(function () {
                $('.eCommerceCheckoutSavedForLaterItemsWidget .journal-options-expanded,.eCommerceCheckoutRecommendedItemsWidget .journal-options-expanded,.eCommerceCheckoutRecentlyViewedItemsWidget .journal-options-expanded').each(function () {
                    //if ($(this).is(':visible')) {
                        var expandedMargin = $(this).height() + 21;
                        if (expandedMargin > 25 && $(this).is(':visible')) {
                            $(this).closest('.add-journal-to-cart').css('margin-bottom', expandedMargin);
                        } else {
                            $(this).closest('.add-journal-to-cart').css('margin-bottom', '10px');
                        }
                    //}

                });
            }, 400);
            if ($(this).closest('.purchaseArea').css('position') == 'absolute' && !$(e.target).closest('.tab-nav').length) {
                $('.add-journal-to-cart').toggleClass('disable-click');
                $(this).closest('.add-journal-to-cart').toggleClass("disable-click");
            }
        }
        return false;
    });
    $("form").on("focusout blur", ".js__verifyAddress input", function(e){
        var pattern1 = new RegExp('^p.*o.*box.*', 'i');
        var pattern2 = new RegExp('^po box[^a-z 0-9]+', 'i');
        var pattern3 = new RegExp('^po[^a-z ]+box', 'i');
        var pattern4 = new RegExp('^po[^a-z 0-9]+ box', 'i');
        var pattern5 = new RegExp('^po [^a-z 0-9]+box', 'i');

        if ($(this).val().match(pattern1)) {
            if ($(this).val().match(pattern2) || $(this).val().match(pattern3) || $(this).val().match(pattern4) || $(this).val().match(pattern5)) {
                $(this).addClass("error");
                if ($(this).siblings(".errorMsg").length == 0)
                    $(this).after("<span class='errorMsg'>PO BOX addresses should start with 'PO BOX'</span>");
            }
            else {
                $(this).removeClass("error");
                $(this).siblings(".errorMsg").remove();
            }
        }
        else {
            $(this).removeClass("error");
            $(this).siblings(".errorMsg").remove();
        }
    });
});

if (commerce.page.cart.checkoutButton !== undefined) {
    $(window).resize(function () {
        commerce.page.cart.checkoutButton({size: $(".cartLabel .shopping-cart").html()});
    });
}



literatum.events.register('user-action', function() {
    literatum.widgets.all().forEach(function(item){ item.reset()});
});

literatum.events.register('widget-rendered', function() {
    var $document = $(document);
    if (typeof $document.Tabs != 'undefined') {
        $(document).Tabs();
    }
});

commerce.cart.setErrorHandler(function() {
    location.reload();
});
commerce.RedeemAllowanceWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
};

commerce.RedeemAllowanceWidget.prototype = new literatum.Widget();

commerce.RedeemAllowanceWidget.id = 'eCommerceRedeemOfferWidget';
commerce.RedeemAllowanceWidget.action = '/pb/widgets/commerce/redeemAllowance';

commerce.RedeemAllowanceWidget.binders = {
    expand: function (e, widget) {
        e.preventDefault();
        widget.find('.expand-purchase-options').toggleClass('expanded');
        widget.find(".add-allowance").slideToggle();
    }
};

commerce.RedeemAllowanceWidget.find = function () {
    var $result = $("*[data-widget-def='" + commerce.RedeemAllowanceWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RedeemAllowanceWidget.id);
};

literatum.widgets.register(commerce.RedeemAllowanceWidget);
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(t.braintree||(t.braintree={})).dropin=e()}}(function(){var e;return function(){function e(t,r,i){function n(o,s){if(!r[o]){if(!t[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(a)return a(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var c=r[o]={exports:{}};t[o][0].call(c.exports,function(e){var r=t[o][1][e];return n(r?r:e)},c,c.exports,e,t,r,i)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)n(i[o]);return n}return e}()({1:[function(e,t,r){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/Android/.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,r){"use strict";var i=e("./is-edge"),n=e("./is-samsung");t.exports=function(e){return e=e||navigator.userAgent,!(e.indexOf("Chrome")===-1&&e.indexOf("CriOS")===-1||i(e)||n(e))}},{"./is-edge":3,"./is-samsung":12}],3:[function(e,t,r){"use strict";t.exports=function(e){return e=e||navigator.userAgent,e.indexOf("Edge/")!==-1}},{}],4:[function(e,t,r){(function(r){"use strict";var i=e("./is-ie11");t.exports=function(e){return e=e||r.navigator.userAgent,e.indexOf("MSIE")!==-1||i(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ie11":5}],5:[function(e,t,r){"use strict";t.exports=function(e){return e=e||navigator.userAgent,e.indexOf("Trident/7")!==-1}},{}],6:[function(e,t,r){"use strict";t.exports=function(e){return e=e||navigator.userAgent,e.indexOf("MSIE 9")!==-1}},{}],7:[function(e,t,r){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/FxiOS/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,r){"use strict";function i(e){return e.match(a)}var n=e("./is-ios"),a=/webkit/i;t.exports=function(e){return e=e||navigator.userAgent,n(e)&&i(e)&&e.indexOf("CriOS")===-1}},{"./is-ios":10}],9:[function(e,t,r){(function(r){"use strict";function i(e){return/\bGSA\b/.test(e)}var n=e("./is-ios");t.exports=function(e){return e=e||r.navigator.userAgent,!!n(e)&&(!!i(e)||/.+AppleWebKit(?!.*Safari)/.test(e))}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ios":10}],10:[function(e,t,r){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/iPhone|iPod|iPad/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],11:[function(e,t,r){(function(r){"use strict";var i=e("./is-ios-firefox");t.exports=function(e){return e=e||r.navigator.userAgent,i(e)||/iPhone|iPod|iPad|Mobile|Tablet/i.test(e)&&/Firefox/i.test(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ios-firefox":7}],12:[function(e,t,r){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/SamsungBrowser/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(e,t,r){"use strict";var i=e("./lib/set-attributes"),n=e("./lib/default-attributes"),a=e("./lib/assign");t.exports=function(e){var t=document.createElement("iframe"),r=a({},n,e);return r.style&&"string"!=typeof r.style&&(a(t.style,r.style),delete r.style),i(t,r),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":14,"./lib/default-attributes":15,"./lib/set-attributes":16}],14:[function(e,t,r){"use strict";t.exports=function(e){var t=Array.prototype.slice.call(arguments,1);return t.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(r){e[r]=t[r]})}),e}},{}],15:[function(e,t,r){"use strict";t.exports={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],16:[function(e,t,r){"use strict";t.exports=function(e,t){var r;for(var i in t)t.hasOwnProperty(i)&&(r=t[i],null==r?e.removeAttribute(i):e.setAttribute(i,r))}},{}],17:[function(e,t,r){"use strict";function i(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}t.exports=i},{}],18:[function(e,t,r){"use strict";function i(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}t.exports=i},{}],19:[function(e,t,r){"use strict";function i(e,t){return t?void e.then(function(e){t(null,e)}).catch(function(e){t(e)}):e}t.exports=i},{}],20:[function(e,t,r){"use strict";function i(e){return function(){var t,r=Array.prototype.slice.call(arguments),i=r[r.length-1];return"function"==typeof i&&(t=r.pop(),t=a(n(t))),o(e.apply(this,r),t)}}var n=e("./lib/deferred"),a=e("./lib/once"),o=e("./lib/promise-or-callback");i.wrapPrototype=function(e,t){var r,n,a;return t=t||{},n=t.ignoreMethods||[],a=t.transformPrivateMethods===!0,r=Object.getOwnPropertyNames(e.prototype).filter(function(t){var r,i="constructor"!==t&&"function"==typeof e.prototype[t],o=n.indexOf(t)===-1;return r=!!a||"_"!==t.charAt(0),i&&r&&o}),r.forEach(function(t){var r=e.prototype[t];e.prototype[t]=i(r)}),e},t.exports=i},{"./lib/deferred":17,"./lib/once":18,"./lib/promise-or-callback":19}],21:[function(e,t,r){(function(r){"use strict";function i(e){this._client=e.client,Object.defineProperty(this,"merchantIdentifier",{value:this._client.getConfiguration().gatewayConfiguration.applePayWeb.merchantIdentifier,configurable:!1,writable:!1})}var n=e("../lib/braintree-error"),a=e("../lib/analytics"),o=e("./errors"),s=e("../lib/promise"),l=e("../lib/methods"),d=e("../lib/convert-methods-to-error"),c=e("@braintree/wrap-promise");i.prototype.createPaymentRequest=function(e){var t=this._client.getConfiguration().gatewayConfiguration.applePayWeb,r={countryCode:t.countryCode,currencyCode:t.currencyCode,merchantCapabilities:t.merchantCapabilities||["supports3DS"],supportedNetworks:t.supportedNetworks.map(function(e){return"mastercard"===e?"masterCard":e})};return Object.assign({},r,e)},i.prototype.performValidation=function(e){var t,i=this;return e&&e.validationURL?(t={validationUrl:e.validationURL,domainName:e.domainName||r.location.hostname,merchantIdentifier:e.merchantIdentifier||this.merchantIdentifier},null!=e.displayName&&(t.displayName=e.displayName),this._client.request({method:"post",endpoint:"apple_pay_web/sessions",data:{_meta:{source:"apple-pay"},applePayWebSession:t}}).then(function(e){return a.sendEvent(i._client,"applepay.performValidation.succeeded"),s.resolve(e)}).catch(function(e){return a.sendEvent(i._client,"applepay.performValidation.failed"),"CLIENT_REQUEST_ERROR"===e.code?s.reject(new n({type:o.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,code:o.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,message:o.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,details:{originalError:e.details.originalError}})):s.reject(new n({type:o.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,code:o.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,message:o.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,details:{originalError:e}}))})):s.reject(new n(o.APPLE_PAY_VALIDATION_URL_REQUIRED))},i.prototype.tokenize=function(e){var t=this;return e.token?this._client.request({method:"post",endpoint:"payment_methods/apple_payment_tokens",data:{_meta:{source:"apple-pay"},applePaymentToken:Object.assign({},e.token,{paymentData:btoa(JSON.stringify(e.token.paymentData))})}}).then(function(e){return a.sendEvent(t._client,"applepay.tokenize.succeeded"),s.resolve(e.applePayCards[0])}).catch(function(e){return a.sendEvent(t._client,"applepay.tokenize.failed"),s.reject(new n({type:o.APPLE_PAY_TOKENIZATION.type,code:o.APPLE_PAY_TOKENIZATION.code,message:o.APPLE_PAY_TOKENIZATION.message,details:{originalError:e}}))}):s.reject(new n(o.APPLE_PAY_PAYMENT_TOKEN_REQUIRED))},i.prototype.teardown=function(){return d(this,l(i.prototype)),s.resolve()},t.exports=c.wrapPrototype(i)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/analytics":56,"../lib/braintree-error":60,"../lib/convert-methods-to-error":66,"../lib/methods":78,"../lib/promise":80,"./errors":22,"@braintree/wrap-promise":20}],22:[function(e,t,r){"use strict";var i=e("../lib/braintree-error");t.exports={APPLE_PAY_NOT_ENABLED:{type:i.types.MERCHANT,code:"APPLE_PAY_NOT_ENABLED",message:"Apple Pay is not enabled for this merchant."},APPLE_PAY_VALIDATION_URL_REQUIRED:{type:i.types.MERCHANT,code:"APPLE_PAY_VALIDATION_URL_REQUIRED",message:"performValidation must be called with a validationURL."},APPLE_PAY_MERCHANT_VALIDATION_NETWORK:{type:i.types.NETWORK,code:"APPLE_PAY_MERCHANT_VALIDATION_NETWORK",message:"A network error occurred when validating the Apple Pay merchant."},APPLE_PAY_MERCHANT_VALIDATION_FAILED:{type:i.types.MERCHANT,code:"APPLE_PAY_MERCHANT_VALIDATION_FAILED",message:"Make sure you have registered your domain name in the Braintree Control Panel."},APPLE_PAY_PAYMENT_TOKEN_REQUIRED:{type:i.types.MERCHANT,code:"APPLE_PAY_PAYMENT_TOKEN_REQUIRED",message:"tokenize must be called with a payment token."},APPLE_PAY_TOKENIZATION:{type:i.types.NETWORK,code:"APPLE_PAY_TOKENIZATION",message:"A network error occurred when processing the Apple Pay payment."}}},{"../lib/braintree-error":60}],23:[function(e,t,r){"use strict";function i(e){return s.verify({name:"Apple Pay",client:e.client}).then(function(){return e.client.getConfiguration().gatewayConfiguration.applePayWeb?(o.sendEvent(e.client,"applepay.initialized"),new a(e)):c.reject(new n(l.APPLE_PAY_NOT_ENABLED))})}var n=e("../lib/braintree-error"),a=e("./apple-pay"),o=e("../lib/analytics"),s=e("../lib/basic-component-verification"),l=e("./errors"),d="3.31.0",c=e("../lib/promise"),p=e("@braintree/wrap-promise");t.exports={create:p(i),VERSION:d}},{"../lib/analytics":56,"../lib/basic-component-verification":58,"../lib/braintree-error":60,"../lib/promise":80,"./apple-pay":21,"./errors":22,"@braintree/wrap-promise":20}],24:[function(e,t,r){"use strict";var i=e("@braintree/browser-detection/is-ie"),n=e("@braintree/browser-detection/is-ie9");t.exports={isIe:i,isIe9:n}},{"@braintree/browser-detection/is-ie":4,"@braintree/browser-detection/is-ie9":6}],25:[function(e,t,r){"use strict";function i(e){var t,r,i;if(e=e||{},t=JSON.stringify(e),r=e.gatewayConfiguration,!r)throw new l(b.CLIENT_MISSING_GATEWAY_CONFIGURATION);if(["assetsUrl","clientApiUrl","configUrl"].forEach(function(e){if(e in r&&!s(r[e]))throw new l({type:b.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:b.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:e+" property is on an invalid domain."})}),this.getConfiguration=function(){return JSON.parse(t)},this._request=o,this._configuration=this.getConfiguration(),this._clientApiBaseUrl=r.clientApiUrl+"/v1/",i=r.braintreeApi,i&&(this._braintreeApi={baseUrl:i.url+"/",accessToken:i.accessToken},!s(this._braintreeApi.baseUrl)))throw new l({type:b.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:b.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:"braintreeApi URL is on an invalid domain."});r.graphQL&&(this._graphQL=new a({graphQL:r.graphQL}))}function n(e,t){var r;if(e===-1?r=new l(b.CLIENT_REQUEST_TIMEOUT):403===e?r=new l(b.CLIENT_AUTHORIZATION_INSUFFICIENT):429===e?r=new l(b.CLIENT_RATE_LIMITED):e>=500?r=new l(b.CLIENT_GATEWAY_NETWORK):(e<200||e>=400)&&(r=d(t,{type:b.CLIENT_REQUEST_ERROR.type,code:b.CLIENT_REQUEST_ERROR.code,message:b.CLIENT_REQUEST_ERROR.message})),r)return r.details=r.details||{},r.details.httpStatus=e,r}var a=e("./request/graphql"),o=e("./request"),s=e("../lib/is-whitelisted-domain"),l=e("../lib/braintree-error"),d=e("../lib/convert-to-braintree-error"),c=e("../lib/add-metadata"),p=e("../lib/promise"),u=e("@braintree/wrap-promise"),h=e("../lib/once"),y=e("../lib/deferred"),m=e("../lib/assign").assign,f=e("../lib/analytics"),v=e("./constants"),b=e("./errors"),g=e("../lib/errors"),E=e("../lib/constants").VERSION,_=e("../lib/methods"),P=e("../lib/convert-methods-to-error");i.prototype.request=function(e,t){var r=this,i=new p(function(t,i){var a,o,s,d;if(e.method?e.endpoint||(a="options.endpoint"):a="options.method",a)throw new l({type:b.CLIENT_OPTION_REQUIRED.type,code:b.CLIENT_OPTION_REQUIRED.code,message:a+" is required when making a request."});if(o="api"in e?e.api:"clientApi",d={method:e.method,graphQL:r._graphQL,timeout:e.timeout},"clientApi"===o)s=r._clientApiBaseUrl,d.data=c(r._configuration,e.data);else{if("braintreeApi"!==o)throw new l({type:b.CLIENT_OPTION_INVALID.type,code:b.CLIENT_OPTION_INVALID.code,message:"options.api is invalid."});if(!r._braintreeApi)throw new l(g.BRAINTREE_API_ACCESS_RESTRICTED);s=r._braintreeApi.baseUrl,d.data=e.data,d.headers={"Braintree-Version":v.BRAINTREE_API_VERSION_HEADER,Authorization:"Bearer "+r._braintreeApi.accessToken}}d.url=s+e.endpoint,d.sendAnalyticsEvent=function(e){f.sendEvent(r,e)},r._request(d,function(e,r,a){var o,s;return(s=n(a,e))?void i(s):(o=m({_httpStatus:a},r),void t(o))})});return"function"==typeof t?(t=h(y(t)),void i.then(function(e){t(null,e,e._httpStatus)}).catch(function(e){var r=e&&e.details&&e.details.httpStatus;t(e,null,r)})):i},i.prototype.toJSON=function(){return this.getConfiguration()},i.prototype.getVersion=function(){return E},i.prototype.teardown=u(function(){var e=this;return P(e,_(i.prototype)),p.resolve()}),t.exports=i},{"../lib/add-metadata":55,"../lib/analytics":56,"../lib/assign":57,"../lib/braintree-error":60,"../lib/constants":65,"../lib/convert-methods-to-error":66,"../lib/convert-to-braintree-error":67,"../lib/deferred":69,"../lib/errors":72,"../lib/is-whitelisted-domain":76,"../lib/methods":78,"../lib/once":79,"../lib/promise":80,"./constants":26,"./errors":27,"./request":38,"./request/graphql":36,"@braintree/wrap-promise":20}],26:[function(e,t,r){"use strict";t.exports={BRAINTREE_API_VERSION_HEADER:"2017-04-03"}},{}],27:[function(e,t,r){"use strict";var i=e("../lib/braintree-error");t.exports={CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN:{type:i.types.MERCHANT,code:"CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"},CLIENT_OPTION_REQUIRED:{type:i.types.MERCHANT,code:"CLIENT_OPTION_REQUIRED"},CLIENT_OPTION_INVALID:{type:i.types.MERCHANT,code:"CLIENT_OPTION_INVALID"},CLIENT_MISSING_GATEWAY_CONFIGURATION:{type:i.types.INTERNAL,code:"CLIENT_MISSING_GATEWAY_CONFIGURATION",message:"Missing gatewayConfiguration."},CLIENT_INVALID_AUTHORIZATION:{type:i.types.MERCHANT,code:"CLIENT_INVALID_AUTHORIZATION",message:"Authorization is invalid. Make sure your client token or tokenization key is valid."},CLIENT_GATEWAY_NETWORK:{type:i.types.NETWORK,code:"CLIENT_GATEWAY_NETWORK",message:"Cannot contact the gateway at this time."},CLIENT_REQUEST_TIMEOUT:{type:i.types.NETWORK,code:"CLIENT_REQUEST_TIMEOUT",message:"Request timed out waiting for a reply."},CLIENT_REQUEST_ERROR:{type:i.types.NETWORK,code:"CLIENT_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_RATE_LIMITED:{type:i.types.MERCHANT,code:"CLIENT_RATE_LIMITED",message:"You are being rate-limited; please try again in a few minutes."},CLIENT_AUTHORIZATION_INSUFFICIENT:{type:i.types.MERCHANT,code:"CLIENT_AUTHORIZATION_INSUFFICIENT",message:"The authorization used has insufficient privileges."}}},{"../lib/braintree-error":60}],28:[function(e,t,r){(function(r){"use strict";function i(e){return new a(function(t,i){var a,o,u,h,y=l(),m={merchantAppId:r.location.host,platform:d.PLATFORM,sdkVersion:d.VERSION,source:d.SOURCE,integration:d.INTEGRATION,integrationType:d.INTEGRATION,sessionId:y};try{o=c(e.authorization)}catch(e){return void i(new n(p.CLIENT_INVALID_AUTHORIZATION))}u=o.attrs,h=o.configUrl,u._meta=m,u.braintreeLibraryVersion=d.BRAINTREE_LIBRARY_VERSION,u.configVersion="3",s({url:h,method:"GET",data:u},function(r,o,s){var l;return r?(l=403===s?p.CLIENT_AUTHORIZATION_INSUFFICIENT:p.CLIENT_GATEWAY_NETWORK,void i(new n({type:l.type,code:l.code,message:l.message,details:{originalError:r}}))):(a={authorization:e.authorization,authorizationType:u.tokenizationKey?"TOKENIZATION_KEY":"CLIENT_TOKEN",analyticsMetadata:m,gatewayConfiguration:o},void t(a))})})}var n=e("../lib/braintree-error"),a=e("../lib/promise"),o=e("@braintree/wrap-promise"),s=e("./request"),l=e("../lib/vendor/uuid"),d=e("../lib/constants"),c=e("../lib/create-authorization-data"),p=e("./errors");t.exports={getConfiguration:o(i)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/braintree-error":60,"../lib/constants":65,"../lib/create-authorization-data":68,"../lib/promise":80,"../lib/vendor/uuid":84,"./errors":27,"./request":38,"@braintree/wrap-promise":20}],29:[function(e,t,r){"use strict";function i(e){return e.authorization?u[e.authorization]?d.resolve(u[e.authorization]):s(e).then(function(t){var r;return e.debug&&(t.isDebug=!0),r=new o(t),u[e.authorization]=r,r}):d.reject(new a({type:p.INSTANTIATION_OPTION_REQUIRED.type,code:p.INSTANTIATION_OPTION_REQUIRED.code,message:"options.authorization is required when instantiating a client."}))}function n(){u={}}var a=e("../lib/braintree-error"),o=e("./client"),s=e("./get-configuration").getConfiguration,l="3.31.0",d=e("../lib/promise"),c=e("@braintree/wrap-promise"),p=e("../lib/errors"),u={};t.exports={create:c(i),VERSION:l,_clearCache:n}},{"../lib/braintree-error":60,"../lib/errors":72,"../lib/promise":80,"./client":25,"./get-configuration":28,"@braintree/wrap-promise":20}],30:[function(e,t,r){"use strict";function i(e){return(!e||e===v)&&l.isIe()}function n(e){var t=!e.data&&e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorType;return"unknown_error"===t}function a(e,t,r){var o,l,v,b,g,E,_,P=e.url,C=e.graphQL,T=e.timeout,I=u.getRequestObject(),A=r,w=Boolean(C&&C.isGraphQLRequest(P,e.data));e.headers=d({"Content-Type":"application/json"},e.headers),v=w?new y(e):new m(e),P=v.getUrl(),b=v.getBody(),g=v.getMethod(),E=v.getHeaders(),"GET"===g&&(P=s.queryify(P,b),b=null),h?I.onreadystatechange=function(){if(4===I.readyState){if(0===I.status&&w)return delete e.graphQL,void a(e,t,r);if(_=p(I.responseText),l=v.adaptResponseBody(_),o=v.determineStatus(I.status,_),o>=400||o<200){if(w&&n(_))return delete e.graphQL,void a(e,t,r);if(t<f&&i(o))return t++,void a(e,t,r);A(l||"error",null,o||500)}else A(null,l,o)}}:(e.headers&&(P=s.queryify(P,E)),I.onload=function(){A(null,p(I.responseText),I.status)},I.onerror=function(){A("error",null,500)},I.onprogress=function(){},I.ontimeout=function(){A("timeout",null,-1)});try{I.open(g,P,!0)}catch(i){if(!w)throw i;return delete e.graphQL,void a(e,t,r)}I.timeout=T,h&&Object.keys(E).forEach(function(e){I.setRequestHeader(e,E[e])});try{I.send(c(g,b))}catch(e){}}function o(e,t){a(e,0,t)}var s=e("../../lib/querystring"),l=e("../browser-detection"),d=e("../../lib/assign").assign,c=e("./prep-body"),p=e("./parse-body"),u=e("./xhr"),h=u.isAvailable,y=e("./graphql/request"),m=e("./default-request"),f=1,v=408;t.exports={request:o}},{"../../lib/assign":57,"../../lib/querystring":81,"../browser-detection":24,"./default-request":31,"./graphql/request":37,"./parse-body":41,"./prep-body":42,"./xhr":43}],31:[function(e,t,r){"use strict";function i(e){this._url=e.url,this._data=e.data,this._method=e.method,this._headers=e.headers}i.prototype.getUrl=function(){return this._url},i.prototype.getBody=function(){return this._data},i.prototype.getMethod=function(){return this._method},i.prototype.getHeaders=function(){return this._headers},i.prototype.adaptResponseBody=function(e){return e},i.prototype.determineStatus=function(e){return e},t.exports=i},{}],32:[function(e,t,r){(function(e){"use strict";t.exports=function(){return e.navigator.userAgent}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],33:[function(e,t,r){"use strict";function i(e){var t;return t=e.data&&!e.errors?n(e):a(e)}function n(e){var t,r=e.data.tokenizeCreditCard,i=r.creditCard,n=i.last4?i.last4.substr(2,4):"",a=i.binData;return a&&["issuingBank","countryOfIssuance","productId"].forEach(function(e){null===a[e]&&(a[e]="Unknown")}),t={creditCards:[{binData:a,consumed:!1,description:n?"ending in "+n:"",nonce:r.token,details:{cardType:i.brand||"Unknown",lastFour:i.last4||"",lastTwo:n},type:"CreditCard",threeDSecureInfo:null}]}}var a=e("./error");t.exports=i},{"./error":34}],34:[function(e,t,r){"use strict";function i(e){var t,r=e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorType;return t="user_error"===r?a(e):r?n(e):{error:{message:"There was a problem serving your request"},fieldErrors:[]}}function n(e){return{error:{message:e.errors[0].message},fieldErrors:[]}}function a(e){var t=e.errors[0],r=t.extensions.legacyMessage,i=t.extensions.errorDetails,n=o(i);return{error:{message:r},fieldErrors:n}}function o(e){var t=[];return e.forEach(function(e){s(e.inputPath.slice(1),e,t)}),t}function s(e,t,r){var i,n=t.legacyCode,a=e[0];return 1===e.length?void r.push({code:n,field:a,message:t.message}):(r.forEach(function(e){e.field===a&&(i=e)}),i||(i={field:a,fieldErrors:[]},r.push(i)),void s(e.slice(1),t,i.fieldErrors))}t.exports=i},{}],35:[function(e,t,r){"use strict";function i(e){var t=e.creditCard,r=t&&t.billingAddress,i=t&&t.expirationDate,a=t&&(t.expirationMonth||i&&i.split("/")[0].trim()),o=t&&(t.expirationYear||i&&i.split("/")[1].trim()),s={input:{creditCard:{number:t&&t.number,expirationMonth:a,expirationYear:o,cvv:t&&t.cvv,cardholderName:t&&t.cardholderName},options:{}}};return r&&(s.input.creditCard.billingAddress=r),s.input=n(e,s.input),s}function n(e,t){var r;return e.creditCard&&e.creditCard.options&&"boolean"==typeof e.creditCard.options.validate?r=e.creditCard.options.validate:e.authorizationFingerprint&&e.tokenizationKey||e.authorizationFingerprint?r=!0:e.tokenizationKey&&(r=!1),"boolean"==typeof r&&(t.options=o({validate:r},t.options)),t}function a(e){return JSON.stringify({query:s,variables:i(e),operationName:"TokenizeCreditCard"})}var o=e("../../../../lib/assign").assign,s="mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) {   tokenizeCreditCard(input: $input) {     token     creditCard {       brand       last4       binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     }   } }";t.exports=a},{"../../../../lib/assign":57}],36:[function(e,t,r){"use strict";function i(e){this._config=e.graphQL}function n(e){return s.some(function(t){var r=t.split(".").reduce(function(e,t){return e&&e[t]},e);return void 0!==r})}var a=e("../../browser-detection"),o={tokenize_credit_cards:"payment_methods/credit_cards"},s=["creditCard.options.unionPayEnrollment"];i.prototype.getGraphQLEndpoint=function(){return this._config.url},i.prototype.isGraphQLRequest=function(e,t){var r,i=this.getClientApiPath(e);return!(!this._isGraphQLEnabled()||!i||a.isIe9())&&(r=this._config.features.some(function(e){return o[e]===i}),!n(t)&&r)},i.prototype.getClientApiPath=function(e){var t,r="/client_api/v1/",i=e.split(r);return i.length>1&&(t=i[1].split("?")[0]),t},i.prototype._isGraphQLEnabled=function(){return Boolean(this._config)},t.exports=i},{"../../browser-detection":24}],37:[function(e,t,r){"use strict";function i(e){var t=e.graphQL.getClientApiPath(e.url);this._graphQL=e.graphQL,this._data=e.data,this._method=e.method,this._headers=e.headers,this._sendAnalyticsEvent=e.sendAnalyticsEvent||Function.prototype,this._generator=p[t],this._adapter=u[t],this._sendAnalyticsEvent("graphql.init")}function n(e,t){return!e&&t.errors[0].message}function a(e){return e.indexOf("_")===-1?e:e.toLowerCase().replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function o(e){var t={};return Object.keys(e).forEach(function(r){var i=a(r);"object"==typeof e[r]?t[i]=o(e[r]):"number"==typeof e[r]?t[i]=String(e[r]):t[i]=e[r]}),t}var s="2017-12-15",l=e("../../../lib/assign").assign,d=e("./generators/credit-card-tokenization"),c=e("./adapters/credit-card-tokenization"),p={"payment_methods/credit_cards":d},u={"payment_methods/credit_cards":c};i.prototype.getUrl=function(){return this._graphQL.getGraphQLEndpoint()},i.prototype.getBody=function(){var e=o(this._data);return this._generator(e)},i.prototype.getMethod=function(){return"POST"},i.prototype.getHeaders=function(){var e,t;return this._data.authorizationFingerprint?(this._sendAnalyticsEvent("graphql.authorization-fingerprint"),e=this._data.authorizationFingerprint):(this._sendAnalyticsEvent("graphql.tokenization-key"),e=this._data.tokenizationKey),t={Authorization:"Bearer "+e,"Braintree-Version":s},l({},this._headers,t)},i.prototype.adaptResponseBody=function(e){return this._adapter(e)},i.prototype.determineStatus=function(e,t){var r,i;return 200===e?(i=t.errors&&t.errors[0]&&t.errors[0].extensions&&t.errors[0].extensions.errorType,r=t.data&&!t.errors?200:"user_error"===i?422:"developer_error"===i?403:"unknown_error"===i?500:n(i,t)?403:500):r=e?e:500,this._sendAnalyticsEvent("graphql.status."+e),this._sendAnalyticsEvent("graphql.determinedStatus."+r),r},t.exports=i},{"../../../lib/assign":57,"./adapters/credit-card-tokenization":33,"./generators/credit-card-tokenization":35}],38:[function(e,t,r){"use strict";function i(){return null==n&&(n=!(d()&&/MSIE\s(8|9)/.test(l()))),n}var n,a=e("../../lib/once"),o=e("./jsonp-driver"),s=e("./ajax-driver"),l=e("./get-user-agent"),d=e("./is-http");t.exports=function(e,t){t=a(t||Function.prototype),e.method=(e.method||"GET").toUpperCase(),e.timeout=null==e.timeout?6e4:e.timeout,e.data=e.data||{},i()?s.request(e,t):o.request(e,t)}},{"../../lib/once":79,"./ajax-driver":30,"./get-user-agent":32,"./is-http":39,"./jsonp-driver":40}],39:[function(e,t,r){(function(e){"use strict";t.exports=function(){return"http:"===e.location.protocol}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],40:[function(e,t,r){(function(r){"use strict";function i(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function n(e,t){var i=document.createElement("script"),n=!1;return i.src=e,i.async=!0,i.onerror=function(){r[t]({message:"error",status:500})},i.onload=i.onreadystatechange=function(){n||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n=!0,i.onload=i.onreadystatechange=null)},i}function a(e){try{delete r[e]}catch(t){r[e]=null}}function o(e,t){u[t]=setTimeout(function(){u[t]=null,r[t]({error:"timeout",status:-1}),r[t]=function(){a(t)}},e)}function s(e,t,n){r[n]=function(r){var o=r.status||500,s=null,l=null;delete r.status,o>=400||o<200?s=r:l=r,a(n),i(e),clearTimeout(u[n]),t(s,l,o)}}function l(e,t){var r,i="callback_json_"+c().replace(/-/g,""),a=e.url,l=e.data,u=e.method,h=e.timeout;a=p.queryify(a,l),a=p.queryify(a,{_method:u,callback:i}),r=n(a,i),s(r,t,i),o(h,i),d||(d=document.getElementsByTagName("head")[0]),d.appendChild(r)}var d,c=e("../../lib/vendor/uuid"),p=e("../../lib/querystring"),u={};t.exports={request:l}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/querystring":81,"../../lib/vendor/uuid":84}],41:[function(e,t,r){"use strict";t.exports=function(e){try{e=JSON.parse(e)}catch(e){}return e}},{}],42:[function(e,t,r){"use strict";t.exports=function(e,t){if("string"!=typeof e)throw new Error("Method must be a string");return"get"!==e.toLowerCase()&&null!=t&&(t="string"==typeof t?t:JSON.stringify(t)),t}},{}],43:[function(e,t,r){(function(e){"use strict";function r(){return i?new XMLHttpRequest:new XDomainRequest}var i=e.XMLHttpRequest&&"withCredentials"in new e.XMLHttpRequest;t.exports={isAvailable:i,getRequestObject:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],44:[function(e,t,r){"use strict";function i(e){this._client=e.client,this._braintreeGeneratedPaymentRequestConfiguration=s(this._client.getConfiguration())}var n=e("../lib/analytics"),a=e("../lib/assign").assign,o=e("../lib/convert-methods-to-error"),s=e("../lib/generate-google-pay-configuration"),l=e("../lib/braintree-error"),d=e("../lib/methods"),c=e("../lib/promise"),p=e("@braintree/wrap-promise");i.prototype.createPaymentDataRequest=function(e){return n.sendEvent(this._client,"google-payment.createPaymentDataRequest"),a({},this._braintreeGeneratedPaymentRequestConfiguration,e)},i.prototype.parseResponse=function(e){var t=this._client;return c.resolve().then(function(){var r,i=JSON.parse(e.paymentMethodToken.token),a=i.error;return a?c.reject(a):(r=i.androidPayCards[0],n.sendEvent(t,"google-payment.parseResponse.succeeded"),c.resolve({nonce:r.nonce,type:r.type,description:r.description,details:{cardType:r.details.cardType,lastFour:r.details.lastFour,lastTwo:r.details.lastTwo},binData:r.binData}))}).catch(function(e){return n.sendEvent(t,"google-payment.parseResponse.failed"),c.reject(new l({code:"GOOGLE_PAYMENT_GATEWAY_ERROR",message:"There was an error when tokenizing the Google Pay payment method.",type:l.types.UNKNOWN,details:{originalError:e}}))})},i.prototype.teardown=function(){return o(this,d(i.prototype)),c.resolve()},t.exports=p.wrapPrototype(i)},{"../lib/analytics":56,"../lib/assign":57,"../lib/braintree-error":60,"../lib/convert-methods-to-error":66,"../lib/generate-google-pay-configuration":74,"../lib/methods":78,"../lib/promise":80,"@braintree/wrap-promise":20}],45:[function(e,t,r){"use strict";function i(e){return n.verify({name:"Google Pay",client:e.client}).then(function(){return e.client.getConfiguration().gatewayConfiguration.androidPay?new o(e):s.reject(new a({type:a.types.MERCHANT,code:"GOOGLE_PAYMENT_NOT_ENABLED",message:"Google Pay is not enabled for this merchant."}))})}var n=e("../lib/basic-component-verification"),a=e("../lib/braintree-error"),o=e("./google-payment"),s=e("../lib/promise"),l=e("@braintree/wrap-promise"),d="3.31.0";t.exports={create:l(i),VERSION:d}},{"../lib/basic-component-verification":58,"../lib/braintree-error":60,"../lib/promise":80,"./google-payment":44,"@braintree/wrap-promise":20}],46:[function(e,t,r){"use strict";function i(e,t){var r;return s.hasOwnProperty(e)?null==t||n(e,t)||(r=new a({type:o.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,code:o.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,message:'Value "'+t+'" is not allowed for "'+e+'" attribute.'})):r=new a({type:o.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,code:o.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,message:'The "'+e+'" attribute is not supported in Hosted Fields.'}),r}function n(e,t){return"string"===s[e]?"string"==typeof t||"number"==typeof t:"boolean"===s[e]&&("true"===String(t)||"false"===String(t))}var a=e("../../lib/braintree-error"),o=e("../shared/errors"),s=e("../shared/constants").whitelistedAttributes;t.exports=i},{"../../lib/braintree-error":60,"../shared/constants":52,"../shared/errors":53}],47:[function(e,t,r){"use strict";var i=e("../shared/constants"),n=e("../../lib/use-min");t.exports=function(e,t,r){return e+"/web/"+i.VERSION+"/html/hosted-fields-frame"+n(r)+".html#"+t}},{"../../lib/use-min":82,"../shared/constants":52}],48:[function(e,t,r){(function(r){"use strict";function i(e){return function(t){var r,i=t.merchantPayload,a=i.emittedBy,o=e[a].containerElement;Object.keys(i.fields).forEach(function(t){i.fields[t].container=e[t].containerElement}),r=i.fields[a],"blur"===t.type&&n(o),s.toggle(o,u.externalClasses.FOCUSED,r.isFocused),s.toggle(o,u.externalClasses.VALID,r.isValid),s.toggle(o,u.externalClasses.INVALID,!r.isPotentiallyValid),this._state={cards:i.cards,fields:i.fields},this._emit(t.type,i)}}function n(e){var t;v.isIos()&&document.activeElement===document.body&&(t=e.querySelector("input"),t||(t=document.createElement("input"),t.type="button",t.style.height="0px",t.style.width="0px",t.style.opacity="0",t.style.padding="0",t.style.position="absolute",t.style.left="-200%",t.style.top="0px",e.insertBefore(t,e.firstChild)),t.focus(),t.blur())}function a(e){var t,n,f=this,v={},P=0,w=m();if(n=e.client.getConfiguration(),!e.fields)throw new c({type:I.INSTANTIATION_OPTION_REQUIRED.type,code:I.INSTANTIATION_OPTION_REQUIRED.code,message:"options.fields is required when instantiating Hosted Fields."});g.call(this),this._injectedNodes=[],this._destructor=new o,this._fields=v,this._state={fields:{},cards:A("")},this._bus=new d({channel:w,merchantUrl:location.href}),this._destructor.registerFunctionForTeardown(function(){f._bus.teardown()}),this._client=e.client,_.sendEvent(this._client,"custom.hosted-fields.initialized"),Object.keys(e.fields).forEach(function(t){var i,a,o;if(!u.whitelistedFields.hasOwnProperty(t))throw new c({type:h.HOSTED_FIELDS_INVALID_FIELD_KEY.type,code:h.HOSTED_FIELDS_INVALID_FIELD_KEY.code,message:'"'+t+'" is not a valid field.'});if(i=e.fields[t],a=document.querySelector(i.selector),!a)throw new c({type:h.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,code:h.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,message:h.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,details:{fieldSelector:i.selector,fieldKey:t}});if(a.querySelector('iframe[name^="braintree-"]'))throw new c({type:h.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,code:h.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,message:h.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,details:{fieldSelector:i.selector,fieldKey:t}});if(i.maxlength&&"number"!=typeof i.maxlength)throw new c({type:h.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,code:h.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,message:"The value for maxlength must be a number.",details:{fieldKey:t}});if(i.minlength&&"number"!=typeof i.minlength)throw new c({type:h.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,code:h.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,message:"The value for minlength must be a number.",details:{fieldKey:t}});o=l({type:t,name:"braintree-hosted-field-"+t,style:u.defaultIFrameStyle}),this._injectedNodes=this._injectedNodes.concat(E(o,a)),this._setupLabelFocus(t,a),v[t]={frameElement:o,containerElement:a},P++,this._state.fields[t]={isEmpty:!0,isValid:!1,isPotentiallyValid:!0,isFocused:!1,container:a},setTimeout(function(){r.navigator&&r.navigator.vendor&&r.navigator.vendor.indexOf("Apple")===-1&&(o.src="about:blank"),setTimeout(function(){o.src=p(n.gatewayConfiguration.assetsUrl,w,n.isDebug)},0)},0)}.bind(this)),t=setTimeout(function(){_.sendEvent(f._client,"custom.hosted-fields.load.timed-out"),f._emit("timeout")},y),this._bus.on(b.FRAME_READY,function(r){P--,0===P&&(clearTimeout(t),r(e),f._emit("ready"))}),this._bus.on(b.INPUT_EVENT,i(v).bind(this)),this._destructor.registerFunctionForTeardown(function(){var e,t,r;for(e=0;e<f._injectedNodes.length;e++)t=f._injectedNodes[e],r=t.parentNode,r.removeChild(t),s.remove(r,u.externalClasses.FOCUSED,u.externalClasses.INVALID,u.externalClasses.VALID)}),this._destructor.registerFunctionForTeardown(function(){var e=C(a.prototype).concat(C(g.prototype));T(f,e)})}var o=e("../../lib/destructor"),s=e("../../lib/classlist"),l=e("@braintree/iframer"),d=e("../../lib/bus"),c=e("../../lib/braintree-error"),p=e("./compose-url"),u=e("../shared/constants"),h=e("../shared/errors"),y=e("../../lib/constants").INTEGRATION_TIMEOUT_MS,m=e("../../lib/vendor/uuid"),f=e("../shared/find-parent-tags"),v=e("../shared/browser-detection"),b=u.events,g=e("../../lib/event-emitter"),E=e("./inject-frame"),_=e("../../lib/analytics"),P=u.whitelistedFields,C=e("../../lib/methods"),T=e("../../lib/convert-methods-to-error"),I=e("../../lib/errors"),A=e("credit-card-type"),w=e("./attribute-validation-error"),N=e("../../lib/promise"),D=e("@braintree/wrap-promise");a.prototype=Object.create(g.prototype,{constructor:a}),a.prototype._setupLabelFocus=function(e,t){function r(){o.emit(b.TRIGGER_INPUT_FOCUS,e)}var i,n,a=v.isIos(),o=this._bus;if(!a&&null!=t.id){for(i=Array.prototype.slice.call(document.querySelectorAll('label[for="'+t.id+'"]')),i=i.concat(f(t,"label")),n=0;n<i.length;n++)i[n].addEventListener("click",r,!1);this._destructor.registerFunctionForTeardown(function(){for(n=0;n<i.length;n++)i[n].removeEventListener("click",r,!1)})}},a.prototype.teardown=function(){var e=this;return new N(function(t,r){e._destructor.teardown(function(i){_.sendEvent(e._client,"custom.hosted-fields.teardown-completed"),i?r(i):t()})})},a.prototype.tokenize=function(e){var t=this;return e||(e={}),new N(function(r,i){t._bus.emit(b.TOKENIZATION_REQUEST,e,function(e){var t=e[0],n=e[1];t?i(t):r(n)})})},a.prototype.addClass=function(e,t){var r;return P.hasOwnProperty(e)?this._fields.hasOwnProperty(e)?this._bus.emit(b.ADD_CLASS,e,t):r=new c({type:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,code:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,message:'Cannot add class to "'+e+'" field because it is not part of the current Hosted Fields options.'}):r=new c({type:h.HOSTED_FIELDS_FIELD_INVALID.type,code:h.HOSTED_FIELDS_FIELD_INVALID.code,message:'"'+e+'" is not a valid field. You must use a valid field option when adding a class.'}),r?N.reject(r):N.resolve()},a.prototype.removeClass=function(e,t){var r;return P.hasOwnProperty(e)?this._fields.hasOwnProperty(e)?this._bus.emit(b.REMOVE_CLASS,e,t):r=new c({type:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,code:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,message:'Cannot remove class from "'+e+'" field because it is not part of the current Hosted Fields options.'}):r=new c({type:h.HOSTED_FIELDS_FIELD_INVALID.type,code:h.HOSTED_FIELDS_FIELD_INVALID.code,message:'"'+e+'" is not a valid field. You must use a valid field option when removing a class.'}),r?N.reject(r):N.resolve()},a.prototype.setAttribute=function(e){var t,r;return P.hasOwnProperty(e.field)?this._fields.hasOwnProperty(e.field)?(t=w(e.attribute,e.value),t?r=t:this._bus.emit(b.SET_ATTRIBUTE,e.field,e.attribute,e.value)):r=new c({type:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,code:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,message:'Cannot set attribute for "'+e.field+'" field because it is not part of the current Hosted Fields options.'}):r=new c({type:h.HOSTED_FIELDS_FIELD_INVALID.type,code:h.HOSTED_FIELDS_FIELD_INVALID.code,message:'"'+e.field+'" is not a valid field. You must use a valid field option when setting an attribute.'}),r?N.reject(r):N.resolve()},a.prototype.setMessage=function(e){this._bus.emit(b.SET_MESSAGE,e.field,e.message)},a.prototype.removeAttribute=function(e){var t,r;return P.hasOwnProperty(e.field)?this._fields.hasOwnProperty(e.field)?(t=w(e.attribute),t?r=t:this._bus.emit(b.REMOVE_ATTRIBUTE,e.field,e.attribute)):r=new c({type:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,code:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,message:'Cannot remove attribute for "'+e.field+'" field because it is not part of the current Hosted Fields options.'}):r=new c({type:h.HOSTED_FIELDS_FIELD_INVALID.type,code:h.HOSTED_FIELDS_FIELD_INVALID.code,message:'"'+e.field+'" is not a valid field. You must use a valid field option when removing an attribute.'}),r?N.reject(r):N.resolve()},a.prototype.setPlaceholder=function(e,t){return this.setAttribute({field:e,attribute:"placeholder",value:t})},a.prototype.clear=function(e){var t;return P.hasOwnProperty(e)?this._fields.hasOwnProperty(e)?this._bus.emit(b.CLEAR_FIELD,e):t=new c({type:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,code:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,message:'Cannot clear "'+e+'" field because it is not part of the current Hosted Fields options.'}):t=new c({type:h.HOSTED_FIELDS_FIELD_INVALID.type,code:h.HOSTED_FIELDS_FIELD_INVALID.code,message:'"'+e+'" is not a valid field. You must use a valid field option when clearing a field.'}),t?N.reject(t):N.resolve()},a.prototype.focus=function(e){var t;return P.hasOwnProperty(e)?this._fields.hasOwnProperty(e)?this._bus.emit(b.TRIGGER_INPUT_FOCUS,e):t=new c({type:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,code:h.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,message:'Cannot focus "'+e+'" field because it is not part of the current Hosted Fields options.'}):t=new c({type:h.HOSTED_FIELDS_FIELD_INVALID.type,code:h.HOSTED_FIELDS_FIELD_INVALID.code,message:'"'+e+'" is not a valid field. You must use a valid field option when focusing a field.'}),t?N.reject(t):N.resolve()},a.prototype.getState=function(){return this._state},t.exports=D.wrapPrototype(a)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/analytics":56,"../../lib/braintree-error":60,"../../lib/bus":63,"../../lib/classlist":64,"../../lib/constants":65,"../../lib/convert-methods-to-error":66,"../../lib/destructor":70,"../../lib/errors":72,"../../lib/event-emitter":73,"../../lib/methods":78,"../../lib/promise":80,"../../lib/vendor/uuid":84,"../shared/browser-detection":51,"../shared/constants":52,"../shared/errors":53,"../shared/find-parent-tags":54,"./attribute-validation-error":46,"./compose-url":47,"./inject-frame":49,"@braintree/iframer":13,"@braintree/wrap-promise":20,"credit-card-type":100}],49:[function(e,t,r){"use strict";t.exports=function(e,t){var r=document.createElement("div"),i=document.createDocumentFragment();return r.style.clear="both",i.appendChild(e),i.appendChild(r),t.appendChild(i),[e,r]}},{}],50:[function(e,t,r){"use strict";function i(e){return a.verify({name:"Hosted Fields",client:e.client}).then(function(){var t=new n(e);return new c(function(e,r){t.on("ready",function(){e(t)}),t.on("timeout",function(){r(new d(o.HOSTED_FIELDS_TIMEOUT))})})})}var n=e("./external/hosted-fields"),a=e("../lib/basic-component-verification"),o=e("./shared/errors"),s=e("restricted-input/supports-input-formatting"),l=e("@braintree/wrap-promise"),d=e("../lib/braintree-error"),c=e("../lib/promise"),p="3.31.0";t.exports={supportsInputFormatting:s,create:l(i),VERSION:p}},{"../lib/basic-component-verification":58,"../lib/braintree-error":60,"../lib/promise":80,"./external/hosted-fields":48,"./shared/errors":53,"@braintree/wrap-promise":20,"restricted-input/supports-input-formatting":104}],51:[function(e,t,r){"use strict";t.exports={isIe9:e("@braintree/browser-detection/is-ie9"),isIos:e("@braintree/browser-detection/is-ios"),isIosWebview:e("@braintree/browser-detection/is-ios-webview")}},{"@braintree/browser-detection/is-ie9":6,"@braintree/browser-detection/is-ios":10,"@braintree/browser-detection/is-ios-webview":9}],52:[function(e,t,r){"use strict";var i=e("../../lib/enumerate"),n=e("./errors"),a="3.31.0",o={VERSION:a,maxExpirationYearAge:19,externalEvents:{FOCUS:"focus",BLUR:"blur",EMPTY:"empty",NOT_EMPTY:"notEmpty",VALIDITY_CHANGE:"validityChange",CARD_TYPE_CHANGE:"cardTypeChange"},defaultMaxLengths:{number:19,postalCode:8,expirationDate:7,expirationMonth:2,expirationYear:4,cvv:3},externalClasses:{FOCUSED:"braintree-hosted-fields-focused",INVALID:"braintree-hosted-fields-invalid",VALID:"braintree-hosted-fields-valid"},defaultIFrameStyle:{border:"none",width:"100%",height:"100%",float:"left"},tokenizationErrorCodes:{81724:n.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,81736:n.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED},whitelistedStyles:["-moz-appearance","-moz-osx-font-smoothing","-moz-tap-highlight-color","-moz-transition","-webkit-appearance","-webkit-font-smoothing","-webkit-tap-highlight-color","-webkit-transition","appearance","color","direction","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-weight","letter-spacing","line-height","padding","opacity","outline","text-shadow","transition"],whitelistedFields:{number:{name:"credit-card-number",label:"Credit Card Number"},cvv:{name:"cvv",label:"CVV"},expirationDate:{name:"expiration",label:"Expiration Date"},expirationMonth:{name:"expiration-month",label:"Expiration Month"},expirationYear:{name:"expiration-year",label:"Expiration Year"},postalCode:{name:"postal-code",label:"Postal Code"}},whitelistedAttributes:{"aria-invalid":"boolean","aria-required":"boolean",disabled:"boolean",placeholder:"string"}};o.events=i(["FRAME_READY","VALIDATE_STRICT","CONFIGURATION","TOKENIZATION_REQUEST","INPUT_EVENT","TRIGGER_INPUT_FOCUS","ADD_CLASS","REMOVE_CLASS","SET_ATTRIBUTE","REMOVE_ATTRIBUTE","CLEAR_FIELD","AUTOFILL_EXPIRATION_DATE","SET_MESSAGE"],"hosted-fields:"),t.exports=o},{"../../lib/enumerate":71,"./errors":53}],53:[function(e,t,r){"use strict";var i=e("../../lib/braintree-error");t.exports={HOSTED_FIELDS_TIMEOUT:{type:i.types.UNKNOWN,code:"HOSTED_FIELDS_TIMEOUT",message:"Hosted Fields timed out when attempting to set up."},HOSTED_FIELDS_INVALID_FIELD_KEY:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_INVALID_FIELD_KEY"},HOSTED_FIELDS_INVALID_FIELD_SELECTOR:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_INVALID_FIELD_SELECTOR",message:"Selector does not reference a valid DOM node."},HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME",message:"Element already contains a Braintree iframe."},HOSTED_FIELDS_FIELD_INVALID:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_FIELD_INVALID"},HOSTED_FIELDS_FIELD_NOT_PRESENT:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_FIELD_NOT_PRESENT"},HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR:{type:i.types.NETWORK,code:"HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR",message:"A tokenization network error occurred."},HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE:{type:i.types.CUSTOMER,code:"HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE",message:"This credit card already exists in the merchant's vault."},HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED:{type:i.types.CUSTOMER,code:"HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED",message:"CVV verification failed during tokenization."},HOSTED_FIELDS_FAILED_TOKENIZATION:{type:i.types.CUSTOMER,code:"HOSTED_FIELDS_FAILED_TOKENIZATION",message:"The supplied card data failed tokenization."},HOSTED_FIELDS_FIELDS_EMPTY:{type:i.types.CUSTOMER,code:"HOSTED_FIELDS_FIELDS_EMPTY",message:"All fields are empty. Cannot tokenize empty card fields."},HOSTED_FIELDS_FIELDS_INVALID:{type:i.types.CUSTOMER,code:"HOSTED_FIELDS_FIELDS_INVALID",message:"Some payment input fields are invalid. Cannot tokenize invalid card fields."},HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED"},HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED"},HOSTED_FIELDS_FIELD_PROPERTY_INVALID:{type:i.types.MERCHANT,code:"HOSTED_FIELDS_FIELD_PROPERTY_INVALID"}}},{"../../lib/braintree-error":60}],54:[function(e,t,r){"use strict";function i(e,t){for(var r=e.parentNode,i=[];null!=r;)null!=r.tagName&&r.tagName.toLowerCase()===t&&i.push(r),r=r.parentNode;return i}t.exports=i},{}],55:[function(e,t,r){"use strict";function i(e,t){var r,i=t?a(t):{},s=n(e.authorization).attrs,l=a(e.analyticsMetadata);i.braintreeLibraryVersion=o.BRAINTREE_LIBRARY_VERSION;for(r in i._meta)i._meta.hasOwnProperty(r)&&(l[r]=i._meta[r]);return i._meta=l,s.tokenizationKey?i.tokenizationKey=s.tokenizationKey:i.authorizationFingerprint=s.authorizationFingerprint,i}var n=e("./create-authorization-data"),a=e("./json-clone"),o=e("./constants");t.exports=i},{"./constants":65,"./create-authorization-data":68,"./json-clone":77}],56:[function(e,t,r){"use strict";function i(e){return Math.floor(e/1e3)}function n(e,t,r){var n=e.getConfiguration(),s=e._request,l=i(Date.now()),d=n.gatewayConfiguration.analytics.url,c={analytics:[{kind:a.ANALYTICS_PREFIX+t,timestamp:l}]};s({url:d,method:"post",data:o(n,c),timeout:a.ANALYTICS_REQUEST_TIMEOUT_MS},r)}var a=e("./constants"),o=e("./add-metadata");t.exports={sendEvent:n}},{"./add-metadata":55,"./constants":65}],57:[function(e,t,r){"use strict";function i(e){var t,r,i;for(t=1;t<arguments.length;t++){r=arguments[t];for(i in r)r.hasOwnProperty(i)&&(e[i]=r[i])}return e}var n="function"==typeof Object.assign?Object.assign:i;t.exports={assign:n,_assign:i}},{}],58:[function(e,t,r){"use strict";function i(e){var t,r,i;return e?(i=e.name,t=e.client,null==t?a.reject(new n({type:o.INSTANTIATION_OPTION_REQUIRED.type,code:o.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+i+"."})):(r=t.getVersion(),r!==s?a.reject(new n({type:o.INCOMPATIBLE_VERSIONS.type,code:o.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+r+") and "+i+" (version "+s+") components must be from the same SDK version."})):a.resolve())):a.reject(new n({type:o.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:o.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}var n=e("./braintree-error"),a=e("./promise"),o=e("./errors"),s="3.31.0";t.exports={verify:i}},{"./braintree-error":60,"./errors":72,"./promise":80}],59:[function(e,t,r){"use strict";function i(e,t){var r=0===e.length;r?(e(),t(null)):e(t)}var n=e("./once");t.exports=function(e,t){function r(e){return e?void l(e):(s-=1,void(0===s&&l(null)))}var a,o=e.length,s=o,l=n(t);if(0===o)return void l(null);for(a=0;a<o;a++)i(e[a],r)}},{"./once":79}],60:[function(e,t,r){"use strict";function i(e){if(!i.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}var n=e("./enumerate");i.prototype=Object.create(Error.prototype),i.prototype.constructor=i,i.types=n(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),i.findRootError=function(e){return e instanceof i&&e.details&&e.details.originalError?i.findRootError(e.details.originalError):e},t.exports=i},{"./enumerate":71}],61:[function(e,t,r){"use strict";function i(e,t){var r,i,a=document.createElement("a");return a.href=t,i="https:"===a.protocol?a.host.replace(/:443$/,""):"http:"===a.protocol?a.host.replace(/:80$/,""):a.host,r=a.protocol+"//"+i,r===e||(a.href=e,n(e))}var n=e("../is-whitelisted-domain");t.exports={checkOrigin:i}},{"../is-whitelisted-domain":76}],62:[function(e,t,r){"use strict";var i=e("../enumerate");t.exports=i(["CONFIGURATION_REQUEST"],"bus:")},{"../enumerate":71}],63:[function(e,t,r){"use strict";function i(e){if(e=e||{},this.channel=e.channel,!this.channel)throw new s({type:s.types.INTERNAL,code:"MISSING_CHANNEL_ID",message:"Channel ID must be specified."});this.merchantUrl=e.merchantUrl,this._isDestroyed=!1,this._isVerbose=!1,this._listeners=[],this._log("new bus on channel "+this.channel,[location.href])}var n=e("framebus"),a=e("./events"),o=e("./check-origin").checkOrigin,s=e("../braintree-error");i.prototype.on=function(e,t){var r,i,a=t,s=this;this._isDestroyed||(this.merchantUrl&&(a=function(){o(this.origin,s.merchantUrl)&&t.apply(this,arguments)}),r=this._namespaceEvent(e),i=Array.prototype.slice.call(arguments),i[0]=r,i[1]=a,this._log("on",i),n.on.apply(n,i),this._listeners.push({eventName:e,handler:a,originalHandler:t}))},i.prototype.emit=function(e){var t;this._isDestroyed||(t=Array.prototype.slice.call(arguments),t[0]=this._namespaceEvent(e),this._log("emit",t),n.emit.apply(n,t))},i.prototype._offDirect=function(e){var t=Array.prototype.slice.call(arguments);this._isDestroyed||(t[0]=this._namespaceEvent(e),this._log("off",t),n.off.apply(n,t))},i.prototype.off=function(e,t){var r,i,n=t;if(!this._isDestroyed){if(this.merchantUrl)for(r=0;r<this._listeners.length;r++)i=this._listeners[r],i.originalHandler===t&&(n=i.handler);this._offDirect(e,n)}},i.prototype._namespaceEvent=function(e){return["braintree",this.channel,e].join(":")},i.prototype.teardown=function(){var e,t;for(t=0;t<this._listeners.length;t++)e=this._listeners[t],this._offDirect(e.eventName,e.handler);this._listeners.length=0,this._isDestroyed=!0},i.prototype._log=function(e,t){this._isVerbose&&console.log(e,t)},i.events=a,t.exports=i},{"../braintree-error":60,"./check-origin":61,"./events":62,framebus:101}],64:[function(e,t,r){"use strict";function i(e){return e.className.trim().split(/\s+/)}function n(e){var t=Array.prototype.slice.call(arguments,1),r=i(e).filter(function(e){return t.indexOf(e)===-1}).concat(t).join(" ");e.className=r}function a(e){var t=Array.prototype.slice.call(arguments,1),r=i(e).filter(function(e){return t.indexOf(e)===-1}).join(" ");e.className=r}function o(e,t,r){r?n(e,t):a(e,t)}t.exports={add:n,remove:a,toggle:o}},{}],65:[function(e,t,r){"use strict";var i="3.31.0",n="web";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,INTEGRATION_TIMEOUT_MS:6e4,VERSION:i,INTEGRATION:"custom",SOURCE:"client",PLATFORM:n,BRAINTREE_LIBRARY_VERSION:"braintree/"+n+"/"+i}},{}],66:[function(e,t,r){"use strict";var i=e("./braintree-error"),n=e("./errors");t.exports=function(e,t){t.forEach(function(t){e[t]=function(){throw new i({type:n.METHOD_CALLED_AFTER_TEARDOWN.type,code:n.METHOD_CALLED_AFTER_TEARDOWN.code,message:t+" cannot be called after teardown."})}})}},{"./braintree-error":60,"./errors":72}],67:[function(e,t,r){"use strict";function i(e,t){return e instanceof n?e:new n({type:t.type,code:t.code,message:t.message,details:{originalError:e}})}var n=e("./braintree-error");t.exports=i},{"./braintree-error":60}],68:[function(e,t,r){"use strict";function i(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}function n(e){var t=e.split("_"),r=t[0],i=t.slice(2).join("_");return{merchantId:i,environment:r}}function a(e){var t,r,a={attrs:{},configUrl:""};return i(e)?(r=n(e),a.attrs.tokenizationKey=e,a.configUrl=s[r.environment]+"/merchants/"+r.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(o(e)),a.attrs.authorizationFingerprint=t.authorizationFingerprint,a.configUrl=t.configUrl),a}var o=e("../lib/vendor/polyfill").atob,s={production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"};t.exports=a},{"../lib/vendor/polyfill":83}],69:[function(e,t,r){"use strict";t.exports=function(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}},{}],70:[function(e,t,r){"use strict";function i(){this._teardownRegistry=[],this._isTearingDown=!1}var n=e("./batch-execute-functions");i.prototype.registerFunctionForTeardown=function(e){"function"==typeof e&&this._teardownRegistry.push(e)},i.prototype.teardown=function(e){return this._isTearingDown?void e(new Error("Destructor is already tearing down")):(this._isTearingDown=!0,void n(this._teardownRegistry,function(t){this._teardownRegistry=[],this._isTearingDown=!1,"function"==typeof e&&e(t)}.bind(this)))},t.exports=i},{"./batch-execute-functions":59}],71:[function(e,t,r){"use strict";function i(e,t){return t=null==t?"":t,e.reduce(function(e,r){return e[r]=t+r,e},{})}t.exports=i},{}],72:[function(e,t,r){"use strict";var i=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:i.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},CALLBACK_REQUIRED:{type:i.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:i.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INVALID_OPTION:{type:i.types.MERCHANT,code:"INVALID_OPTION"},INCOMPATIBLE_VERSIONS:{type:i.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:i.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:i.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":60}],73:[function(e,t,r){"use strict";function i(){this._events={}}i.prototype.on=function(e,t){this._events[e]?this._events[e].push(t):this._events[e]=[t]},i.prototype._emit=function(e){var t,r,i=this._events[e];if(i)for(r=Array.prototype.slice.call(arguments,1),t=0;t<i.length;t++)i[t].apply(null,r)},t.exports=i},{}],74:[function(e,t,r){"use strict";var i="3.31.0";t.exports=function(e){var t="production"===e.gatewayConfiguration.environment,r=e.gatewayConfiguration.androidPay,n=e.analyticsMetadata,a={environment:t?"PRODUCTION":"TEST",allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:{gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:authorizationFingerprint":r.googleAuthorizationFingerprint,"braintree:apiVersion":"v1","braintree:sdkVersion":i,"braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:i,platform:n.platform})}},cardRequirements:{allowedCardNetworks:r.supportedNetworks.map(function(e){return e.toUpperCase()})}};return"TOKENIZATION_KEY"===e.authorizationType&&(a.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization),a}},{}],75:[function(e,t,r){(function(e){"use strict";function r(t){return t=t||e.location.protocol,"https:"===t}t.exports={isHTTPS:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],76:[function(e,t,r){"use strict";function i(e){return e.split(".").slice(-2).join(".")}function n(e){var t;return e=e.toLowerCase(),!!/^https:/.test(e)&&(a=a||document.createElement("a"),a.href=e,t=i(a.hostname),o.hasOwnProperty(t))}var a,o={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=n},{}],77:[function(e,t,r){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],78:[function(e,t,r){"use strict";t.exports=function(e){return Object.keys(e).filter(function(t){return"function"==typeof e[t]})}},{}],79:[function(e,t,r){arguments[4][18][0].apply(r,arguments)},{dup:18}],80:[function(e,t,r){(function(r){"use strict";var i=r.Promise||e("promise-polyfill");t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":102}],81:[function(e,t,r){(function(e){"use strict";function r(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}function i(e){return e&&"object"==typeof e&&"number"==typeof e.length&&"[object Array]"===Object.prototype.toString.call(e)||!1}function n(t){var r,i;return t=t||e.location.href,/\?/.test(t)?(r=t.replace(/#.*$/,"").replace(/^.*\?/,"").split("&"),i=r.reduce(function(e,t){var r=t.split("="),i=decodeURIComponent(r[0]),n=decodeURIComponent(r[1]);return e[i]=n,e},{})):{}}function a(e,t){var r,n,o,s=[];for(o in e)e.hasOwnProperty(o)&&(n=e[o],r=t?i(e)?t+"[]":t+"["+o+"]":o,"object"==typeof n?s.push(a(n,r)):s.push(encodeURIComponent(r)+"="+encodeURIComponent(n)));return s.join("&")}function o(e,t){return e=e||"",null!=t&&"object"==typeof t&&r(t)&&(e+=e.indexOf("?")===-1?"?":"",e+=e.indexOf("=")!==-1?"&":"",e+=a(t)),e}t.exports={parse:n,stringify:a,queryify:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],82:[function(e,t,r){"use strict";function i(e){return e?"":".min"}t.exports=i},{}],83:[function(e,t,r){(function(e){"use strict";function r(e){var t,r,i,n,a,o,s,l,d=new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p="";if(!d.test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");l=0;do n=c.indexOf(e.charAt(l++)),a=c.indexOf(e.charAt(l++)),o=c.indexOf(e.charAt(l++)),s=c.indexOf(e.charAt(l++)),t=(63&n)<<2|a>>4&3,r=(15&a)<<4|o>>2&15,i=(3&o)<<6|63&s,p+=String.fromCharCode(t)+(r?String.fromCharCode(r):"")+(i?String.fromCharCode(i):"");while(l<e.length);return p}var i="function"==typeof e.atob?e.atob:r;t.exports={atob:function(t){return i.call(e,t)},_atob:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],84:[function(e,t,r){"use strict";function i(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,r="x"===e?t:3&t|8;return r.toString(16)})}t.exports=i},{}],85:[function(e,t,r){"use strict";var i=e("../lib/braintree-error");t.exports={PAYPAL_NOT_ENABLED:{type:i.types.MERCHANT,code:"PAYPAL_NOT_ENABLED",message:"PayPal is not enabled for this merchant."},PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED:{type:i.types.MERCHANT,code:"PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED",message:"A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree."},PAYPAL_TOKENIZATION_REQUEST_ACTIVE:{type:i.types.MERCHANT,code:"PAYPAL_TOKENIZATION_REQUEST_ACTIVE",message:"Another tokenization request is active."},PAYPAL_ACCOUNT_TOKENIZATION_FAILED:{type:i.types.NETWORK,code:"PAYPAL_ACCOUNT_TOKENIZATION_FAILED",message:"Could not tokenize user's PayPal account."},PAYPAL_FLOW_FAILED:{type:i.types.NETWORK,code:"PAYPAL_FLOW_FAILED",message:"Could not initialize PayPal flow."},PAYPAL_FLOW_OPTION_REQUIRED:{type:i.types.MERCHANT,code:"PAYPAL_FLOW_OPTION_REQUIRED",message:"PayPal flow property is invalid or missing."},PAYPAL_POPUP_OPEN_FAILED:{type:i.types.MERCHANT,code:"PAYPAL_POPUP_OPEN_FAILED",message:"PayPal popup failed to open, make sure to tokenize in response to a user action."},PAYPAL_POPUP_CLOSED:{type:i.types.CUSTOMER,code:"PAYPAL_POPUP_CLOSED",message:"Customer closed PayPal popup before authorizing."},PAYPAL_INVALID_PAYMENT_OPTION:{type:i.types.MERCHANT,code:"PAYPAL_INVALID_PAYMENT_OPTION",message:"PayPal payment options are invalid."}}},{"../lib/braintree-error":60}],86:[function(e,t,r){"use strict";function i(e){return s.verify({name:"PayPal Checkout",client:e.client}).then(function(){var t=e.client.getConfiguration();return t.gatewayConfiguration.paypalEnabled?t.gatewayConfiguration.paypal.clientId?(o.sendEvent(e.client,"paypal-checkout.initialized"),new p(e)):d.reject(new a(l.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED)):d.reject(new a(l.PAYPAL_NOT_ENABLED))})}function n(){return!0}var a=e("../lib/braintree-error"),o=e("../lib/analytics"),s=e("../lib/basic-component-verification"),l=e("./errors"),d=e("../lib/promise"),c=e("@braintree/wrap-promise"),p=e("./paypal-checkout"),u="3.31.0";t.exports={create:c(i),isSupported:n,VERSION:u}},{"../lib/analytics":56,"../lib/basic-component-verification":58,"../lib/braintree-error":60,"../lib/promise":80,"./errors":85,"./paypal-checkout":87,"@braintree/wrap-promise":20}],87:[function(e,t,r){"use strict";function i(e){this._client=e.client}var n=e("../lib/analytics"),a=e("../lib/promise"),o=e("@braintree/wrap-promise"),s=e("../lib/braintree-error"),l=e("../lib/convert-to-braintree-error"),d=e("./errors"),c=e("../paypal/shared/constants"),p=e("../lib/methods"),u=e("../lib/convert-methods-to-error");i.prototype.createPayment=function(e){var t;return e&&c.FLOW_ENDPOINTS.hasOwnProperty(e.flow)?(t="paypal_hermes/"+c.FLOW_ENDPOINTS[e.flow],n.sendEvent(this._client,"paypal-checkout.createPayment"),e.offerCredit===!0&&n.sendEvent(this._client,"paypal-checkout.credit.offered"),this._client.request({endpoint:t,method:"post",data:this._formatPaymentResourceData(e)}).then(function(t){var r;return r="checkout"===e.flow?t.paymentResource.paymentToken:t.agreementSetup.tokenId}).catch(function(e){var t=e.details&&e.details.httpStatus;return 422===t?a.reject(new s({type:d.PAYPAL_INVALID_PAYMENT_OPTION.type,code:d.PAYPAL_INVALID_PAYMENT_OPTION.code,message:d.PAYPAL_INVALID_PAYMENT_OPTION.message,details:{originalError:e}})):a.reject(l(e,{type:d.PAYPAL_FLOW_FAILED.type,code:d.PAYPAL_FLOW_FAILED.code,message:d.PAYPAL_FLOW_FAILED.message}))})):a.reject(new s(d.PAYPAL_FLOW_OPTION_REQUIRED))},i.prototype.tokenizePayment=function(e){var t,r=this,i=this._client,o={flow:e.billingToken?"vault":"checkout",intent:e.intent},s={ecToken:e.paymentToken,billingToken:e.billingToken,payerId:e.payerID,paymentId:e.paymentID};return n.sendEvent(i,"paypal-checkout.tokenization.started"),i.request({endpoint:"payment_methods/paypal_accounts",method:"post",data:r._formatTokenizeData(o,s)}).then(function(e){return t=r._formatTokenizePayload(e),n.sendEvent(i,"paypal-checkout.tokenization.success"),t.creditFinancingOffered&&n.sendEvent(i,"paypal-checkout.credit.accepted"),t}).catch(function(e){return n.sendEvent(i,"paypal-checkout.tokenization.failed"),a.reject(l(e,{type:d.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,code:d.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,message:d.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message}))})},i.prototype._formatPaymentResourceData=function(e){var t,r=this._client.getConfiguration().gatewayConfiguration,i={returnUrl:"x",cancelUrl:"x",offerPaypalCredit:e.offerCredit===!0,experienceProfile:{brandName:e.displayName||r.paypal.displayName,localeCode:e.locale,noShipping:(!e.enableShippingAddress).toString(),addressOverride:e.shippingAddressEditable===!1,landingPageType:e.landingPageType}};if("checkout"===e.flow){i.amount=e.amount,i.currencyIsoCode=e.currency,e.hasOwnProperty("intent")&&(i.intent=e.intent);for(t in e.shippingAddressOverride)e.shippingAddressOverride.hasOwnProperty(t)&&(i[t]=e.shippingAddressOverride[t])}else i.shippingAddress=e.shippingAddressOverride,e.billingAgreementDescription&&(i.description=e.billingAgreementDescription);return i},i.prototype._formatTokenizeData=function(e,t){var r=this._client.getConfiguration(),i=r.gatewayConfiguration,n="TOKENIZATION_KEY"===r.authorizationType,a={paypalAccount:{correlationId:t.billingToken||t.ecToken,options:{validate:"vault"===e.flow&&!n}}};return t.billingToken?a.paypalAccount.billingAgreementToken=t.billingToken:(a.paypalAccount.paymentToken=t.paymentId,a.paypalAccount.payerId=t.payerId,a.paypalAccount.unilateral=i.paypal.unvettedMerchant,e.intent&&(a.paypalAccount.intent=e.intent)),a},i.prototype._formatTokenizePayload=function(e){var t,r={};return e.paypalAccounts&&(r=e.paypalAccounts[0]),t={nonce:r.nonce,details:{},type:r.type},r.details&&r.details.payerInfo&&(t.details=r.details.payerInfo),r.details&&r.details.creditFinancingOffered&&(t.creditFinancingOffered=r.details.creditFinancingOffered),t},i.prototype.teardown=function(){return u(this,p(i.prototype)),a.resolve()},t.exports=o.wrapPrototype(i)},{"../lib/analytics":56,"../lib/braintree-error":60,"../lib/convert-methods-to-error":66,"../lib/convert-to-braintree-error":67,"../lib/methods":78,"../lib/promise":80,"../paypal/shared/constants":88,"./errors":85,"@braintree/wrap-promise":20}],88:[function(e,t,r){"use strict";t.exports={LANDING_FRAME_NAME:"braintreepaypallanding",FLOW_ENDPOINTS:{checkout:"create_payment_resource",vault:"setup_billing_agreement"}}},{}],89:[function(e,t,r){"use strict";function i(e){this._options=e,this._assetsUrl=e.client.getConfiguration().gatewayConfiguration.assetsUrl,this._isDebug=e.client.getConfiguration().isDebug,this._client=e.client}var n=e("../../lib/braintree-error"),a=e("../../lib/analytics"),o=e("../../lib/assign").assign,s=e("../../lib/methods"),l=e("../../lib/convert-methods-to-error"),d=e("../shared/constants"),c=e("../../lib/use-min"),p=e("../../lib/bus"),u=e("../../lib/vendor/uuid"),h=e("../../lib/deferred"),y=e("../shared/errors"),m=e("../shared/events"),f="3.31.0",v=e("@braintree/iframer"),b=e("../../lib/promise"),g=e("@braintree/wrap-promise"),E=400,_=400;i.prototype.verifyCard=function(e){var t,r,i,a,o,s,l=this;return e=e||{},this._verifyCardInProgress===!0?o=y.THREEDS_AUTHENTICATION_IN_PROGRESS:e.nonce?e.amount?"function"!=typeof e.addFrame?s="an addFrame function":"function"!=typeof e.removeFrame&&(s="a removeFrame function"):s="an amount":s="a nonce",s&&(o={type:y.THREEDS_MISSING_VERIFY_CARD_OPTION.type,code:y.THREEDS_MISSING_VERIFY_CARD_OPTION.code,message:"verifyCard options must include "+s+"."}),o?b.reject(new n(o)):(r=e.showLoader!==!1,this._verifyCardInProgress=!0,i=h(e.addFrame),a=h(e.removeFrame),t="payment_methods/"+e.nonce+"/three_d_secure/lookup",this._client.request({endpoint:t,method:"post",data:{amount:e.amount}}).then(function(e){return l._lookupPaymentMethod=e.paymentMethod,new b(function(t,n){l._verifyCardCallback=function(e,r){l._verifyCardInProgress=!1,e?n(e):t(r)},l._handleLookupResponse({showLoader:r,lookupResponse:e,addFrame:i,removeFrame:a})})}).catch(function(e){return l._verifyCardInProgress=!1,b.reject(e)}))},i.prototype.cancelVerifyCard=function(){var e;return this._verifyCardInProgress=!1,this._lookupPaymentMethod?(e=o({},this._lookupPaymentMethod,{liabilityShiftPossible:this._lookupPaymentMethod.threeDSecureInfo.liabilityShiftPossible,liabilityShifted:this._lookupPaymentMethod.threeDSecureInfo.liabilityShifted,verificationDetails:this._lookupPaymentMethod.threeDSecureInfo.verificationDetails}),b.resolve(e)):b.reject(new n(y.THREEDS_NO_VERIFICATION_PAYLOAD))},i.prototype._handleLookupResponse=function(e){var t=e.lookupResponse;t.lookup&&t.lookup.acsUrl&&t.lookup.acsUrl.length>0?e.addFrame(null,this._createIframe({showLoader:e.showLoader,response:t.lookup,removeFrame:e.removeFrame})):this._verifyCardCallback(null,{nonce:t.paymentMethod.nonce,liabilityShiftPossible:t.threeDSecureInfo.liabilityShiftPossible,liabilityShifted:t.threeDSecureInfo.liabilityShifted,verificationDetails:t.threeDSecureInfo})},i.prototype._createIframe=function(e){var t,r,i=window.location.href,n=e.response;return this._bus=new p({channel:u(),merchantUrl:location.href}),r=this._assetsUrl+"/web/"+f+"/html/three-d-secure-authentication-complete-frame.html?channel="+encodeURIComponent(this._bus.channel)+"&",i.indexOf("#")>-1&&(i=i.split("#")[0]),this._bus.on(p.events.CONFIGURATION_REQUEST,function(e){e({acsUrl:n.acsUrl,pareq:n.pareq,termUrl:n.termUrl+"&three_d_secure_version="+f+"&authentication_complete_base_url="+encodeURIComponent(r),md:n.md,parentUrl:i})}),this._bus.on(m.AUTHENTICATION_COMPLETE,function(t){this._handleAuthResponse(t,e)}.bind(this)),t=this._assetsUrl+"/web/"+f+"/html/three-d-secure-bank-frame"+c(this._isDebug)+".html?showLoader="+e.showLoader,this._bankIframe=v({src:t,height:E,width:_,name:d.LANDING_FRAME_NAME+"_"+this._bus.channel}),this._bankIframe},i.prototype._handleAuthResponse=function(e,t){var r=JSON.parse(e.auth_response);this._bus.teardown(),t.removeFrame(),h(function(){r.success?this._verifyCardCallback(null,this._formatAuthResponse(r.paymentMethod,r.threeDSecureInfo)):r.threeDSecureInfo&&r.threeDSecureInfo.liabilityShiftPossible?this._verifyCardCallback(null,this._formatAuthResponse(this._lookupPaymentMethod,r.threeDSecureInfo)):this._verifyCardCallback(new n({type:n.types.UNKNOWN,code:"UNKNOWN_AUTH_RESPONSE",message:r.error.message}))}.bind(this))()},i.prototype._formatAuthResponse=function(e,t){return{nonce:e.nonce,details:e.details,description:e.description,liabilityShifted:t.liabilityShifted,liabilityShiftPossible:t.liabilityShiftPossible}},i.prototype.teardown=function(){var e;return l(this,s(i.prototype)),a.sendEvent(this._options.client,"threedsecure.teardown-completed"),this._bus&&this._bus.teardown(),this._bankIframe&&(e=this._bankIframe.parentNode,e&&e.removeChild(this._bankIframe)),b.resolve()},t.exports=g.wrapPrototype(i)},{"../../lib/analytics":56,"../../lib/assign":57,"../../lib/braintree-error":60,"../../lib/bus":63,"../../lib/convert-methods-to-error":66,"../../lib/deferred":69,"../../lib/methods":78,"../../lib/promise":80,"../../lib/use-min":82,"../../lib/vendor/uuid":84,"../shared/constants":91,"../shared/errors":92,"../shared/events":93,"@braintree/iframer":13,"@braintree/wrap-promise":20}],90:[function(e,t,r){"use strict";function i(e){return o.verify({name:"3D Secure",client:e.client}).then(function(){var t,r,i=e.client.getConfiguration();return i.gatewayConfiguration.threeDSecureEnabled||(t=d.THREEDS_NOT_ENABLED),"TOKENIZATION_KEY"===i.authorizationType&&(t=d.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY),r="production"===i.gatewayConfiguration.environment,r&&!a()&&(t=d.THREEDS_HTTPS_REQUIRED),t?p.reject(new s(t)):(l.sendEvent(e.client,"threedsecure.initialized"),new n(e))})}var n=e("./external/three-d-secure"),a=e("../lib/is-https").isHTTPS,o=e("../lib/basic-component-verification"),s=e("../lib/braintree-error"),l=e("../lib/analytics"),d=e("./shared/errors"),c="3.31.0",p=e("../lib/promise"),u=e("@braintree/wrap-promise");t.exports={create:u(i),VERSION:c}},{"../lib/analytics":56,"../lib/basic-component-verification":58,"../lib/braintree-error":60,"../lib/is-https":75,"../lib/promise":80,"./external/three-d-secure":89,"./shared/errors":92,"@braintree/wrap-promise":20}],91:[function(e,t,r){"use strict";t.exports={LANDING_FRAME_NAME:"braintreethreedsecurelanding"}},{}],92:[function(e,t,r){"use strict";var i=e("../../lib/braintree-error");t.exports={THREEDS_AUTHENTICATION_IN_PROGRESS:{type:i.types.MERCHANT,code:"THREEDS_AUTHENTICATION_IN_PROGRESS",message:"Cannot call verifyCard while existing authentication is in progress."},THREEDS_MISSING_VERIFY_CARD_OPTION:{type:i.types.MERCHANT,code:"THREEDS_MISSING_VERIFY_CARD_OPTION"},THREEDS_NO_VERIFICATION_PAYLOAD:{type:i.types.MERCHANT,code:"THREEDS_NO_VERIFICATION_PAYLOAD",message:"No verification payload available."},THREEDS_NOT_ENABLED:{type:i.types.MERCHANT,code:"THREEDS_NOT_ENABLED",message:"3D Secure is not enabled for this merchant."},THREEDS_CAN_NOT_USE_TOKENIZATION_KEY:{type:i.types.MERCHANT,code:"THREEDS_CAN_NOT_USE_TOKENIZATION_KEY",message:"3D Secure can not use a tokenization key for authorization."},THREEDS_HTTPS_REQUIRED:{type:i.types.MERCHANT,code:"THREEDS_HTTPS_REQUIRED",message:"3D Secure requires HTTPS."},THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN:{type:i.types.INTERNAL,code:"THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN",message:"Term Url must be on a Braintree domain."}}},{"../../lib/braintree-error":60}],93:[function(e,t,r){"use strict";var i=e("../../lib/enumerate");t.exports=i(["AUTHENTICATION_COMPLETE"],"threedsecure:")},{"../../lib/enumerate":71}],94:[function(e,t,r){"use strict";function i(e){return o.verify({name:"Venmo",client:e.client}).then(function(){var t,r=e.client.getConfiguration();return r.gatewayConfiguration.payWithVenmo?(t=new c(e),a.sendEvent(e.client,"venmo.initialized"),t._initialize()):p.reject(new d(s.VENMO_NOT_ENABLED))})}function n(e){return u.isBrowserSupported(e)}var a=e("../lib/analytics"),o=e("../lib/basic-component-verification"),s=e("./shared/errors"),l=e("@braintree/wrap-promise"),d=e("../lib/braintree-error"),c=e("./venmo"),p=e("../lib/promise"),u=e("./shared/supports-venmo"),h="3.31.0";t.exports={create:l(i),isBrowserSupported:n,VERSION:h}},{"../lib/analytics":56,"../lib/basic-component-verification":58,"../lib/braintree-error":60,"../lib/promise":80,"./shared/errors":97,"./shared/supports-venmo":98,"./venmo":99,"@braintree/wrap-promise":20}],95:[function(e,t,r){"use strict";var i=e("@braintree/browser-detection/is-android"),n=e("@braintree/browser-detection/is-chrome"),a=e("@braintree/browser-detection/is-ios"),o=e("@braintree/browser-detection/is-ios-safari"),s=e("@braintree/browser-detection/is-samsung"),l=e("@braintree/browser-detection/is-mobile-firefox");t.exports={isAndroid:i,isChrome:n,isIos:a,isIosSafari:o,isSamsungBrowser:s,isMobileFirefox:l}},{"@braintree/browser-detection/is-android":1,"@braintree/browser-detection/is-chrome":2,"@braintree/browser-detection/is-ios":10,"@braintree/browser-detection/is-ios-safari":8,"@braintree/browser-detection/is-mobile-firefox":11,"@braintree/browser-detection/is-samsung":12}],96:[function(e,t,r){"use strict";t.exports={DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY:500,PROCESS_RESULTS_DELAY:1e3,VENMO_OPEN_URL:"https://venmo.com/braintree/checkout"}},{}],97:[function(e,t,r){"use strict";var i=e("../../lib/braintree-error");t.exports={VENMO_NOT_ENABLED:{type:i.types.MERCHANT,code:"VENMO_NOT_ENABLED",message:"Venmo is not enabled for this merchant."},VENMO_TOKENIZATION_REQUEST_ACTIVE:{type:i.types.MERCHANT,code:"VENMO_TOKENIZATION_REQUEST_ACTIVE",message:"Another tokenization request is active."},VENMO_APP_FAILED:{type:i.types.UNKNOWN,code:"VENMO_APP_FAILED",message:"Venmo app encountered a problem."},VENMO_APP_CANCELED:{type:i.types.CUSTOMER,code:"VENMO_APP_CANCELED",message:"Venmo app authorization was canceled."},VENMO_CANCELED:{type:i.types.CUSTOMER,code:"VENMO_CANCELED",message:"User canceled Venmo authorization, or Venmo app is not available."}}},{"../../lib/braintree-error":60}],98:[function(e,t,r){"use strict";function i(e){var t=n.isAndroid()&&n.isChrome(),r=n.isIos()&&n.isChrome(),i=n.isIosSafari()||t,a=r||n.isSamsungBrowser()||n.isMobileFirefox();return e=e||{allowNewBrowserTab:!0},i||e.allowNewBrowserTab&&a}var n=e("./browser-detection");t.exports={isBrowserSupported:i}},{"./browser-detection":95}],99:[function(e,t,r){(function(r){"use strict";function i(e){var t;this._client=e.client,t=this._client.getConfiguration(),this._isDebug=t.isDebug,this._assetsUrl=t.gatewayConfiguration.assetsUrl+"/web/"+b,this._allowNewBrowserTab=e.allowNewBrowserTab!==!1}function n(){var e=r.location.hash.substring(1).split("&");return e.reduce(function(e,t){var r=t.split("="),i=decodeURIComponent(r[0]),n=decodeURIComponent(r[1]);return e[i]=n,e},{})}function a(){"function"==typeof r.history.replaceState&&history.pushState({},"",r.location.href.slice(0,r.location.href.indexOf("#")))}function o(e,t){return{nonce:t?t.nonce:e.paymentMethodNonce,type:"VenmoAccount",details:{username:e.username}}}function s(){var e;return"undefined"!=typeof r.document.hidden?e="visibilitychange":"undefined"!=typeof r.document.msHidden?e="msvisibilitychange":"undefined"!=typeof r.document.webkitHidden&&(e="webkitvisibilitychange"),e}var l=e("../lib/analytics"),d=e("./shared/supports-venmo"),c=e("./shared/constants"),p=e("./shared/errors"),u=e("../lib/querystring"),h=e("../lib/methods"),y=e("../lib/convert-methods-to-error"),m=e("@braintree/wrap-promise"),f=e("../lib/braintree-error"),v=e("../lib/promise"),b="3.31.0";i.prototype._initialize=function(){var e=r.location.href.replace(r.location.hash,""),t=u.parse(r.location.href),i=this._client.getConfiguration(),n=i.gatewayConfiguration.payWithVenmo,a=this._client.getConfiguration().analyticsMetadata,o={_meta:{version:a.sdkVersion,integration:a.integration,platform:a.platform,sessionId:a.sessionId}};return t["x-success"]=e+"#venmoSuccess=1",t["x-cancel"]=e+"#venmoCancel=1",t["x-error"]=e+"#venmoError=1",t.ua=r.navigator.userAgent,t.braintree_merchant_id=n.merchantId,t.braintree_access_token=n.accessToken,t.braintree_environment=n.environment,t.braintree_sdk_data=btoa(JSON.stringify(o)),this._url=c.VENMO_OPEN_URL+"?"+u.stringify(t),v.resolve(this)},i.prototype.isBrowserSupported=function(){return d.isBrowserSupported({allowNewBrowserTab:this._allowNewBrowserTab})},i.prototype.hasTokenizationResult=function(){var e=n();return"undefined"!=typeof(e.venmoSuccess||e.venmoError||e.venmoCancel)},i.prototype.tokenize=function(){var e=this;return this._tokenizationInProgress===!0?v.reject(new f(p.VENMO_TOKENIZATION_REQUEST_ACTIVE)):this.hasTokenizationResult()?this._processResults():new v(function(t,i){e._tokenizationInProgress=!0,e._previousHash=r.location.hash,r.open(e._url),e._visibilityChangeListener=function(){r.document.hidden||(e._tokenizationInProgress=!1,setTimeout(function(){e._processResults().then(t).catch(i).then(function(){r.location.hash=e._previousHash,e._removeVisibilityEventListener(),delete e._visibilityChangeListener})},c.PROCESS_RESULTS_DELAY))},setTimeout(function(){r.document.addEventListener(s(),e._visibilityChangeListener)},c.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY)})},i.prototype.teardown=function(){return this._removeVisibilityEventListener(),y(this,h(i.prototype)),v.resolve()},i.prototype._removeVisibilityEventListener=function(){r.document.removeEventListener(s(),this._visibilityChangeListener)},i.prototype._processResults=function(){var e=this,t=n();return new v(function(r,i){t.venmoSuccess?(l.sendEvent(e._client,"venmo.appswitch.handle.success"),r(o(t))):t.venmoError?(l.sendEvent(e._client,"venmo.appswitch.handle.error"),i(new f({type:p.VENMO_APP_FAILED.type,code:p.VENMO_APP_FAILED.code,message:p.VENMO_APP_FAILED.message,details:{originalError:{message:decodeURIComponent(t.errorMessage),code:t.errorCode}}}))):t.venmoCancel?(l.sendEvent(e._client,"venmo.appswitch.handle.cancel"),i(new f(p.VENMO_APP_CANCELED))):(l.sendEvent(e._client,"venmo.appswitch.cancel-or-unavailable"),i(new f(p.VENMO_CANCELED))),a()})},t.exports=m.wrapPrototype(i)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/analytics":56,"../lib/braintree-error":60,"../lib/convert-methods-to-error":66,"../lib/methods":78,"../lib/promise":80,"../lib/querystring":81,"./shared/constants":96,"./shared/errors":97,"./shared/supports-venmo":98,"@braintree/wrap-promise":20}],100:[function(e,t,r){"use strict";function i(e){var t;return e?(t=JSON.parse(JSON.stringify(e)),delete t.prefixPattern,delete t.exactPattern,t):null}function n(e){return d[e]||l[e]}function a(e){var t,r,a,o=[],l=[];if(!("string"==typeof e||e instanceof String))return[];for(a=0;a<s.length;a++)t=s[a],r=n(t),0!==e.length?r.exactPattern.test(e)?l.push(i(r)):r.prefixPattern.test(e)&&o.push(i(r)):o.push(i(r));return l.length?l:o}function o(e,t){var r=s.indexOf(e);if(!t&&r===-1)throw new Error('"'+e+'" is not a supported card type.');return r}var s,l={},d={},c="visa",p="master-card",u="american-express",h="diners-club",y="discover",m="jcb",f="unionpay",v="maestro",b="CVV",g="CID",E="CVC",_="CVN",P=[c,p,u,h,y,m,f,v];s=i(P),l[c]={niceType:"Visa",type:c,prefixPattern:/^4$/,exactPattern:/^4\d*$/,gaps:[4,8,12],lengths:[16,18,19],code:{name:b,size:3}},l[p]={niceType:"Mastercard",type:p,prefixPattern:/^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,exactPattern:/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*$/,gaps:[4,8,12],lengths:[16],code:{name:E,size:3}},l[u]={niceType:"American Express",type:u,prefixPattern:/^(3|34|37)$/,exactPattern:/^3[47]\d*$/,isAmex:!0,gaps:[4,10],lengths:[15],code:{name:g,size:4}},l[h]={niceType:"Diners Club",type:h,prefixPattern:/^(3|3[0689]|30[0-5])$/,exactPattern:/^3(0[0-5]|[689])\d*$/,gaps:[4,10],lengths:[14,16,19],code:{name:b,size:3}},l[y]={niceType:"Discover",type:y,prefixPattern:/^(6|60|601|6011|65|64|64[4-9])$/,exactPattern:/^(6011|65|64[4-9])\d*$/,gaps:[4,8,12],lengths:[16,19],code:{name:g,size:3}},l[m]={niceType:"JCB",type:m,prefixPattern:/^(2|21|213|2131|1|18|180|1800|3|35)$/,exactPattern:/^(2131|1800|35)\d*$/,gaps:[4,8,12],lengths:[16,17,18,19],code:{name:b,size:3}},l[f]={niceType:"UnionPay",type:f,prefixPattern:/^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[02,06,07]|628(?!0|1)|629[1,2])|622018)$/,exactPattern:/^(((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[02,06,07]|628(?!0|1)|629[1,2]))\d*|622018\d{12})$/,gaps:[4,8,12],lengths:[16,17,18,19],code:{name:_,size:3}},l[v]={niceType:"Maestro",type:v,prefixPattern:/^(5|5[06-9]|6\d*)$/,exactPattern:/^(5[06-9]|6[37])\d*$/,gaps:[4,8,12],lengths:[12,13,14,15,16,17,18,19],code:{name:E,size:3}},a.getTypeInfo=function(e){return i(n(e))},a.removeCard=function(e){var t=o(e);s.splice(t,1)},a.addCard=function(e){var t=o(e.type,!0);d[e.type]=e,t===-1&&s.push(e.type)},a.changeOrder=function(e,t){var r=o(e);s.splice(r,1),s.splice(t,0,e)},a.resetModifications=function(){s=i(P),d={}},a.types={VISA:c,MASTERCARD:p,AMERICAN_EXPRESS:u,DINERS_CLUB:h,DISCOVER:y,JCB:m,UNIONPAY:f,MAESTRO:v},t.exports=a},{}],101:[function(t,r,i){(function(t){"use strict";!function(n,a){"object"==typeof i&&"undefined"!=typeof r?r.exports=a("undefined"==typeof t?n:t):"function"==typeof e&&e.amd?e([],function(){return a(n)}):n.framebus=a(n)}(this,function(e){function t(e){return null!=e&&(null!=e.Window&&(e.constructor===e.Window&&(_.push(e),!0)))}function r(e){var t,r={};for(t in E)E.hasOwnProperty(t)&&(r[t]=E[t]);return r._origin=e||"*",r}function i(e){var t,r,i=o(this);return!s(e)&&(!s(i)&&(r=Array.prototype.slice.call(arguments,1),t=l(e,r,i),t!==!1&&(m(g.top||g.self,t,i),!0)))}function n(e,t){var r=o(this);return!b(e,t,r)&&(P[r]=P[r]||{},P[r][e]=P[r][e]||[],P[r][e].push(t),!0)}function a(e,t){var r,i,n=o(this);if(b(e,t,n))return!1;if(i=P[n]&&P[n][e],!i)return!1;for(r=0;r<i.length;r++)if(i[r]===t)return i.splice(r,1),!0;return!1}function o(e){return e&&e._origin||"*"}function s(e){return"string"!=typeof e}function l(e,t,r){var i=!1,n={event:e,origin:r},a=t[t.length-1];"function"==typeof a&&(n.reply=v(a,r),t=t.slice(0,-1)),n.args=t;try{i=C+JSON.stringify(n)}catch(e){throw new Error("Could not stringify event: "+e.message)}return i}function d(e){var t,r,i,n;if(e.data.slice(0,C.length)!==C)return!1;try{t=JSON.parse(e.data.slice(C.length))}catch(e){return!1}return null!=t.reply&&(r=e.origin,i=e.source,n=t.reply,t.reply=function(e){var t=l(n,[e],r);return t!==!1&&void i.postMessage(t,r)},t.args.push(t.reply)),t}function c(t){g||(g=t||e,g.addEventListener?g.addEventListener("message",u,!1):g.attachEvent?g.attachEvent("onmessage",u):null===g.onmessage?g.onmessage=u:g=null)}function p(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,r="x"===e?t:3&t|8;return r.toString(16)})}function u(e){var t;s(e.data)||(t=d(e),t&&(h("*",t.event,t.args,e),h(e.origin,t.event,t.args,e),f(e.data,t.origin,e.source)))}function h(e,t,r,i){var n;if(P[e]&&P[e][t])for(n=0;n<P[e][t].length;n++)P[e][t][n].apply(i,r)}function y(e){return e.top===e&&(null!=e.opener&&(e.opener!==e&&e.opener.closed!==!0))}function m(e,t,r){var i;try{for(e.postMessage(t,r),y(e)&&m(e.opener.top,t,r),i=0;i<e.frames.length;i++)m(e.frames[i],t,r)}catch(e){}}function f(e,t,r){var i,n;for(i=_.length-1;i>=0;i--)n=_[i],n.closed===!0?_=_.slice(i,1):r!==n&&m(n.top,e,t)}function v(e,t){function r(n,a){e(n,a),E.target(t).unsubscribe(i,r)}var i=p();return E.target(t).subscribe(i,r),i}function b(e,t,r){return!!s(e)||("function"!=typeof t||!!s(r))}var g,E,_=[],P={},C="/*framebus*/";return c(),E={target:r,include:t,publish:i,pub:i,trigger:i,emit:i,subscribe:n,sub:n,on:n,unsubscribe:a,unsub:a,off:a}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],102:[function(e,t,r){"use strict";function i(){}function n(e,t){return function(){e.apply(t,arguments)}}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function o(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void a._immediateFn(function(){var r=1===e._state?t.onFulfilled:t.onRejected;if(null===r)return void(1===e._state?s:l)(t.promise,e._value);var i;try{i=r(e._value)}catch(e){return void l(t.promise,e)}s(t.promise,i)}))}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof a)return e._state=3,e._value=t,void d(e);if("function"==typeof r)return void p(n(r,t),e)}e._state=1,e._value=t,d(e)}catch(t){l(e,t)}}function l(e,t){e._state=2,e._value=t,d(e)}function d(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function p(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,l(t,e))})}catch(e){if(r)return;r=!0,l(t,e)}}var u=setTimeout;a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var r=new this.constructor(i);return o(this,new c(e,t,r)),r},a.all=function(e){return new a(function(t,r){function i(e,o){try{if(o&&("object"==typeof o||"function"==typeof o)){var s=o.then;if("function"==typeof s)return void s.call(o,function(t){i(e,t)},r)}n[e]=o,0===--a&&t(n)}catch(e){r(e)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var n=Array.prototype.slice.call(e);if(0===n.length)return t([]);for(var a=n.length,o=0;o<n.length;o++)i(o,n[o])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,r){r(e)})},a.race=function(e){return new a(function(t,r){for(var i=0,n=e.length;i<n;i++)e[i].then(t,r)})},a._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){u(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=a},{}],103:[function(e,t,r){(function(r){"use strict";function i(e){return!d(e)&&e.indexOf("Samsung")>-1}function n(e){var t=e||s;return l(t)&&u.test(t)}function a(e){var t=e||s;return l(t)&&d(t)}function o(e){return e=e||s,/SamsungBrowser/.test(e)||i(e)}var s=r.navigator&&r.navigator.userAgent,l=e("@braintree/browser-detection/is-android"),d=e("@braintree/browser-detection/is-chrome"),c=e("@braintree/browser-detection/is-ios"),p=e("@braintree/browser-detection/is-ie9"),u=/Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;t.exports={isIE9:p,isAndroidChrome:a,isIos:c,isKitKatWebview:n,isSamsungBrowser:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"@braintree/browser-detection/is-android":1,"@braintree/browser-detection/is-chrome":2,"@braintree/browser-detection/is-ie9":6,"@braintree/browser-detection/is-ios":10}],104:[function(e,t,r){"use strict";var i=e("./lib/device");t.exports=function(){return!i.isSamsungBrowser()}},{"./lib/device":103}],105:[function(e,t,r){"use strict";t.exports={paymentOptionIDs:{card:"card",paypal:"paypal",paypalCredit:"paypalCredit",applePay:"applePay",venmo:"venmo",googlePay:"googlePay"},paymentMethodTypes:{card:"CreditCard",paypal:"PayPalAccount",paypalCredit:"PayPalAccount",applePay:"ApplePayCard",venmo:"VenmoAccount",googlePay:"AndroidPayCard"},analyticsKinds:{CreditCard:"card",PayPalAccount:"paypal",ApplePayCard:"applepay",VenmoAccount:"venmo",AndroidPayCard:"googlepay"},paymentMethodCardTypes:{Visa:"visa",MasterCard:"master-card","American Express":"american-express","Diners Club":"diners-club",Discover:"discover",JCB:"jcb",UnionPay:"unionpay",Maestro:"maestro"},configurationCardTypes:{visa:"Visa","master-card":"MasterCard","american-express":"American Express","diners-club":"Discover",discover:"Discover",jcb:"JCB",unionpay:"UnionPay",maestro:"Maestro"},errors:{NO_PAYMENT_METHOD_ERROR:"No payment method is available.",PAYPAL_NON_LINKED_SANDBOX:'A <a href="https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing" target="_blank" rel="nofollow">linked sandbox account</a> is required to use PayPal Checkout in sandbox.'},ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ANALYTICS_PREFIX:"web.dropin.",CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT:200,CHECKOUT_JS_SOURCE:"https://www.paypalobjects.com/api/checkout.min.js",GOOGLE_PAYMENT_SOURCE:"https://payments.developers.google.com/js/apis/pay.js",INTEGRATION:"dropin2",PAYPAL_CHECKOUT_SCRIPT_ID:"braintree-dropin-paypal-checkout-script",GOOGLE_PAYMENT_SCRIPT_ID:"braintree-dropin-google-payment-script",DATA_COLLECTOR_SCRIPT_ID:"braintree-dropin-data-collector-script",STYLESHEET_ID:"braintree-dropin-stylesheet"}},{}],106:[function(e,t,r){"use strict";function i(e){this.componentID=e.componentID,this.merchantConfiguration=e.merchantConfiguration,this.isGuestCheckout=h(e.client),this.dependenciesInitializing=0,this.dependencySuccessCount=0,this.failedDependencies={},this._options=e,d.call(this)}function n(e){var t,r=e.merchantConfiguration.paymentOptionPriority||v;if(!(r instanceof Array))throw new l("paymentOptionPriority must be an array.");return r=r.filter(function(e,t){return r.indexOf(e)===t}),t=r.map(function(t){return a(t,e)}),y.all(t).then(function(e){return e=e.filter(function(e){return e.success}),0===e.length?y.reject(new l("No valid payment options available.")):e.map(function(e){return e.id})})}function a(e,t){return o(e,t).then(function(t){return{success:t,id:u[e]}})}function o(e,t){var r=m[u[e]];return r?r.isEnabled({client:t.client,merchantConfiguration:t.merchantConfiguration}):y.reject(new l("paymentOptionPriority: Invalid payment option specified."))}function s(e){return e&&f.indexOf(e)===-1}var l=e("./lib/dropin-error"),d=e("./lib/event-emitter"),c=e("./constants"),p=c.paymentMethodTypes,u=c.paymentOptionIDs,h=e("./lib/is-guest-checkout"),y=e("./lib/promise"),m=e("./views/payment-sheet-views"),f=[p.applePay,p.googlePay,p.venmo],v=[u.card,u.paypal,u.paypalCredit,u.venmo,u.applePay,u.googlePay];i.prototype=Object.create(d.prototype,{constructor:i}),i.prototype.initialize=function(){return n(this._options).then(function(e){this.supportedPaymentOptions=e,this._paymentMethods=this._getSupportedPaymentMethods(this._options.paymentMethods),this._paymentMethodIsRequestable=this._paymentMethods.length>0}.bind(this))},i.prototype.isPaymentMethodRequestable=function(){return Boolean(this._paymentMethodIsRequestable)},i.prototype.addPaymentMethod=function(e){this._paymentMethods.push(e),this._emit("addPaymentMethod",e),this.changeActivePaymentMethod(e)},i.prototype.removePaymentMethod=function(e){var t=this._paymentMethods.indexOf(e);t!==-1&&(this._paymentMethods.splice(t,1),this._emit("removePaymentMethod",e))},i.prototype.changeActivePaymentMethod=function(e){this._activePaymentMethod=e,this._emit("changeActivePaymentMethod",e)},i.prototype.changeActivePaymentView=function(e){this._activePaymentView=e,this._emit("changeActivePaymentView",e)},i.prototype.removeActivePaymentMethod=function(){this._activePaymentMethod=null,this._emit("removeActivePaymentMethod"),this.setPaymentMethodRequestable({isRequestable:!1})},i.prototype.selectPaymentOption=function(e){this._emit("paymentOptionSelected",{paymentOption:e})},i.prototype._shouldEmitRequestableEvent=function(e){var t=this.isPaymentMethodRequestable()===e.isRequestable,r=e.type===this._paymentMethodRequestableType;return!(t&&(!e.isRequestable||r))},i.prototype.setPaymentMethodRequestable=function(e){var t=this._shouldEmitRequestableEvent(e),r={paymentMethodIsSelected:Boolean(e.selectedPaymentMethod),type:e.type};this._paymentMethodIsRequestable=e.isRequestable,e.isRequestable?this._paymentMethodRequestableType=e.type:delete this._paymentMethodRequestableType,t&&(e.isRequestable?this._emit("paymentMethodRequestable",r):this._emit("noPaymentMethodRequestable"))},i.prototype.getPaymentMethods=function(){return this._paymentMethods.slice()},i.prototype.getActivePaymentMethod=function(){return this._activePaymentMethod},i.prototype.getActivePaymentView=function(){return this._activePaymentView},i.prototype.reportAppSwitchPayload=function(e){this.appSwitchPayload=e},i.prototype.reportAppSwitchError=function(e,t){this.appSwitchError={id:e,error:t}},i.prototype.asyncDependencyStarting=function(){this.dependenciesInitializing++},i.prototype.asyncDependencyReady=function(){this.dependencySuccessCount++,this.dependenciesInitializing--,this._checkAsyncDependencyFinished()},i.prototype.asyncDependencyFailed=function(e){this.failedDependencies.hasOwnProperty(e.view)||(this.failedDependencies[e.view]=e.error,this.dependenciesInitializing--,this._checkAsyncDependencyFinished())},i.prototype._checkAsyncDependencyFinished=function(){0===this.dependenciesInitializing&&this._emit("asyncDependenciesReady")},i.prototype.cancelInitialization=function(e){this._emit("cancelInitialization",e)},i.prototype.reportError=function(e){this._emit("errorOccurred",e)},i.prototype.clearError=function(){this._emit("errorCleared")},i.prototype._getSupportedPaymentMethods=function(e){var t=this.supportedPaymentOptions.reduce(function(e,t){var r=p[t];return s(r)&&e.push(r),e},[]);return e.filter(function(e){return t.indexOf(e.type)>-1})},t.exports=i},{"./constants":105,"./lib/dropin-error":116,"./lib/event-emitter":117,"./lib/is-guest-checkout":119,"./lib/promise":124,"./views/payment-sheet-views":163}],107:[function(e,t,r){(function(r){"use strict";function i(e){this._client=e.client,this._componentID=g(),this._dropinWrapper=document.createElement("div"),this._dropinWrapper.id="braintree--dropin__"+this._componentID,this._dropinWrapper.setAttribute("data-braintree-id","wrapper"),this._dropinWrapper.style.display="none",this._dropinWrapper.className="braintree-loading",this._merchantConfiguration=e.merchantConfiguration,c.call(this)}function n(e){var t={nonce:e.nonce,details:e.details,type:e.type};return null!=e.vaulted&&(t.vaulted=e.vaulted),e.type===s.paymentMethodTypes.card&&(t.description=e.description),e.type===s.paymentMethodTypes.googlePay&&(t.details.rawPaymentData=e.rawPaymentData),"boolean"==typeof e.liabilityShiftPossible&&(t.liabilityShifted=e.liabilityShifted,t.liabilityShiftPossible=e.liabilityShiftPossible),e.deviceData&&(t.deviceData=e.deviceData),e.binData&&(t.binData=e.binData),t}var a=e("./lib/assign").assign,o=e("./lib/analytics"),s=e("./constants"),l=e("./lib/dropin-error"),d=e("./dropin-model"),c=e("./lib/event-emitter"),p=e("./lib/is-guest-checkout"),u=e("./lib/assets"),h=e("./views/main-view"),y=e("./views/payment-methods-view").ID,m=e("./views/payment-options-view").ID,f=s.paymentOptionIDs,v=e("./translations"),b=e("./lib/is-utf-8"),g=e("./lib/uuid"),E=e("./lib/promise"),_=e("./lib/sanitize-html"),P=e("./lib/three-d-secure"),C=e("@braintree/wrap-promise").wrapPrototype,T='<div class="braintree-dropin">\n  <div data-braintree-id="methods-label" class="braintree-heading">&nbsp;</div>\n  <div data-braintree-id="choose-a-way-to-pay" class="braintree-heading">{{chooseAWayToPay}}</div>\n  <div class="braintree-placeholder">&nbsp;</div>\n\n  <div data-braintree-id="upper-container" class="braintree-upper-container">\n    <div data-braintree-id="loading-container" class="braintree-loader__container">\n      <div data-braintree-id="loading-indicator" class="braintree-loader__indicator">\n        <svg width="14" height="16" class="braintree-loader__lock">\n          <use xlink:href="#iconLockLoader"></use>\n        </svg>\n      </div>\n    </div>\n\n    <div data-braintree-id="methods" class="braintree-methods braintree-methods-initial">\n      <div data-braintree-id="methods-container"></div>\n    </div>\n\n    <div data-braintree-id="options" class="braintree-test-class braintree-options braintree-options-initial">\n      <div data-braintree-id="payment-options-container" class="braintree-options-list"></div>\n    </div>\n\n    <div data-braintree-id="sheet-container" class="braintree-sheet__container">\n      <div data-braintree-id="paypal" class="braintree-paypal braintree-sheet">\n        <div data-braintree-id="paypal-sheet-header" class="braintree-sheet__header">\n          <div class="braintree-sheet__header-label">\n            <div class="braintree-sheet__logo--header">\n              <svg width="40" height="24">\n                <use xlink:href="#logoPayPal"></use>\n              </svg>\n            </div>\n            <div class="braintree-sheet__label">{{PayPal}}</div>\n          </div>\n        </div>\n        <div class="braintree-sheet__content braintree-sheet__content--button">\n          <div data-braintree-id="paypal-button" class="braintree-sheet__button--paypal"></div>\n        </div>\n      </div>\n      <div data-braintree-id="paypalCredit" class="braintree-paypalCredit braintree-sheet">\n        <div data-braintree-id="paypal-credit-sheet-header" class="braintree-sheet__header">\n          <div class="braintree-sheet__header-label">\n            <div class="braintree-sheet__logo--header">\n              <svg width="40" height="24">\n                <use xlink:href="#logoPayPalCredit"></use>\n              </svg>\n            </div>\n            <div class="braintree-sheet__label">{{PayPal Credit}}</div>\n          </div>\n        </div>\n        <div class="braintree-sheet__content braintree-sheet__content--button">\n          <div data-braintree-id="paypal-credit-button" class="braintree-sheet__button--paypal"></div>\n        </div>\n      </div>\n      <div data-braintree-id="applePay" class="braintree-applePay braintree-sheet">\n        <div data-braintree-id="apple-pay-sheet-header" class="braintree-sheet__header">\n          <div class="braintree-sheet__header-label">\n            <div class="braintree-sheet__logo--header">\n              <svg height="24" width="40">\n              <use xlink:href="#logoApplePay"></use>\n              </svg>\n            </div>\n            <div class="braintree-sheet__label">{{Apple Pay}}</div>\n          </div>\n        </div>\n        <div class="braintree-sheet__content braintree-sheet__content--button">\n          <div data-braintree-id="apple-pay-button" class="braintree-sheet__button--apple-pay apple-pay-button"></div>\n        </div>\n      </div>\n      <div data-braintree-id="googlePay" class="braintree-googlePay braintree-sheet">\n        <div data-braintree-id="google-pay-sheet-header" class="braintree-sheet__header">\n          <div class="braintree-sheet__header-label">\n            <div class="braintree-sheet__logo--header">\n              <svg height="24" width="40">\n              <use xlink:href="#logoGooglePay"></use>\n              </svg>\n            </div>\n            <div class="braintree-sheet__label">{{Google Pay}}</div>\n          </div>\n        </div>\n        <div class="braintree-sheet__content braintree-sheet__content--button">\n          <button type="button" data-braintree-id="google-pay-button" class="braintree-sheet__button--google-pay google-pay-button"></button>\n        </div>\n      </div>\n      <div data-braintree-id="venmo" class="braintree-venmo braintree-sheet">\n        <div data-braintree-id="venmo-sheet-header" class="braintree-sheet__header">\n          <div class="braintree-sheet__header-label">\n            <div class="braintree-sheet__logo--header">\n              <svg height="24" width="40">\n              <use xlink:href="#logoVenmo"></use>\n              </svg>\n            </div>\n            <div class="braintree-sheet__label">{{Venmo}}</div>\n          </div>\n        </div>\n        <div class="braintree-sheet__content braintree-sheet__content--button">\n          <svg data-braintree-id="venmo-button" class="braintree-sheet__button--venmo">\n            <use xlink:href="#buttonVenmo"></use>\n          </svg>\n        </div>\n      </div>\n      <div data-braintree-id="card" class="braintree-card braintree-form braintree-sheet">\n        <div data-braintree-id="card-sheet-header" class="braintree-sheet__header">\n          <div class="braintree-sheet__header-label">\n            <div class="braintree-sheet__logo--header">\n              <svg width="40" height="24" class="braintree-icon--bordered">\n                <use xlink:href="#iconCardFront"></use>\n              </svg>\n            </div>\n            <div class="braintree-sheet__text">{{payWithCard}}</div>\n          </div>\n          <div data-braintree-id="card-view-icons" class="braintree-sheet__icons"></div>\n        </div>\n        <div class="braintree-sheet__content braintree-sheet__content--form">\n          <div data-braintree-id="cardholder-name-field-group" class="braintree-form__field-group">\n            <label for="braintree__card-view-input__cardholder-name">\n              <div class="braintree-form__label">{{cardholderNameLabel}}</div>\n              <div class="braintree-form__field">\n                <div class="braintree-form-cardholder-name braintree-form__hosted-field">\n                  <input id="braintree__card-view-input__cardholder-name" type="text" placeholder="{{cardholderNamePlaceholder}}"/>\n                </div>\n                <div class="braintree-form__icon-container">\n                  <div class="braintree-form__icon braintree-form__field-error-icon">\n                    <svg width="24" height="24">\n                      <use xlink:href="#iconError"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n            </label>\n            <div data-braintree-id="cardholder-name-field-error" class="braintree-form__field-error"></div>\n          </div>\n          <div data-braintree-id="number-field-group" class="braintree-form__field-group">\n            <label>\n              <div class="braintree-form__label">{{cardNumberLabel}}</div>\n              <div class="braintree-form__field">\n                <div class="braintree-form-number braintree-form__hosted-field"></div>\n                <div class="braintree-form__icon-container">\n                  <div data-braintree-id="card-number-icon" class="braintree-form__icon braintree-form__field-secondary-icon">\n                    <svg width="40" height="24" class="braintree-icon--bordered">\n                    <use data-braintree-id="card-number-icon-svg" xlink:href="#iconCardFront"></use>\n                    </svg>\n                  </div>\n                  <div class="braintree-form__icon braintree-form__field-error-icon">\n                    <svg width="24" height="24">\n                      <use xlink:href="#iconError"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n            </label>\n            <div data-braintree-id="number-field-error" class="braintree-form__field-error"></div>\n          </div>\n\n          <div class="braintree-form__flexible-fields">\n            <div data-braintree-id="expiration-date-field-group" class="braintree-form__field-group">\n              <label>\n                <div class="braintree-form__label">{{expirationDateLabel}}\n                  <span class="braintree-form__descriptor">{{expirationDateLabelSubheading}}</span>\n                </div>\n                <div class="braintree-form__field">\n                  <div class="braintree-form__hosted-field braintree-form-expiration"></div>\n                  <div class="braintree-form__icon-container">\n                    <div class="braintree-form__icon braintree-form__field-error-icon">\n                      <svg width="24" height="24">\n                        <use xlink:href="#iconError"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n\n                <div data-braintree-id="expiration-date-field-error" class="braintree-form__field-error"></div>\n              </div>\n            </label>\n\n            <div data-braintree-id="cvv-field-group" class="braintree-form__field-group">\n              <label>\n                <div class="braintree-form__label">{{cvvLabel}}\n                  <span data-braintree-id="cvv-label-descriptor" class="braintree-form__descriptor">{{cvvThreeDigitLabelSubheading}}</span>\n                </div>\n                <div class="braintree-form__field">\n                  <div class="braintree-form__hosted-field braintree-form-cvv"></div>\n                  <div class="braintree-form__icon-container">\n                    <div data-braintree-id="cvv-icon" class="braintree-form__icon braintree-form__field-secondary-icon">\n                      <svg width="40" height="24" class="braintree-icon--bordered">\n                      <use data-braintree-id="cvv-icon-svg" xlink:href="#iconCVVBack"></use>\n                      </svg>\n                    </div>\n                    <div class="braintree-form__icon braintree-form__field-error-icon">\n                      <svg width="24" height="24">\n                        <use xlink:href="#iconError"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id="cvv-field-error" class="braintree-form__field-error"></div>\n            </div>\n\n            <div data-braintree-id="postal-code-field-group" class="braintree-form__field-group">\n              <label>\n                <div class="braintree-form__label">{{postalCodeLabel}}</div>\n                <div class="braintree-form__field">\n                  <div class="braintree-form__hosted-field braintree-form-postal-code"></div>\n                  <div class="braintree-form__icon-container">\n                    <div class="braintree-form__icon braintree-form__field-error-icon">\n                      <svg width="24" height="24">\n                        <use xlink:href="#iconError"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id="postal-code-field-error" class="braintree-form__field-error"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div data-braintree-id="sheet-error" class="braintree-sheet__error">\n        <div class="braintree-form__icon braintree-sheet__error-icon">\n          <svg width="24" height="24">\n            <use xlink:href="#iconError"></use>\n          </svg>\n        </div>\n        <div data-braintree-id="sheet-error-text" class="braintree-sheet__error-text"></div>\n      </div>\n    </div>\n  </div>\n\n  <div data-braintree-id="lower-container" class="braintree-test-class braintree-options braintree-hidden">\n    <div data-braintree-id="other-ways-to-pay" class="braintree-heading">{{otherWaysToPay}}</div>\n  </div>\n\n  <div data-braintree-id="toggle" class="braintree-toggle braintree-hidden" tabindex="0">\n    <span>{{chooseAnotherWayToPay}}</span>\n  </div>\n</div>\n',I='<svg data-braintree-id="svgs" style="display: none">\n  <defs>\n    <symbol id="icon-visa" viewBox="0 0 40 24">\n      <title>Visa</title>\n      <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: #FFF" />\n      <path d="M0 22.033C0 23.12.892 24 1.992 24h36.016c1.1 0 1.992-.88 1.992-1.967V20.08H0v1.953z" style="fill: #F8B600" />\n      <path d="M0 3.92h40V1.967C40 .88 39.108 0 38.008 0H1.992C.892 0 0 .88 0 1.967V3.92zM19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z" style="fill: #1A1F71" />\n    </symbol>\n\n    <symbol id="icon-master-card" viewBox="0 0 40 24">\n      <title>MasterCard</title>\n      <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: #FFF" />\n      <path d="M11.085 22.2v-1.36c0-.522-.318-.863-.864-.863-.272 0-.568.09-.773.386-.16-.25-.386-.386-.727-.386-.228 0-.455.068-.637.318v-.272h-.478V22.2h.478v-1.202c0-.386.204-.567.523-.567.318 0 .478.205.478.568V22.2h.477v-1.202c0-.386.23-.567.524-.567.32 0 .478.205.478.568V22.2h.523zm7.075-2.177h-.774v-.658h-.478v.658h-.432v.43h.432v.998c0 .5.205.795.75.795.206 0 .433-.068.592-.16l-.136-.407c-.136.09-.296.114-.41.114-.227 0-.318-.137-.318-.363v-.976h.774v-.43zm4.048-.046c-.273 0-.454.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .204.023.295.046l.137-.454c-.09-.023-.228-.023-.32-.023zm-6.118.227c-.228-.16-.546-.227-.888-.227-.546 0-.91.272-.91.703 0 .363.274.567.75.635l.23.023c.25.045.385.113.385.227 0 .16-.182.272-.5.272-.32 0-.57-.113-.728-.227l-.228.363c.25.18.59.272.932.272.637 0 1-.295 1-.703 0-.385-.295-.59-.75-.658l-.227-.022c-.205-.023-.364-.068-.364-.204 0-.16.16-.25.41-.25.272 0 .545.114.682.182l.205-.386zm12.692-.227c-.273 0-.455.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .203.023.294.046L29.1 20c-.09-.023-.227-.023-.318-.023zm-6.096 1.134c0 .66.455 1.135 1.16 1.135.32 0 .546-.068.774-.25l-.228-.385c-.182.136-.364.204-.57.204-.385 0-.658-.272-.658-.703 0-.407.273-.68.66-.702.204 0 .386.068.568.204l.228-.385c-.228-.182-.455-.25-.774-.25-.705 0-1.16.477-1.16 1.134zm4.413 0v-1.087h-.48v.272c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.317 0 .545-.113.68-.317v.272h.48v-1.09zm-1.753 0c0-.384.25-.702.66-.702.387 0 .66.295.66.703 0 .387-.273.704-.66.704-.41-.022-.66-.317-.66-.703zm-5.71-1.133c-.636 0-1.09.454-1.09 1.134 0 .682.454 1.135 1.114 1.135.32 0 .638-.09.888-.295l-.228-.34c-.18.136-.41.227-.636.227-.296 0-.592-.136-.66-.522h1.615v-.18c.022-.704-.388-1.158-1.002-1.158zm0 .41c.297 0 .502.18.547.52h-1.137c.045-.295.25-.52.59-.52zm11.852.724v-1.95h-.48v1.135c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.68-.317v.272h.48v-1.09zm-1.752 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703zm-15.97 0v-1.087h-.476v.272c-.16-.204-.387-.318-.683-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.682-.317v.272h.477v-1.09zm-1.773 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703z" style="fill: #000" />\n      <path style="fill: #FF5F00" d="M23.095 3.49H15.93v12.836h7.165" />\n      <path d="M16.382 9.91c0-2.61 1.23-4.922 3.117-6.42-1.39-1.087-3.14-1.745-5.05-1.745-4.528 0-8.19 3.65-8.19 8.164 0 4.51 3.662 8.162 8.19 8.162 1.91 0 3.66-.657 5.05-1.746-1.89-1.474-3.118-3.81-3.118-6.417z" style="fill: #EB001B" />\n      <path d="M32.76 9.91c0 4.51-3.664 8.162-8.19 8.162-1.91 0-3.662-.657-5.05-1.746 1.91-1.496 3.116-3.81 3.116-6.417 0-2.61-1.228-4.922-3.116-6.42 1.388-1.087 3.14-1.745 5.05-1.745 4.526 0 8.19 3.674 8.19 8.164z" style="fill: #F79E1B" />\n    </symbol>\n\n    <symbol id="icon-unionpay" viewBox="0 0 40 24">\n      <title>Union Pay</title>\n      <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: #FFF" />\n      <path d="M9.877 2h8.126c1.135 0 1.84.93 1.575 2.077l-3.783 16.35c-.267 1.142-1.403 2.073-2.538 2.073H5.13c-1.134 0-1.84-.93-1.574-2.073L7.34 4.076C7.607 2.93 8.74 2 9.878 2z" style="fill: #E21836" />\n      <path d="M17.325 2h9.345c1.134 0 .623.93.356 2.077l-3.783 16.35c-.265 1.142-.182 2.073-1.32 2.073H12.58c-1.137 0-1.84-.93-1.574-2.073l3.783-16.35C15.056 2.93 16.19 2 17.324 2z" style="fill: #00447B" />\n      <path d="M26.3 2h8.126c1.136 0 1.84.93 1.575 2.077l-3.782 16.35c-.266 1.142-1.402 2.073-2.54 2.073h-8.122c-1.137 0-1.842-.93-1.574-2.073l3.78-16.35C24.03 2.93 25.166 2 26.303 2z" style="fill: #007B84" />\n      <path d="M27.633 14.072l-.99 3.3h.266l-.208.68h-.266l-.062.212h-.942l.064-.21H23.58l.193-.632h.194l1.005-3.35.2-.676h.962l-.1.34s.255-.184.498-.248c.242-.064 1.636-.088 1.636-.088l-.206.672h-.33zm-1.695 0l-.254.843s.285-.13.44-.172c.16-.04.395-.057.395-.057l.182-.614h-.764zm-.38 1.262l-.263.877s.29-.15.447-.196c.157-.037.396-.066.396-.066l.185-.614h-.766zm-.614 2.046h.767l.222-.74h-.765l-.223.74z" style="fill: #FEFEFE" />\n      <path d="M28.055 13.4h1.027l.01.385c-.005.065.05.096.17.096h.208l-.19.637h-.555c-.48.035-.662-.172-.65-.406l-.02-.71zM28.193 16.415h-.978l.167-.566H28.5l.16-.517h-1.104l.19-.638h3.072l-.193.638h-1.03l-.16.516h1.032l-.17.565H29.18l-.2.24h.454l.11.712c.013.07.014.116.036.147.023.026.158.038.238.038h.137l-.21.694h-.348c-.054 0-.133-.004-.243-.01-.105-.008-.18-.07-.25-.105-.064-.03-.16-.11-.182-.24l-.11-.712-.507.7c-.162.222-.38.39-.748.39h-.712l.186-.62h.273c.078 0 .15-.03.2-.056.052-.023.098-.05.15-.126l.74-1.05zM17.478 14.867h2.59l-.19.622H18.84l-.16.53h1.06l-.194.64h-1.06l-.256.863c-.03.095.25.108.353.108l.53-.072-.212.71h-1.193c-.096 0-.168-.013-.272-.037-.1-.023-.145-.07-.19-.138-.043-.07-.11-.128-.064-.278l.343-1.143h-.588l.195-.65h.592l.156-.53h-.588l.188-.623zM19.223 13.75h1.063l-.194.65H18.64l-.157.136c-.067.066-.09.038-.18.087-.08.04-.254.123-.477.123h-.466l.19-.625h.14c.118 0 .198-.01.238-.036.046-.03.098-.096.157-.203l.267-.487h1.057l-.187.356zM20.74 13.4h.905l-.132.46s.286-.23.487-.313c.2-.075.65-.143.65-.143l1.464-.007-.498 1.672c-.085.286-.183.472-.244.555-.055.087-.12.16-.248.23-.124.066-.236.104-.34.115-.096.007-.244.01-.45.012h-1.41l-.4 1.324c-.037.13-.055.194-.03.23.02.03.068.066.135.066l.62-.06-.21.726h-.698c-.22 0-.383-.004-.495-.013-.108-.01-.22 0-.295-.058-.065-.058-.164-.133-.162-.21.007-.073.037-.192.082-.356l1.268-4.23zm1.922 1.69h-1.484l-.09.3h1.283c.152-.018.184.004.196-.003l.096-.297zm-1.402-.272s.29-.266.786-.353c.112-.022.82-.015.82-.015l.106-.357h-1.496l-.216.725z" style="fill: #FEFEFE" />\n      <path d="M23.382 16.1l-.084.402c-.036.125-.067.22-.16.302-.1.084-.216.172-.488.172l-.502.02-.004.455c-.006.13.028.117.048.138.024.022.045.032.067.04l.157-.008.48-.028-.198.663h-.552c-.385 0-.67-.008-.765-.084-.092-.057-.105-.132-.103-.26l.035-1.77h.88l-.013.362h.212c.072 0 .12-.007.15-.026.027-.02.047-.048.06-.093l.087-.282h.692zM10.84 7.222c-.032.143-.596 2.763-.598 2.764-.12.53-.21.91-.508 1.152-.172.14-.37.21-.6.21-.37 0-.587-.185-.624-.537l-.007-.12.113-.712s.593-2.388.7-2.703c.002-.017.005-.026.007-.035-1.152.01-1.357 0-1.37-.018-.007.024-.037.173-.037.173l-.605 2.688-.05.23-.1.746c0 .22.042.4.13.553.275.485 1.06.557 1.504.557.573 0 1.11-.123 1.47-.345.63-.375.797-.962.944-1.48l.067-.267s.61-2.48.716-2.803c.003-.017.006-.026.01-.035-.835.01-1.08 0-1.16-.018zM14.21 12.144c-.407-.006-.55-.006-1.03.018l-.018-.036c.042-.182.087-.363.127-.548l.06-.25c.086-.39.173-.843.184-.98.007-.084.036-.29-.2-.29-.1 0-.203.048-.307.096-.058.207-.174.79-.23 1.055-.118.558-.126.62-.178.897l-.036.037c-.42-.006-.566-.006-1.05.018l-.024-.04c.08-.332.162-.668.24-.998.203-.9.25-1.245.307-1.702l.04-.028c.47-.067.585-.08 1.097-.185l.043.047-.077.287c.086-.052.168-.104.257-.15.242-.12.51-.155.658-.155.223 0 .468.062.57.323.098.232.034.52-.094 1.084l-.066.287c-.13.627-.152.743-.225 1.174l-.05.036zM15.87 12.144c-.245 0-.405-.006-.56 0-.153 0-.303.008-.532.018l-.013-.02-.015-.02c.062-.238.097-.322.128-.406.03-.084.06-.17.115-.41.072-.315.116-.535.147-.728.033-.187.052-.346.075-.53l.02-.014.02-.018c.244-.036.4-.057.56-.082.16-.024.32-.055.574-.103l.008.023.008.022c-.047.195-.094.39-.14.588-.047.197-.094.392-.137.587-.093.414-.13.57-.152.68-.02.105-.026.163-.063.377l-.022.02-.023.017zM19.542 10.728c.143-.633.033-.928-.108-1.11-.213-.273-.59-.36-.978-.36-.235 0-.793.023-1.23.43-.312.29-.458.687-.546 1.066-.088.387-.19 1.086.447 1.344.198.085.48.108.662.108.466 0 .945-.13 1.304-.513.278-.312.405-.775.448-.965zm-1.07-.046c-.02.106-.113.503-.24.673-.086.123-.19.198-.305.198-.033 0-.235 0-.238-.3-.003-.15.027-.304.063-.47.108-.478.236-.88.56-.88.255 0 .27.298.16.78zM29.536 12.187c-.493-.004-.635-.004-1.09.015l-.03-.037c.124-.472.248-.943.358-1.42.142-.62.175-.882.223-1.244l.037-.03c.49-.07.625-.09 1.135-.186l.015.044c-.093.388-.186.777-.275 1.166-.19.816-.258 1.23-.33 1.658l-.044.035z" style="fill: #FEFEFE" />\n      <path d="M29.77 10.784c.144-.63-.432-.056-.525-.264-.14-.323-.052-.98-.62-1.2-.22-.085-.732.025-1.17.428-.31.29-.458.683-.544 1.062-.088.38-.19 1.078.444 1.328.2.085.384.11.567.103.638-.034 1.124-1.002 1.483-1.386.277-.303.326.115.368-.07zm-.974-.047c-.024.1-.117.503-.244.67-.083.117-.283.192-.397.192-.032 0-.232 0-.24-.3 0-.146.03-.3.067-.467.11-.47.235-.87.56-.87.254 0 .363.293.254.774zM22.332 12.144c-.41-.006-.55-.006-1.03.018l-.018-.036c.04-.182.087-.363.13-.548l.057-.25c.09-.39.176-.843.186-.98.008-.084.036-.29-.198-.29-.1 0-.203.048-.308.096-.057.207-.175.79-.232 1.055-.115.558-.124.62-.176.897l-.035.037c-.42-.006-.566-.006-1.05.018l-.022-.04.238-.998c.203-.9.25-1.245.307-1.702l.038-.028c.472-.067.587-.08 1.098-.185l.04.047-.073.287c.084-.052.17-.104.257-.15.24-.12.51-.155.655-.155.224 0 .47.062.575.323.095.232.03.52-.098 1.084l-.065.287c-.133.627-.154.743-.225 1.174l-.05.036zM26.32 8.756c-.07.326-.282.603-.554.736-.225.114-.498.123-.78.123h-.183l.013-.074.336-1.468.01-.076.007-.058.132.015.71.062c.275.105.388.38.31.74zM25.88 7.22l-.34.003c-.883.01-1.238.006-1.383-.012l-.037.182-.315 1.478-.793 3.288c.77-.01 1.088-.01 1.22.004l.21-1.024s.153-.644.163-.667c0 0 .047-.066.096-.092h.07c.665 0 1.417 0 2.005-.437.4-.298.675-.74.797-1.274.03-.132.054-.29.054-.446 0-.205-.04-.41-.16-.568-.3-.423-.896-.43-1.588-.433zM33.572 9.28l-.04-.043c-.502.1-.594.118-1.058.18l-.034.034-.005.023-.003-.007c-.345.803-.334.63-.615 1.26-.003-.03-.003-.048-.004-.077l-.07-1.37-.044-.043c-.53.1-.542.118-1.03.18l-.04.034-.006.056.003.007c.06.315.047.244.108.738.03.244.065.49.093.73.05.4.077.6.134 1.21-.328.55-.408.757-.722 1.238l.017.044c.478-.018.587-.018.94-.018l.08-.088c.265-.578 2.295-4.085 2.295-4.085zM16.318 9.62c.27-.19.304-.45.076-.586-.23-.137-.634-.094-.906.095-.273.186-.304.45-.075.586.228.134.633.094.905-.096z" style="fill: #FEFEFE" />\n      <path d="M31.238 13.415l-.397.684c-.124.232-.357.407-.728.41l-.632-.01.184-.618h.124c.064 0 .11-.004.148-.022.03-.01.054-.035.08-.072l.233-.373h.988z" style="fill: #FEFEFE" />\n    </symbol>\n\n    <symbol id="icon-american-express" viewBox="0 0 40 24">\n      <title>American Express</title>\n      <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: #FFF" />\n      <path style="fill: #1478BE" d="M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z" />\n      <path d="M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z" style="fill: #1478BE" />\n    </symbol>\n\n    <symbol id="icon-jcb" viewBox="0 0 40 24">\n      <title>JCB</title>\n      <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: #FFF" />\n      <path d="M33.273 2.01h.013v17.062c-.004 1.078-.513 2.103-1.372 2.746-.63.47-1.366.67-2.14.67-.437 0-4.833.026-4.855 0-.01-.01 0-.07 0-.082v-6.82c0-.04.004-.064.033-.064h5.253c.867 0 1.344-.257 1.692-.61.44-.448.574-1.162.294-1.732-.24-.488-.736-.78-1.244-.913-.158-.04-.32-.068-.483-.083-.01 0-.064 0-.07-.006-.03-.034.023-.04.038-.046.102-.033.215-.042.32-.073.532-.164.993-.547 1.137-1.105.15-.577-.05-1.194-.524-1.552-.34-.257-.768-.376-1.187-.413-.43-.038-4.774-.022-5.21-.022-.072 0-.05-.02-.05-.09V5.63c0-.31.01-.616.073-.92.126-.592.41-1.144.815-1.59.558-.615 1.337-1.01 2.16-1.093.478-.048 4.89-.017 5.305-.017zm-4.06 8.616c.06.272-.01.567-.204.77-.173.176-.407.25-.648.253-.195.003-1.725 0-1.788 0l.003-1.645c.012-.027.02-.018.06-.018.097 0 1.713-.004 1.823.005.232.02.45.12.598.306.076.096.128.208.155.328zm-2.636 2.038h1.944c.242.002.47.063.652.228.226.204.327.515.283.815-.04.263-.194.5-.422.634-.187.112-.39.125-.6.125h-1.857v-1.8z" style="fill: #53B230" />\n      <path d="M6.574 13.89c-.06-.03-.06-.018-.07-.06-.006-.026-.005-8.365.003-8.558.04-.95.487-1.857 1.21-2.47.517-.434 1.16-.71 1.83-.778.396-.04.803-.018 1.2-.018.69 0 4.11-.013 4.12 0 .008.008.002 16.758 0 17.074-.003.956-.403 1.878-1.105 2.523-.506.465-1.15.77-1.83.86-.41.056-5.02.032-5.363.032-.066 0-.054.013-.066-.024-.01-.025 0-7 0-7.17.66.178 1.35.28 2.03.348.662.067 1.33.093 1.993.062.93-.044 1.947-.192 2.712-.762.32-.238.574-.553.73-.922.148-.353.2-.736.2-1.117 0-.348.006-3.93-.016-3.942-.023-.014-2.885-.015-2.9.012-.012.022 0 3.87 0 3.95-.003.47-.16.933-.514 1.252-.468.42-1.11.47-1.707.423-.687-.055-1.357-.245-1.993-.508-.157-.065-.312-.135-.466-.208z" style="fill: #006CB9" />\n      <path d="M15.95 9.835c-.025.02-.05.04-.072.06V6.05c0-.295-.012-.594.01-.888.12-1.593 1.373-2.923 2.944-3.126.382-.05 5.397-.042 5.41-.026.01.01 0 .062 0 .074v16.957c0 1.304-.725 2.52-1.89 3.1-.504.25-1.045.35-1.605.35-.322 0-4.757.015-4.834 0-.05-.01-.023.01-.035-.02-.007-.022 0-6.548 0-7.44v-.422c.554.48 1.256.75 1.96.908.536.12 1.084.176 1.63.196.537.02 1.076.01 1.61-.037.546-.05 1.088-.136 1.625-.244.137-.028.274-.057.41-.09.033-.006.17-.017.187-.044.013-.02 0-.097 0-.12v-1.324c-.582.292-1.19.525-1.83.652-.778.155-1.64.198-2.385-.123-.752-.326-1.2-1.024-1.274-1.837-.076-.837.173-1.716.883-2.212.736-.513 1.7-.517 2.553-.38.634.1 1.245.305 1.825.58.078.037.154.075.23.113V9.322c0-.02.013-.1 0-.118-.02-.028-.152-.038-.188-.046-.066-.016-.133-.03-.2-.045C22.38 9 21.84 8.908 21.3 8.85c-.533-.06-1.068-.077-1.603-.066-.542.01-1.086.054-1.62.154-.662.125-1.32.337-1.883.716-.085.056-.167.117-.245.18z" style="fill: #E20138" />\n    </symbol>\n\n    <symbol id="icon-discover" viewBox="0 0 40 24">\n      <title>Discover</title>\n      <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: #FFF" />\n      <path d="M38.995 11.75S27.522 20.1 6.5 23.5h31.495c.552 0 1-.448 1-1V11.75z" style="fill: #F48024" />\n      <path d="M5.332 11.758c-.338.305-.776.438-1.47.438h-.29V8.55h.29c.694 0 1.115.124 1.47.446.37.33.595.844.595 1.372 0 .53-.224 1.06-.595 1.39zM4.077 7.615H2.5v5.515h1.57c.833 0 1.435-.197 1.963-.637.63-.52 1-1.305 1-2.116 0-1.628-1.214-2.762-2.956-2.762zM7.53 13.13h1.074V7.616H7.53M11.227 9.732c-.645-.24-.834-.397-.834-.695 0-.347.338-.61.8-.61.322 0 .587.132.867.446l.562-.737c-.462-.405-1.015-.612-1.618-.612-.975 0-1.718.678-1.718 1.58 0 .76.346 1.15 1.355 1.513.42.148.635.247.743.314.215.14.322.34.322.57 0 .448-.354.78-.834.78-.51 0-.924-.258-1.17-.736l-.695.67c.495.726 1.09 1.05 1.907 1.05 1.116 0 1.9-.745 1.9-1.812 0-.876-.363-1.273-1.585-1.72zM13.15 10.377c0 1.62 1.27 2.877 2.907 2.877.462 0 .858-.09 1.347-.32v-1.267c-.43.43-.81.604-1.297.604-1.082 0-1.85-.785-1.85-1.9 0-1.06.792-1.895 1.8-1.895.512 0 .9.183 1.347.62V7.83c-.472-.24-.86-.34-1.322-.34-1.627 0-2.932 1.283-2.932 2.887zM25.922 11.32l-1.468-3.705H23.28l2.337 5.656h.578l2.38-5.655H27.41M29.06 13.13h3.046v-.934h-1.973v-1.488h1.9v-.934h-1.9V8.55h1.973v-.935H29.06M34.207 10.154h-.314v-1.67h.33c.67 0 1.034.28 1.034.818 0 .554-.364.852-1.05.852zm2.155-.91c0-1.033-.71-1.628-1.95-1.628H32.82v5.514h1.073v-2.215h.14l1.487 2.215h1.32l-1.733-2.323c.81-.165 1.255-.72 1.255-1.563z" style="fill: #221F20" />\n      <path d="M23.6 10.377c0 1.62-1.31 2.93-2.927 2.93-1.617.002-2.928-1.31-2.928-2.93s1.31-2.932 2.928-2.932c1.618 0 2.928 1.312 2.928 2.932z" style="fill: #F48024" />\n    </symbol>\n\n    <symbol id="icon-diners-club" viewBox="0 0 40 24">\n      <title>Diners Club</title>\n      <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: #FFF" />\n      <path d="M9.02 11.83c0-5.456 4.54-9.88 10.14-9.88 5.6 0 10.139 4.424 10.139 9.88-.002 5.456-4.54 9.88-10.14 9.88-5.6 0-10.14-4.424-10.14-9.88z" style="fill: #FEFEFE" />\n      <path style="fill: #FFF" d="M32.522 22H8.5V1.5h24.022" />\n      <path d="M25.02 11.732c-.003-2.534-1.607-4.695-3.868-5.55v11.102c2.26-.857 3.865-3.017 3.87-5.552zm-8.182 5.55V6.18c-2.26.86-3.86 3.017-3.867 5.55.007 2.533 1.61 4.69 3.868 5.55zm2.158-14.934c-5.25.002-9.503 4.202-9.504 9.384 0 5.182 4.254 9.38 9.504 9.382 5.25 0 9.504-4.2 9.505-9.382 0-5.182-4.254-9.382-9.504-9.384zM18.973 22C13.228 22.027 8.5 17.432 8.5 11.84 8.5 5.726 13.228 1.5 18.973 1.5h2.692c5.677 0 10.857 4.225 10.857 10.34 0 5.59-5.18 10.16-10.857 10.16h-2.692z" style="fill: #004A97" />\n    </symbol>\n\n    <symbol id="icon-maestro" viewBox="0 0 40 24">\n      <title>Maestro</title>\n      <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: #FFF" />\n      <path d="M14.67 22.39V21c.022-.465-.303-.86-.767-.882h-.116c-.3-.023-.603.14-.788.394-.164-.255-.442-.417-.743-.394-.256-.023-.51.116-.65.324v-.278h-.487v2.203h.487v-1.183c-.046-.278.162-.533.44-.58h.094c.325 0 .488.21.488.58v1.23h.487v-1.23c-.047-.278.162-.556.44-.58h.093c.325 0 .487.21.487.58v1.23l.534-.024zm2.712-1.09v-1.113h-.487v.28c-.162-.21-.417-.326-.695-.326-.65 0-1.16.51-1.16 1.16 0 .65.51 1.16 1.16 1.16.278 0 .533-.117.695-.325v.278h.487V21.3zm-1.786 0c.024-.37.348-.65.72-.626.37.023.65.348.626.72-.023.347-.302.625-.673.625-.372 0-.674-.28-.674-.65-.023-.047-.023-.047 0-.07zm12.085-1.16c.163 0 .325.024.465.094.14.046.278.14.37.255.117.115.186.23.256.37.117.3.117.626 0 .927-.046.14-.138.255-.254.37-.116.117-.232.186-.37.256-.303.116-.65.116-.952 0-.14-.046-.28-.14-.37-.255-.118-.116-.187-.232-.257-.37-.116-.302-.116-.627 0-.928.047-.14.14-.255.256-.37.115-.117.23-.187.37-.256.163-.07.325-.116.488-.093zm0 .465c-.092 0-.185.023-.278.046-.092.024-.162.094-.232.14-.07.07-.116.14-.14.232-.068.185-.068.394 0 .58.024.092.094.162.14.23.07.07.14.117.232.14.186.07.37.07.557 0 .092-.023.16-.092.23-.14.07-.068.117-.138.14-.23.07-.186.07-.395 0-.58-.023-.093-.093-.162-.14-.232-.07-.07-.138-.116-.23-.14-.094-.045-.187-.07-.28-.045zm-7.677.695c0-.695-.44-1.16-1.043-1.16-.65 0-1.16.534-1.137 1.183.023.65.534 1.16 1.183 1.136.325 0 .65-.093.905-.302l-.23-.348c-.187.14-.42.232-.65.232-.326.023-.627-.21-.673-.533h1.646v-.21zm-1.646-.21c.023-.3.278-.532.58-.532.3 0 .556.232.556.533h-1.136zm3.664-.346c-.207-.116-.44-.186-.695-.186-.255 0-.417.093-.417.255 0 .163.162.186.37.21l.233.022c.488.07.766.278.766.672 0 .395-.37.72-1.02.72-.348 0-.673-.094-.95-.28l.23-.37c.21.162.465.232.743.232.324 0 .51-.094.51-.28 0-.115-.117-.185-.395-.23l-.232-.024c-.487-.07-.765-.302-.765-.65 0-.44.37-.718.927-.718.325 0 .627.07.905.232l-.21.394zm2.32-.116h-.788v.997c0 .23.07.37.325.37.14 0 .3-.046.417-.115l.14.417c-.186.116-.395.162-.604.162-.58 0-.765-.302-.765-.812v-1.02h-.44v-.44h.44v-.673h.487v.672h.79v.44zm1.67-.51c.117 0 .233.023.35.07l-.14.463c-.093-.045-.21-.045-.302-.045-.325 0-.464.208-.464.58v1.25h-.487v-2.2h.487v.277c.116-.255.325-.37.557-.394z" style="fill: #000" />\n      <path style="fill: #7673C0" d="M23.64 3.287h-7.305V16.41h7.306" />\n      <path d="M16.8 9.848c0-2.55 1.183-4.985 3.2-6.56C16.384.435 11.12 1.06 8.29 4.7 5.435 8.32 6.06 13.58 9.703 16.41c3.038 2.387 7.283 2.387 10.32 0-2.04-1.578-3.223-3.99-3.223-6.562z" style="fill: #EB001B" />\n      <path d="M33.5 9.848c0 4.613-3.735 8.346-8.35 8.346-1.88 0-3.69-.626-5.15-1.785 3.618-2.83 4.245-8.092 1.415-11.71-.418-.532-.882-.996-1.415-1.413C23.618.437 28.883 1.06 31.736 4.7 32.873 6.163 33.5 7.994 33.5 9.85z" style="fill: #00A1DF" />\n    </symbol>\n\n    <symbol id="logoPayPal" viewBox="0 0 48 29">\n      <title>PayPal Logo</title>\n      <path d="M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z" fill-opacity="0" style="fill: #FFF" />\n      <path d="M31.216 16.4c.394-.7.69-1.5.886-2.4.196-.8.196-1.6.1-2.2-.1-.7-.396-1.2-.79-1.7-.195-.3-.59-.5-.885-.7.1-.8.1-1.5 0-2.1-.1-.6-.394-1.1-.886-1.6-.885-1-2.56-1.6-4.922-1.6h-6.4c-.492 0-.787.3-.886.8l-2.658 17.2c0 .2 0 .3.1.4.097.1.294.2.393.2h4.036l-.295 1.8c0 .1 0 .3.1.4.098.1.195.2.393.2h3.35c.393 0 .688-.3.786-.7v-.2l.59-4.1v-.2c.1-.4.395-.7.788-.7h.59c1.675 0 3.152-.4 4.137-1.1.59-.5 1.083-1 1.478-1.7h-.002z" style="fill: #263B80" />\n      <path d="M21.364 9.4c0-.3.196-.5.492-.6.098-.1.196-.1.394-.1h5.02c.592 0 1.183 0 1.675.1.1 0 .295.1.394.1.098 0 .294.1.393.1.1 0 .1 0 .197.102.295.1.492.2.69.3.295-1.6 0-2.7-.887-3.8-.985-1.1-2.658-1.6-4.923-1.6h-6.4c-.49 0-.885.3-.885.8l-2.758 17.3c-.098.3.197.6.59.6h3.94l.985-6.4 1.083-6.9z" style="fill: #263B80" />\n      <path d="M30.523 9.4c0 .1 0 .3-.098.4-.887 4.4-3.742 5.9-7.484 5.9h-1.87c-.492 0-.787.3-.886.8l-.985 6.2-.296 1.8c0 .3.196.6.492.6h3.348c.394 0 .69-.3.787-.7v-.2l.592-4.1v-.2c.1-.4.394-.7.787-.7h.69c3.248 0 5.808-1.3 6.497-5.2.296-1.6.197-3-.69-3.9-.196-.3-.49-.5-.885-.7z" style="fill: #159BD7" />\n      <path d="M29.635 9c-.098 0-.295-.1-.394-.1-.098 0-.294-.1-.393-.1-.492-.102-1.083-.102-1.673-.102h-5.022c-.1 0-.197 0-.394.1-.198.1-.394.3-.492.6l-1.083 6.9v.2c.1-.5.492-.8.886-.8h1.87c3.742 0 6.598-1.5 7.484-5.9 0-.1 0-.3.098-.4-.196-.1-.492-.2-.69-.3 0-.1-.098-.1-.196-.1z" style="fill: #232C65" />\n    </symbol>\n\n    <symbol id="logoPayPalCredit" viewBox="0 0 48 29">\n      <title>PayPal Credit Logo</title>\n      <path d="M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z" fill-opacity="0" style="fill: #FFF" fill-rule="nonzero" />\n      <path d="M27.44 21.6h.518c1.377 0 2.67-.754 2.953-2.484.248-1.588-.658-2.482-2.14-2.482h-.38c-.093 0-.172.067-.187.16l-.763 4.805zm-1.254-6.646c.024-.158.16-.273.32-.273h2.993c2.47 0 4.2 1.942 3.81 4.436-.4 2.495-2.752 4.436-5.21 4.436h-3.05c-.116 0-.205-.104-.187-.218l1.323-8.38zM22.308 16.907l-.192 1.21h2.38c.116 0 .204.103.186.217l-.23 1.462c-.023.157-.16.273-.318.273h-2.048c-.16 0-.294.114-.32.27l-.203 1.26h2.52c.117 0 .205.102.187.217l-.228 1.46c-.025.16-.16.275-.32.275h-4.55c-.116 0-.204-.104-.186-.218l1.322-8.38c.025-.158.16-.273.32-.273h4.55c.116 0 .205.104.187.22l-.23 1.46c-.024.158-.16.274-.32.274H22.63c-.16 0-.295.115-.32.273M35.325 23.552h-1.81c-.115 0-.203-.104-.185-.218l1.322-8.38c.025-.158.16-.273.32-.273h1.81c.115 0 .203.104.185.22l-1.322 8.38c-.025.156-.16.272-.32.272M14.397 18.657h.224c.754 0 1.62-.14 1.777-1.106.158-.963-.345-1.102-1.15-1.104h-.326c-.097 0-.18.07-.197.168l-.326 2.043zm3.96 4.895h-2.37c-.102 0-.194-.058-.238-.15l-1.565-3.262h-.023l-.506 3.19c-.02.128-.13.222-.26.222h-1.86c-.116 0-.205-.104-.187-.218l1.33-8.432c.02-.128.13-.22.26-.22h3.222c1.753 0 2.953.834 2.66 2.728-.2 1.224-1.048 2.283-2.342 2.506l2.037 3.35c.076.125-.014.286-.16.286zM40.216 23.552h-1.808c-.116 0-.205-.104-.187-.218l1.06-6.7h-1.684c-.116 0-.205-.104-.187-.218l.228-1.462c.025-.157.16-.273.32-.273h5.62c.116 0 .205.104.186.22l-.228 1.46c-.025.158-.16.274-.32.274h-1.63l-1.05 6.645c-.025.156-.16.272-.32.272M11.467 17.202c-.027.164-.228.223-.345.104-.395-.405-.975-.62-1.6-.62-1.41 0-2.526 1.083-2.75 2.458-.21 1.4.588 2.41 2.022 2.41.592 0 1.22-.225 1.74-.6.144-.105.34.02.313.194l-.328 2.03c-.02.12-.108.22-.226.254-.702.207-1.24.355-1.9.355-3.823 0-4.435-3.266-4.238-4.655.553-3.894 3.712-4.786 5.65-4.678.623.034 1.182.117 1.73.323.177.067.282.25.252.436l-.32 1.99" style="fill: #21306F" />\n      <path d="M23.184 7.67c-.11.717-.657.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.105.123.137.305.097.557zm-.23-1.87h-1.998c-.137 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h1.024c.095 0 .177-.07.192-.164l.23-1.452c.02-.135.136-.235.273-.235h.63c1.317 0 2.076-.636 2.275-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51z" style="fill: #0093C7" />\n      <path d="M8.936 7.67c-.11.717-.656.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.104.123.136.305.096.557zm-.23-1.87H6.708c-.136 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h.955c.136 0 .252-.1.274-.234l.217-1.382c.02-.135.137-.235.274-.235h.633c1.316 0 2.075-.636 2.274-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51zM13.343 9.51c-.092.545-.526.912-1.08.912-.277 0-.5-.09-.642-.258-.14-.168-.193-.406-.148-.672.086-.542.527-.92 1.072-.92.27 0 .492.09.637.26.148.172.205.412.163.677zm1.334-1.863h-.957c-.082 0-.152.06-.164.14l-.042.268-.067-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.135 1.923-.092.56.038 1.097.356 1.47.29.344.708.487 1.204.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.017-.102-.06-.193-.163-.193z" style="fill: #21306F" />\n      <path d="M27.59 9.51c-.09.545-.525.912-1.078.912-.278 0-.5-.09-.643-.258-.142-.168-.195-.406-.15-.672.086-.542.526-.92 1.07-.92.273 0 .494.09.64.26.146.172.203.412.16.677zm1.334-1.863h-.956c-.082 0-.152.06-.164.14l-.043.268-.065-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.136 1.923-.092.56.038 1.097.355 1.47.292.344.71.487 1.205.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.015-.102-.063-.193-.166-.193z" style="fill: #0093C7" />\n      <path d="M19.77 7.647h-.96c-.092 0-.178.045-.23.122L17.254 9.72l-.562-1.877c-.035-.118-.143-.198-.266-.198h-.945c-.113 0-.194.112-.157.22l1.06 3.108-.997 1.404c-.078.11 0 .262.136.262h.96c.092 0 .177-.044.23-.12l3.196-4.614c.077-.11-.002-.26-.137-.26" style="fill: #21306F" />\n      <path d="M30.052 5.94l-.82 5.216c-.016.1.062.192.165.192h.824c.138 0 .254-.1.275-.234l.81-5.122c.015-.1-.064-.193-.166-.193h-.924c-.082 0-.15.06-.164.14" style="fill: #0093C7" />\n    </symbol>\n\n    <symbol id="iconCardFront" viewBox="0 0 48 29">\n      <title>Generic Card</title>\n      <path d="M46.177 29H1.823C.9 29 0 28.13 0 27.187V1.813C0 .87.9 0 1.823 0h44.354C47.1 0 48 .87 48 1.813v25.375C48 28.13 47.1 29 46.177 29z" style="fill: #FFF" />\n      <path d="M4.8 9.14c0-.427.57-.973 1.067-.973h7.466c.496 0 1.067.546 1.067.972v3.888c0 .425-.57.972-1.067.972H5.867c-.496 0-1.067-.547-1.067-.972v-3.89z" style="fill: #828282" />\n      <rect style="fill: #828282" x="10.8" y="22.167" width="3.6" height="2.333" rx="1.167" />\n      <rect style="fill: #828282" x="4.8" y="22.167" width="3.6" height="2.333" rx="1.167" />\n      <path d="M6.55 16.333h34.9c.966 0 1.75.784 1.75 1.75 0 .967-.784 1.75-1.75 1.75H6.55c-.966 0-1.75-.783-1.75-1.75 0-.966.784-1.75 1.75-1.75z" style="fill: #828282" />\n      <ellipse style="fill: #828282" cx="40.2" cy="6.417" rx="3" ry="2.917" />\n    </symbol>\n\n    <symbol id="iconCVVBack" viewBox="0 0 40 24">\n      <title>CVV Back</title>\n      <path d="M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z" style="fill: #FFF"/>\n      <path style="fill: #828282" d="M0 5h40v4H0z" />\n      <path d="M20 13.772v5.456c0 .423.37.772.82.772h13.36c.45 0 .82-.35.82-.772v-5.456c0-.423-.37-.772-.82-.772H20.82c-.45 0-.82.35-.82.772zm-1-.142c0-.9.76-1.63 1.68-1.63h13.64c.928 0 1.68.737 1.68 1.63v5.74c0 .9-.76 1.63-1.68 1.63H20.68c-.928 0-1.68-.737-1.68-1.63v-5.74z" style="fill: #000" fill-rule="nonzero" />\n      <circle style="fill: #828282" cx="23.5" cy="16.5" r="1.5" />\n      <circle style="fill: #828282" cx="27.5" cy="16.5" r="1.5" />\n      <circle style="fill: #828282" cx="31.5" cy="16.5" r="1.5" />\n    </symbol>\n\n    <symbol id="iconCVVFront" viewBox="0 0 40 24">\n      <title>CVV Front</title>\n      <path d="M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z" style="fill: #FFF" />\n      <path d="M16 5.772v5.456c0 .423.366.772.81.772h17.38c.444 0 .81-.348.81-.772V5.772C35 5.35 34.634 5 34.19 5H16.81c-.444 0-.81.348-.81.772zm-1-.142c0-.9.75-1.63 1.66-1.63h17.68c.917 0 1.66.737 1.66 1.63v5.74c0 .9-.75 1.63-1.66 1.63H16.66c-.917 0-1.66-.737-1.66-1.63V5.63z" style="fill: #000" fill-rule="nonzero" />\n      <circle style="fill: #828282" cx="19.5" cy="8.5" r="1.5" />\n      <circle style="fill: #828282" cx="27.5" cy="8.5" r="1.5" />\n      <circle style="fill: #828282" cx="23.5" cy="8.5" r="1.5" />\n      <circle style="fill: #828282" cx="31.5" cy="8.5" r="1.5" />\n      <path d="M4 7.833C4 7.47 4.476 7 4.89 7h6.22c.414 0 .89.47.89.833v3.334c0 .364-.476.833-.89.833H4.89c-.414 0-.89-.47-.89-.833V7.833zM4 18.5c0-.828.668-1.5 1.5-1.5h29c.828 0 1.5.666 1.5 1.5 0 .828-.668 1.5-1.5 1.5h-29c-.828 0-1.5-.666-1.5-1.5z" style="fill: #828282" />\n    </symbol>\n\n    <symbol id="iconCheck" viewBox="0 0 42 32">\n      <title>Check</title>\n      <path class="path1" d="M14.379 29.76L39.741 3.415 36.194.001l-21.815 22.79-10.86-11.17L0 15.064z" />\n    </symbol>\n\n    <symbol id="iconLockLoader" viewBox="0 0 28 32">\n      <title>Lock Loader</title>\n      <path d="M6 10V8c0-4.422 3.582-8 8-8 4.41 0 8 3.582 8 8v2h-4V7.995C18 5.79 16.205 4 14 4c-2.21 0-4 1.792-4 3.995V10H6zM.997 14c-.55 0-.997.445-.997.993v16.014c0 .548.44.993.997.993h26.006c.55 0 .997-.445.997-.993V14.993c0-.548-.44-.993-.997-.993H.997z" />\n    </symbol>\n\n    <symbol id="iconError" height="24" viewBox="0 0 24 24" width="24">\n      <path d="M0 0h24v24H0z" style="fill: none" />\n      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />\n    </symbol>\n\n    <symbol id="logoApplePay" viewBox="0 0 165.52 105.97" width="24">\n      <title>Apple Pay Logo</title>\n      <defs>\n      <style>\n        .cls-1{fill:#231f20;}.cls-2{fill:#fff;}\n      </style>\n      </defs>\n      <path id="_Path_" data-name="&lt;Path&gt;" class="cls-1" d="M150.7 0h-139a20.78 20.78 0 0 0-3.12.3 10.51 10.51 0 0 0-3 1 9.94 9.94 0 0 0-4.31 4.32 10.46 10.46 0 0 0-1 3A20.65 20.65 0 0 0 0 11.7v82.57a20.64 20.64 0 0 0 .3 3.11 10.46 10.46 0 0 0 1 3 9.94 9.94 0 0 0 4.35 4.35 10.47 10.47 0 0 0 3 1 20.94 20.94 0 0 0 3.11.27h142.06a21 21 0 0 0 3.11-.27 10.48 10.48 0 0 0 3-1 9.94 9.94 0 0 0 4.35-4.35 10.4 10.4 0 0 0 1-3 20.63 20.63 0 0 0 .27-3.11V11.69a20.64 20.64 0 0 0-.27-3.11 10.4 10.4 0 0 0-1-3 9.94 9.94 0 0 0-4.35-4.35 10.52 10.52 0 0 0-3-1 20.84 20.84 0 0 0-3.1-.23h-1.43z"/>\n      <path id="_Path_2" data-name="&lt;Path&gt;" class="cls-2" d="M150.7 3.53h3.03a17.66 17.66 0 0 1 2.58.22 7 7 0 0 1 2 .65 6.41 6.41 0 0 1 2.8 2.81 6.88 6.88 0 0 1 .64 2 17.56 17.56 0 0 1 .22 2.58v82.38a17.54 17.54 0 0 1-.22 2.59 6.85 6.85 0 0 1-.64 2 6.41 6.41 0 0 1-2.81 2.81 6.92 6.92 0 0 1-2 .65 18 18 0 0 1-2.57.22H11.79a18 18 0 0 1-2.58-.22 6.94 6.94 0 0 1-2-.65 6.41 6.41 0 0 1-2.8-2.8 6.93 6.93 0 0 1-.65-2 17.47 17.47 0 0 1-.22-2.58v-82.4a17.49 17.49 0 0 1 .22-2.59 6.92 6.92 0 0 1 .65-2 6.41 6.41 0 0 1 2.8-2.8 7 7 0 0 1 2-.65 17.63 17.63 0 0 1 2.58-.22H150.7"/>\n      <g id="_Group_" data-name="&lt;Group&gt;">\n      <g id="_Group_2" data-name="&lt;Group&gt;">\n      <path id="_Path_3" data-name="&lt;Path&gt;" class="cls-1" d="M43.51 35.77a9.15 9.15 0 0 0 2.1-6.52 9.07 9.07 0 0 0-6 3.11 8.56 8.56 0 0 0-2.16 6.27 7.57 7.57 0 0 0 6.06-2.86"/>\n      <path id="_Path_4" data-name="&lt;Path&gt;" class="cls-1" d="M45.59 39.08c-3.35-.2-6.2 1.9-7.79 1.9s-4-1.8-6.7-1.75a9.87 9.87 0 0 0-8.4 5.1c-3.6 6.2-.95 15.4 2.55 20.45 1.7 2.5 3.75 5.25 6.45 5.15s3.55-1.65 6.65-1.65 4 1.65 6.7 1.6 4.55-2.5 6.25-5a22.2 22.2 0 0 0 2.8-5.75 9.08 9.08 0 0 1-5.45-8.25A9.26 9.26 0 0 1 53 43.13a9.57 9.57 0 0 0-7.45-4"/>\n      </g>\n      <g id="_Group_3" data-name="&lt;Group&gt;">\n      <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;" class="cls-1" d="M79 32.11c7.28 0 12.35 5 12.35 12.32S86.15 56.8 78.79 56.8h-8.06v12.82h-5.82V32.11zm-8.27 19.81h6.68c5.07 0 8-2.73 8-7.46S82.48 37 77.44 37h-6.71z"/>\n      <path id="_Compound_Path_2" data-name="&lt;Compound Path&gt;" class="cls-1" d="M92.76 61.85c0-4.81 3.67-7.56 10.42-8l7.25-.44v-2.06c0-3-2-4.7-5.56-4.7-2.94 0-5.07 1.51-5.51 3.82h-5.24c.16-4.86 4.73-8.4 10.92-8.4 6.65 0 11 3.48 11 8.89v18.66h-5.38v-4.5h-.13a9.59 9.59 0 0 1-8.58 4.78c-5.42 0-9.19-3.22-9.19-8.05zm17.68-2.42v-2.11l-6.47.42c-3.64.23-5.54 1.59-5.54 4s2 3.77 5.07 3.77c3.95-.05 6.94-2.57 6.94-6.08z"/>\n      <path id="_Compound_Path_3" data-name="&lt;Compound Path&gt;" class="cls-1" d="M121 79.65v-4.5a17.14 17.14 0 0 0 1.72.1c2.57 0 4-1.09 4.91-3.9l.52-1.66-9.88-27.29h6.08l6.86 22.15h.13l6.86-22.15h5.93l-10.21 28.67c-2.34 6.58-5 8.73-10.68 8.73a15.93 15.93 0 0 1-2.24-.15z"/>\n      </g>\n      </g>\n    </symbol>\n    <symbol id="logoGooglePay" viewBox="0 0 60.51 24.04">\n      <title>GooglePay_AcceptanceMark_RGB_60x24pt</title>\n      <path d="M28.67,11.76v7H26.43V1.42h5.92a5.39,5.39,0,0,1,3.84,1.51A5,5,0,0,1,36.44,10l-.25.26a5.35,5.35,0,0,1-3.84,1.48Zm0-8.2V9.62H32.4a2.93,2.93,0,0,0,2.21-.9A3,3,0,0,0,32.4,3.56Z" fill="#5f6368"/>\n      <path d="M42.93,6.52a5.56,5.56,0,0,1,3.91,1.32,4.71,4.71,0,0,1,1.43,3.63v7.32H46.13V17.14H46a4.28,4.28,0,0,1-3.69,2A4.83,4.83,0,0,1,39.06,18a3.74,3.74,0,0,1-1.32-2.92,3.52,3.52,0,0,1,1.39-2.93,5.87,5.87,0,0,1,3.73-1.09,6.65,6.65,0,0,1,3.27.72v-.51a2.5,2.5,0,0,0-.92-2,3.17,3.17,0,0,0-2.16-.81,3.4,3.4,0,0,0-2.95,1.57l-2-1.23A5.45,5.45,0,0,1,42.93,6.52ZM40,15.15a1.82,1.82,0,0,0,.74,1.46,2.74,2.74,0,0,0,1.74.58,3.58,3.58,0,0,0,2.51-1,3.26,3.26,0,0,0,1.11-2.45,4.54,4.54,0,0,0-2.91-.83,3.74,3.74,0,0,0-2.27.66A2,2,0,0,0,40,15.15Z" fill="#5f6368"/>\n      <path d="M60.52,6.9,53.07,24H50.76l2.77-6L48.63,6.91h2.43l3.54,8.54h0l3.44-8.54Z" fill="#5f6368"/>\n      <path d="M19.65,10.24a12.54,12.54,0,0,0-.17-2H10.06v3.84h5.39a4.61,4.61,0,0,1-2,3v2.49h3.22A9.75,9.75,0,0,0,19.65,10.24Z" fill="#4285f4"/>\n      <path d="M10.06,20a9.54,9.54,0,0,0,6.62-2.41l-3.22-2.49a6,6,0,0,1-3.4.95,6,6,0,0,1-5.6-4.12H1.15V14.5A10,10,0,0,0,10.06,20Z" fill="#34a853"/>\n      <path d="M4.46,11.92a6,6,0,0,1,0-3.82V5.53H1.15a10,10,0,0,0,0,9Z" fill="#fbbc04"/>\n      <path d="M10.06,4a5.44,5.44,0,0,1,3.83,1.5h0l2.85-2.85A9.58,9.58,0,0,0,10.06,0a10,10,0,0,0-8.91,5.5L4.46,8.1A6,6,0,0,1,10.06,4Z" fill="#ea4335"/>\n    </symbol>\n\n    <symbol id="logoVenmo" viewBox="0 0 48 32">\n      <title>Venmo</title>\n      <g fill="none" fill-rule="evenodd">\n        <rect fill="#3D95CE" width="47.4074074" height="31.6049383" rx="3.16049383"/>\n        <path d="M33.1851852,10.1131555 C33.1851852,14.8373944 29.2425262,20.9745161 26.0425868,25.2839506 L18.7337285,25.2839506 L15.8024691,7.35534396 L22.202175,6.73384536 L23.7519727,19.4912014 C25.2000422,17.0781163 26.9870326,13.2859484 26.9870326,10.7005 C26.9870326,9.28531656 26.7500128,8.32139205 26.3796046,7.52770719 L32.207522,6.32098765 C32.8813847,7.45939896 33.1851852,8.63196439 33.1851852,10.1131555 Z" fill="#FFF"/>\n      </g>\n    </symbol>\n    <symbol id="buttonVenmo" viewBox="0 0 295 42">\n      <g fill="none" fill-rule="evenodd">\n        <rect fill="#3D95CE" width="295" height="42" rx="3"/>\n        <path d="M11.3250791 0C11.7902741.780434316 12 1.58428287 12 2.59970884 12 5.838396 9.27822123 10.0456806 7.06917212 13L2.02356829 13 0 .709099732 4.41797878.283033306 5.48786751 9.02879887C6.48752911 7.3745159 7.72116169 4.77480706 7.72116169 3.00236102 7.72116169 2.03218642 7.55753727 1.37137098 7.30182933.827262801L11.3250791 0 11.3250791 0zM17.5051689 5.68512193C18.333931 5.68512193 20.4203856 5.28483546 20.4203856 4.03281548 20.4203856 3.43161451 20.0177536 3.13172102 19.5432882 3.13172102 18.7131868 3.13172102 17.6238766 4.18269796 17.5051689 5.68512193L17.5051689 5.68512193zM17.4102028 8.1647385C17.4102028 9.69351403 18.2153451 10.293301 19.2827401 10.293301 20.4451012 10.293301 21.5580312 9.99340752 23.0045601 9.21725797L22.4597224 13.1234575C21.440541 13.649203 19.8521716 14 18.310433 14 14.3996547 14 13 11.49596 13 8.36552446 13 4.30815704 15.2767521 0 19.9706358 0 22.554932 0 24 1.52864698 24 3.65720949 24.0002435 7.08869546 19.8287953 8.13992948 17.4102028 8.1647385L17.4102028 8.1647385zM37 2.84753211C37 3.32189757 36.9261179 4.00994664 36.8526108 4.45959542L35.4649774 12.9998782 30.9621694 12.9998782 32.2279161 5.1711436C32.2519185 4.95879931 32.3256755 4.53131032 32.3256755 4.29412759 32.3256755 3.72466988 31.9603904 3.5825794 31.5212232 3.5825794 30.9379171 3.5825794 30.3532359 3.84326124 29.9638234 4.03356751L28.5281854 13 24 13 26.0686989.213683657 29.9878258.213683657 30.0374555 1.23425123C30.9620444.641294408 32.1795365 3.90379019e-8 33.9069526 3.90379019e-8 36.1955476-.000243475057 37 1.1387937 37 2.84753211L37 2.84753211zM51.2981937 1.39967969C52.6582977.49918987 53.9425913 0 55.7133897 0 58.1518468 0 59 1.13900518 59 2.84769558 59 3.32204771 58.9223438 4.01007745 58.8448195 4.4597136L57.3830637 12.9997565 52.6328518 12.9997565 53.9932194 5.00577861C54.0182698 4.792101 54.0708756 4.53142648 54.0708756 4.36608506 54.0708756 3.72493046 53.6854953 3.58272222 53.2224587 3.58272222 52.6325881 3.58272222 52.0429812 3.81989829 51.6052587 4.03369766L50.0914245 12.9998782 45.3423992 12.9998782 46.7027668 5.00590037C46.7278172 4.79222275 46.7788409 4.53154824 46.7788409 4.36620681 46.7788409 3.72505221 46.3933287 3.58284398 45.9318743 3.58284398 45.3153711 3.58284398 44.7000546 3.84351849 44.2893602 4.03381941L42.7740757 13 38 13 40.1814929.214042876 44.2643098.214042876 44.3925941 1.28145692C45.3423992.641763367 46.6253743.000487014507 48.3452809.000487014507 49.8344603 0 50.8094476.593061916 51.2981937 1.39967969L51.2981937 1.39967969zM67.5285327 5.39061542C67.5285327 4.29258876 67.2694573 3.54396333 66.4936812 3.54396333 64.7759775 3.54396333 64.4232531 6.76273249 64.4232531 8.4093242 64.4232531 9.65848482 64.7530184 10.4315735 65.5285529 10.4315735 67.1521242 10.4315735 67.5285327 7.03707905 67.5285327 5.39061542L67.5285327 5.39061542zM60 8.21054461C60 3.96893154 62.1170713 0 66.988027 0 70.6583423 0 72 2.29633967 72 5.46592624 72 9.65835674 69.905767 14 64.9173573 14 61.2233579 14 60 11.4294418 60 8.21054461L60 8.21054461z" transform="translate(112 14)" fill="#FFF"/>\n      </g>\n    </symbol>\n\n    <symbol id="iconClose" width="21" height="21" viewBox="0 0 21 21" overflow="visible">\n      <path d="M16 5.414L14.586 4 10 8.586 5.414 4 4 5.414 8.586 10 4 14.586 5.414 16 10 11.414 14.586 16 16 14.586 11.414 10"/>\n    </symbol>\n  </defs>\n</svg>\n',A=[f.paypal,f.paypalCredit,f.applePay,f.googlePay,"threeDSecure"],w=[f.paypal,f.paypalCredit,f.applePay,f.googlePay],N="warn",D="1.10.0";i.prototype=Object.create(c.prototype,{constructor:i}),i.prototype._initialize=function(e){var t,i,n,c=this,p=c._merchantConfiguration.container||c._merchantConfiguration.selector,h=E.resolve();return c._injectStylesheet(),p?c._merchantConfiguration.container&&c._merchantConfiguration.selector?(o.sendEvent(c._client,"configuration-error"),void e(new l("Must only have one options.selector or options.container."))):("string"==typeof p&&(p=document.querySelector(p)),p&&1===p.nodeType?p.innerHTML.trim()?(o.sendEvent(c._client,"configuration-error"),void e(new l("options.selector or options.container must reference an empty DOM node."))):(c._strings=a({},v.en),c._merchantConfiguration.locale&&(t=v[c._merchantConfiguration.locale]||v[c._merchantConfiguration.locale.split("_")[0]],c._strings=a(c._strings,t)),b()||(c._strings.endingIn=c._strings.endingIn.replace(/•/g,"*")),c._merchantConfiguration.translations&&Object.keys(c._merchantConfiguration.translations).forEach(function(e){c._strings[e]=_(c._merchantConfiguration.translations[e])}),i=Object.keys(c._strings).reduce(function(e,t){var r=c._strings[t];return e.replace(RegExp("{{"+t+"}}","g"),r)},T),c._dropinWrapper.innerHTML=I+i,p.appendChild(c._dropinWrapper),void c._getVaultedPaymentMethods().then(function(e){return c._model=new d({client:c._client,componentID:c._componentID,merchantConfiguration:c._merchantConfiguration,paymentMethods:e}),c._model.initialize()}).then(function(){var t;return c._model.on("cancelInitialization",function(t){c._dropinWrapper.innerHTML="",o.sendEvent(c._client,"load-error"),e(t)}),c._model.on("asyncDependenciesReady",function(){c._model.dependencySuccessCount>=1?(o.sendEvent(c._client,"appeared"),c._disableErroredPaymentMethods(),c._handleAppSwitch(),e(null,c)):c._model.cancelInitialization(new l("All payment options failed to load."))}),c._model.on("paymentMethodRequestable",function(e){c._emit("paymentMethodRequestable",e)}),c._model.on("noPaymentMethodRequestable",function(){c._emit("noPaymentMethodRequestable")}),c._model.on("paymentOptionSelected",function(e){c._emit("paymentOptionSelected",e)}),t=c._supportsPaymentOption(f.paypal)||c._supportsPaymentOption(f.paypalCredit),t&&!r.paypal&&(n={src:s.CHECKOUT_JS_SOURCE,id:s.PAYPAL_CHECKOUT_SCRIPT_ID,dataAttributes:{"log-level":c._merchantConfiguration.paypal&&c._merchantConfiguration.paypal.logLevel||N}},h=h.then(function(){return u.loadScript(c._dropinWrapper,n)})),h}).then(function(){return c._setUpDependenciesAndViews()}).catch(function(t){c.teardown().then(function(){e(t)})})):(o.sendEvent(c._client,"configuration-error"),void e(new l("options.selector or options.container must reference a valid DOM node.")))):(o.sendEvent(c._client,"configuration-error"),void e(new l("options.container is required.")))},i.prototype.updateConfiguration=function(e,t,r){if(A.indexOf(e)!==-1){if("threeDSecure"===e)return void(this._threeDSecure&&this._threeDSecure.updateConfiguration(t,r));this._mainView.getView(e).updateConfiguration(t,r),w.indexOf(e)!==-1&&(this._removeUnvaultedPaymentMethods(function(t){return t.type===s.paymentMethodTypes[e]}),this._navigateToInitialView())}},i.prototype.clearSelectedPaymentMethod=function(){this._removeUnvaultedPaymentMethods(),this._navigateToInitialView(),this._model.removeActivePaymentMethod()},i.prototype._setUpDataCollector=function(){var e=this,t=a({},e._merchantConfiguration.dataCollector,{client:e._client});this._model.asyncDependencyStarting(),r.braintree.dataCollector.create(t).then(function(t){e._dataCollectorInstance=t,e._model.asyncDependencyReady()}).catch(function(t){e._model.cancelInitialization(new l({message:"Data Collector failed to set up.",braintreeWebError:t}))})},i.prototype._setUpThreeDSecure=function(){var e=this,t=a({},this._merchantConfiguration.threeDSecure);this._model.asyncDependencyStarting(),this._threeDSecure=new P(this._client,t,this._strings.cardVerification),this._threeDSecure.initialize().then(function(){e._model.asyncDependencyReady()}).catch(function(t){e._model.cancelInitialization(new l({message:"3D Secure failed to set up.",braintreeWebError:t}))})},i.prototype._setUpDependenciesAndViews=function(){var e,t;this._merchantConfiguration.dataCollector&&!document.querySelector("#"+s.DATA_COLLECTOR_SCRIPT_ID)&&(e=this._client.getVersion(),t={src:"https://js.braintreegateway.com/web/"+e+"/js/data-collector.min.js",id:s.DATA_COLLECTOR_SCRIPT_ID},u.loadScript(this._dropinWrapper,t).then(this._setUpDataCollector.bind(this))),this._merchantConfiguration.threeDSecure&&this._setUpThreeDSecure(),this._mainView=new h({client:this._client,element:this._dropinWrapper,model:this._model,strings:this._strings})},i.prototype._removeUnvaultedPaymentMethods=function(e){e=e||function(){return!0},this._model.getPaymentMethods().forEach(function(t){e(t)&&!t.vaulted&&this._model.removePaymentMethod(t)}.bind(this))},i.prototype._navigateToInitialView=function(){var e,t,r=this._mainView.primaryView.ID===y;r&&(e=0===this._model.getPaymentMethods().length,e&&(t=1===this._model.supportedPaymentOptions.length,t?this._mainView.setPrimaryView(this._model.supportedPaymentOptions[0]):this._mainView.setPrimaryView(m)))},i.prototype._supportsPaymentOption=function(e){return this._model.supportedPaymentOptions.indexOf(e)!==-1},i.prototype._disableErroredPaymentMethods=function(){var e,t=Object.keys(this._model.failedDependencies);0!==t.length&&(e=this._mainView.getOptionsElements(),t.forEach(function(t){var r=e[t],i=r.div,n=r.clickHandler,a=this._model.failedDependencies[t],o=i.querySelector(".braintree-option__disabled-message");i.classList.add("braintree-disabled"),i.removeEventListener("click",n),"PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED"===a.code?o.innerHTML=s.errors.PAYPAL_NON_LINKED_SANDBOX:o.innerHTML=a.message}.bind(this)))},i.prototype._handleAppSwitch=function(){this._model.appSwitchError?(this._mainView.setPrimaryView(this._model.appSwitchError.id),this._model.reportError(this._model.appSwitchError.error)):this._model.appSwitchPayload&&this._model.addPaymentMethod(this._model.appSwitchPayload)},i.prototype.requestPaymentMethod=function(){return this._mainView.requestPaymentMethod().then(function(e){return this._threeDSecure&&e.type===s.paymentMethodTypes.card&&null==e.liabilityShifted?this._threeDSecure.verify(e.nonce).then(function(t){return e.nonce=t.nonce,e.liabilityShifted=t.liabilityShifted,e.liabilityShiftPossible=t.liabilityShiftPossible,e}):e}.bind(this)).then(function(e){return this._dataCollectorInstance&&(e.deviceData=this._dataCollectorInstance.deviceData),e}.bind(this)).then(function(e){return n(e)})},i.prototype._removeStylesheet=function(){var e=document.getElementById(s.STYLESHEET_ID);e&&e.parentNode.removeChild(e)},i.prototype._injectStylesheet=function(){var e,t;document.getElementById(s.STYLESHEET_ID)||(t=this._client.getConfiguration().gatewayConfiguration.assetsUrl,e=t+"/web/dropin/"+D+"/css/dropin.min.css",u.loadStylesheet({href:e,id:s.STYLESHEET_ID}))},i.prototype._getVaultedPaymentMethods=function(){return p(this._client)?E.resolve([]):this._client.request({endpoint:"payment_methods",method:"get",data:{defaultFirst:1}}).then(function(e){var t=e.paymentMethods.map(function(e){return e.vaulted=!0,e}).map(n);return E.resolve(t)}).catch(function(){return E.resolve([])})},i.prototype.teardown=function(){var e,t,r=E.resolve(),i=this;return this._removeStylesheet(),this._mainView&&r.then(function(){return i._mainView.teardown().catch(function(t){e=t})}),this._dataCollectorInstance&&r.then(function(){return this._dataCollectorInstance.teardown().catch(function(e){t=new l({message:"Drop-in errored tearing down Data Collector.",braintreeWebError:e})})}.bind(this)),this._threeDSecure&&r.then(function(){return this._threeDSecure.teardown().catch(function(e){t=new l({message:"Drop-in errored tearing down 3D Secure.",braintreeWebError:e})})}.bind(this)),r.then(function(){return i._removeDropinWrapper()}).then(function(){return e?E.reject(e):t?E.reject(t):E.resolve()})},i.prototype.isPaymentMethodRequestable=function(){return this._model.isPaymentMethodRequestable()},i.prototype._removeDropinWrapper=function(){return this._dropinWrapper.parentNode.removeChild(this._dropinWrapper),E.resolve()},t.exports=C(i)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./constants":105,"./dropin-model":106,"./lib/analytics":110,"./lib/assets":111,"./lib/assign":112,"./lib/dropin-error":116,"./lib/event-emitter":117,"./lib/is-guest-checkout":119,"./lib/is-utf-8":121,"./lib/promise":124,"./lib/sanitize-html":125,"./lib/three-d-secure":127,"./lib/uuid":129,"./translations":139,"./views/main-view":155,"./views/payment-methods-view":157,"./views/payment-options-view":158,"@braintree/wrap-promise":20}],108:[function(e,t,r){"use strict";function i(e){return e.authorization?o.create({authorization:e.authorization}).catch(function(e){return p.reject(new c({message:"There was an error creating Drop-in.",braintreeWebError:e}))}).then(function(t){return t=n(t),"TOKENIZATION_KEY"===t.getConfiguration().authorizationType?d.sendEvent(t,"started.tokenization-key"):d.sendEvent(t,"started.client-token"),new p(function(r,i){new a({merchantConfiguration:e,client:t})._initialize(function(e,t){return e?void i(e):void r(t)})})}):p.reject(new c("options.authorization is required."))}function n(e){var t=e.getConfiguration();return t.analyticsMetadata.integration=l.INTEGRATION,t.analyticsMetadata.integrationType=l.INTEGRATION,t.analyticsMetadata.dropinVersion=h,e.getConfiguration=function(){return t},e}var a=e("./dropin"),o=e("braintree-web/client"),s=e("./lib/create-from-script-tag"),l=e("./constants"),d=e("./lib/analytics"),c=e("./lib/dropin-error"),p=e("./lib/promise"),u=e("@braintree/wrap-promise"),h="1.10.0";s(i,"undefined"!=typeof document&&document.querySelector("script[data-braintree-dropin-authorization]")),t.exports={create:u(i),VERSION:h}},{"./constants":105,"./dropin":107,"./lib/analytics":110,"./lib/create-from-script-tag":115,"./lib/dropin-error":116,"./lib/promise":124,"@braintree/wrap-promise":20,"braintree-web/client":29}],109:[function(e,t,r){"use strict";function i(e,t){e.addEventListener("click",t),e.addEventListener("keyup",function(e){13===e.keyCode&&t()})}t.exports=i},{}],110:[function(e,t,r){"use strict";function i(e){return Math.floor(e/1e3)}function n(e,t,r){var n=e.getConfiguration(),l=e._request,d=i(Date.now()),c=n.gatewayConfiguration.analytics.url,p={analytics:[{kind:o.ANALYTICS_PREFIX+t,timestamp:d}],_meta:n.analyticsMetadata,braintreeLibraryVersion:s};"TOKENIZATION_KEY"===n.authorizationType?p.tokenizationKey=n.authorization:p.authorizationFingerprint=JSON.parse(a(n.authorization)).authorizationFingerprint,l({url:c,method:"post",data:p,timeout:o.ANALYTICS_REQUEST_TIMEOUT_MS},r)}var a=e("./polyfill").atob,o=e("../constants"),s=e("braintree-web/client").VERSION;t.exports={sendEvent:n}},{"../constants":105,"./polyfill":123,"braintree-web/client":29}],111:[function(e,t,r){"use strict";function i(e,t){var r=document.createElement("script"),i=t.dataAttributes||{};return r.src=t.src,r.id=t.id,r.async=!0,Object.keys(i).forEach(function(e){r.setAttribute("data-"+e,i[e])}),new a(function(t){r.addEventListener("load",t),e.appendChild(r)})}function n(e){var t=document.createElement("link"),r=e.head||document.head;t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",e.href),t.setAttribute("id",e.id),r.firstChild?r.insertBefore(t,r.firstChild):r.appendChild(t)}var a=e("./promise");t.exports={loadScript:i,loadStylesheet:n}},{"./promise":124}],112:[function(e,t,r){arguments[4][57][0].apply(r,arguments)},{dup:57}],113:[function(e,t,r){"use strict";var i=e("@braintree/browser-detection/is-ie9");t.exports={isIe9:i}},{"@braintree/browser-detection/is-ie9":6}],114:[function(e,t,r){"use strict";function i(e){return e.className.trim().split(/\s+/)}function n(e,t){return new RegExp("\\b"+t+"\\b").test(e.className)}function a(e){var t=Array.prototype.slice.call(arguments,1),r=i(e).filter(function(e){return t.indexOf(e)===-1}).concat(t).join(" ");e.className=r}function o(e){var t=Array.prototype.slice.call(arguments,1),r=i(e).filter(function(e){return t.indexOf(e)===-1}).join(" ");e.className=r}function s(e,t,r){arguments.length<3?n(e,t)?o(e,t):a(e,t):r?a(e,t):o(e,t)}t.exports={add:a,remove:o,toggle:s}},{}],115:[function(e,t,r){"use strict";function i(e,t,r){var i=r.querySelector('[name="'+e+'"]');i||(i=document.createElement("input"),i.type="hidden",i.name=e,r.appendChild(i)),i.value=t}function n(e,t,r){var i=t.split("."),o=p(i[0]);1===i.length?e[o]=a(r):(e[o]=e[o]||{},n(e[o],i.slice(1).join("."),r))}function a(e){try{return JSON.parse(e)}catch(t){return e}}function o(e,t){var r,a,o,p;if(t){if(r=t.getAttribute("data-braintree-dropin-authorization"),!r)throw new c("Authorization not found in data-braintree-dropin-authorization attribute");if(a=document.createElement("div"),a.id="braintree-dropin-"+d(),p=l.findParentForm(t),!p)throw new c("No form found for script tag integration.");p.addEventListener("submit",function(e){e.preventDefault()}),t.parentNode.insertBefore(a,t),o={authorization:r,container:a},u.forEach(function(e){var r=t.getAttribute("data-"+e);null!=r&&n(o,e,r)}),e(o).then(function(e){s.sendEvent(e._client,"integration-type.script-tag"),p.addEventListener("submit",function(){e.requestPaymentMethod(function(e,t){e||(i("payment_method_nonce",t.nonce,p),t.deviceData&&i("device_data",t.deviceData,p),p.submit())})})})}}var s=e("./analytics"),l=e("./find-parent-form"),d=e("./uuid"),c=e("./dropin-error"),p=e("./kebab-case-to-camel-case"),u=["locale","payment-option-priority","data-collector.kount","data-collector.paypal","card.cardholderName","card.cardholderName.required","card.cardholder-name","card.cardholder-name.required","paypal.amount","paypal.currency","paypal.flow","paypal-credit.amount","paypal-credit.currency","paypal-credit.flow"];t.exports=o},{"./analytics":110,"./dropin-error":116,"./find-parent-form":118,"./kebab-case-to-camel-case":122,"./uuid":129}],116:[function(e,t,r){"use strict";function i(e){return"BraintreeError"===e.name}function n(e){this.name="DropinError","string"==typeof e?this.message=e:this.message=e.message,i(e)?this._braintreeWebError=e:this._braintreeWebError=e.braintreeWebError}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,t.exports=n},{}],117:[function(e,t,r){arguments[4][73][0].apply(r,arguments)},{dup:73}],118:[function(e,t,r){"use strict";function i(e){var t=e.parentNode;return t&&"FORM"!==t.nodeName?i(t):t}t.exports={findParentForm:i}},{}],119:[function(e,t,r){"use strict";var i=e("./polyfill").atob;t.exports=function(e){var t,r=e.getConfiguration();return"TOKENIZATION_KEY"===r.authorizationType||(t=JSON.parse(i(r.authorization)).authorizationFingerprint,!t||t.indexOf("customer_id=")===-1)}},{"./polyfill":123}],120:[function(e,t,r){(function(e){"use strict";function r(){return"https:"===e.location.protocol}t.exports={isHTTPS:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],121:[function(e,t,r){(function(e){"use strict";t.exports=function(t){return t=t||e,"utf-8"===t.document.characterSet.toLowerCase()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],122:[function(e,t,r){"use strict";function i(e){var t=e.split("-"),r=t.shift(),i=t.map(function(e){return e.charAt(0).toUpperCase()+e.substring(1)});return[r].concat(i).join("")}t.exports=i},{}],123:[function(e,t,r){(function(e){"use strict";function r(e){var t,r,i,n,a,o,s,l,d=new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p="";if(!d.test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");l=0;do n=c.indexOf(e.charAt(l++)),a=c.indexOf(e.charAt(l++)),o=c.indexOf(e.charAt(l++)),s=c.indexOf(e.charAt(l++)),t=(63&n)<<2|a>>4&3,r=(15&a)<<4|o>>2&15,i=(3&o)<<6|63&s,p+=String.fromCharCode(t)+(r?String.fromCharCode(r):"")+(i?String.fromCharCode(i):"");while(l<e.length);return p}var i="function"==typeof e.atob?e.atob:r;t.exports={atob:i,_atob:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],124:[function(e,t,r){arguments[4][80][0].apply(r,arguments)},{dup:80,"promise-polyfill":102}],125:[function(e,t,r){"use strict";t.exports=function(e){return"string"!=typeof e?"":e.replace(/</g,"&lt;").replace(/>/g,"&gt;")}},{}],126:[function(e,t,r){"use strict";t.exports=function(){var e=document.createElement("div"),t="flex-basis: 1px",r=["-webkit-","-moz-","-ms-","-o-",""];return r.forEach(function(r){e.style.cssText+=r+t}),Boolean(e.style.length)}},{}],127:[function(e,t,r){"use strict";function i(e,t,r){this._client=e,this._config=t,this._modal=this._setupModal(r)}var n=e("./classlist"),a=e("braintree-web/three-d-secure"),o=e("./promise");i.prototype.initialize=function(){var e=this;return a.create({client:this._client}).then(function(t){e._instance=t})},i.prototype.verify=function(e){var t=this;return this._revealModal(),o.all([this._waitForThreeDSecure(),this._instance.verifyCard({nonce:e,amount:this._config.amount,showLoader:!1,addFrame:function(e,r){var i=t._modal.querySelector(".braintree-three-d-secure__modal-body");r.onload=function(){n.add(i,"braintree-three-d-secure__frame-active")},i.appendChild(r)},removeFrame:function(){t._cleanupModal()}}).then(function(e){return t._resolveThreeDSecure(),e})]).then(function(e){return t._cleanupModal(),e[1]}).catch(function(e){return t._cleanupModal(),"THREE_D_SECURE_CANCELLED"===e.type?o.resolve(e.payload):o.reject(e)})},i.prototype.cancel=function(){var e=this;return this._instance.cancelVerifyCard().then(function(t){e._rejectThreeDSecure({type:"THREE_D_SECURE_CANCELLED",payload:{nonce:t.nonce,liabilityShifted:t.liabilityShifted,liabilityShiftPossible:t.liabilityShiftPossible}})}).catch(function(){}).then(function(){e._cleanupModal()})},i.prototype.updateConfiguration=function(e,t){this._config[e]=t},i.prototype.teardown=function(){return this._instance.teardown()},i.prototype._cleanupModal=function(){var e=this._modal.querySelector("iframe");n.remove(this._modal.querySelector(".braintree-three-d-secure__modal"),"braintree-three-d-secure__frame_visible"),n.remove(this._modal.querySelector(".braintree-three-d-secure__backdrop"),"braintree-three-d-secure__frame_visible"),e&&e.parentNode&&e.parentNode.removeChild(e),setTimeout(function(){this._modal.parentNode&&this._modal.parentNode.removeChild(this._modal)}.bind(this),300)},i.prototype._setupModal=function(e){var t=this,r=document.createElement("div");return r.innerHTML='<div class="braintree-three-d-secure">\n  <div class="braintree-three-d-secure__backdrop"></div>\n  <div class="braintree-three-d-secure__modal">\n    <div data-braintree-id="three-d-secure-loading-container" class="braintree-loader__container">\n      <div data-braintree-id="three-d-secure-loading-indicator" class="braintree-loader__indicator">\n        <svg width="14" height="16" class="braintree-loader__lock">\n          <use xlink:href="#iconLockLoader"></use>\n        </svg>\n      </div>\n    </div>\n    <div class="braintree-three-d-secure__modal-header">\n      {{cardVerification}}\n      <div class="braintree-three-d-secure__modal-close">\n        <svg width="21" height="21">\n          <use xlink:href="#iconClose"></use>\n        </svg>\n      </div>\n    </div>\n    <div class="braintree-three-d-secure__modal-body">\n    </div>\n  </div>\n</div>\n'.replace("{{cardVerification}}",e),r.querySelector(".braintree-three-d-secure__modal-close").addEventListener("click",function(){t.cancel()}),r},i.prototype._waitForThreeDSecure=function(){var e=this;return new o(function(t,r){e._resolveThreeDSecure=t,e._rejectThreeDSecure=r})},i.prototype._revealModal=function(){document.body.appendChild(this._modal),n.add(this._modal.querySelector(".braintree-three-d-secure__backdrop"),"braintree-three-d-secure__frame_visible"),setTimeout(function(){n.add(this._modal.querySelector(".braintree-three-d-secure__modal"),"braintree-three-d-secure__frame_visible")}.bind(this),10)},t.exports=i},{"./classlist":114,"./promise":124,"braintree-web/three-d-secure":90}],128:[function(e,t,r){"use strict";function i(e){return!!e&&("none"===e.style.display||i(e.parentNode))}function n(e,t,r){function n(i){i.propertyName===t&&(e.removeEventListener("transitionend",n),r())}return a.isIe9()||i(e)?void r():void e.addEventListener("transitionend",n)}var a=e("./browser-detection");t.exports={onTransitionEnd:n}},{"./browser-detection":113}],129:[function(e,t,r){arguments[4][84][0].apply(r,arguments)},{dup:84}],130:[function(e,t,r){"use strict";t.exports={payingWith:"Betaler med {{paymentSource}}",chooseAnotherWayToPay:"Vælg en anden betalingsmetode",chooseAWayToPay:"Vælg, hvordan du vil betale",otherWaysToPay:"Andre betalingsmetoder",cardVerification:"Bekræftelse af kort",fieldEmptyForCvv:"Du skal angive kontrolcifrene.",fieldEmptyForExpirationDate:"Du skal angive udløbsdatoen.",fieldEmptyForCardholderName:"Du skal angive kortindehaverens navn.",fieldTooLongForCardholderName:"Kortejerens navn skal være mindre end 256 tegn.",fieldEmptyForNumber:"Du skal angive et nummer.",fieldEmptyForPostalCode:"Du skal angive et postnummer.",fieldInvalidForCvv:"Sikkerhedskoden er ugyldig.",fieldInvalidForExpirationDate:"Udløbsdatoen er ugyldig.",fieldInvalidForNumber:"Kortnummeret er ugyldigt.",fieldInvalidForPostalCode:"Postnummeret er ugyldigt.",genericError:"Der opstod fejl i vores system.",hostedFieldsFailedTokenizationError:"Kontroller oplysningerne, og prøv igen.",hostedFieldsFieldsInvalidError:"Kontroller oplysningerne, og prøv igen.",hostedFieldsTokenizationNetworkErrorError:"Netværksfejl. Prøv igen.",hostedFieldsTokenizationCvvVerificationFailedError:"Betalingskortet blev ikke bekræftet. Kontrollér oplysningerne, og prøv igen.",paypalAccountTokenizationFailedError:"PayPal-kontoen blev ikke tilføjet. Prøv igen.",paypalFlowFailedError:"Der kunne ikke oprettes forbindelse til PayPal. Prøv igen.",paypalTokenizationRequestActiveError:"PayPal-betalingen er i gang med at blive autoriseret.",venmoCanceledError:"Der opstod en fejl. Sørg for, at du har den seneste version af Venmo-appen installeret på din enhed, og at din browser understøtter skift til Venmo.",venmoAppFailedError:"Venmo-appen blev ikke fundet på din enhed.",unsupportedCardTypeError:"Korttypen understøttes ikke. Prøv et andet kort.",applePayTokenizationError:"Der opstod en netværksfejl under behandlingen af betalingen med Apple Pay. Prøv igen.",applePayActiveCardError:"Knyt et understøttet kort til din Apple Pay-e-pung.",cardholderNameLabel:"Kortindehaverens navn",cardNumberLabel:"Kortnummer",cvvLabel:"Kontrolcifre",cvvThreeDigitLabelSubheading:"(3 cifre)",cvvFourDigitLabelSubheading:"(4 cifre)",cardholderNamePlaceholder:"Kortindehaverens navn",expirationDateLabel:"Udløbsdato",expirationDateLabelSubheading:"(MM/ÅÅ)",expirationDatePlaceholder:"MM/ÅÅ",postalCodeLabel:"Postnummer",payWithCard:"Betal med kort",endingIn:"Slutter med ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Kort",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],131:[function(e,t,r){"use strict";t.exports={payingWith:"Zahlen mit {{paymentSource}}",chooseAnotherWayToPay:"Andere Zahlungsmethode wählen",chooseAWayToPay:"Wie möchten Sie bezahlen?",otherWaysToPay:"Andere Zahlungsmethoden",cardVerification:"Kartenbestätigung",fieldEmptyForCvv:"Geben Sie die Kartenprüfnummer ein.",fieldEmptyForExpirationDate:"Geben Sie das Ablaufdatum ein.",fieldEmptyForCardholderName:"Geben Sie den Namen des Karteninhabers ein.",fieldTooLongForCardholderName:"Der Name des Karteninhabers darf 255 Zeichen nicht übersteigen.",fieldEmptyForNumber:"Geben Sie die Nummer ein.",fieldEmptyForPostalCode:"Geben Sie die PLZ ein.",fieldInvalidForCvv:"Die Kartenprüfnummer ist ungültig.",fieldInvalidForExpirationDate:"Das Ablaufdatum ist ungültig.",fieldInvalidForNumber:"Die Kreditkartennummer ist ungültig.",fieldInvalidForPostalCode:"Die PLZ ist ungültig.",genericError:"Bei uns ist ein Problem aufgetreten.",hostedFieldsFailedTokenizationError:"Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",hostedFieldsFieldsInvalidError:"Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",hostedFieldsTokenizationNetworkErrorError:"Netzwerkfehler. Versuchen Sie es erneut.",hostedFieldsTokenizationCvvVerificationFailedError:"Überprüfung der Karte fehlgeschlagen. Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",paypalAccountTokenizationFailedError:"Beim Hinzufügen des PayPal-Kontos ist ein Problem aufgetreten. Versuchen Sie es erneut.",paypalFlowFailedError:"Beim Verbinden mit PayPal ist ein Problem aufgetreten. Versuchen Sie es erneut.",paypalTokenizationRequestActiveError:"Die PayPal-Zahlung wird bereits autorisiert.",venmoCanceledError:"Etwas ist schief gelaufen. Vergewissern Sie sich, dass Sie die neueste Version der Venmo-App auf Ihrem Gerät installiert haben und Ihr Browser den Wechsel zu Venmo unterstützt.",venmoAppFailedError:"Die Venmo-App wurde auf Ihrem Gerät nicht gefunden.",unsupportedCardTypeError:"Dieser Kreditkartentyp wird nicht unterstützt. Versuchen Sie es mit einer anderen Karte.",applePayTokenizationError:"Netzwerkfehler bei der Zahlungsabwicklung mit Apple Pay. Versuchen Sie es erneut.",applePayActiveCardError:"Fügen Sie der Apple-Pay-Börse eine unterstützte Kreditkarte hinzu.",cardholderNameLabel:"Name des Karteninhabers",cardNumberLabel:"Kartennummer",cvvLabel:"Prüfnr.",cvvThreeDigitLabelSubheading:"(3-stellig)",cvvFourDigitLabelSubheading:"(4-stellig)",cardholderNamePlaceholder:"Name des Karteninhabers",expirationDateLabel:"Gültig bis",expirationDateLabelSubheading:"(MM/JJ)",expirationDatePlaceholder:"MM/JJ",postalCodeLabel:"PLZ",payWithCard:"Mit Kreditkarte zahlen",endingIn:"Mit den Endziffern ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Kreditkarte",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],132:[function(e,t,r){"use strict";t.exports={payingWith:"Paying with {{paymentSource}}",chooseAnotherWayToPay:"Choose another way to pay",chooseAWayToPay:"Choose a way to pay",otherWaysToPay:"Other ways to pay",cardVerification:"Card verification",fieldEmptyForCvv:"Please fill out a CVV.",fieldEmptyForExpirationDate:"Please fill out an expiry date.",fieldEmptyForCardholderName:"Please fill out a cardholder name.",fieldTooLongForCardholderName:"Cardholder name must be less than 256 characters.",fieldEmptyForNumber:"Please fill out a number.",fieldEmptyForPostalCode:"Please fill out a postcode.",fieldInvalidForCvv:"This security code is not valid.",fieldInvalidForExpirationDate:"This expiry date is not valid.",fieldInvalidForNumber:"This card number is not valid.",fieldInvalidForPostalCode:"This postcode is not valid.",genericError:"Something went wrong on our end.",hostedFieldsFailedTokenizationError:"Please check your information and try again.",hostedFieldsFieldsInvalidError:"Please check your information and try again.",hostedFieldsTokenizationNetworkErrorError:"Network error. Please try again.",hostedFieldsTokenizationCvvVerificationFailedError:"Credit card verification failed. Please check your entries and try again.",paypalAccountTokenizationFailedError:"Something went wrong while adding the PayPal account. Please try again.",paypalFlowFailedError:"Something went wrong while connecting to PayPal. Please try again.",paypalTokenizationRequestActiveError:"PayPal payment authorisation is already in progress.",venmoCanceledError:"We're sorry, something seems to have gone wrong. Please ensure you have the most recent version of the Venmo app installed on your device and your browser supports the switch to Venmo.",venmoAppFailedError:"The Venmo app wasn't found on your device.",unsupportedCardTypeError:"This card type is not supported. Please try another card.",applePayTokenizationError:"A network error occurred while processing the Apple Pay payment. Please try again.",applePayActiveCardError:"Link a supported card to your Apple Pay wallet.",cardholderNameLabel:"Cardholder Name",cardNumberLabel:"Card Number",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 digits)",cvvFourDigitLabelSubheading:"(4 digits)",cardholderNamePlaceholder:"Cardholder Name",expirationDateLabel:"Expiry date",expirationDateLabelSubheading:"(MM/YY)",expirationDatePlaceholder:"MM/YY",postalCodeLabel:"Postcode",payWithCard:"Pay with credit or debit card",endingIn:"Ending in ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Card",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],133:[function(e,t,r){"use strict";t.exports={payingWith:"Paying with {{paymentSource}}",chooseAnotherWayToPay:"Choose another way to pay",chooseAWayToPay:"Choose a way to pay",otherWaysToPay:"Other ways to pay",cardVerification:"Card Verification",fieldEmptyForCvv:"Please fill in a CSC.",fieldEmptyForExpirationDate:"Please fill in an expiry date.",fieldEmptyForCardholderName:"Please fill in a cardholder name.",fieldTooLongForCardholderName:"Cardholder name must be less than 256 characters.",fieldEmptyForNumber:"Please fill in a number.",fieldEmptyForPostalCode:"Please fill in a postcode.",fieldInvalidForCvv:"This security code is not valid.",fieldInvalidForExpirationDate:"This expiry date is not valid.",fieldInvalidForNumber:"This card number is not valid.",fieldInvalidForPostalCode:"This postcode is not valid.",genericError:"Something went wrong on our end.",hostedFieldsFailedTokenizationError:"Please check your information and try again.",hostedFieldsFieldsInvalidError:"Please check your information and try again.",hostedFieldsTokenizationNetworkErrorError:"Network error. Please try again.",hostedFieldsTokenizationCvvVerificationFailedError:"Credit card verification failed. Please check your information and try again.",paypalAccountTokenizationFailedError:"Something went wrong while adding the PayPal account. Please try again.",paypalFlowFailedError:"Something went wrong while connecting to PayPal. Please try again.",paypalTokenizationRequestActiveError:"PayPal payment authorisation is already in progress.",venmoCanceledError:"We're sorry, something seems to have gone wrong. Make sure you have the most recent version of the Venmo app installed on your device and your browser supports the switch to Venmo.",venmoAppFailedError:"The Venmo app isn't on your device.",unsupportedCardTypeError:"This card type is not supported. Please try another card.",applePayTokenizationError:"A network error occurred while processing the Apple Pay payment. Please try again.",applePayActiveCardError:"Add a supported card to your Apple Pay wallet.",cardholderNameLabel:"Cardholder Name",cardNumberLabel:"Card Number",cvvLabel:"CSC",cvvThreeDigitLabelSubheading:"(3 digits)",cvvFourDigitLabelSubheading:"(4 digits)",cardholderNamePlaceholder:"Cardholder Name",expirationDateLabel:"Expiry Date",expirationDateLabelSubheading:"(MM/YY)",expirationDatePlaceholder:"MM/YY",postalCodeLabel:"Postcode",payWithCard:"Pay with card",endingIn:"Ending in ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Card",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],134:[function(e,t,r){"use strict";t.exports={payingWith:"Paying with {{paymentSource}}",chooseAnotherWayToPay:"Choose another way to pay",chooseAWayToPay:"Choose a way to pay",otherWaysToPay:"Other ways to pay",cardVerification:"Card Verification",fieldEmptyForCvv:"Please fill out a CVV.",fieldEmptyForExpirationDate:"Please fill out an expiration date.",fieldEmptyForCardholderName:"Please fill out a cardholder name.",fieldEmptyForNumber:"Please fill out a card number.",fieldEmptyForPostalCode:"Please fill out a postal code.",fieldInvalidForCvv:"This security code is not valid.",fieldInvalidForExpirationDate:"This expiration date is not valid.",fieldInvalidForNumber:"This card number is not valid.",fieldInvalidForPostalCode:"This postal code is not valid.",fieldTooLongForCardholderName:"Cardholder name must be less than 256 characters.",genericError:"Something went wrong on our end.",hostedFieldsFailedTokenizationError:"Please check your information and try again.",hostedFieldsTokenizationCvvVerificationFailedError:"Credit card verification failed. Please check your information and try again.",hostedFieldsTokenizationNetworkErrorError:"Network error. Please try again.",hostedFieldsFieldsInvalidError:"Please check your information and try again.",paypalAccountTokenizationFailedError:"Something went wrong adding the PayPal account. Please try again.",paypalFlowFailedError:"Something went wrong connecting to PayPal. Please try again.",paypalTokenizationRequestActiveError:"PayPal payment authorization is already in progress.",applePayTokenizationError:"A network error occurred while processing the Apple Pay payment. Please try again.",applePayActiveCardError:"Add a supported card to your Apple Pay wallet.",venmoCanceledError:"Something went wrong. Ensure you have the most recent version of the Venmo app installed on your device and your browser supports switching to Venmo.",venmoAppFailedError:"The Venmo app could not be found on your device.",unsupportedCardTypeError:"This card type is not supported. Please try another card.",cardholderNameLabel:"Cardholder Name",cardNumberLabel:"Card Number",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 digits)",cvvFourDigitLabelSubheading:"(4 digits)",expirationDateLabel:"Expiration Date",expirationDateLabelSubheading:"(MM/YY)",cardholderNamePlaceholder:"Cardholder Name",expirationDatePlaceholder:"MM/YY",postalCodeLabel:"Postal Code",payWithCard:"Pay with card",endingIn:"Ending in ••{{lastTwoCardDigits}}",Card:"Card",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Apple Pay":"Apple Pay","Google Pay":"Google Pay",Venmo:"Venmo","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"MasterCard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],135:[function(e,t,r){"use strict";t.exports={payingWith:"Pago con {{paymentSource}}",chooseAnotherWayToPay:"Selecciona otra forma de pago.",chooseAWayToPay:"Selecciona una forma de pago.",otherWaysToPay:"Otras formas de pago",cardVerification:"Verificación de tarjeta",fieldEmptyForCvv:"Escribe el código CVV.",fieldEmptyForExpirationDate:"Escribe la fecha de vencimiento.",fieldEmptyForCardholderName:"Escribe el nombre de un titular de la tarjeta.",fieldTooLongForCardholderName:"El nombre del titular de la tarjeta debe tener menos de 256 caracteres.",fieldEmptyForNumber:"Escribe un número.",fieldEmptyForPostalCode:"Escribe el código postal.",fieldInvalidForCvv:"Este código de seguridad no es válido.",fieldInvalidForExpirationDate:"Esta fecha de vencimiento no es válida.",fieldInvalidForNumber:"Este número de tarjeta no es válido.",fieldInvalidForPostalCode:"Este código postal no es válido.",genericError:"Hemos tenido algún problema.",hostedFieldsFailedTokenizationError:"Comprueba la información e inténtalo de nuevo.",hostedFieldsFieldsInvalidError:"Comprueba la información e inténtalo de nuevo.",hostedFieldsTokenizationNetworkErrorError:"Error de red. Inténtalo de nuevo.",hostedFieldsTokenizationCvvVerificationFailedError:"Error de verificación de la tarjeta de crédito. Comprueba la información e inténtalo de nuevo.",paypalAccountTokenizationFailedError:"Se ha producido un error al vincular la cuenta PayPal. Inténtalo de nuevo.",paypalFlowFailedError:"Se ha producido un error al conectarse a PayPal. Inténtalo de nuevo.",paypalTokenizationRequestActiveError:"Ya hay una autorización de pago de PayPal en curso.",venmoCanceledError:"Ha habido un problema. Asegúrate de que tienes la versión más reciente de la aplicación de Venmo instalada en tu dispositivo y de que tu navegador es compatible con cambiar a Venmo.",venmoAppFailedError:"No se ha encontrado la aplicación de Venmo en tu dispositivo.",unsupportedCardTypeError:"No se admite este tipo de tarjeta. Prueba con otra tarjeta.",applePayTokenizationError:"Se ha producido un error de red al procesar el pago con Apple Pay. Inténtalo de nuevo.",applePayActiveCardError:"Añade una tarjeta admitida a tu Wallet de Apple Pay.",cardholderNameLabel:"Nombre del titular de la tarjeta",cardNumberLabel:"Número de tarjeta",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 dígitos)",cvvFourDigitLabelSubheading:"(4 dígitos)",cardholderNamePlaceholder:"Nombre del titular de la tarjeta",expirationDateLabel:"Fecha de vencimiento",expirationDateLabelSubheading:"(MM/AA)",expirationDatePlaceholder:"MM/AA",postalCodeLabel:"Código postal",payWithCard:"Pagar con tarjeta",endingIn:"Terminada en ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Tarjeta",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],136:[function(e,t,r){"use strict";t.exports={payingWith:"Payer avec {{paymentSource}}",chooseAnotherWayToPay:"Choisir un autre mode de paiement",chooseAWayToPay:"Choisir le mode de paiement",otherWaysToPay:"Autres modes de paiement",cardVerification:"Vérification de la carte",fieldEmptyForCvv:"Veuillez saisir un cryptogramme visuel.",fieldEmptyForExpirationDate:"Veuillez saisir une date d'expiration.",fieldEmptyForCardholderName:"Veuillez saisir un nom de titulaire de la carte.",fieldTooLongForCardholderName:"Le nom du titulaire de la carte doit contenir moins de 256 caractères.",fieldEmptyForNumber:"Veuillez saisir un numéro.",fieldEmptyForPostalCode:"Veuillez saisir un code postal.",fieldInvalidForCvv:"Ce cryptogramme visuel n'est pas valide.",fieldInvalidForExpirationDate:"Cette date d'expiration n'est pas valide.",fieldInvalidForNumber:"Ce numéro de carte n'est pas valide.",fieldInvalidForPostalCode:"Ce code postal n'est pas valide.",genericError:"Une erreur s'est produite de notre côté.",hostedFieldsFailedTokenizationError:"Vérifiez vos informations, puis réessayez.",hostedFieldsFieldsInvalidError:"Vérifiez vos informations, puis réessayez.",hostedFieldsTokenizationNetworkErrorError:"Erreur réseau. Veuillez réessayer.",hostedFieldsTokenizationCvvVerificationFailedError:"La vérification de la carte de crédit a échoué. Vérifiez vos informations, puis réessayez.",paypalAccountTokenizationFailedError:"Une erreur s'est produite lors de l'enregistrement du compte PayPal. Veuillez réessayer.",paypalFlowFailedError:"Une erreur s'est produite au cours de la connexion à PayPal. Veuillez réessayer.",paypalTokenizationRequestActiveError:"L'autorisation de paiement PayPal est déjà en cours.",venmoCanceledError:"Une erreur s'est produite. Assurez-vous que la version la plus récente de l'application Venmo est installée sur votre appareil et que votre navigateur prend Venmo en charge.",venmoAppFailedError:"L'application Venmo est introuvable sur votre appareil.",unsupportedCardTypeError:"Ce type de carte n'est pas pris en charge. Veuillez essayer une autre carte.",applePayTokenizationError:"Une erreur de réseau s'est produite lors du traitement du paiement avec Apple Pay. Veuillez réessayer.",applePayActiveCardError:"Ajoutez une carte prise en charge à Apple Pay.",cardholderNameLabel:"Nom du titulaire de la carte",cardNumberLabel:"Numéro de carte",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 chiffres)",cvvFourDigitLabelSubheading:"(4 chiffres)",cardholderNamePlaceholder:"Nom du titulaire de la carte",expirationDateLabel:"Date d'expiration",expirationDateLabelSubheading:"(MM/AA)",expirationDatePlaceholder:"MM/AA",postalCodeLabel:"Code postal",payWithCard:"Payer par carte",endingIn:"Se terminant par ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Carte",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],137:[function(e,t,r){"use strict";t.exports={payingWith:"Payer avec {{paymentSource}}",chooseAnotherWayToPay:"Choisissez une autre façon de payer.",chooseAWayToPay:"Choisissez comment payer.",otherWaysToPay:"Autres façons de payer",cardVerification:"Vérification de la carte",fieldEmptyForCvv:"Entrez un cryptogramme visuel.",fieldEmptyForExpirationDate:"Entrez une date d'expiration.",fieldEmptyForCardholderName:"Entrez un nom du titulaire de la carte.",fieldTooLongForCardholderName:"Le nom du titulaire de la carte doit contenir moins de 256 caractères.",fieldEmptyForNumber:"Entrez un numéro.",fieldEmptyForPostalCode:"Entrez un code postal.",fieldInvalidForCvv:"Ce cryptogramme visuel n'est pas valide.",fieldInvalidForExpirationDate:"Cette date d'expiration n'est pas valide.",fieldInvalidForNumber:"Ce numéro de carte n'est pas valide.",fieldInvalidForPostalCode:"Ce code postal n'est pas valide.",genericError:"Une erreur est survenue.",hostedFieldsFailedTokenizationError:"Vérifiez vos informations et réessayez.",hostedFieldsFieldsInvalidError:"Vérifiez vos informations et réessayez.",hostedFieldsTokenizationNetworkErrorError:"Erreur réseau. Réessayez.",hostedFieldsTokenizationCvvVerificationFailedError:"Échec de vérification de la carte bancaire. Vérifiez vos informations et réessayez.",paypalAccountTokenizationFailedError:"Une erreur est survenue lors de l'ajout du compte PayPal. Réessayez.",paypalFlowFailedError:"Une erreur est survenue lors de la connexion à PayPal. Réessayez.",paypalTokenizationRequestActiveError:"L'autorisation de paiement PayPal est déjà en cours.",venmoCanceledError:"Une erreur est survenue. Vérifiez que vous disposez de la dernière version de l'application Venmo sur votre appareil et que votre navigateur prend en charge la redirection vers Venmo.",venmoAppFailedError:"L'application Venmo est introuvable sur votre appareil.",unsupportedCardTypeError:"Ce type de carte n'est pas pris en charge. Essayez une autre carte.",applePayTokenizationError:"Une erreur réseau s'est produite lors du traitement du paiement Apple Pay. Réessayez.",applePayActiveCardError:"Enregistrez une carte prise en charge sur Apple Pay.",cardholderNameLabel:"Nom du titulaire de la carte",cardNumberLabel:"Nº de carte",cvvLabel:"Cryptogramme visuel",cvvThreeDigitLabelSubheading:"(3 chiffres)",cvvFourDigitLabelSubheading:"(4 chiffres)",cardholderNamePlaceholder:"Nom du titulaire de la carte",expirationDateLabel:"Date d'expiration",expirationDateLabelSubheading:"(MM/AA)",expirationDatePlaceholder:"MM/AA",postalCodeLabel:"Code postal",payWithCard:"Payer par carte",endingIn:"Se terminant par ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Carte",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],138:[function(e,t,r){"use strict";t.exports={payingWith:"Membayar dengan {{paymentSource}}",chooseAnotherWayToPay:"Pilih metode pembayaran lain",chooseAWayToPay:"Pilih metode pembayaran",otherWaysToPay:"Metode pembayaran lain",cardVerification:"Verifikasi Kartu",fieldEmptyForCvv:"Masukkan CVV.",fieldEmptyForExpirationDate:"Masukkan tanggal akhir berlaku.",fieldEmptyForCardholderName:"Masukkan nama pemegang kartu.",fieldTooLongForCardholderName:"Nama pemegang kartu harus kurang dari 256 karakter.",fieldEmptyForNumber:"Masukkan nomor.",fieldEmptyForPostalCode:"Masukkan kode pos.",fieldInvalidForCvv:"Kode keamanan ini tidak valid.",fieldInvalidForExpirationDate:"Tanggal akhir berlaku ini tidak valid.",fieldInvalidForNumber:"Nomor kartu ini tidak valid.",fieldInvalidForPostalCode:"Kode pos ini tidak valid.",genericError:"Terjadi kesalahan pada sistem kami.",hostedFieldsFailedTokenizationError:"Periksa informasi Anda dan coba lagi.",hostedFieldsFieldsInvalidError:"Periksa informasi Anda dan coba lagi.",hostedFieldsTokenizationNetworkErrorError:"Masalah jaringan. Coba lagi.",hostedFieldsTokenizationCvvVerificationFailedError:"Verifikasi kartu kredit gagal. Periksa informasi Anda dan coba lagi.",paypalAccountTokenizationFailedError:"Terjadi kesalahan saat menambahkan rekening PayPal. Coba lagi.",paypalFlowFailedError:"Terjadi kesalahan saat menyambung ke PayPal. Coba lagi.",paypalTokenizationRequestActiveError:"Otorisasi pembayaran PayPal sedang diproses.",venmoCanceledError:"Terdapat kesalahan. Pastikan Anda telah menginstal aplikasi Venmo versi terbaru pada perangkat dan peramban Anda mendukung untuk beralih ke Venmo.",venmoAppFailedError:"Aplikasi Venmo tidak dapat ditemukan pada perangkat Anda.",unsupportedCardTypeError:"Jenis kartu ini tidak didukung. Coba kartu lainnya.",applePayTokenizationError:"Terjadi kesalahan jaringan sewaktu memproses pembayaran melalui Apple Pay. Coba lagi.",applePayActiveCardError:"Tambahkan kartu yang didukung ke wallet Apple Pay.",cardholderNameLabel:"Nama Pemegang Kartu",cardNumberLabel:"Nomor Kartu",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 angka)",cvvFourDigitLabelSubheading:"(4 angka)",cardholderNamePlaceholder:"Nama Pemegang Kartu",expirationDateLabel:"Tanggal Kedaluwarsa",expirationDateLabelSubheading:"(BB/TT)",expirationDatePlaceholder:"BB/TT",postalCodeLabel:"Kode Pos",payWithCard:"Bayar dengan kartu",endingIn:"Berakhiran ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Kartu",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],139:[function(e,t,r){"use strict";t.exports={da:e("./da_DK"),de:e("./de_DE"),en:e("./en_US"),en_AU:e("./en_AU"),en_GB:e("./en_GB"),es:e("./es_ES"),fr_CA:e("./fr_CA"),fr:e("./fr_FR"),id:e("./id_ID"),it:e("./it_IT"),ja:e("./ja_JP"),ko:e("./ko_KR"),nl:e("./nl_NL"),no:e("./no_NO"),pl:e("./pl_PL"),pt_BR:e("./pt_BR"),pt:e("./pt_PT"),ru:e("./ru_RU"),sv:e("./sv_SE"),th:e("./th_TH"),zh:e("./zh_CN"),zh_HK:e("./zh_HK"),zh_TW:e("./zh_TW")}},{"./da_DK":130,"./de_DE":131,"./en_AU":132,"./en_GB":133,"./en_US":134,"./es_ES":135,"./fr_CA":136,"./fr_FR":137,"./id_ID":138,"./it_IT":140,"./ja_JP":141,"./ko_KR":142,"./nl_NL":143,"./no_NO":144,"./pl_PL":145,"./pt_BR":146,"./pt_PT":147,"./ru_RU":148,"./sv_SE":149,"./th_TH":150,"./zh_CN":151,"./zh_HK":152,"./zh_TW":153}],140:[function(e,t,r){"use strict";t.exports={payingWith:"Pagamento con {{paymentSource}}",chooseAnotherWayToPay:"Scegli di pagare in un altro modo",chooseAWayToPay:"Scegli come pagare",otherWaysToPay:"Altri modi di pagare",cardVerification:"Codice di sicurezza",fieldEmptyForCvv:"Immetti il codice di sicurezza (CVV).",fieldEmptyForExpirationDate:"Immetti la data di scadenza.",fieldEmptyForCardholderName:"Immetti il nome del titolare della carta.",fieldTooLongForCardholderName:"Il nome del titolare della carta deve avere meno di 256 caratteri.",fieldEmptyForNumber:"Immetti il numero di carta.",fieldEmptyForPostalCode:"Immetti il CAP.",fieldInvalidForCvv:"Il codice di sicurezza non è valido.",fieldInvalidForExpirationDate:"La data di scadenza non è valida.",fieldInvalidForNumber:"Il numero di carta non è valido.",fieldInvalidForPostalCode:"Il CAP non è valido.",genericError:"Si è verificato un errore nei nostri sistemi.",hostedFieldsFailedTokenizationError:"Controlla e riprova.",hostedFieldsFieldsInvalidError:"Controlla e riprova.",hostedFieldsTokenizationNetworkErrorError:"Errore di rete. Riprova.",hostedFieldsTokenizationCvvVerificationFailedError:"La verifica della carta di credito non è andata a buon fine. Controlla i dati e riprova.",paypalAccountTokenizationFailedError:"Si è verificato un errore nel collegamento del conto PayPal. Riprova.",paypalFlowFailedError:"Si è verificato un errore di connessione a PayPal. Riprova.",paypalTokenizationRequestActiveError:"L'autorizzazione di pagamento PayPal è già in corso.",venmoCanceledError:"Si è verificato un errore. Assicurati di avere la versione più recente dell'app Venmo installata sul tuo dispositivo e che il browser supporti l'uso di Venmo.",venmoAppFailedError:"Impossibile trovare l'app Venmo sul dispositivo in uso.",unsupportedCardTypeError:"Questo tipo di carta non è supportato. Prova con un'altra carta.",applePayTokenizationError:"Si è verificato un errore di rete durante l'elaborazione del pagamento con Apple Pay. Riprova.",applePayActiveCardError:"Collega una carta supportata al tuo Apple Pay Wallet.",cardholderNameLabel:"Titolare della carta",cardNumberLabel:"Numero di carta",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 cifre)",cvvFourDigitLabelSubheading:"(4 cifre)",cardholderNamePlaceholder:"Titolare della carta",expirationDateLabel:"Data di scadenza",expirationDateLabelSubheading:"(MM/AA)",expirationDatePlaceholder:"MM/AA",postalCodeLabel:"CAP",payWithCard:"Paga con una carta",endingIn:"Le cui ultime cifre sono ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Carta",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],141:[function(e,t,r){"use strict";t.exports={payingWith:"{{paymentSource}}で支払う",chooseAnotherWayToPay:"別の支払方法を選択する",chooseAWayToPay:"支払方法を選択する",otherWaysToPay:"その他の支払方法",cardVerification:"カード確認",fieldEmptyForCvv:"カード確認コードを入力してください。",fieldEmptyForExpirationDate:"有効期限を入力してください。",fieldEmptyForCardholderName:"カード保有者の名前を入力してください。",fieldTooLongForCardholderName:"カード保有者の名前は256文字未満にしてください。",fieldEmptyForNumber:"番号を入力してください。",fieldEmptyForPostalCode:"郵便番号を入力してください。",fieldInvalidForCvv:"このセキュリティコードは無効です。",fieldInvalidForExpirationDate:"この有効期限は無効です。",fieldInvalidForNumber:"このカード番号は無効です。",fieldInvalidForPostalCode:"この郵便番号は無効です。",genericError:"弊社側で問題が発生しました。",hostedFieldsFailedTokenizationError:"情報を確認してもう一度お試しください。",hostedFieldsFieldsInvalidError:"情報を確認してもう一度お試しください。",hostedFieldsTokenizationNetworkErrorError:"ネットワークエラーです。もう一度お試しください。",hostedFieldsTokenizationCvvVerificationFailedError:"クレジットカードの認証に失敗しました。情報を確認してもう一度お試しください。",paypalAccountTokenizationFailedError:"PayPalアカウントの追加で問題が発生しました。もう一度お試しください。",paypalFlowFailedError:"PayPalへの接続に問題が発生しました。もう一度お試しください。",paypalTokenizationRequestActiveError:"PayPal支払いの承認はすでに処理中です。",venmoCanceledError:"問題が発生しました。お客さまの端末にインストールされているVenmoアプリが最新のバージョンであること、お使いのブラウザがVenmoへの切り替えをサポートしていることを確認してください。",venmoAppFailedError:"お客さまの端末でVenmoアプリが見つかりませんでした。",unsupportedCardTypeError:"このカードタイプはサポートされていません。別のカードをご使用ください。",applePayTokenizationError:"Apple Payの支払いを処理する際にネットワークエラーが発生しました。もう一度お試しください。",applePayActiveCardError:"Apple Payウォレットに対応しているカードを追加してください。",cardholderNameLabel:"カード保有者の名前",cardNumberLabel:"カード番号",cvvLabel:"カード確認コード",cvvThreeDigitLabelSubheading:"(3桁)",cvvFourDigitLabelSubheading:"(4桁)",cardholderNamePlaceholder:"カード保有者の名前",expirationDateLabel:"有効期限",expirationDateLabelSubheading:"(MM/YY)",expirationDatePlaceholder:"MM/YY",postalCodeLabel:"郵便番号",payWithCard:"カードで支払う",endingIn:"x-{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"カード",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"銀聯(UnionPay)"}},{}],142:[function(e,t,r){"use strict";t.exports={payingWith:"{{paymentSource}}(으)로 결제",chooseAnotherWayToPay:"다른 결제수단 선택",chooseAWayToPay:"결제수단 선택",otherWaysToPay:"다른 방법으로 결제",cardVerification:"카드 인증",fieldEmptyForCvv:"CVV를 입력하세요.",fieldEmptyForExpirationDate:"만료일을 입력하세요.",fieldEmptyForCardholderName:"카드 소유자 이름을 입력하세요.",fieldTooLongForCardholderName:"카드 소유자 이름은 256자 미만이어야 합니다.",fieldEmptyForNumber:"번호를 입력하세요.",fieldEmptyForPostalCode:"우편번호를 입력하세요.",fieldInvalidForCvv:"이 보안 코드가 올바르지 않습니다.",fieldInvalidForExpirationDate:"이 만료일이 올바르지 않습니다.",fieldInvalidForNumber:"이 카드 번호가 올바르지 않습니다.",fieldInvalidForPostalCode:"이 우편번호가 올바르지 않습니다.",genericError:"저희 쪽에 문제가 발생했습니다.",hostedFieldsFailedTokenizationError:"정보를 확인하고 다시 시도해 주세요.",hostedFieldsFieldsInvalidError:"정보를 확인하고 다시 시도해 주세요.",hostedFieldsTokenizationNetworkErrorError:"네트워크 오류가 발생했습니다. 다시 시도해 주세요.",hostedFieldsTokenizationCvvVerificationFailedError:"신용카드 인증에 실패했습니다. 정보를 확인하고 다시 시도해 주세요.",paypalAccountTokenizationFailedError:"PayPal 계정을 추가하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",paypalFlowFailedError:"PayPal 계정을 연결하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",paypalTokenizationRequestActiveError:"PayPal 결제 승인이 이미 진행 중입니다.",venmoCanceledError:"오류가 발생했습니다. 기기에 최신 버전의 Venmo 앱이 설치되어 있으며 브라우저가 Venmo로 전환 기능을 지원하는지 확인하세요.",venmoAppFailedError:"기기에서 Venmo 앱을 찾을 수 없습니다.",unsupportedCardTypeError:"이 카드 형식은 지원되지 않습니다. 다른 카드로 시도해 주세요.",applePayTokenizationError:"Apple Pay 결제를 처리하는 동안 네트워크 오류가 발생했습니다. 다시 시도해 주세요.",applePayActiveCardError:"Apple Pay 전자지갑에 지원되는 카드를 추가하세요.",cardholderNameLabel:"카드 소유자 이름",cardNumberLabel:"카드 번호",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3자리)",cvvFourDigitLabelSubheading:"(4자리)",cardholderNamePlaceholder:"카드 소유자 이름",expirationDateLabel:"만료일",expirationDateLabelSubheading:"(MM/YY)",expirationDatePlaceholder:"MM/YY",postalCodeLabel:"우편번호",payWithCard:"카드로 결제",endingIn:"끝 번호: ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"카드",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],143:[function(e,t,r){"use strict";t.exports={payingWith:"Betalen met {{paymentSource}}",chooseAnotherWayToPay:"Kies een andere betaalmethode",chooseAWayToPay:"Kies een betaalwijze",otherWaysToPay:"Andere manieren om te betalen",cardVerification:"Kaartcontrole",fieldEmptyForCvv:"Vul een CSC in.",fieldEmptyForExpirationDate:"Vul een vervaldatum in.",fieldEmptyForCardholderName:"Vul een naam voor de kaarthouder in.",fieldTooLongForCardholderName:"De naam van de kaarthouder moet korter zijn dan 256 tekens.",fieldEmptyForNumber:"Vul een nummer in.",fieldEmptyForPostalCode:"Vul een postcode in.",fieldInvalidForCvv:"Deze CSC is ongeldig.",fieldInvalidForExpirationDate:"Deze vervaldatum is ongeldig.",fieldInvalidForNumber:"Dit creditcardnummer is ongeldig.",fieldInvalidForPostalCode:"Deze postcode is ongeldig.",genericError:"Er is iets fout gegaan.",hostedFieldsFailedTokenizationError:"Controleer uw gegevens en probeer het opnieuw.",hostedFieldsFieldsInvalidError:"Controleer uw gegevens en probeer het opnieuw.",hostedFieldsTokenizationNetworkErrorError:"'Netwerkfout. Probeer het opnieuw.",hostedFieldsTokenizationCvvVerificationFailedError:"De controle van de creditcard is mislukt. Controleer uw gegevens en probeer het opnieuw.",paypalAccountTokenizationFailedError:"Er is iets misgegaan bij het toevoegen van de PayPal-rekening. Probeer het opnieuw.",paypalFlowFailedError:"Er is iets misgegaan bij de verbinding met PayPal. Probeer het opnieuw.",paypalTokenizationRequestActiveError:"De autorisatie van de PayPal-betaling is al in behandeling.",venmoCanceledError:"Er ging iets fout. Controleer of de meest recente versie van de Venmo-app op je apparaat is geïnstalleerd en dat je browser overschakelen naar Venmo ondersteunt.",venmoAppFailedError:"De Venmo-app is niet aangetroffen op je apparaat.",unsupportedCardTypeError:"Dit type creditcard wordt niet ondersteund. Gebruik een andere creditcard.",applePayTokenizationError:"Er is een netwerkfout opgetreden bij het verwerken van de Apple Pay-betaling. Probeer het opnieuw.",applePayActiveCardError:"Voeg een ondersteunde creditcard toe aan je Apple Pay-wallet.",cardholderNameLabel:"Naam kaarthouder",cardNumberLabel:"Creditcardnummer",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 cijfers)",cvvFourDigitLabelSubheading:"(4 cijfers)",cardholderNamePlaceholder:"Naam kaarthouder",expirationDateLabel:"VervaldatumB",expirationDateLabelSubheading:"(MM/JJ)",expirationDatePlaceholder:"MM/JJ",postalCodeLabel:"Postcode",payWithCard:"Betalen met creditcard",endingIn:"Eindigend op ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Creditcard",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],144:[function(e,t,r){"use strict";t.exports={payingWith:"Betaling med {{paymentSource}}",chooseAnotherWayToPay:"Velg en annen måte å betale på",chooseAWayToPay:"Velg betalingsmåte",otherWaysToPay:"Andre måter å betale på",cardVerification:"Kortbekreftelse",fieldEmptyForCvv:"Oppgi en kortsikkerhetskode (CVV).",fieldEmptyForExpirationDate:"Oppgi en utløpsdato.",fieldEmptyForCardholderName:"Oppgi et navn for kortinnehaveren.",fieldTooLongForCardholderName:"Makslengden for kortinnehaverens navn er 256 tegn.",fieldEmptyForNumber:"Oppgi et nummer.",fieldEmptyForPostalCode:"Oppgi et postnummer.",fieldInvalidForCvv:"Denne sikkerhetskoden er ikke gyldig.",fieldInvalidForExpirationDate:"Denne utløpsdatoen er ikke gyldig.",fieldInvalidForNumber:"Dette kortnummeret er ikke gyldig.",fieldInvalidForPostalCode:"Dette postnummeret er ikke gyldig.",genericError:"Noe gikk galt hos oss.",hostedFieldsFailedTokenizationError:"Kontroller informasjonen og prøv på nytt.",hostedFieldsFieldsInvalidError:"Kontroller informasjonen og prøv på nytt.",hostedFieldsTokenizationNetworkErrorError:"Nettverksfeil. Prøv på nytt.",hostedFieldsTokenizationCvvVerificationFailedError:"Bekreftelsen av betalingskortet mislyktes. Kontroller informasjonen og prøv på nytt.",paypalAccountTokenizationFailedError:"Noe gikk galt da PayPal-kontoen ble lagt til. Prøv på nytt.",paypalFlowFailedError:"Det oppsto et problem med tilkoblingen til PayPal. Prøv på nytt.",paypalTokenizationRequestActiveError:"Godkjenning av PayPal-betalingen pågår allerede",venmoCanceledError:"Noe gikk galt. Kontroller at du har installert den nyeste versjonen av Venmo-appen på enheten og at nettleseren din støtter bytte til Venmo.",venmoAppFailedError:"Finner ikke Venmo-appen på enheten.",unsupportedCardTypeError:"Denne korttypen støttes ikke. Prøv med et annet kort.",applePayTokenizationError:"Det oppsto en nettverksfeil under behandlingen av Apple Pay-betalingen. Prøv på nytt.",applePayActiveCardError:"Legg til et kort som støttes i Apple Pay-lommeboken din.",cardholderNameLabel:"Kortinnehaverens navn",cardNumberLabel:"Kortnummer",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 siffer)",cvvFourDigitLabelSubheading:"(4 siffer)",cardholderNamePlaceholder:"Kortinnehaverens navn",expirationDateLabel:"Utløpsdato",expirationDateLabelSubheading:"(MM/ÅÅ)",expirationDatePlaceholder:"MM/ÅÅ",postalCodeLabel:"Postnummer",payWithCard:"Betal med kort",endingIn:"Som slutter på ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Kort",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],145:[function(e,t,r){"use strict";t.exports={payingWith:"Forma płatności: {{paymentSource}}",chooseAnotherWayToPay:"Wybierz inną formę płatności",chooseAWayToPay:"Wybierz sposób płatności",otherWaysToPay:"Inne formy płatności",cardVerification:"Weryfikacja karty",fieldEmptyForCvv:"Podaj kod bezpieczeństwa.",fieldEmptyForExpirationDate:"Podaj datę ważności.",fieldEmptyForCardholderName:"Podaj imię i nazwisko posiadacza karty.",fieldTooLongForCardholderName:"Imię i nazwisko posiadacza karty musi mieć mniej niż 256 znaków.",fieldEmptyForNumber:"Podaj numer.",fieldEmptyForPostalCode:"Podaj kod pocztowy.",fieldInvalidForCvv:"Podany kod bezpieczeństwa jest nieprawidłowy.",fieldInvalidForExpirationDate:"Podana data ważności jest nieprawidłowa.",fieldInvalidForNumber:"Podany numer karty jest nieprawidłowy.",fieldInvalidForPostalCode:"Podany kod pocztowy jest nieprawidłowy.",genericError:"Wystąpił błąd po naszej stronie.",hostedFieldsFailedTokenizationError:"Sprawdź swoje informacje i spróbuj ponownie.",hostedFieldsFieldsInvalidError:"Sprawdź swoje informacje i spróbuj ponownie.",hostedFieldsTokenizationNetworkErrorError:"Błąd sieci. Spróbuj ponownie.",hostedFieldsTokenizationCvvVerificationFailedError:"Weryfikacja karty kredytowej nie powiodła się. Sprawdź swoje informacje i spróbuj ponownie.",paypalAccountTokenizationFailedError:"Coś poszło nie tak podczas dodawania konta PayPal. Spróbuj ponownie.",paypalFlowFailedError:"Coś poszło nie tak podczas łączenia z systemem PayPal. Spróbuj ponownie.",paypalTokenizationRequestActiveError:"Autoryzacja płatności PayPal jest już w trakcie realizacji.",venmoCanceledError:"Wystąpił problem. Upewnij się, czy na swoim urządzeniu masz zainstalowaną najnowszą wersję aplikacji Venmo i Twoja przeglądarka ją obsługuje.",venmoAppFailedError:"Nie można odnaleźć aplikacji Venmo na urządzeniu.",unsupportedCardTypeError:"Ten typ karty nie jest obsługiwany. Spróbuj użyć innej karty.",applePayTokenizationError:"Wystąpił błąd sieci podczas przetwarzania płatności Apple Pay. Spróbuj ponownie.",applePayActiveCardError:"Dodaj obsługiwaną kartę do portfela Apple Pay.",cardholderNameLabel:"Imię i nazwisko posiadacza karty",cardNumberLabel:"Numer karty",cvvLabel:"Kod CVC",cvvThreeDigitLabelSubheading:"(3 cyfry)",cvvFourDigitLabelSubheading:"(4 cyfry)",cardholderNamePlaceholder:"Imię i nazwisko posiadacza karty",expirationDateLabel:"Data ważności",expirationDateLabelSubheading:"(MM/RR)",expirationDatePlaceholder:"MM/RR",postalCodeLabel:"Kod pocztowy",payWithCard:"Zapłać kartą",endingIn:"O numerze zakończonym cyframi ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Karta",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],146:[function(e,t,r){"use strict";t.exports={payingWith:"Pagando com {{paymentSource}}",chooseAnotherWayToPay:"Escolher outro meio de pagamento",chooseAWayToPay:"Escolher um meio de pagamento",otherWaysToPay:"Outro meio de pagamento",cardVerification:"Verificação do cartão",fieldEmptyForCvv:"Informe o Código de Segurança.",fieldEmptyForExpirationDate:"Informe a data de vencimento.",fieldEmptyForCardholderName:"Informe o nome do titular do cartão.",fieldTooLongForCardholderName:"O nome do titular do cartão deve ter menos de 256 caracteres.",fieldEmptyForNumber:"Informe um número.",fieldEmptyForPostalCode:"Informe um CEP.",fieldInvalidForCvv:"Este código de segurança não é válido.",fieldInvalidForExpirationDate:"Esta data de vencimento não é válida.",fieldInvalidForNumber:"O número do cartão não é válido.",fieldInvalidForPostalCode:"Este CEP não é válido.",genericError:"Ocorreu um erro.",hostedFieldsFailedTokenizationError:"Verifique as informações e tente novamente.",hostedFieldsFieldsInvalidError:"Verifique as informações e tente novamente.",hostedFieldsTokenizationNetworkErrorError:"Erro de rede. Tente novamente.",hostedFieldsTokenizationCvvVerificationFailedError:"Falha ao verificar o cartão de crédito. Verifique as informações e tente novamente.",paypalAccountTokenizationFailedError:"Ocorreu um erro ao adicionar a conta do PayPal. Tente novamente.",paypalFlowFailedError:"Ocorreu um erro de conexão com o PayPal. Tente novamente.",paypalTokenizationRequestActiveError:"A autorização de pagamento do PayPal já está em andamento.",venmoCanceledError:"Ocorreu um erro. Certifique-se de ter a versão mais recente do aplicativo Venmo instalado no seu dispositivo e que o seu navegador suporte a mudança para o Venmo.",venmoAppFailedError:"Não foi possível encontrar o aplicativo Venmo no seu dispositivo.",unsupportedCardTypeError:"Este tipo de cartão não é aceito. Experimente outro cartão.",applePayTokenizationError:"Ocorreu um erro de rede ao processar o pagamento com Apple Pay. Tente novamente.",applePayActiveCardError:"Adicione cartão suportado à sua carteira do Apple Pay.",cardholderNameLabel:"Nome do titular do cartão",cardNumberLabel:"Número do cartão",cvvLabel:"Cód. Seg.",cvvThreeDigitLabelSubheading:"(3 dígitos)",cvvFourDigitLabelSubheading:"(4 dígitos)",cardholderNamePlaceholder:"Nome do titular do cartão",expirationDateLabel:"Data de vencimento",expirationDateLabelSubheading:"(MM/AA)",expirationDatePlaceholder:"MM/AA",postalCodeLabel:"CEP",payWithCard:"Pague com seu cartão",endingIn:"Com final ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Cartão",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],147:[function(e,t,r){"use strict";t.exports={payingWith:"Pagar com {{paymentSource}}",chooseAnotherWayToPay:"Escolher outra forma de pagamento",chooseAWayToPay:"Escolha um meio de pagamento",otherWaysToPay:"Outras formas de pagamento",cardVerification:"Verificação de cartão",fieldEmptyForCvv:"Introduza o código CVV.",fieldEmptyForExpirationDate:"Introduza a data de validade.",fieldEmptyForCardholderName:"Introduza um nome do titular do cartão.",fieldTooLongForCardholderName:"O nome do titular do cartão tem de ter menos de 256 carateres.",fieldEmptyForNumber:"Introduza um número.",fieldEmptyForPostalCode:"Introduza o código postal.",fieldInvalidForCvv:"Este código de segurança não é válido.",fieldInvalidForExpirationDate:"Esta data de validade não é correta.",fieldInvalidForNumber:"Este número de cartão não é válido.",fieldInvalidForPostalCode:"Este código postal não é válido.",genericError:"Tudo indica que ocorreu um problema.",hostedFieldsFailedTokenizationError:"Verifique os dados e tente novamente.",hostedFieldsFieldsInvalidError:"Verifique os dados e tente novamente.",hostedFieldsTokenizationNetworkErrorError:"Erro de rede. Tente novamente.",hostedFieldsTokenizationCvvVerificationFailedError:"A verificação do cartão de crédito falhou. Verifique os dados e tente novamente.",paypalAccountTokenizationFailedError:"Ocorreu um erro ao associar a conta PayPal. Tente novamente.",paypalFlowFailedError:"Ocorreu um erro na ligação com PayPal. Tente novamente.",paypalTokenizationRequestActiveError:"Já há uma autorização de pagamento PayPal em curso.",venmoCanceledError:"Ocorreu um erro. Certifique-se de que tem a versão mais recente da aplicação Venmo instalada no seu dispositivo e que o navegador suporta a mudança para o Venmo.",venmoAppFailedError:"Não foi possível encontrar a aplicação Venmo no dispositivo.",unsupportedCardTypeError:"Este tipo de cartão não é suportado. Tente usar outro cartão.",applePayTokenizationError:"Ocorreu um erro de rede ao processar o pagamento com Apple Pay. Tente novamente.",applePayActiveCardError:"Adicione um cartão suportado à sua carteira Apple Pay.",cardholderNameLabel:"Nome do titular do cartão",cardNumberLabel:"Número do cartão",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 dígitos)",cvvFourDigitLabelSubheading:"(4 dígitos)",cardholderNamePlaceholder:"Nome do titular do cartão",expirationDateLabel:"Data de validade",expirationDateLabelSubheading:"(MM/AA)",expirationDatePlaceholder:"MM/AA",postalCodeLabel:"Código postal",payWithCard:"Pagar com cartão",endingIn:"Que termina em ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Cartão",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],148:[function(e,t,r){"use strict";t.exports={payingWith:"Способы оплаты: {{paymentSource}}",chooseAnotherWayToPay:"Выберите другой способ оплаты",chooseAWayToPay:"Выберите способ оплаты",otherWaysToPay:"Другие способы оплаты",cardVerification:"Проверка карты",fieldEmptyForCvv:"Укажите код безопасности.",fieldEmptyForExpirationDate:"Укажите дату окончания срока действия.",fieldEmptyForCardholderName:"Введите имя и фамилию владельца карты.",fieldTooLongForCardholderName:"Имя владельца карты должно содержать не более 256 символов.",fieldEmptyForNumber:"Введите номер.",fieldEmptyForPostalCode:"Укажите почтовый индекс.",fieldInvalidForCvv:"Этот код безопасности недействителен.",fieldInvalidForExpirationDate:"Эта дата окончания срока действия недействительна.",fieldInvalidForNumber:"Этот номер карты недействителен.",fieldInvalidForPostalCode:"Этот почтовый индекс недействителен.",genericError:"Возникла проблема с нашей стороны.",hostedFieldsFailedTokenizationError:"Проверьте правильность ввода данных и повторите попытку.",hostedFieldsFieldsInvalidError:"Проверьте правильность ввода данных и повторите попытку.",hostedFieldsTokenizationNetworkErrorError:"Ошибка сети. Повторите попытку.",hostedFieldsTokenizationCvvVerificationFailedError:"Проверка банковской карты не выполнена. Проверьте правильность ввода данных и повторите попытку.",paypalAccountTokenizationFailedError:"Что-то пошло не так — не удалось добавить учетную запись PayPal. Повторите попытку.",paypalFlowFailedError:"Что-то пошло не так — не удалось подключиться к системе PayPal. Повторите попытку.",paypalTokenizationRequestActiveError:"Выполняется авторизация платежа PayPal.",venmoCanceledError:"Возникла ошибка. Просим вас убедиться, что у вас установлена новейшая версия приложения Venmo и ваш браузер поддерживает переключение к Venmo.",venmoAppFailedError:"Приложение Venmo не обнаружено на вашем устройстве.",unsupportedCardTypeError:"Этот тип карты не поддерживается. Попробуйте воспользоваться другой картой.",applePayTokenizationError:"При обработке платежа через Apple Pay возникла сетевая ошибка. Повторите попытку.",applePayActiveCardError:"Добавьте поддерживаемую карту к своему счету Apple Pay.",cardholderNameLabel:"Имя и фамилия владельца",cardNumberLabel:"Номер карты",cvvLabel:"Код безопасности",cvvThreeDigitLabelSubheading:"(3 цифры)",cvvFourDigitLabelSubheading:"(4 цифры)",cardholderNamePlaceholder:"Имя и фамилия владельца",expirationDateLabel:"Действует до",expirationDateLabelSubheading:"(ММ/ГГ)",expirationDatePlaceholder:"ММ/ГГ",postalCodeLabel:"Индекс",payWithCard:"Оплатить картой",endingIn:"Заканчивается на ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Карта",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],149:[function(e,t,r){"use strict";t.exports={payingWith:"Betalas med {{paymentSource}}",chooseAnotherWayToPay:"Välj ett annat sätt att betala",chooseAWayToPay:"Välj hur du vill betala",otherWaysToPay:"Andra sätt att betala",cardVerification:"Kortverifiering",fieldEmptyForCvv:"Fyll i en CVV-kod.",fieldEmptyForExpirationDate:"Fyll i ett utgångsdatum.",fieldEmptyForCardholderName:"Fyll i kortinnehavarens namn.",fieldTooLongForCardholderName:"Kortinnehavarens namn måste vara kortare än 256 tecken.",fieldEmptyForNumber:"Fyll i ett nummer.",fieldEmptyForPostalCode:"Fyll i ett postnummer.",fieldInvalidForCvv:"Den här säkerhetskoden är inte giltig.",fieldInvalidForExpirationDate:"Det här utgångsdatumet är inte giltigt.",fieldInvalidForNumber:"Det här kortnumret är inte giltigt.",fieldInvalidForPostalCode:"Det här postnumret är inte giltigt.",genericError:"Ett fel uppstod.",hostedFieldsFailedTokenizationError:"Kontrollera uppgifterna och försök igen.",hostedFieldsFieldsInvalidError:"Kontrollera uppgifterna och försök igen.",hostedFieldsTokenizationNetworkErrorError:"Nätverksfel. Försök igen.",hostedFieldsTokenizationCvvVerificationFailedError:"Verifieringen av betalkort misslyckades. Kontrollera uppgifterna och försök igen.",paypalAccountTokenizationFailedError:"Ett fel uppstod när PayPal-kontot skulle läggas till. Försök igen.",paypalFlowFailedError:"Ett fel uppstod när anslutningen till PayPal skulle upprättas. Försök igen.",paypalTokenizationRequestActiveError:"Betalningsgodkännandet för PayPal behandlas redan.",venmoCanceledError:"Något gick fel. Se till att du har den senaste versionen av Venmo-appen installerad på din enhet och att webbläsaren stöder att gå över till Venmo.",venmoAppFailedError:"Venmo-appen kunde inte hittas på din enhet.",unsupportedCardTypeError:"Den här korttypen stöds inte. Pröva med ett annat kort.",applePayTokenizationError:"Ett nätverksfel inträffade när Apple Pay-betalningen skulle behandlas. Försök igen.",applePayActiveCardError:"Lägg till ett kort som stöds i Apple Pay-e-plånboken.",cardholderNameLabel:"Kortinnehavarens namn",cardNumberLabel:"Kortnummer",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 siffror)",cvvFourDigitLabelSubheading:"(4 siffror)",cardholderNamePlaceholder:"Kortinnehavarens namn",expirationDateLabel:"Utgångsdatum",expirationDateLabelSubheading:"(MM/ÅÅ)",expirationDatePlaceholder:"MM/ÅÅ",postalCodeLabel:"Postnummer",payWithCard:"Betala med kort",endingIn:"Slutar på ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"Kort",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],150:[function(e,t,r){"use strict";t.exports={payingWith:"การชำระเงินด้วย {{paymentSource}}",chooseAnotherWayToPay:"เลือกวิธีอื่นเพื่อชำระเงิน",chooseAWayToPay:"เลือกวิธีชำระเงิน",otherWaysToPay:"วิธีอื่นๆ ในการชำระเงิน",cardVerification:"การตรวจสอบยืนยันบัตร",fieldEmptyForCvv:"โปรดกรอก CVV (รหัสการตรวจสอบยืนยันบัตร)",fieldEmptyForExpirationDate:"โปรดกรอกวันที่หมดอายุ",fieldEmptyForCardholderName:"โปรดกรอกชื่อเจ้าของบัตร",fieldTooLongForCardholderName:"ชื่อผู้ถือบัตรจะต้องไม่เกิน 256 อักขระ",fieldEmptyForNumber:"โปรดกรอกหมายเลข",fieldEmptyForPostalCode:"โปรดกรอกรหัสไปรษณีย์",fieldInvalidForCvv:"รหัสความปลอดภัยนี้ไม่ถูกต้อง",fieldInvalidForExpirationDate:"วันที่หมดอายุนี้ไม่ถูกต้อง",fieldInvalidForNumber:"หมายเลขบัตรนี้ไม่ถูกต้อง",fieldInvalidForPostalCode:"รหัสไปรษณีย์นี้ไม่ถูกต้อง",genericError:"เกิดข้อผิดพลาดขึ้นในระบบของเรา",hostedFieldsFailedTokenizationError:"โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",hostedFieldsFieldsInvalidError:"โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",hostedFieldsTokenizationNetworkErrorError:"ข้อผิดพลาดด้านเครือข่าย โปรดลองอีกครั้ง",hostedFieldsTokenizationCvvVerificationFailedError:"การตรวจสอบยืนยันบัตรเครดิตล้มเหลว โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",paypalAccountTokenizationFailedError:"เกิดข้อผิดพลาดในการเพิ่มบัญชี PayPal โปรดลองอีกครั้ง",paypalFlowFailedError:"เกิดข้อผิดพลาดในการเชื่อมต่อกับ PayPal โปรดลองอีกครั้ง",paypalTokenizationRequestActiveError:"การอนุญาตการชำระเงินของ PayPal อยู่ในระหว่างดำเนินการ",venmoCanceledError:"เกิดข้อผิดพลาดบางประการ ตรวจสอบว่าคุณมีแอป Venmo เวอร์ชันล่าสุดติดตั้งในอุปกรณ์ของคุณ และมีเบราเซอร์ที่รองรับ Venmo",venmoAppFailedError:"ไม่พบแอป Venmo บนอุปกรณ์ของคุณ",unsupportedCardTypeError:"ไม่รองรับบัตรประเภทนี้ โปรดลองใช้บัตรใบอื่น",applePayTokenizationError:"เกิดข้อผิดพลาดด้านเครือข่ายขึ้นขณะดำเนินการชำระเงินด้วย Apple Pay โปรดลองอีกครั้ง",applePayActiveCardError:"เพิ่มบัตรที่รองรับในกระเป๋าสตางค์ Apple Pay ของคุณ",cardholderNameLabel:"ชื่อเจ้าของบัตร",cardNumberLabel:"หมายเลขบัตร",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"(3 หลัก)",cvvFourDigitLabelSubheading:"(4 หลัก)",cardholderNamePlaceholder:"ชื่อเจ้าของบัตร",expirationDateLabel:"วันหมดอายุ",expirationDateLabelSubheading:"(ดด/ปป)",expirationDatePlaceholder:"ดด/ปป",postalCodeLabel:"รหัสไปรษณีย์",payWithCard:"ชำระเงินด้วยบัตร",endingIn:"ลงท้ายด้วย ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"บัตร",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],151:[function(e,t,r){"use strict";t.exports={payingWith:"正在使用{{paymentSource}}付款",chooseAnotherWayToPay:"选择其他付款方式",chooseAWayToPay:"选择付款方式",otherWaysToPay:"其他付款方式",cardVerification:"卡验证",fieldEmptyForCvv:"请填写CVV。",fieldEmptyForExpirationDate:"请填写有效期限。",fieldEmptyForCardholderName:"请填写持卡人的姓名。",fieldTooLongForCardholderName:"持卡人姓名必须少于256个字符。",fieldEmptyForNumber:"请填写一个号码。",fieldEmptyForPostalCode:"请填写邮政编码。",fieldInvalidForCvv:"此安全代码无效。",fieldInvalidForExpirationDate:"此有效期限无效。",fieldInvalidForNumber:"此卡号无效。",fieldInvalidForPostalCode:"此邮政编码无效。",genericError:"我们遇到了一些问题",hostedFieldsFailedTokenizationError:"请检查您的信息，然后重试。",hostedFieldsFieldsInvalidError:"请检查您的信息，然后重试。",hostedFieldsTokenizationNetworkErrorError:"网络错误。请重试。",hostedFieldsTokenizationCvvVerificationFailedError:"信用卡验证失败。请检查您的信息，然后重试。",paypalAccountTokenizationFailedError:"添加PayPal账户时出错。请重试。",paypalFlowFailedError:"连接到PayPal时出错。请重试。",paypalTokenizationRequestActiveError:"PayPal付款授权已在进行中。",venmoCanceledError:"我们遇到了问题。请确保您的设备上已安装最新版本的Venmo应用，并且您的浏览器支持切换到Venmo。",venmoAppFailedError:"在您的设备上找不到Venmo应用。",unsupportedCardTypeError:"不支持该卡类型。请尝试其他卡。",applePayTokenizationError:"处理Apple Pay付款时出现网络错误。请重试。",applePayActiveCardError:"请添加受支持的卡到您的Apple Pay钱包。",cardholderNameLabel:"持卡人姓名",cardNumberLabel:"卡号",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"（3位数）",cvvFourDigitLabelSubheading:"（4位数）",cardholderNamePlaceholder:"持卡人姓名",expirationDateLabel:"有效期限",expirationDateLabelSubheading:"（MM/YY）",expirationDatePlaceholder:"MM/YY",postalCodeLabel:"邮政编码",payWithCard:"用卡付款",endingIn:"尾号为{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"卡",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"银联"}},{}],152:[function(e,t,r){"use strict";t.exports={payingWith:"付款方式為 {{paymentSource}}",chooseAnotherWayToPay:"選擇其他付款方式",chooseAWayToPay:"選擇付款方式",otherWaysToPay:"其他付款方式",cardVerification:"信用卡認證",fieldEmptyForCvv:"請填寫信用卡認證碼。",fieldEmptyForExpirationDate:"請填寫到期日。",fieldEmptyForCardholderName:"請填寫持卡人的名字。",fieldTooLongForCardholderName:"持卡人姓名必須少於 256 個字元。",fieldEmptyForNumber:"請填寫號碼。",fieldEmptyForPostalCode:"請填寫郵遞區號。",fieldInvalidForCvv:"此安全代碼無效。",fieldInvalidForExpirationDate:"此到期日無效。",fieldInvalidForNumber:"此卡號無效。",fieldInvalidForPostalCode:"此郵遞區號無效。",genericError:"系統發生錯誤。",hostedFieldsFailedTokenizationError:"請檢查你的資料並再試一次。",hostedFieldsFieldsInvalidError:"請檢查你的資料並再試一次。",hostedFieldsTokenizationNetworkErrorError:"網絡錯誤。請重試。",hostedFieldsTokenizationCvvVerificationFailedError:"信用卡認證失敗。請檢查你的資料並再試一次。",paypalAccountTokenizationFailedError:"加入 PayPal 帳戶時發生錯誤。請重試。",paypalFlowFailedError:"連接 PayPal 時發生錯誤。請重試。",paypalTokenizationRequestActiveError:"PayPal 付款授權已在處理中。",venmoCanceledError:"系統發生錯誤，請確保你已在裝置上安裝最新版本的 Venmo 應用程式，而且你的瀏覽器支援切換至 Venmo。",venmoAppFailedError:"在你的裝置上找不到 Venmo 應用程式。",unsupportedCardTypeError:"不可使用此信用卡類型。請改用其他信用卡。",applePayTokenizationError:"處理 Apple Pay 付款時發生網絡錯誤。請重試。",applePayActiveCardError:"在 Apple Pay 錢包中加入支援的信用卡。",cardholderNameLabel:"持卡人名字",cardNumberLabel:"卡號",cvvLabel:"信用卡認證碼",cvvThreeDigitLabelSubheading:"（3 位數）",cvvFourDigitLabelSubheading:"（4 位數）",cardholderNamePlaceholder:"持卡人名字",expirationDateLabel:"到期日",expirationDateLabelSubheading:"(MM/YY)",expirationDatePlaceholder:"月 / 年",postalCodeLabel:"郵遞區號",payWithCard:"使用信用卡付款",endingIn:"最後兩位數為 ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"信用卡",PayPal:"PayPal","PayPal Credit":"PayPal Credit","Google Pay":"Google Pay","American Express":"American Express",Discover:"Discover","Diners Club":"Diners Club",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],153:[function(e,t,r){"use strict";t.exports={payingWith:"以 {{paymentSource}} 付款",chooseAnotherWayToPay:"選擇支付款項的以其他方式付款",chooseAWayToPay:"選擇支付款項的方式",otherWaysToPay:"其他付款方式",cardVerification:"信用卡認證",fieldEmptyForCvv:"請填妥信用卡驗證碼。",fieldEmptyForExpirationDate:"請填妥到期日。",fieldEmptyForCardholderName:"請填妥持卡人姓名。",fieldTooLongForCardholderName:"持卡人姓名不能超過 256 個字元。",fieldEmptyForNumber:"請填妥號碼。",fieldEmptyForPostalCode:"請填寫郵遞區號。",fieldInvalidForCvv:"這組安全代碼無效。",fieldInvalidForExpirationDate:"此到期日無效。",fieldInvalidForNumber:"此卡號無效。",fieldInvalidForPostalCode:"此郵遞區號無效。",genericError:"我們的系統發生問題。",hostedFieldsFailedTokenizationError:"請檢查你的資料並重試。",hostedFieldsFieldsInvalidError:"請檢查你的資料並重試。",hostedFieldsTokenizationNetworkErrorError:"網路錯誤。請重試。",hostedFieldsTokenizationCvvVerificationFailedError:"信用卡認證失敗。請檢查你的資料並重試。",paypalAccountTokenizationFailedError:"新增 PayPal 帳戶時，系統發生錯誤。請重試。",paypalFlowFailedError:"連結至 PayPal 時，系統發生錯誤。請重試。",paypalTokenizationRequestActiveError:"PayPal 支付款項的授權已在處理中。",venmoCanceledError:"系統發生錯誤。確認你的裝置上裝有最新版本的 Venmo 應用程式，而且瀏覽器支援切換至 Venmo。",venmoAppFailedError:"你的裝置上找不到 Venmo 應用程式。",unsupportedCardTypeError:"不支援此卡片類型。請嘗試其他卡片。",applePayTokenizationError:"在處理 Apple Pay 付款時發生網路錯誤。請重試。",applePayActiveCardError:"新增支援的卡片至你的 Apple Pay 錢包。",cardholderNameLabel:"持卡人姓名",cardNumberLabel:"卡號",cvvLabel:"CVV",cvvThreeDigitLabelSubheading:"（3 位數）",cvvFourDigitLabelSubheading:"（4 位數）",cardholderNamePlaceholder:"持卡人姓名",expirationDateLabel:"到期日",expirationDateLabelSubheading:"（月 / 年）",expirationDatePlaceholder:"月 / 年",postalCodeLabel:"郵遞區號",payWithCard:"使用信用卡 / 扣帳卡付款",endingIn:"你的末兩碼為 ••{{lastTwoCardDigits}}","Apple Pay":"Apple Pay",Venmo:"Venmo",Card:"信用卡或扣帳卡",PayPal:"PayPal","PayPal Credit":"PayPal 信貸","Google Pay":"Google Pay","American Express":"美國運通 (American Express)",Discover:"Discover","Diners Club":"大來國際 (Diners Club)",MasterCard:"Mastercard",Visa:"Visa",JCB:"JCB",Maestro:"Maestro",UnionPay:"UnionPay"}},{}],154:[function(e,t,r){"use strict";function i(e){e=e||{},n(this,e)}var n=e("../lib/assign").assign,a=e("../lib/dropin-error"),o=e("../constants").errors,s=e("../lib/promise");i.prototype.getElementById=function(e){return this.element?this.element.querySelector('[data-braintree-id="'+e+'"]'):null},i.prototype.requestPaymentMethod=function(){return s.reject(new a(o.NO_PAYMENT_METHOD_ERROR))},i.prototype.getPaymentMethod=function(){return this.activeMethodView&&this.activeMethodView.paymentMethod},i.prototype.onSelection=function(){},i.prototype.teardown=function(){return s.resolve()},t.exports=i},{"../constants":105,"../lib/assign":112,"../lib/dropin-error":116,"../lib/promise":124}],155:[function(e,t,r){"use strict";function i(){l.apply(this,arguments),this.dependenciesInitializing=0,this._initialize()}function n(e){return e.toLowerCase().replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function a(e){return"braintree-show-"+e}var o=e("../lib/analytics"),s=e("../constants").analyticsKinds,l=e("./base-view"),d=e("../lib/classlist"),c=e("./payment-sheet-views"),p=e("./payment-methods-view"),u=e("./payment-options-view"),h=e("../lib/add-selection-event-handler"),y=e("../lib/promise"),m=e("../lib/supports-flexbox"),f=e("../lib/transition-helper"),v=e("../constants").CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT,b="Developer Error: Something went wrong. Check the console for details.";i.prototype=Object.create(l.prototype),i.prototype.constructor=i,i.prototype._initialize=function(){var e,t=this.model.supportedPaymentOptions.length>1,r=this.model.getPaymentMethods(),i=this.model.merchantConfiguration.preselectVaultedPaymentMethod!==!1;this._views={},this.sheetContainer=this.getElementById("sheet-container"),this.sheetErrorText=this.getElementById("sheet-error-text"),this.toggle=this.getElementById("toggle"),this.lowerContainer=this.getElementById("lower-container"),this.loadingContainer=this.getElementById("loading-container"),this.loadingIndicator=this.getElementById("loading-indicator"),this.dropinContainer=this.element.querySelector(".braintree-dropin"),this.supportsFlexbox=m(),this.model.on("asyncDependenciesReady",this.hideLoadingIndicator.bind(this)),this.model.on("errorOccurred",this.showSheetError.bind(this)),this.model.on("errorCleared",this.hideSheetError.bind(this)),this.paymentSheetViewIDs=Object.keys(c).reduce(function(e,t){var r,i;return this.model.supportedPaymentOptions.indexOf(t)!==-1&&(r=c[t],i=new r({element:this.getElementById(r.ID),mainView:this,model:this.model,client:this.client,strings:this.strings}),i.initialize(),this.addView(i),e.push(i.ID)),e}.bind(this),[]),this.paymentMethodsViews=new p({element:this.element,model:this.model,strings:this.strings}),this.addView(this.paymentMethodsViews),h(this.toggle,this.toggleAdditionalOptions.bind(this)),this.model.on("changeActivePaymentMethod",function(){setTimeout(function(){this.setPrimaryView(p.ID)}.bind(this),v)}.bind(this)),this.model.on("changeActivePaymentView",function(e){var t=this.getView(e);e===p.ID?(d.add(this.paymentMethodsViews.container,"braintree-methods--active"),d.remove(this.sheetContainer,"braintree-sheet--active")):(setTimeout(function(){d.add(this.sheetContainer,"braintree-sheet--active")}.bind(this),0),d.remove(this.paymentMethodsViews.container,"braintree-methods--active"),this.getView(e).getPaymentMethod()||this.model.setPaymentMethodRequestable({isRequestable:!1})),t.onSelection()}.bind(this)),this.model.on("removeActivePaymentMethod",function(){var e=this.getView(this.model.getActivePaymentView());e&&"function"==typeof e.removeActivePaymentMethod&&e.removeActivePaymentMethod()}.bind(this)),t&&(e=new u({client:this.client,element:this.getElementById(u.ID),mainView:this,model:this.model,strings:this.strings}),this.addView(e)),r.length>0?i?this.model.changeActivePaymentMethod(r[0]):this.setPrimaryView(this.paymentMethodsViews.ID):t?this.setPrimaryView(e.ID):this.setPrimaryView(this.paymentSheetViewIDs[0])},i.prototype.addView=function(e){this._views[e.ID]=e},i.prototype.getView=function(e){return this._views[e]},i.prototype.setPrimaryView=function(e,t){var r;setTimeout(function(){this.element.className=a(e),t&&d.add(this.element,a(t))}.bind(this),0),this.primaryView=this.getView(e),this.model.changeActivePaymentView(e),this.paymentSheetViewIDs.indexOf(e)!==-1?this.model.getPaymentMethods().length>0||this.getView(u.ID)?this.showToggle():this.hideToggle():e===p.ID?(this.showToggle(),this.getElementById("lower-container").appendChild(this.getElementById("options"))):e===u.ID&&this.hideToggle(),this.supportsFlexbox||this.element.setAttribute("data-braintree-no-flexbox",!0),r=this.primaryView.getPaymentMethod(),this.model.setPaymentMethodRequestable({isRequestable:Boolean(r),type:r&&r.type,selectedPaymentMethod:r}),this.model.clearError()},i.prototype.requestPaymentMethod=function(){var e=this.getView(this.model.getActivePaymentView());return e.requestPaymentMethod().then(function(e){return o.sendEvent(this.client,"request-payment-method."+s[e.type]),e}.bind(this)).catch(function(e){return o.sendEvent(this.client,"request-payment-method.error"),y.reject(e)}.bind(this))},i.prototype.hideLoadingIndicator=function(){d.add(this.dropinContainer,"braintree-loaded"),f.onTransitionEnd(this.loadingIndicator,"transform",function(){this.loadingContainer.parentNode.removeChild(this.loadingContainer)}.bind(this))},i.prototype.toggleAdditionalOptions=function(){var e,t=this.model.supportedPaymentOptions.length>1,r=this.paymentSheetViewIDs.indexOf(this.primaryView.ID)!==-1;this.hideToggle(),t?r?0===this.model.getPaymentMethods().length?this.setPrimaryView(u.ID):(this.setPrimaryView(p.ID,u.ID),this.hideToggle()):d.add(this.element,a(u.ID)):(e=this.paymentSheetViewIDs[0],d.add(this.element,a(e)),this.model.changeActivePaymentView(e))},i.prototype.showToggle=function(){d.remove(this.toggle,"braintree-hidden"),d.add(this.lowerContainer,"braintree-hidden")},i.prototype.hideToggle=function(){d.add(this.toggle,"braintree-hidden"),d.remove(this.lowerContainer,"braintree-hidden")},i.prototype.showSheetError=function(e){var t,r=this.strings.genericError;t=this.strings.hasOwnProperty(e)?this.strings[e]:e&&e.code?this.strings[n(e.code)+"Error"]||r:"developerError"===e?b:r,d.add(this.sheetContainer,"braintree-sheet--has-error"),this.sheetErrorText.innerHTML=t},i.prototype.hideSheetError=function(){d.remove(this.sheetContainer,"braintree-sheet--has-error")},i.prototype.getOptionsElements=function(){return this._views.options.elements},i.prototype.teardown=function(){var e,t=Object.keys(this._views),r=t.map(function(t){return this._views[t].teardown().catch(function(t){e=t})}.bind(this));return y.all(r).then(function(){return e?y.reject(e):y.resolve()})},t.exports=i},{"../constants":105,"../lib/add-selection-event-handler":109,"../lib/analytics":110,"../lib/classlist":114,"../lib/promise":124,"../lib/supports-flexbox":126,"../lib/transition-helper":128,"./base-view":154,"./payment-methods-view":157,"./payment-options-view":158,"./payment-sheet-views":163}],156:[function(e,t,r){"use strict";function i(){n.apply(this,arguments),this._initialize()}var n=e("./base-view"),a=e("../lib/classlist"),o=e("../constants"),s=e("../lib/add-selection-event-handler"),l='<div class="braintree-method__logo">\n  <svg width="40" height="24" class="@CLASSNAME">\n    <use xlink:href="#@ICON"></use>\n  </svg>\n</div>\n\n<div class="braintree-method__label">@TITLE<br><div class="braintree-method__label--small">@SUBTITLE</div></div>\n\n<div class="braintree-method__check-container">\n  <div class="braintree-method__check">\n    <svg height="100%" width="100%">\n      <use xlink:href="#iconCheck"></use>\n    </svg>\n  </div>\n</div>\n';i.prototype=Object.create(n.prototype),i.prototype.constructor=i,i.prototype._initialize=function(){var e,t=l,r=o.paymentMethodCardTypes,i=o.paymentMethodTypes;switch(this.element=document.createElement("div"),this.element.className="braintree-method",this.element.setAttribute("tabindex","0"),s(this.element,function(){this.model.changeActivePaymentMethod(this.paymentMethod)}.bind(this)),this.paymentMethod.type){case i.applePay:t=t.replace(/@ICON/g,"logoApplePay").replace(/@CLASSNAME/g,"").replace(/@TITLE/g,this.strings["Apple Pay"]).replace(/@SUBTITLE/g,"");break;case i.card:e=this.strings.endingIn.replace("{{lastTwoCardDigits}}",this.paymentMethod.details.lastTwo),t=t.replace(/@ICON/g,"icon-"+r[this.paymentMethod.details.cardType]).replace(/@CLASSNAME/g," braintree-icon--bordered").replace(/@TITLE/g,e).replace(/@SUBTITLE/g,this.strings[this.paymentMethod.details.cardType]);break;case i.googlePay:t=t.replace(/@ICON/g,"logoGooglePay").replace(/@CLASSNAME/g,"").replace(/@TITLE/g,this.strings["Google Pay"]).replace(/@SUBTITLE/g,"");break;case i.paypal:t=t.replace(/@ICON/g,"logoPayPal").replace(/@CLASSNAME/g,"").replace(/@TITLE/g,this.paymentMethod.details.email).replace(/@SUBTITLE/g,this.strings.PayPal);break;case i.venmo:t=t.replace(/@ICON/g,"logoVenmo").replace(/@CLASSNAME/g,"").replace(/@TITLE/g,this.paymentMethod.details.username).replace(/@SUBTITLE/g,this.strings.Venmo)}this.element.innerHTML=t},i.prototype.setActive=function(e){setTimeout(function(){a.toggle(this.element,"braintree-method--active",e)}.bind(this),0)},t.exports=i},{"../constants":105,"../lib/add-selection-event-handler":109,"../lib/classlist":114,"./base-view":154}],157:[function(e,t,r){"use strict";function i(){n.apply(this,arguments),this._initialize()}var n=e("./base-view"),a=e("./payment-method-view"),o=e("../lib/dropin-error"),s=e("../lib/classlist"),l=e("../constants").errors,d=e("../lib/promise"),c={CreditCard:"Card",PayPalAccount:"PayPal",ApplePayCard:"Apple Pay",AndroidPayCard:"Google Pay",VenmoAccount:"Venmo"};i.prototype=Object.create(n.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID="methods",i.prototype._initialize=function(){var e,t=this.model.getPaymentMethods();for(this.views=[],this.container=this.getElementById("methods-container"),this._headingLabel=this.getElementById("methods-label"),this.model.on("addPaymentMethod",this._addPaymentMethod.bind(this)),this.model.on("removePaymentMethod",this._removePaymentMethod.bind(this)),this.model.on("changeActivePaymentMethod",this._changeActivePaymentMethodView.bind(this)),e=t.length-1;e>=0;e--)this._addPaymentMethod(t[e])},i.prototype.removeActivePaymentMethod=function(){this.activeMethodView&&(this.activeMethodView.setActive(!1),this.activeMethodView=null,s.add(this._headingLabel,"braintree-no-payment-method-selected"))},i.prototype._getPaymentMethodString=function(){var e=c[this.activeMethodView.paymentMethod.type],t=this.strings[e];return this.strings.payingWith.replace("{{paymentSource}}",t)},i.prototype._addPaymentMethod=function(e){var t=new a({model:this.model,paymentMethod:e,strings:this.strings});this.model.isGuestCheckout&&this.container.firstChild&&(this.container.removeChild(this.container.firstChild),this.views.pop()),this.container.firstChild?this.container.insertBefore(t.element,this.container.firstChild):this.container.appendChild(t.element),this.views.push(t)},i.prototype._removePaymentMethod=function(e){var t;for(t=0;t<this.views.length;t++)if(this.views[t].paymentMethod===e){this.container.removeChild(this.views[t].element),this._headingLabel.innerHTML="&nbsp;",this.views.splice(t,1);break}},i.prototype._changeActivePaymentMethodView=function(e){var t,r=this.activeMethodView;for(t=0;t<this.views.length;t++)if(this.views[t].paymentMethod===e){this.activeMethodView=this.views[t],this._headingLabel.innerHTML=this._getPaymentMethodString();break}r&&r.setActive(!1),this.activeMethodView.setActive(!0),s.remove(this._headingLabel,"braintree-no-payment-method-selected")},i.prototype.requestPaymentMethod=function(){return this.activeMethodView?d.resolve(this.activeMethodView.paymentMethod):d.reject(new o(l.NO_PAYMENT_METHOD_ERROR))},t.exports=i},{"../constants":105,"../lib/classlist":114,"../lib/dropin-error":116,"../lib/promise":124,"./base-view":154,"./payment-method-view":156}],158:[function(e,t,r){"use strict";function i(){o.apply(this,arguments),this._initialize()}var n=e("../lib/analytics"),a=e("../lib/add-selection-event-handler"),o=e("./base-view"),s=e("../constants").paymentOptionIDs,l='<div class="braintree-option__logo">\n  <svg width="48" height="29" class="@CLASSNAME">\n    <use xlink:href="#@ICON"></use>\n  </svg>\n</div>\n\n<div class="braintree-option__label" aria-label="@OPTION_LABEL">\n  @OPTION_TITLE\n  <div class="braintree-option__disabled-message"></div>\n</div>\n';i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID="options",i.prototype._initialize=function(){this.container=this.getElementById("payment-options-container"),this.elements={},this.model.supportedPaymentOptions.forEach(function(e){this._addPaymentOption(e)}.bind(this))},i.prototype._addPaymentOption=function(e){var t,r=document.createElement("div"),i=l,o=function(){this.mainView.setPrimaryView(e),this.model.selectPaymentOption(e),n.sendEvent(this.client,"selected."+s[e])}.bind(this);switch(r.className="braintree-option braintree-option__"+e,r.setAttribute("tabindex","0"),e){case s.applePay:t=this.strings["Apple Pay"],i=i.replace(/@ICON/g,"logoApplePay");break;case s.card:t=this.strings.Card,i=i.replace(/@ICON/g,"iconCardFront"),i=i.replace(/@CLASSNAME/g,"braintree-icon--bordered");break;case s.googlePay:t=this.strings["Google Pay"],i=i.replace(/@ICON/g,"logoGooglePay");break;case s.paypal:t=this.strings.PayPal,i=i.replace(/@ICON/g,"logoPayPal");break;case s.paypalCredit:t=this.strings["PayPal Credit"],i=i.replace(/@ICON/g,"logoPayPalCredit");break;case s.venmo:t=this.strings.Venmo,i=i.replace(/@ICON/g,"logoVenmo")}i=i.replace(/@OPTION_LABEL/g,this._generateOptionLabel(t)),i=i.replace(/@OPTION_TITLE/g,t),i=i.replace(/@CLASSNAME/g,""),r.innerHTML=i,a(r,o),this.container.appendChild(r),this.elements[e]={div:r,clickHandler:o}},i.prototype._generateOptionLabel=function(e){return this.strings.payingWith.replace("{{paymentSource}}",e)},t.exports=i},{"../constants":105,"../lib/add-selection-event-handler":109,"../lib/analytics":110,"./base-view":154}],159:[function(e,t,r){(function(r){"use strict";function i(){a.apply(this,arguments)}var n=e("../../lib/assign").assign,a=e("../base-view"),o=e("braintree-web/apple-pay"),s=e("../../lib/dropin-error"),l=e("../../lib/is-https"),d=e("../../lib/promise"),c=e("../../constants").paymentOptionIDs;i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID=c.applePay,i.prototype.initialize=function(){var e=this;return e.applePayConfiguration=n({},e.model.merchantConfiguration.applePay),e.model.asyncDependencyStarting(),o.create({client:this.client}).then(function(t){var i=e.getElementById("apple-pay-button");e.applePayInstance=t,e.model.on("changeActivePaymentView",function(t){t===e.ID&&r.ApplePaySession.canMakePaymentsWithActiveCard(e.applePayInstance.merchantIdentifier).then(function(t){t||e.model.reportError("applePayActiveCardError")})}),i.onclick=e._showPaymentSheet.bind(e),i.classList.add("apple-pay-button-"+(e.model.merchantConfiguration.applePay.buttonStyle||"black")),e.model.asyncDependencyReady()}).catch(function(t){e.model.asyncDependencyFailed({view:e.ID,error:new s(t)})})},i.prototype._showPaymentSheet=function(){var e=this,t=e.applePayInstance.createPaymentRequest(this.applePayConfiguration.paymentRequest),i=new r.ApplePaySession(2,t);return i.onvalidatemerchant=function(t){e.applePayInstance.performValidation({validationURL:t.validationURL,displayName:e.applePayConfiguration.displayName}).then(function(e){i.completeMerchantValidation(e)}).catch(function(t){e.model.reportError(t),i.abort()})},i.onpaymentauthorized=function(t){e.applePayInstance.tokenize({token:t.payment.token}).then(function(n){i.completePayment(r.ApplePaySession.STATUS_SUCCESS),n.payment=t.payment,e.model.addPaymentMethod(n)}).catch(function(t){e.model.reportError(t),i.completePayment(r.ApplePaySession.STATUS_FAILURE)})},i.begin(),!1},i.prototype.updateConfiguration=function(e,t){this.applePayConfiguration[e]=t},i.isEnabled=function(e){var t,i=e.client.getConfiguration().gatewayConfiguration,n=i.applePayWeb&&Boolean(e.merchantConfiguration.applePay);return n?(t=r.ApplePaySession&&l.isHTTPS(),t?d.resolve(Boolean(r.ApplePaySession.canMakePayments())):d.resolve(!1)):d.resolve(!1)},t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../constants":105,"../../lib/assign":112,"../../lib/dropin-error":116,"../../lib/is-https":120,"../../lib/promise":124,"../base-view":154,"braintree-web/apple-pay":23}],160:[function(e,t,r){(function(r){"use strict";function i(){a.apply(this,arguments)}var n=e("../../lib/assign").assign,a=e("../base-view"),o=e("braintree-web/paypal-checkout"),s=e("../../lib/dropin-error"),l=e("../../lib/promise"),d=3e4,c=["offerCredit","locale"];i.prototype=Object.create(a.prototype),i.prototype.initialize=function(){function e(e){a?l.model.reportError(e):(l.model.asyncDependencyFailed({view:l.ID,error:e}),clearTimeout(t))}var t,i=Boolean(this._isPayPalCredit),a=!1,l=this,c=i?"paypalCredit":"paypal",p=this.model.merchantConfiguration[c];return this.paypalConfiguration=n({},p),this.model.asyncDependencyStarting(),t=setTimeout(function(){l.model.asyncDependencyFailed({view:l.ID,error:new s("There was an error connecting to PayPal.")})},d),o.create({client:this.client}).then(function(n){var o,s='[data-braintree-id="paypal-button"]',d="production"===l.client.getConfiguration().gatewayConfiguration.environment?"production":"sandbox",c=l.model.merchantConfiguration.locale;return l.paypalInstance=n,l.paypalConfiguration.offerCredit=Boolean(i),o={env:d,style:l.paypalConfiguration.buttonStyle||{},commit:l.paypalConfiguration.commit,locale:c,payment:function(){return n.createPayment(l.paypalConfiguration).catch(e)},onAuthorize:function(t){return n.tokenizePayment(t).then(function(e){"vault"!==l.paypalConfiguration.flow||l.model.isGuestCheckout||(e.vaulted=!0),l.model.addPaymentMethod(e)}).catch(e)},onError:e},c&&(l.paypalConfiguration.locale=c),i&&(s='[data-braintree-id="paypal-credit-button"]',o.style.label="credit"),r.paypal.Button.render(o,s).then(function(){l.model.asyncDependencyReady(),a=!0,clearTimeout(t)})}).catch(e)},i.prototype.updateConfiguration=function(e,t){c.indexOf(e)===-1&&(this.paypalConfiguration[e]=t)},i.isEnabled=function(e){var t=e.client.getConfiguration().gatewayConfiguration;return l.resolve(t.paypalEnabled)},t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/assign":112,"../../lib/dropin-error":116,"../../lib/promise":124,"../base-view":154,"braintree-web/paypal-checkout":86}],161:[function(e,t,r){"use strict";function i(){h.apply(this,arguments)}function n(e){return e.id.indexOf("braintree__card-view-input")!==-1}function a(e){return e.isEmpty&&o()}function o(){var e=document.activeElement&&document.activeElement.id,t=document.activeElement instanceof HTMLIFrameElement&&e.indexOf("braintree-hosted-field")!==-1;return t||n(document.activeElement)}function s(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function l(e){return e[0].toUpperCase()+e.substr(1)}function d(e){Object.keys(e).forEach(function(t){var r=s(t);e[r]=e[t]})}function c(e){var t=b()?"•":"*";return Array(e+1).join(t)}function p(){var e=c(4);return[e,e,e,e].join(" ")}var u=e("../../lib/assign").assign,h=e("../base-view"),y=e("../../lib/classlist"),m=e("../../constants"),f=e("../../lib/dropin-error"),v=e("braintree-web/hosted-fields"),b=e("../../lib/is-utf-8"),g=e("../../lib/transition-helper"),E=e("../../lib/promise"),_='<div data-braintree-id="visa-card-icon" class="braintree-sheet__card-icon">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-visa"></use>\n    </svg>\n</div>\n<div data-braintree-id="master-card-card-icon" class="braintree-sheet__card-icon">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-master-card"></use>\n    </svg>\n</div>\n<div data-braintree-id="unionpay-card-icon" class="braintree-sheet__card-icon braintree-hidden">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-unionpay"></use>\n    </svg>\n</div>\n<div data-braintree-id="american-express-card-icon" class="braintree-sheet__card-icon">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-american-express"></use>\n    </svg>\n</div>\n<div data-braintree-id="jcb-card-icon" class="braintree-sheet__card-icon">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-jcb"></use>\n    </svg>\n</div>\n<!-- Remove braintree-hidden class when supportedCardType accurately indicates Diners Club support -->\n<div data-braintree-id="diners-club-card-icon" class="braintree-sheet__card-icon braintree-hidden">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-diners-club"></use>\n    </svg>\n</div>\n<div data-braintree-id="discover-card-icon" class="braintree-sheet__card-icon">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-discover"></use>\n    </svg>\n</div>\n<div data-braintree-id="maestro-card-icon" class="braintree-sheet__card-icon">\n    <svg width="40" height="24">\n        <use xlink:href="#icon-maestro"></use>\n    </svg>\n</div>\n';i.prototype=Object.create(h.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID=m.paymentOptionIDs.card,i.prototype.initialize=function(){var e,t,r=this.getElementById("cardholder-name-field-group"),i=this.getElementById("card-view-icons"),n=this._generateHostedFieldsOptions();return i.innerHTML=_,this._hideUnsupportedCardIcons(),this.hasCVV=n.fields.cvv,this.hasCardholderName=Boolean(this.model.merchantConfiguration.card&&this.model.merchantConfiguration.card.cardholderName),this.cardholderNameInput=r.querySelector("input"),this.cardNumberIcon=this.getElementById("card-number-icon"),this.cardNumberIconSvg=this.getElementById("card-number-icon-svg"),this.cvvIcon=this.getElementById("cvv-icon"),this.cvvIconSvg=this.getElementById("cvv-icon-svg"),this.cvvLabelDescriptor=this.getElementById("cvv-label-descriptor"),this.fieldErrors={},this.extraInputs=[{fieldName:"cardholderName",enabled:this.hasCardholderName,required:this.hasCardholderName&&this.model.merchantConfiguration.card.cardholderName.required,requiredError:this.strings.fieldEmptyForCardholderName,validations:[{isValid:function(e){return e.length<256},error:this.strings.fieldTooLongForCardholderName}]}],this.hasCVV||(e=this.getElementById("cvv-field-group"),e.parentNode.removeChild(e)),n.fields.postalCode||(t=this.getElementById("postal-code-field-group"),t.parentNode.removeChild(t)),this.extraInputs.forEach(function(e){e.enabled?this._setupExtraInput(e):this._removeExtraInput(e)}.bind(this)),this.model.asyncDependencyStarting(),v.create(n).then(function(e){this.hostedFieldsInstance=e,this.hostedFieldsInstance.on("blur",this._onBlurEvent.bind(this)),this.hostedFieldsInstance.on("cardTypeChange",this._onCardTypeChangeEvent.bind(this)),this.hostedFieldsInstance.on("focus",this._onFocusEvent.bind(this)),this.hostedFieldsInstance.on("notEmpty",this._onNotEmptyEvent.bind(this)),this.hostedFieldsInstance.on("validityChange",this._onValidityChangeEvent.bind(this)),this.model.asyncDependencyReady()}.bind(this)).catch(function(e){this.model.asyncDependencyFailed({view:this.ID,error:e})}.bind(this))},i.prototype._setupExtraInput=function(e){var t=this,r=s(e.fieldName),i=this.getElementById(r+"-field-group"),n=i.querySelector("input"),a=i.querySelector(".braintree-form__hosted-field");n.addEventListener("keyup",function(){var r=t._validateExtraInput(e,!0);y.toggle(a,"braintree-form__field--valid",r),r&&t.hideFieldError(e.fieldName),t._sendRequestableEvent()},!1),e.required&&n.addEventListener("blur",function(){setTimeout(function(){o()&&t._validateExtraInput(e,!0)},0)},!1)},i.prototype._removeExtraInput=function(e){var t=this.getElementById(s(e.fieldName)+"-field-group");t.parentNode.removeChild(t)},i.prototype._sendRequestableEvent=function(){this._isTokenizing||this.model.setPaymentMethodRequestable({isRequestable:this._validateForm(),type:m.paymentMethodTypes.card})},i.prototype._generateHostedFieldsOptions=function(){var e=this.client.getConfiguration().gatewayConfiguration.challenges,t=e.indexOf("cvv")!==-1,r=e.indexOf("postal_code")!==-1,i=this.model.merchantConfiguration.card&&this.model.merchantConfiguration.card.overrides,n={client:this.client,fields:{number:{selector:this._generateFieldSelector("number"),placeholder:p()},expirationDate:{selector:this._generateFieldSelector("expiration"),placeholder:this.strings.expirationDatePlaceholder},cvv:{selector:this._generateFieldSelector("cvv"),placeholder:c(3)},postalCode:{selector:this._generateFieldSelector("postal-code")}},styles:{input:{"font-size":"16px","font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',color:"#000"},":focus":{color:"black"},"::-webkit-input-placeholder":{color:"#6a6a6a"},":-moz-placeholder":{color:"#6a6a6a"},"::-moz-placeholder":{color:"#6a6a6a"},":-ms-input-placeholder ":{color:"#6a6a6a"},"input::-ms-clear":{color:"transparent"}}};return t||delete n.fields.cvv,r||delete n.fields.postalCode,i?(i.fields&&(i.fields.cvv&&i.fields.cvv.placeholder&&(this._hasCustomCVVPlaceholder=!0),Object.keys(i.fields).forEach(function(e){return"cvv"!==e&&"postalCode"!==e||null!==i.fields[e]?void(n.fields[e]&&u(n.fields[e],i.fields[e],{selector:n.fields[e].selector})):void delete n.fields[e]})),i.styles&&Object.keys(i.styles).forEach(function(e){return null===i.styles[e]?void delete n.styles[e]:(d(i.styles[e]),n.styles[e]=n.styles[e]||{},void u(n.styles[e],i.styles[e]))}),n):n},i.prototype._validateForm=function(e){var t,r,i,n=!0,a=this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;return!!this.hostedFieldsInstance&&(i=this.hostedFieldsInstance.getState(),Object.keys(i.fields).forEach(function(t){var r=i.fields[t];(e||n)&&(r.isEmpty?(n=!1,e&&this.showFieldError(t,this.strings["fieldEmptyFor"+l(t)])):r.isValid||(n=!1,e&&this.showFieldError(t,this.strings["fieldInvalidFor"+l(t)])))}.bind(this)),i.fields.number.isValid&&(t=m.configurationCardTypes[i.cards[0].type],r=a.indexOf(t)!==-1,r||(n=!1,e&&this.showFieldError("number",this.strings.unsupportedCardTypeError))),this.extraInputs&&this.extraInputs.forEach(function(t){var r;t.enabled&&(r=this._validateExtraInput(t,e),n=n&&r)}.bind(this)),n)},i.prototype._validateExtraInput=function(e,t){var r=s(e.fieldName),i=this.getElementById(r+"-field-group"),n=i.querySelector("input"),a=!0;return e.required&&(a=n.value.length>0,!a&&t&&this.showFieldError(e.fieldName,e.requiredError)),e.validations.forEach(function(r){var i=r.isValid(n.value);!i&&t&&this.showFieldError(e.fieldName,r.error),a=a&&i}.bind(this)),a},i.prototype.getPaymentMethod=function(){var e=this._validateForm();if(e)return{type:m.paymentMethodTypes.card}},i.prototype.tokenize=function(){var e,t=this,r=t.hostedFieldsInstance.getState(),i={vault:!t.model.isGuestCheckout};return this.model.clearError(),this._validateForm(!0)?(this.hasCardholderName&&(i.cardholderName=this.cardholderNameInput.value),t._isTokenizing=!0,t.hostedFieldsInstance.tokenize(i).then(function(i){return Object.keys(r.fields).forEach(function(e){t.hostedFieldsInstance.clear(e)}),t.model.isGuestCheckout||(i.vaulted=!0),new E(function(r){e=function(){setTimeout(function(){t.model.addPaymentMethod(i),r(i),y.remove(t.element,"braintree-sheet--tokenized")},0),t._isTokenizing=!1},g.onTransitionEnd(t.element,"max-height",e),setTimeout(function(){y.remove(t.element,"braintree-sheet--loading")},m.CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT),y.add(t.element,"braintree-sheet--tokenized")})}).catch(function(e){return t._isTokenizing=!1,t.model.reportError(e),y.remove(t.element,"braintree-sheet--loading"),E.reject(new f({message:m.errors.NO_PAYMENT_METHOD_ERROR,braintreeWebError:e}))})):(t.model.reportError("hostedFieldsFieldsInvalidError"),y.remove(t.element,"braintree-sheet--loading"),E.reject(new f(m.errors.NO_PAYMENT_METHOD_ERROR)))},i.prototype.showFieldError=function(e,t){var r,i=this.getElementById(s(e)+"-field-group"),a=i.querySelector("input");this.fieldErrors.hasOwnProperty(e)||(this.fieldErrors[e]=this.getElementById(s(e)+"-field-error")),y.add(i,"braintree-form__field-group--has-error"),r=this.fieldErrors[e],r.innerHTML=t,a&&n(a)?a.setAttribute("aria-invalid",!0):(this.hostedFieldsInstance.setAttribute({field:e,attribute:"aria-invalid",value:!0}),this.hostedFieldsInstance.setMessage({field:e,message:t}))},i.prototype.hideFieldError=function(e){var t=this.getElementById(s(e)+"-field-group"),r=t.querySelector("input");this.fieldErrors.hasOwnProperty(e)||(this.fieldErrors[e]=this.getElementById(s(e)+"-field-error")),y.remove(t,"braintree-form__field-group--has-error"),r&&n(r)?r.removeAttribute("aria-invalid"):(this.hostedFieldsInstance.removeAttribute({field:e,attribute:"aria-invalid"}),this.hostedFieldsInstance.setMessage({field:e,message:""}))},i.prototype.teardown=function(){return this.hostedFieldsInstance.teardown()},i.prototype._generateFieldSelector=function(e){return"#braintree--dropin__"+this.model.componentID+" .braintree-form-"+e},i.prototype._onBlurEvent=function(e){var t=e.fields[e.emittedBy],r=this.getElementById(s(e.emittedBy)+"-field-group");y.remove(r,"braintree-form__field-group--is-focused"),a(t)?this.showFieldError(e.emittedBy,this.strings["fieldEmptyFor"+l(e.emittedBy)]):t.isEmpty||t.isValid?"number"!==e.emittedBy||this._isCardTypeSupported(e.cards[0].type)||this.showFieldError("number",this.strings.unsupportedCardTypeError):this.showFieldError(e.emittedBy,this.strings["fieldInvalidFor"+l(e.emittedBy)]),setTimeout(function(){a(t)&&this.showFieldError(e.emittedBy,this.strings["fieldEmptyFor"+l(e.emittedBy)])}.bind(this),150)},i.prototype._onCardTypeChangeEvent=function(e){var t,r="#iconCardFront",i="#iconCVVBack",n=this.strings.cvvThreeDigitLabelSubheading,a=c(3),o=this.getElementById("number-field-group");1===e.cards.length?(t=e.cards[0].type,r="#icon-"+t,"american-express"===t&&(i="#iconCVVFront",n=this.strings.cvvFourDigitLabelSubheading,a=c(4)),y.add(o,"braintree-form__field-group--card-type-known")):y.remove(o,"braintree-form__field-group--card-type-known"),this.cardNumberIconSvg.setAttribute("xlink:href",r),this.hasCVV&&(this.cvvIconSvg.setAttribute("xlink:href",i),this.cvvLabelDescriptor.innerHTML=n,this._hasCustomCVVPlaceholder||this.hostedFieldsInstance.setAttribute({field:"cvv",attribute:"placeholder",value:a}))},i.prototype._onFocusEvent=function(e){var t=this.getElementById(s(e.emittedBy)+"-field-group");y.add(t,"braintree-form__field-group--is-focused")},i.prototype._onNotEmptyEvent=function(e){this.hideFieldError(e.emittedBy)},i.prototype._onValidityChangeEvent=function(e){var t,r=e.fields[e.emittedBy];t="number"===e.emittedBy&&e.cards[0]?r.isValid&&this._isCardTypeSupported(e.cards[0].type):r.isValid,y.toggle(r.container,"braintree-form__field--valid",t),r.isPotentiallyValid&&this.hideFieldError(e.emittedBy),this._sendRequestableEvent()},i.prototype.requestPaymentMethod=function(){return y.add(this.element,"braintree-sheet--loading"),this.tokenize()},i.prototype.onSelection=function(){this.hostedFieldsInstance&&(this.hasCardholderName?setTimeout(function(){this.cardholderNameInput.focus()}.bind(this),1):this.hostedFieldsInstance.focus("number"))},i.prototype._hideUnsupportedCardIcons=function(){var e=this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;Object.keys(m.configurationCardTypes).forEach(function(t){var r,i=m.configurationCardTypes[t];e.indexOf(i)===-1&&(r=this.getElementById(t+"-card-icon"),y.add(r,"braintree-hidden"))}.bind(this))},i.prototype._isCardTypeSupported=function(e){var t=m.configurationCardTypes[e],r=this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;return r.indexOf(t)!==-1},i.isEnabled=function(e){var t=e.client.getConfiguration().gatewayConfiguration;return E.resolve(t.creditCards.supportedCardTypes.length>0)},t.exports=i},{"../../constants":105,"../../lib/assign":112,"../../lib/classlist":114,"../../lib/dropin-error":116,"../../lib/is-utf-8":121,"../../lib/promise":124,"../../lib/transition-helper":128,"../base-view":154,"braintree-web/hosted-fields":50}],162:[function(e,t,r){(function(r){"use strict";function i(){o.apply(this,arguments)}function n(e){return new r.google.payments.api.PaymentsClient({environment:"production"===e.getConfiguration().gatewayConfiguration.environment?"PRODUCTION":"TEST"})}var a=e("../../lib/assign").assign,o=e("../base-view"),s=e("braintree-web/google-payment"),l=e("../../lib/dropin-error"),d=e("../../constants"),c=e("../../lib/assets"),p=e("../../lib/classlist"),u=e("../../lib/promise"),h=e("../../lib/analytics");i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID=d.paymentOptionIDs.googlePay,i.prototype.initialize=function(){var e=this;return e.googlePayConfiguration=a({},e.model.merchantConfiguration.googlePay),e.model.asyncDependencyStarting(),s.create({client:e.client}).then(function(t){e.googlePayInstance=t,e.paymentsClient=n(e.client)}).then(function(){var t=e.getElementById("google-pay-button");t.addEventListener("click",function(t){t.preventDefault(),p.add(e.element,"braintree-sheet--loading"),e.tokenize().then(function(){p.remove(e.element,"braintree-sheet--loading")})}),e.model.asyncDependencyReady()}).catch(function(t){e.model.asyncDependencyFailed({view:e.ID,error:new l(t)})})},i.prototype.tokenize=function(){var e,t=this,r=t.googlePayInstance.createPaymentDataRequest(t.googlePayConfiguration);return t.paymentsClient.loadPaymentData(r).then(function(r){return e=r,t.googlePayInstance.parseResponse(r)}).then(function(r){r.rawPaymentData=e,t.model.addPaymentMethod(r)}).catch(function(e){var r=e;if("DEVELOPER_ERROR"===e.statusCode)console.error(e),r="developerError";else{if("CANCELED"===e.statusCode)return void h.sendEvent(t.client,"googlepay.loadPaymentData.canceled");e.statusCode&&h.sendEvent(t.client,"googlepay.loadPaymentData.failed")}t.model.reportError(r)})},i.prototype.updateConfiguration=function(e,t){this.googlePayConfiguration[e]=t},i.isEnabled=function(e){var t=e.client.getConfiguration().gatewayConfiguration;return t.androidPay&&Boolean(e.merchantConfiguration.googlePay)?u.resolve().then(function(){return r.google?u.resolve():c.loadScript(r.document.head,{id:d.GOOGLE_PAYMENT_SCRIPT_ID,src:d.GOOGLE_PAYMENT_SOURCE})}).then(function(){var t=n(e.client);return t.isReadyToPay({allowedPaymentMethods:["CARD","TOKENIZED_CARD"]})}).then(function(e){return Boolean(e.result)}):u.resolve(!1)},t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../constants":105,"../../lib/analytics":110,"../../lib/assets":111,"../../lib/assign":112,"../../lib/classlist":114,"../../lib/dropin-error":116,"../../lib/promise":124,"../base-view":154,"braintree-web/google-payment":45}],163:[function(e,t,r){"use strict";var i=e("../../constants").paymentOptionIDs,n={};n[i.applePay]=e("./apple-pay-view"),n[i.card]=e("./card-view"),n[i.googlePay]=e("./google-pay-view"),n[i.paypal]=e("./paypal-view"),n[i.paypalCredit]=e("./paypal-credit-view"),n[i.venmo]=e("./venmo-view"),t.exports=n},{"../../constants":105,"./apple-pay-view":159,"./card-view":161,"./google-pay-view":162,"./paypal-credit-view":164,"./paypal-view":165,"./venmo-view":166}],164:[function(e,t,r){"use strict";function i(){a.apply(this,arguments),this._isPayPalCredit=!0}var n=e("../../constants").paymentOptionIDs,a=e("./base-paypal-view");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID=n.paypalCredit,i.isEnabled=function(e){return a.isEnabled(e).then(function(t){return t&&Boolean(e.merchantConfiguration.paypalCredit)})},t.exports=i},{"../../constants":105,"./base-paypal-view":160}],165:[function(e,t,r){"use strict";function i(){a.apply(this,arguments)}var n=e("../../constants").paymentOptionIDs,a=e("./base-paypal-view");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID=n.paypal,i.isEnabled=function(e){return a.isEnabled(e).then(function(t){return t&&Boolean(e.merchantConfiguration.paypal)})},t.exports=i},{"../../constants":105,"./base-paypal-view":160}],166:[function(e,t,r){"use strict";function i(){a.apply(this,arguments)}var n=e("../../lib/assign").assign,a=e("../base-view"),o=e("braintree-web/venmo"),s=e("../../lib/classlist"),l=e("../../lib/dropin-error"),d=e("../../lib/promise"),c=e("../../constants").paymentOptionIDs;i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.ID=i.prototype.ID=c.venmo,i.prototype.initialize=function(){var e=this,t=n({},e.model.merchantConfiguration.venmo,{client:this.client});return e.model.asyncDependencyStarting(),o.create(t).then(function(t){return e.venmoInstance=t,e.venmoInstance.hasTokenizationResult()?e.venmoInstance.tokenize().then(function(t){e.model.reportAppSwitchPayload(t)}).catch(function(t){e._isIgnorableError(t)||e.model.reportAppSwitchError(c.venmo,t)}):d.resolve()}).then(function(){var t=e.getElementById("venmo-button");t.addEventListener("click",function(t){return t.preventDefault(),s.add(e.element,"braintree-sheet--loading"),e.venmoInstance.tokenize().then(function(t){e.model.addPaymentMethod(t)}).catch(function(t){e._isIgnorableError(t)||e.model.reportError(t)}).then(function(){s.remove(e.element,"braintree-sheet--loading")})}),e.model.asyncDependencyReady()}).catch(function(t){e.model.asyncDependencyFailed({view:e.ID,error:new l(t)})})},i.prototype._isIgnorableError=function(e){return"VENMO_APP_CANCELED"===e.code},i.isEnabled=function(e){var t=e.client.getConfiguration().gatewayConfiguration,r=t.payWithVenmo&&Boolean(e.merchantConfiguration.venmo);return r?d.resolve(o.isBrowserSupported(e.merchantConfiguration.venmo)):d.resolve(!1)},t.exports=i},{"../../constants":105,"../../lib/assign":112,"../../lib/classlist":114,"../../lib/dropin-error":116,"../../lib/promise":124,"../base-view":154,"braintree-web/venmo":94}]},{},[108])(108)});
var functions={};$(function(){var lower=/[a-z]/;var upper=/[A-Z]/;var special=/[!@#\$%\^\&*\)\(+=._-]/;var numeric=/[0-9]/;functions.getBaseScore=function(value){var score=0;if(lower.test(value)){score++;}
if(upper.test(value)){score++;}
if(special.test(value)){score++;}
if(numeric.test(value)){score++;}
if(score==1){score=0;}
return score;};functions.updateIndicator=function($indicator,value,min,max,target){$indicator.removeClass('too-short too-long weak strong very-strong');var pass_selector=$('.pass-strength-popup');pass_selector.removeClass('too-short too-long weak strong very-strong');if(!value){pass_selector.find('.strength').text('Too Short').hide();pass_selector.find('.strength').text('Too Long').hide();pass_selector.removeClass('weak');pass_selector.removeClass('strong');return;}
var length=value.trim().length;if(length<min){$indicator.addClass('too-short');pass_selector.addClass('too-short');pass_selector.find('.strength').text('Too Short').show();pass_selector.removeClass('weak');pass_selector.removeClass('strong');return;}
if(length>max){$indicator.addClass('too-long');pass_selector.addClass('too-long');pass_selector.find('.strength').text('Too Long').show();pass_selector.removeClass('weak');pass_selector.removeClass('strong');pass_selector.addClass('too-long');$(".pass-strength-popup").css("display","block");return;}
var score=functions.getBaseScore(value,min,max);if(score!=0){score+=Math.floor((length-min)/2);}
var diff=score-target;if(diff<0){$indicator.addClass('weak');pass_selector.addClass('weak');pass_selector.removeClass('strong');pass_selector.find('.strength').text('Weak').show();}else if(diff>=0&&diff<=2){$indicator.addClass('strong');pass_selector.addClass('strong');pass_selector.removeClass('weak');pass_selector.find('.strength').text('Strong').show();}else if(diff>2){$indicator.addClass('very-strong');pass_selector.removeClass('weak');pass_selector.addClass('strong');pass_selector.find('.strength').text('Strong').show();}};$('.password-strength-indicator').each(function(){if(!$('.pass-hint').length){var $indicator=$(this);var $group=$indicator.closest('.input-group');var $input=$group.find('input');var data=$indicator.data();var min=data.min;var max=data.max;var strength=data.strength;functions.updateIndicator($indicator,$input.val(),min,max,strength);$input.on('input change',function(){functions.updateIndicator($indicator,$input.val(),min,max,strength);});}});$('.password-eye-icon').each(function(){var $eye=$(this);var $group=$eye.closest('.input-group');var $input=$group.find('input');$eye.toggleClass('hidden',!$input.val());$input.on('input',function(){$eye.toggleClass('hidden',!$input.val());});$eye.click(function(){$eye.toggleClass('icon-eye-blocked');if($eye.hasClass('icon-eye-blocked')){$eye.removeClass('icon-eye');$input.attr('type','text');}else{$eye.addClass('icon-eye');$input.attr('type','password');}});});if($(".checkoutDropZone").length>0){$(".item__removal__popup__text").addClass("item__removal__cart__text");$(".item__removal__cart__text").removeClass("item__removal__popup__text");if($(".item__removal__cart__text").length>0){$(".item__removal__cart__text").clone().prependTo($(".checkoutDropZone").closest(".row").parent());$(".item__removal__cart__text").last().remove();}}
setTimeout(function(){$(".item__removal__popup__text").fadeOut("slow");},4000);});$(document).ready(function(){$(".js__mail_verification_widget input").on("keyup",function(){if($(this).val().trim().length>0){$(this).closest("form").find(".form-btn").addClass("blue-subb-btn");$(this).closest("form").find(".form-btn").prop('disabled',false);}else{$(this).closest("form").find(".form-btn").removeClass("blue-subb-btn");$(this).closest("form").find(".form-btn").prop('disabled',true);}});$(".raa-modal-dialog .raa-modal-dialog-cncl").on("click",function(e){e.preventDefault();$(this).closest(".raa-modal-dialog").hide();});$(".raa-modal-dialog.enabled").show();var lower=/[a-z]/;var upper=/[A-Z]/;var special=/[!@#\$%\^\&*\)\(+=._-]/;var numeric=/[0-9]/;if($('.pass-hint')){$('.pass-hint').on('keyup input focus change',function(){var pswd=$(this).val();var $indicator=$('.pass-hint').siblings('.password-strength-indicator');var pswd_req=$indicator.data('strength');var pswd_length=$indicator.data('min');var pswd_max=$indicator.data('max');if(!pswd_req){pswd_req=3;}
var list_items_strength2='<ul>'+'<li id="letter" class="invalid"><span>Lower</span></li>'+'<li id="capital" class="invalid"><span>Upper case</span></li>'+'<li id="special" class="invalid"><span>Special character</span></li>'+'<li id="number" class="invalid"><span>Digit</span></li>'+'</ul><span class="strength">Too short</span>';if(pswd_req==2){var validator='<div id="pswd_info" class="pass-strength-popup js__pswd_info strength-two">'+'<h4 id="length">Your password must have: '+pswd_length+' characters or more</h4>'+
list_items_strength2+'</div>';}
else if(pswd_req==3){var validator='<div id="pswd_info" class="pass-strength-popup js__pswd_info strength-three">'+'<h4 id="length">Your password must have: '+pswd_length+' characters or more and contain '+pswd_req+' of the following:</h4>'+
list_items_strength2+'</div>';}else{var validator='<div id="pswd_info" class="pass-strength-popup js__pswd_info strength-four">'+'<h4 id="length">Your password must have: '+pswd_length+' characters or more</h4>'+
list_items_strength2+'</div>';}
if(!$('.js__pswd_info').length){$(this).closest(".input-group").append(validator);}
functions.updateIndicator($indicator,pswd,pswd_length,pswd_max,pswd_req);if(pswd.match(lower)){$('#letter').addClass('valid');}else{$('#letter').removeClass('valid');}
if(pswd.match(upper)){$('#capital').addClass('valid');}else{$('#capital').removeClass('valid');}
if(pswd.match(special)){$('#special').addClass('valid');}else{$('#special').removeClass('valid');}
if(pswd.match(numeric)){$('#number').addClass('valid');}else{$('#number').removeClass('valid');}
if($('.js__pswd_info').length&&$('.js__pswd_info .valid').length>=pswd_req&&pswd.length<=pswd_max&&pswd.length>=pswd_length)
$('.js__pswd_info').fadeOut('slow');else
$('.js__pswd_info').fadeIn('slow');}).blur(function(){$('.js__pswd_info').fadeOut('fast');});}
var $drawer=$('.emails-wrappers,.phones-wrappers');$drawer.on('click','.make-primary,.remove',function(e){$(".js__profileForm input[type='submit']").prop("disabled",false);e.preventDefault();});$(document).on("keypress change",".js__profileForm input, .js__profileForm select",function(e){if($(this).val()){$(".js__profileForm input[type='submit']").prop("disabled",false);}else{$(".js__profileForm input[type='submit']").prop("disabled",true);}});function guestEmail(email){var emailForm=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;return emailForm.test(email);}
$("#email").on('keyup change',function(){if(guestEmail($("#email").val())&&$("#taggedNoGuest").val()=="true"){$(".checkoutMethod input.primary").removeAttr("disabled");}
else{$(".checkoutMethod input.primary").attr("disabled","true");}})});(function($){function visible(element){return $.expr.filters.visible(element)&&!$(element).parents().addBack().filter(function(){return $.css(this,'visibility')==='hidden';}).length;}
function focusable(element,isTabIndexNotNaN){var map,mapName,img,nodeName=element.nodeName.toLowerCase();if('area'===nodeName){map=element.parentNode;mapName=map.name;if(!element.href||!mapName||map.nodeName.toLowerCase()!=='map'){return false;}
img=$('img[usemap=#'+mapName+']')[0];return!!img&&visible(img);}
return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:'a'===nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element);}
$.extend($.expr[':'],{focusable:function(element){return focusable(element,!isNaN($.attr(element,'tabindex')));}});})(jQuery);
$(function(){var $confirmation=$('.registration-confirmation');$confirmation.on('click','.resend',function(){event.preventDefault();$.ajax({method:'get',url:$(this).attr('href')+'&ajaxRequest=true',xhrFields:{withCredentials:true}}).then(function(){$confirmation.html('A link has been resent to your email');}).fail(function(){$confirmation.html('An error has occurred');});});var $popup=$('.societyID-popup');$popup.delay(5000).hide(0);$popup.on('click','.close',function(){$popup.addClass('hidden');});});
$(function(){$('.login-form').each(function(){var $form=$(this);var $login=$form.find('.login');var $pass=$form.find('.password');var $submit=$form.find('.submit');$form.on('click','.resend',function(event){event.preventDefault();$.ajax({method:'get',url:$(this).attr('href')+'&ajaxRequest=true',xhrFields:{withCredentials:true}}).then(function(){$form.find('.message').html('A link has been resent to your email');}).fail(function(){$form.find('.message').html('An error has occurred');});});var change=function(){if(!$login.val()||!$pass.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$login.on('keyup input',change);$pass.on('keyup input',change);change();});});
$(function(){$('.request-username-form').each(function(){var $form=$(this);var $email=$form.find('.email');var $submit=$form.find('.submit');var change=function(){if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$email.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){var $popups=$('.popup');var $popup=$('.login-popup');var $login=$popup.find('.login');var $password=$popup.find('.password');var $eye=$popup.find('.password-eye-icon');var $remember=$popup.find('.remember .cmn-toggle');var $message=$popup.find('.message');var $submit=$popup.find('.submit');var items=$popup.find('a, button, input');var lastItem,revers=false,tabKey=9,shift=16,$close=$popup.find('.close');items.each(function(index){if(index===items.length-1){lastItem=$(this);}});$popup.on('keydown',function(e){if(e.keyCode===shift){revers=true;}
if((e.keyCode||e.which)===tabKey){if(!revers){tabEvent();}else{tabRevers();}}});$('.show-login').click(function(event){$popups.addClass('hidden');$popup.removeClass('hidden');$('body').addClass('noscroll');event.preventDefault();});$popup.on('click','.close',function(e){e.preventDefault();$('body').removeClass('noscroll');$popup.addClass('hidden');$eye.addClass('hidden icon-eye').removeClass('icon-eye-blocked');$submit.attr('disabled',true);$remember.attr('checked',false);$login.val('');$password.val('');$message.html('');});$popup.on('keyup',function(e){if(e.keyCode==27){$popup.find('.close').trigger("click");}
if(e.keyCode===shift){revers=false;}})
function tabEvent(){$close.off();lastItem.on('focusout',function(){$close.focus();});}
function tabRevers(){lastItem.off();$close.on('focusout',function(){lastItem.focus();});}});
$(function(){jcf.setOptions('Select',{"wrapNativeOnMobile":false});jcf.replace('.literatumProfileMainWidget .select select:not([multiple="multiple"])');if($(window).width()<992){var $select=$('select[multiple="multiple"]');$select.each(function(){var $this=$(this);var $taxonomy=$this.attr('id').split('.');var $taxonomyCode=$('[name="'+$taxonomy[0]+'.code"]');var $maxTags=$taxonomyCode.data('maxtags').split('.');$maxTags=$maxTags[0];$this.chosen({max_selected_options:$maxTags});});}});
$(function(){var pattern=/^([\w-+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;$('.loginInformation').each(function(){var $form=$(this);var $email=$form.find('.email');var $email2=$form.find('.email2');var change=function(){$(this).prevAll('.label').removeClass('error').find('.message').remove();};var blur=function(){var $email=$(this);if($email.val()&&!pattern.test($email.val())){var $label=$email.prevAll('.label');$label.addClass('error');var $message=$label.find('.message');if(!$message.length){$message=$('<span class="message"></span>').appendTo($label);}
$message.html('<span> - </span> Is Invalid')}};$email.on('blur',blur).on('change',change);$email2.on('blur',blur).on('change',change);});});
$(function(){var $popups=$('.popup');var $popup=$('.registration-popup');var $email=$popup.find('.email');var $submit=$popup.find('.submit');var items=$popup.find('a, button, input');var lastItem,revers=false,tabKey=9,shift=16,$close=$popup.find('.close');items.each(function(index){if(index===items.length-1){lastItem=$(this);}});$popup.on('keydown',function(e){if(e.keyCode===shift){revers=true;}
if((e.keyCode||e.which)===tabKey){if(!revers){tabEvent();}else{tabRevers();}}});$('.show-registration').click(function(event){$popups.addClass('hidden');$popup.removeClass('hidden');$popup.find('input[type="text"]').focus();event.preventDefault();});$popup.on('click','.close',function(e){e.preventDefault();$popup.addClass('hidden');$('body').removeClass('noscroll');});$popup.on('keyup',function(e){if(e.keyCode==27){$popup.find('.close').trigger("click");}
if(e.keyCode===shift){revers=false;}})
var pattern=/^([\w-+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;var change=function(event){var code=event.keyCode?event.keyCode:event.which;if(code==13){return;}
$email.prevAll('.label').removeClass('error').find('.message').remove();if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$submit.click(function(){if(!$email.val()){return false;}else if(!pattern.test($email.val())){var $label=$email.prevAll('.label');$label.addClass('error');var $message=$label.find('.message');if(!$message.length){$message=$('<span class="message"></span>').appendTo($label);}
$message.html('<span> - </span> Is Invalid')
return false;}});var blur=function(){if($email.val()&&!pattern.test($email.val())){var $label=$email.prevAll('.label');$label.addClass('error');var $message=$label.find('.message');if(!$message.length){$message=$('<span class="message"></span>').appendTo($label);}
$message.html('<span> - </span> Is Invalid')}};function tabEvent(){$close.off();lastItem.on('focusout',function(){$close.focus();});}
function tabRevers(){lastItem.off();$close.on('focusout',function(){lastItem.focus();});}
$email.on('keyup input',change);$email.on('blur',blur);});
$(function(){$('.request-reset-password-form').each(function(){var $form=$(this);var $email=$form.find('.email');var $submit=$form.find('.submit');var change=function(){if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$email.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){var $drawers=$('.top-drawer');var $drawer=$('.request-reset-password-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $email=$form.find('.email');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');var $message=$content.find('.message');var $recaptcha=$content.find('.g-recaptcha');var id;$('.show-request-reset-password').click(function(event){$drawers.addClass('hidden');$drawer.removeClass('hidden');$success.addClass('hidden');if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}
$original.removeClass('hidden');$content.slideDown('fast');$content.find(":focusable").first().focus();event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$message.html('');$email.val('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();$('.login-popup').find(":focusable").first().focus();});$drawer.on('keyup',function(e){if(e.keyCode==27){$drawer.find('.cancel').trigger("click");}});$form.submit(function(event){event.preventDefault();if(!$email.val()){return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'format',value:'json'});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}}else if(data.externalLink){window.location.replace(data.externalLink);}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){var $body=$('body');var $drawers=$('.top-drawer');var $drawer=$('.request-username-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $email=$form.find('.email');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');var $message=$content.find('.message');var $recaptcha=$content.find('.g-recaptcha');var id;$('.show-request-username').click(function(event){$drawers.addClass('hidden');$drawer.removeClass('hidden');$success.addClass('hidden');if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}
$original.removeClass('hidden');$content.slideDown('fast');$content.find(":focusable").first().focus();event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$message.html('');$email.val('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();$('.login-popup').find(":focusable").first().focus();});$drawer.on('keyup',function(e){if(e.keyCode==27){$drawer.find('.cancel').trigger("click");}});$email.on('keyup input',function(){if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}});$form.submit(function(event){event.preventDefault();if(!$email.val()){return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'ajaxRequest',value:true});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){$('.resetPasswordWidget').each(function(){var $form=$(this).find('form');var $password=$form.find('.password');var $submit=$form.find('.submit');var change=function(){var valid=true;$password.each(function(){if(!$password.val())
valid=false;});if(!valid){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$password.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){$('.claim-options li').each(function(){var $form=$(this).find('form');var $token=$form.find('.token');var $submit=$form.find('.submit');var change=function(){if(!$token.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$token.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){var $drawers=$('.top-drawer');var $drawer=$('.change-password-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $old=$form.find('.old');var $new=$form.find('.new');var $message=$form.find('.message');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');var $indicator=$content.find('.password-strength-indicator');var $eye=$content.find('.password-eye-icon');$('.show-change-password').click(function(event){$drawers.addClass('hidden');$drawer.removeClass('hidden');$success.addClass('hidden');$original.removeClass('hidden');$content.slideDown('fast');$content.find("input:focusable").first().focus();event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$old.attr('type','password').val('');$new.attr('type','password').val('');$indicator.removeClass('too-short too-long weak medium strong very-strong');$eye.addClass('hidden icon-eye').removeClass('icon-eye-blocked');$message.text('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();});var change=function(){if(!$old.val()||!$new.val()||$indicator.is('.too-short, .too-long, .weak')){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$old.on('keyup input',change);$new.on('keyup input',change);$form.submit(function(event){event.preventDefault();if(!$old.val()||!$new.val()){return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'ajaxRequest',value:true});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){var $drawers=$('.top-drawer');var $drawer=$('.verify-phone-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $verificationCode=$form.find('.verificationCode');var $message=$form.find('.message');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');$('.show-verify-phone').click(function(event){var $link=$(this);var link=$link.attr('href')
$.ajax(link).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);}else{$drawer.removeClass('hidden');$success.addClass('hidden');$original.removeClass('hidden');$content.slideDown('fast');}});event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$verificationCode.attr('type','text').val('');$message.text('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();});var change=function(){if(!$verificationCode.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$verificationCode.on('keyup input',change);$form.submit(function(event){var reg=new RegExp('^[0-9]{6}$');event.preventDefault();if(!reg.test($verificationCode.val())){$original.removeClass('hidden');$success.addClass('hidden');$message.html('verification code must be 6 digits');return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'ajaxRequest',value:true});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){var start=1000;var $emails=$('.emails-wrappers');if(!$emails.length)return;var current=$emails.data().count;var max=$emails.data().max;var $drawers=$('.top-drawer');var $drawer=$('.emails-wrappers .verification-confirmation');var $content=$drawer.find('.content');var $success=$drawer.find('.success-template');var $failure=$drawer.find('.failure-template');var template=$emails.find('.template').html();$emails.on('click','.add',function(){if(current<max){$emails.append(template.replace(/INDEX/g,start++));current++;$emails.toggleClass('saturated',current>=max);}});$emails.on('click','.remove',function(){$(this).closest('.email').remove();current--;$emails.toggleClass('saturated',current>=max);});$emails.on('click','.make-primary',function(){var $old=$emails.find('.email.primary').find('.value');var $new=$(this).closest('.email').find('.value');var value=$new.val();$new.val($old.val());$old.val(value);});$emails.on('click','.resend-verification',function(event){event.preventDefault();$.ajax({method:'get',url:$(this).attr('href')+'&ajaxRequest=true',xhrFields:{withCredentials:true}}).then(function(data){var $clone;if(data.result){$clone=$failure.clone();$clone.find('.message').html(data.message);}else{$clone=$success.clone();}
$content.html($clone.html());$drawers.addClass('hidden');$drawer.removeClass('hidden');$content.slideDown('fast');});});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$drawer.addClass('hidden');event.preventDefault();});});
$(function(){var start=1000;var $phones=$('.phones-wrappers');if(!$phones.length)return;var current=$phones.data().count;var max=$phones.data().max;var template=$phones.find('.template').html();$phones.on('click','.add',function(){if(current<max){$phones.append(template.replace(/INDEX/g,start++));current++;$phones.toggleClass('saturated',current>=max);}});$phones.on('click','.remove',function(){$(this).closest('.phone').remove();current--;$phones.toggleClass('saturated',current>=max);});});
$(function(){$('.addresses').each(function(){var $widget=$(this);var $change=$widget.find('.switch-address');var $edit=$widget.find('.edit');var $addresses=$widget.find('.address');var clear=function(){$edit.find('.dynamic').val('');$edit.find('.error').removeClass('error');$edit.find('.state').attr('disabled',true);$edit.find('.state').closest('.input-group').addClass('hidden');$edit.find('.message').text('');};$change.change(function(){var uuid=$change.val();$edit.addClass('hidden');$addresses.addClass('hidden');clear();if(uuid){$addresses.filter('.'+uuid).removeClass('hidden');}else{$edit.removeClass('hidden');}});$widget.on('click','.edit-address',function(e){e.preventDefault();var $address=$(this).closest('.address');$address.find('[data-name]').each(function(){var $this=$(this);var $holder=$edit.find('#address\\.'+$this.data().name);var text=$this.text();if($holder.is('select')){console.log($holder.find('option').filter(function(){return $(this).val()==text||$(this).text()==text;}));$holder.find('option').removeAttr('selected').filter(function(){return $(this).val()==text||$(this).text()==text;}).prop('selected',true);}else{$holder.val(text);}});var country=$edit.find('.country').val();if(country){$edit.find('.state').addClass('hidden');var $states=$edit.find('.state.'+country);if($states.length){var state=$address.find('[data-name="state"]').text();$states.find('option').removeAttr('selected').filter(function(){return $(this).val()==state||$(this).text()==state;}).prop('selected',true);$states.removeAttr('disabled');$states.closest('.input-group').removeClass('hidden');$states.removeClass('hidden');}}
$address.addClass('hidden');$edit.removeClass('hidden');});$widget.on('change','.country',function(){var value=$(this).val();var $states=$edit.find('.state');$states.attr('disabled',true).val('');$states.addClass('hidden');var $current=$states.filter('.'+value);if($current.length){$current.find('option:eq(1)').prop('selected',true);$current.removeAttr('disabled');$current.removeClass('hidden');}
$states.closest('.input-group').toggleClass('hidden',!$current.length);});});});
$(function(){$('.social-email').each(function(){var $social=$(this);var $submit=$social.find('.submit');var change=function(){if($social.find('.required').filter(function(){return!$(this).val();}).length>0){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$social.find('.required').on('keyup input',change);change();});});
$(function(){var $section=$('.institutions');var $search=$section.find('.search');var toggle=function($link,value){$link.find('a').toggleClass('collapsed',!value);$link.next().toggleClass('hidden',value);};$search.keyup(function(){var text=$(this).val().toLowerCase();$section.find('.expand-link').each(function(){toggle($(this),!text);});$section.find('.institution').each(function(){var $institution=$(this);$institution.toggleClass('hidden',$institution.data().value.toLowerCase().indexOf(text)<0);});$section.find('.federation').each(function(){var $federation=$(this);$federation.toggleClass('hidden',!$federation.find('.institution:not(.hidden)').length);});});$section.on('click','.expand-link',function(event){var collapsed=$(this).next().hasClass("hidden");event.preventDefault();toggle($(this),!collapsed);});});
$(function(){$('.identityTokenWidget').each(function(){var $form=$(this).find('form');var $submit=$form.find('.submit');var $token=$form.find('.token');var change=function(){if(!$token.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$token.on('keyup input',change);change();});});
$(function(){var $purchase=$('.purchaseArea');$purchase.on('click','.expand-link',function(event){event.preventDefault();var $link=$(this);var $content=$link.nextAll('.content');$link.toggleClass('active');$content.toggleClass('hidden');});$('.save-for-later-link').click(function(){$(".save-for-later-link").hide();$(".saved-go-cart").show();});$('.add-article-to-cart').click(function(){$(".save-for-later-link").hide();});var $deepdyve=$purchase.find('.deep-dyve');if($deepdyve.length){var url='https://www.deepdyve.com/rental-link';var data=$deepdyve.data();if(data.affid&&data.issn&&data.doi){$.ajax({url:url,data:{docId:data.doi,fieldName:'journal_doi',journal:data.issn,affiliateId:data.affid,format:'jsonp'},dataType:'jsonp',jsonp:'callback'}).then(function(json){if(json.status==='ok'){$deepdyve.attr('href',json.url);$deepdyve.removeClass('hidden');}});}}});
$(function(){var $drawer=$('.society-id-status');var $content=$drawer.find('.content');$content.slideDown('fast');$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$drawer.addClass('hidden');event.preventDefault();});hideSocietyStatusDialog($drawer)});function hideSocietyStatusDialog($drawer){$drawer.delay(8000).hide(0);};var raa = {};

$(document).ready(function () {
    $(".show-request-reset-password").click(function () {
        if ($('.password-recaptcha-ajax').length)
            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: '/pb/widgets/CaptchaResponseHandler/'
            }).done(function (data) {
                $('.password-recaptcha-ajax').append(data)
            })
    });
    $(".show-request-username").click(function () {
        if ($('.username-recaptcha-ajax').length)
            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: '/pb/widgets/CaptchaResponseHandler/'
            }).done(function (data) {
                $('.username-recaptcha-ajax').append(data)
            })
    })
});raa.EntitlementsWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
};

raa.EntitlementsWidget.prototype = new literatum.Widget();

raa.EntitlementsWidget.id = 'eCommerceAccessEntitlementWidget';
raa.EntitlementsWidget.action = '/pb/widgets/raa/entitlements';

raa.EntitlementsWidget.prototype.reloadTab = function(tab) {
    var widget = this;
    var loading = new literatum.FullPageLoading().start();
    var $tabContent = this.find("#" + tab);
    var $form = $tabContent.find("form");
    var $query = $form.find("input[name='query']");
    var $sort = $form.find("select");
    literatum.widgets.render(widget, {}, {
        sort: $sort.val(),
        query: $query.val(),
        selectedTab: tab.replace('pane-', '')
    }, function () {
        loading.done();
        if (typeof jcf !== "undefined")
            jcf.replace($('.jcf[data-bind-change="sort"]'));
    }, function(html) {
        if($(html.trim()).hasClass("tab__pane")){
            $(html.trim()).each(function() {

                if ($(this).hasClass("tab__pane")) {
                    var find = $('<div>').append($(this)).html();
                    $tabContent.html(find);
                }
            });

        }
        else{
            var find= $(html.trim()).find(".tab__pane");
            $tabContent.html(find.html());
        }
        widget.registerListeners();
    });
};

raa.EntitlementsWidget.binders = {
    series: function(e, widget) {
        e.preventDefault();
        widget.find(".tab__nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        widget.find(".tab__pane").removeClass("active");
        var $tabContent = widget.find("#pane-series");
        if ($tabContent.children().length == 0) {
            widget.reloadTab('series');
        } else {
            $tabContent.find(".tab__pane").addClass("active");
        }
    },
    groups: function(e, widget) {
        e.preventDefault();
        widget.find(".tab__nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        widget.find(".tab__pane").removeClass("active");
        var $tabContent = widget.find("#pane-groups");
        if ($tabContent.children().length == 0) {
            widget.reloadTab('groups');
        } else {
            $tabContent.find(".tab__pane").addClass("active");
        }
    },
    items: function(e, widget) {
        e.preventDefault();
        widget.find(".tab__nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        widget.find(".tab__pane").removeClass("active");
        var $tabContent = widget.find("#pane-items");
        if ($tabContent.children().length == 0) {
            widget.reloadTab('items');
        } else {
            $tabContent.find(".tab__pane").addClass("active");
        }
    },
    submitSearch: function (e, widget) {
        e.preventDefault();
        widget.reloadTab($(e.target).closest(".tab__pane").attr("id"));
    },
    sort: function (e, widget) {
        if(e.type=='change') {
            widget.reloadTab(widget.find(".tab__pane:visible").attr("id"));
        }
    }
};

raa.EntitlementsWidget.prototype.registerListeners = function() {
    Object.getPrototypeOf(raa.EntitlementsWidget.prototype).registerListeners.call(this);
    var widget = this;
    this.find("input[name='query']").closest("form").submit(function(e){
        e.preventDefault();
        raa.EntitlementsWidget.binders.submitSearch(e, widget);
    });
};

raa.EntitlementsWidget.find = function() {
    var $result = $("*[data-widget-def='" + raa.EntitlementsWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + raa.EntitlementsWidget.id);
};

literatum.widgets.register(raa.EntitlementsWidget);

if(document.addEventListener){document.addEventListener("DOMContentLoaded",twoFactorAuthentication,false);}
else{document.onreadystatechange=twoFactorAuthentication;}
function twoFactorAuthentication(){if(document.getElementById('select-list-hidden')){var first=document.getElementById('container-all');var scrollableList=document.createElement("div");scrollableList.setAttribute('class','scrollableList');first.appendChild(scrollableList);var parent_node=document.querySelectorAll('.scrollableList');var selectOneOfTheOptions=document.createElement("div");selectOneOfTheOptions.setAttribute('id','selectOneOfTheOptions');parent_node[0].appendChild(selectOneOfTheOptions);var js__countries_select=document.createElement("ul");js__countries_select.setAttribute('tabindex','-1');js__countries_select.setAttribute('id','js__countries-select');js__countries_select.setAttribute('class','f32 hide');parent_node[0].appendChild(js__countries_select);var selectList=document.getElementById('select-list-hidden').getElementsByTagName('option');for(var j=0;j<selectList.length;j++){var a=selectList[j];var countries_text=selectList[j].text;var ulss=document.getElementById('js__countries-select');var classesAll=selectList[j].getAttribute("class");var node=document.createElement("li");ulss.appendChild(node);var ulss=document.getElementById('js__countries-select').getElementsByTagName('li')[j];var linkes_to_add=document.createElement("a");var textnode=document.createTextNode(countries_text);if(j==0){linkes_to_add.setAttribute('tabindex','0');}
linkes_to_add.setAttribute('href','#');linkes_to_add.appendChild(textnode);linkes_to_add.setAttribute('class',classesAll);ulss.appendChild(linkes_to_add);}
var li23=document.createElement('i');li23.innerHTML='';li23.setAttribute('class','countries-select ');document.getElementById("selectOneOfTheOptions").appendChild(li23);var true2=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a");var innerdeep=document.getElementById("js__countries-select").getElementsByTagName("li")[0].getElementsByTagName("a")[0];document.createElement('a');var like=innerdeep;true2.innerHTML=like;var clon3=like.cloneNode(true);var res=clon3.innerHTML.split("+");clon3.innerHTML='+'+res[1];document.getElementById("selectOneOfTheOptions").appendChild(clon3);document.getElementById("selectOneOfTheOptions").onclick=function(e){if(typeof e=='undefined')e=window.event;e.preventDefault?e.preventDefault():(e.returnValue=false);if(document.getElementById("js__countries-select").className=="f32 hide"){e.preventDefault?e.preventDefault():(e.returnValue=false);document.getElementById("js__countries-select").className="f32";var focusedElement=document.getElementById("js__countries-select").getElementsByTagName('a')[0];focusedElement.focus();e=e||window.event;document.getElementById("js__countries-select").className="f32";}
else{document.getElementById("js__countries-select").className="f32 hide";}};var ul=document.getElementById('js__countries-select');if(ul.addEventListener){ul.addEventListener("click",function(e){functionX((e||event))},false);}
else{ul.attachEvent("onclick",function(e){functionX((e||event))});}
function functionX(e){var targetedElement=null;if(typeof e=='undefined')e=window.event;if(typeof e.srcElement=='undefined'){targetedElement=e.originalTarget;}else{targetedElement=e.srcElement;}
if(targetedElement.tagName==='A'){e.preventDefault?e.preventDefault():(e.returnValue=false);var firstchildnew=document.getElementById('selectOneOfTheOptions').getElementsByTagName('a')[0];var true1=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a");if(true1){e.preventDefault?e.preventDefault():(e.returnValue=false);true1.innerHTML=targetedElement;var clon3=targetedElement.cloneNode(true);var res=clon3.innerHTML.split("+");clon3.innerHTML='+'+res[1];document.getElementById("selectOneOfTheOptions").appendChild(clon3);firstchildnew.remove();}
functionaddToHidden(e);}}
document.getElementById('js__mobile-countries').onkeydown=function(e){if(typeof e=='undefined'){e=window.event;}
functionaddToHidden(e);};function stripNonNumbers(val){return val.replace(/\D/g,'');}
document.getElementById('js__mobile-countries').onkeyup=function(e){var start=this.selectionStart,end=this.selectionEnd;this.value=stripNonNumbers(this.value);this.setSelectionRange(start,end);};document.getElementById('js__mobile-countries').addEventListener("focusout",function(e){this.value=stripNonNumbers(this.value);});document.getElementById('js__countries-select').getElementsByTagName('a').onmousedown=function(e){if(typeof e=='undefined')e=window.event;functionaddToHidden(e);};function functionaddToHidden(e){var input=document.getElementById('js__mobile-countries');var messages=document.getElementById('codeAndPhone');e=e||window.event;if(typeof e=='undefined')e=window.event;if(typeof e.srcElement=='undefined'){var sourceb=e.originalTarget;}else{var sourceb=e.srcElement;}
if(sourceb.tagName=="A"){var code2=sourceb.innerHTML;var res=code2.split("+");code2='+'+res[1];var messages=document.getElementById('codeAndPhone');messages.value=code2+input.value;}
else if(sourceb.tagName=="INPUT"){if(input.addEventListener){input.addEventListener("input",function(e){functionY((e||event))},false);}
else{input.attachEvent("onpropertychange",function(e){functionY((e||event))});}
function functionY(e){var code=document.getElementById('selectOneOfTheOptions').getElementsByTagName('a')[0].innerHTML;var res=code.split("+");code='+'+res[1];messages.value=code+input.value;};}
document.getElementById("js__countries-select").className="f32 hide";}
if(!Array.prototype.some)
{Array.prototype.some=function(func)
{for(var i in this)
{if(func(i))return true;}
return false;};}
function hasClass(element,cls){return(' '+element.className+' ').indexOf(' '+cls+' ')>-1;}
document.onmousedown=function(e){if(typeof e=='undefined')e=window.event;if(typeof e.srcElement=='undefined'){var sourceE=e.originalTarget;}else{var sourceE=e.srcElement;}
if((closestt(sourceE,'.js__pincode-container')==null)&&!(sourceE.id=="js__countries-select")){if(document.getElementById('js__mobile-countries')){document.getElementById("js__countries-select").className="f32 hide";}}};function closestt(el,selector){while(el!==null){elementParent=el.parentElement;if(elementParent!==null&&(hasClass(elementParent,selector)||hasClass(el,"flag"))){return elementParent;}
el=elementParent;}
return null;}
function hide(){var elem=document.getElementById('select-list-hidden');elem.style.display='none';}
window.onload=hide;Element.prototype.remove=function(){this.parentElement.removeChild(this);}
NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var i=this.length-1;i>=0;i--){if(this[i]&&this[i].parentElement){this[i].parentElement.removeChild(this[i]);}}}
if(!Array.prototype.filter)
{Array.prototype.filter=function(fun)
{"use strict";if(this===void 0||this===null)
throw new TypeError();var t=Object(this);var len=t.length>>>0;if(typeof fun!=="function")
throw new TypeError();var res=[];var thisp=arguments[1];for(var i=0;i<len;i++)
{if(i in t)
{var val=t[i];if(fun.call(thisp,val,i,t))
res.push(val);}}
return res;};}
if(!Array.prototype.indexOf)
{Array.prototype.indexOf=function(elt)
{var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0)
from+=len;for(;from<len;from++)
{if(from in this&&this[from]===elt)
return from;}
return-1;};}
function findNextTabStop(el,dir){var universe=document.querySelectorAll('#js__countries-select a');var list=Array.prototype.filter.call(universe,function(item){return item.tabIndex>="-1"});var index=list.indexOf(el);if(dir=="next"){return list[index+1]||list[0];}else{return list[index-1]||list[0];}}
document.onkeydown=function(event){event=event||window.event;if(typeof event.srcElement=='undefined'){var classes=event.originalTarget;}else{var classes=event.srcElement;}
if(event.keyCode==40||event.which==40){event.preventDefault?event.preventDefault():(event.returnValue=false);var nextEl=findNextTabStop(classes,"next");nextEl.focus();}
else if(event.keyCode==38||event.which==38){event.preventDefault?event.preventDefault():(event.returnValue=false);var nextEl=findNextTabStop(classes,"prev");nextEl.focus();}
var isEscape=false;if("key"in event){isEscape=event.key=="Escape";}else{isEscape=event.keyCode==27;}
if(isEscape){document.getElementById("js__countries-select").className="f32 hide";}
var targetEL=event.target;if((event.keyCode==13||event.which==13)&&hasClass(targetEL,"flag")){if(document.getElementById("js__countries-select").className=="f32 hide"){var focusedElement=document.getElementById("js__countries-select").getElementsByTagName('a')[0];focusedElement.focus();event=event||window.event;document.getElementById("js__countries-select").className="f32";}else{if(!(hasClass(document.getElementById("js__countries-select"),"hide"))){event.preventDefault?event.preventDefault():(event.returnValue=false);document.getElementById("js__mobile-countries").focus();document.getElementById("js__countries-select").className="f32 hide"}}
var keycode1=(event.keyCode?event.keyCode:event.which);var targetedElement=event.target;if(targetedElement.tagName==='A'){var firstchildnew=document.getElementById('selectOneOfTheOptions').getElementsByTagName('a')[0];var true1=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a");if(true1){var targetedElement=event.target;var like=targetedElement;var li2=document.createElement('a');li2.setAttribute('href','#');true1.innerHTML=li2;var toremove=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a")[0];var toremoveinner=toremove;var clon3=like.cloneNode(true);var res=clon3.innerHTML.split("+");clon3.innerHTML='+'+res[1];document.getElementById("selectOneOfTheOptions").appendChild(clon3);firstchildnew.remove();}}}
e=event||document.event;if(typeof e=='undefined')e=document.event;if((e.keyCode>=65&&e.keyCode<=130)||(e.which>=65&&e.which<=130)){var keycode1=(e.keyCode?e.keyCode:e.which);var string1=String.fromCharCode(keycode1);var searchon1=document.getElementById('js__countries-select').getElementsByTagName('a');for(var j=0;j<searchon1.length;j++){var a=searchon1[j];var countries_text=searchon1[j].innerHTML;var chare=countries_text.charAt(0);var lowercase=chare.toLowerCase();var lowString1=string1.toLowerCase();if(lowString1==lowercase){searchon1[j].focus();return true;}}}};}
if(document.getElementById('check-if-exist')){setTimeout(function(){document.getElementById('hidden-message').style.visibility="visible";document.getElementById('hidden-message').style.display="block";},30000);}
var submit,passPin=document.getElementsByClassName("type-pass-pin")[0];if(passPin){passPin.addEventListener('keyup',function(){var children=this.form.children;for(var i=0;i<children.length;i++){if(children[i].className=="OK-btn"){submit=children[i];break;}}
submit.disabled=(this.value?false:true);});}
var pinForm=document.getElementsByClassName('js__pinCode')[0];if(pinForm){pinForm.addEventListener('submit',function(){var passPin=document.getElementsByClassName('type-pass-pin')[0];var pinValue=passPin.value;var numeric=isNumeric(pinValue);if(!numeric||pinValue==''||pinValue=="Type the 6 diget PIN  Code"){var errorMsg=this.querySelector('.error-msg')
errorMsg.innerHTML="Please fill this field with numbers";errorMsg.className=errorMsg.className.replace(/\bhidden\b/,'');return false;}});}}
function isNumeric(n){return!isNaN(parseFloat(n))&&isFinite(n);}
if(!(typeof jQuery=='undefined')){(function($){var selectElement=$(".scrollableList").siblings("select");$(".scrollableList").siblings().each(function(){if($(this).hasClass("sbHolder")){selectElement.selectbox("detach");}else if($(this).hasClass("bootstrap-select")){$(this).hide();}});selectElement.hide();})(jQuery);jQuery(document).ready(function(){jQuery('.pb-collapse').click(function(){jQuery(".notAuth-msg-container").toggleClass('collapsed');jQuery(this).find('img').toggle();});});}
function tfaOptionVisible(event){event.preventDefault()
if(document.getElementById('tfa-options')){if(document.getElementById('tfa-options').style.display=='none'){document.getElementById('tfa-options').style.display='block';}
else{document.getElementById('tfa-options').style.display='none';}}}
function tfaResetAuthentication(){if(document.getElementById('reset-verification-warning').style.display=='none'){document.getElementById('reset-verification-warning').style.display='block';document.getElementsByClassName('reset-verification-option')[0].style.display='none';}
var redirectUri=document.getElementsByName('redirectUri')[0].value;document.getElementsByName('redirectUri')[0].value=encodeURI('/action/resetTfaMethod?redirectUri='+redirectUri);};