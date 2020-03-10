(function () {
  var q = window.pushpad.q || [];
  var _ = {
    projectId: null,
    options: {},
    uid: null,
    replaceTags: null,
    clientPushAPI: null,
    getWidgetSettings: function (projectId) {
      return new Promise(function (resolve, reject) {
        var request = new Request('https://pushpad.xyz/projects/' + projectId + '/widget_settings.json');
        fetch(request).then(function (response) {
          response.json().then(function (json) {
            resolve(json);
          });
        });
      });
    },
    getApplicationServerKey: function (projectId) {
      return new Promise(function (resolve, reject) {
        var request = new Request('https://pushpad.xyz/projects/' + projectId + '/application_server_key');
        fetch(request).then(function (response) {
          response.text().then(function (hex) {
            resolve(_.hexToArrayBuffer(hex));
          });
        });
      });
    },
    hexToArrayBuffer: function (hex) {
      var strBytes = hex.match(/.{2}/g);
      var bytes = new Uint8Array(strBytes.length);
      for (var i = 0; i < strBytes.length; i++) {
        bytes[i] = parseInt(strBytes[i], 16)
      }
      return bytes;
    },
    sendSubscriptionToServer: function (projectId, subscription, uid, tags, updateOnly) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            if (req.status === 201 || req.status === 204) {
              resolve();
            } else {
              if (req.status === 403) {
                reject('Server returned a 403 Forbidden status: this probably means that uid signature is missing or wrong, or someone tried to tamper the request.');
              }
              reject('Got status code ' + req.status + ' while sending subscription to server.');
            }
          }
        }
        req.open(updateOnly ? 'PATCH' : 'POST', 'https://pushpad.xyz/projects/' + projectId + '/subscription', true);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.setRequestHeader('Accept', 'application/json');
        req.send(_.buildQueryString(subscription.endpoint, subscription, uid, tags));
      });
    },
    removeSubscriptionFromServer: function (projectId, subscription, uid, tags) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            if (req.status === 204) {
              resolve();
            } else {
              reject('Got status code ' + req.status + ' while removing subscription from server.'); 
            }
          }
        };
        req.open('DELETE', 'https://pushpad.xyz/projects/' + projectId + '/subscription', true);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.setRequestHeader('Accept', 'application/json');
        req.send(_.buildQueryString(subscription.endpoint, null, uid, tags));
      });
    },
    getSubscriptionFromServer: function (projectId, subscription) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            if (req.status === 200) {
              resolve(JSON.parse(req.responseText));
            } else {
              reject('Got status code ' + req.status + ' while getting subscription status from server.');
            }
          }
        }
        req.open('GET', 'https://pushpad.xyz/projects/' + projectId + '/subscription/status?' + _.buildQueryString(subscription.endpoint), true);
        req.setRequestHeader('Accept', 'application/json');
        req.send();
      });
    },
    getSubscription: function () {
      return _.clientPushAPI.getSubscription();
    },
    subscribe: function (projectId) {
      return _.clientPushAPI.subscribe(projectId);
    },
    denied: function () {
      return _.clientPushAPI.denied();
    },
    buildQueryString: function (endpoint, subscription, uid, tags) {
      var queryString = 'endpoint=' + encodeURIComponent(endpoint);
      if (subscription && typeof subscription.toJSON === 'function') {
        queryString += '&p256dh=' + subscription.toJSON().keys.p256dh;
        queryString += '&auth=' + subscription.toJSON().keys.auth;
      }
      if (uid) {
        if (uid === true) {
          queryString += '&uid=true';
        } else {
          queryString += '&uid=' + encodeURIComponent(uid.value);
          queryString += '&uid_signature=' + encodeURIComponent(uid.signature);
        }
      }
      if (tags) {
        (tags.tags || []).concat(tags.replaceTags || []).forEach(function (tag) {
          queryString += '&tags[]=' + encodeURIComponent(tag);
        });
        if (tags.replaceTags) {
          queryString += '&replace_tags=true';
        }
      }
      return queryString;
    },
    getUidFromOptions: function (options) {
      if (!options.uid) return null;
      if (!options.uidSignature) throw "You have set an uid but not its uidSignature.";
      return { value: options.uid, signature: options.uidSignature };
    },
    documentReady: function (callback) {
      if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    },
    parseDuration: function (duration) {
      var unitsInSeconds = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2629746, year: 31556952 };
      var valueAndUnit = duration.split(' ', 2);
      var value = parseInt(valueAndUnit[0]);
      var unit = valueAndUnit[1].slice(-1) == 's' ? valueAndUnit[1].slice(0, -1) : valueAndUnit[1];
      return value * unitsInSeconds[unit] * 1000;
    },
    shouldPromptAgain: function (promptFrequency) {
      var dismissedAt = window.localStorage.getItem('pushpadPromptDismissedAt');
      if (!dismissedAt) return true;
      return Date.now() - parseInt(dismissedAt) >= _.parseDuration(promptFrequency);
    },
    createPrompt: function (options) {
      var prompt = document.createElement('div');
      prompt.setAttribute('id', 'pushpad-prompt');
      prompt.style.all = 'initial';
      prompt.style.zIndex = 9999;
      prompt.style.position = 'fixed';
      prompt.style.bottom = 0;
      options.promptPosition == 'right' ? prompt.style.right = 0 : prompt.style.left = 0;
      prompt.style.maxWidth = '30em';
      prompt.style.padding = '1.5em';
      prompt.style.margin = window.matchMedia('(min-width: 30em)').matches ? options.margin : '0';
      prompt.style.border = '1px solid rgba(0, 0, 0, 0.2)';
      prompt.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.2)';
      prompt.style.background = 'white';
      prompt.style.textAlign = 'right';
      var promptTitle = document.createElement('h1');
      promptTitle.textContent = options.promptTitle;
      promptTitle.style.all = 'initial';
      promptTitle.style.display = 'block';
      promptTitle.style.marginBottom = '1em';
      promptTitle.style.fontSize = '1em';
      promptTitle.style.fontFamily = options.fontFamily;
      promptTitle.style.fontWeight = 'bold';
      promptTitle.style.textAlign = 'left';
      prompt.appendChild(promptTitle);
      var promptMessage = document.createElement('p');
      promptMessage.textContent = options.promptMessage;
      promptMessage.style.all = 'initial';
      promptMessage.style.display = 'block';
      promptMessage.style.fontSize = '1em';
      promptMessage.style.fontFamily = options.fontFamily;
      promptMessage.style.textAlign = 'left';
      prompt.appendChild(promptMessage);
      var promptDismiss = document.createElement('button');
      promptDismiss.setAttribute('id', 'pushpad-prompt-dismiss');
      promptDismiss.textContent = options.promptDismiss;
      promptDismiss.style.all = 'initial';
      promptDismiss.style.fontSize = '1em';
      promptDismiss.style.fontFamily = options.fontFamily;
      promptDismiss.style.textTransform = 'uppercase';
      promptDismiss.style.color = 'gray';
      promptDismiss.style.marginTop = '1.5em';
      promptDismiss.style.cursor = 'pointer';
      promptDismiss.style.textAlign = 'right';
      promptDismiss.style.border = 'none';
      promptDismiss.style.background = 'none';
      prompt.appendChild(promptDismiss);
      var promptButton = document.createElement('button');
      promptButton.setAttribute('id', 'pushpad-prompt-button');
      promptButton.textContent = options.promptButton;
      promptButton.style.all = 'initial';
      promptButton.style.fontSize = '1em';
      promptButton.style.fontFamily = options.fontFamily;
      promptButton.style.fontWeight = 'bold';
      promptButton.style.textTransform = 'uppercase';
      promptButton.style.color = options.promptButtonColor;
      promptButton.style.marginTop = '1.5em';
      promptButton.style.marginLeft = '2em';
      promptButton.style.cursor = 'pointer';
      promptButton.style.textAlign = 'right';
      promptButton.style.border = 'none';
      promptButton.style.background = 'none';
      prompt.appendChild(promptButton);
      prompt.style.display = 'none';
      document.querySelector('body').appendChild(prompt);
    },
    createBell: function (options) {
      var bell = document.createElement('button');
      bell.setAttribute('id', 'pushpad-bell');
      bell.style.zIndex = 9998;
      bell.style.position = 'fixed';
      bell.style.bottom = '0';
      options.bellPosition == 'right' ? bell.style.right = 0 : bell.style.left = 0;
      bell.style.margin = options.margin;
      bell.style.width = options.bellSize;
      bell.style.height = options.bellSize;
      bell.style.background = 'initial';
      bell.style.backgroundColor = options.bellBackgroundColor;
      bell.style.backgroundImage = 'url("https://pushpad.xyz/icons/widget-bell.png")';
      bell.style.backgroundPosition = 'center';
      bell.style.backgroundSize = '50%';
      bell.style.backgroundRepeat = 'no-repeat';
      bell.style.border = 'none';
      bell.style.borderRadius = '50%';
      bell.style.boxShadow = '0 0 30px 5px rgba(0, 0, 0, 0.2)';
      bell.style.cursor = 'pointer';
      bell.style.display = 'none';
      document.querySelector('body').appendChild(bell);
    },
    createButton: function (options) {
      var button = document.createElement('button');
      button.setAttribute('id', 'pushpad-button');
      button.style.all = 'initial';
      button.style.padding = options.buttonPadding;
      button.style.fontSize = options.buttonFontSize;
      button.style.fontFamily = options.fontFamily;
      button.style.border = 'none';
      button.style.borderRadius = '.5em';
      button.style.cursor = 'pointer';
      button.style.display = 'none';
      var buttonContainer = document.querySelector(options.buttonContainer);
      buttonContainer.style.all = 'initial';
      buttonContainer.style.display = 'inline-block';
      buttonContainer.appendChild(button);
    }
  };
  var pushApi = {
    detected: function () {
      return 'PushManager' in window;
    },
    init: function () {
      pushApi.registerServiceWorker();

      pushApi.migrateKeys();
    },
    // temporary migration to collect p256dh and auth for legacy subscriptions
    migrateKeys: function () {
      if (localStorage.getItem('pushpadMigrateKeys') === 'done') return;
      pushApi.getSubscription().then(function (subscription) {
        if (subscription === null) {
          localStorage.setItem('pushpadMigrateKeys', 'done');
          return;
        }
        fetch('https://pushpad.xyz/pushsubscriptionchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            old_endpoint: subscription.endpoint,
            new_endpoint: subscription.endpoint,
            new_p256dh: subscription.toJSON().keys.p256dh,
            new_auth: subscription.toJSON().keys.auth
          })
        }).then(function () {
          localStorage.setItem('pushpadMigrateKeys', 'done');
        });
      });
    },
    denied: function () {
      return Notification.permission === 'denied';
    },
    registerServiceWorker: function () {
      if (_.options.serviceWorkerPath === null) return;
      navigator.serviceWorker.register(_.options.serviceWorkerPath, { updateViaCache: 'none' });
    },
    getSubscription: function () {
      return new Promise(function (resolve) {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.getSubscription().then(resolve);
        });
      });
    },
    subscribe: function (projectId) {
      return new Promise(function (resolve) {
        _.getApplicationServerKey(projectId).then(function (applicationServerKey) {
          navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey
            }).then(function (subscription) {
              resolve(subscription);
            }).catch(function (error) {
              console.log(error);
              resolve(null);
            });
          });
        });
      });
    }
  };
  var apns = {
    detected: function () {
      return 'safari' in window && 'pushNotification' in window.safari;
    },
    init: function () {
      
    },
    denied: function () {
      return window.safari.pushNotification.permission(apns.reverseDomain()).permission === 'denied';
    },
    getSubscription: function () {
      return new Promise(function (resolve) {
        var permission = window.safari.pushNotification.permission(apns.reverseDomain());
        resolve(permission.permission === 'granted' ? { endpoint: 'apns://' + permission.deviceToken } : null);
      });
    },
    subscribe: function (projectId) {
      return new Promise(function (resolve) {
        window.safari.pushNotification.requestPermission('https://pushpad.xyz/apns', apns.reverseDomain(), {'project_id': projectId.toString()} , function () { 
          apns.getSubscription().then(resolve);
        });
      });
    },
    reverseDomain: function () {
      var hostname = _.options['hostname'] || window.location.hostname;
      return hostname.split('.').concat('web').reverse().join('.');
    }
  };
  var publicMethods = {
    init: function (projectId, options) {
      _.projectId = projectId;
      _.options = options || {};
      if (typeof _.options.apns === 'undefined') {
        _.options.apns = true;
      }
      if (typeof _.options.serviceWorkerPath === 'undefined') {
        _.options.serviceWorkerPath = '/service-worker.js';
      }
      if (pushApi.detected()) {
        _.clientPushAPI = pushApi;
      } else if (_.options.apns && apns.detected()) {
        _.clientPushAPI = apns;
      }
      if (_.clientPushAPI) _.clientPushAPI.init();
    },
    uid: function (uid, uidSignature) {
      if (!_.clientPushAPI) return;
      _.uid = uid ? { value: uid, signature: uidSignature } : null;
      if (!_.projectId) return;
      _.getSubscription().then(function (subscription) {
        if (subscription === null) return;
        _.sendSubscriptionToServer(_.projectId, subscription, _.uid, null, true);
      });
    },
    tags: function (replaceTags) {
      if (!_.clientPushAPI) return;
      _.replaceTags = replaceTags;
      if (!_.projectId) return;
      _.getSubscription().then(function (subscription) {
        if (subscription === null) return;
        _.sendSubscriptionToServer(_.projectId, subscription, null, { replaceTags: _.replaceTags }, true);
      });
    },
    status: function(callback, options) {
      if (!_.clientPushAPI) return;
      var options = options || {};
      var projectId = options.projectId || _.projectId;
      if (_.denied()) { 
        callback(false);
        return;
      }
      _.getSubscription().then(function (subscription) {
        if (subscription === null) {
          callback(false);
          return;
        }
        _.getSubscriptionFromServer(projectId, subscription).then(function (subscription) {
          subscription === null ? callback(false) : callback(true, subscription['tags'], subscription['uid']);
        });
      });
    },
    subscribe: function (callback, options) {
      if (!_.clientPushAPI) return;
      var options = options || {};
      var projectId = options.projectId || _.projectId;
      var uid = _.getUidFromOptions(options) || _.uid;
      var tags = { tags: options.tags, replaceTags: options.replaceTags || _.replaceTags };
      if (tags.tags && tags.replaceTags)
        throw "You cannot use the tags option if you use replaceTags or if you have set tags globally.";
      if (_.denied()) {
        if (callback && callback.length > 0) { callback(false); }
        return;
      }
      _.subscribe(projectId).then(function (subscription) {
        if (subscription === null) {
          if (callback && callback.length > 0) { callback(false); }
          return;
        }
        _.sendSubscriptionToServer(projectId, subscription, uid, tags).then(function () {
          if (callback) { callback(true); }
        });
      });
    },
    unsubscribe: function (callback, options) {
      if (!_.clientPushAPI) return;
      var options = options || {};
      var projectId = options.projectId || _.projectId;
      _.getSubscription().then(function (subscription) {
        if (subscription === null) {
          if (callback) { callback(); }
          return;
        }
        _.removeSubscriptionFromServer(projectId, subscription, options.uid, { tags: options.tags }).then(function () {
          if (callback) { callback(); }
        });
      });
    },
    unsupported: function (callback) {
      if (!_.clientPushAPI) {
        callback();
      }
    },
    widget: function (options) {
      if (!_.clientPushAPI) return;
      
      var widgets = {
        all: [
          // prompt
          {
            init: function () {
              _.createPrompt(options);
              document.querySelector('#pushpad-prompt-button').addEventListener('click', function () {
                widgets.subscribe();
              });
              document.querySelector('#pushpad-prompt-dismiss').addEventListener('click', function () {
                window.localStorage.setItem('pushpadPromptDismissedAt', Date.now());
                widgets.setStatus(false);
              });
            },
            setStatus: function (isSubscribed) {
              if (!options.prompt || isSubscribed || !_.shouldPromptAgain(options.promptFrequency))
                document.querySelector('#pushpad-prompt').style.display = 'none';
              else
                document.querySelector('#pushpad-prompt').style.display = 'block';
            }
          },
          // bell
          {
            init: function () {
              _.createBell(options);
              document.querySelector('#pushpad-bell').addEventListener('click', function() {
                widgets.subscribe();
              });
            },
            setStatus: function (isSubscribed) {
              if (!options.bell || isSubscribed)
                document.querySelector('#pushpad-bell').style.display = 'none';
              else
                document.querySelector('#pushpad-bell').style.display = 'block';
            }
          },
          // button
          {
            init: function () {
              if (!options.button || !document.querySelector(options.buttonContainer)) return;
              _.createButton(options);
              document.querySelector('#pushpad-button').addEventListener('click', function() {
                if (document.querySelector('#pushpad-button').dataset.action == 'unsubscribe')
                  widgets.unsubscribe();
                else
                  widgets.subscribe();
              });
            },
            setStatus: function (isSubscribed) {
              var button = document.querySelector('#pushpad-button');
              if (!options.button || !button) return;
              if (isSubscribed) {
                button.dataset.action = options.buttonUnsubscribe ? 'unsubscribe' : 'subscribe';
                button.style.color = options.buttonSubscribedColor;
                button.style.backgroundColor = options.buttonSubscribedBackgroundColor;
                button.textContent = options.buttonSubscribed;
              } else {
                button.dataset.action = 'subscribe';
                button.style.color = options.buttonColor;
                button.style.backgroundColor = options.buttonBackgroundColor;
                button.textContent = options.buttonSubscribe;
              }
              button.style.display = 'inline-block';
            }
          }
        ],
        init: function () {
          _.documentReady(function () {  
            widgets.all.forEach(function (w) { w.init(); });
            widgets.initStatus();
          });
        },
        initStatus: function () {
          if (window.sessionStorage.getItem('pushpad-status') === null)
            pushpad('status', function (isSubscribed) { widgets.setStatus(isSubscribed); });
          else
            widgets.setStatus(window.sessionStorage.getItem('pushpad-status') == 'true');
        },
        setStatus: function (isSubscribed) {
          window.sessionStorage.setItem('pushpad-status', isSubscribed.toString());
          widgets.all.forEach(function (w) { w.setStatus(isSubscribed); });
        },
        subscribe: function () {
          pushpad('subscribe', function (isSubscribed) {
            widgets.setStatus(isSubscribed);
            if (!isSubscribed) widgets.permissionDeniedAlert();
          });
        },
        unsubscribe: function () {
          pushpad('unsubscribe', function () {
            widgets.setStatus(false);
          });
        },
        permissionDeniedAlert: function () {
          alert(options.deniedTitle + "\n" + options.deniedMessage);
        }
      };
      _.getWidgetSettings(_.projectId).then(function (widgetSettings) {
        options = Object.assign(widgetSettings, options || {});
        widgets.init();
      });
    }
  };
  window.pushpad = function () {
    publicMethods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
  };
  q.forEach(function (command) {
    window.pushpad.apply(this, command);
  });
})();
