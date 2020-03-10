/* global encodeEmail, createAlertBox, submitAjaxForm, Foundation */
var AOP = AOP || {};

var recommendModal = $('#recommendProduct');
var recommendEventsBound = false;

$(document).ready(function () {

  var initRecommend = function (opts) {

    var color = {
      highlight: {
        color: 'red'
      },
      none: {
        color: ''
      }
    };

    var recommendSubmitButton = recommendModal.find('#recommend-submit');
    var organisationOptionLabel = recommendModal.find('.organisation-option');
    var availableOrganisations = recommendModal.find('.yourOrganisations input[type=checkbox]');
    var administratorEmail = {
      email: recommendModal.find('input[name=administratorEmail]'),
      selectedValues: recommendModal.find('#selected-values'),
      selectedEmails: recommendModal.find('#selected-administrator-emails'),
      highlightError: function () {
        recommendModal.find('#administrator-email label').css(color.highlight);
      },
      clearError: function () {
        recommendModal.find('#administrator-email label').css(color.none);
        recommendModal.find('#administrator-email span.error').hide();
        organisationOptionLabel.removeClass('error');
        organisationOptionLabel.css(color.none);
      },
      errors: recommendModal.find('#administrator-email .error'),
      errorMessages: {
        added: recommendModal.find('#emailaddress-added'),
        invalid: recommendModal.find('#emailaddress-invalid')
      },
      addButton: recommendModal.find('#add-administrator'),
      form: recommendModal.find('form'),

    };

    recommendSubmitButton.prop('disabled', false);

    // Set link to current product if not set already
    var productLink = recommendModal.find('input[name=productLink]').val();
    if (productLink.length === 0) {
      // Strip the baseUrl as this is already part of the email template domain settings
      recommendModal.find('input[name=productLink]').val(window.location.pathname.replace(AOP.baseUrl, ''));
    }

    var productType = recommendModal.find('input[name=productType]').val();
    if (productType === 'book') {
      // Copy the formatted author/editor/etc data into the form
      var authors = [];
      $.each(recommendModal.find('.author'), function (key, val) {
        authors.push($(val).text().trim().replace(/ +/g, ' ').replace(/\n/g, ''));
      });
      recommendModal.find('input[name=productAuthors]').val(authors.join('\r\n'));
    }

    // Reset and populate any fields
    var setUpModal = function () {
      var prefillFields = ['yourName', 'yourEmail'];
      // Clear all fields and previously entered administrator emails
      recommendModal.find('input[type=text], textarea, select').val('');
      recommendModal.find('input[type=checkbox]').prop('checked', false);
      administratorEmail.selectedEmails.find('>div').remove();
      administratorEmail.selectedValues.val('');
      // Set the default user data
      $.each(prefillFields, function (key, fieldName) {
        recommendModal.find('input[name=' + fieldName + ']')
          .val(recommendModal.find('input[name=' + fieldName + 'Prefill]').val());
      });
      // Clear errors when opening the modal
      recommendModal.find('.columns.error').removeClass('error');
      recommendModal.find('#ajaxMessages').hide();
      administratorEmail.clearError();
    };

    // Check if email has already been added
    var administratorEmailExists = function (emailValue) {
      var emailExists = false;
      $.each(administratorEmail.selectedValues.val().split(','), function (key, val) {
        if (emailValue === val) {
          emailExists = true;
        }
      });
      return emailExists;
    };

    var validateAdministratorEmail = function () {
      // Abide validation is not used here. As the email acts like a mini form within the larger
      // form, it would not function correctly.
      var emailValue = administratorEmail.email.val().toLowerCase();
      var cssBlock = {display: 'block'};

      if (!emailValue) {
        return false;
      }

      // Toggle the error states, exit function if error found
      // Test if email already added
      if (administratorEmailExists(emailValue)) {
        administratorEmail.errorMessages.invalid.hide();
        administratorEmail.errorMessages.added.css(cssBlock);
        administratorEmail.highlightError();
        return false;
      }
      // Test for invalid email
      if (AOP.emailRegex && !AOP.emailRegex.test(emailValue)) {
        administratorEmail.errorMessages.added.hide();
        administratorEmail.errorMessages.invalid.css(cssBlock);
        administratorEmail.highlightError();
        return false;
      }

      administratorEmail.clearError();
      return true;
    };

    var addAdministratorEmail = function () {
      var emailValue = administratorEmail.email.val().toLowerCase();
      var vals;
      var newAdministratorEmail;

      if (validateAdministratorEmail() === false) {
        return;
      }

      // Build up a new element
      newAdministratorEmail =
        '<div class="row collapse" id="' + emailValue + '">' +
        '<div class="large-10 small-10 columns">' +
        '<p>' + emailValue + '</p>' +
        '</div>' +
        '<div class="large-2 small-2 columns">' +
        '<a rel="' + emailValue + '" class="deleteAdministratorEmail button alert radius right postfix">' + AOP.translate('Delete') + '</a>' +
        '</div>' +
        '<input type="hidden" name="administratorEmails" value="' + emailValue + '"/>' +
        '</div>';

      // Add the new email
      administratorEmail.selectedEmails.append(newAdministratorEmail);
      // Show the admin email section if hidden
      if (administratorEmail.selectedEmails.is(':hidden')) {
        administratorEmail.selectedEmails.show();
      }

      // Update the list of selected values, for uniqueness validation
      vals = administratorEmail.selectedValues.val().split(',');
      vals.push(emailValue);
      administratorEmail.selectedValues.val(vals.join());
      // Clear the current email from the field
      administratorEmail.email.val('');
      // Hide the errors
      administratorEmail.clearError();
    };

    // Rebuild parts of the modal HTML - used if we are updating the data from a
    // recommend request from a search listing
    if (opts.html) {
      if (opts.html.input) {
        recommendModal.find('#inputs').html(opts.html.input);
      }
      if (opts.html.typeDisplay) {
        recommendModal.find('#type-display').html(opts.html.typeDisplay);
      }
    }

    // Add the base url to the journal display data
    if (opts.productType && opts.productType === 'journal') {
      recommendModal.find('.meta-info.url > span').text(window.location.origin);
    }

    if (opts.reset) {
      setUpModal();
    }

    if (!recommendEventsBound) {
      //binding the validation events manually
      $('form', '#recommendProduct').find('input, textarea, select').not('[data-abide-ignore]')
        .on('blur.fndtn.abide change.fndtn.abide', function (e) {
          Foundation.libs.abide.validate([this], e);
        });
      // Detect clicks in modal, perform any actions
      recommendModal.click(function () {
        // Hide any errors if user has removed all text from input
        if (administratorEmail.email.val() && administratorEmail.email.val().length === 0 && administratorEmail.errors.is(':visible')) {
          administratorEmail.clearError();
        }
      });

      availableOrganisations.on('click', function () {
        // Clear any errors, the user is now trying to select and organisation
        organisationOptionLabel.css(color.none);
      });

      // Delete an administrator email address
      administratorEmail.selectedEmails.on('click', '.deleteAdministratorEmail', function () {
        var seperator = ',';
        // Get the select admin emails
        var vals = administratorEmail.selectedValues.val().split(seperator);
        // Get email to delete
        var emailToDelete = $(this).attr('rel');
        var emailToDeleteID = encodeEmail(emailToDelete);
        // Remove the row from the screen
        $('#' + emailToDeleteID).remove();
        // Remove the hidden data
        vals.splice(vals.indexOf(emailToDelete), 1);
        // Save back to hidden input
        administratorEmail.selectedValues.val(vals.join(seperator));
        // Hide the admin email section no emails have been added
        if (administratorEmail.selectedEmails.find('>div').length === 0) {
          administratorEmail.selectedEmails.hide();
        }
      });

      // On click, save the administrator email
      administratorEmail.addButton.on('click', function (e) {
        // Don't allow admin email field to submit the form
        e.preventDefault();
        addAdministratorEmail();
      });

      // On enter, save the administrator email
      administratorEmail.email.on('keydown', function (e) {
        // Clear any errors on the label headings, the user is now trying to enter an org administrator
        organisationOptionLabel.css(color.none);
        if (e.keyCode === 13) {
          // Don't allow admin email field to submit the form on return key
          e.preventDefault();
          addAdministratorEmail();
        }
      });

      // Revalidate adminstrator email on blur
      administratorEmail.email.on('blur', function (e) {
        e.preventDefault();
        validateAdministratorEmail();
      });

      // Submit form
      administratorEmail.form.on('valid.fndtn.abide', function () {
        recommendSubmitButton.prop('disabled', true);
        // Clear existing errors
        $('.alert-box').remove();
        var _self = $(this);
        var ajaxMessages = recommendModal.find('#ajaxMessages');
        var errorMessage;

        // First check that an organisation or administrator email has been selected
        var validAdminContact = false;
        if (_self.find('#selected-administrator-emails > div').length > 0 || _self.find('input[name=yourOrganisations]').is(':checked')) {
          validAdminContact = true;
        }

        if (!validAdminContact) {
          // If there are no organisations to select from, change the error message
          if (!$('.yourOrganisations').length) {
            errorMessage = 'Please enter your administrator\'s email address.';
          } else {
            errorMessage = 'Please select an organisation or enter your administrator\'s email address.';
          }
          createAlertBox(_self, ajaxMessages, 'error', errorMessage);
          ajaxMessages.show();
          recommendSubmitButton.prop('disabled', false);
          // Highlight the organisation and administrator email headings
          organisationOptionLabel.css(color.highlight);
          return false;
        }

        // Attach error/success messages to the page aswell as the modal
        submitAjaxForm(this, $('#ajaxMessages, #recommendProduct #ajaxMessages'), function (res) {
          // Default by initially hiding the message in the modal, we only need to show this if an error occurs.
          ajaxMessages.hide();
          if (res && res.success) {
            recommendModal.foundation('reveal', 'close');
            // Show success message on the body
            $('#ajaxMessages').show();
          } else {
            // Hide error messages on the body
            $('#ajaxMessages').hide();
            // Show the error message in the modal
            ajaxMessages.show();
          }
          recommendSubmitButton.prop('disabled', false);
        });
      });
      recommendEventsBound = true;
    }

  };

  // Hide the 'access' tooltip
  var clearToolTip = function () {
    $('a.hasTooltipCustom-top').each(function (k, el) {
      $(el).qtip().toggle(false);
    });
  };

  // Set up modal (product page)
  $('.recommend').on('click', function (e) {
    e.preventDefault();
    initRecommend({reset: true});
  });
  // If we are on a listing page for a book or journal, we simply
  // re-use the recommend modal for the parent product.
  $('body').on('click', '.recommend-product.parent-product', function (e) {
    e.preventDefault();
    initRecommend({reset: true});
    clearToolTip();
    recommendModal.foundation('reveal', 'open');
  });

  // Set up modal (search page)
  $('body').on('click', '.recommend-product.search', function (e) {
    e.preventDefault();
    var initObj;
    var productId = $(this).attr('data-prod-id');
    clearToolTip();
    // Get product data to update the modal contents
    $.post(AOP.baseUrl + '/services/aop-cambridge-core/recommend/get-product-data', {productId: productId}).done(function (resp) {
      if (!resp.success) {
        createAlertBox(null, $('#ajaxMessages'), 'error', 'Unable to recommend this product. Please <a href="' + AOP.baseUrl + '/contact">contact customer services</a>.');
        return;
      }
      initObj = {
        reset: true,
        html: {
          input: resp.data.html.input,
          typeDisplay: resp.data.html.typeDisplay
        },
        productType: resp.data.productType
      };
      initRecommend(initObj);
      recommendModal.foundation('reveal', 'open');
    });
  });

});
