// TODO : At some point this file will be included in a build process
// TODO : Note this uses the aop data namespace - Namespacing needs to be addressed throughout the code

(function ($) {
  $(document).on('blur', 'input[data-aop-trim="blur"]', function () {
    $(this).val($(this).val().trim());
  });
})(jQuery);
