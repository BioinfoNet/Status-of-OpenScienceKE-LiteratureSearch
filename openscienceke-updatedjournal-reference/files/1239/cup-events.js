(function ($) {
  $.extend($, {
    cupEvent: {
      version: '1.0.0',
      initialized: false,
      uuid: new Date().getTime()
    }
  });

  function Events() {
    this.subscribers = []; //To hold listeners of events in the system
    this.markerClassName = 'hasEvent';
  }

  $.extend(Events.prototype, {
    // TODO rename to "widget" when switching to widget factory
    addSubscriber: function (name, subscriber) {
      //console.log('new subscriber [' + name + '] has been registered', subscriber);
      this.subscribers.push(subscriber);
    },

    /* This is used by boot upAttach the events to a jQuery selection.
     * @param  target	element - the target input field or division or span
     * @param  event event - The targets event we're interested in listening to
     * @param  settings  object - override settings to use on this event recording sequence (alternatives are data attrs)
     */
    attachEvents: function (el) {
      var $el = $(el);
      $el.addClass(this.markerClassName);
      if ($el.is('a')) {
        $el.click($.proxy(function (event) {
          var eventPayload = $el.data('cupEvent');
          if (eventPayload) {
            this.checkDisabledOnHide($el);
            this.dispatchEvent(eventPayload);
          }
        }, this));
      }
    },
    /**
     * Check if the given element should not fire an event when hiding content. Eg, I'm toggling an
     * article abstract in a listing. The event should be captured revealing the abstract, but not
     * when hiding the abstract.
     * Look for the "data-cup-event-disable-on-hide" element attribute to determine if this check should be done.
     * @param $el
     */
    checkDisabledOnHide: function ($el) {
      // Don't disable dispatch if no attribute set
      if (!$el.data('cupEventDisableOnHide')) {
        return;
      }
      // Add an attribute to the element to track if the content is displayed/hidden
      var contentVisible = $el.data('content-visible');
      if (typeof contentVisible === 'undefined') {
        // Default to hidden/false
        contentVisible = false;
      }
      // Toggle visibility flag
      $el.data('content-visible', !contentVisible);
      // Get event object & add toggle disableDispatch property
      var eventDataJson = $el.data('cupEvent');
      if (typeof eventDataJson === 'object') {
        // Disable event dispatch if the content is visible and this click is hiding it
        eventDataJson.disableDispatch = contentVisible;
      }
    },
    /**
     * Dispatch an event to all current listeners of the events framework.
     * @param event
     * @param callback
     */
    dispatchEvent: function (event, callback) {

      // Check if the event is disabled
      if (event.disableDispatch) {
        return;
      }

      // this calls the callback should events not return in time
      var calledBack = false;
      var numberOfSubscribers = this.subscribers.length;
      var numberOfCallbacks = 0;

      function dispatch() {
        if (callback && !calledBack) {
          callback();
          calledBack = true;
        }
      }

      // start the race! -- this will get called if the subscribers don't callback in time!
      setTimeout(function () {
        dispatch(true);
      }, 3000);

      this.subscribers.forEach(function (subscriber) {
        subscriber.onEvent.call(this, event, function (err, res) {
          numberOfCallbacks++;
          if (numberOfCallbacks === numberOfSubscribers) {
            dispatch();
          }
        });
      });
    }
  });


  /* Invoke the events functionality.
   @param  options  string - a command, optionally followed by additional parameters or
   Object - settings for attaching new event functionality
   @return  jQuery object */
  $.fn.cupEvent = function () {
    $(this).find('[data-cup-event]').not('.hasEvent').each(function (i, el) {
      $.cupEvent.attachEvents(el);
    });
  };

  $.cupEvent = new Events(); // singleton instance
  return $.cupEvent;
})(jQuery);

