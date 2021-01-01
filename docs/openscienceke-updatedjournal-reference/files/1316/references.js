// ===========
// Version 4.2
// ===========

$(window).on("load",function(){
	var render_type;
	if($('#article_wrap')[0]) { render_type="article"; }
	else if($('.chapter_wrap')[0]) { render_type="chapter"; }
	
	if(render_type == "article" || render_type == "chapter") {
		var bounce = debounce(function(){
            // if(get_screen_width() > 1008) { set_rid_animate(); }
            if(get_screen_width() > 1023) { set_rid_animate(); }
			else {
				$('.animated_focus_ref').off('click');
				$(document).off('keypress','.animated_focus_ref');
            }
            $('.rid-text').each(function(){
                var xy = get_link_xy($(this));
                remove_qtip($(this));
                ref_attach_qtip($(this),xy);
            });
		}, 500);
		window.addEventListener('resize',bounce);	
		// if(get_screen_width() > 1008) {
        if(get_screen_width() > 1023) {
			$('.rid-text').addClass('animated_focus_ref');
			set_rid_animate();
		}
	}
	$('.rid-text').each(function(){
		if($(this).attr('name').match(/^b\d+/)) { 
			$(this).addClass('ref-hover'); 
            $(this).attr('data-hasqtip','true');
            var xy = get_link_xy($(this));
			ref_attach_qtip($(this),xy);
		}
	});
});

// 	=========================================================
function ref_attach_qtip(ref,xy) {
    var id = $(ref).attr('name').replace(/-text/,'');
	var content;
	var selector = '#back .ref-list .ref#' + id;
	content = $(selector).html();
	if(content && id) {
		$(ref).qtip({
			content: {
				text: content
			},
			show: {
				event: 'mouseenter',
				solo: true
			},
			hide: {
				event: 'mouseleave',
// 				delay: 500,
				fixed: true
            },
            position: {
                target: [xy[0],xy[1]]
            },
            style: {
				classes: 'fn_ref_qtip'
			}
		});
	}
}