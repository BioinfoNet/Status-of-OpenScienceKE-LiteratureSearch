$(window).on('load', function(){
	var render_type;
	if($('#article_wrap')[0]) { render_type="article"; }
	else if($('.chapter_wrap')[0]) { render_type="chapter"; }
	
	load_functions(render_type);
	
	var window_width = $(window).width();
	$(window).on('resize',function(){ window_width = resize_functions(window_width); });
	$(window).on('scroll',function(){ scroll_functions(); });
	$('.filter_interact_title').on('click',function(){ toggle_leftnav('toggle'); });
	toggle_leftnav('size');
	
// 	var lastscrolltop_lnw = 0;
// 	var lastscrolltop_header = 0;
// 	var header = $('#header');
// 	var lnw = $('#leftnav_wrap');
// 	var data_lnw = [lastscrolltop_lnw,0];
// 	var data_header = [lastscrolltop_header,0];
// 	var is_search;
// 	if($(lnw).html()) { is_search = 1; }
	
// 	onload process
// 	data_header = reposition_header(header,0,data_header[0],data_header[1]);
// 	if(is_search) { data_lnw = reposition_lnw(lnw,$(header).height(),data_lnw[0],data_lnw[1]); }	
	
// 	$(window).scroll(function(e){
// 		onscroll process
// 		check_scrolled_header();
// 		data_header = reposition_header(header,0,data_header[0],data_header[1]);
// 		if(is_search) { data_lnw = reposition_lnw(lnw,$(header).height(),data_lnw[0],data_lnw[1]); }
// 	});
// 	$(window).resize(function(e){
// 		onresize process
// 		var width = $(window).width();
// 		if(width != window_width) {
// 			data_header = reposition_header(header,0,data_header[0],data_header[1]);
// 			if(is_search) { data_lnw = reposition_lnw(lnw,$(header).height(),data_lnw[0],data_lnw[1]); }	
// 		}
// 		window_width = width;
// 	});
	
});



// back to top button
var hasScrolled;
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 250;
var animatedScroll = false;
var lastAnimatedScroll = false;
function hasScrolled() {
	var st = $(this).scrollTop();
	// Make sure they scroll more than delta
	if(Math.abs(lastScrollTop - st) <= delta)
		return;
	// If they scrolled down and are past the navbar, show button
	if (st > lastScrollTop && st > navbarHeight){
		// Scroll Down
		$('#btn_top').fadeIn();
	} else {
		// Scroll Up
		if(st + $(window).height() < $(document).height()) {
			$('#btn_top').fadeOut();
		}
	}
	lastScrollTop = st;
}
$(window).scroll(function(event){
	lastAnimatedScroll = animatedScroll;
	animatedScroll = $('html, body').is(':animated');
	if (!animatedScroll) {
		didScroll = true;
	}
});
setInterval(function() {
	if (didScroll) {
	  hasScrolled();
	  didScroll = false;
	}
}, 250);
$("#btn_top").click(function(e) {
    e.preventDefault();
    $(window).scrollTop(0);
});
	
	
// 	---------------Function List---------------
	
	
// 	=========Meta Functions=========
	function load_functions(render_type) {
		var width = $(window).width();
		css_updates();
		reset_inputs();
// 		match_card_cols();
		header_align();
		view_citations(render_type);
// 		header_truncate([$('#institution span'),$('#person span')]);
	}
	
	function resize_functions(window_width) {
		var width = $(window).width();
		if(width != window_width) {
			reset_inputs();
			header_align();
			toggle_leftnav('size');
			toggle_leftnav('show');
			leftnav_minh();
			css_updates();
		}
		return width;
// 		check_scrolled_header();
	}
	
	function scroll_functions() {

	}
	
	
	
// 	=========Actual Functions=========
	function css_updates() {
		$('.banner_search').css('margin-left','-4em');
// 		var header_height = $('#header').height();
// 		var main_ref = '#main';
// 		var is_search = 0;
// 		if($('main').html()) { main_ref = 'main'; }
// 		if($('leftnav_wrap').html()) { is_search = 1; }
// 		var bw = $('body').width()/16;
// 		var padding = header_height;
// 		if($('.page404, .page500').html()) { padding += 30; }
// 		if(bw <= 64) { padding = 200; }
// 		if(bw <= 40) { padding = 210; }
// 		if(bw <= 30) { padding = 230; }
// 		if(bw <= 64 && header_height < 100) { padding = 89; }
// 		if(bw <= 40 && header_height < 100) { padding = 80; }
// 		
// 		$(main_ref).css('padding-top',padding);
// 		$('#header,#leftnav_wrap').addClass('absolute');
	}

// 	=========================================================	
	function add_remove_scrolled_header(type) {
		var classlist = document.getElementById('header').classList;
		if(type == 'remove' && classlist.contains('scrolled_header')) { $('#header').removeClass('scrolled_header'); }
		else if(type == 'add' && !classlist.contains('scrolled_header')) { $('#header').addClass('scrolled_header'); }
	}
	
// 	=========================================================	
	function check_scrolled_header() {
		var st = $(window).scrollTop();
		var bw = $('body').width()/16;
		if(st > $(header).height()) {
			if(bw <= 40) { add_remove_scrolled_header('add'); }
			else { add_remove_scrolled_header('remove'); }
		} else {
			add_remove_scrolled_header('remove');
		}
	}
	
// 	=========================================================		
	function leftnav_minh() {
		var minh = $('#header').height();
		var st = $(window).scrollTop();
		if(st <= minh) {
			$('#leftnav_wrap').css('top',minh);
		}
	}
	
// 	=========================================================
	function reposition_lnw(ref,minh,lastst,hold_pos) {
		var st = $(window).scrollTop();
		if(st < 0) { st = 0; }
		var lnw_height = minh + $(ref).height();
		if(st > lastst) {
			update_lnwh(ref,'absolute',hold_pos + minh);
		} else {
			if(hold_pos == minh) { hold_pos = st; }
			if(st > hold_pos) {
				if(st > hold_pos + lnw_height) {
					hold_pos = st;
					update_lnwh(ref,'absolute',hold_pos + minh);
				}
				if(lnw_height < 1000) {
					hold_pos = st;
					update_lnwh(ref,'absolute',hold_pos + minh);
				}
			}
			else {
				hold_pos = st;
				update_lnwh(ref,'fixed',minh);
			}
		}
		return [st,hold_pos];
	}

// 	=========================================================
	function reposition_header(ref,minh,lastst,hold_pos) {
		var st = $(window).scrollTop();
		if(st < 0) { st = 0; }		
		if(st > lastst) { update_lnwh(ref,'absolute',hold_pos);	}
		else {
			hold_pos = st;
			update_lnwh(ref,'fixed',0);
		}
		return [st,hold_pos];
	}
	
// 	=========================================================	
	function update_lnwh(ref,pos,num) {
		var classlist = document.getElementById('header').classList;
		if(classlist.contains('absolute') && classlist.contains('fixed')) { $(ref).removeClass('fixed'); }
		if($('#leftnav_wrap').html()) {
			classlist = document.getElementById('leftnav_wrap').classList;
			if(classlist.contains('absolute') && classlist.contains('fixed')) { $(ref).removeClass('fixed'); }
		}
		var alt = 'absolute';
		if(pos == 'absolute') { alt = 'fixed'; }
		if($(ref).hasClass(pos)) {}
		else { $(ref).removeClass(alt).addClass(pos); }
		$(ref).css('top',num);
	}
	
// 	=========================================================
	function view_citations_width_calc() {
		if($(window).width() < 1008) { return '80%'; }
		else { return '60%'; }
	}
	
// 	=========================================================	
	function view_citations() {
		var render_type = 'article';		
		var id;
		var url = window.location.href;
		if(url.match(/\/book\//) || url.match(/\/chapter\//)) { render_type = 'book'; }
		if(url.match(/\/chapter\//)) {
			var regex = $('#book_banner_title a').attr('href');
			id = regex.replace(/.*\/(\d+)/,'$1');
		} else {
			id = url.replace(/.*\/(\d+)/,'$1');
		}
		var width = view_citations_width_calc();
	    $('.view_citation').qtip({
		  content: {
			text: 'Loading',
			title: {
			  text: '<h5>Citation</h5>',
			  button: 'Close'
			},
			ajax: {
			  position: {        
				  target: $('.view_citation'),
				  my: 'topMiddle',
				  at: 'bottomMiddle',
			  },
			  url:  '/view_citations',
			  type: 'GET',
			  data: {
				request_type : 'ajax',
				type  : render_type,
				id    : id
			  },
			  success: function(data) {
				this.set('content.text', data);
			  }
			}
		  },
		  show: 'click',
		  hide: {
			event: 'unfocus'
		  },
		  position: {
			my: 'topLeft',
			at: 'topLeft',
			target: $('.view_citation'),
			adjust: {
				y:18
			}
		  },
		  style: {
			width: width
		  }
		}).bind('click', function(event){ event.preventDefault(); return false; });
	}
	
// 	=========================================================	
	function get_screen_width() {
		return $(window).width();
	}
	
// 	=========================================================
	function toggle_leftnav(type) {
		var bw = $('body').width()/16;
		var lg = 63.0625;
		var md = 40;
		var sm = 39.9375;
		if($('.filter_interact_title').is(':visible') && type == 'toggle') { $('#leftnav').toggle(); }
		else if($('.filter_interact_title').is(':hidden') && type == 'show') { $('#leftnav').show(); }
		else if(type == 'size' && bw < lg) { $('#leftnav').hide(); }
	}

// 	=========================================================
	function reset_inputs() {
		var rightnav = $('#rightnav_wrap');
		var rnav_w = $(rightnav).width();
		$('#journal_banner_search_wrap, #book_banner_search_wrap').width(rnav_w);
	}

// 	=========================================================
	
	function header_truncate(ref) {
		for(var i=0;i<ref.length;i++) {
			var index = ref[i];
			var html = $(index).html();
			if(html.length>60) {
				var short_text = $.trim(html).substring(0, 60).split(" ").slice(0, -1).join(" ") + "...";
				$(index).html(short_text);			
			}
		}
	}

// 	=========================================================
	
	function header_align() {
		var header_img = $('#institution_wrap img');
		var wrap_height = $('#institution_wrap').height();
	}
	
// 	=========================================================
	
	function match_card_cols() {
		$('.card_image').each(function(){
			var img_h = $(this).height();
			var text_h = $(this).closest('.card').find('.card_text').height();
			$(this).css('min-height',text_h);
		});
	}
	
// 	=========================================================

	function isScrolledIntoView(elem)
	{
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
		
// 		console.log('top: '+docViewTop+' bottom:'+docViewBottom);

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();
		
// 		console.log('elemtop: '+elemTop+' elem bottom'+elemBottom);

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	
	
// 	=========================================================	
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
// 	=========================================================
	function set_rid_animate() {
		$('.animated_focus_ref').click(function(e){
			e.preventDefault();
			focus_source("rid",$(this));
		});		
		$(document).on('keypress','.animated_focus_ref',function(e) {
			if(e.which === 13) {
				e.preventDefault();
				focus_source_rid("rid",$(this));
			}
		});
	}
// 	=========================================================
	function focus_source(type,ref) {
		var id = $(ref).attr('href');
		var matched;
		if(type=='fn') {
			var regid = id.replace('#','');
			matched = $('[name='+regid+']');
			for(var i=0;i<matched.length;i++) {
				if($(matched).closest('.fn-group, .ref-list').length > 0) {
					if(get_screen_width() > 1008) { 
						matched.splice(i,1);
					}
					else {
						matched = matched[i];
						break;
					}
				} else {
					if(i===0) {
						matched = matched[i];
						break;
					}
				}
			}
		}
		else {
			matched = $(id)[0];
		}
		$(matched).scrollView();
		$(matched).focus();
	}
	
// 	=========================================================
	$.fn.scrollView = function () {
		this.each(function () {
			var pos = parseInt($(this).offset().top);
			if((pos != null) && (pos > 0)) {
				$('html').animate({
				  scrollTop: $(this).offset().top
				}, 400);
			}
		});
    }
    
// 	=========================================================
    function get_link_xy(ref) {
        return [parseInt(get_screen_width()/10),parseInt($(ref).offset().top)+10];
    }

// 	=========================================================
    function remove_qtip(ref){
        $(ref).qtip('destroy',true);
    }