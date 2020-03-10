// Define the global namespace.
if(typeof window.Scribd === 'undefined') {
    var Scribd = {};
}
if(!Scribd.UI) {
    Scribd.UI = {};
}

(function($) {

// Initialize Scribd and Scribd.UI namespaces if necessary.
Scribd.restrict_to_numbers = function (e) {
  var code;
  if (e.keyCode) code = e.keyCode;
  else if (e.which) code = e.which;

  var character = String.fromCharCode(code);

  // if they pressed esc... remove focus from field...
  if (code==27) { this.blur(); return false; }

  // ignore if they are press other keys
  // strange because code: 39 is the down key AND ' key...
  // and DEL also equals .
  if (!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39) && code!=40 && code != 46) {
    if (character.match(/[0-9]/g)) {
      return true;
    } else {
      e.preventDefault();
    }
  }
};

Scribd.restrict_input_to_numbers = function(input) {
  input = $(input);
  input.keypress(Scribd.restrict_to_numbers);
  input.change(Scribd.restrict_to_numbers);
};

//sticky func returns true or false
//if sticky func is true, call fixed_callback
//else call absolute_callback
//sticky and update are each called whenever anything is resized or moved
Scribd.StickyElement = function(element, fixed_callback, absolute_callback, sticky_func, update_func) {
  if(!!( document.all && (/msie 6./i).test(navigator.appVersion) && window.ActiveXObject ))
    return;

  var previous_stickiness = !sticky_func();

  var new_callback = function(force_apply) {
      force_apply = !!force_apply;
      var new_stickiness = sticky_func();
      if(force_apply || (new_stickiness != previous_stickiness)) {
         previous_stickiness = new_stickiness;      
         if(new_stickiness) {
            fixed_callback(element);
         } else {
            absolute_callback(element);
         }
         update_func(element);
      }
   };
  
  var force_apply_callback = function() { new_callback(true); };

  docManager.addEvent('zoomed', force_apply_callback);
  docManager.addEvent('viewmodeChanged', new_callback);
  docManager.addEvent('enteredFullscreen', new_callback);
  docManager.addEvent('exitedFullscreen', new_callback);
  // always make too bar sticky when height changes
  $(document).bind('scribd:dom_height_changed', function(){ 
      previous_stickiness = null;
      force_apply_callback();
  } );
  $(document).bind('resize', force_apply_callback);
  $(window).bind('scroll', new_callback);
  new_callback();
};

Scribd.UI.dispatch = function(e, elm, actions, context) {
  if (elm) {
    for (var name in actions) {
      if (actions.hasOwnProperty(name) && elm.hasClass(name)) {
        e.stopPropagation();
        actions[name].call(context, elm, e);
        return true;
      }
    }
  }
  return false;
};

Scribd.UI.getPager = function(container_id, document_column_id) {
  var obj = {
    margin_top: 4,
    margin_right: 4,
    document_column: $(), // Start document column as an empty selector.

    actions: {
      next_page: function() {
        this.current_page_num = Math.min(this.current_page_num + 1, docManager.pageCount());
        docManager.gotoPage(this.current_page_num);
        this.paging = true;
      },
      prev_page: function() {
        this.current_page_num = Math.max(this.current_page_num - 1, 1);
        docManager.gotoPage(this.current_page_num);
        this.paging = true;
      },
      zoom_in: function() {
        docManager.zoom(1.25);
      },
      zoom_out: function() {
        docManager.zoom(0.8);
      },
      enter_fullscreen: function() {
        if (this.fullscreen_url) {
          window.open(this.fullscreen_url, '_blank');
        } else {
          docManager.enterFullscreen();
          this.$container.addClass("in_fullscreen");
        }
      },
      exit_fullscreen: function() {
        docManager.exitFullscreen();
        this.$container.removeClass("in_fullscreen");
      }
    },

    initialize: function(container_id, document_column_id) {
      this.$container = $('#'+container_id);

      if (docManager.pageCount() == 1) {
        this.$container.find('.pager_top').hide();
        this.$container.find('.pager_bottom').addClass('single');
      }

      this.document_column = $('#' + document_column_id);
      if (this.document_column.length === 0) { return; }

      this.attach = $.proxy(this.attach, this);
      setTimeout(this.attach, 0);

      this.$container.find('.max_page').html(docManager.pageCount());

      this.fullscreen_url = '';

      this.next_page = this.$container.find('.next_page');
      this.prev_page = this.$container.find('.prev_page');

      var _this = this;
      docManager.addEvent("expectedFirstPageChanged", function(page_num) {
        _this.on_update_page_num(page_num);
      });

      setTimeout(function() {
        _this.on_update_page_num(docManager.firstVisiblePage.pageNum);
      }, 0);

      this.$container.click(function(e) {
        var elm = $(e.target).closest('div');
        if (elm.hasClass('disabled')) { return; }
        Scribd.UI.dispatch(e, elm, _this.actions, _this);
      });

      // Lock down the position of the pager when we mouse over it, so it doesn't
      // move out from under the mouse.
      // Deactivate locking when we move off of the pager.
      this.$container.bind("mouseenter", function(e) { _this.lock_position(); });
      this.$container.bind("mouseleave", function(e) { _this.unlock_position(); });

      this.page_input = this.$container.find('.page_input');
      Scribd.restrict_input_to_numbers(this.page_input);

      this.page_input.click(function() {
        _this.page_input.select();
      });

      this.page_input.change(function() {
        _this.update_page_from_input();
      });
      this.page_input.keypress(function(e) {
        if (e.keyCode == 13) { // Enter key
          _this.update_page_from_input();
        }
      });

      this.page_input.bind("focus", function() {
        _this.$container.addClass("input_focused");
      });

      this.page_input.bind("blur", function() {
        _this.$container.removeClass("input_focused");
      });
    },
    set_fullscreen_url: function(url) {
      this.fullscreen_url = url;
    },
    update_page_from_input: function() {
      var page_num = parseInt(this.page_input.val(), 10);
      if (!isNaN(page_num)) {
        docManager.gotoPage(Math.min(page_num, docManager.pageCount()));
      }
    },
    on_update_page_num: function(page_num) {
      if (this.paging) {
        if (page_num == this.current_page_num) {
          this.paging = false;
        }
      } else {
        this.current_page_num = page_num;
      }

      this.page_input.val(this.current_page_num);

      if (this.current_page_num == 1) {
        this.prev_page.addClass("disabled");
      } else {
        this.prev_page.removeClass("disabled");
      }

      if (this.current_page_num == docManager.pageCount()) {
        this.next_page.addClass("disabled");
      } else {
        this.next_page.removeClass("disabled");
      }
    },
    attach: function() {
      var _this = this;
      var pager_size = {width: _this.$container.width(), height: _this.$container.height()};
      var absolute_top = true; // align to top or bottom of document

      function calc_left(doc_offset_left, position_type) {
        // If we are using position: fixed, we need to account for the horizontal scroll.
        var scroll = {left: $(window).scrollLeft(), top: $(window).scrollLeft()};
        if (position_type === 'fixed') {
          doc_offset_left -= scroll.left;
        }

        // Find the position of the right edge of the document.
        var doc_width = $('#outer_page_1').width() + 10;
        var right = doc_offset_left + doc_width;

        // If the document right edge has gone off the right side of the
        // screen, just align the pager with the right edge of the screen
        // instead.
        var window_right = $(window).width();
        if (position_type === 'absolute') {
          window_right += scroll.left;
        }
        if (doc_offset_left + doc_width > window_right) {
          right = window_right;
        }

        // Account for the margin and the width of the pager.
        return (right - _this.margin_right - pager_size.width) + "px";
      }

      Scribd.StickyElement(_this.$container,
        function(elm) { // fixed
          if (_this.locked) {
            _this.set_locked_position();
            return;
          }
          if (_this.document_column.length === 0) { return; }
          var doc_offset = _this.document_column.offset();
          elm.css({
            position: "fixed",
            top: _this.margin_top + "px",
            left: calc_left(doc_offset.left, 'fixed')
          });
        },
        function(elm) { // absolute
          if (_this.locked) {
            _this.set_locked_position();
            return;
          }
          if (_this.document_column.length === 0) { return; }
          var doc_offset = _this.document_column.offset();
          var y;
          if (absolute_top)  {
            y = doc_offset.top + _this.margin_top;
          } else {
            var doc_height = _this.document_column.height();
            y = doc_offset.top + doc_height - pager_size.height - _this.margin_top;
          }
          elm.css({
            position: "absolute",
            top: y + "px",
            left: calc_left(doc_offset.left, 'absolute')
          });
        },
        function() { // stick, true if fixed
          var scroll = {left: $(window).scrollLeft(), top: $(window).scrollTop()};
          if (_this.document_column.length === 0) { return; }
          var doc_offset = _this.document_column.offset();
          var doc_height = _this.document_column.height();

          if (scroll.top <= doc_offset.top) {
            absolute_top = true;
            return false;
          } 

          if (doc_offset.top + doc_height - scroll.top < pager_size.height + _this.margin_top) {
            absolute_top = false;
            return false;
          }
          return true;
        },
        function() {});
    },
    lock_position: function() {
      this.locked = true;
      this.locked_position = this.$container.offset();
      this.locked_position.left -= $(window).scrollLeft();
      this.locked_position.top -= $(window).scrollTop();
    },
    unlock_position: function() {
      this.locked = false;
      // Force StickyElement to update.
      $(document).trigger("scribd:dom_height_changed");
    },
    set_locked_position: function() {
      this.$container.css({
        position: "fixed",
        top: this.locked_position.top + "px",
        left: this.locked_position.left + "px"
      });
    },
    hide_zoom_controls: function() {
      this.$container.find('.pager_bottom').addClass('hide_zoom_controls');
    }
  };

  obj.initialize(container_id, document_column_id);
  return obj;
};

var pager_html = '' +
    '<div class="pager_top">' +
        '<div class="row">' +
            '<div class="prev_page">' +
            '</div>' +
        '</div>' +
        '<div class="middle">' +
            '<div class="row">' +
                '<input class="page_input" type="text" />' +
            '</div>' +
            '<div class="row">' +
                '<span class="decor"> of </span>' +
                '<span class="max_page"> 00</span>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="next_page">' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="pager_bottom">' +
        '<div class="row">' +
            '<div class="zoom_in">' +
                '<span class="zoom_in_icon">' +
                '</span>' +
            '</div>' +
            '<div class="zoom_out">' +
                '<span class="zoom_out_icon">' +
                '</span>' +
            '</div>' +
        '</div>' +
        '<div class="enter_fullscreen">' +
        '</div>' +
        '<div class="exit_fullscreen">' +
        '</div>' +
    '</div>';
scribd.pagerReady(pager_html);

})(scribd.jQuery || jQuery);
