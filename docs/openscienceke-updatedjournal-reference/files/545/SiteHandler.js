/**
 * @defgroup js_controllers
 */
/**
 * @file js/controllers/SiteHandler.js
 *
 * Copyright (c) 2013 Simon Fraser University Library
 * Copyright (c) 2000-2013 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class SiteHandler
 * @ingroup js_controllers
 *
 * @brief Handle the site widget.
 */
(function($) {


	/**
	 * @constructor
	 *
	 * @extends $.pkp.classes.Handler
	 *
	 * @param {jQueryObject} $widgetWrapper An HTML element that this handle will
	 * be attached to.
	 * @param {{
	 *   toggleHelpUrl: string,
	 *   toggleHelpOffText: string,
	 *   toggleHelpOnText: string,
	 *   fetchNotificationUrl: string,
	 *   requestOptions: Object
	 *   }} options Handler options.
	 */
	$.pkp.controllers.SiteHandler = function($widgetWrapper, options) {
		this.parent($widgetWrapper, options);

		this.options_ = options;
		this.unsavedFormElements_ = [];

		$('.go').button();

		this.bind('redirectRequested', this.redirectToUrl);
		this.bind('notifyUser', this.fetchNotificationHandler_);
		this.bind('updateHeader', this.updateHeaderHandler_);
		this.bind('updateSidebar', this.updateSidebarHandler_);
		this.bind('callWhenClickOutside', this.callWhenClickOutsideHandler_);

		// Listen for grid initialized events so the inline help
		// can be shown or hidden.
		this.bind('gridInitialized', this.updateHelpDisplayHandler_);

		// Listen for help toggle events.
		this.bind('toggleInlineHelp', this.toggleInlineHelpHandler_);

		// Bind the pageUnloadHandler_ method to the DOM so it is
		// called.
		$(window).bind('beforeunload', this.pageUnloadHandler_);

		// Avoid IE8 caching ajax results. If it does, widgets like
		// grids will not refresh correctly.
		$.ajaxSetup({cache: false});

		this.setMainMaxWidth_();

		// Check if we have notifications to show.
		if (options.hasSystemNotifications) {
			this.trigger('notifyUser');
		}

		// bind event handlers for form status change events.
		this.bind('formChanged', this.callbackWrapper(
				this.registerUnsavedFormElement_));
		this.bind('unregisterChangedForm', this.callbackWrapper(
				this.unregisterUnsavedFormElement_));
		this.bind('modalCanceled', this.callbackWrapper(
				this.unregisterUnsavedFormElement_));
		this.bind('unregisterAllForms', this.callbackWrapper(
				this.unregisterAllFormElements_));
	};
	$.pkp.classes.Helper.inherits(
			$.pkp.controllers.SiteHandler, $.pkp.classes.Handler);


	//
	// Private properties
	//
	/**
	 * Site handler options.
	 * @private
	 * @type {Object}
	 */
	$.pkp.controllers.SiteHandler.prototype.options_ = null;


	/**
	 * A state variable to store the form elements that have unsaved data.
	 * @private
	 * @type {Array}
	 */
	$.pkp.controllers.SiteHandler.prototype.unsavedFormElements_ = null;


	//
	// Public methods
	//
	/**
	 * Callback that is triggered when the page should redirect.
	 *
	 * @param {HTMLElement} sourceElement The element that issued the
	 *  "redirectRequested" event.
	 * @param {Event} event The "redirect requested" event.
	 * @param {string} url The URL to redirect to.
	 */
	$.pkp.controllers.SiteHandler.prototype.redirectToUrl =
			function(sourceElement, event, url) {

		window.location = url;
	};


	/**
	 * Handler bound to 'formChanged' events propagated by forms
	 * that wish to have their form data tracked.
	 *
	 * @param {HTMLElement} siteHandlerElement The html element
	 * attached to this handler.
	 * @param {HTMLElement} sourceElement The element wishes to
	 * register.
	 * @param {Event} event The formChanged event.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.registerUnsavedFormElement_ =
			function(siteHandlerElement, sourceElement, event) {
		var $formElement, formId, index;

		$formElement = $(event.target.lastElementChild);
		formId = $formElement.attr('id');
		index = $.inArray(formId, this.unsavedFormElements_);
		if (index == -1) {
			this.unsavedFormElements_.push(formId);
		}
	};


	/**
	 * Handler bound to 'unregisterChangedForm' events propagated by forms
	 * that wish to inform that they no longer wish to be tracked as 'unsaved'.
	 *
	 * @param {HTMLElement} siteHandlerElement The html element
	 * attached to this handler.
	 * @param {HTMLElement} sourceElement The element that wishes to
	 * unregister.
	 * @param {Event} event The unregisterChangedForm event.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.unregisterUnsavedFormElement_ =
			function(siteHandlerElement, sourceElement, event) {
		var $formElement, formId, index;

		$formElement = $(event.target.lastElementChild);
		formId = $formElement.attr('id');
		index = $.inArray(formId, this.unsavedFormElements_);
		if (index !== -1) {
			delete this.unsavedFormElements_[index];
		}
	};


	/**
	 * Unregister all unsaved form elements.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.unregisterAllFormElements_ =
			function() {
		this.unsavedFormElements_ = [];
	};


	//
	// Private methods.
	//
	/**
	 * Respond to a user toggling the display of inline help.
	 *
	 * @param {HTMLElement} sourceElement The element that
	 *  issued the event.
	 * @param {Event} event The triggering event.
	 * @return {boolean} Always returns false.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.toggleInlineHelpHandler_ =
			function(sourceElement, event) {

		// persist the change on the server.
		$.ajax({url: this.options_.toggleHelpUrl});

		this.options_.inlineHelpState = this.options_.inlineHelpState ? 0 : 1;
		this.updateHelpDisplayHandler_();

		// Stop further event processing
		return false;
	};


	/**
	 * Callback to listen to grid initialization events. Used to
	 * toggle the inline help display on them.
	 *
	 * @private
	 *
	 * @param {HTMLElement=} opt_sourceElement The element that issued the
	 *  "gridInitialized" event.
	 * @param {Event=} opt_event The "gridInitialized" event.
	 */
	$.pkp.controllers.SiteHandler.prototype.updateHelpDisplayHandler_ =
			function(opt_sourceElement, opt_event) {
		var $bodyElement, inlineHelpState;

		$bodyElement = this.getHtmlElement();
		inlineHelpState = this.options_.inlineHelpState;
		if (inlineHelpState) {
			// the .css() call removes the CSS applied to the legend intially,
			// so it is not shown while the page is being loaded.
			$bodyElement.find('.pkp_grid_description, #legend, .pkp_help').
					css('visibility', 'visible').show();
			$bodyElement.find('[id^="toggleHelp"]').html(
					this.options_.toggleHelpOffText);
		} else {
			$bodyElement.find('.pkp_grid_description, #legend, .pkp_help').hide();
			$bodyElement.find('[id^="toggleHelp"]').html(
					this.options_.toggleHelpOnText);
		}
	};


	/**
	 * Fetch the notification data.
	 * @param {HTMLElement} sourceElement The element that issued the
	 *  "fetchNotification" event.
	 * @param {Event} event The "fetch notification" event.
	 * @param {Object} jsonData The JSON content representing the
	 *  notification.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.fetchNotificationHandler_ =
			function(sourceElement, event, jsonData) {

		if (jsonData !== undefined) {
			// This is an event that came from an inplace notification
			// widget that was not visible because of the scrolling.
			this.showNotification_(jsonData);
			return;
		}

		// Avoid race conditions with in place notifications.
		$.ajax({
			url: this.options_.fetchNotificationUrl,
			data: this.options_.requestOptions,
			success: this.callbackWrapper(this.showNotificationResponseHandler_),
			dataType: 'json',
			async: false
		});
	};


	/**
	 * Fetch the header (e.g. on header configuration change).
	 * @private
	 * @param {HTMLElement} sourceElement The element that issued the
	 *  update header event.
	 * @param {Event} event The "fetch header" event.
	 */
	$.pkp.controllers.SiteHandler.prototype.updateHeaderHandler_ =
			function(sourceElement, event) {
		var handler = $.pkp.classes.Handler.getHandler($('#headerContainer'));
		handler.reload();
	};


	/**
	 * Fetch the sidebar (e.g. on sidebar configuration change).
	 * @param {HTMLElement} sourceElement The element that issued the
	 *  update sidebar event.
	 * @param {Event} event The "fetch sidebar" event.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.updateSidebarHandler_ =
			function(sourceElement, event) {
		var handler = $.pkp.classes.Handler.getHandler($('#sidebarContainer'));
		handler.reload();
	};


	/**
	 * Binds a click event to this element so we can track if user
	 * clicked outside the passed element or not.
	 * @private
	 * @param {HTMLElement} sourceElement The element that issued the
	 *  callWhenClickOutside event.
	 * @param {Event} event The "call when click outside" event.
	 * @param {Object} eventParams The event parameters. We expect
	 * an object with the following properties:
	 * - container: a jQuery element to be used to test if user click
	 * outside of it or not.
	 * - callback: a callback function in case test is true.
	 * - skipWhenVisibleModals: boolean flag to tell whether skip the
	 * callback when modals are visible or not.
	 */
	$.pkp.controllers.SiteHandler.prototype.callWhenClickOutsideHandler_ =
			function(sourceElement, event, eventParams) {
		if (this.callWhenClickOutsideEventParams_ !== undefined) {
			throw new Error('Another widget is already using this structure.');
		}

		this.callWhenClickOutsideEventParams_ = eventParams;
		setTimeout(this.callbackWrapper(function() {
			this.bind('mousedown', this.checkOutsideClickHandler_);
		}), 25);
	};


	/**
	 * Mouse down event handler, used by the callWhenClickOutside event handler
	 * to test if user clicked outside an element or not. If true, will
	 * callback a function. Can optionally avoid the callback
	 * when a modal widget is loaded.
	 * @private
	 * @param {HTMLElement} sourceElement The element that issued the
	 *  click event.
	 * @param {Event} event The "mousedown" event.
	 * @return {?boolean} Event handling status.
	 */
	$.pkp.controllers.SiteHandler.prototype.checkOutsideClickHandler_ =
			function(sourceElement, event) {
		var $container, callback;

		if (this.callWhenClickOutsideEventParams_ !== undefined) {
			// Start checking the paramenters.
			if (this.callWhenClickOutsideEventParams_.container !== undefined) {
				// Store the container element.
				$container = this.callWhenClickOutsideEventParams_.container;
			} else {
				// Need a container, return.
				return false;
			}

			if (this.callWhenClickOutsideEventParams_.callback !== undefined) {
				// Store the callback.
				callback = this.callWhenClickOutsideEventParams_.callback;
			} else {
				// Need the callback, return.
				return false;
			}

			if (this.callWhenClickOutsideEventParams_.skipWhenVisibleModals !==
					undefined) {
				if (this.callWhenClickOutsideEventParams_.skipWhenVisibleModals) {
					if (this.getHtmlElement().find('div.ui-dialog').length > 0) {
						// Found a modal, return.
						return false;
					}
				}
			}

			// Do the click origin checking.
			if ($container.has(event.target).length === 0) {
				// Unbind this click handler.
				this.unbind('mousedown', this.checkOutsideClickHandler_);

				// Clean the original event parameters data.
				this.callWhenClickOutsideEventParams_ = null;

				if (!$container.is(':hidden')) {
					// Only considered outside if the container is visible.
					callback();
				}
			}
		}

		return false;
	};


	/**
	 * Internal callback called upon page unload. If it returns
	 * anything other than void, a message will be displayed to
	 * the user.
	 *
	 * @private
	 *
	 * @param {Object} object The window object.
	 * @param {Event} event The before unload event.
	 * @return {?string} The warning message string, if needed.
	 */
	$.pkp.controllers.SiteHandler.prototype.pageUnloadHandler_ =
			function(object, event) {
		var handler, unsavedElementCount, element;

		// any registered and then unregistered forms will exist
		// as properties in the unsavedFormElements_ object. They
		// will just be undefined.  See if there are any that are
		// not.

		// we need to get the handler this way since this event is bound
		// to window, not to SiteHandler.
		handler = $.pkp.classes.Handler.getHandler($('body'));

		unsavedElementCount = 0;
		for (element in handler.unsavedFormElements_) {
			if (element) {
				unsavedElementCount++;
			}
		}
		if (unsavedElementCount > 0) {
			return $.pkp.locale.form_dataHasChanged;
		}
		return null;
	};


	/**
	 * Method to determine if a form is currently registered as having
	 * unsaved changes.
	 *
	 * @param {string} id the id of the form to check.
	 * @return {boolean} true if the form is unsaved.
	 */
	$.pkp.controllers.SiteHandler.prototype.isFormUnsaved =
			function(id) {

		if (this.unsavedFormElements_ !== null &&
				this.unsavedFormElements_[id] !== undefined) {
			return true;
		}
		return false;
	};


	/**
	 * Response handler to the notification fetch.
	 *
	 * @param {Object} ajaxContext The data returned from the server.
	 * @param {Object} jsonData A parsed JSON response object.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.showNotificationResponseHandler_ =
			function(ajaxContext, jsonData) {
		this.showNotification_(jsonData);
	};


	//
	// Private helper method.
	//
	/**
	 * Show the notification content.
	 *
	 * @param {Object} jsonData The JSON-encoded notification data.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.showNotification_ =
			function(jsonData) {
		var workingJsonData, notificationsData, levelId, notificationId;

		workingJsonData = this.handleJson(jsonData);
		if (workingJsonData !== false) {
			if (workingJsonData.content.general) {
				notificationsData = workingJsonData.content.general;
				for (levelId in notificationsData) {
					for (notificationId in notificationsData[levelId]) {
						$.pnotify(notificationsData[levelId][notificationId]);
					}
				}
			}
		}
	};


	/**
	 * Set the maximum width for the pkp_structure_main div.
	 * This will prevent content with larger widths (like photos)
	 * messing up with layout.
	 * @private
	 */
	$.pkp.controllers.SiteHandler.prototype.setMainMaxWidth_ =
			function() {
		var $site, structureContentWidth, leftSideBarWidth, rightSideBarWidth,
				$mainDiv, mainExtraWidth, mainMaxWidth;

		$site = this.getHtmlElement();
		structureContentWidth = $('.pkp_structure_content', $site).width();

		leftSideBarWidth = $('.pkp_structure_sidebar_left', $site).
				outerWidth(true);
		rightSideBarWidth = $('.pkp_structure_sidebar_right', $site).
				outerWidth(true);

		$mainDiv = $('.pkp_structure_main', $site);

		// Check for padding, margin or border.
		mainExtraWidth = $mainDiv.outerWidth(true) - $mainDiv.width();
		mainMaxWidth = structureContentWidth - (
				leftSideBarWidth + rightSideBarWidth + mainExtraWidth);

		$mainDiv.css('max-width', mainMaxWidth);
	};


/** @param {jQuery} $ jQuery closure. */
}(jQuery));
