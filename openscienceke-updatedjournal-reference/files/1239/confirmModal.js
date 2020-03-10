var AOP = AOP || {};
AOP.confirmModal = function (title, message, fnConfirm, fnCancel, opts) {
  opts = opts ? opts : {};
  title = title ? title : '';
  var cancelLabel = opts.cancelLabel || 'Cancel';
  var confirmLabel = opts.confirmLabel || 'Confirm';
  var $confirmModal = $($('#confirm-modal')[0]);

  var $cancelButton = $confirmModal.find('.button.cancel');
  var $confirmButton = $confirmModal.find('.button.confirm');

  if (opts.isAlert) {
    $cancelButton.hide();
  } else {
    $cancelButton.show();
  }

  $confirmModal.find('.title').html(title);
  $confirmModal.find('.close-reveal-modal').attr('aria-label', 'Close ' + title.toLowerCase());
  $confirmModal.find('.message').html(message);

  $cancelButton.html(cancelLabel);
  $confirmButton.html(confirmLabel);

  if (opts.cancelButtonClass) {
    $cancelButton.removeClass(opts.cancelButtonClass).addClass(opts.cancelButtonClass);
  }

  // this could be closed by the user clicking on a button or by foundations close event, in which case we need to call cancel
  function closeModal(e, confirm) {
    e.preventDefault();
    // remove any close event handlers
    $confirmModal.off('close.fndtn.reveal');

    if (confirm) {
      if (typeof fnConfirm === 'function') {
        $confirmModal.foundation('reveal', 'close');
        fnConfirm(e);
      }
    } else {
      if (typeof fnCancel === 'function') {
        fnCancel(e);
      }
      // if called by a click event trigger the close action
      if (e.type === 'click') {
        $confirmModal.foundation('reveal', 'close');
      }
    }

    return false;
  }

  $confirmModal.off('opened.fndtn.reveal').on('opened.fndtn.reveal', function () {
    $confirmModal.focus();
  });

  $confirmModal.off('close.fndtn.reveal').on('close.fndtn.reveal', closeModal);

  $confirmButton.off('click').on('click', function (e) {
    closeModal(e, true);
  });
  $cancelButton.off('click').on('click', function (e) {
    closeModal(e, false);
  });

  // enter is the same as confirm
  $confirmModal.off('keypress').on('keypress', function (e) {
    e.preventDefault();
    var code = e.keyCode || e.which;
    if (code === 13) {
      closeModal(e, true);
    }
  });

  $confirmModal.foundation('reveal', 'open');
};
