//--------DOCUMENTATION--------
//This widget has 2 modes for the view: 1) a condensed version, and 2) a full version.  By default, only the condensed 
//version is shown, and the full version is called via AJAX from within the short version.

//    Dependencies:
//1. CDN Chartist.CSS <link rel="stylesheet" href="bower_components/chartist/dist/chartist.min.css">
//2. CDN Chartist.js  <script src="bower_components/chartist/dist/chartist.min.js">
//3. ArticleLevelMetrics.js --> which should ship over in the SharedWidgets NuGet Package
//4. _article-level-metrics.scss --> default presentation for the widget. should ship over with NuGet Package.
var ArtMetric = {};

ArtMetric.fullVersion = function ($dest, routeUrl) {
    // Only do AJAX call if it hasn't been done before.
    //console.log(routeUrl);
    if ($dest.find('.widget-ArticleLevelMetrics').length < 1) {
        // Code from https://github.com/gionkunz/chartist-js/issues/1015
        var ctHtmlLabels = function (options) {
            return function (chart) {
                chart.on('draw', function (context) {
                    if (context.type === 'label') {
                        var redo = context.element._node.childNodes[0];
                        redo.innerHTML = redo.innerText;
                    }
                });
            }
        };

        var baseSiteUrl = $("#hfSiteURL");

        if (typeof baseSiteUrl != "undefined" && typeof baseSiteUrl.val() != "undefined" && baseSiteUrl != '') {
            routeUrl = "//" + baseSiteUrl.val() + routeUrl;
        }

        $.ajax({
            url: routeUrl,
            datatype: "HTML",
            success: function (html) {
                $dest.prepend(html);

                setTimeout(function () {
                    if (typeof window.ChartistData !== "undefined") {
                        // Chartist Options
                        var opts = {
                            lineSmooth: false,
                            showArea: true,
                            low: 0,
                            plugins: [ctHtmlLabels()]
                        };

                        var responsiveOpts = [
                            ['screen and (max-width: 1024px)', {
                                axisX: {
                                    labelInterpolationFnc: function (value) {
                                        return value.slice(0, 3);
                                    }
                                }
                            }],
                            ['screen and (min-width: 1px)', {
                                axisX: {
                                    labelInterpolationFnc: function (value) {
                                        return value.replace(' ', '<br />');
                                    }
                                },
                                plugins: [ctHtmlLabels()]
                            }]
                        ];

                        ArtMetric.createChart('.ct-chart', window.ChartistData.data, opts, responsiveOpts);
                    }
                }, 200);

                if ($('.artmet-dimensions').length && window.__dimensions_embed && window.__dimensions_embed.addBadges) {
                    window.__dimensions_embed.addBadges();
                }
                //console.log(ChartistData.data.labels);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (window.console) {
                    var err = eval("(" + xmlHttpRequest.responseText + ")");
                    console.log("error: " + err);
                    console.log("status: " + textStatus);
                }
            }
        });
    }
};

ArtMetric.limitLabels = function () {
    // limit which labels are being displayed
    var xAxisLabels = $('.ct-horizontal.ct-label');
    var labelCt = xAxisLabels.length;

    // max number of labels to show is 8. so if there are 16..we'll show every other. 24 -- every third, etc.
    var showNthLabel = Math.ceil(labelCt / 8);
    var counter = 1;

    xAxisLabels.not(":eq(0)").each(function () {
        if (!(counter % showNthLabel === 0)) {
            $(this).hide();
        }
        counter++;
    });
};

ArtMetric.createChart = function (cssSelector, data, options, responsiveOptions) {
    var chart = new Chartist.Line(cssSelector, data, options, responsiveOptions);

    // Let's put a sequence number aside so we can use it in the event callbacks
    var seq = 0,
      delays = 25,
      durations = 250;

    // Once the chart is fully created we reset the sequence
    chart.on('created', function () {
        seq = 0;

        ArtMetric.limitLabels();
    });

    chart.on('draw', function (data) {
        if (data.type === 'line' || data.type === 'point' || data.type === 'area') {
            seq++;
        }

        if (data.type === 'line') {
            data.element.animate({
                opacity: {
                    begin: seq * delays + 150,
                    dur: durations,
                    from: 0,
                    to: 1
                }
            });
        } else if (data.type === 'point') {
            data.element.animate({
                x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'area') {
            data.element.animate({
                opacity: {
                    begin: seq * delays + 250,
                    dur: 300,
                    from: 0,
                    to: 1
                }
            });
        }
    });
};

ArtMetric.triggerModal = function ($modal, articleId) {
    var showDimensionsBadge = $('.artmet-dimensions').length ? 'true' : 'false';

    var routeUrl = '/ThirdParty/ArticleLevelMetricsDetails?articleId=' + articleId + '&showDimensionsBadge=' + showDimensionsBadge;

    ArtMetric.fullVersion($modal, routeUrl);

    var $modalWrap = $('.artmet-modal'),
        body = $('body');
    
    $modalWrap.css({ 'display': 'block', 'opacity': 1 });
    body.addClass('metrics-modal-open');
};

ArtMetric.closeModal = function () {
    var $modalWrap = $('.artmet-modal'),
        body = $('body');
    $modalWrap.attr('style', '');
    body.removeClass('metrics-modal-open');
};

ArtMetric.eventsToClose = function () {
    $('.artmet-close-modal').click(function () {
        ArtMetric.closeModal();
    });

    $('.artmet-modal').click(function () {
        if (!$(event.target).closest('.artmet-modal-contents').length) {
            ArtMetric.closeModal();
        }
    });
};

$(document).ready(function () {
    $('.artmet-modal-trigger, .artmet-condensed-stats .artmet-views').click(function () {
        var articleId = $('.artmet-modal-trigger').attr('data-article-id');
        ArtMetric.triggerModal($('.artmet-modal-contents'), articleId);
    });

    ArtMetric.eventsToClose();
});

/**
* Local Storage Module
* Wrapper for interfacing w/ HTML5 localStorage. (De-)serializes values for storage, scopes keys to 'SCM' namespace.
* 
* Supports read/write from another domain's local storage if that domain
* has set up a hub to support it.
*
* - Cross-Domain functionailty ** REQUIRES ** the cross-storage library (https://github.com/zendesk/cross-storage)
* - Cross-Domain functionality utilizes Promises, so a Promise polyfill is ** HIGHLY RECOMMENDED ** for full browser support.
*/
var SCM = SCM || {};
SCM.Utilities = SCM.Utilities || {};

SCM.Utilities.LocalStorage = (function(){
  'use strict';

  var _namespace = 'SCM';
  var _storageAdapter = window.localStorage;
    var _cacheUpdateLog = [];
    var _syncStartedLog = [];
    var _crossStorageInstances = [];

    /**
    * Returns module API
    * @returns {object}
    */
    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        getItemCrossDomainNoCache: getItemCrossDomainNoCache,
        getItemCrossDomain: getItemCrossDomain,
        setItemCrossDomain: setItemCrossDomain,
        removeItemCrossDomain: removeItemCrossDomain
    };
	

  /**
  * Serializes and stores in storageAdapter
  *
  * @param {string} key - The storage Key
  * @param {object} data - The storage Value
  * @param {object} adapter - The localStorage adapter
  */
  function setItem(key, value, adapter){
    var adapter = (adapter) ? adapter : _storageAdapter;
    adapter.setItem(_namespace + '.' + key, JSON.stringify(value));
  }

  /**
  * Retrieves and de-serializes from storageAdapter
  *
  * @param {string} key - The storage Key
  * @param {object} adapter - The localStorage adapter
  */
  function getItem(key, adapter){
    var adapter = (adapter) ? adapter : _storageAdapter;
    var item = adapter.getItem(_namespace+'.'+key);
    return JSON.parse(item);
  }

  /**
  * Removes the object from storageAdapter
  *
  * @param {string} key - The session storage Key to retrive
  */
  function removeItem(key, adapter){
    var adapter = (adapter) ? adapter : _storageAdapter;
    adapter.removeItem(_namespace+'.'+key);
  } 

    /**
    * Serializes and stores cross-domain using the provided URL.
    *
    * @param {string} key - The storage Key
    * @param {object} data - The storage Value
    * @param {string} crossStorageHubUrl - The URL for the cross-domain storage hub
     * @returns a promise that is fulfilled on success, or rejected if any errors setting the key occurred, or the request timed out.
    */
  function setItemCrossDomain(key, value, crossStorageHubUrl) {
      var localCacheKey = getHostnameFromUrl(crossStorageHubUrl) + '.' + key;
      // Immediately store the value in our local cache so that it is available for any subsequent 'get' requests
      // during this page load
      SCM.Utilities.LocalStorage.setItem(localCacheKey, value);
      _markLocalCacheAsUpdated(crossStorageHubUrl, key);
      var rvPromise;
      if (CrossStorageClient === undefined) {
          console.error('CrossStorageClient library is not available.  Falling back to localStorage');
          rvPromise = Promise.reject('CrossStorageClient library is not available');
      } else {
          var crossDomainStorage = getCrossStorageClientInstance(crossStorageHubUrl);
          rvPromise = crossDomainStorage.onConnect()
              .then(function () {
                  return crossDomainStorage.set(_namespace + '.' + key, JSON.stringify(value));
              })
              ['catch'](function (err) {
                  console.error('Failed to retrieve / set cross-domain localStorage :: ' + err.message);
              });
      }
      return rvPromise;
  }

    /**
    * Retrieves and de-serializes from a cross-domain storage hub
    *
    * @param {string} key - The storage Key
    * @param {string} crossStorageHubUrl - The URL for the cross-domain storage hub
     * @returns a promise that is settled on hub response or timeout. On success, it is fulfilled with the value of the key.
    */
  function getItemCrossDomainNoCache(key, crossStorageHubUrl) {
      var localCacheKey = getHostnameFromUrl(crossStorageHubUrl) + '.' + key;
      var rvPromise;
      if (CrossStorageClient === undefined) {
          console.error('CrossStorageClient library is not available.');
          rvPromise = Promise.reject('CrossStorageClient library is not available');
      } else {
          var crossDomainStorage = getCrossStorageClientInstance(crossStorageHubUrl);
          rvPromise = crossDomainStorage.onConnect()
              .then(function (res) {
                  return crossDomainStorage.get(_namespace + '.' + key);
              })
              .then(function (res) {
                  return JSON.parse(res);
              })
              ['catch'](function (err) {
                  console.error('Failed to retrieve from cross-domain localStorage (nocache) :: ' + err.message);
                  if (err.message.includes('Could not access localStorage in hub')) {
                      console.warn('It seems that the browser is set to block third-party cookies and data.  Cross-domain localStorage cannot function in this state.');
                  }
                  throw err;
              });
      }
      return rvPromise;
  }


    /**
    * Retrieves and de-serializes from a cross-domain storage hub, using our local cache for speed
    *
    * @param {string} key - The storage Key
    * @param {string} crossStorageHubUrl - The URL for the cross-domain storage hub
     * @returns the locally cached value of the provided key
    */
  function getItemCrossDomain(key, crossStorageHubUrl) {
      var localCacheKey = getHostnameFromUrl(crossStorageHubUrl) + '.' + key;
      if (CrossStorageClient === undefined) {
          console.error('CrossStorageClient library is not available.  Falling back to localStorage');
      } else {
          if (!_isLocalCacheUpdated(crossStorageHubUrl, key) && !_isSyncStarted(crossStorageHubUrl, key)) {
              _markSyncStarted(crossStorageHubUrl, key);
              getItemCrossDomainNoCache(key, crossStorageHubUrl)
                  .then(function(res) {
                      if (res) {
                          // If we already updated our local cache, e.g. during setCrossDomainItem(),
                          // then we don't want to update it again with an outdated value
                          if (!_isLocalCacheUpdated(crossStorageHubUrl, key)) {
                              _markLocalCacheAsUpdated(crossStorageHubUrl, key);
                              SCM.Utilities.LocalStorage.setItem(localCacheKey, res);
                          }
                      }
                  })
                  ['catch'](function(err) {
                      console.error('Failed to retrieve from cross-domain localStorage :: ' + err.message);
                  });
          }
      }
      // Return the locally cached value to ensure that we don't slow down widget loading by waiting for the result.
      // Note that at this point, an async cache update from above may or may not have
      // completed yet, so we might be returning a slightly out-dated value.
      return SCM.Utilities.LocalStorage.getItem(localCacheKey);
  }

    /**
    * Removes the object from storageAdapter
    *
    * @param {string} key - The session storage Key to remove
    * @param {string} crossStorageHubUrl - The URL for the cross-domain storage hub
     * @returns a promise that is settled on hub response or timeout.
    */
  function removeItemCrossDomain(key, crossStorageHubUrl) {
      if (CrossStorageClient === undefined) {
          console.error('CrossStorageClient library is not available.  Falling back to localStorage');
      } else {
          var crossDomainStorage = getCrossStorageClientInstance(crossStorageHubUrl);
          crossDomainStorage.onConnect()
              .then(function () {
                  return crossDomainStorage.del(_namespace + '.' + key);
              })
              ['catch'](function (err) {
                  console.error('Failed to save to cross-domain localStorage :: ' + err.message);
              });
      }
      SCM.Utilities.LocalStorage.removeItem(getHostnameFromUrl(crossStorageHubUrl) + '.' + key);
  }

  function getHostnameFromUrl(url) {
      return $('<a>', { href: url }).prop('hostname');
  }

    /**
     * Create if it doesn't exist and return the single instance of the CrossStorageClient for a given endpoint.
     * 
     * @param {string} crossStorageHubUrl 
     * @returns {CrossStorageClient} the single instance for the given hub url
     */
    function getCrossStorageClientInstance(crossStorageHubUrl) {
        for (var i = 0; i < _crossStorageInstances.length; i++) {
            if (_crossStorageInstances[i].hubUrl === crossStorageHubUrl) {
                return _crossStorageInstances[i].storage;
            }
        }
        var newStorage = new CrossStorageClient(crossStorageHubUrl, { timeout: 15000 });
        _crossStorageInstances.push({ hubUrl: crossStorageHubUrl, storage: newStorage });
        return newStorage;
    }

    function _markLocalCacheAsUpdated(crossStorageHubUrl, key) {
        var cacheLogString = crossStorageHubUrl + '::' + key;
        if (_cacheUpdateLog.indexOf(cacheLogString) === -1) {
            _cacheUpdateLog.push(cacheLogString);
        }
    }

    function _isLocalCacheUpdated(crossStorageHubUrl, key) {
        var cacheLogString = crossStorageHubUrl + '::' + key;
        return _cacheUpdateLog.indexOf(cacheLogString) !== -1;
    }

    function _markSyncStarted(crossStorageHubUrl, key) {
        var cacheLogString = crossStorageHubUrl + '::' + key;
        if (_syncStartedLog.indexOf(cacheLogString) === -1) {
            _syncStartedLog.push(cacheLogString);
        }
    }

    function _isSyncStarted(crossStorageHubUrl, key) {
        var cacheLogString = crossStorageHubUrl + '::' + key;
        return _syncStartedLog.indexOf(cacheLogString) !== -1;
    }

})();
$(document).ready(function () {
    $(".js-deepdyve-link").hide();
    var deepDive = $(".js-deepdyve-link");
    if (deepDive.length > 0) {
        var doi = deepDive.data("doi");
        var issn = deepDive.data("issn");
        var fieldname = deepDive.data("fieldname");
        var affiliate = deepDive.data("affiliate");
        if (doi != null && fieldname != null && affiliate != null && issn != null) {
            var url = "https:////www.deepdyve.com/rental-link?docId=" + doi + "&journal=" + issn + "&fieldName=" + fieldname + "&affiliateId=" + affiliate + "&format=jsonp&callback=?";
            //http://www.deepdyve.com/rental-link?docId=10.1016/j.hrmr.2012.06.003&journal=10534822&fieldName=journal_doi&affiliateId=bioportfolio&format=jsonp&callback=?
            $.getJSON(url, function (data) {
                if (data.status === 'ok') {
                    // Update the href url so it goes straight to the article page
                    $(".js-deepdyve-link a").attr("href", data.url);
                    $(".js-deepdyve-link").show();
                }
            });
        }
    }
});

$(document).ready(function () {
    $("a.js-view-large").on("click", function () {
        var title = $("#hfArticleTitle").val();
        if (title != null && title != "") {
            var currentUrl = $(this).attr("href");
            title = encodeURIComponent(title);
        }
    });

});

//# sourceMappingURL=article-page.min.js.map
