$(document).ready(function() {
	$('.versions-btn').click(function(e) {
		var versionsTooltip  = $(this).parent().next();
		$(versionsTooltip).show();
		if($(versionsTooltip).hasClass("in")){
			$(versionsTooltip).css("display","none");
		}
		$(versionsTooltip).toggleClass("in");
	});

	$('.tooltip-close').click(function(e) {
		var versionsTooltip  = $(this).parent();
		$(versionsTooltip).hide();
		$(versionsTooltip).toggleClass("in");
	});

	$('.tooltip .title').hover(function(){
		var mainTitleObject = $($(this).parents().eq(7).find('.title')[0]);
		if($(this)[0].href == mainTitleObject[0].href){
			mainTitleObject.css("color", '#F5662D');
			$(this).find('span').css("color", '#F5662D');
			$(this).css("color", '#F5662D');
		}
	},function(){
		$($(this).parents().eq(7).find('.title')[0]).css("color", '#616161');
		$(this).find('span').css("color", '#616161');
		$(this).css("color", '#616161');
	});

	$('.results .optClickTitle').hover(function(){
		var mainTitleObject = $($(this).parents().eq(2).find('.tooltip .title[href="'+$(this)[0].href+'"]')[0]);
		mainTitleObject.css("color", '#F5662D');
		$(this).css("color", '#F5662D');
		$(this).find('span').css("color", '#F5662D');

	},function(){
		var mainTitleObject = $($(this).parents().eq(2).find('.tooltip .title[href="'+$(this)[0].href+'"]')[0]);
		mainTitleObject.css("color", '#616161');
		$(this).css("color", '#616161');
		$(this).find('span').css("color", '#616161');
	});
});

// Accessibility Version Group Tooltip
function openTooltip(e) {
	var versionsTooltip = $(this).parent().next();
	$(versionsTooltip).show();
		if($(versionsTooltip).hasClass("in")){
			$(versionsTooltip).css("display","none");
		}
		$(versionsTooltip).toggleClass("in");
}

$('.versions-btn').keydown(function(e) {
	if (e.keyCode === 13) {
		openTooltip.call(this);
	}
});

function closeTooltip(e) {
	var versionsTooltip = $(this).parent();
	$(versionsTooltip).hide();
	$(versionsTooltip).toggleClass("in");
}

$('.tooltip-close').keydown(function(e) {
	if (e.keyCode === 13) {
		closeTooltip.call(this);
	}
});