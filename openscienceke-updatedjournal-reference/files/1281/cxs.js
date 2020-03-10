(function($) {
    
    "use strict";

    /**
     * CxsContainer class which encapsulates all of the client-side functionality for integrating
     * with the CXS application.
     */
    function CxsContainer(pContainer) {
        var mContainer = pContainer,
            mTransformContainer = mContainer.find('.js-cxs-transform-result'),
            mMessagesContainer = mContainer.find('.js-cxs-messages'),
            mProgressContainer = mMessagesContainer.find('.js-cxs-progress'),
            mErrorContainer = mMessagesContainer.find('.js-cxs-error'),
            mErrorDetailContainer = mErrorContainer.find('.js-cxs-error-details'),
            mTransformUrl = mContainer.data('transformurl'),
            mXmlUrl = mContainer.data('xmlurl')
        
        /**
         * Initialize the CXS containers on the page.
         */
        var init = function() {
            mContainer.find('.js-cxs-control-xml').attr('href', decodeURIComponent(mXmlUrl));
            mContainer.find('.js-cxs-control-refresh').click(refresh);

            mContainer.find('.js-cxs-params').fadeOut().click(function(event) {
                event.stopPropagation();
                return false;
            });
            mContainer.find('.js-cxs-control-params').click(toggleParamDisplay);

            $('body').click(function(event) {
                mContainer.find('.js-cxs-params').fadeOut();
            });

            
            doTransform();
        };
        
        /**
         * Show/hide the div popup containing the transform params.
         */
        var toggleParamDisplay = function() {
            mContainer.find('.js-cxs-params').fadeToggle();
            event.stopPropagation();
            return false;
        };
        
        /**
         * Refreshes the content display.
         */
        var refresh = function() {
            refreshCss();
            doTransform();
        };

        /**
         * Refreshes the content css from the server.
         */
        var refreshCss = function() {
            var queryString = '?reload=' + new Date().getTime();
            $('link.cxs[rel="stylesheet"]').each(function () {
                this.href = this.href.replace(/\?.*|$/, queryString);
            });
        };

        /**
         * Performs a transform using the mTransformUrl and displays the result in the container.
         */
        var doTransform = function() {
            reset();
            $.ajax({
                url: mTransformUrl,
                dataType: 'html',
                success: transformSuccess,
                error: showError
            });
        };
        
        /**
         * Callback for a successful XSL transform against the CXS.
         * 
         * @param markup - the markup content of the ajax request
         */
        var transformSuccess = function(markup) {
            mTransformContainer.html(markup);
            if (typeof cxsRefreshed != 'undefined') {
                cxsRefreshed();
            }
            mMessagesContainer.hide();
            mProgressContainer.hide();
        };
        
        /**
         * Resets the diplay for a new ajax transform call.
         */
        var reset = function() {
            mTransformContainer.html('');
            clearError();
            mMessagesContainer.show();
            mProgressContainer.show();
        };
        
        /**
         * Clears the display of the transform error.
         */
        var clearError = function() {
            mErrorContainer.hide();
            mErrorDetailContainer.html('');
        };
        
        /**
         * Callback for a failure to perform the ajax xml transform.
         */
        var showError = function(jqXHR, status, errorBody) {
            mProgressContainer.hide();
            mErrorContainer.show();
            buildErrorDisplay(jqXHR, status, errorBody);
            mMessagesContainer.show();
        };
        
        /**
         * Populates the mErrorDetailContainer with the result of the failed ajax call message.
         */
        var buildErrorDisplay = function(jqXHR, status, errorBody) {
            mErrorDetailContainer.html('');
            
            var exception = $('<div class="cxs-exception"><span class="cxs-exception-message"></span></div>');
            
            if (jqXHR.status == 0) {
                $('.cxs-exception-message', exception).html('Unable to contact CXS application');
            }
            else if (typeof errorBody != 'undefined') {
                $('.cxs-exception-message', exception).html(jqXHR.status + ': ' + errorBody);

                try {
                    var details = $.parseJSON(jqXHR.responseText);
                    if (details.message) {
                        addCause(exception, details);
                    }
                }
                catch(error) {
                    addCause(exception, {message: 'Unable to parse error response from CXS, see log for more information'})
                }
            }
            
            mErrorDetailContainer.append(exception);
        };

        /**
         * Adds the markup for displaying an exception cause to the specified container.
         */
        var addCause = function(container, causeData) {
            var cause = $('<div class="cxs-exception-cause"></div>');
            
            addCauseField(cause, 'Cause:', causeData.message);
            if (causeData.line != -1 && causeData.line != null) {
                addCauseField(cause, 'Line:', causeData.line);
            }
            if (causeData.column != -1 && causeData.column != null) {
                addCauseField(cause, 'Column:', causeData.column);
            }
            if (causeData.file != null) {
                addCauseField(cause, 'File:', causeData.file);
            }
            
            if (causeData.cause) {
                addCause(cause, causeData.cause);
            }
            else {
                cause.addClass('cxs-root-cause');
            }
            
            container.append(cause);
        };

        /**
         * Adds a field label/value pair to the specified container.
         */
        var addCauseField = function(container, label, value) {
            if (typeof value != 'undefined') {
                var cssClass = label.substring(0, label.length - 1).toLowerCase();
                container.append('<span class="cxs-exception-label cxs-exception-label-' + cssClass + '">' + label + ' </span>');
                container.append('<span class="cxs-exception-value cxs-exception-value-' + cssClass + '">' + value + '</span>');
            }
        };
        
        init();

    };

    $(function() {
        $('.js-cxs-container').each(function() {
            var container = $(this);
            
            container.data('CXS', new CxsContainer(container));
        });
    });
    
}(jQuery));
