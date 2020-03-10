var AOP = AOP || {};

AOP.initCounterReporter = function (settings) {
  settings = settings || {};

  var apiUrl = settings.apiUrl;
  var apiKey = settings.apiKey;

  var staticPayload = {
    platformIdentifier: 'core',
    applicationId: settings.applicationId,
    identities: settings.identities,
    sessionId: settings.sessionId
  };

  var canSend = (apiUrl && apiKey && !AOP.isAssumingIdentity) ? true : false;
  // only add counter if keys are set
  if (canSend) {
    $.cupEvent.addSubscriber('COUNTER', {
      onEvent: function (event, callback) {
        // Set the eventType to empty if not passed in. Otherwise it will inherit the last used event type.
        event.eventType = event.eventType || '';
        var eventPayload = JSON.stringify($.extend(staticPayload, event));
        var headers = {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        };

        $.ajax({
          url: apiUrl,
          type: 'POST',
          headers: headers,
          data: eventPayload
        }).done(callback)
          .fail(function (status, statusText, response) {
            var error = {
              'Status': status,
              'StatusText': statusText,
              'Response': response
            };
            callback(error);
          });
      }
    });
  }
};

if (window.AOP.env === 'dev') {
  $.cupEvent.addSubscriber('TEST', {
    onEvent: function (e, cb) {
      console.log('TEST event handler', JSON.stringify(e));
      cb();
    }
  });
}
