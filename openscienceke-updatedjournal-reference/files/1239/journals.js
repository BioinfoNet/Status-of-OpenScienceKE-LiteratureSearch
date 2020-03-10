/* global AOP: true */

$(document).ready(function () {
  $('.search-scope-select').on('change', function (e) {
    var target = $(e.target);
    var selection;

    try {
      selection = JSON.parse(target.val());
    }
    catch (err) {
      return;
    }

    var parentForm = target.parents('form.search-form');

    parentForm.attr('action', AOP.baseUrl + '/search/scoped');
    if (selection.placeholder) {
      $('input[name="q"]', parentForm).attr('placeholder', AOP.translateSearchPlacehoder(selection.placeholder, 'Search journal'));
    } else {
      $('input[name="q"]', parentForm).attr('placeholder', AOP.translateSearchPlacehoder('Search ' + selection.name + ' content', 'Search society content'));
    }

    $('input.productId', parentForm).val(selection.productId);
    $('input.context', parentForm).val(selection.context);
    $('input.type', parentForm).val(selection.type);
  });

  $('.search-scope-select select').trigger('change');
});
