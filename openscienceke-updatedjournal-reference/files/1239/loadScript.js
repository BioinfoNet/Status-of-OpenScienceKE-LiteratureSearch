// TODO : At some point this file will be included in a build process
// TODO : Note this uses the aop data namespace - Namespacing needs to be addressed throughout the code

var AOP = AOP || {};
(function ($) {
  AOP.loadScript = function (url, callback) {
    return $.ajax({
      type: 'GET',
      url: url,
      data: null,
      success: callback,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Could not load script %s - status: %s', url, textStatus);
      },
      dataType: 'script',
      forceRemote: true
    });
  };
})(jQuery);
