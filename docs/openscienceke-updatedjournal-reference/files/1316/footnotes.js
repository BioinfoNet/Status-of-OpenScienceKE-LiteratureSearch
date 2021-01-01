// ===========
// Version 4.2.7
// ===========

$(window).on("load", function(){
	var render_type;
	if($('#article_wrap')[0]) { render_type="article"; }
	else if($('.chapter_wrap')[0]) { render_type="chapter"; }
	else if($('.bits_wrap')[0]) { render_type="primary_source"; }
	
// 	obj {
// 		{ ar [
// 			{ id, pos }
// 		] }
// 		{ arc [
// 			{ id, html }
// 		] }
// 		{ fng { [
// 				{ id, html, pos, fng_id }
// 			]
// 		} }
// 	}
	
// 	load_functions() -> populates obj
// 	populate_footnotes for obj calls grab_footnote_container() twice and compares the results- footnote callout vs footnote text
// 	ar = all_references, arc = all_references_content
// 	break off and check for non-matches with handle_missing(), place at end of body
// 	process align_footnotes(), which generates html WTIH POSITIONAL CSS and appends it to the gutter
// 	process reposition_container(), which adjusts the footer absolute positioning in case of overflow
// 	if the screen is < 1009px or you're not in an article/chapter, do nothing
	
	load_functions_fn(render_type);
		
	if((render_type == 'article') || (render_type == 'chapter') || (render_type == 'primary_source')) {
		var bounce = debounce(function(){
			var fr = 'f';
// 			if(get_screen_width() > 1008) {
			if(get_screen_width() > 1023) {
				var obj = populate_footnotes(render_type);
				if(obj.fng.length > 0) {
// 					flip_fn_display(fr);
					$('#fr_display,#footdrop').show();
					align_footnotes(obj,render_type);
					fn_qtip_order(obj);
				}
				else {
					$('#fr_display,#footdrop').hide();
					$('.ref-list, .ref-list *, .fn-group, .fn-group *').show();
					reposition_container(obj.fng);
				}
			} 
			else {
				$('#footdrop,#fr_display').hide();
				$('.ref-list, .ref-list *, .fn-group, .fn-group *').show();
				var endline = document.getElementById('endline').getBoundingClientRect().bottom + window.pageYOffset;
				$('#footer_block').css('top',endline);
				var obj = populate_footnotes(render_type);
				if(obj.fng.length) { fn_qtip_order(obj); }
			}
		}, 500);
		window.addEventListener('resize',bounce);
		$('#fr_display').on('change',function(){ filter_fr_display(render_type); });
		
		$('.rid-fn-text').click(function(e){
			e.preventDefault();
			focus_source("fn",$(this));
		});		
		$(document).on('keypress','.rid-fn-text',function(e) {
			if(e.which === 13) {
				e.preventDefault();
				focus_source("fn",$(this));
			}
		});
	}
});

// 	=========================================================
	function fn_qtip_order(obj) {
		$('.rid-fn-text').each(function() {
			remove_qtip($(this));
			var regex_id = $(this).attr('name').replace(/-text/,'');
			var results = obj.fng.filter(function(entry) { return entry.id == regex_id; });
			var xy = get_link_xy($(this));
			fn_attach_qtip($(this),results[0],xy);
		});
	}

// 	=========================================================
	function fn_attach_qtip(ref,html_content,xy) {
		var html_source = {};
		if(!html_content) {
			html_source.html = "Cannot locate content.";
		}
		else {
			html_source.html = html_content.html;
		}
		$(ref).qtip({
			content: {
				text: html_source.html
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

// 	=========================================================
	function load_functions_fn(render_type) {
		if((render_type == 'article') || (render_type == 'chapter') || (render_type == 'primary_source')) {
			var fr = 'f';			
			$('.rid-fn-text').each(function(){
				$(this).addClass('ref-hover');
				$(this).attr('data-hasqtip','true');
			});
// 			if(get_screen_width() > 1008) {
			if(get_screen_width() > 1023) {
				var obj = populate_footnotes(render_type);
				if(obj.fng.length > 0) {
// 					flip_fn_display(fr);
					$('#fr_display,#footdrop').show();
					align_footnotes(obj,render_type);
					fn_qtip_order(obj);
				}
				else {
					$('#fr_display,#footdrop').hide();
					$('.ref-list, .ref-list *, .fn-group, .fn-group *').show();
					reposition_container(obj.fng);
				}
			} 
			else {
				$('#footdrop,#fr_display').hide();
				$('.ref-list, .ref-list *, .fn-group, .fn-group *').show();
				var endline = document.getElementById('rightnav_wrap').getBoundingClientRect().bottom + window.pageYOffset;
				$('#footer_block').css('top',endline);
				var obj = populate_footnotes(render_type);
				if(obj.fng.length) { fn_qtip_order(obj); }
			}
		}
		else { $('#footdrop,#fr_display').hide(); }
	}

// 	=========================================================
	function populate_footnotes(render_type) {
		$('#footdrop').html('');
		var fr = 'f';		
		var fng = [];
		var ar = grab_footnote_containers(fr,render_type)[0];
		var arc = grab_footnote_containers(fr,render_type)[1];
		var fngc = 0;
		for(var i=0;i<ar.length;i++) {
			for(var j=0;j<arc.length;j++) {
				var ar_ref = ar[i].id;
				var arc_ref = arc[j].id;
				var ar_ref_corrected = ar_ref.replace(/^.*(f.*)$/,'$1');
				if(ar[i].id == arc[j].id) {
					fng.push({"id":arc[j].id,"html":arc[j].html,"pos":ar[i].pos,"fng_id":fngc});
					fngc++;
				}
				else if(arc[j].id == ar_ref_corrected) {
					fng.push({"id":arc[j].id,"html":arc[j].html,"pos":ar[i].pos,"fng_id":fngc});
					fngc++;
				}
			}
		}
		
		return {"ar":ar,"arc":arc,"fng":fng};
	}
		
// 	=========================================================	
	function grab_footnote_containers(fr,render_type) {
		var all_refs = [];
		var all_refs_content = [];
		var selector = "#back .fn-group .fn, .back .fn-group .fn, #back .ref-list .ref, .back .ref-list .ref";
		if(fr == "f") { selector = "#back .fn-group .fn, .back .fn-group .fn"; }
		else if(fr == "r") { selector = "#back .ref-list .ref, .back .ref-list .ref"; }
		if(render_type == 'chapter') { selector = ".FN, .fn, .footnote"; }
		$('a[href]').each(function(){
				if($(this).closest(".fn").length > 0) {
					return;
				}
				var ref = {};
				var id = $(this).attr('href');
				ref.pos = $(this).offset().top;
				
				var reg1 = id.replace(/\#/,'');
				var reg2 = reg1.replace(/\/chapter\/\d+/,'');
				ref.id = reg2;

				all_refs.push(ref);
		});
		$(selector).each(function(){
			if(render_type == "primary_source") {
				if($(this).closest(".page-thumbnail").length > 0) {
					return;
				}
			}
			var ref = {};
			var id;
			if((render_type == 'article') || (render_type == 'primary_source')) {
				if($(this).hasClass('fn')) {
					id = $(this).find('p a[name]').attr('name');
				} else {
					id = $(this).attr('id');
				}
			}
			else if(render_type == 'chapter') {
				id = $(this).find('a[href]').attr('id');
				if(!id) {
					id = $(this).find('a').attr('id');
				}
			}
			ref.id = id;
			ref.html = $(this).html();
			all_refs_content.push(ref);
		});
		return [all_refs,all_refs_content];
	}

// 	=========================================================	
	function align_footnotes(obj,rt) {
		var fr = 'f';
		var minh = $('#institution_banner').height() + $('#search_banner').height() + $('.aux').height()+60;
		if($('.banner_wrap')) { minh += $('.banner_wrap').height(); }
		
		for(var i=0;i<obj.fng.length;i++) {
			var pos, html, ref;
			var name = "";
			if(obj.fng[i].id.match(/^b/)) { name = "name='"+obj.fng[i].id+"' "; }
			if(i === 0) {
				obj.fng[i].height = 0;
				ref = [0,obj.fng[i]];
				pos = checkpos(ref,minh);
				html = "<li "+name+"class='fn_content fn_"+obj.fng[i].id+"' id='fng_"+i+"' style='top:"+pos+"px'>"+obj.fng[i].html+"</li>";
				obj.fng[i].pos = pos;
				$('#footdrop').append(html);
			}
			else {
				var sel = i-1;
				obj.fng[i-1].height = $('#fng_'+sel).height();
				ref = [obj.fng[i-1],obj.fng[i]];
				pos = checkpos(ref,minh);
				html = "<li "+name+"class='fn_content fn_"+obj.fng[i].id+"' id='fng_"+i+"' style='top:"+pos+"px'>"+obj.fng[i].html+"</li>";
				obj.fng[i].pos = pos;
				$('#footdrop').append(html);
			}
		}
		
		reposition_container(obj.fng);
	}
	
// 	=========================================================	
	function reposition_container(fng) {
		var endline = parseInt(document.getElementById('endline').getBoundingClientRect().bottom + window.pageYOffset);
		var last_id = "fng_"+(fng.length-1);

		if(document.getElementById(last_id)) {
			var lid = parseInt(document.getElementById(last_id).getBoundingClientRect().bottom + window.pageYOffset);
			if(endline >= lid) { $('#footer_block').addClass('repositioned_footer').css('top',endline); }
			else { $('#footer_block').addClass('repositioned_footer').css('top',lid+30); }
		} else { $('#footer_block').addClass('repositioned_footer').css('top',endline); }
	}

// 	=========================================================	
	function checkpos(ref,minh) {
		var pos = 0;
		if(ref[0] === 0) {
			if(ref[1].pos <= minh) { pos = minh + 15; }
			else { pos = ref[1].pos; }
		}
		else {
			var prevtotal = ref[0].height + ref[0].pos;
			if(ref[1].pos <= prevtotal) { pos = prevtotal + 15; }
			else { pos = ref[1].pos; }
		}
		return pos;
	}
	
// 	=========================================================	
	function flip_fn_display(fr) {
		if(fr == "fr") { 
			$('#back .fn-group, .back .fn-group, #back .ref-list, .back .ref-list, #back .fn-group .fn, .back .fn-group .fn').hide();
		}
		else if(fr == "f") { 
			$('#back .fn-group, .back .fn-group, #back .fn-group .fn, .back .fn-group .fn').hide();
			$('#back .ref-list, .back .ref-list').show();
		}
		else if(fr == "r") {
			$('#back .ref-list, .back .ref-list').hide();
			$('#back .fn-group, .back .fn-group, #back .fn-group .fn, .back .fn-group .fn').show();
		}
	}

// 	=========================================================
	function filter_fr_display(render_type) {
		var fr = 'f';
		var obj = populate_footnotes(render_type);
// 		flip_fn_display(fr);
		$('#footdrop,#fr_display').show();
		align_footnotes(obj,render_type);
		reposition_container(obj.fng);		
	}