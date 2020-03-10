/* global ga */

var AOP = AOP || {};

/* Generic Functionality
 * - init - initialise page
 * - initEventClickLinks - initialise any anchor containing required `data-ga-event-label` attributes - initialised onload
 * - sendGaTrackingEvent - generic action to send event - can be called anywhere
 * */
AOP.gaEvents = {

  dom: {
    eventClickLinks: null,
    eventClickButtons: null
  },

  init: function () {
    /*
     * This file will be expanded to take in all the analytic event tickets but currently provides the functionality for
     * - track generic link clicks based on data-ga-event-label attribute. See initEventClickLinks
     * - track public kbart download events - generic link functionality
     * - track mycore kbart download events - bespoke - AOP.gaEvents.mycore.initMyCoreKbartDownload
     * - track use of COUNTER reports - bespoke - AOP.gaEvents.mycore.initMyCoreCounterDownload
     * - track send to kindle over 10mb file failures - bespoke - AOP.gaEvents.sendto
     */
    AOP.gaEvents.initEventClickLinks();
    AOP.gaEvents.mycore.initMyCoreCounterDownload();
    AOP.gaEvents.mycore.scanMyCoreCounterErrors();

  },

  setState: function (action, status) {
    // this will return the current state of the event
    // expand this if there will be other states for other elements
    var APPLIED = '_applied';
    var REMOVED = '_removed';
    return action + (status ? APPLIED : REMOVED);
  },

  initEventClickLinks: function () {
    this.dom.eventClickLinks = $('[data-ga-event-label]');
    this.dom.eventClickLinks.off('click.gaEvents').on('click.gaEvents', function () {
      var action = $(this).attr('data-ga-check-state') ? AOP.gaEvents.setState($(this).attr('data-ga-event-action'), $(this).is(':checked')) : $(this).attr('data-ga-event-action');
      var cat = $(this).attr('data-ga-event-cat');
      var label = $(this).attr('data-ga-event-label') || '';
      var value = $(this).attr('data-ga-event-value');
      AOP.gaEvents.sendGaTrackingEvent(cat, action, label, value);
    });
  },


  sendGaTrackingEvent: function (eventCategory, eventAction, eventLabel, eventValue) {

    if (eventCategory && eventAction) {
      // ga('send', {
      //   hitType: 'event',
      //   eventCategory: eventCategory,
      //   eventAction: eventAction,
      //   eventLabel: eventLabel || '',
      //   eventValue: typeof eventValue === 'number' ? eventValue : 0,
      //   transport: 'beacon'
      // });
    }
  }
};


/* Bespoke Search Facet Functionality
 * - see search.js for usage
 * - fromYear, toYear - placeholder used to track pub dates on the filters, cause its values are dynamic
 * - getGaData - helper function used in search.js, will add the data-ga-event-* str to the inputs as the elements are generated on the client
 * - initPubDates - setter for the from/to years
 * - trackPubDates - fires pub date events
 */
AOP.gaEvents.search = {
  fromYear: null,
  toYear: null,

  getGaData: function (key, bucket) {
    /*
     Triggered when facets are added to the view, via ajax
     Init all the data ga will need, only the ones below are tracked, just add if the other facets will be tracked
     This will return a data string that will be appended to the new node on the facet container
     */
    var actions = {
      'onlyShowAvailable': 'access_to_facet',
      'openAccess': 'open_access_facet',
      'productCollection': 'collection_facet',
      'productPublisher': 'publisher_facet',
      'productDate': 'publication_date_facet',
      'productSubject': 'subject_facet',
      'productTypes': 'content_type_facet',
      'productSociety': 'society_facet'
    };

    var gaDataStr = '';
    var gaDataActionStr = actions[key];
    if (!gaDataActionStr) {
      //event is not tracked, return!
      return;
    }

    gaDataStr += 'data-ga-event-action="' + gaDataActionStr + '" ';
    gaDataStr += 'data-ga-event-label="' + (bucket.label ? bucket.label : bucket.key) + '" ';
    gaDataStr += 'data-ga-check-state="true" ';

    return gaDataStr;
  },

  initPubDates: function (fromYear, toYear) {
    AOP.gaEvents.search.fromYear = fromYear || $('#startYear').val();
    AOP.gaEvents.search.toYear = toYear || $('#endYear').val();
  },

  trackPubDates: function () {

    var _startYear = $('#startYear').val() || '';
    var _endYear = $('#endYear').val() || '';

    if (AOP.gaEvents.search.fromYear !== _startYear) {
      var _actionFrom = AOP.gaEvents.setState('date_range_from', _startYear.length > 0);
      AOP.gaEvents.sendGaTrackingEvent('refine_search', _actionFrom, _startYear || AOP.gaEvents.search.fromYear);
    }

    if (AOP.gaEvents.search.toYear !== _endYear) {
      var _actionTo = AOP.gaEvents.setState('date_range_to', _endYear.length > 0);
      AOP.gaEvents.sendGaTrackingEvent('refine_search', _actionTo, _endYear || AOP.gaEvents.search.toYear);
    }

    AOP.gaEvents.search.initPubDates(_startYear, _endYear);
  }
};

/* Bespoke Bibliographic Functionality
 * - category - const category for this action
 * - type - could be either public or my_core
 * - init - helper function used set/bind the dom form, events, and biblio type
 * - action - helper function to fire the payload to ga
 * - getBiblioAction - build the biblio action string
 * - getBiblioLabel - build the biblio label string
 */
AOP.gaEvents.bibliographic = {
  category: 'bibliographic_data',
  type: null,

  init: function (formName, type) {
    //services-marc-record-download public
    //biblio-record-download my_core
    var biblioForm = $('form#' + formName);
    if (biblioForm.length === 0 || !type) {
      return;
    }

    AOP.gaEvents.dom.biblioForm = biblioForm;
    AOP.gaEvents.dom.biblioForm.off('submit.gaEvents.bibliographic').on('submit.gaEvents.bibliographic', AOP.gaEvents.bibliographic.action);
    AOP.gaEvents.bibliographic.type = type;
  },

  action: function () {
    var errors = AOP.gaEvents.dom.biblioForm.find('.error:visible');
    if (errors.length === 0) {
      var eventCategory = AOP.gaEvents.bibliographic.category;
      var eventAction = AOP.gaEvents.bibliographic.getBiblioAction();
      var eventLabel = AOP.gaEvents.bibliographic.getBiblioLabel();
      AOP.gaEvents.sendGaTrackingEvent(eventCategory, eventAction, eventLabel);
    }
  },

  getBiblioAction: function () {
    var bySuffix = {
      'GENERAL_COLLECTION': 'oa_books',
      'COLLECTION_COLLECTION': 'by_collection',
      'PUBLISHER_COLLECTION': 'by_publisher',
      'marc-byOrganisation': 'by_org',
      'marc-byOrder': 'by_order',
      'isbn': 'by_isbn'
    };

    var format = $('input[name*=recordFormat]:checked').val().toLowerCase();
    var type = AOP.gaEvents.bibliographic.type;
    var contentType = type === 'public' ?
      $('input[name*=contentType]:checked').val() :
      AOP.gaEvents.dom.biblioForm.find('ul.tabs li.active a').attr('href').replace('#', '');

    //ignore kbart events
    return format === 'kbart' ? null : format + '_' + type + '_' + bySuffix[contentType];
  },

  getBiblioLabel: function () {
    //with/without date
    var startDate = $('input[name*=startDate]').val();
    var endDate = $('input[name*=endDate]').val();
    return (!!startDate || !!endDate ? 'with ' : 'without ') + 'date';
  }
};

/* Bespoke MyCore Functionality
 * - initMyCoreKbartDownload - initialised and cleared in organisation-kbart.js
 * - translateMyCoreTabToEventAction - helper function to identify correct action for the request
 * - clearMyCoreKbartDownload - depreciated - was used to clear when non kbart down type chosen in my-core biblio
 * */
AOP.gaEvents.mycore = {

  initMyCoreKbartDownload: function () {
    AOP.gaEvents.dom.myKbartForm = $('#kbart-record-download');
    AOP.gaEvents.dom.myKbartForm.off('submit.gaEvents.kbart'); //namespacing needed to preserve existing functionality
    AOP.gaEvents.dom.myKbartForm.on('submit.gaEvents.kbart', AOP.gaEvents.mycore.actionMyCoreKbartDownload);
  },

  actionMyCoreKbartDownload: function () {
    var errors = AOP.gaEvents.dom.myKbartForm.find('.error:visible');

    if (errors.length === 0) {
      // For initial launch of my core kbart in own space we have only organisational action. The other tabs
      // will be reintroduced with a refactor of the relevant views in coming sprints. Hard coding this in the meantime
      var action = AOP.gaEvents.mycore.translateMyCoreTabToEventAction();
      AOP.gaEvents.sendGaTrackingEvent('kbart', action);
    }
  },

  translateMyCoreTabToEventAction: function () {

    var downloadTabLabel = $('#bibliographicData ul.tabs li.active a').attr('href').replace('#', '');

    var actions = {
      'kbart-byOrganisation': 'by_org',
      'kbart-byOrder': 'by_order',
      'order-by-package': 'by_package'
    };

    //console.log('actions[downloadTabLabel]', actions[downloadTabLabel]);

    return 'my_core_' + actions[downloadTabLabel] || 'unknown';
  },

  // clearMyCoreKbartDownload: function () {
  //   if (AOP.gaEvents.dom.myKbartForm) {
  //     AOP.gaEvents.dom.myKbartForm.off('submit.gaEvents.kbart');
  //     AOP.gaEvents.dom.myKbartForm = null;
  //   }
  // },

  initMyCoreCounterDownload: function () {
    AOP.gaEvents.dom.counterForm = $('form#usageReports');
    AOP.gaEvents.dom.counterForm.on('submit', AOP.gaEvents.mycore.actionMyCoreCounterRequest);
  },

  actionMyCoreCounterRequest: function () {
    var type = AOP.gaEvents.dom.counterForm.find('select#counterReportTypeSelect').val();
    var label = AOP.gaEvents.dom.counterForm.find('select#reportFormat').val().toUpperCase();
    if (type.indexOf('counter#') > -1) {
      action = type.replace('counter#', 'request_');
    } else {
      action = type.replace('custom#', 'request_');
    }

    AOP.gaEvents.sendGaTrackingEvent('counter4', action, label);
  },

  actionMyCoreCounterDownload: function () {
    var errors = AOP.gaEvents.dom.counterForm.find('.error:visible');

    if (errors.length === 0) {
      AOP.gaEvents.sendGaTrackingEvent('counter4', 'counter_report_downloaded', $(this).attr('data-format'));
    }
  },

  //this function would be invoked by front end error message
  scanMyCoreCounterErrors: function () {
    var counterError = $('#counter-error-marker');
    if (counterError.length) {
      var label = counterError.attr('data-report-type').toUpperCase();
      AOP.gaEvents.sendGaTrackingEvent('counter4', 'download_failed', label);
    }
  },

  //this function would be invoked by function call
  actionMyCoreCounterError: function (failedResponse) {
    var label = 'Unknown';
    var causesOfFailureMapping = {
      'gateway': 'gateway timeout',
      'invalid': 'invalid data',
      'aws': 'AWS error'
    };

    var responseString = JSON.stringify(failedResponse);

    for (var cause in causesOfFailureMapping) {
      if (responseString && responseString.indexOf(cause) > -1) {
        label = causesOfFailureMapping[cause];
      }
    }

    AOP.gaEvents.sendGaTrackingEvent('counter4', 'download_failed', label);
  }
};

$(document).ready(AOP.gaEvents.init);
