function showToastr(options) {
	options = options || {};

	/**
	* Config:
	* @param {String} message - The message of the toastr.
	* @param {String}a icon - The class of the icon to be displayed (icon-gizmo-check by default).
	* @param {Number} topDistance - Distance to the top (78 by default).
	* @param {String} linkUrl - URL of the link to be displayed.
	* @param {String} linkText - Text of the link to be displayed (leave empty if no link is needed).
	* @param {String} toastrClass - Type of toastr: alert-toastr, error-toastr, info-toastr or warning-toastr
	* @param {Boolean} remainOpen - The ID of the {@link PLC} object where this tag belongs.
	* @param {Boolean} hasCurtain - Does the toastr have a background curtain (false by default).
	*/

	var config = {
		message: options.message || '', // String
		icon: options.icon || 'icon-gizmo-check', // String
		topDistance: options.topDistance || 78, // Number
		linkUrl: options.linkUrl || '', // String
		linkText: options.linkText || '', // String
		toastrClass: options.toastrClass || '', // String [alert-toastr, error-toastr, info-toastr, warning-toastr]
		remainOpen: options.remainOpen || false, // Boolean
		hasCurtain: options.hasCurtain || false // Boolean
	};

	$('#toastrMessage').html(config.message);
	$('#toastrIcon').addClass(config.icon);

	if (config.linkUrl && config.linkText) {
		$('.toastr-link').show();
		$('#toastrLink').attr('href', config.linkUrl);
		$('#toastrLink').html(config.linkText);
	}
	

	var distance = (parseInt(config.topDistance) + document.scrollingElement.scrollTop).toString();
	$('#genericToastr')
		.addClass(config.toastrClass)
		.show()
		.animate({
			top: distance
		}, 200, function() {
			if (!config.remainOpen) {
				setTimeout(function() {
					closeToastr(distance);
				},3000);
			}
		});

	if (config.hasCurtain) {
		$('<div class="toastr-curtain">')
			.insertAfter('#genericToastr')
			.fadeIn('fast');
	}
}

function closeToastr(distance) {
	distance = distance || (parseInt(78) + document.body.scrollTop).toString();
	$('#genericToastr').fadeOut(200, 0, function(){
		$(this).css({
			'top' : '-' + distance,
			'opacity' : '1'
		});

		if ($('.toastr-curtain').length) {
			$('.toastr-curtain').fadeOut('fast', function() {
				$(this).remove();
			});
		}
	});
}

$('body').on('click', '.toastr-curtain', function() {
	closeToastr();
});