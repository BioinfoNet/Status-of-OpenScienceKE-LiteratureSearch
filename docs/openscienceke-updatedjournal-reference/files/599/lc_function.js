/* Static variables. */
var lastKeyPressed		= false;
var mediaActive			= false;
var webcam_allowed		= false;
var voice_allowed		= false;
var whiteboardActive	= false;
var agentArr			= new Array();
var comBuffer			= new Array();
var tempBuffer			= new Array();
var chatAccepted		= false;
var nick				= 'Bezoeker';
var uAgentTmp				= ''; //LSM-653
var processedPackets    = new Array();
var PACKET_MAX_KEEP_PERIOD = 1000 * 60 * 5;
var UP_FILE = '***upfile***';
var UP_FILE_NAME = '***upfilename***';

//LSM 965 - CONSTATNS FOR FILE UPLOAD MESSAGES
var FILEUPLOADTYPE =
{"AGENT_NOTIFICATION": "AGENT_NOTIFICATION",
    "INPROGRESS": "INPROGRESS",
    "FAILURE":"FAILURE",
    "SUCCESS":"SUCCESS"};

var FILEUPLOADMESSAGES = {
    "sendingAttachments" :"sending attachments",
    "uploadSuccess":"File uploaded successfully",
    "uploadFailed":"File failed to upload",
    "uploadProgress":"File uploading in progress"
};

/* SJC add system message types so we know whether to display in pop-up or not */
var SYS_MSG_POPUP		= 0;
var SYS_MSG_CHATWITH	= 1;
var SYS_MSG_EMAIL		= 2;
var SYS_MSG_LINK		= 3;
var SYS_MSG_OTHER		= 4;


/* UTF8 instance for encoding and decoding. */
var UTF8 = {
    encode : function (string) {
        string		= string.replace(/\r\n/g,"\n");
        var utftext	= "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },

    decode : function (utftext) {
        var string	= "";
        var i		= 0;
        var c		= c1 = c2 = 0;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }
}


var ieBrowserVersion = function() {
    var version = 999;
    if (navigator.appVersion.indexOf("MSIE") != -1)
        version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    else if(navigator.appVersion.indexOf("rv:") != -1)
        version = parseFloat(navigator.appVersion.split("rv:")[1]);

    return version;
}


/* Opening initial connection. */
function onInit() {
    window.addEventListener('message', parentChildCommunicate);
    
    /* Set CSS for iFrame. */
    var fr          = window.frames['chat-frame'];
    var body        = fr.document.getElementsByTagName('body')[0];

    if (remoteTransfer && origTranscript) {
        var div			= fr.document.createElement('div');
        div.id			= 'chat-frame-orig-body';
        div.className	= 'chat-frame-body';
        div.innerHTML	= decodeURIComponent(origTranscript);
        body.appendChild(div);
    }

    var div			= fr.document.createElement('div');
    div.id			= 'chat-frame-body';
    div.className	= 'chat-frame-body';

    body.appendChild(div);

    var css = fr.document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', IFRAME_CSS);

    body.appendChild(css);
    body.className = 'chat-frame';

    fr		= null;
    body	= null;
    css		= null;
    div		= null;

    /* Disable input. */
    disableInput();

    /* Add notification that the chat is waiting an agent to accept.
       SJC - check if session already active like after page refresh
       if so don't display system message waiting for agent
      */
    var sid = location.search.split('sID=')[1];
    if (typeof sid === 'undefined' || !sid || document.querySelectorAll('#chatting-with-container')[0].style.display === 'none') {
        document.querySelectorAll('#chatting-with-container')[0].style.display = "";
        addChatLine(false, decodeURIComponent(lg[15]), true, true, SYS_MSG_CHATWITH);
    }

    /* Start the comet availability checking. */
    startCheckComet = true;

    /* Open server connection. */
    lc_openCommBuffer();

    /* Start connection checker. */
    startConnectionChecker();

    /* Initialize sound manager */
    if (soundAlertEnabled) {
        (function(){
            if (typeof isFlashSupported == 'undefined') {
                setTimeout(arguments.callee, 100);
            } else {
                if(!'audio' in navigator){
                    if (!isFlashSupported) {
                        // remove sound alert button if there's no flash support
                        var SAButton = document.getElementById('soundAlertButton');
                        if(SAButton) {
                            SAButton.parentNode.removeChild(SAButton);
                        }
                        soundAlertEnabled = false;
                    } else {
                        swfobject.embedSWF("/sitescript/chat/sounds/sounds.swf", "soundsobj", "1", "1", "9.0.0");
                    }
                }
            }
        })();
    }

    /* Build emoticons. */
    buildEmoticons();
    buildFileUploadIcon();

    if(ieBrowserVersion() !== 999) {
        if(fileuploadbutton && !enableEmoticon) {
            document.getElementById("messageboxfileupload").style.display = 'table-cell';
            document.getElementById("fileUploadImage").style.marginBottom = '6px';
            document.getElementById("fileUploadImage").style.marginRight = '-6px';
        }
        if(fileuploadbutton){
            document.getElementById("messageboxfileupload").style.padding = '0px 0px 0px 9px';
            document.getElementById("messageboxfileupload").style.float = 'none';
        }
        if(enableEmoticon && !fileuploadbutton) {
            document.getElementById("emoticonImageId").style.marginBottom = '6px';
        }else if(enableEmoticon && fileuploadbutton){
            document.getElementById("emoticonImageId").style.marginBottom = '21px';
        }
        if(fileuploadbutton || enableEmoticon){
            document.getElementById("inputBody").style.display = 'inline';
            document.getElementById("inputBody").style.height = '34px';
        }
    }
    
    // Set chat window colours
    document.querySelectorAll('#button-holder')[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
    document.querySelectorAll('#chatting-with-container')[0].style.backgroundColor = SUBHEADER_BACKGROUND_COLOR;
    document.querySelectorAll('#chatting-with')[0].style.color = SUBHEADER_MESSAGE_COLOR;

    // set font properties
    document.querySelectorAll('#chatting-with')[0].style.fontFamily = SUBHEADER_FONT;
    document.querySelectorAll('#chatting-with')[0].style.fontSize = SUBHEADER_FONT_SIZE;

    if (VISITOR_ACTION_EXISTS === "false") {
        document.querySelectorAll('#chatting-with')[0].style.textAlign = "center";
    }
    else{
        document.querySelectorAll('#chatting-with')[0].style.width = "210px";
    }
    document.querySelectorAll('body')[0].style.color = CHAT_INLINE_BTNBACKGROUND;


    var isActiveChat = true;
    setChatBodyHeightDynamically(isActiveChat);

    /*if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
        var chattingWithContainer = document.querySelectorAll('#chatting-with-container')[0];
        chattingWithContainer.style.width = '24%';
        var chatFrame = document.getElementById('chat-frame').contentWindow.document;
        var chatFrameBody = chatFrame.getElementById('chat-frame-body');
        chatFrameBody.style.width = '24%';
        chatFrameBody.style.height = '290';
        chatFrameBody.style.overflowY = 'auto';
    }*/

    if(/Edge/.test(navigator.userAgent)) {
        var inputBody = document.getElementById('inputBody');
        var emoticonImageId = document.getElementById('emoticonImageId');
        inputBody.style.height = '70%';
        inputBody.style.display = 'inline';
        emoticonImageId.style.marginTop = '4px';
    }
}

function parentChildCommunicate(parentSentMessage) {
    if(parentSentMessage.data === 'closeChat'){
        toggleDialog('messageboxclose', true,true);
    }
}

function setChatBodyHeightDynamically(isActiveChat) {
    // 'chatting-with' container expands dynamically based on the font size
    // and we add padding-top to the chat body so messages dont overlap with it (and get hidden)
    var paddingHeight = document.querySelectorAll('#chatting-with-container')[0].clientHeight;
    var chatFrame = document.querySelectorAll('#chat-frame')[0];
    var currentHeight = chatFrame.clientHeight;
    var buttonsHeight = document.querySelectorAll('#inFrameButtons')[0].clientHeight;
    var inputContainerHeight = document.querySelectorAll('#chat-input-container')[0].clientHeight;

    var chatBody = document.querySelectorAll('#chatBody')[0];
    var chatBodyHeight = chatBody.clientHeight;
    var copyrightHeight = document.querySelectorAll('.copyright')[0].clientHeight;
    var isTypingHeight = document.querySelectorAll('.isTyping')[0].clientHeight;


    if (isActiveChat) {
        if(document.querySelectorAll('.copyright')[0].style.visibility === 'hidden') {
            chatBody.style.height = chatBodyHeight + 2*copyrightHeight - isTypingHeight;
            currentHeight = currentHeight + 2*copyrightHeight - isTypingHeight;
        }

        document.querySelectorAll('#chat-frame')[0].style.paddingTop = paddingHeight/1.2;
        // set again the height based on the padding
        document.querySelectorAll('#chat-frame')[0].style.height = currentHeight - paddingHeight/1.2;
    } else {
        if(document.querySelectorAll('.copyright')[0].style.visibility === 'hidden') {
            chatBody.style.height = chatBodyHeight - 2*copyrightHeight;
            currentHeight = currentHeight - 2*copyrightHeight;
        }

        document.querySelectorAll('#chat-frame')[0].style.paddingTop = paddingHeight - buttonsHeight;
        document.querySelectorAll('#chat-frame')[0].style.height = currentHeight - paddingHeight + buttonsHeight + inputContainerHeight;
    }
}

/* Send acknowledgement (ACK) to server. */
function lc_send_ACK(ackTID, err) {
    /* Create JSON string. */
    var obj         = new Object();
    obj.actType     = lc_protocol.JSON_CONNECTIVITY;
    obj.actSubType  = lc_protocol.JSON_SEND_ACK;
    obj.sessID      = document.getElementById('sessionID').value;
    obj.ackTID		= ackTID;

    if (err) {
        obj.err = err;
    }

    /* Open communication with the server. */
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;
}

/* Send notification to server to use old AJAX polling method. */
function lc_send_polling_command() {
    /* Create JSON string. */
    var obj         = new Object();
    obj.actType     = lc_protocol.JSON_CONNECTIVITY;
    obj.actSubType  = lc_protocol.JSON_SET_COMET_TIMEOUT;
    obj.sessID      = document.getElementById('sessionID').value;
    obj.timeOut		= 0;

    /* Set to comm buffer. */
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;

    /* Set to polling method. */
    pollMethod = true;

    /* Reset polling interval to acommodate old polling method. */
    POLLING_INTERVAL = 2200;
}

function packetWasProcessed(tId) {
    var i;
    for (i = 0; i < processedPackets.length; i++) {
        if (processedPackets[i].tId == tId) {
            return true;
        }
    }

    return false;
}

function addPacketToProcessedList(tId) {
    var obj = {};
    obj.tId = tId;
    obj.timestamp = new Date().getTime();
    processedPackets.push(obj);
}

function removePacketFromProcessedList(tId) {
    var i;
    for (i = 0; i < processedPackets.length; i++) {
        var current = processedPackets[i];
        if (current.tId == tId) {
            processedPackets.splice(i, 1);
            i--; // the array is 1 element shorter
        }
    }
}

function purgeOldPacketsFromProcessedList() {
    var i;
    var threshold = new Date().getTime() - PACKET_MAX_KEEP_PERIOD;
    for (i = 0; i < processedPackets.length; i++) {
        var current = processedPackets[i];
        if (current.timestamp < threshold) {
            processedPackets.splice(i, 1);
            i--;
        }
    }
}

/* Process all incoming data from the server. */
function lc_processIncomingData(dataReceived) {
    // Create an object container for the JSON data.
    var openConnection	= true;
    var obj				= null;
    var transactionID	= null;
    var doProcess		= true;
    try {
        if (typeof(dataReceived) === 'string') {
            obj = lc_JSON.decode(dataReceived);
        } else {
            obj = dataReceived;
        }

        purgeOldPacketsFromProcessedList();

        if (obj && obj.header && obj.header.tId) {
            transactionID = obj.header.tId;

            if (packetWasProcessed(transactionID)) {
                doProcess = false;
            }
        }
    } catch (e) {
        appendLog('Error decoding JSON...');
    }

    /* Check if the server send a proper response. */
    if (obj && obj.header && doProcess) {
        /* Extract header and message. */
        var commVersion	= obj.header.version;

        for (m = 0; m < obj.messages.length; m++) {
            var process = obj.messages[m];

            // we only care about 0/0/10 messagse
            // so any non-JSON_PROC_KEEPALIVE message is skipped
            if (process.actGroup != lc_protocol.JSON_PROC_KEEPALIVE) {
                continue;
            }

            for (i = 0; i < process.msgItem.length; i++) {
                var messageItem	= process.msgItem[i];

                // skip any non-resend message
                if (!(messageItem.action.actType == lc_protocol.JSON_CONNECTIVITY && messageItem.action.actSubType == lc_protocol.JSON_CONN_RESEND_MESSAGE)) {
                    continue;
                }

                var message = messageItem.data.message;
                var tId = messageItem.data.tId;

                lc_processIncomingData(message);

                process.msgItem.splice(i, 1); // delete the item, as it has been handled.
                i--; // the array became 1 shorter and the j++ in the for loop would skip an element if we didn't decrement.
            }
        }

        /* Loop between messages. */
        for (var m = 0; m < obj.messages.length; m++) {
            var process	= obj.messages[m];

            /* Switch between PROCESSES. */
            switch (process.actGroup) {
                case lc_protocol.JSON_PROC_KEEPALIVE:
                    /* Extract information per message item. */
                    for (var i = 0; i < process.msgItem.length; i++) {
                        var messageItem	= process.msgItem[i];
                        /* Switch between ACTION TYPES. */
                        switch (messageItem.action.actType) {
                            case lc_protocol.JSON_CONNECTIVITY:
                                /* Switch between ACTION SUB-TYPES. */
                                switch (messageItem.action.actSubType) {
                                    case lc_protocol.JSON_PUSH_TIMEOUT:
                                        clearTimeout(checkCometTimer);
                                        checkCometTimer	= false;
                                        cometIsChecked	= true;
                                        break;
                                    case lc_protocol.JSON_CONN_TYPE:
                                        var connType = messageItem.data.connType;

                                        // Set connection to comet.
                                        if (connType == 0) {
                                            pollMethod			= false;
                                            POLLING_INTERVAL	= 200;
                                            appendLog('Switching to comet mode...');

                                        // Set connection to polling.
                                        } else {
                                            pollMethod			= true;
                                            POLLING_INTERVAL	= 2200;
                                            appendLog('Switching to polling mode...');
                                        }
										break;
                                    case lc_protocol.JSON_CONN_ACKACK :
                                        var tId = messageItem.data.tId;

                                        removePacketFromProcessedList(tId);

                                        break;
								}
								break;
						}
					}
					i = null;
					break;

				case lc_protocol.JSON_PROC_CHATUPDATE:
                    /* Extract information per message item. */
                    for (var i = 0; i < process.msgItem.length; i++) {
                        var messageItem	= process.msgItem[i];

                        /* Switch between ACTION TYPES. */
                        switch (messageItem.action.actType) {
                            case lc_protocol.JSON_CHAT:
                                /* Switch between ACTION SUB-TYPES. */
                                switch (messageItem.action.actSubType) {
                                    case lc_protocol.JSON_CHAT_ACCEPTEDBYAGENT:
                                        var sessID		= messageItem.source.sessID;
                                        var uID			= messageItem.data.uID;
                                        var uName		= messageItem.data.uName;
                                        var uDesc		= messageItem.data.uDesc;
                                        var uPic		= messageItem.data.uPic;
                                        var acceptType	= messageItem.data.acceptType;
                                        var cName		= messageItem.data.nick;
                                        var agentNick = messageItem.data.uNick; //LSM-653
                                        /* Set the chatter name. */
                                        if (cName != '') {
                                            nick = cName;
                                        }

                                        /* Create agent instance. */
                                        var agentObj		= new Object();
                                        agentObj.id			= uID;
                                        agentObj.name		= uName;
                                        agentObj.uNick		= agentNick; //LSM-653
                                        agentObj.desc		= uDesc;
                                        agentObj.pic		= uPic;
                                        agentObj.session	= sessID;
                                        agentObj.media		= false;
                                        agentObj.cobrowse	= false;
                                        agentObj.whiteboard	= false;

                                        /* Add agent to collection. */
                                        agentArr[uID] = agentObj;
                                        uAgentTmp = agentArr[uID]; //LSM-653
                                        /* Set chat accepted state to 'TRUE'. */
                                        chatAccepted = true;
                                        parent.postMessage('startActivateChat', "*");
                                        /* Do action accordingly based on acceptance type.
                                        * 1 = Agent accept.
                                        * 2 = New agent has overtaken the chat.
                                        * 3 = New agent has joined the chat.
                                        */
                                        if (acceptType == 1) {
                                            /* Display agent info (if exist). */
                                            if (uPic != '') {
                                                displayAgentPhoto(uPic);
                                            } else {
                                                hideAgentPhoto();
                                            }

                                            var messageToShow = decodeURIComponent(lg[10]);
                                            if (messageToShow.indexOf('[AGENT_NAME]') >= 0 || messageToShow.indexOf('[NICK]') >= 0) { //LSM-653
                                                messageToShow = messageToShow.replace('[AGENT_NAME]', uName);
                                                messageToShow = messageToShow.replace('[NICK]', agentNick); //LSM-653
                                            } else {
                                                messageToShow = messageToShow + ' ' + uName;
                                            }

                                            /* Webkit workaround. */
                                            fixWebkit();

                                            /* Display chat toolbar. */
                                            try {
                                                document.getElementById('chatToolbar').style.visibility = 'visible';
                                            } catch(e) {}

                                            addChatLine(false, messageToShow, true, true, SYS_MSG_CHATWITH);
                                            enableInput();
                                        } else if (acceptType == 2) {
                                            /* Display agent info (if exist). */
                                            if (uPic != '') {
                                                displayAgentPhoto(uPic);
                                            } else {
                                                hideAgentPhoto();
                                            }

                                            var uMsgTmp = decodeURIComponent(lg[16]); //LSM-653
                                            uMsgTmp = uMsgTmp.replace('[AGENT_NAME]', uName); //LSM-653
                                            uMsgTmp = uMsgTmp.replace(/\[NICK\]/gi,agentNick); //LSM-653
                                            uMsgTmp = uMsgTmp + ' ' + uName;
                                            
                                            addChatLine(false, uMsgTmp, true, false, SYS_MSG_OTHER);

                                            var cwMsg = decodeURIComponent(lg[10]) + ' ' + uName;
                                            
                                            addChatLine(false, cwMsg, true, true, SYS_MSG_CHATWITH);
                                        } else if (acceptType == 3) {
                                            var uMsgTmp = decodeURIComponent(lg[6]); //LSM-653
                                            uMsgTmp = uMsgTmp.replace('[AGENT_NAME]', uName); //LSM-653
                                            uMsgTmp = uMsgTmp.replace(/\[NICK\]/gi,agentNick); //LSM-653
                                            addChatLine(false, uMsgTmp, true, false, SYS_MSG_OTHER);
                                        }

                                        setChatBodyHeightDynamically(true);
                                        /* Focus on the input text. */
                                        document.getElementById('inputBody').focus();
                                        break;
                                        
                                    /* Agent left conversation */
                                    case lc_protocol.JSON_CHAT_AGENTLEAVECONVERSATION:
                                        var uID		= messageItem.data.uID;
                                        var uName	= messageItem.data.uName;
                                        var agentNick = messageItem.data.uNick;
                                        if ('' !== lg[7]) {
                                            var uMsgTmp = decodeURIComponent(lg[7]); //LSM-653
                                            uMsgTmp = uMsgTmp.replace('[AGENT_NAME]', uName); //LSM-653
                                            uMsgTmp = uMsgTmp.replace('[NICK]',agentNick); //LSM-653
                                            uMsgTmp = uName + ' ' + uMsgTmp;
                                            
                                            addChatLine(false, uMsgTmp, true, false, SYS_MSG_OTHER);
                                        }

                                        /* Find next available agent info. */
                                        findNextAgentInfo(uID);
                                        break;
                                    case lc_protocol.JSON_CHAT_EXPIRED:
                                        var data = messageItem.data;
                                        if (data.orig_server) {
                                            // create form and submit to resume original chat
                                            var form	= document.createElement('form');
                                            form.method = 'POST';
                                            form.action = location.protocol + '//' + data.orig_server + '/5g/ch/?az=az';
                                            // create form content
                                            var content =	'<input type="hidden" name="remote_resume" value="true" />' +
                                            '<input type="hidden" name="aID" value="' + data.orig_aID + '" />' +
                                            '<input type="hidden" name="gID" value="' + data.orig_gID + '" />' +
                                            '<input type="hidden" name="cID" value="' + data.orig_cID + '" />';
                                            form.innerHTML = content;
                                            document.body.appendChild(form);
                                            form.submit();
                                        } else {
                                            openConnection = false;
                                            chatExpire();

                                            /* Push mailform if enabled */
                                            if (MAIL_FORM_EXIST) {
                                                window.onunload = null;
                                                window.location.href = buildMailFormURL();
                                            } else {
                                                if (document.location.href.indexOf('#expired') === -1) {
                                                    document.location.href += '#expired';
                                                }
                                            }
                                        }
					                break;
                                    case lc_protocol.JSON_CHAT_AGENTRECEIVETYPINGFROMOTHER:
                                        var uName	= messageItem.data.uName;
                                        var uNick	= messageItem.data.uNick; //LSM-653
                                        var typing = messageItem.data.isTyping;
                                        if (typing === 'y'){
                                            showAgentIsTyping(true,uName,uNick);
                                        }
                                        else if(messageItem.data.isFileUpload){
                                            showFileUploadedMesssage(true, FILEUPLOADTYPE.AGENT_NOTIFICATION, uName + " " + typing)  ;
                                        }
                                        else {
                                            removeTypingLine();
						                }
                                        break;
                                     case lc_protocol.JSON_CHAT_AGENTRECEIVETYPING:
                                        var uName	= messageItem.data.uName;
                                        var uNick	= messageItem.data.uNick; //LSM-653
                                        var typing = messageItem.data.isTyping;
                                        var typing = messageItem.data.isTyping;
                                        if ( typing === 'y' ){
                                            showAgentIsTyping(true,uName,uNick);
                                        }
                                        else {
                                            removeTypingLine();
                                        }
                                    case lc_protocol.JSON_CHAT_AGENTRECEIVEMESSAGEFROMOTHER:
                                        var uName   = messageItem.data.uName;
                                        var uMsg    = messageItem.data.uMsg;
                                        var uNick    = messageItem.data.uNick;

                                        addChatLine(uNick, uMsg, false, false);
                                        try {
                                            window.focus();
                                            document.getElementById('inputBody').focus();
                                        } catch (e) {}
                                        break;
                                    case lc_protocol.JSON_CHAT_AGENTSENDTYPING:
                                        var uName   = messageItem.data.uName;
                                        var uNick   = messageItem.data.uNick;
                                        var typing = messageItem.data.isTyping;
                                        if ( typing === 'y' ){
                                            showAgentIsTyping(true,uName,uNick);
                                        }
                                        else{
                                            removeTypingLine();
                                        }
                                        break;
                                    case lc_protocol.JSON_CHAT_AGENTRECEIVEMESSAGE:
                                        var fr		= window.frames['chat-frame'];
                                        var d		= fr.document;
                                        var body 	= d.getElementById('chat-frame-body');
                                        var cMsg	= messageItem.data.cMsg;
                                        try {
                                            if (enableEmoticon) {
                                                cMsg = LC_EMOTICONS.parse(cMsg);
                                            }
                                        } catch(e) {}
                                        // SJC changed p to div
                                        var text			= d.createElement('div');
                                        text.className      = 'chat-line msg-bubble msg-bubble-rec';
                                        text.style.color	= VISITOR_COLOR;
                                        text.innerHTML =    '<div class="bubble-container">'
                                                        +       '<div class="msg-bubble-arrow"></div>'
                                                        +       '<div class="msg-bubble-inner">'
                                                        +           '<div class="msg-bubble-topline"></div>'
                                                        +           '<span class="msg-bubble-text" id="">'+cMsg+'</span>'
                                                        +           '<p class="msg-bubble-seemore" id="msg-bubble-seemore-704858-2418160" style="display: none;">.... See more</p>'
                                                        +       '</div>';
                                                        if(enablePrintTimestamp) {
                                                            text.innerHTML = text.innerHTML +'<div class="msg-bubble-time">' + getCurrentTimestamp() + '</div>';
                                                        }
                                                        +   '</div>';

                                        // Set bubble background and bubble tail colours
                                        text.querySelectorAll(".msg-bubble-inner")[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
                                        text.querySelectorAll(".msg-bubble-arrow")[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
                                        text.querySelectorAll(".bubble-container")[0].style.fontFamily = VISITOR_FONT;
                                        text.querySelectorAll(".bubble-container")[0].style.fontSize = VISITOR_FONT_SIZE;


                                        body.appendChild(text);
                                        doScrollToTop(body);
                                        break;
                                    case lc_protocol.JSON_CHAT_CLOSEFROMAGENT:
                                        var keepBeforeUnload = false;
                                        parent.postMessage('removeMaxCookie', "*");
                                        parent.postMessage('setChatInactive', "*");
                                        /* Push post-chat if enabled */
                                        if (POST_CHAT_EXIST && POST_CHAT_OBTRUSIVE) {
                                            setTimeout(function(){
                                                window.onbeforeunload = null;
                                                window.onunload = null;
                                                window.location.href = buildPostChatURL();
                                            }, PC_OBTRUSIVE_DELAY);
                                            keepBeforeUnload = true;
                                        }

                                        openConnection = false;
                                        chatStop(keepBeforeUnload);

                                        try {
                                            hideAgentPhoto();
                                        } catch(e) {
                                            if (window.console && window.console.log) {
                                                console.log('Fn error: hideAgentPhoto');
                                            }
                                        }
                                        break;
                                    case lc_protocol.JSON_CHAT_VISITORRECEIVE_URL:
                                        var name    = messageItem.data.name;
                                        var url     = messageItem.data.url;

                                        if (url.indexOf('://') == -1) {
                                            url = '//' + url;
                                        }

                                        var target  = messageItem.data.target;
                                        var msg		= name + ' ' + decodeURIComponent(lg[12]) + ' <a href="' + url + '" target="' + target + '">' + url + '</a>';
                                        addChatLine(false, msg, true, false,SYS_MSG_LINK);
                                        if (!resumed)
                                            window.open(url);
                                        break;
                                    case lc_protocol.JSON_CHAT_NOAGENTONLINE:
                                        var data = messageItem.data;
                                        if (data.orig_server) {
                                            // create form and submit to resume original chat
                                            var form	= document.createElement('form');
                                            form.method = 'POST';
                                            form.action = location.protocol + '//' + data.orig_server + '/5g/ch/?az=az';
                                            // create form content
                                            var content =	'<input type="hidden" name="remote_resume" value="true" />' +
                                            '<input type="hidden" name="aID" value="' + data.orig_aID + '" />' +
                                            '<input type="hidden" name="gID" value="' + data.orig_gID + '" />' +
                                            '<input type="hidden" name="cID" value="' + data.orig_cID + '" />';
                                            form.innerHTML = content;
                                            document.body.appendChild(form);
                                            form.submit();
                                        } else {
                                            openConnection = false;

                                            /* Show message set by server */
                                            /* Show no agent online notification. */
                                            addChatLine(false, decodeURIComponent(lg[9]), true, true, SYS_MSG_CHATWITH);

                                            /* Disable input. */
                                            disableInput();

                                            /* Reset window event behavior. */
                                            window.onbeforeunload	= null;
                                        }
                                        break;
                                    case lc_protocol.JSON_CHAT_QUEUEPOSITION:
                                        var newPos	= messageItem.data.newPos;
                                        var time    = messageItem.data.estTime;
                                        if (time && time > 5000) {
                                            time = Math.ceil(time/1000/60);
                                        } else {
                                            time = "several";
                                        }
                                        var msg		= decodeURIComponent(lg[14]);
                                        msg			= msg.replace(/\[LC_QUEUENUMBER\]/g, newPos)
                                        .replace(/\[LC_QUEUETIME\]/g, time)

                                        if (newPos.toString() == 0) {
                                            /* Add notification that the chat is waiting an agent to accept. */
                                            addChatLine(false, decodeURIComponent(lg[15]), true, true, SYS_MSG_POPUP);
                                        } else {
                                            /* Show queue notification. */
                                            addChatLine(false, msg, true, true,SYS_MSG_POPUP);
                                        }
                                        break;
                                    case lc_protocol.JSON_CHAT_REMOTETRANSFERREQ:
                                        // disable reload timer
                                        window.onunload = null;
                                        var data = messageItem.data;
                                        var server		= data.server;
                                        var remote_aID	= data.remote_aID;
                                        var remote_gID	= data.remote_gID;
                                        var orig_gID	= data.orig_gID;
                                        var transTxt	= data.transTxt;
                                        var chatLines	= data.chatLines;
                                        // create form and submit to request new transfer chat
                                        var form	= document.createElement('form');
                                        form.method = 'POST';
                                        form.action = location.protocol + '//' + server + '/5g/ch/?az=az';
                                        // create form content
                                        var d		= window.frames['chat-frame'].document;
                                        var transcript = d.getElementById('chat-frame-body').innerHTML;
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "remote_transfer",
                                            "value"	: "true"
                                        }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "remote_aID",
                                            "value"	: remote_aID
                                        }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "remote_gID",
                                            "value"	: remote_gID
                                        }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "orig_gID",
                                            "value"	: orig_gID
                                        }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "transTxt",
                                            "value"	: transTxt
                                        }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "orig_aID",
                                            "value"	: document.getElementById('accountID').value
                                            }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "orig_cID",
                                            "value"	: document.getElementById('sessionID').value
                                            }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "orig_server",
                                            "value"	: document.location.host
                                            }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "orig_transcript",
                                            "value"	: transcript
                                        }));
                                        form.appendChild( createElement(document, "input", {
                                            "type"	: "hidden",
                                            "name"	: "chatLines",
                                            "value"	: chatLines
                                        }));

                                        // submit form
                                        document.body.appendChild(form);
                                        form.submit();
                                        break;
                                    case lc_protocol.JSON_CHAT_VISITOR_BANNED:
                                        var data = messageItem.data;
                                        openConnection = false;

                                        /* Show message set by server */
                                        if (data.showMessage) {
                                            addChatLine(false, decodeURIComponent(lg[data.showMessage]), true, true, SYS_MSG_CHATWITH);
                                        }

                                        /* Disable input. */
                                        disableInput();

                                        /* Reset window event behavior. */
                                        window.onbeforeunload	= null;
                                        break;
                                }

                                break;
                                case lc_protocol.JSON_LBM_CHAT:
                                    switch (messageItem.action.actSubType) {
                                     case lc_protocol.JSON_CHAT_AGENTRECEIVETYPINGFROMOTHER:
                                        var uName	= messageItem.data.uName;
                                        var uNick   = messageItem.data.uNick;
                                        var typing = messageItem.data.isTyping;
                                        if ( typing === 'y' ){
                                            showAgentIsTyping(true,uName,uNick);
                                        }
                                        else if(messageItem.data.isFileUpload){
                                            showFileUploadedMesssage(true, FILEUPLOADTYPE.AGENT_NOTIFICATION,uName + " " +typing)  ;
                                        }
                                        else{
                                            removeTypingLine();
                                        }
                                        break;
                                     case lc_protocol.JSON_CHAT_AGENTRECEIVETYPING:
                                        var uName	= messageItem.data.uName;
                                        var uNick   = messageItem.data.uNick;
                                        var typing = messageItem.data.isTyping;
                                        if ( typing === 'y' ){
                                            showAgentIsTyping(true,uName,uNick);
                                        }
                                        else{
                                            removeTypingLine();
                                        }
                                        break;
                                     case lc_protocol.JSON_CHAT_AGENTSENDTYPING:
                                        var uName   = messageItem.data.uName;
                                        var uNick   = messageItem.data.uNick;
                                        var typing = messageItem.data.isTyping;
                                        if ( typing === 'y' ){
                                            showAgentIsTyping(true,uName,uNick);
                                        }
                                        else{
                                            removeTypingLine();
                                        }
                                        break;
                                    }
                                 break;
                        }
                    }
                    i = null;
                    break;

                case lc_protocol.JSON_PROC_MEDIA:
                    /* Extract information per message item. */
                    for (var i = 0; i < process.msgItem.length; i++) {
                        var messageItem	= process.msgItem[i];
                        var sessID		= messageItem.source.sessID;

                        /* Switch between ACTION TYPES. */
                        switch (messageItem.action.actType) {
                            case lc_protocol.JSON_MEDIA:
                                /* Switch between ACTION SUB-TYPES. */
                                switch (messageItem.action.actSubType) {
                                    case lc_protocol.JSON_MEDIA_INIT:
                                        var state	= messageItem.data.state;
                                        var aVideo	= messageItem.data.aVideo;
                                        var aVoice	= messageItem.data.aVoice;
                                        var vVideo	= messageItem.data.vVideo;
                                        var vVoice	= messageItem.data.vVoice;

                                        /* Set agent session ID. */
                                        if (state) {
                                            AGENT_SESSION_ID = sessID;
                                            initMedia(sessID + '_' + COMM_CID);
                                            appendLog('INIT(' + sessID + '): ' + state);
                                        } else {
                                            unloadMediaContainer();
                                        }

                                        break;
                                    case lc_protocol.JSON_MEDIA_COMMAND:
                                        var state = messageItem.data.state;

                                        /* Set agent session ID. */
                                        AGENT_SESSION_ID = sessID;
                                        appendLog('COMM: ' + state);
                                        break;
                                }
                                break;
                        }
                    }
                    i = null;
                    break;

                case lc_protocol.JSON_PROC_COBROWSE:
                    for (var i = 0; i < process.msgItem.length; i++) {
                        var messageItem	= process.msgItem[i];
                        var sessID		= messageItem.source.sessID;

                        /* Switch between ACTION TYPES */
                        switch (messageItem.action.actType) {
                            case lc_protocol.JSON_COBROWSE:
                                switch (messageItem.action.actSubType) {
                                    case lc_protocol.JSON_COBROWSE_INVITECHATTER:
                                        var cbID    = messageItem.data.cbID;
                                        var url     = messageItem.data.url;
                                        var uID     = messageItem.data.uID;

                                        /* Show invitation. */
                                        showCobrowseInvite(url, cbID, sessID, uID);

                                        /* Switch to polling mode to overcome same domain policy */
                                        lc_send_polling_command();
                                        break;
                                }
                                break;
                        }
                    }
                    i = null;
                    break;

                case lc_protocol.JSON_PROC_WHITEBOARD:
                    for (var i = 0; i < process.msgItem.length; i++) {
                        var messageItem	= process.msgItem[i];
                        var sessID		= messageItem.source.sessID;

                        /* Switch between ACTION TYPES */
                        switch (messageItem.action.actType) {
                            case lc_protocol.JSON_WHITEBOARD:
                                switch (messageItem.action.actSubType) {
                                    case lc_protocol.JSON_WHITEBOARD_INVITE:
                                        var state = messageItem.data.state;

                                        /* Search for available agents which is using whiteboard at the moment. */
                                        var agentWB = findNextAgentWhiteboard(sessID, state);
                                        if (!agentWB) {
                                            /* Initiate whiteboard. */
                                            initWhiteboard(state, false);
                                        }
                                        break;
                                }
                                break;
                        }
                    }
                    i = null;
                    break;
            }
        }
        m = null;
    }

    /* Destroy JSON object after being processed. */
    delete obj;

    /* Send ACK. */
    if (transactionID) {
        lc_send_ACK(transactionID);
    }

    /* Re-open the XHR connection. */
    if (!errorOccured && openConnection) {
        clearTimeout(dataPolling);
        dataPolling	= null;
        var pollIn = packetBuffer.length > 0 ? 200 : (POLLING_INTERVAL ? POLLING_INTERVAL : 2200); //LSM-730: Make sure undefined value is not passed to setTimeout
        dataPolling	= setTimeout(lc_openCommBuffer, pollIn);
    }
}

function createPhoto(toCreate, uPic) {

    if(toCreate) {
        var photoData = ['createPhoto'];

        if (uPic) {
            photoData[1] = true;
            photoData[2]= '//' + AWS_SERVER_HOST + ':' + AWS_SERVER_PORT + '/' + CHAT_SERVER_PATH + 'chat/img/photo/' + uPic;
        }else {
            photoData[1] = false;
        }
                     
        parent.postMessage(photoData, "*");
    }else {
        parent.postMessage('dontCreatePhoto', "*");
    }

    return true;
}

/* Display agent photo (if exist). */
function displayAgentPhoto(uPic) {
    createPhoto(true, uPic);
}

/* Hide agent photo. */
function hideAgentPhoto() {
    createPhoto(false, false);
}

/* Find if there is another agent using whiteboard. */
function findNextAgentWhiteboard(sessID, state) {
    var isExist = false;

    for (var i in agentArr) {
        var agent = agentArr[i];
        if (agent) {
            if (agent.session != sessID) {
                if (agent.whiteboard == true) {
                    isExist = true;
                }
            } else {
                agent.whiteboard = state;
            }
        }
    }

    agent = null;

    return isExist;
}

/* Find next available agent info. */
function findNextAgentInfo(uID) {
    var isExist = false;

    for (var i in agentArr) {
        var agent = agentArr[i];
        if (agent && !isExist) {
            if (agent.id != uID && agent.pic != '') {
                displayAgentPhoto(agent.pic);
                isExist = true;
            }
        }
    }

    agent = null;

    if (!isExist) {
        hideAgentPhoto();
    }

    isExist = null;
}

/* Display agent-is-typing notification. */
function showAgentIsTyping(bool, uName, uNick) {
    var container = document.getElementById('isTyping');
    if (bool) {
        var text = (decodeURIComponent(lg[13])).replace(/\[agent_name\]/gi, uName);
        var text = text.replace(/\[nick\]/gi, uNick);
        container.innerHTML = '<div class="msg-agent-typing">'+ text +'</div>';
        // Make sure the chat scrolls to the bottom.
        doScrollToTop(window.frames['chat-frame'].document.getElementById('chat-frame-body'));
    } else {
        container.innerHTML = '';
        // Make sure the chat scrolls to the bottom.
        doScrollToTop(window.frames['chat-frame'].document.getElementById('chat-frame-body'));
    }
    container = null;
}

function showFileUploadedMesssage(enableTypingDiv, type, message){
    var container = document.getElementById('isTyping');
    if (typeof type != undefined && '' != type && enableTypingDiv) {
        var text = message;
        container.innerHTML = '<div class="msg-file-upload" id="">'+ text +'</div>'
        doScrollToTop(window.frames['chat-frame'].document.getElementById('chat-frame-body'));
    } else {
        container.innerHTML = '';
        doScrollToTop(window.frames['chat-frame'].document.getElementById('chat-frame-body'));
    }
}

/* Parse a chat line (encode HTML, convert URLs and parses LC syntax). */
function parseChatline(line) {
    lastFunctionCall = 'LC - parseChatline()';

    var isFileUpload = false;
    var fileUpName = 'no_name';
    if(line.indexOf(UP_FILE) != -1) {
        isFileUpload = true;
        fileUpName = line.split("***")[4];
        line = line.replace(UP_FILE,'');
        line = line.replace(UP_FILE_NAME,'');
        line = line.replace(fileUpName,'');
    }

    /* Replace HTML special characters. */
    line = line.replace(/&(?!amp;)/gi, '&amp;');
    line = line.replace(/</gi, '&lt;');
    line = line.replace(/>/gi, '&gt;');

    /* Replace newlines with HTML line breaks. */
    line = line.replace(/\n/gi, '<br />\n');

    var re_lc_a		= /(\[URL\s+HREF=")([^']*)("\s+TARGET=")([^']*)("\s*\])([^\[]*)\[\/URL\]/gm;
    var re_lc_a2	= /\[URL\s+HREF="([^']*)"\s+TARGET="([^']*)"\s*\]([^\[]*)\[\/URL\]/gm;
    var re_email	= /\b([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})(?!\[\.\/LC_A)/gm;
    var re_url		= /\b(http:\/\/|https:\/\/|ftp:\/\/|news:\/\/|svn:\/\/|www\.)([^'\s$\,\[]*)/gi;
    var re_url2		= /\b(http:\/\/|https:\/\/|ftp:\/\/|news:\/\/|svn:\/\/|mailto:)/g;

    var matches = new Array();


    /* Collect URL match offsets with a 'fake replace'. */
    line = line.replace(re_lc_a,
        function (str, p1, p2, p3, p4, p5, p6, offset, s) {
            if (p2.search(/\bmailto:/i) != -1) {
                /* Calculate proper offset if the link is a mail link. */
                matches[matches.length] = (offset + p1.length + 7);
            } else {
                matches[matches.length] = (offset + p1.length);
            }

            if (p6.search(re_url) != -1) {
                var offset2 = (offset + p1.length + p2.length + p3.length + p4.length + p5.length);
                matches[matches.length] = offset2;
            }

            return str;
        });


    /* Match URLs (those which don't use the LC syntax), first replace e-mail adresses. */
    line = line.replace(re_email,
        function (str, p1, offset, s) {
            /* Check if 'str' is contained in LC syntax tag. */
            for (var i = 0; i < matches.length; i++) {
                if (matches[i] == offset) {
                    return str;
                }
            }

            return '<a href="mailto:' + p1 + '">' + p1 + '</a>';
        });


    /* Then replace URLs. */
    line = line.replace(re_url,
        function (str, p1, p2, offset, s) {
            var url = p1 + p2;
            if (p1.match(/www\./gi)) {
                url = '//' + url;
            } else if(null === p1 || '' === p1){
                return str;
            }

            /* Check if 'str' is contained in LC syntax tag. */
            for (var i = 0; i < matches.length; i++) {
                if (matches[i] == offset) {
                    return str;
                }
            }

            if(isFileUpload){
                return '<a href="' + url + '" target="_blank">'+ fileUpName +'</a>';
            }
            else{
                return '<a href="' + url + '" target="_blank">'+ (p1+p2)+'</a>';
            }
        }   );



    /* Replace LiveCom syntax tags. */
    line = line.replace(re_lc_a2,
        function (str, p1, p2, p3, offset, s) {
            var url = p1;
            if (p1.search(re_url2) == -1) {
                url = '//'+ url;
            }

            return '<a href="' + url + '" target="' + p2 + '">' + p3 + '</' + 'a>';
        });


    return line;
}

function removeTypingLine() {
    setTimeout(function() {
        var container = document.getElementById('isTyping');
        container.innerHTML = '';
        // Make sure the chat scrolls to the bottom.
        doScrollToTop(window.frames['chat-frame'].document.getElementById('chat-frame-body'));
    }, 3000);
}

/* Webkit-based browsers hack. */
function fixWebkit() {
    var uAgent = navigator.userAgent.toLowerCase();
    if (uAgent.indexOf('chrome') > -1 || uAgent.indexOf('safari') > -1 || uAgent.indexOf('webkit') > -1) {
        document.getElementById('inputBody').value = ' ';
    }
}

/* Get current timestamp. HH:MM:SS */
function getCurrentTimestamp() {
    var textDate	= new Date();
    var textHour	= textDate.getHours();
    if (parseInt(textHour) < 10) {
        textHour = '0' + parseInt(textHour);
    }
    var textMinute	= textDate.getMinutes();
    if (parseInt(textMinute) < 10) {
        textMinute = '0' + parseInt(textMinute);
    }
    var textSecond	= textDate.getSeconds();
    if (parseInt(textSecond) < 10) {
        textSecond = '0' + parseInt(textSecond);
    }
    return textHour + ':' + textMinute + ':' + textSecond;
}

/* Add chat line in the chat body. */
function addChatLine(uName, uMsg, isSystemMsg, alwaysReset, systemMsgType) {
    uMsg        = uMsg.replace(/(\n+|\r+\n+|\r+)/gi, '<br>');
    var fr		= window.frames['chat-frame'];
    var d		= fr.document;
    var body 	= d.getElementById('chat-frame-body');

    // SJC changed <p> to <div>
    var text        = d.createElement('div');
    text.className  = 'chat-line msg-bubble msg-bubble-c';

    var indUF = uMsg.indexOf(UP_FILE);
    var visitorFlag = false; // to differentiate the request betwee nvisitor and agent - lsm 877 - //shows that request is from visitor

    if(indUF > 0) {
        //uName becomes visitor name here
        uName = uMsg.substr(0,indUF);
        visitorFlag = true;
        uMsg = uMsg.substr(indUF);
        text.className  = 'chat-line msg-bubble msg-bubble-a';
    }

    /* Parse chat line. */
    var isFileUploadForDisplay = false;
    if (!isSystemMsg) {
        if(uMsg.indexOf(UP_FILE) != -1) {
            isFileUploadForDisplay = true;
        }
        uMsg = parseChatline(uMsg);

        /* Force the <br> back to element type. */
        uMsg = uMsg.replace(/&lt;br&gt;/gi, '<br>');
        uMsg = uMsg.replace(/&lt;br\s*\/\s*&gt;/gi, '<br>');
        uMsg = uMsg.replace(/&lt;br\s*\/&gt;/gi, '<br>');

        /* Update last message timestamp. */
        setLastMessageTimestamp();
    }

    try {
        if (enableEmoticon) {
            uMsg = LC_EMOTICONS.parse(uMsg);
        }
    } catch(e) {}

    /*
    var SYS_MSG_POPUP		= 0;
	var SYS_MSG_CHATWITH	= 1;
	var SYS_MSG_EMAIL		= 2;
	var SYS_MSG_LINK		= 3;
	var SYS_MSG_OTHER		= 4;
    */
   if (!isSystemMsg || (isSystemMsg &&
   		(systemMsgType != SYS_MSG_POPUP && systemMsgType != SYS_MSG_CHATWITH )))
   {
       var messagToDisplay = '';
       if (uName) {
           if(isFileUploadForDisplay){
               if(visitorFlag) {
                   uMsg = decodeURIComponent(lg[108]) + uMsg;
               }
               else{
                   uMsg = decodeURIComponent(lg[109]) + uMsg;
               }
           }
           messagToDisplay = '<div class="msg-bubble-topline"></div>';
       }
        text.innerHTML =    '<div class="bubble-container">'
                        +       '<div class="msg-bubble-arrow"></div>'
                        +       '<div class="msg-bubble-inner">' + messagToDisplay
                        +           '<span class="msg-bubble-text" id="">'+uMsg+'</span>'
                        +           '<p class="msg-bubble-seemore" id="" style="display: none;">.... See more</p>'
                        +       '</div>';
                       if(enablePrintTimestamp) {
                           text.innerHTML = text.innerHTML +'<div class="msg-bubble-time">' + getCurrentTimestamp() + '</div>';
                       }
                       +   '</div>';
   }

    /* Apply text style based on the message type. */
    if (isSystemMsg) {
        /* System color. */
        text.style.color        = SYSTEM_COLOR;
        text.style.fontStyle	= 'italic';
        
        if (text.querySelectorAll(".msg-bubble-inner")[0]) {
            text.querySelectorAll(".msg-bubble-inner")[0].style.backgroundColor = SYSTEM_MESSAGE_BUBBLE_COLOR;
            text.querySelectorAll(".msg-bubble-text")[0].style.color = SYSTEM_COLOR;
            text.querySelectorAll(".msg-bubble-inner")[0].style.fontFamily = SYSTEM_FONT;
            text.querySelectorAll(".msg-bubble-inner")[0].style.fontSize = SYSTEM_FONT_SIZE;
            text.querySelectorAll(".msg-bubble-inner")[0].style.textAlign = 'center';
        }
        
        // SJC
        display_system_message(uMsg, uName, systemMsgType);
        doScrollToTop(body);
        return;

    } else if (uName && !visitorFlag) {
        /* Agent color. */
        text.style.color        = AGENT_COLOR;
        
        // Set bubble background and bubble tail colours
        text.querySelectorAll(".msg-bubble-inner")[0].style.backgroundColor = AGENT_MESSAGE_BUBBLE_COLOR;
        text.querySelectorAll(".msg-bubble-arrow")[0].style.backgroundColor = AGENT_MESSAGE_BUBBLE_COLOR;

        text.querySelectorAll(".bubble-container")[0].style.fontFamily = AGENT_FONT;
        text.querySelectorAll(".bubble-container")[0].style.fontSize = AGENT_FONT_SIZE;
    } else {
        /* Visitor color. */
        text.style.color        = VISITOR_COLOR;
        
        // Set bubble background and bubble tail colours
        text.querySelectorAll(".msg-bubble-inner")[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
        text.querySelectorAll(".msg-bubble-arrow")[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
        text.querySelectorAll(".bubble-container")[0].style.fontFamily = VISITOR_FONT;
        text.querySelectorAll(".bubble-container")[0].style.fontSize = VISITOR_FONT_SIZE;
    }

    visitorFlag ? showFileUploadedMesssage(true,FILEUPLOADTYPE.SUCCESS,FILEUPLOADMESSAGES.uploadSuccess): '';

    /* Check if the text should be appended to the previous lines or not. */
    // SJC don't put system message in dom
    if (alwaysReset && !isSystemMsg) {
        while (body.hasChildNodes()) {
            body.removeChild(body.firstChild);
        }
        body.appendChild(text);
    } else {
        body.appendChild(text);
    }

    /* Reset agent-is-typing notification. */
    (indUF>=0)? showFileUploadedMesssage(false): showAgentIsTyping(false);

    parent.postMessage('showAgentTypeMessage' + uMsg, "*");

	/* Trigger sound alert if enabled */
    if('audio' in navigator && soundAlertEnabled) {
        var audio = new Audio('../../sitescript/chat/sounds/msg.mp3');
        audio.play();
    } else if (soundAlertEnabled && typeof sounds === 'object') {
		sounds.play();
    }
}

/* SJC - display system messages - can be shown in pop-up or 'you are
 * chatting with
    var SYS_MSG_POPUP		= 0;
	var SYS_MSG_CHATWITH	= 1;
	var SYS_MSG_EMAIL		= 2;
	var SYS_MSG_LINK		= 3;
	var SYS_MSG_OTHER		= 4;
 * */
function display_system_message(uMsg, uName, systemMsgType) {
    var fr          = window.frames['chat-frame'];
    var d           = fr.document;
    var body        = d.getElementById('chat-frame-body');
    switch (systemMsgType) {
    	// SJC - no longer pop-ups but these messages need removing
    	case SYS_MSG_POPUP:
            var text        = d.createElement('div');
            text.id         = new Date().getTime();
            text.className  = 'system-msg-inline';
            text.innerHTML  = '<div class="bubble-container" >'
                            + '<div class="msg-bubble-inner" >'
                            + '<span class="msg-bubble-text" id="">'+ uMsg +'</span>'
                            + '</div></div>';

            if (text.querySelectorAll(".msg-bubble-inner")[0]) {
                text.querySelectorAll(".msg-bubble-inner")[0].style.fontFamily = SYSTEM_FONT;
                text.querySelectorAll(".msg-bubble-inner")[0].style.fontSize = SYSTEM_FONT_SIZE;
                text.querySelectorAll(".msg-bubble-inner")[0].style.textAlign = 'center';
            }

            body.appendChild(text);

		    // set delay and then remove pop-up again
		    setTimeout (function() {
		        appendLog("display_system_message - removing message");
		        body.removeChild(text);
		    }, 5000);
		break;

		case SYS_MSG_CHATWITH:
			// NB. document NOT 'd' as this element is outside chat-frame
			var cw = document.getElementById('chatting-with');
			if (cw) {
				cw.innerHTML = uMsg;
			} else {
                appendLog('chatwith element not found');
            }
		break;

        case SYS_MSG_LINK:
            // is shown in bubble
        break;

		default:
		    var text        = d.createElement('div');
		    text.id         = new Date().getTime();
		    text.className  = 'system-msg-inline';
		    text.innerHTML  = '<div class="bubble-container">'
                            + '<div class="msg-bubble-inner">'
                            + '<span class="msg-bubble-text" id="">'+ uMsg +'</span>'
                            + '</div></div>';

            if (text.querySelectorAll(".msg-bubble-inner")[0]) {
                text.querySelectorAll(".msg-bubble-inner")[0].style.fontFamily = SYSTEM_FONT;
                text.querySelectorAll(".msg-bubble-inner")[0].style.fontSize = SYSTEM_FONT_SIZE;
                text.querySelectorAll(".msg-bubble-inner")[0].style.textAlign = 'center';
            }
            
		    body.appendChild(text);
		break;
    }
}

/* Set last message timestamp. */
function setLastMessageTimestamp() {
    var lastR = document.getElementById('lastResponseTimestamp');
    if (lastR) {
        var now = new Date();
        var h   = now.getHours();
        var m   = now.getMinutes();
        var s   = now.getSeconds();

        if (h < 10) {
            h = '0' + h.toString();
        }
        if (m < 10) {
            m = '0' + m.toString();
        }
        if (s < 10) {
            s = '0' + s.toString();
        }

        lastR.innerHTML = decodeURIComponent(lg[30]) + ' ' + h + ':' + m + ':' + s;
    }
}

/* Send chat line to the server. */
function sendChatLine() {
    clearTimeout( typingTimer );
    var fr		= window.frames['chat-frame'];
    var d		= fr.document;
    var body 	= d.getElementById('chat-frame-body');

    if (document.getElementById('inputBody').value != '') {
        var tempMsg	= parseChatline(document.getElementById('inputBody').value);

        var isNotScriptInjection = checkForScriptInjection(tempMsg);
        if(isNotScriptInjection) {
            try {
                if (enableEmoticon) {
                    tempMsg = LC_EMOTICONS.parse(tempMsg);
                }
            } catch (e) {
                appendLog('Error parsing emoticons - lc_functions.js inline');
            }

            // SJC changed <p> to <div>
            var text			= d.createElement('div');
            text.className      = 'chat-line msg-bubble msg-bubble-a';
            text.style.color	= VISITOR_COLOR;

            text.innerHTML =    '<div class="bubble-container">'
                +       '<div class="msg-bubble-arrow"></div>'
                +       '<div class="msg-bubble-inner">'
                +           '<div class="msg-bubble-topline"></div>'
                +           '<span class="msg-bubble-text" id="">'+tempMsg+'</span>'
                +           '<p class="msg-bubble-seemore" id="msg-bubble-seemore-704858-2418160" style="display: none;">.... See more</p>'
                +       '</div>';
            if(enablePrintTimestamp) {
                text.innerHTML = text.innerHTML +'<div class="msg-bubble-time">' + getCurrentTimestamp() + '</div>';
            }
            +   '</div>';

		    // Set bubble background and bubble tail colours
            text.querySelectorAll(".msg-bubble-inner")[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
            text.querySelectorAll(".msg-bubble-arrow")[0].style.backgroundColor = VISITOR_MESSAGE_BUBBLE_COLOR;
            text.querySelectorAll(".bubble-container")[0].style.fontFamily = VISITOR_FONT;
            text.querySelectorAll(".bubble-container")[0].style.fontSize = VISITOR_FONT_SIZE;

            // Append bubble to the chat body
            body.appendChild(text);
            doScrollToTop(body);

            /* Update last message timestamp. */
            setLastMessageTimestamp();

            /* Create JSON string for requesting macros. */
            var obj = new Object();
            obj.actType = lc_protocol.JSON_CHAT;
            obj.actSubType = lc_protocol.JSON_CHAT_VISITORSENDMESSAGE;
            obj.sessID = document.getElementById('sessionID').value;
            obj.cMsg = document.getElementById('inputBody').value;

            /* Set to comm buffer. */
            lc_setCommBuffer(lc_JSON.encode(obj));
            delete obj;

            /* Clear the input body. */
            document.getElementById('inputBody').value = '';
            document.getElementById('inputBody').focus();

            /* Reset the last key pressed. */
            lastKeyPressed = false;
        }else {
            document.getElementById('inputBody').value = document.getElementById('inputBody').value.trim();
        }
    }
}

function checkForScriptInjection(message) {
    var scriptPatternNormal = /<script.*>.*/gi;
    var scriptPatternUnicode = /&lt;script.*&gt;.*/gi;

    var isIllegalNormal = scriptPatternNormal.test(message);
    var isIllegalUnicode = scriptPatternUnicode.test(message);

    if(!(isIllegalNormal || isIllegalUnicode)) {
        return true;
    }else {
        alert('Invalid input! Are you typing a script?');
    }
    return false;
}

function notifyAgentFileUpload(fileID, fileName) {
    var obj         = new Object();
    obj.actType     = lc_protocol.JSON_CHAT;
    obj.actSubType  = lc_protocol.JSON_CHAT_NOTIFYAGENTFILEUPLOAD;
    obj.sessID      = document.getElementById('sessionID').value;
    obj.fileID      = fileID;
    obj.fileName    = fileName;

    /* Set to comm buffer. */
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;
}
//fileupload_20140918_comm end
//LSM 965 NEW METHOD TO notify the agent of a user's file upload
function notifyAgentFileUploadStatus() {
    var obj         = new Object();
    obj.actType     = lc_protocol.JSON_CHAT;
    obj.actSubType  = lc_protocol.JSON_CHAT_VISITORFILEUPLOADSTATUS;
    obj.sessID      = document.getElementById('sessionID').value;
    obj.mess 		= 'Visitor '+ FILEUPLOADMESSAGES.sendingAttachments;

    /* Set to comm buffer. */
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;
}

/*
 do the scroll to the top - also covering IE
 */
function doScrollToTop(body) {

    if (ieBrowserVersion() <= 9) {
        body.parentNode.scrollTop = body.parentNode.offsetHeight;
    } else if(/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        var chatFrame = document.getElementById('chat-frame').contentWindow.document;
        var chatFrameBody = chatFrame.getElementById('chat-frame-body');
        chatFrameBody.scrollTop = chatFrameBody.scrollHeight;
        setTimeout(function () {
            body.parentNode.scrollTop = body.parentNode.scrollHeight;
        }, 2000);
    }else {
        body.parentNode.scrollTop = body.parentNode.scrollHeight;
    }
}


/* Send media init OK command. */
function sendMediaInitOK() {
    /* Create JSON string for requesting macros. */
    var obj			= new Object();
    obj.actType		= lc_protocol.JSON_MEDIA;
    obj.actSubType	= lc_protocol.JSON_MEDIA_INITOK;
    obj.agentSessID	= AGENT_SESSION_ID;
    obj.sessID		= document.getElementById('sessionID').value;
    obj.cID			= document.getElementById('sessionID').value;

    /* Set to comm buffer. */
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;
}
var typingTimer = null;
/* Send typing notification to the server. */
function sendTyping() {
    clearTimeout( typingTimer );

    /* Create JSON string for requesting macros. */
    var obj			= new Object();
    obj.actType		= lc_protocol.JSON_CHAT;
    obj.actSubType	= lc_protocol.JSON_CHAT_VISITORSENDTYPING;
    obj.sessID		= document.getElementById('sessionID').value;

	typingTimer = setTimeout(function(){
		obj.isTyping	= 'n';
		lc_setCommBuffer(lc_JSON.encode(obj));
		lastKeyPressed = false;},
	3000);

    if (!lastKeyPressed) {
        /* Set to comm buffer. */
        obj.isTyping	= 'y';
        lc_setCommBuffer(lc_JSON.encode(obj));

        /* Set the last key pressed to true. */
        lastKeyPressed = true;
    }
}

/* Chat expired. */
function chatExpire() {
    addChatLine(false, decodeURIComponent(lg[4]), true, false,SYS_MSG_OTHER);
    stopChat();
}

/* Chat stopped. */
function chatStop(keepBeforeUnload) {

    /* Remove media container. */
    try {
        var subWrapper = document.getElementById('webcam-subscriber-wrapper');
        if (subWrapper) {
            subWrapper.innerHTML = '';
        }
        var pubWrapper = document.getElementById('webcam-publisher-wrapper');
        if ( pubWrapper ) {
            pubWrapper.innerHTML = '';
        }
        unloadMediaContainer();
    } catch(e) {
        if (window.console && window.console.log) {
            console.log('Fn error: unloadMediaContainer');
        }
    }

    var uNameTmp = uAgentTmp.name; //LSM-653
    var uNickTmp = uAgentTmp.uNick; //LSM-653
    var uMsgTmp = decodeURIComponent(lg[3]); //LSM-653
    uMsgTmp = uMsgTmp.replace('[AGENT_NAME]', uNameTmp); //LSM-653
    uMsgTmp = uMsgTmp.replace(/\[NICK\]/gi,uNickTmp); //LSM-653
    addChatLine(false, uMsgTmp, true, false,SYS_MSG_OTHER);
    addChatLine(false, uMsgTmp, true, false,SYS_MSG_CHATWITH);
    stopChat(keepBeforeUnload);

    /* Check if post-chat is exist or not. */
    if (chatAccepted && POST_CHAT_EXIST) {
        addChatLine(false, '<a style="cursor: pointer; text-decoration: underline; font-family: &#39;'+ SYSTEM_FONT + '&#39;; font-size: '+ SYSTEM_FONT_SIZE + '; color: ' + SYSTEM_COLOR + ';" href="#" onclick="window.parent.displayPostChat(); return false;">' + decodeURIComponent(lg[11]) + '</a>', true, false, SYS_MSG_OTHER);
    }

    if (document.location.href.indexOf('#stop') === -1) {
        document.location.href += '#stop';
    }

    var isActiveChat = false;
    setChatBodyHeightDynamically(isActiveChat);
}

/* Disable cobrowse invite link. */
function disableCobrowseInvite(el, accepted) {
    if (el) {
        var parent = el.parentNode;
        if (parent) {
            parent.style.color = '#808080';
            var links = parent.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                links[i].onclick                = null;
                links[i].style.color            = '#808080';
                links[i].style.cursor           = 'auto';
                links[i].style.textDecoration   = 'none';
            }

            if (accepted) {
                addChatLine(false, decodeURIComponent(lg[19]), true, false, SYS_MSG_OTHER);
            } else {
                addChatLine(false, decodeURIComponent(lg[20]), true, false, SYS_MSG_OTHER);
            }
        }
    }
}

/* Agent invite for cobrowse. */
function showCobrowseInvite(url, cbID, sessID, uID) {
    var txt     = decodeURIComponent(lg[18]);
    var matchY  = txt.match(/\[LC_Y\](.*)\[\/LC_Y\]/i);
    var matchN  = txt.match(/\[LC_N\](.*)\[\/LC_N\]/i);
    var textY   = 'Yes';
    var textN   = 'No';

    if (matchY) {
        if (matchY.length > 1) {
            textY = matchY[1];
        }
    }
    textY = '<a onclick="window.parent.startCobrowse(event, \'' + url + '\',\'' + cbID + '\',\'' + sessID + '\'); window.parent.disableCobrowseInvite(this, true); return false;" href="#" style="cursor: pointer; text-decoration: underline; font-family: &#39;'+ SYSTEM_FONT + '&#39; ; color: ' + SYSTEM_COLOR + ';">' + textY + '</a>';

    if (matchN) {
        if (matchN.length > 1) {
            textN = matchN[1];
        }
    }
    textN = '<a onclick="window.parent.disableCobrowseInvite(this, false); return false;" href="#" style="cursor: pointer; text-decoration: underline; font-family: &#39;'+ SYSTEM_FONT + '&#39; ; font-size: '+ SYSTEM_FONT_SIZE + ';  color: ' + SYSTEM_COLOR + ';">' + textN + '</a>';

    var agent = 'Agent ';
    if (uID) {
        if (agentArr[uID]) {
            agent = agentArr[uID].name;
        }
    }

    txt = txt.replace(/\[AGENT_NAME\]/i, agent);
    txt = txt.replace(/\[LC_Y\].*\[\/LC_Y\]/i, textY);
    txt = txt.replace(/\[LC_N\].*\[\/LC_N\]/i, textN);

    addChatLine(false, '<span>' + txt + '</span>', true, false, SYS_MSG_OTHER);
}

/* Initiate cobrowse session. */
function startCobrowse(e, url, cbID, sessID) {
    e = e || window.event;

    var el;
    if(e.target) {
        el = e.target;
    } else if(e.srcElement){
        el = e.srcElement;
    }

    if(el.nodeType == 3) {
        el = el.parentNode();
    }

    el.onclick = function() {
        return false;
    };

    var delim;
    if(url.indexOf('?') == -1) {
        delim = '?';
    } else {
        delim = '&';
    }

    var cbUrl = url + delim + 'lcCB=' + cbID;
    if(window.opener && !window.opener.closed) {
        try {
            if (window.opener.lccb) {
                window.opener.lccb = new window.opener.lc_cobrowse(cbID, 1);
            } else {
                window.opener.location.href = cbUrl;
            }
        } catch(err) {

        }
    } else {

    }
    cobrowseInvitationAccepted(sessID);
}

/* Open popup for cobrowse. */
function openPopUp(cbUrl) {
    var height		= 600;
    var width		= 800;
    var top			= Math.floor((screen.height - height) / 2);
    var left		= Math.floor((screen.width - width) / 2);
    var winprops    = 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=no,resizable=no,status=no,toolbar=no,directories=no';
    var win			= window.open(cbUrl, '_blank', winprops);
    win				= null;
}

/* Send cobrowse invitation accepted to the server. */
function cobrowseInvitationAccepted(sessID) {
    var obj         = new Object();
    obj.actType     = lc_protocol.JSON_COBROWSE;
    obj.actSubType  = lc_protocol.JSON_COBROWSE_INVITEACCEPTED;
    obj.sessID		= document.getElementById('sessionID').value;
    obj.agentSessID = sessID;

    /* Set to comm buffer. */
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;
}

/* Remove all flash objects. */
function removeFlashObjects() {
    /* Remove media (if activated). */
    if (mediaActive) {
        initMedia(false);
    }

    /* Remove whiteboard (if activated). */
    if (whiteboardActive) {
        initWhiteboard(false, false);
    }
}

function closeChatWindow(){
    parent.postMessage('removeMaxCookie', "*");
    parent.postMessage('killSession', "*");
    parent.postMessage('lc5UpdateWidget', "*");
}

/* Close the chat. */
function stopChat(keepBeforeUnload) {
    try {
        removeFlashObjects();
    } catch(e) {}

    /* Reset window event. */
    if (!keepBeforeUnload) {
        window.onbeforeunload = null;
    }

    /* Disable input. */
    disableInput();

    /* Reset agent-is-typing notification. */
    showAgentIsTyping(false);

    createPhoto(false,'');
}

/* Disable input. */
function enableInput() {
    document.getElementById('chat-input-container').style.visibility	= 'visible';
    document.getElementById('inputBody').value			= '';
    document.getElementById('inputBody').disabled		= false;
    document.getElementById('inputBody').onkeydown		= evalClick;
    document.getElementById('button-holder').onclick	= sendChatLine;
    document.getElementById('inputBody').classList.remove("disabled");
}

/* Disable input. */
function disableInput() {
    document.getElementById('inputBody').value			= '';
    document.getElementById('inputBody').disabled		= true;
    document.getElementById('inputBody').classList.add("disabled");
    document.getElementById('chat-input-container').style.visibility	= 'hidden';
}

/* Display post-chat form if exist. */
function displayPostChat() {
	unloadPage();
}

/* Add press-enter-to-send behavior. */
function evalClick(e) {
    var code;
    e = e || window.event;

    /* Grab the key value. */
    if (e.keyCode) {
        code = e.keyCode;
    } else if (e.which) {
        code = e.which;
    }

    var shift   = (e.shiftKey   ? true : false);
    var alt     = (e.altKey     ? true : false);
    var ctrl    = (e.ctrlKey    ? true : false);
    /* If key is enter, send the chat line. */
    if (code == 13 && !shift) {
        sendChatLine();
        return false;
    } else {
        if (!alt && !ctrl) {
            sendTyping();
        }
    }

    return true;
}

/* Show confirmation before refreshing/closing. */
function startBeforeUnload(e) {
    e = e || window.event;

    return '';
}
function buildPostChatURL() {
    var now = new Date();
    return '//' + AWS_SERVER_HOST + ':' + AWS_SERVER_PORT + '/5g/ch/?rand=' + now.getTime() + '&gid=' + COMM_GID + '&aid=' + COMM_AID + '&sessID=' + COMM_CID + '&state=1' + ((BUTTON_ID == '') ? '' : '&lcId=' + encodeURIComponent(BUTTON_ID));
}

function buildMailFormURL() {
    return document.location.href + '&state=4';
}

function getQueryAttribute() {

}

/* Load post-chat form if exist. */
function unloadPage() {
    if (CHAT_POPUP_STYLE == 'false') {
        var url			= buildPostChatURL();
        window.location.href = url;
    }
    else if (chatAccepted && POST_CHAT_EXIST) {
        var url			= buildPostChatURL();
        var height      = WIN_HEIGHT;
        var width       = WIN_WIDTH;
        var scheme      = CHAT_SCHEME;
        var left        = (screen.width - width) / 2;
        var top         = (screen.height - height) / 2;
        var name        = 'post_' + (new Date()).getTime();
        var winprops    = 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=no,resizable=' + (WIN_RESIZE == 'true' ? 'yes' : 'no') + ',status=no,toolbar=no,directories=no';
        var win         = window.open(scheme + url, name, winprops);
        win             = null;
    }
}

/* Get event source element. */
function getEventSourceElement(e) {
    e = e || window.event;

    var el;

    if (e.target) {
        el = e.target;
    } else if (e.srcElement) {
        el = e.srcElement;
    }

    // For safari bug.
    if (el.nodeType == 3) {
        el = el.parentNode;
    }

    return el;
}

/* Check form submit. */
function lcCheckFormSubmit(e) {
    var form			= null;
    var useCustomBtn	= false;
    if (e) {
        form = getEventSourceElement(e);
    } else {
        form			= document.forms[0];
        useCustomBtn	= true;
    }

    var inputs		= form.getElementsByTagName('input');
    var input		= null;
    var parentEl	= null;
    var classEl		= null;
    var reqType		= null;
    var reqText     = 'Input validation failed';
    var reqExpr     = '';
    var valueEl		= null;

    var errorState = {
        errOccured	: false,
        errCount	: 0,
        errMessage  : ''
    };

    var layoutMode	= '';

    var btnSubmit = document.getElementById('FORMSUBMIT');
    if (btnSubmit && !useCustomBtn && (btnSubmit.offsetHeight == 0 || btnSubmit.offsetWidth == 0)) {
        return false;
    }

    var divQuestionsTemp    = document.getElementsByTagName('div');
    var divQuestions        = [];
    for (var di = 0; di < divQuestionsTemp.length; di++) {
        if (divQuestionsTemp[di].className.indexOf('lc-fb-question') > -1) {
            divQuestions.push(divQuestionsTemp[di]);
        }
    }

    // Compose input sequence.
    var tempObj		= new Object();
    var tempOrder	= new Array();
    var tempEl		= divQuestions;
    var tempInput	= null;
    var currInput	= null;
    for (var x = 0; x < tempEl.length; x++) {
        tempInput = tempEl[x];
        if (tempInput.className.indexOf('lc-fb-question') > -1) {
            currInput = tempInput.getElementsByTagName('textarea');
            if (currInput.length == 0) {
                currInput = tempInput.getElementsByTagName('select');
                if (currInput.length == 0) {
                    currInput = tempInput.getElementsByTagName('input');
                }
            }

            for (var xx = 0; xx < currInput.length; xx++) {
                if (currInput[xx]) {
                    if (!tempObj[currInput[xx].name]) {
                        tempOrder.push((currInput[xx].name));
                        tempObj[currInput[xx].name] = true;
                    }
                }
            }
            xx = null;
        }
    }
    x = null;

    // Put the order on the provided hidden field.
    var orderEl = document.getElementById('LC_formsequence');
    if (orderEl) {
        var orderStr = '';
        for (var o = 0; o < tempOrder.length; o++) {
            if (o != 0) {
                orderStr += '::SPACER::';
            }
            orderStr += tempOrder[o];
        }
        orderEl.value = orderStr;
    }

    var inputArr = [];
    var textareas = form.getElementsByTagName('textarea');
    for (var t1 = 0; t1 < textareas.length; t1++) {
        inputArr.push(textareas[t1]);
    }
    for (var t2 = 0; t2 < inputs.length; t2++) {
        inputArr.push(inputs[t2]);
    }

    var multipleInputElements = {};
    // Check for validation.
    for (var i = 0; i < inputArr.length; i++) {
        input = inputArr[i];
        if ((input.type == 'text' && input.getAttribute('name') != 'lcTranscriptField' && input.getAttribute('name') != 'lcTranscriptEmail') || input.nodeName.toLowerCase() === 'textarea' || isMultipleInputType(input.type) ) {
            parentEl	= input.parentNode;
            classEl		= parentEl.className;
            while (classEl.indexOf('lc-fb-question') == -1) {
                parentEl	= parentEl.parentNode;
                classEl		= parentEl.className;
            }
            layoutMode	= parentEl.getElementsByTagName('span')[0].innerHTML;

            // Check if this element is required or not.
            if (classEl.indexOf('lc-required') >= 0) {
                var tmpReq  = (parentEl.getAttribute('for')).split('[::]');
                reqType		= tmpReq[0];

                if (tmpReq[1] && tmpReq[1] != '') {
                    reqText = tmpReq[1];
                    try {
                        reqText = decodeURIComponent(reqText);
                    } catch(e) {}
                }


                if (tmpReq[2] && tmpReq[2] != '') {
                    reqExpr = tmpReq[2];
                }

                valueEl		= input.value;
                errorState.errOccured	= false;
                errorState.errMessage	= reqText;

                if (reqType != '' && reqType != '4') {
                    switch (parseInt(reqType)) {
                        // Numeric.
                        case 0:
                            validateInputChatLc5Numeric(valueEl, errorState);
                            break;

                        // Text.
                        case 1:
                            validateInputChatLc5Text(valueEl,errorState);
                            break;

                        // Email.
                        case 2:
                            validateInputChatLc5Email(valueEl,errorState);
                            break;

                        // Web address.
                        case 3:
                            validateInputChatLc5WebAddress(valueEl,errorState);
                            break;
                    }
                } else if (reqType == 4) {
                    validateInputChatLc5ReqularExpression(reqExpr,valueEl,errorState);
                }

                // check if required attributes/fields are present
                var errorMessage = tmpReq[3];
                var isRequired = tmpReq[4];
                if(input.type == 'text') {
                    checkIfTextFieldIsSet(valueEl,errorState, errorMessage, isRequired);
                }

                if(isMultipleInputType(input.type)) {
                    keepTrackOfRequiredMultipleInputFields(multipleInputElements, input,parentEl,errorMessage);
                }

                removePreviousErrorMessage(document, input.id);

                if (errorState.errOccured) {
                    showErrorMessageForValidation(document,parentEl,layoutMode,input.id,errorState.errMessage);
                }
            }

        }
    }

    if(areMultipleInputElementsPresent(multipleInputElements)) {
        checkIfRequiredMultipleInputFieldsAreSet(multipleInputElements,errorState,document,layoutMode);
    }

    return isFormReadyToSubmit(errorState.errCount);
}


function showErrorMessageForValidation(document,parentEl,layoutMode,inputId,errMessage) {
    if (layoutMode == 'horizontal') {
        var errContainer = parentEl.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
        if (errContainer) {
            var tr	= document.createElement('tr');
            tr.id	= 'lc-required-el-' + inputId
            var td1	= document.createElement('td');
            var td2	= document.createElement('td');

            td1.className = 'colQuestion';
            td2.className = 'colAnswer';

            td1.innerHTML = '&nbsp;';
            td2.innerHTML = '<span class="lc-required-message">' + errMessage + '</span>';

            tr.appendChild(td1);
            tr.appendChild(td2);
            errContainer.appendChild(tr);

            tr	= null;
            td1	= null;
            td2	= null;
        }
    } else {
        var div			= document.createElement('div');
        div.id			= 'lc-required-el-' + inputId;
        div.className	= 'lc-required-message';
        div.innerHTML	= errMessage;

        parentEl.appendChild(div);
        div = null;
    }
}

function keepTrackOfRequiredMultipleInputFields(radioElements, input, parentEl, errorMessage) {
    var errMessage =processErrorMessageForRequiredFields(errorMessage);

    if(!(input.name in radioElements)) {
        radioElements[input.name] = {
            isSet         : false,
            lastElementId : input.id,
            parentEl      : parentEl,
            errorMessage  : errMessage
        };
    }else {
        radioElements[input.name] = {
            isSet         : radioElements[input.name].isSet,
            lastElementId : input.id,
            parentEl      : parentEl,
            errorMessage  : errMessage
        };
    }

    if(input.checked) {
        radioElements[input.name] = {
            isSet         : true
        };
    }
}

function checkIfRequiredMultipleInputFieldsAreSet(radioElements, errorState, document, layoutMode) {
    for (var element in radioElements) {
        var requiredFieldSet = radioElements[element].isSet;
        if(!requiredFieldSet) {
            errorState.errOccured = true;
            errorState.errCount++;
            showErrorMessageForValidation(document,radioElements[element].parentEl,layoutMode,radioElements[element].lastElementId,radioElements[element].errorMessage);
        }
    }
}

function removePreviousErrorMessage(document, inputId) {
    var errEl = document.getElementById('lc-required-el-' + inputId);
    if (errEl) {
        var parentErr = errEl.parentNode;
        parentErr.removeChild(errEl);
    }
    parentErr	= null;
    errEl		= null;
}

function processErrorMessageForRequiredFields(errorMessage) {
    if(errorMessage && errorMessage != '') {
        return decodeURIComponent(errorMessage);
    }else {
        return 'This field is required';
    }
}

function checkIfTextFieldIsSet(valueEl, errorState, errorMessage, isRequired) {
    if(valueEl=='' && isRequired!= "false") {
        errorState.errOccured = true;
        errorState.errCount++;
        errorState.errMessage = processErrorMessageForRequiredFields(errorMessage);
    }
}

function isFormReadyToSubmit(errorCount) {
    if (errorCount== 0) {
        return true;
    } else {
        return false;
    }
}

function isMultipleInputType(inputType) {
    return (inputType == 'radio' || inputType == 'checkbox') ? true : false;
}

function areMultipleInputElementsPresent(multipleInputElements) {
    return Object.keys(multipleInputElements).length>0 ? true : false;
}

function validateInputChatLc5Numeric(valueEl, errorState) {
    if (valueEl !='' && (parseInt(valueEl)).toString() == 'NaN') {
        errorState.errOccured = true;
        errorState.errCount++;
    }
}

function validateInputChatLc5Text(valueEl,errorState) {
    var regex = /(.+)$/;
    if (valueEl !='' && regex.test(valueEl) == false) {
        errorState.errOccured = true;
        errorState.errCount++;
    }
}

function validateInputChatLc5Email(valueEl,errorState) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (valueEl !='' && regex.test(valueEl) == false) {
        errorState.errOccured = true;
        errorState.errCount++;
    }
}

function validateInputChatLc5WebAddress(valueEl,errorState) {
    var regex = /[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
    if (valueEl !='' && regex.test(valueEl) == false) {
        errorState.errOccured = true;
        errorState.errCount++;
    }
}

function validateInputChatLc5ReqularExpression(reqExpr,valueEl,errorState) {
    try {
        reqExpr = decodeURIComponent(reqExpr);
    } catch(e) {}

    var re = new RegExp(reqExpr);
    if (valueEl !='' && !valueEl.match(re)) {
        errorState.errOccured = true;
        errorState.errCount++;
    }
}

/* Print the chat log */
function printChat() {
    var chatWin = window.frames['chat-frame'].document.getElementById("chat-frame-body");
    var title = document.title;
    var iframe = document.getElementById('transcript');
    if(iframe) {
        var transcriptFrame = iframe;
    } else {
        transcriptFrame = document.createElement('IFRAME');
    }
    transcriptFrame.name = transcriptFrame.id = 'transcript';
    transcriptFrame.width = transcriptFrame.height = 0;
    transcriptFrame.src = 'about:blank';
    document.body.appendChild(transcriptFrame);
    var innerDoc  = (transcriptFrame.contentDocument) ? transcriptFrame.contentDocument : transcriptFrame.contentWindow.document;
    var contentHTML = "<html><head><title>" + title + "</title><style type=\"text/css\">p {font-family: Verdana,Arial;font-size:12px;line-height:130%;margin:0;padding:0;}</style></head><body>";
    contentHTML += chatWin.innerHTML;
    contentHTML += "</body></html>";
    innerDoc.write(contentHTML);
    innerDoc.close();
    transcript.focus();
    transcript.print();
}

var XMLHttpFactories = [
function () {
    return new XMLHttpRequest()
    },
function () {
    return new ActiveXObject("Msxml2.XMLHTTP")
    },
function () {
    return new ActiveXObject("Msxml3.XMLHTTP")
    },
function () {
    return new ActiveXObject("Microsoft.XMLHTTP")
    }
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

function checkEmail() {
// TODO>> Validate email format and prompt the user to enter the email again in order to avoid typos
}

function sendChatTranscript() {
    var req = createXMLHTTPObject();
    if (!req) return;
    req.open("POST", "../../sitescript/chat/sendChatTranscript.jsp", true);
    req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    var eventID = encodeURIComponent(COMM_CID);
    var accountID = encodeURIComponent(document.getElementById("accountID").value);
    var sessionID = encodeURIComponent(document.getElementById("sessionID").value);
    var email = encodeURIComponent(document.getElementById('boxemailaddress').value);
    var postData = "eventID="+eventID+"&accountID="+accountID+"&sessionID="+sessionID+"&email="+email;
    req.onreadystatechange = function() {
        onRequestReady(req);
    };
    req.send(postData);
}

function onRequestReady(httpRequest) {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            toggleDialog('messageboxemail', false,false);
            if (httpRequest.responseText == 1) {
                var sendEmailAlert = document.getElementById('sendemailalert').innerHTML;
                var email = document.getElementById('boxemailaddress').value;
                sendEmailAlert = sendEmailAlert.replace('[EMAIL_ADDRESS]', email);
                addChatLine(false, sendEmailAlert, true, false, SYS_MSG_OTHER);
                document.getElementById('inputBody').focus();
            } else {
            // error
            }
        } else {
            alert(httpRequest.status);
        }
    }
}

/* Open dialog window. */
function toggleDialog(dialogID, bool, isFromTitle) {
    var d		= document;
    

    var overlay	= d.getElementById('messageoverlay');
    var box		= d.getElementById(dialogID);
    /*if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
        box.style.top = '8%';
        box.style.left = '2%';
        box.style.width = '21%';
    }*/
    if (overlay && dialogID) {
        if (bool) {
            overlay.style.visibility	= 'visible';
            box.style.visibility		= 'visible';
            if (dialogID === 'messageboxemail') {
                document.getElementById('boxemailaddress').focus();
            }
        } else {
            overlay.style.visibility	= 'hidden';
            box.style.visibility		= 'hidden';
            try {
                document.getElementById('inputBody').focus();
            } catch (e) {}
        }
    }
}

/* Stop chat icon (in the toolbar). */
function stopChatIcon() {
    // Close the dialog. no matter stop chat was successful or not
    toggleDialog('messageboxclose', false,false);
    if (!pollMethod) {
        if (packetActive) {
            var size = 0;
            for (var i in packetActive) {
                size++;
            }
            if (size > 0) {
                // Build logout command.
                var win = window.open('','','width=1,height=1,left=0,top=0,scrollbars=no');
                var popUpsBlocked = true;
                if(win) {
                    popUpsBlocked = false;
                    win.close();
                }

                // Try removing the flash (if applicable).
                try {
                    LCWEBCAM.getFlash('SUBSCRIBER').media.streamStop();
                } catch(e) {}

                var obj				= new Object();
                obj.actType			= lc_protocol.JSON_CHAT;
                obj.actSubType		= lc_protocol.JSON_CHAT_STOPVISITOR;
                obj.sessID			= document.getElementById('sessionID').value;
                obj.popUpsBlocked	= popUpsBlocked;
                try {
                    if (popUpsBlocked) {
                        obj.popUpURL = buildPostChatURL();
                    }
                } catch (e) {}

                var param			= encodeURIComponent((lc_JSON.encode(obj)).toString());
            delete obj;

        // Send logout command.
        var el	= dc('script');
        el.src	= '../../sitescript/scgateway.jsp?JSON=[' + param + ']';
        document.body.appendChild(el);

                // Delay script execution.
                delayScript(400);

                // Remove unload event, disable inputs.
                chatStop();

                // Abort any ongoing requests.
                for (i in packetActive) {
                    packetActive[i].ob.abort();
                    delete packetActive[i];
                }
            }
        }
    } else {

        var obj = new Object();
        obj.actType			= lc_protocol.JSON_CHAT;
        obj.actSubType		= lc_protocol.JSON_CHAT_STOPVISITOR;
        obj.sessID			= document.getElementById('sessionID').value;
        var param			= encodeURIComponent((lc_JSON.encode(obj)).toString());
        delete obj;

        // Send logout command.
        var el	= dc('script');
        el.src	= '../../sitescript/scgateway.jsp?JSON=[' + param + ']';
        document.body.appendChild(el);

        // Delay script execution.
        delayScript(400);

        // Remove unload event, disable inputs.
        chatStop();

        // stop polling
        clearTimeout(dataPolling);
        dataPolling	= null;

    }
    /* Push post-chat if enabled */
    if (POST_CHAT_EXIST && POST_CHAT_OBTRUSIVE) {
        setTimeout(function(){
            window.location.href = buildPostChatURL();
        }, PC_OBTRUSIVE_DELAY);
    }
}

function checkIfActiveAndStopChat(){
    if(chatAccepted){
        toggleDialog('messageboxclose', true,false);
    }
    else{
        parent.postMessage('onlyCloseWindow', "*");
    }
}

function immediatelyStopChatIcon() {
    if(chatAccepted){
        parent.postMessage('removeMaxCookie', "*");
        toggleDialog('messageboxclose', false,false);
        if (stopInlineChatFromParent) {
            stopInlineChatFromParent();
            chatAccepted = false;
        }

        // kill session
        parent.postMessage('killSession', "*");
    }
    else{
        parent.postMessage('onlyCloseWindow', "*");
    }

    parent.postMessage('lc5UpdateWidget', "*");
}

function stopInlineChatFromParent() {
    var obj = new Object();
    obj.actType			= lc_protocol.JSON_CHAT;
    obj.actSubType		= lc_protocol.JSON_CHAT_STOPVISITOR;
    obj.sessID			= document.getElementById('sessionID').value;
    var param			= encodeURIComponent((lc_JSON.encode(obj)).toString());
    delete obj;

    // Send logout command.
    var el	= dc('script');
    el.src	= '../../sitescript/scgateway.jsp?JSON=[' + param + ']';
    document.body.appendChild(el);


    // Delay script execution.
    delayScript(400);


    // Remove unload event, disable inputs.
    chatStop();

    // stop polling
    clearTimeout(dataPolling);
    dataPolling	= null;
}

function soundAlertEnabledToggle() {
    soundAlertEnabled = soundAlertEnabled ? false : true;
    var button = document.getElementById('soundAlertButton');
    var index = button.src.indexOf('sound.png');
    if (index == -1) {
        index = button.src.indexOf('sound_mute.png');
    }
    if (soundAlertEnabled) {
        button.src = button.src.substring(0, index) + 'sound.png';
    } else {
        button.src = button.src.substring(0, index) + 'sound_mute.png';
    }
}

// Send error log to server if receiving error state other than 200.
function lc_send_error_log(errNo, msg) {
    lastFunctionCall = 'LC - lc_send_error_log()';

    // Create JSON string.
    var obj				= new Object();
    obj.actType			= lc_protocol.JSON_CONNECTIVITY;
    obj.actSubType		= lc_protocol.JSON_CONN_ERRLOG;
    obj.sessID			= document.getElementById('sessionID').value;
    obj.errorNo			= errNo;
    obj.msg				= msg;
    obj.totalSent       = packetsSent;
    obj.totalRetries	= packetsFailedTotal;

    // Set to comm buffer.
    lc_setCommBuffer(lc_JSON.encode(obj));
    delete obj;
}

// Get element coordinates.
function getCumulativeOffset(obj) {
    var left, top;
    left = top = 0;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top  += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [left, top];
}

function AnchorPosition_getPageOffsetLeft (el) {
    var ol=el.offsetLeft;
    while ((el=el.offsetParent) != null) {
        ol += el.offsetLeft;
    }
    return ol;
}

function AnchorPosition_getWindowOffsetLeft (el) {
    return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
}

function AnchorPosition_getPageOffsetTop (el) {
    var ot=el.offsetTop;
    while((el=el.offsetParent) != null) {
        ot += el.offsetTop;
    }
    return ot;
}

function AnchorPosition_getWindowOffsetTop (el) {
    return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
}

function getAnchorPosition(anchorname) {
    // This function will return an Object with x and y properties
    var useWindow=false;
    var coordinates=new Object();
    var x=0,y=0;
    // Browser capability sniffing
    var use_gebi=false, use_css=false, use_layers=false;
    if (document.getElementById) {
        use_gebi=true;
    }
    else if (document.all) {
        use_css=true;
    }
    else if (document.layers) {
        use_layers=true;
    }
    // Logic to find position
    if (use_gebi && document.all) {
        x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
        y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
    }
    else if (use_gebi) {
        var o=document.getElementById(anchorname);
        x=AnchorPosition_getPageOffsetLeft(o);
        y=AnchorPosition_getPageOffsetTop(o);
    }
    else if (use_css) {
        x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
        y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
    }
    else if (use_layers) {
        var found=0;
        for (var i=0; i<document.anchors.length; i++) {
            if (document.anchors[i].name==anchorname) {
                found=1;
                break;
            }
        }
        if (found==0) {
            coordinates.x=0;
            coordinates.y=0;
            return coordinates;
        }
        x=document.anchors[i].x;
        y=document.anchors[i].y;
    }
    else {
        coordinates.x=0;
        coordinates.y=0;
        return coordinates;
    }
    coordinates.x=x;
    coordinates.y=y;
    return [coordinates.x, coordinates.y];
}

// Get computed height of an element.
function getComputedHeight(theElt){
    var tmphght = 0;
    if (document.all){
        tmphght = document.getElementById(theElt).offsetHeight - 8;
    } else{
        var docObj		= document.getElementById(theElt);
        var tmphght1	= document.defaultView.getComputedStyle(docObj, "").getPropertyValue("height");
        tmphght			= tmphght1.split('px');
        tmphght			= tmphght[0];
    }
    return tmphght;
}

// Build emoticons content.
function buildEmoticons() {
    if (enableEmoticon) {
        var html = '';
        if (LC_EMOTICONS && LC_EMOTICONS.items && LC_EMOTICONS.items.length > 0) {
            for (var i = 0; i < LC_EMOTICONS.items.length; i++) {
                html += '<div title="' + LC_EMOTICONS.items[i].key + '" class="emoticon-item-box"><img class="emoticon-item" src="' + LC_EMOTICONS.items[i].url + '" key="' + LC_EMOTICONS.items[i].key + '" /></div>';
            }
        }
        if (html !== '') {
            html += '<br class="clear" />';
        }

        // Adjust row height.
        var row = document.getElementById('chat-com-bar');
        var td	= document.getElementById('chat-com-bar-td');
        if (row && td) {
            row.setAttribute('height', '34px');
            td.setAttribute('height', '34px');
        }

        // Adjust bar class.
        var bar = document.getElementById('chat-info-bar');
        if (bar) {
            bar.className = 'chatinfobar';
        }

        // Show the button.
        var btn = document.getElementById('emoticon-button');
        if (btn) {
            btn.style.display = '';
        }

        var el = document.getElementById('emoticon-container');
        if (el) {
            el.innerHTML = html;
            processEmoticons();
        }
    }
}

// Show emoticons box.
function showEmoticons(e) {
    var coor	= getAnchorPosition('emoticon-button');
    var x		= coor[0];
    var y		= coor[1];
    var box		= document.getElementById('emoticon-container');
    if (box) {
        if (box.style.visibility == 'hidden') {
            var boxHeight			= getComputedHeight('emoticon-container');
            box.style.bottom		= '80px'; //(y - boxHeight - 9) + 'px';
            box.style.right			= '55px'; //x + 'px';
            box.style.visibility	= 'visible';
            toggleEmoticons();
        } else {
            hideEmoticons();
        }
    }
}

// Hide emoticons.
function hideEmoticons() {
    try {
        var box	= document.getElementById('emoticon-container');
        if (box) {
            box.style.bottom		= '-1000px';
            box.style.right			= '-1000px';
            box.style.visibility	= 'hidden';
            if (window.attachEvent) {
                document.detachEvent('onclick', hideEmoticons);
            } else {
                document.removeEventListener('click', hideEmoticons, false);
            }
        }
    } catch(e) {}
}

// Toggle emoticons events.
function toggleEmoticons() {
    var box	= document.getElementById('emoticon-container');
    if (box && box.style.visibility == 'visible') {
        setTimeout(function() {
            if (window.attachEvent) {
                document.attachEvent('onclick', hideEmoticons);
            } else {
                document.addEventListener('click', hideEmoticons, false);
            }
        }, 200);
    }
}

// Add effects and events on emoticons.
function processEmoticons() {
    var box = document.getElementById('emoticon-container');
    if (box) {
        var imgs = box.getElementsByTagName('img');
        if (imgs.length > 0) {
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                img.onmouseover = function() {
                    this.parentNode.className += ' emoticon-item-hover';
                };
                img.onmouseout = function() {
                    this.parentNode.className = 'emoticon-item-box';
                };
                img.onclick = function() {
                    var input = document.getElementById('inputBody');
                    if (!input.disabled) {
                        var key = this.getAttribute('key');
                        if (input.value === '') {
                            input.value += key;
                        } else {
                            input.value += ' ' + key;
                        }
                        input.focus();
                    }
                };
            }
        }
    }
}

function buildFileUploadIcon(){
    if(!fileuploadbutton) {
        hideFileUploadIcon();
    }
}

//hideFileuploadicon function included seperately
function hideFileUploadIcon() {
    document.getElementById("messageboxfileupload").style.opacity = '0';
    document.getElementById("messageboxfileupload").style.display = 'none';
    document.getElementById("messageboxfileupload").style.top = '-1000px';
    document.getElementById("messageboxfileupload").style.left = '-1000px';
}

// send (sync)requset to server to start reload timer
function chatWinReload() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (xhr) {
        var aID = document.getElementById('accountID').value;
        var cID = document.getElementById('sessionID').value;
        var req = {
            method	: 'chat.pageReload',
            params	: {
                accountId	: aID,
                ecid		: cID
            },
            id		: (new Date()).getTime()
        };
        var url = location.protocol + '//' + location.hostname + '/api/handler/chat/1.0/?';
        url += encodeURIComponent(lc_JSON.encode(req));
        xhr.open('GET', url, false);
        xhr.send(null);
    }
}

/** UTILITIES */
function createElement(document, type, keyVals) {
    var el = document.createElement(type);
    for (var key in keyVals) {
        if (typeof(key) === 'string' && typeof(keyVals[key]) === 'string') {
            el.setAttribute(key, keyVals[key]);
        }
    }
    return el;
}

function finishFileUpload(newFiles) {
    // Reset the form.
    var frm = dg('fileuploadform');
    frm.reset();

    //LSM 965 CALL AGENT FILE UPLOAD STATUS TO DISPLAY STATUS MESSAGE TO AGENT
    notifyAgentFileUploadStatus();
    //write the file uploaded link in the chat
    for(var i = 0, iLen = newFiles.length; i < iLen; i++) {
        notifyAgentFileUpload(newFiles[i].fileID, newFiles[i].fileName);
    }
}

function checkFileIssues(formid,fileid,buttonid) {
    document.getElementById("agentid").value = uAgentTmp.id;
    var message = this.checkFileExt(fileid);
    if(message == 'OK') {
        message = this.checkFileSize(fileid,5);
        if(message == 'OK') {
            document.getElementById(formid).submit();
        } else {
            alert(message);
        }
    } else {
        alert(message);
    }
}

function checkFileExt(fileid) {
    extlist = [".asp", ".bas", ".bat", ".chm", ".cmd", ".com", ".exe", ".hlp", ".hta", ".inf", ".isp",
        ".js", ".jse", ".lnk", ".msi", ".mst", ".pcd", ".pif", ".reg", ".scr", ".url", ".vbe", ".vbs",
        ".ws", ".wsh", ".ad", ".adp", ".crt", ".ins", ".mdb", ".mde", ".msc", ".msp", ".sct", ".shb",
        ".vb", ".wsc", ".wsf", ".cpl", ".shs", ".vsd", ".vst", ".vss", ".vsw"];
    var file = document.getElementById(fileid).files[0];
    if(file) {
        var ext = file.name.substr(file.name.lastIndexOf('.'),file.name.length).toLowerCase();
        if(ext && ext.length > 0) {
            for (var index = 0; index < extlist.length; ++index) {
                if(ext == extlist[index].toLowerCase()) return 'File type '+ext+' not allowed';
            }
        }
    }
    return 'OK';
}

function checkFileSize(fileid, limitMb) {
    var bytesInMb = 1048576;
    var limit = limitMb * bytesInMb;
    var file = document.getElementById(fileid).files[0];
    if(file) {
        if(file.size > limit) {
            return 'Maximum file size allowed is '+Math.ceil(limit/bytesInMb)+' MB (selected file size '+Math.ceil(file.size/bytesInMb)+' MB)';
        }
    }
    return 'OK';
}

function lightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}