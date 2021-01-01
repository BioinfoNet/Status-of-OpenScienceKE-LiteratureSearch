/*jslint indent:4, browser:true, sub:false */
/*globals LC5inline*/

var LC5inline_INLINE_COOKIE = 'LC5InlinePosition';
var LC5inline_INLINE_SETTINGS = 'LC5InlineConfig';

if (typeof window.LC5inline === 'undefined') {
    window.LC5inline = {
        chat_config : {

        },
        argsOK : {

        },
        agentStatus : {
            state : '',
            isChatActive: false,
            isChatStopped: false
        }
    };
}

function $Cid(el){
    return document.getElementById(el);
}

/**
 * Widget generator
 */
(function (LC5inline) {
    "use strict";

    // stop double execution - use the parser function as feedback
    if (typeof window.LC5inline.widgetDomParser !== 'undefined') {
        return;
    }

    window.LC5inline.agentFirstStatus = 'DONE';
    window.LC5inline.hasDragged = false;

    window.LC5inline.Lg = [];

    // Get the IE version

    var ieBrowserVersion = function() {
        var version = 999;
        if (navigator.appVersion.indexOf("MSIE") != -1)
            version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        else if(navigator.appVersion.indexOf("rv:") != -1)
            version = parseFloat(navigator.appVersion.split("rv:")[1]);

        return version;
    };


    /*
     * @function 	loadOnOffStateConfig
     *  			load the domain specific agent on/off state from server
     *				inject a script into the head so we have a script with global namespace which
     *				functions as the callback from the loadscript
     * @param		args - args.domain = sub-domain
     */
    window.LC5inline.loadOnOffStateConfig = function(args) {
        // save params in some namespaced place for the callback
        window.LC5inline.argsOK = args;
    };

    /*
     * @function 	lc5UpdateWidget
     *  			callback from the loading of agent on/off config
     * @param		dic from server
     * @param		boolean - if called but not to set refresh timer (server will not set this param)
     */
    window.lc5UpdateWidget = function(res, bOnce) {
        bOnce = typeof bOnce === 'undefined' ? false : bOnce;

        if (typeof res !== 'undefined' && res !== null
            && typeof res.state !=='undefined') {

            window.LC5inline.agentStatus = res;
            if (window.LC5inline.agentFirstStatus === 'FIRST'
                || typeof window.cas_ === 'undefined') {

                // do the initial bootstrap
                // rest is handled after close button is pressed
                window.LC5inline.loadDomainConfig(window.LC5inline.argsOK);

            } else {
                if (res.state === 'AVAILABLE') {
                    // server returns session state - i.e. if a chat is in progress
                    // we should check / force state if no chat else do nothing
                    var chatStatus = lc5.readCookie(LC5inline_INLINE_COOKIE);
                    if (typeof res.isChatActive === 'undefined'
                        || !res.isChatActive) {

                        // force open the chat button if no chat badge available
                        if ((chatStatus === null || chatStatus === ''
                            || chatStatus === 'null')
                            && typeof window.LC5inline.chat_config.onlineWidgetOnOff !== 'undefined'
                            && window.LC5inline.chat_config.onlineWidgetOnOff !== '2')  {

                            window.LC5inline.showChatBadge();
                        }
                        if (chatStatus === 'min' ||
                            (typeof window.LC5inline.chat_config.onlineWidgetOnOff === 'undefined'
                                || window.LC5inline.chat_config.onlineWidgetOnOff === '2')
                                && chatStatus !== 'max') {

                            window.LC5inline.openInlineStatus();
                            window.LC5inline.hideChatBadge();
                        }
                    } else {
                        // server says there is a session
                        // do nothing
                    }
                } else {
                    // force closed the chat button if no agent available
                    // and no session active or chat had been closed
                    var chatStatus = lc5.readCookie(LC5inline_INLINE_COOKIE);

                    if (chatStatus === null || chatStatus === 'null' || chatStatus === '') {
                        window.LC5inline.closeInlineStatus();
                        if (typeof window.LC5inline.widget !== 'undefined') {
                            window.LC5inline.hideChatBadge();
                        }
                    }
                }
            }
        }
    };

    /*
     * @function 	killSession
     *  			kill the session
     *				inject a script into the head so we have a script with global namespace which
     *				functions as the callback from the loadscript
     * @param		args - args.domain = sub-domain
     */
    window.LC5inline.killSession = function(args) {
        // force the saved session flag to off
        window.LC5inline.agentStatus.isChatActive = false;
    };

    /*
     * @function 	loadDomainConfig
     *  			load the domain specific config from server
     *				inject a script into the head so we have a script with global namespace which
     *				functions as the callback from the loadscript
     * 				also calls the actual render of widget
     * @param		args - args.domain = sub-domain
     * TODO:		remove for livecom
     */
    window.LC5inline.loadDomainConfig = function(args) {
        // continue loading config once language is loaded
        function continueloadDomainConfig (loadedFrame, count) {
            count = typeof count === 'undefined' ? 0: count;

            // also check if Lg actually executed
            if ( typeof loadedFrame.Lg !== 'undefined') {
                window.LC5inline.Lg = JSON.parse(JSON.stringify(loadedFrame.Lg));
            }
            else {
                if (count < 2000) {
                    setTimeout(window.LC5inline.loadDomainConfig(args), 100);
                }
                return;
            }
        }
    };

    /*
     * @function 	loadDomainConfigCallback
     *  			callback from the loading of domain config
     *				injects the admin defined text and / or button image into clients html page
     */
    window.LC5inline.loadDomainConfigCallback = function() {
        // set-up agent on/off poll
        window.LC5inline.agentFirstStatus = 'DONE';

        var onlineColor = window.LC5inline.chat_config.onlineColor,
            onlineChatBtn = window.LC5inline.chat_config.onlineChatButton,
            el;

        var onlineTopTitle = window.LC5inline.chat_config.onlineTitle;
        var onlineMinChatBtnTxt = window.LC5inline.chat_config.onlineMinimizedButtontext;

        // inject some config items
        el = document.getElementById('lc5-inline-chat-header-text');
        if (el) {
            if (onlineTopTitle) {
                el.innerHTML = onlineTopTitle;
            } else {
                el.innerHTML = '';
            }
            if (window.LC5inline.chat_config.onlineTitleColor) {
                el.style.color = window.LC5inline.chat_config.onlineTitleColor;
            }
            if (window.LC5inline.chat_config.onlineTitleFont) {
                el.style.fontFamily = window.LC5inline.chat_config.onlineTitleFont;
            }
            if (window.LC5inline.chat_config.onlineTitleFontSize) {
                el.style.fontSize = window.LC5inline.chat_config.onlineTitleFontSize;
            }
        }
        el = document.getElementById('lc5-inline-chat-status-button-text');
        if (el) {
            if (onlineMinChatBtnTxt) {
                el.innerHTML = onlineMinChatBtnTxt;
            } else {
                el.innerHTML = '';
            }
            if (window.LC5inline.chat_config.onlineTitleColor) {
                el.style.color = window.LC5inline.chat_config.onlineTitleColor;
            }
        }

        // first render the widget now we have the config
        new LC5inline.VIPWidget(window.LC5inline.argsOK).render();

        // force setting of state from initial load
        window.lc5UpdateWidget(window.LC5inline.agentStatus, true);

        // inject some config items
        el = document.getElementById('lc5-inline-chat-header');
        if (el && onlineColor) {
            el.style.backgroundColor = onlineColor;
            var newcol = window.LC5inline.getColorByLuminosity(onlineColor);
            el.style.color = newcol;
        }
        el = document.getElementById('lc5-inline-chat-status-button');
        if (el && onlineColor)
            el.style.backgroundColor = onlineColor;

        // force in button position before we really set-up
        var dic = window.LC5inline.getLeftRight();
        var el = document.getElementById('lc5-inline-chat-status');
        if (el) {
            el.style.right = dic.r;
            el.style.left = dic.l;
        }

        el = document.getElementById('lc5-inline-chat-startbutton');
        if (el && onlineChatBtn) {
            // Workaround for invalid url when default icon used
            var testImg = new Image();
            var src = onlineChatBtn;
            if (onlineChatBtn.indexOf('type=cb') < 0) {
                if (onlineChatBtn.indexOf('?') < 0) {
                    src += '?';
                } else {
                    src += '&';
                }
                src += 'type=cb';
            }
            testImg.src = src;
            testImg.onerror = function() {
                // Correct src
                cb(onlineChatBtn);
            };
            testImg.onload = function() {
                // Use src directly
                cb(testImg.src);
            };
            var cb = function(src) {
                el.setAttribute('src', src);
                applyCWDimensions();
            };
        }
    };

    /*
     * @function 	addClass
     * @param		class
     * @param		element
     */
    window.LC5inline.addClass = function ( classname, element ) {
        var cn = element.className;
        //test for existance
        if( cn.indexOf( classname ) != -1 ) {
            return;
        }
        //add a space if the element already has class
        if( cn != '' ) {
            classname = ' '+classname;
        }
        element.className = cn+classname;
    };

    /*
     * @function 	removeClass
     * @param		class
     * @param		element
     */
    window.LC5inline.removeClass = function (classname, element ) {
        var cn = element.className;
        var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
        cn = cn.replace( rxp, '' );
        element.className = cn;
    };

    /*
     * @function 	getElementsByClassName
     * @param		classname
     * @param		tg
     * @param		element
     */
    window.LC5inline.getElementsByClassName = function (className, tag, elm) {
        var i, il, j, jl, k, kl, l, ll, m, ml;

        if (document.getElementsByClassName) {
            window.LC5inline.getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for (i = 0, il = elements.length; i < il; i += 1) {
                    current = elements[i];
                    if (!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        else if (document.evaluate) {
            window.LC5inline.getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                for (j = 0, jl = classes.length; j < jl; j += 1) {
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        }
        else {
            window.LC5inline.getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for (k = 0, kl = classes.length; k < kl; k += 1) {
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for (l = 0, ll = elements.length; l < ll; l += 1) {
                    current = elements[l];
                    match = false;
                    for (m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return window.LC5inline.getElementsByClassName(className, tag, elm);
    };


    /*
     * @function 	getThemeProperties
     *  			loads the theme properties - is for the old popup chat
     * @param		key
     * @param		col
     */
    window.LC5inline.getThemeProperties = function (key,col) {
        for (var i = 0, len = col.length; i < len; i++) {
            if (col[i].value === key) {
                // Got the theme
                return col[i].properties;
            }
        }
    };

    /*
     * handle resizing of window
     */
    window.LC5inline.handleResize = function (){
        if (window.addEventListener) {
            window.addEventListener('resize', function(e){
                window.LC5inline.forceInBox();
            });
        }
        else {
            if (window.attachEvent) {
                window.attachEvent('resize', function(e){
                    window.LC5inline.forceInBox();
                });
            }
        }
    };

    /**
     * to open and close inline chat and status floating windows
     * closeVIPWindow is called from iFrame of chat when minimize button is called
     */
    window.LC5inline.minimizeInlineWindow = function (bOpenInline){

        bOpenInline = typeof bOpenInline === 'undefined';

        window.LC5inline.chatwrapper.style.display = 'none';
        if (bOpenInline) {
            window.LC5inline.openInlineStatus();
        }

        var elementMinimizedDiv = document.getElementById('lc5-inline-chat-status-button-text');
        elementMinimizedDiv.innerHTML = window.LC5inline.chat_config.onlineMinimizedButtontext;
        elementMinimizedDiv.style.font = window.LC5inline.chat_config.onlineTitleFont;
        elementMinimizedDiv.style.fontSize = window.LC5inline.chat_config.onlineTitleFontSize;
        var btn = document.getElementById('lc5-inline-chat-status-button');
        btn.style.background = window.LC5inline.chat_config.onlineColor;
        document.cookie = LC5inline_INLINE_COOKIE + "=" + 'min';
    };

    window.LC5inline.openInlineChat = function (url, args) {
        var newDiv = document.getElementById('lc5-inline-chat');

        window.LC5inline.chatbox.innerHTML = "<iframe name='lc5-inline-iframe' id='lc5-inline-chat-frame' style='border:0px;padding:0px;' src='" +
            url + "'" + args + "></iframe><div id='lc5-dragoverlay'></div>";

        //FF doesn't recognize mousewheel as of FF3.x
        var mousewheelevt="onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; //  assume that remaining browsers are older Firefox

        var frame = document.getElementById('lc5-inline-chat-frame');

        function mouseWheel(e){
            this.scrollTop -= e.wheelDeltaY;
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        if (frame.addEventListener)
            frame.addEventListener(mousewheelevt, mouseWheel, false);
        else if (frame.attachEvent)
            frame.attachEvent(mousewheelevt, mouseWheel);

        window.LC5inline.showInlineChat();

        /* add html header */
        frame.onload = function() {
            try {
                var html = window.parent.LC5inline.chat_config.onlineHTMLheader;
                if (html === 'null') {
                    html = '';
                }
                if (null !== html && '' !== html) {
                    var cw = window.parent.frames['lc5-inline-iframe'].document.getElementById('html-header-container');
                    if (cw) {
                        cw.innerHTML = html;
                    }
                }
            } catch (err) {
                console.log('could not write html header...' + err.message);
            }

            // At this point the Chat wrapper is certain to be loaded, so adjust dimensions for responsive
            applyCWDimensions();
        };

        return newDiv;
    };

    window.LC5inline.showInlineChat = function () {
        window.LC5inline.chatwrapper.style.display = 'block';
        document.cookie = LC5inline_INLINE_COOKIE + "=" + 'max';
    };

    window.LC5inline.openInlineStatus = function (){
        var chatWindowOpened = lc5.readCookie(LC5inline_INLINE_COOKIE);
        if(null !== chatWindowOpened && 'null' !== chatWindowOpened && '' !== chatWindowOpened && 'min' === chatWindowOpened) {
            window.LC5inline.removeClass('lc5-display-off', window.LC5inline.chatstatus);
            window.LC5inline.addClass('lc5-display-on', window.LC5inline.chatstatus);
        }
        else{
            window.LC5inline.removeClass('lc5-display-on', window.LC5inline.chatstatus);
            window.LC5inline.addClass('lc5-display-off', window.LC5inline.chatstatus);
        }
        
        // Scroll chat to newest message
        if (window.frames['chat-frame']) {
            if (ieBrowserVersion() <= 9) {
                window.frames['chat-frame'].document.parentNode.scrollTop = window.frames['chat-frame'].document.parentNode.offsetHeight;
            } else {
                window.frames['chat-frame'].document.parentNode.scrollTop = window.frames['chat-frame'].document.parentNode.scrollHeight;
            }
        }
    };

    window.LC5inline.closeInlineStatus = function (){
        window.LC5inline.removeClass('lc5-display-on', window.LC5inline.chatstatus);
        window.LC5inline.addClass('lc5-display-off', window.LC5inline.chatstatus);
    };

    window.LC5inline.showChatBadge = function (){
        var chatWindowMinimized = lc5.readCookie(LC5inline_INLINE_COOKIE);
        if(null !== chatWindowMinimized && 'null' !== chatWindowMinimized && '' !== chatWindowMinimized && 'min' === chatWindowMinimized) {
            window.LC5inline.removeClass('lc5-display-off', window.LC5inline.widget);
            window.LC5inline.addClass('lc5-display-on', window.LC5inline.widget);
        }
    };

    window.LC5inline.hideChatBadge = function () {
        window.LC5inline.removeClass('lc5-display-on', window.LC5inline.widget);
        window.LC5inline.addClass('lc5-display-off', window.LC5inline.widget);
    };

    /*
     * get a cookie value
     * standard JS function
     */
    window.LC5inline.getCookie = function(a) {
        var b = a + '=';
        var d = document.cookie.split(';');
        for(var i = 0; i < d.length; i++) {
            var c = d[i];
            while (c.charAt(0)== ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(b) == 0) {
                return c.substring(b.length, c.length);
            }
        }
        return null
    };

    /*
     * set a cookie
     * standard JS function
     */
    window.LC5inline.setCookie = function (a,b,s){
        var d;
        if (s) {
            if(s==0) {
                d = ';expires=0';
            } else {
                var c = new Date();
                c.setTime(c.getTime() + (s*1000));
                d = ';expires=' + c.toGMTString()
            }
        }else {
            d = '';
        }
        var e = ';path=/';
        var domain = document.domain.match(/[^.]+?.[^.]+?$/);
        if (domain) {
            e += ';domain=.' + domain[0];
        }
        document.cookie = a + '=' + b + d + e;

    };

    window.LC5inline.eraseCookie = function(a) {
        window.LC5inline.setCookie(a, '', -1);
    };

    window.LC5inline.setupInlineActions = function() {
        // SJC event handler on status bar
        var chatStatusEl = $Cid('lc5-inline-chat-status');
        var chatStatusFunc = function(ev){
            // make sure window set-up if started minimized
            window.LC5inline.openVIPWindow(window.LC5inline.savedURL);
            window.LC5inline.showInlineChat();
            window.LC5inline.forceInBox();
            window.LC5inline.closeInlineStatus();
            ev.preventDefault();
        };

        // Check attachEvent for IE < 9
        if (chatStatusEl.attachEvent) {
            chatStatusEl.attachEvent("click", chatStatusFunc, false);
        } else {
            chatStatusEl.addEventListener("click", chatStatusFunc, false);
        }
        chatStatusEl.addEventListener("touchstart", chatStatusFunc, false);

        var chatMinimizeEl = $Cid("lc5-inline-chat-minimize-button");
        var chatMinimizeFunc = function(ev){
            window.LC5inline.minimizeInlineWindow();
            window.LC5inline.openInlineStatus();
            ev.preventDefault();
        };

        // Check attachEvent for IE < 9
        if (chatMinimizeEl.attachEvent) {
            chatMinimizeEl.attachEvent("click", chatMinimizeFunc, false);
        } else {
            chatMinimizeEl.addEventListener("click", chatMinimizeFunc, false);
        }
        chatMinimizeEl.addEventListener("touchstart", chatMinimizeFunc, false);

        var chatCloseEl = $Cid("lc5-inline-chat-close-button");
        var chatCloseFunc = function(ev) {
            if (window.LC5inline.agentStatus.isChatActive) {
                var childFrame = document.getElementById('lc5-inline-chat-frame').contentWindow;
                childFrame.postMessage('closeChat',"*");
                return false;
            } else {
                window.LC5inline.chatwrapper.style.display = 'none';
                window.LC5inline.bestX = -1;
                window.LC5inline.bestY = -1;
                window.lc5UpdateWidget(window.LC5inline.agentStatus, true);
                window.LC5inline.VIPopened = false;
                var currentTime = new Date();
                currentTime.setTime(currentTime.getTime());

                var expire = ';expires=' + currentTime.toGMTString();
                document.cookie = LC5inline_INLINE_COOKIE + "=" + 'max' + expire;

                // also expire the groupID cookie on logout
                document.cookie = LC5inline_INLINE_SETTINGS + "=" + window.LC5inline.groupID + expire;
                window.LC5inline.initialized = false;

                if(window.LC5inline.currentAnchorId && '' !== window.LC5inline.currentAnchorId){
                    var currentAnchor = document.getElementById(window.LC5inline.currentAnchorId);
                    if(currentAnchor){
                        currentAnchor.style.display = '';
                    }
                }
            }
            ev.preventDefault();
        };

        // Check attachEvent for IE < 9
        if (chatCloseEl.attachEvent) {
            chatCloseEl.attachEvent("click", chatCloseFunc, false);
        } else {
            chatCloseEl.addEventListener("click", chatCloseFunc, false);
        }
        chatCloseEl.addEventListener("touchstart", chatCloseFunc, false);
    };

    // set-up the html defined left and right positions
    window.LC5inline.getLeftRight = function() {
        var position = window.LC5inline.getPosition(window.LC5inline.argsOK);
        var dic = {};
        switch (position) {

            case 'bottom-left':
                dic.l = '100px';
                if (ieBrowserVersion() <= 9) {
                    dic.r = 'auto';
                } else {
                    dic.r = 'initial';
                }
                break;

            default:
                dic.r = '100px';
                if (ieBrowserVersion() <= 9) {
                    dic.l = 'auto';
                } else {
                    dic.l = 'initial';
                }
                break;
        }
        return dic;
    };

    window.LC5inline.setupDrag = function() {
        // Enable ECMAScript 5 strict mode within this function:
        'use strict';

        // Obtain a node list of all elements that have class="lc5-draggable":
        var draggable = window.LC5inline.getElementsByClassName('lc5-draggable'),
            i;
        var draggableCount = draggable.length;

        // initialize the drag of an element where an event ("mousedown") has occurred:
        function startDrag(evt) {

            // The element's position is based on its top left corner,
            // but the mouse coordinates are inside of it, so we need
            // to calculate the positioning difference:

            var diffX = evt.clientX - this.offsetLeft,
                diffY = evt.clientY - this.offsetTop,
                that = this;


            // make main parent page unselectable for duration of drag
            var body = document.body;
            window.LC5inline.addClass('lc5-unselectable', body);
            // show the hidden overlay over iframe to capture mouse events here
            var framewrapper = document.getElementById('lc5-dragoverlay');
            framewrapper.style.display = 'block';

            // add a mouse click handler to parent page to stop FF select texts
            body.onmousedown = function(e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                return false;
            };

            // moveAlong places the current element (referenced by "that")
            // according to the current cursor position:
            function moveAlong(e) {
                if (window.LC5inline.checkBoxInScreen((e.clientX - diffX),
                    (e.clientY - diffY))) {

                    that.style.left = (e.clientX - diffX) + 'px';
                    that.style.top = (e.clientY - diffY) + 'px';
                } else {
                    window.LC5inline.forceInBox();
                }
                if(e.stopPropagation) e.stopPropagation();
                if(e.preventDefault) e.preventDefault();
                e.cancelBubble=true;
                e.returnValue=false;
                return false;
            }

            // stopDrag removes event listeners from the element,
            // thus stopping the drag:
            function stopDrag(e) {
                window.LC5inline.hasDragged = true;
                framewrapper.style.display = 'none';
                document.removeEventListener('mousemove', moveAlong);
                document.removeEventListener('mouseup', stopDrag);
                that.removeEventListener('mouseup', stopDrag);
                body.onmousedown = null;
                // release our restriction on main parent page unselectable
                window.LC5inline.removeClass('lc5-unselectable', document.body);
            }


            if (document.addEventListener) {
                framewrapper.addEventListener('mouseup', stopDrag, true);
                document.addEventListener('mouseup', stopDrag);
                document.addEventListener('mousemove', moveAlong);
            } else if (document.attachEvent) {
                framewrapper.attachEvent('mouseup', stopDrag);
                document.attachEvent('mouseup', stopDrag);
                document.attachEvent('mousemove', moveAlong);
            }
        }

        // Now that all the variables and functions are created,
        // we can go on and make the elements draggable by assigning
        // a "startDrag" function to a "mousedown" event that occurs
        // on those elements:
        for (i = 0; i < draggableCount; i += 1) {

            if (draggable[i].addEventListener) {
                draggable[i].addEventListener('mousedown', startDrag);
            } else if (draggable[i].attachEvent) {
                draggable[i].attachEvent('mousedown', startDrag);
            }
        }
    };

    /*
     * @function	getSystemLanguageText
     *				get a text either from config or system language
     *				or return the default if non present
     * @param		id - the id in chat config
     * @param		defText
     */
    window.LC5inline.getSystemLanguageText = function(id, defText) {

        var text;

        var lang;
        if(window.cas_ && window.cas_.lang) {
            lang = window.cas_.lang;
        } else {
            lang = 'en_US';
        }

        if(window.LC5inline.chat_config.systemLanguage && window.LC5inline.chat_config.systemLanguage[lang]
            && window.LC5inline.chat_config.systemLanguage[lang][id] ) {
            text = window.LC5inline.chat_config.systemLanguage[lang][id];
        }

        if (typeof text !== 'undefined' && text !== null && text !== '')
            return text;
        return defText;
    };
    /*
     * @param		url including actually the locale (eg: en_US)
     * @param		callback - the function to run when iframe loaded OK
     */
    window.LC5inline.loadLanguageFields = function(url, callback, loopcount) {
        loopcount = typeof loopcount === 'undefined' ? 0: loopcount;

        // load / refresh iframe with new language
        var f = document.getElementById('lc5-language-iframe');
        if (f !== null)
            document.body.removeChild(f);
        var iframe = document.createElement('iframe');
        var html = '<head><script type="text/javascript" src="'+url+'"></script>'
            + '</head><body></body>';

        iframe.id = 'lc5-language-iframe';
        iframe.style.position = 'absolute';
        iframe.style.top = '-5000px';
        document.body.appendChild(iframe);
        var cw = (iframe.contentWindow || iframe.contentDocument);
        if (cw.document) {
            cw = cw.document;
        }
        cw.open();
        cw.write(html);
        cw.close();

        // TODO: sometimes - iframe not fully loaded when execution arrives here
        // check for better way to ensure complete loading than onload
        // i.e. iframe.Lg['VIP_NOTIFY_WAITFORAGENT'] iframe.Lg is undefined....

        iframe.onload = function() {

            var x=document.getElementById("lc5-language-iframe");
            var loadedframe=(x.contentWindow || x.contentDocument);

            // iframe is loading twice sometimes / always - if called with nothing
            // set-up return and onload will be triggered again
            // TODO: check if this is completely true in all browsers

            // check iframe has loaded
            if (!loadedframe || typeof loadedframe.Lg === 'undefined'
                || !loadedframe.Lg ) {

                // the iframe doesn't always load / is loaded at this point so
                // put in check for last field required and if not available
                // wait some and retry and if that fails re-load whole iframe
                // till max 10 times the quit

                setTimeout(function(){

                    loopcount++;
                    if (loopcount > 20) {
                        console.log('could not load language frame');
                        return;
                    }
                    window.LC5inline.loadLanguageFields(url, callback, loopcount);
                },200);
            } else {

                // check call back valid - then groove on back
                if (typeof callback === 'function')
                    callback(loadedframe);
            }
        }
    };

    window.LC5inline.getIosVersion = function() {
        window.LC5inline.iosVersion = -1;
        window.LC5inline.iosDevice = '';

        if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
            if(/OS [2-6]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent)) {
                // iOS 2-6
                window.LC5inline.iosVersion = 2;
            } else if(/CPU like Mac OS X/i.test(navigator.userAgent)) {
                // iOS 1 so Do Something
                window.LC5inline.iosVersion = 1;
            } else {
                // iOS 7 or Newer so Do Nothing
                window.LC5inline.iosVersion = 7;
                if(/(iPhone)/i.test(navigator.userAgent)) {
                    window.LC5inline.iosDevice = 'iPhone';
                }
            }
        }
    };
    /*
     * called on an orientation change (so for mobile) - need to check
     * chatbox not out of range
     */
    window.LC5inline.doOnOrientationChange = function(){
        window.LC5inline.forceInBox();
    };

    window.LC5inline.getHighestZ = function() {
        var elements = document.getElementsByTagName("*");
        var highest_index = 0;

        for (var i = 0; i < elements.length - 1; i++) {
            if (parseInt(elements[i].style.zIndex) > highest_index) {
                highest_index = parseInt(elements[i].style.zIndex);
            }
        }
        if (highest_index < 999999999)
            highest_index = 999999999;

        return '0'+highest_index+1;
    };

    /*
     * called to enforce that chat is on screen
     */
    window.LC5inline.forceInBox = function(){


        // new request - if chat has never been dragged try to keep
        // in original position
        if (!window.LC5inline.hasDragged) {
            window.LC5inline.bestX = window.LC5inline.originalX;
            window.LC5inline.bestY = window.LC5inline.originalY;
        }

        window.LC5inline.checkBoxInScreen(window.LC5inline.bestX,window.LC5inline.bestY);
        var c = $Cid('lc5-inline-chat-wrapper');
        if (c != null) {
            // need to adjust position
            c.style.left = window.LC5inline.bestX + 'px';
            c.style.top = window.LC5inline.bestY + 'px';
        }
    };

    /*
     * called to check new or current positions are within screen boundaries
     * if no params are given then will check existing coordinates else will check the
     * (new) ones passed. Will also setup a 'global' X and Y for best positions on screen
     * in case off-screen
     */
    window.LC5inline.checkBoxInScreen = function(x, y) {
        // check boundaries
        var newx, newy, border = 0;

        var c = $Cid('lc5-inline-chat-wrapper');
        if (c != null) {
            // if no entry values get them ourselves
            var r = c.getBoundingClientRect();
            if (typeof x === 'undefined' || typeof y === 'undefined' ||
                x === -1 || y === -1) {
                newx = r.left;
                newy = r.top;
            } else {
                newx = x;
                newy = y;
            }
            // also remove 10 for border
            var w = r.right - r.left + border;
            var h = r.bottom - r.top + border;
            var sw = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var sh = (window.innerHeight > 0) ? window.innerHeight : screen.height;

            // set up default (global) best positions
            window.LC5inline.bestX = r.left;
            window.LC5inline.bestY = r.top;

            // set-up best calculable position and make out of screen checks
            var bResult = true;
            if (newx + w > sw) {
                bResult = false;
                window.LC5inline.bestX = sw - w;
            } else {
                window.LC5inline.bestX = newx;
            }

            if (newy + h > sh) {
                bResult = false;
                window.LC5inline.bestY = sh - h;
            } else {
                window.LC5inline.bestY = newy;
            }

            if (newx < border) {
                bResult = false;
                window.LC5inline.bestX = border;
            }
            if (newy < border) {
                bResult = false;
                window.LC5inline.bestY = border;
            }
            return bResult;
        }
    };

    /*
     * @function	determine position left or right dependent on chat_config
     *				or overridden by args (from html)
     * @param		self.args
     */
    window.LC5inline.getPosition = function(args) {

        var position = args.position;
        if (position === '' || typeof position === 'undefined') {
            position = 'relative';
            switch (window.LC5inline.chat_config.onlineWidgetPosition) {
                case '1':
                    position = 'bottom-left';
                    break;
                case '2':
                    position = 'bottom-right';
                    break;
                default:
                    break;
            }
        }
        return position;
    };


    /*
     * @function	colorToHex
     *				helper function - convert a RGB(r,g,b) to Hex value
     * @param		color
     */
    window.LC5inline.colorToHex = function (color) {
        if (color.substr(0, 1) === '#') {
            return color;
        }
        var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

        var red = parseInt(digits[2]);
        var green = parseInt(digits[3]);
        var blue = parseInt(digits[4]);

        var rgb = blue | (green << 8) | (red << 16);
        return digits[1] + '#' + rgb.toString(16);
    };



    /*
     * @function	callback from jscolor when color changed for header
     * @param		color - #ffffff
     */
    window.LC5inline.getColorByLuminosity = function(rgb) {

        var c = window.LC5inline.colorToHex(rgb).substring(1);
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if (luma < 160) {
            return '#ffffff';
        }
        else {
            return '#000000';
        }
    };


    var defaultOptions = {
            position : ''
        },
    // Merge objects obj2 in obj1. ONLY ONE LEVEL! no recursive.
        mergeObjects = function (obj1, obj2) {
            var prop;

            for (prop in obj2) {
                if (obj2.hasOwnProperty(prop) && !obj1.hasOwnProperty(prop)) {
                    obj1[prop] = obj2[prop];
                }
            }
        };
    /**
     *  Create a new VIPWidget (but not renders it)
     *  @param {Object} args Object with arguments to render the widget
     *  @param {String} [args.position='bottom-left'] Position to render the widget. Possible values are 'middle-left',
     *                   'bottom-left, 'bottom-right'
     *  @param {HTMLElement} [args.target=document.body] Element where the widget will be render into
     *  @return {Object} The instance of the widget to cascade the calls
     */
    function VIPWidget(args) {
        if (!this instanceof VIPWidget) {
            return new VIPWidget(args);
        }

        mergeObjects(args, defaultOptions);

        this.args = args;

        // Get the style object. use darkgrey if not set
        // If target is not passed, use document.body
        this.args.target = this.args.target || document.body;

        return this;
    }

    window.LC5inline.openVIPWindow = function (url) {

        if (typeof window.LC5inline.VIPopened !== 'undefined' &&
            window.LC5inline.VIPopened)
            return;

        if (window.top && typeof window.top.LC5inline.VIPopened !== 'undefined' &&
            window.top.LC5inline.VIPopened)
            return;
        
        window.LC5inline.VIPopened = true;

        var onlineColor = window.LC5inline.chat_config.onlineColor,
            onlineTopTitle = window.LC5inline.chat_config.onlineTitle,
            el;

        el = document.getElementById('lc5-inline-chat-wrapper');
        if (el) {
            var f;
            var dimensions = getCWDimension();
        }

        // JH: if we load (belatedly) this element wasn't set.
        el = document.getElementById('lc5-inline-chat-header-text');
        if (el) {
            el.innerHTML = onlineTopTitle;
            el.style.color = window.LC5inline.chat_config.onlineTitleColor;
            el.style.fontFamily = window.LC5inline.chat_config.onlineTitleFont;
            el.style.fontSize = window.LC5inline.chat_config.onlineTitleFontSize;
        }

        el = document.getElementById('lc5-inline-chat-header');
        if (el && onlineColor) {
            el.style.backgroundColor = onlineColor;
            el.style.color = window.LC5inline.getColorByLuminosity(onlineColor);
        }
        el = document.getElementById('lc5-inline-chat-status-button');
        if (el && onlineColor)
            el.style.backgroundColor = onlineColor;

        if (window.LC5inline.argsOK.ctype === 'inline') {
            var params = 'directories=no fullscreen=no height=' + f + ' left=' + dimensions.left + ' right=' + dimensions.right + ' bottom=' + dimensions.bottom + ' location=no menubar=no resizable=no scrollbars=no status=no toolbar=no width=' + dimensions.width;
            name = '_blank';
            window.LC5inline.openInlineChat(url, params);
            window.LC5inline.closeInlineStatus();
        } else {
            // original pop-up - do nothing
        }
    };


    /**
     *  Render VIPWidget with the arguments passed in the constructor.
     *  @return {Object} The instance of the widget to cascade the calls
     */
    VIPWidget.prototype.render = function () {

        var onlineTopTitle = 'Support';
        var onlineMinChatBtnTxt = 'Chat with us';

        if (typeof window.LC5inline.Lg !== 'undefined' && window.LC5inline.Lg !== null &&
            window.LC5inline.Lg.ADMIN_PAGE_VISUALCONFIG_TXT_CUSTOMCHAT_TITLE_DEFAULT)
        {
            onlineTopTitle = window.LC5inline.getSystemLanguageText('inlinechatTitle',
                window.LC5inline.Lg['ADMIN_PAGE_VISUALCONFIG_TXT_CUSTOMCHAT_TITLE_DEFAULT']);
            onlineMinChatBtnTxt = window.LC5inline.getSystemLanguageText('onlineMinChatButtonText',
                window.LC5inline.Lg['ADMIN_PAGE_VISUALCONFIG_TXT_MINCHATBUTTON_TITLE_DEFAULT']);
        }

        var widget, url, imgEle, altText,
            imgFileName = 'contact-',
            self = this, name,

                renderAltText = function (container, minStatus) {
                // create the original button
                // SJC add to code to support initial image button instead

                altText = document.createElement('span');
                if (typeof 	window.LC5inline.chat_config.onlineWidgetOnOff === 'undefined' ||
                    typeof 	window.LC5inline.chat_config.onlineChatButton === 'undefined' ||
                    window.LC5inline.chat_config.onlineWidgetOnOff === '2') {
                    if (minStatus) {
                        window.LC5inline.openInlineStatus();
                    }
                } else {
                    // create image button not text
                    altText.innerHTML = '<img id="lc5-inline-chat-startbutton" src=""/>';
                    window.LC5inline.closeInlineStatus();
                }
                container.appendChild(altText);
            };

        // code execution flow continuation when rendering widget

        // Language
        var lang = this.args.language && this.args.language !== '' ? 'lang={LANGUAGE}'.replace('{LANGUAGE}', this.args.language) : '';
        if (lang === '')
            lang='lang=en_US';

        widget = document.createElement('span');
        window.LC5inline.widget = widget;

        // set common properties
        widget.style.position = 'fixed';
        widget.style.minWidth = '118px';
        widget.style.background = 'none';
        widget.style.zIndex = window.LC5inline.getHighestZ();
        widget.style.cursor = 'pointer';
        widget.style.MozBoxSizing = 'content-box';
        widget.style.borderTopLeftRadius = '5px';
        widget.style.borderTopRightRadius = '5px';
        widget.style.borderBottom = '0';
        widget.style.bottom = '0';

        var position = window.LC5inline.getPosition(this.args);
        switch (position) {

            case 'bottom-left':
                widget.style.left = '100px';
                if (typeof this.args.startbutton === 'undefined') {
                }

                if (ieBrowserVersion() <= 8) {
                    widget.style.position = 'absolute';
                }
                break;

            case 'bottom-right':
                widget.style.right = '100px';
                if (typeof this.args.startbutton === 'undefined') {
                }
                if (ieBrowserVersion() <= 8) {
                    widget.style.position = 'absolute';
                }
                break;

            default:
                widget.style.position = 'relative';
                break;
        }

        /*
         SJC - decide if session already open and available to know whether to
         render the pop-up, the chat button or the startbutton
         */
        var inlineStatus = lc5.readCookie(LC5inline_INLINE_COOKIE);
        var minStatus = true;
        if (typeof window.LC5inline.agentStatus !== 'undefined'
            && typeof window.LC5inline.agentStatus.state !== 'undefined'
            && window.LC5inline.agentStatus.state === 'OFF') {

            if (typeof window.LC5inline.isChatActive !== 'undefined'
                && !window.LC5inline.isChatActive)

                minStatus = false;
        }
        // SJC-LC - removed - set in loader-inline
        window.LC5inline.VIPopened = false;
        if (!minStatus) {
            window.LC5inline.hideChatBadge();
            window.LC5inline.closeInlineStatus();
        }
        if (inlineStatus !== 'min' && inlineStatus !== 'max') {
            renderAltText(widget, minStatus);
            // we have to reset the cookie set by minimize until user makes a choice
            document.cookie = LC5inline_INLINE_COOKIE + "=" + '';
        } else {
            // we need to render startbutton but hide so everything is in place for close button
            lc5.initializeFromCookie();

            renderAltText(widget, minStatus);
            window.LC5inline.hideChatBadge();

            if (inlineStatus == 'max')
                window.LC5inline.openVIPWindow(window.LC5inline.savedURL);
            else if (inlineStatus == 'min') {
                window.LC5inline.minimizeInlineWindow(minStatus);
                if (minStatus) {
                    window.LC5inline.openInlineStatus();
                }
            }

            if(window.LC5inline.currentAnchorId && '' !== window.LC5inline.currentAnchorId){
                var currentAnchor = document.getElementById(window.LC5inline.currentAnchorId);
                if(currentAnchor){
                    currentAnchor.style.display = 'none';
                }
            }
        }

        widget.onclick = function () {
            window.LC5inline.openVIPWindow(window.LC5inline.savedURL);
            // SJC - clear away the original clickable - will be replaced by status etc
            window.LC5inline.hideChatBadge();
        };

        this.args.target.appendChild(widget);
        return this;
    };

    LC5inline.VIPWidget = VIPWidget;
}(window.LC5inline));


/**
 * Retrieve all HTMLElements with certain className and generate the widgets inside. The generation of the
 * widgets is done after window.onload and it's done in chunks, using timers to process the widgets on chunks.
 */
function bootstrap() {
    window.LC5inline.getIosVersion();

    // SJC inject the html wrappers for inline chat in client DOM
    var cw = window.document.createElement('div');
    cw.setAttribute('id', 'lc5-inline-chat-wrapper');

    // SJC for IOS7 we don't have box-shadows so add a border

    if (window.LC5inline.iosVersion >= 7) {
        cw.style.border = '1px solid #bbb';
    }
    cw.setAttribute('class', 'lc5-draggable');
    var stopHtml = '<div id="lc5-inline-chat-close-button"></div>';

    cw.innerHTML = 	'<div id="lc5-breakpoint-holder"></div>' +
                    '<div id="lc5-inline-chat-header" class="lc5-inline-chat-header unselectable">' +
                        '<div id="lc5-inline-chat-header-agent-photo"></div>' +
                        '<div id="lc5-inline-chat-header-text" style=" float:left; font-family: &#39;' + window.LC5inline.chat_config.onlineTitleFont + '&#39; ; font-size: '
                        + window.LC5inline.chat_config.onlineTitleFontSize + ' ;"></div>' +  stopHtml +
                        '<div id="lc5-inline-chat-minimize-button"></div>' +
                    '</div>' +
                    '<div id="lc5-inline-chat"></div>';

    var body = document.body;
    body.insertBefore(cw,document.body.childNodes[0]);


    // Position close and minimize buttons
    document.getElementById('lc5-inline-chat-close-button').style.right = '32px';
    changeElementBackgroundColorOnHover('lc5-inline-chat-close-button',50);
    document.getElementById('lc5-inline-chat-minimize-button').style.right = '64px';
    changeElementBackgroundColorOnHover('lc5-inline-chat-minimize-button',50);

    // SJC Create the status button (txt filled in JS) which is displayed when chat is minimized

    cw = document.createElement('div');
    cw.setAttribute('id', 'lc5-inline-chat-status');
    cw.setAttribute('class', 'lc5-display-off');
    cw.style.zIndex = window.LC5inline.getHighestZ();
    cw.innerHTML =  '<div id="lc5-inline-chat-status-button">' +
        '<div id="lc5-inline-chat-status-button-text"></div></div>' +
        '<div class="lc5-inline-chat-open-icon"></div>' +
        '</div>';
    body.insertBefore(cw, body.lastChild);

    // SJC Set up dragging of inline chat

    window.LC5inline.setupDrag();
    window.LC5inline.handleResize();

    // SJC set some useful variables
    window.LC5inline.chatwrapper = $Cid('lc5-inline-chat-wrapper');
    window.LC5inline.chatbox = $Cid('lc5-inline-chat');
    window.LC5inline.chatstatus = $Cid('lc5-inline-chat-status');

    window.LC5inline.setupInlineActions();
    // SJC set up orientation checker for ipad etc to ensure chat always visible

    if (window.addEventListener) {
        function childParentCommunicate(childSentMessage) {
            if (childSentMessage.data.constructor === Array) {
                var photoData = childSentMessage.data;
                var photoHolder = window.document.getElementById('lc5-inline-chat-header-agent-photo');
                window.document.getElementById('lc5-inline-chat-header-text').style.width = '63%';
                photoHolder.style.width = '15%';
                photoHolder.style.height = '100%';
                photoHolder.style.paddingLeft = '2%';
                photoHolder.style.color = 'blue';
                window.document.getElementById('lc5-inline-chat-header-agent-photo').style.display = 'block';

                if (photoData[1]) {
                    
                    if(window.document.getElementById('agentPic')) {
                        photoHolder.removeChild(window.document.getElementById('agentPic'));
                    }
                
                    photoHolder.style.marginLeft = '0%';
                    photoHolder.style.marginTop = '0%';
                    var img = window.document.createElement('img');
                    img.id  = 'agentPic';
                    img.src = photoData[2];
                    photoHolder.appendChild(img);
                    window.document.getElementById('agentPic').style.height = '80%';
                    window.document.getElementById('agentPic').style.width = '100%';
                    window.document.getElementById('agentPic').style.paddingTop = '10%';
                    img = null;
                }

                photoHolder = null;
            } else {
                if (childSentMessage.data === 'startActivateChat') {
                    window.LC5inline.agentStatus.isChatActive = true;
                } else if (childSentMessage.data === 'onlyCloseWindow') {
                    window.LC5inline.chatwrapper.style.display = 'none';
                } else if (childSentMessage.data === 'removeMaxCookie') {
                    window.LC5inline.VIPopened = false;
                    var currentTime = new Date();
                    currentTime.setTime(currentTime.getTime());
                    var expire = ';expires=' + currentTime.toGMTString();
                    document.cookie = LC5inline_INLINE_COOKIE + "=" + 'max' + expire;
                    document.cookie = LC5inline_INLINE_SETTINGS + "=" + window.LC5inline.groupID + expire;
                    window.LC5inline.initialized = false;
                } else if (childSentMessage.data === 'killSession') {
                    window.LC5inline.agentStatus.isChatStopped = true;
                    window.LC5inline.killSession(window.LC5inline.argsOK);
                }
                else if (childSentMessage.data === 'lc5UpdateWidget') {
                    // set the globals for best position in window
                    window.LC5inline.bestX = -1;
                    window.LC5inline.bestY = -1;
                    window.lc5UpdateWidget(window.LC5inline.agentStatus, true);
                } else if (childSentMessage.data === 'setChatInactive') {
                    window.LC5inline.agentStatus.isChatActive = false;
                }else if (childSentMessage.data === 'dontCreatePhoto') {
                    window.document.getElementById('lc5-inline-chat-header-agent-photo').style.display = 'none';
                    window.document.getElementById('lc5-inline-chat-header-text').style.width = '80%';
                } else {
                    try {
                        if (window.LC5inline.agentStatus.isChatActive) {
                            if (childSentMessage.data && childSentMessage.data.indexOf('showAgentTypeMessage') > -1) {
                                var agentTypedMessage = childSentMessage.data;
                                agentTypedMessage = agentTypedMessage.split('showAgentTypeMessage')[1];
                                if ('' !== agentTypedMessage && 'undefined' !== typeof agentTypedMessage && window.parent.document.getElementById('lc5-inline-chat-status').className === 'lc5-display-on') {
                                    var elementMinimizedHeader = window.parent.document.getElementById('lc5-inline-chat-status-button-text');
                                    elementMinimizedHeader.innerHTML = 'Agent is typing... ' + agentTypedMessage;
                                }
                                else if ('none' === window.LC5inline.chatwrapper.style.display) {
                                    window.LC5inline.openVIPWindow(window.LC5inline.savedURL);
                                    window.LC5inline.showInlineChat();
                                    window.LC5inline.forceInBox();
                                    window.LC5inline.closeInlineStatus();
                                }
                            }
                        }
                    } catch (e) {
                        console.log('Exception while printing agent typing on a minimised chat frame');
                    }
                }
            }
        }
        window.addEventListener('orientationchange', window.LC5inline.doOnOrientationChange);
        window.addEventListener('message', childParentCommunicate);
    }

    // overload the inline css

    var fileref=document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", '//' + lc5.domain + lc5.contextPath + '/inline/css/overload.css');
    if (typeof fileref!="undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

    window.LC5inline.loadDomainConfigCallback();
}

setTimeout(bootstrap, 25);

function changeElementBackgroundColorOnHover(buttonId, percentage) {
    document.getElementById(buttonId).onmouseover = function() {
        var configuredBackgroundNormal = window.LC5inline.chat_config.onlineColor;
        document.getElementById(buttonId).style.backgroundColor = lightenDarkenColor(configuredBackgroundNormal,percentage);
    };
    document.getElementById(buttonId).onmouseout  = function() {
        document.getElementById(buttonId).style.backgroundColor = window.LC5inline.chat_config.onlineColor;
    };
}

function getBreakpointValue() {
    return window.getComputedStyle(
        document.querySelector('#lc5-breakpoint-holder'), ':before'
    ).getPropertyValue('content').replace(/\"/g, '');
}

window.addEventListener("resize", function() { applyCWDimensions(); });

function getCWDimension() {
    var cw = document.getElementById("lc5-inline-chat-wrapper");
    var f, w, h, l, r, t, b;
    b = '0px';
    // if ios 7 move above tab bar
    if (window.LC5inline.iosVersion >= 7 &&
        window.LC5inline.iosDevice == 'iPhone') {
        b = '44px';
    }
    if (ieBrowserVersion() <= 9) {
        t = '100px';
    } else {
        t = 'initial';
    }

    switch (window.LC5inline.chat_config.onlineWidgetSize) {
        case '2':
            w = '320';
            h = '480';
            f = '400';
            break;
        case '3':
            w = '433';
            h = '568';
            f = '540';
            break;
        default:
            w = '240';
            h = '388';
            f = '360';
            break;
    }
    // let vip html rendering override chat config
    var dic = window.LC5inline.getLeftRight();
    cw.style.width = w+'px';
    cw.style.height = h+'px';
    cw.style.right = dic.r;
    cw.style.left = dic.l;
    cw.style.bottom = b;
    cw.style.top = t;

    window.LC5inline.originalX = dic.l;
    window.LC5inline.originalY = t;

    var cs = document.getElementById('lc5-inline-chat-status');
    if (cs) {
        cs.style.right = dic.r;
        cs.style.left = dic.l;
    }
    return {"left": l, "right": r, "bottom": b, "width": w, "dic": dic};

}

function applyCWDimensions() {
    var breakpoint = getBreakpointValue();
    var cw = document.getElementById('lc5-inline-chat-wrapper');
    var cs = document.getElementById('lc5-inline-chat-status');

    switch (breakpoint) {
        case "desktop":
            cw.setAttribute('class', 'lc5-draggable');
            getCWDimension();
            break;
        case "tablet_wide":
            cw.setAttribute('class', '');
            getCWDimension();
            break;
        case "tablet_narrow":
            cw.setAttribute('class', '');
            getCWDimension();
            break;
        case "smartphone_wide":
            cw.setAttribute('class', '');
            cw.style.width = '100%';
            cw.style.height = '100%';
            cw.style.right = '0';
            cw.style.left = '0';
            cw.style.bottom = '0';
            cw.style.top = '0';
            cs.style.right = '0';
            cs.style.left = '0';
            break;
        case "smartphone":
            cw.setAttribute('class', '');
            cw.style.width = '100%';
            cw.style.height = '100%';
            cw.style.right = '0';
            cw.style.left = '0';
            cw.style.bottom = '0';
            cw.style.top = '0';
            cs.style.right = '0';
            cs.style.left = '0';
            break;
    }
}

window.LC5inline.hideWidget = function(id) {
    $Cid(id).display = "none";
};

