/**
 * Keep AOP code separate for now, merge into app.js once we have final files from MIC !!
 */

/**
 * CAMBRIDGE ADDITIONS
 */

// Define template specific settings & methods
var templateSettings = {
  blocks: {
    'aop-block-html': {
      redactorSettings: {
        plugins: ['video', 'image'],
        formattingAdd: [
          //{
          //  tag: 'h2',
          //  title: 'H2 - Red Header',
          //  'class': 'red-header'
          //},
          //{
          //  tag: 'h3',
          //  title: 'H3 - Yellow Header',
          //  'class': 'yellow-header'
          //},
          //{
          //  tag: 'p',
          //  title: 'P - Bold Italic',
          //  'class': 'bold-italic'
          //}
        ]
      }
    }
  }
};

// This is used for reloading a page if the response is successful

$(document).ready(function () {

  $('a[data-ajax-reload]').click(function (event) {
    event.preventDefault();
    jQuery.ajax({
      type: 'GET',
      url: $(this).attr('href'),
      success: function (data) {
        if (data.success === true) {
          document.location.reload(true);
        } else {
          //console.log('Something went wrong');
        }
      }
    });
  });
});

var createAlertBox = function (form, alertElement, alertType, message) {
  var opts = {
    scroll: true,
    alertType: alertType || 'error',
    alertElement: alertElement || $('#ajaxMessages')
  };
  AOP.createAlertBox(message, opts);
};

var submitAjaxForm = function (form, alertElement, callback) {
  // console.log('submitting with submitAjaxForm in /aop-cambridge-core/templates/cambridge-core/public/js/additional.js');
  $('.alert-box').remove();

  var action = $(form).attr('action');
  var data = $(form).serialize();
  $.ajax({
    url: action,
    type: 'POST',
    dataType: 'JSON',
    data: data,
    success: function (resp) {

      //check for URL and redirect it
      if (resp.redirect) {
        document.location.href = resp.redirect;
      }

      if (!alertElement) {
        alertElement = form;
      }

      var isError = resp.success !== true;

      var alertBoxStatus = isError ? 'error' : 'info';

      var message = resp.message || '';
      if (isError && resp.error && resp.error.message) {
        message = resp.error.message;
      }
      if (!message && resp.data && resp.data.message) {
        message = resp.data.message;
      }

      createAlertBox(form, $('#ajaxMessages'), alertBoxStatus, message);

      callback(resp);

    },
    error: function (resp) {
      createAlertBox(form, $('#ajaxMessages'), 'error', 'There was a problem with this service.');
      callback();
    },
    complete: function (resp) {
    }
  });
};

var encodeEmail = function (email) {
  if (typeof email === 'string') {
    return email.replace('@', '\\@').replace(/\./g, '\\.');
  }
  return '';
};

/**
 * Mobile drop down for 'core-page-tabs'
 * These are not foundation tabs. Used on pages that want to show 'tabs' that load new pages, rather
 * than loading tabs in the 'foundation' way
 */
var $corePageTabs = $('.core-page-tabs');
$corePageTabs.find('.current-mobile').on('click', 'a', function (e) {
  e.preventDefault();
  $corePageTabs.find('.tabs').toggleClass('open-drawer');
  if (!$(this).hasClass('icon')) {
    $('.current-mobile > a').text($(this).text());
  }
});
// If core page tabs are being used on mobile, detect what page is active, then set that
// as the current mobile page name.
$(document).ready(function () {
  if ($corePageTabs.length) {
    var currentTab = $corePageTabs.find('.tabs .tab-title.active > a');
    var currentTabText = 'Select page';
    if (currentTab.length) {
      currentTabText = currentTab.text();
      // console.log(currentTab.length);
    }
    // $corePageTabs.find('.current-mobile > a').text($corePageTabs.find('.tabs .tab-title.active > a').text());
    $corePageTabs.find('.current-mobile > a').text(currentTabText);
  }
});

/*
 * Maintain the same checked state for the desktop and mobile view for the accessible search checkbox
 */
$('.search input[name=accessible]').on('change', function () {
  var checkboxes = $('.search input[name=accessible]');
  checkboxes.prop('checked', $(this).is(':checked'));
});

/**
 * For some reason, when the foundation lightbox opens, some elements in the footer element still overlay
 * the lightbox. This is not a z-index issue. Can't see anything obvious causing this.
 * @TODO - needs more investigation
 * For now, catch the lightbox close/open event and show/hide the footer.
 */
$(document.body).on('open.fndtn.clearing', function (event) {
  $('footer').hide();
});
$(document.body).on('closed.fndtn.clearing', function (event) {
  $('footer').show();
});
