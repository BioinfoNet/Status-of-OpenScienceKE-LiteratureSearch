
/* ========================================================
*
* Londinium - premium responsive admin template
*
* ========================================================
*
* File: application.js;
* Description: General plugins and layout settings.
* Version: 1.0
*
* ======================================================== */



//$(function() {
jQuery(function($){

/* # Bootstrap Plugins
================================================== */

	//===== Tooltip =====//

	$('.tip').tooltip();


	//===== Popover =====//

	$("[data-toggle=popover]").popover().click(function(e) {
		e.preventDefault()
	});


	//===== Loading button =====//

	$('.btn-loading').click(function () {
		var btn = $(this)
		btn.button('loading')
		setTimeout(function () {
			btn.button('reset')
		}, 3000)
	});


	//===== Add fadeIn animation to dropdown =====//

	$('.dropdown, .btn-group').on('show.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100);
	});


	//===== Add fadeOut animation to dropdown =====//

	$('.dropdown, .btn-group').on('hide.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100);
	});


	//===== Prevent dropdown from closing on click =====//

	$('.popup').click(function (e) {
		e.stopPropagation();
	});






/* # Interface Related Plugins
================================================== */


	//===== Sparkline charts =====//
	
	$('.bar-danger').sparkline(
		'html', {type: 'bar', barColor: '#D65C4F', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);
	$('.bar-success').sparkline(
		'html', {type: 'bar', barColor: '#65B688', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);

	$('.bar-primary').sparkline(
		'html', {type: 'bar', barColor: '#32434D', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);
	$('.bar-warning').sparkline(
		'html', {type: 'bar', barColor: '#EE8366', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);
	$('.bar-info').sparkline(
		'html', {type: 'bar', barColor: '#3CA2BB', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);
	$('.bar-default').sparkline(
		'html', {type: 'bar', barColor: '#ffffff', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);

	/* Activate hidden Sparkline on tab show */
	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
		$.sparkline_display_visible();
	});

	/* Activate hidden Sparkline */
	$('.collapse').on('shown.bs.collapse', function () {
	  $.sparkline_display_visible();
	});


	//===== Fancy box (lightbox plugin) =====//

	$(".lightbox").fancybox({
		padding: 1
	});


	//===== DateRangePicker plugin =====// 

	$('#reportrange').daterangepicker(
	{
		startDate: moment().subtract('days', 29),
		endDate: moment(),
		minDate: '01/01/2012',
		maxDate: '12/31/2014',
		dateLimit: { days: 60 },
		ranges: {
		'Today': [moment(), moment()],
		'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
		'Last 7 Days': [moment().subtract('days', 6), moment()],
		'This Month': [moment().startOf('month'), moment().endOf('month')],
		'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
	},
	opens: 'left',
	buttonClasses: ['btn'],
	applyClass: 'btn-small btn-info btn-block',
	cancelClass: 'btn-small btn-default btn-block',
	format: 'MM/DD/YYYY',
	separator: ' to ',
	locale: {
		applyLabel: 'Submit',
		fromLabel: 'From',
		toLabel: 'To',
		customRangeLabel: 'Custom Range',
		daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
		monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		firstDay: 1
		}
	},
	function(start, end) {
		$.jGrowl('A date range was changed', { header: 'Update', position: 'center', life: 1500 });
		$('#reportrange .date-range').html(start.format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>') + '<em> - </em>' + end.format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>'));
	}
	);
	
	/* Custom date display layout */
	$('#reportrange .date-range').html(moment().subtract('days', 29).format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>') + '<em> - </em>' + moment().format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>'));
	$('#reportrange').on('show', function(ev, picker) {
	  $('.range').addClass('range-shown');
	});

	$('#reportrange').on('hide', function(ev, picker) {
	  $('.range').removeClass('range-shown');
	});


	//===== Bootstrap switches =====// 

	$('.switch').bootstrapSwitch();


	//===== Fullcalendar =====//

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var calendar = $('.fullcalendar').fullCalendar({
		header: {
			left: 'prev,next,today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		selectable: true,
		selectHelper: true,
		select: function(start, end, allDay) {
			var title = prompt('Event Title:');
			if (title) {
				calendar.fullCalendar('renderEvent',
					{
						title: title,
						start: start,
						end: end,
						allDay: allDay
					},
					true // make the event "stick"
				);
			}
			calendar.fullCalendar('unselect');
		},
		editable: true,
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			}
		]
	});

	/* Render hidden calendar on tab show */
	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
		$('.fullcalendar').fullCalendar('render');
	});


	//===== Code prettifier =====//

    window.prettyPrint && prettyPrint();


	//===== Time pickers =====//

	$('#defaultValueExample, #time').timepicker({ 'scrollDefaultNow': true });
	
	$('#durationExample').timepicker({
		'minTime': '2:00pm',
		'maxTime': '11:30pm',
		'showDuration': true
	});
	
	$('#onselectExample').timepicker();
	$('#onselectExample').on('changeTime', function() {
		$('#onselectTarget').text($(this).val());
	});
	
	$('#timeformatExample1, #timeformatExample3').timepicker({ 'timeFormat': 'H:i:s' });
	$('#timeformatExample2, #timeformatExample4').timepicker({ 'timeFormat': 'h:i A' });


	//===== Color picker =====//

	$('.color-picker').colorpicker();

	$('.color-picker-hex').colorpicker({
		format: 'hex'
	});
	
	/* Change navbar background color */
	var topStyle = $('.navbar-inverse')[0].style;
	$('.change-navbar-color').colorpicker().on('changeColor', function(ev){
		topStyle.background = ev.color.toHex();
	});


	//===== jGrowl notifications defaults =====//

	$.jGrowl.defaults.closer = false;
	$.jGrowl.defaults.easing = 'easeInOutCirc';


	//===== Collapsible navigation =====//
	
	$('.sidebar-wide li:not(.disabled) .expand, .sidebar-narrow .navigation > li ul .expand').collapsible({
		defaultOpen: 'second-level,third-level',
		cssOpen: 'level-opened',
		cssClose: 'level-closed',
		speed: 150,
		cookieName: 'collapsible',
	    cookieOptions: {
	        path: '/',
	        expires: 7,
	        domain: '',
	        secure: ''
	    }

	});



	/* # Form Related Plugins
	================================================== */

	//===== Form elements styling =====//
	
	$(".styled, .multiselect-container input").uniform({ radioClass: 'choice', selectAutoWidth: false });



/* # Default Layout Options
================================================== */


	//===== Appending sidebar to different div's depending on the window width =====//

	$(window).resize(function () {
		if ($(window).width() < 992) {
		   $('.sidebar').appendTo('.navbar');
		}
		else {
		   $('.sidebar').appendTo('.page-container');
		}
	}).resize();


	//===== Panel Options (collapsing, closing) =====//

	/* Collapsing */
	$('[data-panel=collapse]').click(function(e){
	e.preventDefault();
	var $target = $(this).parent().parent().next('div');
	if($target.is(':visible')) 
	{
	$(this).children('i').removeClass('icon-arrow-up9');
	$(this).children('i').addClass('icon-arrow-down9');
	}
	else 
	{
	$(this).children('i').removeClass('icon-arrow-down9');
	$(this).children('i').addClass('icon-arrow-up9');
	}            
	$target.slideToggle(200);
	});

	/* Closing */
	$('[data-panel=close]').click(function(e){
		e.preventDefault();
		var $panelContent = $(this).parent().parent().parent();
		$panelContent.slideUp(200).remove(200);
	});


	//===== Showing spinner animation demo =====//

	$('.run-first').click(function(){
	    $('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner2 spin"></i></div>');
	    $('.overlay').fadeIn(150);
		window.setTimeout(function(){
	        $('.overlay').fadeOut(150, function() {
	        	$(this).remove();
	        });
	    },5000); 
	});

	$('.run-second').click(function(){
	    $('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner3 spin"></i></div>');
	    $('.overlay').fadeIn(150);
		window.setTimeout(function(){
	        $('.overlay').fadeOut(150, function() {
	        	$(this).remove();
	        });
	    },5000); 
	});

	$('.run-third').click(function(){
	    $('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner7 spin"></i></div>');
	    $('.overlay').fadeIn(150);
		window.setTimeout(function(){
	        $('.overlay').fadeOut(150, function() {
	        	$(this).remove();
	        });
	    },5000); 
	});


	//===== Hiding sidebar =====//

	$('.sidebar-toggle').click(function () {
		$('.page-container').toggleClass('sidebar-hidden');
	});


	//===== Disabling main navigation links =====//

	$('.navigation li.disabled a, .navbar-nav > .disabled > a').click(function(e){
		e.preventDefault();
	});


	//===== Toggling active class in accordion groups =====//

	$('.panel-trigger').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});


});