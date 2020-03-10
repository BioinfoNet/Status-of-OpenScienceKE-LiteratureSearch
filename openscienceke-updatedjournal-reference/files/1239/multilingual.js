var AOP = AOP || {};

AOP.defaultLanguage = 'en';

function switchLanguage(lang) {
  var settingPromise = $.post(
    AOP.baseUrl + '/services/aop-cambridge-core/session/set-property',
    {
      property: 'uiLanguage',
      value: lang
    });
  settingPromise.done(function () {
    window.location.reload();
  });
}

function setSessionValue(key, value, cb) {
  var settingPromise = $.post(
    AOP.baseUrl + '/services/aop-cambridge-core/session/set-property',
    {
      property: key,
      value: value
    }
  );
  settingPromise.done(function () {
    return cb();
  });
}

AOP.availableLanguages = ['en', 'fr'];

AOP.languageCodeMapping = {
  'fr': 'French'
};

AOP.multilingual = AOP.clientSideMultilingualString && AOP.clientSideMultilingualString !== 'undefined' ?
  JSON.parse(decodeURIComponent(AOP.clientSideMultilingualString).replace(/&#x27;/g, "'")) : []; //jshint ignore: line

var getTranslation = function (name) {
  var result = AOP.multilingual.filter(function (translation) {
    return translation && translation.name === name;
  });
  return result && result[0] ? result[0] : {};
};

AOP.isMultiLingualEnabledPage = function (url) {
  var journalPagesRegex = /\/journal|article/;
  var WWPPageRegex = /^[\w\W]+core\/what-we-publish\/journals$/g;
  var pastTitlePageRegex = /\/all\-issues\#?$/g;
  var isJournalPages = journalPagesRegex.test(url);
  var isWWPpages = WWPPageRegex.test(url);
  var isPastTitlePage = pastTitlePageRegex.test(url);
  return (isJournalPages || isPastTitlePage) && !isWWPpages;
};

function normaliseLanguageCode(langCode) {
  if (!langCode || typeof langCode !== 'string') {
    return;
  }
  var dashLocationInString = langCode.indexOf('-');
  return dashLocationInString > -1 ? langCode.substr(0, dashLocationInString) : langCode;
}

function getBrowserLanguage() {
  var browserLanguages = navigator.languages || [];
  var browserDefaultLanguage = browserLanguages[0];
  return normaliseLanguageCode(browserDefaultLanguage) || '';
}

function showMultilingualSuggestionModal(browserLanguage) {
  var langFullName = AOP.languageCodeMapping[browserLanguage];
  var messageTemplates = getTranslation('language prompt')[browserLanguage];
  var message = messageTemplates.replace('<lang>', langFullName);

  $('#multilingual-suggestion-modal-message').html(message);

  var acceptOptionText = getTranslation('accept option')[browserLanguage];
  $('#multilingual-suggestion-modal-accept-option').html(acceptOptionText);
  $('#multilingual-suggestion-modal-accept-option').click(function () {
    setSessionValue('uiLanguageSuggested', 'true', function () {
      //we set the session property at the front end anyway
      // in case the modal cannot be closed with error at the server side session
      AOP.uiLanguageSuggested = 'true';
      switchLanguage(browserLanguage);
    });
  });

  var declineOptionText = getTranslation('decline option')[browserLanguage];
  $('#multilingual-suggestion-modal-decline-option').html(declineOptionText);
  $('#multilingual-suggestion-modal-decline-option').click(function () {
    $('#multilingual-suggestion-modal').foundation('reveal', 'close');
    return false;
  });

  $(document).on('close.fndtn.reveal', '[data-reveal]', function (e) {
    if ($(e.target).attr('id') !== 'multilingual-suggestion-modal') {
      return false;
    }
    setSessionValue('uiLanguageSuggested', 'true', function (err) {
      //we set the session property at the front end anyway
      // in case the modal cannot be closed with error at the server side session
      AOP.uiLanguageSuggested = 'true';
      return true;
    });
  });

  $('#multilingual-suggestion-modal').foundation('reveal', 'open');
}

function showLeavingMultilingualModal(browserLanguage) {
  var langFullName = AOP.languageCodeMapping[browserLanguage];
  var messageTemplates = getTranslation('leaving language prompt')[browserLanguage];
  if (!messageTemplates) {
    return false;
  }
  var message = messageTemplates.replace('<lang>', langFullName);

  $('#multilingual-suggestion-modal-message').html(message);

  var acceptOptionText = getTranslation('close')[browserLanguage];
  $('#multilingual-suggestion-modal-accept-option').html(acceptOptionText);
  $('#multilingual-suggestion-modal-accept-option').click(function () {
    $('#multilingual-suggestion-modal').foundation('reveal', 'close');
  });
  $('#multilingual-suggestion-modal-decline-option').hide();
  $(document).on('close.fndtn.reveal', '[data-reveal]', function (e) {
    if ($(e.target).attr('id') !== 'multilingual-suggestion-modal') {
      return false;
    }
    setSessionValue('leaveTranslationSuggested', 'true', function (err) {
      //we set the session property at the front end anyway
      // in case the modal cannot be closed with error at the server side session
      AOP.leaveTranslationSuggested = 'true';
      return true;
    });
  });

  $('#multilingual-suggestion-modal').foundation('reveal', 'open');
}

function enableMultiLingualLeavingMessages() {
  var currentUrl = window.location.href;
  var preUrl = sessionStorage.getItem('multilingualPreviousUrl');

  var preUrlIsEnabled = AOP.isMultiLingualEnabledPage(preUrl);
  var currentUrlIsEnabled = AOP.isMultiLingualEnabledPage(currentUrl);
  var leavingMultiLingual = !currentUrlIsEnabled && preUrlIsEnabled;

  if (leavingMultiLingual && AOP.leaveTranslationSuggested !== 'true' && AOP.uiLanguage !== AOP.defaultLanguage) {
    showLeavingMultilingualModal(AOP.uiLanguage);
  }

  return true;
}

function enableMultiLingualMessages() {
  var preUrl = document.referrer;
  var currentUrl = window.location.href;

  var preUrlIsEnabled = AOP.isMultiLingualEnabledPage(preUrl);
  var currentUrlIsEnabled = AOP.isMultiLingualEnabledPage(currentUrl);

  if (!currentUrlIsEnabled) {
    return false;
  }

  var browserLanguage = getBrowserLanguage() || '';
  var browserLanguageIsDefault = browserLanguage === AOP.defaultLanguage;
  var browserLanguageIsAvailable = AOP.availableLanguages.indexOf(browserLanguage) !== -1;

  if (browserLanguageIsAvailable && AOP.uiLanguageSuggested !== 'true' && !browserLanguageIsDefault) {
    showMultilingualSuggestionModal(browserLanguage);
  }
  return true;
}

function findTitleInPlaceholder(placeholder, translationName) {
  var SearchJournalContentPatternRegex = /^Search ([\w\W]+) content$/g;
  var SearchJournalPatternRegex = /^Search ([\w\W]+)$/g;
  var title = '';
  var matched = [];

  if (translationName === 'Search journal') {
    matched = SearchJournalPatternRegex.exec(placeholder);
    if (matched[1]) {
      title = matched[1];
    }
  }
  if (translationName === 'Search society content') {
    matched = SearchJournalContentPatternRegex.exec(placeholder);
    if (matched[1]) {
      title = matched[1];
    }
  }
  return title;
}

//recording the previous url for leaving message. It is more reliable than document.referrer
window.onbeforeunload = function (e) {
  var currentUrl = window.location.href;
  sessionStorage.setItem('multilingualPreviousUrl', currentUrl);
};

AOP.translate = function (name) {
  AOP.frontEndLanguage = (AOP.isMultiLingualEnabledPage(window.location.href) && AOP.isMultilanguageEnabled === 'true') ?
    AOP.uiLanguage : AOP.defaultLanguage;
  var result = getTranslation(name);
  return result[AOP.frontEndLanguage] ? result[AOP.frontEndLanguage] : name;
};

AOP.translateDateString = function (dateString) {
  var separator = ' ';
  var translation = '';

  dateString.split(separator).forEach(function (subStr) {
    translation = translation + AOP.translate(subStr) + separator;
  });

  return translation.trim()
};

AOP.translateSearchPlacehoder = function (placeholder, translationName) {
  var title = findTitleInPlaceholder(placeholder, translationName);
  var translation = AOP.translate(translationName);
  return title ? translation.replace(/\<\w+\>/g, title) : translation; //jshint ignore: line
};

$(document).ready(function () {
  if (AOP.isMultilanguageEnabled === 'true') {
    enableMultiLingualMessages();
    enableMultiLingualLeavingMessages();
    return true;
  }
});
