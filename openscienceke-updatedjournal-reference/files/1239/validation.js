'use strict';

var AOP = AOP || {};

(function ($) {
  //Separated from it's addition to Foundation as it reuses itself during execution under certain conditions, and
  //placing it separately like this makes the point more clearly.
  var isbn13MultilineTextarea = function (el, required, parent) {
    $(el).off('keypress').on('keypress', function (e) {
      $(parent).removeClass('error');
    });
    $(el).val($(el).val().replace(/(^[ \t]*\n)/gm, ''));

    $('span[data-isbn-error="true"]').remove();

    if ($(el).val() === '') {
      if (required && $(el).data('emptyError')) {
        $(parent).find('.error').html($(el).data('emptyError'));
      }
      return !required;
    }

    //
    // Allows 13 digit ISBNs, ignores whitespace either side of each line using the following.
    //   - Multiline mode /m
    //   - Global mode /g (whole input).
    //
    // Then for each line match any line entry that doesn't satisfy ALL of these conditions:
    //   - Zero or more leading whitespace characters: (\s+)?
    //   - Any 12 numbers: \d{12}
    //   - Any further number or an X character: (\d|X)
    //   - Zero or more trailing whitespace characters: (\s+)?
    //
    var re = /^((?!^(\s+)?\d{12}(\d|X)(\s+)?$).)*$/mg;
    var val = el.value;
    var m;

    var valid = true;
    var errors = [];

    while ((m = re.exec(val)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      valid = false;
      errors.push({
        input: m[0],
        index: m.index
      });
    }

    if (!valid) {
      var errorHtml = $('<span/>');
      errors.forEach(function (v) {
        if (errorHtml.html().length > 0) {
          errorHtml.append($('<br/>'));
        }
        var remove = $('<a>(delete)</a>');
        remove.on('click', (function (el, instanceDetails) {
          return function (ev) {
            ev.preventDefault();
            var index = instanceDetails.index;
            var input = instanceDetails.input;
            var length = input.length;
            var originalValue = $(el).val();

            var newValue = originalValue.substr(0, index) + originalValue.substr(index + length);
            $(el).val(newValue.replace(/\n$/, ''));
            //This isn't recursion, but a re-firing of the validator after a click.
            isbn13MultilineTextarea(el, required, parent);
          };
        })(el, v));
        $(errorHtml).append($('<span data-isbn-error="true">Invalid ISBN: "' + v.input + '" </span> ').append(remove));
      });
      $(parent).find('.error').html(errorHtml);
    }

    if (valid) {
      $(parent).removeClass('error');
    }
    //We're okay now, assuming it wasn't empty too!
    return valid;
  };

  //NOTE ISSN not ISBN!
  var issnMultilineTextarea = function (el, required, parent) {
    $(el).off('keypress').on('keypress', function (e) {
      $(parent).removeClass('error');
    });
    $(el).val($(el).val().replace(/(^[ \t]*\n)/gm, ''));

    $('span[data-issn-error="true"]').remove();

    if ($(el).val() === '') {
      if (required && $(el).data('emptyError')) {
        $(parent).find('.error').html($(el).data('emptyError'));
      }
      return !required;
    }

    //
    // Allows 8 digit ISSNs, ignores whitespace either side of each line using the following.
    //   - Multiline mode /m
    //   - Global mode /g (whole input).
    //
    // Then for each line match any line entry that doesn't satisfy ALL of these conditions:
    //   - Zero or more leading whitespace characters: (\s+)?
    //   - Any 4 numbers, lowercase or uppercase letters: (\d|[a-z]|[A-Z]){4}
    //   - An optional space or dash (ISSNs often contain a dash or space in the middle): (-|\s)?
    //   - Any 4 numbers, lowercase or uppercase letters: (\d|[a-z]|[A-Z]){4}
    //   - Zero or more trailing whitespace characters: (\s+)?
    //
    var re = /^((?!^(\s+)?(\d|[a-z]|[A-Z]){4}(-|\s)?(\d|[a-z]|[A-Z]){4}(\s+)?$).)*$/mg;
    var val = el.value;
    var m;

    var valid = true;
    var errors = [];

    while ((m = re.exec(val)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      valid = false;
      errors.push({
        input: m[0],
        index: m.index
      });
    }

    if (!valid) {
      var errorHtml = $('<span/>');
      errors.forEach(function (v) {
        if (errorHtml.html().length > 0) {
          errorHtml.append($('<br/>'));
        }
        var remove = $('<a>(delete)</a>');
        remove.on('click', (function (el, instanceDetails) {
          return function (ev) {
            ev.preventDefault();
            var index = instanceDetails.index;
            var input = instanceDetails.input;
            var length = input.length;
            var originalValue = $(el).val();

            var newValue = originalValue.substr(0, index) + originalValue.substr(index + length);
            $(el).val(newValue.replace(/\n$/, ''));
            //This isn't recursion, but a re-firing of the validator after a click.
            issnMultilineTextarea(el, required, parent);
          };
        })(el, v));
        $(errorHtml).append($('<span data-issn-error="true">Invalid ISSN: "' + v.input + '" </span> ').append(remove));
      });
      $(parent).find('.error').html(errorHtml);
    }

    if (valid) {
      $(parent).removeClass('error');
    }
    //We're okay now, assuming it wasn't empty too!
    return valid;
  };

  var orcidRegex = /^((?:(?:\d{4}[-]){3}\d{3}(\d|X)))$/;
  // This regex catches a few more invalid emails - better than standard foundation version
  // Eg, it does not allow emails like 'test...@test.com'
  // http://davidcel.is/posts/stop-validating-email-addresses-with-regex/
  var emailRegex = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/;
  AOP.emailRegex = emailRegex; // CORE-2678 various locations expect this to be public.

  $(document).foundation({
    abide: {
      timeout: 0,
      live_validate: false,
      validate_on_blur: true,
      patterns: {
        slug: /^[0-9-a-zA-Z]*$/,
        corepassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        openUrlCustomText: /^.{0,60}$/,
        // Override Foundation email regex
        email: emailRegex
      },
      validators: {
        orcidval: function (el, required, parent) {
          var primaryErrorEl = $(parent).find('#primary-error');
          var customErrorEl = $(parent).find('#custom-error');

          //setup messages
          primaryErrorEl.hide();
          customErrorEl.hide();

          var value = el.value;
          var output = false;

          //test for empty and return success
          if (value === '') {
            primaryErrorEl.show();
            return true;
          }

          //test for format and return failure
          if (!value.match(orcidRegex)) {
            primaryErrorEl.show();
            return false;
          }

          $.ajax({
            url: '//pub.orcid.org/v1.1/search/orcid-bio/?q=orcid:' + value,
            headers: {
              'Accept': 'application/json'
            },
            async: false // foundation won't validate with async request here
          }).success(function (data) {
            var results = data['orcid-search-results']['num-found'];
            if (results === 0) {
              customErrorEl.show();
              output = false;
            } else {
              output = true;
            }
          }).error(function () {
            //TODO: confirm with PO about this - what should we do if cannot validate orcid
            output = true;
          });
          return output;

        },

        // This version does not perform the AJAX request, it just checks the format
        orcidformat: function (el, required, parent) {
          var primaryErrorEl = $(parent).find('#primary-error');
          var customErrorEl = $(parent).find('#custom-error');

          //setup messages
          primaryErrorEl.hide();
          customErrorEl.hide();

          var value = el.value;
          var output = false;

          //test for empty and return success
          if (value === '') {
            primaryErrorEl.show();
            return true;
          }

          //test for format and return failure
          if (!value.match(orcidRegex)) {
            primaryErrorEl.show();
            return false;
          } else {
            primaryErrorEl.hide();
            return true;
          }
        },
        unique: function (el, required, parent) {
          var primaryErrorEl = $(parent).find('#primary-error');
          var customErrorEl = $(parent).find('#custom-error');
          var selected = $(parent).find('#selectedValues').val().split(',').filter(Boolean);
          var val = $(el).val().toString().toLowerCase().trim();

          if (val && selected.indexOf(val) >= 0) {
            primaryErrorEl.hide();
            customErrorEl.show();
            return false;
          } else {
            primaryErrorEl.show();
            customErrorEl.hide();
            return true;
          }
        },
        /*
         * Have combined a uniqueness check with subscription number validation
         * Issues in Foundation 5.5.2 - If you combine a custom validator with
         * a pattern or type validation, the custom validator takes precedence
         * and returns a valid result even if the pattern/type fails.
         */
        subscriptionNumber: function (el, required, parent) {
          var regex = /^\d{10}$/;
          var primaryErrorEl = $(parent).find('#primary-error');
          var customErrorEl = $(parent).find('#custom-error');
          var selected = $(parent).find('#selectedValues').val().split(',').filter(Boolean);
          var value = $(el).val().trim();

          if (value && selected.indexOf(value) >= 0) {
            primaryErrorEl.hide();
            customErrorEl.show();
            return false;
          } else if (value && !value.match(regex)) {
            primaryErrorEl.show();
            customErrorEl.hide();
            return false;
          } else {
            primaryErrorEl.hide();
            customErrorEl.hide();
            return true;
          }
        },
        /*
         * Have combined a uniqueness check with email format validation
         * Issues in Foundation 5.5.2 - If you combine a custom validator with
         * a pattern or type validation, the custom validator takes precedence
         * and returns a valid result even if the pattern/type fails.
         */
        shibboleth: function (el, required, parent) {
          var primaryErrorEl = $(parent).find('#primary-error');
          var customErrorEl = $(parent).find('#custom-error');
          var selected = $(parent).find('#selectedValues').val().split(',').filter(Boolean);
          var value = $(el).val().toString().toLowerCase().trim();

          if (value && selected.indexOf(value) >= 0) {
            primaryErrorEl.hide();
            customErrorEl.show();
            return false;
          } else if ((value && !value.match(emailRegex)) || !value) {
            primaryErrorEl.show();
            customErrorEl.hide();
            return false;
          } else {
            primaryErrorEl.hide();
            customErrorEl.hide();
            return true;
          }
        },
        optionRequired: function (el, required, parent) {
          var selected = $(parent).find('input:checked').val();
          var primaryErrorEl = $(parent).find('#primary-error');
          if (!selected) {
            primaryErrorEl.show();
            return false;
          } else {
            $(parent).find('label').removeClass('error');
            primaryErrorEl.hide();
            return true;
          }
        },
        // Improved email validation check
        email: function (el, required, parent) {
          return el.value.match(emailRegex);
        },
        checkbox_limit: function (el, required, parent) {
          var group = parent.closest('.checkbox-group, .radio-group');
          var min = group.attr('data-abide-validator-min');
          var checked = group.find(':checked').length;
          var errors = group.find('div.error, label.error');

          if (checked >= min) {
            group.removeClass('error');
            group.find('small.error').hide();
            errors.removeClass('error');
            return true;
          } else {
            group.addClass('error');
            group.find('small.error').css({
              display: 'block'
            });
            return false;
          }
        },
        aopEnhanced: function (el) {
          return $(el).is('[data-aop-is-valid]');
        },
        /**
         * This is a reasonably complex pair of validators, as it goes above and beyond to offer the user the ability to
         * repair their field inline using controls in the error message.
         *
         * @param el
         * @param required
         * @param parent
         * @returns {boolean}
         */
        isbn13MultilineTextarea: isbn13MultilineTextarea,
        issnMultilineTextarea: issnMultilineTextarea,

        isSanctionedCountry: function (el, required, parent) {

          var endpoint = AOP.baseUrl + '/services/aop-cambridge-membership/konakart/sanctioned';
          var isSanctioned = $(el).find('option:selected').attr('data-sanctioned');

          var primaryError = $(el).siblings('.country-required-error');
          var customError = $(el).siblings('.sanctioned-country-error');

          primaryError.hide();
          customError.hide();

          if (!el.value || el.value.length === 0) {
            customError.hide();
            primaryError.show();
            return false;
          }

          if (isSanctioned) {
            customError.show();
            primaryError.hide();
            return false;
          }
          $(parent).removeClass('error');
          $(parent).siblings('div').find('label').removeClass('error');
          return true;
        },

        /**
         * This will validate if a given field has a valid length
         * We have to ensure this because kk will reject the payload
         * if a field is invalid
         * field lengths can be found here \kona-kart-client\lib\address\max-field-lengths.js
         *
         * @param el
         * @param required
         * @param parent
         * @returns {boolean}
         */
        isValidKonaKartAddress: function (el, required, parent) {
          var elLength = el.value.length;
          var elMaxLength = $(el).data('fieldMax');
          var elFieldName = $(el).data('fieldName');
          var primaryError = $(el).siblings('.required-error');
          var customError = $(el).siblings('.custom-error');
          var customError2 = $(el).siblings('.validity-error');

          if (required && (!el.value || el.value.length === 0)) {
            primaryError.show();
            customError.hide();
            return false;
          } else if (elLength > elMaxLength) {
            primaryError.hide();
            customError.show();
            return false;
          } else if (elFieldName === 'postcode') {
            var countryName = $('#kkCountryCode option:selected').html().trim();
            var pattern;
            var postCode = el.value;

            if (countryName === 'United States') {
              pattern = AOP.konakart.validation.usPostCodePattern;
            } else if (countryName === 'Canada') {
              pattern = AOP.konakart.validation.caPostCodePattern;
            } else {
              pattern = AOP.konakart.validation.defaultPostCodePattern;
            }

            if (!pattern.test(postCode)) {
              primaryError.hide();
              customError.hide();
              customError2.show();
              return false;
            }
          }

          primaryError.hide();
          customError.hide();
          customError2.hide();
          return true;
        }
      }
    }
  });

})(jQuery);
