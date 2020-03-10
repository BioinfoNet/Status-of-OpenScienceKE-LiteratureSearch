// This filename has been temporarily repurposed to hold the desktop/mobile CSS switcher for tablets!
YUI().use('node', 'cookie', 'event-base', function (Y) {
	var defaultStyle = "",
	    deviceWidth = screen.width,
	    windowWidth = window.innerWidth,
	    scaleRatio,
	    myHeaderMeasurements = new Object(),
	    myNewHeaderMeasurements = new Object(),
	    myHeader,
	    bodyPaddingTop,
	    orientation = window.orientation;

	Y.on('contentready', initialLoad, '#header');

	function initialLoad() {
		bodyPaddingTop = parseFloat(Y.one("body").getStyle('paddingTop'));

		measureHeader();
		setScaleRatio();
		setDefaultStyle();
		applyStyle();
		headShrinker();

		// Add switcher links if necessary
		if (
			(Y.Cookie.get("hideSwitcher") != "yes" ) // If the hideSwitcher cookie is not set
			&& ( orientation != undefined ) // If the device is rotateable (i.e. mobile)
			&& ( deviceWidth < 801) // If the device is tablet-sized
		) {
			addSwitcher();
		};

		// Add rotation listeners
		window.addEventListener("orientationchange", function() {
			setScaleRatio();
			headShrinker();
		}, false);
		window.addEventListener("resize", function() {
			setTimeout(function() {
				setScaleRatio();
				headShrinker();
			}, 500);
		}, false);
	}
	
	function measureHeader() {
		myHeader = Y.all("#header, #header *, #navigation, #navigation *");
		// Measure the header
		myHeader.generateID();
		myHeader.each( function(taskNode) {
			myHeaderMeasurements[taskNode.get('id')] = new Object();
			myNewHeaderMeasurements[taskNode.get('id')] = new Object();
			myHeaderMeasurements[taskNode.get('id')].width = parseFloat(taskNode.getComputedStyle('width'));
			myHeaderMeasurements[taskNode.get('id')].height = parseFloat(taskNode.getComputedStyle('height'));
			myHeaderMeasurements[taskNode.get('id')].paddingTop = parseFloat(taskNode.getStyle('paddingTop'));
			myHeaderMeasurements[taskNode.get('id')].paddingRight = parseFloat(taskNode.getStyle('paddingRight'));
			myHeaderMeasurements[taskNode.get('id')].paddingBottom = parseFloat(taskNode.getStyle('paddingBottom'));
			myHeaderMeasurements[taskNode.get('id')].paddingLeft = parseFloat(taskNode.getStyle('paddingLeft'));
			myHeaderMeasurements[taskNode.get('id')].marginTop = parseFloat(taskNode.getStyle('marginTop'));
			myHeaderMeasurements[taskNode.get('id')].marginRight = parseFloat(taskNode.getStyle('marginRight'));
			myHeaderMeasurements[taskNode.get('id')].marginBottom = parseFloat(taskNode.getStyle('marginBottom'));
			myHeaderMeasurements[taskNode.get('id')].marginLeft = parseFloat(taskNode.getStyle('marginLeft'));
			myHeaderMeasurements[taskNode.get('id')].fontSize = parseFloat(taskNode.getStyle('fontSize'));
			myHeaderMeasurements[taskNode.get('id')].lineheight = parseFloat(taskNode.getStyle('lineHeight'));
		});
	}

	function setScaleRatio() {
		if (navigator.platform.indexOf('Linux') !== -1) { // If Android phone
			scaleRatio = window.innerWidth / 980;
		} else if (navigator.platform.indexOf('iP') !== -1) { // If iDevice
			scaleRatio = deviceWidth / 980;
		} else {
			scaleRatio = 1;
		}
	}

	function setDefaultStyle() {
		// Set default style based on orientation
		if (orientation == undefined) {
			defaultStyle = "desktop";
		} else {
			defaultStyle = "mbl"
		};

		// If stylePref cookie is set, overwrite defaultStyle with cookie value
		var stylePref = Y.Cookie.get("stylePref");
		if (stylePref) { defaultStyle = stylePref; };
	}

	function applyStyle() {
		if (defaultStyle == "mbl") {
			Y.one("body").addClass("mbl");
			Y.one("body").removeClass("desktop");
		};
		if (defaultStyle == "desktop") {
			Y.one("body").addClass("desktop");
			Y.one("body").removeClass("mbl");
		};
	}

	function headShrinker() {
		if ( Y.UA.ie == 0 || Y.UA.ie >= 9  ) {
			// Apply the scale ratio
			for (id in myHeaderMeasurements) {
				for (property in myHeaderMeasurements[id]) {
					myNewHeaderMeasurements[id][property] = myHeaderMeasurements[id][property] * scaleRatio;
				}
			}

			// Apply the new measurements
			if (defaultStyle == "mbl") {
				for (id in myNewHeaderMeasurements) {
					for (property in myNewHeaderMeasurements[id]) {
						if (property == "fontSize") {
							Y.one('#' + id).setStyle(property, myNewHeaderMeasurements[id][property] + 'px');
						} else {
							Y.one('#' + id).setStyle(property, myNewHeaderMeasurements[id][property]);
						}
					}
				}
			} else if (defaultStyle == "desktop") {
				for (id in myHeaderMeasurements) {
					for (property in myHeaderMeasurements[id]) {
						if (property == "fontSize") {
							Y.one('#' + id).setStyle(property, myHeaderMeasurements[id][property] + 'px');
						} else {
							Y.one('#' + id).setStyle(property, myHeaderMeasurements[id][property]);
						}
					}
				}
			}

			// If it's an article info page, allow room for the Download button
			Y.on('contentready',function() {
				if (Y.one('.mbl #beta_7-3')) {
					if ( !(Y.one('.mbl #ir-book')) ) { // But not if it's an ir_book article info page!
						Y.one('.mbl #main').setStyle('paddingTop', '5em');
					}
				}
			},'#beta_7-3');
		}
	}

	function addSwitcher() {
		var mySwitcher = Y.Node.create('<div></div>')
			.set('id', 'cssSwitcher')
			.append(
				Y.Node.create('<a></a>')
					.set('id', 'closeSwitcher')
					.set('title', 'Close')
					.set('href', '#')
					.setHTML( '&times;' )
			)
			.append(
				Y.Node.create('<a></a>')
					.set('id', 'cssSwitcherLink')
					.set('title', 'Switch view')
					.set('href', '#')
					.setHTML(
						"<i class='icon-exchange'></i>"
						+ " Switch to "
						+ "<span class='desktopLink'>desktop</span><span class='mobileLink'>mobile</span>"
						+ " view"
					)
			);

		Y.one("body").prepend(mySwitcher);

		// Attach click-handlers
		switcherHider();
		styleSwitcher();
	}

	function switcherHider() {
		Y.one("#closeSwitcher").on("click", function (e) {
			e.preventDefault();
			Y.Cookie.set("hideSwitcher", "yes", { path: '/' });
			Y.one("#cssSwitcher").remove(true);
		});
	}

	function styleSwitcher() {
		Y.one("#cssSwitcherLink").on("click", function (e) {
			e.preventDefault();

			// Set the cookie
			if (defaultStyle == "desktop") {
				Y.Cookie.set("stylePref", "mbl", { path: '/' });
			} else if (defaultStyle == "mbl") {
				Y.Cookie.set("stylePref", "desktop", { path: '/' });
			};

			// Detect and set style
			setDefaultStyle();
			applyStyle();
			headShrinker();
			location.reload(true);
		});
	}

});

