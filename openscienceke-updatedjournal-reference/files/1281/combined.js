/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.1",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":a.toString().replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||f.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return typeof a=="object"?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length||!d)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||++p.uuid:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")===0&&(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)~f.indexOf(" "+b[g]+" ")||(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>-1)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,""+d),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m,n=(p._data(this,"events")||{})[c.type]||[],o=n.delegateCount,q=[].slice.call(arguments),r=!c.exclusive&&!c.namespace,s=p.event.special[c.type]||{},t=[];q[0]=c,c.delegateTarget=this;if(s.preDispatch&&s.preDispatch.call(this,c)===!1)return;if(o&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<o;d++)k=n[d],l=k.selector,h[l]===b&&(h[l]=p(l,this).index(f)>=0),h[l]&&j.push(k);j.length&&t.push({elem:f,matches:j})}n.length>o&&t.push({elem:this,matches:n.slice(o)});for(d=0;d<t.length&&!c.isPropagationStopped();d++){i=t[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){k=i.matches[e];if(r||!c.namespace&&!k.namespace||c.namespace_re&&c.namespace_re.test(k.namespace))c.data=k.data,c.handleObj=k,g=((p.event.special[k.origType]||{}).handle||k.handler).apply(i.elem,q),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return s.postDispatch&&s.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function $(a,b,c,d){c=c||[],b=b||q;var e,f,g,j,k=b.nodeType;if(k!==1&&k!==9)return[];if(!a||typeof a!="string")return c;g=h(b);if(!g&&!d)if(e=L.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&i(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return u.apply(c,t.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&X&&b.getElementsByClassName)return u.apply(c,t.call(b.getElementsByClassName(j),0)),c}return bk(a,b,c,d,g)}function _(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function ba(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bb(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bc(a,b,c,d){var e,g,h,i,j,k,l,m,n,p,r=!c&&b!==q,s=(r?"<s>":"")+a.replace(H,"$1<s>"),u=y[o][s];if(u)return d?0:t.call(u,0);j=a,k=[],m=0,n=f.preFilter,p=f.filter;while(j){if(!e||(g=I.exec(j)))g&&(j=j.slice(g[0].length),h.selector=l),k.push(h=[]),l="",r&&(j=" "+j);e=!1;if(g=J.exec(j))l+=g[0],j=j.slice(g[0].length),e=h.push({part:g.pop().replace(H," "),string:g[0],captures:g});for(i in p)(g=S[i].exec(j))&&(!n[i]||(g=n[i](g,b,c)))&&(l+=g[0],j=j.slice(g[0].length),e=h.push({part:i,string:g.shift(),captures:g}));if(!e)break}return l&&(h.selector=l),d?j.length:j?$.error(a):t.call(y(s,k),0)}function bd(a,b,e,f){var g=b.dir,h=s++;return a||(a=function(a){return a===e}),b.first?function(b){while(b=b[g])if(b.nodeType===1)return a(b)&&b}:f?function(b){while(b=b[g])if(b.nodeType===1&&a(b))return b}:function(b){var e,f=h+"."+c,i=f+"."+d;while(b=b[g])if(b.nodeType===1){if((e=b[o])===i)return b.sizset;if(typeof e=="string"&&e.indexOf(f)===0){if(b.sizset)return b}else{b[o]=i;if(a(b))return b.sizset=!0,b;b.sizset=!1}}}}function be(a,b){return a?function(c){var d=b(c);return d&&a(d===!0?c:d)}:b}function bf(a,b,c){var d,e,g=0;for(;d=a[g];g++)f.relative[d.part]?e=bd(e,f.relative[d.part],b,c):e=be(e,f.filter[d.part].apply(null,d.captures.concat(b,c)));return e}function bg(a){return function(b){var c,d=0;for(;c=a[d];d++)if(c(b))return!0;return!1}}function bh(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)$(a,b[e],c,d)}function bi(a,b,c,d,e,g){var h,i=f.setFilters[b.toLowerCase()];return i||$.error(b),(a||!(h=e))&&bh(a||"*",d,h=[],e),h.length>0?i(h,c,g):[]}function bj(a,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s=0,t=a.length,v=S.POS,w=new RegExp("^"+v.source+"(?!"+A+")","i"),x=function(){var a=1,c=arguments.length-2;for(;a<c;a++)arguments[a]===b&&(n[a]=b)};for(;s<t;s++){f=a[s],g="",m=e;for(h=0,i=f.length;h<i;h++){j=f[h],k=j.string;if(j.part==="PSEUDO"){v.exec(""),l=0;while(n=v.exec(k)){o=!0,p=v.lastIndex=n.index+n[0].length;if(p>l){g+=k.slice(l,n.index),l=p,q=[c],J.test(g)&&(m&&(q=m),m=e);if(r=O.test(g))g=g.slice(0,-5).replace(J,"$&*"),l++;n.length>1&&n[0].replace(w,x),m=bi(g,n[1],n[2],q,m,r)}g=""}}o||(g+=k),o=!1}g?J.test(g)?bh(g,m||[c],d,e):$(g,c,d,e?e.concat(m):m):u.apply(d,m)}return t===1?d:$.uniqueSort(d)}function bk(a,b,e,g,h){a=a.replace(H,"$1");var i,k,l,m,n,o,p,q,r,s,v=bc(a,b,h),w=b.nodeType;if(S.POS.test(a))return bj(v,b,e,g);if(g)i=t.call(g,0);else if(v.length===1){if((o=t.call(v[0],0)).length>2&&(p=o[0]).part==="ID"&&w===9&&!h&&f.relative[o[1].part]){b=f.find.ID(p.captures[0].replace(R,""),b,h)[0];if(!b)return e;a=a.slice(o.shift().string.length)}r=(v=N.exec(o[0].string))&&!v.index&&b.parentNode||b,q="";for(n=o.length-1;n>=0;n--){p=o[n],s=p.part,q=p.string+q;if(f.relative[s])break;if(f.order.test(s)){i=f.find[s](p.captures[0].replace(R,""),r,h);if(i==null)continue;a=a.slice(0,a.length-q.length)+q.replace(S[s],""),a||u.apply(e,t.call(i,0));break}}}if(a){k=j(a,b,h),c=k.dirruns++,i==null&&(i=f.find.TAG("*",N.test(a)&&b.parentNode||b));for(n=0;m=i[n];n++)d=k.runs++,k(m)&&e.push(m)}return e}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=a.document,r=q.documentElement,s=0,t=[].slice,u=[].push,v=function(a,b){return a[o]=b||!0,a},w=function(){var a={},b=[];return v(function(c,d){return b.push(c)>f.cacheLength&&delete a[b.shift()],a[c]=d},a)},x=w(),y=w(),z=w(),A="[\\x20\\t\\r\\n\\f]",B="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",C=B.replace("w","w#"),D="([*^$|!~]?=)",E="\\["+A+"*("+B+")"+A+"*(?:"+D+A+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+C+")|)|)"+A+"*\\]",F=":("+B+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+E+")|[^:]|\\\\.)*|.*))\\)|)",G=":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",H=new RegExp("^"+A+"+|((?:^|[^\\\\])(?:\\\\.)*)"+A+"+$","g"),I=new RegExp("^"+A+"*,"+A+"*"),J=new RegExp("^"+A+"*([\\x20\\t\\r\\n\\f>+~])"+A+"*"),K=new RegExp(F),L=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,M=/^:not/,N=/[\x20\t\r\n\f]*[+~]/,O=/:not\($/,P=/h\d/i,Q=/input|select|textarea|button/i,R=/\\(?!\\)/g,S={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),NAME:new RegExp("^\\[name=['\"]?("+B+")['\"]?\\]"),TAG:new RegExp("^("+B.replace("w","w*")+")"),ATTR:new RegExp("^"+E),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+A+"*(even|odd|(([+-]|)(\\d*)n|)"+A+"*(?:([+-]|)"+A+"*(\\d+)|))"+A+"*\\)|)","i"),POS:new RegExp(G,"ig"),needsContext:new RegExp("^"+A+"*[>+~]|"+G,"i")},T=function(a){var b=q.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},U=T(function(a){return a.appendChild(q.createComment("")),!a.getElementsByTagName("*").length}),V=T(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),W=T(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),X=T(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),Y=T(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",r.insertBefore(a,r.firstChild);var b=q.getElementsByName&&q.getElementsByName(o).length===2+q.getElementsByName(o+0).length;return e=!q.getElementById(o),r.removeChild(a),b});try{t.call(r.childNodes,0)[0].nodeType}catch(Z){t=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}$.matches=function(a,b){return $(a,null,null,b)},$.matchesSelector=function(a,b){return $(b,null,null,[a]).length>0},g=$.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=g(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=g(b);return c},h=$.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},i=$.contains=r.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:r.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},$.attr=function(a,b){var c,d=h(a);return d||(b=b.toLowerCase()),f.attrHandle[b]?f.attrHandle[b](a):W||d?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},f=$.selectors={cacheLength:50,createPseudo:v,match:S,order:new RegExp("ID|TAG"+(Y?"|NAME":"")+(X?"|CLASS":"")),attrHandle:V?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:e?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:U?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(R,""),a[3]=(a[4]||a[5]||"").replace(R,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||$.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&$.error(a[0]),a},PSEUDO:function(a,b,c){var d,e;if(S.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(d=a[4])K.test(d)&&(e=bc(d,b,c,!0))&&(e=d.indexOf(")",d.length-e)-d.length)&&(d=d.slice(0,e),a[0]=a[0].slice(0,e)),a[2]=d;return a.slice(0,3)}},filter:{ID:e?function(a){return a=a.replace(R,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(R,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(R,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=x[o][a];return b||(b=x(a,new RegExp("(^|"+A+")"+a+"("+A+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return b?function(d){var e=$.attr(d,a),f=e+"";if(e==null)return b==="!=";switch(b){case"=":return f===c;case"!=":return f!==c;case"^=":return c&&f.indexOf(c)===0;case"*=":return c&&f.indexOf(c)>-1;case"$=":return c&&f.substr(f.length-c.length)===c;case"~=":return(" "+f+" ").indexOf(c)>-1;case"|=":return f===c||f.substr(0,c.length+1)===c+"-"}}:function(b){return $.attr(b,a)!=null}},CHILD:function(a,b,c,d){if(a==="nth"){var e=s++;return function(a){var b,f,g=0,h=a;if(c===1&&d===0)return!0;b=a.parentNode;if(b&&(b[o]!==e||!a.sizset)){for(h=b.firstChild;h;h=h.nextSibling)if(h.nodeType===1){h.sizset=++g;if(h===a)break}b[o]=e}return f=a.sizset-d,c===0?f===0:f%c===0&&f/c>=0}}return function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b,c,d){var e,g=f.pseudos[a]||f.pseudos[a.toLowerCase()];return g||$.error("unsupported pseudo: "+a),g[o]?g(b,c,d):g.length>1?(e=[a,a,"",b],function(a){return g(a,0,e)}):g}},pseudos:{not:v(function(a,b,c){var d=j(a.replace(H,"$1"),b,c);return function(a){return!d(a)}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!f.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},contains:v(function(a){return function(b){return(b.textContent||b.innerText||g(b)).indexOf(a)>-1}}),has:v(function(a){return function(b){return $(a,b).length>0}}),header:function(a){return P.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:_("radio"),checkbox:_("checkbox"),file:_("file"),password:_("password"),image:_("image"),submit:ba("submit"),reset:ba("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return Q.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b,c){return c?a.slice(1):[a[0]]},last:function(a,b,c){var d=a.pop();return c?a:[d]},even:function(a,b,c){var d=[],e=c?1:0,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},odd:function(a,b,c){var d=[],e=c?0:1,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},lt:function(a,b,c){return c?a.slice(+b):a.slice(0,+b)},gt:function(a,b,c){return c?a.slice(0,+b+1):a.slice(+b+1)},eq:function(a,b,c){var d=a.splice(+b,1);return c?a:d}}},k=r.compareDocumentPosition?function(a,b){return a===b?(l=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return l=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bb(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bb(e[j],f[j]);return j===c?bb(a,f[j],-1):bb(e[j],b,1)},[0,0].sort(k),m=!l,$.uniqueSort=function(a){var b,c=1;l=m,a.sort(k);if(l)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},$.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},j=$.compile=function(a,b,c){var d,e,f,g=z[o][a];if(g&&g.context===b)return g;d=bc(a,b,c);for(e=0,f=d.length;e<f;e++)d[e]=bf(d[e],b,c);return g=z(a,bg(d)),g.context=b,g.runs=g.dirruns=0,g},q.querySelectorAll&&function(){var a,b=bk,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[],f=[":active"],g=r.matchesSelector||r.mozMatchesSelector||r.webkitMatchesSelector||r.oMatchesSelector||r.msMatchesSelector;T(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+A+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),T(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+A+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=e.length&&new RegExp(e.join("|")),bk=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a)))if(d.nodeType===9)try{return u.apply(f,t.call(d.querySelectorAll(a),0)),f}catch(i){}else if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){var j,k,l,m=d.getAttribute("id"),n=m||o,p=N.test(a)&&d.parentNode||d;m?n=n.replace(c,"\\$&"):d.setAttribute("id",n),j=bc(a,d,h),n="[id='"+n+"']";for(k=0,l=j.length;k<l;k++)j[k]=n+j[k].selector;try{return u.apply(f,t.call(p.querySelectorAll(j.join(",")),0)),f}catch(i){}finally{m||d.removeAttribute("id")}}return b(a,d,f,g,h)},g&&(T(function(b){a=g.call(b,"div");try{g.call(b,"[test!='']:sizzle"),f.push(S.PSEUDO.source,S.POS.source,"!=")}catch(c){}}),f=new RegExp(f.join("|")),$.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!h(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=g.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return $(c,null,null,[b]).length>0})}(),f.setFilters.nth=f.setFilters.eq,f.filters=f.pseudos,$.attr=p.attr,p.find=$,p.expr=$.selectors,p.expr[":"]=p.expr.pseudos,p.unique=$.uniqueSort,p.text=$.getText,p.isXMLDoc=$.isXML,p.contains=$.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{cj=f.href}catch(cy){cj=e.createElement("a"),cj.href="",cj=cj.href}ck=ct.exec(cj.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:cj,isLocal:cn.test(ck[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=""+(c||y),k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,ck[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]==ck[1]&&i[2]==ck[2]&&(i[3]||(i[1]==="http:"?80:443))==(ck[3]||(ck[1]==="http:"?80:443)))),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e,f=this.createTween(a,b),g=cQ.exec(b),h=f.cur(),i=+h||0,j=1;if(g){c=+g[2],d=g[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&i){i=p.css(f.elem,a,!0)||c||1;do e=j=j||".5",i=i/j,p.style(f.elem,a,i+d),j=f.cur()/h;while(j!==1&&j!==e)}f.unit=d,f.start=i,f.end=g[1]?i+(g[1]+1)*c:c}return f}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j,k,l,m=this[0],n=m&&m.ownerDocument;if(!n)return;return(e=n.body)===m?p.offset.bodyOffset(m):(d=n.documentElement,p.contains(d,m)?(c=m.getBoundingClientRect(),f=da(n),g=d.clientTop||e.clientTop||0,h=d.clientLeft||e.clientLeft||0,i=f.pageYOffset||d.scrollTop,j=f.pageXOffset||d.scrollLeft,k=c.top+i-g,l=c.left+j-h,{top:k,left:l}):{top:0,left:0})},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);

window.$j = jQuery.noConflict();
/*
 * https://github.com/Widen/jquery-prototype-custom-event-bridge
 * 
 * Copyright (c) 2015 Widen Enterprises
 *
 * Allow custom events in the format 'namespace:eventname' to pass between Prototype and jQuery.
 * Such custom events triggered by jQuery will hit Prototype observers (as well as jQuery listeners).
 * Such custom events triggered by Prototype will hit jQuery listeners (as well as Prototype observers).
 * The first element of the data array passed along by the jQuery trigger will be sent to the Prototype observer.
 * The memo data object passed along by the Prototype trigger will be encoded in the first element of the event
 * data array received by the jQuery listener.
 * This drop-in also prevents jQuery's trigger implementation from executing any Prototype-contributed functions on an event target element that match the jQuery event type.
 * 
 * 
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Widen Enterprises, Inc
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/*global jQuery, Element*/
(function ($) {
    // extract the base event name, accounting for jQuery namespaced event names, such as "hide.bs.collapse", where
    // the underlying event type is actually "hide".
    var getPrototypeMethodName = function(eventName) {
            if (eventName.indexOf('.') > 0) {
                eventName = eventName.split('.')[0];
            }
            return Element.Methods[eventName] ? eventName : null;
        },
        oldjQueryTrigger = $.event.trigger,
        oldPrototypeFire = Element.fire;

    //trigger Prototype event handlers if jQuery fires an allowable Prototype custom event
    $.event.trigger = function(event, data, elem, onlyHandlers) {
        var oldPrototypeElementMethod, jqueryTriggerRetVal, eventName, prototypeMethodName;

        if (event && typeof(event) === 'object' && event.type) {
            eventName = event.type;
        }
        else if (typeof(event) === 'string') {
            eventName = event;
        }

        if (elem && eventName && eventName.indexOf(':') > 0) {
            if ($(elem).is(document)) {
                document.fire(eventName, data ? data[0] : null, false, true);
            }
            else {
                oldPrototypeFire(elem, eventName, data ? data[0] : null, !onlyHandlers);
            }
        }
        //if Prototype has added a function to the DOM element that matches the jQuery event type, temporarily remove it so jQuery's trigger function doesn't execute it
        else if (elem && eventName) {
            // If this is a jQuery namespaced event name, we may need to extract the underlying base event type from
            // this event name to determine if Prototype has an associated method attached to the element.  jQuery
            // will otherwise do the same and invoke the method on the element, so we must prevent this from happening
            prototypeMethodName = getPrototypeMethodName(eventName);
            if (prototypeMethodName) {
                oldPrototypeElementMethod = elem[prototypeMethodName];
                elem[prototypeMethodName] = null;
            }
        }

        jqueryTriggerRetVal = oldjQueryTrigger(event, data, elem, onlyHandlers);

        //if we removed a Prototype function from this DOM element, add it back after jQuery's trigger function has executed
        if (oldPrototypeElementMethod) {
            elem[prototypeMethodName] = oldPrototypeElementMethod;
        }

        return jqueryTriggerRetVal;
    };

    //trigger jQuery event handlers if Prototype fires a custom event
    Element.addMethods( {
        fire: function(element, eventName, memo, bubble) {
            if (eventName.indexOf(':') > 0) {
                oldjQueryTrigger(eventName, memo ? [memo] : null, element, Object.isUndefined(bubble) ? false : !bubble);
            }
            oldPrototypeFire(element, eventName, memo, bubble);
        }
    });

    Object.extend(document, {
        fire: function(eventName, memo, bubble, bridged) {
            if (eventName.indexOf(':') > 0 && !bridged) {
                oldjQueryTrigger(eventName, memo ? [memo] : null, document);
            }
            oldPrototypeFire(document, eventName, memo);
        }
    });
}(jQuery));
/*! jQuery UI - v1.12.1 - 2016-10-17
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/selectmenu.js, widgets/slider.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e=t.css("visibility");"inherit"===e;)t=t.parent(),e=t.css("visibility");return"hidden"!==e}function i(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function s(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=n(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function n(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout",i,function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,o)}function o(){t.datepicker._isDisabledDatepicker(p.inline?p.dpDiv.parent()[0]:p.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function a(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}function r(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}t.ui=t.ui||{},t.ui.version="1.12.1";var l=0,h=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,s,n=h.call(arguments,1),o=0,a=n.length;a>o;o++)for(i in n[o])s=n[o][i],n[o].hasOwnProperty(i)&&void 0!==s&&(e[i]=t.isPlainObject(s)?t.isPlainObject(e[i])?t.widget.extend({},e[i],s):t.widget.extend({},s):s);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(n){var o="string"==typeof n,a=h.call(arguments,1),r=this;return o?this.length||"instance"!==n?this.each(function(){var i,o=t.data(this,s);return"instance"===n?(r=o,!1):o?t.isFunction(o[n])&&"_"!==n.charAt(0)?(i=o[n].apply(o,a),i!==o&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+n+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+n+"'")}):r=void 0:(a.length&&(n=t.widget.extend.apply(null,[n].concat(a))),this.each(function(){var e=t.data(this,s);e?(e.option(n||{}),e._init&&e._init()):t.data(this,s,new i(n,this))})),r}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(u.test(t[0])?e/100:1),parseFloat(t[1])*(u.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var u,p,f,m,g,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,m=_.offset,g=t.extend({},m),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?g.left+=p:"center"===n.at[0]&&(g.left+=p/2),"bottom"===n.at[1]?g.top+=f:"center"===n.at[1]&&(g.top+=f/2),u=e(k.at,p,f),g.left+=u[0],g.top+=u[1],this.each(function(){var s,r,l=t(this),h=l.outerWidth(),c=l.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),x=h+d+i(this,"marginRight")+y.width,C=c+_+i(this,"marginBottom")+y.height,D=t.extend({},g),T=e(k.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?D.left-=h:"center"===n.my[0]&&(D.left-=h/2),"bottom"===n.my[1]?D.top-=c:"center"===n.my[1]&&(D.top-=c/2),D.left+=T[0],D.top+=T[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](D,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:c,collisionPosition:s,collisionWidth:x,collisionHeight:C,offset:[u[0]+T[0],u[1]+T[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(r=function(t){var e=m.left-D.left,i=e+p-h,s=m.top-D.top,r=s+f-c,u={target:{element:v,left:m.left,top:m.top,width:p,height:f},element:{element:l,left:D.left,top:D.top,width:h,height:c},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};h>p&&p>a(e+i)&&(u.horizontal="center"),c>f&&f>a(s+r)&&(u.vertical="middle"),u.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,u)}),l.offset(t.extend(D,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-r-o,(0>s||a(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-l,(i>0||u>a(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),t.ui.focusable=function(i,s){var n,o,a,r,l,h=i.nodeName.toLowerCase();return"area"===h?(n=i.parentNode,o=n.name,i.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']"),a.length>0&&a.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(h)?(r=!i.disabled,r&&(l=t(i).closest("fieldset")[0],l&&(r=!l.disabled))):r="a"===h?i.href||s:s,r&&t(i).is(":visible")&&e(t(i)))},t.extend(t.expr[":"],{focusable:function(e){return t.ui.focusable(e,null!=t.attr(e,"tabindex"))}}),t.ui.focusable,t.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):t(this[0].form)},t.ui.formResetMixin={_formResetHandler:function(){var e=t(this);setTimeout(function(){var i=e.data("ui-form-reset-instances");t.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var t=this.form.data("ui-form-reset-instances")||[];t.length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t)}},_unbindFormResetHandler:function(){if(this.form.length){var e=this.form.data("ui-form-reset-instances");e.splice(t.inArray(this,e),1),e.length?this.form.data("ui-form-reset-instances",e):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}},"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(e,i){function s(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.ui.escapeSelector=function(){var t=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;return function(e){return e.replace(t,"\\$1")}}(),t.fn.labels=function(){var e,i,s,n,o;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),s=this.attr("id"),s&&(e=this.eq(0).parents().last(),o=e.add(e.length?e.siblings():this.siblings()),i="label[for='"+t.ui.escapeSelector(s)+"']",n=n.add(o.find(i).addBack(i))),this.pushStack(n))},t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.extend(t.expr[":"],{tabbable:function(e){var i=t.attr(e,"tabindex"),s=null!=i;return(!s||i>=0)&&t.ui.focusable(e,s)}}),t.fn.extend({uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var c=!1;t(document).on("mouseup",function(){c=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!c){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,s=1===e.which,n="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),c=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,c=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.ui.plugin={add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;o.length>n;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.ui.safeBlur=function(e){e&&"body"!==e.nodeName.toLowerCase()&&t(e).trigger("blur")},t.widget("ui.draggable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blurActiveElement(e),this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=t.ui.safeActiveElement(this.document[0]),s=t(e.target);s.closest(i).length||t.ui.safeBlur(i)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper),n=s?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options,o=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)
},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),l=t.pageX,h=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(l=this.originalPageX),"x"===a.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,s){var n=t.extend({},i,{item:s.element});s.sortables=[],t(s.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i,s){var n=t.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,t.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,n))})},drag:function(e,i,s){t.each(s.sortables,function(){var n=!1,o=this;o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(n=!1),n})),n?(o.isOver||(o.isOver=1,s._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",e),s.dropped=o.element,t.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(e),i.position=s._generatePosition(e,!0),s._trigger("fromSortable",e),s.dropped=!1,t.each(s.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,s){var n=t("body"),o=s.options;n.css("cursor")&&(o._cursor=n.css("cursor")),n.css("cursor",o.cursor)},stop:function(e,i,s){var n=s.options;n._cursor&&t("body").css("cursor",n._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("opacity")&&(o._opacity=n.css("opacity")),n.css("opacity",o.opacity)},stop:function(e,i,s){var n=s.options;n._opacity&&t(i.helper).css("opacity",n._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,s){var n=s.options,o=!1,a=s.scrollParentNotHidden[0],r=s.document[0];a!==r&&"HTML"!==a.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+a.offsetHeight-e.pageY<n.scrollSensitivity?a.scrollTop=o=a.scrollTop+n.scrollSpeed:e.pageY-s.overflowOffset.top<n.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+a.offsetWidth-e.pageX<n.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+n.scrollSpeed:e.pageX-s.overflowOffset.left<n.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(e.pageY-t(r).scrollTop()<n.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-n.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<n.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(e.pageX-t(r).scrollLeft()<n.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-n.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<n.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+n.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!n.dropBehaviour&&t.ui.ddmanager.prepareOffsets(s,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,s){var n=s.options;s.snapElements=[],t(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var e=t(this),i=e.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,s){var n,o,a,r,l,h,c,u,d,p,f=s.options,m=f.snapTolerance,g=i.offset.left,_=g+s.helperProportions.width,v=i.offset.top,b=v+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)l=s.snapElements[d].left-s.margins.left,h=l+s.snapElements[d].width,c=s.snapElements[d].top-s.margins.top,u=c+s.snapElements[d].height,l-m>_||g>h+m||c-m>b||v>u+m||!t.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(c-b),o=m>=Math.abs(u-v),a=m>=Math.abs(l-_),r=m>=Math.abs(h-g),n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left)),p=n||o||a||r,"outer"!==f.snapMode&&(n=m>=Math.abs(c-v),o=m>=Math.abs(u-b),a=m>=Math.abs(l-g),r=m>=Math.abs(h-_),n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||o||a||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||o||a||r||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,s){var n,o=s.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(n=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",n+e)}),this.css("zIndex",n+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("zIndex")&&(o._zIndex=n.css("zIndex")),n.css("zIndex",o.zIndex)},stop:function(e,i,s){var n=s.options;n._zIndex&&t(i.helper).css("zIndex",n._zIndex)}}),t.ui.draggable,t.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],void 0):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;t.length>e;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e)},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var s=t.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this._addActiveClass(),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this._removeActiveClass(),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&u(s,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var u=t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,s,n){if(!i.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,a=(e.positionAbs||e.position.absolute).top+e.margins.top,r=o+e.helperProportions.width,l=a+e.helperProportions.height,h=i.offset.left,c=i.offset.top,u=h+i.proportions().width,d=c+i.proportions().height;switch(s){case"fit":return o>=h&&u>=r&&a>=c&&d>=l;case"intersect":return o+e.helperProportions.width/2>h&&u>r-e.helperProportions.width/2&&a+e.helperProportions.height/2>c&&d>l-e.helperProportions.height/2;case"pointer":return t(n.pageY,c,i.proportions().height)&&t(n.pageX,h,i.proportions().width);case"touch":return(a>=c&&d>=a||l>=c&&d>=l||c>a&&l>d)&&(o>=h&&u>=o||r>=h&&u>=r||h>o&&r>u);default:return!1}}}();t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions().height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions({width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&u(e,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").on("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,o,a=u(e,this,this.options.tolerance,i),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===n}),o.length&&(s=t(o[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").off("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.uiBackCompat!==!1&&t.widget("ui.droppable",t.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),t.ui.droppable,t.widget("ui.resizable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)},_create:function(){var e,i=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,e={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(e),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(e),this._proportionallyResize()),this._setupHandles(),i.autoHide&&t(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;default:}},_setupHandles:function(){var e,i,s,n,o,a=this.options,r=this;if(this.handles=a.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;s.length>i;i++)e=t.trim(s[i]),n="ui-resizable-"+e,o=t("<div>"),this._addClass(o,"ui-resizable-handle "+n),o.css({zIndex:a.zIndex}),this.handles[e]=".ui-resizable-"+e,this.element.append(o);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){r.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=o&&o[1]?o[1]:"se")}),a.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(e){var i,s,n,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,s+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===n?this.axis+"-resize":n),this._addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,s,n=this.originalMousePosition,o=this.axis,a=e.pageX-n.left||0,r=e.pageY-n.top||0,l=this._change[o];return this._updatePrevProperties(),l?(i=l.apply(this,[e,a,r]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,l,h=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseFloat(c.element.css("left"))+(c.position.left-c.originalPosition.left)||null,l=parseFloat(c.element.css("top"))+(c.position.top-c.originalPosition.top)||null,h.animate||this.element.css(t.extend(a,{top:l,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!h.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,s,n,o,a=this.options;o={minWidth:this._isNumber(a.minWidth)?a.minWidth:0,maxWidth:this._isNumber(a.maxWidth)?a.maxWidth:1/0,minHeight:this._isNumber(a.minHeight)?a.minHeight:0,maxHeight:this._isNumber(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,s=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,n=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),s>o.minHeight&&(o.minHeight=s),o.maxWidth>i&&(o.maxWidth=i),o.maxHeight>n&&(o.maxHeight=n)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,h=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),o&&h&&(t.left=r-e.minWidth),s&&h&&(t.left=r-e.maxWidth),a&&c&&(t.top=l-e.minHeight),n&&c&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],n=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(n[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;this._proportionallyResizeElements.length>e;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,l={width:i.size.width-r,height:i.size.height-a},h=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,c=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,c&&h?{top:c,left:h}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,s,n,o,a,r,l=t(this).resizable("instance"),h=l.options,c=l.element,u=h.containment,d=u instanceof t?u.get(0):/parent/.test(u)?c.parent().get(0):u;d&&(l.containerElement=t(d),/document/.test(u)||u===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,s){i[t]=l._num(e.css("padding"+s))}),l.containerOffset=e.offset(),l.containerPosition=e.position(),l.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},s=l.containerOffset,n=l.containerSize.height,o=l.containerSize.width,a=l._hasScroll(d,"left")?d.scrollWidth:o,r=l._hasScroll(d)?d.scrollHeight:n,l.parentData={element:d,left:s.left,top:s.top,width:a,height:r}))},resize:function(e){var i,s,n,o,a=t(this).resizable("instance"),r=a.options,l=a.containerOffset,h=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(u=l),h.left<(a._helper?l.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-l.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio,p=!1),a.position.left=r.helper?l.left:0),h.top<(a._helper?l.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-l.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio,p=!1),a.position.top=a._helper?l.top:0),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o?(a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top):(a.offset.left=a.element.offset().left,a.offset.top=a.element.offset().top),i=Math.abs(a.sizeDiff.width+(a._helper?a.offset.left-u.left:a.offset.left-l.left)),s=Math.abs(a.sizeDiff.height+(a._helper?a.offset.top-u.top:a.offset.top-l.top)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio,p=!1)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio,p=!1)),p||(a.position.left=a.prevPosition.left,a.position.top=a.prevPosition.top,a.size.width=a.prevSize.width,a.size.height=a.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),l=a.outerWidth()-e.sizeDiff.width,h=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:l,height:h}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:l,height:h})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseFloat(e.width()),height:parseFloat(e.height()),left:parseFloat(e.css("left")),top:parseFloat(e.css("top"))})})},resize:function(e,i){var s=t(this).resizable("instance"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0};
t(n.alsoResize).each(function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),n={},o=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,e){var i=(s[e]||0)+(r[e]||0);i&&i>=0&&(n[e]=i||null)}),e.css(n)})},stop:function(){t(this).removeData("ui-resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),e._addClass(e.ghost,"ui-resizable-ghost"),t.uiBackCompat!==!1&&"string"==typeof e.options.ghost&&e.ghost.addClass(this.options.ghost),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),s=i.options,n=i.size,o=i.originalSize,a=i.originalPosition,r=i.axis,l="number"==typeof s.grid?[s.grid,s.grid]:s.grid,h=l[0]||1,c=l[1]||1,u=Math.round((n.width-o.width)/h)*h,d=Math.round((n.height-o.height)/c)*c,p=o.width+u,f=o.height+d,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,_=s.minWidth&&s.minWidth>p,v=s.minHeight&&s.minHeight>f;s.grid=l,_&&(p+=h),v&&(f+=c),m&&(p-=h),g&&(f-=c),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=a.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=a.left-u):((0>=f-c||0>=p-h)&&(e=i._getPaddingPlusBorderDimensions(this)),f-c>0?(i.size.height=f,i.position.top=a.top-d):(f=c-e.height,i.size.height=f,i.position.top=a.top+o.height-f),p-h>0?(i.size.width=p,i.position.left=a.left-u):(p=h-e.width,i.size.width=p,i.position.left=a.left+o.width-p))}}),t.ui.resizable,t.widget("ui.selectable",t.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e.elementPos=t(e.element[0]).offset(),e.selectees=t(e.options.filter,e.element[0]),e._addClass(e.selectees,"ui-selectee"),e.selectees.each(function(){var i=t(this),s=i.offset(),n={left:s.left-e.elementPos.left,top:s.top-e.elementPos.top};t.data(this,"selectable-item",{element:this,$element:i,left:n.left,top:n.top,right:n.left+i.outerWidth(),bottom:n.top+i.outerHeight(),startselected:!1,selected:i.hasClass("ui-selected"),selecting:i.hasClass("ui-selecting"),unselecting:i.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=t("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(e){var i=this,s=this.options;this.opos=[e.pageX,e.pageY],this.elementPos=t(this.element[0]).offset(),this.options.disabled||(this.selectees=t(s.filter,this.element[0]),this._trigger("start",e),t(s.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=t.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(i._removeClass(s.$element,"ui-selected"),s.selected=!1,i._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",e,{unselecting:s.element}))}),t(e.target).parents().addBack().each(function(){var s,n=t.data(this,"selectable-item");return n?(s=!e.metaKey&&!e.ctrlKey||!n.$element.hasClass("ui-selected"),i._removeClass(n.$element,s?"ui-unselecting":"ui-selected")._addClass(n.$element,s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",e,{selecting:n.element}):i._trigger("unselecting",e,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,l=e.pageY;return o>r&&(i=r,r=o,o=i),a>l&&(i=l,l=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:l-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),h=!1,c={};i&&i.element!==s.element[0]&&(c.left=i.left+s.elementPos.left,c.right=i.right+s.elementPos.left,c.top=i.top+s.elementPos.top,c.bottom=i.bottom+s.elementPos.top,"touch"===n.tolerance?h=!(c.left>r||o>c.right||c.top>l||a>c.bottom):"fit"===n.tolerance&&(h=c.left>o&&r>c.right&&c.top>a&&l>c.bottom),h?(i.selected&&(s._removeClass(i.$element,"ui-selected"),i.selected=!1),i.unselecting&&(s._removeClass(i.$element,"ui-unselecting"),i.unselecting=!1),i.selecting||(s._addClass(i.$element,"ui-selecting"),i.selecting=!0,s._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,s._addClass(i.$element,"ui-selected"),i.selected=!0):(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,i.startselected&&(s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(s._removeClass(i.$element,"ui-selected"),i.selected=!1,s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",e,{unselected:s.element})}),t(".ui-selecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}}),t.widget("ui.sortable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-this.document.scrollTop()<a.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-a.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<a.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+a.scrollSpeed)),e.pageX-this.document.scrollLeft()<a.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-a.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<a.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new t.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,l=r+t.height,h=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+h>r&&l>s+h,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&l>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=s&&n;return o?(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1)):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],l=[],h=this._connectWith();if(h&&e)for(s=h.length-1;s>=0;s--)for(o=t(h[s],this.document[0]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&l.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=l.length-1;s>=0;s--)l[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,l,h,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i],this.document[0]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,h=r.length;h>s;s++)l=t(r[s]),l.data(this.widgetName+"-item",a),c.push({item:l,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]);return e._addClass(n,"ui-sortable-placeholder",i||e.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(n)):"tr"===s?e._createTrPlaceholder(e.currentItem,n):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var s=this;e.children().each(function(){t("<td>&#160;</td>",s.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,s,n,o,a,r,l,h,c,u,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,o=null,c=d.floating||this._isFloating(this.currentItem),a=c?"left":"top",r=c?"width":"height",u=c?"pageX":"pageY",s=this.items.length-1;s>=0;s--)t.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(l=this.items[s].item.offset()[a],h=!1,e[u]-l>this.items[s][r]/2&&(h=!0),n>Math.abs(e[u]-l)&&(n=Math.abs(e[u]-l),o=this.items[s],this.direction=h?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}}),t.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t()}},_createIcons:function(){var e,i,s=this.options.icons;s&&(e=t("<span>"),this._addClass(e,"ui-accordion-header-icon","ui-icon "+s.header),e.prependTo(this.headers),i=this.active.children(".ui-accordion-header-icon"),this._removeClass(i,s.header)._addClass(i,null,s.activeHeader)._addClass(this.headers,"ui-accordion-icons"))
},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeAttr("role"),this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),void 0):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),void 0)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!t)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:o=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[s-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),t(o).trigger("focus"),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().trigger("focus")},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var t=this.headers,e=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),e&&(this._off(t.not(this.headers)),this._off(e.not(this.panels)))},_refresh:function(){var e,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var e=t(this),i=e.uniqueId().attr("id"),s=e.next(),n=s.uniqueId().attr("id");e.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(e=n.height(),this.element.siblings(":visible").each(function(){var i=t(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(e-=i.outerHeight(!0))}),this.headers.each(function(){e-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,e-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===s&&(e=0,this.headers.next().each(function(){var i=t(this).is(":visible");i||t(this).show(),e=Math.max(e,t(this).css("height","").height()),i||t(this).hide()}).height(e))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i,s,n=this.options,o=this.active,a=t(e.currentTarget),r=a[0]===o[0],l=r&&n.collapsible,h=l?t():a.next(),c=o.next(),u={oldHeader:o,oldPanel:c,newHeader:l?t():a,newPanel:h};e.preventDefault(),r&&!n.collapsible||this._trigger("beforeActivate",e,u)===!1||(n.active=l?!1:this.headers.index(a),this.active=r?t():a,this._toggle(u),this._removeClass(o,"ui-accordion-header-active","ui-state-active"),n.icons&&(i=o.children(".ui-accordion-header-icon"),this._removeClass(i,null,n.icons.activeHeader)._addClass(i,null,n.icons.header)),r||(this._removeClass(a,"ui-accordion-header-collapsed")._addClass(a,"ui-accordion-header-active","ui-state-active"),n.icons&&(s=a.children(".ui-accordion-header-icon"),this._removeClass(s,null,n.icons.header)._addClass(s,null,n.icons.activeHeader)),this._addClass(a.next(),"ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(t(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(t,e,i){var s,n,o,a=this,r=0,l=t.css("box-sizing"),h=t.length&&(!e.length||t.index()<e.index()),c=this.options.animate||{},u=h&&c.down||c,d=function(){a._toggleComplete(i)};return"number"==typeof u&&(o=u),"string"==typeof u&&(n=u),n=n||u.easing||c.easing,o=o||u.duration||c.duration,e.length?t.length?(s=t.show().outerHeight(),e.animate(this.hideProps,{duration:o,easing:n,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(this.showProps,{duration:o,easing:n,complete:d,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?"content-box"===l&&(r+=i.now):"content"!==a.options.heightStyle&&(i.now=Math.round(s-e.outerHeight()-r),r=0)}}),void 0):e.animate(this.hideProps,o,n,d):t.animate(this.showProps,o,n,d)},_toggleComplete:function(t){var e=t.oldPanel,i=e.prev();this._removeClass(e,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}}),t.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target),s=t(t.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.target).closest(".ui-menu-item"),s=t(e.currentTarget);i[0]===s[0]&&(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(e,s))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){var i=!t.contains(this.element[0],t.ui.safeActiveElement(this.document[0]));i&&this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){var e=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),i=e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),i.children().each(function(){var e=t(this);e.data("ui-menu-submenu-caret")&&e.remove()})},_keydown:function(e){var i,s,n,o,a=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:a=!1,s=this.previousFilter||"",o=!1,n=e.keyCode>=96&&105>=e.keyCode?""+(e.keyCode-96):String.fromCharCode(e.keyCode),clearTimeout(this.filterTimer),n===s?o=!0:n=s+n,i=this._filterMenuItems(n),i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(e.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(e,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}a&&e.preventDefault()},_activate:function(t){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i,s,n,o,a=this,r=this.options.icons.submenu,l=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),s=l.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.prev(),s=t("<span>").data("ui-menu-submenu-caret",!0);a._addClass(s,"ui-menu-icon","ui-icon "+r),i.attr("aria-haspopup","true").prepend(s),e.attr("aria-labelledby",i.attr("id"))}),this._addClass(s,"ui-menu","ui-widget ui-widget-content ui-front"),e=l.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);a._isDivider(e)&&a._addClass(e,"ui-menu-divider","ui-widget-content")}),n=i.not(".ui-menu-item, .ui-menu-divider"),o=n.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(n,"ui-menu-item")._addClass(o,"ui-menu-item-wrapper"),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){if("icons"===t){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,e.submenu)}this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t+""),this._toggleClass(null,"ui-state-disabled",!!t)},focus:function(t,e){var i,s,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.outerHeight(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",t,{item:this.active}),this.active=null)},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(e),void 0)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first())),void 0):(this.next(e),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))})}}),t.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,a="input"===n;this.isMultiLine=o||!a&&this._isContentEditable(this.element),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,void 0;e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),void 0):(this._searchTimeout(t),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(t),this._change(t),void 0)}}),this._initSource(),this.menu=t("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==t.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(e,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:n})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&t.trim(s).length&&(this.liveRegion.children().hide(),t("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,i){var s=i.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==t.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=n,this._delay(function(){this.previous=n,this.selectedItem=s})),!1!==this._trigger("select",e,{item:s})&&this._value(s.value),this.term=this._value(),this.close(e),this.selectedItem=s}}),this.liveRegion=t("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(e){var i=this.menu.element[0];return e.target===this.element[0]||e.target===i||t.contains(i,e.target)},_closeOnClickOutside:function(t){this._isEventTargetInWidget(t)||this.close()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){var e=this.term===this._value(),i=this.menu.element.is(":visible"),s=t.altKey||t.ctrlKey||t.metaKey||t.shiftKey;(!e||e&&!i&&!s)&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):void 0},_search:function(t){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<div>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[t](e),void 0):(this.search(null,e),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())},_isContentEditable:function(t){if(!t.length)return!1;var e=t.prop("contentEditable");return"inherit"===e?this._isContentEditable(t.parent()):"true"===e}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),t("<div>").text(i).appendTo(this.liveRegion))}}),t.ui.autocomplete;var d=/ui-corner-([a-z]){2,6}/g;t.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var e=this,i=[];t.each(this.options.items,function(s,n){var o,a={};return n?"controlgroupLabel"===s?(o=e.element.find(n),o.each(function(){var e=t(this);e.children(".ui-controlgroup-label-contents").length||e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),e._addClass(o,null,"ui-widget ui-widget-content ui-state-default"),i=i.concat(o.get()),void 0):(t.fn[s]&&(a=e["_"+s+"Options"]?e["_"+s+"Options"]("middle"):{classes:{}},e.element.find(n).each(function(){var n=t(this),o=n[s]("instance"),r=t.widget.extend({},a);if("button"!==s||!n.parent(".ui-spinner").length){o||(o=n[s]()[s]("instance")),o&&(r.classes=e._resolveClassesValues(r.classes,o)),n[s](r);var l=n[s]("widget");t.data(l[0],"ui-controlgroup-data",o?o:n[s]("instance")),i.push(l[0])}})),void 0):void 0}),this.childWidgets=t(t.unique(i)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(e){this.childWidgets.each(function(){var i=t(this),s=i.data("ui-controlgroup-data");s&&s[e]&&s[e]()})},_updateCornerClass:function(t,e){var i="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",s=this._buildSimpleOptions(e,"label").classes.label;this._removeClass(t,null,i),this._addClass(t,null,s)},_buildSimpleOptions:function(t,e){var i="vertical"===this.options.direction,s={classes:{}};return s.classes[e]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[t],s},_spinnerOptions:function(t){var e=this._buildSimpleOptions(t,"ui-spinner");return e.classes["ui-spinner-up"]="",e.classes["ui-spinner-down"]="",e},_buttonOptions:function(t){return this._buildSimpleOptions(t,"ui-button")},_checkboxradioOptions:function(t){return this._buildSimpleOptions(t,"ui-checkboxradio-label")},_selectmenuOptions:function(t){var e="vertical"===this.options.direction;return{width:e?"auto":!1,classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(e?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(e?"top":"left")},last:{"ui-selectmenu-button-open":e?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(e?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[t]}},_resolveClassesValues:function(e,i){var s={};return t.each(e,function(n){var o=i.options.classes[n]||"";o=t.trim(o.replace(d,"")),s[n]=(o+" "+e[n]).replace(/\s+/g," ")}),s},_setOption:function(t,e){return"direction"===t&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(t,e),"disabled"===t?(this._callChildMethod(e?"disable":"enable"),void 0):(this.refresh(),void 0)},refresh:function(){var e,i=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),e=this.childWidgets,this.options.onlyVisible&&(e=e.filter(":visible")),e.length&&(t.each(["first","last"],function(t,s){var n=e[s]().data("ui-controlgroup-data");if(n&&i["_"+n.widgetName+"Options"]){var o=i["_"+n.widgetName+"Options"](1===e.length?"only":s);o.classes=i._resolveClassesValues(o.classes,n),n.element[n.widgetName](o)}else i._updateCornerClass(e[s](),s)}),this._callChildMethod("refresh"))}}),t.widget("ui.checkboxradio",[t.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var e,i,s=this,n=this._super()||{};return this._readType(),i=this.element.labels(),this.label=t(i[i.length-1]),this.label.length||t.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element[0]).each(function(){s.originalLabel+=3===this.nodeType?t(this).text():this.outerHTML}),this.originalLabel&&(n.label=this.originalLabel),e=this.element[0].disabled,null!=e&&(n.disabled=e),n},_create:function(){var t=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),t&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var e=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===e&&/radio|checkbox/.test(this.type)||t.error("Can't create checkboxradio on element.nodeName="+e+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var e,i=this.element[0].name,s="input[name='"+t.ui.escapeSelector(i)+"']";return i?(e=this.form.length?t(this.form[0].elements).filter(s):t(s).filter(function(){return 0===t(this).form().length}),e.not(this.element)):t([])},_toggleClasses:function(){var e=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",e),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",e)._toggleClass(this.icon,null,"ui-icon-blank",!e),"radio"===this.type&&this._getRadioGroup().each(function(){var e=t(this).checkboxradio("instance");e&&e._removeClass(e.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(t,e){return"label"!==t||e?(this._super(t,e),"disabled"===t?(this._toggleClass(this.label,null,"ui-state-disabled",e),this.element[0].disabled=e,void 0):(this.refresh(),void 0)):void 0},_updateIcon:function(e){var i="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=t("<span>"),this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(i+=e?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,e?"ui-icon-blank":"ui-icon-check")):i+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",i),e||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)
},_updateLabel:function(){var t=this.label.contents().not(this.element[0]);this.icon&&(t=t.not(this.icon[0])),this.iconSpace&&(t=t.not(this.iconSpace[0])),t.remove(),this.label.append(this.options.label)},refresh:function(){var t=this.element[0].checked,e=this.element[0].disabled;this._updateIcon(t),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),null!==this.options.label&&this._updateLabel(),e!==this.options.disabled&&this._setOptions({disabled:e})}}]),t.ui.checkboxradio,t.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,e=this._super()||{};return this.isInput=this.element.is("input"),t=this.element[0].disabled,null!=t&&(e.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(e.label=this.originalLabel),e},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(e){e.keyCode===t.ui.keyCode.SPACE&&(e.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(e,i){var s="iconPosition"!==e,n=s?this.options.iconPosition:i,o="top"===n||"bottom"===n;this.icon?s&&this._removeClass(this.icon,null,this.options.icon):(this.icon=t("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),s&&this._addClass(this.icon,null,i),this._attachIcon(n),o?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(n))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var e=void 0===t.showLabel?this.options.showLabel:t.showLabel,i=void 0===t.icon?this.options.icon:t.icon;e||i||(t.showLabel=!0),this._super(t)},_setOption:function(t,e){"icon"===t&&(e?this._updateIcon(t,e):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===t&&this._updateIcon(t,e),"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!e),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(e):(this.element.html(e),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,e),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",e),this.element[0].disabled=e,e&&this.element.blur())},refresh:function(){var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),t.uiBackCompat!==!1&&(t.widget("ui.button",t.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,e){return"text"===t?(this._super("showLabel",e),void 0):("showLabel"===t&&(this.options.text=e),"icon"===t&&(this.options.icons.primary=e),"icons"===t&&(e.primary?(this._super("icon",e.primary),this._super("iconPosition","beginning")):e.secondary&&(this._super("icon",e.secondary),this._super("iconPosition","end"))),this._superApply(arguments),void 0)}}),t.fn.button=function(e){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?e.apply(this,arguments):(t.ui.checkboxradio||t.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(t.fn.button),t.fn.buttonset=function(){return t.ui.controlgroup||t.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),t.ui.button,t.extend(t.ui,{datepicker:{version:"1.12.1"}});var p;t.extend(s.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return a(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var s=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?n(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.on("focus",this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.on("click",function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,n,o){var r,l,h,c,u,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),a(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(l=document.documentElement.clientWidth,h=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+c,h/2-150+u]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),p===n&&(p=null))},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,s){var n,o,r,l,h=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):h?"all"===i?t.extend({},h.settings):this._get(h,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),h&&(this._curInst===h&&this._hideDatepicker(),o=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(h,"min"),l=this._getMinMaxDate(h,"max"),a(h.settings,n),null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(h.settings.minDate=this._formatDate(h,r)),null!==l&&void 0!==n.dateFormat&&void 0===n.maxDate&&(h.settings.maxDate=this._formatDate(h,l)),"disabled"in n&&(n.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),h),this._autoSize(h),this._setDate(h,o),this._updateAlternate(h),this._updateDatepicker(h)),void 0)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,s,n=t.datepicker._getInst(e.target);return t.datepicker._get(n,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!==e.nodeName.toLowerCase()&&(e=t("input",e.parentNode)[0]),!t.datepicker._isDisabledDatepicker(e)&&t.datepicker._lastInput!==e){var s,n,o,r,l,h,c;s=t.datepicker._getInst(e),t.datepicker._curInst&&t.datepicker._curInst!==s&&(t.datepicker._curInst.dpDiv.stop(!0,!0),s&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),n=t.datepicker._get(s,"beforeShow"),o=n?n.apply(e,[e,s]):{},o!==!1&&(a(s.settings,o),s.lastVal=null,t.datepicker._lastInput=e,t.datepicker._setDateFromField(s),t.datepicker._inDialog&&(e.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(e),t.datepicker._pos[1]+=e.offsetHeight),r=!1,t(e).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),l={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(s),l=t.datepicker._checkOffset(s,l,r),s.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:l.left+"px",top:l.top+"px"}),s.inline||(h=t.datepicker._get(s,"showAnim"),c=t.datepicker._get(s,"duration"),s.dpDiv.css("z-index",i(t(e))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?s.dpDiv.show(h,t.datepicker._get(s,"showOptions"),c):s.dpDiv[h||"show"](h?c:null),t.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),t.datepicker._curInst=s))}},_updateDatepicker:function(e){this.maxRows=4,p=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,s=this._getNumberOfMonths(e),n=s[1],a=17,r=e.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&e.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.trigger("focus"),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,l=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),h=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>l&&l>n?Math.abs(i.left+n-l):0),i.top-=Math.min(i.top,i.top+o>h&&h>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,a=this._curInst;!a||e&&a!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(a,"showAnim"),s=this._get(a,"duration"),n=function(){t.datepicker._tidyDialog(a)},t.effects&&(t.effects.effect[i]||t.effects[i])?a.dpDiv.hide(i,t.datepicker._get(a,"showOptions"),s,n):a.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(a,"onClose"),o&&o.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).val(n))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,s){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,o,a,r,l=0,h=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof h?h:(new Date).getFullYear()%100+parseInt(h,10),u=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,_=-1,v=-1,b=!1,y=function(t){var i=e.length>n+1&&e.charAt(n+1)===t;return i&&n++,i},w=function(t){var e=y(t),s="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n="y"===t?s:1,o=RegExp("^\\d{"+n+","+s+"}"),a=i.substring(l).match(o);if(!a)throw"Missing number at position "+l;return l+=a[0].length,parseInt(a[0],10)},k=function(e,s,n){var o=-1,a=t.map(y(e)?n:s,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(a,function(t,e){var s=e[1];return i.substr(l,s.length).toLowerCase()===s.toLowerCase()?(o=e[0],l+=s.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+l},x=function(){if(i.charAt(l)!==e.charAt(n))throw"Unexpected literal at position "+l;l++};for(n=0;e.length>n;n++)if(b)"'"!==e.charAt(n)||y("'")?x():b=!1;else switch(e.charAt(n)){case"d":_=w("d");break;case"D":k("D",u,d);break;case"o":v=w("o");break;case"m":g=w("m");break;case"M":g=k("M",p,f);break;case"y":m=w("y");break;case"@":r=new Date(w("@")),m=r.getFullYear(),g=r.getMonth()+1,_=r.getDate();break;case"!":r=new Date((w("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,_=r.getDate();break;case"'":y("'")?x():b=!0;break;default:x()}if(i.length>l&&(a=i.substr(l),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=m?0:-100)),v>-1)for(g=1,_=v;;){if(o=this._getDaysInMonth(m,g-1),o>=_)break;g++,_-=o}if(r=this._daylightSavingAdjust(new Date(m,g-1,_)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==_)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,l=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},h=function(t,e,i){var s=""+e;if(l(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return l(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||l("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=h("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=h("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=h("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=l("y")?e.getFullYear():(10>e.getFullYear()%100?"0":"")+e.getFullYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":l("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),l=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,h=l.exec(i);h;){switch(h[2]||"d"){case"d":case"D":r+=parseInt(h[1],10);break;case"w":case"W":r+=7*parseInt(h[1],10);break;case"m":case"M":a+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}h=l.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).on(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,l,h,c,u,d,p,f,m,g,_,v,b,y,w,k,x,C,D,T,I,M,P,S,N,A,H,z,O,E,W,F,L,R=new Date,Y=this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())),B=this._get(t,"isRTL"),j=this._get(t,"showButtonPanel"),q=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),U=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),$=this._get(t,"stepMonths"),X=1!==U[0]||1!==U[1],G=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),J=this._getMinMaxDate(t,"min"),Q=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),Q)for(e=this._daylightSavingAdjust(new Date(Q.getFullYear(),Q.getMonth()-U[0]*U[1]+1,Q.getDate())),e=J&&J>e?J:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-$,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>":q?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+$,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>":q?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?G:Y,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,l=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",h=j?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(B?l:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(B?"":l)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),m=this._get(t,"monthNamesShort"),g=this._get(t,"beforeShowDay"),_=this._get(t,"showOtherMonths"),v=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;U[0]>k;k++){for(x="",this.maxRows=4,C=0;U[1]>C;C++){if(D=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),T=" ui-corner-all",I="",X){if(I+="<div class='ui-datepicker-group",U[1]>1)switch(C){case 0:I+=" ui-datepicker-group-first",T=" ui-corner-"+(B?"right":"left");
break;case U[1]-1:I+=" ui-datepicker-group-last",T=" ui-corner-"+(B?"left":"right");break;default:I+=" ui-datepicker-group-middle",T=""}I+="'>"}for(I+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+T+"'>"+(/all|left/.test(T)&&0===k?B?o:s:"")+(/all|right/.test(T)&&0===k?B?s:o:"")+this._generateMonthYearHeader(t,Z,te,J,Q,k>0||C>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",M=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)P=(w+c)%7,M+="<th scope='col'"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[P]+"'>"+p[P]+"</span></th>";for(I+=M+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),N=(this._getFirstDayOfMonth(te,Z)-c+7)%7,A=Math.ceil((N+S)/7),H=X?this.maxRows>A?this.maxRows:A:A,this.maxRows=H,z=this._daylightSavingAdjust(new Date(te,Z,1-N)),O=0;H>O;O++){for(I+="<tr>",E=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(z)+"</td>":"",w=0;7>w;w++)W=g?g.apply(t.input?t.input[0]:null,[z]):[!0,""],F=z.getMonth()!==Z,L=F&&!v||!W[0]||J&&J>z||Q&&z>Q,E+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(z.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===z.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!_?"":" "+W[1]+(z.getTime()===G.getTime()?" "+this._currentClass:"")+(z.getTime()===Y.getTime()?" ui-datepicker-today":""))+"'"+(F&&!_||!W[2]?"":" title='"+W[2].replace(/'/g,"&#39;")+"'")+(L?"":" data-handler='selectDay' data-event='click' data-month='"+z.getMonth()+"' data-year='"+z.getFullYear()+"'")+">"+(F&&!_?"&#xa0;":L?"<span class='ui-state-default'>"+z.getDate()+"</span>":"<a class='ui-state-default"+(z.getTime()===Y.getTime()?" ui-state-highlight":"")+(z.getTime()===G.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+z.getDate()+"</a>")+"</td>",z.setDate(z.getDate()+1),z=this._daylightSavingAdjust(z);I+=E+"</tr>"}Z++,Z>11&&(Z=0,te++),I+="</tbody></table>"+(X?"</div>"+(U[0]>0&&C===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=I}y+=x}return y+=h,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var l,h,c,u,d,p,f,m,g=this._get(t,"changeMonth"),_=this._get(t,"changeYear"),v=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!g)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(l=s&&s.getFullYear()===i,h=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!l||c>=s.getMonth())&&(!h||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(v||(b+=y+(!o&&g&&_?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!_)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),m=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),v&&(b+=(!o&&g&&_?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.selectedYear+("Y"===i?e:0),n=t.selectedMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,l=this._get(t,"yearRange");return l&&(i=l.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).on("mousedown",t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new s,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.12.1",t.datepicker,t.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+t(this).css("z-index")}).get(),o=Math.max.apply(null,n);return o>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",o+1),s=!0),s&&!i&&this._trigger("focus",e),s},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=t(t.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var t=this._focusedElement;t||(t=this.element.find("[autofocus]")),t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).trigger("focus")},_keepFocus:function(e){function i(){var e=t.ui.safeActiveElement(this.document[0]),i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),void 0;if(e.keyCode===t.ui.keyCode.TAB&&!e.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(this._delay(function(){n.trigger("focus")}),e.preventDefault()):(this._delay(function(){s.trigger("focus")}),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=t("<button type='button'></button>").button({label:t("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(e,"ui-dialog-title"),this._title(e),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title?t.text(this.options.title):t.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this._removeClass(this.uiDialog,"ui-dialog-buttons"),void 0):(t.each(i,function(i,s){var n,o;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,o={icon:s.icon,iconPosition:s.iconPosition,showLabel:s.showLabel,icons:s.icons,text:s.text},delete s.click,delete s.icon,delete s.iconPosition,delete s.showLabel,delete s.icons,"boolean"==typeof s.text&&delete s.text,t("<button></button>",s).button(o).appendTo(e.uiButtonSet).on("click",function(){n.apply(e.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){i._addClass(t(this),"ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,o){var a=o.offset.left-i.document.scrollLeft(),r=o.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" "+"top"+(r>=0?"+":"")+r,of:i.window},i._removeClass(t(this),"ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,o=this.uiDialog.css("position"),a="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:a,start:function(s,n){i._addClass(t(this),"ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,o){var a=i.uiDialog.offset(),r=a.left-i.document.scrollLeft(),l=a.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(l>=0?"+":"")+l,of:i.window},i._removeClass(t(this),"ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(o))}}).css("position",o)},_trackFocus:function(){this._on(this.widget(),{focusin:function(e){this._makeFocusTarget(),this._focusedElement=t(e.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var e=this._trackingInstances(),i=t.inArray(this,e);-1!==i&&e.splice(i,1)},_trackingInstances:function(){var t=this.document.data("ui-dialog-instances");return t||(t=[],this.document.data("ui-dialog-instances",t)),t},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(e){var i=this,s=!1,n={};t.each(e,function(t,e){i._setOption(t,e),t in i.sizeRelatedOptions&&(s=!0),t in i.resizableRelatedOptions&&(n[t]=e)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,i){var s,n,o=this.uiDialog;"disabled"!==e&&(this._super(e,i),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:t("<a>").text(""+this.options.closeText).html()}),"draggable"===e&&(s=o.is(":data(ui-draggable)"),s&&!i&&o.draggable("destroy"),!s&&i&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(n=o.is(":data(ui-resizable)"),n&&!i&&o.resizable("destroy"),n&&"string"==typeof i&&o.resizable("option","handles",i),n||i===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=!0;this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(t){e||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=t("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var t=this.document.data("ui-dialog-overlays")-1;t?this.document.data("ui-dialog-overlays",t):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(t,e){"dialogClass"===t&&this.uiDialog.removeClass(this.options.dialogClass).addClass(e),this._superApply(arguments)}}),t.ui.dialog,t.widget("ui.progressbar",{version:"1.12.1",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=t("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(t){return void 0===t?this.options.value:(this.options.value=this._constrainedValue(t),this._refreshValue(),void 0)},_constrainedValue:function(t){return void 0===t&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).width(i.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,e===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}}),t.widget("ui.selectmenu",[t.ui.formResetMixin,{version:"1.12.1",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=t()},_drawButton:function(){var e,i=this,s=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=t("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),e=t("<span>").appendTo(this.button),this._addClass(e,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(s).appendTo(this.button),this.options.width!==!1&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){i._rendered||i._refreshMenu()})},_drawMenu:function(){var e=this;this.menu=t("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=t("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(t,i){t.preventDefault(),e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var s=i.item.data("ui-selectmenu-item");null!=e.focusIndex&&s.index!==e.focusIndex&&(e._trigger("focus",t,{item:s}),e.isOpen||e._select(s,t)),e.focusIndex=s.index,e.button.attr("aria-activedescendant",e.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var t,e=this.element.find("option");this.menu.empty(),this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,e.length&&(t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this._rendered?(this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t)))},_position:function(){this.menuWrap.position(t.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(e){var i=t("<span>");return this._setText(i,e.label),this._addClass(i,"ui-selectmenu-text"),i},_renderMenu:function(e,i){var s=this,n="";t.each(i,function(i,o){var a;o.optgroup!==n&&(a=t("<li>",{text:o.optgroup}),s._addClass(a,"ui-selectmenu-optgroup","ui-menu-divider"+(o.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),a.appendTo(e),n=o.optgroup),s._renderItemData(e,o)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(e,i){var s=t("<li>"),n=t("<div>",{title:i.element.attr("title")});return i.disabled&&this._addClass(s,null,"ui-state-disabled"),this._setText(n,i.label),s.append(n).appendTo(e)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),n+=":not(.ui-state-disabled)"),s="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](n).eq(-1):i[t+"All"](n).eq(0),s.length&&this.menuInstance.focus(e,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?(t=window.getSelection(),t.removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&(t(e.target).closest(".ui-selectmenu-menu, #"+t.ui.escapeSelector(this.ids.button)).length||this.close(e))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection(),t.rangeCount&&(this.range=t.getRangeAt(0))):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(e){var i=!0;switch(e.keyCode){case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:this.close(e),i=!1;break;case t.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case t.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case t.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case t.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case t.ui.keyCode.LEFT:this._move("prev",e);break;case t.ui.keyCode.RIGHT:this._move("next",e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:this._move("first",e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),i=!1}i&&e.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex).parent("li");e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(t)),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){if("icons"===t){var i=this.button.find("span.ui-icon");this._removeClass(i,null,this.options.icons.button)._addClass(i,null,e.button)}this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"width"===t&&this._resizeButton()},_setOptionDisabled:function(t){this._super(t),this.menuInstance.option("disabled",t),this.button.attr("aria-disabled",t),this._toggleClass(this.button,null,"ui-state-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;return t===!1?(this.button.css("width",""),void 0):(null===t&&(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t),void 0)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var t=this._super();return t.disabled=this.element.prop("disabled"),t},_parseOptions:function(e){var i=this,s=[];e.each(function(e,n){s.push(i._parseOption(t(n),e))}),this.items=s},_parseOption:function(t,e){var i=t.parent("optgroup");return{element:t,index:e,value:t.val(),label:t.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||t.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}]),t.widget("ui.slider",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle"),o="<span tabindex='0'></span>",a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)a.push(o);this.handles=n.add(t(a.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e).attr("tabIndex",0)})},_createRange:function(){var e=this.options;e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=t("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),("min"===e.range||"max"===e.range)&&this._addClass(this.range,"ui-slider-range-"+e.range)):(this.range&&this.range.remove(),this.range=null)
},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,o,a,r,l,h,c=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-c.values(e));(n>i||n===i&&(e===c._lastChangedValue||c.values(e)===u.min))&&(n=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,this._addClass(o,null,"ui-state-active"),o.trigger("focus"),l=o.offset(),h=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=h?{left:0,top:0}:{left:e.pageX-l.left-o.width()/2,top:e.pageY-l.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),o=this._valueMin()+s*n,this._trimAlignValue(o)},_uiHash:function(t,e,i){var s={handle:this.handles[t],handleIndex:t,value:void 0!==e?e:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==e?e:this.values(t),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(t,e){return this._trigger("start",t,this._uiHash(e))},_slide:function(t,e,i){var s,n,o=this.value(),a=this.values();this._hasMultipleValues()&&(n=this.values(e?0:1),o=this.values(e),2===this.options.values.length&&this.options.range===!0&&(i=0===e?Math.min(n,i):Math.max(n,i)),a[e]=i),i!==o&&(s=this._trigger("slide",t,this._uiHash(e,i,a)),s!==!1&&(this._hasMultipleValues()?this.values(e,i):this.value(i)))},_stop:function(t,e){this._trigger("stop",t,this._uiHash(e))},_change:function(t,e){this._keySliding||this._mouseSliding||(this._lastChangedValue=e,this._trigger("change",t,this._uiHash(e)))},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(e,i){var s,n,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),void 0;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this._hasMultipleValues()?this._values(e):this.value();for(s=this.options.values,n=arguments[0],o=0;s.length>o;o+=1)s[o]=this._trimAlignValue(n[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),this._super(e,i),e){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=n-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(t){this._super(t),this._toggleClass(null,"ui-state-disabled",!!t)},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step,s=Math.round((t-e)/i)*i;t=s+e,t>this.options.max&&(t-=i),this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(t){"vertical"===t&&this.range.css({width:"",left:""}),"horizontal"===t&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var e,i,s,n,o,a=this.options.range,r=this.options,l=this,h=this._animateOff?!1:r.animate,c={};this._hasMultipleValues()?this.handles.each(function(s){i=100*((l.values(s)-l._valueMin())/(l._valueMax()-l._valueMin())),c["horizontal"===l.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[h?"animate":"css"](c,r.animate),l.options.range===!0&&("horizontal"===l.orientation?(0===s&&l.range.stop(1,1)[h?"animate":"css"]({left:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&l.range.stop(1,1)[h?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),o=this._valueMax(),i=o!==n?100*((s-n)/(o-n)):0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[h?"animate":"css"](c,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:100-i+"%"},r.animate),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:100-i+"%"},r.animate))},_handleEvents:{keydown:function(e){var i,s,n,o,a=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(t(e.target),null,"ui-state-active"),i=this._start(e,a),i===!1))return}switch(o=this.options.step,s=n=this._hasMultipleValues()?this.values(a):this.value(),e.keyCode){case t.ui.keyCode.HOME:n=this._valueMin();break;case t.ui.keyCode.END:n=this._valueMax();break;case t.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-o)}this._slide(e,a,n)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),this._removeClass(t(e.target),null,"ui-state-active"))}}}),t.widget("ui.spinner",{version:"1.12.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e=this._super(),i=this.element;return t.each(["min","max","step"],function(t,s){var n=i.attr(s);null!=n&&n.length&&(e[s]=n)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t),void 0)},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var e=this.element[0]===t.ui.safeActiveElement(this.document[0]);e||(this.element.trigger("focus"),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===t.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:(this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(e){var i=this.options,s=t.ui.keyCode;switch(e.keyCode){case s.UP:return this._repeat(null,1,e),!0;case s.DOWN:return this._repeat(null,-1,e),!0;case s.PAGE_UP:return this._repeat(null,i.page,e),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,s=this.options;return e=null!==s.min?s.min:0,i=t-e,i=Math.round(i/s.step)*s.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==s.max&&t>s.max?s.max:null!==s.min&&s.min>t?s.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){var i,s,n;return"culture"===t||"numberFormat"===t?(i=this._parse(this.element.val()),this.options[t]=e,this.element.val(this._format(i)),void 0):(("max"===t||"min"===t||"step"===t)&&"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(s=this.buttons.first().find(".ui-icon"),this._removeClass(s,null,this.options.icons.up),this._addClass(s,null,e.up),n=this.buttons.last().find(".ui-icon"),this._removeClass(n,null,this.options.icons.down),this._addClass(n,null,e.down)),this._super(t,e),void 0)},_setOptionDisabled:function(t){this._super(t),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable")},_setOptions:r(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null===t?!1:t===this._adjustValue(t)},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:r(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:r(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:r(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:r(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?(r(this._value).call(this,t),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),t.uiBackCompat!==!1&&t.widget("ui.spinner",t.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}}),t.ui.spinner,t.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var t=/#.*$/;return function(e){var i,s;i=e.href.replace(t,""),s=location.href.replace(t,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return e.hash.length>1&&i===s}}(),_create:function(){var e=this,i=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,i.collapsible),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var e=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===e&&(s&&this.tabs.each(function(i,n){return t(n).attr("aria-controls")===s?(e=i,!1):void 0}),null===e&&(e=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===e||-1===e)&&(e=this.tabs.length?0:!1)),e!==!1&&(e=this.tabs.index(this.tabs.eq(e)),-1===e&&(e=i?!1:0)),!i&&e===!1&&this.anchors.length&&(e=0),e},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(e){var i=t(t.ui.safeActiveElement(this.document[0])).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(e)){switch(e.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:s++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:n=!1,s--;break;case t.ui.keyCode.END:s=this.anchors.length-1;break;case t.ui.keyCode.HOME:s=0;break;case t.ui.keyCode.SPACE:return e.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case t.ui.keyCode.ENTER:return e.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}e.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),e.ctrlKey||e.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(e){return e.altKey&&e.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):e.altKey&&e.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).trigger("focus"),t},_setOption:function(t,e){return"active"===t?(this._activate(e),void 0):(this._super(t,e),"collapsible"===t&&(this._toggleClass("ui-tabs-collapsible",null,e),e||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(e),"heightStyle"===t&&this._setupHeightStyle(e),void 0)},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=t(),this.anchors.each(function(i,s){var n,o,a,r=t(s).uniqueId().attr("id"),l=t(s).closest("li"),h=l.attr("aria-controls");e._isLocal(s)?(n=s.hash,a=n.substring(1),o=e.element.find(e._sanitizeSelector(n))):(a=l.attr("aria-controls")||t({}).uniqueId()[0].id,n="#"+a,o=e.element.find(n),o.length||(o=e._createPanel(a),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),h&&l.data("ui-tabs-aria-controls",h),l.attr({"aria-controls":a,"aria-labelledby":r}),o.attr("aria-labelledby",r)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(e){var i,s,n;for(t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1),n=0;s=this.tabs[n];n++)i=t(s),e===!0||-1!==t.inArray(n,e)?(i.attr("aria-disabled","true"),this._addClass(i,null,"ui-state-disabled")):(i.removeAttr("aria-disabled"),this._removeClass(i,null,"ui-state-disabled"));this.options.disabled=e,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,e===!0)},_setupEvents:function(e){var i={};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n.closest("li"),a=o[0]===s[0],r=a&&i.collapsible,l=r?t():this._getPanelForTab(o),h=s.length?this._getPanelForTab(s):t(),c={oldTab:s,oldPanel:h,newTab:r?t():o,newPanel:l};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||a&&!i.collapsible||this._trigger("beforeActivate",e,c)===!1||(i.active=r?!1:this.tabs.index(o),this.active=a?t():o,this.xhr&&this.xhr.abort(),h.length||l.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),l.length&&this.load(this.tabs.index(o),e),this._toggle(e,c))},_toggle:function(e,i){function s(){o.running=!1,o._trigger("activate",e,i)}function n(){o._addClass(i.newTab.closest("li"),"ui-tabs-active","ui-state-active"),a.length&&o.options.show?o._show(a,o.options.show,s):(a.show(),s())}var o=this,a=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){o._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),n()}):(this._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),a.length&&r.length?i.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+t.ui.escapeSelector(e)+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(e){var i=this.options.disabled;i!==!1&&(void 0===e?i=!1:(e=this._getIndex(e),i=t.isArray(i)?t.map(i,function(t){return t!==e?t:null}):t.map(this.tabs,function(t,i){return i!==e?i:null})),this._setOptionDisabled(i))},disable:function(e){var i=this.options.disabled;if(i!==!0){if(void 0===e)i=!0;else{if(e=this._getIndex(e),-1!==t.inArray(e,i))return;i=t.isArray(i)?t.merge([e],i).sort():[e]}this._setOptionDisabled(i)}},load:function(e,i){e=this._getIndex(e);var s=this,n=this.tabs.eq(e),o=n.find(".ui-tabs-anchor"),a=this._getPanelForTab(n),r={tab:n,panel:a},l=function(t,e){"abort"===e&&s.panels.stop(!1,!0),s._removeClass(n,"ui-tabs-loading"),a.removeAttr("aria-busy"),t===s.xhr&&delete s.xhr};this._isLocal(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(n,"ui-tabs-loading"),a.attr("aria-busy","true"),this.xhr.done(function(t,e,n){setTimeout(function(){a.html(t),s._trigger("load",i,r),l(n,e)},1)}).fail(function(t,e){setTimeout(function(){l(t,e)},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href").replace(/#.*$/,""),beforeSend:function(e,o){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),t.uiBackCompat!==!1&&t.widget("ui.tabs",t.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),t.ui.tabs,t.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))},_removeDescribedBy:function(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=t([])},_setOption:function(e,i){var s=this;this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e.element)})},_setOptionDisabled:function(t){this[t?"_disable":"_enable"]()},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s.element[0],e.close(n,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var e=t(this);return e.is("[title]")?e.data("ui-tooltip-title",e.attr("title")).removeAttr("title"):void 0}))},_enable:function(){this.disabledTitles.each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))}),this.disabledTitles=t([])},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._registerCloseHandlers(e,s),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,o=e?e.type:null;return"string"==typeof s||s.nodeType||s.jquery?this._open(e,t,s):(i=s.call(t[0],function(i){n._delay(function(){t.data("ui-tooltip-open")&&(e&&(e.type=o),this._open(e,t,i))})}),i&&this._open(e,t,i),void 0)},_open:function(e,i,s){function n(t){h.of=t,a.is(":hidden")||a.position(h)}var o,a,r,l,h=t.extend({},this.options.position);if(s){if(o=this._find(i))return o.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(e&&"mouseover"===e.type?i.attr("title",""):i.removeAttr("title")),o=this._tooltip(i),a=o.tooltip,this._addDescribedBy(i,a.attr("id")),a.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),l=t("<div>").html(a.find(".ui-tooltip-content").html()),l.removeAttr("name").find("[name]").removeAttr("name"),l.removeAttr("id").find("[id]").removeAttr("id"),l.appendTo(this.liveRegion),this.options.track&&e&&/^mouse/.test(e.type)?(this._on(this.document,{mousemove:n}),n(e)):a.position(t.extend({of:i},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(r=this.delayedShow=setInterval(function(){a.is(":visible")&&(n(h.of),clearInterval(r))},t.fx.interval)),this._trigger("open",e,{tooltip:a})}},_registerCloseHandlers:function(e,i){var s={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var s=t.Event(e);s.currentTarget=i[0],this.close(s,!0)}}};i[0]!==this.element[0]&&(s.remove=function(){this._removeTooltip(this._find(i).tooltip)}),e&&"mouseover"!==e.type||(s.mouseleave="close"),e&&"focusin"!==e.type||(s.focusout="close"),this._on(!0,i,s)},close:function(e){var i,s=this,n=t(e?e.currentTarget:this.element),o=this._find(n);return o?(i=o.tooltip,o.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),o.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]
}),o.closing=!0,this._trigger("close",e,{tooltip:i}),o.hiding||(o.closing=!1)),void 0):(n.removeData("ui-tooltip-open"),void 0)},_tooltip:function(e){var i=t("<div>").attr("role","tooltip"),s=t("<div>").appendTo(i),n=i.uniqueId().attr("id");return this._addClass(s,"ui-tooltip-content"),this._addClass(i,"ui-tooltip","ui-widget ui-widget-content"),i.appendTo(this._appendTo(e)),this.tooltips[n]={element:e,tooltip:i}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_appendTo:function(t){var e=t.closest(".ui-front, dialog");return e.length||(e=this.document[0].body),e},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur"),o=s.element;n.target=n.currentTarget=o[0],e.close(n,!0),t("#"+i).remove(),o.data("ui-tooltip-title")&&(o.attr("title")||o.attr("title",o.data("ui-tooltip-title")),o.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),t.uiBackCompat!==!1&&t.widget("ui.tooltip",t.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var t=this._superApply(arguments);return this.options.tooltipClass&&t.tooltip.addClass(this.options.tooltipClass),t}}),t.ui.tooltip;var f="ui-effects-",m="ui-effects-style",g="ui-effects-animated",_=t;t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=h(),n=s._rgba=[];return i=i.toLowerCase(),f(l,function(t,o){var a,r=o.re.exec(i),l=r&&o.parse(r),h=o.space||"rgba";return l?(a=s[h](l),s[c[h].cache]=a[c[h].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(n,a,r,l){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,l],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof h?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=h(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=h(t),n=s._space(),o=c[n],a=0===this.alpha()?h("transparent"):this,r=a[o.cache]||o.to(a._rgba),l=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],h=s[o],c=u[n.type]||{};null!==h&&(null===a?l[o]=h:(c.mod&&(h-a>c.mod/2?a+=c.mod:a-h>c.mod/2&&(a-=c.mod)),l[o]=i((h-a)*e+a,n)))}),this[n](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=h(e)._rgba;return h(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),l=Math.min(s,n,o),h=r-l,c=r+l,u=.5*c;return e=l===r?0:s===r?60*(n-o)/h+360:n===r?60*(o-s)/h+120:60*(s-n)/h+240,i=0===h?0:.5>=u?h/c:h/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,l=n.to,c=n.from;h.fn[s]=function(s){if(l&&!this[a]&&(this[a]=l(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=h(c(d)),n[a]=d,n):h(d)},f(o,function(e,i){h.fn[e]||(h.fn[e]=function(n){var o,a=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,h=this[l](),c=h[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),h[i.idx]=n,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=h(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(l){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(_),function(){function e(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function i(e,i){var s,o,a={};for(s in i)o=i[s],e[s]!==o&&(n[s]||(t.fx.step[s]||!isNaN(parseFloat(o)))&&(a[s]=o));return a}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(_.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(n,o,a,r){var l=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",h=l.children?a.find("*").addBack():a;h=h.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){n[e]&&a[e+"Class"](n[e])})},o(),h=h.map(function(){return this.end=e(this.el[0]),this.diff=i(this.start,this.end),this}),a.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),s=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,h.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,s,n,o,a){return"boolean"==typeof s||void 0===s?n?t.effects.animateClass.call(this,s?{add:i}:{remove:i},n,o,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},s,n,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function e(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function i(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}function s(t,e){var i=e.outerWidth(),s=e.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,o=n.exec(t)||["",0,i,s,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?i:parseFloat(o[2]),bottom:"auto"===o[3]?s:parseFloat(o[3]),left:parseFloat(o[4])||0}}t.expr&&t.expr.filters&&t.expr.filters.animated&&(t.expr.filters.animated=function(e){return function(i){return!!t(i).data(g)||e(i)}}(t.expr.filters.animated)),t.uiBackCompat!==!1&&t.extend(t.effects,{save:function(t,e){for(var i=0,s=e.length;s>i;i++)null!==e[i]&&t.data(f+e[i],t[0].style[e[i]])},restore:function(t,e){for(var i,s=0,n=e.length;n>s;s++)null!==e[s]&&(i=t.data(f+e[s]),t.css(e[s],i))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).trigger("focus"),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).trigger("focus")),e}}),t.extend(t.effects,{version:"1.12.1",define:function(e,i,s){return s||(s=i,i="effect"),t.effects.effect[e]=s,t.effects.effect[e].mode=i,s},scaledDimensions:function(t,e,i){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(e||100)/100:1,n="vertical"!==i?(e||100)/100:1;return{height:t.height()*n,width:t.width()*s,outerHeight:t.outerHeight()*n,outerWidth:t.outerWidth()*s}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,i){var s=t.queue();e>1&&s.splice.apply(s,[1,0].concat(s.splice(e,i))),t.dequeue()},saveStyle:function(t){t.data(m,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(m)||"",t.removeData(m)},mode:function(t,e){var i=t.is(":hidden");return"toggle"===e&&(e=i?"show":"hide"),(i?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createPlaceholder:function(e){var i,s=e.css("position"),n=e.position();return e.css({marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()),/^(static|relative)/.test(s)&&(s="absolute",i=t("<"+e[0].nodeName+">").insertAfter(e).css({display:/^(inline|ruby)/.test(e.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight"),"float":e.css("float")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"),e.data(f+"placeholder",i)),e.css({position:s,left:n.left,top:n.top}),i},removePlaceholder:function(t){var e=f+"placeholder",i=t.data(e);i&&(i.remove(),t.removeData(e))},cleanUp:function(e){t.effects.restoreStyle(e),t.effects.removePlaceholder(e)},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function i(e){function i(){r.removeData(g),t.effects.cleanUp(r),"hide"===s.mode&&r.hide(),a()}function a(){t.isFunction(l)&&l.call(r[0]),t.isFunction(e)&&e()}var r=t(this);s.mode=c.shift(),t.uiBackCompat===!1||o?"none"===s.mode?(r[h](),a()):n.call(r[0],s,i):(r.is(":hidden")?"hide"===h:"show"===h)?(r[h](),a()):n.call(r[0],s,a)}var s=e.apply(this,arguments),n=t.effects.effect[s.effect],o=n.mode,a=s.queue,r=a||"fx",l=s.complete,h=s.mode,c=[],u=function(e){var i=t(this),s=t.effects.mode(i,h)||o;i.data(g,!0),c.push(s),o&&("show"===s||s===o&&"hide"===s)&&i.show(),o&&"none"===s||t.effects.saveStyle(i),t.isFunction(e)&&e()};return t.fx.off||!n?h?this[h](s.duration,l):this.each(function(){l&&l.call(this)}):a===!1?this.each(u).each(i):this.queue(r,u).queue(r,i)},show:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(t.fn.show),hide:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(t.fn.hide),toggle:function(t){return function(s){if(i(s)||"boolean"==typeof s)return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):s(this.css("clip"),this)},transfer:function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,l=o?a.scrollLeft():0,h=n.offset(),c={top:h.top-r,left:h.left-l,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({top:u.top-r,left:u.left-l,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),t.isFunction(i)&&i()})}}),t.fx.step.clip=function(e){e.clipInit||(e.start=t(e.elem).cssClip(),"string"==typeof e.end&&(e.end=s(e.end,e.elem)),e.clipInit=!0),t(e.elem).cssClip({top:e.pos*(e.end.top-e.start.top)+e.start.top,right:e.pos*(e.end.right-e.start.right)+e.start.right,bottom:e.pos*(e.end.bottom-e.start.bottom)+e.start.bottom,left:e.pos*(e.end.left-e.start.left)+e.start.left})}}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}();var v=t.effects;t.effects.define("blind","hide",function(e,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},n=t(this),o=e.direction||"up",a=n.cssClip(),r={clip:t.extend({},a)},l=t.effects.createPlaceholder(n);r.clip[s[o][0]]=r.clip[s[o][1]],"show"===e.mode&&(n.cssClip(r.clip),l&&l.css(t.effects.clipToBox(r)),r.clip=a),l&&l.animate(t.effects.clipToBox(r),e.duration,e.easing),n.animate(r,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("bounce",function(e,i){var s,n,o,a=t(this),r=e.mode,l="hide"===r,h="show"===r,c=e.direction||"up",u=e.distance,d=e.times||5,p=2*d+(h||l?1:0),f=e.duration/p,m=e.easing,g="up"===c||"down"===c?"top":"left",_="up"===c||"left"===c,v=0,b=a.queue().length;for(t.effects.createPlaceholder(a),o=a.css(g),u||(u=a["top"===g?"outerHeight":"outerWidth"]()/3),h&&(n={opacity:1},n[g]=o,a.css("opacity",0).css(g,_?2*-u:2*u).animate(n,f,m)),l&&(u/=Math.pow(2,d-1)),n={},n[g]=o;d>v;v++)s={},s[g]=(_?"-=":"+=")+u,a.animate(s,f,m).animate(n,f,m),u=l?2*u:u/2;l&&(s={opacity:0},s[g]=(_?"-=":"+=")+u,a.animate(s,f,m)),a.queue(i),t.effects.unshift(a,b,p+1)}),t.effects.define("clip","hide",function(e,i){var s,n={},o=t(this),a=e.direction||"vertical",r="both"===a,l=r||"horizontal"===a,h=r||"vertical"===a;s=o.cssClip(),n.clip={top:h?(s.bottom-s.top)/2:s.top,right:l?(s.right-s.left)/2:s.right,bottom:h?(s.bottom-s.top)/2:s.bottom,left:l?(s.right-s.left)/2:s.left},t.effects.createPlaceholder(o),"show"===e.mode&&(o.cssClip(n.clip),n.clip=s),o.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("drop","hide",function(e,i){var s,n=t(this),o=e.mode,a="show"===o,r=e.direction||"left",l="up"===r||"down"===r?"top":"left",h="up"===r||"left"===r?"-=":"+=",c="+="===h?"-=":"+=",u={opacity:0};t.effects.createPlaceholder(n),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,u[l]=h+s,a&&(n.css(u),u[l]=c+s,u.opacity=1),n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("explode","hide",function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),i()}var o,a,r,l,h,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=e.mode,m="show"===f,g=p.show().css("visibility","hidden").offset(),_=Math.ceil(p.outerWidth()/d),v=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(l=g.top+o*v,c=o-(u-1)/2,a=0;d>a;a++)r=g.left+a*_,h=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*_,top:-o*v}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_,height:v,left:r+(m?h*_:0),top:l+(m?c*v:0),opacity:m?0:1}).animate({left:r+(m?0:h*_),top:l+(m?0:c*v),opacity:m?1:0},e.duration||500,e.easing,s)}),t.effects.define("fade","toggle",function(e,i){var s="show"===e.mode;t(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("fold","hide",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=e.size||15,l=/([0-9]+)%/.exec(r),h=!!e.horizFirst,c=h?["right","bottom"]:["bottom","right"],u=e.duration/2,d=t.effects.createPlaceholder(s),p=s.cssClip(),f={clip:t.extend({},p)},m={clip:t.extend({},p)},g=[p[c[0]],p[c[1]]],_=s.queue().length;l&&(r=parseInt(l[1],10)/100*g[a?0:1]),f.clip[c[0]]=r,m.clip[c[0]]=r,m.clip[c[1]]=0,o&&(s.cssClip(m.clip),d&&d.css(t.effects.clipToBox(m)),m.clip=p),s.queue(function(i){d&&d.animate(t.effects.clipToBox(f),u,e.easing).animate(t.effects.clipToBox(m),u,e.easing),i()}).animate(f,u,e.easing).animate(m,u,e.easing).queue(i),t.effects.unshift(s,_,4)}),t.effects.define("highlight","show",function(e,i){var s=t(this),n={backgroundColor:s.css("backgroundColor")};"hide"===e.mode&&(n.opacity=0),t.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("size",function(e,i){var s,n,o,a=t(this),r=["fontSize"],l=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],c=e.mode,u="effect"!==c,d=e.scale||"both",p=e.origin||["middle","center"],f=a.css("position"),m=a.position(),g=t.effects.scaledDimensions(a),_=e.from||g,v=e.to||t.effects.scaledDimensions(a,0);t.effects.createPlaceholder(a),"show"===c&&(o=_,_=v,v=o),n={from:{y:_.height/g.height,x:_.width/g.width},to:{y:v.height/g.height,x:v.width/g.width}},("box"===d||"both"===d)&&(n.from.y!==n.to.y&&(_=t.effects.setTransition(a,l,n.from.y,_),v=t.effects.setTransition(a,l,n.to.y,v)),n.from.x!==n.to.x&&(_=t.effects.setTransition(a,h,n.from.x,_),v=t.effects.setTransition(a,h,n.to.x,v))),("content"===d||"both"===d)&&n.from.y!==n.to.y&&(_=t.effects.setTransition(a,r,n.from.y,_),v=t.effects.setTransition(a,r,n.to.y,v)),p&&(s=t.effects.getBaseline(p,g),_.top=(g.outerHeight-_.outerHeight)*s.y+m.top,_.left=(g.outerWidth-_.outerWidth)*s.x+m.left,v.top=(g.outerHeight-v.outerHeight)*s.y+m.top,v.left=(g.outerWidth-v.outerWidth)*s.x+m.left),a.css(_),("content"===d||"both"===d)&&(l=l.concat(["marginTop","marginBottom"]).concat(r),h=h.concat(["marginLeft","marginRight"]),a.find("*[width]").each(function(){var i=t(this),s=t.effects.scaledDimensions(i),o={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},a={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x};n.from.y!==n.to.y&&(o=t.effects.setTransition(i,l,n.from.y,o),a=t.effects.setTransition(i,l,n.to.y,a)),n.from.x!==n.to.x&&(o=t.effects.setTransition(i,h,n.from.x,o),a=t.effects.setTransition(i,h,n.to.x,a)),u&&t.effects.saveStyle(i),i.css(o),i.animate(a,e.duration,e.easing,function(){u&&t.effects.restoreStyle(i)})})),a.animate(v,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){var e=a.offset();0===v.opacity&&a.css("opacity",_.opacity),u||(a.css("position","static"===f?"relative":f).offset(e),t.effects.saveStyle(a)),i()}})}),t.effects.define("scale",function(e,i){var s=t(this),n=e.mode,o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"effect"!==n?0:100),a=t.extend(!0,{from:t.effects.scaledDimensions(s),to:t.effects.scaledDimensions(s,o,e.direction||"both"),origin:e.origin||["middle","center"]},e);e.fade&&(a.from.opacity=1,a.to.opacity=0),t.effects.effect.size.call(this,a,i)}),t.effects.define("puff","hide",function(e,i){var s=t.extend(!0,{},e,{fade:!0,percent:parseInt(e.percent,10)||150});t.effects.effect.scale.call(this,s,i)}),t.effects.define("pulsate","show",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=o||a,l=2*(e.times||5)+(r?1:0),h=e.duration/l,c=0,u=1,d=s.queue().length;for((o||!s.is(":visible"))&&(s.css("opacity",0).show(),c=1);l>u;u++)s.animate({opacity:c},h,e.easing),c=1-c;s.animate({opacity:c},h,e.easing),s.queue(i),t.effects.unshift(s,d,l+1)}),t.effects.define("shake",function(e,i){var s=1,n=t(this),o=e.direction||"left",a=e.distance||20,r=e.times||3,l=2*r+1,h=Math.round(e.duration/l),c="up"===o||"down"===o?"top":"left",u="up"===o||"left"===o,d={},p={},f={},m=n.queue().length;for(t.effects.createPlaceholder(n),d[c]=(u?"-=":"+=")+a,p[c]=(u?"+=":"-=")+2*a,f[c]=(u?"-=":"+=")+2*a,n.animate(d,h,e.easing);r>s;s++)n.animate(p,h,e.easing).animate(f,h,e.easing);n.animate(p,h,e.easing).animate(d,h/2,e.easing).queue(i),t.effects.unshift(n,m,l+1)}),t.effects.define("slide","show",function(e,i){var s,n,o=t(this),a={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},r=e.mode,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,u=e.distance||o["top"===h?"outerHeight":"outerWidth"](!0),d={};t.effects.createPlaceholder(o),s=o.cssClip(),n=o.position()[h],d[h]=(c?-1:1)*u+n,d.clip=o.cssClip(),d.clip[a[l][1]]=d.clip[a[l][0]],"show"===r&&(o.cssClip(d.clip),o.css(h,d[h]),d.clip=s,d[h]=n),o.animate(d,{queue:!1,duration:e.duration,easing:e.easing,complete:i})});var v;t.uiBackCompat!==!1&&(v=t.effects.define("transfer",function(e,i){t(this).transfer(e,i)}))});
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(){}function t(e){if(!(this instanceof t))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],u(e,this)}function o(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,t._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(f){return void i(n.promise,f)}r(n.promise,o)}else(1===e._state?r:i)(n.promise,e._value)})):e._deferreds.push(n)}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var o=n.then;if(n instanceof t)return e._state=3,e._value=n,void f(e);if("function"==typeof o)return void u(function(e,n){return function(){e.apply(n,arguments)}}(o,n),e)}e._state=1,e._value=n,f(e)}catch(r){i(e,r)}}function i(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&t._immediateFn(function(){e._handled||t._unhandledRejectionFn(e._value)});for(var n=0,r=e._deferreds.length;r>n;n++)o(e,e._deferreds[n]);e._deferreds=null}function u(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,i(n,e))})}catch(o){if(t)return;t=!0,i(n,o)}}var c=setTimeout;t.prototype["catch"]=function(e){return this.then(null,e)},t.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,t,r)),r},t.prototype["finally"]=e,t.all=function(e){return new t(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},t.resolve=function(e){return e&&"object"==typeof e&&e.constructor===t?e:new t(function(n){n(e)})},t.reject=function(e){return new t(function(n,t){t(e)})},t.race=function(e){return new t(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},t._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},t._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=e):l.Promise=t});

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.WHATWGFetch = {})));
}(this, (function (exports) { 'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

// Avoid `console` errors in browsers that lack a console.
if(!(window.console&&console.log)){(function(){var a=function(){};var b=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","markTimeline","table","time","timeEnd","timeStamp","trace","warn"];var c=b.length;var d=window.console={};while(c--){d[b[c]]=a}})()}

/**
 * Javascript code to store data as JSON strings in cookies. 
 * It uses prototype.js 1.5.1 (http://www.prototypejs.org)
 * 
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/jsoncookies
 * License: Apache Software License 2
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.5
 * Updated: Jan 26, 2009 
 * 
 * Chnage Log:
 *   v 0.5
 *   -  Changed License from CC to Apache 2
 *   v 0.4
 *   -  Removed a extra comma in options (was breaking in IE and Opera). (Thanks Jason)
 *   -  Removed the parameter name from the initialize function
 *   -  Changed the way expires date was being calculated. (Thanks David)
 *   v 0.3
 *   -  Removed dependancy on json.js (http://www.json.org/json.js)
 *   -  empty() function only deletes the cookies set by CookieJar
 */

var CookieJar = Class.create();

CookieJar.prototype = {

	/**
	 * Append before all cookie names to differntiate them.
	 */
	appendString: "__CJ_",

	/**
	 * Initializes the cookie jar with the options.
	 */
	initialize: function(options) {
		this.options = {
			expires: 3600,		// seconds (1 hr)
			path: '',			// cookie path
			domain: '',			// cookie domain
			secure: ''			// secure ?
		};
		Object.extend(this.options, options || {});

		if (this.options.expires != '') {
			var date = new Date();
			date = new Date(date.getTime() + (this.options.expires * 1000));
			this.options.expires = '; expires=' + date.toGMTString();
		}
		if (this.options.path != '') {
			this.options.path = '; path=' + escape(this.options.path);
		}
		if (this.options.domain != '') {
			this.options.domain = '; domain=' + escape(this.options.domain);
		}
		if (this.options.secure == 'secure') {
			this.options.secure = '; secure';
		} else {
			this.options.secure = '';
		}
	},

	/**
	 * Adds a name values pair.
	 */
	put: function(name, value) {
		name = this.appendString + name;
		cookie = this.options;
		var type = typeof value;
		switch(type) {
		  case 'undefined':
		  case 'function' :
		  case 'unknown'  : return false;
		  case 'boolean'  : 
		  case 'string'   : 
		  case 'number'   : value = String(value.toString());
		}
		var cookie_str = name + "=" + escape(Object.toJSON(value));
		try {
			document.cookie = cookie_str + cookie.expires + cookie.path + cookie.domain + cookie.secure;
		} catch (e) {
			return false;
		}
		return true;
	},

	/**
	 * Removes a particular cookie (name value pair) form the Cookie Jar.
	 */
	remove: function(name) {
		name = this.appendString + name;
		cookie = this.options;
		try {
			var date = new Date();
			date.setTime(date.getTime() - (3600 * 1000));
			var expires = '; expires=' + date.toGMTString();
			document.cookie = name + "=" + expires + cookie.path + cookie.domain + cookie.secure;
		} catch (e) {
			return false;
		}
		return true;
	},

	/**
	 * Return a particular cookie by name;
	 */
	get: function(name) {
		name = this.appendString + name;
		var cookies = document.cookie.match(name + '=(.*?)(;|$)');
		if (cookies) {
			return (unescape(cookies[1])).evalJSON();
		} else {
			return null;
		}
	},

	/**
	 * Empties the Cookie Jar. Deletes all the cookies.
	 */
	empty: function() {
		keys = this.getKeys();
		size = keys.size();
		for(i=0; i<size; i++) {
			this.remove(keys[i]);
		}
	},

	/**
	 * Returns all cookies as a single object
	 */
	getPack: function() {
		pack = {};
		keys = this.getKeys();

		size = keys.size();
		for(i=0; i<size; i++) {
			pack[keys[i]] = this.get(keys[i]);
		}
		return pack;
	},

	/**
	 * Returns all keys.
	 */
	getKeys: function() {
		keys = $A();
		keyRe= /[^=; ]+(?=\=)/g;
		str  = document.cookie;
		CJRe = new RegExp("^" + this.appendString);
		while((match = keyRe.exec(str)) != undefined) {
			if (CJRe.test(match[0].strip())) {
				keys.push(match[0].strip().gsub("^" + this.appendString,""));
			}
		}
		return keys;
	}
};

/*
 Color animation 1.6.0
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2013 Edwin Martin
 Released under the MIT and GPL licenses.
*/
'use strict';(function(d){function h(a,b,e){var c="rgb"+(d.support.rgba?"a":"")+"("+parseInt(a[0]+e*(b[0]-a[0]),10)+","+parseInt(a[1]+e*(b[1]-a[1]),10)+","+parseInt(a[2]+e*(b[2]-a[2]),10);d.support.rgba&&(c+=","+(a&&b?parseFloat(a[3]+e*(b[3]-a[3])):1));return c+")"}function f(a){var b;return(b=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a))?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),1]:(b=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a))?[17*parseInt(b[1],16),17*parseInt(b[2],
16),17*parseInt(b[3],16),1]:(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))?[parseInt(b[1]),parseInt(b[2]),parseInt(b[3]),1]:(b=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(a))?[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),parseFloat(b[4])]:l[a]}d.extend(!0,d,{support:{rgba:function(){var a=d("script:first"),b=a.css("color"),e=!1;if(/^rgba/.test(b))e=!0;else try{e=b!=a.css("color","rgba(0, 0, 0, 0.5)").css("color"),
a.css("color",b)}catch(c){}return e}()}});var k="color backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor outlineColor".split(" ");d.each(k,function(a,b){d.Tween.propHooks[b]={get:function(a){return d(a.elem).css(b)},set:function(a){var c=a.elem.style,g=f(d(a.elem).css(b)),m=f(a.end);a.run=function(a){c[b]=h(g,m,a)}}}});d.Tween.propHooks.borderColor={set:function(a){var b=a.elem.style,e=[],c=k.slice(2,6);d.each(c,function(b,c){e[c]=f(d(a.elem).css(c))});var g=f(a.end);
a.run=function(a){d.each(c,function(d,c){b[c]=h(e[c],g,a)})}}};var l={aqua:[0,255,255,1],azure:[240,255,255,1],beige:[245,245,220,1],black:[0,0,0,1],blue:[0,0,255,1],brown:[165,42,42,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgrey:[169,169,169,1],darkgreen:[0,100,0,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkviolet:[148,0,211,1],fuchsia:[255,
0,255,1],gold:[255,215,0,1],green:[0,128,0,1],indigo:[75,0,130,1],khaki:[240,230,140,1],lightblue:[173,216,230,1],lightcyan:[224,255,255,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],magenta:[255,0,255,1],maroon:[128,0,0,1],navy:[0,0,128,1],olive:[128,128,0,1],orange:[255,165,0,1],pink:[255,192,203,1],purple:[128,0,128,1],violet:[128,0,128,1],red:[255,0,0,1],silver:[192,192,192,1],white:[255,255,255,1],yellow:[255,255,
0,1],transparent:[255,255,255,0]}})(jQuery);

/*! jQuery ellipsis - v1.1.1 - 2014-02-23
* https://github.com/STAR-ZERO/jquery-ellipsis
* Copyright (c) 2014 Kenji Abe; Licensed MIT */
!function(a){a.fn.ellipsis=function(b){var c={row:1,onlyFullWords:!1,"char":"...",callback:function(){},position:"tail"};return b=a.extend(c,b),this.each(function(){var c=a(this),d=c.text(),e=d,f=e.length,g=c.height();c.text("a");var h=parseFloat(c.css("lineHeight"),10),i=c.height(),j=h>i?h-i:0,k=j*(b.row-1)+i*b.row;if(k>=g)return c.text(d),void b.callback.call(this);var l=1,m=0,n=d.length;if("tail"===b.position){for(;n>l;)m=Math.ceil((l+n)/2),c.text(d.slice(0,m)+b["char"]),c.height()<=k?l=m:n=m-1;d=d.slice(0,l),b.onlyFullWords&&(d=d.replace(/[\u00AD\w\uac00-\ud7af]+$/,"")),d+=b["char"]}else if("middle"===b.position){for(var o=0;n>l;)m=Math.ceil((l+n)/2),o=Math.max(f-m,0),c.text(e.slice(0,Math.floor((f-o)/2))+b["char"]+e.slice(Math.floor((f+o)/2),f)),c.height()<=k?l=m:n=m-1;o=Math.max(f-l,0);var p=e.slice(0,Math.floor((f-o)/2)),q=e.slice(Math.floor((f+o)/2),f);b.onlyFullWords&&(p=p.replace(/[\u00AD\w\uac00-\ud7af]+$/,"")),d=p+b["char"]+q}c.text(d),b.callback.call(this)}),this}}(jQuery);
/*
 * Cross Browser HTML5 Local Storage Support
 * https://github.com/wojodesign/local-storage-js
 * Copyright (c) 2011 Wojo Design
 * Dual licensed under the MIT or GPL licenses.
*/

(function(){if(!this.localStorage)if(this.globalStorage)try{this.localStorage=this.globalStorage}catch(e){}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if(a.addBehavior){a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function(b,d){a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function(b){a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function(b){a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length--;if(0>this.length)this.length=0},clear:function(){a.load("localStorage");for(var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function(b){a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function(a){return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}})();
/*! jsTree - v3.2.0 - 2015-08-06 - (MIT) */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a,b){"use strict";a.jstree;var c=0,d=!1,e=!1,f=!1,g=[],h=a("script:last").attr("src"),i=window.document,j=i.createElement("LI"),k,l;j.setAttribute("role","treeitem"),k=i.createElement("I"),k.className="jstree-icon jstree-ocl",k.setAttribute("role","presentation"),j.appendChild(k),k=i.createElement("A"),k.className="jstree-anchor",k.setAttribute("href","#"),k.setAttribute("tabindex","-1"),l=i.createElement("I"),l.className="jstree-icon jstree-themeicon",l.setAttribute("role","presentation"),k.appendChild(l),j.appendChild(k),k=l=null,a.jstree={version:"3.2.0",defaults:{plugins:[]},plugins:{},path:h&&-1!==h.indexOf("/")?h.replace(/\/[^\/]+$/,""):"",idregex:/[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,root:"#"},a.jstree.create=function(b,d){var e=new a.jstree.core(++c),f=d;return d=a.extend(!0,{},a.jstree.defaults,d),f&&f.plugins&&(d.plugins=f.plugins),a.each(d.plugins,function(a,b){"core"!==a&&(e=e.plugin(b,d[b]))}),a(b).data("jstree",e),e.init(b,d),e},a.jstree.destroy=function(){a(".jstree:jstree").jstree("destroy"),a(i).off(".jstree")},a.jstree.core=function(a){this._id=a,this._cnt=0,this._wrk=null,this._data={core:{themes:{name:!1,dots:!1,icons:!1},selected:[],last_error:{},working:!1,worker_queue:[],focused:null}}},a.jstree.reference=function(b){var c=null,d=null;if(!b||!b.id||b.tagName&&b.nodeType||(b=b.id),!d||!d.length)try{d=a(b)}catch(e){}if(!d||!d.length)try{d=a("#"+b.replace(a.jstree.idregex,"\\$&"))}catch(e){}return d&&d.length&&(d=d.closest(".jstree")).length&&(d=d.data("jstree"))?c=d:a(".jstree").each(function(){var d=a(this).data("jstree");return d&&d._model.data[b]?(c=d,!1):void 0}),c},a.fn.jstree=function(c){var d="string"==typeof c,e=Array.prototype.slice.call(arguments,1),f=null;return c!==!0||this.length?(this.each(function(){var g=a.jstree.reference(this),h=d&&g?g[c]:null;return f=d&&h?h.apply(g,e):null,g||d||c!==b&&!a.isPlainObject(c)||a.jstree.create(this,c),(g&&!d||c===!0)&&(f=g||!1),null!==f&&f!==b?!1:void 0}),null!==f&&f!==b?f:this):!1},a.expr[":"].jstree=a.expr.createPseudo(function(c){return function(c){return a(c).hasClass("jstree")&&a(c).data("jstree")!==b}}),a.jstree.defaults.core={data:!1,strings:!1,check_callback:!1,error:a.noop,animation:200,multiple:!0,themes:{name:!1,url:!1,dir:!1,dots:!0,icons:!0,stripes:!1,variant:!1,responsive:!1},expand_selected_onload:!0,worker:!0,force_text:!1,dblclick_toggle:!0},a.jstree.core.prototype={plugin:function(b,c){var d=a.jstree.plugins[b];return d?(this._data[b]={},d.prototype=this,new d(c,this)):this},init:function(b,c){this._model={data:{},changed:[],force_full_redraw:!1,redraw_timeout:!1,default_state:{loaded:!0,opened:!1,selected:!1,disabled:!1}},this._model.data[a.jstree.root]={id:a.jstree.root,parent:null,parents:[],children:[],children_d:[],state:{loaded:!1}},this.element=a(b).addClass("jstree jstree-"+this._id),this.settings=c,this._data.core.ready=!1,this._data.core.loaded=!1,this._data.core.rtl="rtl"===this.element.css("direction"),this.element[this._data.core.rtl?"addClass":"removeClass"]("jstree-rtl"),this.element.attr("role","tree"),this.settings.core.multiple&&this.element.attr("aria-multiselectable",!0),this.element.attr("tabindex")||this.element.attr("tabindex","0"),this.bind(),this.trigger("init"),this._data.core.original_container_html=this.element.find(" > ul > li").clone(!0),this._data.core.original_container_html.find("li").addBack().contents().filter(function(){return 3===this.nodeType&&(!this.nodeValue||/^\s+$/.test(this.nodeValue))}).remove(),this.element.html("<ul class='jstree-container-ul jstree-children' role='group'><li id='j"+this._id+"_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='tree-item'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>"+this.get_string("Loading ...")+"</a></li></ul>"),this.element.attr("aria-activedescendant","j"+this._id+"_loading"),this._data.core.li_height=this.get_container_ul().children("li").first().height()||24,this.trigger("loading"),this.load_node(a.jstree.root)},destroy:function(a){if(this._wrk)try{window.URL.revokeObjectURL(this._wrk),this._wrk=null}catch(b){}a||this.element.empty(),this.teardown()},teardown:function(){this.unbind(),this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class",function(){return this.className.replace(/jstree[^ ]*|$/gi,"")}),this.element=null},bind:function(){var b="",c=null,d=0;this.element.on("dblclick.jstree",function(a){if(a.target.tagName&&"input"===a.target.tagName.toLowerCase())return!0;if(i.selection&&i.selection.empty)i.selection.empty();else if(window.getSelection){var b=window.getSelection();try{b.removeAllRanges(),b.collapse()}catch(c){}}}).on("mousedown.jstree",a.proxy(function(a){a.target===this.element[0]&&(a.preventDefault(),d=+new Date)},this)).on("mousedown.jstree",".jstree-ocl",function(a){a.preventDefault()}).on("click.jstree",".jstree-ocl",a.proxy(function(a){this.toggle_node(a.target)},this)).on("dblclick.jstree",".jstree-anchor",a.proxy(function(a){return a.target.tagName&&"input"===a.target.tagName.toLowerCase()?!0:void(this.settings.core.dblclick_toggle&&this.toggle_node(a.target))},this)).on("click.jstree",".jstree-anchor",a.proxy(function(b){b.preventDefault(),b.currentTarget!==i.activeElement&&a(b.currentTarget).focus(),this.activate_node(b.currentTarget,b)},this)).on("keydown.jstree",".jstree-anchor",a.proxy(function(b){if(b.target.tagName&&"input"===b.target.tagName.toLowerCase())return!0;if(32!==b.which&&13!==b.which&&(b.shiftKey||b.ctrlKey||b.altKey||b.metaKey))return!0;var c=null;switch(this._data.core.rtl&&(37===b.which?b.which=39:39===b.which&&(b.which=37)),b.which){case 32:b.ctrlKey&&(b.type="click",a(b.currentTarget).trigger(b));break;case 13:b.type="click",a(b.currentTarget).trigger(b);break;case 37:b.preventDefault(),this.is_open(b.currentTarget)?this.close_node(b.currentTarget):(c=this.get_parent(b.currentTarget),c&&c.id!==a.jstree.root&&this.get_node(c,!0).children(".jstree-anchor").focus());break;case 38:b.preventDefault(),c=this.get_prev_dom(b.currentTarget),c&&c.length&&c.children(".jstree-anchor").focus();break;case 39:b.preventDefault(),this.is_closed(b.currentTarget)?this.open_node(b.currentTarget,function(a){this.get_node(a,!0).children(".jstree-anchor").focus()}):this.is_open(b.currentTarget)&&(c=this.get_node(b.currentTarget,!0).children(".jstree-children")[0],c&&a(this._firstChild(c)).children(".jstree-anchor").focus());break;case 40:b.preventDefault(),c=this.get_next_dom(b.currentTarget),c&&c.length&&c.children(".jstree-anchor").focus();break;case 106:this.open_all();break;case 36:b.preventDefault(),c=this._firstChild(this.get_container_ul()[0]),c&&a(c).children(".jstree-anchor").filter(":visible").focus();break;case 35:b.preventDefault(),this.element.find(".jstree-anchor").filter(":visible").last().focus()}},this)).on("load_node.jstree",a.proxy(function(b,c){c.status&&(c.node.id!==a.jstree.root||this._data.core.loaded||(this._data.core.loaded=!0,this._firstChild(this.get_container_ul()[0])&&this.element.attr("aria-activedescendant",this._firstChild(this.get_container_ul()[0]).id),this.trigger("loaded")),this._data.core.ready||setTimeout(a.proxy(function(){if(this.element&&!this.get_container_ul().find(".jstree-loading").length){if(this._data.core.ready=!0,this._data.core.selected.length){if(this.settings.core.expand_selected_onload){var b=[],c,d;for(c=0,d=this._data.core.selected.length;d>c;c++)b=b.concat(this._model.data[this._data.core.selected[c]].parents);for(b=a.vakata.array_unique(b),c=0,d=b.length;d>c;c++)this.open_node(b[c],!1,0)}this.trigger("changed",{action:"ready",selected:this._data.core.selected})}this.trigger("ready")}},this),0))},this)).on("keypress.jstree",a.proxy(function(d){if(d.target.tagName&&"input"===d.target.tagName.toLowerCase())return!0;c&&clearTimeout(c),c=setTimeout(function(){b=""},500);var e=String.fromCharCode(d.which).toLowerCase(),f=this.element.find(".jstree-anchor").filter(":visible"),g=f.index(i.activeElement)||0,h=!1;if(b+=e,b.length>1){if(f.slice(g).each(a.proxy(function(c,d){return 0===a(d).text().toLowerCase().indexOf(b)?(a(d).focus(),h=!0,!1):void 0},this)),h)return;if(f.slice(0,g).each(a.proxy(function(c,d){return 0===a(d).text().toLowerCase().indexOf(b)?(a(d).focus(),h=!0,!1):void 0},this)),h)return}if(new RegExp("^"+e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+"+$").test(b)){if(f.slice(g+1).each(a.proxy(function(b,c){return a(c).text().toLowerCase().charAt(0)===e?(a(c).focus(),h=!0,!1):void 0},this)),h)return;if(f.slice(0,g+1).each(a.proxy(function(b,c){return a(c).text().toLowerCase().charAt(0)===e?(a(c).focus(),h=!0,!1):void 0},this)),h)return}},this)).on("init.jstree",a.proxy(function(){var a=this.settings.core.themes;this._data.core.themes.dots=a.dots,this._data.core.themes.stripes=a.stripes,this._data.core.themes.icons=a.icons,this.set_theme(a.name||"default",a.url),this.set_theme_variant(a.variant)},this)).on("loading.jstree",a.proxy(function(){this[this._data.core.themes.dots?"show_dots":"hide_dots"](),this[this._data.core.themes.icons?"show_icons":"hide_icons"](),this[this._data.core.themes.stripes?"show_stripes":"hide_stripes"]()},this)).on("blur.jstree",".jstree-anchor",a.proxy(function(b){this._data.core.focused=null,a(b.currentTarget).filter(".jstree-hovered").mouseleave(),this.element.attr("tabindex","0")},this)).on("focus.jstree",".jstree-anchor",a.proxy(function(b){var c=this.get_node(b.currentTarget);c&&c.id&&(this._data.core.focused=c.id),this.element.find(".jstree-hovered").not(b.currentTarget).mouseleave(),a(b.currentTarget).mouseenter(),this.element.attr("tabindex","-1")},this)).on("focus.jstree",a.proxy(function(){if(+new Date-d>500&&!this._data.core.focused){d=0;var a=this.get_node(this.element.attr("aria-activedescendant"),!0);a&&a.find("> .jstree-anchor").focus()}},this)).on("mouseenter.jstree",".jstree-anchor",a.proxy(function(a){this.hover_node(a.currentTarget)},this)).on("mouseleave.jstree",".jstree-anchor",a.proxy(function(a){this.dehover_node(a.currentTarget)},this))},unbind:function(){this.element.off(".jstree"),a(i).off(".jstree-"+this._id)},trigger:function(a,b){b||(b={}),b.instance=this,this.element.triggerHandler(a.replace(".jstree","")+".jstree",b)},get_container:function(){return this.element},get_container_ul:function(){return this.element.children(".jstree-children").first()},get_string:function(b){var c=this.settings.core.strings;return a.isFunction(c)?c.call(this,b):c&&c[b]?c[b]:b},_firstChild:function(a){a=a?a.firstChild:null;while(null!==a&&1!==a.nodeType)a=a.nextSibling;return a},_nextSibling:function(a){a=a?a.nextSibling:null;while(null!==a&&1!==a.nodeType)a=a.nextSibling;return a},_previousSibling:function(a){a=a?a.previousSibling:null;while(null!==a&&1!==a.nodeType)a=a.previousSibling;return a},get_node:function(b,c){b&&b.id&&(b=b.id);var d;try{if(this._model.data[b])b=this._model.data[b];else if("string"==typeof b&&this._model.data[b.replace(/^#/,"")])b=this._model.data[b.replace(/^#/,"")];else if("string"==typeof b&&(d=a("#"+b.replace(a.jstree.idregex,"\\$&"),this.element)).length&&this._model.data[d.closest(".jstree-node").attr("id")])b=this._model.data[d.closest(".jstree-node").attr("id")];else if((d=a(b,this.element)).length&&this._model.data[d.closest(".jstree-node").attr("id")])b=this._model.data[d.closest(".jstree-node").attr("id")];else{if(!(d=a(b,this.element)).length||!d.hasClass("jstree"))return!1;b=this._model.data[a.jstree.root]}return c&&(b=b.id===a.jstree.root?this.element:a("#"+b.id.replace(a.jstree.idregex,"\\$&"),this.element)),b}catch(e){return!1}},get_path:function(b,c,d){if(b=b.parents?b:this.get_node(b),!b||b.id===a.jstree.root||!b.parents)return!1;var e,f,g=[];for(g.push(d?b.id:b.text),e=0,f=b.parents.length;f>e;e++)g.push(d?b.parents[e]:this.get_text(b.parents[e]));return g=g.reverse().slice(1),c?g.join(c):g},get_next_dom:function(b,c){var d;if(b=this.get_node(b,!0),b[0]===this.element[0]){d=this._firstChild(this.get_container_ul()[0]);while(d&&0===d.offsetHeight)d=this._nextSibling(d);return d?a(d):!1}if(!b||!b.length)return!1;if(c){d=b[0];do d=this._nextSibling(d);while(d&&0===d.offsetHeight);return d?a(d):!1}if(b.hasClass("jstree-open")){d=this._firstChild(b.children(".jstree-children")[0]);while(d&&0===d.offsetHeight)d=this._nextSibling(d);if(null!==d)return a(d)}d=b[0];do d=this._nextSibling(d);while(d&&0===d.offsetHeight);return null!==d?a(d):b.parentsUntil(".jstree",".jstree-node").nextAll(".jstree-node:visible").first()},get_prev_dom:function(b,c){var d;if(b=this.get_node(b,!0),b[0]===this.element[0]){d=this.get_container_ul()[0].lastChild;while(d&&0===d.offsetHeight)d=this._previousSibling(d);return d?a(d):!1}if(!b||!b.length)return!1;if(c){d=b[0];do d=this._previousSibling(d);while(d&&0===d.offsetHeight);return d?a(d):!1}d=b[0];do d=this._previousSibling(d);while(d&&0===d.offsetHeight);if(null!==d){b=a(d);while(b.hasClass("jstree-open"))b=b.children(".jstree-children").first().children(".jstree-node:visible:last");return b}return d=b[0].parentNode.parentNode,d&&d.className&&-1!==d.className.indexOf("jstree-node")?a(d):!1},get_parent:function(b){return b=this.get_node(b),b&&b.id!==a.jstree.root?b.parent:!1},get_children_dom:function(a){return a=this.get_node(a,!0),a[0]===this.element[0]?this.get_container_ul().children(".jstree-node"):a&&a.length?a.children(".jstree-children").children(".jstree-node"):!1},is_parent:function(a){return a=this.get_node(a),a&&(a.state.loaded===!1||a.children.length>0)},is_loaded:function(a){return a=this.get_node(a),a&&a.state.loaded},is_loading:function(a){return a=this.get_node(a),a&&a.state&&a.state.loading},is_open:function(a){return a=this.get_node(a),a&&a.state.opened},is_closed:function(a){return a=this.get_node(a),a&&this.is_parent(a)&&!a.state.opened},is_leaf:function(a){return!this.is_parent(a)},load_node:function(b,c){var d,e,f,g,h;if(a.isArray(b))return this._load_nodes(b.slice(),c),!0;if(b=this.get_node(b),!b)return c&&c.call(this,b,!1),!1;if(b.state.loaded){for(b.state.loaded=!1,d=0,e=b.children_d.length;e>d;d++){for(f=0,g=b.parents.length;g>f;f++)this._model.data[b.parents[f]].children_d=a.vakata.array_remove_item(this._model.data[b.parents[f]].children_d,b.children_d[d]);this._model.data[b.children_d[d]].state.selected&&(h=!0,this._data.core.selected=a.vakata.array_remove_item(this._data.core.selected,b.children_d[d])),delete this._model.data[b.children_d[d]]}b.children=[],b.children_d=[],h&&this.trigger("changed",{action:"load_node",node:b,selected:this._data.core.selected})}return b.state.failed=!1,b.state.loading=!0,this.get_node(b,!0).addClass("jstree-loading").attr("aria-busy",!0),this._load_node(b,a.proxy(function(a){b=this._model.data[b.id],b.state.loading=!1,b.state.loaded=a,b.state.failed=!b.state.loaded;var d=this.get_node(b,!0),e=0,f=0,g=this._model.data,h=!1;for(e=0,f=b.children.length;f>e;e++)if(g[b.children[e]]&&!g[b.children[e]].state.hidden){h=!0;break}b.state.loaded&&!h&&d&&d.length&&!d.hasClass("jstree-leaf")&&d.removeClass("jstree-closed jstree-open").addClass("jstree-leaf"),d.removeClass("jstree-loading").attr("aria-busy",!1),this.trigger("load_node",{node:b,status:a}),c&&c.call(this,b,a)},this)),!0},_load_nodes:function(a,b,c){var d=!0,e=function(){this._load_nodes(a,b,!0)},f=this._model.data,g,h,i=[];for(g=0,h=a.length;h>g;g++)!f[a[g]]||(f[a[g]].state.loaded||f[a[g]].state.failed)&&c||(this.is_loading(a[g])||this.load_node(a[g],e),d=!1);if(d){for(g=0,h=a.length;h>g;g++)f[a[g]]&&f[a[g]].state.loaded&&i.push(a[g]);b&&!b.done&&(b.call(this,i),b.done=!0)}},load_all:function(b,c){if(b||(b=a.jstree.root),b=this.get_node(b),!b)return!1;var d=[],e=this._model.data,f=e[b.id].children_d,g,h;for(b.state&&!b.state.loaded&&d.push(b.id),g=0,h=f.length;h>g;g++)e[f[g]]&&e[f[g]].state&&!e[f[g]].state.loaded&&d.push(f[g]);d.length?this._load_nodes(d,function(){this.load_all(b,c)}):(c&&c.call(this,b),this.trigger("load_all",{node:b}))},_load_node:function(b,c){var d=this.settings.core.data,e;return d?a.isFunction(d)?d.call(this,b,a.proxy(function(d){d===!1&&c.call(this,!1),this["string"==typeof d?"_append_html_data":"_append_json_data"](b,"string"==typeof d?a(a.parseHTML(d)).filter(function(){return 3!==this.nodeType}):d,function(a){c.call(this,a)})},this)):"object"==typeof d?d.url?(d=a.extend(!0,{},d),a.isFunction(d.url)&&(d.url=d.url.call(this,b)),a.isFunction(d.data)&&(d.data=d.data.call(this,b)),a.ajax(d).done(a.proxy(function(d,e,f){var g=f.getResponseHeader("Content-Type");return g&&-1!==g.indexOf("json")||"object"==typeof d?this._append_json_data(b,d,function(a){c.call(this,a)}):g&&-1!==g.indexOf("html")||"string"==typeof d?this._append_html_data(b,a(a.parseHTML(d)).filter(function(){return 3!==this.nodeType}),function(a){c.call(this,a)}):(this._data.core.last_error={error:"ajax",plugin:"core",id:"core_04",reason:"Could not load node",data:JSON.stringify({id:b.id,xhr:f})},this.settings.core.error.call(this,this._data.core.last_error),c.call(this,!1))},this)).fail(a.proxy(function(a){c.call(this,!1),this._data.core.last_error={error:"ajax",plugin:"core",id:"core_04",reason:"Could not load node",data:JSON.stringify({id:b.id,xhr:a})},this.settings.core.error.call(this,this._data.core.last_error)},this))):(e=a.isArray(d)||a.isPlainObject(d)?JSON.parse(JSON.stringify(d)):d,b.id===a.jstree.root?this._append_json_data(b,e,function(a){c.call(this,a)}):(this._data.core.last_error={error:"nodata",plugin:"core",id:"core_05",reason:"Could not load node",data:JSON.stringify({id:b.id})},this.settings.core.error.call(this,this._data.core.last_error),c.call(this,!1))):"string"==typeof d?b.id===a.jstree.root?this._append_html_data(b,a(a.parseHTML(d)).filter(function(){return 3!==this.nodeType}),function(a){c.call(this,a)}):(this._data.core.last_error={error:"nodata",plugin:"core",id:"core_06",reason:"Could not load node",data:JSON.stringify({id:b.id})},this.settings.core.error.call(this,this._data.core.last_error),c.call(this,!1)):c.call(this,!1):b.id===a.jstree.root?this._append_html_data(b,this._data.core.original_container_html.clone(!0),function(a){c.call(this,a)}):c.call(this,!1)},_node_changed:function(a){a=this.get_node(a),a&&this._model.changed.push(a.id)},_append_html_data:function(b,c,d){b=this.get_node(b),b.children=[],b.children_d=[];var e=c.is("ul")?c.children():c,f=b.id,g=[],h=[],i=this._model.data,j=i[f],k=this._data.core.selected.length,l,m,n;for(e.each(a.proxy(function(b,c){l=this._parse_model_from_html(a(c),f,j.parents.concat()),l&&(g.push(l),h.push(l),i[l].children_d.length&&(h=h.concat(i[l].children_d)))},this)),j.children=g,j.children_d=h,m=0,n=j.parents.length;n>m;m++)i[j.parents[m]].children_d=i[j.parents[m]].children_d.concat(h);this.trigger("model",{nodes:h,parent:f}),f!==a.jstree.root?(this._node_changed(f),this.redraw()):(this.get_container_ul().children(".jstree-initial-node").remove(),this.redraw(!0)),this._data.core.selected.length!==k&&this.trigger("changed",{action:"model",selected:this._data.core.selected}),d.call(this,!0)},_append_json_data:function(b,c,d,e){if(null!==this.element){b=this.get_node(b),b.children=[],b.children_d=[],c.d&&(c=c.d,"string"==typeof c&&(c=JSON.parse(c))),a.isArray(c)||(c=[c]);var f=null,g={df:this._model.default_state,dat:c,par:b.id,m:this._model.data,t_id:this._id,t_cnt:this._cnt,sel:this._data.core.selected},h=function(a,b){a.data&&(a=a.data);var c=a.dat,d=a.par,e=[],f=[],g=[],h=a.df,i=a.t_id,j=a.t_cnt,k=a.m,l=k[d],m=a.sel,n,o,p,q,r=function(a,c,d){d=d?d.concat():[],c&&d.unshift(c);var e=a.id.toString(),f,i,j,l,m={id:e,text:a.text||"",icon:a.icon!==b?a.icon:!0,parent:c,parents:d,children:a.children||[],children_d:a.children_d||[],data:a.data,state:{},li_attr:{id:!1},a_attr:{href:"#"},original:!1};for(f in h)h.hasOwnProperty(f)&&(m.state[f]=h[f]);if(a&&a.data&&a.data.jstree&&a.data.jstree.icon&&(m.icon=a.data.jstree.icon),(m.icon===b||null===m.icon||""===m.icon)&&(m.icon=!0),a&&a.data&&(m.data=a.data,a.data.jstree))for(f in a.data.jstree)a.data.jstree.hasOwnProperty(f)&&(m.state[f]=a.data.jstree[f]);if(a&&"object"==typeof a.state)for(f in a.state)a.state.hasOwnProperty(f)&&(m.state[f]=a.state[f]);if(a&&"object"==typeof a.li_attr)for(f in a.li_attr)a.li_attr.hasOwnProperty(f)&&(m.li_attr[f]=a.li_attr[f]);if(m.li_attr.id||(m.li_attr.id=e),a&&"object"==typeof a.a_attr)for(f in a.a_attr)a.a_attr.hasOwnProperty(f)&&(m.a_attr[f]=a.a_attr[f]);for(a&&a.children&&a.children===!0&&(m.state.loaded=!1,m.children=[],m.children_d=[]),k[m.id]=m,f=0,i=m.children.length;i>f;f++)j=r(k[m.children[f]],m.id,d),l=k[j],m.children_d.push(j),l.children_d.length&&(m.children_d=m.children_d.concat(l.children_d));return delete a.data,delete a.children,k[m.id].original=a,m.state.selected&&g.push(m.id),m.id},s=function(a,c,d){d=d?d.concat():[],c&&d.unshift(c);var e=!1,f,l,m,n,o;do e="j"+i+"_"+ ++j;while(k[e]);o={id:!1,text:"string"==typeof a?a:"",icon:"object"==typeof a&&a.icon!==b?a.icon:!0,parent:c,parents:d,children:[],children_d:[],data:null,state:{},li_attr:{id:!1},a_attr:{href:"#"},original:!1};for(f in h)h.hasOwnProperty(f)&&(o.state[f]=h[f]);if(a&&a.id&&(o.id=a.id.toString()),a&&a.text&&(o.text=a.text),a&&a.data&&a.data.jstree&&a.data.jstree.icon&&(o.icon=a.data.jstree.icon),(o.icon===b||null===o.icon||""===o.icon)&&(o.icon=!0),a&&a.data&&(o.data=a.data,a.data.jstree))for(f in a.data.jstree)a.data.jstree.hasOwnProperty(f)&&(o.state[f]=a.data.jstree[f]);if(a&&"object"==typeof a.state)for(f in a.state)a.state.hasOwnProperty(f)&&(o.state[f]=a.state[f]);if(a&&"object"==typeof a.li_attr)for(f in a.li_attr)a.li_attr.hasOwnProperty(f)&&(o.li_attr[f]=a.li_attr[f]);if(o.li_attr.id&&!o.id&&(o.id=o.li_attr.id.toString()),o.id||(o.id=e),o.li_attr.id||(o.li_attr.id=o.id),a&&"object"==typeof a.a_attr)for(f in a.a_attr)a.a_attr.hasOwnProperty(f)&&(o.a_attr[f]=a.a_attr[f]);if(a&&a.children&&a.children.length){for(f=0,l=a.children.length;l>f;f++)m=s(a.children[f],o.id,d),n=k[m],o.children.push(m),n.children_d.length&&(o.children_d=o.children_d.concat(n.children_d));o.children_d=o.children_d.concat(o.children)}return a&&a.children&&a.children===!0&&(o.state.loaded=!1,o.children=[],o.children_d=[]),delete a.data,delete a.children,o.original=a,k[o.id]=o,o.state.selected&&g.push(o.id),o.id};if(c.length&&c[0].id!==b&&c[0].parent!==b){for(o=0,p=c.length;p>o;o++)c[o].children||(c[o].children=[]),k[c[o].id.toString()]=c[o];for(o=0,p=c.length;p>o;o++)k[c[o].parent.toString()].children.push(c[o].id.toString()),l.children_d.push(c[o].id.toString());for(o=0,p=l.children.length;p>o;o++)n=r(k[l.children[o]],d,l.parents.concat()),f.push(n),k[n].children_d.length&&(f=f.concat(k[n].children_d));for(o=0,p=l.parents.length;p>o;o++)k[l.parents[o]].children_d=k[l.parents[o]].children_d.concat(f);q={cnt:j,mod:k,sel:m,par:d,dpc:f,add:g}}else{for(o=0,p=c.length;p>o;o++)n=s(c[o],d,l.parents.concat()),n&&(e.push(n),f.push(n),k[n].children_d.length&&(f=f.concat(k[n].children_d)));for(l.children=e,l.children_d=f,o=0,p=l.parents.length;p>o;o++)k[l.parents[o]].children_d=k[l.parents[o]].children_d.concat(f);q={cnt:j,mod:k,sel:m,par:d,dpc:f,add:g}}return"undefined"!=typeof window&&"undefined"!=typeof window.document?q:void postMessage(q)},i=function(b,c){if(null!==this.element){if(this._cnt=b.cnt,this._model.data=b.mod,c){var e,f,g=b.add,h=b.sel,i=this._data.core.selected.slice(),j=this._model.data;if(h.length!==i.length||a.vakata.array_unique(h.concat(i)).length!==h.length){for(e=0,f=h.length;f>e;e++)-1===a.inArray(h[e],g)&&-1===a.inArray(h[e],i)&&(j[h[e]].state.selected=!1);for(e=0,f=i.length;f>e;e++)-1===a.inArray(i[e],h)&&(j[i[e]].state.selected=!0)}}b.add.length&&(this._data.core.selected=this._data.core.selected.concat(b.add)),this.trigger("model",{nodes:b.dpc,parent:b.par}),b.par!==a.jstree.root?(this._node_changed(b.par),this.redraw()):this.redraw(!0),b.add.length&&this.trigger("changed",{action:"model",selected:this._data.core.selected}),d.call(this,!0)}};if(this.settings.core.worker&&window.Blob&&window.URL&&window.Worker)try{null===this._wrk&&(this._wrk=window.URL.createObjectURL(new window.Blob(["self.onmessage = "+h.toString()],{type:"text/javascript"}))),!this._data.core.working||e?(this._data.core.working=!0,f=new window.Worker(this._wrk),f.onmessage=a.proxy(function(a){i.call(this,a.data,!0);try{f.terminate(),f=null}catch(b){}this._data.core.worker_queue.length?this._append_json_data.apply(this,this._data.core.worker_queue.shift()):this._data.core.working=!1},this),g.par?f.postMessage(g):this._data.core.worker_queue.length?this._append_json_data.apply(this,this._data.core.worker_queue.shift()):this._data.core.working=!1):this._data.core.worker_queue.push([b,c,d,!0])}catch(j){i.call(this,h(g),!1),this._data.core.worker_queue.length?this._append_json_data.apply(this,this._data.core.worker_queue.shift()):this._data.core.working=!1}else i.call(this,h(g),!1)}},_parse_model_from_html:function(c,d,e){e=e?[].concat(e):[],d&&e.unshift(d);var f,g,h=this._model.data,i={id:!1,text:!1,icon:!0,parent:d,parents:e,children:[],children_d:[],data:null,state:{},li_attr:{id:!1},a_attr:{href:"#"},original:!1},j,k,l;for(j in this._model.default_state)this._model.default_state.hasOwnProperty(j)&&(i.state[j]=this._model.default_state[j]);if(k=a.vakata.attributes(c,!0),a.each(k,function(b,c){return c=a.trim(c),c.length?(i.li_attr[b]=c,void("id"===b&&(i.id=c.toString()))):!0}),k=c.children("a").first(),k.length&&(k=a.vakata.attributes(k,!0),a.each(k,function(b,c){c=a.trim(c),c.length&&(i.a_attr[b]=c)})),k=c.children("a").first().length?c.children("a").first().clone():c.clone(),k.children("ins, i, ul").remove(),k=k.html(),k=a("<div />").html(k),i.text=this.settings.core.force_text?k.text():k.html(),k=c.data(),i.data=k?a.extend(!0,{},k):null,i.state.opened=c.hasClass("jstree-open"),i.state.selected=c.children("a").hasClass("jstree-clicked"),i.state.disabled=c.children("a").hasClass("jstree-disabled"),i.data&&i.data.jstree)for(j in i.data.jstree)i.data.jstree.hasOwnProperty(j)&&(i.state[j]=i.data.jstree[j]);k=c.children("a").children(".jstree-themeicon"),k.length&&(i.icon=k.hasClass("jstree-themeicon-hidden")?!1:k.attr("rel")),i.state.icon!==b&&(i.icon=i.state.icon),(i.icon===b||null===i.icon||""===i.icon)&&(i.icon=!0),k=c.children("ul").children("li");do l="j"+this._id+"_"+ ++this._cnt;while(h[l]);return i.id=i.li_attr.id?i.li_attr.id.toString():l,k.length?(k.each(a.proxy(function(b,c){f=this._parse_model_from_html(a(c),i.id,e),g=this._model.data[f],i.children.push(f),g.children_d.length&&(i.children_d=i.children_d.concat(g.children_d))},this)),i.children_d=i.children_d.concat(i.children)):c.hasClass("jstree-closed")&&(i.state.loaded=!1),i.li_attr["class"]&&(i.li_attr["class"]=i.li_attr["class"].replace("jstree-closed","").replace("jstree-open","")),i.a_attr["class"]&&(i.a_attr["class"]=i.a_attr["class"].replace("jstree-clicked","").replace("jstree-disabled","")),h[i.id]=i,i.state.selected&&this._data.core.selected.push(i.id),i.id},_parse_model_from_flat_json:function(a,c,d){d=d?d.concat():[],c&&d.unshift(c);var e=a.id.toString(),f=this._model.data,g=this._model.default_state,h,i,j,k,l={id:e,text:a.text||"",icon:a.icon!==b?a.icon:!0,parent:c,parents:d,children:a.children||[],children_d:a.children_d||[],data:a.data,state:{},li_attr:{id:!1},a_attr:{href:"#"},original:!1};for(h in g)g.hasOwnProperty(h)&&(l.state[h]=g[h]);if(a&&a.data&&a.data.jstree&&a.data.jstree.icon&&(l.icon=a.data.jstree.icon),(l.icon===b||null===l.icon||""===l.icon)&&(l.icon=!0),a&&a.data&&(l.data=a.data,a.data.jstree))for(h in a.data.jstree)a.data.jstree.hasOwnProperty(h)&&(l.state[h]=a.data.jstree[h]);if(a&&"object"==typeof a.state)for(h in a.state)a.state.hasOwnProperty(h)&&(l.state[h]=a.state[h]);if(a&&"object"==typeof a.li_attr)for(h in a.li_attr)a.li_attr.hasOwnProperty(h)&&(l.li_attr[h]=a.li_attr[h]);if(l.li_attr.id||(l.li_attr.id=e),a&&"object"==typeof a.a_attr)for(h in a.a_attr)a.a_attr.hasOwnProperty(h)&&(l.a_attr[h]=a.a_attr[h]);for(a&&a.children&&a.children===!0&&(l.state.loaded=!1,l.children=[],l.children_d=[]),f[l.id]=l,h=0,i=l.children.length;i>h;h++)j=this._parse_model_from_flat_json(f[l.children[h]],l.id,d),k=f[j],l.children_d.push(j),k.children_d.length&&(l.children_d=l.children_d.concat(k.children_d));return delete a.data,delete a.children,f[l.id].original=a,l.state.selected&&this._data.core.selected.push(l.id),l.id},_parse_model_from_json:function(a,c,d){d=d?d.concat():[],c&&d.unshift(c);var e=!1,f,g,h,i,j=this._model.data,k=this._model.default_state,l;do e="j"+this._id+"_"+ ++this._cnt;while(j[e]);l={id:!1,text:"string"==typeof a?a:"",icon:"object"==typeof a&&a.icon!==b?a.icon:!0,parent:c,parents:d,children:[],children_d:[],data:null,state:{},li_attr:{id:!1},a_attr:{href:"#"},original:!1};for(f in k)k.hasOwnProperty(f)&&(l.state[f]=k[f]);if(a&&a.id&&(l.id=a.id.toString()),a&&a.text&&(l.text=a.text),a&&a.data&&a.data.jstree&&a.data.jstree.icon&&(l.icon=a.data.jstree.icon),(l.icon===b||null===l.icon||""===l.icon)&&(l.icon=!0),a&&a.data&&(l.data=a.data,a.data.jstree))for(f in a.data.jstree)a.data.jstree.hasOwnProperty(f)&&(l.state[f]=a.data.jstree[f]);if(a&&"object"==typeof a.state)for(f in a.state)a.state.hasOwnProperty(f)&&(l.state[f]=a.state[f]);if(a&&"object"==typeof a.li_attr)for(f in a.li_attr)a.li_attr.hasOwnProperty(f)&&(l.li_attr[f]=a.li_attr[f]);if(l.li_attr.id&&!l.id&&(l.id=l.li_attr.id.toString()),l.id||(l.id=e),l.li_attr.id||(l.li_attr.id=l.id),a&&"object"==typeof a.a_attr)for(f in a.a_attr)a.a_attr.hasOwnProperty(f)&&(l.a_attr[f]=a.a_attr[f]);if(a&&a.children&&a.children.length){for(f=0,g=a.children.length;g>f;f++)h=this._parse_model_from_json(a.children[f],l.id,d),i=j[h],l.children.push(h),i.children_d.length&&(l.children_d=l.children_d.concat(i.children_d));l.children_d=l.children_d.concat(l.children)}return a&&a.children&&a.children===!0&&(l.state.loaded=!1,l.children=[],l.children_d=[]),delete a.data,delete a.children,l.original=a,j[l.id]=l,l.state.selected&&this._data.core.selected.push(l.id),l.id},_redraw:function(){var b=this._model.force_full_redraw?this._model.data[a.jstree.root].children.concat([]):this._model.changed.concat([]),c=i.createElement("UL"),d,e,f,g=this._data.core.focused;for(e=0,f=b.length;f>e;e++)d=this.redraw_node(b[e],!0,this._model.force_full_redraw),d&&this._model.force_full_redraw&&c.appendChild(d);this._model.force_full_redraw&&(c.className=this.get_container_ul()[0].className,c.setAttribute("role","group"),this.element.empty().append(c)),null!==g&&(d=this.get_node(g,!0),d&&d.length&&d.children(".jstree-anchor")[0]!==i.activeElement?d.children(".jstree-anchor").focus():this._data.core.focused=null),this._model.force_full_redraw=!1,this._model.changed=[],this.trigger("redraw",{nodes:b})},redraw:function(a){a&&(this._model.force_full_redraw=!0),this._redraw()},draw_children:function(b){var c=this.get_node(b),d=!1,e=!1,f=!1,g=i;if(!c)return!1;if(c.id===a.jstree.root)return this.redraw(!0);if(b=this.get_node(b,!0),!b||!b.length)return!1;if(b.children(".jstree-children").remove(),b=b[0],c.children.length&&c.state.loaded){for(f=g.createElement("UL"),f.setAttribute("role","group"),f.className="jstree-children",d=0,e=c.children.length;e>d;d++)f.appendChild(this.redraw_node(c.children[d],!0,!0));b.appendChild(f)}},redraw_node:function(b,c,d,e){var f=this.get_node(b),g=!1,h=!1,k=!1,l=!1,m=!1,n=!1,o="",p=i,q=this._model.data,r=!1,s=!1,t=null,u=0,v=0,w=!1,x=!1;if(!f)return!1;if(f.id===a.jstree.root)return this.redraw(!0);if(c=c||0===f.children.length,b=i.querySelector?this.element[0].querySelector("#"+(-1!=="0123456789".indexOf(f.id[0])?"\\3"+f.id[0]+" "+f.id.substr(1).replace(a.jstree.idregex,"\\$&"):f.id.replace(a.jstree.idregex,"\\$&"))):i.getElementById(f.id))b=a(b),d||(g=b.parent().parent()[0],g===this.element[0]&&(g=null),h=b.index()),c||!f.children.length||b.children(".jstree-children").length||(c=!0),
c||(k=b.children(".jstree-children")[0]),r=b.children(".jstree-anchor")[0]===i.activeElement,b.remove();else if(c=!0,!d){if(g=f.parent!==a.jstree.root?a("#"+f.parent.replace(a.jstree.idregex,"\\$&"),this.element)[0]:null,!(null===g||g&&q[f.parent].state.opened))return!1;h=a.inArray(f.id,null===g?q[a.jstree.root].children:q[f.parent].children)}b=j.cloneNode(!0),o="jstree-node ";for(l in f.li_attr)if(f.li_attr.hasOwnProperty(l)){if("id"===l)continue;"class"!==l?b.setAttribute(l,f.li_attr[l]):o+=f.li_attr[l]}for(f.a_attr.id||(f.a_attr.id=f.id+"_anchor"),b.setAttribute("aria-selected",!!f.state.selected),b.setAttribute("aria-level",f.parents.length),b.setAttribute("aria-labelledby",f.a_attr.id),f.state.disabled&&b.setAttribute("aria-disabled",!0),l=0,m=f.children.length;m>l;l++)if(!q[f.children[l]].state.hidden){w=!0;break}if(null!==f.parent&&q[f.parent]&&!f.state.hidden&&(l=a.inArray(f.id,q[f.parent].children),x=f.id,-1!==l))for(l++,m=q[f.parent].children.length;m>l;l++)if(q[q[f.parent].children[l]].state.hidden||(x=q[f.parent].children[l]),x!==f.id)break;f.state.hidden&&(o+=" jstree-hidden"),f.state.loaded&&!w?o+=" jstree-leaf":(o+=f.state.opened&&f.state.loaded?" jstree-open":" jstree-closed",b.setAttribute("aria-expanded",f.state.opened&&f.state.loaded)),x===f.id&&(o+=" jstree-last"),b.id=f.id,b.className=o,o=(f.state.selected?" jstree-clicked":"")+(f.state.disabled?" jstree-disabled":"");for(m in f.a_attr)if(f.a_attr.hasOwnProperty(m)){if("href"===m&&"#"===f.a_attr[m])continue;"class"!==m?b.childNodes[1].setAttribute(m,f.a_attr[m]):o+=" "+f.a_attr[m]}if(o.length&&(b.childNodes[1].className="jstree-anchor "+o),(f.icon&&f.icon!==!0||f.icon===!1)&&(f.icon===!1?b.childNodes[1].childNodes[0].className+=" jstree-themeicon-hidden":-1===f.icon.indexOf("/")&&-1===f.icon.indexOf(".")?b.childNodes[1].childNodes[0].className+=" "+f.icon+" jstree-themeicon-custom":(b.childNodes[1].childNodes[0].style.backgroundImage="url("+f.icon+")",b.childNodes[1].childNodes[0].style.backgroundPosition="center center",b.childNodes[1].childNodes[0].style.backgroundSize="auto",b.childNodes[1].childNodes[0].className+=" jstree-themeicon-custom")),this.settings.core.force_text?b.childNodes[1].appendChild(p.createTextNode(f.text)):b.childNodes[1].innerHTML+=f.text,c&&f.children.length&&(f.state.opened||e)&&f.state.loaded){for(n=p.createElement("UL"),n.setAttribute("role","group"),n.className="jstree-children",l=0,m=f.children.length;m>l;l++)n.appendChild(this.redraw_node(f.children[l],c,!0));b.appendChild(n)}if(k&&b.appendChild(k),!d){for(g||(g=this.element[0]),l=0,m=g.childNodes.length;m>l;l++)if(g.childNodes[l]&&g.childNodes[l].className&&-1!==g.childNodes[l].className.indexOf("jstree-children")){t=g.childNodes[l];break}t||(t=p.createElement("UL"),t.setAttribute("role","group"),t.className="jstree-children",g.appendChild(t)),g=t,h<g.childNodes.length?g.insertBefore(b,g.childNodes[h]):g.appendChild(b),r&&(u=this.element[0].scrollTop,v=this.element[0].scrollLeft,b.childNodes[1].focus(),this.element[0].scrollTop=u,this.element[0].scrollLeft=v)}return f.state.opened&&!f.state.loaded&&(f.state.opened=!1,setTimeout(a.proxy(function(){this.open_node(f.id,!1,0)},this),0)),b},open_node:function(c,d,e){var f,g,h,i;if(a.isArray(c)){for(c=c.slice(),f=0,g=c.length;g>f;f++)this.open_node(c[f],d,e);return!0}if(c=this.get_node(c),!c||c.id===a.jstree.root)return!1;if(e=e===b?this.settings.core.animation:e,!this.is_closed(c))return d&&d.call(this,c,!1),!1;if(this.is_loaded(c))h=this.get_node(c,!0),i=this,h.length&&(e&&h.children(".jstree-children").length&&h.children(".jstree-children").stop(!0,!0),c.children.length&&!this._firstChild(h.children(".jstree-children")[0])&&this.draw_children(c),e?(this.trigger("before_open",{node:c}),h.children(".jstree-children").css("display","none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded",!0).children(".jstree-children").stop(!0,!0).slideDown(e,function(){this.style.display="",i.trigger("after_open",{node:c})})):(this.trigger("before_open",{node:c}),h[0].className=h[0].className.replace("jstree-closed","jstree-open"),h[0].setAttribute("aria-expanded",!0))),c.state.opened=!0,d&&d.call(this,c,!0),h.length||this.trigger("before_open",{node:c}),this.trigger("open_node",{node:c}),e&&h.length||this.trigger("after_open",{node:c});else{if(this.is_loading(c))return setTimeout(a.proxy(function(){this.open_node(c,d,e)},this),500);this.load_node(c,function(a,b){return b?this.open_node(a,d,e):d?d.call(this,a,!1):!1})}},_open_to:function(b){if(b=this.get_node(b),!b||b.id===a.jstree.root)return!1;var c,d,e=b.parents;for(c=0,d=e.length;d>c;c+=1)c!==a.jstree.root&&this.open_node(e[c],!1,0);return a("#"+b.id.replace(a.jstree.idregex,"\\$&"),this.element)},close_node:function(c,d){var e,f,g,h;if(a.isArray(c)){for(c=c.slice(),e=0,f=c.length;f>e;e++)this.close_node(c[e],d);return!0}return c=this.get_node(c),c&&c.id!==a.jstree.root?this.is_closed(c)?!1:(d=d===b?this.settings.core.animation:d,g=this,h=this.get_node(c,!0),h.length&&(d?h.children(".jstree-children").attr("style","display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded",!1).children(".jstree-children").stop(!0,!0).slideUp(d,function(){this.style.display="",h.children(".jstree-children").remove(),g.trigger("after_close",{node:c})}):(h[0].className=h[0].className.replace("jstree-open","jstree-closed"),h.attr("aria-expanded",!1).children(".jstree-children").remove())),c.state.opened=!1,this.trigger("close_node",{node:c}),void(d&&h.length||this.trigger("after_close",{node:c}))):!1},toggle_node:function(b){var c,d;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.toggle_node(b[c]);return!0}return this.is_closed(b)?this.open_node(b):this.is_open(b)?this.close_node(b):void 0},open_all:function(b,c,d){if(b||(b=a.jstree.root),b=this.get_node(b),!b)return!1;var e=b.id===a.jstree.root?this.get_container_ul():this.get_node(b,!0),f,g,h;if(!e.length){for(f=0,g=b.children_d.length;g>f;f++)this.is_closed(this._model.data[b.children_d[f]])&&(this._model.data[b.children_d[f]].state.opened=!0);return this.trigger("open_all",{node:b})}d=d||e,h=this,e=this.is_closed(b)?e.find(".jstree-closed").addBack():e.find(".jstree-closed"),e.each(function(){h.open_node(this,function(a,b){b&&this.is_parent(a)&&this.open_all(a,c,d)},c||0)}),0===d.find(".jstree-closed").length&&this.trigger("open_all",{node:this.get_node(d)})},close_all:function(b,c){if(b||(b=a.jstree.root),b=this.get_node(b),!b)return!1;var d=b.id===a.jstree.root?this.get_container_ul():this.get_node(b,!0),e=this,f,g;for(d.length&&(d=this.is_open(b)?d.find(".jstree-open").addBack():d.find(".jstree-open"),a(d.get().reverse()).each(function(){e.close_node(this,c||0)})),f=0,g=b.children_d.length;g>f;f++)this._model.data[b.children_d[f]].state.opened=!1;this.trigger("close_all",{node:b})},is_disabled:function(a){return a=this.get_node(a),a&&a.state&&a.state.disabled},enable_node:function(b){var c,d;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.enable_node(b[c]);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(b.state.disabled=!1,this.get_node(b,!0).children(".jstree-anchor").removeClass("jstree-disabled").attr("aria-disabled",!1),void this.trigger("enable_node",{node:b})):!1},disable_node:function(b){var c,d;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.disable_node(b[c]);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(b.state.disabled=!0,this.get_node(b,!0).children(".jstree-anchor").addClass("jstree-disabled").attr("aria-disabled",!0),void this.trigger("disable_node",{node:b})):!1},hide_node:function(b,c){var d,e;if(a.isArray(b)){for(b=b.slice(),d=0,e=b.length;e>d;d++)this.hide_node(b[d],!0);return this.redraw(),!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?void(b.state.hidden||(b.state.hidden=!0,this._node_changed(b.parent),c||this.redraw(),this.trigger("hide_node",{node:b}))):!1},show_node:function(b,c){var d,e;if(a.isArray(b)){for(b=b.slice(),d=0,e=b.length;e>d;d++)this.show_node(b[d],!0);return this.redraw(),!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?void(b.state.hidden&&(b.state.hidden=!1,this._node_changed(b.parent),c||this.redraw(),this.trigger("show_node",{node:b}))):!1},hide_all:function(b){var c,d=this._model.data,e=[];for(c in d)d.hasOwnProperty(c)&&c!==a.jstree.root&&!d[c].state.hidden&&(d[c].state.hidden=!0,e.push(c));return this._model.force_full_redraw=!0,this.redraw(),this.trigger("hide_all",{nodes:e}),e},show_all:function(b){var c,d=this._model.data,e=[];for(c in d)d.hasOwnProperty(c)&&c!==a.jstree.root&&d[c].state.hidden&&(d[c].state.hidden=!1,e.push(c));return this._model.force_full_redraw=!0,this.redraw(),this.trigger("show_all",{nodes:e}),e},activate_node:function(a,c){if(this.is_disabled(a))return!1;if(c&&"object"==typeof c||(c={}),this._data.core.last_clicked=this._data.core.last_clicked&&this._data.core.last_clicked.id!==b?this.get_node(this._data.core.last_clicked.id):null,this._data.core.last_clicked&&!this._data.core.last_clicked.state.selected&&(this._data.core.last_clicked=null),!this._data.core.last_clicked&&this._data.core.selected.length&&(this._data.core.last_clicked=this.get_node(this._data.core.selected[this._data.core.selected.length-1])),this.settings.core.multiple&&(c.metaKey||c.ctrlKey||c.shiftKey)&&(!c.shiftKey||this._data.core.last_clicked&&this.get_parent(a)&&this.get_parent(a)===this._data.core.last_clicked.parent))if(c.shiftKey){var d=this.get_node(a).id,e=this._data.core.last_clicked.id,f=this.get_node(this._data.core.last_clicked.parent).children,g=!1,h,i;for(h=0,i=f.length;i>h;h+=1)f[h]===d&&(g=!g),f[h]===e&&(g=!g),this.is_disabled(f[h])||!g&&f[h]!==d&&f[h]!==e?this.deselect_node(f[h],!0,c):this.select_node(f[h],!0,!1,c);this.trigger("changed",{action:"select_node",node:this.get_node(a),selected:this._data.core.selected,event:c})}else this.is_selected(a)?this.deselect_node(a,!1,c):this.select_node(a,!1,!1,c);else!this.settings.core.multiple&&(c.metaKey||c.ctrlKey||c.shiftKey)&&this.is_selected(a)?this.deselect_node(a,!1,c):(this.deselect_all(!0),this.select_node(a,!1,!1,c),this._data.core.last_clicked=this.get_node(a));this.trigger("activate_node",{node:this.get_node(a),event:c})},hover_node:function(a){if(a=this.get_node(a,!0),!a||!a.length||a.children(".jstree-hovered").length)return!1;var b=this.element.find(".jstree-hovered"),c=this.element;b&&b.length&&this.dehover_node(b),a.children(".jstree-anchor").addClass("jstree-hovered"),this.trigger("hover_node",{node:this.get_node(a)}),setTimeout(function(){c.attr("aria-activedescendant",a[0].id)},0)},dehover_node:function(a){return a=this.get_node(a,!0),a&&a.length&&a.children(".jstree-hovered").length?(a.children(".jstree-anchor").removeClass("jstree-hovered"),void this.trigger("dehover_node",{node:this.get_node(a)})):!1},select_node:function(b,c,d,e){var f,g,h,i;if(a.isArray(b)){for(b=b.slice(),g=0,h=b.length;h>g;g++)this.select_node(b[g],c,d,e);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(f=this.get_node(b,!0),void(b.state.selected||(b.state.selected=!0,this._data.core.selected.push(b.id),d||(f=this._open_to(b)),f&&f.length&&f.attr("aria-selected",!0).children(".jstree-anchor").addClass("jstree-clicked"),this.trigger("select_node",{node:b,selected:this._data.core.selected,event:e}),c||this.trigger("changed",{action:"select_node",node:b,selected:this._data.core.selected,event:e})))):!1},deselect_node:function(b,c,d){var e,f,g;if(a.isArray(b)){for(b=b.slice(),e=0,f=b.length;f>e;e++)this.deselect_node(b[e],c,d);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(g=this.get_node(b,!0),void(b.state.selected&&(b.state.selected=!1,this._data.core.selected=a.vakata.array_remove_item(this._data.core.selected,b.id),g.length&&g.attr("aria-selected",!1).children(".jstree-anchor").removeClass("jstree-clicked"),this.trigger("deselect_node",{node:b,selected:this._data.core.selected,event:d}),c||this.trigger("changed",{action:"deselect_node",node:b,selected:this._data.core.selected,event:d})))):!1},select_all:function(b){var c=this._data.core.selected.concat([]),d,e;for(this._data.core.selected=this._model.data[a.jstree.root].children_d.concat(),d=0,e=this._data.core.selected.length;e>d;d++)this._model.data[this._data.core.selected[d]]&&(this._model.data[this._data.core.selected[d]].state.selected=!0);this.redraw(!0),this.trigger("select_all",{selected:this._data.core.selected}),b||this.trigger("changed",{action:"select_all",selected:this._data.core.selected,old_selection:c})},deselect_all:function(a){var b=this._data.core.selected.concat([]),c,d;for(c=0,d=this._data.core.selected.length;d>c;c++)this._model.data[this._data.core.selected[c]]&&(this._model.data[this._data.core.selected[c]].state.selected=!1);this._data.core.selected=[],this.element.find(".jstree-clicked").removeClass("jstree-clicked").parent().attr("aria-selected",!1),this.trigger("deselect_all",{selected:this._data.core.selected,node:b}),a||this.trigger("changed",{action:"deselect_all",selected:this._data.core.selected,old_selection:b})},is_selected:function(b){return b=this.get_node(b),b&&b.id!==a.jstree.root?b.state.selected:!1},get_selected:function(b){return b?a.map(this._data.core.selected,a.proxy(function(a){return this.get_node(a)},this)):this._data.core.selected.slice()},get_top_selected:function(b){var c=this.get_selected(!0),d={},e,f,g,h;for(e=0,f=c.length;f>e;e++)d[c[e].id]=c[e];for(e=0,f=c.length;f>e;e++)for(g=0,h=c[e].children_d.length;h>g;g++)d[c[e].children_d[g]]&&delete d[c[e].children_d[g]];c=[];for(e in d)d.hasOwnProperty(e)&&c.push(e);return b?a.map(c,a.proxy(function(a){return this.get_node(a)},this)):c},get_bottom_selected:function(b){var c=this.get_selected(!0),d=[],e,f;for(e=0,f=c.length;f>e;e++)c[e].children.length||d.push(c[e].id);return b?a.map(d,a.proxy(function(a){return this.get_node(a)},this)):d},get_state:function(){var b={core:{open:[],scroll:{left:this.element.scrollLeft(),top:this.element.scrollTop()},selected:[]}},c;for(c in this._model.data)this._model.data.hasOwnProperty(c)&&c!==a.jstree.root&&(this._model.data[c].state.opened&&b.core.open.push(c),this._model.data[c].state.selected&&b.core.selected.push(c));return b},set_state:function(c,d){if(c){if(c.core){var e,f,g,h,i;if(c.core.open)return a.isArray(c.core.open)&&c.core.open.length?this._load_nodes(c.core.open,function(a){this.open_node(a,!1,0),delete c.core.open,this.set_state(c,d)},!0):(delete c.core.open,this.set_state(c,d)),!1;if(c.core.scroll)return c.core.scroll&&c.core.scroll.left!==b&&this.element.scrollLeft(c.core.scroll.left),c.core.scroll&&c.core.scroll.top!==b&&this.element.scrollTop(c.core.scroll.top),delete c.core.scroll,this.set_state(c,d),!1;if(c.core.selected)return h=this,this.deselect_all(),a.each(c.core.selected,function(a,b){h.select_node(b,!1,!0)}),delete c.core.selected,this.set_state(c,d),!1;for(i in c)c.hasOwnProperty(i)&&"core"!==i&&-1===a.inArray(i,this.settings.plugins)&&delete c[i];if(a.isEmptyObject(c.core))return delete c.core,this.set_state(c,d),!1}return a.isEmptyObject(c)?(c=null,d&&d.call(this),this.trigger("set_state"),!1):!0}return!1},refresh:function(b,c){this._data.core.state=c===!0?{}:this.get_state(),c&&a.isFunction(c)&&(this._data.core.state=c.call(this,this._data.core.state)),this._cnt=0,this._model.data={},this._model.data[a.jstree.root]={id:a.jstree.root,parent:null,parents:[],children:[],children_d:[],state:{loaded:!1}},this._data.core.selected=[],this._data.core.last_clicked=null,this._data.core.focused=null;var d=this.get_container_ul()[0].className;b||(this.element.html("<ul class='"+d+"' role='group'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='treeitem' id='j"+this._id+"_loading'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>"+this.get_string("Loading ...")+"</a></li></ul>"),this.element.attr("aria-activedescendant","j"+this._id+"_loading")),this.load_node(a.jstree.root,function(b,c){c&&(this.get_container_ul()[0].className=d,this._firstChild(this.get_container_ul()[0])&&this.element.attr("aria-activedescendant",this._firstChild(this.get_container_ul()[0]).id),this.set_state(a.extend(!0,{},this._data.core.state),function(){this.trigger("refresh")})),this._data.core.state=null})},refresh_node:function(b){if(b=this.get_node(b),!b||b.id===a.jstree.root)return!1;var c=[],d=[],e=this._data.core.selected.concat([]);d.push(b.id),b.state.opened===!0&&c.push(b.id),this.get_node(b,!0).find(".jstree-open").each(function(){c.push(this.id)}),this._load_nodes(d,a.proxy(function(a){this.open_node(c,!1,0),this.select_node(this._data.core.selected),this.trigger("refresh_node",{node:b,nodes:a})},this))},set_id:function(b,c){if(b=this.get_node(b),!b||b.id===a.jstree.root)return!1;var d,e,f=this._model.data;for(c=c.toString(),f[b.parent].children[a.inArray(b.id,f[b.parent].children)]=c,d=0,e=b.parents.length;e>d;d++)f[b.parents[d]].children_d[a.inArray(b.id,f[b.parents[d]].children_d)]=c;for(d=0,e=b.children.length;e>d;d++)f[b.children[d]].parent=c;for(d=0,e=b.children_d.length;e>d;d++)f[b.children_d[d]].parents[a.inArray(b.id,f[b.children_d[d]].parents)]=c;return d=a.inArray(b.id,this._data.core.selected),-1!==d&&(this._data.core.selected[d]=c),d=this.get_node(b.id,!0),d&&(d.attr("id",c).children(".jstree-anchor").attr("id",c+"_anchor").end().attr("aria-labelledby",c+"_anchor"),this.element.attr("aria-activedescendant")===b.id&&this.element.attr("aria-activedescendant",c)),delete f[b.id],b.id=c,b.li_attr.id=c,f[c]=b,!0},get_text:function(b){return b=this.get_node(b),b&&b.id!==a.jstree.root?b.text:!1},set_text:function(b,c){var d,e;if(a.isArray(b)){for(b=b.slice(),d=0,e=b.length;e>d;d++)this.set_text(b[d],c);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(b.text=c,this.get_node(b,!0).length&&this.redraw_node(b.id),this.trigger("set_text",{obj:b,text:c}),!0):!1},get_json:function(b,c,d){if(b=this.get_node(b||a.jstree.root),!b)return!1;c&&c.flat&&!d&&(d=[]);var e={id:b.id,text:b.text,icon:this.get_icon(b),li_attr:a.extend(!0,{},b.li_attr),a_attr:a.extend(!0,{},b.a_attr),state:{},data:c&&c.no_data?!1:a.extend(!0,{},b.data)},f,g;if(c&&c.flat?e.parent=b.parent:e.children=[],!c||!c.no_state)for(f in b.state)b.state.hasOwnProperty(f)&&(e.state[f]=b.state[f]);if(c&&c.no_id&&(delete e.id,e.li_attr&&e.li_attr.id&&delete e.li_attr.id,e.a_attr&&e.a_attr.id&&delete e.a_attr.id),c&&c.flat&&b.id!==a.jstree.root&&d.push(e),!c||!c.no_children)for(f=0,g=b.children.length;g>f;f++)c&&c.flat?this.get_json(b.children[f],c,d):e.children.push(this.get_json(b.children[f],c));return c&&c.flat?d:b.id===a.jstree.root?e.children:e},create_node:function(c,d,e,f,g){if(null===c&&(c=a.jstree.root),c=this.get_node(c),!c)return!1;if(e=e===b?"last":e,!e.toString().match(/^(before|after)$/)&&!g&&!this.is_loaded(c))return this.load_node(c,function(){this.create_node(c,d,e,f,!0)});d||(d={text:this.get_string("New node")}),"string"==typeof d&&(d={text:d}),d.text===b&&(d.text=this.get_string("New node"));var h,i,j,k;switch(c.id===a.jstree.root&&("before"===e&&(e="first"),"after"===e&&(e="last")),e){case"before":h=this.get_node(c.parent),e=a.inArray(c.id,h.children),c=h;break;case"after":h=this.get_node(c.parent),e=a.inArray(c.id,h.children)+1,c=h;break;case"inside":case"first":e=0;break;case"last":e=c.children.length;break;default:e||(e=0)}if(e>c.children.length&&(e=c.children.length),d.id||(d.id=!0),!this.check("create_node",d,c,e))return this.settings.core.error.call(this,this._data.core.last_error),!1;if(d.id===!0&&delete d.id,d=this._parse_model_from_json(d,c.id,c.parents.concat()),!d)return!1;for(h=this.get_node(d),i=[],i.push(d),i=i.concat(h.children_d),this.trigger("model",{nodes:i,parent:c.id}),c.children_d=c.children_d.concat(i),j=0,k=c.parents.length;k>j;j++)this._model.data[c.parents[j]].children_d=this._model.data[c.parents[j]].children_d.concat(i);for(d=h,h=[],j=0,k=c.children.length;k>j;j++)h[j>=e?j+1:j]=c.children[j];return h[e]=d.id,c.children=h,this.redraw_node(c,!0),f&&f.call(this,this.get_node(d)),this.trigger("create_node",{node:this.get_node(d),parent:c.id,position:e}),d.id},rename_node:function(b,c){var d,e,f;if(a.isArray(b)){for(b=b.slice(),d=0,e=b.length;e>d;d++)this.rename_node(b[d],c);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(f=b.text,this.check("rename_node",b,this.get_parent(b),c)?(this.set_text(b,c),this.trigger("rename_node",{node:b,text:c,old:f}),!0):(this.settings.core.error.call(this,this._data.core.last_error),!1)):!1},delete_node:function(b){var c,d,e,f,g,h,i,j,k,l,m,n;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.delete_node(b[c]);return!0}if(b=this.get_node(b),!b||b.id===a.jstree.root)return!1;if(e=this.get_node(b.parent),f=a.inArray(b.id,e.children),l=!1,!this.check("delete_node",b,e,f))return this.settings.core.error.call(this,this._data.core.last_error),!1;for(-1!==f&&(e.children=a.vakata.array_remove(e.children,f)),g=b.children_d.concat([]),g.push(b.id),j=0,k=g.length;k>j;j++){for(h=0,i=b.parents.length;i>h;h++)f=a.inArray(g[j],this._model.data[b.parents[h]].children_d),-1!==f&&(this._model.data[b.parents[h]].children_d=a.vakata.array_remove(this._model.data[b.parents[h]].children_d,f));this._model.data[g[j]].state.selected&&(l=!0,f=a.inArray(g[j],this._data.core.selected),-1!==f&&(this._data.core.selected=a.vakata.array_remove(this._data.core.selected,f)))}for(this.trigger("delete_node",{node:b,parent:e.id}),l&&this.trigger("changed",{action:"delete_node",node:b,selected:this._data.core.selected,parent:e.id}),j=0,k=g.length;k>j;j++)delete this._model.data[g[j]];return-1!==a.inArray(this._data.core.focused,g)&&(this._data.core.focused=null,m=this.element[0].scrollTop,n=this.element[0].scrollLeft,e.id===a.jstree.root?this.get_node(this._model.data[a.jstree.root].children[0],!0).children(".jstree-anchor").focus():this.get_node(e,!0).children(".jstree-anchor").focus(),this.element[0].scrollTop=m,this.element[0].scrollLeft=n),this.redraw_node(e,!0),!0},check:function(b,c,d,e,f){c=c&&c.id?c:this.get_node(c),d=d&&d.id?d:this.get_node(d);var g=b.match(/^move_node|copy_node|create_node$/i)?d:c,h=this.settings.core.check_callback;return"move_node"!==b&&"copy_node"!==b||f&&f.is_multi||c.id!==d.id&&a.inArray(c.id,d.children)!==e&&-1===a.inArray(d.id,c.children_d)?(g&&g.data&&(g=g.data),g&&g.functions&&(g.functions[b]===!1||g.functions[b]===!0)?(g.functions[b]===!1&&(this._data.core.last_error={error:"check",plugin:"core",id:"core_02",reason:"Node data prevents function: "+b,data:JSON.stringify({chk:b,pos:e,obj:c&&c.id?c.id:!1,par:d&&d.id?d.id:!1})}),g.functions[b]):h===!1||a.isFunction(h)&&h.call(this,b,c,d,e,f)===!1||h&&h[b]===!1?(this._data.core.last_error={error:"check",plugin:"core",id:"core_03",reason:"User config for core.check_callback prevents function: "+b,data:JSON.stringify({chk:b,pos:e,obj:c&&c.id?c.id:!1,par:d&&d.id?d.id:!1})},!1):!0):(this._data.core.last_error={error:"check",plugin:"core",id:"core_01",reason:"Moving parent inside child",data:JSON.stringify({chk:b,pos:e,obj:c&&c.id?c.id:!1,par:d&&d.id?d.id:!1})},!1)},last_error:function(){return this._data.core.last_error},move_node:function(c,d,e,f,g,h,i){var j,k,l,m,n,o,p,q,r,s,t,u,v,w;if(d=this.get_node(d),e=e===b?0:e,!d)return!1;if(!e.toString().match(/^(before|after)$/)&&!g&&!this.is_loaded(d))return this.load_node(d,function(){this.move_node(c,d,e,f,!0,!1,i)});if(a.isArray(c)){if(1!==c.length){for(j=0,k=c.length;k>j;j++)(r=this.move_node(c[j],d,e,f,g,!1,i))&&(d=r,e="after");return this.redraw(),!0}c=c[0]}if(c=c&&c.id?c:this.get_node(c),!c||c.id===a.jstree.root)return!1;if(l=(c.parent||a.jstree.root).toString(),n=e.toString().match(/^(before|after)$/)&&d.id!==a.jstree.root?this.get_node(d.parent):d,o=i?i:this._model.data[c.id]?this:a.jstree.reference(c.id),p=!o||!o._id||this._id!==o._id,m=o&&o._id&&l&&o._model.data[l]&&o._model.data[l].children?a.inArray(c.id,o._model.data[l].children):-1,o&&o._id&&(c=o._model.data[c.id]),p)return(r=this.copy_node(c,d,e,f,g,!1,i))?(o&&o.delete_node(c),r):!1;switch(d.id===a.jstree.root&&("before"===e&&(e="first"),"after"===e&&(e="last")),e){case"before":e=a.inArray(d.id,n.children);break;case"after":e=a.inArray(d.id,n.children)+1;break;case"inside":case"first":e=0;break;case"last":e=n.children.length;break;default:e||(e=0)}if(e>n.children.length&&(e=n.children.length),!this.check("move_node",c,n,e,{core:!0,origin:i,is_multi:o&&o._id&&o._id!==this._id,is_foreign:!o||!o._id}))return this.settings.core.error.call(this,this._data.core.last_error),!1;if(c.parent===n.id){for(q=n.children.concat(),r=a.inArray(c.id,q),-1!==r&&(q=a.vakata.array_remove(q,r),e>r&&e--),r=[],s=0,t=q.length;t>s;s++)r[s>=e?s+1:s]=q[s];r[e]=c.id,n.children=r,this._node_changed(n.id),this.redraw(n.id===a.jstree.root)}else{for(r=c.children_d.concat(),r.push(c.id),s=0,t=c.parents.length;t>s;s++){for(q=[],w=o._model.data[c.parents[s]].children_d,u=0,v=w.length;v>u;u++)-1===a.inArray(w[u],r)&&q.push(w[u]);o._model.data[c.parents[s]].children_d=q}for(o._model.data[l].children=a.vakata.array_remove_item(o._model.data[l].children,c.id),s=0,t=n.parents.length;t>s;s++)this._model.data[n.parents[s]].children_d=this._model.data[n.parents[s]].children_d.concat(r);for(q=[],s=0,t=n.children.length;t>s;s++)q[s>=e?s+1:s]=n.children[s];for(q[e]=c.id,n.children=q,n.children_d.push(c.id),n.children_d=n.children_d.concat(c.children_d),c.parent=n.id,r=n.parents.concat(),r.unshift(n.id),w=c.parents.length,c.parents=r,r=r.concat(),s=0,t=c.children_d.length;t>s;s++)this._model.data[c.children_d[s]].parents=this._model.data[c.children_d[s]].parents.slice(0,-1*w),Array.prototype.push.apply(this._model.data[c.children_d[s]].parents,r);(l===a.jstree.root||n.id===a.jstree.root)&&(this._model.force_full_redraw=!0),this._model.force_full_redraw||(this._node_changed(l),this._node_changed(n.id)),h||this.redraw()}return f&&f.call(this,c,n,e),this.trigger("move_node",{node:c,parent:n.id,position:e,old_parent:l,old_position:m,is_multi:o&&o._id&&o._id!==this._id,is_foreign:!o||!o._id,old_instance:o,new_instance:this}),c.id},copy_node:function(c,d,e,f,g,h,i){var j,k,l,m,n,o,p,q,r,s,t;if(d=this.get_node(d),e=e===b?0:e,!d)return!1;if(!e.toString().match(/^(before|after)$/)&&!g&&!this.is_loaded(d))return this.load_node(d,function(){this.copy_node(c,d,e,f,!0,!1,i)});if(a.isArray(c)){if(1!==c.length){for(j=0,k=c.length;k>j;j++)(m=this.copy_node(c[j],d,e,f,g,!0,i))&&(d=m,e="after");return this.redraw(),!0}c=c[0]}if(c=c&&c.id?c:this.get_node(c),!c||c.id===a.jstree.root)return!1;switch(q=(c.parent||a.jstree.root).toString(),r=e.toString().match(/^(before|after)$/)&&d.id!==a.jstree.root?this.get_node(d.parent):d,s=i?i:this._model.data[c.id]?this:a.jstree.reference(c.id),t=!s||!s._id||this._id!==s._id,s&&s._id&&(c=s._model.data[c.id]),d.id===a.jstree.root&&("before"===e&&(e="first"),"after"===e&&(e="last")),e){case"before":e=a.inArray(d.id,r.children);break;case"after":e=a.inArray(d.id,r.children)+1;break;case"inside":case"first":e=0;break;case"last":e=r.children.length;break;default:e||(e=0)}if(e>r.children.length&&(e=r.children.length),!this.check("copy_node",c,r,e,{core:!0,origin:i,is_multi:s&&s._id&&s._id!==this._id,is_foreign:!s||!s._id}))return this.settings.core.error.call(this,this._data.core.last_error),!1;if(p=s?s.get_json(c,{no_id:!0,no_data:!0,no_state:!0}):c,!p)return!1;if(p.id===!0&&delete p.id,p=this._parse_model_from_json(p,r.id,r.parents.concat()),!p)return!1;for(m=this.get_node(p),c&&c.state&&c.state.loaded===!1&&(m.state.loaded=!1),l=[],l.push(p),l=l.concat(m.children_d),this.trigger("model",{nodes:l,parent:r.id}),n=0,o=r.parents.length;o>n;n++)this._model.data[r.parents[n]].children_d=this._model.data[r.parents[n]].children_d.concat(l);for(l=[],n=0,o=r.children.length;o>n;n++)l[n>=e?n+1:n]=r.children[n];return l[e]=m.id,r.children=l,r.children_d.push(m.id),r.children_d=r.children_d.concat(m.children_d),r.id===a.jstree.root&&(this._model.force_full_redraw=!0),this._model.force_full_redraw||this._node_changed(r.id),h||this.redraw(r.id===a.jstree.root),f&&f.call(this,m,r,e),this.trigger("copy_node",{node:m,original:c,parent:r.id,position:e,old_parent:q,old_position:s&&s._id&&q&&s._model.data[q]&&s._model.data[q].children?a.inArray(c.id,s._model.data[q].children):-1,is_multi:s&&s._id&&s._id!==this._id,is_foreign:!s||!s._id,old_instance:s,new_instance:this}),m.id},cut:function(b){if(b||(b=this._data.core.selected.concat()),a.isArray(b)||(b=[b]),!b.length)return!1;var c=[],g,h,i;for(h=0,i=b.length;i>h;h++)g=this.get_node(b[h]),g&&g.id&&g.id!==a.jstree.root&&c.push(g);return c.length?(d=c,f=this,e="move_node",void this.trigger("cut",{node:b})):!1},copy:function(b){if(b||(b=this._data.core.selected.concat()),a.isArray(b)||(b=[b]),!b.length)return!1;var c=[],g,h,i;for(h=0,i=b.length;i>h;h++)g=this.get_node(b[h]),g&&g.id&&g.id!==a.jstree.root&&c.push(g);return c.length?(d=c,f=this,e="copy_node",void this.trigger("copy",{node:b})):!1},get_buffer:function(){return{mode:e,node:d,inst:f}},can_paste:function(){return e!==!1&&d!==!1},paste:function(a,b){return a=this.get_node(a),a&&e&&e.match(/^(copy_node|move_node)$/)&&d?(this[e](d,a,b,!1,!1,!1,f)&&this.trigger("paste",{parent:a.id,node:d,mode:e}),d=!1,e=!1,void(f=!1)):!1},clear_buffer:function(){d=!1,e=!1,f=!1,this.trigger("clear_buffer")},edit:function(b,c,d){var e,f,g,h,i,j,k,l,m,n=!1;return(b=this.get_node(b))?this.settings.core.check_callback===!1?(this._data.core.last_error={error:"check",plugin:"core",id:"core_07",reason:"Could not edit node because of check_callback"},this.settings.core.error.call(this,this._data.core.last_error),!1):(m=b,c="string"==typeof c?c:b.text,this.set_text(b,""),b=this._open_to(b),m.text=c,e=this._data.core.rtl,f=this.element.width(),this._data.core.focused=m.id,g=b.children(".jstree-anchor").focus(),h=a("<span>"),i=c,j=a("<div />",{css:{position:"absolute",top:"-200px",left:e?"0px":"-1000px",visibility:"hidden"}}).appendTo("body"),k=a("<input />",{value:i,"class":"jstree-rename-input",css:{padding:"0",border:"1px solid silver","box-sizing":"border-box",display:"inline-block",height:this._data.core.li_height+"px",lineHeight:this._data.core.li_height+"px",width:"150px"},blur:a.proxy(function(c){c.stopImmediatePropagation(),c.preventDefault();var e=h.children(".jstree-rename-input"),f=e.val(),k=this.settings.core.force_text,l;""===f&&(f=i),j.remove(),h.replaceWith(g),h.remove(),i=k?i:a("<div></div>").append(a.parseHTML(i)).html(),this.set_text(b,i),l=!!this.rename_node(b,k?a("<div></div>").text(f).text():a("<div></div>").append(a.parseHTML(f)).html()),l||this.set_text(b,i),this._data.core.focused=m.id,setTimeout(a.proxy(function(){var a=this.get_node(m.id,!0);a.length&&(this._data.core.focused=m.id,a.children(".jstree-anchor").focus())},this),0),d&&d.call(this,m,l,n)},this),keydown:function(a){var b=a.which;27===b&&(n=!0,this.value=i),(27===b||13===b||37===b||38===b||39===b||40===b||32===b)&&a.stopImmediatePropagation(),(27===b||13===b)&&(a.preventDefault(),this.blur())},click:function(a){a.stopImmediatePropagation()},mousedown:function(a){a.stopImmediatePropagation()},keyup:function(a){k.width(Math.min(j.text("pW"+this.value).width(),f))},keypress:function(a){return 13===a.which?!1:void 0}}),l={fontFamily:g.css("fontFamily")||"",fontSize:g.css("fontSize")||"",fontWeight:g.css("fontWeight")||"",fontStyle:g.css("fontStyle")||"",fontStretch:g.css("fontStretch")||"",fontVariant:g.css("fontVariant")||"",letterSpacing:g.css("letterSpacing")||"",wordSpacing:g.css("wordSpacing")||""},h.attr("class",g.attr("class")).append(g.contents().clone()).append(k),g.replaceWith(h),j.css(l),void k.css(l).width(Math.min(j.text("pW"+k[0].value).width(),f))[0].select()):!1},set_theme:function(b,c){if(!b)return!1;if(c===!0){var d=this.settings.core.themes.dir;d||(d=a.jstree.path+"/themes"),c=d+"/"+b+"/style.css"}c&&-1===a.inArray(c,g)&&(a("head").append('<link rel="stylesheet" href="'+c+'" type="text/css" />'),g.push(c)),this._data.core.themes.name&&this.element.removeClass("jstree-"+this._data.core.themes.name),
this._data.core.themes.name=b,this.element.addClass("jstree-"+b),this.element[this.settings.core.themes.responsive?"addClass":"removeClass"]("jstree-"+b+"-responsive"),this.trigger("set_theme",{theme:b})},get_theme:function(){return this._data.core.themes.name},set_theme_variant:function(a){this._data.core.themes.variant&&this.element.removeClass("jstree-"+this._data.core.themes.name+"-"+this._data.core.themes.variant),this._data.core.themes.variant=a,a&&this.element.addClass("jstree-"+this._data.core.themes.name+"-"+this._data.core.themes.variant)},get_theme_variant:function(){return this._data.core.themes.variant},show_stripes:function(){this._data.core.themes.stripes=!0,this.get_container_ul().addClass("jstree-striped")},hide_stripes:function(){this._data.core.themes.stripes=!1,this.get_container_ul().removeClass("jstree-striped")},toggle_stripes:function(){this._data.core.themes.stripes?this.hide_stripes():this.show_stripes()},show_dots:function(){this._data.core.themes.dots=!0,this.get_container_ul().removeClass("jstree-no-dots")},hide_dots:function(){this._data.core.themes.dots=!1,this.get_container_ul().addClass("jstree-no-dots")},toggle_dots:function(){this._data.core.themes.dots?this.hide_dots():this.show_dots()},show_icons:function(){this._data.core.themes.icons=!0,this.get_container_ul().removeClass("jstree-no-icons")},hide_icons:function(){this._data.core.themes.icons=!1,this.get_container_ul().addClass("jstree-no-icons")},toggle_icons:function(){this._data.core.themes.icons?this.hide_icons():this.show_icons()},set_icon:function(c,d){var e,f,g,h;if(a.isArray(c)){for(c=c.slice(),e=0,f=c.length;f>e;e++)this.set_icon(c[e],d);return!0}return c=this.get_node(c),c&&c.id!==a.jstree.root?(h=c.icon,c.icon=d===!0||null===d||d===b||""===d?!0:d,g=this.get_node(c,!0).children(".jstree-anchor").children(".jstree-themeicon"),d===!1?this.hide_icon(c):d===!0||null===d||d===b||""===d?(g.removeClass("jstree-themeicon-custom "+h).css("background","").removeAttr("rel"),h===!1&&this.show_icon(c)):-1===d.indexOf("/")&&-1===d.indexOf(".")?(g.removeClass(h).css("background",""),g.addClass(d+" jstree-themeicon-custom").attr("rel",d),h===!1&&this.show_icon(c)):(g.removeClass(h).css("background",""),g.addClass("jstree-themeicon-custom").css("background","url('"+d+"') center center no-repeat").attr("rel",d),h===!1&&this.show_icon(c)),!0):!1},get_icon:function(b){return b=this.get_node(b),b&&b.id!==a.jstree.root?b.icon:!1},hide_icon:function(b){var c,d;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.hide_icon(b[c]);return!0}return b=this.get_node(b),b&&b!==a.jstree.root?(b.icon=!1,this.get_node(b,!0).children(".jstree-anchor").children(".jstree-themeicon").addClass("jstree-themeicon-hidden"),!0):!1},show_icon:function(b){var c,d,e;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.show_icon(b[c]);return!0}return b=this.get_node(b),b&&b!==a.jstree.root?(e=this.get_node(b,!0),b.icon=e.length?e.children(".jstree-anchor").children(".jstree-themeicon").attr("rel"):!0,b.icon||(b.icon=!0),e.children(".jstree-anchor").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden"),!0):!1}},a.vakata={},a.vakata.attributes=function(b,c){b=a(b)[0];var d=c?{}:[];return b&&b.attributes&&a.each(b.attributes,function(b,e){-1===a.inArray(e.name.toLowerCase(),["style","contenteditable","hasfocus","tabindex"])&&null!==e.value&&""!==a.trim(e.value)&&(c?d[e.name]=e.value:d.push(e.name))}),d},a.vakata.array_unique=function(a){var c=[],d,e,f,g={};for(d=0,f=a.length;f>d;d++)g[a[d]]===b&&(c.push(a[d]),g[a[d]]=!0);return c},a.vakata.array_remove=function(a,b,c){var d=a.slice((c||b)+1||a.length);return a.length=0>b?a.length+b:b,a.push.apply(a,d),a},a.vakata.array_remove_item=function(b,c){var d=a.inArray(c,b);return-1!==d?a.vakata.array_remove(b,d):b},a.jstree.plugins.changed=function(a,b){var c=[];this.trigger=function(a,d){var e,f;if(d||(d={}),"changed"===a.replace(".jstree","")){d.changed={selected:[],deselected:[]};var g={};for(e=0,f=c.length;f>e;e++)g[c[e]]=1;for(e=0,f=d.selected.length;f>e;e++)g[d.selected[e]]?g[d.selected[e]]=2:d.changed.selected.push(d.selected[e]);for(e=0,f=c.length;f>e;e++)1===g[c[e]]&&d.changed.deselected.push(c[e]);c=d.selected.slice()}b.trigger.call(this,a,d)},this.refresh=function(a,d){return c=[],b.refresh.apply(this,arguments)}};var m=i.createElement("I");m.className="jstree-icon jstree-checkbox",m.setAttribute("role","presentation"),a.jstree.defaults.checkbox={visible:!0,three_state:!0,whole_node:!0,keep_selected_style:!0,cascade:"",tie_selection:!0},a.jstree.plugins.checkbox=function(c,d){this.bind=function(){d.bind.call(this),this._data.checkbox.uto=!1,this._data.checkbox.selected=[],this.settings.checkbox.three_state&&(this.settings.checkbox.cascade="up+down+undetermined"),this.element.on("init.jstree",a.proxy(function(){this._data.checkbox.visible=this.settings.checkbox.visible,this.settings.checkbox.keep_selected_style||this.element.addClass("jstree-checkbox-no-clicked"),this.settings.checkbox.tie_selection&&this.element.addClass("jstree-checkbox-selection")},this)).on("loading.jstree",a.proxy(function(){this[this._data.checkbox.visible?"show_checkboxes":"hide_checkboxes"]()},this)),-1!==this.settings.checkbox.cascade.indexOf("undetermined")&&this.element.on("changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree",a.proxy(function(){this._data.checkbox.uto&&clearTimeout(this._data.checkbox.uto),this._data.checkbox.uto=setTimeout(a.proxy(this._undetermined,this),50)},this)),this.settings.checkbox.tie_selection||this.element.on("model.jstree",a.proxy(function(a,b){var c=this._model.data,d=c[b.parent],e=b.nodes,f,g;for(f=0,g=e.length;g>f;f++)c[e[f]].state.checked=c[e[f]].state.checked||c[e[f]].original&&c[e[f]].original.state&&c[e[f]].original.state.checked,c[e[f]].state.checked&&this._data.checkbox.selected.push(e[f])},this)),(-1!==this.settings.checkbox.cascade.indexOf("up")||-1!==this.settings.checkbox.cascade.indexOf("down"))&&this.element.on("model.jstree",a.proxy(function(b,c){var d=this._model.data,e=d[c.parent],f=c.nodes,g=[],h,i,j,k,l,m,n=this.settings.checkbox.cascade,o=this.settings.checkbox.tie_selection;if(-1!==n.indexOf("down"))if(e.state[o?"selected":"checked"]){for(i=0,j=f.length;j>i;i++)d[f[i]].state[o?"selected":"checked"]=!0;this._data[o?"core":"checkbox"].selected=this._data[o?"core":"checkbox"].selected.concat(f)}else for(i=0,j=f.length;j>i;i++)if(d[f[i]].state[o?"selected":"checked"]){for(k=0,l=d[f[i]].children_d.length;l>k;k++)d[d[f[i]].children_d[k]].state[o?"selected":"checked"]=!0;this._data[o?"core":"checkbox"].selected=this._data[o?"core":"checkbox"].selected.concat(d[f[i]].children_d)}if(-1!==n.indexOf("up")){for(i=0,j=e.children_d.length;j>i;i++)d[e.children_d[i]].children.length||g.push(d[e.children_d[i]].parent);for(g=a.vakata.array_unique(g),k=0,l=g.length;l>k;k++){e=d[g[k]];while(e&&e.id!==a.jstree.root){for(h=0,i=0,j=e.children.length;j>i;i++)h+=d[e.children[i]].state[o?"selected":"checked"];if(h!==j)break;e.state[o?"selected":"checked"]=!0,this._data[o?"core":"checkbox"].selected.push(e.id),m=this.get_node(e,!0),m&&m.length&&m.attr("aria-selected",!0).children(".jstree-anchor").addClass(o?"jstree-clicked":"jstree-checked"),e=this.get_node(e.parent)}}}this._data[o?"core":"checkbox"].selected=a.vakata.array_unique(this._data[o?"core":"checkbox"].selected)},this)).on(this.settings.checkbox.tie_selection?"select_node.jstree":"check_node.jstree",a.proxy(function(b,c){var d=c.node,e=this._model.data,f=this.get_node(d.parent),g=this.get_node(d,!0),h,i,j,k,l=this.settings.checkbox.cascade,m=this.settings.checkbox.tie_selection;if(-1!==l.indexOf("down"))for(this._data[m?"core":"checkbox"].selected=a.vakata.array_unique(this._data[m?"core":"checkbox"].selected.concat(d.children_d)),h=0,i=d.children_d.length;i>h;h++)k=e[d.children_d[h]],k.state[m?"selected":"checked"]=!0,k&&k.original&&k.original.state&&k.original.state.undetermined&&(k.original.state.undetermined=!1);if(-1!==l.indexOf("up"))while(f&&f.id!==a.jstree.root){for(j=0,h=0,i=f.children.length;i>h;h++)j+=e[f.children[h]].state[m?"selected":"checked"];if(j!==i)break;f.state[m?"selected":"checked"]=!0,this._data[m?"core":"checkbox"].selected.push(f.id),k=this.get_node(f,!0),k&&k.length&&k.attr("aria-selected",!0).children(".jstree-anchor").addClass(m?"jstree-clicked":"jstree-checked"),f=this.get_node(f.parent)}-1!==l.indexOf("down")&&g.length&&g.find(".jstree-anchor").addClass(m?"jstree-clicked":"jstree-checked").parent().attr("aria-selected",!0)},this)).on(this.settings.checkbox.tie_selection?"deselect_all.jstree":"uncheck_all.jstree",a.proxy(function(b,c){var d=this.get_node(a.jstree.root),e=this._model.data,f,g,h;for(f=0,g=d.children_d.length;g>f;f++)h=e[d.children_d[f]],h&&h.original&&h.original.state&&h.original.state.undetermined&&(h.original.state.undetermined=!1)},this)).on(this.settings.checkbox.tie_selection?"deselect_node.jstree":"uncheck_node.jstree",a.proxy(function(b,c){var d=c.node,e=this.get_node(d,!0),f,g,h,i=this.settings.checkbox.cascade,j=this.settings.checkbox.tie_selection;if(d&&d.original&&d.original.state&&d.original.state.undetermined&&(d.original.state.undetermined=!1),-1!==i.indexOf("down"))for(f=0,g=d.children_d.length;g>f;f++)h=this._model.data[d.children_d[f]],h.state[j?"selected":"checked"]=!1,h&&h.original&&h.original.state&&h.original.state.undetermined&&(h.original.state.undetermined=!1);if(-1!==i.indexOf("up"))for(f=0,g=d.parents.length;g>f;f++)h=this._model.data[d.parents[f]],h.state[j?"selected":"checked"]=!1,h&&h.original&&h.original.state&&h.original.state.undetermined&&(h.original.state.undetermined=!1),h=this.get_node(d.parents[f],!0),h&&h.length&&h.attr("aria-selected",!1).children(".jstree-anchor").removeClass(j?"jstree-clicked":"jstree-checked");for(h=[],f=0,g=this._data[j?"core":"checkbox"].selected.length;g>f;f++)-1!==i.indexOf("down")&&-1!==a.inArray(this._data[j?"core":"checkbox"].selected[f],d.children_d)||-1!==i.indexOf("up")&&-1!==a.inArray(this._data[j?"core":"checkbox"].selected[f],d.parents)||h.push(this._data[j?"core":"checkbox"].selected[f]);this._data[j?"core":"checkbox"].selected=a.vakata.array_unique(h),-1!==i.indexOf("down")&&e.length&&e.find(".jstree-anchor").removeClass(j?"jstree-clicked":"jstree-checked").parent().attr("aria-selected",!1)},this)),-1!==this.settings.checkbox.cascade.indexOf("up")&&this.element.on("delete_node.jstree",a.proxy(function(b,c){var d=this.get_node(c.parent),e=this._model.data,f,g,h,i,j=this.settings.checkbox.tie_selection;while(d&&d.id!==a.jstree.root){for(h=0,f=0,g=d.children.length;g>f;f++)h+=e[d.children[f]].state[j?"selected":"checked"];if(h!==g)break;d.state[j?"selected":"checked"]=!0,this._data[j?"core":"checkbox"].selected.push(d.id),i=this.get_node(d,!0),i&&i.length&&i.attr("aria-selected",!0).children(".jstree-anchor").addClass(j?"jstree-clicked":"jstree-checked"),d=this.get_node(d.parent)}},this)).on("move_node.jstree",a.proxy(function(b,c){var d=c.is_multi,e=c.old_parent,f=this.get_node(c.parent),g=this._model.data,h,i,j,k,l,m=this.settings.checkbox.tie_selection;if(!d){h=this.get_node(e);while(h&&h.id!==a.jstree.root){for(i=0,j=0,k=h.children.length;k>j;j++)i+=g[h.children[j]].state[m?"selected":"checked"];if(i!==k)break;h.state[m?"selected":"checked"]=!0,this._data[m?"core":"checkbox"].selected.push(h.id),l=this.get_node(h,!0),l&&l.length&&l.attr("aria-selected",!0).children(".jstree-anchor").addClass(m?"jstree-clicked":"jstree-checked"),h=this.get_node(h.parent)}}h=f;while(h&&h.id!==a.jstree.root){for(i=0,j=0,k=h.children.length;k>j;j++)i+=g[h.children[j]].state[m?"selected":"checked"];if(i===k)h.state[m?"selected":"checked"]||(h.state[m?"selected":"checked"]=!0,this._data[m?"core":"checkbox"].selected.push(h.id),l=this.get_node(h,!0),l&&l.length&&l.attr("aria-selected",!0).children(".jstree-anchor").addClass(m?"jstree-clicked":"jstree-checked"));else{if(!h.state[m?"selected":"checked"])break;h.state[m?"selected":"checked"]=!1,this._data[m?"core":"checkbox"].selected=a.vakata.array_remove_item(this._data[m?"core":"checkbox"].selected,h.id),l=this.get_node(h,!0),l&&l.length&&l.attr("aria-selected",!1).children(".jstree-anchor").removeClass(m?"jstree-clicked":"jstree-checked")}h=this.get_node(h.parent)}},this))},this._undetermined=function(){if(null!==this.element){var c,d,e,f,g={},h=this._model.data,i=this.settings.checkbox.tie_selection,j=this._data[i?"core":"checkbox"].selected,k=[],l=this;for(c=0,d=j.length;d>c;c++)if(h[j[c]]&&h[j[c]].parents)for(e=0,f=h[j[c]].parents.length;f>e;e++)g[h[j[c]].parents[e]]===b&&h[j[c]].parents[e]!==a.jstree.root&&(g[h[j[c]].parents[e]]=!0,k.push(h[j[c]].parents[e]));for(this.element.find(".jstree-closed").not(":has(.jstree-children)").each(function(){var i=l.get_node(this),j;if(i.state.loaded){for(c=0,d=i.children_d.length;d>c;c++)if(j=h[i.children_d[c]],!j.state.loaded&&j.original&&j.original.state&&j.original.state.undetermined&&j.original.state.undetermined===!0)for(g[j.id]===b&&j.id!==a.jstree.root&&(g[j.id]=!0,k.push(j.id)),e=0,f=j.parents.length;f>e;e++)g[j.parents[e]]===b&&j.parents[e]!==a.jstree.root&&(g[j.parents[e]]=!0,k.push(j.parents[e]))}else if(i.original&&i.original.state&&i.original.state.undetermined&&i.original.state.undetermined===!0)for(g[i.id]===b&&i.id!==a.jstree.root&&(g[i.id]=!0,k.push(i.id)),e=0,f=i.parents.length;f>e;e++)g[i.parents[e]]===b&&i.parents[e]!==a.jstree.root&&(g[i.parents[e]]=!0,k.push(i.parents[e]))}),this.element.find(".jstree-undetermined").removeClass("jstree-undetermined"),c=0,d=k.length;d>c;c++)h[k[c]].state[i?"selected":"checked"]||(j=this.get_node(k[c],!0),j&&j.length&&j.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-undetermined"))}},this.redraw_node=function(b,c,e,f){if(b=d.redraw_node.apply(this,arguments)){var g,h,i=null,j=null;for(g=0,h=b.childNodes.length;h>g;g++)if(b.childNodes[g]&&b.childNodes[g].className&&-1!==b.childNodes[g].className.indexOf("jstree-anchor")){i=b.childNodes[g];break}i&&(!this.settings.checkbox.tie_selection&&this._model.data[b.id].state.checked&&(i.className+=" jstree-checked"),j=m.cloneNode(!1),this._model.data[b.id].state.checkbox_disabled&&(j.className+=" jstree-checkbox-disabled"),i.insertBefore(j,i.childNodes[0]))}return e||-1===this.settings.checkbox.cascade.indexOf("undetermined")||(this._data.checkbox.uto&&clearTimeout(this._data.checkbox.uto),this._data.checkbox.uto=setTimeout(a.proxy(this._undetermined,this),50)),b},this.show_checkboxes=function(){this._data.core.themes.checkboxes=!0,this.get_container_ul().removeClass("jstree-no-checkboxes")},this.hide_checkboxes=function(){this._data.core.themes.checkboxes=!1,this.get_container_ul().addClass("jstree-no-checkboxes")},this.toggle_checkboxes=function(){this._data.core.themes.checkboxes?this.hide_checkboxes():this.show_checkboxes()},this.is_undetermined=function(b){b=this.get_node(b);var c=this.settings.checkbox.cascade,d,e,f=this.settings.checkbox.tie_selection,g=this._data[f?"core":"checkbox"].selected,h=this._model.data;if(!b||b.state[f?"selected":"checked"]===!0||-1===c.indexOf("undetermined")||-1===c.indexOf("down")&&-1===c.indexOf("up"))return!1;if(!b.state.loaded&&b.original.state.undetermined===!0)return!0;for(d=0,e=b.children_d.length;e>d;d++)if(-1!==a.inArray(b.children_d[d],g)||!h[b.children_d[d]].state.loaded&&h[b.children_d[d]].original.state.undetermined)return!0;return!1},this.disable_checkbox=function(b){var c,d,e;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.disable_checkbox(b[c]);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(e=this.get_node(b,!0),void(b.state.checkbox_disabled||(b.state.checkbox_disabled=!0,e&&e.length&&e.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-checkbox-disabled"),this.trigger("disable_checkbox",{node:b})))):!1},this.enable_checkbox=function(b){var c,d,e;if(a.isArray(b)){for(b=b.slice(),c=0,d=b.length;d>c;c++)this.enable_checkbox(b[c]);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(e=this.get_node(b,!0),void(b.state.checkbox_disabled&&(b.state.checkbox_disabled=!1,e&&e.length&&e.children(".jstree-anchor").children(".jstree-checkbox").removeClass("jstree-checkbox-disabled"),this.trigger("enable_checkbox",{node:b})))):!1},this.activate_node=function(b,c){return a(c.target).hasClass("jstree-checkbox-disabled")?!1:(this.settings.checkbox.tie_selection&&(this.settings.checkbox.whole_node||a(c.target).hasClass("jstree-checkbox"))&&(c.ctrlKey=!0),this.settings.checkbox.tie_selection||!this.settings.checkbox.whole_node&&!a(c.target).hasClass("jstree-checkbox")?d.activate_node.call(this,b,c):this.is_disabled(b)?!1:(this.is_checked(b)?this.uncheck_node(b,c):this.check_node(b,c),void this.trigger("activate_node",{node:this.get_node(b)})))},this.check_node=function(b,c){if(this.settings.checkbox.tie_selection)return this.select_node(b,!1,!0,c);var d,e,f,g;if(a.isArray(b)){for(b=b.slice(),e=0,f=b.length;f>e;e++)this.check_node(b[e],c);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(d=this.get_node(b,!0),void(b.state.checked||(b.state.checked=!0,this._data.checkbox.selected.push(b.id),d&&d.length&&d.children(".jstree-anchor").addClass("jstree-checked"),this.trigger("check_node",{node:b,selected:this._data.checkbox.selected,event:c})))):!1},this.uncheck_node=function(b,c){if(this.settings.checkbox.tie_selection)return this.deselect_node(b,!1,c);var d,e,f;if(a.isArray(b)){for(b=b.slice(),d=0,e=b.length;e>d;d++)this.uncheck_node(b[d],c);return!0}return b=this.get_node(b),b&&b.id!==a.jstree.root?(f=this.get_node(b,!0),void(b.state.checked&&(b.state.checked=!1,this._data.checkbox.selected=a.vakata.array_remove_item(this._data.checkbox.selected,b.id),f.length&&f.children(".jstree-anchor").removeClass("jstree-checked"),this.trigger("uncheck_node",{node:b,selected:this._data.checkbox.selected,event:c})))):!1},this.check_all=function(){if(this.settings.checkbox.tie_selection)return this.select_all();var b=this._data.checkbox.selected.concat([]),c,d;for(this._data.checkbox.selected=this._model.data[a.jstree.root].children_d.concat(),c=0,d=this._data.checkbox.selected.length;d>c;c++)this._model.data[this._data.checkbox.selected[c]]&&(this._model.data[this._data.checkbox.selected[c]].state.checked=!0);this.redraw(!0),this.trigger("check_all",{selected:this._data.checkbox.selected})},this.uncheck_all=function(){if(this.settings.checkbox.tie_selection)return this.deselect_all();var a=this._data.checkbox.selected.concat([]),b,c;for(b=0,c=this._data.checkbox.selected.length;c>b;b++)this._model.data[this._data.checkbox.selected[b]]&&(this._model.data[this._data.checkbox.selected[b]].state.checked=!1);this._data.checkbox.selected=[],this.element.find(".jstree-checked").removeClass("jstree-checked"),this.trigger("uncheck_all",{selected:this._data.checkbox.selected,node:a})},this.is_checked=function(b){return this.settings.checkbox.tie_selection?this.is_selected(b):(b=this.get_node(b),b&&b.id!==a.jstree.root?b.state.checked:!1)},this.get_checked=function(b){return this.settings.checkbox.tie_selection?this.get_selected(b):b?a.map(this._data.checkbox.selected,a.proxy(function(a){return this.get_node(a)},this)):this._data.checkbox.selected},this.get_top_checked=function(b){if(this.settings.checkbox.tie_selection)return this.get_top_selected(b);var c=this.get_checked(!0),d={},e,f,g,h;for(e=0,f=c.length;f>e;e++)d[c[e].id]=c[e];for(e=0,f=c.length;f>e;e++)for(g=0,h=c[e].children_d.length;h>g;g++)d[c[e].children_d[g]]&&delete d[c[e].children_d[g]];c=[];for(e in d)d.hasOwnProperty(e)&&c.push(e);return b?a.map(c,a.proxy(function(a){return this.get_node(a)},this)):c},this.get_bottom_checked=function(b){if(this.settings.checkbox.tie_selection)return this.get_bottom_selected(b);var c=this.get_checked(!0),d=[],e,f;for(e=0,f=c.length;f>e;e++)c[e].children.length||d.push(c[e].id);return b?a.map(d,a.proxy(function(a){return this.get_node(a)},this)):d},this.load_node=function(b,c){var e,f,g,h,i,j;if(!a.isArray(b)&&!this.settings.checkbox.tie_selection&&(j=this.get_node(b),j&&j.state.loaded))for(e=0,f=j.children_d.length;f>e;e++)this._model.data[j.children_d[e]].state.checked&&(i=!0,this._data.checkbox.selected=a.vakata.array_remove_item(this._data.checkbox.selected,j.children_d[e]));return d.load_node.apply(this,arguments)},this.get_state=function(){var a=d.get_state.apply(this,arguments);return this.settings.checkbox.tie_selection?a:(a.checkbox=this._data.checkbox.selected.slice(),a)},this.set_state=function(b,c){var e=d.set_state.apply(this,arguments);if(e&&b.checkbox){if(!this.settings.checkbox.tie_selection){this.uncheck_all();var f=this;a.each(b.checkbox,function(a,b){f.check_node(b)})}return delete b.checkbox,this.set_state(b,c),!1}return e},this.refresh=function(a,b){return this.settings.checkbox.tie_selection||(this._data.checkbox.selected=[]),d.refresh.apply(this,arguments)}},a.jstree.defaults.conditionalselect=function(){return!0},a.jstree.plugins.conditionalselect=function(a,b){this.activate_node=function(a,c){this.settings.conditionalselect.call(this,this.get_node(a),c)&&b.activate_node.call(this,a,c)}},a.jstree.defaults.contextmenu={select_node:!0,show_at_node:!0,items:function(b,c){return{create:{separator_before:!1,separator_after:!0,_disabled:!1,label:"Create",action:function(b){var c=a.jstree.reference(b.reference),d=c.get_node(b.reference);c.create_node(d,{},"last",function(a){setTimeout(function(){c.edit(a)},0)})}},rename:{separator_before:!1,separator_after:!1,_disabled:!1,label:"Rename",action:function(b){var c=a.jstree.reference(b.reference),d=c.get_node(b.reference);c.edit(d)}},remove:{separator_before:!1,icon:!1,separator_after:!1,_disabled:!1,label:"Delete",action:function(b){var c=a.jstree.reference(b.reference),d=c.get_node(b.reference);c.is_selected(d)?c.delete_node(c.get_selected()):c.delete_node(d)}},ccp:{separator_before:!0,icon:!1,separator_after:!1,label:"Edit",action:!1,submenu:{cut:{separator_before:!1,separator_after:!1,label:"Cut",action:function(b){var c=a.jstree.reference(b.reference),d=c.get_node(b.reference);c.is_selected(d)?c.cut(c.get_top_selected()):c.cut(d)}},copy:{separator_before:!1,icon:!1,separator_after:!1,label:"Copy",action:function(b){var c=a.jstree.reference(b.reference),d=c.get_node(b.reference);c.is_selected(d)?c.copy(c.get_top_selected()):c.copy(d)}},paste:{separator_before:!1,icon:!1,_disabled:function(b){return!a.jstree.reference(b.reference).can_paste()},separator_after:!1,label:"Paste",action:function(b){var c=a.jstree.reference(b.reference),d=c.get_node(b.reference);c.paste(d)}}}}}}},a.jstree.plugins.contextmenu=function(c,d){this.bind=function(){d.bind.call(this);var b=0,c=null,e,f;this.element.on("contextmenu.jstree",".jstree-anchor",a.proxy(function(a,d){a.preventDefault(),b=a.ctrlKey?+new Date:0,(d||c)&&(b=+new Date+1e4),c&&clearTimeout(c),this.is_loading(a.currentTarget)||this.show_contextmenu(a.currentTarget,a.pageX,a.pageY,a)},this)).on("click.jstree",".jstree-anchor",a.proxy(function(c){this._data.contextmenu.visible&&(!b||+new Date-b>250)&&a.vakata.context.hide(),b=0},this)).on("touchstart.jstree",".jstree-anchor",function(b){b.originalEvent&&b.originalEvent.changedTouches&&b.originalEvent.changedTouches[0]&&(e=b.pageX,f=b.pageY,c=setTimeout(function(){a(b.currentTarget).trigger("contextmenu",!0)},750))}).on("touchmove.vakata.jstree",function(a){c&&a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches[0]&&(Math.abs(e-a.pageX)>50||Math.abs(f-a.pageY)>50)&&clearTimeout(c)}).on("touchend.vakata.jstree",function(a){c&&clearTimeout(c)}),a(i).on("context_hide.vakata.jstree",a.proxy(function(){this._data.contextmenu.visible=!1},this))},this.teardown=function(){this._data.contextmenu.visible&&a.vakata.context.hide(),d.teardown.call(this)},this.show_contextmenu=function(c,d,e,f){if(c=this.get_node(c),!c||c.id===a.jstree.root)return!1;var g=this.settings.contextmenu,h=this.get_node(c,!0),i=h.children(".jstree-anchor"),j=!1,k=!1;(g.show_at_node||d===b||e===b)&&(j=i.offset(),d=j.left,e=j.top+this._data.core.li_height),this.settings.contextmenu.select_node&&!this.is_selected(c)&&this.activate_node(c,f),k=g.items,a.isFunction(k)&&(k=k.call(this,c,a.proxy(function(a){this._show_contextmenu(c,d,e,a)},this))),a.isPlainObject(k)&&this._show_contextmenu(c,d,e,k)},this._show_contextmenu=function(b,c,d,e){var f=this.get_node(b,!0),g=f.children(".jstree-anchor");a(i).one("context_show.vakata.jstree",a.proxy(function(b,c){var d="jstree-contextmenu jstree-"+this.get_theme()+"-contextmenu";a(c.element).addClass(d)},this)),this._data.contextmenu.visible=!0,a.vakata.context.show(g,{x:c,y:d},e),this.trigger("show_contextmenu",{node:b,x:c,y:d})}},function(a){var b=!1,c={element:!1,reference:!1,position_x:0,position_y:0,items:[],html:"",is_visible:!1};a.vakata.context={settings:{hide_onmouseleave:0,icons:!0},_trigger:function(b){a(i).triggerHandler("context_"+b+".vakata",{reference:c.reference,element:c.element,position:{x:c.position_x,y:c.position_y}})},_execute:function(b){return b=c.items[b],b&&(!b._disabled||a.isFunction(b._disabled)&&!b._disabled({item:b,reference:c.reference,element:c.element}))&&b.action?b.action.call(null,{item:b,reference:c.reference,element:c.element,position:{x:c.position_x,y:c.position_y}}):!1},_parse:function(b,d){if(!b)return!1;d||(c.html="",c.items=[]);var e="",f=!1,g;return d&&(e+="<ul>"),a.each(b,function(b,d){return d?(c.items.push(d),!f&&d.separator_before&&(e+="<li class='vakata-context-separator'><a href='#' "+(a.vakata.context.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>"),f=!1,e+="<li class='"+(d._class||"")+(d._disabled===!0||a.isFunction(d._disabled)&&d._disabled({item:d,reference:c.reference,element:c.element})?" vakata-contextmenu-disabled ":"")+"' "+(d.shortcut?" data-shortcut='"+d.shortcut+"' ":"")+">",e+="<a href='#' rel='"+(c.items.length-1)+"'>",a.vakata.context.settings.icons&&(e+="<i ",d.icon&&(e+=-1!==d.icon.indexOf("/")||-1!==d.icon.indexOf(".")?" style='background:url(\""+d.icon+"\") center center no-repeat' ":" class='"+d.icon+"' "),e+="></i><span class='vakata-contextmenu-sep'>&#160;</span>"),e+=(a.isFunction(d.label)?d.label({item:b,reference:c.reference,element:c.element}):d.label)+(d.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+d.shortcut+'">'+(d.shortcut_label||"")+"</span>":"")+"</a>",d.submenu&&(g=a.vakata.context._parse(d.submenu,!0),g&&(e+=g)),e+="</li>",void(d.separator_after&&(e+="<li class='vakata-context-separator'><a href='#' "+(a.vakata.context.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>",f=!0))):!0}),e=e.replace(/<li class\='vakata-context-separator'\><\/li\>$/,""),d&&(e+="</ul>"),d||(c.html=e,a.vakata.context._trigger("parse")),e.length>10?e:!1},_show_submenu:function(c){if(c=a(c),c.length&&c.children("ul").length){var d=c.children("ul"),e=c.offset().left+c.outerWidth(),f=c.offset().top,g=d.width(),h=d.height(),i=a(window).width()+a(window).scrollLeft(),j=a(window).height()+a(window).scrollTop();b?c[e-(g+10+c.outerWidth())<0?"addClass":"removeClass"]("vakata-context-left"):c[e+g+10>i?"addClass":"removeClass"]("vakata-context-right"),f+h+10>j&&d.css("bottom","-1px"),d.show()}},show:function(d,e,f){var g,h,i,j,k,l,m,n,o=!0;switch(c.element&&c.element.length&&c.element.width(""),o){case!e&&!d:return!1;case!!e&&!!d:c.reference=d,c.position_x=e.x,c.position_y=e.y;break;case!e&&!!d:c.reference=d,g=d.offset(),c.position_x=g.left+d.outerHeight(),c.position_y=g.top;break;case!!e&&!d:c.position_x=e.x,c.position_y=e.y}d&&!f&&a(d).data("vakata_contextmenu")&&(f=a(d).data("vakata_contextmenu")),a.vakata.context._parse(f)&&c.element.html(c.html),c.items.length&&(c.element.appendTo("body"),h=c.element,i=c.position_x,j=c.position_y,k=h.width(),l=h.height(),m=a(window).width()+a(window).scrollLeft(),n=a(window).height()+a(window).scrollTop(),b&&(i-=h.outerWidth()-a(d).outerWidth(),i<a(window).scrollLeft()+20&&(i=a(window).scrollLeft()+20)),i+k+20>m&&(i=m-(k+20)),j+l+20>n&&(j=n-(l+20)),c.element.css({left:i,top:j}).show().find("a").first().focus().parent().addClass("vakata-context-hover"),c.is_visible=!0,a.vakata.context._trigger("show"))},hide:function(){c.is_visible&&(c.element.hide().find("ul").hide().end().find(":focus").blur().end().detach(),c.is_visible=!1,a.vakata.context._trigger("hide"))}},a(function(){b="rtl"===a("body").css("direction");var d=!1;c.element=a("<ul class='vakata-context'></ul>"),c.element.on("mouseenter","li",function(b){b.stopImmediatePropagation(),a.contains(this,b.relatedTarget)||(d&&clearTimeout(d),c.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end(),a(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context","li").addBack().addClass("vakata-context-hover"),a.vakata.context._show_submenu(this))}).on("mouseleave","li",function(b){a.contains(this,b.relatedTarget)||a(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")}).on("mouseleave",function(b){a(this).find(".vakata-context-hover").removeClass("vakata-context-hover"),a.vakata.context.settings.hide_onmouseleave&&(d=setTimeout(function(b){return function(){a.vakata.context.hide()}}(this),a.vakata.context.settings.hide_onmouseleave))}).on("click","a",function(b){b.preventDefault(),a(this).blur().parent().hasClass("vakata-context-disabled")||a.vakata.context._execute(a(this).attr("rel"))===!1||a.vakata.context.hide()}).on("keydown","a",function(b){var d=null;switch(b.which){case 13:case 32:b.type="mouseup",b.preventDefault(),a(b.currentTarget).trigger(b);break;case 37:c.is_visible&&(c.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(),b.stopImmediatePropagation(),b.preventDefault());break;case 38:c.is_visible&&(d=c.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first(),d.length||(d=c.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()),d.addClass("vakata-context-hover").children("a").focus(),b.stopImmediatePropagation(),b.preventDefault());break;case 39:c.is_visible&&(c.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(),b.stopImmediatePropagation(),b.preventDefault());break;case 40:c.is_visible&&(d=c.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first(),d.length||(d=c.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()),d.addClass("vakata-context-hover").children("a").focus(),b.stopImmediatePropagation(),b.preventDefault());break;case 27:a.vakata.context.hide(),b.preventDefault()}}).on("keydown",function(a){a.preventDefault();var b=c.element.find(".vakata-contextmenu-shortcut-"+a.which).parent();b.parent().not(".vakata-context-disabled")&&b.click()}),a(i).on("mousedown.vakata.jstree",function(b){c.is_visible&&!a.contains(c.element[0],b.target)&&a.vakata.context.hide()}).on("context_show.vakata.jstree",function(a,d){c.element.find("li:has(ul)").children("a").addClass("vakata-context-parent"),b&&c.element.addClass("vakata-context-rtl").css("direction","rtl"),c.element.find("ul").hide().end()})})}(a),a.jstree.defaults.dnd={copy:!0,open_timeout:500,is_draggable:!0,check_while_dragging:!0,always_copy:!1,inside_pos:0,drag_selection:!0,touch:!0,large_drop_target:!1,large_drag_target:!1},a.jstree.plugins.dnd=function(b,c){this.bind=function(){c.bind.call(this),this.element.on("mousedown.jstree touchstart.jstree",this.settings.dnd.large_drag_target?".jstree-node":".jstree-anchor",a.proxy(function(b){
if(this.settings.dnd.large_drag_target&&a(b.target).closest(".jstree-node")[0]!==b.currentTarget)return!0;if("touchstart"===b.type&&(!this.settings.dnd.touch||"selected"===this.settings.dnd.touch&&!a(b.currentTarget).closest(".jstree-node").children(".jstree-anchor").hasClass("jstree-clicked")))return!0;var c=this.get_node(b.target),d=this.is_selected(c)&&this.settings.dnd.drag_selection?this.get_top_selected().length:1,e=d>1?d+" "+this.get_string("nodes"):this.get_text(b.currentTarget);return this.settings.core.force_text&&(e=a.vakata.html.escape(e)),c&&c.id&&c.id!==a.jstree.root&&(1===b.which||"touchstart"===b.type)&&(this.settings.dnd.is_draggable===!0||a.isFunction(this.settings.dnd.is_draggable)&&this.settings.dnd.is_draggable.call(this,d>1?this.get_top_selected(!0):[c],b))?(this.element.trigger("mousedown.jstree"),a.vakata.dnd.start(b,{jstree:!0,origin:this,obj:this.get_node(c,!0),nodes:d>1?this.get_top_selected():[c.id]},'<div id="jstree-dnd" class="jstree-'+this.get_theme()+" jstree-"+this.get_theme()+"-"+this.get_theme_variant()+" "+(this.settings.core.themes.responsive?" jstree-dnd-responsive":"")+'"><i class="jstree-icon jstree-er"></i>'+e+'<ins class="jstree-copy" style="display:none;">+</ins></div>')):void 0},this))}},a(function(){var b=!1,c=!1,d=!1,e=!1,f=a('<div id="jstree-marker">&#160;</div>').hide();a(i).on("dnd_start.vakata.jstree",function(a,c){b=!1,d=!1,c&&c.data&&c.data.jstree&&f.appendTo("body")}).on("dnd_move.vakata.jstree",function(g,h){if(e&&clearTimeout(e),h&&h.data&&h.data.jstree&&(!h.event.target.id||"jstree-marker"!==h.event.target.id)){d=h.event;var i=a.jstree.reference(h.event.target),j=!1,k=!1,l=!1,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;if(i&&i._data&&i._data.dnd)if(f.attr("class","jstree-"+i.get_theme()+(i.settings.core.themes.responsive?" jstree-dnd-responsive":"")),h.helper.children().attr("class","jstree-"+i.get_theme()+" jstree-"+i.get_theme()+"-"+i.get_theme_variant()+" "+(i.settings.core.themes.responsive?" jstree-dnd-responsive":"")).find(".jstree-copy").first()[h.data.origin&&(h.data.origin.settings.dnd.always_copy||h.data.origin.settings.dnd.copy&&(h.event.metaKey||h.event.ctrlKey))?"show":"hide"](),h.event.target!==i.element[0]&&h.event.target!==i.get_container_ul()[0]||0!==i.get_container_ul().children().length){if(j=i.settings.dnd.large_drop_target?a(h.event.target).closest(".jstree-node").children(".jstree-anchor"):a(h.event.target).closest(".jstree-anchor"),j&&j.length&&j.parent().is(".jstree-closed, .jstree-open, .jstree-leaf")&&(k=j.offset(),l=h.event.pageY-k.top,p=j.outerHeight(),s=p/3>l?["b","i","a"]:l>p-p/3?["a","i","b"]:l>p/2?["i","a","b"]:["i","b","a"],a.each(s,function(d,g){switch(g){case"b":n=k.left-6,o=k.top,q=i.get_parent(j),r=j.parent().index();break;case"i":z=i.settings.dnd.inside_pos,A=i.get_node(j.parent()),n=k.left-2,o=k.top+p/2+1,q=A.id,r="first"===z?0:"last"===z?A.children.length:Math.min(z,A.children.length);break;case"a":n=k.left-6,o=k.top+p,q=i.get_parent(j),r=j.parent().index()+1}for(t=!0,u=0,v=h.data.nodes.length;v>u;u++)if(w=h.data.origin&&(h.data.origin.settings.dnd.always_copy||h.data.origin.settings.dnd.copy&&(h.event.metaKey||h.event.ctrlKey))?"copy_node":"move_node",x=r,"move_node"===w&&"a"===g&&h.data.origin&&h.data.origin===i&&q===i.get_parent(h.data.nodes[u])&&(y=i.get_node(q),x>a.inArray(h.data.nodes[u],y.children)&&(x-=1)),t=t&&(i&&i.settings&&i.settings.dnd&&i.settings.dnd.check_while_dragging===!1||i.check(w,h.data.origin&&h.data.origin!==i?h.data.origin.get_node(h.data.nodes[u]):h.data.nodes[u],q,x,{dnd:!0,ref:i.get_node(j.parent()),pos:g,origin:h.data.origin,is_multi:h.data.origin&&h.data.origin!==i,is_foreign:!h.data.origin})),!t){i&&i.last_error&&(c=i.last_error());break}return"i"===g&&j.parent().is(".jstree-closed")&&i.settings.dnd.open_timeout&&(e=setTimeout(function(a,b){return function(){a.open_node(b)}}(i,j),i.settings.dnd.open_timeout)),t?(b={ins:i,par:q,pos:"i"!==g||"last"!==z||0!==r||i.is_loaded(A)?r:"last"},f.css({left:n+"px",top:o+"px"}).show(),h.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok"),c={},s=!0,!1):void 0}),s===!0))return}else{for(t=!0,u=0,v=h.data.nodes.length;v>u;u++)if(t=t&&i.check(h.data.origin&&(h.data.origin.settings.dnd.always_copy||h.data.origin.settings.dnd.copy&&(h.event.metaKey||h.event.ctrlKey))?"copy_node":"move_node",h.data.origin&&h.data.origin!==i?h.data.origin.get_node(h.data.nodes[u]):h.data.nodes[u],a.jstree.root,"last",{dnd:!0,ref:i.get_node(a.jstree.root),pos:"i",origin:h.data.origin,is_multi:h.data.origin&&h.data.origin!==i,is_foreign:!h.data.origin}),!t)break;if(t)return b={ins:i,par:a.jstree.root,pos:"last"},f.hide(),void h.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok")}b=!1,h.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er"),f.hide()}}).on("dnd_scroll.vakata.jstree",function(a,c){c&&c.data&&c.data.jstree&&(f.hide(),b=!1,d=!1,c.helper.find(".jstree-icon").first().removeClass("jstree-ok").addClass("jstree-er"))}).on("dnd_stop.vakata.jstree",function(g,h){if(e&&clearTimeout(e),h&&h.data&&h.data.jstree){f.hide().detach();var i,j,k=[];if(b){for(i=0,j=h.data.nodes.length;j>i;i++)k[i]=h.data.origin?h.data.origin.get_node(h.data.nodes[i]):h.data.nodes[i];b.ins[h.data.origin&&(h.data.origin.settings.dnd.always_copy||h.data.origin.settings.dnd.copy&&(h.event.metaKey||h.event.ctrlKey))?"copy_node":"move_node"](k,b.par,b.pos,!1,!1,!1,h.data.origin)}else i=a(h.event.target).closest(".jstree"),i.length&&c&&c.error&&"check"===c.error&&(i=i.jstree(!0),i&&i.settings.core.error.call(this,c));d=!1,b=!1}}).on("keyup.jstree keydown.jstree",function(b,c){c=a.vakata.dnd._get(),c&&c.data&&c.data.jstree&&(c.helper.find(".jstree-copy").first()[c.data.origin&&(c.data.origin.settings.dnd.always_copy||c.data.origin.settings.dnd.copy&&(b.metaKey||b.ctrlKey))?"show":"hide"](),d&&(d.metaKey=b.metaKey,d.ctrlKey=b.ctrlKey,a.vakata.dnd._trigger("move",d)))})}),function(a){a.vakata.html={div:a("<div />"),escape:function(b){return a.vakata.html.div.text(b).html()},strip:function(b){return a.vakata.html.div.empty().append(a.parseHTML(b)).text()}};var b={element:!1,target:!1,is_down:!1,is_drag:!1,helper:!1,helper_w:0,data:!1,init_x:0,init_y:0,scroll_l:0,scroll_t:0,scroll_e:!1,scroll_i:!1,is_touch:!1};a.vakata.dnd={settings:{scroll_speed:10,scroll_proximity:20,helper_left:5,helper_top:10,threshold:5,threshold_touch:50},_trigger:function(b,c){var d=a.vakata.dnd._get();d.event=c,a(i).triggerHandler("dnd_"+b+".vakata",d)},_get:function(){return{data:b.data,element:b.element,helper:b.helper}},_clean:function(){b.helper&&b.helper.remove(),b.scroll_i&&(clearInterval(b.scroll_i),b.scroll_i=!1),b={element:!1,target:!1,is_down:!1,is_drag:!1,helper:!1,helper_w:0,data:!1,init_x:0,init_y:0,scroll_l:0,scroll_t:0,scroll_e:!1,scroll_i:!1,is_touch:!1},a(i).off("mousemove.vakata.jstree touchmove.vakata.jstree",a.vakata.dnd.drag),a(i).off("mouseup.vakata.jstree touchend.vakata.jstree",a.vakata.dnd.stop)},_scroll:function(c){if(!b.scroll_e||!b.scroll_l&&!b.scroll_t)return b.scroll_i&&(clearInterval(b.scroll_i),b.scroll_i=!1),!1;if(!b.scroll_i)return b.scroll_i=setInterval(a.vakata.dnd._scroll,100),!1;if(c===!0)return!1;var d=b.scroll_e.scrollTop(),e=b.scroll_e.scrollLeft();b.scroll_e.scrollTop(d+b.scroll_t*a.vakata.dnd.settings.scroll_speed),b.scroll_e.scrollLeft(e+b.scroll_l*a.vakata.dnd.settings.scroll_speed),(d!==b.scroll_e.scrollTop()||e!==b.scroll_e.scrollLeft())&&a.vakata.dnd._trigger("scroll",b.scroll_e)},start:function(c,d,e){"touchstart"===c.type&&c.originalEvent&&c.originalEvent.changedTouches&&c.originalEvent.changedTouches[0]&&(c.pageX=c.originalEvent.changedTouches[0].pageX,c.pageY=c.originalEvent.changedTouches[0].pageY,c.target=i.elementFromPoint(c.originalEvent.changedTouches[0].pageX-window.pageXOffset,c.originalEvent.changedTouches[0].pageY-window.pageYOffset)),b.is_drag&&a.vakata.dnd.stop({});try{c.currentTarget.unselectable="on",c.currentTarget.onselectstart=function(){return!1},c.currentTarget.style&&(c.currentTarget.style.MozUserSelect="none")}catch(f){}return b.init_x=c.pageX,b.init_y=c.pageY,b.data=d,b.is_down=!0,b.element=c.currentTarget,b.target=c.target,b.is_touch="touchstart"===c.type,e!==!1&&(b.helper=a("<div id='vakata-dnd'></div>").html(e).css({display:"block",margin:"0",padding:"0",position:"absolute",top:"-2000px",lineHeight:"16px",zIndex:"10000"})),a(i).on("mousemove.vakata.jstree touchmove.vakata.jstree",a.vakata.dnd.drag),a(i).on("mouseup.vakata.jstree touchend.vakata.jstree",a.vakata.dnd.stop),!1},drag:function(c){if("touchmove"===c.type&&c.originalEvent&&c.originalEvent.changedTouches&&c.originalEvent.changedTouches[0]&&(c.pageX=c.originalEvent.changedTouches[0].pageX,c.pageY=c.originalEvent.changedTouches[0].pageY,c.target=i.elementFromPoint(c.originalEvent.changedTouches[0].pageX-window.pageXOffset,c.originalEvent.changedTouches[0].pageY-window.pageYOffset)),b.is_down){if(!b.is_drag){if(!(Math.abs(c.pageX-b.init_x)>(b.is_touch?a.vakata.dnd.settings.threshold_touch:a.vakata.dnd.settings.threshold)||Math.abs(c.pageY-b.init_y)>(b.is_touch?a.vakata.dnd.settings.threshold_touch:a.vakata.dnd.settings.threshold)))return;b.helper&&(b.helper.appendTo("body"),b.helper_w=b.helper.outerWidth()),b.is_drag=!0,a.vakata.dnd._trigger("start",c)}var d=!1,e=!1,f=!1,g=!1,h=!1,j=!1,k=!1,l=!1,m=!1,n=!1;return b.scroll_t=0,b.scroll_l=0,b.scroll_e=!1,a(a(c.target).parentsUntil("body").addBack().get().reverse()).filter(function(){return/^auto|scroll$/.test(a(this).css("overflow"))&&(this.scrollHeight>this.offsetHeight||this.scrollWidth>this.offsetWidth)}).each(function(){var d=a(this),e=d.offset();return this.scrollHeight>this.offsetHeight&&(e.top+d.height()-c.pageY<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_t=1),c.pageY-e.top<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_t=-1)),this.scrollWidth>this.offsetWidth&&(e.left+d.width()-c.pageX<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_l=1),c.pageX-e.left<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_l=-1)),b.scroll_t||b.scroll_l?(b.scroll_e=a(this),!1):void 0}),b.scroll_e||(d=a(i),e=a(window),f=d.height(),g=e.height(),h=d.width(),j=e.width(),k=d.scrollTop(),l=d.scrollLeft(),f>g&&c.pageY-k<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_t=-1),f>g&&g-(c.pageY-k)<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_t=1),h>j&&c.pageX-l<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_l=-1),h>j&&j-(c.pageX-l)<a.vakata.dnd.settings.scroll_proximity&&(b.scroll_l=1),(b.scroll_t||b.scroll_l)&&(b.scroll_e=d)),b.scroll_e&&a.vakata.dnd._scroll(!0),b.helper&&(m=parseInt(c.pageY+a.vakata.dnd.settings.helper_top,10),n=parseInt(c.pageX+a.vakata.dnd.settings.helper_left,10),f&&m+25>f&&(m=f-50),h&&n+b.helper_w>h&&(n=h-(b.helper_w+2)),b.helper.css({left:n+"px",top:m+"px"})),a.vakata.dnd._trigger("move",c),!1}},stop:function(c){if("touchend"===c.type&&c.originalEvent&&c.originalEvent.changedTouches&&c.originalEvent.changedTouches[0]&&(c.pageX=c.originalEvent.changedTouches[0].pageX,c.pageY=c.originalEvent.changedTouches[0].pageY,c.target=i.elementFromPoint(c.originalEvent.changedTouches[0].pageX-window.pageXOffset,c.originalEvent.changedTouches[0].pageY-window.pageYOffset)),b.is_drag)a.vakata.dnd._trigger("stop",c);else if("touchend"===c.type&&c.target===b.target){var d=setTimeout(function(){a(c.target).click()},100);a(c.target).one("click",function(){d&&clearTimeout(d)})}return a.vakata.dnd._clean(),!1}}}(a),a.jstree.defaults.massload=null,a.jstree.plugins.massload=function(b,c){this.init=function(a,b){c.init.call(this,a,b),this._data.massload={}},this._load_nodes=function(b,d,e){var f=this.settings.massload;return e&&!a.isEmptyObject(this._data.massload)?c._load_nodes.call(this,b,d,e):a.isFunction(f)?f.call(this,b,a.proxy(function(a){if(a)for(var f in a)a.hasOwnProperty(f)&&(this._data.massload[f]=a[f]);c._load_nodes.call(this,b,d,e)},this)):"object"==typeof f&&f&&f.url?(f=a.extend(!0,{},f),a.isFunction(f.url)&&(f.url=f.url.call(this,b)),a.isFunction(f.data)&&(f.data=f.data.call(this,b)),a.ajax(f).done(a.proxy(function(a,f,g){if(a)for(var h in a)a.hasOwnProperty(h)&&(this._data.massload[h]=a[h]);c._load_nodes.call(this,b,d,e)},this)).fail(a.proxy(function(a){c._load_nodes.call(this,b,d,e)},this))):c._load_nodes.call(this,b,d,e)},this._load_node=function(b,d){var e=this._data.massload[b.id];return e?this["string"==typeof e?"_append_html_data":"_append_json_data"](b,"string"==typeof e?a(a.parseHTML(e)).filter(function(){return 3!==this.nodeType}):e,function(a){d.call(this,a),delete this._data.massload[b.id]}):c._load_node.call(this,b,d)}},a.jstree.defaults.search={ajax:!1,fuzzy:!1,case_sensitive:!1,show_only_matches:!1,show_only_matches_children:!1,close_opened_onclear:!0,search_leaves_only:!1,search_callback:!1},a.jstree.plugins.search=function(c,d){this.bind=function(){d.bind.call(this),this._data.search.str="",this._data.search.dom=a(),this._data.search.res=[],this._data.search.opn=[],this._data.search.som=!1,this._data.search.smc=!1,this._data.search.hdn=[],this.element.on("search.jstree",a.proxy(function(b,c){if(this._data.search.som&&c.res.length){var d=this._model.data,e,f,g=[];for(e=0,f=c.res.length;f>e;e++)d[c.res[e]]&&!d[c.res[e]].state.hidden&&(g.push(c.res[e]),g=g.concat(d[c.res[e]].parents),this._data.search.smc&&(g=g.concat(d[c.res[e]].children_d)));g=a.vakata.array_remove_item(a.vakata.array_unique(g),a.jstree.root),this._data.search.hdn=this.hide_all(),this.show_node(g)}},this)).on("clear_search.jstree",a.proxy(function(a,b){this._data.search.som&&b.res.length&&this.show_node(this._data.search.hdn)},this))},this.search=function(c,d,e,f,g,h){if(c===!1||""===a.trim(c.toString()))return this.clear_search();f=this.get_node(f),f=f&&f.id?f.id:null,c=c.toString();var i=this.settings.search,j=i.ajax?i.ajax:!1,k=this._model.data,l=null,m=[],n=[],o,p;return this._data.search.res.length&&!g&&this.clear_search(),e===b&&(e=i.show_only_matches),h===b&&(h=i.show_only_matches_children),d||j===!1?(g||(this._data.search.str=c,this._data.search.dom=a(),this._data.search.res=[],this._data.search.opn=[],this._data.search.som=e,this._data.search.smc=h),l=new a.vakata.search(c,!0,{caseSensitive:i.case_sensitive,fuzzy:i.fuzzy}),a.each(k[f?f:a.jstree.root].children_d,function(a,b){var d=k[b];d.text&&(!i.search_leaves_only||d.state.loaded&&0===d.children.length)&&(i.search_callback&&i.search_callback.call(this,c,d)||!i.search_callback&&l.search(d.text).isMatch)&&(m.push(b),n=n.concat(d.parents))}),m.length&&(n=a.vakata.array_unique(n),this._search_open(n),g?(this._data.search.dom=this._data.search.dom.add(a(this.element[0].querySelectorAll("#"+a.map(m,function(b){return-1!=="0123456789".indexOf(b[0])?"\\3"+b[0]+" "+b.substr(1).replace(a.jstree.idregex,"\\$&"):b.replace(a.jstree.idregex,"\\$&")}).join(", #")))),this._data.search.res=a.vakata.array_unique(this._data.search.res.concat(m))):(this._data.search.dom=a(this.element[0].querySelectorAll("#"+a.map(m,function(b){return-1!=="0123456789".indexOf(b[0])?"\\3"+b[0]+" "+b.substr(1).replace(a.jstree.idregex,"\\$&"):b.replace(a.jstree.idregex,"\\$&")}).join(", #"))),this._data.search.res=m),this._data.search.dom.children(".jstree-anchor").addClass("jstree-search")),void this.trigger("search",{nodes:this._data.search.dom,str:c,res:this._data.search.res,show_only_matches:e})):a.isFunction(j)?j.call(this,c,a.proxy(function(b){b&&b.d&&(b=b.d),this._load_nodes(a.isArray(b)?a.vakata.array_unique(b):[],function(){this.search(c,!0,e,f,g)},!0)},this),f):(j=a.extend({},j),j.data||(j.data={}),j.data.str=c,f&&(j.data.inside=f),a.ajax(j).fail(a.proxy(function(){this._data.core.last_error={error:"ajax",plugin:"search",id:"search_01",reason:"Could not load search parents",data:JSON.stringify(j)},this.settings.core.error.call(this,this._data.core.last_error)},this)).done(a.proxy(function(b){b&&b.d&&(b=b.d),this._load_nodes(a.isArray(b)?a.vakata.array_unique(b):[],function(){this.search(c,!0,e,f,g)},!0)},this)))},this.clear_search=function(){this.settings.search.close_opened_onclear&&this.close_node(this._data.search.opn,0),this.trigger("clear_search",{nodes:this._data.search.dom,str:this._data.search.str,res:this._data.search.res}),this._data.search.res.length&&(this._data.search.dom=a(this.element[0].querySelectorAll("#"+a.map(this._data.search.res,function(b){return-1!=="0123456789".indexOf(b[0])?"\\3"+b[0]+" "+b.substr(1).replace(a.jstree.idregex,"\\$&"):b.replace(a.jstree.idregex,"\\$&")}).join(", #"))),this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search")),this._data.search.str="",this._data.search.res=[],this._data.search.opn=[],this._data.search.dom=a()},this._search_open=function(b){var c=this;a.each(b.concat([]),function(d,e){if(e===a.jstree.root)return!0;try{e=a("#"+e.replace(a.jstree.idregex,"\\$&"),c.element)}catch(f){}e&&e.length&&c.is_closed(e)&&(c._data.search.opn.push(e[0].id),c.open_node(e,function(){c._search_open(b)},0))})},this.redraw_node=function(b,c,e,f){if(b=d.redraw_node.apply(this,arguments),b&&-1!==a.inArray(b.id,this._data.search.res)){var g,h,i=null;for(g=0,h=b.childNodes.length;h>g;g++)if(b.childNodes[g]&&b.childNodes[g].className&&-1!==b.childNodes[g].className.indexOf("jstree-anchor")){i=b.childNodes[g];break}i&&(i.className+=" jstree-search")}return b}},function(a){a.vakata.search=function(b,c,d){d=d||{},d=a.extend({},a.vakata.search.defaults,d),d.fuzzy!==!1&&(d.fuzzy=!0),b=d.caseSensitive?b:b.toLowerCase();var e=d.location,f=d.distance,g=d.threshold,h=b.length,i,j,k,l;return h>32&&(d.fuzzy=!1),d.fuzzy&&(i=1<<h-1,j=function(){var a={},c=0;for(c=0;h>c;c++)a[b.charAt(c)]=0;for(c=0;h>c;c++)a[b.charAt(c)]|=1<<h-c-1;return a}(),k=function(a,b){var c=a/h,d=Math.abs(e-b);return f?c+d/f:d?1:c}),l=function(a){if(a=d.caseSensitive?a:a.toLowerCase(),b===a||-1!==a.indexOf(b))return{isMatch:!0,score:0};if(!d.fuzzy)return{isMatch:!1,score:1};var c,f,l=a.length,m=g,n=a.indexOf(b,e),o,p,q=h+l,r,s,t,u,v,w=1,x=[];for(-1!==n&&(m=Math.min(k(0,n),m),n=a.lastIndexOf(b,e+h),-1!==n&&(m=Math.min(k(0,n),m))),n=-1,c=0;h>c;c++){o=0,p=q;while(p>o)k(c,e+p)<=m?o=p:q=p,p=Math.floor((q-o)/2+o);for(q=p,s=Math.max(1,e-p+1),t=Math.min(e+p,l)+h,u=new Array(t+2),u[t+1]=(1<<c)-1,f=t;f>=s;f--)if(v=j[a.charAt(f-1)],0===c?u[f]=(u[f+1]<<1|1)&v:u[f]=(u[f+1]<<1|1)&v|((r[f+1]|r[f])<<1|1)|r[f+1],u[f]&i&&(w=k(c,f-1),m>=w)){if(m=w,n=f-1,x.push(n),!(n>e))break;s=Math.max(1,2*e-n)}if(k(c+1,e)>m)break;r=u}return{isMatch:n>=0,score:w}},c===!0?{search:l}:l(c)},a.vakata.search.defaults={location:0,distance:100,threshold:.6,fuzzy:!1,caseSensitive:!1}}(a),a.jstree.defaults.sort=function(a,b){return this.get_text(a)>this.get_text(b)?1:-1},a.jstree.plugins.sort=function(b,c){this.bind=function(){c.bind.call(this),this.element.on("model.jstree",a.proxy(function(a,b){this.sort(b.parent,!0)},this)).on("rename_node.jstree create_node.jstree",a.proxy(function(a,b){this.sort(b.parent||b.node.parent,!1),this.redraw_node(b.parent||b.node.parent,!0)},this)).on("move_node.jstree copy_node.jstree",a.proxy(function(a,b){this.sort(b.parent,!1),this.redraw_node(b.parent,!0)},this))},this.sort=function(b,c){var d,e;if(b=this.get_node(b),b&&b.children&&b.children.length&&(b.children.sort(a.proxy(this.settings.sort,this)),c))for(d=0,e=b.children_d.length;e>d;d++)this.sort(b.children_d[d],!1)}};var n=!1;a.jstree.defaults.state={key:"jstree",events:"changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree",ttl:!1,filter:!1},a.jstree.plugins.state=function(b,c){this.bind=function(){c.bind.call(this);var b=a.proxy(function(){this.element.on(this.settings.state.events,a.proxy(function(){n&&clearTimeout(n),n=setTimeout(a.proxy(function(){this.save_state()},this),100)},this)),this.trigger("state_ready")},this);this.element.on("ready.jstree",a.proxy(function(a,c){this.element.one("restore_state.jstree",b),this.restore_state()||b()},this))},this.save_state=function(){var b={state:this.get_state(),ttl:this.settings.state.ttl,sec:+new Date};a.vakata.storage.set(this.settings.state.key,JSON.stringify(b))},this.restore_state=function(){var b=a.vakata.storage.get(this.settings.state.key);if(b)try{b=JSON.parse(b)}catch(c){return!1}return b&&b.ttl&&b.sec&&+new Date-b.sec>b.ttl?!1:(b&&b.state&&(b=b.state),b&&a.isFunction(this.settings.state.filter)&&(b=this.settings.state.filter.call(this,b)),b?(this.element.one("set_state.jstree",function(c,d){d.instance.trigger("restore_state",{state:a.extend(!0,{},b)})}),this.set_state(b),!0):!1)},this.clear_state=function(){return a.vakata.storage.del(this.settings.state.key)}},function(a,b){a.vakata.storage={set:function(a,b){return window.localStorage.setItem(a,b)},get:function(a){return window.localStorage.getItem(a)},del:function(a){return window.localStorage.removeItem(a)}}}(a),a.jstree.defaults.types={"default":{}},a.jstree.defaults.types[a.jstree.root]={},a.jstree.plugins.types=function(c,d){this.init=function(c,e){var f,g;if(e&&e.types&&e.types["default"])for(f in e.types)if("default"!==f&&f!==a.jstree.root&&e.types.hasOwnProperty(f))for(g in e.types["default"])e.types["default"].hasOwnProperty(g)&&e.types[f][g]===b&&(e.types[f][g]=e.types["default"][g]);d.init.call(this,c,e),this._model.data[a.jstree.root].type=a.jstree.root},this.refresh=function(b,c){d.refresh.call(this,b,c),this._model.data[a.jstree.root].type=a.jstree.root},this.bind=function(){this.element.on("model.jstree",a.proxy(function(c,d){var e=this._model.data,f=d.nodes,g=this.settings.types,h,i,j="default";for(h=0,i=f.length;i>h;h++)j="default",e[f[h]].original&&e[f[h]].original.type&&g[e[f[h]].original.type]&&(j=e[f[h]].original.type),e[f[h]].data&&e[f[h]].data.jstree&&e[f[h]].data.jstree.type&&g[e[f[h]].data.jstree.type]&&(j=e[f[h]].data.jstree.type),e[f[h]].type=j,e[f[h]].icon===!0&&g[j].icon!==b&&(e[f[h]].icon=g[j].icon);e[a.jstree.root].type=a.jstree.root},this)),d.bind.call(this)},this.get_json=function(b,c,e){var f,g,h=this._model.data,i=c?a.extend(!0,{},c,{no_id:!1}):{},j=d.get_json.call(this,b,i,e);if(j===!1)return!1;if(a.isArray(j))for(f=0,g=j.length;g>f;f++)j[f].type=j[f].id&&h[j[f].id]&&h[j[f].id].type?h[j[f].id].type:"default",c&&c.no_id&&(delete j[f].id,j[f].li_attr&&j[f].li_attr.id&&delete j[f].li_attr.id,j[f].a_attr&&j[f].a_attr.id&&delete j[f].a_attr.id);else j.type=j.id&&h[j.id]&&h[j.id].type?h[j.id].type:"default",c&&c.no_id&&(j=this._delete_ids(j));return j},this._delete_ids=function(b){if(a.isArray(b)){for(var c=0,d=b.length;d>c;c++)b[c]=this._delete_ids(b[c]);return b}return delete b.id,b.li_attr&&b.li_attr.id&&delete b.li_attr.id,b.a_attr&&b.a_attr.id&&delete b.a_attr.id,b.children&&a.isArray(b.children)&&(b.children=this._delete_ids(b.children)),b},this.check=function(c,e,f,g,h){if(d.check.call(this,c,e,f,g,h)===!1)return!1;e=e&&e.id?e:this.get_node(e),f=f&&f.id?f:this.get_node(f);var i=e&&e.id?h&&h.origin?h.origin:a.jstree.reference(e.id):null,j,k,l,m;switch(i=i&&i._model&&i._model.data?i._model.data:null,c){case"create_node":case"move_node":case"copy_node":if("move_node"!==c||-1===a.inArray(e.id,f.children)){if(j=this.get_rules(f),j.max_children!==b&&-1!==j.max_children&&j.max_children===f.children.length)return this._data.core.last_error={error:"check",plugin:"types",id:"types_01",reason:"max_children prevents function: "+c,data:JSON.stringify({chk:c,pos:g,obj:e&&e.id?e.id:!1,par:f&&f.id?f.id:!1})},!1;if(j.valid_children!==b&&-1!==j.valid_children&&-1===a.inArray(e.type||"default",j.valid_children))return this._data.core.last_error={error:"check",plugin:"types",id:"types_02",reason:"valid_children prevents function: "+c,data:JSON.stringify({chk:c,pos:g,obj:e&&e.id?e.id:!1,par:f&&f.id?f.id:!1})},!1;if(i&&e.children_d&&e.parents){for(k=0,l=0,m=e.children_d.length;m>l;l++)k=Math.max(k,i[e.children_d[l]].parents.length);k=k-e.parents.length+1}(0>=k||k===b)&&(k=1);do{if(j.max_depth!==b&&-1!==j.max_depth&&j.max_depth<k)return this._data.core.last_error={error:"check",plugin:"types",id:"types_03",reason:"max_depth prevents function: "+c,data:JSON.stringify({chk:c,pos:g,obj:e&&e.id?e.id:!1,par:f&&f.id?f.id:!1})},!1;f=this.get_node(f.parent),j=this.get_rules(f),k++}while(f)}}return!0},this.get_rules=function(a){if(a=this.get_node(a),!a)return!1;var c=this.get_type(a,!0);return c.max_depth===b&&(c.max_depth=-1),c.max_children===b&&(c.max_children=-1),c.valid_children===b&&(c.valid_children=-1),c},this.get_type=function(b,c){return b=this.get_node(b),b?c?a.extend({type:b.type},this.settings.types[b.type]):b.type:!1},this.set_type=function(c,d){var e,f,g,h,i;if(a.isArray(c)){for(c=c.slice(),f=0,g=c.length;g>f;f++)this.set_type(c[f],d);return!0}return e=this.settings.types,c=this.get_node(c),e[d]&&c?(h=c.type,i=this.get_icon(c),c.type=d,(i===!0||e[h]&&e[h].icon!==b&&i===e[h].icon)&&this.set_icon(c,e[d].icon!==b?e[d].icon:!0),!0):!1}},a.jstree.defaults.unique={case_sensitive:!1,duplicate:function(a,b){return a+" ("+b+")"}},a.jstree.plugins.unique=function(c,d){this.check=function(b,c,e,f,g){if(d.check.call(this,b,c,e,f,g)===!1)return!1;if(c=c&&c.id?c:this.get_node(c),e=e&&e.id?e:this.get_node(e),!e||!e.children)return!0;var h="rename_node"===b?f:c.text,i=[],j=this.settings.unique.case_sensitive,k=this._model.data,l,m;for(l=0,m=e.children.length;m>l;l++)i.push(j?k[e.children[l]].text:k[e.children[l]].text.toLowerCase());switch(j||(h=h.toLowerCase()),b){case"delete_node":return!0;case"rename_node":return l=-1===a.inArray(h,i)||c.text&&c.text[j?"toString":"toLowerCase"]()===h,l||(this._data.core.last_error={error:"check",plugin:"unique",id:"unique_01",reason:"Child with name "+h+" already exists. Preventing: "+b,data:JSON.stringify({chk:b,pos:f,obj:c&&c.id?c.id:!1,par:e&&e.id?e.id:!1})}),l;case"create_node":return l=-1===a.inArray(h,i),l||(this._data.core.last_error={error:"check",plugin:"unique",id:"unique_04",reason:"Child with name "+h+" already exists. Preventing: "+b,data:JSON.stringify({chk:b,pos:f,obj:c&&c.id?c.id:!1,par:e&&e.id?e.id:!1})}),l;case"copy_node":return l=-1===a.inArray(h,i),l||(this._data.core.last_error={error:"check",plugin:"unique",id:"unique_02",reason:"Child with name "+h+" already exists. Preventing: "+b,data:JSON.stringify({chk:b,pos:f,obj:c&&c.id?c.id:!1,par:e&&e.id?e.id:!1})}),l;case"move_node":return l=c.parent===e.id&&(!g||!g.is_multi)||-1===a.inArray(h,i),l||(this._data.core.last_error={error:"check",plugin:"unique",id:"unique_03",reason:"Child with name "+h+" already exists. Preventing: "+b,data:JSON.stringify({chk:b,pos:f,obj:c&&c.id?c.id:!1,par:e&&e.id?e.id:!1})}),l}return!0},this.create_node=function(c,e,f,g,h){if(!e||e.text===b){if(null===c&&(c=a.jstree.root),c=this.get_node(c),!c)return d.create_node.call(this,c,e,f,g,h);if(f=f===b?"last":f,!f.toString().match(/^(before|after)$/)&&!h&&!this.is_loaded(c))return d.create_node.call(this,c,e,f,g,h);e||(e={});var i,j,k,l,m,n=this._model.data,o=this.settings.unique.case_sensitive,p=this.settings.unique.duplicate;for(j=i=this.get_string("New node"),k=[],l=0,m=c.children.length;m>l;l++)k.push(o?n[c.children[l]].text:n[c.children[l]].text.toLowerCase());l=1;while(-1!==a.inArray(o?j:j.toLowerCase(),k))j=p.call(this,i,++l).toString();e.text=j}return d.create_node.call(this,c,e,f,g,h)}};var o=i.createElement("DIV");if(o.setAttribute("unselectable","on"),o.setAttribute("role","presentation"),o.className="jstree-wholerow",o.innerHTML="&#160;",a.jstree.plugins.wholerow=function(b,c){this.bind=function(){c.bind.call(this),this.element.on("ready.jstree set_state.jstree",a.proxy(function(){this.hide_dots()},this)).on("init.jstree loading.jstree ready.jstree",a.proxy(function(){this.get_container_ul().addClass("jstree-wholerow-ul")},this)).on("deselect_all.jstree",a.proxy(function(a,b){this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked")},this)).on("changed.jstree",a.proxy(function(a,b){this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");var c=!1,d,e;for(d=0,e=b.selected.length;e>d;d++)c=this.get_node(b.selected[d],!0),c&&c.length&&c.children(".jstree-wholerow").addClass("jstree-wholerow-clicked")},this)).on("open_node.jstree",a.proxy(function(a,b){this.get_node(b.node,!0).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked")},this)).on("hover_node.jstree dehover_node.jstree",a.proxy(function(a,b){"hover_node"===a.type&&this.is_disabled(b.node)||this.get_node(b.node,!0).children(".jstree-wholerow")["hover_node"===a.type?"addClass":"removeClass"]("jstree-wholerow-hovered")},this)).on("contextmenu.jstree",".jstree-wholerow",a.proxy(function(b){b.preventDefault();var c=a.Event("contextmenu",{metaKey:b.metaKey,ctrlKey:b.ctrlKey,altKey:b.altKey,shiftKey:b.shiftKey,pageX:b.pageX,pageY:b.pageY});a(b.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(c)},this)).on("click.jstree",".jstree-wholerow",function(b){b.stopImmediatePropagation();var c=a.Event("click",{metaKey:b.metaKey,ctrlKey:b.ctrlKey,altKey:b.altKey,shiftKey:b.shiftKey});a(b.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(c).focus()}).on("click.jstree",".jstree-leaf > .jstree-ocl",a.proxy(function(b){b.stopImmediatePropagation();var c=a.Event("click",{metaKey:b.metaKey,ctrlKey:b.ctrlKey,altKey:b.altKey,shiftKey:b.shiftKey});a(b.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(c).focus()},this)).on("mouseover.jstree",".jstree-wholerow, .jstree-icon",a.proxy(function(a){return a.stopImmediatePropagation(),this.is_disabled(a.currentTarget)||this.hover_node(a.currentTarget),!1},this)).on("mouseleave.jstree",".jstree-node",a.proxy(function(a){this.dehover_node(a.currentTarget)},this))},this.teardown=function(){this.settings.wholerow&&this.element.find(".jstree-wholerow").remove(),c.teardown.call(this)},this.redraw_node=function(b,d,e,f){if(b=c.redraw_node.apply(this,arguments)){var g=o.cloneNode(!0);-1!==a.inArray(b.id,this._data.core.selected)&&(g.className+=" jstree-wholerow-clicked"),this._data.core.focused&&this._data.core.focused===b.id&&(g.className+=" jstree-wholerow-hovered"),b.insertBefore(g,b.childNodes[0])}return b}},i.registerElement&&Object&&Object.create){var p=Object.create(HTMLElement.prototype);p.createdCallback=function(){var b={core:{},plugins:[]},c;for(c in a.jstree.plugins)a.jstree.plugins.hasOwnProperty(c)&&this.attributes[c]&&(b.plugins.push(c),this.getAttribute(c)&&JSON.parse(this.getAttribute(c))&&(b[c]=JSON.parse(this.getAttribute(c))));for(c in a.jstree.defaults.core)a.jstree.defaults.core.hasOwnProperty(c)&&this.attributes[c]&&(b.core[c]=JSON.parse(this.getAttribute(c))||this.getAttribute(c));a(this).jstree(b)};try{i.registerElement("vakata-jstree",{prototype:p})}catch(q){}}return a.fn.jstree});
/*! Selectric ϟ v1.13.0 (2017-08-22) - git.io/tjl9sQ - Copyright (c) 2017 Leonardo Santos - MIT License */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,s){return void 0===s&&(s="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(s),s}:e(jQuery)}(function(e){"use strict";var t=e(document),s=e(window),l=["a","e","i","o","u","n","c","y"],i=[/[\xE0-\xE5]/g,/[\xE8-\xEB]/g,/[\xEC-\xEF]/g,/[\xF2-\xF6]/g,/[\xF9-\xFC]/g,/[\xF1]/g,/[\xE7]/g,/[\xFD-\xFF]/g],n=function(t,s){var l=this;l.element=t,l.$element=e(t),l.state={multiple:!!l.$element.attr("multiple"),enabled:!1,opened:!1,currValue:-1,selectedIdx:-1,highlightedIdx:-1},l.eventTriggers={open:l.open,close:l.close,destroy:l.destroy,refresh:l.refresh,init:l.init},l.init(s)};n.prototype={utils:{isMobile:function(){return/android|ip(hone|od|ad)/i.test(navigator.userAgent)},escapeRegExp:function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},replaceDiacritics:function(e){for(var t=i.length;t--;)e=e.toLowerCase().replace(i[t],l[t]);return e},format:function(e){var t=arguments;return(""+e).replace(/\{(?:(\d+)|(\w+))\}/g,function(e,s,l){return l&&t[1]?t[1][l]:t[s]})},nextEnabledItem:function(e,t){for(;e[t=(t+1)%e.length].disabled;);return t},previousEnabledItem:function(e,t){for(;e[t=(t>0?t:e.length)-1].disabled;);return t},toDash:function(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()},triggerCallback:function(t,s){var l=s.element,i=s.options["on"+t],n=[l].concat([].slice.call(arguments).slice(1));e.isFunction(i)&&i.apply(l,n),e(l).trigger("selectric-"+this.toDash(t),n)},arrayToClassname:function(t){var s=e.grep(t,function(e){return!!e});return e.trim(s.join(" "))}},init:function(t){var s=this;if(s.options=e.extend(!0,{},e.fn.selectric.defaults,s.options,t),s.utils.triggerCallback("BeforeInit",s),s.destroy(!0),s.options.disableOnMobile&&s.utils.isMobile())return void(s.disableOnMobile=!0);s.classes=s.getClassNames();var l=e("<input/>",{class:s.classes.input,readonly:s.utils.isMobile()}),i=e("<div/>",{class:s.classes.items,tabindex:-1}),n=e("<div/>",{class:s.classes.scroll}),a=e("<div/>",{class:s.classes.prefix,html:s.options.arrowButtonMarkup}),o=e("<span/>",{class:"label"}),r=s.$element.wrap("<div/>").parent().append(a.prepend(o),i,l),u=e("<div/>",{class:s.classes.hideselect});s.elements={input:l,items:i,itemsScroll:n,wrapper:a,label:o,outerWrapper:r},s.options.nativeOnMobile&&s.utils.isMobile()&&(s.elements.input=void 0,u.addClass(s.classes.prefix+"-is-native"),s.$element.on("change",function(){s.refresh()})),s.$element.on(s.eventTriggers).wrap(u),s.originalTabindex=s.$element.prop("tabindex"),s.$element.prop("tabindex",-1),s.populate(),s.activate(),s.utils.triggerCallback("Init",s)},activate:function(){var e=this,t=e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),s=e.$element.width();t.removeClass(e.classes.tempshow),e.utils.triggerCallback("BeforeActivate",e),e.elements.outerWrapper.prop("class",e.utils.arrayToClassname([e.classes.wrapper,e.$element.prop("class").replace(/\S+/g,e.classes.prefix+"-$&"),e.options.responsive?e.classes.responsive:""])),e.options.inheritOriginalWidth&&s>0&&e.elements.outerWrapper.width(s),e.unbindEvents(),e.$element.prop("disabled")?(e.elements.outerWrapper.addClass(e.classes.disabled),e.elements.input&&e.elements.input.prop("disabled",!0)):(e.state.enabled=!0,e.elements.outerWrapper.removeClass(e.classes.disabled),e.$li=e.elements.items.removeAttr("style").find("li"),e.bindEvents()),e.utils.triggerCallback("Activate",e)},getClassNames:function(){var t=this,s=t.options.customClass,l={};return e.each("Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel".split(" "),function(e,i){var n=s.prefix+i;l[i.toLowerCase()]=s.camelCase?n:t.utils.toDash(n)}),l.prefix=s.prefix,l},setLabel:function(){var t=this,s=t.options.labelBuilder;if(t.state.multiple){var l=e.isArray(t.state.currValue)?t.state.currValue:[t.state.currValue];l=0===l.length?[0]:l;var i=e.map(l,function(s){return e.grep(t.lookupItems,function(e){return e.index===s})[0]});i=e.grep(i,function(t){return i.length>1||0===i.length?""!==e.trim(t.value):t}),i=e.map(i,function(l){return e.isFunction(s)?s(l):t.utils.format(s,l)}),t.options.multiple.maxLabelEntries&&(i.length>=t.options.multiple.maxLabelEntries+1?(i=i.slice(0,t.options.multiple.maxLabelEntries),i.push(e.isFunction(s)?s({text:"..."}):t.utils.format(s,{text:"..."}))):i.slice(i.length-1)),t.elements.label.html(i.join(t.options.multiple.separator))}else{var n=t.lookupItems[t.state.currValue];t.elements.label.html(e.isFunction(s)?s(n):t.utils.format(s,n))}},populate:function(){var t=this,s=t.$element.children(),l=t.$element.find("option"),i=l.filter(":selected"),n=l.index(i),a=0,o=t.state.multiple?[]:0;i.length>1&&t.state.multiple&&(n=[],i.each(function(){n.push(e(this).index())})),t.state.currValue=~n?n:o,t.state.selectedIdx=t.state.currValue,t.state.highlightedIdx=t.state.currValue,t.items=[],t.lookupItems=[],s.length&&(s.each(function(s){var l=e(this);if(l.is("optgroup")){var i={element:l,label:l.prop("label"),groupDisabled:l.prop("disabled"),items:[]};l.children().each(function(s){var l=e(this);i.items[s]=t.getItemData(a,l,i.groupDisabled||l.prop("disabled")),t.lookupItems[a]=i.items[s],a++}),t.items[s]=i}else t.items[s]=t.getItemData(a,l,l.prop("disabled")),t.lookupItems[a]=t.items[s],a++}),t.setLabel(),t.elements.items.append(t.elements.itemsScroll.html(t.getItemsMarkup(t.items))))},getItemData:function(t,s,l){var i=this;return{index:t,element:s,value:s.val(),className:s.prop("class"),text:s.html(),slug:e.trim(i.utils.replaceDiacritics(s.html())),alt:s.attr("data-alt"),selected:s.prop("selected"),disabled:l}},getItemsMarkup:function(t){var s=this,l="<ul>";return e.isFunction(s.options.listBuilder)&&s.options.listBuilder&&(t=s.options.listBuilder(t)),e.each(t,function(t,i){void 0!==i.label?(l+=s.utils.format('<ul class="{1}"><li class="{2}">{3}</li>',s.utils.arrayToClassname([s.classes.group,i.groupDisabled?"disabled":"",i.element.prop("class")]),s.classes.grouplabel,i.element.prop("label")),e.each(i.items,function(e,t){l+=s.getItemMarkup(t.index,t)}),l+="</ul>"):l+=s.getItemMarkup(i.index,i)}),l+"</ul>"},getItemMarkup:function(t,s){var l=this,i=l.options.optionsItemBuilder,n={value:s.value,text:s.text,slug:s.slug,index:s.index};return l.utils.format('<li data-index="{1}" class="{2}">{3}</li>',t,l.utils.arrayToClassname([s.className,t===l.items.length-1?"last":"",s.disabled?"disabled":"",s.selected?"selected":""]),e.isFunction(i)?l.utils.format(i(s,this.$element,t),s):l.utils.format(i,n))},unbindEvents:function(){var e=this;e.elements.wrapper.add(e.$element).add(e.elements.outerWrapper).add(e.elements.input).off(".sl")},bindEvents:function(){var t=this;t.elements.outerWrapper.on("mouseenter.sl mouseleave.sl",function(s){e(this).toggleClass(t.classes.hover,"mouseenter"===s.type),t.options.openOnHover&&(clearTimeout(t.closeTimer),"mouseleave"===s.type?t.closeTimer=setTimeout(e.proxy(t.close,t),t.options.hoverIntentTimeout):t.open())}),t.elements.wrapper.on("click.sl",function(e){t.state.opened?t.close():t.open(e)}),t.options.nativeOnMobile&&t.utils.isMobile()||(t.$element.on("focus.sl",function(){t.elements.input.focus()}),t.elements.input.prop({tabindex:t.originalTabindex,disabled:!1}).on("keydown.sl",e.proxy(t.handleKeys,t)).on("focusin.sl",function(e){t.elements.outerWrapper.addClass(t.classes.focus),t.elements.input.one("blur",function(){t.elements.input.blur()}),t.options.openOnFocus&&!t.state.opened&&t.open(e)}).on("focusout.sl",function(){t.elements.outerWrapper.removeClass(t.classes.focus)}).on("input propertychange",function(){var s=t.elements.input.val(),l=new RegExp("^"+t.utils.escapeRegExp(s),"i");clearTimeout(t.resetStr),t.resetStr=setTimeout(function(){t.elements.input.val("")},t.options.keySearchTimeout),s.length&&e.each(t.items,function(e,s){if(!s.disabled){if(l.test(s.text)||l.test(s.slug))return void t.highlight(e);if(s.alt)for(var i=s.alt.split("|"),n=0;n<i.length&&i[n];n++)if(l.test(i[n].trim()))return void t.highlight(e)}})})),t.$li.on({mousedown:function(e){e.preventDefault(),e.stopPropagation()},click:function(){return t.select(e(this).data("index")),!1}})},handleKeys:function(t){var s=this,l=t.which,i=s.options.keys,n=e.inArray(l,i.previous)>-1,a=e.inArray(l,i.next)>-1,o=e.inArray(l,i.select)>-1,r=e.inArray(l,i.open)>-1,u=s.state.highlightedIdx,p=n&&0===u||a&&u+1===s.items.length,c=0;if(13!==l&&32!==l||t.preventDefault(),n||a){if(!s.options.allowWrap&&p)return;n&&(c=s.utils.previousEnabledItem(s.lookupItems,u)),a&&(c=s.utils.nextEnabledItem(s.lookupItems,u)),s.highlight(c)}if(o&&s.state.opened)return s.select(u),void(s.state.multiple&&s.options.multiple.keepMenuOpen||s.close());r&&!s.state.opened&&s.open()},refresh:function(){var e=this;e.populate(),e.activate(),e.utils.triggerCallback("Refresh",e)},setOptionsDimensions:function(){var e=this,t=e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),s=e.options.maxHeight,l=e.elements.items.outerWidth(),i=e.elements.wrapper.outerWidth()-(l-e.elements.items.width());!e.options.expandToItemText||i>l?e.finalWidth=i:(e.elements.items.css("overflow","scroll"),e.elements.outerWrapper.width(9e4),e.finalWidth=e.elements.items.width(),e.elements.items.css("overflow",""),e.elements.outerWrapper.width("")),e.elements.items.width(e.finalWidth).height()>s&&e.elements.items.height(s),t.removeClass(e.classes.tempshow)},isInViewport:function(){var e=this;if(!0===e.options.forceRenderAbove)e.elements.outerWrapper.addClass(e.classes.above);else if(!0===e.options.forceRenderBelow)e.elements.outerWrapper.addClass(e.classes.below);else{var t=s.scrollTop(),l=s.height(),i=e.elements.outerWrapper.offset().top,n=e.elements.outerWrapper.outerHeight(),a=i+n+e.itemsHeight<=t+l,o=i-e.itemsHeight>t,r=!a&&o,u=!r;e.elements.outerWrapper.toggleClass(e.classes.above,r),e.elements.outerWrapper.toggleClass(e.classes.below,u)}},detectItemVisibility:function(t){var s=this,l=s.$li.filter("[data-index]");s.state.multiple&&(t=e.isArray(t)&&0===t.length?0:t,t=e.isArray(t)?Math.min.apply(Math,t):t);var i=l.eq(t).outerHeight(),n=l[t].offsetTop,a=s.elements.itemsScroll.scrollTop(),o=n+2*i;s.elements.itemsScroll.scrollTop(o>a+s.itemsHeight?o-s.itemsHeight:n-i<a?n-i:a)},open:function(s){var l=this;if(l.options.nativeOnMobile&&l.utils.isMobile())return!1;l.utils.triggerCallback("BeforeOpen",l),s&&(s.preventDefault(),l.options.stopPropagation&&s.stopPropagation()),l.state.enabled&&(l.setOptionsDimensions(),e("."+l.classes.hideselect,"."+l.classes.open).children().selectric("close"),l.state.opened=!0,l.itemsHeight=l.elements.items.outerHeight(),l.itemsInnerHeight=l.elements.items.height(),l.elements.outerWrapper.addClass(l.classes.open),l.elements.input.val(""),s&&"focusin"!==s.type&&l.elements.input.focus(),setTimeout(function(){t.on("click.sl",e.proxy(l.close,l)).on("scroll.sl",e.proxy(l.isInViewport,l))},1),l.isInViewport(),l.options.preventWindowScroll&&t.on("mousewheel.sl DOMMouseScroll.sl","."+l.classes.scroll,function(t){var s=t.originalEvent,i=e(this).scrollTop(),n=0;"detail"in s&&(n=-1*s.detail),"wheelDelta"in s&&(n=s.wheelDelta),"wheelDeltaY"in s&&(n=s.wheelDeltaY),"deltaY"in s&&(n=-1*s.deltaY),(i===this.scrollHeight-l.itemsInnerHeight&&n<0||0===i&&n>0)&&t.preventDefault()}),l.detectItemVisibility(l.state.selectedIdx),l.highlight(l.state.multiple?-1:l.state.selectedIdx),l.utils.triggerCallback("Open",l))},close:function(){var e=this;e.utils.triggerCallback("BeforeClose",e),t.off(".sl"),e.elements.outerWrapper.removeClass(e.classes.open),e.state.opened=!1,e.utils.triggerCallback("Close",e)},change:function(){var t=this;t.utils.triggerCallback("BeforeChange",t),t.state.multiple?(e.each(t.lookupItems,function(e){t.lookupItems[e].selected=!1,t.$element.find("option").prop("selected",!1)}),e.each(t.state.selectedIdx,function(e,s){t.lookupItems[s].selected=!0,t.$element.find("option").eq(s).prop("selected",!0)}),t.state.currValue=t.state.selectedIdx,t.setLabel(),t.utils.triggerCallback("Change",t)):t.state.currValue!==t.state.selectedIdx&&(t.$element.prop("selectedIndex",t.state.currValue=t.state.selectedIdx).data("value",t.lookupItems[t.state.selectedIdx].text),t.setLabel(),t.utils.triggerCallback("Change",t))},highlight:function(e){var t=this,s=t.$li.filter("[data-index]").removeClass("highlighted");t.utils.triggerCallback("BeforeHighlight",t),void 0===e||-1===e||t.lookupItems[e].disabled||(s.eq(t.state.highlightedIdx=e).addClass("highlighted"),t.detectItemVisibility(e),t.utils.triggerCallback("Highlight",t))},select:function(t){var s=this,l=s.$li.filter("[data-index]");if(s.utils.triggerCallback("BeforeSelect",s,t),void 0!==t&&-1!==t&&!s.lookupItems[t].disabled){if(s.state.multiple){s.state.selectedIdx=e.isArray(s.state.selectedIdx)?s.state.selectedIdx:[s.state.selectedIdx];var i=e.inArray(t,s.state.selectedIdx);-1!==i?s.state.selectedIdx.splice(i,1):s.state.selectedIdx.push(t),l.removeClass("selected").filter(function(t){return-1!==e.inArray(t,s.state.selectedIdx)}).addClass("selected")}else l.removeClass("selected").eq(s.state.selectedIdx=t).addClass("selected");s.state.multiple&&s.options.multiple.keepMenuOpen||s.close(),s.change(),s.utils.triggerCallback("Select",s,t)}},destroy:function(e){var t=this;t.state&&t.state.enabled&&(t.elements.items.add(t.elements.wrapper).add(t.elements.input).remove(),e||t.$element.removeData("selectric").removeData("value"),t.$element.prop("tabindex",t.originalTabindex).off(".sl").off(t.eventTriggers).unwrap().unwrap(),t.state.enabled=!1)}},e.fn.selectric=function(t){return this.each(function(){var s=e.data(this,"selectric");s&&!s.disableOnMobile?"string"==typeof t&&s[t]?s[t]():s.init(t):e.data(this,"selectric",new n(this,t))})},e.fn.selectric.defaults={onChange:function(t){e(t).change()},maxHeight:300,keySearchTimeout:500,arrowButtonMarkup:'<b class="button">&#x25be;</b>',disableOnMobile:!1,nativeOnMobile:!0,openOnFocus:!0,openOnHover:!1,hoverIntentTimeout:500,expandToItemText:!1,responsive:!1,preventWindowScroll:!0,inheritOriginalWidth:!1,allowWrap:!0,forceRenderAbove:!1,forceRenderBelow:!1,stopPropagation:!0,optionsItemBuilder:"{text}",labelBuilder:"{text}",listBuilder:!1,keys:{previous:[37,38],next:[39,40],select:[9,13,27],open:[13,32,37,38,39,40],close:[9,27]},customClass:{prefix:"selectric",camelCase:!1},multiple:{separator:", ",keepMenuOpen:!0,maxLabelEntries:!1}}});
!function(t){"use strict";function e(){var e=this;e.reads=[],e.writes=[],e.raf=u.bind(t)}function n(t){t.scheduled||(t.scheduled=!0,t.raf(i.bind(null,t)))}function i(t){var e,i=t.writes,o=t.reads;try{o.length,r(o),i.length,r(i)}catch(t){e=t}if(t.scheduled=!1,(o.length||i.length)&&n(t),e){if(e.message,!t.catch)throw e;t.catch(e)}}function r(t){for(var e;e=t.shift();)e()}function o(t,e){var n=t.indexOf(e);return!!~n&&!!t.splice(n,1)}function s(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}var u=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){return setTimeout(t,16)};e.prototype={constructor:e,measure:function(t,e){var i=e?t.bind(e):t;return this.reads.push(i),n(this),i},mutate:function(t,e){var i=e?t.bind(e):t;return this.writes.push(i),n(this),i},clear:function(t){return o(this.reads,t)||o(this.writes,t)},extend:function(t){if("object"!=typeof t)throw new Error("expected object");var e=Object.create(this);return s(e,t),e.fastdom=this,e.initialize&&e.initialize(),e},catch:null};var exports=t.fastdom=t.fastdom||new e;"function"==typeof define?define(function(){return exports}):"object"==typeof module&&(module.exports=exports)}("undefined"!=typeof window?window:this);

/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));
/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),n=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-a))<=o?r[r.length-1]=s.add(e):r.push(e),n=a}),r},n=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=n(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=i,r._parseOptions=n,r._apply=function(e,o){var s=n(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var a={
display:i};a[s.property]="",e.css(a),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,n-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,a){if(a&&"resize"===a.type){var n=t(window).width();if(n===e)return;e=n;
}i?-1===o&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!1,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(a.currentSlide-1===0&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",null),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,c.options.infinite||(c.slideCount<=c.options.slidesToShow?c.currentSlide=0:c.currentSlide>e&&(c.currentSlide=e)),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d);
}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(a){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/*!
 * typeahead.js 1.1.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2017 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return a.Bloodhound=b(c)}):"object"==typeof exports?module.exports=b(require("jquery")):a.Bloodhound=b(a.jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){if(!(d=c.call(null,e,a,b)))return!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){if(d=c.call(null,e,a,b))return!1}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,j<=0?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},guid:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return"tt-"+a()+a(!0)+a(!0)+a()},noop:function(){}}}(),c="1.1.1",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){a=b.toStr(a);var c=[],d="";return b.each(a.split(""),function(a){a.match(/\s+/)?d="":(c.push(d+a),d+=a)}),c}function e(a){return function(c){return c=b.isArray(c)?c:[].slice.call(arguments,0),function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,ngram:d,obj:{nonword:e(c),whitespace:e(a),ngram:e(d)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key],this.size--),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];if(b)return this.list.moveToFront(b),b.val},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function c(a,c){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix)),this.ls=c||h,!this.ls&&this._noop()}function d(){return(new Date).getTime()}function e(a){return JSON.stringify(b.isUndefined(a)?null:a)}function f(b){return a.parseJSON(b)}function g(a){var b,c,d=[],e=h.length;for(b=0;b<e;b++)(c=h.key(b)).match(a)&&d.push(c.replace(a,""));return d}var h;try{h=window.localStorage,h.setItem("~~~","!"),h.removeItem("~~~")}catch(a){h=null}return b.mixin(c.prototype,{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=b.noop},_safeSet:function(a,b){try{this.ls.setItem(a,b)}catch(a){"QuotaExceededError"===a.name&&(this.clear(),this._noop())}},get:function(a){return this.isExpired(a)&&this.remove(a),f(this.ls.getItem(this._prefix(a)))},set:function(a,c,f){return b.isNumber(f)?this._safeSet(this._ttlKey(a),e(d()+f)):this.ls.removeItem(this._ttlKey(a)),this._safeSet(this._prefix(a),e(c))},remove:function(a){return this.ls.removeItem(this._ttlKey(a)),this.ls.removeItem(this._prefix(a)),this},clear:function(){var a,b=g(this.keyMatcher);for(a=b.length;a--;)this.remove(b[a]);return this},isExpired:function(a){var c=f(this.ls.getItem(this._ttlKey(a)));return!!(b.isNumber(c)&&d()>c)}}),c}(),g=function(){"use strict";function c(a){a=a||{},this.maxPendingRequests=a.maxPendingRequests||6,this.cancelled=!1,this.lastReq=null,this._send=a.transport,this._get=a.limiter?a.limiter(this._get):this._get,this._cache=a.cache===!1?new e(0):g}var d=0,f={},g=new e(10);return c.setMaxPendingRequests=function(a){this.maxPendingRequests=a},c.resetCache=function(){g.reset()},b.mixin(c.prototype,{_fingerprint:function(b){return b=b||{},b.url+b.type+a.param(b.data||{})},_get:function(a,b){function c(a){b(null,a),j._cache.set(h,a)}function e(){b(!0)}function g(){d--,delete f[h],j.onDeckRequestArgs&&(j._get.apply(j,j.onDeckRequestArgs),j.onDeckRequestArgs=null)}var h,i,j=this;h=this._fingerprint(a),this.cancelled||h!==this.lastReq||((i=f[h])?i.done(c).fail(e):d<this.maxPendingRequests?(d++,f[h]=this._send(a).done(c).fail(e).always(g)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(c,d){var e,f;d=d||a.noop,c=b.isString(c)?{url:c}:c||{},f=this._fingerprint(c),this.cancelled=!1,this.lastReq=f,(e=this._cache.get(f))?d(null,e):this._get(c,d)},cancel:function(){this.cancelled=!0}}),c}(),h=window.SearchIndex=function(){"use strict";function c(c){c=c||{},c.datumTokenizer&&c.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.identify=c.identify||b.stringify,this.datumTokenizer=c.datumTokenizer,this.queryTokenizer=c.queryTokenizer,this.matchAnyQueryToken=c.matchAnyQueryToken,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){var a={};return a[i]=[],a[h]={},a}function f(a){for(var b={},c=[],d=0,e=a.length;d<e;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){var c=0,d=0,e=[];a=a.sort(),b=b.sort();for(var f=a.length,g=b.length;c<f&&d<g;)a[c]<b[d]?c++:a[c]>b[d]?d++:(e.push(a[c]),c++,d++);return e}var h="c",i="i";return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;c.datums[f=c.identify(a)]=a,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b[h][g]||(b[h][g]=e()),b[i].push(f)})})},get:function(a){var c=this;return b.map(a,function(a){return c.datums[a]})},search:function(a){var c,e,j=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length&&!j.matchAnyQueryToken)return!1;for(b=j.trie,c=a.split("");b&&(d=c.shift());)b=b[h][d];if(b&&0===c.length)f=b[i].slice(0),e=e?g(e,f):f;else if(!j.matchAnyQueryToken)return e=[],!1}),e?b.map(f(e),function(a){return j.datums[a]}):[]},all:function(){var a=[];for(var b in this.datums)a.push(this.datums[b]);return a},reset:function(){this.datums={},this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function a(a){this.url=a.url,this.ttl=a.ttl,this.cache=a.cache,this.prepare=a.prepare,this.transform=a.transform,this.transport=a.transport,this.thumbprint=a.thumbprint,this.storage=new f(a.cacheKey)}var c;return c={data:"data",protocol:"protocol",thumbprint:"thumbprint"},b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(a){this.cache&&(this.storage.set(c.data,a,this.ttl),this.storage.set(c.protocol,location.protocol,this.ttl),this.storage.set(c.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var a,b={};return this.cache?(b.data=this.storage.get(c.data),b.protocol=this.storage.get(c.protocol),b.thumbprint=this.storage.get(c.thumbprint),a=b.thumbprint!==this.thumbprint||b.protocol!==location.protocol,b.data&&!a?b.data:null):null},fromNetwork:function(a){function b(){a(!0)}function c(b){a(null,e.transform(b))}var d,e=this;a&&(d=this.prepare(this._settings()),this.transport(d).fail(b).done(c))},clear:function(){return this.storage.clear(),this}}),a}(),j=function(){"use strict";function a(a){this.url=a.url,this.prepare=a.prepare,this.transform=a.transform,this.indexResponse=a.indexResponse,this.transport=new g({cache:a.cache,limiter:a.limiter,transport:a.transport,maxPendingRequests:a.maxPendingRequests})}return b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(a,b){function c(a,c){b(a?[]:e.transform(c))}var d,e=this;if(b)return a=a||"",d=this.prepare(a,this._settings()),this.transport.get(d,c)},cancelLastRequest:function(){this.transport.cancel()}}),a}(),k=function(){"use strict";function d(d){var e;return d?(e={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:b.identity,transform:b.identity,transport:null},d=b.isString(d)?{url:d}:d,d=b.mixin(e,d),!d.url&&a.error("prefetch requires url to be set"),d.transform=d.filter||d.transform,d.cacheKey=d.cacheKey||d.url,d.thumbprint=c+d.thumbprint,d.transport=d.transport?h(d.transport):a.ajax,d):null}function e(c){var d;if(c)return d={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:b.identity,transport:null},c=b.isString(c)?{url:c}:c,c=b.mixin(d,c),!c.url&&a.error("remote requires url to be set"),c.transform=c.filter||c.transform,c.prepare=f(c),c.limiter=g(c),c.transport=c.transport?h(c.transport):a.ajax,delete c.replace,delete c.wildcard,delete c.rateLimitBy,delete c.rateLimitWait,c}function f(a){function b(a,b){return b.url=f(b.url,a),b}function c(a,b){return b.url=b.url.replace(g,encodeURIComponent(a)),b}function d(a,b){return b}var e,f,g;return e=a.prepare,f=a.replace,g=a.wildcard,e?e:e=f?b:a.wildcard?c:d}function g(a){function c(a){return function(c){return b.debounce(c,a)}}function d(a){return function(c){return b.throttle(c,a)}}var e,f,g;return e=a.limiter,f=a.rateLimitBy,g=a.rateLimitWait,e||(e=/^throttle$/i.test(f)?d(g):c(g)),e}function h(c){return function(d){function e(a){b.defer(function(){g.resolve(a)})}function f(a){b.defer(function(){g.reject(a)})}var g=a.Deferred();return c(d,e,f),g}}return function(c){var f,g;return f={initialize:!0,identify:b.stringify,datumTokenizer:null,queryTokenizer:null,matchAnyQueryToken:!1,sufficient:5,indexRemote:!1,sorter:null,local:[],prefetch:null,remote:null},c=b.mixin(f,c||{}),!c.datumTokenizer&&a.error("datumTokenizer is required"),!c.queryTokenizer&&a.error("queryTokenizer is required"),g=c.sorter,c.sorter=g?function(a){return a.sort(g)}:b.identity,c.local=b.isFunction(c.local)?c.local():c.local,c.prefetch=d(c.prefetch),c.remote=e(c.remote),c}}(),l=function(){"use strict";function c(a){a=k(a),this.sorter=a.sorter,this.identify=a.identify,this.sufficient=a.sufficient,this.indexRemote=a.indexRemote,this.local=a.local,this.remote=a.remote?new j(a.remote):null,this.prefetch=a.prefetch?new i(a.prefetch):null,this.index=new h({identify:this.identify,datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer}),a.initialize!==!1&&this.initialize()}var e;return e=window&&window.Bloodhound,c.noConflict=function(){return window&&(window.Bloodhound=e),c},c.tokenizers=d,b.mixin(c.prototype,{__ttAdapter:function(){function a(a,b,d){return c.search(a,b,d)}function b(a,b){return c.search(a,b)}var c=this;return this.remote?a:b},_loadPrefetch:function(){function b(a,b){return a?c.reject():(e.add(b),e.prefetch.store(e.index.serialize()),void c.resolve())}var c,d,e=this;return c=a.Deferred(),this.prefetch?(d=this.prefetch.fromCache())?(this.index.bootstrap(d),c.resolve()):this.prefetch.fromNetwork(b):c.resolve(),c.promise()},_initialize:function(){function a(){b.add(b.local)}var b=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(a),this.initPromise},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){return this.index.add(a),this},get:function(a){return a=b.isArray(a)?a:[].slice.call(arguments),this.index.get(a)},search:function(a,c,d){function e(a){var c=[];b.each(a,function(a){!b.some(f,function(b){return g.identify(a)===g.identify(b)})&&c.push(a)}),g.indexRemote&&g.add(c),d(c)}var f,g=this;return c=c||b.noop,d=d||b.noop,f=this.sorter(this.index.search(a)),c(this.remote?f.slice():f),this.remote&&f.length<this.sufficient?this.remote.get(a,e):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return g.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),c}();return l}),function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){if(!(d=c.call(null,e,a,b)))return!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){if(d=c.call(null,e,a,b))return!1}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,j<=0?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},guid:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return"tt-"+a()+a(!0)+a(!0)+a()},noop:function(){}}}(),c=function(){"use strict";function a(a){var g,h;return h=b.mixin({},f,a),g={css:e(),classes:h,html:c(h),selectors:d(h)},{css:g.css,html:g.html,classes:g.classes,selectors:g.selectors,mixin:function(a){b.mixin(a,g)}}}function c(a){return{wrapper:'<span class="'+a.wrapper+'"></span>',menu:'<div role="listbox" class="'+a.menu+'"></div>'}}function d(a){var c={};return b.each(a,function(a,b){c[b]="."+a}),c}function e(){var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),a}var f={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return a}(),d=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d,e;return d="typeahead:",e={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},b.mixin(c.prototype,{_trigger:function(b,c){var e=a.Event(d+b);return this.$el.trigger.call(this.$el,e,c||[]),e},before:function(a){var b,c;return b=[].slice.call(arguments,1),c=this._trigger("before"+a,b),c.isDefaultPrevented()},trigger:function(a){var b;this._trigger(a,[].slice.call(arguments,1)),(b=e[a])&&this._trigger(b,[].slice.call(arguments,1))}}),c}(),e=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&e<f;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),f=function(a){"use strict";function c(a){return f[a.toUpperCase()]||a}function d(a,d,e,f){for(var g,h=[],i=0,j=a.length;i<j;i++){var k=b.escapeRegExChars(a[i]);f&&(k=k.replace(/\S/g,c)),h.push(k)}return g=e?"\\b("+h.join("|")+")\\b":"("+h.join("|")+")",d?new RegExp(g):new RegExp(g,"i")}var e={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1,diacriticInsensitive:!1},f={A:"[AaªÀ-Åà-åĀ-ąǍǎȀ-ȃȦȧᴬᵃḀḁẚẠ-ảₐ℀℁℻⒜Ⓐⓐ㍱-㍴㎀-㎄㎈㎉㎩-㎯㏂㏊㏟㏿Ａａ]",B:"[BbᴮᵇḂ-ḇℬ⒝Ⓑⓑ㍴㎅-㎇㏃㏈㏔㏝Ｂｂ]",C:"[CcÇçĆ-čᶜ℀ℂ℃℅℆ℭⅭⅽ⒞Ⓒⓒ㍶㎈㎉㎝㎠㎤㏄-㏇Ｃｃ]",D:"[DdĎďǄ-ǆǱ-ǳᴰᵈḊ-ḓⅅⅆⅮⅾ⒟Ⓓⓓ㋏㍲㍷-㍹㎗㎭-㎯㏅㏈Ｄｄ]",E:"[EeÈ-Ëè-ëĒ-ěȄ-ȇȨȩᴱᵉḘ-ḛẸ-ẽₑ℡ℯℰⅇ⒠Ⓔⓔ㉐㋍㋎Ｅｅ]",F:"[FfᶠḞḟ℉ℱ℻⒡Ⓕⓕ㎊-㎌㎙ﬀ-ﬄＦｆ]",G:"[GgĜ-ģǦǧǴǵᴳᵍḠḡℊ⒢Ⓖⓖ㋌㋍㎇㎍-㎏㎓㎬㏆㏉㏒㏿Ｇｇ]",H:"[HhĤĥȞȟʰᴴḢ-ḫẖℋ-ℎ⒣Ⓗⓗ㋌㍱㎐-㎔㏊㏋㏗Ｈｈ]",I:"[IiÌ-Ïì-ïĨ-İĲĳǏǐȈ-ȋᴵᵢḬḭỈ-ịⁱℐℑℹⅈⅠ-ⅣⅥ-ⅨⅪⅫⅰ-ⅳⅵ-ⅸⅺⅻ⒤Ⓘⓘ㍺㏌㏕ﬁﬃＩｉ]",J:"[JjĲ-ĵǇ-ǌǰʲᴶⅉ⒥ⒿⓙⱼＪｊ]",K:"[KkĶķǨǩᴷᵏḰ-ḵK⒦Ⓚⓚ㎄㎅㎉㎏㎑㎘㎞㎢㎦㎪㎸㎾㏀㏆㏍-㏏Ｋｋ]",L:"[LlĹ-ŀǇ-ǉˡᴸḶḷḺ-ḽℒℓ℡Ⅼⅼ⒧Ⓛⓛ㋏㎈㎉㏐-㏓㏕㏖㏿ﬂﬄＬｌ]",M:"[MmᴹᵐḾ-ṃ℠™ℳⅯⅿ⒨Ⓜⓜ㍷-㍹㎃㎆㎎㎒㎖㎙-㎨㎫㎳㎷㎹㎽㎿㏁㏂㏎㏐㏔-㏖㏘㏙㏞㏟Ｍｍ]",N:"[NnÑñŃ-ŉǊ-ǌǸǹᴺṄ-ṋⁿℕ№⒩Ⓝⓝ㎁㎋㎚㎱㎵㎻㏌㏑Ｎｎ]",O:"[OoºÒ-Öò-öŌ-őƠơǑǒǪǫȌ-ȏȮȯᴼᵒỌ-ỏₒ℅№ℴ⒪Ⓞⓞ㍵㏇㏒㏖Ｏｏ]",P:"[PpᴾᵖṔ-ṗℙ⒫Ⓟⓟ㉐㍱㍶㎀㎊㎩-㎬㎰㎴㎺㏋㏗-㏚Ｐｐ]",Q:"[Qqℚ⒬Ⓠⓠ㏃Ｑｑ]",R:"[RrŔ-řȐ-ȓʳᴿᵣṘ-ṛṞṟ₨ℛ-ℝ⒭Ⓡⓡ㋍㍴㎭-㎯㏚㏛Ｒｒ]",S:"[SsŚ-šſȘșˢṠ-ṣ₨℁℠⒮Ⓢⓢ㎧㎨㎮-㎳㏛㏜ﬆＳｓ]",T:"[TtŢ-ťȚțᵀᵗṪ-ṱẗ℡™⒯Ⓣⓣ㉐㋏㎔㏏ﬅﬆＴｔ]",U:"[UuÙ-Üù-üŨ-ųƯưǓǔȔ-ȗᵁᵘᵤṲ-ṷỤ-ủ℆⒰Ⓤⓤ㍳㍺Ｕｕ]",V:"[VvᵛᵥṼ-ṿⅣ-Ⅷⅳ-ⅷ⒱Ⓥⓥⱽ㋎㍵㎴-㎹㏜㏞Ｖｖ]",W:"[WwŴŵʷᵂẀ-ẉẘ⒲Ⓦⓦ㎺-㎿㏝Ｗｗ]",X:"[XxˣẊ-ẍₓ℻Ⅸ-Ⅻⅸ-ⅻ⒳Ⓧⓧ㏓Ｘｘ]",Y:"[YyÝýÿŶ-ŸȲȳʸẎẏẙỲ-ỹ⒴Ⓨⓨ㏉Ｙｙ]",Z:"[ZzŹ-žǱ-ǳᶻẐ-ẕℤℨ⒵Ⓩⓩ㎐-㎔Ｚｚ]"};return function(c){function f(b){var d,e,f;return(d=h.exec(b.data))&&(f=a.createElement(c.tagName),c.className&&(f.className=c.className),e=b.splitText(d.index),e.splitText(d[0].length),f.appendChild(e.cloneNode(!0)),b.parentNode.replaceChild(f,e)),!!d}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;c=b.mixin({},e,c),c.node&&c.pattern&&(c.pattern=b.isArray(c.pattern)?c.pattern:[c.pattern],h=d(c.pattern,c.caseSensitive,c.wordsOnly,c.diacriticInsensitive),g(c.node,f))}}(window.document),g=function(){"use strict";function c(c,e){c=c||{},c.input||a.error("input is missing"),e.mixin(this),this.$hint=a(c.hint),this.$input=a(c.input),this.$input.attr({"aria-activedescendant":"","aria-owns":this.$input.attr("id")+"_listbox",role:"combobox","aria-readonly":"true","aria-autocomplete":"list"}),a(e.menu).attr("id",this.$input.attr("id")+"_listbox"),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=d(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop),this.onSync("cursorchange",this._updateDescendent)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function g(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var h;return h={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return b.toStr(a).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(a){var b=h[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(a,b){var c;switch(a){case"up":case"down":c=!g(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!g(b);break;default:c=!0}return c},_checkLanguageDirection:function(){var a=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==a&&(this.dir=a,this.$hint.attr("dir",a),this.trigger("langDirChanged",a))},_setQuery:function(a,b){var c,d;c=f(a,this.query),d=!!c&&this.query.length!==a.length,this.query=a,b||c?!b&&d&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},_updateDescendent:function(a,b){this.$input.attr("aria-activedescendant",b)},bind:function(){var a,c,d,e,f=this;return a=b.bind(this._onBlur,this),c=b.bind(this._onFocus,this),d=b.bind(this._onKeydown,this),e=b.bind(this._onInput,this),this.$input.on("blur.tt",a).on("focus.tt",c).on("keydown.tt",d),!b.isMsie()||b.isMsie()>9?this.$input.on("input.tt",e):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){h[a.which||a.keyCode]||b.defer(b.bind(f._onInput,f,a))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(a,b){this.setInputValue(a),this._setQuery(a,b)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(a){this.$input.val(a),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:!document.selection||(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length)},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=a("<div>")}}),c}(),h=function(){"use strict";function c(c,e){c=c||{},c.templates=c.templates||{},c.templates.notFound=c.templates.notFound||c.templates.empty,c.source||a.error("missing source"),c.node||a.error("missing node"),c.name&&!h(c.name)&&a.error("invalid dataset name: "+c.name),e.mixin(this),this.highlight=!!c.highlight,this.name=b.toStr(c.name||j()),this.limit=c.limit||5,this.displayFn=d(c.display||c.displayKey),this.templates=g(c.templates,this.displayFn),this.source=c.source.__ttAdapter?c.source.__ttAdapter():c.source,this.async=b.isUndefined(c.async)?this.source.length>2:!!c.async,this._resetLastSuggestion(),this.$el=a(c.node).attr("role","presentation").addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function d(a){function c(b){return b[a]}return a=a||b.stringify,b.isFunction(a)?a:c}function g(c,d){function e(c){return a('<div role="option">').attr("id",b.guid()).text(d(c))}return{notFound:c.notFound&&b.templatify(c.notFound),pending:c.pending&&b.templatify(c.pending),header:c.header&&b.templatify(c.header),footer:c.footer&&b.templatify(c.footer),suggestion:c.suggestion||e}}function h(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var i,j;return i={dataset:"tt-selectable-dataset",val:"tt-selectable-display",obj:"tt-selectable-object"},j=b.getIdGenerator(),c.extractData=function(b){var c=a(b);return c.data(i.obj)?{dataset:c.data(i.dataset)||"",val:c.data(i.val)||"",obj:c.data(i.obj)||null}:null},b.mixin(c.prototype,e,{_overwrite:function(a,b){b=b||[],b.length?this._renderSuggestions(a,b):this.async&&this.templates.pending?this._renderPending(a):!this.async&&this.templates.notFound?this._renderNotFound(a):this._empty(),this.trigger("rendered",b,!1,this.name)},_append:function(a,b){b=b||[],b.length&&this.$lastSuggestion.length?this._appendSuggestions(a,b):b.length?this._renderSuggestions(a,b):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(a),this.trigger("rendered",b,!0,this.name)},_renderSuggestions:function(a,b){var c;c=this._getSuggestionsFragment(a,b),this.$lastSuggestion=c.children().last(),this.$el.html(c).prepend(this._getHeader(a,b)).append(this._getFooter(a,b))},_appendSuggestions:function(a,b){var c,d;c=this._getSuggestionsFragment(a,b),d=c.children().last(),this.$lastSuggestion.after(c),this.$lastSuggestion=d},_renderPending:function(a){var b=this.templates.pending;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_renderNotFound:function(a){var b=this.templates.notFound;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(c,d){var e,g=this;return e=document.createDocumentFragment(),b.each(d,function(b){var d,f;f=g._injectQuery(c,b),d=a(g.templates.suggestion(f)).data(i.dataset,g.name).data(i.obj,b).data(i.val,g.displayFn(b)).addClass(g.classes.suggestion+" "+g.classes.selectable),e.appendChild(d[0])}),this.highlight&&f({className:this.classes.highlight,node:e,pattern:c}),a(e)},_getFooter:function(a,b){return this.templates.footer?this.templates.footer({query:a,suggestions:b,dataset:this.name}):null},_getHeader:function(a,b){return this.templates.header?this.templates.header({query:a,suggestions:b,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=a()},_injectQuery:function(a,c){return b.isObject(c)?b.mixin({_query:a},c):c},update:function(b){function c(a){g||(g=!0,a=(a||[]).slice(0,e.limit),h=a.length,e._overwrite(b,a),h<e.limit&&e.async&&e.trigger("asyncRequested",b,e.name))}function d(c){if(c=c||[],!f&&h<e.limit){e.cancel=a.noop;var d=Math.abs(h-e.limit);h+=d,e._append(b,c.slice(0,d)),e.async&&e.trigger("asyncReceived",b,e.name)}}var e=this,f=!1,g=!1,h=0;this.cancel(),this.cancel=function(){f=!0,e.cancel=a.noop,e.async&&e.trigger("asyncCanceled",b,e.name)},this.source(b,c,d),!g&&c([])},cancel:a.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=a("<div>")}}),c}(),i=function(){"use strict";function c(c,d){function e(b){var c=f.$node.find(b.node).first();return b.node=c.length?c:a("<div>").appendTo(f.$node),new h(b,d)}var f=this;c=c||{},c.node||a.error("node is required"),d.mixin(this),this.$node=a(c.node),this.query=null,this.datasets=b.map(c.datasets,e)}return b.mixin(c.prototype,e,{_onSelectableClick:function(b){this.trigger("selectableClicked",a(b.currentTarget))},_onRendered:function(a,b,c,d){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",b,c,d)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){return b.every(this.datasets,b.bind(function(a){var b=a.isEmpty();return this.$node.attr("aria-expanded",!b),b},this))},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var a=this.getActiveSelectable();a&&a.removeClass(this.classes.cursor)},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$node.scrollTop(),e=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),b<0?this.$node.scrollTop(d+b):e<c&&this.$node.scrollTop(d+(c-e))},bind:function(){var c,d=this;return c=b.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,c),this.$node.on("mouseover",this.selectors.selectable,function(){d.setCursor(a(this))}),this.$node.on("mouseleave",function(){d._removeCursor()}),b.each(this.datasets,function(a){a.onSync("asyncRequested",d._propagate,d).onSync("asyncCanceled",d._propagate,d).onSync("asyncReceived",d._propagate,d).onSync("rendered",d._onRendered,d).onSync("cleared",d._onCleared,d)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.scrollTop(0),this.$node.addClass(this.classes.open)},close:function(){this.$node.attr("aria-expanded",!1),this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(a){this.$node.attr("dir",a)},selectableRelativeToCursor:function(a){var b,c,d,e;return c=this.getActiveSelectable(),b=this._getSelectables(),d=c?b.index(c):-1,e=d+a,e=(e+1)%(b.length+1)-1,e=e<-1?b.length-1:e,e===-1?null:b.eq(e)},setCursor:function(a){this._removeCursor(),(a=a&&a.first())&&(a.addClass(this.classes.cursor),this._ensureVisible(a))},getSelectableData:function(a){return a&&a.length?h.extractData(a):null},getActiveSelectable:function(){var a=this._getSelectables().filter(this.selectors.cursor).first();return a.length?a:null},getTopSelectable:function(){var a=this._getSelectables().first();return a.length?a:null},update:function(a){function c(b){b.update(a)}var d=a!==this.query;return d&&(this.query=a,b.each(this.datasets,c)),d},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function c(a){a.destroy()}this.$node.off(".tt"),this.$node=a("<div>"),b.each(this.datasets,c)}}),c}(),j=function(){
"use strict";function c(c){this.$el=a("<span></span>",{role:"status","aria-live":"polite"}).css({position:"absolute",padding:"0",border:"0",height:"1px",width:"1px","margin-bottom":"-1px","margin-right":"-1px",overflow:"hidden",clip:"rect(0 0 0 0)","white-space":"nowrap"}),c.$input.after(this.$el),b.each(c.menu.datasets,b.bind(function(a){a.onSync&&(a.onSync("rendered",b.bind(this.update,this)),a.onSync("cleared",b.bind(this.cleared,this)))},this))}return b.mixin(c.prototype,{update:function(a,b){var c,d=b.length;c=1===d?{result:"result",is:"is"}:{result:"results",is:"are"},this.$el.text(d+" "+c.result+" "+c.is+" available, use up and down arrow keys to navigate.")},cleared:function(){this.$el.text("")}}),c}(),k=function(){"use strict";function a(){i.apply(this,[].slice.call(arguments,0))}var c=i.prototype;return b.mixin(a.prototype,i.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),c.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),c.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(a){return this.$node.css("ltr"===a?this.css.ltr:this.css.rtl),c.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),a}(),l=function(){"use strict";function c(c,e){var f,g,h,i,j,k,l,m,n,o,p;c=c||{},c.input||a.error("missing input"),c.menu||a.error("missing menu"),c.eventBus||a.error("missing event bus"),e.mixin(this),this.eventBus=c.eventBus,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.input=c.input,this.menu=c.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),f=d(this,"activate","open","_onFocused"),g=d(this,"deactivate","_onBlurred"),h=d(this,"isActive","isOpen","_onEnterKeyed"),i=d(this,"isActive","isOpen","_onTabKeyed"),j=d(this,"isActive","_onEscKeyed"),k=d(this,"isActive","open","_onUpKeyed"),l=d(this,"isActive","open","_onDownKeyed"),m=d(this,"isActive","isOpen","_onLeftKeyed"),n=d(this,"isActive","isOpen","_onRightKeyed"),o=d(this,"_openIfActive","_onQueryChanged"),p=d(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",f,this).onSync("blurred",g,this).onSync("enterKeyed",h,this).onSync("tabKeyed",i,this).onSync("escKeyed",j,this).onSync("upKeyed",k,this).onSync("downKeyed",l,this).onSync("leftKeyed",m,this).onSync("rightKeyed",n,this).onSync("queryChanged",o,this).onSync("whitespaceChanged",p,this).onSync("langDirChanged",this._onLangDirChanged,this)}function d(a){var c=[].slice.call(arguments,1);return function(){var d=[].slice.call(arguments);b.each(c,function(b){return a[b].apply(a,d)})}}return b.mixin(c.prototype,{_hacks:function(){var c,d;c=this.input.$input||a("<div>"),d=this.menu.$node||a("<div>"),c.on("blur.tt",function(a){var e,f,g;e=document.activeElement,f=d.is(e),g=d.has(e).length>0,b.isMsie()&&(f||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){c.focus()}))}),d.on("mousedown.tt",function(a){a.preventDefault()})},_onSelectableClicked:function(a,b){this.select(b)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(a,b,c,d){this._updateHint(),this.eventBus.trigger("render",b,c,d)},_onAsyncRequested:function(a,b,c){this.eventBus.trigger("asyncrequest",c,b)},_onAsyncCanceled:function(a,b,c){this.eventBus.trigger("asynccancel",c,b)},_onAsyncReceived:function(a,b,c){this.eventBus.trigger("asyncreceive",c,b)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())&&this.select(c)&&(b.preventDefault(),b.stopPropagation())},_onTabKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())?this.select(c)&&b.preventDefault():(c=this.menu.getTopSelectable())&&this.autocomplete(c)&&b.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onQueryChanged:function(a,b){this._minLengthMet(b)?this.menu.update(b):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(a,b){this.dir!==b&&(this.dir=b,this.menu.setLanguageDirection(b))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(a){return a=b.isString(a)?a:this.input.getQuery()||"",a.length>=this.minLength},_updateHint:function(){var a,c,d,e,f,h,i;a=this.menu.getTopSelectable(),c=this.menu.getSelectableData(a),d=this.input.getInputValue(),!c||b.isBlankString(d)||this.input.hasOverflow()?this.input.clearHint():(e=g.normalizeQuery(d),f=b.escapeRegExChars(e),h=new RegExp("^(?:"+f+")(.+$)","i"),i=h.exec(c.val),i&&this.input.setHint(d+i[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return!!this.isActive()||!(!this.isEnabled()||this.eventBus.before("active"))&&(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return!this.isActive()||!this.eventBus.before("idle")&&(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0)},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(a){this.input.setQuery(b.toStr(a))},getVal:function(){return this.input.getQuery()},select:function(a){var b=this.menu.getSelectableData(a);return!(!b||this.eventBus.before("select",b.obj,b.dataset))&&(this.input.setQuery(b.val,!0),this.eventBus.trigger("select",b.obj,b.dataset),this.close(),!0)},autocomplete:function(a){var b,c,d;return b=this.input.getQuery(),c=this.menu.getSelectableData(a),d=c&&b!==c.val,!(!d||this.eventBus.before("autocomplete",c.obj,c.dataset))&&(this.input.setQuery(c.val),this.eventBus.trigger("autocomplete",c.obj,c.dataset),!0)},moveCursor:function(a){var b,c,d,e,f,g,h;return b=this.input.getQuery(),c=this.menu.selectableRelativeToCursor(a),d=this.menu.getSelectableData(c),e=d?d.obj:null,f=d?d.dataset:null,h=c?c.attr("id"):null,this.input.trigger("cursorchange",h),g=this._minLengthMet()&&this.menu.update(b),!g&&!this.eventBus.before("cursorchange",e,f)&&(this.menu.setCursor(c),d?this.input.setInputValue(d.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",e,f),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),c}();!function(){"use strict";function e(b,c){b.each(function(){var b,d=a(this);(b=d.data(q.typeahead))&&c(b,d)})}function f(a,b){return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(m(a)).prop("readonly",!0).removeAttr("id name placeholder required").attr({spellcheck:"false",tabindex:-1})}function h(a,b){a.data(q.attrs,{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass(b.classes.input).attr({spellcheck:!1});try{!a.attr("dir")&&a.attr("dir","auto")}catch(a){}return a}function m(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function n(a){var c,d;c=a.data(q.www),d=a.parent().filter(c.selectors.wrapper),b.each(a.data(q.attrs),function(c,d){b.isUndefined(c)?a.removeAttr(d):a.attr(d,c)}),a.removeData(q.typeahead).removeData(q.www).removeData(q.attr).removeClass(c.classes.input),d.length&&(a.detach().insertAfter(d),d.remove())}function o(c){var d,e;return d=b.isJQuery(c)||b.isElement(c),e=d?a(c).first():[],e.length?e:null}var p,q,r;p=a.fn.typeahead,q={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},r={initialize:function(e,m){function n(){var c,n,r,s,t,u,v,w,x,y,z,A;b.each(m,function(a){a.highlight=!!e.highlight}),c=a(this),n=a(p.html.wrapper),r=o(e.hint),s=o(e.menu),t=e.hint!==!1&&!r,u=e.menu!==!1&&!s,t&&(r=f(c,p)),u&&(s=a(p.html.menu).css(p.css.menu)),r&&r.val(""),c=h(c,p),(t||u)&&(n.css(p.css.wrapper),c.css(t?p.css.input:p.css.inputWithNoHint),c.wrap(n).parent().prepend(t?r:null).append(u?s:null)),A=u?k:i,v=new d({el:c}),w=new g({hint:r,input:c},p),x=new A({node:s,datasets:m},p),y=new j({$input:c,menu:x}),z=new l({input:w,menu:x,eventBus:v,minLength:e.minLength},p),c.data(q.www,p),c.data(q.typeahead,z)}var p;return m=b.isArray(m)?m:[].slice.call(arguments,1),e=e||{},p=c(e.classNames),this.each(n)},isEnabled:function(){var a;return e(this.first(),function(b){a=b.isEnabled()}),a},enable:function(){return e(this,function(a){a.enable()}),this},disable:function(){return e(this,function(a){a.disable()}),this},isActive:function(){var a;return e(this.first(),function(b){a=b.isActive()}),a},activate:function(){return e(this,function(a){a.activate()}),this},deactivate:function(){return e(this,function(a){a.deactivate()}),this},isOpen:function(){var a;return e(this.first(),function(b){a=b.isOpen()}),a},open:function(){return e(this,function(a){a.open()}),this},close:function(){return e(this,function(a){a.close()}),this},select:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.select(d)}),c},autocomplete:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.autocomplete(d)}),c},moveCursor:function(a){var b=!1;return e(this.first(),function(c){b=c.moveCursor(a)}),b},val:function(a){var c;return arguments.length?(e(this,function(c){c.setVal(b.toStr(a))}),this):(e(this.first(),function(a){c=a.getVal()}),c)},destroy:function(){return e(this,function(a,b){n(b),a.destroy()}),this}},a.fn.typeahead=function(a){return r[a]?r[a].apply(this,[].slice.call(arguments,1)):r.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=p,this}}()});
/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function(factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global
		factory(jQuery);
	}
})(function($) {
	'use strict';

	var $scrollTo = $.scrollTo = function(target, duration, settings) {
		return $(window).scrollTo(target, duration, settings);
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: 0,
		limit:true
	};

	function isWin(elem) {
		return !elem.nodeName ||
			$.inArray(elem.nodeName.toLowerCase(), ['iframe','#document','html','body']) !== -1;
	}		

	$.fn.scrollTo = function(target, duration, settings) {
		if (typeof duration === 'object') {
			settings = duration;
			duration = 0;
		}
		if (typeof settings === 'function') {
			settings = { onAfter:settings };
		}
		if (target === 'max') {
			target = 9e9;
		}

		settings = $.extend({}, $scrollTo.defaults, settings);
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		var queue = settings.queue && settings.axis.length > 1;
		if (queue) {
			// Let's keep the overall duration
			duration /= 2;
		}
		settings.offset = both(settings.offset);
		settings.over = both(settings.over);

		return this.each(function() {
			// Null target yields nothing, just like jQuery does
			if (target === null) return;

			var win = isWin(this),
				elem = win ? this.contentWindow || window : this,
				$elem = $(elem),
				targ = target, 
				attr = {},
				toff;

			switch (typeof targ) {
				// A number will pass the regex
				case 'number':
				case 'string':
					if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
						targ = both(targ);
						// We are done
						break;
					}
					// Relative/Absolute selector
					targ = win ? $(targ) : $(targ, elem);
					/* falls through */
				case 'object':
					if (targ.length === 0) return;
					// DOMElement / jQuery
					if (targ.is || targ.style) {
						// Get the real position of the target
						toff = (targ = $(targ)).offset();
					}
			}

			var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

			$.each(settings.axis.split(''), function(i, axis) {
				var Pos	= axis === 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					prev = $elem[key](),
					max = $scrollTo.max(elem, axis);

				if (toff) {// jQuery / DOMElement
					attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

					// If it's a dom element, reduce the margin
					if (settings.margin) {
						attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
					}

					attr[key] += offset[pos] || 0;

					if (settings.over[pos]) {
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis === 'x'?'width':'height']() * settings.over[pos];
					}
				} else {
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) === '%' ?
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if (settings.limit && /^\d+$/.test(attr[key])) {
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
				}

				// Don't waste time animating, if there's no need.
				if (!i && settings.axis.length > 1) {
					if (prev === attr[key]) {
						// No animation needed
						attr = {};
					} else if (queue) {
						// Intermediate animation
						animate(settings.onAfterFirst);
						// Don't animate this axis again in the next iteration.
						attr = {};
					}
				}
			});

			animate(settings.onAfter);

			function animate(callback) {
				var opts = $.extend({}, settings, {
					// The queue setting conflicts with animate()
					// Force it to always be true
					queue: true,
					duration: duration,
					complete: callback && function() {
						callback.call(elem, targ, settings);
					}
				});
				$elem.animate(attr, opts);
			}
		});
	};

	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function(elem, axis) {
		var Dim = axis === 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;

		if (!isWin(elem))
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();

		var size = 'client' + Dim,
			doc = elem.ownerDocument || elem.document,
			html = doc.documentElement,
			body = doc.body;

		return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
	};

	function both(val) {
		return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
	}

	// Add special hooks so that window scroll properties can be animated
	$.Tween.propHooks.scrollLeft = 
	$.Tween.propHooks.scrollTop = {
		get: function(t) {
			return $(t.elem)[t.prop]();
		},
		set: function(t) {
			var curr = this.get(t);
			// If interrupt is true and user scrolled, stop animating
			if (t.options.interrupt && t._last && t._last !== curr) {
				return $(t.elem).stop();
			}
			var next = Math.round(t.now);
			// Don't waste CPU
			// Browsers don't render floating point scroll
			if (curr !== next) {
				$(t.elem)[t.prop](next);
				t._last = this.get(t);
			}
		}
	};

	// AMD requirement
	return $scrollTo;
});

/**
 * @fileOverview jQuery plugin, provides a simple dropdown button menu (split button). jQuery UI themes compatible.
 *               <p>License MIT
 *               <br />Copyright 2012 Christos Pontikis <a href="http://pontikis.net">http://pontikis.net</a>
 *               <br />Project page <a href="http://pontikis.net/labs/jui_dropdown">http://pontikis.net/labs/jui_dropdown</a>
 * @version 1.0.4 (15 Apr 2013)
 * @author Christos Pontikis http://pontikis.net
 * @requires jquery (>=1.6), jquery-ui (>=1.8)
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name $
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

/** the foolowing is OPTIONAL in case private methods will be documented  */
/**
 * Pseudo-Namespace containing private methods (for documentation purposes)
 * @name _private_methods
 * @namespace
 */

"use strict";
(function($) {

    var pluginName = 'jui_dropdown';

    /* public methods ------------------------------------------------------- */
    var methods = {

        /**
         * @lends $.fn.jui_dropdown
         */
        init: function(options) {

            var elem = this;

            return this.each(function() {

                /**
                 * settings and defaults
                 * using $.extend, settings modification will affect elem.data() and vive versa
                 */
                var settings = elem.data(pluginName);
                if(typeof(settings) == 'undefined') {
                    var defaults = elem.jui_dropdown('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                // bind events
                elem.unbind("onSelect").bind("onSelect", settings.onSelect);

                elem.removeClass(settings.containerClass).addClass(settings.containerClass);

                var elem_launcher = elem.find(settings.launcher_selector);
                var elem_launcher_container = elem.find(settings.launcher_container_selector);
                var elem_menu_container = elem.find(settings.menu_container_selector);
                var elem_menu = elem_menu_container.find(settings.menu_selector);
                var elem_menu_items = elem_menu.find(settings.menu_item_selector);

                elem_launcher_container.removeClass(settings.launcherContainerClass).addClass(settings.launcherContainerClass);
                elem_launcher.removeClass(settings.launcherClass).addClass(settings.launcherClass);
                elem_menu.removeClass(settings.menuClass).addClass(settings.menuClass);

                if(encode_version($.ui.version) < encode_version('1.9.0')) {
                    elem_menu.menu().menu('refresh').hide();
                    elem.removeClass("open");

                    elem_menu_items.off('click').on('click', function() {
                        elem.triggerHandler('onSelect', {index: parseInt($(this).index(elem_menu_items)) + 1, menuItem: $(this)})
                    });
                } else {
                    elem_menu.menu({
                        select: function(event, ui) {
                            elem.triggerHandler('onSelect', {index: parseInt(ui.item.index(elem_menu_items)) + 1, menuItem: ui.item})
                        }
                    }).menu('refresh').hide();
                    elem.removeClass("open");
                }

                if(settings.launcher_is_UI_button) {
                    elem_launcher.button({
                        text: settings.launcherUIShowText,
                        icons: {
                            primary: settings.launcherUIPrimaryIconClass,
                            secondary: settings.launcherUISecondaryIconClass
                        }
                    });
                }

                elem_launcher.off('click').on('click', function() {

                    var jui_dropdown_current = $(document).data("jui_dropdown_current");
                    if(typeof(jui_dropdown_current) != 'undefined') {
                        var current_menu = jui_dropdown_current.find(settings.menu_container_selector).find(settings.menu_selector).not(elem_menu);
                        if (current_menu.size() > 0) {
                            jui_dropdown_current.find(settings.menu_container_selector).find(settings.menu_selector).hide();
                            jui_dropdown_current.removeClass("open");
                        }
                    }

                    if(!settings.launcher_is_UI_button && settings.toggle_launcher) {
                        elem_launcher.addClass(settings.launcherSelectedClass);
                    }

                    if (elem_menu.is(":visible")) {
                        elem_menu.hide();
                        elem.removeClass("open");
                    }
                    else {
                        elem.addClass("open");
                        elem_menu.show().position({
                            my: settings.my_position,
                            at: settings.at_position,
                            of: elem_launcher_container,
                            collision: settings.collision
                        });
                    }

                    $(document).one("click", function() {
                        elem_menu.hide();
                        elem.removeClass("open");
                        if(!settings.launcher_is_UI_button && settings.toggle_launcher) {
                            elem_launcher.removeClass(settings.launcherSelectedClass);
                        }
                    });

                    $(document).data("jui_dropdown_current", elem);

                    return false;
                });

                elem_launcher.off('mouseenter').on('mouseenter', function() {
                    if(settings.launchOnMouseEnter) {
                        elem_launcher.trigger('click');
                    }
                });
                
            });

        },

        /**
         * Get default values
         * Usage: $(element).jui_dropdown('getDefaults');
         * @return {Object}
         */
        getDefaults: function() {
            return  {

                launcher_selector: '.dropdown-control',
                launcher_container_selector: '.dropdown-control-container',
                menu_container_selector: '.dropdown-menu',
                menu_selector: 'ul',
                menu_item_selector: '.dropdown-menu-item',

                containerClass: 'containerClass',
                launcherContainerClass: 'launcherContainerClass',
                launcherClass: 'launcherClass',
                launcherSelectedClass: 'launcherSelectedClass ui-widget-header ui-corner-all',
                menuClass: 'menuClass',
                launcherUIPrimaryIconClass: '',
                launcherUISecondaryIconClass: 'ui-icon-triangle-1-s',

                launcher_is_UI_button: true,
                launcherUIShowText: true,

                my_position: 'left top',
                at_position: 'left bottom',
                toggle_launcher: false,
                collision: 'none',

                launchOnMouseEnter: false,

                onSelect: function() {
                }
            };
        },

        /**
         * Get any option set to plugin using its name (as string)
         * Usage: $(element).jui_dropdown('getOption', some_option);
         * @param opt
         * @return {*}
         */
        getOption: function(opt) {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * Usage: $(element).jui_dropdown('getAllOptions');
         * @return {*}
         */
        getAllOptions: function() {
            var elem = this;
            return elem.data(pluginName);
        },

        /**
         * Set option
         * Usage: $(element).jui_dropdown('setOption', 'oprion_name',  'oprion_value',  reinit);
         * @param opt
         * @param val
         * @param reinit
         */
        setOption: function(opt, val, reinit) {
            var elem = this;
            elem.data(pluginName)[opt] = val;
            if(reinit) {
                elem.jui_dropdown('init');
            }
        },

        /**
         * Refresh plugin
         * Usage: $(element).jui_dropdown('refresh');
         * @return {*|jQuery}
         */
        refresh: function() {
            var elem = this;
            elem.jui_dropdown();
        },

        /**
         * Destroy plugin
         * Usage: $(element).jui_dropdown('destroy');
         * @return {*|jQuery}
         */
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);

                $this.removeData(pluginName);
            });
        }
    };

    /* private methods ------------------------------------------------------ */
    /** the foolowing is OPTIONAL in case private methods will be documented  */

    /**
     * @lends _private_methods
     */


    /**
     * Add leading zeros
     * @param {Number} n
     * @param {Number} totalDigits
     * @return {String}
     */
    var PadDigits = function(n, totalDigits) {
        var ns = n.toString();
        var pd = '';
        if(totalDigits > ns.length) {
            for(var i = 0; i < (totalDigits - ns.length); i++) {
                pd += '0';
            }
        }
        return pd + ns;
    };


    /**
     * Encode version string (e.g 1.8.23 -> 010823, 1.10.0 -> 011000)
     * @param version
     * @return {String}
     */
    var encode_version = function(version) {
        var version_encoded = '';
        var a_version = version.split(".");
        var a_version_len = a_version.length;
        for(var i = 0; i < a_version_len; i++) {
            version_encoded += PadDigits(a_version[i], 2);
        }
        return version_encoded;
    };

    /**
     * jui_dropdown
     *
     * @class jui_dropdown
     * @memberOf $.fn
     */
    $.fn.jui_dropdown = function(method) {

        if(this.size() != 1) {
            var err_msg = 'You must use this plugin (' + pluginName + ') with a unique element (at once)';
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if(methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
        }

    };

})(jQuery);
/* jFeed : jQuery feed parser plugin
 * Copyright (C) 2007 Jean-François Hovinne - http://www.hovinne.com/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 */

jQuery.getFeed = function(options) {

    options = jQuery.extend({

        url: null,
        data: null,
        cache: true,
        success: null,
        failure: null,
        error: null,
        global: true

    }, options);

    if (options.url) {
        
        if (jQuery.isFunction(options.failure) && jQuery.type(options.error)==='null') {
          // Handle legacy failure option
          options.error = function(xhr, msg, e){
            options.failure(msg, e);
          }
        } else if (jQuery.type(options.failure) === jQuery.type(options.error) === 'null') {
          // Default error behavior if failure & error both unspecified
          options.error = function(xhr, msg, e){
            window.console&&console.log('getFeed failed to load feed', xhr, msg, e);
          }
        }

        return $j.ajax({
            type: 'GET',
            url: options.url,
            data: options.data,
            cache: options.cache,
            dataType: "text",
       		crossDomain: true,
            success: function(xml) {
                var feed = new JFeed(xml);
                if (jQuery.isFunction(options.success)) options.success(feed);
            },
            error: options.error,
            global: options.global
        });
    }
};

function JFeed(xml) {
    if (xml) this.parse(xml);
}
;

JFeed.prototype = {

    type: '',
    version: '',
    title: '',
    link: '',
    description: '',
    parse: function(xml) {

        if (jQuery.browser.msie) {
            var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.loadXML(xml);
            xml = xmlDoc;
        }

        if (jQuery('channel', xml).length == 1) {

            this.type = 'rss';
            var feedClass = new JRss(xml);

        } else if (jQuery('feed', xml).length == 1) {

            this.type = 'atom';
            var feedClass = new JAtom(xml);
        }

        if (feedClass) jQuery.extend(this, feedClass);
    }
};

function JFeedItem() {};

JFeedItem.prototype = {

    title: '',
    link: '',
    description: '',
    updated: '',
    id: ''
};

function JAtom(xml) {
    this._parse(xml);
};

JAtom.prototype = {
    
    _parse: function(xml) {
    
        var channel = jQuery('feed', xml).eq(0);

        this.version = '1.0';
        this.title = jQuery(channel).find('title:first').text();
        this.link = jQuery(channel).find('link:first').attr('href');
        if (typeof this.link == 'undefined' || this.link.length == 0) {
        	 this.link = jQuery(channel).find('rssLink:first').text();
        }
        this.description = jQuery(channel).find('subtitle:first').text();
        this.language = jQuery(channel).attr('xml:lang');
        this.updated = jQuery(channel).find('updated:first').text();
        
        this.items = new Array();
        
        var feed = this;
        
        jQuery('entry', xml).each( function() {
        
            var item = new JFeedItem();
            
            item.title = jQuery(this).find('title').eq(0).text();
            item.link = jQuery(this).find('link').eq(0).attr('href');
            if (typeof item.link == 'undefined' || item.link.length == 0) {
	        	 item.link = jQuery(this).find('rssLink').eq(0).text();
	        }
            item.description = jQuery(this).find('content').eq(0).text();
            item.updated = jQuery(this).find('updated').eq(0).text();
            item.id = jQuery(this).find('id').eq(0).text();
            
            feed.items.push(item);
        });
    }
};

function JRss(xml) {
    this._parse(xml);
};

JRss.prototype  = {
    
    _parse: function(xml) {
    
        if(jQuery('rss', xml).length == 0) this.version = '1.0';
        else this.version = jQuery('rss', xml).eq(0).attr('version');

        var channel = jQuery('channel', xml).eq(0);
    
        this.title = jQuery(channel).find('title:first').text();
        this.link = jQuery(channel).find('link:first').text();
        if (typeof this.link == 'undefined' || this.link.length == 0) {
        	 this.link = jQuery(channel).find('rssLink:first').text();
        }
        this.description = jQuery(channel).find('description:first').text();
        this.language = jQuery(channel).find('language:first').text();
        this.updated = jQuery(channel).find('lastBuildDate:first').text();
    
        this.items = new Array();
        
        var feed = this;
        
        jQuery('item', xml).each( function() {
        
            var item = new JFeedItem();
            
            item.title = jQuery(this).find('title').eq(0).text();
            item.link = jQuery(this).find('link').eq(0).text();
            if (typeof item.link == 'undefined' || item.link.length == 0) {
	        	 item.link = jQuery(this).find('rssLink').eq(0).text();
	        }
            item.description = jQuery(this).find('description').eq(0).text();
            item.updated = jQuery(this).find('pubDate').eq(0).text();
            item.id = jQuery(this).find('guid').eq(0).text();
            
            feed.items.push(item);
        });
    }
};
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.6.0
 *
 * Copyright 2017 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Chart=t()}}(function(){var t;return function t(e,n,i){function a(o,s){if(!n[o]){if(!e[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[o]={exports:{}};e[o][0].call(d.exports,function(t){var n=e[o][1][t];return a(n?n:t)},d,d.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)a(i[o]);return a}({1:[function(t,e,n){function i(t){if(t){var e=/^#([a-fA-F0-9]{3})$/,n=/^#([a-fA-F0-9]{6})$/,i=/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,a=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,r=/(\w+)/,o=[0,0,0],s=1,l=t.match(e);if(l){l=l[1];for(var u=0;u<o.length;u++)o[u]=parseInt(l[u]+l[u],16)}else if(l=t.match(n)){l=l[1];for(var u=0;u<o.length;u++)o[u]=parseInt(l.slice(2*u,2*u+2),16)}else if(l=t.match(i)){for(var u=0;u<o.length;u++)o[u]=parseInt(l[u+1]);s=parseFloat(l[4])}else if(l=t.match(a)){for(var u=0;u<o.length;u++)o[u]=Math.round(2.55*parseFloat(l[u+1]));s=parseFloat(l[4])}else if(l=t.match(r)){if("transparent"==l[1])return[0,0,0,0];if(o=x[l[1]],!o)return}for(var u=0;u<o.length;u++)o[u]=y(o[u],0,255);return s=s||0==s?y(s,0,1):1,o[3]=s,o}}function a(t){if(t){var e=/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,n=t.match(e);if(n){var i=parseFloat(n[4]),a=y(parseInt(n[1]),0,360),r=y(parseFloat(n[2]),0,100),o=y(parseFloat(n[3]),0,100),s=y(isNaN(i)?1:i,0,1);return[a,r,o,s]}}}function r(t){if(t){var e=/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,n=t.match(e);if(n){var i=parseFloat(n[4]),a=y(parseInt(n[1]),0,360),r=y(parseFloat(n[2]),0,100),o=y(parseFloat(n[3]),0,100),s=y(isNaN(i)?1:i,0,1);return[a,r,o,s]}}}function o(t){var e=i(t);return e&&e.slice(0,3)}function s(t){var e=a(t);return e&&e.slice(0,3)}function l(t){var e=i(t);return e?e[3]:(e=a(t))?e[3]:(e=r(t))?e[3]:void 0}function u(t){return"#"+b(t[0])+b(t[1])+b(t[2])}function d(t,e){return e<1||t[3]&&t[3]<1?c(t,e):"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}function c(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function h(t,e){if(e<1||t[3]&&t[3]<1)return f(t,e);var n=Math.round(t[0]/255*100),i=Math.round(t[1]/255*100),a=Math.round(t[2]/255*100);return"rgb("+n+"%, "+i+"%, "+a+"%)"}function f(t,e){var n=Math.round(t[0]/255*100),i=Math.round(t[1]/255*100),a=Math.round(t[2]/255*100);return"rgba("+n+"%, "+i+"%, "+a+"%, "+(e||t[3]||1)+")"}function g(t,e){return e<1||t[3]&&t[3]<1?p(t,e):"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"}function p(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function m(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"}function v(t){return _[t.slice(0,3)]}function y(t,e,n){return Math.min(Math.max(e,t),n)}function b(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var x=t(5);e.exports={getRgba:i,getHsla:a,getRgb:o,getHsl:s,getHwb:r,getAlpha:l,hexString:u,rgbString:d,rgbaString:c,percentString:h,percentaString:f,hslString:g,hslaString:p,hwbString:m,keyword:v};var _={};for(var k in x)_[x[k]]=k},{5:5}],2:[function(t,e,n){var i=t(4),a=t(1),r=function(t){if(t instanceof r)return t;if(!(this instanceof r))return new r(t);this.valid=!1,this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1};var e;"string"==typeof t?(e=a.getRgba(t),e?this.setValues("rgb",e):(e=a.getHsla(t))?this.setValues("hsl",e):(e=a.getHwb(t))&&this.setValues("hwb",e)):"object"==typeof t&&(e=t,void 0!==e.r||void 0!==e.red?this.setValues("rgb",e):void 0!==e.l||void 0!==e.lightness?this.setValues("hsl",e):void 0!==e.v||void 0!==e.value?this.setValues("hsv",e):void 0!==e.w||void 0!==e.whiteness?this.setValues("hwb",e):void 0===e.c&&void 0===e.cyan||this.setValues("cmyk",e))};r.prototype={isValid:function(){return this.valid},rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t%=360,t=t<0?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return a.hexString(this.values.rgb)},rgbString:function(){return a.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return a.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return a.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return a.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return a.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return a.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return a.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],n=0;n<t.length;n++){var i=t[n]/255;e[n]=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),n=t.luminosity();return e>n?(e+.05)/(n+.05):(n+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb,e=(299*t[0]+587*t[1]+114*t[2])/1e3;return e<128},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;e<3;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,n=(e[0]+t)%360;return e[0]=n<0?360+n:n,this.setValues("hsl",e),this},mix:function(t,e){var n=this,i=t,a=void 0===e?.5:e,r=2*a-1,o=n.alpha()-i.alpha(),s=((r*o===-1?r:(r+o)/(1+r*o))+1)/2,l=1-s;return this.rgb(s*n.red()+l*i.red(),s*n.green()+l*i.green(),s*n.blue()+l*i.blue()).alpha(n.alpha()*a+i.alpha()*(1-a))},toJSON:function(){return this.rgb()},clone:function(){var t,e,n=new r,i=this.values,a=n.values;for(var o in i)i.hasOwnProperty(o)&&(t=i[o],e={}.toString.call(t),"[object Array]"===e?a[o]=t.slice(0):"[object Number]"===e?a[o]=t:console.error("unexpected color value:",t));return n}},r.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},r.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},r.prototype.getValues=function(t){for(var e=this.values,n={},i=0;i<t.length;i++)n[t.charAt(i)]=e[t][i];return 1!==e.alpha&&(n.a=e.alpha),n},r.prototype.setValues=function(t,e){var n,a=this.values,r=this.spaces,o=this.maxes,s=1;if(this.valid=!0,"alpha"===t)s=e;else if(e.length)a[t]=e.slice(0,t.length),s=e[t.length];else if(void 0!==e[t.charAt(0)]){for(n=0;n<t.length;n++)a[t][n]=e[t.charAt(n)];s=e.a}else if(void 0!==e[r[t][0]]){var l=r[t];for(n=0;n<t.length;n++)a[t][n]=e[l[n]];s=e.alpha}if(a.alpha=Math.max(0,Math.min(1,void 0===s?a.alpha:s)),"alpha"===t)return!1;var u;for(n=0;n<t.length;n++)u=Math.max(0,Math.min(o[t][n],a[t][n])),a[t][n]=Math.round(u);for(var d in r)d!==t&&(a[d]=i[t][d](a[t]));return!0},r.prototype.setSpace=function(t,e){var n=e[0];return void 0===n?this.getValues(t):("number"==typeof n&&(n=Array.prototype.slice.call(e)),this.setValues(t,n),this)},r.prototype.setChannel=function(t,e,n){var i=this.values[t];return void 0===n?i[e]:n===i[e]?this:(i[e]=n,this.setValues(t,i),this)},"undefined"!=typeof window&&(window.Color=r),e.exports=r},{1:1,4:4}],3:[function(t,e,n){function i(t){var e,n,i,a=t[0]/255,r=t[1]/255,o=t[2]/255,s=Math.min(a,r,o),l=Math.max(a,r,o),u=l-s;return l==s?e=0:a==l?e=(r-o)/u:r==l?e=2+(o-a)/u:o==l&&(e=4+(a-r)/u),e=Math.min(60*e,360),e<0&&(e+=360),i=(s+l)/2,n=l==s?0:i<=.5?u/(l+s):u/(2-l-s),[e,100*n,100*i]}function a(t){var e,n,i,a=t[0],r=t[1],o=t[2],s=Math.min(a,r,o),l=Math.max(a,r,o),u=l-s;return n=0==l?0:u/l*1e3/10,l==s?e=0:a==l?e=(r-o)/u:r==l?e=2+(o-a)/u:o==l&&(e=4+(a-r)/u),e=Math.min(60*e,360),e<0&&(e+=360),i=l/255*1e3/10,[e,n,i]}function o(t){var e=t[0],n=t[1],a=t[2],r=i(t)[0],o=1/255*Math.min(e,Math.min(n,a)),a=1-1/255*Math.max(e,Math.max(n,a));return[r,100*o,100*a]}function s(t){var e,n,i,a,r=t[0]/255,o=t[1]/255,s=t[2]/255;return a=Math.min(1-r,1-o,1-s),e=(1-r-a)/(1-a)||0,n=(1-o-a)/(1-a)||0,i=(1-s-a)/(1-a)||0,[100*e,100*n,100*i,100*a]}function l(t){return K[JSON.stringify(t)]}function u(t){var e=t[0]/255,n=t[1]/255,i=t[2]/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92;var a=.4124*e+.3576*n+.1805*i,r=.2126*e+.7152*n+.0722*i,o=.0193*e+.1192*n+.9505*i;return[100*a,100*r,100*o]}function d(t){var e,n,i,a=u(t),r=a[0],o=a[1],s=a[2];return r/=95.047,o/=100,s/=108.883,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,e=116*o-16,n=500*(r-o),i=200*(o-s),[e,n,i]}function c(t){return Y(d(t))}function h(t){var e,n,i,a,r,o=t[0]/360,s=t[1]/100,l=t[2]/100;if(0==s)return r=255*l,[r,r,r];n=l<.5?l*(1+s):l+s-l*s,e=2*l-n,a=[0,0,0];for(var u=0;u<3;u++)i=o+1/3*-(u-1),i<0&&i++,i>1&&i--,r=6*i<1?e+6*(n-e)*i:2*i<1?n:3*i<2?e+(n-e)*(2/3-i)*6:e,a[u]=255*r;return a}function f(t){var e,n,i=t[0],a=t[1]/100,r=t[2]/100;return 0===r?[0,0,0]:(r*=2,a*=r<=1?r:2-r,n=(r+a)/2,e=2*a/(r+a),[i,100*e,100*n])}function p(t){return o(h(t))}function m(t){return s(h(t))}function v(t){return l(h(t))}function y(t){var e=t[0]/60,n=t[1]/100,i=t[2]/100,a=Math.floor(e)%6,r=e-Math.floor(e),o=255*i*(1-n),s=255*i*(1-n*r),l=255*i*(1-n*(1-r)),i=255*i;switch(a){case 0:return[i,l,o];case 1:return[s,i,o];case 2:return[o,i,l];case 3:return[o,s,i];case 4:return[l,o,i];case 5:return[i,o,s]}}function x(t){var e,n,i=t[0],a=t[1]/100,r=t[2]/100;return n=(2-a)*r,e=a*r,e/=n<=1?n:2-n,e=e||0,n/=2,[i,100*e,100*n]}function _(t){return o(y(t))}function k(t){return s(y(t))}function w(t){return l(y(t))}function M(t){var e,n,i,a,o=t[0]/360,s=t[1]/100,l=t[2]/100,u=s+l;switch(u>1&&(s/=u,l/=u),e=Math.floor(6*o),n=1-l,i=6*o-e,0!=(1&e)&&(i=1-i),a=s+i*(n-s),e){default:case 6:case 0:r=n,g=a,b=s;break;case 1:r=a,g=n,b=s;break;case 2:r=s,g=n,b=a;break;case 3:r=s,g=a,b=n;break;case 4:r=a,g=s,b=n;break;case 5:r=n,g=s,b=a}return[255*r,255*g,255*b]}function S(t){return i(M(t))}function D(t){return a(M(t))}function C(t){return s(M(t))}function P(t){return l(M(t))}function T(t){var e,n,i,a=t[0]/100,r=t[1]/100,o=t[2]/100,s=t[3]/100;return e=1-Math.min(1,a*(1-s)+s),n=1-Math.min(1,r*(1-s)+s),i=1-Math.min(1,o*(1-s)+s),[255*e,255*n,255*i]}function I(t){return i(T(t))}function A(t){return a(T(t))}function F(t){return o(T(t))}function O(t){return l(T(t))}function R(t){var e,n,i,a=t[0]/100,r=t[1]/100,o=t[2]/100;return e=3.2406*a+r*-1.5372+o*-.4986,n=a*-.9689+1.8758*r+.0415*o,i=.0557*a+r*-.204+1.057*o,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i*=12.92,e=Math.min(Math.max(0,e),1),n=Math.min(Math.max(0,n),1),i=Math.min(Math.max(0,i),1),[255*e,255*n,255*i]}function L(t){var e,n,i,a=t[0],r=t[1],o=t[2];return a/=95.047,r/=100,o/=108.883,a=a>.008856?Math.pow(a,1/3):7.787*a+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,e=116*r-16,n=500*(a-r),i=200*(r-o),[e,n,i]}function V(t){return Y(L(t))}function W(t){var e,n,i,a,r=t[0],o=t[1],s=t[2];return r<=8?(n=100*r/903.3,a=7.787*(n/100)+16/116):(n=100*Math.pow((r+16)/116,3),a=Math.pow(n/100,1/3)),e=e/95.047<=.008856?e=95.047*(o/500+a-16/116)/7.787:95.047*Math.pow(o/500+a,3),i=i/108.883<=.008859?i=108.883*(a-s/200-16/116)/7.787:108.883*Math.pow(a-s/200,3),[e,n,i]}function Y(t){var e,n,i,a=t[0],r=t[1],o=t[2];return e=Math.atan2(o,r),n=360*e/2/Math.PI,n<0&&(n+=360),i=Math.sqrt(r*r+o*o),[a,i,n]}function z(t){return R(W(t))}function N(t){var e,n,i,a=t[0],r=t[1],o=t[2];return i=o/360*2*Math.PI,e=r*Math.cos(i),n=r*Math.sin(i),[a,e,n]}function B(t){return W(N(t))}function E(t){return z(N(t))}function H(t){return J[t]}function j(t){return i(H(t))}function U(t){return a(H(t))}function G(t){return o(H(t))}function q(t){return s(H(t))}function Z(t){return d(H(t))}function X(t){return u(H(t))}e.exports={rgb2hsl:i,rgb2hsv:a,rgb2hwb:o,rgb2cmyk:s,rgb2keyword:l,rgb2xyz:u,rgb2lab:d,rgb2lch:c,hsl2rgb:h,hsl2hsv:f,hsl2hwb:p,hsl2cmyk:m,hsl2keyword:v,hsv2rgb:y,hsv2hsl:x,hsv2hwb:_,hsv2cmyk:k,hsv2keyword:w,hwb2rgb:M,hwb2hsl:S,hwb2hsv:D,hwb2cmyk:C,hwb2keyword:P,cmyk2rgb:T,cmyk2hsl:I,cmyk2hsv:A,cmyk2hwb:F,cmyk2keyword:O,keyword2rgb:H,keyword2hsl:j,keyword2hsv:U,keyword2hwb:G,keyword2cmyk:q,keyword2lab:Z,keyword2xyz:X,xyz2rgb:R,xyz2lab:L,xyz2lch:V,lab2xyz:W,lab2rgb:z,lab2lch:Y,lch2lab:N,lch2xyz:B,lch2rgb:E};var J={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},K={};for(var Q in J)K[JSON.stringify(J[Q])]=Q},{}],4:[function(t,e,n){var i=t(3),a=function(){return new u};for(var r in i){a[r+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),i[t](e)}}(r);var o=/(\w+)2(\w+)/.exec(r),s=o[1],l=o[2];a[s]=a[s]||{},a[s][l]=a[r]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var n=i[t](e);if("string"==typeof n||void 0===n)return n;for(var a=0;a<n.length;a++)n[a]=Math.round(n[a]);return n}}(r)}var u=function(){this.convs={}};u.prototype.routeSpace=function(t,e){var n=e[0];return void 0===n?this.getValues(t):("number"==typeof n&&(n=Array.prototype.slice.call(e)),this.setValues(t,n))},u.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},u.prototype.getValues=function(t){var e=this.convs[t];if(!e){var n=this.space,i=this.convs[n];e=a[n][t](i),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){u.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=a},{3:3}],5:[function(t,e,n){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}],6:[function(e,n,i){!function(e,a){"object"==typeof i&&"undefined"!=typeof n?n.exports=a():"function"==typeof t&&t.amd?t(a):e.moment=a()}(this,function(){"use strict";function t(){return _i.apply(null,arguments)}function i(t){_i=t}function a(t){return t instanceof Array||"[object Array]"===Object.prototype.toString.call(t)}function r(t){return null!=t&&"[object Object]"===Object.prototype.toString.call(t)}function o(t){var e;for(e in t)return!1;return!0}function s(t){return void 0===t}function l(t){return"number"==typeof t||"[object Number]"===Object.prototype.toString.call(t)}function u(t){return t instanceof Date||"[object Date]"===Object.prototype.toString.call(t)}function d(t,e){var n,i=[];for(n=0;n<t.length;++n)i.push(e(t[n],n));return i}function c(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function h(t,e){for(var n in e)c(e,n)&&(t[n]=e[n]);return c(e,"toString")&&(t.toString=e.toString),c(e,"valueOf")&&(t.valueOf=e.valueOf),t}function f(t,e,n,i){return xe(t,e,n,i,!0).utc()}function g(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function p(t){return null==t._pf&&(t._pf=g()),t._pf}function m(t){if(null==t._isValid){var e=p(t),n=wi.call(e.parsedDateParts,function(t){return null!=t}),i=!isNaN(t._d.getTime())&&e.overflow<0&&!e.empty&&!e.invalidMonth&&!e.invalidWeekday&&!e.nullInput&&!e.invalidFormat&&!e.userInvalidated&&(!e.meridiem||e.meridiem&&n);if(t._strict&&(i=i&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour),null!=Object.isFrozen&&Object.isFrozen(t))return i;t._isValid=i}return t._isValid}function v(t){var e=f(NaN);return null!=t?h(p(e),t):p(e).userInvalidated=!0,e}function y(t,e){var n,i,a;if(s(e._isAMomentObject)||(t._isAMomentObject=e._isAMomentObject),s(e._i)||(t._i=e._i),s(e._f)||(t._f=e._f),s(e._l)||(t._l=e._l),s(e._strict)||(t._strict=e._strict),s(e._tzm)||(t._tzm=e._tzm),s(e._isUTC)||(t._isUTC=e._isUTC),s(e._offset)||(t._offset=e._offset),s(e._pf)||(t._pf=p(e)),s(e._locale)||(t._locale=e._locale),Mi.length>0)for(n=0;n<Mi.length;n++)i=Mi[n],a=e[i],s(a)||(t[i]=a);return t}function b(e){y(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),Si===!1&&(Si=!0,t.updateOffset(this),Si=!1)}function x(t){return t instanceof b||null!=t&&null!=t._isAMomentObject}function _(t){return t<0?Math.ceil(t)||0:Math.floor(t)}function k(t){var e=+t,n=0;return 0!==e&&isFinite(e)&&(n=_(e)),n}function w(t,e,n){var i,a=Math.min(t.length,e.length),r=Math.abs(t.length-e.length),o=0;for(i=0;i<a;i++)(n&&t[i]!==e[i]||!n&&k(t[i])!==k(e[i]))&&o++;return o+r}function M(e){t.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function S(e,n){var i=!0;return h(function(){if(null!=t.deprecationHandler&&t.deprecationHandler(null,e),i){for(var a,r=[],o=0;o<arguments.length;o++){if(a="","object"==typeof arguments[o]){a+="\n["+o+"] ";for(var s in arguments[0])a+=s+": "+arguments[0][s]+", ";a=a.slice(0,-2)}else a=arguments[o];r.push(a)}M(e+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),i=!1}return n.apply(this,arguments)},n)}function D(e,n){null!=t.deprecationHandler&&t.deprecationHandler(e,n),Di[e]||(M(n),Di[e]=!0)}function C(t){return t instanceof Function||"[object Function]"===Object.prototype.toString.call(t)}function P(t){var e,n;for(n in t)e=t[n],C(e)?this[n]=e:this["_"+n]=e;this._config=t,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)}function T(t,e){var n,i=h({},t);for(n in e)c(e,n)&&(r(t[n])&&r(e[n])?(i[n]={},h(i[n],t[n]),h(i[n],e[n])):null!=e[n]?i[n]=e[n]:delete i[n]);for(n in t)c(t,n)&&!c(e,n)&&r(t[n])&&(i[n]=h({},i[n]));return i}function I(t){null!=t&&this.set(t)}function A(t,e,n){var i=this._calendar[t]||this._calendar.sameElse;return C(i)?i.call(e,n):i}function F(t){var e=this._longDateFormat[t],n=this._longDateFormat[t.toUpperCase()];return e||!n?e:(this._longDateFormat[t]=n.replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t])}function O(){return this._invalidDate}function R(t){return this._ordinal.replace("%d",t)}function L(t,e,n,i){var a=this._relativeTime[n];return C(a)?a(t,e,n,i):a.replace(/%d/i,t)}function V(t,e){var n=this._relativeTime[t>0?"future":"past"];return C(n)?n(e):n.replace(/%s/i,e)}function W(t,e){var n=t.toLowerCase();Vi[n]=Vi[n+"s"]=Vi[e]=t}function Y(t){return"string"==typeof t?Vi[t]||Vi[t.toLowerCase()]:void 0}function z(t){var e,n,i={};for(n in t)c(t,n)&&(e=Y(n),e&&(i[e]=t[n]));return i}function N(t,e){Wi[t]=e}function B(t){var e=[];for(var n in t)e.push({unit:n,priority:Wi[n]});return e.sort(function(t,e){return t.priority-e.priority}),e}function E(e,n){return function(i){return null!=i?(j(this,e,i),t.updateOffset(this,n),this):H(this,e)}}function H(t,e){return t.isValid()?t._d["get"+(t._isUTC?"UTC":"")+e]():NaN}function j(t,e,n){t.isValid()&&t._d["set"+(t._isUTC?"UTC":"")+e](n)}function U(t){return t=Y(t),C(this[t])?this[t]():this}function G(t,e){if("object"==typeof t){t=z(t);for(var n=B(t),i=0;i<n.length;i++)this[n[i].unit](t[n[i].unit])}else if(t=Y(t),C(this[t]))return this[t](e);return this}function q(t,e,n){var i=""+Math.abs(t),a=e-i.length,r=t>=0;return(r?n?"+":"":"-")+Math.pow(10,Math.max(0,a)).toString().substr(1)+i}function Z(t,e,n,i){var a=i;"string"==typeof i&&(a=function(){return this[i]()}),t&&(Bi[t]=a),e&&(Bi[e[0]]=function(){return q(a.apply(this,arguments),e[1],e[2])}),n&&(Bi[n]=function(){return this.localeData().ordinal(a.apply(this,arguments),t)})}function X(t){return t.match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")}function J(t){var e,n,i=t.match(Yi);for(e=0,n=i.length;e<n;e++)Bi[i[e]]?i[e]=Bi[i[e]]:i[e]=X(i[e]);return function(e){var a,r="";for(a=0;a<n;a++)r+=C(i[a])?i[a].call(e,t):i[a];return r}}function K(t,e){return t.isValid()?(e=Q(e,t.localeData()),Ni[e]=Ni[e]||J(e),Ni[e](t)):t.localeData().invalidDate()}function Q(t,e){function n(t){return e.longDateFormat(t)||t}var i=5;for(zi.lastIndex=0;i>=0&&zi.test(t);)t=t.replace(zi,n),zi.lastIndex=0,i-=1;return t}function $(t,e,n){ra[t]=C(e)?e:function(t,i){return t&&n?n:e}}function tt(t,e){return c(ra,t)?ra[t](e._strict,e._locale):new RegExp(et(t))}function et(t){return nt(t.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,n,i,a){return e||n||i||a}))}function nt(t){return t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function it(t,e){var n,i=e;for("string"==typeof t&&(t=[t]),l(e)&&(i=function(t,n){n[e]=k(t)}),n=0;n<t.length;n++)oa[t[n]]=i}function at(t,e){it(t,function(t,n,i,a){i._w=i._w||{},e(t,i._w,i,a)})}function rt(t,e,n){null!=e&&c(oa,t)&&oa[t](e,n._a,n,t)}function ot(t,e){return new Date(Date.UTC(t,e+1,0)).getUTCDate()}function st(t,e){return t?a(this._months)?this._months[t.month()]:this._months[(this._months.isFormat||va).test(e)?"format":"standalone"][t.month()]:a(this._months)?this._months:this._months.standalone}function lt(t,e){return t?a(this._monthsShort)?this._monthsShort[t.month()]:this._monthsShort[va.test(e)?"format":"standalone"][t.month()]:a(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function ut(t,e,n){var i,a,r,o=t.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],i=0;i<12;++i)r=f([2e3,i]),this._shortMonthsParse[i]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[i]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===e?(a=ma.call(this._shortMonthsParse,o),a!==-1?a:null):(a=ma.call(this._longMonthsParse,o),a!==-1?a:null):"MMM"===e?(a=ma.call(this._shortMonthsParse,o),a!==-1?a:(a=ma.call(this._longMonthsParse,o),a!==-1?a:null)):(a=ma.call(this._longMonthsParse,o),a!==-1?a:(a=ma.call(this._shortMonthsParse,o),a!==-1?a:null))}function dt(t,e,n){var i,a,r;if(this._monthsParseExact)return ut.call(this,t,e,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),i=0;i<12;i++){if(a=f([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(a,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(a,"").replace(".","")+"$","i")),n||this._monthsParse[i]||(r="^"+this.months(a,"")+"|^"+this.monthsShort(a,""),this._monthsParse[i]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===e&&this._longMonthsParse[i].test(t))return i;if(n&&"MMM"===e&&this._shortMonthsParse[i].test(t))return i;if(!n&&this._monthsParse[i].test(t))return i}}function ct(t,e){var n;if(!t.isValid())return t;if("string"==typeof e)if(/^\d+$/.test(e))e=k(e);else if(e=t.localeData().monthsParse(e),
!l(e))return t;return n=Math.min(t.date(),ot(t.year(),e)),t._d["set"+(t._isUTC?"UTC":"")+"Month"](e,n),t}function ht(e){return null!=e?(ct(this,e),t.updateOffset(this,!0),this):H(this,"Month")}function ft(){return ot(this.year(),this.month())}function gt(t){return this._monthsParseExact?(c(this,"_monthsRegex")||mt.call(this),t?this._monthsShortStrictRegex:this._monthsShortRegex):(c(this,"_monthsShortRegex")||(this._monthsShortRegex=xa),this._monthsShortStrictRegex&&t?this._monthsShortStrictRegex:this._monthsShortRegex)}function pt(t){return this._monthsParseExact?(c(this,"_monthsRegex")||mt.call(this),t?this._monthsStrictRegex:this._monthsRegex):(c(this,"_monthsRegex")||(this._monthsRegex=_a),this._monthsStrictRegex&&t?this._monthsStrictRegex:this._monthsRegex)}function mt(){function t(t,e){return e.length-t.length}var e,n,i=[],a=[],r=[];for(e=0;e<12;e++)n=f([2e3,e]),i.push(this.monthsShort(n,"")),a.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(i.sort(t),a.sort(t),r.sort(t),e=0;e<12;e++)i[e]=nt(i[e]),a[e]=nt(a[e]);for(e=0;e<24;e++)r[e]=nt(r[e]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+a.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+i.join("|")+")","i")}function vt(t){return yt(t)?366:365}function yt(t){return t%4===0&&t%100!==0||t%400===0}function bt(){return yt(this.year())}function xt(t,e,n,i,a,r,o){var s=new Date(t,e,n,i,a,r,o);return t<100&&t>=0&&isFinite(s.getFullYear())&&s.setFullYear(t),s}function _t(t){var e=new Date(Date.UTC.apply(null,arguments));return t<100&&t>=0&&isFinite(e.getUTCFullYear())&&e.setUTCFullYear(t),e}function kt(t,e,n){var i=7+e-n,a=(7+_t(t,0,i).getUTCDay()-e)%7;return-a+i-1}function wt(t,e,n,i,a){var r,o,s=(7+n-i)%7,l=kt(t,i,a),u=1+7*(e-1)+s+l;return u<=0?(r=t-1,o=vt(r)+u):u>vt(t)?(r=t+1,o=u-vt(t)):(r=t,o=u),{year:r,dayOfYear:o}}function Mt(t,e,n){var i,a,r=kt(t.year(),e,n),o=Math.floor((t.dayOfYear()-r-1)/7)+1;return o<1?(a=t.year()-1,i=o+St(a,e,n)):o>St(t.year(),e,n)?(i=o-St(t.year(),e,n),a=t.year()+1):(a=t.year(),i=o),{week:i,year:a}}function St(t,e,n){var i=kt(t,e,n),a=kt(t+1,e,n);return(vt(t)-i+a)/7}function Dt(t){return Mt(t,this._week.dow,this._week.doy).week}function Ct(){return this._week.dow}function Pt(){return this._week.doy}function Tt(t){var e=this.localeData().week(this);return null==t?e:this.add(7*(t-e),"d")}function It(t){var e=Mt(this,1,4).week;return null==t?e:this.add(7*(t-e),"d")}function At(t,e){return"string"!=typeof t?t:isNaN(t)?(t=e.weekdaysParse(t),"number"==typeof t?t:null):parseInt(t,10)}function Ft(t,e){return"string"==typeof t?e.weekdaysParse(t)%7||7:isNaN(t)?null:t}function Ot(t,e){return t?a(this._weekdays)?this._weekdays[t.day()]:this._weekdays[this._weekdays.isFormat.test(e)?"format":"standalone"][t.day()]:a(this._weekdays)?this._weekdays:this._weekdays.standalone}function Rt(t){return t?this._weekdaysShort[t.day()]:this._weekdaysShort}function Lt(t){return t?this._weekdaysMin[t.day()]:this._weekdaysMin}function Vt(t,e,n){var i,a,r,o=t.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],i=0;i<7;++i)r=f([2e3,1]).day(i),this._minWeekdaysParse[i]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[i]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[i]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===e?(a=ma.call(this._weekdaysParse,o),a!==-1?a:null):"ddd"===e?(a=ma.call(this._shortWeekdaysParse,o),a!==-1?a:null):(a=ma.call(this._minWeekdaysParse,o),a!==-1?a:null):"dddd"===e?(a=ma.call(this._weekdaysParse,o),a!==-1?a:(a=ma.call(this._shortWeekdaysParse,o),a!==-1?a:(a=ma.call(this._minWeekdaysParse,o),a!==-1?a:null))):"ddd"===e?(a=ma.call(this._shortWeekdaysParse,o),a!==-1?a:(a=ma.call(this._weekdaysParse,o),a!==-1?a:(a=ma.call(this._minWeekdaysParse,o),a!==-1?a:null))):(a=ma.call(this._minWeekdaysParse,o),a!==-1?a:(a=ma.call(this._weekdaysParse,o),a!==-1?a:(a=ma.call(this._shortWeekdaysParse,o),a!==-1?a:null)))}function Wt(t,e,n){var i,a,r;if(this._weekdaysParseExact)return Vt.call(this,t,e,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),i=0;i<7;i++){if(a=f([2e3,1]).day(i),n&&!this._fullWeekdaysParse[i]&&(this._fullWeekdaysParse[i]=new RegExp("^"+this.weekdays(a,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[i]=new RegExp("^"+this.weekdaysShort(a,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[i]=new RegExp("^"+this.weekdaysMin(a,"").replace(".",".?")+"$","i")),this._weekdaysParse[i]||(r="^"+this.weekdays(a,"")+"|^"+this.weekdaysShort(a,"")+"|^"+this.weekdaysMin(a,""),this._weekdaysParse[i]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===e&&this._fullWeekdaysParse[i].test(t))return i;if(n&&"ddd"===e&&this._shortWeekdaysParse[i].test(t))return i;if(n&&"dd"===e&&this._minWeekdaysParse[i].test(t))return i;if(!n&&this._weekdaysParse[i].test(t))return i}}function Yt(t){if(!this.isValid())return null!=t?this:NaN;var e=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=t?(t=At(t,this.localeData()),this.add(t-e,"d")):e}function zt(t){if(!this.isValid())return null!=t?this:NaN;var e=(this.day()+7-this.localeData()._week.dow)%7;return null==t?e:this.add(t-e,"d")}function Nt(t){if(!this.isValid())return null!=t?this:NaN;if(null!=t){var e=Ft(t,this.localeData());return this.day(this.day()%7?e:e-7)}return this.day()||7}function Bt(t){return this._weekdaysParseExact?(c(this,"_weekdaysRegex")||jt.call(this),t?this._weekdaysStrictRegex:this._weekdaysRegex):(c(this,"_weekdaysRegex")||(this._weekdaysRegex=Ca),this._weekdaysStrictRegex&&t?this._weekdaysStrictRegex:this._weekdaysRegex)}function Et(t){return this._weekdaysParseExact?(c(this,"_weekdaysRegex")||jt.call(this),t?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(c(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Pa),this._weekdaysShortStrictRegex&&t?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Ht(t){return this._weekdaysParseExact?(c(this,"_weekdaysRegex")||jt.call(this),t?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(c(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Ta),this._weekdaysMinStrictRegex&&t?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function jt(){function t(t,e){return e.length-t.length}var e,n,i,a,r,o=[],s=[],l=[],u=[];for(e=0;e<7;e++)n=f([2e3,1]).day(e),i=this.weekdaysMin(n,""),a=this.weekdaysShort(n,""),r=this.weekdays(n,""),o.push(i),s.push(a),l.push(r),u.push(i),u.push(a),u.push(r);for(o.sort(t),s.sort(t),l.sort(t),u.sort(t),e=0;e<7;e++)s[e]=nt(s[e]),l[e]=nt(l[e]),u[e]=nt(u[e]);this._weekdaysRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+s.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+o.join("|")+")","i")}function Ut(){return this.hours()%12||12}function Gt(){return this.hours()||24}function qt(t,e){Z(t,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),e)})}function Zt(t,e){return e._meridiemParse}function Xt(t){return"p"===(t+"").toLowerCase().charAt(0)}function Jt(t,e,n){return t>11?n?"pm":"PM":n?"am":"AM"}function Kt(t){return t?t.toLowerCase().replace("_","-"):t}function Qt(t){for(var e,n,i,a,r=0;r<t.length;){for(a=Kt(t[r]).split("-"),e=a.length,n=Kt(t[r+1]),n=n?n.split("-"):null;e>0;){if(i=$t(a.slice(0,e).join("-")))return i;if(n&&n.length>=e&&w(a,n,!0)>=e-1)break;e--}r++}return null}function $t(t){var i=null;if(!Ra[t]&&"undefined"!=typeof n&&n&&n.exports)try{i=Ia._abbr,e("./locale/"+t),te(i)}catch(t){}return Ra[t]}function te(t,e){var n;return t&&(n=s(e)?ie(t):ee(t,e),n&&(Ia=n)),Ia._abbr}function ee(t,e){if(null!==e){var n=Oa;if(e.abbr=t,null!=Ra[t])D("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=Ra[t]._config;else if(null!=e.parentLocale){if(null==Ra[e.parentLocale])return La[e.parentLocale]||(La[e.parentLocale]=[]),La[e.parentLocale].push({name:t,config:e}),null;n=Ra[e.parentLocale]._config}return Ra[t]=new I(T(n,e)),La[t]&&La[t].forEach(function(t){ee(t.name,t.config)}),te(t),Ra[t]}return delete Ra[t],null}function ne(t,e){if(null!=e){var n,i=Oa;null!=Ra[t]&&(i=Ra[t]._config),e=T(i,e),n=new I(e),n.parentLocale=Ra[t],Ra[t]=n,te(t)}else null!=Ra[t]&&(null!=Ra[t].parentLocale?Ra[t]=Ra[t].parentLocale:null!=Ra[t]&&delete Ra[t]);return Ra[t]}function ie(t){var e;if(t&&t._locale&&t._locale._abbr&&(t=t._locale._abbr),!t)return Ia;if(!a(t)){if(e=$t(t))return e;t=[t]}return Qt(t)}function ae(){return Ti(Ra)}function re(t){var e,n=t._a;return n&&p(t).overflow===-2&&(e=n[la]<0||n[la]>11?la:n[ua]<1||n[ua]>ot(n[sa],n[la])?ua:n[da]<0||n[da]>24||24===n[da]&&(0!==n[ca]||0!==n[ha]||0!==n[fa])?da:n[ca]<0||n[ca]>59?ca:n[ha]<0||n[ha]>59?ha:n[fa]<0||n[fa]>999?fa:-1,p(t)._overflowDayOfYear&&(e<sa||e>ua)&&(e=ua),p(t)._overflowWeeks&&e===-1&&(e=ga),p(t)._overflowWeekday&&e===-1&&(e=pa),p(t).overflow=e),t}function oe(t){var e,n,i,a,r,o,s=t._i,l=Va.exec(s)||Wa.exec(s);if(l){for(p(t).iso=!0,e=0,n=za.length;e<n;e++)if(za[e][1].exec(l[1])){a=za[e][0],i=za[e][2]!==!1;break}if(null==a)return void(t._isValid=!1);if(l[3]){for(e=0,n=Na.length;e<n;e++)if(Na[e][1].exec(l[3])){r=(l[2]||" ")+Na[e][0];break}if(null==r)return void(t._isValid=!1)}if(!i&&null!=r)return void(t._isValid=!1);if(l[4]){if(!Ya.exec(l[4]))return void(t._isValid=!1);o="Z"}t._f=a+(r||"")+(o||""),fe(t)}else t._isValid=!1}function se(t){var e,n,i,a,r,o,s,l,u={" GMT":" +0000"," EDT":" -0400"," EST":" -0500"," CDT":" -0500"," CST":" -0600"," MDT":" -0600"," MST":" -0700"," PDT":" -0700"," PST":" -0800"},d="YXWVUTSRQPONZABCDEFGHIKLM";if(e=t._i.replace(/\([^\)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s|\s$/g,""),n=Ea.exec(e)){if(i=n[1]?"ddd"+(5===n[1].length?", ":" "):"",a="D MMM "+(n[2].length>10?"YYYY ":"YY "),r="HH:mm"+(n[4]?":ss":""),n[1]){var c=new Date(n[2]),h=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][c.getDay()];if(n[1].substr(0,3)!==h)return p(t).weekdayMismatch=!0,void(t._isValid=!1)}switch(n[5].length){case 2:0===l?s=" +0000":(l=d.indexOf(n[5][1].toUpperCase())-12,s=(l<0?" -":" +")+(""+l).replace(/^-?/,"0").match(/..$/)[0]+"00");break;case 4:s=u[n[5]];break;default:s=u[" GMT"]}n[5]=s,t._i=n.splice(1).join(""),o=" ZZ",t._f=i+a+r+o,fe(t),p(t).rfc2822=!0}else t._isValid=!1}function le(e){var n=Ba.exec(e._i);return null!==n?void(e._d=new Date(+n[1])):(oe(e),void(e._isValid===!1&&(delete e._isValid,se(e),e._isValid===!1&&(delete e._isValid,t.createFromInputFallback(e)))))}function ue(t,e,n){return null!=t?t:null!=e?e:n}function de(e){var n=new Date(t.now());return e._useUTC?[n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()]:[n.getFullYear(),n.getMonth(),n.getDate()]}function ce(t){var e,n,i,a,r=[];if(!t._d){for(i=de(t),t._w&&null==t._a[ua]&&null==t._a[la]&&he(t),null!=t._dayOfYear&&(a=ue(t._a[sa],i[sa]),(t._dayOfYear>vt(a)||0===t._dayOfYear)&&(p(t)._overflowDayOfYear=!0),n=_t(a,0,t._dayOfYear),t._a[la]=n.getUTCMonth(),t._a[ua]=n.getUTCDate()),e=0;e<3&&null==t._a[e];++e)t._a[e]=r[e]=i[e];for(;e<7;e++)t._a[e]=r[e]=null==t._a[e]?2===e?1:0:t._a[e];24===t._a[da]&&0===t._a[ca]&&0===t._a[ha]&&0===t._a[fa]&&(t._nextDay=!0,t._a[da]=0),t._d=(t._useUTC?_t:xt).apply(null,r),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),t._nextDay&&(t._a[da]=24)}}function he(t){var e,n,i,a,r,o,s,l;if(e=t._w,null!=e.GG||null!=e.W||null!=e.E)r=1,o=4,n=ue(e.GG,t._a[sa],Mt(_e(),1,4).year),i=ue(e.W,1),a=ue(e.E,1),(a<1||a>7)&&(l=!0);else{r=t._locale._week.dow,o=t._locale._week.doy;var u=Mt(_e(),r,o);n=ue(e.gg,t._a[sa],u.year),i=ue(e.w,u.week),null!=e.d?(a=e.d,(a<0||a>6)&&(l=!0)):null!=e.e?(a=e.e+r,(e.e<0||e.e>6)&&(l=!0)):a=r}i<1||i>St(n,r,o)?p(t)._overflowWeeks=!0:null!=l?p(t)._overflowWeekday=!0:(s=wt(n,i,a,r,o),t._a[sa]=s.year,t._dayOfYear=s.dayOfYear)}function fe(e){if(e._f===t.ISO_8601)return void oe(e);if(e._f===t.RFC_2822)return void se(e);e._a=[],p(e).empty=!0;var n,i,a,r,o,s=""+e._i,l=s.length,u=0;for(a=Q(e._f,e._locale).match(Yi)||[],n=0;n<a.length;n++)r=a[n],i=(s.match(tt(r,e))||[])[0],i&&(o=s.substr(0,s.indexOf(i)),o.length>0&&p(e).unusedInput.push(o),s=s.slice(s.indexOf(i)+i.length),u+=i.length),Bi[r]?(i?p(e).empty=!1:p(e).unusedTokens.push(r),rt(r,i,e)):e._strict&&!i&&p(e).unusedTokens.push(r);p(e).charsLeftOver=l-u,s.length>0&&p(e).unusedInput.push(s),e._a[da]<=12&&p(e).bigHour===!0&&e._a[da]>0&&(p(e).bigHour=void 0),p(e).parsedDateParts=e._a.slice(0),p(e).meridiem=e._meridiem,e._a[da]=ge(e._locale,e._a[da],e._meridiem),ce(e),re(e)}function ge(t,e,n){var i;return null==n?e:null!=t.meridiemHour?t.meridiemHour(e,n):null!=t.isPM?(i=t.isPM(n),i&&e<12&&(e+=12),i||12!==e||(e=0),e):e}function pe(t){var e,n,i,a,r;if(0===t._f.length)return p(t).invalidFormat=!0,void(t._d=new Date(NaN));for(a=0;a<t._f.length;a++)r=0,e=y({},t),null!=t._useUTC&&(e._useUTC=t._useUTC),e._f=t._f[a],fe(e),m(e)&&(r+=p(e).charsLeftOver,r+=10*p(e).unusedTokens.length,p(e).score=r,(null==i||r<i)&&(i=r,n=e));h(t,n||e)}function me(t){if(!t._d){var e=z(t._i);t._a=d([e.year,e.month,e.day||e.date,e.hour,e.minute,e.second,e.millisecond],function(t){return t&&parseInt(t,10)}),ce(t)}}function ve(t){var e=new b(re(ye(t)));return e._nextDay&&(e.add(1,"d"),e._nextDay=void 0),e}function ye(t){var e=t._i,n=t._f;return t._locale=t._locale||ie(t._l),null===e||void 0===n&&""===e?v({nullInput:!0}):("string"==typeof e&&(t._i=e=t._locale.preparse(e)),x(e)?new b(re(e)):(u(e)?t._d=e:a(n)?pe(t):n?fe(t):be(t),m(t)||(t._d=null),t))}function be(e){var n=e._i;s(n)?e._d=new Date(t.now()):u(n)?e._d=new Date(n.valueOf()):"string"==typeof n?le(e):a(n)?(e._a=d(n.slice(0),function(t){return parseInt(t,10)}),ce(e)):r(n)?me(e):l(n)?e._d=new Date(n):t.createFromInputFallback(e)}function xe(t,e,n,i,s){var l={};return n!==!0&&n!==!1||(i=n,n=void 0),(r(t)&&o(t)||a(t)&&0===t.length)&&(t=void 0),l._isAMomentObject=!0,l._useUTC=l._isUTC=s,l._l=n,l._i=t,l._f=e,l._strict=i,ve(l)}function _e(t,e,n,i){return xe(t,e,n,i,!1)}function ke(t,e){var n,i;if(1===e.length&&a(e[0])&&(e=e[0]),!e.length)return _e();for(n=e[0],i=1;i<e.length;++i)e[i].isValid()&&!e[i][t](n)||(n=e[i]);return n}function we(){var t=[].slice.call(arguments,0);return ke("isBefore",t)}function Me(){var t=[].slice.call(arguments,0);return ke("isAfter",t)}function Se(t){for(var e in t)if(Ga.indexOf(e)===-1||null!=t[e]&&isNaN(t[e]))return!1;for(var n=!1,i=0;i<Ga.length;++i)if(t[Ga[i]]){if(n)return!1;parseFloat(t[Ga[i]])!==k(t[Ga[i]])&&(n=!0)}return!0}function De(){return this._isValid}function Ce(){return Ge(NaN)}function Pe(t){var e=z(t),n=e.year||0,i=e.quarter||0,a=e.month||0,r=e.week||0,o=e.day||0,s=e.hour||0,l=e.minute||0,u=e.second||0,d=e.millisecond||0;this._isValid=Se(e),this._milliseconds=+d+1e3*u+6e4*l+1e3*s*60*60,this._days=+o+7*r,this._months=+a+3*i+12*n,this._data={},this._locale=ie(),this._bubble()}function Te(t){return t instanceof Pe}function Ie(t){return t<0?Math.round(-1*t)*-1:Math.round(t)}function Ae(t,e){Z(t,0,0,function(){var t=this.utcOffset(),n="+";return t<0&&(t=-t,n="-"),n+q(~~(t/60),2)+e+q(~~t%60,2)})}function Fe(t,e){var n=(e||"").match(t);if(null===n)return null;var i=n[n.length-1]||[],a=(i+"").match(qa)||["-",0,0],r=+(60*a[1])+k(a[2]);return 0===r?0:"+"===a[0]?r:-r}function Oe(e,n){var i,a;return n._isUTC?(i=n.clone(),a=(x(e)||u(e)?e.valueOf():_e(e).valueOf())-i.valueOf(),i._d.setTime(i._d.valueOf()+a),t.updateOffset(i,!1),i):_e(e).local()}function Re(t){return 15*-Math.round(t._d.getTimezoneOffset()/15)}function Le(e,n,i){var a,r=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(e=Fe(na,e),null===e)return this}else Math.abs(e)<16&&!i&&(e*=60);return!this._isUTC&&n&&(a=Re(this)),this._offset=e,this._isUTC=!0,null!=a&&this.add(a,"m"),r!==e&&(!n||this._changeInProgress?Ke(this,Ge(e-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,t.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:Re(this)}function Ve(t,e){return null!=t?("string"!=typeof t&&(t=-t),this.utcOffset(t,e),this):-this.utcOffset()}function We(t){return this.utcOffset(0,t)}function Ye(t){return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,t&&this.subtract(Re(this),"m")),this}function ze(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var t=Fe(ea,this._i);null!=t?this.utcOffset(t):this.utcOffset(0,!0)}return this}function Ne(t){return!!this.isValid()&&(t=t?_e(t).utcOffset():0,(this.utcOffset()-t)%60===0)}function Be(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ee(){if(!s(this._isDSTShifted))return this._isDSTShifted;var t={};if(y(t,this),t=ye(t),t._a){var e=t._isUTC?f(t._a):_e(t._a);this._isDSTShifted=this.isValid()&&w(t._a,e.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function He(){return!!this.isValid()&&!this._isUTC}function je(){return!!this.isValid()&&this._isUTC}function Ue(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Ge(t,e){var n,i,a,r=t,o=null;return Te(t)?r={ms:t._milliseconds,d:t._days,M:t._months}:l(t)?(r={},e?r[e]=t:r.milliseconds=t):(o=Za.exec(t))?(n="-"===o[1]?-1:1,r={y:0,d:k(o[ua])*n,h:k(o[da])*n,m:k(o[ca])*n,s:k(o[ha])*n,ms:k(Ie(1e3*o[fa]))*n}):(o=Xa.exec(t))?(n="-"===o[1]?-1:1,r={y:qe(o[2],n),M:qe(o[3],n),w:qe(o[4],n),d:qe(o[5],n),h:qe(o[6],n),m:qe(o[7],n),s:qe(o[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(a=Xe(_e(r.from),_e(r.to)),r={},r.ms=a.milliseconds,r.M=a.months),i=new Pe(r),Te(t)&&c(t,"_locale")&&(i._locale=t._locale),i}function qe(t,e){var n=t&&parseFloat(t.replace(",","."));return(isNaN(n)?0:n)*e}function Ze(t,e){var n={milliseconds:0,months:0};return n.months=e.month()-t.month()+12*(e.year()-t.year()),t.clone().add(n.months,"M").isAfter(e)&&--n.months,n.milliseconds=+e-+t.clone().add(n.months,"M"),n}function Xe(t,e){var n;return t.isValid()&&e.isValid()?(e=Oe(e,t),t.isBefore(e)?n=Ze(t,e):(n=Ze(e,t),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function Je(t,e){return function(n,i){var a,r;return null===i||isNaN(+i)||(D(e,"moment()."+e+"(period, number) is deprecated. Please use moment()."+e+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),r=n,n=i,i=r),n="string"==typeof n?+n:n,a=Ge(n,i),Ke(this,a,t),this}}function Ke(e,n,i,a){var r=n._milliseconds,o=Ie(n._days),s=Ie(n._months);e.isValid()&&(a=null==a||a,r&&e._d.setTime(e._d.valueOf()+r*i),o&&j(e,"Date",H(e,"Date")+o*i),s&&ct(e,H(e,"Month")+s*i),a&&t.updateOffset(e,o||s))}function Qe(t,e){var n=t.diff(e,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"}function $e(e,n){var i=e||_e(),a=Oe(i,this).startOf("day"),r=t.calendarFormat(this,a)||"sameElse",o=n&&(C(n[r])?n[r].call(this,i):n[r]);return this.format(o||this.localeData().calendar(r,this,_e(i)))}function tn(){return new b(this)}function en(t,e){var n=x(t)?t:_e(t);return!(!this.isValid()||!n.isValid())&&(e=Y(s(e)?"millisecond":e),"millisecond"===e?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(e).valueOf())}function nn(t,e){var n=x(t)?t:_e(t);return!(!this.isValid()||!n.isValid())&&(e=Y(s(e)?"millisecond":e),"millisecond"===e?this.valueOf()<n.valueOf():this.clone().endOf(e).valueOf()<n.valueOf())}function an(t,e,n,i){return i=i||"()",("("===i[0]?this.isAfter(t,n):!this.isBefore(t,n))&&(")"===i[1]?this.isBefore(e,n):!this.isAfter(e,n))}function rn(t,e){var n,i=x(t)?t:_e(t);return!(!this.isValid()||!i.isValid())&&(e=Y(e||"millisecond"),"millisecond"===e?this.valueOf()===i.valueOf():(n=i.valueOf(),this.clone().startOf(e).valueOf()<=n&&n<=this.clone().endOf(e).valueOf()))}function on(t,e){return this.isSame(t,e)||this.isAfter(t,e)}function sn(t,e){return this.isSame(t,e)||this.isBefore(t,e)}function ln(t,e,n){var i,a,r,o;return this.isValid()?(i=Oe(t,this),i.isValid()?(a=6e4*(i.utcOffset()-this.utcOffset()),e=Y(e),"year"===e||"month"===e||"quarter"===e?(o=un(this,i),"quarter"===e?o/=3:"year"===e&&(o/=12)):(r=this-i,o="second"===e?r/1e3:"minute"===e?r/6e4:"hour"===e?r/36e5:"day"===e?(r-a)/864e5:"week"===e?(r-a)/6048e5:r),n?o:_(o)):NaN):NaN}function un(t,e){var n,i,a=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(a,"months");return e-r<0?(n=t.clone().add(a-1,"months"),i=(e-r)/(r-n)):(n=t.clone().add(a+1,"months"),i=(e-r)/(n-r)),-(a+i)||0}function dn(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function cn(){if(!this.isValid())return null;var t=this.clone().utc();return t.year()<0||t.year()>9999?K(t,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):C(Date.prototype.toISOString)?this.toDate().toISOString():K(t,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function hn(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var t="moment",e="";this.isLocal()||(t=0===this.utcOffset()?"moment.utc":"moment.parseZone",e="Z");var n="["+t+'("]',i=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",a="-MM-DD[T]HH:mm:ss.SSS",r=e+'[")]';return this.format(n+i+a+r)}function fn(e){e||(e=this.isUtc()?t.defaultFormatUtc:t.defaultFormat);var n=K(this,e);return this.localeData().postformat(n)}function gn(t,e){return this.isValid()&&(x(t)&&t.isValid()||_e(t).isValid())?Ge({to:this,from:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()}function pn(t){return this.from(_e(),t)}function mn(t,e){return this.isValid()&&(x(t)&&t.isValid()||_e(t).isValid())?Ge({from:this,to:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()}function vn(t){return this.to(_e(),t)}function yn(t){var e;return void 0===t?this._locale._abbr:(e=ie(t),null!=e&&(this._locale=e),this)}function bn(){return this._locale}function xn(t){switch(t=Y(t)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===t&&this.weekday(0),"isoWeek"===t&&this.isoWeekday(1),"quarter"===t&&this.month(3*Math.floor(this.month()/3)),this}function _n(t){return t=Y(t),void 0===t||"millisecond"===t?this:("date"===t&&(t="day"),this.startOf(t).add(1,"isoWeek"===t?"week":t).subtract(1,"ms"))}function kn(){return this._d.valueOf()-6e4*(this._offset||0)}function wn(){return Math.floor(this.valueOf()/1e3)}function Mn(){return new Date(this.valueOf())}function Sn(){var t=this;return[t.year(),t.month(),t.date(),t.hour(),t.minute(),t.second(),t.millisecond()]}function Dn(){var t=this;return{years:t.year(),months:t.month(),date:t.date(),hours:t.hours(),minutes:t.minutes(),seconds:t.seconds(),milliseconds:t.milliseconds()}}function Cn(){return this.isValid()?this.toISOString():null}function Pn(){return m(this)}function Tn(){return h({},p(this))}function In(){return p(this).overflow}function An(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Fn(t,e){Z(0,[t,t.length],0,e)}function On(t){return Wn.call(this,t,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Rn(t){return Wn.call(this,t,this.isoWeek(),this.isoWeekday(),1,4)}function Ln(){return St(this.year(),1,4)}function Vn(){var t=this.localeData()._week;return St(this.year(),t.dow,t.doy)}function Wn(t,e,n,i,a){var r;return null==t?Mt(this,i,a).year:(r=St(t,i,a),e>r&&(e=r),Yn.call(this,t,e,n,i,a))}function Yn(t,e,n,i,a){var r=wt(t,e,n,i,a),o=_t(r.year,0,r.dayOfYear);return this.year(o.getUTCFullYear()),this.month(o.getUTCMonth()),this.date(o.getUTCDate()),this}function zn(t){return null==t?Math.ceil((this.month()+1)/3):this.month(3*(t-1)+this.month()%3)}function Nn(t){var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==t?e:this.add(t-e,"d")}function Bn(t,e){e[fa]=k(1e3*("0."+t))}function En(){return this._isUTC?"UTC":""}function Hn(){return this._isUTC?"Coordinated Universal Time":""}function jn(t){return _e(1e3*t)}function Un(){return _e.apply(null,arguments).parseZone()}function Gn(t){return t}function qn(t,e,n,i){var a=ie(),r=f().set(i,e);return a[n](r,t)}function Zn(t,e,n){if(l(t)&&(e=t,t=void 0),t=t||"",null!=e)return qn(t,e,n,"month");var i,a=[];for(i=0;i<12;i++)a[i]=qn(t,i,n,"month");return a}function Xn(t,e,n,i){"boolean"==typeof t?(l(e)&&(n=e,e=void 0),e=e||""):(e=t,n=e,t=!1,l(e)&&(n=e,e=void 0),e=e||"");var a=ie(),r=t?a._week.dow:0;if(null!=n)return qn(e,(n+r)%7,i,"day");var o,s=[];for(o=0;o<7;o++)s[o]=qn(e,(o+r)%7,i,"day");return s}function Jn(t,e){return Zn(t,e,"months")}function Kn(t,e){return Zn(t,e,"monthsShort")}function Qn(t,e,n){return Xn(t,e,n,"weekdays")}function $n(t,e,n){return Xn(t,e,n,"weekdaysShort")}function ti(t,e,n){return Xn(t,e,n,"weekdaysMin")}function ei(){var t=this._data;return this._milliseconds=or(this._milliseconds),this._days=or(this._days),this._months=or(this._months),t.milliseconds=or(t.milliseconds),t.seconds=or(t.seconds),t.minutes=or(t.minutes),t.hours=or(t.hours),t.months=or(t.months),t.years=or(t.years),this}function ni(t,e,n,i){var a=Ge(e,n);return t._milliseconds+=i*a._milliseconds,t._days+=i*a._days,t._months+=i*a._months,t._bubble()}function ii(t,e){return ni(this,t,e,1)}function ai(t,e){return ni(this,t,e,-1)}function ri(t){return t<0?Math.floor(t):Math.ceil(t)}function oi(){var t,e,n,i,a,r=this._milliseconds,o=this._days,s=this._months,l=this._data;return r>=0&&o>=0&&s>=0||r<=0&&o<=0&&s<=0||(r+=864e5*ri(li(s)+o),o=0,s=0),l.milliseconds=r%1e3,t=_(r/1e3),l.seconds=t%60,e=_(t/60),l.minutes=e%60,n=_(e/60),l.hours=n%24,o+=_(n/24),a=_(si(o)),s+=a,o-=ri(li(a)),i=_(s/12),s%=12,l.days=o,l.months=s,l.years=i,this}function si(t){return 4800*t/146097}function li(t){return 146097*t/4800}function ui(t){if(!this.isValid())return NaN;var e,n,i=this._milliseconds;if(t=Y(t),"month"===t||"year"===t)return e=this._days+i/864e5,n=this._months+si(e),"month"===t?n:n/12;switch(e=this._days+Math.round(li(this._months)),t){case"week":return e/7+i/6048e5;case"day":return e+i/864e5;case"hour":return 24*e+i/36e5;case"minute":return 1440*e+i/6e4;case"second":return 86400*e+i/1e3;case"millisecond":return Math.floor(864e5*e)+i;default:throw new Error("Unknown unit "+t)}}function di(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*k(this._months/12):NaN}function ci(t){return function(){return this.as(t)}}function hi(t){return t=Y(t),this.isValid()?this[t+"s"]():NaN}function fi(t){return function(){return this.isValid()?this._data[t]:NaN}}function gi(){return _(this.days()/7)}function pi(t,e,n,i,a){return a.relativeTime(e||1,!!n,t,i)}function mi(t,e,n){var i=Ge(t).abs(),a=kr(i.as("s")),r=kr(i.as("m")),o=kr(i.as("h")),s=kr(i.as("d")),l=kr(i.as("M")),u=kr(i.as("y")),d=a<=wr.ss&&["s",a]||a<wr.s&&["ss",a]||r<=1&&["m"]||r<wr.m&&["mm",r]||o<=1&&["h"]||o<wr.h&&["hh",o]||s<=1&&["d"]||s<wr.d&&["dd",s]||l<=1&&["M"]||l<wr.M&&["MM",l]||u<=1&&["y"]||["yy",u];return d[2]=e,d[3]=+t>0,d[4]=n,pi.apply(null,d)}function vi(t){return void 0===t?kr:"function"==typeof t&&(kr=t,!0)}function yi(t,e){return void 0!==wr[t]&&(void 0===e?wr[t]:(wr[t]=e,"s"===t&&(wr.ss=e-1),!0))}function bi(t){if(!this.isValid())return this.localeData().invalidDate();var e=this.localeData(),n=mi(this,!t,e);return t&&(n=e.pastFuture(+this,n)),e.postformat(n)}function xi(){if(!this.isValid())return this.localeData().invalidDate();var t,e,n,i=Mr(this._milliseconds)/1e3,a=Mr(this._days),r=Mr(this._months);t=_(i/60),e=_(t/60),i%=60,t%=60,n=_(r/12),r%=12;var o=n,s=r,l=a,u=e,d=t,c=i,h=this.asSeconds();return h?(h<0?"-":"")+"P"+(o?o+"Y":"")+(s?s+"M":"")+(l?l+"D":"")+(u||d||c?"T":"")+(u?u+"H":"")+(d?d+"M":"")+(c?c+"S":""):"P0D"}var _i,ki;ki=Array.prototype.some?Array.prototype.some:function(t){for(var e=Object(this),n=e.length>>>0,i=0;i<n;i++)if(i in e&&t.call(this,e[i],i,e))return!0;return!1};var wi=ki,Mi=t.momentProperties=[],Si=!1,Di={};t.suppressDeprecationWarnings=!1,t.deprecationHandler=null;var Ci;Ci=Object.keys?Object.keys:function(t){var e,n=[];for(e in t)c(t,e)&&n.push(e);return n};var Pi,Ti=Ci,Ii={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ai={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Fi="Invalid date",Oi="%d",Ri=/\d{1,2}/,Li={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Vi={},Wi={},Yi=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,zi=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ni={},Bi={},Ei=/\d/,Hi=/\d\d/,ji=/\d{3}/,Ui=/\d{4}/,Gi=/[+-]?\d{6}/,qi=/\d\d?/,Zi=/\d\d\d\d?/,Xi=/\d\d\d\d\d\d?/,Ji=/\d{1,3}/,Ki=/\d{1,4}/,Qi=/[+-]?\d{1,6}/,$i=/\d+/,ta=/[+-]?\d+/,ea=/Z|[+-]\d\d:?\d\d/gi,na=/Z|[+-]\d\d(?::?\d\d)?/gi,ia=/[+-]?\d+(\.\d{1,3})?/,aa=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,ra={},oa={},sa=0,la=1,ua=2,da=3,ca=4,ha=5,fa=6,ga=7,pa=8;Pi=Array.prototype.indexOf?Array.prototype.indexOf:function(t){var e;for(e=0;e<this.length;++e)if(this[e]===t)return e;return-1};var ma=Pi;Z("M",["MM",2],"Mo",function(){return this.month()+1}),Z("MMM",0,0,function(t){return this.localeData().monthsShort(this,t)}),Z("MMMM",0,0,function(t){return this.localeData().months(this,t)}),W("month","M"),N("month",8),$("M",qi),$("MM",qi,Hi),$("MMM",function(t,e){return e.monthsShortRegex(t)}),$("MMMM",function(t,e){return e.monthsRegex(t)}),it(["M","MM"],function(t,e){e[la]=k(t)-1}),it(["MMM","MMMM"],function(t,e,n,i){var a=n._locale.monthsParse(t,i,n._strict);null!=a?e[la]=a:p(n).invalidMonth=t});var va=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,ya="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ba="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),xa=aa,_a=aa;Z("Y",0,0,function(){var t=this.year();return t<=9999?""+t:"+"+t}),Z(0,["YY",2],0,function(){return this.year()%100}),Z(0,["YYYY",4],0,"year"),Z(0,["YYYYY",5],0,"year"),Z(0,["YYYYYY",6,!0],0,"year"),W("year","y"),N("year",1),$("Y",ta),$("YY",qi,Hi),$("YYYY",Ki,Ui),$("YYYYY",Qi,Gi),$("YYYYYY",Qi,Gi),it(["YYYYY","YYYYYY"],sa),it("YYYY",function(e,n){n[sa]=2===e.length?t.parseTwoDigitYear(e):k(e)}),it("YY",function(e,n){n[sa]=t.parseTwoDigitYear(e)}),it("Y",function(t,e){e[sa]=parseInt(t,10)}),t.parseTwoDigitYear=function(t){return k(t)+(k(t)>68?1900:2e3)};var ka=E("FullYear",!0);Z("w",["ww",2],"wo","week"),Z("W",["WW",2],"Wo","isoWeek"),W("week","w"),W("isoWeek","W"),N("week",5),N("isoWeek",5),$("w",qi),$("ww",qi,Hi),$("W",qi),$("WW",qi,Hi),at(["w","ww","W","WW"],function(t,e,n,i){e[i.substr(0,1)]=k(t)});var wa={dow:0,doy:6};Z("d",0,"do","day"),Z("dd",0,0,function(t){return this.localeData().weekdaysMin(this,t)}),Z("ddd",0,0,function(t){return this.localeData().weekdaysShort(this,t)}),Z("dddd",0,0,function(t){return this.localeData().weekdays(this,t)}),Z("e",0,0,"weekday"),Z("E",0,0,"isoWeekday"),W("day","d"),W("weekday","e"),W("isoWeekday","E"),N("day",11),N("weekday",11),N("isoWeekday",11),$("d",qi),$("e",qi),$("E",qi),$("dd",function(t,e){return e.weekdaysMinRegex(t)}),$("ddd",function(t,e){return e.weekdaysShortRegex(t)}),$("dddd",function(t,e){return e.weekdaysRegex(t)}),at(["dd","ddd","dddd"],function(t,e,n,i){var a=n._locale.weekdaysParse(t,i,n._strict);null!=a?e.d=a:p(n).invalidWeekday=t;
}),at(["d","e","E"],function(t,e,n,i){e[i]=k(t)});var Ma="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Sa="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Da="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),Ca=aa,Pa=aa,Ta=aa;Z("H",["HH",2],0,"hour"),Z("h",["hh",2],0,Ut),Z("k",["kk",2],0,Gt),Z("hmm",0,0,function(){return""+Ut.apply(this)+q(this.minutes(),2)}),Z("hmmss",0,0,function(){return""+Ut.apply(this)+q(this.minutes(),2)+q(this.seconds(),2)}),Z("Hmm",0,0,function(){return""+this.hours()+q(this.minutes(),2)}),Z("Hmmss",0,0,function(){return""+this.hours()+q(this.minutes(),2)+q(this.seconds(),2)}),qt("a",!0),qt("A",!1),W("hour","h"),N("hour",13),$("a",Zt),$("A",Zt),$("H",qi),$("h",qi),$("k",qi),$("HH",qi,Hi),$("hh",qi,Hi),$("kk",qi,Hi),$("hmm",Zi),$("hmmss",Xi),$("Hmm",Zi),$("Hmmss",Xi),it(["H","HH"],da),it(["k","kk"],function(t,e,n){var i=k(t);e[da]=24===i?0:i}),it(["a","A"],function(t,e,n){n._isPm=n._locale.isPM(t),n._meridiem=t}),it(["h","hh"],function(t,e,n){e[da]=k(t),p(n).bigHour=!0}),it("hmm",function(t,e,n){var i=t.length-2;e[da]=k(t.substr(0,i)),e[ca]=k(t.substr(i)),p(n).bigHour=!0}),it("hmmss",function(t,e,n){var i=t.length-4,a=t.length-2;e[da]=k(t.substr(0,i)),e[ca]=k(t.substr(i,2)),e[ha]=k(t.substr(a)),p(n).bigHour=!0}),it("Hmm",function(t,e,n){var i=t.length-2;e[da]=k(t.substr(0,i)),e[ca]=k(t.substr(i))}),it("Hmmss",function(t,e,n){var i=t.length-4,a=t.length-2;e[da]=k(t.substr(0,i)),e[ca]=k(t.substr(i,2)),e[ha]=k(t.substr(a))});var Ia,Aa=/[ap]\.?m?\.?/i,Fa=E("Hours",!0),Oa={calendar:Ii,longDateFormat:Ai,invalidDate:Fi,ordinal:Oi,dayOfMonthOrdinalParse:Ri,relativeTime:Li,months:ya,monthsShort:ba,week:wa,weekdays:Ma,weekdaysMin:Da,weekdaysShort:Sa,meridiemParse:Aa},Ra={},La={},Va=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Wa=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ya=/Z|[+-]\d\d(?::?\d\d)?/,za=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Na=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ba=/^\/?Date\((\-?\d+)/i,Ea=/^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;t.createFromInputFallback=S("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(t){t._d=new Date(t._i+(t._useUTC?" UTC":""))}),t.ISO_8601=function(){},t.RFC_2822=function(){};var Ha=S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var t=_e.apply(null,arguments);return this.isValid()&&t.isValid()?t<this?this:t:v()}),ja=S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var t=_e.apply(null,arguments);return this.isValid()&&t.isValid()?t>this?this:t:v()}),Ua=function(){return Date.now?Date.now():+new Date},Ga=["year","quarter","month","week","day","hour","minute","second","millisecond"];Ae("Z",":"),Ae("ZZ",""),$("Z",na),$("ZZ",na),it(["Z","ZZ"],function(t,e,n){n._useUTC=!0,n._tzm=Fe(na,t)});var qa=/([\+\-]|\d\d)/gi;t.updateOffset=function(){};var Za=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Xa=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Ge.fn=Pe.prototype,Ge.invalid=Ce;var Ja=Je(1,"add"),Ka=Je(-1,"subtract");t.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",t.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Qa=S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){return void 0===t?this.localeData():this.locale(t)});Z(0,["gg",2],0,function(){return this.weekYear()%100}),Z(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Fn("gggg","weekYear"),Fn("ggggg","weekYear"),Fn("GGGG","isoWeekYear"),Fn("GGGGG","isoWeekYear"),W("weekYear","gg"),W("isoWeekYear","GG"),N("weekYear",1),N("isoWeekYear",1),$("G",ta),$("g",ta),$("GG",qi,Hi),$("gg",qi,Hi),$("GGGG",Ki,Ui),$("gggg",Ki,Ui),$("GGGGG",Qi,Gi),$("ggggg",Qi,Gi),at(["gggg","ggggg","GGGG","GGGGG"],function(t,e,n,i){e[i.substr(0,2)]=k(t)}),at(["gg","GG"],function(e,n,i,a){n[a]=t.parseTwoDigitYear(e)}),Z("Q",0,"Qo","quarter"),W("quarter","Q"),N("quarter",7),$("Q",Ei),it("Q",function(t,e){e[la]=3*(k(t)-1)}),Z("D",["DD",2],"Do","date"),W("date","D"),N("date",9),$("D",qi),$("DD",qi,Hi),$("Do",function(t,e){return t?e._dayOfMonthOrdinalParse||e._ordinalParse:e._dayOfMonthOrdinalParseLenient}),it(["D","DD"],ua),it("Do",function(t,e){e[ua]=k(t.match(qi)[0],10)});var $a=E("Date",!0);Z("DDD",["DDDD",3],"DDDo","dayOfYear"),W("dayOfYear","DDD"),N("dayOfYear",4),$("DDD",Ji),$("DDDD",ji),it(["DDD","DDDD"],function(t,e,n){n._dayOfYear=k(t)}),Z("m",["mm",2],0,"minute"),W("minute","m"),N("minute",14),$("m",qi),$("mm",qi,Hi),it(["m","mm"],ca);var tr=E("Minutes",!1);Z("s",["ss",2],0,"second"),W("second","s"),N("second",15),$("s",qi),$("ss",qi,Hi),it(["s","ss"],ha);var er=E("Seconds",!1);Z("S",0,0,function(){return~~(this.millisecond()/100)}),Z(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Z(0,["SSS",3],0,"millisecond"),Z(0,["SSSS",4],0,function(){return 10*this.millisecond()}),Z(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),Z(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),Z(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),Z(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),Z(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),W("millisecond","ms"),N("millisecond",16),$("S",Ji,Ei),$("SS",Ji,Hi),$("SSS",Ji,ji);var nr;for(nr="SSSS";nr.length<=9;nr+="S")$(nr,$i);for(nr="S";nr.length<=9;nr+="S")it(nr,Bn);var ir=E("Milliseconds",!1);Z("z",0,0,"zoneAbbr"),Z("zz",0,0,"zoneName");var ar=b.prototype;ar.add=Ja,ar.calendar=$e,ar.clone=tn,ar.diff=ln,ar.endOf=_n,ar.format=fn,ar.from=gn,ar.fromNow=pn,ar.to=mn,ar.toNow=vn,ar.get=U,ar.invalidAt=In,ar.isAfter=en,ar.isBefore=nn,ar.isBetween=an,ar.isSame=rn,ar.isSameOrAfter=on,ar.isSameOrBefore=sn,ar.isValid=Pn,ar.lang=Qa,ar.locale=yn,ar.localeData=bn,ar.max=ja,ar.min=Ha,ar.parsingFlags=Tn,ar.set=G,ar.startOf=xn,ar.subtract=Ka,ar.toArray=Sn,ar.toObject=Dn,ar.toDate=Mn,ar.toISOString=cn,ar.inspect=hn,ar.toJSON=Cn,ar.toString=dn,ar.unix=wn,ar.valueOf=kn,ar.creationData=An,ar.year=ka,ar.isLeapYear=bt,ar.weekYear=On,ar.isoWeekYear=Rn,ar.quarter=ar.quarters=zn,ar.month=ht,ar.daysInMonth=ft,ar.week=ar.weeks=Tt,ar.isoWeek=ar.isoWeeks=It,ar.weeksInYear=Vn,ar.isoWeeksInYear=Ln,ar.date=$a,ar.day=ar.days=Yt,ar.weekday=zt,ar.isoWeekday=Nt,ar.dayOfYear=Nn,ar.hour=ar.hours=Fa,ar.minute=ar.minutes=tr,ar.second=ar.seconds=er,ar.millisecond=ar.milliseconds=ir,ar.utcOffset=Le,ar.utc=We,ar.local=Ye,ar.parseZone=ze,ar.hasAlignedHourOffset=Ne,ar.isDST=Be,ar.isLocal=He,ar.isUtcOffset=je,ar.isUtc=Ue,ar.isUTC=Ue,ar.zoneAbbr=En,ar.zoneName=Hn,ar.dates=S("dates accessor is deprecated. Use date instead.",$a),ar.months=S("months accessor is deprecated. Use month instead",ht),ar.years=S("years accessor is deprecated. Use year instead",ka),ar.zone=S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Ve),ar.isDSTShifted=S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ee);var rr=I.prototype;rr.calendar=A,rr.longDateFormat=F,rr.invalidDate=O,rr.ordinal=R,rr.preparse=Gn,rr.postformat=Gn,rr.relativeTime=L,rr.pastFuture=V,rr.set=P,rr.months=st,rr.monthsShort=lt,rr.monthsParse=dt,rr.monthsRegex=pt,rr.monthsShortRegex=gt,rr.week=Dt,rr.firstDayOfYear=Pt,rr.firstDayOfWeek=Ct,rr.weekdays=Ot,rr.weekdaysMin=Lt,rr.weekdaysShort=Rt,rr.weekdaysParse=Wt,rr.weekdaysRegex=Bt,rr.weekdaysShortRegex=Et,rr.weekdaysMinRegex=Ht,rr.isPM=Xt,rr.meridiem=Jt,te("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(t){var e=t%10,n=1===k(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";return t+n}}),t.lang=S("moment.lang is deprecated. Use moment.locale instead.",te),t.langData=S("moment.langData is deprecated. Use moment.localeData instead.",ie);var or=Math.abs,sr=ci("ms"),lr=ci("s"),ur=ci("m"),dr=ci("h"),cr=ci("d"),hr=ci("w"),fr=ci("M"),gr=ci("y"),pr=fi("milliseconds"),mr=fi("seconds"),vr=fi("minutes"),yr=fi("hours"),br=fi("days"),xr=fi("months"),_r=fi("years"),kr=Math.round,wr={ss:44,s:45,m:45,h:22,d:26,M:11},Mr=Math.abs,Sr=Pe.prototype;return Sr.isValid=De,Sr.abs=ei,Sr.add=ii,Sr.subtract=ai,Sr.as=ui,Sr.asMilliseconds=sr,Sr.asSeconds=lr,Sr.asMinutes=ur,Sr.asHours=dr,Sr.asDays=cr,Sr.asWeeks=hr,Sr.asMonths=fr,Sr.asYears=gr,Sr.valueOf=di,Sr._bubble=oi,Sr.get=hi,Sr.milliseconds=pr,Sr.seconds=mr,Sr.minutes=vr,Sr.hours=yr,Sr.days=br,Sr.weeks=gi,Sr.months=xr,Sr.years=_r,Sr.humanize=bi,Sr.toISOString=xi,Sr.toString=xi,Sr.toJSON=xi,Sr.locale=yn,Sr.localeData=bn,Sr.toIsoString=S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",xi),Sr.lang=Qa,Z("X",0,0,"unix"),Z("x",0,0,"valueOf"),$("x",ta),$("X",ia),it("X",function(t,e,n){n._d=new Date(1e3*parseFloat(t,10))}),it("x",function(t,e,n){n._d=new Date(k(t))}),t.version="2.18.1",i(_e),t.fn=ar,t.min=we,t.max=Me,t.now=Ua,t.utc=f,t.unix=jn,t.months=Jn,t.isDate=u,t.locale=te,t.invalid=v,t.duration=Ge,t.isMoment=x,t.weekdays=Qn,t.parseZone=Un,t.localeData=ie,t.isDuration=Te,t.monthsShort=Kn,t.weekdaysMin=ti,t.defineLocale=ee,t.updateLocale=ne,t.locales=ae,t.weekdaysShort=$n,t.normalizeUnits=Y,t.relativeTimeRounding=vi,t.relativeTimeThreshold=yi,t.calendarFormat=Qe,t.prototype=ar,t})},{}],7:[function(t,e,n){var i=t(28)();t(26)(i),t(40)(i),t(22)(i),t(25)(i),t(30)(i),t(21)(i),t(23)(i),t(24)(i),t(29)(i),t(32)(i),t(33)(i),t(31)(i),t(27)(i),t(34)(i),t(35)(i),t(36)(i),t(37)(i),t(38)(i),t(46)(i),t(44)(i),t(45)(i),t(47)(i),t(48)(i),t(49)(i),t(15)(i),t(16)(i),t(17)(i),t(18)(i),t(19)(i),t(20)(i),t(8)(i),t(9)(i),t(10)(i),t(11)(i),t(12)(i),t(13)(i),t(14)(i);var a=[];a.push(t(41)(i),t(42)(i),t(43)(i)),i.plugins.register(a),e.exports=i,"undefined"!=typeof window&&(window.Chart=i)},{10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,8:8,9:9}],8:[function(t,e,n){"use strict";e.exports=function(t){t.Bar=function(e,n){return n.type="bar",new t(e,n)}}},{}],9:[function(t,e,n){"use strict";e.exports=function(t){t.Bubble=function(e,n){return n.type="bubble",new t(e,n)}}},{}],10:[function(t,e,n){"use strict";e.exports=function(t){t.Doughnut=function(e,n){return n.type="doughnut",new t(e,n)}}},{}],11:[function(t,e,n){"use strict";e.exports=function(t){t.Line=function(e,n){return n.type="line",new t(e,n)}}},{}],12:[function(t,e,n){"use strict";e.exports=function(t){t.PolarArea=function(e,n){return n.type="polarArea",new t(e,n)}}},{}],13:[function(t,e,n){"use strict";e.exports=function(t){t.Radar=function(e,n){return n.type="radar",new t(e,n)}}},{}],14:[function(t,e,n){"use strict";e.exports=function(t){var e={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(){return""},label:function(t){return"("+t.xLabel+", "+t.yLabel+")"}}}};t.defaults.scatter=e,t.controllers.scatter=t.controllers.line,t.Scatter=function(e,n){return n.type="scatter",new t(e,n)}}},{}],15:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},t.controllers.bar=t.DatasetController.extend({dataElementType:t.elements.Rectangle,initialize:function(){var e,n=this;t.DatasetController.prototype.initialize.apply(n,arguments),e=n.getMeta(),e.stack=n.getDataset().stack,e.bar=!0},update:function(t){var e,n,i=this,a=i.getMeta().data;for(i._ruler=i.getRuler(),e=0,n=a.length;e<n;++e)i.updateElement(a[e],e,t)},updateElement:function(t,n,i){var a=this,r=a.chart,o=a.getMeta(),s=a.getDataset(),l=t.custom||{},u=r.options.elements.rectangle;t._xScale=a.getScaleForId(o.xAxisID),t._yScale=a.getScaleForId(o.yAxisID),t._datasetIndex=a.index,t._index=n,t._model={datasetLabel:s.label,label:r.data.labels[n],borderSkipped:l.borderSkipped?l.borderSkipped:u.borderSkipped,backgroundColor:l.backgroundColor?l.backgroundColor:e.getValueAtIndexOrDefault(s.backgroundColor,n,u.backgroundColor),borderColor:l.borderColor?l.borderColor:e.getValueAtIndexOrDefault(s.borderColor,n,u.borderColor),borderWidth:l.borderWidth?l.borderWidth:e.getValueAtIndexOrDefault(s.borderWidth,n,u.borderWidth)},a.updateElementGeometry(t,n,i),t.pivot()},updateElementGeometry:function(t,e,n){var i=this,a=t._model,r=i.getValueScale(),o=r.getBasePixel(),s=r.isHorizontal(),l=i._ruler||i.getRuler(),u=i.calculateBarValuePixels(i.index,e),d=i.calculateBarIndexPixels(i.index,e,l);a.horizontal=s,a.base=n?o:u.base,a.x=s?n?o:u.head:d.center,a.y=s?d.center:n?o:u.head,a.height=s?d.size:void 0,a.width=s?void 0:d.size},getValueScaleId:function(){return this.getMeta().yAxisID},getIndexScaleId:function(){return this.getMeta().xAxisID},getValueScale:function(){return this.getScaleForId(this.getValueScaleId())},getIndexScale:function(){return this.getScaleForId(this.getIndexScaleId())},getStackCount:function(t){var e,n,i=this,a=i.chart,r=i.getIndexScale(),o=r.options.stacked,s=void 0===t?a.data.datasets.length:t+1,l=[];for(e=0;e<s;++e)n=a.getDatasetMeta(e),n.bar&&a.isDatasetVisible(e)&&(o===!1||o===!0&&l.indexOf(n.stack)===-1||void 0===o&&(void 0===n.stack||l.indexOf(n.stack)===-1))&&l.push(n.stack);return l.length},getStackIndex:function(t){return this.getStackCount(t)-1},getRuler:function(){var t=this,n=t.getIndexScale(),i=n.options,a=t.getStackCount(),r=n.isHorizontal()?n.width:n.height,o=r/n.ticks.length,s=o*i.categoryPercentage,l=s/a,u=l*i.barPercentage;return u=Math.min(e.getValueOrDefault(i.barThickness,u),e.getValueOrDefault(i.maxBarThickness,1/0)),{stackCount:a,tickSize:o,categorySize:s,categorySpacing:o-s,fullBarSize:l,barSize:u,barSpacing:l-u,scale:n}},calculateBarValuePixels:function(t,e){var n,i,a,r,o,s,l=this,u=l.chart,d=l.getMeta(),c=l.getValueScale(),h=u.data.datasets,f=Number(h[t].data[e]),g=c.options.stacked,p=d.stack,m=0;if(g||void 0===g&&void 0!==p)for(n=0;n<t;++n)i=u.getDatasetMeta(n),i.bar&&i.stack===p&&i.controller.getValueScaleId()===c.id&&u.isDatasetVisible(n)&&(a=Number(h[n].data[e]),(f<0&&a<0||f>=0&&a>0)&&(m+=a));return r=c.getPixelForValue(m),o=c.getPixelForValue(m+f),s=(o-r)/2,{size:s,base:r,head:o,center:o+s/2}},calculateBarIndexPixels:function(t,e,n){var i=this,a=n.scale,r=i.chart.isCombo,o=i.getStackIndex(t),s=a.getPixelForValue(null,e,t,r),l=n.barSize;return s-=r?n.tickSize/2:0,s+=n.fullBarSize*o,s+=n.categorySpacing/2,s+=n.barSpacing/2,{size:l,base:s,head:s+l,center:s+l/2}},draw:function(){var t,n=this,i=n.chart,a=n.getMeta().data,r=n.getDataset(),o=a.length,s=0;for(e.canvas.clipArea(i.ctx,i.chartArea);s<o;++s)t=r.data[s],null===t||void 0===t||isNaN(t)||a[s].draw();e.canvas.unclipArea(i.ctx)},setHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t._index,a=t.custom||{},r=t._model;r.backgroundColor=a.hoverBackgroundColor?a.hoverBackgroundColor:e.getValueAtIndexOrDefault(n.hoverBackgroundColor,i,e.getHoverColor(r.backgroundColor)),r.borderColor=a.hoverBorderColor?a.hoverBorderColor:e.getValueAtIndexOrDefault(n.hoverBorderColor,i,e.getHoverColor(r.borderColor)),r.borderWidth=a.hoverBorderWidth?a.hoverBorderWidth:e.getValueAtIndexOrDefault(n.hoverBorderWidth,i,r.borderWidth)},removeHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t._index,a=t.custom||{},r=t._model,o=this.chart.options.elements.rectangle;r.backgroundColor=a.backgroundColor?a.backgroundColor:e.getValueAtIndexOrDefault(n.backgroundColor,i,o.backgroundColor),r.borderColor=a.borderColor?a.borderColor:e.getValueAtIndexOrDefault(n.borderColor,i,o.borderColor),r.borderWidth=a.borderWidth?a.borderWidth:e.getValueAtIndexOrDefault(n.borderWidth,i,o.borderWidth)}}),t.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(t,e){var n="";return t.length>0&&(t[0].yLabel?n=t[0].yLabel:e.labels.length>0&&t[0].index<e.labels.length&&(n=e.labels[t[0].index])),n},label:function(t,e){var n=e.datasets[t.datasetIndex].label||"";return n+": "+t.xLabel}}}},t.controllers.horizontalBar=t.controllers.bar.extend({getValueScaleId:function(){return this.getMeta().xAxisID},getIndexScaleId:function(){return this.getMeta().yAxisID}})}},{}],16:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(t,e){var n=e.datasets[t.datasetIndex].label||"",i=e.datasets[t.datasetIndex].data[t.index];return n+": ("+t.xLabel+", "+t.yLabel+", "+i.r+")"}}}},t.controllers.bubble=t.DatasetController.extend({dataElementType:t.elements.Point,update:function(t){var n=this,i=n.getMeta(),a=i.data;e.each(a,function(e,i){n.updateElement(e,i,t)})},updateElement:function(n,i,a){var r=this,o=r.getMeta(),s=r.getScaleForId(o.xAxisID),l=r.getScaleForId(o.yAxisID),u=n.custom||{},d=r.getDataset(),c=d.data[i],h=r.chart.options.elements.point,f=r.index;e.extend(n,{_xScale:s,_yScale:l,_datasetIndex:f,_index:i,_model:{x:a?s.getPixelForDecimal(.5):s.getPixelForValue("object"==typeof c?c:NaN,i,f,r.chart.isCombo),y:a?l.getBasePixel():l.getPixelForValue(c,i,f),radius:a?0:u.radius?u.radius:r.getRadius(c),hitRadius:u.hitRadius?u.hitRadius:e.getValueAtIndexOrDefault(d.hitRadius,i,h.hitRadius)}}),t.DatasetController.prototype.removeHoverStyle.call(r,n,h);var g=n._model;g.skip=u.skip?u.skip:isNaN(g.x)||isNaN(g.y),n.pivot()},getRadius:function(t){return t.r||this.chart.options.elements.point.radius},setHoverStyle:function(n){var i=this;t.DatasetController.prototype.setHoverStyle.call(i,n);var a=i.chart.data.datasets[n._datasetIndex],r=n._index,o=n.custom||{},s=n._model;s.radius=o.hoverRadius?o.hoverRadius:e.getValueAtIndexOrDefault(a.hoverRadius,r,i.chart.options.elements.point.hoverRadius)+i.getRadius(a.data[r])},removeHoverStyle:function(e){var n=this;t.DatasetController.prototype.removeHoverStyle.call(n,e,n.chart.options.elements.point);var i=n.chart.data.datasets[e._datasetIndex].data[e._index],a=e.custom||{},r=e._model;r.radius=a.radius?a.radius:n.getRadius(i)}})}},{}],17:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=t.defaults;n.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var n=t.data,i=n.datasets,a=n.labels;if(i.length)for(var r=0;r<i[0].data.length;++r)e.push('<li><span style="background-color:'+i[0].backgroundColor[r]+'"></span>'),a[r]&&e.push(a[r]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var n=t.data;return n.labels.length&&n.datasets.length?n.labels.map(function(i,a){var r=t.getDatasetMeta(0),o=n.datasets[0],s=r.data[a],l=s&&s.custom||{},u=e.getValueAtIndexOrDefault,d=t.options.elements.arc,c=l.backgroundColor?l.backgroundColor:u(o.backgroundColor,a,d.backgroundColor),h=l.borderColor?l.borderColor:u(o.borderColor,a,d.borderColor),f=l.borderWidth?l.borderWidth:u(o.borderWidth,a,d.borderWidth);return{text:i,fillStyle:c,strokeStyle:h,lineWidth:f,hidden:isNaN(o.data[a])||r.data[a].hidden,index:a}}):[]}},onClick:function(t,e){var n,i,a,r=e.index,o=this.chart;for(n=0,i=(o.data.datasets||[]).length;n<i;++n)a=o.getDatasetMeta(n),a.data[r]&&(a.data[r].hidden=!a.data[r].hidden);o.update()}},cutoutPercentage:50,rotation:Math.PI*-.5,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,n){var i=n.labels[t.index],a=": "+n.datasets[t.datasetIndex].data[t.index];return e.isArray(i)?(i=i.slice(),i[0]+=a):i+=a,i}}}},n.pie=e.clone(n.doughnut),e.extend(n.pie,{cutoutPercentage:0}),t.controllers.doughnut=t.controllers.pie=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,getRingIndex:function(t){for(var e=0,n=0;n<t;++n)this.chart.isDatasetVisible(n)&&++e;return e},update:function(t){var n=this,i=n.chart,a=i.chartArea,r=i.options,o=r.elements.arc,s=a.right-a.left-o.borderWidth,l=a.bottom-a.top-o.borderWidth,u=Math.min(s,l),d={x:0,y:0},c=n.getMeta(),h=r.cutoutPercentage,f=r.circumference;if(f<2*Math.PI){var g=r.rotation%(2*Math.PI);g+=2*Math.PI*(g>=Math.PI?-1:g<-Math.PI?1:0);var p=g+f,m={x:Math.cos(g),y:Math.sin(g)},v={x:Math.cos(p),y:Math.sin(p)},y=g<=0&&0<=p||g<=2*Math.PI&&2*Math.PI<=p,b=g<=.5*Math.PI&&.5*Math.PI<=p||g<=2.5*Math.PI&&2.5*Math.PI<=p,x=g<=-Math.PI&&-Math.PI<=p||g<=Math.PI&&Math.PI<=p,_=g<=.5*-Math.PI&&.5*-Math.PI<=p||g<=1.5*Math.PI&&1.5*Math.PI<=p,k=h/100,w={x:x?-1:Math.min(m.x*(m.x<0?1:k),v.x*(v.x<0?1:k)),y:_?-1:Math.min(m.y*(m.y<0?1:k),v.y*(v.y<0?1:k))},M={x:y?1:Math.max(m.x*(m.x>0?1:k),v.x*(v.x>0?1:k)),y:b?1:Math.max(m.y*(m.y>0?1:k),v.y*(v.y>0?1:k))},S={width:.5*(M.x-w.x),height:.5*(M.y-w.y)};u=Math.min(s/S.width,l/S.height),d={x:(M.x+w.x)*-.5,y:(M.y+w.y)*-.5}}i.borderWidth=n.getMaxBorderWidth(c.data),i.outerRadius=Math.max((u-i.borderWidth)/2,0),i.innerRadius=Math.max(h?i.outerRadius/100*h:0,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),i.offsetX=d.x*i.outerRadius,i.offsetY=d.y*i.outerRadius,c.total=n.calculateTotal(),n.outerRadius=i.outerRadius-i.radiusLength*n.getRingIndex(n.index),n.innerRadius=Math.max(n.outerRadius-i.radiusLength,0),e.each(c.data,function(e,i){n.updateElement(e,i,t)})},updateElement:function(t,n,i){var a=this,r=a.chart,o=r.chartArea,s=r.options,l=s.animation,u=(o.left+o.right)/2,d=(o.top+o.bottom)/2,c=s.rotation,h=s.rotation,f=a.getDataset(),g=i&&l.animateRotate?0:t.hidden?0:a.calculateCircumference(f.data[n])*(s.circumference/(2*Math.PI)),p=i&&l.animateScale?0:a.innerRadius,m=i&&l.animateScale?0:a.outerRadius,v=e.getValueAtIndexOrDefault;e.extend(t,{_datasetIndex:a.index,_index:n,_model:{x:u+r.offsetX,y:d+r.offsetY,startAngle:c,endAngle:h,circumference:g,outerRadius:m,innerRadius:p,label:v(f.label,n,r.data.labels[n])}});var y=t._model;this.removeHoverStyle(t),i&&l.animateRotate||(0===n?y.startAngle=s.rotation:y.startAngle=a.getMeta().data[n-1]._model.endAngle,y.endAngle=y.startAngle+y.circumference),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},calculateTotal:function(){var t,n=this.getDataset(),i=this.getMeta(),a=0;return e.each(i.data,function(e,i){t=n.data[i],isNaN(t)||e.hidden||(a+=Math.abs(t))}),a},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(t/e):0},getMaxBorderWidth:function(t){for(var e,n,i=0,a=this.index,r=t.length,o=0;o<r;o++)e=t[o]._model?t[o]._model.borderWidth:0,n=t[o]._chart?t[o]._chart.config.data.datasets[a].hoverBorderWidth:0,i=e>i?e:i,i=n>i?n:i;return i}})}},{}],18:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return n.getValueOrDefault(t.showLine,e.showLines)}var n=t.helpers;t.defaults.line={showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},t.controllers.line=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,update:function(t){var i,a,r,o=this,s=o.getMeta(),l=s.dataset,u=s.data||[],d=o.chart.options,c=d.elements.line,h=o.getScaleForId(s.yAxisID),f=o.getDataset(),g=e(f,d);for(g&&(r=l.custom||{},void 0!==f.tension&&void 0===f.lineTension&&(f.lineTension=f.tension),l._scale=h,l._datasetIndex=o.index,l._children=u,l._model={spanGaps:f.spanGaps?f.spanGaps:d.spanGaps,tension:r.tension?r.tension:n.getValueOrDefault(f.lineTension,c.tension),backgroundColor:r.backgroundColor?r.backgroundColor:f.backgroundColor||c.backgroundColor,borderWidth:r.borderWidth?r.borderWidth:f.borderWidth||c.borderWidth,borderColor:r.borderColor?r.borderColor:f.borderColor||c.borderColor,borderCapStyle:r.borderCapStyle?r.borderCapStyle:f.borderCapStyle||c.borderCapStyle,borderDash:r.borderDash?r.borderDash:f.borderDash||c.borderDash,borderDashOffset:r.borderDashOffset?r.borderDashOffset:f.borderDashOffset||c.borderDashOffset,borderJoinStyle:r.borderJoinStyle?r.borderJoinStyle:f.borderJoinStyle||c.borderJoinStyle,fill:r.fill?r.fill:void 0!==f.fill?f.fill:c.fill,steppedLine:r.steppedLine?r.steppedLine:n.getValueOrDefault(f.steppedLine,c.stepped),cubicInterpolationMode:r.cubicInterpolationMode?r.cubicInterpolationMode:n.getValueOrDefault(f.cubicInterpolationMode,c.cubicInterpolationMode)},l.pivot()),i=0,a=u.length;i<a;++i)o.updateElement(u[i],i,t);for(g&&0!==l._model.tension&&o.updateBezierControlPoints(),i=0,a=u.length;i<a;++i)u[i].pivot()},getPointBackgroundColor:function(t,e){var i=this.chart.options.elements.point.backgroundColor,a=this.getDataset(),r=t.custom||{};return r.backgroundColor?i=r.backgroundColor:a.pointBackgroundColor?i=n.getValueAtIndexOrDefault(a.pointBackgroundColor,e,i):a.backgroundColor&&(i=a.backgroundColor),i},getPointBorderColor:function(t,e){var i=this.chart.options.elements.point.borderColor,a=this.getDataset(),r=t.custom||{};return r.borderColor?i=r.borderColor:a.pointBorderColor?i=n.getValueAtIndexOrDefault(a.pointBorderColor,e,i):a.borderColor&&(i=a.borderColor),i},getPointBorderWidth:function(t,e){var i=this.chart.options.elements.point.borderWidth,a=this.getDataset(),r=t.custom||{};return isNaN(r.borderWidth)?isNaN(a.pointBorderWidth)?isNaN(a.borderWidth)||(i=a.borderWidth):i=n.getValueAtIndexOrDefault(a.pointBorderWidth,e,i):i=r.borderWidth,i},updateElement:function(t,e,i){var a,r,o=this,s=o.getMeta(),l=t.custom||{},u=o.getDataset(),d=o.index,c=u.data[e],h=o.getScaleForId(s.yAxisID),f=o.getScaleForId(s.xAxisID),g=o.chart.options.elements.point,p=o.chart.data.labels||[],m=1===p.length||1===u.data.length||o.chart.isCombo;void 0!==u.radius&&void 0===u.pointRadius&&(u.pointRadius=u.radius),void 0!==u.hitRadius&&void 0===u.pointHitRadius&&(u.pointHitRadius=u.hitRadius),a=f.getPixelForValue("object"==typeof c?c:NaN,e,d,m),r=i?h.getBasePixel():o.calculatePointY(c,e,d),t._xScale=f,t._yScale=h,t._datasetIndex=d,t._index=e,t._model={x:a,y:r,skip:l.skip||isNaN(a)||isNaN(r),radius:l.radius||n.getValueAtIndexOrDefault(u.pointRadius,e,g.radius),pointStyle:l.pointStyle||n.getValueAtIndexOrDefault(u.pointStyle,e,g.pointStyle),backgroundColor:o.getPointBackgroundColor(t,e),borderColor:o.getPointBorderColor(t,e),borderWidth:o.getPointBorderWidth(t,e),tension:s.dataset._model?s.dataset._model.tension:0,steppedLine:!!s.dataset._model&&s.dataset._model.steppedLine,hitRadius:l.hitRadius||n.getValueAtIndexOrDefault(u.pointHitRadius,e,g.hitRadius)}},calculatePointY:function(t,e,n){var i,a,r,o=this,s=o.chart,l=o.getMeta(),u=o.getScaleForId(l.yAxisID),d=0,c=0;if(u.options.stacked){for(i=0;i<n;i++)if(a=s.data.datasets[i],r=s.getDatasetMeta(i),"line"===r.type&&r.yAxisID===u.id&&s.isDatasetVisible(i)){var h=Number(u.getRightValue(a.data[e]));h<0?c+=h||0:d+=h||0}var f=Number(u.getRightValue(t));return f<0?u.getPixelForValue(c+f):u.getPixelForValue(d+f)}return u.getPixelForValue(t)},updateBezierControlPoints:function(){function t(t,e,n){return Math.max(Math.min(t,n),e)}var e,i,a,r,o,s=this,l=s.getMeta(),u=s.chart.chartArea,d=l.data||[];if(l.dataset._model.spanGaps&&(d=d.filter(function(t){return!t._model.skip})),"monotone"===l.dataset._model.cubicInterpolationMode)n.splineCurveMonotone(d);else for(e=0,i=d.length;e<i;++e)a=d[e],r=a._model,o=n.splineCurve(n.previousItem(d,e)._model,r,n.nextItem(d,e)._model,l.dataset._model.tension),r.controlPointPreviousX=o.previous.x,r.controlPointPreviousY=o.previous.y,r.controlPointNextX=o.next.x,r.controlPointNextY=o.next.y;if(s.chart.options.elements.line.capBezierPoints)for(e=0,i=d.length;e<i;++e)r=d[e]._model,r.controlPointPreviousX=t(r.controlPointPreviousX,u.left,u.right),r.controlPointPreviousY=t(r.controlPointPreviousY,u.top,u.bottom),r.controlPointNextX=t(r.controlPointNextX,u.left,u.right),r.controlPointNextY=t(r.controlPointNextY,u.top,u.bottom)},draw:function(){var n=this,i=n.chart,a=n.getMeta(),r=a.data||[],o=i.chartArea,s=r.length,l=0;for(t.canvasHelpers.clipArea(i.ctx,o),e(n.getDataset(),i.options)&&a.dataset.draw(),t.canvasHelpers.unclipArea(i.ctx);l<s;++l)r[l].draw(o)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,a=t.custom||{},r=t._model;r.radius=a.hoverRadius||n.getValueAtIndexOrDefault(e.pointHoverRadius,i,this.chart.options.elements.point.hoverRadius),r.backgroundColor=a.hoverBackgroundColor||n.getValueAtIndexOrDefault(e.pointHoverBackgroundColor,i,n.getHoverColor(r.backgroundColor)),r.borderColor=a.hoverBorderColor||n.getValueAtIndexOrDefault(e.pointHoverBorderColor,i,n.getHoverColor(r.borderColor)),r.borderWidth=a.hoverBorderWidth||n.getValueAtIndexOrDefault(e.pointHoverBorderWidth,i,r.borderWidth)},removeHoverStyle:function(t){var e=this,i=e.chart.data.datasets[t._datasetIndex],a=t._index,r=t.custom||{},o=t._model;void 0!==i.radius&&void 0===i.pointRadius&&(i.pointRadius=i.radius),o.radius=r.radius||n.getValueAtIndexOrDefault(i.pointRadius,a,e.chart.options.elements.point.radius),o.backgroundColor=e.getPointBackgroundColor(t,a),o.borderColor=e.getPointBorderColor(t,a),o.borderWidth=e.getPointBorderWidth(t,a)}})}},{}],19:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.polarArea={scale:{type:"radialLinear",angleLines:{display:!1},gridLines:{circular:!0},pointLabels:{display:!1},ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,aspectRatio:1,legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var n=t.data,i=n.datasets,a=n.labels;if(i.length)for(var r=0;r<i[0].data.length;++r)e.push('<li><span style="background-color:'+i[0].backgroundColor[r]+'"></span>'),a[r]&&e.push(a[r]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var n=t.data;return n.labels.length&&n.datasets.length?n.labels.map(function(i,a){var r=t.getDatasetMeta(0),o=n.datasets[0],s=r.data[a],l=s.custom||{},u=e.getValueAtIndexOrDefault,d=t.options.elements.arc,c=l.backgroundColor?l.backgroundColor:u(o.backgroundColor,a,d.backgroundColor),h=l.borderColor?l.borderColor:u(o.borderColor,a,d.borderColor),f=l.borderWidth?l.borderWidth:u(o.borderWidth,a,d.borderWidth);return{text:i,fillStyle:c,strokeStyle:h,lineWidth:f,hidden:isNaN(o.data[a])||r.data[a].hidden,index:a}}):[]}},onClick:function(t,e){var n,i,a,r=e.index,o=this.chart;for(n=0,i=(o.data.datasets||[]).length;n<i;++n)a=o.getDatasetMeta(n),a.data[r].hidden=!a.data[r].hidden;o.update()}},tooltips:{callbacks:{title:function(){
return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}},t.controllers.polarArea=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,update:function(t){var n=this,i=n.chart,a=i.chartArea,r=n.getMeta(),o=i.options,s=o.elements.arc,l=Math.min(a.right-a.left,a.bottom-a.top);i.outerRadius=Math.max((l-s.borderWidth/2)/2,0),i.innerRadius=Math.max(o.cutoutPercentage?i.outerRadius/100*o.cutoutPercentage:1,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),n.outerRadius=i.outerRadius-i.radiusLength*n.index,n.innerRadius=n.outerRadius-i.radiusLength,r.count=n.countVisibleElements(),e.each(r.data,function(e,i){n.updateElement(e,i,t)})},updateElement:function(t,n,i){for(var a=this,r=a.chart,o=a.getDataset(),s=r.options,l=s.animation,u=r.scale,d=e.getValueAtIndexOrDefault,c=r.data.labels,h=a.calculateCircumference(o.data[n]),f=u.xCenter,g=u.yCenter,p=0,m=a.getMeta(),v=0;v<n;++v)isNaN(o.data[v])||m.data[v].hidden||++p;var y=s.startAngle,b=t.hidden?0:u.getDistanceFromCenterForValue(o.data[n]),x=y+h*p,_=x+(t.hidden?0:h),k=l.animateScale?0:u.getDistanceFromCenterForValue(o.data[n]);e.extend(t,{_datasetIndex:a.index,_index:n,_scale:u,_model:{x:f,y:g,innerRadius:0,outerRadius:i?k:b,startAngle:i&&l.animateRotate?y:x,endAngle:i&&l.animateRotate?y:_,label:d(c,n,c[n])}}),a.removeHoverStyle(t),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},countVisibleElements:function(){var t=this.getDataset(),n=this.getMeta(),i=0;return e.each(n.data,function(e,n){isNaN(t.data[n])||e.hidden||i++}),i},calculateCircumference:function(t){var e=this.getMeta().count;return e>0&&!isNaN(t)?2*Math.PI/e:0}})}},{}],20:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.radar={aspectRatio:1,scale:{type:"radialLinear"},elements:{line:{tension:0}}},t.controllers.radar=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,linkScales:e.noop,update:function(t){var n=this,i=n.getMeta(),a=i.dataset,r=i.data,o=a.custom||{},s=n.getDataset(),l=n.chart.options.elements.line,u=n.chart.scale;void 0!==s.tension&&void 0===s.lineTension&&(s.lineTension=s.tension),e.extend(i.dataset,{_datasetIndex:n.index,_scale:u,_children:r,_loop:!0,_model:{tension:o.tension?o.tension:e.getValueOrDefault(s.lineTension,l.tension),backgroundColor:o.backgroundColor?o.backgroundColor:s.backgroundColor||l.backgroundColor,borderWidth:o.borderWidth?o.borderWidth:s.borderWidth||l.borderWidth,borderColor:o.borderColor?o.borderColor:s.borderColor||l.borderColor,fill:o.fill?o.fill:void 0!==s.fill?s.fill:l.fill,borderCapStyle:o.borderCapStyle?o.borderCapStyle:s.borderCapStyle||l.borderCapStyle,borderDash:o.borderDash?o.borderDash:s.borderDash||l.borderDash,borderDashOffset:o.borderDashOffset?o.borderDashOffset:s.borderDashOffset||l.borderDashOffset,borderJoinStyle:o.borderJoinStyle?o.borderJoinStyle:s.borderJoinStyle||l.borderJoinStyle}}),i.dataset.pivot(),e.each(r,function(e,i){n.updateElement(e,i,t)},n),n.updateBezierControlPoints()},updateElement:function(t,n,i){var a=this,r=t.custom||{},o=a.getDataset(),s=a.chart.scale,l=a.chart.options.elements.point,u=s.getPointPositionForValue(n,o.data[n]);void 0!==o.radius&&void 0===o.pointRadius&&(o.pointRadius=o.radius),void 0!==o.hitRadius&&void 0===o.pointHitRadius&&(o.pointHitRadius=o.hitRadius),e.extend(t,{_datasetIndex:a.index,_index:n,_scale:s,_model:{x:i?s.xCenter:u.x,y:i?s.yCenter:u.y,tension:r.tension?r.tension:e.getValueOrDefault(o.lineTension,a.chart.options.elements.line.tension),radius:r.radius?r.radius:e.getValueAtIndexOrDefault(o.pointRadius,n,l.radius),backgroundColor:r.backgroundColor?r.backgroundColor:e.getValueAtIndexOrDefault(o.pointBackgroundColor,n,l.backgroundColor),borderColor:r.borderColor?r.borderColor:e.getValueAtIndexOrDefault(o.pointBorderColor,n,l.borderColor),borderWidth:r.borderWidth?r.borderWidth:e.getValueAtIndexOrDefault(o.pointBorderWidth,n,l.borderWidth),pointStyle:r.pointStyle?r.pointStyle:e.getValueAtIndexOrDefault(o.pointStyle,n,l.pointStyle),hitRadius:r.hitRadius?r.hitRadius:e.getValueAtIndexOrDefault(o.pointHitRadius,n,l.hitRadius)}}),t._model.skip=r.skip?r.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){var t=this.chart.chartArea,n=this.getMeta();e.each(n.data,function(i,a){var r=i._model,o=e.splineCurve(e.previousItem(n.data,a,!0)._model,r,e.nextItem(n.data,a,!0)._model,r.tension);r.controlPointPreviousX=Math.max(Math.min(o.previous.x,t.right),t.left),r.controlPointPreviousY=Math.max(Math.min(o.previous.y,t.bottom),t.top),r.controlPointNextX=Math.max(Math.min(o.next.x,t.right),t.left),r.controlPointNextY=Math.max(Math.min(o.next.y,t.bottom),t.top),i.pivot()})},setHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},a=t._index,r=t._model;r.radius=i.hoverRadius?i.hoverRadius:e.getValueAtIndexOrDefault(n.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),r.backgroundColor=i.hoverBackgroundColor?i.hoverBackgroundColor:e.getValueAtIndexOrDefault(n.pointHoverBackgroundColor,a,e.getHoverColor(r.backgroundColor)),r.borderColor=i.hoverBorderColor?i.hoverBorderColor:e.getValueAtIndexOrDefault(n.pointHoverBorderColor,a,e.getHoverColor(r.borderColor)),r.borderWidth=i.hoverBorderWidth?i.hoverBorderWidth:e.getValueAtIndexOrDefault(n.pointHoverBorderWidth,a,r.borderWidth)},removeHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},a=t._index,r=t._model,o=this.chart.options.elements.point;r.radius=i.radius?i.radius:e.getValueAtIndexOrDefault(n.pointRadius,a,o.radius),r.backgroundColor=i.backgroundColor?i.backgroundColor:e.getValueAtIndexOrDefault(n.pointBackgroundColor,a,o.backgroundColor),r.borderColor=i.borderColor?i.borderColor:e.getValueAtIndexOrDefault(n.pointBorderColor,a,o.borderColor),r.borderWidth=i.borderWidth?i.borderWidth:e.getValueAtIndexOrDefault(n.pointBorderWidth,a,o.borderWidth)}})}},{}],21:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:e.noop,onComplete:e.noop},t.Animation=t.Element.extend({chart:null,currentStep:0,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),t.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(t,e,n,i){var a,r,o=this.animations;for(e.chart=t,i||(t.animating=!0),a=0,r=o.length;a<r;++a)if(o[a].chart===t)return void(o[a]=e);o.push(e),1===o.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var n=e.findIndex(this.animations,function(e){return e.chart===t});n!==-1&&(this.animations.splice(n,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=e.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){var t=this,e=Date.now(),n=0;t.dropFrames>1&&(n=Math.floor(t.dropFrames),t.dropFrames=t.dropFrames%1),t.advance(1+n);var i=Date.now();t.dropFrames+=(i-e)/t.frameDuration,t.animations.length>0&&t.requestAnimationFrame()},advance:function(t){for(var n,i,a=this.animations,r=0;r<a.length;)n=a[r],i=n.chart,n.currentStep=(n.currentStep||0)+t,n.currentStep=Math.min(n.currentStep,n.numSteps),e.callback(n.render,[i,n],i),e.callback(n.onAnimationProgress,[n],i),n.currentStep>=n.numSteps?(e.callback(n.onAnimationComplete,[n],i),i.animating=!1,a.splice(r,1)):++r}},Object.defineProperty(t.Animation.prototype,"animationObject",{get:function(){return this}}),Object.defineProperty(t.Animation.prototype,"chartInstance",{get:function(){return this.chart},set:function(t){this.chart=t}})}},{}],22:[function(t,e,n){"use strict";e.exports=function(t){var e=t.canvasHelpers={};e.drawPoint=function(e,n,i,a,r){var o,s,l,u,d,c;if("object"==typeof n&&(o=n.toString(),"[object HTMLImageElement]"===o||"[object HTMLCanvasElement]"===o))return void e.drawImage(n,a-n.width/2,r-n.height/2,n.width,n.height);if(!(isNaN(i)||i<=0)){switch(n){default:e.beginPath(),e.arc(a,r,i,0,2*Math.PI),e.closePath(),e.fill();break;case"triangle":e.beginPath(),s=3*i/Math.sqrt(3),d=s*Math.sqrt(3)/2,e.moveTo(a-s/2,r+d/3),e.lineTo(a+s/2,r+d/3),e.lineTo(a,r-2*d/3),e.closePath(),e.fill();break;case"rect":c=1/Math.SQRT2*i,e.beginPath(),e.fillRect(a-c,r-c,2*c,2*c),e.strokeRect(a-c,r-c,2*c,2*c);break;case"rectRounded":var h=i/Math.SQRT2,f=a-h,g=r-h,p=Math.SQRT2*i;t.helpers.drawRoundedRectangle(e,f,g,p,p,i/2),e.fill();break;case"rectRot":c=1/Math.SQRT2*i,e.beginPath(),e.moveTo(a-c,r),e.lineTo(a,r+c),e.lineTo(a+c,r),e.lineTo(a,r-c),e.closePath(),e.fill();break;case"cross":e.beginPath(),e.moveTo(a,r+i),e.lineTo(a,r-i),e.moveTo(a-i,r),e.lineTo(a+i,r),e.closePath();break;case"crossRot":e.beginPath(),l=Math.cos(Math.PI/4)*i,u=Math.sin(Math.PI/4)*i,e.moveTo(a-l,r-u),e.lineTo(a+l,r+u),e.moveTo(a-l,r+u),e.lineTo(a+l,r-u),e.closePath();break;case"star":e.beginPath(),e.moveTo(a,r+i),e.lineTo(a,r-i),e.moveTo(a-i,r),e.lineTo(a+i,r),l=Math.cos(Math.PI/4)*i,u=Math.sin(Math.PI/4)*i,e.moveTo(a-l,r-u),e.lineTo(a+l,r+u),e.moveTo(a-l,r+u),e.lineTo(a+l,r-u),e.closePath();break;case"line":e.beginPath(),e.moveTo(a-i,r),e.lineTo(a+i,r),e.closePath();break;case"dash":e.beginPath(),e.moveTo(a,r),e.lineTo(a+i,r),e.closePath()}e.stroke()}},e.clipArea=function(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()},e.unclipArea=function(t){t.restore()},e.lineTo=function(t,e,n,i){return n.steppedLine?("after"===n.steppedLine?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y),void t.lineTo(n.x,n.y)):n.tension?void t.bezierCurveTo(i?e.controlPointPreviousX:e.controlPointNextX,i?e.controlPointPreviousY:e.controlPointNextY,i?n.controlPointNextX:n.controlPointPreviousX,i?n.controlPointNextY:n.controlPointPreviousY,n.x,n.y):void t.lineTo(n.x,n.y)},t.helpers.canvas=e}},{}],23:[function(t,e,n){"use strict";e.exports=function(t){function e(e){e=e||{};var n=e.data=e.data||{};return n.datasets=n.datasets||[],n.labels=n.labels||[],e.options=a.configMerge(t.defaults.global,t.defaults[e.type],e.options||{}),e}function n(t){var e=t.options;e.scale?t.scale.options=e.scale:e.scales&&e.scales.xAxes.concat(e.scales.yAxes).forEach(function(e){t.scales[e.id].options=e}),t.tooltip._options=e.tooltips}function i(t){return"top"===t||"bottom"===t}var a=t.helpers,r=t.plugins,o=t.platform;t.types={},t.instances={},t.controllers={},a.extend(t.prototype,{construct:function(n,i){var r=this;i=e(i);var s=o.acquireContext(n,i),l=s&&s.canvas,u=l&&l.height,d=l&&l.width;return r.id=a.uid(),r.ctx=s,r.canvas=l,r.config=i,r.width=d,r.height=u,r.aspectRatio=u?d/u:null,r.options=i.options,r._bufferedRender=!1,r.chart=r,r.controller=r,t.instances[r.id]=r,Object.defineProperty(r,"data",{get:function(){return r.config.data},set:function(t){r.config.data=t}}),s&&l?(r.initialize(),void r.update()):void console.error("Failed to create chart: can't acquire context from the given item")},initialize:function(){var t=this;return r.notify(t,"beforeInit"),a.retinaScale(t),t.bindEvents(),t.options.responsive&&t.resize(!0),t.ensureScalesHaveIDs(),t.buildScales(),t.initToolTip(),r.notify(t,"afterInit"),t},clear:function(){return a.clear(this),this},stop:function(){return t.animationService.cancelAnimation(this),this},resize:function(t){var e=this,n=e.options,i=e.canvas,o=n.maintainAspectRatio&&e.aspectRatio||null,s=Math.floor(a.getMaximumWidth(i)),l=Math.floor(o?s/o:a.getMaximumHeight(i));if((e.width!==s||e.height!==l)&&(i.width=e.width=s,i.height=e.height=l,i.style.width=s+"px",i.style.height=l+"px",a.retinaScale(e),!t)){var u={width:s,height:l};r.notify(e,"resize",[u]),e.options.onResize&&e.options.onResize(e,u),e.stop(),e.update(e.options.responsiveAnimationDuration)}},ensureScalesHaveIDs:function(){var t=this.options,e=t.scales||{},n=t.scale;a.each(e.xAxes,function(t,e){t.id=t.id||"x-axis-"+e}),a.each(e.yAxes,function(t,e){t.id=t.id||"y-axis-"+e}),n&&(n.id=n.id||"scale")},buildScales:function(){var e=this,n=e.options,r=e.scales={},o=[];n.scales&&(o=o.concat((n.scales.xAxes||[]).map(function(t){return{options:t,dtype:"category",dposition:"bottom"}}),(n.scales.yAxes||[]).map(function(t){return{options:t,dtype:"linear",dposition:"left"}}))),n.scale&&o.push({options:n.scale,dtype:"radialLinear",isDefault:!0,dposition:"chartArea"}),a.each(o,function(n){var o=n.options,s=a.getValueOrDefault(o.type,n.dtype),l=t.scaleService.getScaleConstructor(s);if(l){i(o.position)!==i(n.dposition)&&(o.position=n.dposition);var u=new l({id:o.id,options:o,ctx:e.ctx,chart:e});r[u.id]=u,n.isDefault&&(e.scale=u)}}),t.scaleService.addScalesToLayout(this)},buildOrUpdateControllers:function(){var e=this,n=[],i=[];if(a.each(e.data.datasets,function(a,r){var o=e.getDatasetMeta(r);if(o.type||(o.type=a.type||e.config.type),n.push(o.type),o.controller)o.controller.updateIndex(r);else{var s=t.controllers[o.type];if(void 0===s)throw new Error('"'+o.type+'" is not a chart type.');o.controller=new s(e,r),i.push(o.controller)}},e),n.length>1)for(var r=1;r<n.length;r++)if(n[r]!==n[r-1]){e.isCombo=!0;break}return i},resetElements:function(){var t=this;a.each(t.data.datasets,function(e,n){t.getDatasetMeta(n).controller.reset()},t)},reset:function(){this.resetElements(),this.tooltip.initialize()},update:function(t,e){var i=this;if(n(i),r.notify(i,"beforeUpdate")!==!1){i.tooltip._data=i.data;var o=i.buildOrUpdateControllers();a.each(i.data.datasets,function(t,e){i.getDatasetMeta(e).controller.buildOrUpdateElements()},i),i.updateLayout(),a.each(o,function(t){t.reset()}),i.updateDatasets(),r.notify(i,"afterUpdate"),i._bufferedRender?i._bufferedRequest={lazy:e,duration:t}:i.render(t,e)}},updateLayout:function(){var e=this;r.notify(e,"beforeLayout")!==!1&&(t.layoutService.update(this,this.width,this.height),r.notify(e,"afterScaleUpdate"),r.notify(e,"afterLayout"))},updateDatasets:function(){var t=this;if(r.notify(t,"beforeDatasetsUpdate")!==!1){for(var e=0,n=t.data.datasets.length;e<n;++e)t.updateDataset(e);r.notify(t,"afterDatasetsUpdate")}},updateDataset:function(t){var e=this,n=e.getDatasetMeta(t),i={meta:n,index:t};r.notify(e,"beforeDatasetUpdate",[i])!==!1&&(n.controller.update(),r.notify(e,"afterDatasetUpdate",[i]))},render:function(e,n){var i=this;if(r.notify(i,"beforeRender")!==!1){var o=i.options.animation,s=function(t){r.notify(i,"afterRender"),a.callback(o&&o.onComplete,[t],i)};if(o&&("undefined"!=typeof e&&0!==e||"undefined"==typeof e&&0!==o.duration)){var l=new t.Animation({numSteps:(e||o.duration)/16.66,easing:o.easing,render:function(t,e){var n=a.easingEffects[e.easing],i=e.currentStep,r=i/e.numSteps;t.draw(n(r),r,i)},onAnimationProgress:o.onProgress,onAnimationComplete:s});t.animationService.addAnimation(i,l,e,n)}else i.draw(),s(new t.Animation({numSteps:0,chart:i}));return i}},draw:function(t){var e=this;e.clear(),void 0!==t&&null!==t||(t=1),e.transition(t),r.notify(e,"beforeDraw",[t])!==!1&&(a.each(e.boxes,function(t){t.draw(e.chartArea)},e),e.scale&&e.scale.draw(),e.drawDatasets(t),e.tooltip.draw(),r.notify(e,"afterDraw",[t]))},transition:function(t){for(var e=this,n=0,i=(e.data.datasets||[]).length;n<i;++n)e.isDatasetVisible(n)&&e.getDatasetMeta(n).controller.transition(t);e.tooltip.transition(t)},drawDatasets:function(t){var e=this;if(r.notify(e,"beforeDatasetsDraw",[t])!==!1){for(var n=(e.data.datasets||[]).length-1;n>=0;--n)e.isDatasetVisible(n)&&e.drawDataset(n,t);r.notify(e,"afterDatasetsDraw",[t])}},drawDataset:function(t,e){var n=this,i=n.getDatasetMeta(t),a={meta:i,index:t,easingValue:e};r.notify(n,"beforeDatasetDraw",[a])!==!1&&(i.controller.draw(e),r.notify(n,"afterDatasetDraw",[a]))},getElementAtEvent:function(e){return t.Interaction.modes.single(this,e)},getElementsAtEvent:function(e){return t.Interaction.modes.label(this,e,{intersect:!0})},getElementsAtXAxis:function(e){return t.Interaction.modes["x-axis"](this,e,{intersect:!0})},getElementsAtEventForMode:function(e,n,i){var a=t.Interaction.modes[n];return"function"==typeof a?a(this,e,i):[]},getDatasetAtEvent:function(e){return t.Interaction.modes.dataset(this,e,{intersect:!0})},getDatasetMeta:function(t){var e=this,n=e.data.datasets[t];n._meta||(n._meta={});var i=n._meta[e.id];return i||(i=n._meta[e.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,n=this.data.datasets.length;e<n;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){var e,n,i,s=this,l=s.canvas;for(s.stop(),n=0,i=s.data.datasets.length;n<i;++n)e=s.getDatasetMeta(n),e.controller&&(e.controller.destroy(),e.controller=null);l&&(s.unbindEvents(),a.clear(s),o.releaseContext(s.ctx),s.canvas=null,s.ctx=null),r.notify(s,"destroy"),delete t.instances[s.id]},toBase64Image:function(){return this.canvas.toDataURL.apply(this.canvas,arguments)},initToolTip:function(){var e=this;e.tooltip=new t.Tooltip({_chart:e,_chartInstance:e,_data:e.data,_options:e.options.tooltips},e),e.tooltip.initialize()},bindEvents:function(){var t=this,e=t._listeners={},n=function(){t.eventHandler.apply(t,arguments)};a.each(t.options.events,function(i){o.addEventListener(t,i,n),e[i]=n}),t.options.responsive&&(n=function(){t.resize()},o.addEventListener(t,"resize",n),e.resize=n)},unbindEvents:function(){var t=this,e=t._listeners;e&&(delete t._listeners,a.each(e,function(e,n){o.removeEventListener(t,n,e)}))},updateHoverStyle:function(t,e,n){var i,a,r,o=n?"setHoverStyle":"removeHoverStyle";for(a=0,r=t.length;a<r;++a)i=t[a],i&&this.getDatasetMeta(i._datasetIndex).controller[o](i)},eventHandler:function(t){var e=this,n=e.tooltip;if(r.notify(e,"beforeEvent",[t])!==!1){e._bufferedRender=!0,e._bufferedRequest=null;var i=e.handleEvent(t);i|=n&&n.handleEvent(t),r.notify(e,"afterEvent",[t]);var a=e._bufferedRequest;return a?e.render(a.duration,a.lazy):i&&!e.animating&&(e.stop(),e.render(e.options.hover.animationDuration,!0)),e._bufferedRender=!1,e._bufferedRequest=null,e}},handleEvent:function(t){var e=this,n=e.options||{},i=n.hover,r=!1;return e.lastActive=e.lastActive||[],"mouseout"===t.type?e.active=[]:e.active=e.getElementsAtEventForMode(t,i.mode,i),i.onHover&&i.onHover.call(e,t.native,e.active),"mouseup"!==t.type&&"click"!==t.type||n.onClick&&n.onClick.call(e,t.native,e.active),e.lastActive.length&&e.updateHoverStyle(e.lastActive,i.mode,!1),e.active.length&&i.mode&&e.updateHoverStyle(e.active,i.mode,!0),r=!a.arrayEquals(e.active,e.lastActive),e.lastActive=e.active,r}}),t.Controller=t}},{}],24:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return t._chartjs?void t._chartjs.listeners.push(e):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),void a.forEach(function(e){var n="onData"+e.charAt(0).toUpperCase()+e.slice(1),a=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:function(){var e=Array.prototype.slice.call(arguments),r=a.apply(this,e);return i.each(t._chartjs.listeners,function(t){"function"==typeof t[n]&&t[n].apply(t,e)}),r}})}))}function n(t,e){var n=t._chartjs;if(n){var i=n.listeners,r=i.indexOf(e);r!==-1&&i.splice(r,1),i.length>0||(a.forEach(function(e){delete t[e]}),delete t._chartjs)}}var i=t.helpers,a=["push","pop","shift","splice","unshift"];t.DatasetController=function(t,e){this.initialize(t,e)},i.extend(t.DatasetController.prototype,{datasetElementType:null,dataElementType:null,initialize:function(t,e){var n=this;n.chart=t,n.index=e,n.linkScales(),n.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this,e=t.getMeta(),n=t.getDataset();null===e.xAxisID&&(e.xAxisID=n.xAxisID||t.chart.options.scales.xAxes[0].id),null===e.yAxisID&&(e.yAxisID=n.yAxisID||t.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},reset:function(){this.update(!0)},destroy:function(){this._data&&n(this._data,this)},createMetaDataset:function(){var t=this,e=t.datasetElementType;return e&&new e({_chart:t.chart,_datasetIndex:t.index})},createMetaData:function(t){var e=this,n=e.dataElementType;return n&&new n({_chart:e.chart,_datasetIndex:e.index,_index:t})},addElements:function(){var t,e,n=this,i=n.getMeta(),a=n.getDataset().data||[],r=i.data;for(t=0,e=a.length;t<e;++t)r[t]=r[t]||n.createMetaData(t);i.dataset=i.dataset||n.createMetaDataset()},addElementAndReset:function(t){var e=this.createMetaData(t);this.getMeta().data.splice(t,0,e),this.updateElement(e,t,!0)},buildOrUpdateElements:function(){var t=this,i=t.getDataset(),a=i.data||(i.data=[]);t._data!==a&&(t._data&&n(t._data,t),e(a,t),t._data=a),t.resyncElements()},update:i.noop,transition:function(t){for(var e=this.getMeta(),n=e.data||[],i=n.length,a=0;a<i;++a)n[a].transition(t);e.dataset&&e.dataset.transition(t)},draw:function(){var t=this.getMeta(),e=t.data||[],n=e.length,i=0;for(t.dataset&&t.dataset.draw();i<n;++i)e[i].draw()},removeHoverStyle:function(t,e){var n=this.chart.data.datasets[t._datasetIndex],a=t._index,r=t.custom||{},o=i.getValueAtIndexOrDefault,s=t._model;s.backgroundColor=r.backgroundColor?r.backgroundColor:o(n.backgroundColor,a,e.backgroundColor),s.borderColor=r.borderColor?r.borderColor:o(n.borderColor,a,e.borderColor),s.borderWidth=r.borderWidth?r.borderWidth:o(n.borderWidth,a,e.borderWidth)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],n=t._index,a=t.custom||{},r=i.getValueAtIndexOrDefault,o=i.getHoverColor,s=t._model;s.backgroundColor=a.hoverBackgroundColor?a.hoverBackgroundColor:r(e.hoverBackgroundColor,n,o(s.backgroundColor)),s.borderColor=a.hoverBorderColor?a.hoverBorderColor:r(e.hoverBorderColor,n,o(s.borderColor)),s.borderWidth=a.hoverBorderWidth?a.hoverBorderWidth:r(e.hoverBorderWidth,n,s.borderWidth)},resyncElements:function(){var t=this,e=t.getMeta(),n=t.getDataset().data,i=e.data.length,a=n.length;a<i?e.data.splice(a,i-a):a>i&&t.insertElements(i,a-i)},insertElements:function(t,e){for(var n=0;n<e;++n)this.addElementAndReset(t+n)},onDataPush:function(){this.insertElements(this.getDataset().data.length-1,arguments.length)},onDataPop:function(){this.getMeta().data.pop()},onDataShift:function(){this.getMeta().data.shift()},onDataSplice:function(t,e){this.getMeta().data.splice(t,e),this.insertElements(t,arguments.length-2)},onDataUnshift:function(){this.insertElements(0,arguments.length)}}),t.DatasetController.extend=i.inherits}},{}],25:[function(t,e,n){"use strict";var i=t(2);e.exports=function(t){function e(t,e,n,a){var r,o,s,l,u,d,c,h,f,g=Object.keys(n);for(r=0,o=g.length;r<o;++r)if(s=g[r],d=n[s],e.hasOwnProperty(s)||(e[s]=d),l=e[s],l!==d&&"_"!==s[0]){if(t.hasOwnProperty(s)||(t[s]=l),u=t[s],c=typeof d,c===typeof u)if("string"===c){if(h=i(u),h.valid&&(f=i(d),f.valid)){e[s]=f.mix(h,a).rgbString();continue}}else if("number"===c&&isFinite(u)&&isFinite(d)){e[s]=u+(d-u)*a;continue}e[s]=d}}var n=t.helpers;t.elements={},t.Element=function(t){n.extend(this,t),this.initialize.apply(this,arguments)},n.extend(t.Element.prototype,{initialize:function(){this.hidden=!1},pivot:function(){var t=this;return t._view||(t._view=n.clone(t._model)),t._start={},t},transition:function(t){var n=this,i=n._model,a=n._start,r=n._view;return i&&1!==t?(r||(r=n._view={}),a||(a=n._start={}),e(a,r,i,t),n):(n._view=i,n._start=null,n)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return n.isNumber(this._model.x)&&n.isNumber(this._model.y)}}),t.Element.extend=n.inherits}},{2:2}],26:[function(t,e,n){"use strict";var i=t(2);e.exports=function(t){function e(t,e,n){var i;return"string"==typeof t?(i=parseInt(t,10),t.indexOf("%")!==-1&&(i=i/100*e.parentNode[n])):i=t,i}function n(t){return void 0!==t&&null!==t&&"none"!==t}function a(t,i,a){var r=document.defaultView,o=t.parentNode,s=r.getComputedStyle(t)[i],l=r.getComputedStyle(o)[i],u=n(s),d=n(l),c=Number.POSITIVE_INFINITY;return u||d?Math.min(u?e(s,t,a):c,d?e(l,o,a):c):"none"}var r=t.helpers={};r.each=function(t,e,n,i){var a,o;if(r.isArray(t))if(o=t.length,i)for(a=o-1;a>=0;a--)e.call(n,t[a],a);else for(a=0;a<o;a++)e.call(n,t[a],a);else if("object"==typeof t){var s=Object.keys(t);for(o=s.length,a=0;a<o;a++)e.call(n,t[s[a]],s[a])}},r.clone=function(t){var e={};return r.each(t,function(t,n){r.isArray(t)?e[n]=t.slice(0):"object"==typeof t&&null!==t?e[n]=r.clone(t):e[n]=t}),e},r.extend=function(t){for(var e=function(e,n){t[n]=e},n=1,i=arguments.length;n<i;n++)r.each(arguments[n],e);return t},r.configMerge=function(e){var n=r.clone(e);return r.each(Array.prototype.slice.call(arguments,1),function(e){r.each(e,function(e,i){var a=n.hasOwnProperty(i),o=a?n[i]:{};"scales"===i?n[i]=r.scaleMerge(o,e):"scale"===i?n[i]=r.configMerge(o,t.scaleService.getScaleDefaults(e.type),e):!a||"object"!=typeof o||r.isArray(o)||null===o||"object"!=typeof e||r.isArray(e)?n[i]=e:n[i]=r.configMerge(o,e)})}),n},r.scaleMerge=function(e,n){var i=r.clone(e);return r.each(n,function(e,n){"xAxes"===n||"yAxes"===n?i.hasOwnProperty(n)?r.each(e,function(e,a){var o=r.getValueOrDefault(e.type,"xAxes"===n?"category":"linear"),s=t.scaleService.getScaleDefaults(o);a>=i[n].length||!i[n][a].type?i[n].push(r.configMerge(s,e)):e.type&&e.type!==i[n][a].type?i[n][a]=r.configMerge(i[n][a],s,e):i[n][a]=r.configMerge(i[n][a],e)}):(i[n]=[],r.each(e,function(e){var a=r.getValueOrDefault(e.type,"xAxes"===n?"category":"linear");i[n].push(r.configMerge(t.scaleService.getScaleDefaults(a),e))})):i.hasOwnProperty(n)&&"object"==typeof i[n]&&null!==i[n]&&"object"==typeof e?i[n]=r.configMerge(i[n],e):i[n]=e}),i},r.getValueAtIndexOrDefault=function(t,e,n){return void 0===t||null===t?n:r.isArray(t)?e<t.length?t[e]:n:t},r.getValueOrDefault=function(t,e){return void 0===t?e:t},r.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var n=0,i=t.length;n<i;++n)if(t[n]===e)return n;return-1},r.where=function(t,e){if(r.isArray(t)&&Array.prototype.filter)return t.filter(e);var n=[];return r.each(t,function(t){e(t)&&n.push(t)}),n},r.findIndex=Array.prototype.findIndex?function(t,e,n){return t.findIndex(e,n)}:function(t,e,n){n=void 0===n?t:n;for(var i=0,a=t.length;i<a;++i)if(e.call(n,t[i],i,t))return i;return-1},r.findNextWhere=function(t,e,n){void 0!==n&&null!==n||(n=-1);for(var i=n+1;i<t.length;i++){var a=t[i];if(e(a))return a}},r.findPreviousWhere=function(t,e,n){void 0!==n&&null!==n||(n=t.length);for(var i=n-1;i>=0;i--){var a=t[i];if(e(a))return a}},r.inherits=function(t){var e=this,n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i=function(){this.constructor=n};return i.prototype=e.prototype,n.prototype=new i,n.extend=r.inherits,t&&r.extend(n.prototype,t),n.__super__=e.prototype,n},r.noop=function(){},r.uid=function(){var t=0;return function(){return t++}}(),r.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},r.almostEquals=function(t,e,n){return Math.abs(t-e)<n},r.almostWhole=function(t,e){var n=Math.round(t);return n-e<t&&n+e>t},r.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},r.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},r.sign=Math.sign?function(t){return Math.sign(t)}:function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1},r.log10=Math.log10?function(t){return Math.log10(t)}:function(t){return Math.log(t)/Math.LN10},r.toRadians=function(t){return t*(Math.PI/180)},r.toDegrees=function(t){return t*(180/Math.PI)},r.getAngleFromPoint=function(t,e){var n=e.x-t.x,i=e.y-t.y,a=Math.sqrt(n*n+i*i),r=Math.atan2(i,n);return r<-.5*Math.PI&&(r+=2*Math.PI),{angle:r,distance:a}},r.distanceBetweenPoints=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},r.aliasPixel=function(t){return t%2===0?0:.5},r.splineCurve=function(t,e,n,i){var a=t.skip?e:t,r=e,o=n.skip?e:n,s=Math.sqrt(Math.pow(r.x-a.x,2)+Math.pow(r.y-a.y,2)),l=Math.sqrt(Math.pow(o.x-r.x,2)+Math.pow(o.y-r.y,2)),u=s/(s+l),d=l/(s+l);u=isNaN(u)?0:u,d=isNaN(d)?0:d;var c=i*u,h=i*d;return{previous:{x:r.x-c*(o.x-a.x),y:r.y-c*(o.y-a.y)},next:{x:r.x+h*(o.x-a.x),y:r.y+h*(o.y-a.y)}}},r.EPSILON=Number.EPSILON||1e-14,r.splineCurveMonotone=function(t){var e,n,i,a,o=(t||[]).map(function(t){return{model:t._model,deltaK:0,mK:0}}),s=o.length;for(e=0;e<s;++e)if(i=o[e],!i.model.skip){if(n=e>0?o[e-1]:null,a=e<s-1?o[e+1]:null,a&&!a.model.skip){var l=a.model.x-i.model.x;i.deltaK=0!==l?(a.model.y-i.model.y)/l:0}!n||n.model.skip?i.mK=i.deltaK:!a||a.model.skip?i.mK=n.deltaK:this.sign(n.deltaK)!==this.sign(i.deltaK)?i.mK=0:i.mK=(n.deltaK+i.deltaK)/2}var u,d,c,h;for(e=0;e<s-1;++e)i=o[e],a=o[e+1],i.model.skip||a.model.skip||(r.almostEquals(i.deltaK,0,this.EPSILON)?i.mK=a.mK=0:(u=i.mK/i.deltaK,d=a.mK/i.deltaK,h=Math.pow(u,2)+Math.pow(d,2),h<=9||(c=3/Math.sqrt(h),i.mK=u*c*i.deltaK,a.mK=d*c*i.deltaK)));var f;for(e=0;e<s;++e)i=o[e],i.model.skip||(n=e>0?o[e-1]:null,a=e<s-1?o[e+1]:null,n&&!n.model.skip&&(f=(i.model.x-n.model.x)/3,i.model.controlPointPreviousX=i.model.x-f,i.model.controlPointPreviousY=i.model.y-f*i.mK),a&&!a.model.skip&&(f=(a.model.x-i.model.x)/3,i.model.controlPointNextX=i.model.x+f,i.model.controlPointNextY=i.model.y+f*i.mK))},r.nextItem=function(t,e,n){return n?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},r.previousItem=function(t,e,n){return n?e<=0?t[t.length-1]:t[e-1]:e<=0?t[0]:t[e-1]},r.niceNum=function(t,e){var n,i=Math.floor(r.log10(t)),a=t/Math.pow(10,i);return n=e?a<1.5?1:a<3?2:a<7?5:10:a<=1?1:a<=2?2:a<=5?5:10,n*Math.pow(10,i)};var o=r.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1===(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),-(i*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/n)))},easeOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1===(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/n)+1)},easeInOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:2===(t/=.5)?1:(n||(n=1*(.3*1.5)),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),t<1?-.5*(i*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/n)):i*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/n)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;
return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-o.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):t<2/2.75?1*(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return t<.5?.5*o.easeInBounce(2*t):.5*o.easeOutBounce(2*t-1)+.5}};r.requestAnimFrame=function(){return"undefined"==typeof window?function(t){t()}:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),r.getRelativePosition=function(t,e){var n,i,a=t.originalEvent||t,o=t.currentTarget||t.srcElement,s=o.getBoundingClientRect(),l=a.touches;l&&l.length>0?(n=l[0].clientX,i=l[0].clientY):(n=a.clientX,i=a.clientY);var u=parseFloat(r.getStyle(o,"padding-left")),d=parseFloat(r.getStyle(o,"padding-top")),c=parseFloat(r.getStyle(o,"padding-right")),h=parseFloat(r.getStyle(o,"padding-bottom")),f=s.right-s.left-u-c,g=s.bottom-s.top-d-h;return n=Math.round((n-s.left-u)/f*o.width/e.currentDevicePixelRatio),i=Math.round((i-s.top-d)/g*o.height/e.currentDevicePixelRatio),{x:n,y:i}},r.addEvent=function(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n},r.removeEvent=function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=r.noop},r.getConstraintWidth=function(t){return a(t,"max-width","clientWidth")},r.getConstraintHeight=function(t){return a(t,"max-height","clientHeight")},r.getMaximumWidth=function(t){var e=t.parentNode,n=parseInt(r.getStyle(e,"padding-left"),10),i=parseInt(r.getStyle(e,"padding-right"),10),a=e.clientWidth-n-i,o=r.getConstraintWidth(t);return isNaN(o)?a:Math.min(a,o)},r.getMaximumHeight=function(t){var e=t.parentNode,n=parseInt(r.getStyle(e,"padding-top"),10),i=parseInt(r.getStyle(e,"padding-bottom"),10),a=e.clientHeight-n-i,o=r.getConstraintHeight(t);return isNaN(o)?a:Math.min(a,o)},r.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},r.retinaScale=function(t){var e=t.currentDevicePixelRatio=window.devicePixelRatio||1;if(1!==e){var n=t.canvas,i=t.height,a=t.width;n.height=i*e,n.width=a*e,t.ctx.scale(e,e),n.style.height=i+"px",n.style.width=a+"px"}},r.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},r.fontString=function(t,e,n){return e+" "+t+"px "+n},r.longestText=function(t,e,n,i){i=i||{};var a=i.data=i.data||{},o=i.garbageCollect=i.garbageCollect||[];i.font!==e&&(a=i.data={},o=i.garbageCollect=[],i.font=e),t.font=e;var s=0;r.each(n,function(e){void 0!==e&&null!==e&&r.isArray(e)!==!0?s=r.measureText(t,a,o,s,e):r.isArray(e)&&r.each(e,function(e){void 0===e||null===e||r.isArray(e)||(s=r.measureText(t,a,o,s,e))})});var l=o.length/2;if(l>n.length){for(var u=0;u<l;u++)delete a[o[u]];o.splice(0,l)}return s},r.measureText=function(t,e,n,i,a){var r=e[a];return r||(r=e[a]=t.measureText(a).width,n.push(a)),r>i&&(i=r),i},r.numberOfLabelLines=function(t){var e=1;return r.each(t,function(t){r.isArray(t)&&t.length>e&&(e=t.length)}),e},r.drawRoundedRectangle=function(t,e,n,i,a,r){t.beginPath(),t.moveTo(e+r,n),t.lineTo(e+i-r,n),t.quadraticCurveTo(e+i,n,e+i,n+r),t.lineTo(e+i,n+a-r),t.quadraticCurveTo(e+i,n+a,e+i-r,n+a),t.lineTo(e+r,n+a),t.quadraticCurveTo(e,n+a,e,n+a-r),t.lineTo(e,n+r),t.quadraticCurveTo(e,n,e+r,n),t.closePath()},r.color=i?function(e){return e instanceof CanvasGradient&&(e=t.defaults.global.defaultColor),i(e)}:function(t){return console.error("Color.js not found!"),t},r.isArray=Array.isArray?function(t){return Array.isArray(t)}:function(t){return"[object Array]"===Object.prototype.toString.call(t)},r.arrayEquals=function(t,e){var n,i,a,o;if(!t||!e||t.length!==e.length)return!1;for(n=0,i=t.length;n<i;++n)if(a=t[n],o=e[n],a instanceof Array&&o instanceof Array){if(!r.arrayEquals(a,o))return!1}else if(a!==o)return!1;return!0},r.callback=function(t,e,n){t&&"function"==typeof t.call&&t.apply(n,e)},r.getHoverColor=function(t){return t instanceof CanvasPattern?t:r.color(t).saturate(.5).darken(.1).rgbString()},r.callCallback=r.callback}},{2:2}],27:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return t.native?{x:t.x,y:t.y}:o.getRelativePosition(t,e)}function n(t,e){var n,i,a,r,o,s=t.data.datasets;for(i=0,r=s.length;i<r;++i)if(t.isDatasetVisible(i))for(n=t.getDatasetMeta(i),a=0,o=n.data.length;a<o;++a){var l=n.data[a];l._view.skip||e(l)}}function i(t,e){var i=[];return n(t,function(t){t.inRange(e.x,e.y)&&i.push(t)}),i}function a(t,e,i,a){var r=Number.POSITIVE_INFINITY,s=[];return a||(a=o.distanceBetweenPoints),n(t,function(t){if(!i||t.inRange(e.x,e.y)){var n=t.getCenterPoint(),o=a(e,n);o<r?(s=[t],r=o):o===r&&s.push(t)}}),s}function r(t,n,r){var o=e(n,t),s=function(t,e){return Math.abs(t.x-e.x)},l=r.intersect?i(t,o):a(t,o,!1,s),u=[];return l.length?(t.data.datasets.forEach(function(e,n){if(t.isDatasetVisible(n)){var i=t.getDatasetMeta(n),a=i.data[l[0]._index];a&&!a._view.skip&&u.push(a)}}),u):[]}var o=t.helpers;t.Interaction={modes:{single:function(t,i){var a=e(i,t),r=[];return n(t,function(t){if(t.inRange(a.x,a.y))return r.push(t),r}),r.slice(0,1)},label:r,index:r,dataset:function(t,n,r){var o=e(n,t),s=r.intersect?i(t,o):a(t,o,!1);return s.length>0&&(s=t.getDatasetMeta(s[0]._datasetIndex).data),s},"x-axis":function(t,e){return r(t,e,!0)},point:function(t,n){var a=e(n,t);return i(t,a)},nearest:function(t,n,i){var r=e(n,t),o=a(t,r,i.intersect);return o.length>1&&o.sort(function(t,e){var n=t.getArea(),i=e.getArea(),a=n-i;return 0===a&&(a=t._datasetIndex-e._datasetIndex),a}),o.slice(0,1)},x:function(t,i,a){var r=e(i,t),o=[],s=!1;return n(t,function(t){t.inXRange(r.x)&&o.push(t),t.inRange(r.x,r.y)&&(s=!0)}),a.intersect&&!s&&(o=[]),o},y:function(t,i,a){var r=e(i,t),o=[],s=!1;return n(t,function(t){t.inYRange(r.y)&&o.push(t),t.inRange(r.x,r.y)&&(s=!0)}),a.intersect&&!s&&(o=[]),o}}}}},{}],28:[function(t,e,n){"use strict";e.exports=function(){var t=function(t,e){return this.construct(t,e),this};return t.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"nearest",intersect:!0,animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var n=0;n<t.data.datasets.length;n++)e.push('<li><span style="background-color:'+t.data.datasets[n].backgroundColor+'"></span>'),t.data.datasets[n].label&&e.push(t.data.datasets[n].label),e.push("</li>");return e.push("</ul>"),e.join("")}}},t.Chart=t,t}},{}],29:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return i.where(t,function(t){return t.position===e})}function n(t,e){t.forEach(function(t,e){return t._tmpIndex_=e,t}),t.sort(function(t,n){var i=e?n:t,a=e?t:n;return i.weight===a.weight?i._tmpIndex_-a._tmpIndex_:i.weight-a.weight}),t.forEach(function(t){delete t._tmpIndex_})}var i=t.helpers;t.layoutService={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),e.fullWidth=e.fullWidth||!1,e.position=e.position||"top",e.weight=e.weight||0,t.boxes.push(e)},removeBox:function(t,e){var n=t.boxes?t.boxes.indexOf(e):-1;n!==-1&&t.boxes.splice(n,1)},configure:function(t,e,n){for(var i,a=["fullWidth","position","weight"],r=a.length,o=0;o<r;++o)i=a[o],n.hasOwnProperty(i)&&(e[i]=n[i])},update:function(t,a,r){function o(t){var e,n=t.isHorizontal();n?(e=t.update(t.fullWidth?_:C,D),P-=e.height):(e=t.update(S,M),C-=e.width),T.push({horizontal:n,minSize:e,box:t})}function s(t){var e=i.findNextWhere(T,function(e){return e.box===t});if(e)if(t.isHorizontal()){var n={left:Math.max(R,I),right:Math.max(L,A),top:0,bottom:0};t.update(t.fullWidth?_:C,k/2,n)}else t.update(e.minSize.width,P)}function l(t){var e=i.findNextWhere(T,function(e){return e.box===t}),n={left:0,right:0,top:V,bottom:W};e&&t.update(e.minSize.width,P,n)}function u(t){t.isHorizontal()?(t.left=t.fullWidth?h:R,t.right=t.fullWidth?a-f:R+C,t.top=H,t.bottom=H+t.height,H=t.bottom):(t.left=E,t.right=E+t.width,t.top=V,t.bottom=V+P,E=t.right)}if(t){var d=t.options.layout,c=d?d.padding:null,h=0,f=0,g=0,p=0;isNaN(c)?(h=c.left||0,f=c.right||0,g=c.top||0,p=c.bottom||0):(h=c,f=c,g=c,p=c);var m=e(t.boxes,"left"),v=e(t.boxes,"right"),y=e(t.boxes,"top"),b=e(t.boxes,"bottom"),x=e(t.boxes,"chartArea");n(m,!0),n(v,!1),n(y,!0),n(b,!1);var _=a-h-f,k=r-g-p,w=_/2,M=k/2,S=(a-w)/(m.length+v.length),D=(r-M)/(y.length+b.length),C=_,P=k,T=[];i.each(m.concat(v,y,b),o);var I=0,A=0,F=0,O=0;i.each(y.concat(b),function(t){if(t.getPadding){var e=t.getPadding();I=Math.max(I,e.left),A=Math.max(A,e.right)}}),i.each(m.concat(v),function(t){if(t.getPadding){var e=t.getPadding();F=Math.max(F,e.top),O=Math.max(O,e.bottom)}});var R=h,L=f,V=g,W=p;i.each(m.concat(v),s),i.each(m,function(t){R+=t.width}),i.each(v,function(t){L+=t.width}),i.each(y.concat(b),s),i.each(y,function(t){V+=t.height}),i.each(b,function(t){W+=t.height}),i.each(m.concat(v),l),R=h,L=f,V=g,W=p,i.each(m,function(t){R+=t.width}),i.each(v,function(t){L+=t.width}),i.each(y,function(t){V+=t.height}),i.each(b,function(t){W+=t.height});var Y=Math.max(I-R,0);R+=Y,L+=Math.max(A-L,0);var z=Math.max(F-V,0);V+=z,W+=Math.max(O-W,0);var N=r-V-W,B=a-R-L;B===C&&N===P||(i.each(m,function(t){t.height=N}),i.each(v,function(t){t.height=N}),i.each(y,function(t){t.fullWidth||(t.width=B)}),i.each(b,function(t){t.fullWidth||(t.width=B)}),P=N,C=B);var E=h+Y,H=g+z;i.each(m.concat(y),u),E+=C,H+=P,i.each(v,u),i.each(b,u),t.chartArea={left:R,top:V,right:R+C,bottom:V+P},i.each(x,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(C,P)})}}}}},{}],30:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.plugins={},t.plugins={_plugins:[],_cacheId:0,register:function(t){var e=this._plugins;[].concat(t).forEach(function(t){e.indexOf(t)===-1&&e.push(t)}),this._cacheId++},unregister:function(t){var e=this._plugins;[].concat(t).forEach(function(t){var n=e.indexOf(t);n!==-1&&e.splice(n,1)}),this._cacheId++},clear:function(){this._plugins=[],this._cacheId++},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(t,e,n){var i,a,r,o,s,l=this.descriptors(t),u=l.length;for(i=0;i<u;++i)if(a=l[i],r=a.plugin,s=r[e],"function"==typeof s&&(o=[t].concat(n||[]),o.push(a.options),s.apply(r,o)===!1))return!1;return!0},descriptors:function(n){var i=n._plugins||(n._plugins={});if(i.id===this._cacheId)return i.descriptors;var a=[],r=[],o=n&&n.config||{},s=t.defaults.global.plugins,l=o.options&&o.options.plugins||{};return this._plugins.concat(o.plugins||[]).forEach(function(t){var n=a.indexOf(t);if(n===-1){var i=t.id,o=l[i];o!==!1&&(o===!0&&(o=e.clone(s[i])),a.push(t),r.push({plugin:t,options:o||{}}))}}),i.descriptors=r,i.id=this._cacheId,r}},t.pluginService=t.plugins,t.PluginBase=t.Element.extend({})}},{}],31:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e,n){return i.isArray(e)?i.longestText(t,n,e):t.measureText(e).width}function n(e){var n=i.getValueOrDefault,a=t.defaults.global,r=n(e.fontSize,a.defaultFontSize),o=n(e.fontStyle,a.defaultFontStyle),s=n(e.fontFamily,a.defaultFontFamily);return{size:r,style:o,family:s,font:i.fontString(r,o,s)}}var i=t.helpers;t.defaults.scale={display:!0,position:"left",gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",zeroLineBorderDash:[],zeroLineBorderDashOffset:0,offsetGridLines:!1,borderDash:[],borderDashOffset:0},scaleLabel:{labelString:"",display:!1},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:0,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:t.Ticks.formatters.values}},t.Scale=t.Element.extend({getPadding:function(){var t=this;return{left:t.paddingLeft||0,top:t.paddingTop||0,right:t.paddingRight||0,bottom:t.paddingBottom||0}},beforeUpdate:function(){i.callback(this.options.beforeUpdate,[this])},update:function(t,e,n){var a=this;return a.beforeUpdate(),a.maxWidth=t,a.maxHeight=e,a.margins=i.extend({left:0,right:0,top:0,bottom:0},n),a.longestTextCache=a.longestTextCache||{},a.beforeSetDimensions(),a.setDimensions(),a.afterSetDimensions(),a.beforeDataLimits(),a.determineDataLimits(),a.afterDataLimits(),a.beforeBuildTicks(),a.buildTicks(),a.afterBuildTicks(),a.beforeTickToLabelConversion(),a.convertTicksToLabels(),a.afterTickToLabelConversion(),a.beforeCalculateTickRotation(),a.calculateTickRotation(),a.afterCalculateTickRotation(),a.beforeFit(),a.fit(),a.afterFit(),a.afterUpdate(),a.minSize},afterUpdate:function(){i.callback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){i.callback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0},afterSetDimensions:function(){i.callback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){i.callback(this.options.beforeDataLimits,[this])},determineDataLimits:i.noop,afterDataLimits:function(){i.callback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){i.callback(this.options.beforeBuildTicks,[this])},buildTicks:i.noop,afterBuildTicks:function(){i.callback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){i.callback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var t=this,e=t.options.ticks;t.ticks=t.ticks.map(e.userCallback||e.callback)},afterTickToLabelConversion:function(){i.callback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){i.callback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var t=this,e=t.ctx,a=t.options.ticks,r=n(a);e.font=r.font;var o=a.minRotation||0;if(t.options.display&&t.isHorizontal())for(var s,l,u=i.longestText(e,r.font,t.ticks,t.longestTextCache),d=u,c=t.getPixelForTick(1)-t.getPixelForTick(0)-6;d>c&&o<a.maxRotation;){var h=i.toRadians(o);if(s=Math.cos(h),l=Math.sin(h),l*u>t.maxHeight){o--;break}o++,d=s*u}t.labelRotation=o},afterCalculateTickRotation:function(){i.callback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){i.callback(this.options.beforeFit,[this])},fit:function(){var t=this,a=t.minSize={width:0,height:0},r=t.options,o=r.ticks,s=r.scaleLabel,l=r.gridLines,u=r.display,d=t.isHorizontal(),c=n(o),h=1.5*n(s).size,f=r.gridLines.tickMarkLength;if(d?a.width=t.isFullWidth()?t.maxWidth-t.margins.left-t.margins.right:t.maxWidth:a.width=u&&l.drawTicks?f:0,d?a.height=u&&l.drawTicks?f:0:a.height=t.maxHeight,s.display&&u&&(d?a.height+=h:a.width+=h),o.display&&u){var g=i.longestText(t.ctx,c.font,t.ticks,t.longestTextCache),p=i.numberOfLabelLines(t.ticks),m=.5*c.size;if(d){t.longestLabelWidth=g;var v=i.toRadians(t.labelRotation),y=Math.cos(v),b=Math.sin(v),x=b*g+c.size*p+m*p;a.height=Math.min(t.maxHeight,a.height+x),t.ctx.font=c.font;var _=t.ticks[0],k=e(t.ctx,_,c.font),w=t.ticks[t.ticks.length-1],M=e(t.ctx,w,c.font);0!==t.labelRotation?(t.paddingLeft="bottom"===r.position?y*k+3:y*m+3,t.paddingRight="bottom"===r.position?y*m+3:y*M+3):(t.paddingLeft=k/2+3,t.paddingRight=M/2+3)}else o.mirror?g=0:g+=t.options.ticks.padding,a.width=Math.min(t.maxWidth,a.width+g),t.paddingTop=c.size/2,t.paddingBottom=c.size/2}t.handleMargins(),t.width=a.width,t.height=a.height},handleMargins:function(){var t=this;t.margins&&(t.paddingLeft=Math.max(t.paddingLeft-t.margins.left,0),t.paddingTop=Math.max(t.paddingTop-t.margins.top,0),t.paddingRight=Math.max(t.paddingRight-t.margins.right,0),t.paddingBottom=Math.max(t.paddingBottom-t.margins.bottom,0))},afterFit:function(){i.callback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function(t){return null===t||"undefined"==typeof t?NaN:"number"!=typeof t||isFinite(t)?"object"==typeof t?t instanceof Date||t.isValid?t:this.getRightValue(this.isHorizontal()?t.x:t.y):t:NaN},getLabelForIndex:i.noop,getPixelForValue:i.noop,getValueForPixel:i.noop,getPixelForTick:function(t,e){var n=this;if(n.isHorizontal()){var i=n.width-(n.paddingLeft+n.paddingRight),a=i/Math.max(n.ticks.length-(n.options.gridLines.offsetGridLines?0:1),1),r=a*t+n.paddingLeft;e&&(r+=a/2);var o=n.left+Math.round(r);return o+=n.isFullWidth()?n.margins.left:0}var s=n.height-(n.paddingTop+n.paddingBottom);return n.top+t*(s/(n.ticks.length-1))},getPixelForDecimal:function(t){var e=this;if(e.isHorizontal()){var n=e.width-(e.paddingLeft+e.paddingRight),i=n*t+e.paddingLeft,a=e.left+Math.round(i);return a+=e.isFullWidth()?e.margins.left:0}return e.top+t*e.height},getBasePixel:function(){return this.getPixelForValue(this.getBaseValue())},getBaseValue:function(){var t=this,e=t.min,n=t.max;return t.beginAtZero?0:e<0&&n<0?n:e>0&&n>0?e:0},draw:function(e){var a=this,r=a.options;if(r.display){var o,s,l=a.ctx,u=t.defaults.global,d=r.ticks,c=r.gridLines,h=r.scaleLabel,f=0!==a.labelRotation,g=d.autoSkip,p=a.isHorizontal();d.maxTicksLimit&&(s=d.maxTicksLimit);var m=i.getValueOrDefault(d.fontColor,u.defaultFontColor),v=n(d),y=c.drawTicks?c.tickMarkLength:0,b=i.getValueOrDefault(h.fontColor,u.defaultFontColor),x=n(h),_=i.toRadians(a.labelRotation),k=Math.cos(_),w=a.longestLabelWidth*k;l.fillStyle=m;var M=[];if(p){if(o=!1,(w+d.autoSkipPadding)*a.ticks.length>a.width-(a.paddingLeft+a.paddingRight)&&(o=1+Math.floor((w+d.autoSkipPadding)*a.ticks.length/(a.width-(a.paddingLeft+a.paddingRight)))),s&&a.ticks.length>s)for(;!o||a.ticks.length/(o||1)>s;)o||(o=1),o+=1;g||(o=!1)}var S="right"===r.position?a.left:a.right-y,D="right"===r.position?a.left+y:a.right,C="bottom"===r.position?a.top:a.bottom-y,P="bottom"===r.position?a.top+y:a.bottom;if(i.each(a.ticks,function(t,n){if(void 0!==t&&null!==t){var s=a.ticks.length===n+1,l=o>1&&n%o>0||n%o===0&&n+o>=a.ticks.length;if((!l||s)&&void 0!==t&&null!==t){var h,g,m,v;n===("undefined"!=typeof a.zeroLineIndex?a.zeroLineIndex:0)?(h=c.zeroLineWidth,g=c.zeroLineColor,m=c.zeroLineBorderDash,v=c.zeroLineBorderDashOffset):(h=i.getValueAtIndexOrDefault(c.lineWidth,n),g=i.getValueAtIndexOrDefault(c.color,n),m=i.getValueOrDefault(c.borderDash,u.borderDash),v=i.getValueOrDefault(c.borderDashOffset,u.borderDashOffset));var b,x,k,w,T,I,A,F,O,R,L="middle",V="middle";if(p){"bottom"===r.position?(V=f?"middle":"top",L=f?"right":"center",R=a.top+y):(V=f?"middle":"bottom",L=f?"left":"center",R=a.bottom-y);var W=a.getPixelForTick(n)+i.aliasPixel(h);O=a.getPixelForTick(n,c.offsetGridLines)+d.labelOffset,b=k=T=A=W,x=C,w=P,I=e.top,F=e.bottom}else{var Y,z="left"===r.position,N=d.padding;d.mirror?(L=z?"left":"right",Y=N):(L=z?"right":"left",Y=y+N),O=z?a.right-Y:a.left+Y;var B=a.getPixelForTick(n);B+=i.aliasPixel(h),R=a.getPixelForTick(n,c.offsetGridLines),b=S,k=D,T=e.left,A=e.right,x=w=I=F=B}M.push({tx1:b,ty1:x,tx2:k,ty2:w,x1:T,y1:I,x2:A,y2:F,labelX:O,labelY:R,glWidth:h,glColor:g,glBorderDash:m,glBorderDashOffset:v,rotation:-1*_,label:t,textBaseline:V,textAlign:L})}}}),i.each(M,function(t){if(c.display&&(l.save(),l.lineWidth=t.glWidth,l.strokeStyle=t.glColor,l.setLineDash&&(l.setLineDash(t.glBorderDash),l.lineDashOffset=t.glBorderDashOffset),l.beginPath(),c.drawTicks&&(l.moveTo(t.tx1,t.ty1),l.lineTo(t.tx2,t.ty2)),c.drawOnChartArea&&(l.moveTo(t.x1,t.y1),l.lineTo(t.x2,t.y2)),l.stroke(),l.restore()),d.display){l.save(),l.translate(t.labelX,t.labelY),l.rotate(t.rotation),l.font=v.font,l.textBaseline=t.textBaseline,l.textAlign=t.textAlign;var e=t.label;if(i.isArray(e))for(var n=0,a=0;n<e.length;++n)l.fillText(""+e[n],0,a),a+=1.5*v.size;else l.fillText(e,0,0);l.restore()}}),h.display){var T,I,A=0;if(p)T=a.left+(a.right-a.left)/2,I="bottom"===r.position?a.bottom-x.size/2:a.top+x.size/2;else{var F="left"===r.position;T=F?a.left+x.size/2:a.right-x.size/2,I=a.top+(a.bottom-a.top)/2,A=F?-.5*Math.PI:.5*Math.PI}l.save(),l.translate(T,I),l.rotate(A),l.textAlign="center",l.textBaseline="middle",l.fillStyle=b,l.font=x.font,l.fillText(h.labelString,0,0),l.restore()}if(c.drawBorder){l.lineWidth=i.getValueAtIndexOrDefault(c.lineWidth,0),l.strokeStyle=i.getValueAtIndexOrDefault(c.color,0);var O=a.left,R=a.right,L=a.top,V=a.bottom,W=i.aliasPixel(l.lineWidth);p?(L=V="top"===r.position?a.bottom:a.top,L+=W,V+=W):(O=R="left"===r.position?a.right:a.left,O+=W,R+=W),l.beginPath(),l.moveTo(O,L),l.lineTo(R,V),l.stroke()}}}})}},{}],32:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.scaleService={constructors:{},defaults:{},registerScaleType:function(t,n,i){this.constructors[t]=n,this.defaults[t]=e.clone(i)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(n){return this.defaults.hasOwnProperty(n)?e.scaleMerge(t.defaults.scale,this.defaults[n]):{}},updateScaleDefaults:function(t,n){var i=this.defaults;i.hasOwnProperty(t)&&(i[t]=e.extend(i[t],n))},addScalesToLayout:function(n){e.each(n.scales,function(e){e.fullWidth=e.options.fullWidth,e.position=e.options.position,e.weight=e.options.weight,t.layoutService.addBox(n,e)})}}}},{}],33:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.Ticks={generators:{linear:function(t,n){var i,a=[];if(t.stepSize&&t.stepSize>0)i=t.stepSize;else{var r=e.niceNum(n.max-n.min,!1);i=e.niceNum(r/(t.maxTicks-1),!0)}var o=Math.floor(n.min/i)*i,s=Math.ceil(n.max/i)*i;t.min&&t.max&&t.stepSize&&e.almostWhole((t.max-t.min)/t.stepSize,i/1e3)&&(o=t.min,s=t.max);var l=(s-o)/i;l=e.almostEquals(l,Math.round(l),i/1e3)?Math.round(l):Math.ceil(l),a.push(void 0!==t.min?t.min:o);for(var u=1;u<l;++u)a.push(o+u*i);return a.push(void 0!==t.max?t.max:s),a},logarithmic:function(t,n){var i,a,r=[],o=e.getValueOrDefault,s=o(t.min,Math.pow(10,Math.floor(e.log10(n.min)))),l=Math.floor(e.log10(n.max)),u=Math.ceil(n.max/Math.pow(10,l));0===s?(i=Math.floor(e.log10(n.minNotZero)),a=Math.floor(n.minNotZero/Math.pow(10,i)),r.push(s),s=a*Math.pow(10,i)):(i=Math.floor(e.log10(s)),a=Math.floor(s/Math.pow(10,i)));do r.push(s),++a,10===a&&(a=1,++i),s=a*Math.pow(10,i);while(i<l||i===l&&a<u);var d=o(t.max,s);return r.push(d),r}},formatters:{values:function(t){return e.isArray(t)?t:""+t},linear:function(t,n,i){var a=i.length>3?i[2]-i[1]:i[1]-i[0];Math.abs(a)>1&&t!==Math.floor(t)&&(a=t-Math.floor(t));var r=e.log10(Math.abs(a)),o="";if(0!==t){var s=-1*Math.floor(r);s=Math.max(Math.min(s,20),0),o=t.toFixed(s)}else o="0";return o},logarithmic:function(t,n,i){var a=t/Math.pow(10,Math.floor(e.log10(t)));return 0===t?"0":1===a||2===a||5===a||0===n||n===i.length-1?t.toExponential():""}}}}},{}],34:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){var n=l.color(t);return n.alpha(e*n.alpha()).rgbaString()}function n(t,e){return e&&(l.isArray(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function i(t){var e=t._xScale,n=t._yScale||t._scale,i=t._index,a=t._datasetIndex;return{xLabel:e?e.getLabelForIndex(i,a):"",yLabel:n?n.getLabelForIndex(i,a):"",index:i,datasetIndex:a,x:t._model.x,y:t._model.y}}function a(e){var n=t.defaults.global,i=l.getValueOrDefault;return{xPadding:e.xPadding,yPadding:e.yPadding,xAlign:e.xAlign,yAlign:e.yAlign,bodyFontColor:e.bodyFontColor,_bodyFontFamily:i(e.bodyFontFamily,n.defaultFontFamily),_bodyFontStyle:i(e.bodyFontStyle,n.defaultFontStyle),_bodyAlign:e.bodyAlign,bodyFontSize:i(e.bodyFontSize,n.defaultFontSize),bodySpacing:e.bodySpacing,titleFontColor:e.titleFontColor,_titleFontFamily:i(e.titleFontFamily,n.defaultFontFamily),_titleFontStyle:i(e.titleFontStyle,n.defaultFontStyle),titleFontSize:i(e.titleFontSize,n.defaultFontSize),_titleAlign:e.titleAlign,titleSpacing:e.titleSpacing,titleMarginBottom:e.titleMarginBottom,footerFontColor:e.footerFontColor,_footerFontFamily:i(e.footerFontFamily,n.defaultFontFamily),_footerFontStyle:i(e.footerFontStyle,n.defaultFontStyle),footerFontSize:i(e.footerFontSize,n.defaultFontSize),_footerAlign:e.footerAlign,footerSpacing:e.footerSpacing,footerMarginTop:e.footerMarginTop,caretSize:e.caretSize,cornerRadius:e.cornerRadius,backgroundColor:e.backgroundColor,opacity:0,legendColorBackground:e.multiKeyBackground,displayColors:e.displayColors,borderColor:e.borderColor,borderWidth:e.borderWidth}}function r(t,e){var n=t._chart.ctx,i=2*e.yPadding,a=0,r=e.body,o=r.reduce(function(t,e){return t+e.before.length+e.lines.length+e.after.length},0);o+=e.beforeBody.length+e.afterBody.length;var s=e.title.length,u=e.footer.length,d=e.titleFontSize,c=e.bodyFontSize,h=e.footerFontSize;i+=s*d,i+=s?(s-1)*e.titleSpacing:0,i+=s?e.titleMarginBottom:0,i+=o*c,i+=o?(o-1)*e.bodySpacing:0,i+=u?e.footerMarginTop:0,i+=u*h,i+=u?(u-1)*e.footerSpacing:0;var f=0,g=function(t){a=Math.max(a,n.measureText(t).width+f)};return n.font=l.fontString(d,e._titleFontStyle,e._titleFontFamily),l.each(e.title,g),n.font=l.fontString(c,e._bodyFontStyle,e._bodyFontFamily),l.each(e.beforeBody.concat(e.afterBody),g),f=e.displayColors?c+2:0,l.each(r,function(t){l.each(t.before,g),l.each(t.lines,g),l.each(t.after,g)}),f=0,n.font=l.fontString(h,e._footerFontStyle,e._footerFontFamily),l.each(e.footer,g),a+=2*e.xPadding,{width:a,height:i}}function o(t,e){var n=t._model,i=t._chart,a=t._chart.chartArea,r="center",o="center";n.y<e.height?o="top":n.y>i.height-e.height&&(o="bottom");var s,l,u,d,c,h=(a.left+a.right)/2,f=(a.top+a.bottom)/2;"center"===o?(s=function(t){return t<=h},l=function(t){return t>h}):(s=function(t){return t<=e.width/2},l=function(t){return t>=i.width-e.width/2}),u=function(t){return t+e.width>i.width},d=function(t){return t-e.width<0},c=function(t){return t<=f?"top":"bottom"},s(n.x)?(r="left",u(n.x)&&(r="center",o=c(n.y))):l(n.x)&&(r="right",d(n.x)&&(r="center",o=c(n.y)));var g=t._options;return{xAlign:g.xAlign?g.xAlign:r,yAlign:g.yAlign?g.yAlign:o}}function s(t,e,n){var i=t.x,a=t.y,r=t.caretSize,o=t.caretPadding,s=t.cornerRadius,l=n.xAlign,u=n.yAlign,d=r+o,c=s+o;return"right"===l?i-=e.width:"center"===l&&(i-=e.width/2),"top"===u?a+=d:a-="bottom"===u?e.height+d:e.height/2,"center"===u?"left"===l?i+=d:"right"===l&&(i-=d):"left"===l?i-=c:"right"===l&&(i+=c),{x:i,y:a}}var l=t.helpers;t.defaults.global.tooltips={enabled:!0,custom:null,mode:"nearest",position:"average",intersect:!0,backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretPadding:2,caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",displayColors:!0,borderColor:"rgba(0,0,0,0)",borderWidth:0,callbacks:{beforeTitle:l.noop,title:function(t,e){var n="",i=e.labels,a=i?i.length:0;if(t.length>0){var r=t[0];r.xLabel?n=r.xLabel:a>0&&r.index<a&&(n=i[r.index])}return n},afterTitle:l.noop,beforeBody:l.noop,beforeLabel:l.noop,label:function(t,e){var n=e.datasets[t.datasetIndex].label||"";return n&&(n+=": "),n+=t.yLabel},labelColor:function(t,e){var n=e.getDatasetMeta(t.datasetIndex),i=n.data[t.index],a=i._view;return{borderColor:a.borderColor,backgroundColor:a.backgroundColor}},afterLabel:l.noop,afterBody:l.noop,beforeFooter:l.noop,footer:l.noop,afterFooter:l.noop}},t.Tooltip=t.Element.extend({initialize:function(){this._model=a(this._options)},getTitle:function(){var t=this,e=t._options,i=e.callbacks,a=i.beforeTitle.apply(t,arguments),r=i.title.apply(t,arguments),o=i.afterTitle.apply(t,arguments),s=[];return s=n(s,a),s=n(s,r),s=n(s,o)},getBeforeBody:function(){var t=this._options.callbacks.beforeBody.apply(this,arguments);return l.isArray(t)?t:void 0!==t?[t]:[]},getBody:function(t,e){var i=this,a=i._options.callbacks,r=[];return l.each(t,function(t){var o={before:[],lines:[],after:[]};n(o.before,a.beforeLabel.call(i,t,e)),n(o.lines,a.label.call(i,t,e)),n(o.after,a.afterLabel.call(i,t,e)),r.push(o)}),r},getAfterBody:function(){var t=this._options.callbacks.afterBody.apply(this,arguments);return l.isArray(t)?t:void 0!==t?[t]:[]},getFooter:function(){var t=this,e=t._options.callbacks,i=e.beforeFooter.apply(t,arguments),a=e.footer.apply(t,arguments),r=e.afterFooter.apply(t,arguments),o=[];return o=n(o,i),o=n(o,a),o=n(o,r)},update:function(e){var n,u,d=this,c=d._options,h=d._model,f=d._model=a(c),g=d._active,p=d._data,m={xAlign:h.xAlign,yAlign:h.yAlign},v={x:h.x,y:h.y},y={width:h.width,height:h.height},b={x:h.caretX,y:h.caretY};if(g.length){f.opacity=1;var x=[];b=t.Tooltip.positioners[c.position](g,d._eventPosition);var _=[];for(n=0,u=g.length;n<u;++n)_.push(i(g[n]));c.filter&&(_=_.filter(function(t){return c.filter(t,p)})),c.itemSort&&(_=_.sort(function(t,e){return c.itemSort(t,e,p)})),l.each(_,function(t){x.push(c.callbacks.labelColor.call(d,t,d._chart))}),f.title=d.getTitle(_,p),f.beforeBody=d.getBeforeBody(_,p),f.body=d.getBody(_,p),f.afterBody=d.getAfterBody(_,p),f.footer=d.getFooter(_,p),f.x=Math.round(b.x),f.y=Math.round(b.y),f.caretPadding=c.caretPadding,f.labelColors=x,f.dataPoints=_,y=r(this,f),m=o(this,y),v=s(f,y,m)}else f.opacity=0;return f.xAlign=m.xAlign,f.yAlign=m.yAlign,f.x=v.x,f.y=v.y,f.width=y.width,f.height=y.height,f.caretX=b.x,f.caretY=b.y,d._model=f,e&&c.custom&&c.custom.call(d,f),d},drawCaret:function(t,e){var n=this._chart.ctx,i=this._view,a=this.getCaretPosition(t,e,i);n.lineTo(a.x1,a.y1),n.lineTo(a.x2,a.y2),n.lineTo(a.x3,a.y3)},getCaretPosition:function(t,e,n){var i,a,r,o,s,l,u=n.caretSize,d=n.cornerRadius,c=n.xAlign,h=n.yAlign,f=t.x,g=t.y,p=e.width,m=e.height;if("center"===h)s=g+m/2,"left"===c?(i=f,a=i-u,r=i,o=s+u,l=s-u):(i=f+p,a=i+u,r=i,o=s-u,l=s+u);else if("left"===c?(a=f+d+u,i=a-u,r=a+u):"right"===c?(a=f+p-d-u,i=a-u,r=a+u):(a=f+p/2,i=a-u,r=a+u),"top"===h)o=g,s=o-u,l=o;else{o=g+m,s=o+u,l=o;var v=r;r=i,i=v}return{x1:i,x2:a,x3:r,y1:o,y2:s,y3:l}},drawTitle:function(t,n,i,a){var r=n.title;if(r.length){i.textAlign=n._titleAlign,i.textBaseline="top";var o=n.titleFontSize,s=n.titleSpacing;i.fillStyle=e(n.titleFontColor,a),i.font=l.fontString(o,n._titleFontStyle,n._titleFontFamily);var u,d;for(u=0,d=r.length;u<d;++u)i.fillText(r[u],t.x,t.y),t.y+=o+s,u+1===r.length&&(t.y+=n.titleMarginBottom-s)}},drawBody:function(t,n,i,a){var r=n.bodyFontSize,o=n.bodySpacing,s=n.body;i.textAlign=n._bodyAlign,i.textBaseline="top";var u=e(n.bodyFontColor,a);i.fillStyle=u,i.font=l.fontString(r,n._bodyFontStyle,n._bodyFontFamily);var d=0,c=function(e){i.fillText(e,t.x+d,t.y),t.y+=r+o};l.each(n.beforeBody,c);var h=n.displayColors;d=h?r+2:0,l.each(s,function(o,s){l.each(o.before,c),l.each(o.lines,function(o){h&&(i.fillStyle=e(n.legendColorBackground,a),i.fillRect(t.x,t.y,r,r),i.strokeStyle=e(n.labelColors[s].borderColor,a),i.strokeRect(t.x,t.y,r,r),i.fillStyle=e(n.labelColors[s].backgroundColor,a),i.fillRect(t.x+1,t.y+1,r-2,r-2),i.fillStyle=u),c(o)}),l.each(o.after,c)}),d=0,l.each(n.afterBody,c),t.y-=o},drawFooter:function(t,n,i,a){var r=n.footer;r.length&&(t.y+=n.footerMarginTop,i.textAlign=n._footerAlign,i.textBaseline="top",i.fillStyle=e(n.footerFontColor,a),i.font=l.fontString(n.footerFontSize,n._footerFontStyle,n._footerFontFamily),l.each(r,function(e){i.fillText(e,t.x,t.y),t.y+=n.footerFontSize+n.footerSpacing}))},drawBackground:function(t,n,i,a,r){i.fillStyle=e(n.backgroundColor,r),i.strokeStyle=e(n.borderColor,r),i.lineWidth=n.borderWidth;var o=n.xAlign,s=n.yAlign,l=t.x,u=t.y,d=a.width,c=a.height,h=n.cornerRadius;i.beginPath(),i.moveTo(l+h,u),"top"===s&&this.drawCaret(t,a),i.lineTo(l+d-h,u),i.quadraticCurveTo(l+d,u,l+d,u+h),
"center"===s&&"right"===o&&this.drawCaret(t,a),i.lineTo(l+d,u+c-h),i.quadraticCurveTo(l+d,u+c,l+d-h,u+c),"bottom"===s&&this.drawCaret(t,a),i.lineTo(l+h,u+c),i.quadraticCurveTo(l,u+c,l,u+c-h),"center"===s&&"left"===o&&this.drawCaret(t,a),i.lineTo(l,u+h),i.quadraticCurveTo(l,u,l+h,u),i.closePath(),i.fill(),n.borderWidth>0&&i.stroke()},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var n={width:e.width,height:e.height},i={x:e.x,y:e.y},a=Math.abs(e.opacity<.001)?0:e.opacity,r=e.title.length||e.beforeBody.length||e.body.length||e.afterBody.length||e.footer.length;this._options.enabled&&r&&(this.drawBackground(i,e,t,n,a),i.x+=e.xPadding,i.y+=e.yPadding,this.drawTitle(i,e,t,a),this.drawBody(i,e,t,a),this.drawFooter(i,e,t,a))}},handleEvent:function(t){var e=this,n=e._options,i=!1;if(e._lastActive=e._lastActive||[],"mouseout"===t.type?e._active=[]:e._active=e._chart.getElementsAtEventForMode(t,n.mode,n),i=!l.arrayEquals(e._active,e._lastActive),!i)return!1;if(e._lastActive=e._active,n.enabled||n.custom){e._eventPosition={x:t.x,y:t.y};var a=e._model;e.update(!0),e.pivot(),i|=a.x!==e._model.x||a.y!==e._model.y}return i}}),t.Tooltip.positioners={average:function(t){if(!t.length)return!1;var e,n,i=0,a=0,r=0;for(e=0,n=t.length;e<n;++e){var o=t[e];if(o&&o.hasValue()){var s=o.tooltipPosition();i+=s.x,a+=s.y,++r}}return{x:Math.round(i/r),y:Math.round(a/r)}},nearest:function(t,e){var n,i,a,r=e.x,o=e.y,s=Number.POSITIVE_INFINITY;for(i=0,a=t.length;i<a;++i){var u=t[i];if(u&&u.hasValue()){var d=u.getCenterPoint(),c=l.distanceBetweenPoints(e,d);c<s&&(s=c,n=u)}}if(n){var h=n.tooltipPosition();r=h.x,o=h.y}return{x:r,y:o}}}}},{}],35:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=t.defaults.global;n.elements.arc={backgroundColor:n.defaultColor,borderColor:"#fff",borderWidth:2},t.elements.Arc=t.Element.extend({inLabelRange:function(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2)},inRange:function(t,n){var i=this._view;if(i){for(var a=e.getAngleFromPoint(i,{x:t,y:n}),r=a.angle,o=a.distance,s=i.startAngle,l=i.endAngle;l<s;)l+=2*Math.PI;for(;r>l;)r-=2*Math.PI;for(;r<s;)r+=2*Math.PI;var u=r>=s&&r<=l,d=o>=i.innerRadius&&o<=i.outerRadius;return u&&d}return!1},getCenterPoint:function(){var t=this._view,e=(t.startAngle+t.endAngle)/2,n=(t.innerRadius+t.outerRadius)/2;return{x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n}},getArea:function(){var t=this._view;return Math.PI*((t.endAngle-t.startAngle)/(2*Math.PI))*(Math.pow(t.outerRadius,2)-Math.pow(t.innerRadius,2))},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,n=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n}},draw:function(){var t=this._chart.ctx,e=this._view,n=e.startAngle,i=e.endAngle;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,n,i),t.arc(e.x,e.y,e.innerRadius,i,n,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})}},{}],36:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=t.defaults.global;t.defaults.global.elements.line={tension:.4,backgroundColor:n.defaultColor,borderWidth:3,borderColor:n.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",capBezierPoints:!0,fill:!0},t.elements.Line=t.Element.extend({draw:function(){var t,i,a,r,o=this,s=o._view,l=o._chart.ctx,u=s.spanGaps,d=o._children.slice(),c=n.elements.line,h=-1;for(o._loop&&d.length&&d.push(d[0]),l.save(),l.lineCap=s.borderCapStyle||c.borderCapStyle,l.setLineDash&&l.setLineDash(s.borderDash||c.borderDash),l.lineDashOffset=s.borderDashOffset||c.borderDashOffset,l.lineJoin=s.borderJoinStyle||c.borderJoinStyle,l.lineWidth=s.borderWidth||c.borderWidth,l.strokeStyle=s.borderColor||n.defaultColor,l.beginPath(),h=-1,t=0;t<d.length;++t)i=d[t],a=e.previousItem(d,t),r=i._view,0===t?r.skip||(l.moveTo(r.x,r.y),h=t):(a=h===-1?a:d[h],r.skip||(h!==t-1&&!u||h===-1?l.moveTo(r.x,r.y):e.canvas.lineTo(l,a._view,i._view),h=t));l.stroke(),l.restore()}})}},{}],37:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hitRadius,2)}function n(t){var e=this._view;return!!e&&Math.pow(t-e.y,2)<Math.pow(e.radius+e.hitRadius,2)}var i=t.helpers,a=t.defaults.global,r=a.defaultColor;a.elements.point={radius:3,pointStyle:"circle",backgroundColor:r,borderWidth:1,borderColor:r,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},t.elements.Point=t.Element.extend({inRange:function(t,e){var n=this._view;return!!n&&Math.pow(t-n.x,2)+Math.pow(e-n.y,2)<Math.pow(n.hitRadius+n.radius,2)},inLabelRange:e,inXRange:e,inYRange:n,getCenterPoint:function(){var t=this._view;return{x:t.x,y:t.y}},getArea:function(){return Math.PI*Math.pow(this._view.radius,2)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(e){var n=this._view,o=this._model,s=this._chart.ctx,l=n.pointStyle,u=n.radius,d=n.x,c=n.y,h=t.helpers.color,f=1.01,g=0;n.skip||(s.strokeStyle=n.borderColor||r,s.lineWidth=i.getValueOrDefault(n.borderWidth,a.elements.point.borderWidth),s.fillStyle=n.backgroundColor||r,void 0!==e&&(o.x<e.left||e.right*f<o.x||o.y<e.top||e.bottom*f<o.y)&&(o.x<e.left?g=(d-o.x)/(e.left-o.x):e.right*f<o.x?g=(o.x-d)/(o.x-e.right):o.y<e.top?g=(c-o.y)/(e.top-o.y):e.bottom*f<o.y&&(g=(o.y-c)/(o.y-e.bottom)),g=Math.round(100*g)/100,s.strokeStyle=h(s.strokeStyle).alpha(g).rgbString(),s.fillStyle=h(s.fillStyle).alpha(g).rgbString()),t.canvasHelpers.drawPoint(s,l,u,d,c))}})}},{}],38:[function(t,e,n){"use strict";e.exports=function(t){function e(t){return void 0!==t._view.width}function n(t){var n,i,a,r,o=t._view;if(e(t)){var s=o.width/2;n=o.x-s,i=o.x+s,a=Math.min(o.y,o.base),r=Math.max(o.y,o.base)}else{var l=o.height/2;n=Math.min(o.x,o.base),i=Math.max(o.x,o.base),a=o.y-l,r=o.y+l}return{left:n,top:a,right:i,bottom:r}}var i=t.defaults.global;i.elements.rectangle={backgroundColor:i.defaultColor,borderWidth:0,borderColor:i.defaultColor,borderSkipped:"bottom"},t.elements.Rectangle=t.Element.extend({draw:function(){function t(t){return v[(b+t)%4]}var e,n,i,a,r,o,s,l=this._chart.ctx,u=this._view,d=u.borderWidth;if(u.horizontal?(e=u.base,n=u.x,i=u.y-u.height/2,a=u.y+u.height/2,r=n>e?1:-1,o=1,s=u.borderSkipped||"left"):(e=u.x-u.width/2,n=u.x+u.width/2,i=u.y,a=u.base,r=1,o=a>i?1:-1,s=u.borderSkipped||"bottom"),d){var c=Math.min(Math.abs(e-n),Math.abs(i-a));d=d>c?c:d;var h=d/2,f=e+("left"!==s?h*r:0),g=n+("right"!==s?-h*r:0),p=i+("top"!==s?h*o:0),m=a+("bottom"!==s?-h*o:0);f!==g&&(i=p,a=m),p!==m&&(e=f,n=g)}l.beginPath(),l.fillStyle=u.backgroundColor,l.strokeStyle=u.borderColor,l.lineWidth=d;var v=[[e,a],[e,i],[n,i],[n,a]],y=["bottom","left","top","right"],b=y.indexOf(s,0);b===-1&&(b=0);var x=t(0);l.moveTo(x[0],x[1]);for(var _=1;_<4;_++)x=t(_),l.lineTo(x[0],x[1]);l.fill(),d&&l.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var i=!1;if(this._view){var a=n(this);i=t>=a.left&&t<=a.right&&e>=a.top&&e<=a.bottom}return i},inLabelRange:function(t,i){var a=this;if(!a._view)return!1;var r=!1,o=n(a);return r=e(a)?t>=o.left&&t<=o.right:i>=o.top&&i<=o.bottom},inXRange:function(t){var e=n(this);return t>=e.left&&t<=e.right},inYRange:function(t){var e=n(this);return t>=e.top&&t<=e.bottom},getCenterPoint:function(){var t,n,i=this._view;return e(this)?(t=i.x,n=(i.y+i.base)/2):(t=(i.x+i.base)/2,n=i.y),{x:t,y:n}},getArea:function(){var t=this._view;return t.width*Math.abs(t.y-t.base)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}})}},{}],39:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){var n=l.getStyle(t,e),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?Number(i[1]):void 0}function n(t,n){var i=t.style,a=t.getAttribute("height"),r=t.getAttribute("width");if(t._chartjs={initial:{height:a,width:r,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",null===r||""===r){var o=e(t,"width");void 0!==o&&(t.width=o)}if(null===a||""===a)if(""===t.style.height)t.height=t.width/(n.options.aspectRatio||2);else{var s=e(t,"height");void 0!==o&&(t.height=s)}return t}function i(t,e,n,i,a){return{type:t,chart:e,native:a||null,x:void 0!==n?n:null,y:void 0!==i?i:null}}function a(t,e){var n=u[t.type]||t.type,a=l.getRelativePosition(t,e);return i(n,e,a.x,a.y,t)}function r(t){var e=document.createElement("iframe");return e.className="chartjs-hidden-iframe",e.style.cssText="display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;",e.tabIndex=-1,l.addEvent(e,"load",function(){l.addEvent(e.contentWindow||e,"resize",t),t()}),e}function o(t,e,n){var a=t._chartjs={ticking:!1},o=function(){a.ticking||(a.ticking=!0,l.requestAnimFrame.call(window,function(){if(a.resizer)return a.ticking=!1,e(i("resize",n))}))};a.resizer=r(o),t.insertBefore(a.resizer,t.firstChild)}function s(t){if(t&&t._chartjs){var e=t._chartjs.resizer;e&&(e.parentNode.removeChild(e),t._chartjs.resizer=null),delete t._chartjs}}var l=t.helpers,u={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"};return{acquireContext:function(t,e){"string"==typeof t?t=document.getElementById(t):t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas);var i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(n(t,e),i):null},releaseContext:function(t){var e=t.canvas;if(e._chartjs){var n=e._chartjs.initial;["height","width"].forEach(function(t){var i=n[t];void 0===i||null===i?e.removeAttribute(t):e.setAttribute(t,i)}),l.each(n.style||{},function(t,n){e.style[n]=t}),e.width=e.width,delete e._chartjs}},addEventListener:function(t,e,n){var i=t.canvas;if("resize"===e)return void o(i.parentNode,n,t);var r=n._chartjs||(n._chartjs={}),s=r.proxies||(r.proxies={}),u=s[t.id+"_"+e]=function(e){n(a(e,t))};l.addEvent(i,e,u)},removeEventListener:function(t,e,n){var i=t.canvas;if("resize"===e)return void s(i.parentNode,n);var a=n._chartjs||{},r=a.proxies||{},o=r[t.id+"_"+e];o&&l.removeEvent(i,e,o)}}}},{}],40:[function(t,e,n){"use strict";var i=t(39);e.exports=function(t){t.platform={acquireContext:function(){},releaseContext:function(){},addEventListener:function(){},removeEventListener:function(){}},t.helpers.extend(t.platform,i(t))}},{39:39}],41:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e,n){var i,a=t._model||{},r=a.fill;if(void 0===r&&(r=!!a.backgroundColor),r===!1||null===r)return!1;if(r===!0)return"origin";if(i=parseFloat(r,10),isFinite(i)&&Math.floor(i)===i)return"-"!==r[0]&&"+"!==r[0]||(i=e+i),!(i===e||i<0||i>=n)&&i;switch(r){case"bottom":return"start";case"top":return"end";case"zero":return"origin";case"origin":case"start":case"end":return r;default:return!1}}function n(t){var e,n=t.el._model||{},i=t.el._scale||{},a=t.fill,r=null;if(isFinite(a))return null;if("start"===a?r=void 0===n.scaleBottom?i.bottom:n.scaleBottom:"end"===a?r=void 0===n.scaleTop?i.top:n.scaleTop:void 0!==n.scaleZero?r=n.scaleZero:i.getBasePosition?r=i.getBasePosition():i.getBasePixel&&(r=i.getBasePixel()),void 0!==r&&null!==r){if(void 0!==r.x&&void 0!==r.y)return r;if("number"==typeof r&&isFinite(r))return e=i.isHorizontal(),{x:e?r:null,y:e?null:r}}return null}function i(t,e,n){var i,a=t[e],r=a.fill,o=[e];if(!n)return r;for(;r!==!1&&o.indexOf(r)===-1;){if(!isFinite(r))return r;if(i=t[r],!i)return!1;if(i.visible)return r;o.push(r),r=i.fill}return!1}function a(t){var e=t.fill,n="dataset";return e===!1?null:(isFinite(e)||(n="boundary"),d[n](t))}function r(t){return t&&!t.skip}function o(t,e,n,i,a){var r;if(i&&a){for(t.moveTo(e[0].x,e[0].y),r=1;r<i;++r)u.canvas.lineTo(t,e[r-1],e[r]);for(t.lineTo(n[a-1].x,n[a-1].y),r=a-1;r>0;--r)u.canvas.lineTo(t,n[r],n[r-1],!0)}}function s(t,e,n,i,a,s){var l,u,d,c,h,f,g,p=e.length,m=i.spanGaps,v=[],y=[],b=0,x=0;for(t.beginPath(),l=0,u=p+!!s;l<u;++l)d=l%p,c=e[d]._view,h=n(c,d,i),f=r(c),g=r(h),f&&g?(b=v.push(c),x=y.push(h)):b&&x&&(m?(f&&v.push(c),g&&y.push(h)):(o(t,v,y,b,x),b=x=0,v=[],y=[]));o(t,v,y,b,x),t.closePath(),t.fillStyle=a,t.fill()}t.defaults.global.plugins.filler={propagate:!0};var l=t.defaults,u=t.helpers,d={dataset:function(t){var e=t.fill,n=t.chart,i=n.getDatasetMeta(e),a=i&&n.isDatasetVisible(e),r=a&&i.dataset._children||[];return r.length?function(t,e){return r[e]._view||null}:null},boundary:function(t){var e=t.boundary,n=e?e.x:null,i=e?e.y:null;return function(t){return{x:null===n?t.x:n,y:null===i?t.y:i}}}};return{id:"filler",afterDatasetsUpdate:function(r,o){var s,l,u,d,c=(r.data.datasets||[]).length,h=o.propagate,f=[];for(l=0;l<c;++l)s=r.getDatasetMeta(l),u=s.dataset,d=null,u&&u._model&&u instanceof t.elements.Line&&(d={visible:r.isDatasetVisible(l),fill:e(u,l,c),chart:r,el:u}),s.$filler=d,f.push(d);for(l=0;l<c;++l)d=f[l],d&&(d.fill=i(f,l,h),d.boundary=n(d),d.mapper=a(d))},beforeDatasetDraw:function(t,e){var n=e.meta.$filler;if(n){var i=n.el,a=i._view,r=i._children||[],o=n.mapper,u=a.backgroundColor||l.global.defaultColor;o&&u&&r.length&&s(t.ctx,r,o,a,u,i._loop)}}}}},{}],42:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return t.usePointStyle?e*Math.SQRT2:t.boxWidth}function n(e,n){var i=new t.Legend({ctx:e.ctx,options:n,chart:e});a.configure(e,i,n),a.addBox(e,i),e.legend=i}var i=t.helpers,a=t.layoutService,r=i.noop;return t.defaults.global.legend={display:!0,position:"top",fullWidth:!0,reverse:!1,weight:1e3,onClick:function(t,e){var n=e.datasetIndex,i=this.chart,a=i.getDatasetMeta(n);a.hidden=null===a.hidden?!i.data.datasets[n].hidden:null,i.update()},onHover:null,labels:{boxWidth:40,padding:10,generateLabels:function(t){var e=t.data;return i.isArray(e.datasets)?e.datasets.map(function(e,n){return{text:e.label,fillStyle:i.isArray(e.backgroundColor)?e.backgroundColor[0]:e.backgroundColor,hidden:!t.isDatasetVisible(n),lineCap:e.borderCapStyle,lineDash:e.borderDash,lineDashOffset:e.borderDashOffset,lineJoin:e.borderJoinStyle,lineWidth:e.borderWidth,strokeStyle:e.borderColor,pointStyle:e.pointStyle,datasetIndex:n}},this):[]}}},t.Legend=t.Element.extend({initialize:function(t){i.extend(this,t),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:r,update:function(t,e,n){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=n,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:r,beforeSetDimensions:r,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:r,beforeBuildLabels:r,buildLabels:function(){var t=this,e=t.options.labels,n=e.generateLabels.call(t,t.chart);e.filter&&(n=n.filter(function(n){return e.filter(n,t.chart.data)})),t.options.reverse&&n.reverse(),t.legendItems=n},afterBuildLabels:r,beforeFit:r,fit:function(){var n=this,a=n.options,r=a.labels,o=a.display,s=n.ctx,l=t.defaults.global,u=i.getValueOrDefault,d=u(r.fontSize,l.defaultFontSize),c=u(r.fontStyle,l.defaultFontStyle),h=u(r.fontFamily,l.defaultFontFamily),f=i.fontString(d,c,h),g=n.legendHitBoxes=[],p=n.minSize,m=n.isHorizontal();if(m?(p.width=n.maxWidth,p.height=o?10:0):(p.width=o?10:0,p.height=n.maxHeight),o)if(s.font=f,m){var v=n.lineWidths=[0],y=n.legendItems.length?d+r.padding:0;s.textAlign="left",s.textBaseline="top",i.each(n.legendItems,function(t,i){var a=e(r,d),o=a+d/2+s.measureText(t.text).width;v[v.length-1]+o+r.padding>=n.width&&(y+=d+r.padding,v[v.length]=n.left),g[i]={left:0,top:0,width:o,height:d},v[v.length-1]+=o+r.padding}),p.height+=y}else{var b=r.padding,x=n.columnWidths=[],_=r.padding,k=0,w=0,M=d+b;i.each(n.legendItems,function(t,n){var i=e(r,d),a=i+d/2+s.measureText(t.text).width;w+M>p.height&&(_+=k+r.padding,x.push(k),k=0,w=0),k=Math.max(k,a),w+=M,g[n]={left:0,top:0,width:a,height:d}}),_+=k,x.push(k),p.width+=_}n.width=p.width,n.height=p.height},afterFit:r,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var n=this,a=n.options,r=a.labels,o=t.defaults.global,s=o.elements.line,l=n.width,u=n.lineWidths;if(a.display){var d,c=n.ctx,h=i.getValueOrDefault,f=h(r.fontColor,o.defaultFontColor),g=h(r.fontSize,o.defaultFontSize),p=h(r.fontStyle,o.defaultFontStyle),m=h(r.fontFamily,o.defaultFontFamily),v=i.fontString(g,p,m);c.textAlign="left",c.textBaseline="top",c.lineWidth=.5,c.strokeStyle=f,c.fillStyle=f,c.font=v;var y=e(r,g),b=n.legendHitBoxes,x=function(e,n,i){if(!(isNaN(y)||y<=0)){c.save(),c.fillStyle=h(i.fillStyle,o.defaultColor),c.lineCap=h(i.lineCap,s.borderCapStyle),c.lineDashOffset=h(i.lineDashOffset,s.borderDashOffset),c.lineJoin=h(i.lineJoin,s.borderJoinStyle),c.lineWidth=h(i.lineWidth,s.borderWidth),c.strokeStyle=h(i.strokeStyle,o.defaultColor);var r=0===h(i.lineWidth,s.borderWidth);if(c.setLineDash&&c.setLineDash(h(i.lineDash,s.borderDash)),a.labels&&a.labels.usePointStyle){var l=g*Math.SQRT2/2,u=l/Math.SQRT2,d=e+u,f=n+u;t.canvasHelpers.drawPoint(c,i.pointStyle,l,d,f)}else r||c.strokeRect(e,n,y,g),c.fillRect(e,n,y,g);c.restore()}},_=function(t,e,n,i){c.fillText(n.text,y+g/2+t,e),n.hidden&&(c.beginPath(),c.lineWidth=2,c.moveTo(y+g/2+t,e+g/2),c.lineTo(y+g/2+t+i,e+g/2),c.stroke())},k=n.isHorizontal();d=k?{x:n.left+(l-u[0])/2,y:n.top+r.padding,line:0}:{x:n.left+r.padding,y:n.top+r.padding,line:0};var w=g+r.padding;i.each(n.legendItems,function(t,e){var i=c.measureText(t.text).width,a=y+g/2+i,o=d.x,s=d.y;k?o+a>=l&&(s=d.y+=w,d.line++,o=d.x=n.left+(l-u[d.line])/2):s+w>n.bottom&&(o=d.x=o+n.columnWidths[d.line]+r.padding,s=d.y=n.top+r.padding,d.line++),x(o,s,t),b[e].left=o,b[e].top=s,_(o,s,t,i),k?d.x+=a+r.padding:d.y+=w})}},handleEvent:function(t){var e=this,n=e.options,i="mouseup"===t.type?"click":t.type,a=!1;if("mousemove"===i){if(!n.onHover)return}else{if("click"!==i)return;if(!n.onClick)return}var r=t.x,o=t.y;if(r>=e.left&&r<=e.right&&o>=e.top&&o<=e.bottom)for(var s=e.legendHitBoxes,l=0;l<s.length;++l){var u=s[l];if(r>=u.left&&r<=u.left+u.width&&o>=u.top&&o<=u.top+u.height){if("click"===i){n.onClick.call(e,t.native,e.legendItems[l]),a=!0;break}if("mousemove"===i){n.onHover.call(e,t.native,e.legendItems[l]),a=!0;break}}}return a}}),{id:"legend",beforeInit:function(t){var e=t.options.legend;e&&n(t,e)},beforeUpdate:function(e){var r=e.options.legend,o=e.legend;r?(r=i.configMerge(t.defaults.global.legend,r),o?(a.configure(e,o,r),o.options=r):n(e,r)):o&&(a.removeBox(e,o),delete e.legend)},afterEvent:function(t,e){var n=t.legend;n&&n.handleEvent(e)}}}},{}],43:[function(t,e,n){"use strict";e.exports=function(t){function e(e,n){var a=new t.Title({ctx:e.ctx,options:n,chart:e});i.configure(e,a,n),i.addBox(e,a),e.titleBlock=a}var n=t.helpers,i=t.layoutService,a=n.noop;return t.defaults.global.title={display:!1,position:"top",fullWidth:!0,weight:2e3,fontStyle:"bold",padding:10,text:""},t.Title=t.Element.extend({initialize:function(t){var e=this;n.extend(e,t),e.legendHitBoxes=[]},beforeUpdate:a,update:function(t,e,n){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=n,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:a,beforeSetDimensions:a,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:a,beforeBuildLabels:a,buildLabels:a,afterBuildLabels:a,beforeFit:a,fit:function(){var e=this,i=n.getValueOrDefault,a=e.options,r=t.defaults.global,o=a.display,s=i(a.fontSize,r.defaultFontSize),l=e.minSize;e.isHorizontal()?(l.width=e.maxWidth,l.height=o?s+2*a.padding:0):(l.width=o?s+2*a.padding:0,l.height=e.maxHeight),e.width=l.width,e.height=l.height},afterFit:a,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var e=this,i=e.ctx,a=n.getValueOrDefault,r=e.options,o=t.defaults.global;if(r.display){var s,l,u,d=a(r.fontSize,o.defaultFontSize),c=a(r.fontStyle,o.defaultFontStyle),h=a(r.fontFamily,o.defaultFontFamily),f=n.fontString(d,c,h),g=0,p=e.top,m=e.left,v=e.bottom,y=e.right;i.fillStyle=a(r.fontColor,o.defaultFontColor),i.font=f,e.isHorizontal()?(s=m+(y-m)/2,l=p+(v-p)/2,u=y-m):(s="left"===r.position?m+d/2:y-d/2,l=p+(v-p)/2,u=v-p,g=Math.PI*("left"===r.position?-.5:.5)),i.save(),i.translate(s,l),i.rotate(g),i.textAlign="center",i.textBaseline="middle",i.fillText(r.text,0,0,u),i.restore()}}}),{id:"title",beforeInit:function(t){var n=t.options.title;n&&e(t,n)},beforeUpdate:function(a){var r=a.options.title,o=a.titleBlock;r?(r=n.configMerge(t.defaults.global.title,r),o?(i.configure(a,o,r),o.options=r):e(a,r)):o&&(t.layoutService.removeBox(a,o),delete a.titleBlock)}}}},{}],44:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n={position:"bottom"},i=t.Scale.extend({getLabels:function(){var t=this.chart.data;return(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels},determineDataLimits:function(){var t=this,n=t.getLabels();t.minIndex=0,t.maxIndex=n.length-1;var i;void 0!==t.options.ticks.min&&(i=e.indexOf(n,t.options.ticks.min),t.minIndex=i!==-1?i:t.minIndex),void 0!==t.options.ticks.max&&(i=e.indexOf(n,t.options.ticks.max),t.maxIndex=i!==-1?i:t.maxIndex),t.min=n[t.minIndex],t.max=n[t.maxIndex]},buildTicks:function(){var t=this,e=t.getLabels();t.ticks=0===t.minIndex&&t.maxIndex===e.length-1?e:e.slice(t.minIndex,t.maxIndex+1)},getLabelForIndex:function(t,e){var n=this,i=n.chart.data,a=n.isHorizontal();return i.yLabels&&!a?n.getRightValue(i.datasets[e].data[t]):n.ticks[t-n.minIndex]},getPixelForValue:function(t,e,n,i){var a,r=this,o=Math.max(r.maxIndex+1-r.minIndex-(r.options.gridLines.offsetGridLines?0:1),1);if(void 0!==t&&null!==t&&(a=r.isHorizontal()?t.x:t.y),void 0!==a||void 0!==t&&isNaN(e)){var s=r.getLabels();t=a||t;var l=s.indexOf(t);e=l!==-1?l:e}if(r.isHorizontal()){var u=r.width/o,d=u*(e-r.minIndex);return(r.options.gridLines.offsetGridLines&&i||r.maxIndex===r.minIndex&&i)&&(d+=u/2),r.left+Math.round(d)}var c=r.height/o,h=c*(e-r.minIndex);return r.options.gridLines.offsetGridLines&&i&&(h+=c/2),r.top+Math.round(h)},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null,e)},getValueForPixel:function(t){var e,n=this,i=Math.max(n.ticks.length-(n.options.gridLines.offsetGridLines?0:1),1),a=n.isHorizontal(),r=(a?n.width:n.height)/i;return t-=a?n.left:n.top,n.options.gridLines.offsetGridLines&&(t-=r/2),e=t<=0?0:Math.round(t/r)},getBasePixel:function(){return this.bottom}});t.scaleService.registerScaleType("category",i,n)}},{}],45:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n={position:"left",ticks:{callback:t.Ticks.formatters.linear}},i=t.LinearScaleBase.extend({determineDataLimits:function(){function t(t){return s?t.xAxisID===n.id:t.yAxisID===n.id}var n=this,i=n.options,a=n.chart,r=a.data,o=r.datasets,s=n.isHorizontal(),l=0,u=1;n.min=null,n.max=null;var d=i.stacked;if(void 0===d&&e.each(o,function(e,n){if(!d){var i=a.getDatasetMeta(n);a.isDatasetVisible(n)&&t(i)&&void 0!==i.stack&&(d=!0)}}),i.stacked||d){var c={};e.each(o,function(r,o){var s=a.getDatasetMeta(o),l=[s.type,void 0===i.stacked&&void 0===s.stack?o:"",s.stack].join(".");void 0===c[l]&&(c[l]={positiveValues:[],negativeValues:[]});var u=c[l].positiveValues,d=c[l].negativeValues;a.isDatasetVisible(o)&&t(s)&&e.each(r.data,function(t,e){var a=+n.getRightValue(t);isNaN(a)||s.data[e].hidden||(u[e]=u[e]||0,d[e]=d[e]||0,i.relativePoints?u[e]=100:a<0?d[e]+=a:u[e]+=a)})}),e.each(c,function(t){var i=t.positiveValues.concat(t.negativeValues),a=e.min(i),r=e.max(i);n.min=null===n.min?a:Math.min(n.min,a),n.max=null===n.max?r:Math.max(n.max,r)})}else e.each(o,function(i,r){var o=a.getDatasetMeta(r);a.isDatasetVisible(r)&&t(o)&&e.each(i.data,function(t,e){var i=+n.getRightValue(t);isNaN(i)||o.data[e].hidden||(null===n.min?n.min=i:i<n.min&&(n.min=i),null===n.max?n.max=i:i>n.max&&(n.max=i))})});n.min=isFinite(n.min)?n.min:l,n.max=isFinite(n.max)?n.max:u,this.handleTickRangeOptions()},getTickLimit:function(){var n,i=this,a=i.options.ticks;if(i.isHorizontal())n=Math.min(a.maxTicksLimit?a.maxTicksLimit:11,Math.ceil(i.width/50));else{var r=e.getValueOrDefault(a.fontSize,t.defaults.global.defaultFontSize);n=Math.min(a.maxTicksLimit?a.maxTicksLimit:11,Math.ceil(i.height/(2*r)))}return n},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForValue:function(t){var e,n=this,i=n.start,a=+n.getRightValue(t),r=n.end-i;return n.isHorizontal()?(e=n.left+n.width/r*(a-i),Math.round(e)):(e=n.bottom-n.height/r*(a-i),Math.round(e))},getValueForPixel:function(t){var e=this,n=e.isHorizontal(),i=n?e.width:e.height,a=(n?t-e.left:e.bottom-t)/i;return e.start+(e.end-e.start)*a},getPixelForTick:function(t){return this.getPixelForValue(this.ticksAsNumbers[t])}});t.scaleService.registerScaleType("linear",i,n)}},{}],46:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=e.noop;t.LinearScaleBase=t.Scale.extend({handleTickRangeOptions:function(){var t=this,n=t.options,i=n.ticks;if(i.beginAtZero){var a=e.sign(t.min),r=e.sign(t.max);a<0&&r<0?t.max=0:a>0&&r>0&&(t.min=0)}void 0!==i.min?t.min=i.min:void 0!==i.suggestedMin&&(null===t.min?t.min=i.suggestedMin:t.min=Math.min(t.min,i.suggestedMin)),void 0!==i.max?t.max=i.max:void 0!==i.suggestedMax&&(null===t.max?t.max=i.suggestedMax:t.max=Math.max(t.max,i.suggestedMax)),t.min===t.max&&(t.max++,i.beginAtZero||t.min--)},getTickLimit:n,handleDirectionalChanges:n,buildTicks:function(){var n=this,i=n.options,a=i.ticks,r=n.getTickLimit();r=Math.max(2,r);var o={maxTicks:r,min:a.min,max:a.max,stepSize:e.getValueOrDefault(a.fixedStepSize,a.stepSize)},s=n.ticks=t.Ticks.generators.linear(o,n);n.handleDirectionalChanges(),n.max=e.max(s),n.min=e.min(s),a.reverse?(s.reverse(),n.start=n.max,n.end=n.min):(n.start=n.min,n.end=n.max)},convertTicksToLabels:function(){var e=this;e.ticksAsNumbers=e.ticks.slice(),e.zeroLineIndex=e.ticks.indexOf(0),t.Scale.prototype.convertTicksToLabels.call(e)}})}},{}],47:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n={position:"left",ticks:{callback:t.Ticks.formatters.logarithmic}},i=t.Scale.extend({determineDataLimits:function(){function t(t){return u?t.xAxisID===n.id:t.yAxisID===n.id}var n=this,i=n.options,a=i.ticks,r=n.chart,o=r.data,s=o.datasets,l=e.getValueOrDefault,u=n.isHorizontal();n.min=null,n.max=null,n.minNotZero=null;var d=i.stacked;if(void 0===d&&e.each(s,function(e,n){if(!d){var i=r.getDatasetMeta(n);r.isDatasetVisible(n)&&t(i)&&void 0!==i.stack&&(d=!0)}}),i.stacked||d){var c={};e.each(s,function(a,o){var s=r.getDatasetMeta(o),l=[s.type,void 0===i.stacked&&void 0===s.stack?o:"",s.stack].join(".");r.isDatasetVisible(o)&&t(s)&&(void 0===c[l]&&(c[l]=[]),e.each(a.data,function(t,e){var a=c[l],r=+n.getRightValue(t);isNaN(r)||s.data[e].hidden||(a[e]=a[e]||0,i.relativePoints?a[e]=100:a[e]+=r)}))}),e.each(c,function(t){var i=e.min(t),a=e.max(t);n.min=null===n.min?i:Math.min(n.min,i),n.max=null===n.max?a:Math.max(n.max,a)})}else e.each(s,function(i,a){var o=r.getDatasetMeta(a);r.isDatasetVisible(a)&&t(o)&&e.each(i.data,function(t,e){var i=+n.getRightValue(t);isNaN(i)||o.data[e].hidden||(null===n.min?n.min=i:i<n.min&&(n.min=i),null===n.max?n.max=i:i>n.max&&(n.max=i),0!==i&&(null===n.minNotZero||i<n.minNotZero)&&(n.minNotZero=i))})});n.min=l(a.min,n.min),n.max=l(a.max,n.max),n.min===n.max&&(0!==n.min&&null!==n.min?(n.min=Math.pow(10,Math.floor(e.log10(n.min))-1),n.max=Math.pow(10,Math.floor(e.log10(n.max))+1)):(n.min=1,n.max=10))},buildTicks:function(){var n=this,i=n.options,a=i.ticks,r={min:a.min,max:a.max},o=n.ticks=t.Ticks.generators.logarithmic(r,n);n.isHorizontal()||o.reverse(),n.max=e.max(o),n.min=e.min(o),a.reverse?(o.reverse(),n.start=n.max,n.end=n.min):(n.start=n.min,n.end=n.max)},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),t.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t){return this.getPixelForValue(this.tickValues[t])},getPixelForValue:function(t){var n,i,a,r=this,o=r.start,s=+r.getRightValue(t),l=r.options,u=l.ticks;return r.isHorizontal()?(a=e.log10(r.end)-e.log10(o),0===s?i=r.left:(n=r.width,i=r.left+n/a*(e.log10(s)-e.log10(o)))):(n=r.height,0!==o||u.reverse?0===r.end&&u.reverse?(a=e.log10(r.start)-e.log10(r.minNotZero),i=s===r.end?r.top:s===r.minNotZero?r.top+.02*n:r.top+.02*n+.98*n/a*(e.log10(s)-e.log10(r.minNotZero))):0===s?i=u.reverse?r.top:r.bottom:(a=e.log10(r.end)-e.log10(o),n=r.height,i=r.bottom-n/a*(e.log10(s)-e.log10(o))):(a=e.log10(r.end)-e.log10(r.minNotZero),i=s===o?r.bottom:s===r.minNotZero?r.bottom-.02*n:r.bottom-.02*n-.98*n/a*(e.log10(s)-e.log10(r.minNotZero)))),i},getValueForPixel:function(t){var n,i,a=this,r=e.log10(a.end)-e.log10(a.start);return a.isHorizontal()?(i=a.width,n=a.start*Math.pow(10,(t-a.left)*r/i)):(i=a.height,n=Math.pow(10,(a.bottom-t)*r/i)/a.start),n}});t.scaleService.registerScaleType("logarithmic",i,n)}},{}],48:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=t.options;return e.angleLines.display||e.pointLabels.display?t.chart.data.labels.length:0}function n(t){var e=t.options.pointLabels,n=f.getValueOrDefault(e.fontSize,g.defaultFontSize),i=f.getValueOrDefault(e.fontStyle,g.defaultFontStyle),a=f.getValueOrDefault(e.fontFamily,g.defaultFontFamily),r=f.fontString(n,i,a);return{size:n,style:i,family:a,font:r}}function i(t,e,n){return f.isArray(n)?{w:f.longestText(t,t.font,n),h:n.length*e+1.5*(n.length-1)*e}:{w:t.measureText(n).width,h:e}}function a(t,e,n,i,a){return t===i||t===a?{start:e-n/2,end:e+n/2}:t<i||t>a?{start:e-n-5,end:e}:{start:e,end:e+n+5}}function r(t){var r,o,s,l=n(t),u=Math.min(t.height/2,t.width/2),d={r:t.width,l:0,t:t.height,b:0},c={};t.ctx.font=l.font,t._pointLabelSizes=[];var h=e(t);for(r=0;r<h;r++){s=t.getPointPosition(r,u),o=i(t.ctx,l.size,t.pointLabels[r]||""),t._pointLabelSizes[r]=o;var g=t.getIndexAngle(r),p=f.toDegrees(g)%360,m=a(p,s.x,o.w,0,180),v=a(p,s.y,o.h,90,270);m.start<d.l&&(d.l=m.start,c.l=g),m.end>d.r&&(d.r=m.end,c.r=g),v.start<d.t&&(d.t=v.start,c.t=g),v.end>d.b&&(d.b=v.end,c.b=g)}t.setReductions(u,d,c)}function o(t){var e=Math.min(t.height/2,t.width/2);t.drawingArea=Math.round(e),t.setCenterPoint(0,0,0,0)}function s(t){return 0===t||180===t?"center":t<180?"left":"right"}function l(t,e,n,i){if(f.isArray(e))for(var a=n.y,r=1.5*i,o=0;o<e.length;++o)t.fillText(e[o],n.x,a),a+=r;else t.fillText(e,n.x,n.y)}function u(t,e,n){90===t||270===t?n.y-=e.h/2:(t>270||t<90)&&(n.y-=e.h)}function d(t){var i=t.ctx,a=f.getValueOrDefault,r=t.options,o=r.angleLines,d=r.pointLabels;i.lineWidth=o.lineWidth,i.strokeStyle=o.color;var c=t.getDistanceFromCenterForValue(r.reverse?t.min:t.max),h=n(t);i.textBaseline="top";for(var p=e(t)-1;p>=0;p--){if(o.display){var m=t.getPointPosition(p,c);i.beginPath(),i.moveTo(t.xCenter,t.yCenter),i.lineTo(m.x,m.y),i.stroke(),i.closePath()}if(d.display){var v=t.getPointPosition(p,c+5),y=a(d.fontColor,g.defaultFontColor);i.font=h.font,i.fillStyle=y;var b=t.getIndexAngle(p),x=f.toDegrees(b);i.textAlign=s(x),u(x,t._pointLabelSizes[p],v),l(i,t.pointLabels[p]||"",v,h.size)}}}function c(t,n,i,a){var r=t.ctx;if(r.strokeStyle=f.getValueAtIndexOrDefault(n.color,a-1),r.lineWidth=f.getValueAtIndexOrDefault(n.lineWidth,a-1),t.options.gridLines.circular)r.beginPath(),r.arc(t.xCenter,t.yCenter,i,0,2*Math.PI),
r.closePath(),r.stroke();else{var o=e(t);if(0===o)return;r.beginPath();var s=t.getPointPosition(0,i);r.moveTo(s.x,s.y);for(var l=1;l<o;l++)s=t.getPointPosition(l,i),r.lineTo(s.x,s.y);r.closePath(),r.stroke()}}function h(t){return f.isNumber(t)?t:0}var f=t.helpers,g=t.defaults.global,p={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},gridLines:{circular:!1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2,callback:t.Ticks.formatters.linear},pointLabels:{display:!0,fontSize:10,callback:function(t){return t}}},m=t.LinearScaleBase.extend({setDimensions:function(){var t=this,e=t.options,n=e.ticks;t.width=t.maxWidth,t.height=t.maxHeight,t.xCenter=Math.round(t.width/2),t.yCenter=Math.round(t.height/2);var i=f.min([t.height,t.width]),a=f.getValueOrDefault(n.fontSize,g.defaultFontSize);t.drawingArea=e.display?i/2-(a/2+n.backdropPaddingY):i/2},determineDataLimits:function(){var t=this,e=t.chart,n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;f.each(e.data.datasets,function(a,r){if(e.isDatasetVisible(r)){var o=e.getDatasetMeta(r);f.each(a.data,function(e,a){var r=+t.getRightValue(e);isNaN(r)||o.data[a].hidden||(n=Math.min(r,n),i=Math.max(r,i))})}}),t.min=n===Number.POSITIVE_INFINITY?0:n,t.max=i===Number.NEGATIVE_INFINITY?0:i,t.handleTickRangeOptions()},getTickLimit:function(){var t=this.options.ticks,e=f.getValueOrDefault(t.fontSize,g.defaultFontSize);return Math.min(t.maxTicksLimit?t.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*e)))},convertTicksToLabels:function(){var e=this;t.LinearScaleBase.prototype.convertTicksToLabels.call(e),e.pointLabels=e.chart.data.labels.map(e.options.pointLabels.callback,e)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){this.options.pointLabels.display?r(this):o(this)},setReductions:function(t,e,n){var i=this,a=e.l/Math.sin(n.l),r=Math.max(e.r-i.width,0)/Math.sin(n.r),o=-e.t/Math.cos(n.t),s=-Math.max(e.b-i.height,0)/Math.cos(n.b);a=h(a),r=h(r),o=h(o),s=h(s),i.drawingArea=Math.min(Math.round(t-(a+r)/2),Math.round(t-(o+s)/2)),i.setCenterPoint(a,r,o,s)},setCenterPoint:function(t,e,n,i){var a=this,r=a.width-e-a.drawingArea,o=t+a.drawingArea,s=n+a.drawingArea,l=a.height-i-a.drawingArea;a.xCenter=Math.round((o+r)/2+a.left),a.yCenter=Math.round((s+l)/2+a.top)},getIndexAngle:function(t){var n=2*Math.PI/e(this),i=this.chart.options&&this.chart.options.startAngle?this.chart.options.startAngle:0,a=i*Math.PI*2/360;return t*n+a},getDistanceFromCenterForValue:function(t){var e=this;if(null===t)return 0;var n=e.drawingArea/(e.max-e.min);return e.options.reverse?(e.max-t)*n:(t-e.min)*n},getPointPosition:function(t,e){var n=this,i=n.getIndexAngle(t)-Math.PI/2;return{x:Math.round(Math.cos(i)*e)+n.xCenter,y:Math.round(Math.sin(i)*e)+n.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(){var t=this,e=t.min,n=t.max;return t.getPointPositionForValue(0,t.beginAtZero?0:e<0&&n<0?n:e>0&&n>0?e:0)},draw:function(){var t=this,e=t.options,n=e.gridLines,i=e.ticks,a=f.getValueOrDefault;if(e.display){var r=t.ctx,o=a(i.fontSize,g.defaultFontSize),s=a(i.fontStyle,g.defaultFontStyle),l=a(i.fontFamily,g.defaultFontFamily),u=f.fontString(o,s,l);f.each(t.ticks,function(s,l){if(l>0||e.reverse){var d=t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),h=t.yCenter-d;if(n.display&&0!==l&&c(t,n,d,l),i.display){var f=a(i.fontColor,g.defaultFontColor);if(r.font=u,i.showLabelBackdrop){var p=r.measureText(s).width;r.fillStyle=i.backdropColor,r.fillRect(t.xCenter-p/2-i.backdropPaddingX,h-o/2-i.backdropPaddingY,p+2*i.backdropPaddingX,o+2*i.backdropPaddingY)}r.textAlign="center",r.textBaseline="middle",r.fillStyle=f,r.fillText(s,t.xCenter,h)}}}),(e.angleLines.display||e.pointLabels.display)&&d(t)}}});t.scaleService.registerScaleType("radialLinear",m,p)}},{}],49:[function(t,e,n){"use strict";var i=t(6);i="function"==typeof i?i:window.moment,e.exports=function(t){function e(t,e){var n=t.options.time;if("string"==typeof n.parser)return i(e,n.parser);if("function"==typeof n.parser)return n.parser(e);if("function"==typeof e.getMonth||"number"==typeof e)return i(e);if(e.isValid&&e.isValid())return e;var a=n.format;return"string"!=typeof a&&a.call?(console.warn("options.time.format is deprecated and replaced by options.time.parser."),a(e)):i(e,a)}function n(t,e,n,i){for(var a,r=Object.keys(s),o=r.length,l=r.indexOf(t);l<o;l++){a=r[l];var u=s[a],d=u.steps&&u.steps[u.steps.length-1]||u.maxStep;if(void 0===d||Math.ceil((n-e)/(d*u.size))<=i)break}return a}function a(t,e,n,i){var a=s[n],r=a.size,o=Math.ceil((e-t)/r),l=1,u=e-t;if(a.steps)for(var d=a.steps.length,c=0;c<d&&o>i;c++)l=a.steps[c],o=Math.ceil(u/(r*l));else for(;o>i&&i>0;)++l,o=Math.ceil(u/(r*l));return l}function r(t,e,n){var a=[];if(t.maxTicks){var r=t.stepSize;a.push(void 0!==t.min?t.min:n.min);for(var o=i(n.min);o.add(r,t.unit).valueOf()<n.max;)a.push(o.valueOf());var s=t.max||n.max;a[a.length-1]!==s&&a.push(s)}return a}var o=t.helpers,s={millisecond:{size:1,steps:[1,2,5,10,20,50,100,250,500]},second:{size:1e3,steps:[1,2,5,10,30]},minute:{size:6e4,steps:[1,2,5,10,30]},hour:{size:36e5,steps:[1,2,3,6,12]},day:{size:864e5,steps:[1,2,5]},week:{size:6048e5,maxStep:4},month:{size:2628e6,maxStep:3},quarter:{size:7884e6,maxStep:4},year:{size:3154e7,maxStep:!1}},l={position:"bottom",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm:ss a",hour:"MMM D, hA",day:"ll",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1}};t.Ticks.generators.time=function(t,e){var n,a,o=t.isoWeekday;return"week"===t.unit&&o!==!1?(n=i(e.min).startOf("isoWeek").isoWeekday(o).valueOf(),a=i(e.max).startOf("isoWeek").isoWeekday(o),e.max-a>0&&a.add(1,"week"),a=a.valueOf()):(n=i(e.min).startOf(t.unit).valueOf(),a=i(e.max).startOf(t.unit),e.max-a>0&&a.add(1,t.unit),a=a.valueOf()),r(t,e,{min:n,max:a})};var u=t.Scale.extend({initialize:function(){if(!i)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");t.Scale.prototype.initialize.call(this)},determineDataLimits:function(){var t,n=this,i=n.options.time,a=Number.MAX_SAFE_INTEGER,r=Number.MIN_SAFE_INTEGER,s=n.chart.data,l={labels:[],datasets:[]};o.each(s.labels,function(o,s){var u=e(n,o);u.isValid()&&(i.round&&u.startOf(i.round),t=u.valueOf(),a=Math.min(t,a),r=Math.max(t,r),l.labels[s]=t)}),o.each(s.datasets,function(s,u){var d=[];"object"==typeof s.data[0]&&null!==s.data[0]&&n.chart.isDatasetVisible(u)?o.each(s.data,function(o,s){var l=e(n,n.getRightValue(o));l.isValid()&&(i.round&&l.startOf(i.round),t=l.valueOf(),a=Math.min(t,a),r=Math.max(t,r),d[s]=t)}):d=l.labels.slice(),l.datasets[u]=d}),n.dataMin=a,n.dataMax=r,n._parsedData=l},buildTicks:function(){var i,r,s=this,l=s.options.time,u=s.dataMin,d=s.dataMax;if(l.min){var c=e(s,l.min);l.round&&c.round(l.round),i=c.valueOf()}l.max&&(r=e(s,l.max).valueOf());var h=s.getLabelCapacity(i||u),f=l.unit||n(l.minUnit,i||u,r||d,h);s.displayFormat=l.displayFormats[f];var g=l.stepSize||a(i||u,r||d,f,h);s.ticks=t.Ticks.generators.time({maxTicks:h,min:i,max:r,stepSize:g,unit:f,isoWeekday:l.isoWeekday},{min:u,max:d}),s.max=o.max(s.ticks),s.min=o.min(s.ticks)},getLabelForIndex:function(t,n){var i=this,a=i.chart.data.labels&&t<i.chart.data.labels.length?i.chart.data.labels[t]:"",r=i.chart.data.datasets[n].data[t];return null!==r&&"object"==typeof r&&(a=i.getRightValue(r)),i.options.time.tooltipFormat&&(a=e(i,a).format(i.options.time.tooltipFormat)),a},tickFormatFunction:function(t,e,n){var i=t.format(this.displayFormat),a=this.options.ticks,r=o.getValueOrDefault(a.callback,a.userCallback);return r?r(i,e,n):i},convertTicksToLabels:function(){var t=this;t.ticksAsTimestamps=t.ticks,t.ticks=t.ticks.map(function(t){return i(t)}).map(t.tickFormatFunction,t)},getPixelForOffset:function(t){var e=this,n=e.max-e.min,i=n?(t-e.min)/n:0;if(e.isHorizontal()){var a=e.width*i;return e.left+Math.round(a)}var r=e.height*i;return e.top+Math.round(r)},getPixelForValue:function(t,n,i){var a=this,r=null;if(void 0!==n&&void 0!==i&&(r=a._parsedData.datasets[i][n]),null===r&&(t&&t.isValid||(t=e(a,a.getRightValue(t))),t&&t.isValid&&t.isValid()&&(r=t.valueOf())),null!==r)return a.getPixelForOffset(r)},getPixelForTick:function(t){return this.getPixelForOffset(this.ticksAsTimestamps[t])},getValueForPixel:function(t){var e=this,n=e.isHorizontal()?e.width:e.height,a=(t-(e.isHorizontal()?e.left:e.top))/n;return i(e.min+a*(e.max-e.min))},getLabelWidth:function(e){var n=this,i=n.options.ticks,a=n.ctx.measureText(e).width,r=Math.cos(o.toRadians(i.maxRotation)),s=Math.sin(o.toRadians(i.maxRotation)),l=o.getValueOrDefault(i.fontSize,t.defaults.global.defaultFontSize);return a*r+l*s},getLabelCapacity:function(t){var e=this;e.displayFormat=e.options.time.displayFormats.millisecond;var n=e.tickFormatFunction(i(t),0,[]),a=e.getLabelWidth(n),r=e.isHorizontal()?e.width:e.height,o=r/a;return o}});t.scaleService.registerScaleType("time",u,l)}},{6:6}]},{},[7])(7)});
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function () {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        var ce = new window.CustomEvent('test', {cancelable: true});
        ce.preventDefault();
        if (ce.defaultPrevented !== true) {
            // IE has problems with .preventDefault() on custom events
            // http://stackoverflow.com/questions/23349191
            throw new Error('Could not prevent default');
        }
    } catch(e) {
        var CustomEvent = function(event, params) {
            var evt, origPrevent;
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };

            evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            origPrevent = evt.preventDefault;
            evt.preventDefault = function () {
                origPrevent.call(this);
                try {
                    Object.defineProperty(this, 'defaultPrevented', {
                        get: function () {
                            return true;
                        }
                    });
                } catch(e) {
                    this.defaultPrevented = true;
                }
            };
            return evt;
        };

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent; // expose definition to window
    }
})();

/** When an element is 'popped out' it is hidden and replaced with something that the user
 * can user to show the content. This method should create that something.
 * The function that will display the content in a lightbox can be accessed via: $T(e).showPopup
 * Only called if the element should be popped out.
 * @param l the suggested label to use for the trigger
 */
var popoutElement = function(e, label) {
	// IE 8 is not good
	var link = document.createElement('a');
	link.className = 'popoutContentLink';

	link = $(link);
	link.insert('<span>' + label + '</span>');
	link.observe('click', $T(e).showPopup);
	e.insert({'after': link});
}

/** replaces content with a link that will show said content in a lightbox. */
var popoutContent = function(elements, label) {
	// TODO render off-screen and remeasure based on actual dimensions
	var showPopup = function(element) {
		var padding = 50 * 2;	// padding double for top/bottom & right/left
		var width = Math.min(document.viewport.getWidth() * .9, element.getWidth() + padding);
		var height = Math.min(document.viewport.getHeight() * .85, element.getHeight() + padding);
		
		// see lightbox.js & window.js
		var win = new Window({
			minimizable : false,
			maximizable : false,
			draggable : true,
			destroyOnClose: true,
			recenterAuto: false,
			width: width,
			height: height,
			zIndex: 10000
		});

		// wrap content in the same div's as the lightbox layout
		var container = new Element('div').update(new Element('div', {'id':'modalContent'}).update('<div id="modalInnerContent"><div class="popoutContentWrapper"></div></div>'));
		// TODO replace with Element.clone() after upgrading
		container.down('.popoutContentWrapper').insert(element.cloneNode(true));
		
		// note: do not use setContent() as it can cause errors in IE 7
		win.setHTMLContent(container.innerHTML);
		window.currentLightbox = win;
		
		win.showCenter(true, 80);
		
		//TEMPORARY FIX TO ADD BASE CLASS TO ALL INLINE POPUP CONTENT
		$$("div.dialog_content").each(function(el) {
			el.addClassName("mainBase");
		});
	};
	
	elements = $(elements);
	elements.each(function(e) {
		if (e.hasClassName('nosuppress') || e.up('.nosuppress')) return;
		
		var l = e.title || label;
		e.addClassName('popoutContent');
		$T(e).showPopup = showPopup.curry(e);
		popoutElement(e, l);
	});
}

/** Makes links that popout trigger the popout directly. 
the anchor may link to either the id of the item directly. */
// TODO this would probably be faster to maintain a list of tables that are popped out
var popoutLinks = function() {
	var basePath = window.location.pathname + "#";
	if (!basePath.startsWith('/')) basePath = '/' + basePath;
	
	$$('#readPanel a[href*="#"]').each(function(a) {
		var href = a.readAttribute('href')
		if (href == "#" || !(href.startsWith('#') || href.startsWith(basePath))) return;

		var id = href.substring(href.indexOf('#') + 1);
		if(id.indexOf(".") > 0) {
			// TODO: ping server so log shows, periods in IDs really messes things up!
			return;
		}
		var target = $(id);
		if (!target) return;

		var show = $T(target).showPopup;

		if (!show) {
			target = target.down('.popoutContent');
			if (target)
				show = $T(target).showPopup;
		}

		if (!show) return;
		a.observe('click', function(event) { show(); Event.stop(event); });
	});
}
(function($, w, d) {
    
	// global variables to keep our bloodhound references so we don't
    // make multiple Bloodhound instances for the same sources.
    var globalBloodhound = null;
    var fieldBloodhound = {};
    var typeaheadId = 0;
    
	$TYPEAHEAD = {
        
        transformTypeaheadResponse: function(response) {
            return response.suggestions ? response.suggestions : [];
        },
        
        tokenizeInput: function(inputData) {
            if (inputData !== null)
            {
                inputData = inputData.replace(/[^\w\s'-]/gi, " ");
            }
            return Bloodhound.tokenizers.whitespace(inputData);
        },
        
        sortByLastWord: function(firstElement, secondElement) {
            var result = 0;
            var firstLastWord = firstElement;
            var secondLastWord = secondElement;
            if (firstElement !== null && firstElement.lastIndexOf(" ") > -1)
            {
                firstLastWord = firstElement.substring(firstElement.lastIndexOf(" "));
            }
            if (secondElement !== null && secondElement.lastIndexOf(" ") > -1)
            {
                secondLastWord = secondElement.substring(secondElement.lastIndexOf(" "));
            }
            result = firstLastWord.localeCompare(secondLastWord);
            if (result == 0 && firstElement !== null && secondElement !== null)
            {
                result = firstElement.localeCompare(secondElement);
            }
            return result;
        },
        
        initBloodhound: function(fieldName, prefetch, suggest, sorterName) {
            var prefetchConfig = null;
            var remoteConfig = null;
            var prefetchUrl = "/rest/typeahead/prefetch";
            var suggestUrl = "/rest/typeahead/suggest?partial=%QUERY";
            var sorter = null;
            if (sorterName === "sortByLastWord")
            {
                sorter = this.sortByLastWord;
            }
            var bloodhound = null;
            
            if (fieldName) {
                prefetchUrl += "?field=" + fieldName;
                suggestUrl += "&field=" + fieldName;
            }
            
            if (prefetch) {
                prefetchConfig = {
                    url: prefetchUrl,
                    transform: this.transformTypeaheadResponse
                };
            }
            if (suggest) {
                remoteConfig = {
                    url: suggestUrl,
                    wildcard: '%QUERY',
                    transform: this.transformTypeaheadResponse
                };
            }
            
            bloodhound = new Bloodhound({
                datumTokenizer: this.tokenizeInput,
                queryTokenizer: this.tokenizeInput,
                remote: remoteConfig,
                prefetch: prefetchConfig,
                sorter: sorter
            });
            
            bloodhound.initialize();
            
            return bloodhound;
        },
        
        initTypeahead: function(input) {
            var fieldName = input.data("typeahead-field");
            var prefetch = input.data("typeahead-prefetch") ? input.data("typeahead-prefetch") : false;
            var suggest = input.data("typeahead-suggest") ? input.data("typeahead-suggest") : false;
            var limit = input.data("typeahead-limit") ? input.data("typeahead-limit") : 5;
            var sorterName = input.data("typeahead-sort") ? input.data("typeahead-sort") : null;
            var suggestionBloodhound = null;
            
            if (fieldName) {
                if (fieldBloodhound[fieldName] == null) {
                    fieldBloodhound[fieldName] = this.initBloodhound(fieldName, prefetch, suggest, sorterName);
                }
                suggestionBloodhound = fieldBloodhound[fieldName];
            }
            else {
                if (globalBloodhound == null) {
                    globalBloodhound = this.initBloodhound(null, prefetch, suggest, sorterName);
                }
                suggestionBloodhound = globalBloodhound;
            }

            input.typeahead({
            	name: "typeahead_" + typeaheadId++,
                hint: true,
                highlight: true,
                minLength: 3
            },
            {
                name: 'suggestions',
                limit: limit,
                source: suggestionBloodhound
            });
        }	
	}
	
	// scoping global
    window.$TYPEAHEAD= $TYPEAHEAD;
	
    // on DOM ready
    $(function() {    

        $(".js-typeahead").each(function() {
        	$TYPEAHEAD.initTypeahead($(this));
        })
        $("#quickSearch .single-query-form").on('typeahead:select', submitSuggestion);
       	
       	function submitSuggestion(ev, suggestion) {
	      $('#quickSearch .single-query-form ').submit();    // submit the form
	    }
    });

}(jQuery, window, document));
(function($, document, window) {

	// force focus from skip link to content
	// http://codepen.io/AtlantaJones/pen/gofmz
	var skipNavigation = function () {

		// bind a click event to the 'skip' link
		$(".js-skip").click(function () {

		  // strip the leading hash and declare 
		  // the content we're skipping to
		  var skipTo = "#" + this.href.split('#')[1];

		  // Setting 'tabindex' to -1 takes an element out of normal 
		  // tab flow but allows it to be focused via javascript
		  $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
		    // when focus leaves this element, 
		    // remove the tabindex attribute
		    $(this).removeAttr('tabindex');
		  }).focus();
		  // focus on the content container
		});
	};
	

	
	if(typeof PF === 'undefined') { PF = {}; }
	
	// Subject navigation menu -- WILEY-Specific
	var SubjectNav = PF.SubjectNav = {
		
		init: function() {
			var menuToggle = $('.js-subject-nav-toggle'),
				menu = $('.js-subject-nav-menu');
			
			menuToggle.click(function() {
				menu.toggleClass('open');
//				SubjectNav.updateToggle(menuToggle);
				return false;
			});
			
		},
		
		updateToggle: function(toggle) {
			var textArr = toggle.children().text().split(" "),
				textStr = "";

			textArr[0] = (textArr[0] === "View" ? "Hide" : "View");

			for(i = 0; i < textArr.length; i++) {
				if(i < textArr.length - 1) {
					textStr += textArr[i] + " ";
				} else {
					textStr += textArr[i];
				}
			}
			toggle.children().html(textStr);
		},
		
	};
	
	// Article navigation component
	var self,
		ArticleNav = PF.ArticleNav = {

		w: null,
		menu: null,
		toggle: null,
		nav: null,
		scrollpane: null,
		scrollpaneHeight: null,
		navList: null,
		anchor: null,
		sections: null,
		currentSection: null,
		navClicked: null,
		delay: null,
		transitionEndEventNames: {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transitionEnd: null,

		init: function() {
		
			self = this;
			
			self.initVariables();
			self.getSections();
			self.getCurrentSection();
			self.delay(function() {
				self.adjustHeight();
			}, 500);
			
			self.toggle.click(function() {

				self.menu.toggleClass('open');
				self.updateToggle($(this));
				
				// delaying the height adjustment seems to work, but I'm not exactly sure why
				self.delay(function() {
					self.adjustHeight();
				}, 500);
				
				// executing the height adjustment on transition end doesn't work, and I don't know why
//				if(Modernizr.csstransitions) {
//	                self.nav.on(self.transitionEnd, function(e) {
//	                    // transition complete
//	                	self.adjustHeight();
//	                });
//	            }
				
				return false;
			});
			
			self.anchor.click(function() {
				var anchorLink = $(this),
					targetData = anchorLink.data("target"),
					targetID = '#' + targetData,
					targetElem = $(targetID);

				if(targetElem.length) {
					self.navClicked = true;
					self.scrollToTarget(targetData, targetElem);
				}
				
			});
			
			$(window).scroll(function() {
				// if navlink wasn't clicked, then get current section on scroll

				if (!self.navClicked) {
					self.getCurrentSection();
				}
				self.adjustHeight();

	        });

			//need to call this on load
			$(window).resize(function() {
				self.delay(function() {
					self.adjustHeight();
				}, 500);
			});
		},
		

		// sets default values for global variables
		initVariables: function() {
			self.w = $(window),
			self.menu = $('.js-article-nav-menu'),	
			self.toggle = $('.js-article-nav-toggle'),
			self.nav = $('.js-article-nav'),
			self.scrollpane = $('.js-article-nav-scrollpane'),
			self.scrollpaneHeight = self.scrollpane.height();
			self.navList = $('.js-article-nav-list'),
			self.anchor = self.navList.find('a'),
			self.sections = [],
			self.navClicked = false;
			
			self.delay = (function(){
			  var timer = 0;
			  return function(callback, ms){
			    clearTimeout (timer);
			    timer = setTimeout(callback, ms);
			  };
			})();
			
			// used for CSS3 transition callbacks
			self.transitionEnd = self.transitionEndEventNames[Modernizr.prefixed('transition')];
		},
		
		adjustHeight: function() {
			var winH = self.w.height(),
				winBtm = self.w.scrollTop() + winH,
				navH = self.nav.outerHeight(true),
				navBtm = Math.round(navH + self.nav.position().top),
				reader = $('#readPanel'),
				readerBtm = Math.round(reader.offset().top + reader.outerHeight(true)),
				overflowPoint = winH;
			
			if ((self.toggle.not(':visible')) && (winBtm >= readerBtm)) {
				overflowPoint = winH - (winBtm - readerBtm);
			}

			if (self.menu.parent().is('[class*="is-fixed"]')) {
				// menu's parent is fixed
				var overflow = navBtm - overflowPoint,
					scrollpaneH = self.scrollpane.height(),
					scrollpaneMinH = 60; // arbitrary...fits 2 items

				if (navBtm > overflowPoint) {
					// if nav extends below overflow point, resize scrollpane
					scrollpaneH -= overflow;
					if (scrollpaneH < scrollpaneMinH) {
						scrollpaneH += (scrollpaneMinH - scrollpaneH);
					}
					self.scrollpane.css('height',  scrollpaneH + 'px').addClass('scrollable');
					
				} else {
					// if nav doesn't extends below overflow point, reset scrollpane
					scrollpaneH += (overflowPoint - navBtm);
					
					if (scrollpaneH > self.scrollpaneHeight) {
						self.scrollpane.removeAttr('style').removeClass('scrollable');
					} else {
						self.scrollpane.css('height',  scrollpaneH + 'px').addClass('scrollable');
					}
				}
				

			} else {
				// menu's parent isn't fixed, reset scrollpane
				self.scrollpane.removeAttr('style');
			}
		},
		
		// gets list of sections from the content and adds to an array
		getSections: function() {
			var sect = $('#contentRoot').children('section'),
				sectArray = [];
			
			sect.each(function() {
				var ID = $(this).attr('id');
				sectArray.push(ID);
			});
			
			self.sections = sectArray;

		},
		// determines which section is shown within viewport above target line
		getCurrentSection: function(data) {
			
			if (!data) {
				// if no data is passed, loop through array
				var scrollTop = self.w.scrollTop(),
					target = scrollTop + (self.w.height() / 4);
				
				$.each( self.sections, function( index, value ) {
					var section = $('#' + value),
						sectTop = section.offset().top,
						sectBtm = sectTop + section.height();
					
					if ((sectTop < target) && (sectBtm > target)) {
						self.currentSection = value;
						self.setState(value);
						return;
					}
				});
			} else {
				// if data is passed, use data
				self.currentSection = data;
				self.setState(data);
				return;
			}

		},
		// updates navlist to indicate which section is shown within viewport above target line
		setState: function(section) {
			var activeIcon = '<i class="ico-active"></i>',
				prevSectionLink = self.navList.find('.active'),
				currentSectionLink = self.navList.find("a[data-target='" + section + "']");

				if (prevSectionLink != null || prevSectionLink != "") {
					prevSectionLink.removeClass('active').find('.ico-active').remove();
				}
				currentSectionLink.addClass('active').prepend(activeIcon);
				
				self.navClicked = false;
		},
		
		// called on click of nav link, scrolls doc to target of the nav link
		scrollToTarget: function(data, elem) {
			var whitespace = self.w.height() / 4,
				targetOffset = elem.offset().top - whitespace;
			
			$('html,body').animate({scrollTop: targetOffset}, 1000, function() {
                self.getCurrentSection(data);
            });
			
			return false;
		},
		
		// updates the text of the toggle link to read "Show article navigation" or "Hide article navigation"
		updateToggle: function(toggle) {
			var textArr = toggle.children().text().split(" "),
				textStr = "";

			textArr[0] = (textArr[0] === "Show" ? "Hide" : "Show");

			for(i = 0; i < textArr.length; i++) {
				if(i < textArr.length - 1) {
					textStr += textArr[i] + " ";
				} else {
					textStr += textArr[i];
				}
			}
			toggle.children().html(textStr);
		},
		
	};

	if(typeof PF === 'undefined') { PF = {}; }
	
	// TODO NIKK use collapser functionality instead?!
	// allow facet blocks on the results pages to open and shut
	var FACET = PF.FACET = {

		init: function(defaultState) {
			var facets = $('.facet');
           /* PFCORE-1355 : Standardize the Search Filter RenderOpen via a config and not allow to be overridden by JS code.
			if (facets || facets.length > 0) { // determine if facet exists
				if (defaultState == open) {
					FACET.openAll(facets);
				} else {
					FACET.shutAll(facets);
				};
			};
			*/
			
			facets.on('click', '.facetToggle', function(event) {
				var toggle = $(this),
					targetFacet;
				
				if (toggle.parent().hasClass('facet')) {
					targetFacet = toggle.parent('.facet');
				} else {
					targetFacet = toggle.parent().parent().parent();
				};
				
				if (targetFacet.hasClass('shut')) {
					FACET.openFacet(targetFacet);
				} else {
					FACET.shutFacet(targetFacet);
				};
				
			});
		},

		openAll: function(eachFacet) {
			FACET.openFacet(eachFacet);
		},

		shutAll: function(eachFacet) {
			FACET.shutFacet(eachFacet);
		},

		openFacet: function(thisFacet) {
			thisFacet.addClass('open').removeClass('shut');
			thisFacet.find('.facetLabel').attr({"aria-expanded": "true", "aria-pressed": "true"});
			thisFacet.find('.facetValues').attr({"aria-hidden": "false"});
		},

		shutFacet: function(thisFacet) {
			thisFacet.addClass('shut').removeClass('open');
			thisFacet.find('.facetLabel').attr({"aria-expanded": "false", "aria-pressed": "false"});
			thisFacet.find('.facetValues').attr({"aria-hidden": "true"});
		},

	};
	
	// Sticky navigation -- WILEY-Specific, but could be updated to be reusable for toolbars
	var s,
		StickyNav = PF.StickyNav = {
			
		w: null,
		stickyNavElem: null,
		stickyNavTop: null,
		delay: null,
		transitionEndEventNames: {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transitionEnd: null,

		init: function() {
		
			s = this;
			
			s.initVariables();

			s.delay(function() {
				s.stickIt();
			}, 500);

			$(window).scroll(function() {
				s.stickIt();
	        });

			//need to call this on load
			$(window).resize(function() {
				s.stickIt();
			});
		},

		// sets default values for global variables
		initVariables: function() {
			s.w = $(window),
			s.stickyNavElem = $('#pageBody').find("[data-module='toolbar']"),
			s.stickyNavTop = s.stickyNavElem.offset().top;
			
			s.delay = (function(){
			  var timer = 0;
			  return function(callback, ms){
			    clearTimeout (timer);
			    timer = setTimeout(callback, ms);
			  };
			})();
			
			// used for CSS3 transition callbacks
			s.transitionEnd = s.transitionEndEventNames[Modernizr.prefixed('transition')];
		},
		
		stickIt: function() {
			var scrollTop = s.w.scrollTop();
			
			// on window scroll and on load
			if (scrollTop > s.stickyNavTop) {
				s.stickyNavElem.addClass('is-fixed');
			} else {
				s.stickyNavElem.removeClass('is-fixed');
			}
		},
	};
	

	// on DOM ready
	$(function() { 

		skipNavigation();
		
		SubjectNav.init(); //Wiley-specific
		
		if ($('body').hasClass('page-viewtitle') && $('.facet')) {
			FACET.init();
		} else {
			FACET.init(open);
		}


		
		
		
		if ($('.contentItem .context') && ($('body').hasClass('page-subject') || $('body').hasClass('page-viewtitle'))) {
			
			var context = $('.contentItem .context');
			truncate(context, 4, true, 12, 1.4);

		};
		
		if($(".truncate-list")) {
			$(".truncate-list ul").each(function() {
				if($(this).find("ul").size() == 0) {
					truncateList($(this), $(".truncate-list").attr('data-truncate-after'));
				}
			});
		}
		
		// truncate a OL or UL after a certain number of elemenets
		function truncateList(listToTruncate, linesToShow) {
			var children = $(listToTruncate).children("li");
			var x=0;
			if (children.size() > linesToShow) {
				$(children).each(function() {
					if (x >= linesToShow) {
						$(this).addClass("hidden");
					}
					x++;
				});
				$(listToTruncate).append("<li class='truncate-show-more'><a class='truncate-show-more' href='#'>Show More</a></li>");
				$(".truncate-show-more a").click(function() {
					$(this).closest("ul").find("li.hidden").each(function() {
						$(this).removeClass("hidden");
					});
					$(this).remove();
				});
			}
		}

		// Truncate text -- NOTE: need to clean this up!
		function truncate(content, numLines, hasHeading, fontSize, lineHeight) {
			var ellipsisText = "...";
			var moreText = "Show more";
			var lessText = "Show less";
			
			content.each(function(index) {
				
				var contentHeight = $(this).height();
				var targetHeight = ((fontSize * lineHeight) * numLines);
				
				if (hasHeading == true) {
					var header = $(this).children().filter(":header");
					var headerHeight = header.outerHeight(true);
					
					targetHeight += headerHeight;
				}

				if (contentHeight > targetHeight) {
					var ellipsis = '<span class="ellipsis">' + ellipsisText + '</span>';
					var toggle = '<a href="#" class="context-toggle">' + moreText + '</a>';
					
					$(this).addClass("less").css('height', ((targetHeight - lineHeight) / fontSize) + 'em');
//					$(this).append(ellipsis);
					
					if (!$(this).next().hasClass('context-toggle')) {
						$(this).after(toggle);
					}

				}

			});
		};
		$('.context-toggle').click(function() {
			
			var toggle = $(this);
			var context = toggle.prev();
			var moreText = "Show more";
			var lessText = "Show less";
				
			if (context.hasClass("less")) {
	            context.removeClass("less").removeAttr("style");
	            toggle.html(lessText);
	        } else {
	            context.addClass("less");
	            truncate(context, 4, true, 12, 1.4);
	            toggle.html(moreText);
	        }

	        return false;
		});
		
		
		//currently wiley-specific
		if ($('body').hasClass('page-viewwmlcontent authenticated')) { 
			ArticleNav.init();
		}



		// Navigation Panel Toggles
		
		$('.js-faceted-nav-toggle').on('click', function(e) { 
			$('.js-faceted-nav').toggleClass('open');
	     	e.preventDefault();
		});

		
		$('.js-news-nav-toggle').on('click', function(e) { 
			$('.js-news-nav-menu').toggleClass('open');

			var txt = $(".js-news-nav-menu").hasClass('open') ? 'Close' : 'Archives';
	     	$(this).children().text(txt);
	     	e.preventDefault();
		});

		$('.index-card-toggle').on('click', function(e) {
			$('.indexCard').toggleClass('open');
	     	e.preventDefault();
		});

		$('.js-summary-toggle', '#readPanel').on('click', function(e) {
			$('#readPanel').toggleClass('showSummary');
			e.preventDefault();
		});
		

	}); // end on DOM ready

	
})(jQuery, document, window);
/**
 * Initializes all slider components on the page.
 *
 * This works in conjunction with the structural.slider tapestry component.
 */
(function($) {

    $(".slider").each(function() {
        var container = $(this),
            slidesToShow = container.data("slidestoshow"),
            slidesToScroll = container.data("slidestoscroll"),
            centerMode = container.data("centermode"),
            vertical = container.data("vertical"),
            breakpoints = container.data("breakpoints"),
            autoplay = container.data("autoplay"),
            autoplaySpeed = container.data("autoplayspeed"),
            dots = container.data("dots"),
            initialIndex = container.data("initialindex")
            slideCount = container.find(".slide").size();

        slidesToShow = slidesToShow != null ? slidesToShow : 4;
        dots = dots != null ? dots : false;
        slidesToScroll = slidesToScroll != null ? slidesToScroll : 1;
        centerMode = centerMode != null ? centerMode : false;
        vertical = vertical != null ? vertical : false;
        autoplay = autoplay != null ? autoplay : false;
        autoplaySpeed = autoplaySpeed != null ? autoplaySpeed : 0;
        initialIndex = initialIndex != null ? parseInt(initialIndex, 10) : 0;

        if (initialIndex < 0) {
            initialIndex = Math.floor(Math.random() * slideCount);
        }

        responsive = null;
        if (breakpoints != null) {
            responsive = [];
            $.each(breakpoints, function(width, slidesToShow) {
                responsive.push({
                    breakpoint: width,
                    settings: {
                        slidesToShow: slidesToShow
                    }
                });
            });
        }

        container.slick({
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            centerMode: centerMode,
            dots: dots,
            vertical: vertical,
            responsive: responsive,
            autoplay: autoplay,
            autoplaySpeed : autoplaySpeed,
            initialSlide : initialIndex
        });
    });

})(jQuery);

/**
 * jQuery class for a collapsible tree.  This is a simplified form of the COLLAPSER js.
 * COLLAPSER was written to try and account for all of the legacy TOC trees and has some
 * complexity to it.  This is a streamlined implementation for the collapsible trees
 * used in the newer configurable pages.  It also includes support for ajax loading of
 * subtrees using Tapestry zones.
 */
(function($) {

    "use strict";

    /**
     * CollapsibleTree class
     */
    function CollapsibleTree(pTreeRoot) {
        var mTreeRoot = pTreeRoot,
            mTreeNodes = mTreeRoot.find("li"),
            mActiveNode = mTreeNodes.filter(".current"),
            mExpandAll = mTreeRoot.hasClass("expand-all"),
        	mCollapseNonMainMatter = mTreeRoot.hasClass("collapse-non-main-matter");

        var init = function() {
            initTreeNodes(mTreeNodes, mExpandAll);
            mActiveNode.parentsUntil(".collapsible-tree", "li").removeClass("shut");

            bindEvents();
        };

        var initTreeNodes = function (pTreeItems, pExpandAll) {

        	if (!pExpandAll) {
                pTreeItems.addClass("shut");
            }

            // toc entries with dynamic data are always collapsed.
            pTreeItems.filter('.ajax-node-opener').addClass("shut");

            pTreeItems.each(function() {
                var element = $(this),
                    children = element.find("ul");
                
                if (children.size()) {
                    element.prepend("<a class=\"toggle\"><span>Toggle Tree Node</span></a>");
                }
                
                if (mCollapseNonMainMatter && (element.hasClass("front-section") || element.hasClass("back-section"))) {
                	element.addClass("shut");
                }
            });
            
            
        };
        
        var bindEvents = function() {
            mTreeRoot.find(".toggle").live("click", function(event) {
                var toggle = $(this),
                    li = toggle.parent(),
                    toggleLink = li.children(".toggle-link").not(".toggle-link-fired");
                
                li.toggleClass("shut");

                toggleLink.each(function() {
                    var link = $(this),
                        alwayFire = link.data("alwaysfire");
                    
                    if (typeof alwaysFire == "undefined" || alwaysFire != true) {
                        link.addClass("toggle-link-fired");
                    }
                    
                    fireEvent(this, "click");
                });
                
                event.stopPropagation();
                return false;
            });
            
            mTreeRoot.find(".ajax-zone").on("zone-updated", function(event) {
                var subtree = $(this),
                    lis = subtree.find("li");
                    initTreeNodes(lis, false);

                mTreeNodes = mTreeRoot.find("li");
                lis.addClass("shut");
            });
        };
        
        /**
         * Public method to expand all nodes.
         */
        this.expandAll = function() {
            mTreeNodes.removeClass("shut");
        };
        
        /**
         * Public method to expand all nodes.
         */
        this.collapseAll = function() {
            mTreeNodes.addClass("shut");
        };
        
        init();

    };

    /**
     * Global collapsible tree method declarations.
     */
    var gMethods = {
        init: function (pOptions) {
            if (pOptions === undefined) {
                pOptions = { };
            }
            return this.each(function () {
                var tree = $(this).data("COLLAPSIBLETREE");
                if (!tree) {
                    tree = new CollapsibleTree($(this), pOptions)
                    $(this).data("COLLAPSIBLETREE", tree);
                }
                return tree;
            });
        },
        
        expandAll: function() {
            return $(this).data("COLLAPSIBLETREE").expandAll();
        },
        
        collapseAll: function() {
            return $(this).data("COLLAPSIBLETREE").collapseAll();
        }
        
    };

    /**
     * CollapsibleTree jQuery namespace.
     */
    $.fn.collapsibletree = function (pMethod) {

        var returnValue = null;

        if( gMethods[pMethod] ) {
            returnValue = gMethods[pMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof pMethod === 'object' || !pMethod) {
            returnValue = gMethods.init.apply(this, arguments);
        }
        else {
            $.error('Unknown method');
        }

        return returnValue;
    };

})(jQuery);

/**
 * A bit of prototype code to listen for the zone updated event and fire a custom
 * event that we listen for in jQuery.
 */
Event.observe(document, Tapestry.ZONE_UPDATED_EVENT, function(event) {
    var element = Event.element(event);
    fireEvent(element, "zone-updated");
});

/**
 * @file This file contains the javascript functionality to support configurable layout
 * components.
 */

(function($) {
	'use strict';

	/**
     * Creates a new ConfigurableLayout
	 * @class
     */
	function ConfigurableLayout(pContainer, pOptions) {
		const mLayout = this;
		const mContainer = pContainer;
		const mColumnGroups = new Array();

		/**
		 * Find and create a new ColumnGroup instance for all column group in a container
		 * @method init
		 * @private
		 */
		const init = function() {
			mContainer.find('> .column-group').each(function() {
				mColumnGroups.push(new ColumnGroup($(this), mLayout));
			});

		};



		init();
		$( document ).ready(function() {
			console.log( "ready!" );
		});

	}

	/**
     * Creates a new ColumnGroup
	 * @class
     */
	function ColumnGroup(pContainer, pLayout) {
		const mColumnGroup = this;
		const mContainer = pContainer;
		const mLayout = pLayout;
		const mColumns = new Array();

		/**
		 * Find and create a new Column instance for each column in a container
		 * @method init
		 * @private
		 */
		const init = function() {
			mContainer.find('> .column').each(function() {
				mColumns.push(new Column($(this), mColumnGroup));
			});
		};

		/**
         * Called by the columns when they are collapsed.
		 * @method columnCollapsed
		 * @public
         */
		this.columnCollapsed = function(pColumn) {
			fastdom.mutate(function() {
				mContainer[0].classList.add(pColumn.getName() + '-collapsed');
			});
		};

		/**
         * Called by the columns when they are uncollapsed (i.e. move from collapsed to
		 * regular state).
		 * @method columnUncollapsed
		 * @public
         */
		this.columnUncollapsed = function(pColumn) {
			fastdom.mutate(function() {
				mContainer[0].classList.remove(pColumn.getName() + '-collapsed', 'c-Drawer--close');
			});
		};

		/**
         * Called by the columns when they are expanded.
		 * @method columnExpanded
		 * @public
         */
		this.columnExpanded = function(pColumn) {
			mContainer[0].classList.add(pColumn.getName() + '-expanded');
			$.each(mColumns, function(index, column) {
				if (column != pColumn) {
					column.unexpand();
				}
			});
		};

		/**
         * Called by the columns when they are unexpanded (i.e. moved from expanded to
		 * regular state).
		 * @method columnUnexpanded
		 * @public
         */
		this.columnUnexpanded = function(pColumn) {
			fastdom.mutate(function() {
				mContainer[0].classList.remove(pColumn.getName() + '-expanded');
			});
		};

		init();
	}

	/**
     * Creates a new Column
	 * @class
     */
	function Column(pContainer, pGroup) {
		const mColumn = this;
		const mContainer = pContainer;
		const mColumnGroup = pGroup;
		const mName = mContainer.data('columnname');
		const mCollapsible = mContainer.hasClass('column-collapsible');
		const mExpandable = mContainer.hasClass('column-expandable');
		const mCollapseControl = mContainer.find('> .column-controls .control-column-collapse');
		const mExpandControl = mContainer.find('> .column-controls .control-column-expand');
		const mContainerBlocks = new Array();
		let mExpanded = mContainer.hasClass('column-expanded');
		let mCollapsed = mContainer.hasClass('column-collapsed');

		/**
		 * Expand/collapse event listeners.  Finds and creates new Container instances
		 * in the column.
		 * @method init
		 * @private
		 */
		const init = function() {
			if (mCollapsible || mExpandable) {
				mCollapseControl.on('click', collapse);
				mExpandControl.on('click', expand);
			}

			// if (mExpandable) {
			// 	mExpandControl.on('click', expand);
			// }

			mContainer.find('.component-container').each(function() {
				mContainerBlocks.push(new Container($(this)));
			});
		};

		/**
         * Collapses the column.
		 * @method collapse
		 * @private
         */
		const collapse = function(pEvent) {
			pEvent.preventDefault();
			pEvent.stopPropagation();

			if (mExpanded) {
				fastdom.mutate(function() {
					mContainer[0].classList.remove('column-expanded', 'c-Drawer--expand');
					mColumnGroup.columnUnexpanded(mColumn);
					mExpanded = false;
				});
			} else {
				fastdom.mutate(function() {
					mContainer[0].classList.add('column-collapsed', 'c-Drawer--close');
					mColumnGroup.columnCollapsed(mColumn);
					mCollapsed = true;
				});
			}

			return false;
		};

		/**
         * Expands the column.
		 * @method expand
		 * @private
         */
		var expand = function(pEvent) {
			pEvent.preventDefault();
			pEvent.stopPropagation();

			if (mCollapsed) {
				mContainer[0].classList.remove('column-collapsed', 'c-Drawer--close');
				mColumnGroup.columnUncollapsed(mColumn);
				mCollapsed = false;
			} else {
				mContainer[0].classList.add('column-expanded', 'c-Drawer--expand');
				mColumnGroup.columnExpanded(mColumn);
				mExpanded = true;
			}

			return false;
		};

		/**
         * Returns the name of the column.
		 * @method getName
		 * @public
         */
		this.getName = function() {
			return mName;
		};

		/**
         * Unexpands the column if it's expanded (i.e. goes back to default state).
		 * @method unexpand
		 * @public
         */
		this.unexpand = function() {
			if (mExpanded) {
				fastdom.mutate(function() {
					mContainer[0].classList.remove('column-expanded', 'c-Drawer--expand');
					mColumnGroup.columnUnexpanded(mColumn);
					mExpanded = false;
				});
			}
		};

		init();
	}

	/**
     * Container class
	 * @class
     */
	function Container(pContainer) {
		const mContainer = pContainer;
		const mSliders = mContainer.find('.slider');
		let mStyle = 'list';
		let tabAddress;

		/**
		 * @method init
		 * @private
		 */
		const init = function() {
			if (mContainer[0].classList.contains('container-tabbed')) {
				mStyle = 'tabbed';
				tabAddress = mContainer.find("[data-container-tab-address]").data("container-tab-address")
				initTabs();
				if (tabAddress) {
					initTabAddressing();
				}
			} else if (mContainer[0].classList.contains('container-accordion')) {
				mStyle = 'accordion';
				initAccordion();
			}

		};

		/**
		 * @method initTabs
		 * @private
		 */
		const initTabs = function() {
			const disabledTabs = mContainer.find('nav').first().find('li.disabled');
			const activeTab = mContainer.find('nav').first().find('li.active').index();
			const initialTabIndex = activeTab >= 0 ? activeTab : 0;
			const disabledTabIndexes = [];

			disabledTabs.each(function() {
				disabledTabIndexes.push($(this).index());
			});

			mContainer.tabs({
				active: initialTabIndex,
				disabled: disabledTabIndexes,
				activate: function(event, ui) {

					mSliders.slick('reinit');
					processCounterUsage(ui);

				},

			});
		};

		/**
		 * Setup behavior for adding tab addresses to the browser history as a user switches tabs.
		 * Also reacts to the pop state so it can swap the tab if the browser history changes.
		 * @return
		 */
		const initTabAddressing = function () {
			if (!tabAddress) { return }

			// it doesn't look like jqueryui tabs support passing arbitrary data to their events, so i'm using a
			// dirty flag here for some control
			var inPopState = false

			mContainer.on('tabsactivate', function (event, ui) {
				// if a browser history change caused the tab to change, do not update the history again
				if (!inPopState) {
					var tabviewid = ui.newTab.find('[data-tab-id]').data('tab-id')
					if (tabviewid) {
						var queryParams = getQueryParams()
						queryParams[tabAddress] = tabviewid
						history.replaceState(null, null, '?' + toQueryString(queryParams))
					}
				}
			})

			window.addEventListener('popstate', function (event) {
				// set the dirty flag so the tab change callback knows that what invoked the change
				// to prevent further writes to the history
				inPopState = true

				var tabIndex = getAddressedTabIndex()
				if (tabIndex > -1) {
					mContainer.tabs('option', { active: tabIndex })
				}

				// defer clearing the flag in case any of the ui tabs methods are also deferred or promisfied
				setTimeout(function () {
					inPopState = false
				}, 1)
			})
		}

		/**
		 * @method initAccordion
		 * @private
		 */
		const initAccordion = function() {
			const accordionRoot = mContainer
				.children('.content-box')
				.children('.content-box-body')
				.children('.container-body');

			accordionRoot.accordion({
				collapsible: true,
				heightStyle: 'content',
				beforeActivate: function(event, ui) {
					// don't allow the tab to be activated if it's disabled
					if (event.currentTarget.classList.contains('disabled')) {
						return false;
					}
				},
				activate: function(event, ui) {
					$('.slider').slick('reinit');
					processCounterUsage(ui);
				},
			});
		};

		/**
		 * Find the index of a specific tab that's requested in the query string
		 * @return {int} The index or -1 not found or the container tab is not being addressed
		 */
		const getAddressedTabIndex = function () {
			let queryParams = getQueryParams()
			let tabid = queryParams[tabAddress]

			return tabAddress && tabid
				? mContainer.find('[data-tab-id="' + tabid + '"]').closest('li').index()
				: -1
		}

		init();
	};

	/**
	 * Parses the current browser's query string into a hash map
	 * @return {Object}
	 */
	function getQueryParams () {
		return window.location.search.substring(1).split('&')
			.filter(function (kvp) { return !!kvp })
			.reduce(function (acc, kvp) {
				var keyValuePair = kvp.split('=')
				acc[decodeURIComponent(keyValuePair[0])] = keyValuePair.length > 1 ? decodeURIComponent(keyValuePair[1]) : undefined
				return acc
			}, {})
	}

	/**
	 * Converts a hash map into a query string
	 * @return {String}
	 */
	function toQueryString (params) {
		return Object.keys(params).map(function (key) {
			var value = params[key]
			var noVal = !value && value !== ''
			return noVal ? key : encodeURIComponent(key) + '=' + encodeURIComponent(value)
		}).join('&')
	}

	var processCounterUsage = function(ui) {
		$j(ui.newPanel.find(".counterData").filter(":visible")).each(function(index) {
			processCounterEvent(this);
		});
	};

	var processCounterEvent = function(counterData) {
		var counterDatatype = $(counterData).data("datatype");
		var uri = "";
		var logRequest = true;
		if ($("#usageLoggingAjax"))
		if (counterDatatype === "fthtml") {
			uri = "logHTMLView";
		} else if (counterDatatype === "abstract") {
			uri = "logAbstractView";
		} else if (counterDatatype === "pdf") {
			uri = "logPDFView";
			if ($(counterData.parentElement).find(".pdf-js-inline-view").children().length === 0) {
				logRequest = false;
			}
		} else if (counterDatatype === "pdf-preview") {
			uri = "logPDFPreview";
			if ($(counterData.parentElement).find(".pdf-js-inline-view").children().length === 0) {
				logRequest = false;
			}
		} else if (counterDatatype === "toc") {
			uri = "logTOCView";
		} else if (counterDatatype === "video") {
			uri = "logVideo";
		} else if (counterDatatype === "restricted") {
			uri = "logRestricted";
		} else if (counterDatatype === "restrictedTA") {
			uri = "logRestrictedTA";
		} else if (counterDatatype === 'other') {
			uri = "logOther";
		}
		if (uri) {
			var docUri = $j(counterData).data("docuri");
			window.dataLayer = window.dataLayer || [];
			jQuery.ajax({
				url: "/rest/counterLogging/" + uri,
				type: "POST",
				data : JSON.stringify({docuri :docUri, logRequest: logRequest}),
				contentType: "application/json",
				dataType: "json",
				error:function(gaString) {
					// dataLayer.push pushes events to GA
					window.dataLayer.push(gaString);
					processCounterLogging(false, uri, counterDatatype);
				},
				success:function(gaString){
					// dataLayer.push pushes events to GA
					window.dataLayer.push(gaString);
					processCounterLogging(true, uri, counterDatatype);
				}
			});
		}

	}

	$('.dropdown-button').on('click', '.dropdown-control-container', function (e) {
		processCounterEvent($j(this.parentElement).find(".counterData"));
	});

	var processCounterLogging = function(success, uri, counterDataType) {
		//I don't like repeated code, but I will make an exception
		//This is also in image-gallery.js
		if ($j("#usageLoggingAjax").length === 1) {
			var textToAppend = "";
			if (success) {
				textToAppend = "<pre>&#09;" + counterDataType + " sent to uri " + uri + " : Sent Successfully</pre>";
			} else {
				textToAppend = "<pre>&#09;" + counterDataType + " sent to uri " + uri + " : Failed to send</pre>";
			}
			$j("#usageLoggingAjax").append(textToAppend);
		}
	};



	/**
     * Global configurable layout method declarations.
     */
	const gMethods = {
		init: function(pOptions) {
			if (pOptions === undefined) {
				pOptions = {};
			}

			var returnValue = this.each(function () {
				const layout = $(this);
				let configurableLayout = layout.data('CONFIGURABLELAYOUT');

				if (!configurableLayout) {
					configurableLayout = new ConfigurableLayout(layout, pOptions);
					layout.data('CONFIGURABLELAYOUT', configurableLayout);
				}

				return configurableLayout;
			});
			if (returnValue.length > 0) {

				$j(".counterFiveOther").click(function () {
					processCounterEvent(this);
				});

				$j(".counterData").filter(":visible").each(function () {
					var counterDatatype = $(this).data("datatype");
					var logOnLoadData = $(this).data("logonload");
					var logOnLoad = false;
					if (logOnLoadData === undefined) {
						logOnLoad = true;
					}
					if (logOnLoad) {
						processCounterEvent(this);
					}
				});
				$(document).ready(function (){
					if ($j("#usageLoggingEvents").length === 1) {
						var allEvents = "";
						$j(".counterData").each(function () {
							allEvents += "<pre>&#09;" + $(this).data("datatype") + "</pre>";
						});
						$j("#usageLoggingEvents").append(allEvents);
					}
					$j("video").on('play', function(eventObject) {
						var counterData = $j(".video-counter").first();
						processCounterEvent(counterData);
					});

				});


			}
			return returnValue;
		},
	};

	/**
     * ConfigurableLayout jQuery namespace.
	 * @namespace
     */
	$.fn.configurablelayout = function(pMethod) {
		let returnValue = null;

		if (gMethods[pMethod]) {
			returnValue = gMethods[pMethod].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof pMethod === 'object' || !pMethod) {
			returnValue = gMethods.init.apply(this, arguments);
		} else {
			$.error('Unknown method');
		}

		return returnValue;
	};

	/**
     * This was the old functionality for having a container with a scroll lock that would stop
     * scrolling when it hit the top of the viewport.  It never was styled fully and was a little
     * rough in functionality.  I'm taking this out for now and we'll revisit as we build out
     * the configurable page front-end styling.
     */

/*
    $(document).ready(function() {

        // select all of the scroll locks on the page
        var scrollLocks = $(".scroll-lock");

        // update any sibling columns of the one containing the scroll lock to have a min height of the window height
        scrollLocks.each(function() {
            var lock = $(this),
                column = lock.closest(".column"),
                siblings = column.siblings(".column"),
                windowHeight = $(window).height();

            siblings.css("min-height", windowHeight);
        });

        // if there are any scroll-lock containers, update them on scroll
        if (scrollLocks.size() > 0) {
            $(window).scroll(function(e) {
                var windowTop = $(window).scrollTop();
                scrollLocks.each(function() {
                    var lock = $(this),
                        lockTop = lock.offset().top,
                        container = lock.next(),
                        width = container.width();

                    if (windowTop > lockTop) {
                        if (!container.hasClass("scroll-locked")) {
                            container.width(width); // set the width to a specific pixel width because 'fixed' elements end up getting sized relative to the window
                            container.addClass("scroll-locked");
                        }
                    }
                    else if(container.hasClass("scroll-locked")) {
                        container.scrollTo(0, 0, {});
                        container.removeClass("scroll-locked");
                        container.width("auto"); // go back to 'auto' width so it sizes according to the container
                    }
                });
            });
        }

    });
    */
})(jQuery);

/**
 * jQuery FigureViewer class.  This includes functionality for synchronizing a vertical
 * filmstrip view of thumbnails with the full html content.  As the content scrolls, the
 * highlight in the filmstrip moves accordingly.  Similarly, if a thumbnail is clicked
 * it will scroll the content to the location of the image.
 */
(function($) {

    "use strict";

    // Default option settings
    var gDefaultOptions = {
            
        // whether or not to scroll the thumbnails as the content scrolls
        scrollThumbnails: true,

        // scroll settings when scrolling the body to a figure
        scrollToSettings: {
            duration: 750,
            axis: 'y',
            offset: {
                top: -200
            }
        }
            
    };

    /**
     * FigureViewer class
     */
    function FigureViewer(pFilmstrip, pBodyContainer, pOptions) {
        var mFilmstrip = pFilmstrip,
            mFigures = mFilmstrip.find(".content-figures-list figure"),
            mFigureLinks = mFigures.find(".figure-link"),
            mGalleryLinks = mFigures.find(".gallery-link"),
            mGalleryOverlay = mFilmstrip.find(".gallery-overlay"),
            mGallery = mGalleryOverlay.find(".component-image-gallery"),
            mGalleryCloseLinks = mGallery.find("a.close"),
            mHasGallery = mGalleryOverlay.size() > 0,
            mThumbnails = mFigures.find("img"),
            mFilmstripContainer = mFilmstrip.closest(".component-content-item"),
            mBodyContainer = pBodyContainer,
            mHasBody = mBodyContainer.size() > 0,
            mBodyTabItem = mBodyContainer.closest(".container-item"),
            mBodyTabItemId = mBodyTabItem.attr("id"),
            mBodyTabs = mBodyContainer.closest(".container-tabbed"),
            mBodyTabLink = mBodyTabs.find("a[href='#" + mBodyTabItemId + "']"),
            mBodyTabIndex = mBodyTabLink.parent().prevAll("li").size(),
            mHasBodyTab = mBodyTabLink.size() > 0,
            mOptions = $.extend({}, gDefaultOptions, pOptions),
            mLockScroll = false;

        /**
         * Class initializer
         */
        var init = function() {
            
            // move the image gallery to the end of the body so it overlays poperly when opened
            if (mHasGallery) {
                mGalleryOverlay.detach().appendTo("body");
            }

            // bind event handlers
            bindEvents();
            
        };
        
        /**
         * Binds all of the event handlers.
         */
        var bindEvents = function() {

            // define a callback for after scrolling with scrollTo
            mOptions.scrollToSettings.onAfter = scrollComplete;
            
            // click event for thumbnails
            mFigureLinks.on("click", scrollToFigure);
            
            // scroll event to update thumbnail highlight
            if (mHasBody) {
                $(document).on("scroll", updateThumbnailHighlight);
            }
            
            // gallery links open the gallery
            if (mHasGallery) {
                mGalleryLinks.on("click", openGallery);
                
                mGalleryCloseLinks.on("click", closeGallery);
            }
        };
        
        /**
         * Event handler for when a figure in the filmstrip is clicked.
         */
        var scrollToFigure = function(pEvent) {

            var figure = $(this).parent(),
                figureId = figure.data("figureid"),
                figureAnchor = mBodyContainer.find("#" + figureId.replace(/\./g, "\\."));

            // if the body is in a tabbed container, make sure to switch to that tab if it's not already active
            if (mHasBodyTab) {
                var activeTab = mBodyTabs.tabs("option", "active");
                
                if (activeTab != mBodyTabIndex) {
                    mBodyTabs.tabs("option", "active", mBodyTabIndex);
                }
            }
    
            // temporarily lock out response to scroll events then scroll to the figure
            mLockScroll = true;
            $.scrollTo(figureAnchor, mOptions.scrollToSettings);
            
            highlightThumbnail(figure);
            
        };

        /**
         * Event handler for scrolling that updates the highlight on the thumbnails.
         */
        var updateThumbnailHighlight = function (pEvent) {
            if (!mLockScroll) {
                var currentFigure = determineCurrentFigure();
                if (currentFigure != null) {
                    var currentThumb = mFigures.filter("#" + currentFigure.replace(/\./g, "\\.") + "-thumb");
                    
                    if (!currentThumb.hasClass("bg-highlight")) {
                        highlightThumbnail(currentThumb);

                        if (shouldScrollToThumbnail(currentThumb)) {
                            mLockScroll = true;
                            mFilmstrip.closest(".column-contents").scrollTo(currentThumb, mOptions.scrollToSettings)
                        }
                    }
                }
            }
        };
        
        /**
         * Determines if the thumbnails should be scrolled to the given thumbnail.
         */
        var shouldScrollToThumbnail = function(pThumbnail) {
            
            // don't ever scroll if the feature is disabled
            if (!mOptions.scrollThumbnails) {
                return false;
            }
            
            // don't scroll if the container doesn't have the 'scroll-locked' class
            if (!mFilmstripContainer.hasClass("scroll-thumbnails")) {
                return false;
            }
            
            // if the thumbnail is outside of the viewport or if the bottom of the thumbnail is outside the viewport
            // and the thumbnail isn't taller than the viewport, then scroll
            var thumbnailRect = pThumbnail.get(0).getBoundingClientRect(),
                thumbnailTop = thumbnailRect.top,
                thumbnailBottom = thumbnailRect.bottom,
                thumbnailHeight = thumbnailBottom - thumbnailTop;
            if (thumbnailTop < 0 || thumbnailTop > window.innerHeight || (thumbnailBottom > window.innerHeight && thumbnailHeight < window.innerHeight)) {
                return true;
            }

            // we didn't match anything so don't scroll
            return false;
        };
        
        /**
         * Highlights the given thumbnail and removes highlights from all other thumbnails.
         */
        var highlightThumbnail = function(pThumbnail) {
            mFigures.removeClass("bg-highlight");
            pThumbnail.addClass("bg-highlight");
        }

        /**
         * This function will determine which is the current figure based on the position of the body text
         * in the viewport.
         */
        var determineCurrentFigure = function() {
            var viewportHeight = $(window).height(),
                viewportTop = $(document).scrollTop(),
                viewportBottom = viewportTop + viewportHeight,
                currentFigure = null;

            // This loop is more expensive than I'd like do do on each scroll event, however, when I tried
            // to just initialize the figure top positions once at the beginning, it was giving different
            // values and seemed inconsistent.  I think it was due to images being loaded and the layout
            // being recalculated as they were positioned.  I tried various things (window.on("load")) but
            // nothing seemed to work.
            mFigures.each(function() {
                var figure = $(this),
                    figureId = figure.data("figureid"),
                    figureAnchor = mBodyContainer.find("#" + figureId.replace(/\./g, "\\.")),
                    figureTop = figureAnchor.size() > 0 ? figureAnchor.offset().top : 0;
                
                if (figureTop > viewportTop) {
                    
                    if (figureTop > viewportBottom) {
                        return false;
                    }
                    currentFigure = figureId;
                    
                }

            });

            return currentFigure;
        };

        /**
         * Opens the gallery
         */
        var openGallery = function(pEvent) {
            
            var link = $(this),
                list = link.closest("ul"),
                links = list.find(".gallery-link"),
                index = Array.from(links).findIndex(function(element) {
                	return link.attr('href') == $(element).attr('href');
                });            
                
            mGalleryOverlay.show();
            mGallery.imagegallery("updateSliders");
            mGallery.imagegallery("goToImage", index);
			mGallery.imagegallery("fireCounterOnGalleryOpen");
            pEvent.stopPropagation();
            return false;
        };
        
        /**
         * Closes the gallery
         */
        var closeGallery = function(pEvent) {
            mGalleryOverlay.hide();
            pEvent.stopPropagation();
            return false;
        };
        
        /**
         * Callback for when scrolling via the scrollTo plugin is complete.
         */
        var scrollComplete = function() {

            // restore listening for scroll events
            setTimeout(function() {
                mLockScroll = false;
            }, 100);
        };
        
        init();

    };

    /**
     * Global figure viewer method declarations.
     */
    var gMethods = {
        init: function (pBodyContainer, pOptions) {
            if (pOptions === undefined) {
                pOptions = { };
            }
            return this.each(function () {
                var filmmstrip = $(this),
                    figureViewer = filmmstrip.data("FIGUREVIEWER");
                if (!figureViewer) {
                    figureViewer = new FigureViewer(filmmstrip, pBodyContainer, pOptions)
                    filmmstrip.data("FIGUREVIEWER", figureViewer);
                }
                return figureViewer;
            });
        }
        
    };

    /**
     * FigureViewer jQuery namespace.
     */
    $.fn.figureviewer = function (pMethod) {

        var returnValue = null;

        if( gMethods[pMethod] ) {
            returnValue = gMethods[pMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof pMethod === 'object' || !pMethod) {
            returnValue = gMethods.init.apply(this, arguments);
        }
        else {
            $.error('Unknown method');
        }

        return returnValue;
    };

})(jQuery);

/**
 * jQuery ImageGallery class.  This is an image gallery composed of two slick slider components;
 * one that is a filmstrip of thumbnails and one that is a single slide for the larger image
 * view.
 */
(function($) {

    "use strict";

    // Default option settings
    var gDefaultOptions = {
    };

    /**
     * ImageGallery class
     */
    function ImageGallery(pContainer, pOptions) {
        var mContainer = pContainer,
            mFullImageSlider = mContainer.find(".full-image-slider"),
            mThumbnailSlider = mContainer.find(".thumbnail-slider"),
            mOptions = $.extend({}, gDefaultOptions, pOptions);

        /**
         * Class initializer
         */
        var init = function() {

            // init the slick sliders
            initSliders();

            // bind event handlers
            bindEvents();
        };

        /**
         * Initializes the slick sliders in the gallery.
         */
        var initSliders = function() {
            mFullImageSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: "#" + mThumbnailSlider.attr("id")
            });
            mThumbnailSlider.slick( {
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: "#" + mFullImageSlider.attr("id"),
                centerMode: true,
                focusOnSelect: true
            });

            mFullImageSlider.on("setPosition", setSlideHeights);
            mThumbnailSlider.on("setPosition", setSlideHeights);
			mFullImageSlider.on("afterChange", fireCounterEvents);
        };

        var fireCounterEvents = function() {
        	var docUri = $($(".gallery-overlay .counterData")[0]).data("docuri");
			var uri = "/rest/counterLogging/logImageView";
			window.dataLayer = window.dataLayer || [];
			if (docUri) {
				$.ajax({
					url: uri,
					type: "POST",
                    data : JSON.stringify({docuri :docUri,logRequest: true}),
					contentType: "application/json",
					dataType: "json",
					error:function(gaString) {
						// dataLayer.push pushes events to GA
						window.dataLayer.push(gaString);
						processCounterLogging(false, uri, counterDatatype);
					},
					success:function(gaString){
						// dataLayer.push pushes events to GA
						window.dataLayer.push(gaString);
						processCounterLogging(true, uri, counterDatatype);
					}
				})
			}
		};



		var processCounterLogging = function(success, uri, counterDataType) {
			//I don't like repeated code, but I will make an exception
			//This is also in configurable-layout.js
			if ($j("#usageLoggingAjax").length === 1) {
				var textToAppend = "";
				if (success) {
					textToAppend = "<pre>&#09;" + counterDataType + " sent to uri " + uri + " : Sent Successfully</pre>";
				} else {
					textToAppend = "<pre>&#09;" + counterDataType + " sent to uri " + uri + " : Failed to send</pre>";
				}
				$j("#usageLoggingAjax").append(textToAppend);
			}
		};

        /**
         * Binds all of the event handlers.
         */
        var bindEvents = function() {
            pContainer.closest(".container-tabbed").on("tabsactivate", refreshSliders);
        };

        /**
         * Sets all of the slide heights equal to the slide track height.  Taken from here:
         * https://github.com/kenwheeler/slick/issues/179#issuecomment-204768021
         */
        var setSlideHeights = function() {
            var slider = $(this),
                track = slider.find(".slick-track"),
                slides = slider.find(".slick-slide");

            slides.height('auto');
            slides.css('height', track.height() + 'px');
        };

        /**
         * Refreshes the sliders to update their layout.  Used if a slider is initialized in a
         * hidden container that is later shown.
         */
        var refreshSliders = function() {
            mFullImageSlider.slick("setPosition");
            mThumbnailSlider.slick("setPosition");
        }

        /**
         * Public method to go to the image at the specified index.
         */
        this.goToImage = function(pIndex) {
            mFullImageSlider.slick("slickGoTo", pIndex);
            mThumbnailSlider.slick("slickGoTo", pIndex);



        };

        /**
         * Updates the sliders.  This forces the sliders to reinitialize if their container has changed size.
         */
        this.updateSliders = function() {
            refreshSliders();
        }

        this.fireCounterOnGalleryOpen = function() {
			fireCounterEvents();
		}

        init();

    };

    /**
     * Global image gallery method declarations.
     */
    var gMethods = {
        init: function (pContainer, pOptions) {
            if (pOptions === undefined) {
                pOptions = { };
            }
            return this.each(function () {
                var container = $(this),
                    imageGallery = container.data("IMAGEGALLERY");
                if (!imageGallery) {
                    imageGallery = new ImageGallery(container, pOptions)
                    container.data("IMAGEGALLERY", imageGallery);
                }
                return imageGallery;
            });
        },

        goToImage: function(pIndex) {
            return $(this).data("IMAGEGALLERY").goToImage(pIndex);
        },

        updateSliders: function() {
            return $(this).data("IMAGEGALLERY").updateSliders();
        },

		fireCounterOnGalleryOpen: function() {
        	return $(this).data("IMAGEGALLERY").fireCounterOnGalleryOpen();
		}

    };

    /**
     * ImageGallery jQuery namespace.
     */
    $.fn.imagegallery = function (pMethod) {

        var returnValue = null;

        if( gMethods[pMethod] ) {
            returnValue = gMethods[pMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof pMethod === 'object' || !pMethod) {
            returnValue = gMethods.init.apply(this, arguments);
        }
        else {
            $.error('Unknown method');
        }

        return returnValue;
    };

})(jQuery);

//initialize the asynchronous tasks on the page
(function($) {
    
    "use strict";

    /**
     * ProgressMeter class
     */
    function ProgressMeter(pElement) {
        var mElement = pElement,
            mContent = mElement.find("span"),
            mStyle = mElement.data("style"),
            mComplete = 0,
            mTotal = 0;
        
        var init = function() {
            mElement.hide();
        };
        
        var refreshDisplay = function() {
            
            var content = "";
            
            if (mTotal > 0) {
                mContent.removeClass("unknown-total");
            }
            else {
                mContent.addClass("unknown-total");
            }
            
            if (mStyle == "PERCENT") {
                if (mTotal > 0) {
                    content = ((mComplete / mTotal) * 100).toPrecision(2) + "%";
                }
                else {
                    content = "0%";
                }
            }
            else if (mStyle == "NUMERIC") {
                if (mTotal > 0) {
                    content = mComplete + "/" + mTotal;
                }
                else {
                    content = "0/0";
                }
            }

            mContent.html(content);
        };
        
        this.start = function() {
            refreshDisplay();
            mElement.show();
        };
        
        this.stop = function() {
            mElement.hide();
        };
        
        this.update = function(complete, total) {
            mComplete = complete;
            mTotal = total;
            refreshDisplay();
        }

        init();
    };

    /**
     * AsynchronousTask class
     */
    function AsynchronousTask(pContainer) {
        var mContainer = pContainer,
            mId = parseInt(mContainer.data("taskid"), 10),
            mType = mContainer.data("tasktype"),
            mContext = mContainer.data("taskcontext"),
            mQueued = !isNaN(mId) && mId > 0,
            mCheckInterval = mContainer.data("checkinterval") != null ? mContainer.data("checkinterval") : 10000,
            mMessageContainer = mContainer.find(".asynchronous-result"),
            mControl = mContainer.find(".asynchronous-control"),
            mProgressMeters = Array();

        var init = function() {
            
            var progressElement = mContainer.find(".asynchronous-progress").each(function() {
                var meter = new ProgressMeter($(this));
                mProgressMeters.push(meter);
            });

            if (!mQueued) {
                mControl.click(queueTask);
            }
            else {
                startMeters();
                setTimeout(checkStatus, mCheckInterval);
            }

        };
        
        var checkStatus = function() {
            
            var request = $.ajax({
                method: "GET",
                url: "/rest/async/status/" + mId,
                dataType: "json"
            });
            
            request.done(handleStatusCheck);
        };
                
        var handleStatusCheck = function(response) {
            var state = response.state;

            switch(state) {
                case "RUNNING":
                case "QUEUED":
                    updateMeters(response.workUnitsComplete, response.workUnitsTotal);
                    setTimeout(checkStatus, mCheckInterval);
                    break;
                case "COMPLETE":
                    processComplete(response);
                    break;
                case "CANCELLED":
                case "FAILED":
                default:
            }

        };
        
        var processComplete = function(taskStatus) {
            var type = taskStatus.result.type,
                markup = taskStatus.result.markup,
                url = taskStatus.result.url;
            
            stopMeters();

            switch(type) {
                case "MARKUP":
                    mMessageContainer.html(markup);
                    break;
                case "REDIRECT":
                    window.location = url;
                    break;
                case "DOWNLOAD":
                    window.location = "/rest/async/download/" + mId;
                    break;
            }
        };
        
        var queueTask = function() {

            var controlContext = $(this).data("taskcontext"),
                context = controlContext != null ? controlContext : mContext,
                request = $.ajax({
                    method: "GET",
                    url: "/rest/async/queue/" + mType + "/" + context,
                    dataType: "json"
                });

            startMeters();
            request.done(handleTaskQueued);
        };

        var handleTaskQueued = function(response) {
            mId = response.id;
            handleStatusCheck(response);
        };
        
        var startMeters = function() {
            for(var i = 0; i < mProgressMeters.length; i ++) {
                mProgressMeters[i].start();
            }
        };
        
        var stopMeters = function() {
            for(var i = 0; i < mProgressMeters.length; i ++) {
                mProgressMeters[i].stop();
            }
        };
        
        var updateMeters = function(complete, total) {
            for(var i = 0; i < mProgressMeters.length; i ++) {
                mProgressMeters[i].update(complete, total);
            }
        };

        init();

    };

    /**
     * Global AsynchronousTask method declarations.
     */
    var gMethods = {
        init: function (pOptions) {
            if (pOptions === undefined) {
                pOptions = { };
            }
            return this.each(function () {
                var task = $(this).data("ASYNCHRONOUSTASK");
                if (!task) {
                    task = new AsynchronousTask($(this), pOptions)
                    $(this).data("ASYNCHRONOUSTASK", task);
                }
                return task;
            });
        }
    };

    /**
     * AsynchronousTask jQuery namespace.
     */
    $.fn.asynchronoustask = function (pMethod) {

        var returnValue = null;

        if( gMethods[pMethod] ) {
            returnValue = gMethods[pMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof pMethod === 'object' || !pMethod) {
            returnValue = gMethods.init.apply(this, arguments);
        }
        else {
            $.error('Unknown method');
        }

        return returnValue;
    };
    
    $(".asynchronous-task").asynchronoustask();


})(jQuery);

//initialize the chart.js charts on the page
(function($) {
    
    $(".metric-bar-graph").each(function() {
        var canvas = $(this),
            contentId = canvas.data("contentid"),
            scope = canvas.data("scope"),
            bucketSize = canvas.data("bucketsize"),
            count = canvas.data("count"),
            showTitle = canvas.data("showtitle"),
            title = canvas.data("title"),
            legendPosition = canvas.data("legendposition"),
            showAbstractViews = canvas.data("showabstractviews"),
            showFullTextViews = canvas.data("showfulltextviews"),
            showPdfDownloads = canvas.data("showpdfdownloads"),
            showEpubDownloads = canvas.data("showepubdownloads");

        if (count == null) {
            count = 30;
        }
        if (bucketSize == null) {
            bucketSize = MONTH;
        }
        if (showTitle == null) {
            showTitle = true;
        }
        if (legendPosition == null) {
            legendPosition = "top";
        }

        $.ajax({
            method: "GET",
            url: "/rest/chartjs/bar",
            data: {
                contentId: contentId,
                scope: scope,
                bucketSize: bucketSize,
                count: count,
                showAbstractViews: showAbstractViews,
                showFullTextViews: showFullTextViews,
                showPdfDownloads: showPdfDownloads,
                showEpubDownloads: showEpubDownloads
            }
        })
        .done(function(response) {
            var data = response;

            var config = {
                    type: "bar",
                    data: data,
                    options: {
                        responsive: true,
                        title: {
                            display: showTitle,
                            text: title
                        },
                        legend: {
                            display: legendPosition != "NONE",
                            position: legendPosition.toLowerCase()
                        },
                        scales: {
                            xAxes: [{
                                stacked: true,
                            }],
                            yAxes: [{
                                stacked: true,
                            }]
                        }
                    }
            };
            canvas.siblings(".message").hide();
            canvas.data("chart", new Chart(canvas.get(0).getContext("2d"), config));
        })
        .fail(function(jqXHR, textStatus) {
            canvas.hide();
            canvas.siblings(".message").html("Unable to retrieve metric data");
        });
    });
    

    $(".metric-pie-chart").each(function() {
        var canvas = $(this),
            contentId = canvas.data("contentid"),
            scope = canvas.data("scope"),
            showTitle = canvas.data("showtitle"),
            legendPosition = canvas.data("legendposition"),
            legendPosition = canvas.data("legendposition"),
            showAbstractViews = canvas.data("showabstractviews"),
            showFullTextViews = canvas.data("showfulltextviews"),
            showPdfDownloads = canvas.data("showpdfdownloads"),
            showEpubDownloads = canvas.data("showepubdownloads");
        
        if (showTitle == null) {
            showTitle = true;
        }
        if (legendPosition == null) {
            legendPosition = "top";
        }

        $.ajax({
            method: "GET",
            url: "/rest/chartjs/pie",
            data: {
                contentId: contentId,
                scope: scope,
                showAbstractViews: showAbstractViews,
                showFullTextViews: showFullTextViews,
                showPdfDownloads: showPdfDownloads,
                showEpubDownloads: showEpubDownloads
            }
        })
        .done(function(response) {
            var data = response;
            var text = '';

            if (Array.isArray(data.datasets) && data.datasets[0].label != undefined && data.datasets.size != undefined && data.datasets.size() > 0) {
                text = data.datasets[0].label;
            } else if (!Array.isArray(data.datasets) && data.datasets.label != undefined && data.datasets.data.length > 0) {
                text = data.datasets.label;
            }
            
            var config = {
                    type: "pie",
                    data: data,
                    options: {
                        responsive: true,
                        title: {
                            display: showTitle,
                            text: text
                        },
                        legend: {
                            display: legendPosition != "NONE",
                            position: legendPosition.toLowerCase()
                        },
                        tooltips: {
                            callbacks: {
                                label: getPieChartTooltipLabel
                            }
                        } 
                    }
            };
            canvas.siblings(".message").hide();
            canvas.data("chart", new Chart(canvas.get(0).getContext("2d"), config));
        })
        .fail(function(jqXHR, textStatus) {
            canvas.hide();
            canvas.siblings(".message").html("Unable to retrieve metric data");
        });
    });
    
    function getPieChartTooltipLabel(tooltipItem, data) {
        
        var label = data.labels[tooltipItem.index];

        //calculate the total of the data set
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
          return previousValue + currentValue;
        });

        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
        var currentValue = dataset.data[tooltipItem.index];
        var precentage = Math.floor(((currentValue/total) * 100)+0.5);

        return label + " (" + precentage + "%)";
    }
    
})(jQuery);

//initialize the deepdyve links on the page
(function($) {
    
    $(".deepdyve-link").each(function() {
        var link = $(this),
            rentalUrl = link.data("rentalurl");
        
        $.getJSON(rentalUrl + "&format=jsonp&callback=?", function(data) {
            if (data.status === 'ok') {
                link.attr("href", data.url);
                $(".js-deepdyve-link").show();
            } else if (data.status === 'not_found') {
                link.hide();
            }
        });

    });

    
})(jQuery);

document.observe('dom:loaded', function() {
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	///////// INITIALIZING REFINE BY CHECKBOX CSS //////////
	$$('.checkboxStyleNav .checkbox').each(function(el) {
		$(el).setStyle({ overflow: 'hidden', width: '14px', height: '14px' });

		//check if checkbox is checked (now that's not redundant, ha)
		var checkboxEl = $(el).childElements('input')[0];
		if (checkboxEl.checked) {
			$(el).setStyle({
				background: 'transparent url(/images/checkbox_sprite2.gif) no-repeat -14px top',
			});
			$(el)
				.up('li')
				.addClassName('checked');
		} else {
			$(el).setStyle({
				background: 'transparent url(/images/checkbox_sprite2.gif) no-repeat left top',
			});
			$(el)
				.up('li')
				.removeClassName('checked');
		}
	});
	$$('.checkboxStyleNav .checkbox input').each(function(el) {
		$(el).setStyle({ position: 'absolute', left: '-9999px' });
	});

	//handle checkbox check for image
	$$('.checkboxStyleNav .checkbox').each(function(el) {
		$(el).observe('click', function(event) {
			toggleImageCheckbox(el);
		});
	});
	///////// END INITIALIZING REFINE BY CHECKBOX CSS //////////

	var nav = $('refineSearch');
	if (nav) new FilterNav(nav);

	// Homepage login link actions
	$$('#showlibcard').invoke('observe', 'click', function(event) {
		$('libcardwrapper').setStyle({ display: 'block' });
		$('showusernameform').setStyle({ display: 'block' });
		this.setStyle({ display: 'none' });
		$('loginwrapper1').setStyle({ display: 'none' });
		$('lcnum').focus();
		event.stop();
	});
	$$('#showusernameform').invoke('observe', 'click', function(event) {
		$('libcardwrapper').setStyle({ display: 'none' });
		$('showlibcard').setStyle({ display: 'block' });
		this.setStyle({ display: 'none' });
		$('loginwrapper1').setStyle({ display: 'block' });
		$('username').focus();
		event.stop();
	});

	//zebra striation on tables
	$$('.bookDetail #readPanel table').each(function(elTablo) {
		var evenRow = false;
		elTablo.select('> tr').each(function(el) {
			if (evenRow) {
				el.addClassName('even');
				evenRow = false;
			} else {
				evenRow = true;
			}
		});
	});

	/** ANNOTATION CUSTOMIZATIONS IN MY ANNOTATIONS */
	if ($$('.page-myannotations') != null) {
		var allSelectRowCheckboxesLocator = 'div.myPanel.myAnnotations tbody input';

		$$('#annotationListForm #shareSelectedButton').each(function(entry) {
			entry.onclick = function() {
				var url = '/app/shareannotationslightbox';
				$$(allSelectRowCheckboxesLocator).each(function(elem) {
					if (elem.checked) {
						url +=
							'/' +
							$j(elem)
								.siblings('span.annotationId')
								.html();
					}
				});
				showLightbox(url, '550', '700', '&nbsp');
				return false;
			};
		});

		$$('#annotationListForm #exportSelectedButton').each(function(entry) {
			entry.onclick = function() {
				var url = '/app/exportannotationslightbox';
				$$(allSelectRowCheckboxesLocator).each(function(elem) {
					if (elem.checked) {
						url +=
							'/' +
							$j(elem)
								.siblings('span.associationId')
								.html();
					}
				});
				showLightbox(url, '550', '218', '&nbsp');
				return false;
			};
		});
	}
});

function fakeValue(id, value) {
	var field = $(id);
	if (!field) return;

	var placeholder = field.readAttribute('placeholder');
	if (placeholder != null && Modernizr.input.placeholder) {
		// If there is a placeholder and browser supports placeholders, don't execute the next block of code
		return;
	}

	// IE8 and IE9 will execute this
	if (placeholder != null && value == null) {
		value = placeholder;
	}

	field.value = value;
	field.observe('focus', function() {
		if (field.value == value) field.value = '';
	});
	field.observe('blur', function() {
		if (field.value == '') field.value = value;
	});

	if (field.form)
		$(field.form).observe('submit', function() {
			if (field.value == value) field.value = '';
		});
}

function toggleImageCheckbox(el) {
	var checkboxEl = $(el).childElements('input')[0];
	var checkBoxState = checkboxEl.checked;
	if (checkBoxState) {
		checkboxEl.checked = false;
		$(el).setStyle({
			background: 'transparent url(/images/checkbox_sprite2.gif) no-repeat left top',
		});
		$(el)
			.up('li')
			.removeClassName('checked');
	} else {
		checkboxEl.checked = true;
		$(el).setStyle({
			background: 'transparent url(/images/checkbox_sprite2.gif) no-repeat -14px top',
		});
		$(el)
			.up('li')
			.addClassName('checked');
	}
}

function selectHomepageTab(a, panelId) {
	a = $(a);
	$$('#homeTabs li').each(function(li) {
		li.removeClassName('active');
	});
	a.up('li').addClassName('active');

	$$('#homePanels .panel').each(function(panel) {
		panel.hide();
	});
	$(panelId).show();
}

function createHelpIndex() {
	var indexDiv = $('anchorIndex');

	$$('a[name]').each(function(a) {
		indexDiv.insert(
			'<li><a class="indexLink" href="/help#' +
				a.readAttribute('name') +
				'">' +
				a.innerHTML +
				'</a></li>'
		);
	});
}

/**
 * This is a global function that allows us to fire an event on a dom element that will be heard
 * both by jQuery and Prototype.  It's handy for coordinating between the two.
 *
 * @type {Function}
 */
function fireEvent(element, event) {
	if (document.createEventObject) {
		// dispatch for IE
		var evt = document.createEventObject();
		return element.fireEvent('on' + event, evt);
	} else {
		// dispatch for firefox + others
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent(event, true, true); // event type,bubbling,cancelable
		return !element.dispatchEvent(evt);
	}
}

/**
 * A panel represents each of the lists of the options of which there may be many and also may be nested.
 *
 * @class
 */
var Panel = Class.create({
	initialize: function(ul, parent, filter, lazy) {
		this.ul = ul;
		this.filter = filter;
		this.parent = parent;
		this.lazy = lazy;

		$T(ul).panel = this;

		/* if a list is really it needs to scroll. but in order to activate the overflow scrolling
		 * the element needs to have an explicit height set. on initial page load the height of the first list
		 * is automatic (because we don't want it to scroll) and needs to be carried over to all the child lists so that they scroll.
		 */
		if (parent) {
			this.height = parent.height;
			this.ul.setStyle({ height: this.height + 'px' });
		} else {
			// the height of the inner lists is going to be the top-level one minus the back button height
			var backHeight = ul
				.select('h3')
				.first()
				.getHeight(); //was static 25;
			this.height = this.ul.getHeight() - backHeight;
		}

		for (var i = 0; i < ul.childElements().length; i++) {
			var li = ul.childElements()[i];
			var link = li.down('a');

			// make sure the links are well-formed for not actually doing anything
			link.href = 'javascript:void(0);';

			if (li.hasClassName('nochildren')) {
				link.observe('click', this.applyFilter.bindAsEventListener(this, link));
			} else {
				link.observe('click', this.showChildren.bindAsEventListener(this, li));

				if (!lazy) this.initItem(li);

				var back = li.down('h3').down('a');
				back.href = 'javascript:void(0);';
				back.observe('click', this.back.bindAsEventListener(this, li));
			}
		}
	},

	/** Inits the state for a item. */
	initItem: function(li) {
		/* initializing all of this may be slow because the options available for selection could be huge.
		 * we only need to do it for a filter when it's clicked.
		 */
		if (!$T(li).child) $T(li).child = new Panel(li.down('ul'), this, this.filter, this.lazy);
	},

	showChildren: function(e, li, direct) {
		this.initItem(li);

		// note: you can't use hide()/show() because the styles are set in the css
		li.down('h3').setStyle({ display: 'block' });
		li.down('ul').setStyle({ display: 'block' });

		// note: you need to manage the overflows manually or else 3rd-level lists and lower will not display
		this.ul.setStyle({ overflow: 'visible' });

		this.filter.expand(this, li, direct, function() {
			li.down('ul').setStyle({ overflow: 'auto' });
		});
	},

	applyFilter: function(e, link) {
		// FIXME don't hardcode the id prefix or the id of the form element to store in
		var taxid = link.id.replace('taxonomy_', '');
		// TODO support having multiple widgets on the same page
		this.filter.select(link);
		$('refineTaxonomy').value = taxid;
		$('refineTerm').value = '';
		$('refineForm').submit();
	},

	back: function(e, li) {
		// don't hide until the transition is done or else the options disappear too quick
		var panel = this;
		this.filter.collapse(this, function() {
			li.down('h3').hide();
			li.down('ul').hide();
			li.down('ul').setStyle({ overflow: 'visible' });
			panel.ul.setStyle({ overflow: 'auto' });
		});
	},

	getWidth: function() {
		// calculating width can be slow. just hard-code for now.
		return parseInt(this.ul.getWidth()) - 1;
		//		return 182;
	},

	/** Returns the width of this panels ancestors */
	getAncestorWidth: function() {
		return this.parent ? this.parent.getTotalWidth() : 0;
	},

	/** Returns the width of this panel and each of it's ancestors */
	getTotalWidth: function() {
		return this.getWidth() + this.getAncestorWidth();
	},
});

/**
 * A filter nav is an initial Panel of filters to select from.
 * Note: this requires cookiejar.js (http://www.lalit.org/lab/jsoncookies).
 *
 * @class
 */
var FilterNav = Class.create({
	speed: 0.2, // animation speed
	startOffset: -1, // left offset for the first panel. i think this is due to the border on the element.

	initialize: function(nav) {
		this.cookies = new CookieJar();
		this.breadcrumbsWrapper = nav
			.insert('<div class="flyoutBreadcrumbs"></div>')
			.down('.flyoutBreadcrumbs');

		var selectedId = this.cookies.get('nav.selected-id');
		this.cookies.remove('nav.selected-id');
		var selectedLink = null;
		if (selectedId) {
			selectedLink = $(selectedId);
		}

		this.container = nav.down('ul');
		var lazy = selectedLink == null;
		this.topPanel = new Panel(this.container, null, this, true);

		if (selectedLink) {
			var ancestors = new Array();
			var parent = selectedLink.up('li');
			var top = false;
			do {
				if (parent.up('ul') == this.container) top = true;

				ancestors.unshift(parent);
				parent = parent.up('li');
			} while (parent && !top);

			for (var i = 0; i < ancestors.length; i++) {
				var li = ancestors[i];
				$T(li.up('ul')).panel.showChildren(null, li, true);
			}
		}
	},

	/** Informs the main nav that an item has been selected. */
	select: function(link) {
		this.cookies.put('nav.selected-id', link.id);
	},

	/** direct indicates whether to use an animation or directly set the styles. */
	expand: function(panel, li, direct, finish) {
		var left = this.startOffset - panel.getTotalWidth();

		if (!direct) {
			new Effect.Morph(this.container, {
				style: 'left:' + left + 'px;',
				duration: this.speed,
			});
			finish(); // note: need to have this not after effect finish to prevent flicker
		} else {
			this.container.setStyle({ left: left + 'px' });
			finish();
		}

		this.updateBreadcrumbs(panel, li);
	},

	collapse: function(panel, finish) {
		var left = this.startOffset - panel.getAncestorWidth();

		new Effect.Morph(this.container, {
			style: 'left:' + left + 'px;',
			duration: this.speed,
			afterFinish: finish,
		});

		this.updateBreadcrumbs(panel.parent, panel.ul.up('li'));
	},

	/** Creates breadcrumbs up through the given panel. li is used to calculate the labels of the items. */
	updateBreadcrumbs: function(panel, li) {
		var ancestors = new Array();
		var item = li;
		while (item && $T(item.up('ul')).panel) {
			ancestors.unshift(item);
			item = item.up('li');
		}

		var ul = new Element('ul');
		for (var i = 0; i < ancestors.length; i++) {
			var anc = ancestors[i];
			var label = anc.down('a').innerHTML;

			var li = new Element('li');

			if (i == 0) li.addClassName('first');
			if (i == ancestors.length - 1) li.addClassName('last');

			li.update(label);
			ul.insert(li);
		}
		this.breadcrumbsWrapper.update(ul);
	},
});

/** When an element is 'popped out' it is hidden and replaced with something that the user
 * can user to show the content. This method should create that something.
 * The function that will display the content in a lightbox can be accessed via: $T(e).showPopup
 * Only called if the element should be popped out.
 * @param l the suggested label to use for the trigger
 */
var popoutElement = function(e, label) {
	if (typeof applicationName == 'undefined') {
		// IE 8 is not good
		var link = document.createElement('a');
		link.className = 'popoutContentLink';

		link = $(link);
		link.insert('<span>' + label + '</span>');
		link.observe('click', $T(e).showPopup);
		e.insert({ after: link });
		return;
	} else if (applicationName == 'AppNameIMF') {
		// This is required for IE8 compatability.
		popoutElement2(e, label);
		return;
	}
};

/**
 * This modifies the table header to include the 'Expand' text.
 *
 * @type {Function}
 */
var popoutElement2 = function(elmnt, label) {
	var h3Label = elmnt.down('.label_' + elmnt.id + ':first').cloneNode(true);
	var h3title = elmnt.down('.title_' + elmnt.id + ':first').cloneNode(true);
	var h3Element = new Element('h3').insert(h3Label).insert(h3title);
	var detail = new Element('div');
	detail.className = 'detail';
	detail.insert(h3Element);
	var link = new Element('a').insert('<span>' + label + '</span>');
	var linkWrap = new Element('div');
	linkWrap.className = 'popoutContentLink';
	linkWrap.insert(link);

	//This is broken in IE:
	//var popoutControl = new Element('div', {'class':'popoutControl'});
	var popoutControl = new Element('div');
	popoutControl.className = 'popoutControl';

	popoutControl.setAttribute('id', elmnt.readAttribute('id'));
	popoutControl.insert(detail).insert(linkWrap);
	link.observe('click', $T(elmnt).showPopup);
	elmnt.insert({ after: popoutControl });
	elmnt.setAttribute('id', '');
};

/**
 * Replaces content with a link that will show said content in a lightbox.
 *
 * @method
 * @param  {[type]} elements [description]
 * @param  {[type]} label    [description]
 * @return {[type]} [description]
 */
var popoutContent = function(elements, label) {
	// TODO render off-screen and remeasure based on actualy dimensions
	var showPopup = function(element) {
		var padding = 50 * 2; // padding double for top/bottom & right/left
		var width = Math.min(document.viewport.getWidth() * 0.9, element.getWidth() + padding);
		var height = Math.min(document.viewport.getHeight() * 0.85, element.getHeight() + padding);

		// see lightbox.js & window.js
		var win = new Window({
			minimizable: false,
			maximizable: false,
			draggable: true,
			destroyOnClose: true,
			recenterAuto: false,
			width: width,
			height: height,
			zIndex: 10000,
		});

		// wrap content in the same div's as the lightbox layout
		var container = new Element('div').update(
			new Element('div', { id: 'modalContent' }).update(
				'<div id="modalInnerContent"><div class="popoutContentWrapper"></div></div>'
			)
		);
		// TODO replace with Element.clone() after upgrading
		container.down('.popoutContentWrapper').insert(element.cloneNode(true));

		// note: do not use setContent() as it can cause errors in IE 7
		win.setHTMLContent(container.innerHTML);
		window.currentLightbox = win;

		win.showCenter(true, 80);

		//TEMPORARY FIX TO ADD BASE CLASS TO ALL INLINE POPUP CONTENT
		$$('div.dialog_content').each(function(el) {
			el.addClassName('mainBase');
		});
	};

	elements = $(elements);
	elements.each(function(e) {
		if (e.hasClassName('nosuppress') || e.up('.nosuppress')) return;

		var l = e.title || label;
		e.addClassName('popoutContent');
		$T(e).showPopup = showPopup.curry(e);
		popoutElement(e, l);
	});
};

/** Makes links that popout trigger the popout directly.
the anchor may link to either the id of the item directly. */
// TODO this would probably be faster to maintain a list of tables that are popped out
var popoutLinks = function() {
	var basePath = window.location.pathname + '#';
	if (!basePath.startsWith('/')) basePath = '/' + basePath;

	$$('#readPanel a').each(function(a) {
		var href = a.readAttribute('href');
		if (!href || !(href.startsWith('#') || href.startsWith(basePath))) return;

		var id = href.substring(href.indexOf('#') + 1);
		var target = $(id);
		if (!target) return;

		var show = $T(target).showPopup;

		if (!show) {
			target = target.down('.popoutContent');
			if (target) show = $T(target).showPopup;
		}

		if (!show) return;
		a.observe('click', function(event) {
			show();
			Event.stop(event);
		});
	});
};

function tableNote(link) {
	//	if (window.currentLightbox) window.currentLightbox.close();
}

function switchQuicksearch(newAction, newLabel) {
	var context = $('context').value;
	$('quickLinks').action = context + newAction;

	$$('#quickSearchFilters a.quickLabel').each(function(a) {
		if (a.identify() == newLabel) {
			a.show();
		} else {
			a.hide();
		}
	});
}

function switchQuicksearch() {
	var context = $('context').value;
	$('quickLinks').action = context + newAction;

	$$('#quickSearchFilters a.quickLabel').each(function(a) {
		if (a.identify() == newLabel) {
			a.show();
		} else {
			a.hide();
		}
	});
}

// This function controls the search scope selector
(function($) {
	$(function() {
		$('.search-scope-selector').each(function() {
			var scopeContainer = $(this);
			var scopeAnchors = scopeContainer.find('.search-scopes a');
			var scopeTypeField = scopeContainer.find('.search-scope-type-field');
			var scopeValueField = scopeContainer.find('.search-scope-value-field');

			// when an anchor is clicked, update the hidden form fields with the data attributes of the anchor
			scopeAnchors.bind('click', function() {
				var scopeAnchor = $(this);
				var scope = scopeAnchor.data('scopeid');
				var scopeValue = scopeAnchor.data('scopevalue');

				scopeAnchors.removeClass('selected c-Icon--radioButtonChecked');
				scopeAnchors.addClass('c-Icon--radioButtonUnchecked');
				scopeAnchor.removeClass('c-Icon--radioButtonUnchecked');
				scopeAnchor.addClass('selected c-Icon--radioButtonChecked');

				scopeTypeField.val(scope);
				scopeValueField.val(scopeValue);
			});
		});
	});
})(jQuery);

(function($) {
	if (typeof PF === 'undefined') {
		PF = {};
	}

	var TOKEN = (PF.TOKEN = {
		init: function() {
			var redeemPage = $('#redeemToken'),
				createAccount = $('#createAccount'),
				loginAccount = $('#loginAccount');

			if (createAccount.size() > 0) {
				redeemPage.on('click', '.switchToLogin', function() {
					createAccount.hide();
					loginAccount.fadeIn();
					return false;
				});

				redeemPage.on('click', '.switchToCreate', function() {
					loginAccount.hide();
					createAccount.fadeIn();
					return false;
				});

				loginAccount.hide();
			}
		},
	});

	$(function() {
		TOKEN.init();
	});
})(jQuery);

jQuery('.js-paywall-btn').fancybox({
	wrapCSS: 'c-Modal c-Modal-paywall',
	width: '100%',
});

/**
 *  The Collapser object can have mutliple instances,
 *  and should work with any nested ul/li...
 *
 *  This function is used in both the loader and baseapp - so if you make
 *  changes, be sure to check both for potential problems.
 *
 *  Example structure:
 *
 *  <div class="taxonomyTree">
 *    <ul>
 *      <li>
 *        <a class="toggle">
 *        <a class="taxonomyNode" id="0001">My Node's Wonderful Name</a>
 * 		  <ul>
 *          <li>
 *           ...
 *           </li>
 *           <li>
 *           </li>
 *         </ul>
 *       </li>
 *       <li>
 *        ...
 *       </li>
 *     </ul>
 *   </div>
 */
(function($) {
	var COLLAPSER = function(collapser, shutAll, openAll) {
		var c = (this.collapser = collapser = $(collapser));
		var CPR = this;

		shutAll = shutAll === undefined ? true : shutAll; // make sure this is set if it is not passed
		openAll = openAll === undefined ? false : openAll; // make sure this is set if it is not passed

		// if there are any open/close all links
		c.on('click', '.openAll a', function() {
			CPR.openAll();
			return false;
		});

		c.on('click', '.shutAll a', function() {
			CPR.shutAll();
			return false;
		});

		c.addClass('collapser');

		var a = (this.allLis = c
			.find('ul')
			.not('.actions-list')
			.parentsUntil(c, 'li'));

		if (a.length == 0) {
			c.addClass('collapser-flat'); // signifies that a collapser was added, but it is flat (eg. no expandable/collapsable nodes)
			return; // nothing left to do, there are no expandable elements
		}

		if (CPR.getToggle(a).length > 0) {
			c.addClass('collapser-with-toggles');
		} else {
			c.addClass('collapser-without-toggles');
		}

		// attach the listener to the <li> expandable tag
		a.each(function() {
			var li = $(this);
			if (!li.data('COLLAPSER')) {
				li.data('COLLAPSER', c);
				var toggleBtn = CPR.getToggle(li);
				if (toggleBtn) {
					toggleBtn.on('click', function(event) {
						if (li.hasClass('expandable')) {
							if (li.hasClass('open')) {
								toggleBtn.removeClass('c-Icon--remove').addClass('c-Icon--add');
							} else {
								toggleBtn.removeClass('c-Icon--add').addClass('c-Icon--remove');
							}
						}
					});
				}

				li.on('click', function(event) {
					var t = $(this); // this
					// event target
					var tg = $(event.target);
					// event target node name
					var tgnn = tg.prop('nodeName');
					var toggle = CPR.getToggle(t);
					// closest expandable li
					var cli = tg.closest('li.expandable');
					// the closests "stop" tag, meaning that if they are clicked, stop propagtion... TODO: make this overridable in a plugin!
					var cstop = tg.closest('input, label, a, li:not(.expandable)');
					// the distance to the closest LI
					var dcli = tg.parentsUntil(cli).length;
					// the distance to the closest "stop" tag.
					var dcstop = tg.parentsUntil(cstop).length;

					// this is necessary so that if an "a" tag (for example) is within a collapser, it doesn't also collapse/expand the collapser!
					if (
						// there is no expandable section, so give up
						!cli ||
						// if the target is also the closest stop element... but it is not explicitly a toggle, then we need to stop propagation!
						(tg.is(cstop) && !tg.is(toggle)) ||
						// if somewhere between the target and the collapsing element, there is a stop element, then don't collapse either
						(dcstop < dcli && !cstop.is(toggle))
					) {
						event.stopPropagation();
						// if the closest li is not an expandable one, or if what was clicked was a link, stop propagation
						return;
					}

					CPR.toggleSection(t);
					return false;
				});
			}
		});

		a.addClass('expandable');
		if (shutAll) {
			CPR.shutAll();
			c.find('li.active-section').each(function(li) {
				CPR.openSection(this);
			});
		} else if (openAll) {
			CPR.openAll();
		} else {
			// we have to make sure that if it is not "open" or "shut", we set them
			CPR.openSection(a.not('shut').not('open'));
		}
	};

	var CP = COLLAPSER.prototype;

	CP.openAll = function() {
		this.openSection(this.allLis);
	};

	CP.shutAll = function() {
		this.shutSection(this.allLis);
	};

	CP.setSection = function(section, addClass, removeClass, text) {
		section = $(section);
		var toggle = this.getToggle(section);
		var span = toggle.find('span').first();

		section.addClass(addClass).removeClass(removeClass);

		// The toggle is the reverse state of the parent
		if (addClass === 'open') {
			toggle
				.addClass('ico-toggle-' + removeClass + ' c-Icon--remove')
				.removeClass('ico-toggle-' + addClass + ' c-Icon--add');
		} else {
			toggle
				.addClass('ico-toggle-' + removeClass + ' c-Icon--add')
				.removeClass('ico-toggle-' + addClass + ' c-Icon--remove');
		}
		span.html(text);
	};

	CP.openSection = function(section) {
		this.setSection(section, 'open', 'shut', 'Close section');
	};

	CP.shutSection = function(section) {
		this.setSection(section, 'shut', 'open', 'Open section');
	};

	CP.getToggle = function(section) {
		return section.find('.toggle:first');
	};

	CP.toggleSection = function(section) {
		var s = $(section);
		if (s.hasClass('open')) {
			this.shutSection(s);
		} else {
			this.openSection(s);
		}
	};

	$(function() {
		$('.taxonomyTree').each(function() {
			var t = $(this),
				s = t.hasClass('all-shut'),
				o = t.hasClass('all-open'),
				c = new COLLAPSER(this, s, o);
			c.openSection($(this).find('.active').closest('li').parents('.expandable'));
			var t = $(this);
			if (t.hasClass('relatedTaxonomyTree')) {
				c.openAll();
			}
			$.data(this, 'COLLAPSER', c);
		});

		$('.toc-menu').each(function() {
			if ($(this).find('.issue-toc').length <= 0) {
				//Do not add collapser to issue toc main content
				var t = $(this),
					s = t.hasClass('all-shut'),
					c = new COLLAPSER(this, s);

				if (t.find('.book-toc').length > 0) {
					// this is book TOCs...
					//t.find(".expandable").prepend("<a class='toggle minustoggle'><span>toggle</span></a>");
					c.shutSection(t.find("span:contains('Front Matter')").parents('.expandable'));
					c.shutSection(t.find("span:contains('Back Matter')").parents('.expandable'));
				} else if (t.find('.journal-toc').length > 0) {
					// journal TOCs
					var curr = t.find('.current');
					c.openSection(curr.closest('li').parents('.expandable'));
					// By default, always expand the first Volume if no other volumes are selected
					if (!curr) {
						c.openSection(t.find('.js-first').closest('li'));
					}
				}
				c.openSection($(this).find('.active').closest('li').parents('.expandable'));

				$.data(this, 'COLLAPSER', c);
			}
		});
	});
})(jQuery);

////Update for BRIL-1377, DGSG-85 with extensive help from PKloss
(function($) {
	var HIGHLIGHTER = function() {
		var b = $('body'),
			ht = $('.ico-highlights-show'),
			visible = 'hi-visible',
			hidden = 'hi-hidden';
		// Old version had code to set cookies with CookieJar, but the cookies weren't being set
		b.addClass('highlights');
		b.addClass(visible);
		updateHT();
		ht.on('click', function(e) {
			var t = $(this), // this (b)
				tg = $(e.target); // event target

			if (tg.hasClass('ico-highlights-show')) {
				e.stopPropagation();
				b.toggleClass(visible).toggleClass(hidden);
				updateHT();
				return false;
			}
		});
		// This does not currently get used - overridden in PageLinks.tml to always be "Hit Highlighting"
		function updateHT() {
			var label = b.hasClass('hi-visible')
				? 'Hide search term highlighting'
				: 'Show search term highlighting';
			ht.children().text(label);
			ht.attr('title', label);
		}
	};

	$(function() {
		//		new HIGHLIGHTER('#readPanel');
		//		new HIGHLIGHTER('.component-content-html'); // for configurable layout pages
		new HIGHLIGHTER();
	});
})(jQuery);

(function($) {
	var SHOW_MORE_FACET = function() {
		$('.facetValues ul[data-facet-type=tree]').each(function() {
			ul = $(this);
			var cutOff = ul.data('facet-cutoff') || 25;
			var children = ul.children();
			if (cutOff > 0 && children.length > cutOff) {
				var label = ul.data('facet-show-more-label') || 'Show more ...';
				/* note that .eq() is a ZERO-based index into the list of items */
				var lastItemBeforeCutoff = ul.children().eq(cutOff - 1);
				var showMoreLi = $('<li class="show-more">').insertAfter(lastItemBeforeCutoff);
				var link = showMoreLi.prepend('<a href="#" class="show-more">' + label + '</a>');
				showMoreLi.nextAll('li').hide();
				link.click(function(event) {
					event.preventDefault();
					showMoreLi.nextAll('li').show();
					showMoreLi.remove();
				});
			}
		});
	};

	$(function() {
		new SHOW_MORE_FACET();
	});
})(jQuery);

(function($) {
	var FEATURED = function(featuredSec) {
		var F = this,
			f = (F.f = $(featuredSec)),
			lis = (F.lis = f.children('li')),
			imgs = lis.find('img'),
			resizeId = -1;

		$(window).load(function() {
			F.minWidth = Math.max.apply(
				Math,
				lis
					.map(function() {
						return $(this).outerWidth();
					})
					.get()
			); // calculate the largest child, allowing for us to know the minimum size to use for calculations,
			F.minHeight = Math.max.apply(
				Math,
				lis
					.map(function() {
						return $(this).outerHeight();
					})
					.get()
			); // calculate the largest child, allowing for us to know the minimum size to use for calculations
			F.render();
		});

		$(window).resize(function() {
			clearTimeout(resizeId);
			resizeId = setTimeout(F.render(), 200);
		});
	};

	var F = FEATURED.prototype;

	F.render = function() {
		var F = this,
			lis = F.lis,
			innerWidth = F.f.innerWidth(),
			minWidth = F.minWidth,
			minHeight = F.minHeight,
			originalSize = F.lis.length,
			offset = originalSize % 2 == 0 ? 0 : 1, // the offset helps for odd number of elements
			size = originalSize + offset, // if odd amount, treat it like it is one larger
			perRow =
				innerWidth > originalSize * minWidth
					? originalSize
					: parseInt(innerWidth / minWidth);

		if (perRow == F.perRow) {
			return;
		}

		while (perRow < originalSize && size % perRow != 0 && perRow >= 1) {
			perRow = perRow - 1; // divide even rows, so look for a good break point.
		}
		var rows = Math.ceil(originalSize / perRow);

		F.perRow = perRow;

		lis.removeClass('end-row').removeClass('start-row');
		lis.filter(':nth-child(' + perRow + 'n)').addClass('end-row');
		lis.filter(':nth-child(' + perRow + 'n+1)').addClass('start-row');
		lis.css({ width: 100 / perRow + '%', height: minHeight });

		F.f.animate({ height: minHeight * rows }, 250, 'swing', function() {
			F.f.addClass('loaded');
		});
	};
	$(function() {
		$('.featured-items').each(function() {
			new FEATURED(this);
		});
	});
})(jQuery);

/**
 * Show More/ Show Less for blocks of elements
 *
 * HTML structure should look like this:
 * <ul class="toggle-wrapper">
 *     <li class="togglable">
 *     </li>
 *     <li class="togglable">
 *     </li>
 *     <li class="togglable">
 *     </li>
 *     <li class="toggle-activator">Toggle Me!!!</li>
 * </ul>
 *
 * This can be used for any element type, so long as the structure is similar
 * to the above example
 */
(function($) {
	$('.toggle-wrapper')
		.find('.toggleable:not(:first)')
		.hide();
	$('.toggle-activator').click(function(event) {
		$(this)
			.toggleClass('open')
			.closest('.toggle-wrapper')
			.find('.toggleable:not(:first)')
			.toggle();
	});
})(jQuery);

// This overrides the form submission behavior to prevent double clicking.
// currently, this applies to all forms... as we couldn't think of a reason
// double submissions should be supported.
(function($) {
	// Tapestry didn't provide an event when validation was complete, or when the
	// ajax updating of zones were completed... so... I've added an event by overriding
	// their FormEventManager.handleSubmit() method.
	Tapestry.FormEventManager = Class.create(Tapestry.FormEventManager, {
		handleSubmit: function($super, e) {
			var submittedCss = 'js-form-submitted',
				form = $(this.form);

			//            console.log("handling submit");
			if (form.hasClass(submittedCss)) {
				Event.stop(e);
				// TODO do we alert the user that the form has already been submitted, please wait?
				//            	if(console)
				//            		console.log("stopped submission");
				return false;
			} else {
				//            	if(console)
				//            		console.log("adding css class");
				form.addClass(submittedCss);
			}

			var shouldSubmit = $super(e);
			if (!shouldSubmit) {
				form.removeClass(submittedCss);
				//            	if(console)
				//            		console.log("submission prevented");
			}
			return shouldSubmit;
		},
	});
})(jQuery);

// This is a custom zone highlight function that will start at the 'background-highlight' color of a
// color group and then fade to transparent.
(function($) {
	Tapestry.ElementEffect.highlightcolorgroup = function(e) {
		var element = $(e);
		element.addClass('bg-highlight').animate(
			{
				backgroundColor: 'transparent',
			},
			1000
		);
	};
})(jQuery);

// initialize the various custom ui widgets on the page
(function($) {
	var figureList = $('.component-content-figures'),
		htmlBody = $('.component-content-html'),
		scrollThumbs = figureList.hasClass('scroll-thumbnails'),
		contentHeadings = $('.component-headings'),
		bodyTabItem = htmlBody.closest('.container-item'),
		bodyTabItemId = bodyTabItem.attr('id'),
		bodyTabs = htmlBody.closest('.container-tabbed'),
		bodyTabLink = bodyTabs.find("a[href='#" + bodyTabItemId + "']"),
		bodyTabIndex = bodyTabLink
			.parent()
			.prevAll('li')
			.size(),
		hasBodyTab = bodyTabLink.size() > 0;

	// initialize any collapsible trees
	$('.collapsible-tree').collapsibletree();

	// initialize the figure viewer.  this currently expects only one figure list and one body element.
	figureList.figureviewer(htmlBody, { scrollThumbnails: scrollThumbs });

	// initialize the content-headings link and make sure and switch to the full html body tab if we do
	if (hasBodyTab) {
		contentHeadings.find('ul a').on('click', function() {
			var activeTab = bodyTabs.tabs('option', 'active');

			if (activeTab != bodyTabIndex) {
				bodyTabs.tabs('option', 'active', bodyTabIndex);
			}
		});
	}

	// initialize any image galleries.
	$('.component-image-gallery').imagegallery();

	// initialize the configurable layout itself
	$('.layout').configurablelayout();
})(jQuery);

(function($) {
	// initialize any dropdown buttons
	$('.dropdown-button:not(.no-jquery-ui)').each(function(index, value) {
		$(value).jui_dropdown();
	});
})(jQuery);

(function($) {
	// initializing any collapsible grids
	$('.grid.collapsible').each(function(index, value) {
		var grid = $(this),
			initialRows = grid.find('.row-block').not('.collapsed'),
			hiddenRows = grid.find('.row-block.collapsed'),
			replace = grid.hasClass('replace-collapse'),
			more = grid.find('a.more'),
			less = grid.find('a.less');

		more.on('click', function(e) {
			e.stopPropagation();
			if (replace) {
				initialRows.slideUp();
			}
			hiddenRows.slideDown();
			more.hide();
			less.show();
			return false;
		});

		less.on('click', function(e) {
			e.stopPropagation();
			if (replace) {
				initialRows.slideDown();
			}
			hiddenRows.slideUp();
			less.hide();
			more.show();
			return false;
		});
	});
})(jQuery);

// functionality for the ecommerce offer selector
(function($) {
	$('.offer-select .dropdown-menu-item').on('click', function(event) {
		var item = $(event.currentTarget),
			offerId = item.data('offerid'),
			url = item.data('url'),
			container = item.closest('.offer-select');

		if (url != '') {
			window.location.href = url;
		} else {
			container.find('.offer-info, .offer-action').removeClass('selected');
			container
				.find('#offer-info-' + offerId + ', #offer-action-' + offerId)
				.addClass('selected');
		}
	});
})(jQuery);

(function($) {
	$('.off-site-access-message-dismiss').on('click', function(dismiss) {
		$('#offSiteMessage .off-site-access').addClass('hidden');
	});
})(jQuery);

//Image Lazy Loader
document.observe('dom:loaded', function() {
	lazyLoadImagesNearViewPort();
	$j(document).scroll(function() {
		lazyLoadImagesNearViewPort();
	});
});

function lazyLoadImagesNearViewPort() {
	var lazyLoadableImages = $j('.lazy-load');
	if (lazyLoadableImages.length > 0) {
		var currentViewPortTop = $j(document).scrollTop();
		var currentViewPortBottom = currentViewPortTop + $j(window).height();
		var viewPortSize = $j(window).height();
		lazyLoadableImages.each(function() {
			// if current image is in the viewport plus buffer load it
			if (
				$j(this).position().top + $j(this).height() > currentViewPortTop - viewPortSize &&
				$j(this).position().top < currentViewPortBottom + viewPortSize
			) {
				var imageSrc = $j(this).attr('data-image-src');
				$j(this).attr('src', imageSrc);
			}
		});
	}
}


// Legacy export citation logic
// TODO: limit this to only legacy skins once PF2 implementation is done 
function handleExportCitationClick(element) {
  var target = element.currentTarget;
  fetch('/rest/citation/export', {
    method: 'POST',
    credentials: 'same-origin',
    body: getCitationRequestBody(target),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(function(r) {return r.blob();}).then(function(blob) { downloadBlob(blob, getCitationFileName(target)); }).catch(function (err) {
      return err;
  });
}

function getCitationRequestBody(ref) {
	var jsonPayload = {
		"format": ref.getAttribute('data-export-format'),
		"citationExports": [{
			"documentUri": ref.getAttribute('data-document-uri'),
			"citationId": ref.getAttribute('data-citation-id')
		}]
	};
	return JSON.stringify(jsonPayload)
}

function getCitationFileName(ref) {
	var fileName = "-";
	if (ref.getAttribute('data-citation-id')) {
		fileName += ref.getAttribute('data-citation-id')
	} else {
		var lastSlash = ref.getAttribute('data-document-uri').lastIndexOf('/');
		fileName += ref.getAttribute('data-document-uri').substring(lastSlash +1);
	}
	return "citationExport" + fileName + "." + ref.getAttribute('data-file-extension');
}

function downloadBlob(blob, filename) {
	if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
       window.navigator.msSaveOrOpenBlob(blob, filename);
	} else {
		var a = document.createElement("a");
	    document.body.appendChild(a);
	    a.style = "display: none";
		var url = window.URL.createObjectURL(blob);
		a.href = url;
	    a.download = filename;
	    a.click();
	    window.URL.revokeObjectURL(url);
	}
}

function exportCitationCick() {
	var exportCitationButtons = document.querySelectorAll('.export-citation'), i;
	if (exportCitationButtons) {
		for (i = 0; i < exportCitationButtons.length; ++i) {
			exportCitationButtons[i].addEventListener('click', handleExportCitationClick);
		}
	}
}
exportCitationCick();

//Export figure slide as a PowerPoint
function handleExportFigureAsPPTClick(element) {
	var target = element.currentTarget;
	fetch('/rest/downloadppt', {
		method: 'POST',
		credentials: 'same-origin',
		body: getPresentationRequestBody(target),
		headers: {'Content-Type': 'application/json'}
	}).then(function(r) {return r.blob();}).then(function(blob) {downloadBlob(blob, getPresentationFileName(target));}).catch(function (err) {
		return err;
	});
}

function getPresentationRequestBody(figure) {
	var jsonPayload = {
		figures: [{
			"imageUri": figure.getAttribute('data-image-uri'),
			"header": figure.getAttribute('data-header-text'),
			"footer": figure.getAttribute('data-footer-text'),
			"copyright": figure.getAttribute('data-copyright-text'),
			"thirdPartyLogos": figure.getAttribute('data-third-party-logos')
		}]
	};
	return JSON.stringify(jsonPayload);
}

function getPresentationFileName(figure) {
	return "figure.ppt";
}

function exportFigureAsPPTClick() {
	var exportCitationButtons = document.querySelectorAll('.export-figure-ppt'), i;
	if (exportCitationButtons) {
		for (i = 0; i < exportCitationButtons.length; ++i) {
			exportCitationButtons[i].addEventListener('click', handleExportFigureAsPPTClick);
		}
	}
}
document.addEventListener('DOMContentLoaded', function(event) {
	exportFigureAsPPTClick();
	event.preventDefault();
});
