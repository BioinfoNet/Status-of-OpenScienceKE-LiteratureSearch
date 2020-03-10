(function () {
  var q = window.pushpad.q || [];
  var _ = {
    projectId: null,
    options: {},
    uid: null,
    replaceTags: null,
    clientPushAPI: null,
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
    }
  };
  window.pushpad = function () {
    publicMethods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
  };
  q.forEach(function (command) {
    window.pushpad.apply(this, command);
  });
})();
