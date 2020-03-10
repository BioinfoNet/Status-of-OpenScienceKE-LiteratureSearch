var SCM = SCM || {};

(function (ns, $) {
    var getState;
    var removeState;

	$.bbq = {};
    $.bbq.getState = getState = function (key) {
        var hash = window.location.hash;
        var idx = hash.indexOf(key);
		if (idx < 0) {
			return;
        }
        idx = idx + key.length+1;

		var cutOff = hash.indexOf('&', idx);

        if (cutOff < 0) {
            return decodeURI(hash.substring(idx));
		} else {
			return decodeURI(hash.substring(idx, cutOff));
		}
    };

    $.bbq.removeState = removeState = function (key) {
        var value = getState(key);
        if (value) {
            location.replace(window.location.hash.replace(key + '=' + encodeURI(value), ''));
        }
    };

	$.deparam = {};
	$.deparam.querystring = function () {
		var query = window.location.search.substring(1);
		var terms = query.split('&');
		var toRet = {};
		for (var i = 0; i < terms.length; i++) {
			var term = terms[i];
			var keyValue = term.split('=');
			if (keyValue.length === 2) {
                toRet[keyValue[0]] = decodeURIComponent(keyValue[1]);
			}
		}

		return toRet;
	};
})(SCM, jQuery);
/** 
 * Brightcove Learning Services Module
 */
var SCM = SCM || {};
SCM.Utilities = SCM.Utilities || {};

(function (bc, $) {
    bc.init = function () {
        if ($('.brightcove-wrapper video.video-js').length !== 0) {

            var jsSrc = "//players.brightcove.net/1611106596001/BkMnETZOZ_default/index.min.js";
            // load JS only if video exists on page
            $.getScript(jsSrc, function () {
            });
        }
        if ($('.brightcove-wrapper-audio video.video-js').length !== 0) {
            var jsSrc = "//players.brightcove.net/1611106596001/ryQZHF29_default/index.min.js";
            // load JS only if video exists on page
            $.getScript(jsSrc, function () {
            });
        }
    };
})(SCM.Utilities.Brightcove = SCM.Utilities.Brightcove || {}, jQuery);

var SCM = SCM || {};

(function (ns, $) {

    // ----------------------------
    // Support functions
    // ----------------------------


    // check if an anchor is an external link
    function isExternalLink(anchor) {
        var pageHN = location.hostname;  // we previously grabbed location.host until NARN-7840
        var anchorHN = anchor.hostname;

        return anchorHN.length > 0 && anchorHN != pageHN;
    }

    // ----------------------------
    // Generic event
    // ----------------------------

    // send a named event to the Scholarly iQ tracker.
    //
    // * See "The Scholarly iQ guide to working with page tags" for a discussion of the API calls you can use.
    ns.trackOnPageEvent = function (ev) {
        var event = 'ev=' + encodeURIComponent(ev);

        // console.log(event);
        ntptEventTag(event);
    };


    // ----------------------------
    // Self serve page tracking
    // ----------------------------

    // register event tracking
    ns.trackSelfServePageEvents = function () {
        var $doc = $(document);

        // NARN-7840: support external links on self serve pages
        $doc.on('click', '.widget-SelfServeContent a', function () {
            var anchor = $(this).get(0);

            // only track external links
            if (isExternalLink(anchor)) {
                ns.trackOnPageEvent('self-serve-external-link-' + $(this).attr('href'));
            }
        });
    }

    // ----------------------------
    // Article page tracking
    // ----------------------------

    // register event tracking
    ns.trackArticlePageEvents = function () {
        var $doc = $(document);
        // pdf
        $doc.on('click', 'a.article-pdfLink', function () {
            ns.trackOnPageEvent('article-pdf');
        });

        // split-view
        $doc.on('click', '.st-split-view', function () {
            ns.trackOnPageEvent('article-view-split-view');
        });

        // standard-view
        $doc.on('click', 'a.standard-view', function () {
            ns.trackOnPageEvent('article-view-standard-view');
        });

        // view
        $doc.on('click', 'li.article-content-filter', function () {
            ns.trackOnPageEvent('article-view-' + $(this).attr('data-content-filter'));
        });

        // toolbox alerts
        $doc.on('click', '#Toolbar .toolboxGetAlertsWidget', function () {
            ns.trackOnPageEvent('article-alerts');
        });

        // email article
        $doc.on('click', '#Sidebar .widget-alerts .getAlertsLink', function () {
            ns.trackOnPageEvent('article-email-alerts-' + $(this).text());
        });

        // Share
        $doc.on('click', 'ul.addthis_toolbox > li > a', function () {
            ns.trackOnPageEvent('article-share-' + $(this).attr('title'));
        });

        // Tools
        $doc.on('click', 'ul#ToolsDrop > li > div.widget', function () {
            var ev = null;
            if ($(this).hasClass('widget-ToolboxGetCitation')) {
                ev = 'article-tools-GetCitation';
            }
            else if ($(this).hasClass('widget-ToolboxPermissions')) {
                ev = 'article-tools-GetPermission';
            }
            ns.trackOnPageEvent(ev);
        });

        // citation links
        $doc.on('click', '#getCitation.reveal-modal ul > li > a', function () {
            ns.trackOnPageEvent('article-tools-GetCitation-' + $(this).text());
        });

        // author link is handled by the main click event since it will block other events

        $doc.on('click', '.info-card-author .info-card-search a', function () {
            ns.trackOnPageEvent('article-author-search-' + $(this).text());
        });

        // section nav
        $doc.on('click', '.widget-ArticleJumpLinks .section-jump-link .scrollTo', function () {
            ns.trackOnPageEvent('article-section-link-' + $(this).text());
        });

        // view large fig
        $doc.on('click', '.fig-section .fig-link, .fig-section .fig-view-orig', function () {
            ns.trackOnPageEvent('article-figure-view-' + $(this).closest('.fig-section').attr('data-id'));
        });

        // download fig
        $doc.on('click', '.fig-section .download-slide', function () {
            ns.trackOnPageEvent('article-figure-download-' + $(this).closest('.fig-section').attr('data-id'));
        });

        // download all figs
        $doc.on('click', '.st-download-images-ppt', function () {
            ns.trackOnPageEvent('article-figure-download-all');
        });

        // supplements
        $doc.on('click', '.widget-ArticleDataSupplements .dataSuppLink', function () {
            ns.trackOnPageEvent('article-data-supplement-' + $(this).href);
        });

        $doc.on('click', '.widget-ArticleTopInfo .citation-doi a, .widget-ArticleFulltext a, .widget-RelatedPubMed a', function () {
            var anchor = $(this).get(0);

            // only track external links
            if (isExternalLink(anchor))
            {
                if ($(this).parents('.citation-links').length) { // PubMed, Google Scholar, etc.
                    ns.trackOnPageEvent('article-external-link-' + $(this).text());
                }
                else {
                    ns.trackOnPageEvent('article-external-link-' + $(this).attr('href'));
                }
            }
        });

        // article history
        $doc.on('click', '.st-article-history', function () {
            ns.trackOnPageEvent('article-history');
        });

        // article metrics
        $doc.on('click', '#Sidebar .widget-ArticleLevelMetrics .artmet-modal-trigger', function () {
            ns.trackOnPageEvent('article-metrics');
        });

        // cited by
        $doc.on('click', '#Sidebar .widget-ArticleCitedBy .article-cited-link-wrap a', function () {
            ns.trackOnPageEvent('article-citation-' + $(this).text());
        });

    };

    $(function () {
        if ($('.pg_article').length) {
            ns.trackArticlePageEvents();
        }
    });

})(SCM.ScholarlyiQ = SCM.ScholarlyiQ || {}, jQuery);
// ----
// split-screen and split-screen tab functionality
// ----

var SCM = SCM || {};

// the App.Global Module
(function (ns, $) {
    var ViewTypes = new function () { this.StandardView = 0; this.SplitView = 1; };

    function PositionManager(standardViewParagraphs, splitViewParagraphs) {
        var eyeLevel = 60;
        var $window = $(window);

        function getElementAtTop(paragraphs) {
            if (!paragraphs || !paragraphs.length) {
                return;
            }

            var pageTop = $window.scrollTop() + eyeLevel;

            var left = 0;
            var right = paragraphs.length - 1;

            var element = $(paragraphs[0]);
            var elementTop = element.offset().top;
            var elementBottom;

            if (pageTop < elementTop) {
                return;
            }

            while (left <= right) {
                var idx = Math.floor((left + right) / 2);

                element = $(paragraphs[idx]);
                elementTop = element.offset().top;
                elementBottom = elementTop + element.height();

                if (left === right || (pageTop >= elementTop && pageTop <= elementBottom)) {
                    return { elem: element[0], idx: idx };
                }

                if (elementTop > pageTop) {
                    right = idx - 1;
                } else if (elementBottom < pageTop) {
                    left = idx + 1;
                } else {
                   return { elem: element[0], idx: idx };
                }
            }

            return {
                elem: paragraphs[Math.min(right, paragraphs.length - 1)],
                idx: Math.min(right, paragraphs.length - 1)
            };
        }

        this.getCurrentElement = function(viewType) {
            var paragraphs = viewType === ViewTypes.StandardView ? standardViewParagraphs : splitViewParagraphs;

            var tuple = getElementAtTop(paragraphs);

            if (!tuple) {
                return;
            }

            var elem = tuple.elem;
            var idx = tuple.idx;

            if (!elem) {
                return;
            }

            if (elementContainsClass(elem, 'backreferences-title') || elementContainsClass(elem, 'ref-list')) {
                return;
            }

            while (elementContainsClass(elem, 'fig-section') || elementContainsClass(elem, 'table-wrap')) {
                elem = paragraphs[Math.max(--idx, 0)];
            }

            // Re-check since we moved
            if (elementContainsClass(elem, 'backreferences-title') || elementContainsClass(elem, 'ref-list')) {
                return;
            }

            return elem;
        }
    }

    function WidgetCache() {
        var cache = {};

        this.getWidget = function (widgetClassName) {
            if (cache[widgetClassName]) {
                return cache[widgetClassName];
            }

            var widget = document.getElementsByClassName(widgetClassName)[0]
            if (widget) {
                cache[widgetClassName] = widget;
                return widget
            } else {
                return undefined;
            }
        }
    }

    function WidgetStore() {
        var widgetCache = new WidgetCache();
        var dictionary = {};

        function replaceIds(elem) {
            var all = elem.getElementsByTagName("*");
            for (var i = 0; i < all.length; i++) {
                var check = all[i];
                if (check.id) {
                    check.id = check.id + "-sv";
                }
            }
        }

        function resolveWidgets(widgetName, ctx) {
            var widget = dictionary[widgetName];
            var children = widget.dependencies;
            var resolvedWidgets = [];
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var childWidgetName = children[i];
                    var elem;
                    if (dictionary[childWidgetName]) {
                        elem = resolveWidgets(childWidgetName, ctx);
                        resolvedWidgets.push(elem);
                    } else {
                        elem = widgetCache.getWidget('widget-instance-' + childWidgetName) || widgetCache.getWidget('widget-' + childWidgetName);

                        if (elem) {
                            var clonedElem = elem.cloneNode(true);
                            replaceIds(clonedElem);
                            resolvedWidgets.push(clonedElem);
                        } else {
                            resolvedWidgets.push(document.createDocumentFragment());
                        }
                    }
                }
            }

            var widgetRef = widget.render.apply(ctx, resolvedWidgets);
            ctx[widgetName] = widgetRef;

            return widgetRef;
        }

        this.create = function (widgetName) {
            var documentFragment = document.createDocumentFragment();
            documentFragment.appendChild(resolveWidgets(widgetName, {}));

            return documentFragment;
        }

        this.register = function (widget) {
            // Is it worth checking for cycles in the dependency graph?
            dictionary[widget.name] = widget;
        }
    }

    var store = new WidgetStore();
    ns.WidgetStore = store;

    SCM.SplitScreen.init = function () {
        
        var revertToArticleContentView = (function () {
            var filters = getElementsByClass(document, 'article-content-filter');
            var articleContentsToggle;
            for (var i = 0; i < filters.length; i++) {
                if (filters[i].dataset.contentFilter === 'article-content') {
                    articleContentsToggle = filters[i];
                }
            }
            
            return function () {
                if (articleContentsToggle) {
                    articleContentsToggle.click();
                }
            }
        })();

        (function () {
            var isSplitView = false;
            var splitView;
            var positionManager;

            function containsMathJax() {
                return $('.MathJax_Preview').length > 0 || $('.display-math').length > 0;
            }

            function transitionToSplitView() {
                SCM.SplitScreen.toggleSplitView();
            }

            var modalContent = createElement('div', { 'class': 'math-jax-modal' }, [
                createElement('p', { 'class': 'bold' }, ['Mathematical content on this page is still rendering']),
                createElement('div', { 'class': 'spinner' }),
                createElement('p', {}, ['Once the process is complete you will be taken to Split View']),
                createElement('button', {
                    'onclick': function (e) {
                        $('#math-jax-modal').foundation('reveal', 'close');
                    },
                    'class': 'btn'
                }, ['Cancel'])
            ]);

            var m = createElement('div', { 'data-reveal': 'math-jax-load', 'id': 'math-jax-modal', 'class': 'reveal-modal' });
            m.style.display = 'none';

            document.body.appendChild(m);

            SCM.SplitScreen.toggleSplitView = function (override) {
                if (override === false) {
                    if (!splitView) return;
                    isSplitView = true;
                } else if (override === true) {
                    isSplitView = false;
                }

                if (containsMathJax() && !SCM.SplitScreen.IsMathJaxLoaded) {
                    var modal = $('#math-jax-modal');
                    $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
                        window.removeEventListener('MathJax.complete', transitionToSplitView);
                    });
                    modal.empty().prepend(modalContent);
                    modal.foundation('reveal', 'open');
                    window.addEventListener('MathJax.complete', transitionToSplitView);
                    return;
                } else {
                    $('#math-jax-modal').foundation('reveal', 'close');
                }

                if (!SCM.SiteJS.isFinishedAdjustRelatedTagsDisplay()) {
                    window.addEventListener('adjustRelatedTagsDisplay.complete', transitionToSplitView);
                    return;
                }

                if (!splitView) {
                    var elementsToAddId = 'p,section.abstract,blockquote,div.block-child-p,div.lay-summary';
                    var elementsToIncludeInSwitch = 'h2,h3,h4,div.table-wrap,div.fig-section,div.ref-list';
                    // Add ids to paragraphs before loading split view
                    var $articleBody = $('.widget-ArticleFulltext .widget-items');
                    $articleBody.children(elementsToAddId).each(function (idx, elem) {
                        elem.id = elem.id || 'scroll-to-' + idx;
                    });

                    var standardViewParagraphs = $articleBody.children(elementsToAddId + ',' + elementsToIncludeInSwitch);

                    document.body.appendChild(store.create('SplitView'));

                    var splitViewParagraphs = $('#sv_main .widget-ArticleFulltext .widget-items').children(elementsToAddId + ',' + elementsToIncludeInSwitch);

                    positionManager = new PositionManager(standardViewParagraphs, splitViewParagraphs);

                    splitView = document.body.lastChild;
                    if (window.addthis) {
                        window.addthis.toolbox('.addthis_toolbox');
                    }

                    SCM.SiteJS.articleUserComments(true);
                    SCM.Utilities.Brightcove.init();
                }

                var masterContainer = getFirstElementByClassName(document, 'master-container');
                var siteFooter = getFirstElementByClassName(document, 'widget-SitePageFooter');
                var globalFooter = getFirstElementByClassName(document, 'oup-footer');

                var elem = positionManager.getCurrentElement(isSplitView ? ViewTypes.SplitView : ViewTypes.StandardView);
                if (isSplitView) {
                    document.body.className = document.body.className.replace(' pg_articlesplitview', '');
                    masterContainer.style.display = '';
                    siteFooter.style.display = '';
                    globalFooter.style.display = '';
                    splitView.style.display = 'none';

                    if (elem) {
                        var heightOffset = 0;
                        if (elem.nodeName === 'P') {
                            heightOffset = 95;
                        } else if (elem.nodeName === 'H2' || elem.nodeName === 'H3' || elem.nodeName === 'H4') {
                            heightOffset = 15;
                        }

                        $(window).scrollTop($('#' + elem.id.slice(0, -3)).offset().top - heightOffset);
                    } else {
                        $(window).scrollTop(0);
                    }
                } else {
                    masterContainer.style.display = 'none';
                    siteFooter.style.display = 'none';
                    globalFooter.style.display = 'none';
                    if (document.body.className.indexOf('pg_articlesplitview') < 0) {
                        document.body.className += ' pg_articlesplitview';
                    }
                    splitView.style.display = '';

                    if (elem) {
                        $('#split-view-scroll-pane').scrollTop(document.getElementById(elem.id + '-sv').offsetTop);
                    } else {
                        $('#split-view-scroll-pane').scrollTop(0);
                    }
                }

                isSplitView = !isSplitView;
            };

            SCM.SplitScreen.isSplitView = function () {
                return isSplitView;
            };
        })();

        var splitViewButton = getFirstElementByClassName(document, "js-split-view");

        if (splitViewButton) {

            var $splitViewButton = $(splitViewButton);
            if (!$splitViewButton.is(':visible')) {
                $splitViewButton.parent().remove();
            }

            var checkScreenSize = function(m) {
                if (m.matches) {
                    SCM.SplitScreen.toggleSplitView(false);
                } else {
                    if (getFirstElementByClassName(document, "item-views")) {
                        revertToArticleContentView();
                    }
                }
            };
            
            var mobileBreakpoint = window.matchMedia("(max-width: 930px)");
            mobileBreakpoint.addListener(checkScreenSize);
            checkScreenSize(mobileBreakpoint);

            $(document).on("click", ".js-split-view", SCM.SplitScreen.toggleSplitView);
        }


        MathJax.Hub.Register.StartupHook("End", function () {
            SCM.SplitScreen.IsMathJaxLoaded = true;
            window.dispatchEvent(new CustomEvent('MathJax.complete'));
        });
    };
    
    function createElement(tag, attribs, children) {
        var elem = document.createElement(tag);

        if (Array.isArray(attribs)) {
            children = attribs;
        } else if (attribs) {
            for (var name in attribs) {
                if (name.startsWith('on')) {
                    elem.addEventListener(name.substring(2), attribs[name]);
                } else {
                    elem.setAttribute(name, attribs[name]);
                }
            }
        }

        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child) {
                    if (!child.nodeType) {
                        elem.appendChild(document.createTextNode(child.toString()));
                    } else {
                        elem.appendChild(child);
                    }
                }
            }
        }

        return elem;
    }

    function getFirstElementByClassName(elem, className) {
        var elems = elem.getElementsByClassName(className);
        if (elems.length > 0) {
            return elems[0];
        }
    }

    function getElementsByClass(parent, className) {
        var elems = parent.getElementsByClassName(className);
        if (elems.length > 0) {
            return Array.prototype.slice.call(elems, 0);
        } else {
            return [];
        }
    }

    function getElementsByClassList(parent, classList) {
        if (!classList) return [];

        var elems = [];
        for (var i = 0; i < classList.length; i++) {
            elems = elems.concat(getElementsByClass(parent, classList[i]));
        }

        return elems;
    }

    function removeElements(elems) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].parentNode.removeChild(elems[i]);
        }
    }

    function removeElementsByClass(parent, className) {
        removeElements(getElementsByClass(parent, className));
    }

    function removeElementsByClassList(parent, classList) {
        removeElements(getElementsByClassList(parent, classList));
    }

    function elementContainsClass(elem, className) {
        return (' ' + elem.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    function elementRemoveClass(elem, className) {
        if (!elementContainsClass(elem, className)) return;

        elem.className = (' ' + elem.className + ' ').replace(' ' + className + ' ', ' ').trim();
    }

    function elementAddClass(elem, className) {
        if (elementContainsClass(elem, className)) return;

        elem.className = elem.className + ' ' + className;
    }

    function elementComparator(left, right) {
        if (left === right) return 0;

        if (left === undefined) return -1;
        if (right === undefined) return 1;

        var position = left.compareDocumentPosition(right);

        // Bit mask to determine the position of the two elements
        if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY)
            return -1;
        else if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS)
            return 1;
        else
            return 0;
    }

    SCM.SplitScreen.WidgetStore.register({
        name: 'ContentsTab',
        dependencies: ['ArticleJumpLinks', 'ArticleFulltext'],
        render: function (ArticleJumpLinks, ArticleFulltext) {
            var widgets = this;

            removeElementsByClass(ArticleJumpLinks, 'contents-title');

            function handleJumpLinks(e) {
                var elem = e.target;
                if (elementContainsClass(elem, 'js-jumplink')) {
                    var location = elem.attributes['href'].textContent.substring(1);
                    var label = elem.textContent;

                    if (elem.dataset.sectionType === 'backreferences-title') {
                        widgets.ReferencesTab.switchTo();
                        return;
                    }

                    var section = document.getElementById(location + '-sv');
                    if (section) {
                        var scrollablePanel = widgets.Content;
                        scrollablePanel.scrollTop = section.offsetTop;
                    }
                }
            }

            var fragment = document.createDocumentFragment();
            fragment.appendChild(ArticleFulltext);

            var jumpLinks = ArticleJumpLinks.getElementsByClassName('js-jumplink');
            for (var i = 0; i < jumpLinks.length; i++) {
                var jumpLink = jumpLinks[i];
                var location = jumpLink.attributes['href'].textContent.substring(1);


                var section = fragment.querySelector("[id='" + location + "-sv']");
                if (section) {
                    jumpLink.dataset.sectionType = section.className;
                }
            }

            return createElement('div', { 'class': 'dynamic-widget-inner-wrap', 'style': 'display: block;', 'onclick': handleJumpLinks }, [
                ArticleJumpLinks
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'FiguresAndTablesTab',
        dependencies: ['ArticleFulltext'],
        render: function (ArticleFulltext) {
            var graphicalAbstractSection = getFirstElementByClassName(ArticleFulltext, 'graphicalAbstract');
            var figures = getElementsByClass(ArticleFulltext, "fig-section");


            if (graphicalAbstractSection) {
                var graphicalAbstractFigSection = getFirstElementByClassName(graphicalAbstractSection, 'fig-section');
                if (graphicalAbstractFigSection) {
                    var graphicalAbstractFigId = graphicalAbstractFigSection.dataset.id;

                    for (var i = 0; i < figures.length; i++) {
                        if (figures[i].dataset.id === graphicalAbstractFigId) {
                            figures[i] = graphicalAbstractSection
                            break;
                        }
                    }
                }
            }


            var tables = getElementsByClass(ArticleFulltext, "table-wrap");
            var duplicateTables = [];
            for (var i = 0; i < tables.length; i++) {
                var id = tables[i].firstChild.id;
                if (duplicateTables.indexOf(id) < 0) {
                    duplicateTables.push(id);
                } else {
                    tables.splice(i, 1);
                    i--;
                }
            }

            var figuresAndTables = figures.concat(tables).sort(elementComparator);
            if(figuresAndTables.length > 0) {
                var children = figuresAndTables;

                if (figures.length > 0) {
                    var downloadAllLinks = document.getElementsByClassName('js-download-all-images-link');
                    if (downloadAllLinks.length) {
                        var downloadAllLink = downloadAllLinks[0].cloneNode(true);
                        downloadAllLink.className = 'js-download-all-images-link-sv';
                        downloadAllLink.textContent = 'Download all slides';
                        elementAddClass(downloadAllLink, 'btn');
                    }
                    children = [createElement('div', { 'class': 'download-all-ppt' }, [downloadAllLink])].concat(figuresAndTables);
                }

                return createElement('div', { 'class': 'dynamic-widget-inner-wrap' }, children);
                
            }

            return createElement('div', { 'class': 'dynamic-widget-inner-wrap' });
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'ReferencesTab',
        dependencies: ['ArticleFulltext'],
        render: function (ArticleFulltext) {
            return createElement('div', { 'class': 'dynamic-widget-inner-wrap' },
                ArticleFulltext.getElementsByClassName("ref-list"));
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'NotesTab',
        dependencies: ['ArticleFulltext'],
        render: function (ArticleFulltext) {
            return createElement('div', { 'class': 'dynamic-widget-inner-wrap' });
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'CommentsTab',
        dependencies: ['UserCommentBody'],
        render: function (UserCommentBody) {
            return createElement('div', { 'class': 'dynamic-widget-inner-wrap' }, [
                UserCommentBody
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'Tabs',
        dependencies: ['ContentsTab', 'FiguresAndTablesTab', 'ReferencesTab', 'NotesTab', 'CommentsTab'],
        render: function (ContentsTab, FiguresAndTablesTab, ReferencesTab, NotesTab, CommentsTab) {
            function updateTabFocus(tab, panel) {
                for (var i = 0; i < tabs.length; i++) {
                    elementRemoveClass(tabs[i], 'active');
                }

                elementAddClass(tab, 'active');
                for (var j = 0; j < panels.length; j++) {
                    panels[j].style.display = 'none';
                }

                panel.style.display = 'block';
            }

            function tabClick(e) {
                var t = e.target.parentNode;
                updateTabFocus(t, panels[t.dataset.tab]);
            };

            var idx = 0;
            function tabElement(name, cssName, isActive) {
                return createElement('a', { 'class': 'tab-nav-trigger tab-nav-' + cssName + 'Css' + (isActive ? ' active' : ''), 'data-tab': idx++ }, [
                    createElement('i', { 'class': 'icon-' + cssName + 'Css' }, [
                        createElement('span', { 'class': 'sr-t' })
                    ]),
                    createElement('div', { 'class': 'tab-nav-tab-name', 'onclick': tabClick }, [
                        name
                    ])
                ]);
            }
            

            var tabs = [
                tabElement('Contents', 'Content', true),
                tabElement('Figures & Tables', 'FiguresTables'),
                tabElement('References', 'References'),
                tabElement('Notes', 'Notes'),
                tabElement('Comments', 'Comments')];

            var panels = [
                ContentsTab,
                FiguresAndTablesTab,
                ReferencesTab,
                NotesTab,
                CommentsTab
            ];

            for (var i = 0; i < panels.length; i++) {
                if (panels[i].textContent.trim() === '') {
                    tabs[i].style.display = 'none';
                    panels[i].switchTo = function () { };
                } else {
                    panels[i].switchTo = function () {
                        updateTabFocus(this.tab, this.panel);
                    }.bind({ panel: panels[i], tab: tabs[i] });
                }
            }

            return createElement('div', { 'class': 'resources-panel' }, [
                createElement('div', { 'class': 'location-right-pane' }, [
                    createElement('div', { 'class': 'dynamic-widget-module' }, [
                        createElement('div', { 'class': 'tab-nav', 'style': 'visibility: visible;' }, tabs),
                        createElement('div', { 'class': 'resource-tabs' }, panels)
                    ])
                ])
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'Content',
        dependencies: ['ArticleFulltext', 'ArticleTopInfo', 'ArticleLinks', 'Toolbar', 'ArticleDataSupplements'],
        render: function (ArticleFulltext, ArticleTopInfo, ArticleLinks, Toolbar, ArticleDataSupplements) {
            var widgets = this;
            var halfWidth = $(".content-panel").width() / 2; // use to reposition authorCards

            //remove GraphicalAbstract section
            var graphicalAbstract = getFirstElementByClassName(ArticleFulltext, 'graphicalAbstract');
            if (graphicalAbstract != null)
                removeElements([graphicalAbstract]);

            removeElementsByClassList(ArticleFulltext, [
                'backreferences-title',
                'fig-section',
                'table-wrap',
                'ref-list']);

            var doKeywordsSearch = function (keyword) {
                // make sure keyword is wrapped in quotes
                if (!keyword) {
                    return;
                }

                if (!keyword.startsWith('"')) {
                    keyword = '"' + keyword;
                }
                
                if(!keyword.endsWith('"')) {
                    keyword = keyword + '"';
                }

                var searchUrl = 'search-results?page=1&qb={"Keywords1":' +
                    encodeURIComponent(keyword) +
                    "}&SearchSourceType=1";

                var siteUrlElement = document.getElementById('hfSiteURL');

                if (siteUrlElement) {
                    searchUrl = "//" + siteUrlElement.value + '/' + searchUrl
                } else {
                    return;
                }

                window.location.href = searchUrl;
            };


            var $articleFullText = $(ArticleFulltext);

            $articleFullText.on('click', '.xref-fig', function (e) {
                e.stopPropagation();
                var id = this.dataset.open;
                var figuresAndTables = getElementsByClassList(widgets.FiguresAndTablesTab, [
                    'fig-section',
                    'table-wrap-title']);
                var scrollablePanel = widgets.FiguresAndTablesTab;
                for (var i = 0; i < figuresAndTables.length; i++) {
                    if (figuresAndTables[i].dataset.id === id) {
                        widgets.FiguresAndTablesTab.switchTo();
                        scrollablePanel.scrollTop = figuresAndTables[i].offsetTop;
                        return;
                    }
                }
            });
            $articleFullText.on('click', '.xref-sec', function (e) {
                e.stopPropagation();
                var id = this.attributes['href'].textContent.substring(1);               
                var formulas = ArticleFulltext.querySelectorAll('.disp-formula, .statement');
                for (var i = 0; i < formulas.length; i++) {
                    if (formulas[i].attributes['content-id'].textContent === id)
                    {
                        var textContent = formulas[i].attributes.class.textContent;
                        if (textContent === 'disp-formula') {
                            widgets.Content.scrollTop = formulas[i].parentNode.offsetTop;
                            return;
                        }
                        else if (textContent === 'statement') {
                            widgets.Content.scrollTop = formulas[i].offsetTop;
                            return;
                        }
                    }
                }
                var sections = ArticleFulltext.querySelectorAll('.section-title[data-legacy-id]');
                for (var i = 0; i < sections.length; i++) {
                    if (sections[i].attributes['data-legacy-id'].textContent === id) {
                        widgets.Content.scrollTop = sections[i].offsetTop;
                        return;
                    }
                }
            });
            $articleFullText.on('click', '.js-jumplink', function (e) {
                e.stopPropagation();
                var id = this.attributes['href'].textContent.substring(1);
                var appendixes = ArticleFulltext.querySelectorAll('.appendix-title[data-legacy-id]');
                for (var i = 0; i < appendixes.length; i++) {
                    if (appendixes[i].attributes['data-legacy-id'].textContent === id) {
                        widgets.Content.scrollTop = appendixes[i].offsetTop;
                        return;
                    }
                }
            });
            $articleFullText.on('click', '.xref-bibr', function (e) {
                e.stopPropagation();
                if (!this.dataset.open) {
                    return;
                }

                var id = this.dataset.open.split(' ')[0];

                var references = (getFirstElementByClassName(widgets.ReferencesTab, 'ref-list') || { children: [] }).children;
                for (var i = 0; i < references.length; i++) {
                    if (references[i].attributes['content-id'].textContent === id) {
                        widgets.ReferencesTab.switchTo();
                        widgets.ReferencesTab.scrollTop = references[i].offsetTop;
                        return;
                    }
                }
            });
            $articleFullText.on('click', '.kwd-part', function (e) {
                e.stopPropagation();
                doKeywordsSearch(e.target.dataset.keyword);
            });

            var historys = ArticleTopInfo.getElementsByClassName('js-article-history');
       
            for (var i = 0; i < historys.length; i++) {
                historys[i].addEventListener('click', function (e) {
                    var $pubHistoryDetails = $('.js-history-entries-wrap').last();
                    $pubHistoryDetails.toggleClass('expanded');
                });
            }

            var authorFlyouts = ArticleTopInfo.getElementsByClassName('al-author-info-wrap');
            function hideAuthorFlyouts() {
                for (var i = 0; i < authorFlyouts.length; i++) {
                    authorFlyouts[i].style.display = '';
                }
            }

            var flyouts = getElementsByClassList(ArticleTopInfo, ['linked-name','js-linked-footnotes']);
            for (var j = 0; j < flyouts.length; j++) {
                flyouts[j].addEventListener('click', function (e) {
                    if (!e.stopPropagation) window.event.cancelBubble = true;
                    else e.stopPropagation();

                    hideAuthorFlyouts();
                    
                    var authorCard = e.target.previousElementSibling;
                   
                    authorCard.style.display = 'block';

                    // reposition authorCards that would get cut off by right pane
                    var authorLinkWrap = $(this).parent('.al-author-name'); // We need the position of the link's parent, not the link itself
                    var linkPos = authorLinkWrap.position(); 
                    
                    // 320 is the width of the authorCard
                    if(linkPos.left > halfWidth + 320) {
                        authorCard.classList.add('shift-card'); 
                    }

                });
            }

            var showMore = getFirstElementByClassName(ArticleTopInfo, 'meta-authors--etal');          
            if (showMore) {
                showMore.addEventListener('click', function (e) {
                    e.target.attributes['aria-hidden'] = 'true';
                    e.target.style.display = 'none';

                    
                    var remaining = getFirstElementByClassName(ArticleTopInfo, 'meta-authors--remaining');
                    if (remaining) {
                        remaining.attributes['aria-hidden'] = 'false';
                        remaining.style.display = 'inline';
                    }
                });
            }

            var videos = ArticleFulltext.getElementsByClassName('video-js');
            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];

                var replacementVideo = createElement('video', {
                    'data-account': video.dataset.account,
                    'data-player': video.dataset.player,
                    'data-embed': video.dataset.embed,
                    'class': 'brightcove-player video-js',
                    'controls': '',
                    'data-video-id': video.dataset.videoId
                });

                video.parentNode.replaceChild(replacementVideo, video);
            }

            var body = [
                ArticleTopInfo,
                ArticleLinks,
                ArticleFulltext
            ];

            if (ArticleDataSupplements) {
                body.push(ArticleDataSupplements);
            }

            var highlightSectionTitle = (function () {
                var sectionTitles;
                var jumpLinks;
                return function (e) {
                    var tippieTop = widgets.Content.scrollTop;
                    jumpLinks = jumpLinks || (function () {
                        var map = {};
                        var links = getElementsByClass(widgets.ContentsTab, "js-jumplink");
                        for (var i = 0; i < links.length; i++) {
                            var linkHref = links[i].href;
                            if (linkHref.indexOf('#') < 0) continue;
                            var id = linkHref.split('#').slice(-1) + '-sv';
                            map[id] = links[i];
                        }

                        return map;
                    })();

                    sectionTitles = sectionTitles || (function () {
                        var sectionTitles = Array.prototype.concat(
                            Array.prototype.slice.call(widgets.Content.getElementsByTagName('h2'), 0),
                            Array.prototype.slice.call(widgets.Content.getElementsByTagName('h3'), 0)).sort(elementComparator);

                        for (var i = 0; i < sectionTitles.length; i++) {
                            if (!jumpLinks[sectionTitles[i].id]) {
                                sectionTitles.splice(i, 1);
                                i--;
                            }
                        }
                        return sectionTitles;
                    })();

                    for (var id in jumpLinks) {
                        elementRemoveClass(jumpLinks[id], "active");
                    }

                    for (var i = sectionTitles.length - 1; i >= 0; i--) {
                        var top = sectionTitles[i].offsetTop;

                        if (top <= tippieTop) {
                            var link = jumpLinks[sectionTitles[i].id];
                            elementAddClass(link || jumpLinks[sectionTitles[0]], "active");
                            return;
                        }
                    }
                };
            })();

            return createElement('div', { 'class': 'content-panel', 'onscroll': debounce(highlightSectionTitle, 16), 'id': 'split-view-scroll-pane' }, [
                createElement('div', { 'class': 'location-left-panel' }, [
                    createElement('div', { 'class': 'content-inner-wrap' }, [
                        createElement('div', { 'class': 'article-body' }, [
                            createElement('div', { 'class': 'content active' }, body)
                        ])
                    ])
                ])
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'SwitchView',
        render: function () {
            return createElement('li', { 'class': 'toolbar-item item-link' }, [
                createElement('a', { 'class': 'standard-view', 'onclick': SCM.SplitScreen.toggleSplitView }, [
                    createElement('i', { 'class': 'icon-menu_standard' }),
                    "Standard view"
                ])
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'PdfLink',
        render: function () {         
            var pdfLink = getFirstElementByClassName(document, 'item-pdf');
            if (pdfLink) {
                return pdfLink.cloneNode(true);
            }
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: "ShareThis",
        render: function () {      
            var shareWidget = getFirstElementByClassName(document, 'item-share');
            if (shareWidget) {
                shareWidget = shareWidget.cloneNode(true);
                var dropTrigger = getFirstElementByClassName(shareWidget, 'drop-trigger');
                if (dropTrigger) {
                    dropTrigger.addEventListener('click', function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        $this.siblings("ul").slideToggle();
                    });
                }
                return shareWidget;
            }
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: "ToolbarCitation",
        dependencies: ['ToolboxGetCitation'],
        render: function (ToolboxGetCitation) {
            return createElement('li', { 'class': 'toolbar-item' }, [
                ToolboxGetCitation
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: "ToolbarPermissions",
        dependencies: ['ToolboxPermissions'],
        render: function (ToolboxPermissions) {
            return createElement('li', { 'class': 'toolbar-item' }, [
                ToolboxPermissions
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'Toolbar',
        dependencies: ['ToolbarCitation', 'ToolbarPermissions', 'PdfLink', 'ShareThis', 'SwitchView'],
        render: function (ToolbarCitation, ToolbarPermissions, PdfLink, ShareThis, SwitchView) {
            return createElement('div', { 'class': 'toolbar-wrap' }, [
                createElement('div', { 'class': 'toolbar-inner-wrap' }, [
                    createElement('ul', { 'id': 'Toolbar', 'role': 'navigation' }, [
                        PdfLink,
                        SwitchView,
                        ToolbarCitation,
                        ToolbarPermissions,                      
                        ShareThis
                    ])
                ])
            ]);
        }
    });

    SCM.SplitScreen.WidgetStore.register({
        name: 'SplitView',
        dependencies: ['Content', 'Tabs', 'Toolbar'],
        render: function (Content, Tabs, Toolbar) {
            return createElement('div', { 'class': 'master-container' }, [
                createElement('main', { id: 'sv_main' }, [
                    createElement('section', { 'class': 'master-main row' }, [
                        createElement('div', { 'class': 'center-inner-row no-overflow' }, [
                            createElement('div', { 'class': 'widget widget-SplitView widget-instance-SplitView_Article' }, [
                                createElement('div', { 'class': 'pseudo-splitview-header' }, [createElement('div', { 'class': 'pseudo-inner-wrap' }, [Toolbar])]),
                                createElement('div', { 'class': 'index-inner-wrap' }, [
                                    Tabs,
                                    Content
                                ])
                            ])
                        ])
                    ])
                ])
            ]);
        }
    });
})(SCM.SplitScreen = SCM.SplitScreen || {}, jQuery);

// ----
// Silverchair JavaScript Utility Object
// ----

// This object has functions and capabilities that may be useful to any dev.
// Usage: SCM.JSUtility.functionName();  Can be used anywhere in the application




// ----
// Globals in the Global Namespace
// ----

// Debounce function. Use this on resize to avoid taxing the browser.
var debounce = function(func, wait, immediate) {
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




// Get viewport dimensions w/o the need for Modernizr or some other dependency
function updateViewportDimensions() {
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
    return { width:x,height:y };
}

// setting the viewport width
var viewport = updateViewportDimensions();






var SCM = SCM || {};

SCM.JSUtility = (function ($, undefined) {
    // private variables and functions go here



    // All of the public facing methods and properties that are returned
    var publicApi = {
        // ----
        // equalHeights: Equalizes the height of two or more DOM Elements when above a certain breakpoint.
        // @param "items". string. css selector for dom elements to be height equalized.
        // @param "bp". number. viewport width breakpoint above which the dom elements are equalized.
        // ----
        equalHeights: function (items, bp) {
            equalize();
            $(window).resize(function () {
                equalize();
            });
            function equalize() {
                if ($(items).length && $(window).width() > bp) {
                    var height = 0,
                        $items = $(items);
                    $items.attr('style', '');
                    $items.each(function () {
                        var thisHeight = $(this).outerHeight();
                        if (height < thisHeight) {
                            height = thisHeight;
                        }
                    });
                    $(items).css('height', height);
                } else {
                    $(items).attr('style', '');
                }
            }
        },




        // ----
        // smoothScrollLinks: Causes in-document anchor links to scroll smoothly to the target.
        // @param "links". string. css selector for the <a> links (not for the destinations). It expects the anchors
        //          to have a hash (href). I.e. <a class="anchor-link" href="238765"></a>
        // @param "animLength". optional number. timing in milliseconds it takes to do the scroll. Default is 500ms.
        // ----
        //smoothScrollLinks: function (links, animLength) {
        //    var $links = $(links);

        //    $links.click(function () {
        //        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        //            var target = $(this.hash);
        //            var scrolltop = target.offset().top;
        //            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        //            if (target.length) {
        //                $('html,body').animate({
        //                    scrollTop: scrolltop
        //                }, animLength ? animLength : 500);
        //                return false;
        //            }
        //        }
        //    });
        //},





        // ----
        // addStateToggle: Toggles the state of any UI element by adding and removing active classes
        // @param "toggler": string css selector. The element that causes the target to change state
        // @param "target": string css selector. The element that's state is being toggled
        // @param "documentAware" (optional): boolean. Default: false. If true,
        //          toggles an active class on the body element.
        // ----
        addStateToggle: function(toggler, target, documentAware) {
            var $toggler = $(toggler),
                $target = $(target),
                targetActiveClass = 'active-state',
                togglerActiveClass = 'target-active',
                $body = $('body'),
                htmlActiveClass = target.replace(/.|#/, '') + '-active',
                $close = $target.find('.close');

            // Give HTML element awareness?
            documentAware = documentAware || false;

            function resetState() {
                $target.removeClass(targetActiveClass);
                $toggler.removeClass(togglerActiveClass);

                if (documentAware) {
                    $body .removeClass(htmlActiveClass);
                }
            }

            $toggler.click(function(e) {
                // toggle anchors shouldn't use normal browser anchor behavior
                e.preventDefault();

                $target.toggleClass(targetActiveClass);
                $toggler.toggleClass(togglerActiveClass);

                if (documentAware) {
                    $body.toggleClass(htmlActiveClass);
                }
            });

            // If user clicks outside of either the toggler or the target, remove active state
            $body.click(function(e) {
                if (!$(e.target).closest($toggler.add($target)).length) {
                    resetState();
                }
            });

            // Close Button
            $close.click(function() {
                resetState();
            });
        },





        // ----
        // toggleVisibility: Binds a click event to a toggler that jQuery fadeToggles a target and adds/removes active classes
        //                   on both the toggler and the target..
        // @param "toggler": string css selector. The element that causes the target toggle visibility.
        // @param "mobileOnly" (optional): boolean. Only attaches event for mobile.
        // @param "bp" (optional): number. upper breakpoint for mobile. Defaults to 640px if no breakpoint provided.
        // @var "$target": grabs the target from the "data-toggle-target" attribute from the toggler.
        //                 Assumes a class and not an ID.
        // ----
        toggleVisibility: function(toggler, mobileOnly, bp) {
            var $toggler = $(toggler),
                togglerActiveClass = 'target-active',
                targetActiveClass = 'active';

            // defaults to false unless something is passed in.
            mobileOnly = mobileOnly || false;
            // defaults to 640px unless something is passed in.
            bp = bp || 640;

            var clickHandler = function() {
                var $this = $(this),
                    $target = $('.' + $this.attr('data-toggle-target'));

                $this.toggleClass(togglerActiveClass);
                $target.slideToggle().toggleClass(targetActiveClass);
            };

            var manageClickEvents = debounce(function() {
                if (mobileOnly) {
                    viewport = updateViewportDimensions();

                    if (viewport.width > bp) {
                        // remove click events and inline styles added by jQuery fadeToggle()
                        $toggler.off('click.toggle-visibility');
                        $toggler.removeClass(togglerActiveClass);
                        $toggler.each(function() {
                            var $target = $('.' + $(this).attr('data-toggle-target'));
                            $target.removeAttr('style').removeClass(targetActiveClass);
                        });
                    } else {
                        // add click event back in. off event exists so click event isn't bounded more than once.
                        $toggler.off('click.toggle-visibility');
                        $toggler.on('click.toggle-visibility', clickHandler);
                    }
                } else {
                    // do the fadeToggle regardless of viewport size
                    $toggler.on('click.toggle-visibility', clickHandler);
                }
            }, 150, true);

            // run once
            manageClickEvents();

            if (mobileOnly) {
                $(window).resize(function() {
                    manageClickEvents();
                });
            }
        }
    };

    return publicApi;

})(jQuery);

(function () {
    if (typeof window.CustomEvent === "function") return false; //If not IE

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

// Check if IE
// ----
(function () {
    function GetIEVersion() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");

        // If IE, return version number.
        if (Idx > 0)
            return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

        // If IE 11 then look for "Trident" in user agent string.
        else if (!!navigator.userAgent.match(/trident/gi))
            return 11;

        // If IE Edge then look for "Edge" in user agent string.
        else if (!!navigator.userAgent.match(/edge/gi))
            return 13;

        else
            return 0; //It is not IE
    }
    var ieVersion = GetIEVersion();
    if (ieVersion > 0 && ieVersion < 13) {
        $('html').addClass('IE IE-' + ieVersion);
    }
    else if (ieVersion > 12) {
        $('html').addClass('IE IE-Edge');
    }
    else {
        //console.log("This is not IE.");
        ///$('html').addClass('not-ie');

    }
})();
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2015, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var head = $('head');
    head.prepend($.map(class_array, function (class_name) {
      if (head.has('.' + class_name).length === 0) {
        return '<meta class="' + class_name + '" />';
      }
    }));
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-small-only',
    'foundation-mq-medium',
    'foundation-mq-medium-only',
    'foundation-mq-large',
    'foundation-mq-large-only',
    'foundation-mq-xlarge',
    'foundation-mq-xlarge-only',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function () {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) {
            return context;
          }
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) {
      arr.push('data');
    }
    if (this.namespace.length > 0) {
      arr.push(this.namespace);
    }
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        bind = function(){
          var $this = S(this),
              should_bind_events = !$this.data(self.attr_name(true) + '-init');
          $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

          if (should_bind_events) {
            self.events(this);
          }
        };

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      bind.call(this.scope);
    } else {
      S('[' + this.attr_name() +']', this.scope).each(bind);
    }
    // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };

  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

  window.matchMedia || (window.matchMedia = function() {
      "use strict";

      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media);

      // For those that don't support matchMedium
      if (!styleMedia) {
          var style       = document.createElement('style'),
              script      = document.getElementsByTagName('script')[0],
              info        = null;

          style.type  = 'text/css';
          style.id    = 'matchmediajs-test';

          script.parentNode.insertBefore(style, script);

          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

          styleMedia = {
              matchMedium: function(media) {
                  var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                  if (style.styleSheet) {
                      style.styleSheet.cssText = text;
                  } else {
                      style.textContent = text;
                  }

                  // Test if media query is true or false
                  return info.width === '1px';
              }
          };
      }

      return function(media) {
          return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
          };
      };
  }());

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function(jQuery) {


  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + 'RequestAnimationFrame' ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + 'CancelAnimationFrame' ] ||
      window[ vendors[lastTime] + 'CancelRequestAnimationFrame' ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);

      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( $ ));

  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  function MediaQuery(selector) {
    this.selector = selector;
    this.query = '';
  }

  MediaQuery.prototype.toString = function () {
    return this.query || (this.query = S(this.selector).css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''));
  };

  window.Foundation = {
    name : 'Foundation',

    version : '5.5.3',

    media_queries : {
      'small'       : new MediaQuery('.foundation-mq-small'),
      'small-only'  : new MediaQuery('.foundation-mq-small-only'),
      'medium'      : new MediaQuery('.foundation-mq-medium'),
      'medium-only' : new MediaQuery('.foundation-mq-medium-only'),
      'large'       : new MediaQuery('.foundation-mq-large'),
      'large-only'  : new MediaQuery('.foundation-mq-large-only'),
      'xlarge'      : new MediaQuery('.foundation-mq-xlarge'),
      'xlarge-only' : new MediaQuery('.foundation-mq-xlarge-only'),
      'xxlarge'     : new MediaQuery('.foundation-mq-xxlarge')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global : {
      namespace : undefined
    },

    init : function (scope, libraries, method, options, response) {
      var args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      S(window).load(function () {
        S(window)
          .trigger('resize.fndtn.clearing')
          .trigger('resize.fndtn.dropdown')
          .trigger('resize.fndtn.equalizer')
          .trigger('resize.fndtn.interchange')
          .trigger('resize.fndtn.joyride')
          .trigger('resize.fndtn.magellan')
          .trigger('resize.fndtn.topbar')
          .trigger('resize.fndtn.slider');
      });

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
              $.extend(true, this.libs[lib].settings, args[lib]);
            } else if (typeof this.libs[lib].defaults !== 'undefined') {
              $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace : function () {

      // Description:
      //    Don't bother reading the namespace out of the meta tag
      //    if the namespace has been set globally in javascript
      //
      // Example:
      //    Foundation.global.namespace = 'my-namespace';
      // or make it an empty string:
      //    Foundation.global.namespace = '';
      //
      //

      // If the namespace has not been set (is undefined), try to read it out of the meta element.
      // Otherwise use the globally defined namespace, even if it's empty ('')
      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

      // Finally, if the namsepace is either undefined or false, set it to an empty string.
      // Otherwise use the namespace value.
      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          if (timer == null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      //    Immediate (Bool): Whether the function should be called at the beginning
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) {
            result = func.apply(context, args);
          }
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options
      //    attribute.
      data_options : function (el, data_attr_name) {
        data_attr_name = data_attr_name || 'options';
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-' + data_attr_name);
              }

              return el.data(data_attr_name);
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';');
        ii = opts_arr.length;

        function isNumber (o) {
          return !isNaN (o - 0) && o !== null && o !== '' && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') {
            return $.trim(str);
          }
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) {
            p[1] = true;
          }
          if (/false/i.test(p[1])) {
            p[1] = false;
          }
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1]);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if (Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '"/>');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' +
              Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Function to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        function pictures_has_height(images) {
          var pictures_number = images.length;

          for (var i = pictures_number - 1; i >= 0; i--) {
            if(images.attr('height') === undefined) {
              return false;
            };
          };

          return true;
        }

        if (unloaded === 0 || pictures_has_height(images)) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) {
          this.fidx = 0;
        }
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      },

      // Description:
      //    Helper for window.matchMedia
      //
      // Arguments:
      //    mq (String): Media query
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not
      match : function (mq) {
        return window.matchMedia(mq).matches;
      },

      // Description:
      //    Helpers for checking Foundation default media queries with JS
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not

      is_small_up : function () {
        return this.match(Foundation.media_queries.small);
      },

      is_medium_up : function () {
        return this.match(Foundation.media_queries.medium);
      },

      is_large_up : function () {
        return this.match(Foundation.media_queries.large);
      },

      is_xlarge_up : function () {
        return this.match(Foundation.media_queries.xlarge);
      },

      is_xxlarge_up : function () {
        return this.match(Foundation.media_queries.xxlarge);
      },

      is_small_only : function () {
        return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_medium_only : function () {
        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_large_only : function () {
        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xxlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, window, window.document));

;(function ($, window, document, undefined) {
  'use strict';

  var openModals = [];

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '5.5.3',

    locked : false,

    settings : {
      animation : 'fadeAndPop',
      animation_speed : 250,
      close_on_background_click : true,
      close_on_esc : true,
      dismiss_modal_class : 'close-reveal-modal',
      multiple_opened : false,
      bg_class : 'reveal-modal-bg',
      root_element : 'body',
      open : function(){},
      opened : function(){},
      close : function(){},
      closed : function(){},
      on_ajax_error: $.noop,
      bg : $('.reveal-modal-bg'),
      css : {
        open : {
          'opacity' : 0,
          'visibility' : 'visible',
          'display' : 'block'
        },
        close : {
          'opacity' : 1,
          'visibility' : 'hidden',
          'display' : 'none'
        }
      }
    },

    init : function (scope, method, options) {
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.reveal')
        .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = S(this),
                ajax = element.data(self.data_attr('reveal-ajax')),
                replaceContentSel = element.data(self.data_attr('reveal-replace-content'));

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;
              self.open.call(self, element, {url : url}, { replaceContentSel : replaceContentSel });
            }
          }
        });

      S(document)
        .on('click.fndtn.reveal', this.close_targets(), function (e) {
          e.preventDefault();
          if (!self.locked) {
            var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init') || self.settings,
                bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

            if (bg_clicked) {
              if (settings.close_on_background_click) {
                e.stopPropagation();
              } else {
                return;
              }
            }

            self.locked = true;
            self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open:not(.toback)') : S(this).closest('[' + self.attr_name() + ']'));
          }
        });

      if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', this.settings.open)
          .on('opened.fndtn.reveal', this.settings.opened)
          .on('opened.fndtn.reveal', this.open_video)
          .on('close.fndtn.reveal', this.settings.close)
          .on('closed.fndtn.reveal', this.settings.closed)
          .on('closed.fndtn.reveal', this.close_video);
      } else {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
          .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
      }

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_on : function (scope) {
      var self = this;

      // PATCH #1: fixing multiple keyup event trigger from single key press
      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
        var open_modal = self.S('[' + self.attr_name() + '].open'),
            settings = open_modal.data(self.attr_name(true) + '-init') || self.settings ;
        // PATCH #2: making sure that the close event can be called only while unlocked,
        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
        if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
          self.close.call(self, open_modal);
        }
      });

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_off : function (scope) {
      this.S('body').off('keyup.fndtn.reveal');
      return true;
    },

    open : function (target, ajax_settings) {
      var self = this,
          modal;

      if (target) {
        if (typeof target.selector !== 'undefined') {
          // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
          modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
        } else {
          modal = self.S(this.scope);

          ajax_settings = target;
        }
      } else {
        modal = self.S(this.scope);
      }

      var settings = modal.data(self.attr_name(true) + '-init');
      settings = settings || this.settings;


      if (modal.hasClass('open') && target !== undefined && target.attr('data-reveal-id') == modal.attr('id')) {
        return self.close(modal);
      }

      if (!modal.hasClass('open')) {
        var open_modal = self.S('[' + self.attr_name() + '].open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        modal.attr('tabindex','0').attr('aria-hidden','false');

        this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open

        // Prevent namespace event from triggering twice
        modal.on('open.fndtn.reveal', function(e) {
          if (e.namespace !== 'fndtn.reveal') return;
        });

        modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');

        if (open_modal.length < 1) {
          this.toggle_bg(modal, true);
        }

        if (typeof ajax_settings === 'string') {
          ajax_settings = {
            url : ajax_settings
          };
        }

        var openModal = function() {
          if(open_modal.length > 0) {
            if(settings.multiple_opened) {
              self.to_back(open_modal);
            } else {
              self.hide(open_modal, settings.css.close);
            }
          }

          // bl: add the open_modal that isn't already in the background to the openModals array
          if(settings.multiple_opened) {
            openModals.push(modal);
          }

          self.show(modal, settings.css.open);
        };

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          openModal();
        } else {
          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
          $.extend(ajax_settings, {
            success : function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                var result = old_success(data, textStatus, jqXHR);
                if (typeof result == 'string') {
                  data = result;
                }
              }

              if (typeof options !== 'undefined' && typeof options.replaceContentSel !== 'undefined') {
                modal.find(options.replaceContentSel).html(data);
              } else {
                modal.html(data);
              }

              self.S(modal).foundation('section', 'reflow');
              self.S(modal).children().foundation();

              openModal();
            }
          });

          // check for if user initalized with error callback
          if (settings.on_ajax_error !== $.noop) {
            $.extend(ajax_settings, {
              error : settings.on_ajax_error
            });
          }

          $.ajax(ajax_settings);
        }
      }
      self.S(window).trigger('resize');
    },

    close : function (modal) {
      var modal = modal && modal.length ? modal : this.S(this.scope),
          open_modals = this.S('[' + this.attr_name() + '].open'),
          settings = modal.data(this.attr_name(true) + '-init') || this.settings,
          self = this;

      if (open_modals.length > 0) {

        modal.removeAttr('tabindex','0').attr('aria-hidden','true');

        this.locked = true;
        this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open

        modal.trigger('close.fndtn.reveal');

        if ((settings.multiple_opened && open_modals.length === 1) || !settings.multiple_opened || modal.length > 1) {
          self.toggle_bg(modal, false);
          self.to_front(modal);
        }

        if (settings.multiple_opened) {
          var isCurrent = modal.is(':not(.toback)');
          self.hide(modal, settings.css.close, settings);
          if(isCurrent) {
            // remove the last modal since it is now closed
            openModals.pop();
          } else {
            // if this isn't the current modal, then find it in the array and remove it
            openModals = $.grep(openModals, function(elt) {
              var isThis = elt[0]===modal[0];
              if(isThis) {
                // since it's not currently in the front, put it in the front now that it is hidden
                // so that if it's re-opened, it won't be .toback
                self.to_front(modal);
              }
              return !isThis;
            });
          }
          // finally, show the next modal in the stack, if there is one
          if(openModals.length>0) {
            self.to_front(openModals[openModals.length - 1]);
          }
        } else {
          self.hide(open_modals, settings.css.close, settings);
        }
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click) {
        return base + ', .' + this.settings.bg_class;
      }

      return base;
    },

    toggle_bg : function (modal, state) {
      if (this.S('.' + this.settings.bg_class).length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bg_class})
          .appendTo('body').hide();
      }

      var visible = this.settings.bg.filter(':visible').length > 0;
      if ( state != visible ) {
        if ( state == undefined ? visible : !state ) {
          this.hide(this.settings.bg);
        } else {
          this.show(this.settings.bg);
        }
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init') || this.settings,
            root_element = settings.root_element,
            context = this;

        if (el.parent(root_element).length === 0) {
          var placeholder = el.wrap('<div style="display: none;" />').parent();

          el.on('closed.fndtn.reveal.wrapped', function () {
            el.detach().appendTo(placeholder);
            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
          });

          el.detach().appendTo(root_element);
        }

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.trigger('opened.fndtn.reveal');
              })
              .addClass('open');
          }, settings.animation_speed / 2);
        }

        css.top = $(window).scrollTop() + el.data('css-top') + 'px';

        if (animData.fade) {
          var end_css = {opacity: 1};

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.trigger('opened.fndtn.reveal');
              })
              .addClass('open');
          }, settings.animation_speed / 2);
        }

        return el.css(css).show().css({opacity : 1}).addClass('open').trigger('opened.fndtn.reveal');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeIn(settings.animation_speed / 2);
      }

      this.locked = false;

      return el.show();
    },

    to_back : function(el) {
      el.addClass('toback');
    },

    to_front : function(el) {
      el.removeClass('toback');
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init'),
            context = this;
        settings = settings || this.settings;

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.css(css).trigger('closed.fndtn.reveal');
              })
              .removeClass('open');
          }, settings.animation_speed / 2);
        }

        if (animData.fade) {
          var end_css = {opacity : 0};

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.css(css).trigger('closed.fndtn.reveal');
              })
              .removeClass('open');
          }, settings.animation_speed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeOut(settings.animation_speed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = $('iframe', video);

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', iframe.attr('src'));
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');
        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }
        video.show();
      }
    },

    data_attr : function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    cache_offset : function (modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10) + modal.scrollY;

      modal.hide();

      return offset;
    },

    off : function () {
      $(this.scope).off('.fndtn.reveal');
    },

    reflow : function () {}
  };

  /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */
  function getAnimationData(str) {
    var fade = /fade/i.test(str);
    var pop = /pop/i.test(str);
    return {
      animate : fade || pop,
      pop : pop,
      fade : fade
    };
  }
}(jQuery, window, window.document));

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
// Unobtrusive Ajax support library for jQuery
// Copyright (C) Microsoft Corporation. All rights reserved.
// @version v3.2.5
// 
// Microsoft grants you the right to use these script files for the sole
// purpose of either: (i) interacting through your browser with the Microsoft
// website or online service, subject to the applicable licensing or use
// terms; or (ii) using the files as included with a Microsoft product subject
// to that product's license terms. Microsoft reserves all other rights to the
// files not expressly granted by Microsoft, whether by implication, estoppel
// or otherwise. Insofar as a script file is dual licensed under GPL,
// Microsoft neither took the code under GPL nor distributes it thereunder but
// under the terms set out in this paragraph. All notices and licenses
// below are for informational purposes only.

/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: false */
/*global window: false, jQuery: false */

(function ($) {
    var data_click = "unobtrusiveAjaxClick",
        data_target = "unobtrusiveAjaxClickTarget",
        data_validation = "unobtrusiveValidation";

    function getFunction(code, argNames) {
        var fn = window, parts = (code || "").split(".");
        while (fn && parts.length) {
            fn = fn[parts.shift()];
        }
        if (typeof (fn) === "function") {
            return fn;
        }
        argNames.push(code);
        return Function.constructor.apply(null, argNames);
    }

    function isMethodProxySafe(method) {
        return method === "GET" || method === "POST";
    }

    function asyncOnBeforeSend(xhr, method) {
        if (!isMethodProxySafe(method)) {
            xhr.setRequestHeader("X-HTTP-Method-Override", method);
        }
    }

    function asyncOnSuccess(element, data, contentType) {
        var mode;

        if (contentType.indexOf("application/x-javascript") !== -1) {  // jQuery already executes JavaScript for us
            return;
        }

        mode = (element.getAttribute("data-ajax-mode") || "").toUpperCase();
        $(element.getAttribute("data-ajax-update")).each(function (i, update) {
            var top;

            switch (mode) {
                case "BEFORE":
                    $(update).prepend(data);
                    break;
                case "AFTER":
                    $(update).append(data);
                    break;
                case "REPLACE-WITH":
                    $(update).replaceWith(data);
                    break;
                default:
                    $(update).html(data);
                    break;
            }
        });
    }

    function asyncRequest(element, options) {
        var confirm, loading, method, duration;

        confirm = element.getAttribute("data-ajax-confirm");
        if (confirm && !window.confirm(confirm)) {
            return;
        }

        loading = $(element.getAttribute("data-ajax-loading"));
        duration = parseInt(element.getAttribute("data-ajax-loading-duration"), 10) || 0;

        $.extend(options, {
            type: element.getAttribute("data-ajax-method") || undefined,
            url: element.getAttribute("data-ajax-url") || undefined,
            cache: (element.getAttribute("data-ajax-cache") || "").toLowerCase() === "true",
            beforeSend: function (xhr) {
                var result;
                asyncOnBeforeSend(xhr, method);
                result = getFunction(element.getAttribute("data-ajax-begin"), ["xhr"]).apply(element, arguments);
                if (result !== false) {
                    loading.show(duration);
                }
                return result;
            },
            complete: function () {
                loading.hide(duration);
                getFunction(element.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(element, arguments);
            },
            success: function (data, status, xhr) {
                asyncOnSuccess(element, data, xhr.getResponseHeader("Content-Type") || "text/html");
                getFunction(element.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(element, arguments);
            },
            error: function () {
                getFunction(element.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(element, arguments);
            }
        });

        options.data.push({ name: "X-Requested-With", value: "XMLHttpRequest" });

        method = options.type.toUpperCase();
        if (!isMethodProxySafe(method)) {
            options.type = "POST";
            options.data.push({ name: "X-HTTP-Method-Override", value: method });
        }

        $.ajax(options);
    }

    function validate(form) {
        var validationInfo = $(form).data(data_validation);
        return !validationInfo || !validationInfo.validate || validationInfo.validate();
    }

    $(document).on("click", "a[data-ajax=true]", function (evt) {
        evt.preventDefault();
        asyncRequest(this, {
            url: this.href,
            type: "GET",
            data: []
        });
    });

    $(document).on("click", "form[data-ajax=true] input[type=image]", function (evt) {
        var name = evt.target.name,
            target = $(evt.target),
            form = $(target.parents("form")[0]),
            offset = target.offset();

        form.data(data_click, [
            { name: name + ".x", value: Math.round(evt.pageX - offset.left) },
            { name: name + ".y", value: Math.round(evt.pageY - offset.top) }
        ]);

        setTimeout(function () {
            form.removeData(data_click);
        }, 0);
    });

    $(document).on("click", "form[data-ajax=true] :submit", function (evt) {
        var name = evt.currentTarget.name,
            target = $(evt.target),
            form = $(target.parents("form")[0]);

        form.data(data_click, name ? [{ name: name, value: evt.currentTarget.value }] : []);
        form.data(data_target, target);

        setTimeout(function () {
            form.removeData(data_click);
            form.removeData(data_target);
        }, 0);
    });

    $(document).on("submit", "form[data-ajax=true]", function (evt) {
        var clickInfo = $(this).data(data_click) || [],
            clickTarget = $(this).data(data_target),
            isCancel = clickTarget && (clickTarget.hasClass("cancel") || clickTarget.attr('formnovalidate') !== undefined);
        evt.preventDefault();
        if (!isCancel && !validate(this)) {
            return;
        }
        asyncRequest(this, {
            url: this.action,
            type: this.method || "GET",
            data: clickInfo.concat($(this).serializeArray())
        });
    });
}(jQuery));

/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2017 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// https://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {

				// Track the used submit button to properly handle scripted
				// submits later.
				validator.submitButton = event.currentTarget;

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;

					// Insert a hidden input as a replacement for the missing submit button
					// The hidden input is inserted in two cases:
					//   - A user defined a `submitHandler`
					//   - There was a pending request due to `remote` method and `stopRequest()`
					//     was called to submit the form in case it's valid
					if ( validator.submitButton && ( validator.settings.submitHandler || validator.formSubmitted ) ) {
						hidden = $( "<input type='hidden'/>" )
							.attr( "name", validator.submitButton.name )
							.val( $( validator.submitButton ).val() )
							.appendTo( validator.currentForm );
					}

					if ( validator.settings.submitHandler ) {
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( hidden ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// https://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// https://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null ) {
			return;
		}

		if ( !element.form && element.hasAttribute( "contenteditable" ) ) {
			element.form = this.closest( "form" )[ 0 ];
			element.name = this.attr( "name" );
		}

		if ( element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// https://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// https://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// https://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// https://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {

				// Set form expando on contenteditable
				if ( !this.form && this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = $( this ).attr( "name" );
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}
		},

		// https://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// https://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// https://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// https://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {

				// This check allows counting elements with empty error
				// message as invalid elements
				if ( obj[ i ] !== undefined && obj[ i ] !== null && obj[ i ] !== false ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = name;
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( element.hasAttribute( "contenteditable" ) ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule, normalizer;

			// Prioritize the local normalizer defined for this element over the global one
			// if the former exists, otherwise user the global one in case it exists.
			if ( typeof rules.normalizer === "function" ) {
				normalizer = rules.normalizer;
			} else if (	typeof this.settings.normalizer === "function" ) {
				normalizer = this.settings.normalizer;
			}

			// If normalizer is defined, then call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( normalizer ) {
				val = normalizer.call( element, val );

				if ( typeof val !== "string" ) {
					throw new TypeError( "The normalizer should return a string value." );
				}

				// Delete the normalizer from rules to avoid treating it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();

				// Remove the hidden input that was used as a replacement for the
				// missing submit button. The hidden input is added by `handle()`
				// to ensure that the value of the used submit button is passed on
				// for scripted submits triggered by this method
				if ( this.submitButton ) {
					$( "input:hidden[name='" + this.submitButton.name + "']", this.currentForm ).remove();
				}

				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// https://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// https://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value.length > 0;
		},

		// https://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// https://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// https://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// https://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// https://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// https://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// https://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// https://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// https://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// https://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// https://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() ),
				decimalPlaces = function( num ) {
					var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
					if ( !match ) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[ 1 ] ? match[ 1 ].length : 0;
				},
				toInt = function( num ) {
					return Math.round( num * Math.pow( 10, decimals ) );
				},
				valid = true,
				decimals;

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}

			decimals = decimalPlaces( param );

			// Value can't have too many decimals
			if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
				valid = false;
			}

			return this.optional( element ) || valid;
		},

		// https://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// https://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}
return $;
}));
// Unobtrusive validation support library for jQuery and jQuery Validate
// Copyright (C) Microsoft Corporation. All rights reserved.
// @version v3.2.10

/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: false */
/*global document: false, jQuery: false */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define("jquery.validate.unobtrusive", ['jquery-validation'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments that support module.exports     
        module.exports = factory(require('jquery-validation'));
    } else {
        // Browser global
        jQuery.validator.unobtrusive = factory(jQuery);
    }
}(function ($) {
    var $jQval = $.validator,
        adapters,
        data_validation = "unobtrusiveValidation";

    function setValidationValues(options, ruleName, value) {
        options.rules[ruleName] = value;
        if (options.message) {
            options.messages[ruleName] = options.message;
        }
    }

    function splitAndTrim(value) {
        return value.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
    }

    function escapeAttributeValue(value) {
        // As mentioned on http://api.jquery.com/category/selectors/
        return value.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
    }

    function getModelPrefix(fieldName) {
        return fieldName.substr(0, fieldName.lastIndexOf(".") + 1);
    }

    function appendModelPrefix(value, prefix) {
        if (value.indexOf("*.") === 0) {
            value = value.replace("*.", prefix);
        }
        return value;
    }

    function onError(error, inputElement) {  // 'this' is the form element
        var container = $(this).find("[data-valmsg-for='" + escapeAttributeValue(inputElement[0].name) + "']"),
            replaceAttrValue = container.attr("data-valmsg-replace"),
            replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) !== false : null;

        container.removeClass("field-validation-valid").addClass("field-validation-error");
        error.data("unobtrusiveContainer", container);

        if (replace) {
            container.empty();
            error.removeClass("input-validation-error").appendTo(container);
        }
        else {
            error.hide();
        }
    }

    function onErrors(event, validator) {  // 'this' is the form element
        var container = $(this).find("[data-valmsg-summary=true]"),
            list = container.find("ul");

        if (list && list.length && validator.errorList.length) {
            list.empty();
            container.addClass("validation-summary-errors").removeClass("validation-summary-valid");

            $.each(validator.errorList, function () {
                $("<li />").html(this.message).appendTo(list);
            });
        }
    }

    function onSuccess(error) {  // 'this' is the form element
        var container = error.data("unobtrusiveContainer");

        if (container) {
            var replaceAttrValue = container.attr("data-valmsg-replace"),
                replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) : null;

            container.addClass("field-validation-valid").removeClass("field-validation-error");
            error.removeData("unobtrusiveContainer");

            if (replace) {
                container.empty();
            }
        }
    }

    function onReset(event) {  // 'this' is the form element
        var $form = $(this),
            key = '__jquery_unobtrusive_validation_form_reset';
        if ($form.data(key)) {
            return;
        }
        // Set a flag that indicates we're currently resetting the form.
        $form.data(key, true);
        try {
            $form.data("validator").resetForm();
        } finally {
            $form.removeData(key);
        }

        $form.find(".validation-summary-errors")
            .addClass("validation-summary-valid")
            .removeClass("validation-summary-errors");
        $form.find(".field-validation-error")
            .addClass("field-validation-valid")
            .removeClass("field-validation-error")
            .removeData("unobtrusiveContainer")
            .find(">*")  // If we were using valmsg-replace, get the underlying error
                .removeData("unobtrusiveContainer");
    }

    function validationInfo(form) {
        var $form = $(form),
            result = $form.data(data_validation),
            onResetProxy = $.proxy(onReset, form),
            defaultOptions = $jQval.unobtrusive.options || {},
            execInContext = function (name, args) {
                var func = defaultOptions[name];
                func && $.isFunction(func) && func.apply(form, args);
            };

        if (!result) {
            result = {
                options: {  // options structure passed to jQuery Validate's validate() method
                    errorClass: defaultOptions.errorClass || "input-validation-error",
                    errorElement: defaultOptions.errorElement || "span",
                    errorPlacement: function () {
                        onError.apply(form, arguments);
                        execInContext("errorPlacement", arguments);
                    },
                    invalidHandler: function () {
                        onErrors.apply(form, arguments);
                        execInContext("invalidHandler", arguments);
                    },
                    messages: {},
                    rules: {},
                    success: function () {
                        onSuccess.apply(form, arguments);
                        execInContext("success", arguments);
                    }
                },
                attachValidation: function () {
                    $form
                        .off("reset." + data_validation, onResetProxy)
                        .on("reset." + data_validation, onResetProxy)
                        .validate(this.options);
                },
                validate: function () {  // a validation function that is called by unobtrusive Ajax
                    $form.validate();
                    return $form.valid();
                }
            };
            $form.data(data_validation, result);
        }

        return result;
    }

    $jQval.unobtrusive = {
        adapters: [],

        parseElement: function (element, skipAttach) {
            /// <summary>
            /// Parses a single HTML element for unobtrusive validation attributes.
            /// </summary>
            /// <param name="element" domElement="true">The HTML element to be parsed.</param>
            /// <param name="skipAttach" type="Boolean">[Optional] true to skip attaching the
            /// validation to the form. If parsing just this single element, you should specify true.
            /// If parsing several elements, you should specify false, and manually attach the validation
            /// to the form when you are finished. The default is false.</param>
            var $element = $(element),
                form = $element.parents("form")[0],
                valInfo, rules, messages;

            if (!form) {  // Cannot do client-side validation without a form
                return;
            }

            valInfo = validationInfo(form);
            valInfo.options.rules[element.name] = rules = {};
            valInfo.options.messages[element.name] = messages = {};

            $.each(this.adapters, function () {
                var prefix = "data-val-" + this.name,
                    message = $element.attr(prefix),
                    paramValues = {};

                if (message !== undefined) {  // Compare against undefined, because an empty message is legal (and falsy)
                    prefix += "-";

                    $.each(this.params, function () {
                        paramValues[this] = $element.attr(prefix + this);
                    });

                    this.adapt({
                        element: element,
                        form: form,
                        message: message,
                        params: paramValues,
                        rules: rules,
                        messages: messages
                    });
                }
            });

            $.extend(rules, { "__dummy__": true });

            if (!skipAttach) {
                valInfo.attachValidation();
            }
        },

        parse: function (selector) {
            /// <summary>
            /// Parses all the HTML elements in the specified selector. It looks for input elements decorated
            /// with the [data-val=true] attribute value and enables validation according to the data-val-*
            /// attribute values.
            /// </summary>
            /// <param name="selector" type="String">Any valid jQuery selector.</param>

            // $forms includes all forms in selector's DOM hierarchy (parent, children and self) that have at least one
            // element with data-val=true
            var $selector = $(selector),
                $forms = $selector.parents()
                                  .addBack()
                                  .filter("form")
                                  .add($selector.find("form"))
                                  .has("[data-val=true]");

            $selector.find("[data-val=true]").each(function () {
                $jQval.unobtrusive.parseElement(this, true);
            });

            $forms.each(function () {
                var info = validationInfo(this);
                if (info) {
                    info.attachValidation();
                }
            });
        }
    };

    adapters = $jQval.unobtrusive.adapters;

    adapters.add = function (adapterName, params, fn) {
        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation.</summary>
        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
        /// <param name="params" type="Array" optional="true">[Optional] An array of parameter names (strings) that will
        /// be extracted from the data-val-nnnn-mmmm HTML attributes (where nnnn is the adapter name, and
        /// mmmm is the parameter name).</param>
        /// <param name="fn" type="Function">The function to call, which adapts the values from the HTML
        /// attributes into jQuery Validate rules and/or messages.</param>
        /// <returns type="jQuery.validator.unobtrusive.adapters" />
        if (!fn) {  // Called with no params, just a function
            fn = params;
            params = [];
        }
        this.push({ name: adapterName, params: params, adapt: fn });
        return this;
    };

    adapters.addBool = function (adapterName, ruleName) {
        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
        /// the jQuery Validate validation rule has no parameter values.</summary>
        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
        /// <param name="ruleName" type="String" optional="true">[Optional] The name of the jQuery Validate rule. If not provided, the value
        /// of adapterName will be used instead.</param>
        /// <returns type="jQuery.validator.unobtrusive.adapters" />
        return this.add(adapterName, function (options) {
            setValidationValues(options, ruleName || adapterName, true);
        });
    };

    adapters.addMinMax = function (adapterName, minRuleName, maxRuleName, minMaxRuleName, minAttribute, maxAttribute) {
        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
        /// the jQuery Validate validation has three potential rules (one for min-only, one for max-only, and
        /// one for min-and-max). The HTML parameters are expected to be named -min and -max.</summary>
        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
        /// <param name="minRuleName" type="String">The name of the jQuery Validate rule to be used when you only
        /// have a minimum value.</param>
        /// <param name="maxRuleName" type="String">The name of the jQuery Validate rule to be used when you only
        /// have a maximum value.</param>
        /// <param name="minMaxRuleName" type="String">The name of the jQuery Validate rule to be used when you
        /// have both a minimum and maximum value.</param>
        /// <param name="minAttribute" type="String" optional="true">[Optional] The name of the HTML attribute that
        /// contains the minimum value. The default is "min".</param>
        /// <param name="maxAttribute" type="String" optional="true">[Optional] The name of the HTML attribute that
        /// contains the maximum value. The default is "max".</param>
        /// <returns type="jQuery.validator.unobtrusive.adapters" />
        return this.add(adapterName, [minAttribute || "min", maxAttribute || "max"], function (options) {
            var min = options.params.min,
                max = options.params.max;

            if (min && max) {
                setValidationValues(options, minMaxRuleName, [min, max]);
            }
            else if (min) {
                setValidationValues(options, minRuleName, min);
            }
            else if (max) {
                setValidationValues(options, maxRuleName, max);
            }
        });
    };

    adapters.addSingleVal = function (adapterName, attribute, ruleName) {
        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
        /// the jQuery Validate validation rule has a single value.</summary>
        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
        /// in the data-val-nnnn HTML attribute(where nnnn is the adapter name).</param>
        /// <param name="attribute" type="String">[Optional] The name of the HTML attribute that contains the value.
        /// The default is "val".</param>
        /// <param name="ruleName" type="String" optional="true">[Optional] The name of the jQuery Validate rule. If not provided, the value
        /// of adapterName will be used instead.</param>
        /// <returns type="jQuery.validator.unobtrusive.adapters" />
        return this.add(adapterName, [attribute || "val"], function (options) {
            setValidationValues(options, ruleName || adapterName, options.params[attribute]);
        });
    };

    $jQval.addMethod("__dummy__", function (value, element, params) {
        return true;
    });

    $jQval.addMethod("regex", function (value, element, params) {
        var match;
        if (this.optional(element)) {
            return true;
        }

        match = new RegExp(params).exec(value);
        return (match && (match.index === 0) && (match[0].length === value.length));
    });

    $jQval.addMethod("nonalphamin", function (value, element, nonalphamin) {
        var match;
        if (nonalphamin) {
            match = value.match(/\W/g);
            match = match && match.length >= nonalphamin;
        }
        return match;
    });

    if ($jQval.methods.extension) {
        adapters.addSingleVal("accept", "mimtype");
        adapters.addSingleVal("extension", "extension");
    } else {
        // for backward compatibility, when the 'extension' validation method does not exist, such as with versions
        // of JQuery Validation plugin prior to 1.10, we should use the 'accept' method for
        // validating the extension, and ignore mime-type validations as they are not supported.
        adapters.addSingleVal("extension", "extension", "accept");
    }

    adapters.addSingleVal("regex", "pattern");
    adapters.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    adapters.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    adapters.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    adapters.add("equalto", ["other"], function (options) {
        var prefix = getModelPrefix(options.element.name),
            other = options.params.other,
            fullOtherName = appendModelPrefix(other, prefix),
            element = $(options.form).find(":input").filter("[name='" + escapeAttributeValue(fullOtherName) + "']")[0];

        setValidationValues(options, "equalTo", element);
    });
    adapters.add("required", function (options) {
        // jQuery Validate equates "required" with "mandatory" for checkbox elements
        if (options.element.tagName.toUpperCase() !== "INPUT" || options.element.type.toUpperCase() !== "CHECKBOX") {
            setValidationValues(options, "required", true);
        }
    });
    adapters.add("remote", ["url", "type", "additionalfields"], function (options) {
        var value = {
            url: options.params.url,
            type: options.params.type || "GET",
            data: {}
        },
            prefix = getModelPrefix(options.element.name);

        $.each(splitAndTrim(options.params.additionalfields || options.element.name), function (i, fieldName) {
            var paramName = appendModelPrefix(fieldName, prefix);
            value.data[paramName] = function () {
                var field = $(options.form).find(":input").filter("[name='" + escapeAttributeValue(paramName) + "']");
                // For checkboxes and radio buttons, only pick up values from checked fields.
                if (field.is(":checkbox")) {
                    return field.filter(":checked").val() || field.filter(":hidden").val() || '';
                }
                else if (field.is(":radio")) {
                    return field.filter(":checked").val() || '';
                }
                return field.val();
            };
        });

        setValidationValues(options, "remote", value);
    });
    adapters.add("password", ["min", "nonalphamin", "regex"], function (options) {
        if (options.params.min) {
            setValidationValues(options, "minlength", options.params.min);
        }
        if (options.params.nonalphamin) {
            setValidationValues(options, "nonalphamin", options.params.nonalphamin);
        }
        if (options.params.regex) {
            setValidationValues(options, "regex", options.params.regex);
        }
    });
    adapters.add("fileextensions", ["extensions"], function (options) {
        setValidationValues(options, "extension", options.params.extensions);
    });

    $(function () {
        $jQval.unobtrusive.parse(document);
    });

    return $jQval.unobtrusive;
}));
/*
 * jQuery.validity ﻿v1.3.6
 * http://validity.thatscaptaintoyou.com/
 * https://github.com/whatgoodisaroad/validity
 * 
 * Dual licensed under MIT and GPL
 *
 * Date: 2013-10-01 (Tuesday, 01 October 2013)
 */
(function(a,e){function d(b,c,f){var d=[];(b.reduction||b).filter(a.validity.settings.elementSupport).each(function(){c(this)?d.push(this):i(this,g(f,{field:o(this)}))});b.reduction=a(d);return b}function h(){if(a.validity.isValidating())a.validity.report.errors++,a.validity.report.valid=!1}function i(b,c){h();a.validity.out.raise(a(b),c)}function j(b,c){h();a.validity.out.raiseAggregate(b,c)}function k(b){var a=0;b.each(function(){var b=parseFloat(this.value);a+=isNaN(b)?0:b});return a}function g(b,
a){for(var f in a)a.hasOwnProperty(f)&&(b=b.replace(RegExp("#\\{"+f+"\\}","g"),a[f]));return m(b)}function o(b){var b=a(b),c=b.prop("id"),f=a.validity.settings.defaultFieldName;if(b.prop("title").length)f=b.prop("title");else if(/^([A-Z0-9][a-z]*)+$/.test(c))f=c.replace(/([A-Z0-9])[a-z]*/g," $&");else if(/^[a-z0-9]+(_[a-z0-9]+)*$/.test(c)){b=c.split("_");for(c=0;c<b.length;++c)b[c]=m(b[c]);f=b.join(" ")}return a.trim(f)}function m(b){return b.substring?b.substring(0,1).toUpperCase()+b.substring(1,
b.length):b}var p;a.validity={settings:a.extend({outputMode:"tooltip",scrollTo:!1,modalErrorsClickable:!0,defaultFieldName:"This field",elementSupport:":text, :password, textarea, select, :radio, :checkbox, input[type='hidden'], input[type='tel'], input[type='email']",argToString:function(b){return b.getDate?[b.getMonth()+1,b.getDate(),b.getFullYear()].join("/"):b+""},debugPrivates:!1},{}),patterns:{integer:/^\d+$/,date:/^((0?\d)|(1[012]))[\/-]([012]?\d|30|31)[\/-]\d{1,4}$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
usd:/^\$?((\d{1,3}(,\d{3})*)|\d+)(\.(\d{2})?)?$/,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
number:/^[+-]?(\d+(\.\d*)?|\.\d+)([Ee]-?\d+)?$/,zip:/^\d{5}(-\d{4})?$/,phone:/^[2-9]\d{2}-\d{3}-\d{4}$/,guid:/^(\{?([0-9a-fA-F]){8}-(([0-9a-fA-F]){4}-){3}([0-9a-fA-F]){12}\}?)$/,time12:/^((0?\d)|(1[012])):[0-5]\d?\s?[aApP]\.?[mM]\.?$/,time24:/^(20|21|22|23|[01]\d|\d)(([:][0-5]\d){1,2})$/,nonHtml:/^[^<>]*$/},messages:{require:"#{field} is required.",match:"#{field} is in an invalid format.",integer:"#{field} must be a positive, whole number.",date:"#{field} must be formatted as a date. (mm/dd/yyyy)",
email:"#{field} must be formatted as an email.",usd:"#{field} must be formatted as a US Dollar amount.",url:"#{field} must be formatted as a URL.",number:"#{field} must be formatted as a number.",zip:"#{field} must be formatted as a zipcode ##### or #####-####.",phone:"#{field} must be formatted as a phone number ###-###-####.",guid:"#{field} must be formatted as a guid like {3F2504E0-4F89-11D3-9A0C-0305E82C3301}.",time24:"#{field} must be formatted as a 24 hour time: 23:00.",time12:"#{field} must be formatted as a 12 hour time: 12:00 AM/PM",
lessThan:"#{field} must be less than #{max}.",lessThanOrEqualTo:"#{field} must be less than or equal to #{max}.",greaterThan:"#{field} must be greater than #{min}.",greaterThanOrEqualTo:"#{field} must be greater than or equal to #{min}.",range:"#{field} must be between #{min} and #{max}.",tooLong:"#{field} cannot be longer than #{max} characters.",tooShort:"#{field} cannot be shorter than #{min} characters.",nonHtml:"#{field} cannot contain HTML characters.",alphabet:"#{field} contains disallowed characters.",
minCharClass:"#{field} cannot have more than #{min} #{charClass} characters.",maxCharClass:"#{field} cannot have less than #{min} #{charClass} characters.",equal:"Values don't match.",distinct:"A value was repeated.",sum:"Values don't add to #{sum}.",sumMax:"The sum of the values must be less than #{max}.",sumMin:"The sum of the values must be greater than #{min}.",radioChecked:"The selected value is not valid.",generic:"Invalid."},out:{start:function(){this.defer("start")},end:function(b){this.defer("end",
b)},raise:function(b,a){this.defer("raise",b,a)},raiseAggregate:function(b,a){this.defer("raiseAggregate",b,a)},defer:function(b){var c=a.validity,c=c.outputs[c.settings.outputMode];c[b].apply(c,Array.prototype.slice.call(arguments,1))}},charClasses:{alphabetical:/\w/g,numeric:/\d/g,alphanumeric:/[A-Za-z0-9]/g,symbol:/[^A-Za-z0-9]/g},outputs:{},__private:e,setup:function(b){this.settings=a.extend(this.settings,b);this.__private=this.settings.debugPrivates?p:e},report:null,isValidating:function(){return!!this.report},
start:function(){this.out.start();this.report={errors:0,valid:!0}},end:function(){var b=this.report||{errors:0,valid:!0};this.report=null;this.out.end(b);return b},clear:function(){this.start();this.end()}};a.fn.extend({validity:function(b){return this.each(function(){var c=this;if(this.tagName.toLowerCase()=="form"){var f=null;typeof b=="string"?f=function(){a(b).require()}:a.isFunction(b)&&(f=b);b&&a(this).bind("submit",function(){a.validity.start();f.apply(c);return a.validity.end().valid})}})},
require:function(b){return d(this,function(b){return a(b).val()?a(b).val()!=null&&!!a(b).val().length:!1},b||a.validity.messages.require)},match:function(b,c){if(!c)c=a.validity.messages.match,typeof b==="string"&&a.validity.messages[b]&&(c=a.validity.messages[b]);typeof b=="string"&&(b=a.validity.patterns[b]);return d(this,a.isFunction(b)?function(a){return!a.value.length||b(a.value)}:function(a){if(b.global)b.lastIndex=0;return!a.value.length||b.test(a.value)},c)},range:function(b,c,f){return d(this,
b.getTime&&c.getTime?function(a){a=new Date(a.value);return a>=new Date(b)&&a<=new Date(c)}:b.substring&&c.substring&&Big?function(a){a=new Big(a.value);return a.greaterThanOrEqualTo(new Big(b))&&a.lessThanOrEqualTo(new Big(c))}:function(a){a=parseFloat(a.value);return a>=b&&a<=c},f||g(a.validity.messages.range,{min:a.validity.settings.argToString(b),max:a.validity.settings.argToString(c)}))},greaterThan:function(b,c){return d(this,b.getTime?function(a){return new Date(a.value)>b}:b.substring&&Big?
function(a){return(new Big(a.value)).greaterThan(new Big(b))}:function(a){return parseFloat(a.value)>b},c||g(a.validity.messages.greaterThan,{min:a.validity.settings.argToString(b)}))},greaterThanOrEqualTo:function(b,c){return d(this,b.getTime?function(a){return new Date(a.value)>=b}:b.substring&&Big?function(a){return(new Big(a.value)).greaterThanOrEqualTo(new Big(b))}:function(a){return parseFloat(a.value)>=b},c||g(a.validity.messages.greaterThanOrEqualTo,{min:a.validity.settings.argToString(b)}))},
lessThan:function(b,c){return d(this,b.getTime?function(a){return new Date(a.value)<b}:b.substring&&Big?function(a){return(new Big(a.value)).lessThan(new Big(b))}:function(a){return parseFloat(a.value)<b},c||g(a.validity.messages.lessThan,{max:a.validity.settings.argToString(b)}))},lessThanOrEqualTo:function(b,c){return d(this,b.getTime?function(a){return new Date(a.value)<=b}:b.substring&&Big?function(a){return(new Big(a.value)).lessThanOrEqualTo(new Big(b))}:function(a){return parseFloat(a.value)<=
b},c||g(a.validity.messages.lessThanOrEqualTo,{max:a.validity.settings.argToString(b)}))},maxLength:function(b,c){return d(this,function(a){return a.value.length<=b},c||g(a.validity.messages.tooLong,{max:b}))},minLength:function(b,c){return d(this,function(a){return a.value.length>=b},c||g(a.validity.messages.tooShort,{min:b}))},alphabet:function(b,c){var f=[];return d(this,function(a){for(var c=0;c<a.value.length;++c)if(b.indexOf(a.value.charAt(c))==-1)return f.push(a.value.charAt(c)),!1;return!0},
c||g(a.validity.messages.alphabet,{chars:f.join(", ")}))},minCharClass:function(b,c,f){typeof b=="string"&&(b=b.toLowerCase(),a.validity.charClasses[b]&&(b=a.validity.charClasses[b]));return d(this,function(a){return(a.value.match(b)||[]).length>=c},f||g(a.validity.messages.minCharClass,{min:c,charClass:b}))},maxCharClass:function(b,c,f){typeof b=="string"&&(b=b.toLowerCase(),a.validity.charClasses[b]&&(b=a.validity.charClasses[b]));return d(this,function(a){return(a.value.match(b)||[]).length<=c},
f||g(a.validity.messages.maxCharClass,{max:c,charClass:b}))},nonHtml:function(b){return d(this,function(b){return a.validity.patterns.nonHtml.test(b.value)},b||a.validity.messages.nonHtml)},equal:function(b,c){var f=(this.reduction||this).filter(a.validity.settings.elementSupport),d=function(a){return a},e=a.validity.messages.equal;if(f.length){a.isFunction(b)?(d=b,typeof c=="string"&&(e=c)):typeof b=="string"&&(e=b);var h=a.map(f,function(a){return d(a.value)}),g=h[0],i=!0,l;for(l in h)h[l]!=g&&
(i=!1);if(!i)j(f,e),this.reduction=a([])}return this},distinct:function(b,c){var d=(this.reduction||this).filter(a.validity.settings.elementSupport),e=function(a){return a},h=a.validity.messages.distinct,g=[],i=[],k=!0;if(d.length){a.isFunction(b)?(e=b,typeof c=="string"&&(h=c)):typeof b=="string"&&(h=b);for(var l=a.map(d,function(a){return e(a.value)}),n=0;n<l.length;++n)if(l[n].length){for(var m=0;m<g.length;++m)g[m]==l[n]&&(k=!1,i.push(l[n]));g.push(l[n])}if(!k){i=a.unique(i);g=0;for(k=i.length;g<
k;++g)j(d.filter("[value='"+i[g]+"']"),h);this.reduction=a([])}}return this},sum:function(b,c){var d=(this.reduction||this).filter(a.validity.settings.elementSupport);if(d.length&&b!=k(d))j(d,c||g(a.validity.messages.sum,{sum:b})),this.reduction=a([]);return this},sumMax:function(b,c){var d=(this.reduction||this).filter(a.validity.settings.elementSupport);if(d.length&&b<k(d))j(d,c||g(a.validity.messages.sumMax,{max:b})),this.reduction=a([]);return this},sumMin:function(b,c){var d=(this.reduction||
this).filter(a.validity.settings.elementSupport);if(d.length&&b>k(d))j(d,c||g(a.validity.messages.sumMin,{min:b})),this.reduction=a([]);return this},radioChecked:function(b,c){var d=(this.reduction||this).filter(a.validity.settings.elementSupport);d.is(":radio")&&d.find(":checked").val()!=b&&j(d,c||a.validity.messages.radioChecked)},radioNotChecked:function(b,c){var d=(this.reduction||this).filter(a.validity.settings.elementSupport);d.is(":radio")&&d.filter(":checked").val()==b&&j(d,c||a.validity.messages.radioChecked)},
checkboxChecked:function(b){return d(this,function(b){return!a(b).is(":checkbox")||a(b).is(":checked")},b||a.validity.messages.nonHtml)},assert:function(b,c){var e=this.reduction||this;if(e.length)if(a.isFunction(b))return d(this,b,c||a.validity.messages.generic);else if(!b)j(e,c||a.validity.messages.generic),this.reduction=a([]);return this},fail:function(a){return this.assert(!1,a)}});p={validate:d,addToReport:h,raiseError:i,raiseAggregateError:j,numericSum:k,format:g,infer:o,capitalize:m}})(jQuery);(function(a){a.validity.outputs.tooltip={tooltipClass:"validity-tooltip",start:function(){a("."+a.validity.outputs.tooltip.tooltipClass).remove()},end:function(e){!e.valid&&a.validity.settings.scrollTo&&a(document).scrollTop(a("."+a.validity.outputs.tooltip.tooltipClass).offset().top)},raise:function(e,d){var h=e.offset();h.left+=e.width()+18;h.top+=8;var i=a('<div class="validity-tooltip">'+d+'<div class="validity-tooltip-outer"><div class="validity-tooltip-inner"></div></div></div>').click(function(){e.focus();
a(this).fadeOut()}).css(h).hide().appendTo("body").fadeIn();if(a.validity.settings.fadeOutTooltipsOnFocus)e.on("focus",function(){i.fadeOut()})},raiseAggregate:function(a,d){a.length&&this.raise(a.filter(":last"),d)}}})(jQuery);
(function(a){function e(a){return a.attr("id").length?a.attr("id"):a.attr("name")}a.validity.outputs.label={cssClass:"error",start:function(){a("."+a.validity.outputs.label.cssClass).remove()},end:function(d){if(!d.valid&&a.validity.settings.scrollTo)location.hash=a("."+a.validity.outputs.label.cssClass+":eq(0)").attr("for")},raise:function(d,h){var i="."+a.validity.outputs.label.cssClass+"[for='"+e(d)+"']";a(i).length?a(i).text(h):a("<label/>").attr("for",e(d)).addClass(a.validity.outputs.label.cssClass).text(h).click(function(){d.length&&
d[0].select()}).insertAfter(d)},raiseAggregate:function(d,e){d.length&&this.raise(a(d.get(d.length-1)),e)}}})(jQuery);
(function(a){a.validity.outputs.modal={start:function(){a(".validity-modal-msg").remove()},end:function(e){if(!e.valid&&a.validity.settings.scrollTo)location.hash=a(".validity-modal-msg:eq(0)").attr("id")},raise:function(e,d){if(e.length){var h=e.offset();e.get(0);h={left:parseInt(h.left+e.width()+4,10)+"px",top:parseInt(h.top-10,10)+"px"};a("<div/>").addClass("validity-modal-msg").css(h).text(d).click(a.validity.settings.modalErrorsClickable?function(){a(this).remove()}:null).appendTo("body")}},
raiseAggregate:function(e,d){e.length&&this.raise(a(e.get(e.length-1)),d)}}})(jQuery);
(function(a){var e=[];a.validity.outputs.summary={start:function(){a(".validity-erroneous").removeClass("validity-erroneous");e=[]},end:function(){a(".validity-summary-container").stop().hide().find("ul").html("");if(e.length){for(var d=0;d<e.length;++d)a("<li/>").text(e[d]).appendTo(".validity-summary-container ul");a(".validity-summary-container").show();if(a.validity.settings.scrollTo)location.hash=a(".validity-erroneous:eq(0)").attr("id")}},raise:function(a,h){e.push(h);a.addClass("validity-erroneous")},
raiseAggregate:function(a,e){this.raise(a,e)},container:function(){document.write('<div class="validity-summary-container">The form didn\'t submit for the following reason(s):<ul></ul></div>')}}})(jQuery);

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null
        };

        function update() {
            var counter = 0;
      
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function(event) {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });
              
        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

/*!
* TableSorter 2.17.8 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach
*/
!function(h){h.extend({tablesorter:new function(){function d(){var b=arguments[0],a=1<arguments.length?Array.prototype.slice.call(arguments):b;if("undefined"!==typeof console&&"undefined"!==typeof console.log)console[/error/i.test(b)?"error":/warn/i.test(b)?"warn":"log"](a);else alert(a)}function q(b,a){d(b+" ("+((new Date).getTime()-a.getTime())+"ms)")}function p(b){for(var a in b)return!1;return!0}function r(b,a,c){if(!a)return"";var f,e=b.config,l=e.textExtraction||"",d="",d="basic"===l?h(a).attr(e.textAttribute)|| a.textContent||a.innerText||h(a).text()||"":"function"===typeof l?l(a,b,c):"function"===typeof(f=g.getColumnData(b,l,c))?f(a,b,c):a.textContent||a.innerText||h(a).text()||"";return h.trim(d)}function v(b){var a,c,f=b.config,e=f.$tbodies=f.$table.children("tbody:not(."+f.cssInfoBlock+")"),l,x,k,h,m,B,u,s,t,p=0,v="",w=e.length;if(0===w)return f.debug?d("Warning: *Empty table!* Not building a parser cache"):"";f.debug&&(t=new Date,d("Detecting parsers for each column"));a=[];for(c=[];p<w;){l=e[p].rows; if(l[p])for(x=f.columns,k=0;k<x;k++){h=f.$headers.filter('[data-column="'+k+'"]:last');m=g.getColumnData(b,f.headers,k);s=g.getParserById(g.getData(h,m,"extractor"));u=g.getParserById(g.getData(h,m,"sorter"));B="false"===g.getData(h,m,"parser");f.empties[k]=(g.getData(h,m,"empty")||f.emptyTo||(f.emptyToBottom?"bottom":"top")).toLowerCase();f.strings[k]=(g.getData(h,m,"string")||f.stringTo||"max").toLowerCase();B&&(u=g.getParserById("no-parser"));s||(s=!1);if(!u)a:{h=b;m=l;B=-1;u=k;for(var A=void 0, K=g.parsers.length,G=!1,z="",A=!0;""===z&&A;)B++,m[B]?(G=m[B].cells[u],z=r(h,G,u),h.config.debug&&d("Checking if value was empty on row "+B+", column: "+u+': "'+z+'"')):A=!1;for(;0<=--K;)if((A=g.parsers[K])&&"text"!==A.id&&A.is&&A.is(z,h,G)){u=A;break a}u=g.getParserById("text")}f.debug&&(v+="column:"+k+"; extractor:"+s.id+"; parser:"+u.id+"; string:"+f.strings[k]+"; empty: "+f.empties[k]+"\n");c[k]=u;a[k]=s}p+=c.length?w:1}f.debug&&(d(v?v:"No parsers detected"),q("Completed detecting parsers",t)); f.parsers=c;f.extractors=a}function w(b){var a,c,f,e,l,x,k,n,m,p,u,s=b.config,t=s.$table.children("tbody"),v=s.extractors,w=s.parsers;s.cache={};s.totalRows=0;if(!w)return s.debug?d("Warning: *Empty table!* Not building a cache"):"";s.debug&&(n=new Date);s.showProcessing&&g.isProcessing(b,!0);for(l=0;l<t.length;l++)if(u=[],a=s.cache[l]={normalized:[]},!t.eq(l).hasClass(s.cssInfoBlock)){m=t[l]&&t[l].rows.length||0;for(f=0;f<m;++f)if(p={child:[]},x=h(t[l].rows[f]),k=[],x.hasClass(s.cssChildRow)&&0!== f)c=a.normalized.length-1,a.normalized[c][s.columns].$row=a.normalized[c][s.columns].$row.add(x),x.prev().hasClass(s.cssChildRow)||x.prev().addClass(g.css.cssHasChild),p.child[c]=h.trim(x[0].textContent||x[0].innerText||x.text()||"");else{p.$row=x;p.order=f;for(e=0;e<s.columns;++e)"undefined"===typeof w[e]?s.debug&&d("No parser found for cell:",x[0].cells[e],"does it have a header?"):(c=r(b,x[0].cells[e],e),c="undefined"===typeof v[e].id?c:v[e].format(c,b,x[0].cells[e],e),c="no-parser"===w[e].id? "":w[e].format(c,b,x[0].cells[e],e),k.push(s.ignoreCase&&"string"===typeof c?c.toLowerCase():c),"numeric"===(w[e].type||"").toLowerCase()&&(u[e]=Math.max(Math.abs(c)||0,u[e]||0)));k[s.columns]=p;a.normalized.push(k)}a.colMax=u;s.totalRows+=a.normalized.length}s.showProcessing&&g.isProcessing(b);s.debug&&q("Building cache for "+m+" rows",n)}function z(b,a){var c=b.config,f=c.widgetOptions,e=b.tBodies,l=[],d=c.cache,k,n,m,r,u,s;if(p(d))return c.appender?c.appender(b,l):b.isUpdating?c.$table.trigger("updateComplete", b):"";c.debug&&(s=new Date);for(u=0;u<e.length;u++)if(k=h(e[u]),k.length&&!k.hasClass(c.cssInfoBlock)){m=g.processTbody(b,k,!0);k=d[u].normalized;n=k.length;for(r=0;r<n;r++)l.push(k[r][c.columns].$row),c.appender&&(!c.pager||c.pager.removeRows&&f.pager_removeRows||c.pager.ajax)||m.append(k[r][c.columns].$row);g.processTbody(b,m,!1)}c.appender&&c.appender(b,l);c.debug&&q("Rebuilt table",s);a||c.appender||g.applyWidget(b);b.isUpdating&&c.$table.trigger("updateComplete",b)}function D(b){return/^d/i.test(b)|| 1===b}function E(b){var a,c,f,e,l,x,k,n=b.config;n.headerList=[];n.headerContent=[];n.debug&&(k=new Date);n.columns=g.computeColumnIndex(n.$table.children("thead, tfoot").children("tr"));e=n.cssIcon?'<i class="'+(n.cssIcon===g.css.icon?g.css.icon:n.cssIcon+" "+g.css.icon)+'"></i>':"";n.$headers=h(b).find(n.selectorHeaders).each(function(k){c=h(this);a=g.getColumnData(b,n.headers,k,!0);n.headerContent[k]=h(this).html();""!==n.headerTemplate&&(l=n.headerTemplate.replace(/\{content\}/g,h(this).html()).replace(/\{icon\}/g, e),n.onRenderTemplate&&(f=n.onRenderTemplate.apply(c,[k,l]))&&"string"===typeof f&&(l=f),h(this).html('<div class="'+g.css.headerIn+'">'+l+"</div>"));n.onRenderHeader&&n.onRenderHeader.apply(c,[k]);this.column=parseInt(h(this).attr("data-column"),10);this.order=D(g.getData(c,a,"sortInitialOrder")||n.sortInitialOrder)?[1,0,2]:[0,1,2];this.count=-1;this.lockedOrder=!1;x=g.getData(c,a,"lockedOrder")||!1;"undefined"!==typeof x&&!1!==x&&(this.order=this.lockedOrder=D(x)?[1,1,1]:[0,0,0]);c.addClass(g.css.header+ " "+n.cssHeader);n.headerList[k]=this;c.parent().addClass(g.css.headerRow+" "+n.cssHeaderRow).attr("role","row");n.tabIndex&&c.attr("tabindex",0)}).attr({scope:"col",role:"columnheader"});H(b);n.debug&&(q("Built headers:",k),d(n.$headers))}function C(b,a,c){var f=b.config;f.$table.find(f.selectorRemove).remove();v(b);w(b);I(f.$table,a,c)}function H(b){var a,c,f,e=b.config;e.$headers.each(function(l,d){c=h(d);f=g.getColumnData(b,e.headers,l,!0);a="false"===g.getData(d,f,"sorter")||"false"===g.getData(d, f,"parser");d.sortDisabled=a;c[a?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+a);b.id&&(a?c.removeAttr("aria-controls"):c.attr("aria-controls",b.id))})}function F(b){var a,c,f=b.config,e=f.sortList,l=e.length,d=g.css.sortNone+" "+f.cssNone,k=[g.css.sortAsc+" "+f.cssAsc,g.css.sortDesc+" "+f.cssDesc],n=["ascending","descending"],m=h(b).find("tfoot tr").children().add(f.$extraHeaders).removeClass(k.join(" "));f.$headers.removeClass(k.join(" ")).addClass(d).attr("aria-sort","none"); for(a=0;a<l;a++)if(2!==e[a][1]&&(b=f.$headers.not(".sorter-false").filter('[data-column="'+e[a][0]+'"]'+(1===l?":last":"")),b.length)){for(c=0;c<b.length;c++)b[c].sortDisabled||b.eq(c).removeClass(d).addClass(k[e[a][1]]).attr("aria-sort",n[e[a][1]]);m.length&&m.filter('[data-column="'+e[a][0]+'"]').removeClass(d).addClass(k[e[a][1]])}f.$headers.not(".sorter-false").each(function(){var b=h(this),a=this.order[(this.count+1)%(f.sortReset?3:2)],a=b.text()+": "+g.language[b.hasClass(g.css.sortAsc)?"sortAsc": b.hasClass(g.css.sortDesc)?"sortDesc":"sortNone"]+g.language[0===a?"nextAsc":1===a?"nextDesc":"nextNone"];b.attr("aria-label",a)})}function O(b){var a,c,f=b.config;f.widthFixed&&0===f.$table.find("colgroup").length&&(a=h("<colgroup>"),c=h(b).width(),h(b.tBodies).not("."+f.cssInfoBlock).find("tr:first").children(":visible").each(function(){a.append(h("<col>").css("width",parseInt(h(this).width()/c*1E3,10)/10+"%"))}),f.$table.prepend(a))}function P(b,a){var c,f,e,l,g,k=b.config,d=a||k.sortList;k.sortList= [];h.each(d,function(b,a){l=parseInt(a[0],10);if(e=k.$headers.filter('[data-column="'+l+'"]:last')[0]){f=(f=(""+a[1]).match(/^(1|d|s|o|n)/))?f[0]:"";switch(f){case "1":case "d":f=1;break;case "s":f=g||0;break;case "o":c=e.order[(g||0)%(k.sortReset?3:2)];f=0===c?1:1===c?0:2;break;case "n":e.count+=1;f=e.order[e.count%(k.sortReset?3:2)];break;default:f=0}g=0===b?f:g;c=[l,parseInt(f,10)||0];k.sortList.push(c);f=h.inArray(c[1],e.order);e.count=0<=f?f:c[1]%(k.sortReset?3:2)}})}function Q(b,a){return b&& b[a]?b[a].type||"":""}function L(b,a,c){if(b.isUpdating)return setTimeout(function(){L(b,a,c)},50);var f,e,l,d,k=b.config,n=!c[k.sortMultiSortKey],m=k.$table;m.trigger("sortStart",b);a.count=c[k.sortResetKey]?2:(a.count+1)%(k.sortReset?3:2);k.sortRestart&&(e=a,k.$headers.each(function(){this===e||!n&&h(this).is("."+g.css.sortDesc+",."+g.css.sortAsc)||(this.count=-1)}));e=a.column;if(n){k.sortList=[];if(null!==k.sortForce)for(f=k.sortForce,l=0;l<f.length;l++)f[l][0]!==e&&k.sortList.push(f[l]);f=a.order[a.count]; if(2>f&&(k.sortList.push([e,f]),1<a.colSpan))for(l=1;l<a.colSpan;l++)k.sortList.push([e+l,f])}else{if(k.sortAppend&&1<k.sortList.length)for(l=0;l<k.sortAppend.length;l++)d=g.isValueInArray(k.sortAppend[l][0],k.sortList),0<=d&&k.sortList.splice(d,1);if(0<=g.isValueInArray(e,k.sortList))for(l=0;l<k.sortList.length;l++)d=k.sortList[l],f=k.$headers.filter('[data-column="'+d[0]+'"]:last')[0],d[0]===e&&(d[1]=f.order[a.count],2===d[1]&&(k.sortList.splice(l,1),f.count=-1));else if(f=a.order[a.count],2>f&& (k.sortList.push([e,f]),1<a.colSpan))for(l=1;l<a.colSpan;l++)k.sortList.push([e+l,f])}if(null!==k.sortAppend)for(f=k.sortAppend,l=0;l<f.length;l++)f[l][0]!==e&&k.sortList.push(f[l]);m.trigger("sortBegin",b);setTimeout(function(){F(b);J(b);z(b);m.trigger("sortEnd",b)},1)}function J(b){var a,c,f,e,l,d,k,h,m,r,u,s=0,t=b.config,v=t.textSorter||"",w=t.sortList,y=w.length,z=b.tBodies.length;if(!t.serverSideSorting&&!p(t.cache)){t.debug&&(l=new Date);for(c=0;c<z;c++)d=t.cache[c].colMax,k=t.cache[c].normalized, k.sort(function(c,l){for(a=0;a<y;a++){e=w[a][0];h=w[a][1];s=0===h;if(t.sortStable&&c[e]===l[e]&&1===y)break;(f=/n/i.test(Q(t.parsers,e)))&&t.strings[e]?(f="boolean"===typeof t.string[t.strings[e]]?(s?1:-1)*(t.string[t.strings[e]]?-1:1):t.strings[e]?t.string[t.strings[e]]||0:0,m=t.numberSorter?t.numberSorter(c[e],l[e],s,d[e],b):g["sortNumeric"+(s?"Asc":"Desc")](c[e],l[e],f,d[e],e,b)):(r=s?c:l,u=s?l:c,m="function"===typeof v?v(r[e],u[e],s,e,b):"object"===typeof v&&v.hasOwnProperty(e)?v[e](r[e],u[e], s,e,b):g["sortNatural"+(s?"Asc":"Desc")](c[e],l[e],e,b,t));if(m)return m}return c[t.columns].order-l[t.columns].order});t.debug&&q("Sorting on "+w.toString()+" and dir "+h+" time",l)}}function M(b,a){var c=b[0];c.isUpdating&&b.trigger("updateComplete",c);h.isFunction(a)&&a(b[0])}function I(b,a,c){var f=b[0].config.sortList;!1!==a&&!b[0].isProcessing&&f.length?b.trigger("sorton",[f,function(){M(b,c)},!0]):(M(b,c),g.applyWidget(b[0],!1))}function N(b){var a=b.config,c=a.$table;c.unbind("sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(a.namespace+ " ")).bind("sortReset"+a.namespace,function(f,e){f.stopPropagation();a.sortList=[];F(b);J(b);z(b);h.isFunction(e)&&e(b)}).bind("updateAll"+a.namespace,function(f,e,c){f.stopPropagation();b.isUpdating=!0;g.refreshWidgets(b,!0,!0);g.restoreHeaders(b);E(b);g.bindEvents(b,a.$headers,!0);N(b);C(b,e,c)}).bind("update"+a.namespace+" updateRows"+a.namespace,function(a,e,c){a.stopPropagation();b.isUpdating=!0;H(b);C(b,e,c)}).bind("updateCell"+a.namespace,function(f,e,l,g){f.stopPropagation();b.isUpdating= !0;c.find(a.selectorRemove).remove();var d,n,m;n=c.find("tbody");m=h(e);f=n.index(h.fn.closest?m.closest("tbody"):m.parents("tbody").filter(":first"));d=h.fn.closest?m.closest("tr"):m.parents("tr").filter(":first");e=m[0];n.length&&0<=f&&(n=n.eq(f).find("tr").index(d),m=m.index(),a.cache[f].normalized[n][a.columns].$row=d,d="undefined"===typeof a.extractors[m].id?r(b,e,m):a.extractors[m].format(r(b,e,m),b,e,m),e="no-parser"===a.parsers[m].id?"":a.parsers[m].format(d,b,e,m),a.cache[f].normalized[n][m]= a.ignoreCase&&"string"===typeof e?e.toLowerCase():e,"numeric"===(a.parsers[m].type||"").toLowerCase()&&(a.cache[f].colMax[m]=Math.max(Math.abs(e)||0,a.cache[f].colMax[m]||0)),I(c,l,g))}).bind("addRows"+a.namespace,function(f,e,l,g){f.stopPropagation();b.isUpdating=!0;if(p(a.cache))H(b),C(b,l,g);else{e=h(e).attr("role","row");var d,n,m,q,u,s=e.filter("tr").length,t=c.find("tbody").index(e.parents("tbody").filter(":first"));a.parsers&&a.parsers.length||v(b);for(f=0;f<s;f++){n=e[f].cells.length;u=[]; q={child:[],$row:e.eq(f),order:a.cache[t].normalized.length};for(d=0;d<n;d++)m="undefined"===typeof a.extractors[d].id?r(b,e[f].cells[d],d):a.extractors[d].format(r(b,e[f].cells[d],d),b,e[f].cells[d],d),m="no-parser"===a.parsers[d].id?"":a.parsers[d].format(m,b,e[f].cells[d],d),u[d]=a.ignoreCase&&"string"===typeof m?m.toLowerCase():m,"numeric"===(a.parsers[d].type||"").toLowerCase()&&(a.cache[t].colMax[d]=Math.max(Math.abs(u[d])||0,a.cache[t].colMax[d]||0));u.push(q);a.cache[t].normalized.push(u)}I(c, l,g)}}).bind("updateComplete"+a.namespace,function(){b.isUpdating=!1}).bind("sorton"+a.namespace,function(a,e,d,x){var k=b.config;a.stopPropagation();c.trigger("sortStart",this);P(b,e);F(b);k.delayInit&&p(k.cache)&&w(b);c.trigger("sortBegin",this);J(b);z(b,x);c.trigger("sortEnd",this);g.applyWidget(b);h.isFunction(d)&&d(b)}).bind("appendCache"+a.namespace,function(a,e,c){a.stopPropagation();z(b,c);h.isFunction(e)&&e(b)}).bind("updateCache"+a.namespace,function(c,e){a.parsers&&a.parsers.length||v(b); w(b);h.isFunction(e)&&e(b)}).bind("applyWidgetId"+a.namespace,function(c,e){c.stopPropagation();g.getWidgetById(e).format(b,a,a.widgetOptions)}).bind("applyWidgets"+a.namespace,function(a,c){a.stopPropagation();g.applyWidget(b,c)}).bind("refreshWidgets"+a.namespace,function(a,c,d){a.stopPropagation();g.refreshWidgets(b,c,d)}).bind("destroy"+a.namespace,function(a,c,d){a.stopPropagation();g.destroy(b,c,d)}).bind("resetToLoadState"+a.namespace,function(){g.refreshWidgets(b,!0,!0);a=h.extend(!0,g.defaults, a.originalSettings);b.hasInitialized=!1;g.setup(b,a)})}var g=this;g.version="2.17.8";g.parsers=[];g.widgets=[];g.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc", sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssIcon:"tablesorter-icon",cssInfoBlock:"tablesorter-infoOnly",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me", debug:!1,headerList:[],empties:{},strings:{},parsers:[]};g.css={table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",info:"tablesorter-infoOnly",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"};g.language={sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ", sortNone:"No sort applied, ",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"};g.log=d;g.benchmark=q;g.construct=function(b){return this.each(function(){var a=h.extend(!0,{},g.defaults,b);a.originalSettings=b;!this.hasInitialized&&g.buildTable&&"TABLE"!==this.tagName?g.buildTable(this,a):g.setup(this,a)})};g.setup=function(b,a){if(!b||!b.tHead||0===b.tBodies.length||!0===b.hasInitialized)return a.debug?d("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized"): "";var c="",f=h(b),e=h.metadata;b.hasInitialized=!1;b.isProcessing=!0;b.config=a;h.data(b,"tablesorter",a);a.debug&&h.data(b,"startoveralltimer",new Date);a.supportsDataObject=function(a){a[0]=parseInt(a[0],10);return 1<a[0]||1===a[0]&&4<=parseInt(a[1],10)}(h.fn.jquery.split("."));a.string={max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1};a.emptyTo=a.emptyTo.toLowerCase();a.stringTo=a.stringTo.toLowerCase();/tablesorter\-/.test(f.attr("class"))||(c=""!==a.theme?" tablesorter-"+ a.theme:"");a.table=b;a.$table=f.addClass(g.css.table+" "+a.tableClass+c).attr("role","grid");a.$headers=f.find(a.selectorHeaders);a.namespace=a.namespace?"."+a.namespace.replace(/\W/g,""):".tablesorter"+Math.random().toString(16).slice(2);a.$table.children().children("tr").attr("role","row");a.$tbodies=f.children("tbody:not(."+a.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"});a.$table.find("caption").length&&a.$table.attr("aria-labelledby","theCaption");a.widgetInit={};a.textExtraction= a.$table.attr("data-text-extraction")||a.textExtraction||"basic";E(b);O(b);v(b);a.totalRows=0;a.delayInit||w(b);g.bindEvents(b,a.$headers,!0);N(b);a.supportsDataObject&&"undefined"!==typeof f.data().sortlist?a.sortList=f.data().sortlist:e&&f.metadata()&&f.metadata().sortlist&&(a.sortList=f.metadata().sortlist);g.applyWidget(b,!0);0<a.sortList.length?f.trigger("sorton",[a.sortList,{},!a.initWidgets,!0]):(F(b),a.initWidgets&&g.applyWidget(b,!1));a.showProcessing&&f.unbind("sortBegin"+a.namespace+" sortEnd"+ a.namespace).bind("sortBegin"+a.namespace+" sortEnd"+a.namespace,function(c){clearTimeout(a.processTimer);g.isProcessing(b);"sortBegin"===c.type&&(a.processTimer=setTimeout(function(){g.isProcessing(b,!0)},500))});b.hasInitialized=!0;b.isProcessing=!1;a.debug&&g.benchmark("Overall initialization time",h.data(b,"startoveralltimer"));f.trigger("tablesorter-initialized",b);"function"===typeof a.initialized&&a.initialized(b)};g.getColumnData=function(b,a,c,f){if("undefined"!==typeof a&&null!==a){b=h(b)[0]; var e,d=b.config;if(a[c])return f?a[c]:a[d.$headers.index(d.$headers.filter('[data-column="'+c+'"]:last'))];for(e in a)if("string"===typeof e&&(b=f?d.$headers.eq(c).filter(e):d.$headers.filter('[data-column="'+c+'"]:last').filter(e),b.length))return a[e]}};g.computeColumnIndex=function(b){var a=[],c=0,f,e,d,g,k,n,m,p,q,s;for(f=0;f<b.length;f++)for(k=b[f].cells,e=0;e<k.length;e++){d=k[e];g=h(d);n=d.parentNode.rowIndex;g.index();m=d.rowSpan||1;p=d.colSpan||1;"undefined"===typeof a[n]&&(a[n]=[]);for(d= 0;d<a[n].length+1;d++)if("undefined"===typeof a[n][d]){q=d;break}c=Math.max(q,c);g.attr({"data-column":q});for(d=n;d<n+m;d++)for("undefined"===typeof a[d]&&(a[d]=[]),s=a[d],g=q;g<q+p;g++)s[g]="x"}return c+1};g.isProcessing=function(b,a,c){b=h(b);var f=b[0].config,e=c||b.find("."+g.css.header);a?("undefined"!==typeof c&&0<f.sortList.length&&(e=e.filter(function(){return this.sortDisabled?!1:0<=g.isValueInArray(parseFloat(h(this).attr("data-column")),f.sortList)})),b.add(e).addClass(g.css.processing+ " "+f.cssProcessing)):b.add(e).removeClass(g.css.processing+" "+f.cssProcessing)};g.processTbody=function(b,a,c){b=h(b)[0];if(c)return b.isProcessing=!0,a.before('<span class="tablesorter-savemyplace"/>'),c=h.fn.detach?a.detach():a.remove();c=h(b).find("span.tablesorter-savemyplace");a.insertAfter(c);c.remove();b.isProcessing=!1};g.clearTableBody=function(b){h(b)[0].config.$tbodies.children().detach()};g.bindEvents=function(b,a,c){b=h(b)[0];var f,e=b.config;!0!==c&&(e.$extraHeaders=e.$extraHeaders? e.$extraHeaders.add(a):a);a.find(e.selectorSort).add(a.filter(e.selectorSort)).unbind(["mousedown","mouseup","sort","keyup",""].join(e.namespace+" ")).bind(["mousedown","mouseup","sort","keyup",""].join(e.namespace+" "),function(c,d){var g;g=c.type;if(!(1!==(c.which||c.button)&&!/sort|keyup/.test(g)||"keyup"===g&&13!==c.which||"mouseup"===g&&!0!==d&&250<(new Date).getTime()-f)){if("mousedown"===g)return f=(new Date).getTime(),/(input|select|button|textarea)/i.test(c.target.tagName)?"":!e.cancelSelection; e.delayInit&&p(e.cache)&&w(b);g=h.fn.closest?h(this).closest("th, td")[0]:/TH|TD/.test(this.tagName)?this:h(this).parents("th, td")[0];g=e.$headers[a.index(g)];g.sortDisabled||L(b,g,c)}});e.cancelSelection&&a.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})};g.restoreHeaders=function(b){var a=h(b)[0].config;a.$table.find(a.selectorHeaders).each(function(b){h(this).find("."+g.css.headerIn).length&&h(this).html(a.headerContent[b])})};g.destroy=function(b, a,c){b=h(b)[0];if(b.hasInitialized){g.refreshWidgets(b,!0,!0);var f=h(b),e=b.config,d=f.find("thead:first"),q=d.find("tr."+g.css.headerRow).removeClass(g.css.headerRow+" "+e.cssHeaderRow),k=f.find("tfoot:first > tr").children("th, td");!1===a&&0<=h.inArray("uitheme",e.widgets)&&(f.trigger("applyWidgetId",["uitheme"]),f.trigger("applyWidgetId",["zebra"]));d.find("tr").not(q).remove();f.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState ".split(" ").join(e.namespace+ " "));e.$headers.add(k).removeClass([g.css.header,e.cssHeader,e.cssAsc,e.cssDesc,g.css.sortAsc,g.css.sortDesc,g.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true");q.find(e.selectorSort).unbind(["mousedown","mouseup","keypress",""].join(e.namespace+" "));g.restoreHeaders(b);f.toggleClass(g.css.table+" "+e.tableClass+" tablesorter-"+e.theme,!1===a);b.hasInitialized=!1;delete b.config.cache;"function"===typeof c&&c(b)}};g.regex={chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i};g.sortNatural=function(b,a){if(b===a)return 0;var c,f,e,d,h,k;f=g.regex;if(f.hex.test(a)){c=parseInt(b.match(f.hex),16);e=parseInt(a.match(f.hex),16);if(c<e)return-1;if(c>e)return 1}c=b.replace(f.chunk,"\\0$1\\0").replace(f.chunks,"").split("\\0");f=a.replace(f.chunk,"\\0$1\\0").replace(f.chunks,"").split("\\0");k=Math.max(c.length,f.length);for(h=0;h<k;h++){e=isNaN(c[h])?c[h]||0:parseFloat(c[h])||0;d=isNaN(f[h])?f[h]||0:parseFloat(f[h])||0;if(isNaN(e)!== isNaN(d))return isNaN(e)?1:-1;typeof e!==typeof d&&(e+="",d+="");if(e<d)return-1;if(e>d)return 1}return 0};g.sortNaturalAsc=function(b,a,c,f,e){if(b===a)return 0;c=e.string[e.empties[c]||e.emptyTo];return""===b&&0!==c?"boolean"===typeof c?c?-1:1:-c||-1:""===a&&0!==c?"boolean"===typeof c?c?1:-1:c||1:g.sortNatural(b,a)};g.sortNaturalDesc=function(b,a,c,f,e){if(b===a)return 0;c=e.string[e.empties[c]||e.emptyTo];return""===b&&0!==c?"boolean"===typeof c?c?-1:1:c||1:""===a&&0!==c?"boolean"===typeof c?c? 1:-1:-c||-1:g.sortNatural(a,b)};g.sortText=function(b,a){return b>a?1:b<a?-1:0};g.getTextValue=function(b,a,c){if(c){var f=b?b.length:0,e=c+a;for(c=0;c<f;c++)e+=b.charCodeAt(c);return a*e}return 0};g.sortNumericAsc=function(b,a,c,f,e,d){if(b===a)return 0;d=d.config;e=d.string[d.empties[e]||d.emptyTo];if(""===b&&0!==e)return"boolean"===typeof e?e?-1:1:-e||-1;if(""===a&&0!==e)return"boolean"===typeof e?e?1:-1:e||1;isNaN(b)&&(b=g.getTextValue(b,c,f));isNaN(a)&&(a=g.getTextValue(a,c,f));return b-a};g.sortNumericDesc= function(b,a,c,f,e,d){if(b===a)return 0;d=d.config;e=d.string[d.empties[e]||d.emptyTo];if(""===b&&0!==e)return"boolean"===typeof e?e?-1:1:e||1;if(""===a&&0!==e)return"boolean"===typeof e?e?1:-1:-e||-1;isNaN(b)&&(b=g.getTextValue(b,c,f));isNaN(a)&&(a=g.getTextValue(a,c,f));return a-b};g.sortNumeric=function(b,a){return b-a};g.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119", E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6",O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};g.replaceAccents=function(b){var a,c="[",d=g.characterEquivalents;if(!g.characterRegex){g.characterRegexArray={};for(a in d)"string"===typeof a&&(c+=d[a],g.characterRegexArray[a]=new RegExp("["+d[a]+"]","g"));g.characterRegex= new RegExp(c+"]")}if(g.characterRegex.test(b))for(a in d)"string"===typeof a&&(b=b.replace(g.characterRegexArray[a],a));return b};g.isValueInArray=function(b,a){var c,d=a.length;for(c=0;c<d;c++)if(a[c][0]===b)return c;return-1};g.addParser=function(b){var a,c=g.parsers.length,d=!0;for(a=0;a<c;a++)g.parsers[a].id.toLowerCase()===b.id.toLowerCase()&&(d=!1);d&&g.parsers.push(b)};g.getParserById=function(b){if("false"==b)return!1;var a,c=g.parsers.length;for(a=0;a<c;a++)if(g.parsers[a].id.toLowerCase()=== b.toString().toLowerCase())return g.parsers[a];return!1};g.addWidget=function(b){g.widgets.push(b)};g.hasWidget=function(b,a){b=h(b);return b.length&&b[0].config&&b[0].config.widgetInit[a]||!1};g.getWidgetById=function(b){var a,c,d=g.widgets.length;for(a=0;a<d;a++)if((c=g.widgets[a])&&c.hasOwnProperty("id")&&c.id.toLowerCase()===b.toLowerCase())return c};g.applyWidget=function(b,a){b=h(b)[0];var c=b.config,d=c.widgetOptions,e=[],l,p,k;!1!==a&&b.hasInitialized&&(b.isApplyingWidgets||b.isUpdating)|| (c.debug&&(l=new Date),c.widgets.length&&(b.isApplyingWidgets=!0,c.widgets=h.grep(c.widgets,function(a,b){return h.inArray(a,c.widgets)===b}),h.each(c.widgets||[],function(a,b){(k=g.getWidgetById(b))&&k.id&&(k.priority||(k.priority=10),e[a]=k)}),e.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority?0:1}),h.each(e,function(e,g){if(g){if(a||!c.widgetInit[g.id])c.widgetInit[g.id]=!0,g.hasOwnProperty("options")&&(d=b.config.widgetOptions=h.extend(!0,{},g.options,d)),g.hasOwnProperty("init")&& g.init(b,g,c,d);!a&&g.hasOwnProperty("format")&&g.format(b,c,d,!1)}})),setTimeout(function(){b.isApplyingWidgets=!1},0),c.debug&&(p=c.widgets.length,q("Completed "+(!0===a?"initializing ":"applying ")+p+" widget"+(1!==p?"s":""),l)))};g.refreshWidgets=function(b,a,c){b=h(b)[0];var f,e=b.config,l=e.widgets,q=g.widgets,k=q.length;for(f=0;f<k;f++)q[f]&&q[f].id&&(a||0>h.inArray(q[f].id,l))&&(e.debug&&d('Refeshing widgets: Removing "'+q[f].id+'"'),q[f].hasOwnProperty("remove")&&e.widgetInit[q[f].id]&&(q[f].remove(b, e,e.widgetOptions),e.widgetInit[q[f].id]=!1));!0!==c&&g.applyWidget(b,a)};g.getData=function(b,a,c){var d="";b=h(b);var e,g;if(!b.length)return"";e=h.metadata?b.metadata():!1;g=" "+(b.attr("class")||"");"undefined"!==typeof b.data(c)||"undefined"!==typeof b.data(c.toLowerCase())?d+=b.data(c)||b.data(c.toLowerCase()):e&&"undefined"!==typeof e[c]?d+=e[c]:a&&"undefined"!==typeof a[c]?d+=a[c]:" "!==g&&g.match(" "+c+"-")&&(d=g.match(new RegExp("\\s"+c+"-([\\w-]+)"))[1]||"");return h.trim(d)};g.formatFloat= function(b,a){if("string"!==typeof b||""===b)return b;var c;b=(a&&a.config?!1!==a.config.usNumberFormat:"undefined"!==typeof a?a:1)?b.replace(/,/g,""):b.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(b)&&(b=b.replace(/^\s*\(([.\d]+)\)/,"-$1"));c=parseFloat(b);return isNaN(c)?h.trim(b):c};g.isDigit=function(b){return isNaN(b)?/^[\-+(]?\d+[)]?$/.test(b.toString().replace(/[,.'"\s]/g,"")):!0}}});var r=h.tablesorter;h.fn.extend({tablesorter:r.construct});r.addParser({id:"no-parser",is:function(){return!1}, format:function(){return""},type:"text"});r.addParser({id:"text",is:function(){return!0},format:function(d,q){var p=q.config;d&&(d=h.trim(p.ignoreCase?d.toLocaleLowerCase():d),d=p.sortLocaleCompare?r.replaceAccents(d):d);return d},type:"text"});r.addParser({id:"digit",is:function(d){return r.isDigit(d)},format:function(d,q){var p=r.formatFloat((d||"").replace(/[^\w,. \-()]/g,""),q);return d&&"number"===typeof p?p:d?h.trim(d&&q.config.ignoreCase?d.toLocaleLowerCase():d):d},type:"numeric"});r.addParser({id:"currency", is:function(d){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((d||"").replace(/[+\-,. ]/g,""))},format:function(d,q){var p=r.formatFloat((d||"").replace(/[^\w,. \-()]/g,""),q);return d&&"number"===typeof p?p:d?h.trim(d&&q.config.ignoreCase?d.toLocaleLowerCase():d):d},type:"numeric"});r.addParser({id:"ipAddress",is:function(d){return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(d)},format:function(d,h){var p,y=d?d.split("."):"",v="",w=y.length; for(p=0;p<w;p++)v+=("00"+y[p]).slice(-3);return d?r.formatFloat(v,h):d},type:"numeric"});r.addParser({id:"url",is:function(d){return/^(https?|ftp|file):\/\//.test(d)},format:function(d){return d?h.trim(d.replace(/(https?|ftp|file):\/\//,"")):d},parsed:!0,type:"text"});r.addParser({id:"isoDate",is:function(d){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(d)},format:function(d,h){return d?r.formatFloat(""!==d?(new Date(d.replace(/-/g,"/"))).getTime()||d:"",h):d},type:"numeric"});r.addParser({id:"percent", is:function(d){return/(\d\s*?%|%\s*?\d)/.test(d)&&15>d.length},format:function(d,h){return d?r.formatFloat(d.replace(/%/g,""),h):d},type:"numeric"});r.addParser({id:"usLongDate",is:function(d){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(d)||/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(d)},format:function(d,h){return d?r.formatFloat((new Date(d.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||d,h):d},type:"numeric"});r.addParser({id:"shortDate",is:function(d){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((d|| "").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(d,h,p,y){if(d){p=h.config;var v=p.$headers.filter("[data-column="+y+"]:last");y=v.length&&v[0].dateFormat||r.getData(v,r.getColumnData(h,p.headers,y),"dateFormat")||p.dateFormat;d=d.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===y?d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===y?d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===y&&(d=d.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3"))}return d?r.formatFloat((new Date(d)).getTime()||d,h):d},type:"numeric"});r.addParser({id:"time",is:function(d){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(d)},format:function(d,h){return d?r.formatFloat((new Date("2000/01/01 "+d.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||d,h):d},type:"numeric"});r.addParser({id:"metadata",is:function(){return!1},format:function(d,q,p){d=q.config;d=d.parserMetadataName?d.parserMetadataName:"sortValue";return h(p).metadata()[d]}, type:"numeric"});r.addWidget({id:"zebra",priority:90,format:function(d,q,p){var y,v,w,z,D,E=new RegExp(q.cssChildRow,"i"),C=q.$tbodies;q.debug&&(D=new Date);for(d=0;d<C.length;d++)w=0,y=C.eq(d),y=y.children("tr:visible").not(q.selectorRemove),y.each(function(){v=h(this);E.test(this.className)||w++;z=0===w%2;v.removeClass(p.zebra[z?1:0]).addClass(p.zebra[z?0:1])});q.debug&&r.benchmark("Applying Zebra widget",D)},remove:function(d,q,p){var r;q=q.$tbodies;var v=(p.zebra||["even","odd"]).join(" ");for(p= 0;p<q.length;p++)r=h.tablesorter.processTbody(d,q.eq(p),!0),r.children().removeClass(v),h.tablesorter.processTbody(d,r,!1)}})}(jQuery);


var SCM = SCM || {};

SCM.Common = (function () {

    return { 
        getQueryStringValue: getQueryStringValue,
        isDefined: isDefined
    }

    //Retrieves the values of a key from dataUrl
    function getQueryStringValue(dataUrl, key) {
        var keyValue;
        var startText = key + "=";
        var endText = "&";
        var qPos = dataUrl.indexOf(startText);

        if (qPos === -1) {
            //key doesn't exist.
            return null;
        }
        else {
            qPos = qPos + startText.length;
        }

        if (dataUrl.indexOf("&", qPos) >= 0) {
            var ampPos = dataUrl.indexOf(endText, qPos);
            keyValue = dataUrl.substring(qPos, ampPos);
        }
        else {
            //data-url will be just like q=obesity
            keyValue = dataUrl.substring(qPos);
        }

        return keyValue;
    }
    function isDefined(element) {
        return typeof element !== "undefined" && element !== undefined && element != null;
    }
})();

// ---------------------------------------
// Query Builder JS
// NOTE: two references to SCM.QueryBuilder.configure() will need to placed in client.solrsearch.js (or equivalent file)
// 1) in SolrSearch.ajaxComplete
// 2) in SolrSearch.init
// ----------------------------------------

SCM = SCM || {};


SCM.QueryBuilder = {};

SCM.QueryBuilder.defaults = {
    runSearch: function (queryString) {
        window.location.hash = '#' + queryString;
    },
    beforeSearch: function () { }
};

SCM.QueryBuilder.configure = function () {
    var $queryFilter = $('.querybuilder-filter'),
        $queryFilterCurrentWrap = $('.querybuilder-filter-current-wrap'),
        $queryFilterDropdown = $('.querybuilder-filter-dropdown'),
        $queryInputStandard = $('.querybuilder-input-standard'),
        $queryInputCitation = $('.querybuilder-input-citation'),
        $queryInstance = $('.querybuilder-instance'),
        $queryAdd = $('.querybuilder-add');


    // if Citation filter was selected, show the appropriate fields
    var testForCitationFields = function (thisElement) {
        var $thisFilter = thisElement,
            $thisInstance = $thisFilter.closest('.querybuilder-instance');

        if ($thisFilter.hasClass('filter-citation')) {
            $thisInstance.find($queryInputStandard).addClass('hide');
            $thisInstance.find($queryInputCitation).removeClass('hide');
        } else {
            $thisInstance.find($queryInputCitation).addClass('hide');
            $thisInstance.find($queryInputStandard).removeClass('hide');
        }
    };


    // called when query input is altered or a plus button is clicked
    var testQueryInput = function (thisElement) {

        var $thisInstance = thisElement;

        // is this a citation input or a querybuilder input?
        if ($thisInstance.hasClass('citation-input')) {
            // Citation Filter
            var $citeYear = $thisInstance.val().replace(/\'/g, "").trim().length,
                $citeVol = $thisInstance.val().replace(/\'/g, "").trim().length,
                $citeIssue = $thisInstance.val().replace(/\'/g, "").trim().length,
                $citePage = $thisInstance.val().replace(/\'/g, "").trim().length;

            if ($citeYear > 0 || $citeVol > 0 || $citeIssue > 0 || $citePage > 0) {
                return true;
            } else if ($citeYear === 0 && $citeVol === 0 && $citeIssue === 0 && $citePage === 0) {
                return false;
            }

        } else {
            // Normal Filter
            var $inputSize = $thisInstance.val().replace(/\'/g, "").trim().length;

            if ($inputSize === 0) {
                return false;
            } else if ($inputSize > 0) {
                return true;
            }
        }
    };


    // (de-)activate Add Term button if it passes testQueryInput()
    var enableDisableAddButton = function (testThisInstance) {
        testQueryInput(testThisInstance) ? $queryAdd.addClass('valid').removeAttr('disabled') : $queryAdd.removeClass('valid').attr('disabled');
    };


    // page load actions placed in anonymous function
    (function ($) {

        // count the number of instances on page load
        var $visibleInstances = 0;
        $('.querybuilder-instance').each(function () {
            if (!$(this).hasClass('hide')) {
                $visibleInstances++;
            }
        });

        // get selected filters for each visible instance when page loads
        $queryFilter.each(function () {
            var $this = $(this);
            if ($this.hasClass('selected')) {
                $this.closest($queryFilterCurrentWrap).find('.querybuilder-filter-label').text($this.text());
                testForCitationFields($this);
            }
        });

    })(jQuery);


    // show filter dropdown
    $queryFilterCurrentWrap.off('click').on('click', function (e) {
        showHideQueryFilterDropdown($(this), e);
    });

    $queryFilterCurrentWrap.off('keydown').keydown(function (e) {
        var key = e.which;
        if (key == 13) {
            showHideQueryFilterDropdown($(this), e);
        }
    });

    function showHideQueryFilterDropdown(obj, e) {
        $('.sort-order-list').addClass('hide'); // hide other dropdown on page (assume it's open)
        
        e.stopPropagation();
        
        var $thisChild = obj.find($queryFilterDropdown);
        
        // auto hide filter dropdowns OTHER than this one
        $queryFilterDropdown.not($thisChild).addClass('hide');

        $thisChild.hasClass('hide') ? $thisChild.removeClass('hide') : $thisChild.addClass('hide');
    }

    $(document).on('click', function () {
        $queryFilterDropdown.addClass('hide');
    });

    // reveal Citation input when selected from filter list
    $queryFilter.on('click', function () {
        selectQueryFilter($(this));
    });

    $queryFilter.keydown(function (e) {
        var key = e.which;
        if (key == 13) {
            selectQueryFilter($(this));
        }
    });

    function selectQueryFilter(filter) {
        var $thisFilterList = filter.closest('.querybuilder-filter-dropdown');
        $thisLabel = filter.closest($queryFilterCurrentWrap).find('.querybuilder-filter-label');


        $thisFilterList.children(filter).removeClass('selected'); // remove '.selected' from all filters before ...
        filter.addClass('selected'); // assigning it to this filter

        $thisLabel.text(filter.text()); // set current filter label to selected
        testForCitationFields(filter);

        var filterId = filter.parents('.querybuilder-instance').attr('id');
        // Clear any errors if the filter changes
        $('#search-errors li').each(function () {
            var $this = $(this);
            if ($this.attr('from') === filterId) {
                $this.remove();
            }
        });

        var curOptionIsCitation = filter.hasClass('filter-citation');
        if (curOptionIsCitation) {
            var curCitationInstanceId = filter.closest('.querybuilder-instance').attr('id');
            //hide Citation in rest of the instances
            showCitationOptionForOtherInstances(curCitationInstanceId, false);
        } else {
            checkForCitation();
        }
    }


    // when user changes value of an input
    $('.querybuilder-input, .citation-input').on("keyup", function () {
        $("#queryBuilderSubmit").addClass('btn-green').removeAttr('style'); // something changed, notify user that they need to update
        //testQueryInput($(this)) ? $queryAdd.addClass('valid').removeAttr('disabled') : $queryAdd.removeClass('valid').attr('disabled');
        enableDisableAddButton($(this));
    });

    
    // reveal new instance of Query Builder when plus is clicked
    $queryAdd.on('click', function () {
        
        // is the Add Term button currently disabled? Show a message
        if ($(this).attr("disabled")) {
            alert('A value must be entered before adding another filter.'); // this will eventually be a modal
        } else {
            // show next instance of QueryBuilder
            var $currentInstanceNum = 0,
                $nextInstanceNum = 1;

            // find last active QB instance (one without a class of 'hide')
            $queryInstance.each(function () {
                if (!$(this).hasClass('hide')) {
                    $currentInstanceNum++;
                    $nextInstanceNum++;
                }
            });

            var $nextInstanceID = $("#qbInstance" + $nextInstanceNum);

            // show next QB instance & disable button
            $nextInstanceID.removeClass('hide');
            $queryAdd.removeClass('valid').attr('disabled', "");
        }

    });


    $('.querybuilder-submit').on('click', function () {
        $(this).removeClass('btn-green').attr('style', 'opacity: 0.3;');
    });

    $('.querybuilder-wrap').on('keyup', 'input.citation-input.citation-year', function (e) {
        var $yearField = $(e.target);
        var max = 4;
        if ($yearField.val().length > max) {
            $yearField.val($yearField.val().substr(0, max));
        }
    });

    //*Restrict Citation to only one*
    //returns the queryBuilder instanceId of the instance if citation is selected
    //returns null if no instance has Citation
    function isCitationyOptionAlreadySpecified() {
        var citeInstanceId = null;
        $queryInstance.each(function () {
            if (!$(this).hasClass('hide')) {
                var citeVisible = !$(this).find($queryInputCitation).hasClass('hide');
                if (citeVisible) {
                    citeInstanceId = $(this).attr('id');
                    return false;
                }
            }
        });
        return citeInstanceId;
    }


    //---
    //Shows or hides the citation option in the dropdow of all instances except for the one that is passed in.
    //if curCiteInstanceId is null, shows/hides citation in all instances
    //---
    function showCitationOptionForOtherInstances(curCiteInstanceId, show) {
        $queryInstance.each(function () {
            var instanceId = $queryInstance.attr('id');
            var $citeOption = $(this).find("li[data-fieldname='Citation']");

            //curCiteInstanceId=null means no instance currently has Citation.
            if (instanceId !== curCiteInstanceId || curCiteInstanceId === null) {
                show ? $citeOption.show() : $citeOption.hide();
            }
        });
    }


    //---
    //Checks if Citation is selected
    //---
    function checkForCitation() {
        var citeInstanceId = isCitationyOptionAlreadySpecified();
        if (citeInstanceId !== null) {
            //citation Option selected
            showCitationOptionForOtherInstances(citeInstanceId, false);
        } else {
            //citation Option not selected
            showCitationOptionForOtherInstances(citeInstanceId, true);
        }
    }
    
    $('.js-main, .js-querybuilder-wrap').off('click').on('click', '.querybuilder-submit', function () {
        
        var queryString = "";
        var currentSearchTerm = $('#hfCurrentSearchTerm').val();    //Existing Search Term
        var currentDataUrl = $(".querybuilder-submit").attr('data-current-url');
        var qbObject = new Object();
        var instanceIndex = 1;
        var qbObjectInitialized = false;
        var searchErrors = $('#search-errors');
        
        //Updates the DataUrl for the All option
        function updateDataUrlForAllOption(searchTerm, currentDataUrl) {
            var newQueryTerm = "";
            var updatedUrl = "";
            
            if (currentDataUrl.indexOf("q=") >= 0) {
                var queryTerm = SCM.Common.getQueryStringValue(currentDataUrl, "q");
                if (!queryTerm.startsWith("(")) {
                    //prepend open parenthesis
                    newQueryTerm = "(";
                }
                if (queryTerm.endsWith(")")) {
                    //existing queryTerm ends with ")" - remove it and then append " AND {qt})
                    newQueryTerm = newQueryTerm + queryTerm.slice(0, -1) + " AND " + searchTerm + ")";
                } else {
                    newQueryTerm = newQueryTerm + queryTerm + " AND " + searchTerm + ")";
                }
                updatedUrl = currentDataUrl.replace(queryTerm, newQueryTerm);
            }
            else {
                //"q" parm does not exist in currentDataUrl
                updatedUrl = "q=" + searchTerm + "&" + currentDataUrl;
            }
            return updatedUrl;
        }

        function isNullOrEmpty(val) {
            return val === null || val === "" || val === undefined;
        }

        function clearErrors() {
            searchErrors.empty();
        }

        function displayErrors(validationErrors) {
            function validationMessage(error) {
                var $elem = $('<li>');
                $elem.text(error.message);
                $elem.attr('from', error.origin);
                return $elem;
            }

            var $ul = $('<ul>');
            searchErrors.append($ul);

            $.each(validationErrors, function (i, val) {
                $ul.append(validationMessage(val));
            });
        }

        var validationErrors = [];

        clearErrors();
        //loop through all instances
        $('.querybuilder-wrap .querybuilder-instance').each(function (i) {
            var $this = $(this);
            //process only the instances which are visible
            var instanceVisible = !$this.hasClass('hide');
            if (instanceVisible) {
                //get the text and value for the dropdown item
                var qbSearchTypeDisplayName = $this.find('.querybuilder-filter-dropdown li.selected').text();
                var qbSearchTypeFieldName = $this.find('.querybuilder-filter-dropdown li.selected').attr('data-fieldname');
                
                //The 1st instance defaults to SearchTerm ("q") w/o any filter with the user having the abiliity to change it to a filter. 
                var filterSpecifiedForSearchTerm = false;
                if (instanceIndex === 1) {
                    var searchTerm = $this.find('#instance_QueryBuilderSearchTerm').val().trim();

                    //check if user converted SearchTerm to a filter.
                    if (typeof (qbSearchTypeFieldName) !== "undefined" && qbSearchTypeFieldName !== null && $.trim(qbSearchTypeFieldName) !== "" && searchTerm !== "") {
                        //remove q parameter because searchTerm needs to be executed against a particular field
                        var qTerm = SCM.Common.getQueryStringValue(currentDataUrl, "q");
                        if (qTerm !== null && qTerm !== "") {
                            qTerm = "q=" + qTerm + "&";
                            currentDataUrl = currentDataUrl.replace(qTerm, "");
                        }
                        else {
                            qbObject = new Object();
                        }

                        filterSpecifiedForSearchTerm = true;
                    }
                    else {
                        //user didn't change the searchTerm to Filter - Execute this as "q"
                        if (currentSearchTerm !== searchTerm) {
                            // This check is for the q= parameter. Weird stuff happens when this parameter is missing (blank search).
                            var startIndex = currentDataUrl.indexOf("q=");
                            if (startIndex >= 0 && currentDataUrl.indexOf("&", startIndex) >= 0) {
                                var currentQuery = SCM.Common.getQueryStringValue(currentDataUrl, "q");
                                if (currentQuery !== null && currentQuery !== "") {
                                    currentQuery = "q=" + currentQuery + "&";
                                    currentDataUrl = currentDataUrl.replace(currentQuery, "q=" + searchTerm + "&");
                                }
                                else {
                                    currentDataUrl = "q=" + searchTerm + "&" + currentDataUrl;
                                }
                            } else {
                                currentDataUrl = "q=" + searchTerm + "&" + currentDataUrl;
                            }
                        }

                        //to identify this particular condition, setting this as "q" so Model can process it appropriately.
                        qbObject.q = searchTerm;
                        qbObjectInitialized = true;

                        if (searchTerm === '') {
                            currentDataUrl = currentDataUrl.replace("q=&", "");
                            return true;
                        }

                        //skip this iteration and process the next item.
                        instanceIndex++;
                        return true;
                    }
                }
                
                //find the search term (#QueryBuilderSearchTerm - parent Div: querybuilder-input-standard) 
                var qbSearchTerm = "";

                switch (qbSearchTypeDisplayName) {
                    case "":
                        //User specified a value for searchTerm but didn't select an option from dropdown.
                        //Same as All (searchTerm will be executed as Q)
                        var keyOptionOrdinal = "q" + instanceIndex;
                        qbSearchTerm = $this.find('#instance_QueryBuilderSearchTerm').val().trim();
                        if (qbSearchTerm !== "")
                        {
                            qbSearchTerm = qbSearchTerm.replace(/^"(.*)"$/, '$1');
                            currentDataUrl = updateDataUrlForAllOption(qbSearchTerm, currentDataUrl);
                            qbObject[keyOptionOrdinal] = qbSearchTerm;
                            qbObjectInitialized = true;
                        }                        
                        break;
                    case "All":
                        qbSearchTerm = $this.find('#instance_QueryBuilderSearchTerm').val().trim();

                        if (qbSearchTerm !== "") {
                            currentDataUrl = updateDataUrlForAllOption(qbSearchTerm, currentDataUrl);

                            //Since there could me multiple "All"s, tagging ordinal to make them unique.
                            var keyName = "All" + instanceIndex;
                            if ((instanceIndex === 1 && filterSpecifiedForSearchTerm) || instanceIndex !== 1) {
                                qbObject[keyName] = qbSearchTerm;
                                qbObjectInitialized = true;
                            }
                        }
                        break;
                    case "Citation":
                        var citationObj = {};

                        //Since there could me multiple "Citation"s, tagging ordinal to make them unique.
                        var keyCitationName = "Citation" + instanceIndex;

                        var citationFields = [
                            {
                                id: "#instance_CitationYear",
                                field: "Year",
                                pattern: /^(?!0(0?){3})\d(\d?){3}$/,
                                message: "The 'Year' field only accepts numbers."
                            },
                            {
                                id: "#instance_CitationVolume",
                                field: "Volume"
                            },
                            {
                                id: "#instance_CitationIssueNo",
                                field: "IssueNo"
                            },
                            {
                                id: "#instance_CitationPage",
                                field: "StartPage"
                            }
                        ];

                        $.each(citationFields, function (_, val) {
                            var $field = $this.find(val.id);
                            var value = $field.val().trim();

                            if (!isNullOrEmpty(value)) {
                                if (!qbObject[keyCitationName]) {
                                    qbObject[keyCitationName] = citationObj;
                                    qbObjectInitialized = true;
                                }

                                if (val.pattern && !val.pattern.test(value)) {
                                    $field.val("");

                                    if ($.inArray(val.message, validationErrors) === -1) {
                                        validationErrors.push({ message: val.message, origin: 'qbInstance' + instanceIndex });
                                    }
                                } else {
                                    citationObj[val.field] = value;
                                }
                            }
                        });
                        break;
                    default:
                        var keyDefName = qbSearchTypeFieldName + instanceIndex;
                        qbSearchTerm = $this.find('#instance_QueryBuilderSearchTerm').val().trim();
                        if (qbSearchTerm !== "")
                        {
                            qbSearchTerm = qbSearchTerm.replace(/^"(.*)"$/, '$1');
                            //qbObject[qbSearchTypeFieldName] = qbSearchTerm;
                            qbObject[keyDefName] = qbSearchTerm; // NARN-11912: remove encoding because we do it below.
                            qbObjectInitialized = true;
                        }
                        break;
                }

            }
            instanceIndex++;
        });

        if (validationErrors.length > 0) {
            displayErrors(validationErrors);
            $("#queryBuilderSubmit").addClass('btn-green').removeAttr('style');
            return;
        }

        //remove pagination if exists
        var page = SCM.Common.getQueryStringValue(currentDataUrl, "page");

        if (currentDataUrl == "page=1") {
            currentDataUrl = "&page=1";
        }
        if (page !== null && page !== "") {
            currentDataUrl = currentDataUrl.replace("page=" + page + "&", "page=1&");
        }
        
        queryString = currentDataUrl;

        if (qbObjectInitialized) {
            var qbObjectParms = JSON.stringify(qbObject);
            var oldQb = SCM.Common.getQueryStringValue(currentDataUrl, "qb");
            if (oldQb) {
                queryString = queryString.replace(oldQb, qbObjectParms);
            }
            else {
                queryString = queryString + "&qb=" + qbObjectParms;
            }
        }

        SCM.QueryBuilder.defaults.beforeSearch();
        SCM.QueryBuilder.defaults.runSearch(encodeURI(queryString));  // NARN-11710 encode URI
    });

    //KeyUp event for Query Builder input button
    $('.querybuilder-input').keyup(function (e) {
        var key = e.which; // recommended to use e.which, it's normalized across browsers
        if (key == 13) e.preventDefault();
        var inputVal = $.trim($(this).val());
        if (key === 13 && inputVal !== "") // the enter key code
        {
            $('.querybuilder-submit').click();
            return false;
        }
    });
};

//NARN-3759 - .startsWith is not supported by IE - Polyfill - BENC - 9/15/2016
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

//NARN-3759 - .endsWith is not supported by IE - Polyfill - BENC - 9/15/2016
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
var SCM = SCM || {};
SCM.JournalCitationFilter = (function ($, undefined) {

    var journalParam = 'f_JournalDisplayName',
        yearParam = 'rg_IssuePublicationDate',
        volumeParam = 'f_Volume',
        issueNoParam = 'f_IssueNo',
        startPageParam = 'f_StartPage';

    var journalQueryStringValue = null,
        yearQueryStringValue = null,
        volumeQueryStringValue = null,
        issueNoQueryStringValue = null,
        startPageQueryStringValue = null;

    var journal = null,
        year = null,
        volume = null,
        issueNo = null,
        startPage = null,

        yearPattern = null,
        volumePattern = null,
        issuePattern = null,
        startPagePattern = null,

        toggleButton = null,
        widgetWrap = null;

    var placeholderTextJournal = null,
        placeholderTextYear = null,
        placeholderTextVolume = null,
        placeholderTextIssueNo = null,
        placeholderTextStartPage = null,
        validationMessageJournal = null,
        validationMessageYear = null,
        validationMessageVolume = null,
        validationMessageIssueNo = null,
        validationMessageStartPage = null;

    function _init() {
        if (!_journalCitationFilterLoaded()) {
            return;
        }
        _initializeQueryStringValues();
        _initializeElements();
        _initializeHiddenFields();
        if (_fillInFieldsBasedOnQueryStringValues() === true) {
            _openWidget();
        }
    }

    function _journalCitationFilterLoaded() {
        var loadedFlag = document.getElementById('hfJournalCitationFilterLoaded');
        return !!(loadedFlag && loadedFlag.value);
    }

    function _initializeQueryStringValues() {
        journalQueryStringValue = getQueryStringValue(location.search, journalParam),
        yearQueryStringValue = getQueryStringValue(location.search, yearParam),
        volumeQueryStringValue = getQueryStringValue(location.search, volumeParam),
        issueNoQueryStringValue = getQueryStringValue(location.search, issueNoParam),
        startPageQueryStringValue = getQueryStringValue(location.search, startPageParam);
    }

    function _initializeElements() {
        journal = document.getElementById('SelectedJournal');
        year = document.getElementById('Citation_IssuePublicationDate'),
        volume = document.getElementById('Citation_Volume'),
        issueNo = document.getElementById('Citation_IssueNo'),
        startPage = document.getElementById('Citation_StartPage');

        yearPattern = isDefined(year) ? year.getAttribute('pattern') : null;
        volumePattern = isDefined(volume) ? volume.getAttribute('pattern') : null;
        issuePattern = isDefined(issueNo) ? issueNo.getAttribute('pattern') : null;
        startPagePattern = isDefined(startPage) ? startPage.getAttribute('pattern') : null;

        toggleButton = document.getElementsByClassName('js-journal-citation-filter-toggle')[0];
        widgetWrap = document.getElementsByClassName('journal-citation-filter-input-wrap')[0];
    }

    function _initializeHiddenFields() {
        placeholderTextJournal = _getValueOrDefaultByElementId('Config_PlaceholderTextJournal');
        placeholderTextYear = _getValueOrDefaultByElementId('Config_PlaceholderTextYear');
        placeholderTextVolume = _getValueOrDefaultByElementId('Config_PlaceholderTextVolume');
        placeholderTextIssueNo = _getValueOrDefaultByElementId('Config_PlaceholderTextIssueNo');
        placeholderTextStartPage = _getValueOrDefaultByElementId('Config_PlaceholderTextStartPage');
        validationMessageJournal = _getValueOrDefaultByElementId('Config_ValidationMessageJournal');
        validationMessageYear = _getValueOrDefaultByElementId('Config_ValidationMessageYear');
        validationMessageVolume = _getValueOrDefaultByElementId('Config_ValidationMessageVolume');
        validationMessageIssueNo = _getValueOrDefaultByElementId('Config_ValidationMessageIssueNo');
        validationMessageStartPage = _getValueOrDefaultByElementId('Config_ValidationMessageStartPage');
    }

    function _getValueOrDefaultByElementId(elementId, defaultValue) {
        defaultValue = defaultValue || '';
        return (document.getElementById(elementId) || {}).value || defaultValue;
    }

    function _fillInFieldsBasedOnQueryStringValues() /* -> bool */ {
        if ((isDefined(journalQueryStringValue) && isDefined(journal)) ||
            (isDefined(yearQueryStringValue) && isDefined(year)) ||
            (isDefined(volumeQueryStringValue) && isDefined(volume)) ||
            (isDefined(issueNoQueryStringValue) && isDefined(issueNo)) ||
            (isDefined(startPageQueryStringValue) && isDefined(startPage))) {
                year.value = _getYearFrom(yearQueryStringValue);
                volume.value = volumeQueryStringValue;
                issueNo.value = issueNoQueryStringValue;
                startPage.value = startPageQueryStringValue;
                return true;
            }
        return false;
    }

    function _getYearFrom(dateString) {
        if (!isDefined(dateString)) return '';
        var dates = decodeURIComponent(dateString).split('TO').map(function (x) { return x.replace('+', '') });
        var dateString = dates.length > 0 ? dates[0] : dateString;
        var date = new Date(dateString);
        return date.getUTCFullYear();
    }

    function _applyFilter() {
        var journalValue = isDefined(journal) && journal.options.length > 0 && isDefined(journal.options[journal.selectedIndex])
                ? journal.options[journal.selectedIndex].textContent
                : '',
            yearValue = isDefined(year) ? year.value : '',
            volumeValue = isDefined(volume) ? volume.value : '',
            issueNoValue = isDefined(issueNo) ? issueNo.value : '',
            startPageValue = isDefined(startPage) ? startPage.value : '';

        var citationData = {};
        var validationMessage = '';

        // JOURNAL
        if (journalValue === placeholderTextJournal && journalValue !== '') {
            validationMessage = validationMessageJournal + '\n';
        } else if(journalValue !== '') {
            citationData[journalParam] = $.trim(journalValue);
        }

        // YEAR
        if (yearValue !== placeholderTextYear && yearValue !== '') {
            var yearRegex = new RegExp(yearPattern);
            if (isNaN(yearValue) || !yearRegex.test(yearValue)) {
                validationMessage += validationMessageYear + '\n';
            } else {
                //var rangequery = yearValue + '-01-01T00:00:00.000Z TO ' + yearValue + '-12-31T23:59:59.000Z';
                //Instead of using the ISO format, just using the MM/DD/YYYY format
                var rangequery = '01/01/' + yearValue + ' TO ' + '12/31/' + yearValue;
                citationData[yearParam] = rangequery;
            }
        }

        // VOLUME
        if (volumeValue !== placeholderTextVolume && volumeValue !== '') {
            var volumeRegex = new RegExp(volumePattern);
            if (volumeRegex.test(volumeValue)) {
                citationData[volumeParam] = volumeValue;
            } else {
                validationMessage += validationMessageVolume + '\n';
            }
        }

        // ISSUE
        if (issueNoValue !== placeholderTextIssueNo && issueNoValue !== '') {
            var issueRegex = new RegExp(issuePattern);
            if (issueRegex.test(issueNoValue)) {
                citationData[issueNoParam] = issueNoValue;
            } else {
                validationMessage += validationMessageIssueNo + '\n';
            }
        }

        // START PAGE
        if (startPageValue !== placeholderTextStartPage && startPageValue !== '') {
            var startPageRegex = new RegExp(startPagePattern);
            if (startPageRegex.test(startPageValue)) {
                citationData[startPageParam] = startPageValue;
            } else {
                validationMessage += validationMessageStartPage + '\n';
            }
        }

        if (validationMessage.length > 0) {
            //validation failed!
            alert(validationMessage);
            return false;
        }
    
        var searchResultsParams = { queryString: jsonToQueryString(citationData) };

        // set basesite value in searchresults defaults
        var baseSiteURL = $("#hfSiteURL");
        if (typeof baseSiteURL !== 'undefined' && baseSiteURL.val() !== "") {
            SCM.SearchResults.defaults.baseSiteUrl = baseSiteURL.val();
        }

        SCM.SearchResults.doSolrSearch(searchResultsParams);
        return false;
    }

    function _toggleWidget() {
        if (widgetWrap.className.indexOf('collapsed') !== -1) {
            _openWidget();
        } else {
            _closeWidget();
        }
    }

    function _openWidget(preventSlideToggle) {
        widgetWrap.classList.remove('collapsed');
        if (toggleButton.className.indexOf('icon-general-arrow-filled-right') !== -1) {
            toggleButton.classList.remove('icon-general-arrow-filled-right');
            toggleButton.classList.add('icon-general-arrow-filled-down');
        }
    }

    function _closeWidget() {
        widgetWrap.classList.add('collapsed');
        if (toggleButton.className.indexOf('icon-general-arrow-filled-down') !== -1) {
            toggleButton.classList.remove('icon-general-arrow-filled-down');
            toggleButton.classList.add('icon-general-arrow-filled-right');
        }
    }

    return {
        init: _init,
        applyFilter: _applyFilter,
        toggleWidget: _toggleWidget,
        journalCitationFilterLoaded: _journalCitationFilterLoaded
    };

})(jQuery);

$(document).ready(function (event) {
    if (!SCM.JournalCitationFilter.journalCitationFilterLoaded()) {
        return;
    }

    SCM.JournalCitationFilter.init();
    //Citation Search Click
    $(document).on('click', '.js-journal-citation-filter-update', function () {
        $(this).addClass('fade');
        grayOutSidebar();
        SCM.JournalCitationFilter.applyFilter();
    });

    //Enter key
    $(document).on('keyup', '.js-advanced-citation-filter-field', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $('.js-journal-citation-filter-update').addClass('fade');
            grayOutSidebar();
            SCM.JournalCitationFilter.applyFilter();
        }
    });

    function grayOutSidebar() {
        $(document).ajaxStart(function() {
            $('.info-inner-cover').removeClass("uncovered");
            $('.info-inner-cover').addClass("covered");
        });
        $(document).ajaxComplete(function() {
            $('.info-inner-cover').removeClass("covered");
            $('.info-inner-cover').addClass("uncovered");
        });
    }

    $(document).on('click', '.js-journal-citation-filter-toggle', function () {
        SCM.JournalCitationFilter.toggleWidget();
    });

    // when user changes value of an input
    $(document).on('keyup change', '.js-advanced-citation-filter-field', function () {
        $('.js-journal-citation-filter-update').removeClass('fade');
    });
});

//Retrieves the values of a key from dataUrl
function getQueryStringValue(dataUrl, key) {
    var keyValue;
    var startText = key + '=';
    var endText = '&';
    var qPos = dataUrl.indexOf(startText);

    if (qPos === -1) {
        //key doesn't exist.
        return null;
    }
    else {
        qPos = qPos + startText.length;
    }

    if (dataUrl.indexOf('&', qPos) >= 0) {
        var ampPos = dataUrl.indexOf(endText, qPos);
        keyValue = dataUrl.substring(qPos, ampPos);
    }
    else {
        //data-url will be just like q=obesity
        keyValue = dataUrl.substring(qPos);
    }

    return keyValue;
}
function isDefined(element) {
    return typeof element !== 'undefined' && element !== undefined && element != null && element !== '';
}
function jsonToQueryString(json) {
    return Object.keys(json)
        .filter(function (key) { return isDefined(key) })
        .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]) })
        .join('&');
}
/**
* ArticleImageDetails Module
* 
*/

var SCM = SCM || {};

SCM.ArticleImageDetails = (function ($) {

    var _activationElement = null;

    ///   <summary>Initializes Image modal containers to initially hide all elements and open a specific
    ///   element based on state of input parameters.  In addition, it initializes click events to 
    ///   active various events such as moving between between next and previous images and closing
    ///   the modal</summary >
    ///   <param name="activationElement" type="string">Indicates which element by class name activates
    ///   opening a particular modal</param >
    ///   <param name="openImageModal" type="bool">Indicates whether the initialization code should open
    ///   a specific modal.</param >
    ///   <param name="modalItemToOpen" type="string">Indicates which modal to open based on the modal's
    ///   id. </param >
    ///   <returns type="none" />
    function _init(activationElement, openImageModal, modalItemToOpen) {
        $(".figureModalContainer").hide();
        if (openImageModal === true) {
            $("#" + modalItemToOpen).fadeToggle(200);
            _toggleBodyOverflow();
            
            _getCitation(modalItemToOpen);
        }

        _activationElement = activationElement;
        _moveModalsOutsideWidget();
        _enableHandlers();
    }

    function _moveModalsOutsideWidget() {
        var $modals = $('.figureModalContainer');
        $modals.remove();
        $('#multimediaGalleryModalWrapper').append($modals);
    }

    function _toggleBodyOverflow() {
        $("body").toggleClass("modalOpen");
    }

    function _enableHandlers() {
        _enableHandleOpenAndClose();
        _enableHandleClickFirstOrLastImage();
        _enableClickModalNavigation();
        _enableHandleClickOutsideModal();
    }
    function _disableHandlers() {
        _disableHandleOpenAndClose();
        _disableHandleClickFirstOrLastImage();
        _disableClickModalNavigation();
        _disableHandleClickOutsideModal();
    }

    function _enableHandleOpenAndClose() {
        $("." + _activationElement + ", .figureModal .close").on('click', _handleOpenAndClose);
    }
    function _disableHandleOpenAndClose() {
        $("." + _activationElement + ", .figureModal .close").off('click', _handleOpenAndClose);
    }

    function _handleOpenAndClose(event) {
        event.preventDefault();
        event.stopPropagation();
        /* itemNum is the id of the modal element to open or close and
            * refers to a modal element in the same way the modalItemToOpen input 
            * parameter does above
            */
        var itemNum = $(this).data("item");
        $("#" + itemNum).fadeToggle(200);
        _toggleBodyOverflow();

        _getCitation(itemNum);
    }

    function _getCitation(elementId) {
        var articleId = $("#" + elementId).data('articleid');

        if (!articleId) {
            return;
        }

        $.ajax({
            type: "POST",
            url: '/Article/GetCitation',
            data: { articleID: articleId }
        })
            .done(function (result) {
                if (result) {
                    document.getElementById(elementId).getElementsByClassName('citation')[0].innerHTML = result;
                }
            })
            .fail(function (result) {
                console.log(result.message);
            });
    }

    function _enableHandleClickFirstOrLastImage() {
        $('.js-item-image').first().on('click', _handleClickFirstOrLastImage);
        $('.js-item-image').last().on('click', _handleClickFirstOrLastImage);
    }
    function _disableHandleClickFirstOrLastImage() {
        $('.js-item-image').first().off('click', _handleClickFirstOrLastImage);
        $('.js-item-image').last().off('click', _handleClickFirstOrLastImage);
    }

    function _handleClickFirstOrLastImage(event) {
        event.preventDefault();
        event.stopPropagation();

        var thisNumber = $(this).data('item');
        
        _cachePrevOrNextPage($('#' + thisNumber));
    }

    function _enableClickModalNavigation() {
        $(".js-previous-image-details, .js-next-image-details").on('click', _handleModalNavigation);
    }
    function _disableClickModalNavigation() {
        $(".js-previous-image-details, .js-next-image-details").off('click', _handleModalNavigation);
    }

    function _handleModalNavigation(event) {
        event.preventDefault();
        event.stopPropagation();

        var $this = $(this);
        var currentItemNum = $this.data("item");
        var $currentItem = $("#" + currentItemNum);
        var newItemNum = $this.data("new-item");
        var $newItem = $("#" + newItemNum);

        if (newItemNum === "newPage") {
            var nextUrl = $this.data('url');
            var itemToOpen = $this.data('modal-open');

            _toggleBodyOverflow();

            SCM.SearchResults.doSolrSearch({
                queryString: nextUrl,
                openModal: itemToOpen
            });
        }
        else {
            _getCitation(newItemNum);
        }

        $newItem.toggle(function () { $currentItem.toggle(); });

        _cachePrevOrNextPage($newItem);
    }

    function _cachePrevOrNextPage($newItem) {
        var $prevNewItem = $newItem.find('.js-previous-image-details');
        var $nextNewItem = $newItem.find('.js-next-image-details');

        var prevOrNextUrl = null;
        var prevOrNextItemToOpen = null;

        if ($prevNewItem.data('new-item') === 'newPage') {
            prevOrNextUrl = $prevNewItem.data('url');
            prevOrNextItemToOpen = $prevNewItem.data('modal-open');
        }

        if ($nextNewItem.data('new-item') === 'newPage') {
            prevOrNextUrl = $nextNewItem.data('url');
            prevOrNextItemToOpen = $nextNewItem.data('modal-open');
        }

        if (prevOrNextUrl) {
            SCM.SearchResults.doSolrSearch({ 
                queryString: prevOrNextUrl, 
                openModal: prevOrNextItemToOpen,
                cacheSearchWithoutUpdatingDom: true,
                currentItem: $newItem,
                functionToDoWhileAjaxLoading: _toggleEnabledPrevOrNextButton
            });
        }
    }

    // Toggles the left and right navigation buttons. Should lower the opacity and disable click events until called again.
    function _toggleEnabledPrevOrNextButton($modalItemToOpen) {
        var $navButtons = $modalItemToOpen.find('.js-previous-image-details, .js-next-image-details');
        if ($modalItemToOpen.length) {
            if ($navButtons.hasClass('disabled')) {
                $navButtons.removeClass('disabled');
                _enableHandlers();
            } else if (!$navButtons.hasClass('disabled')) {
                $navButtons.addClass('disabled');
                _disableHandlers();
            }
        }
    }

    function _enableHandleClickOutsideModal() {
        /* Close modal if user clicks outside of modal which can be determined if there are
         * no parent elements with class name figureModalContainer and the modal is open
         */
        $(".figureModalContainer").on('click', _handleClickOutsideModal);
    }

    function _disableHandleClickOutsideModal() {
        /* Close modal if user clicks outside of modal which can be determined if there are
         * no parent elements with class name figureModalContainer and the modal is open
         */
        $(".figureModalContainer").off('click', _handleClickOutsideModal);
    }

    function _handleClickOutsideModal(event) {
        $target = $(event.target);
        if (!$target.parents('.figureModalContainer:visible').length) {
            $('.figureModalContainer').hide();
            $("body").removeClass("modalOpen");
        }
    }

    return {
        init: _init
    };

})(jQuery);

var SCM = SCM || {};

SCM.UploadImage_Complete = function (settings) {

    var data = $.extend({
        targetSelector: '#UploadTarget',
        jsonResultSelector: '#jsonResult',
        replacementContainerSelector: '#id'
    },
        settings);

    var jsonResult = $(data.targetSelector).contents().find(data.jsonResultSelector);

    if (jsonResult.length === 1) {
        var validationResult = $.parseJSON(jsonResult.html());

        $('[data-valmsg-for]').attr('class', 'field-validation-valid').html('');
        if (validationResult.Success) {
            if (data.success) {
                data.success();
            }
        } else if (validationResult.Messages.length > 0) {
            var msg = "Error \n";
            validationResult.Messages.forEach(function (errorMsg) {
                msg += errorMsg + "\n";
            });
            alert(msg);
        } else if (validationResult.Html) {
            $(data.replacementContainerSelector).replaceWith(validationResult.Html.replace(/{{/g, '&quot;'));
        } else {
            validationResult.ValidationErrors.forEach(function (validationError) {

                var $validationSpan = $('[data-valmsg-for=' + validationError.Key + ']');
                $validationSpan.addClass('field-validation-error').removeClass('field-validation-valid');
                validationError.Errors.forEach(function (errorMsg) {
                    $validationSpan.html($validationSpan.html() + errorMsg + "<br />");
                });
            });
        }
    }
};


SCM.AjaxHelperSuccessCallback = function (data, replacementContainer, onSuccessCallback) {
    if (data.RedirectUrl &&
        data.RedirectUrl.length > 0) {
        window.location = data.RedirectUrl;
    } else if (data.Html &&
        data.Html.length > 0) {
        replacementContainer.replaceWith(data.Html);
    } else if (!data.Success) {
        replacementContainer.replaceWith(data);
    } else {
        onSuccessCallback();
    }
};


SCM.AjaxHelperErrorCallback = function (data, replacementContainer, onErrorCallback) {
    if (data.RedirectUrl &&
        data.RedirectUrl.length > 0) {
        window.location = data.RedirectUrl;
    } else if (data.Html &&
        data.Html.length > 0) {
        replacementContainer.replaceWith(data.Html);
    } else if (!data.Success) {
        replacementContainer.replaceWith(data);
    } else {
        onErrorCallback();
    }
};


SCM.showModal = function () {
    var editorIds = [];

    if (typeof tinyMCE !== 'undefined') {
        tinyMCE.editors.forEach(function (editor) {
            $('#divDefaultUpdateTarget').find('#' + editor.editorContainer).each(function () { editorIds.push(editor.id); });
        });
    }
    $.fancybox({
        'autosize': true,
        'autoScale': false,
        'title': "",
        'href': '#divDefaultUpdateTarget'
    });

    if (typeof tinyMCE !== 'undefined') {
        editorIds.forEach(function (id) { $('#' + id).scmTinyMCE(); });
    }
};


SCM.hideModal = function () {
    $.fancybox.close();
};


SCM.refreshModal = function () {
    $.fancybox.update();
};


//set up global functions
(function () {

    var $body = $('body');

    //ajax error handler
    $(document).ajaxError(function (jqXHR, ajaxSettings, thrownError) {
        $body.removeClass('wait');
        if (ajaxSettings.responseText) {
            try {
                var obj = $.parseJSON(ajaxSettings.responseText);

                if (obj.Success != null && !obj.Success) {
                    var msg = "There was an error processing the request \n";

                    obj.Messages.forEach(function (m) { msg += m + "\n"; });

                    alert(msg);
                }
            } catch (err) {
                console.log("Ajax error occured, responseText is not json: " + err.message);
                //do nothing, we do not have valid json
            }
        }
    });


    $.validator.addMethod('isDateGreaterThan', function (value, element, params) {

        if (isPastDate($(element).val(), params) == true) {
            return false;
        } else {
            return true;
        }
    }, '');


    function isPastDate(value, dateToCheck) {
        var now = new Date(dateToCheck);
        var target = new Date(value);

        if (now.getFullYear() == target.getFullYear() && now.getMonth() == target.getMonth() && now.getDate() == target.getDate()) {
            return false;
        }
        else if (now > target) {
            return true;
        }

        return false;
    }


    $(document)
       .ajaxStart(function () {
           $body.addClass('wait');
       })
       .ajaxStop(function () {
           $body.removeClass('wait');
       });

    //default button
    $body.on('keypress', '[data-default-button]', function (e) {
        if (e.which == 13) {
            $("#" + $(this).data('defaultButton')).click();
            return false;
        }
    });

    $.validator.unobtrusive.adapters.add('dynamicrange', ['minvalueproperty', 'maxvalueproperty'],
   function (options) {
       options.rules['dynamicrange'] = options.params;
       if (options.message != null) {
           $.validator.messages.dynamicrange = options.message;
       }
   }
   );

    function getModelPrefix(fieldName) {
        return fieldName.substr(0, fieldName.lastIndexOf(".") + 1);
    }

    function appendModelPrefix(value, prefix) {
        if (value.indexOf("*.") === 0) {
            value = value.replace("*.", prefix);
        }
        return value;
    }

    $.validator.addMethod('dynamicrange', function (value, element, params) {
        var prefix = getModelPrefix(element.name);

        var minValue = parseInt($('input[name="' + appendModelPrefix(params.minvalueproperty, prefix) + '"]').val(), 10);
        var maxValue = parseInt($('input[name="' + appendModelPrefix(params.maxvalueproperty, prefix) + '"]').val(), 10);

        var currentValue = parseInt(value, 10);
        if (isNaN(minValue) || isNaN(maxValue) || isNaN(currentValue) || minValue > currentValue || currentValue > maxValue) {
            $.validator.messages.dynamicrange = $.format($(element).attr('data-val-dynamicrange'), minValue, maxValue);
            return false;
        }
        return true;
    }, '');

})();


//plugins
(function ($) {

    $.fn.radiobuttonEnable = function () {
        return this.each(function () {
            var $container = $(this);
            $container.find('*[data-rb-enable-name]').each(function () {
                var $element = $(this);
                var $rb = $container.find('input:radio[name="' + $element.data('rbEnableName') + '"]:checked');
                if ($rb.length > 0) {
                    var data = $element.data('rbEnableValue');
                    if (data != null &&
                        $rb.val().toString().toLowerCase() != data.toString().toLowerCase()) {
                        $element.attr('disabled', 'disabled');
                    }

                    data = $element.data('rbMakeVisibleValue');
                    if (data != null &&
                        $rb.val().toString().toLowerCase() != data.toString().toLowerCase()) {
                        $element.hide();
                    }
                }
            });

            $container.find('input:radio').on('change', function () {
                var $rb = $(this);
                var selector = '[data-rb-enable-name="' + $rb.attr('name') + '"]';
                var $inputs = $(selector);

                $inputs.each(function () {
                    var $element = $(this);

                    var tinyEditor = tinymce.editors[$element[0].id];
                    var data = $element.data('rbEnableValue');
                    if (data != null) {
                        if (data.toString().toLowerCase() == $rb.val().toLowerCase()) {
                            $element.removeAttr('disabled');
                            if (tinyEditor) {
                                tinyEditor.getBody().setAttribute('contenteditable', true);
                            }
                        } else {
                            $element.attr('disabled', 'disabled');
                            if (tinyEditor) {
                                tinyEditor.getBody().setAttribute('contenteditable', false);
                            }
                        }
                    }

                    data = $element.data('rbMakeVisibleValue');
                    if (data != null) {
                        if ((data.toString().toLowerCase() == $rb.val().toLowerCase() && !$element.is(':visible')) ||
                            (data.toString().toLowerCase() != $rb.val().toLowerCase() && $element.is(':visible'))) {
                            $element.fadeToggle();
                        }
                    }
                });

            });
        });
    };

    $.fn.configureSCMForm = function (data) {

        var settings = $.extend({
            cancelButtonSelector: '.cancel',
            submitButtonSelector: '.submit',
            nextQuestionButtonSelector: '.nextQuestion',
            skipButtonSelector: '.skip',
            validatorIgnores: ":disabled, input[type='hidden']",
            nextQuestion: null,
            cancel: null,
            skip: null,
            validateOnSubmit: null,
            validateOnKeyUp: false

        }, data);

        return this.each(function () {

            var $form = $(this);

            jQuery.validator.unobtrusive.parse('#' + this.id);
            $form.validate();
            var validatorSettings = $.data($form[0], 'validator').settings;
            validatorSettings.ignore = settings.validatorIgnores;
            if (settings.validateOnKeyUp === true) {
                settings.validateOnKeyUp = null;
            }
            validatorSettings.onkeyup = settings.validateOnKeyUp;
            validatorSettings.onsubmit = settings.validateOnSubmit;
            $form.find(settings.submitButtonSelector)
                .off('click.configureSCMForm')
                .on('click.configureSCMForm', function (e) {
                    e.preventDefault();
                    if ($form.valid()) {
                        $form.trigger('submit');
                    }
                });

            $form.find(settings.nextQuestionButtonSelector)
               .off('click.configureSCMForm')
               .on('click.configureSCMForm', function (e) {
                   e.preventDefault();
                   settings.nextQuestion();
               });

            $form.find(settings.skipButtonSelector)
               .off('click.configureSCMForm')
               .on('click.configureSCMForm', function (e) {
                   e.preventDefault();
                   settings.skip();
               });
            $form.find(settings.cancelButtonSelector)
                .off('click.configureSCMForm')
                .on('click.configureSCMForm', function (e) {
                    e.preventDefault();
                    if (!settings.cancel) {
                        $form.hide();
                        SCM.hideModal();
                    } else {
                        settings.cancel();
                    }
                });
        });
    };


    $.fn.viewMore = function (data) {

        var settings = $.extend({
            hiddenSelector: '.read-more',
            readMoreButtonSelector: '#readMore',
            readMoreText: 'Read More',
            readLessText: 'Read Less'
        }, data);

        return this.each(function () {

            var $readMore = $(settings.hiddenSelector);
            $readMore.hide();

            $(settings.readMoreButtonSelector).on('click', function (e) {
                e.preventDefault();

                $readMore.fadeToggle();
            });

        });
    };


    $.fn.scmTinyMCE = function () {
        $('.mceOpen.mce_forecolor').show();
        $('.mce_forecolor .mceLast .mceIconOnly').show();
        $('.mceOpen.mce_backcolor').show();
        $('.mceOpen.mce_backcolor .mceIconOnly').show();
        return this.each(function () {
            $(this).tinymce({
                gecko_spellcheck: true,
                theme: "advanced",
                theme_advanced_buttons1: "bold,italic,underline,|,bullist,numlist,|,sub,sup,|,charmap,|,forecolor,backcolor,|,link", //spellchecker
                theme_advanced_buttons2: "",
                theme_advanced_buttons3: "",
                plugins: "inlinepopups",
                theme_advanced_statusbar_location: null,
                oninit: function (mce) {

                    //ensure configured for radiobutton disable
                    var $inputElement = $('#' + mce.editorId + '[data-rb-enable-name]');
                    var $rb = $('input:radio[name="' + $inputElement.data('rbEnableName') + '"]');
                    if ($rb.length > 0 &&
                        $rb.val().toString().toLowerCase() != $inputElement.data('rbEnableValue').toString().toLowerCase()) {
                        $inputElement.attr('disabled', 'disabled');
                        var tinyEditor = tinymce.editors[$inputElement[0].id];
                        if (tinyEditor) {
                            tinyEditor.getBody().setAttribute('contenteditable', false);
                        }
                    }
                }
            });
        });
    };


    $.fn.scmTimer = function (data) {
        return this.each(function () {
            var $this = $(this);

            var settings = $.extend({
                h: 0,
                m: 0,
                s: 0,
                hs: 0,
                stop: false,
                milliseconds: 150,
                intervalCheck: null,
            }, data);

            if (settings.stop) {
                clearInterval($this.data('scmTimerToken'));
                return;
            }

            var formatTime = function (i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };

            var startTime = (new Date()).getTime();

            var showTime = function () {
                $this.text(formatTime(settings.h) + ":" + formatTime(settings.m) + ":" + formatTime(settings.s) + ":" + formatTime(settings.hs));
            };


            showTime();
            $this.data('scmTimerToken', setInterval(function () {

                if (!$this.is(':visible')) {
                    clearInterval($this.data('scmTimerToken'));
                    return;
                }

                var newTime = (new Date()).getTime();
                var ticksSinceLastInterval = newTime - startTime;
                settings.hs += Math.floor(ticksSinceLastInterval / 10);
                startTime = newTime;
                if (settings.hs >= 100) {
                    settings.s += Math.floor(settings.hs / 100);
                    settings.hs = settings.hs % 100;

                    if (settings.s >= 60) {
                        settings.m += Math.floor(settings.s / 60);
                        settings.s = settings.s % 60;
                    }

                    if (settings.m >= 60) {
                        settings.h += Math.floor(settings.m / 60);
                        settings.m = settings.m % 60;
                    }
                }

                showTime();

                if (settings.intervalCheck) {
                    if (!settings.intervalCheck(settings)) {
                        clearInterval($this.data('scmTimerToken'));
                        return;
                    }
                }

            }, settings.milliseconds));

        });
    };


    $.fn.wkTimer = function (data) {
        return this.each(function () {
            var $this = $(this);

            var settings = $.extend({
                h: 0,
                m: 0,
                s: 0,
                hs: 0,
                stop: false,
                milliseconds: 150,
                intervalCheck: null,
            }, data);

            if (settings.stop) {
                clearInterval($this.data('wkTimerToken'));
                return;
            }

            var formatTime = function (i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };

            var startTime = (new Date()).getTime();

            var showTime = function () {
                $this.text(formatTime(settings.m) + ":" + formatTime(settings.s));
            };


            showTime();
            $this.data('wkTimerToken', setInterval(function () {

                if (!$this.is(':visible')) {
                    clearInterval($this.data('wkTimerToken'));
                    return;
                }

                var newTime = (new Date()).getTime();
                var ticksSinceLastInterval = newTime - startTime;
                settings.hs += Math.floor(ticksSinceLastInterval / 10);
                startTime = newTime;
                if (settings.hs >= 100) {
                    settings.s += Math.floor(settings.hs / 100);
                    settings.hs = settings.hs % 100;

                    if (settings.s >= 60) {
                        settings.m += Math.floor(settings.s / 60);
                        settings.s = settings.s % 60;
                    }

                    if (settings.m >= 60) {
                        settings.h += Math.floor(settings.m / 60);
                        settings.m = settings.m % 60;
                    }
                }

                showTime();

                if (settings.intervalCheck) {
                    if (!settings.intervalCheck(settings)) {
                        clearInterval($this.data('wkTimerToken'));
                        return;
                    }
                }

            }, settings.milliseconds));

        });
    };
})(jQuery);
var SCM = SCM || {};
SCM.__namespace = true;

SCM.eventManager = function($, undefined) {

    var subscribeWidgetRefresh = function(scmActionEnum, refreshData) {

        var settings = $.extend({
            refreshWhenInvisible: false,
            messageContainerSelector: '#divMessage'
        }, refreshData);

        var token = "";
        var refreshFunction = function (data) {
            if (!settings.refreshIf ||
                settings.refreshIf(data)) {
                var $container = $(settings.containerSelector);
                if (settings.refreshWhenInvisible || $container.is(':visible')) {
                    $.ajax({
                        type: "POST",
                        url: settings.url,
                        data: settings.data,
                        dataType: "html",
                        success: function(evt) {
                            $.pubsub('unsubscribe', token);
                            $container.replaceWith(evt).show();
                            if (settings.refreshSuccess) {
                                settings.refreshSuccess(data);
                            }
                        }
                    });
                }
            }
        };
        token = subscribeActionCompleted(scmActionEnum, refreshFunction);
    };

    var subscribe = function(subscriptionMessage, refreshFunction) {
        return $.pubsub('subscribe', subscriptionMessage, refreshFunction);
    };

    var publish = function(subscriptionMessage, data) {
        $.pubsub('publish', subscriptionMessage, data);
    };

    var actionCompletedMsg = "actionCompleted";
    var publishActionCompleted = function (scmActionEnum, data) {
        var settings = $.extend({
            actionEnum: scmActionEnum
        }, data);
        publish(actionCompletedMsg, settings);
    };

    var subscribeActionCompleted = function(scmActionEnum, method) {
        return subscribe(actionCompletedMsg, function(msg, data) {
            if (scmActionEnum === data.actionEnum) {
                method(data);
            }
        });
    };

    var actionRequestMsg = "actionCompleteactionRequest";
    var publishActionRequest = function (scmActionEnum, data) {
        return publish(actionRequestMsg, { actionEnum: scmActionEnum, data: data });
    };

    var subscribeActionRequest = function (scmActionEnum, method) {
        return subscribe(actionRequestMsg, function (msg, data) {
            if (scmActionEnum === data.actionEnum) {
                method(data.data);
            }
        });
    };

    var subscribeActionRequestDisplayResult = function (scmActionEnum, displayContainerSelector) {
        return subscribeActionRequest(scmActionEnum, function (data) {
            var settings = $.extend({
                type: "POST"
            }, data);

            $.ajax({
                type: settings.type,
                url: settings.url,
                data: settings.data,
                dataType: "html",
                success: function (evt) {
                    $(displayContainerSelector).html(evt).show();
                },
                error: function (evt) {
                    alert(evt);
                }
            });

            SCM.hideModal();
        });
    };
    
    return {
        subscribeWidgetRefresh: subscribeWidgetRefresh,
        subscribe: subscribe,
        publish: publish,
        publishActionCompleted: publishActionCompleted,
        subscribeActionCompleted: subscribeActionCompleted,
        publishActionRequest: publishActionRequest,
        subscribeActionRequest: subscribeActionRequest,
        subscribeActionRequestDisplayResult: subscribeActionRequestDisplayResult
    };
}(jQuery);

SCM.eventManager.subscriptionMessages = {
    playVideo: "SCM.PlayVideo"
};
// ----
// A little JS publish/subscribe module taken mostly from David Walsh.
// Adapted to work on IE8
// ----

var SCM = SCM || {};

(function (events, $, undefined) {
    var topics = {};
    var hOP = topics.hasOwnProperty;

    events.subscribe = function (topic, listener) {
        // Create the topic's object if not yet created
        if (!hOP.call(topics, topic)) topics[topic] = [];

        // Add the listener to queue
        var index = topics[topic].push(listener) - 1;

        // Provide handle back for removal of topic
        return {
            remove: function () {
                delete topics[topic][index];
            }
        };
    };

    events.publish = function (topic, info) {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if (!hOP.call(topics, topic)) return;

        // Cycle through topics queue, fire!
        $.each(topics[topic], function (index, item) {
            item(info !== undefined ? info : {});
        });
    };
})(SCM.EventEmitter = SCM.EventEmitter || {}, jQuery);
// ----
// SCM.SharedControls.PDFAccess.js
// checks a user's access to a PDF and launches the PDF or a no-access modal
//
// The PDF links, located in multiple widgets, contain HTML 5 attributes like data-article-id, data-article-url, data-ajax-url, data-issue-id ...
// In ToolboxPdf.cshtml, the article PDF link is identified by classes al-link and pdfaccess; the issue PDF link is identified by classes al-link and issue-pdfLink
//
// The noAccessReveal modal is in Site.Master in the client project; it is used for both the article and issue PDF "no access" modals
// In the noAccessReveal modal, the article purchase link has id=articleLinkToPurchase, the issue purchase modal has class=issue-purchase-modal
//
// There are 2 kinds of Issue PDFs: TOC.pdf (available to anyone) and fullissue.pdf (only authenticated users may access)
// ----

var SCM = SCM || {};

(function (pdf, $) {
    // ----
    // Private variables and functions
    // ----
    function formatIssuePurchaseLink(issuePurchaseUrl, id) {
        // If the purchase URL contains "resourceid=", format the "resourceid=" portion of the querystring with the current issue id
        var revisedIssuePurchaseUrl = issuePurchaseUrl;

        if (issuePurchaseUrl.toLowerCase().indexOf("resourceid=") >= 0) {
            var pattern = /resourceID=\{0\}|resourceID=\d+/i;
            revisedIssuePurchaseUrl = issuePurchaseUrl.replace(pattern, "resourceid=" + id);
        }

        return revisedIssuePurchaseUrl;
    }

    function logErrors(jqXHR, textStatus, errorThrown) {
        if (window.console) {
            var err = eval("(" + jqXHR.responseText + ")");
            console.log('error: ' + err);
            console.log('status: ' + textStatus);
        }
    }

    function openPDF(PDFUrl) {
        window.location.href = PDFUrl;
    }

    function openNoAccessModalArticle(articlePdfAnchor, articldeID) {
        // remove data attributes so ajax call doesn't happen if PDF link is clicked a 2nd time.
        // instead, link the PDF link directly with the No-Access modal
        articlePdfAnchor.attr({ 'data-reveal-id': 'noAccessReveal', 'data-reveal': '' }).removeAttr('data-ajax-url');
        var articleUrl = '/article.aspx?articleid=' + articldeID + '#purchaseSubscriptionBox';
        pdf.$noAccessModal.find('#articleLinkToPurchase').attr('href', articleUrl);
        pdf.$noAccessModal.foundation('reveal', 'open');
    }

    function openNoAccessModalArticleSeo(articlePdfAnchor, articldeID, seoUrl) {
        // remove data attributes so ajax call doesn't happen if PDF link is clicked a 2nd time.
        // instead, link the PDF link directly with the No-Access modal
        articlePdfAnchor.attr({ 'data-reveal-id': 'noAccessReveal', 'data-reveal': '' }).removeAttr('data-ajax-url');
        if (seoUrl === "DO_NOT_USE") {
            pdf.$noAccessModal.find('#articleLinkToPurchase').remove();
        } else {
            var articleUrl = seoUrl;
            pdf.$noAccessModal.find('#articleLinkToPurchase').attr('href', articleUrl);
        }
        pdf.$noAccessModal.foundation('reveal', 'open');
    }

    function openNoAccessModalIssue(issuePurchaseUrl, id) {
        var issueUrl = formatIssuePurchaseLink(issuePurchaseUrl, id);
        pdf.$noAccessModal.find('.aIssuePurchaseLink').attr('href', issueUrl);
        pdf.$noAccessModal.foundation('reveal', 'open');
    }


    // ----
    // Public variables and methods
    // ----

    // making modal selector public so it can be overriden in the client implementation
    pdf.$noAccessModal = $('#noAccessReveal');

    pdf.checkArticlePDFAccess = function (articlePdfAnchor) {

        var id = articlePdfAnchor.attr('data-article-id'),
            url = articlePdfAnchor.attr('data-article-url'),
            ajaxUrl = articlePdfAnchor.attr('data-ajax-url'),
            baseSiteUrl = $("#hfSiteURL");
        var seoUrl = "";
        if (articlePdfAnchor.attr('data-article-seo-url') !== null) {
            seoUrl = articlePdfAnchor.attr('data-article-seo-url');
        }
        if (typeof baseSiteUrl !== "undefined" && typeof baseSiteUrl.val() !== "undefined" && baseSiteUrl !== '') {
            ajaxUrl = "//" + baseSiteUrl.val() + ajaxUrl;
        }


        //set up data object to send...
        var name1 = "aId";
        var value1 = id;
        var dataObj = {};
        dataObj[name1] = value1;


        $.ajax({
            type: "POST",
            url: ajaxUrl,
            data: dataObj,
            traditional: true,
            success: function (access) {
                if (access.Success) {
                    openPDF(url);
                } else {
                    if (seoUrl.length > 0) {
                        openNoAccessModalArticleSeo(articlePdfAnchor, id, seoUrl);
                    } else {
                        openNoAccessModalArticle(articlePdfAnchor, id);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                logErrors(jqXHR, textStatus, errorThrown);
            }
        });
    };


    pdf.checkIssuePDFAccess = function (issuePdfAnchor) {
        var id = issuePdfAnchor.attr('data-issue-id'),
            url = issuePdfAnchor.attr('data-issue-url'),
            ajaxUrl = issuePdfAnchor.attr('data-ajax-issue-url'),
            issuePurchaseUrl = pdf.$noAccessModal.find('.aIssuePurchaseLink').attr('href');

        if (url.toLowerCase().indexOf('/toc.pdf') > -1) {
            window.location.href = url;
            return;
        }

        $.ajax({
            type: "POST",
            url: ajaxUrl,
            data: { issueId: id },
            traditional: true,
            success: function (access) {
                if (access.Success) {
                    openPDF(url);
                } else {
                    openNoAccessModalIssue(issuePurchaseUrl, id);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                logErrors(jqXHR, textStatus, errorThrown);
            }
        });
    };

    pdf.bindUiEvents = function () {
        // Article PDFs
        $(document).on('click', '.al-link.pdfaccess', function () {
            $(document).foundation();
            pdf.$noAccessModal.foundation('reveal', 'close');
            pdf.$noAccessModal.find('#articleLinkToPurchase').show();
            pdf.$noAccessModal.find('.issue-purchase-modal').hide();

            if (!$(this).attr('data-reveal-id')) {
                pdf.checkArticlePDFAccess($(this));
            }
        });

        // Make sure modal closes when the "x" is clicked
        $(document).on('click', '.close-reveal-modal', function () {
            try {
                $(this).parents('.reveal-modal').foundation('reveal', 'close');
            } catch (ex) {
                console.log("Foundation error - pdfaccess : " + ex);
            }
        });

        // Issue PDFs
        $(document).on('click', '.al-link.issue-pdfLink', function () {
            pdf.$noAccessModal.foundation('reveal', 'close');
            pdf.$noAccessModal.find('#articleLinkToPurchase').hide();
            pdf.$noAccessModal.find('.issue-purchase-modal').show();

            pdf.checkIssuePDFAccess($(this));
        });
    };

    pdf.init = function () {
        pdf.bindUiEvents();
    };




})(SCM.PDFAccess = SCM.PDFAccess || {}, jQuery);
//
//  scm.sharedcontrols.ArticleAbstract.js
//  javascript functionality for the ArticleAbstract widget
//

$(document).ready(function () {
    $('div[data-article-abstract-2b-fetched-wrapper] > div[data-article-abstract-get] a').on('click', function () {
        var wrapperDiv = $(this).closest('div[data-article-abstract-2b-fetched-wrapper]');
        var articleId = $(wrapperDiv).data('articleid-4-abstract');
        var triedFetchDiv = $(wrapperDiv).children('div[data-tried-to-fetch-abstract]').first();
        var triedFetch = $(triedFetchDiv).data("tried-to-fetch-abstract") === "true";
        var abstractLocation = $('#abstract-' + articleId);
        var baseSiteUrl = $("#hfSiteURL");
        var ajaxUrl = $(this).parent().data('link-article-abstract-type') == 'extract' ? "/Article/ArticleAbstractOrExtractAjax" : "/Article/ArticleAbstractAjax";

        if (typeof baseSiteUrl != "undefined" && typeof baseSiteUrl.val() != "undefined" && baseSiteUrl != '') {
            ajaxUrl = "//" + baseSiteUrl.val() + ajaxUrl;
        }

        if (!triedFetch) {
            $.ajax({
                url: ajaxUrl,
                type: 'GET',
                data: { articleId: articleId },
                success: function (data) {
                    abstractLocation.html(data.Html);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    if (window.console) {
                        var err = eval("(" + xmlHttpRequest.responseText + ")");
                        console.log('error: ' + err);
                        console.log('status: ' + textStatus);
                    };
                }
            });
            $(triedFetchDiv).data("tried-to-fetch-abstract", "true");
        }

        abstractLocation.toggle();
    });

});
var SCM = SCM || {};

SCM.Supplements = SCM.Supplements || {};

SCM.Supplements.updateIssueSupplementsOnChange = function () {
    $('.js-supplements-select').on('change', function () {
        window.location.href = $(this).val();
    });
};

SCM.Supplements.updateIssueSupplementsOnChange();
//
//  scm.sharedcontrols.BookAbstract.js
//  javascript functionality for the BookAbstract widget in search results
//

$(document).ready(function () {
    $('div[data-book-abstract-2b-fetched-wrapper] > div[data-book-abstract-get] a').on('click', function () {
        var wrapperDiv = $(this).closest('div[data-book-abstract-2b-fetched-wrapper]');
        var bookId = $(wrapperDiv).data('bookid-abstract');
        var triedFetchDiv = $(wrapperDiv).children('div[data-tried-to-fetch-abstract]').first();
        var triedFetch = $(triedFetchDiv).data("tried-to-fetch-abstract") === "true";
        var abstractLocation = $('#abstract-' + bookId);
        var baseSiteUrl = $("#hfSiteURL");
        var ajaxUrl = "/Book/BookAbstractAjax";

        if (typeof baseSiteUrl != "undefined" && typeof baseSiteUrl.val() != "undefined" && baseSiteUrl != '') {
            ajaxUrl = "//" + baseSiteUrl.val() + ajaxUrl;
        }

        if (!triedFetch) {
            $.ajax({
                url: ajaxUrl,
                type: 'GET',
                data: { bookId: bookId },
                success: function (data) {
                    abstractLocation.html(data.Html);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    if (window.console) {
                        var err = eval("(" + xmlHttpRequest.responseText + ")");
                        console.log('error: ' + err);
                        console.log('status: ' + textStatus);
                    };
                }
            });
            $(triedFetchDiv).data("tried-to-fetch-abstract", "true");
        }
        abstractLocation.toggle();

        // Toggle Abstract Icon (moved in from client.issue.js)
        var $thisAbstractIcon = wrapperDiv.find('.abstract-toggle-icon'),
            $downArrow = 'icon-general-arrow-filled-down',
            $upArrow = 'icon-general-arrow-filled-up';

        $thisAbstractIcon.hasClass($downArrow) ? $thisAbstractIcon.removeClass($downArrow).addClass($upArrow) : $thisAbstractIcon.removeClass($upArrow).addClass($downArrow);
    });

});
// ----
// JS for Toolbar
// ----

var SCM = SCM || {};

(function (ns, $, $document, undefined) {
    // ----
    // private variables and functions
    // ----
    var $toolbar = $('#Toolbar'),
        $viewDrop = $('#ViewsDrop'),
        $shareDrop = $('#ShareDrop'),
        $toolsDrop = $('#ToolsDrop');

    function showProperToolbarOptions() {
        hideActiveTabLinkFromViewsList();
        hideMenuItemIfNoVisibleItemsInside();
    }

    function hideMenuItemIfNoVisibleItemsInside() {
        var $ddTriggers = $('.item-with-dropdown:visible');
        $ddTriggers.show();
        $ddTriggers.each(function () {
            var visibleItemsExist = false,
                $this = $(this);

            $this.find('ul li, .js-article-content-filter').each(function () {
                if ($this.is(':visible')) {
                    visibleItemsExist = true;
                } else if ($this.css('display') !== 'none') {
                    visibleItemsExist = true;
                }
            });
            if (!visibleItemsExist) {
                $this.hide();
            }
        });
    }

    function hideActiveTabLinkFromViewsList() {
        $('.tab-item').parent('li').show();

        if ($('.tabs-content').length) {
            var activeTab = "";

            $('.tabs-content > .content').each(function () {
                var $this = $(this);
                if ($this.hasClass('active')) {
                    activeTab = $this.attr('id');
                }
            });
            $('#ViewsDrop li').show();
            $('#ViewsDrop').find('[data-tab="#' + activeTab + '"]').closest('li').hide();
        }
    }



    // ----
    // public methods and properties accessible by SCM.IssuePage.[method_name]
    // ----
    ns.closeDropDownIfChildItemClicked = function () {
        $('#Toolbar .f-dropdown > li').on('click', function () {
            $(this).closest('.toolbar-item').trigger('click');
        });
    };

    ns.removeTabLinkIfTabIsEmpty = function (cssSelector) {
        $(cssSelector).find('.tab-trigger').each(function () {
            var $this = $(this),
                tabName = $this.attr('data-tab');

            // find('*') grabs all descendent HTML elements so we can count.
            // if there are less than 20 Elements, the tab might be empty. Do a further check to validate
            // that the widget didn't output any content. Remove toolbar link if widget didn't output any content.
            // We don't want to do a costly regex replace if the widget outputs a large chunk of HTML.
            if (tabName !== '#ContentTab' && $(tabName).find('*').length < 20) {
                var html = $(tabName).html();
                var regex = /(<([^>]+)>)/ig;
                var result = html !== undefined ? $.trim(html.replace(regex, "")) : 1;

                if (result.length === 0) {
                    $this.parent('li').remove();
                }
            }
        });
    };

    ns.hideTabIfDropdownIsEmpty = function () {
        var dropdowns = [$shareDrop, $toolsDrop];

        for (var i = 0; i < dropdowns.length; i++) {
            var currentDd = dropdowns[i];
            if (currentDd.children('li').length < 1) {
            //there should always be at least a ContentTab li.
                currentDd.parent().hide();
                //If it's the only one, remove from toolbar
            }
        }
        if ($viewDrop.children('.js-article-content-filter').length < 2) {
            $viewDrop.parent().hide();
        }
    };

    ns.toggleTabContent = function () {
        $('.tab-trigger').on('click', function (e) {
            e.preventDefault();
            
            var $this = $(this),
                tabId = $this.attr('data-tab'),
                $tab = $(tabId);
            
            $tab.siblings().removeClass('active');
            $tab.addClass('active');

            if (tabId === '#FigureTab') {
                $document.trigger('scroll'); // Trigger scroll so lazy load can load images.
            }
            showProperToolbarOptions();
        });
    };

    ns.styleToolbarStates = function () {
        $toolbar.on('click', '.toolbar-item', function () {
            var $this = $(this);
            $this.addClass('clicked');
            $this.siblings().removeClass('clicked');
        });

        var $toolbarItems = $('.toolbar-item');

        $document.on('click', function () {
            $toolbarItems.each(function () {
                var $this = $(this);
                if (!$this.find('ul').hasClass('open')) {
                    $this.removeClass('clicked');
                }
            });
        });

        // Note: this is not ideal, but the only good technical way to fix the problem
        // as of 24 Jun 2019. Toolbar <li> elements with no content need to be hidden. 
        // :empty does not work because of whitespace. When/if :blank is implemented
        // for all supported browsers, that should replace the following map function.
        // https://css-tricks.com/almanac/selectors/b/blank/
        $.map($toolbarItems, function (toolbarElement) {
            if (!toolbarElement.children.length) {
                toolbarElement.classList.add('no-children');
            }
        });
    };


    ns.initArticleContentFilter = function () {
        if ($(document.body).hasClass('pg_ChapterStandard')) {
            contentFilter('.widget-BookSectionsText', 'BookSectionsText');
        }
        else {
            contentFilter('.widget-ArticleFulltext', 'ArticleFulltext');
        }
    };

    function contentFilter(widget,dataName) {
        var $fullTextContent = $(widget, '#ContentTab');

        if ($fullTextContent.length) {
            var $contentSections = $('.widget-items[data-widgetname="' + dataName + '"]').children() //$fullTextContent.find('.content-section');
            var $filterMenu = $viewDrop.children('.js-article-content-filter');
            var $filteredView = $('#ContentTabFilteredView');

            $filterMenu.filter('[data-content-filter="article-content"]').hide();

            var $figuresTablesContent = $contentSections.filter('.table-wrap, .fig-section').add($contentSections.has('.table-wrap, .fig-section'));
            if ($figuresTablesContent.length === 0) {
                $filterMenu.remove('[data-content-filter="figures-tables"]');
            }

            var $videoContent = $contentSections.filter('.video-section');
            if ($videoContent.length === 0) {
                $filterMenu.remove('[data-content-filter="video"]');
            }

            var $audioContent = $contentSections.filter('.audio-section');
            if ($audioContent.length === 0) {
                $filterMenu.remove('[data-content-filter="audio"]');
            }

            var $supplementaryDataContent = $('.widget-ArticleDataSupplements, .supplementary-material');
            if ($supplementaryDataContent.length === 0) {
                $filterMenu.remove('[data-content-filter="supplementary-data"]');
            }

            var $downloadAllImages = $('#ContentTab').find('js-download-images-ppt');

            var $commentsSection = $('#ContentTab').find('div.comments');

            var setDownloadImageLink = function ($contentSections) {
                if ($contentSections.filter('.fig-section:not(:has(a[restricted]))').length) {
                    $downloadAllImages.show();
                }
                else {
                    $downloadAllImages.hide();
                }
            };


            $filterMenu.on('click', function () {
                $(this).hide();
                $(this).siblings().show();


                var contentFilter = $(this).attr('data-content-filter');
                var $metadataStandalone = $(".article-metadata-standalone-panel");

                var $filteredContent;

                if (contentFilter === 'figures-tables') {
                    $filteredContent = $figuresTablesContent;
                }
                else if (contentFilter === 'video') {
                    $filteredContent = $videoContent;
                }
                else if (contentFilter === 'audio') {
                    $filteredContent = $audioContent;
                }
                else if (contentFilter === 'supplementary-data') {
                    $filteredContent = $supplementaryDataContent;
                }

                if ($filteredContent !== undefined && $filteredContent !== null && $filteredContent.length) {
                    $contentSections.hide();
                    $supplementaryDataContent.hide();
                    $filteredContent.show();
                    $commentsSection.hide();
                    setDownloadImageLink($filteredContent);
                }
                else {
                    $contentSections.show();

                    // NARN-10700 (adjust code from NARN-5642): make sure there are children before showing, e.g.,
                    //                                          when switching from split view or figure view.
                    $metadataStandalone.children().length > 0 ? $metadataStandalone.show() : $metadataStandalone.hide();

                    $supplementaryDataContent.show();
                    $commentsSection.show();
                    $downloadAllImages.hide();
                }

                SCM.SiteJS.restrictedImages();


            });
        }
    };

    ns.init = function () {
        if ($toolbar.length) {
            showProperToolbarOptions();
            ns.removeTabLinkIfTabIsEmpty($viewDrop);
            ns.styleToolbarStates();
            ns.toggleTabContent();
            ns.initArticleContentFilter();
            ns.hideTabIfDropdownIsEmpty();
        }
    };

})(SCM.Toolbar = SCM.Toolbar || {}, jQuery, $(document));
/* Placeholders.js v3.0.2 */
(function (t) { "use strict"; function e(t, e, r) { return t.addEventListener ? t.addEventListener(e, r, !1) : t.attachEvent ? t.attachEvent("on" + e, r) : void 0 } function r(t, e) { var r, n; for (r = 0, n = t.length; n > r; r++) if (t[r] === e) return !0; return !1 } function n(t, e) { var r; t.createTextRange ? (r = t.createTextRange(), r.move("character", e), r.select()) : t.selectionStart && (t.focus(), t.setSelectionRange(e, e)) } function a(t, e) { try { return t.type = e, !0 } catch (r) { return !1 } } t.Placeholders = { Utils: { addEventListener: e, inArray: r, moveCaret: n, changeType: a}} })(this), function (t) { "use strict"; function e() { } function r() { try { return document.activeElement } catch (t) { } } function n(t, e) { var r, n, a = !!e && t.value !== e, u = t.value === t.getAttribute(V); return (a || u) && "true" === t.getAttribute(D) ? (t.removeAttribute(D), t.value = t.value.replace(t.getAttribute(V), ""), t.className = t.className.replace(R, ""), n = t.getAttribute(F), parseInt(n, 10) >= 0 && (t.setAttribute("maxLength", n), t.removeAttribute(F)), r = t.getAttribute(P), r && (t.type = r), !0) : !1 } function a(t) { var e, r, n = t.getAttribute(V); return "" === t.value && n ? (t.setAttribute(D, "true"), t.value = n, t.className += " " + I, r = t.getAttribute(F), r || (t.setAttribute(F, t.maxLength), t.removeAttribute("maxLength")), e = t.getAttribute(P), e ? t.type = "text" : "password" === t.type && M.changeType(t, "text") && t.setAttribute(P, "password"), !0) : !1 } function u(t, e) { var r, n, a, u, i, l, o; if (t && t.getAttribute(V)) e(t); else for (a = t ? t.getElementsByTagName("input") : b, u = t ? t.getElementsByTagName("textarea") : f, r = a ? a.length : 0, n = u ? u.length : 0, o = 0, l = r + n; l > o; o++) i = r > o ? a[o] : u[o - r], e(i) } function i(t) { u(t, n) } function l(t) { u(t, a) } function o(t) { return function () { m && t.value === t.getAttribute(V) && "true" === t.getAttribute(D) ? M.moveCaret(t, 0) : n(t) } } function c(t) { return function () { a(t) } } function s(t) { return function (e) { return A = t.value, "true" === t.getAttribute(D) && A === t.getAttribute(V) && M.inArray(C, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0 } } function d(t) { return function () { n(t, A), "" === t.value && (t.blur(), M.moveCaret(t, 0)) } } function g(t) { return function () { t === r() && t.value === t.getAttribute(V) && "true" === t.getAttribute(D) && M.moveCaret(t, 0) } } function v(t) { return function () { i(t) } } function p(t) { t.form && (T = t.form, "string" == typeof T && (T = document.getElementById(T)), T.getAttribute(U) || (M.addEventListener(T, "submit", v(T)), T.setAttribute(U, "true"))), M.addEventListener(t, "focus", o(t)), M.addEventListener(t, "blur", c(t)), m && (M.addEventListener(t, "keydown", s(t)), M.addEventListener(t, "keyup", d(t)), M.addEventListener(t, "click", g(t))), t.setAttribute(j, "true"), t.setAttribute(V, x), (m || t !== r()) && a(t) } var b, f, m, h, A, y, E, x, L, T, N, S, w, B = ["text", "search", "url", "tel", "email", "password", "number", "textarea"], C = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], k = "#ccc", I = "placeholdersjs", R = RegExp("(?:^|\\s)" + I + "(?!\\S)"), V = "data-placeholder-value", D = "data-placeholder-active", P = "data-placeholder-type", U = "data-placeholder-submit", j = "data-placeholder-bound", q = "data-placeholder-focus", z = "data-placeholder-live", F = "data-placeholder-maxlength", G = document.createElement("input"), H = document.getElementsByTagName("head")[0], J = document.documentElement, K = t.Placeholders, M = K.Utils; if (K.nativeSupport = void 0 !== G.placeholder, !K.nativeSupport) { for (b = document.getElementsByTagName("input"), f = document.getElementsByTagName("textarea"), m = "false" === J.getAttribute(q), h = "false" !== J.getAttribute(z), y = document.createElement("style"), y.type = "text/css", E = document.createTextNode("." + I + " { color:" + k + "; }"), y.styleSheet ? y.styleSheet.cssText = E.nodeValue : y.appendChild(E), H.insertBefore(y, H.firstChild), w = 0, S = b.length + f.length; S > w; w++) N = b.length > w ? b[w] : f[w - b.length], x = N.attributes.placeholder, x && (x = x.nodeValue, x && M.inArray(B, N.type) && p(N)); L = setInterval(function () { for (w = 0, S = b.length + f.length; S > w; w++) N = b.length > w ? b[w] : f[w - b.length], x = N.attributes.placeholder, x ? (x = x.nodeValue, x && M.inArray(B, N.type) && (N.getAttribute(j) || p(N), (x !== N.getAttribute(V) || "password" === N.type && !N.getAttribute(P)) && ("password" === N.type && !N.getAttribute(P) && M.changeType(N, "text") && N.setAttribute(P, "password"), N.value === N.getAttribute(V) && (N.value = x), N.setAttribute(V, x)))) : N.getAttribute(D) && (n(N), N.removeAttribute(V)); h || clearInterval(L) }, 100) } M.addEventListener(t, "beforeunload", function () { K.disable() }), K.disable = K.nativeSupport ? e : i, K.enable = K.nativeSupport ? e : l } (this);
/*!
 * jScrollPane - v2.0.23 - 2016-01-28
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.fn.jScrollPane=function(b){function c(b,c){function d(c){var f,h,j,k,l,o,p=!1,q=!1;if(N=c,void 0===O)l=b.scrollTop(),o=b.scrollLeft(),b.css({overflow:"hidden",padding:0}),P=b.innerWidth()+rb,Q=b.innerHeight(),b.width(P),O=a('<div class="jspPane" />').css("padding",qb).append(b.children()),R=a('<div class="jspContainer" />').css({width:P+"px",height:Q+"px"}).append(O).appendTo(b);else{if(b.css("width",""),p=N.stickToBottom&&A(),q=N.stickToRight&&B(),k=b.innerWidth()+rb!=P||b.outerHeight()!=Q,k&&(P=b.innerWidth()+rb,Q=b.innerHeight(),R.css({width:P+"px",height:Q+"px"})),!k&&sb==S&&O.outerHeight()==T)return void b.width(P);sb=S,O.css("width",""),b.width(P),R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}O.css("overflow","auto"),S=c.contentWidth?c.contentWidth:O[0].scrollWidth,T=O[0].scrollHeight,O.css("overflow",""),U=S/P,V=T/Q,W=V>1,X=U>1,X||W?(b.addClass("jspScrollable"),f=N.maintainPosition&&($||bb),f&&(h=y(),j=z()),e(),g(),i(),f&&(w(q?S-P:h,!1),v(p?T-Q:j,!1)),F(),C(),L(),N.enableKeyboardNavigation&&H(),N.clickOnTrack&&m(),J(),N.hijackInternalLinks&&K()):(b.removeClass("jspScrollable"),O.css({top:0,left:0,width:R.width()-rb}),D(),G(),I(),n()),N.autoReinitialise&&!pb?pb=setInterval(function(){d(N)},N.autoReinitialiseDelay):!N.autoReinitialise&&pb&&clearInterval(pb),l&&b.scrollTop(0)&&v(l,!1),o&&b.scrollLeft(0)&&w(o,!1),b.trigger("jsp-initialised",[X||W])}function e(){W&&(R.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),cb=R.find(">.jspVerticalBar"),db=cb.find(">.jspTrack"),Y=db.find(">.jspDrag"),N.showArrows&&(hb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",k(0,-1)).bind("click.jsp",E),ib=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",k(0,1)).bind("click.jsp",E),N.arrowScrollOnHover&&(hb.bind("mouseover.jsp",k(0,-1,hb)),ib.bind("mouseover.jsp",k(0,1,ib))),j(db,N.verticalArrowPositions,hb,ib)),fb=Q,R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){fb-=a(this).outerHeight()}),Y.hover(function(){Y.addClass("jspHover")},function(){Y.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",E),Y.addClass("jspActive");var c=b.pageY-Y.position().top;return a("html").bind("mousemove.jsp",function(a){p(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",o),!1}),f())}function f(){db.height(fb+"px"),$=0,eb=N.verticalGutter+db.outerWidth(),O.width(P-eb-rb);try{0===cb.position().left&&O.css("margin-left",eb+"px")}catch(a){}}function g(){X&&(R.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),jb=R.find(">.jspHorizontalBar"),kb=jb.find(">.jspTrack"),_=kb.find(">.jspDrag"),N.showArrows&&(nb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",k(-1,0)).bind("click.jsp",E),ob=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",k(1,0)).bind("click.jsp",E),N.arrowScrollOnHover&&(nb.bind("mouseover.jsp",k(-1,0,nb)),ob.bind("mouseover.jsp",k(1,0,ob))),j(kb,N.horizontalArrowPositions,nb,ob)),_.hover(function(){_.addClass("jspHover")},function(){_.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",E),_.addClass("jspActive");var c=b.pageX-_.position().left;return a("html").bind("mousemove.jsp",function(a){r(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",o),!1}),lb=R.innerWidth(),h())}function h(){R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){lb-=a(this).outerWidth()}),kb.width(lb+"px"),bb=0}function i(){if(X&&W){var b=kb.outerHeight(),c=db.outerWidth();fb-=b,a(jb).find(">.jspCap:visible,>.jspArrow").each(function(){lb+=a(this).outerWidth()}),lb-=c,Q-=c,P-=b,kb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),f(),h()}X&&O.width(R.outerWidth()-rb+"px"),T=O.outerHeight(),V=T/Q,X&&(mb=Math.ceil(1/U*lb),mb>N.horizontalDragMaxWidth?mb=N.horizontalDragMaxWidth:mb<N.horizontalDragMinWidth&&(mb=N.horizontalDragMinWidth),_.width(mb+"px"),ab=lb-mb,s(bb)),W&&(gb=Math.ceil(1/V*fb),gb>N.verticalDragMaxHeight?gb=N.verticalDragMaxHeight:gb<N.verticalDragMinHeight&&(gb=N.verticalDragMinHeight),Y.height(gb+"px"),Z=fb-gb,q($))}function j(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function k(a,b,c){return function(){return l(a,b,this,c),this.blur(),!1}}function l(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&tb.scrollByX(b*N.arrowButtonSpeed),0!==c&&tb.scrollByY(c*N.arrowButtonSpeed),g=setTimeout(i,h?N.initialDelay:N.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function m(){n(),W&&db.bind("mousedown.jsp",function(b){if(void 0===b.originalTarget||b.originalTarget==b.currentTarget){var c,d=a(this),e=d.offset(),f=b.pageY-e.top-$,g=!0,h=function(){var a=d.offset(),e=b.pageY-a.top-gb/2,j=Q*N.scrollPagePercent,k=Z*j/(T-Q);if(0>f)$-k>e?tb.scrollByY(-j):p(e);else{if(!(f>0))return void i();e>$+k?tb.scrollByY(j):p(e)}c=setTimeout(h,g?N.initialDelay:N.trackClickRepeatFreq),g=!1},i=function(){c&&clearTimeout(c),c=null,a(document).unbind("mouseup.jsp",i)};return h(),a(document).bind("mouseup.jsp",i),!1}}),X&&kb.bind("mousedown.jsp",function(b){if(void 0===b.originalTarget||b.originalTarget==b.currentTarget){var c,d=a(this),e=d.offset(),f=b.pageX-e.left-bb,g=!0,h=function(){var a=d.offset(),e=b.pageX-a.left-mb/2,j=P*N.scrollPagePercent,k=ab*j/(S-P);if(0>f)bb-k>e?tb.scrollByX(-j):r(e);else{if(!(f>0))return void i();e>bb+k?tb.scrollByX(j):r(e)}c=setTimeout(h,g?N.initialDelay:N.trackClickRepeatFreq),g=!1},i=function(){c&&clearTimeout(c),c=null,a(document).unbind("mouseup.jsp",i)};return h(),a(document).bind("mouseup.jsp",i),!1}})}function n(){kb&&kb.unbind("mousedown.jsp"),db&&db.unbind("mousedown.jsp")}function o(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),Y&&Y.removeClass("jspActive"),_&&_.removeClass("jspActive")}function p(c,d){if(W){0>c?c=0:c>Z&&(c=Z);var e=new a.Event("jsp-will-scroll-y");if(b.trigger(e,[c]),!e.isDefaultPrevented()){var f=c||0,g=0===f,h=f==Z,i=c/Z,j=-i*(T-Q);void 0===d&&(d=N.animateScroll),d?tb.animate(Y,"top",c,q,function(){b.trigger("jsp-user-scroll-y",[-j,g,h])}):(Y.css("top",c),q(c),b.trigger("jsp-user-scroll-y",[-j,g,h]))}}}function q(a){void 0===a&&(a=Y.position().top),R.scrollTop(0),$=a||0;var c=0===$,d=$==Z,e=a/Z,f=-e*(T-Q);(ub!=c||wb!=d)&&(ub=c,wb=d,b.trigger("jsp-arrow-change",[ub,wb,vb,xb])),t(c,d),O.css("top",f),b.trigger("jsp-scroll-y",[-f,c,d]).trigger("scroll")}function r(c,d){if(X){0>c?c=0:c>ab&&(c=ab);var e=new a.Event("jsp-will-scroll-x");if(b.trigger(e,[c]),!e.isDefaultPrevented()){var f=c||0,g=0===f,h=f==ab,i=c/ab,j=-i*(S-P);void 0===d&&(d=N.animateScroll),d?tb.animate(_,"left",c,s,function(){b.trigger("jsp-user-scroll-x",[-j,g,h])}):(_.css("left",c),s(c),b.trigger("jsp-user-scroll-x",[-j,g,h]))}}}function s(a){void 0===a&&(a=_.position().left),R.scrollTop(0),bb=a||0;var c=0===bb,d=bb==ab,e=a/ab,f=-e*(S-P);(vb!=c||xb!=d)&&(vb=c,xb=d,b.trigger("jsp-arrow-change",[ub,wb,vb,xb])),u(c,d),O.css("left",f),b.trigger("jsp-scroll-x",[-f,c,d]).trigger("scroll")}function t(a,b){N.showArrows&&(hb[a?"addClass":"removeClass"]("jspDisabled"),ib[b?"addClass":"removeClass"]("jspDisabled"))}function u(a,b){N.showArrows&&(nb[a?"addClass":"removeClass"]("jspDisabled"),ob[b?"addClass":"removeClass"]("jspDisabled"))}function v(a,b){var c=a/(T-Q);p(c*Z,b)}function w(a,b){var c=a/(S-P);r(c*ab,b)}function x(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),R.scrollTop(0),R.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=z(),j=h+Q,h>n||c?l=n-N.horizontalGutter:n+f>j&&(l=n-Q+f+N.horizontalGutter),isNaN(l)||v(l,d),i=y(),k=i+P,i>o||c?m=o-N.horizontalGutter:o+g>k&&(m=o-P+g+N.horizontalGutter),isNaN(m)||w(m,d)}function y(){return-O.position().left}function z(){return-O.position().top}function A(){var a=T-Q;return a>20&&a-z()<10}function B(){var a=S-P;return a>20&&a-y()<10}function C(){R.unbind(zb).bind(zb,function(a,b,c,d){bb||(bb=0),$||($=0);var e=bb,f=$,g=a.deltaFactor||N.mouseWheelSpeed;return tb.scrollBy(c*g,-d*g,!1),e==bb&&f==$})}function D(){R.unbind(zb)}function E(){return!1}function F(){O.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){x(a.target,!1)})}function G(){O.find(":input,a").unbind("focus.jsp")}function H(){function c(){var a=bb,b=$;switch(d){case 40:tb.scrollByY(N.keyboardSpeed,!1);break;case 38:tb.scrollByY(-N.keyboardSpeed,!1);break;case 34:case 32:tb.scrollByY(Q*N.scrollPagePercent,!1);break;case 33:tb.scrollByY(-Q*N.scrollPagePercent,!1);break;case 39:tb.scrollByX(N.keyboardSpeed,!1);break;case 37:tb.scrollByX(-N.keyboardSpeed,!1)}return e=a!=bb||b!=$}var d,e,f=[];X&&f.push(jb[0]),W&&f.push(cb[0]),O.bind("focus.jsp",function(){b.focus()}),b.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(b){if(b.target===this||f.length&&a(b.target).closest(f).length){var g=bb,h=$;switch(b.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:d=b.keyCode,c();break;case 35:v(T-Q),d=null;break;case 36:v(0),d=null}return e=b.keyCode==d&&g!=bb||h!=$,!e}}).bind("keypress.jsp",function(b){return b.keyCode==d&&c(),b.target===this||f.length&&a(b.target).closest(f).length?!e:void 0}),N.hideFocus?(b.css("outline","none"),"hideFocus"in R[0]&&b.attr("hideFocus",!0)):(b.css("outline",""),"hideFocus"in R[0]&&b.attr("hideFocus",!1))}function I(){b.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"),O.unbind(".jsp")}function J(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&O.find(d)&&(0===R.scrollTop()?c=setInterval(function(){R.scrollTop()>0&&(x(b,!0),a(document).scrollTop(R.position().top),clearInterval(c))},50):(x(b,!0),a(document).scrollTop(R.position().top)))}}function K(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate('a[href*="#"]',"click",function(b){var c,d,e,f,g,h,i=this.href.substr(0,this.href.indexOf("#")),j=location.href;if(-1!==location.href.indexOf("#")&&(j=location.href.substr(0,location.href.indexOf("#"))),i===j){c=escape(this.href.substr(this.href.indexOf("#")+1));try{d=a("#"+c+', a[name="'+c+'"]')}catch(k){return}d.length&&(e=d.closest(".jspScrollable"),f=e.data("jsp"),f.scrollToElement(d,!0),e[0].scrollIntoView&&(g=a(window).scrollTop(),h=d.offset().top,(g>h||h>g+a(window).height())&&e[0].scrollIntoView()),b.preventDefault())}}))}function L(){var a,b,c,d,e,f=!1;R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=y(),b=z(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=bb,j=$;return tb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==bb&&j==$}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function M(){var a=z(),c=y();b.removeClass("jspScrollable").unbind(".jsp"),O.unbind(".jsp"),b.replaceWith(yb.append(O.children())),yb.scrollTop(a),yb.scrollLeft(c),pb&&clearInterval(pb)}var N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb=this,ub=!0,vb=!0,wb=!1,xb=!1,yb=b.clone(!1,!1).empty(),zb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===b.css("box-sizing")?(qb=0,rb=0):(qb=b.css("paddingTop")+" "+b.css("paddingRight")+" "+b.css("paddingBottom")+" "+b.css("paddingLeft"),rb=(parseInt(b.css("paddingLeft"),10)||0)+(parseInt(b.css("paddingRight"),10)||0)),a.extend(tb,{reinitialise:function(b){b=a.extend({},N,b),d(b)},scrollToElement:function(a,b,c){x(a,b,c)},scrollTo:function(a,b,c){w(a,c),v(b,c)},scrollToX:function(a,b){w(a,b)},scrollToY:function(a,b){v(a,b)},scrollToPercentX:function(a,b){w(a*(S-P),b)},scrollToPercentY:function(a,b){v(a*(T-Q),b)},scrollBy:function(a,b,c){tb.scrollByX(a,c),tb.scrollByY(b,c)},scrollByX:function(a,b){var c=y()+Math[0>a?"floor":"ceil"](a),d=c/(S-P);r(d*ab,b)},scrollByY:function(a,b){var c=z()+Math[0>a?"floor":"ceil"](a),d=c/(T-Q);p(d*Z,b)},positionDragX:function(a,b){r(a,b)},positionDragY:function(a,b){p(a,b)},animate:function(a,b,c,d,e){var f={};f[b]=c,a.animate(f,{duration:N.animateDuration,easing:N.animateEase,queue:!1,step:d,complete:e})},getContentPositionX:function(){return y()},getContentPositionY:function(){return z()},getContentWidth:function(){return S},getContentHeight:function(){return T},getPercentScrolledX:function(){return y()/(S-P)},getPercentScrolledY:function(){return z()/(T-Q)},getIsScrollableH:function(){return X},getIsScrollableV:function(){return W},getContentPane:function(){return O},scrollToBottom:function(a){p(Z,a)},hijackInternalLinks:a.noop,destroy:function(){M()}}),d(c)}return b=a.extend({},a.fn.jScrollPane.defaults,b),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){b[this]=b[this]||b.speed}),this.each(function(){var d=a(this),e=d.data("jsp");e?e.reinitialise(b):(a("script",d).filter('[type="text/javascript"],:not([type])').remove(),e=new c(d,b),d.data("jsp",e))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:void 0,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}});
/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

var SCM = SCM || {};

Date.prototype.MMddyyyy = function () {
    var month = this.getMonth() + 1;
    var date = this.getDate();
    var year = this.getFullYear();

    var monthStr = month;
    var dateStr = date;

    if (month < 10) {
        monthStr = '0' + month;
    }

    if (date < 10) {
        dateStr = '0' + date;
    }

    return monthStr + '/' + dateStr + '/' + year;
};

(function (ns, $) {
    
    var validationErrorInvalidYear = $('#hfValidationErrorInvalidYear').val();
    var validationErrorInvalidRange = $('#hfValidationErrorInvalidRange').val();

    // Get the date query to use in Solr as generated by the Publication Date Filter
    // If only we had a JS unit test framework...
    ns.getSolrDateString = function (fromYear, toYear, fromMonth, toMonth) {
        var fromDay = 1;
        var toDay = 0; // When constructing a Date in JavaScript, 0 gives the last day of the month.

        if (ns.isSingleDateSelected) {
            // Handle all single-date logic here. Note that only `fromMonth` and `fromYear` could have values.
            toYear = fromYear;

            if (!fromMonth) {
                fromMonth = 0;
                toMonth = 12;
            } else {
                toMonth = fromMonth;
                fromMonth -= 1;
            }

        } else {

            if (!fromYear && toYear) {
                fromYear = 1666;
                fromMonth = 0;
            }
            else if (fromYear && !toYear) {
                toYear = 2999;
                toMonth = 12;
            }

            if (!toMonth && fromYear && toYear) {
                toMonth = 12;
            }
        
            if (fromMonth) {
                fromMonth -= 1;
            }

        }

        var fromDate = new Date(fromYear, fromMonth, fromDay);
        var toDate = new Date(toYear, toMonth, toDay);

        return fromDate.MMddyyyy() + ' TO ' + toDate.MMddyyyy();
    };
    
    ns.getValidationResponseTextForDateRange = function (fromYear, toYear, fromMonth, toMonth) {
        // Years must be a 4-digit number. This rule takes precedence according to NARN-12955.
        if (!fromYear && !toYear ||
            fromYear && !/^[\d]{4}$/.test(fromYear) ||
            toYear && !/^[\d]{4}$/.test(toYear)) {
            return validationErrorInvalidYear;
        }

        // Cannot have invalid date ranges.
        if (fromYear && toYear && fromYear > toYear ||  // 1st case: cannot have 2020 to 2010.

            fromMonth && toMonth &&
                fromMonth > toMonth &&                  // 2nd case: cannot have July 2016 to January 2016.
            fromYear && toYear &&
                fromYear === toYear) {

            return validationErrorInvalidRange;
        }
    };

    ns.getValidationResponseTextForSingleDate = function (year) {
        // We will assume that either one of the year fields is filled when validating.

        // Years must be a 4-digit number. This rule takes precedence according to NARN-12955.
        if (!year || !/^[\d]{4}$/.test(year)) {
            return validationErrorInvalidYear;
        }
    };

    // Fill in the date filter values based on URL search parameters.
    ns.fillInMonthDropdown = function ($month, $year) {
        if ($month.length) {
            var selectedValue = $month.data('selected');
            if (selectedValue && $year.val()) {
                // If the month is filled in, fill it in!
                $month.val(selectedValue);
            }
        }
    };

    ns.isSingleDateSelected = false;

    ns.initDateRangeToggle = function () {
        $(document).on('click', '.js-date-range-input-radio', function () {
            ns.isSingleDateSelected = $(this).attr('value') === 'single';
            cacheInputs();
            if (ns.isSingleDateSelected) {
                $('.js-date-input-to').addClass('hide');
                $('.js-date-range-label').addClass('hide');
            } else {
                $('.js-date-input-to').removeClass('hide');
                $('.js-date-range-label').removeClass('hide');
            }
        });
    };
    
    // Date Range or Single Date
    ns.initDateFilterTypeToggle = function () {
        if (window.location.search.indexOf('dateFilterType=single') >= 0) {
            $('.js-date-range-input-radio[value="single"]').click();
        }
    };

    ns.$fromYear = null;
    ns.$toYear = null;
    ns.$fromMonth = null;
    ns.$toMonth = null;

    function cacheInputs() {
        ns.$fromYear = $('#fromYear');
        ns.$toYear = $('#toYear');
        ns.$fromMonth = $('#fromMonth');
        ns.$toMonth = $('#toMonth');
    }

    ns.init = function () {
        cacheInputs();

        ns.initDateRangeToggle();
        ns.initDateFilterTypeToggle();
        ns.fillInMonthDropdown(ns.$fromMonth, ns.$fromYear);
        ns.fillInMonthDropdown(ns.$toMonth, ns.$toYear);
    };

})(SCM.PublicationDateFilter = SCM.PublicationDateFilter || {}, jQuery);
var SCM = SCM || {};

(function ($, ns) {

    ns.togglePubHistory = function () {
        var $pubHistoryDetails = $('.js-history-entries-wrap');

        $('.js-article-history').on('click', function () {
            $pubHistoryDetails.toggleClass('expanded');
            
            $(document.body).on('click', function () {
                $(currMenu).removeClass('expanded');
            });
        });
    };


})(jQuery, SCM.ArticlePubHistory = SCM.ArticlePubHistory || {});
// ----
// Client StatsMaster
// Where we track all end-user actions like clicking on share tools, content panes, etc.
// ----


var SCM = SCM || {};

SCM.ClientStatsMaster = (function ($, undefined) {
    // ----
    // Private Functions and Variables go here
    // ----
    function UserTracking(sourceType, actionType, actionDescription, url, searchData, isTurnAway) {
        this.SourceType = sourceType;
        this.ActionType = actionType;
        this.ActionDescription = actionDescription;
        this.ActionUrl = url;
        this.SearchData = searchData;
        this.IsTurnaway = isTurnAway;
    }

    UserTracking.prototype.toJson = function () {
        return JSON.stringify(this);
    };


    function sendTrackingData(sourceType, actionType, actionDescription, url, searchData, isTurnAway) {
        var ucaData = new UserTracking(sourceType, actionType, actionDescription, url, searchData, isTurnAway).toJson();
        var serviceUrl = "/Services/UserActionService.svc/TrackUserAction";

        $.ajax({
            type: "POST",
            url: serviceUrl,
            data: ucaData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            processData: true
        })
        .fail(function (jqXhr, textStatus) {
            if (window.console) {
                console.log('jqXhr.responseText: ' + jqXhr.responseText);
                console.log('status: ' + textStatus);
            }
        });
    }

    // ----
    // Return an object exposed to the public
    // ----
    return {

        // Content Tabs
        trackContentTabEvents: function(){
            // set 1 click event on wrapper instead of individual click events on each item.
            var wrapperElem = $('#Toolbar');
            var trackedTabActions = {
                '#FigureTab': 'FiguresClicked',
                '#TableTab': 'TablesClicked',
                '#ContentTab': 'ArticleClicked',
                '#SupplementTab': 'SupplementClicked',
                '#MultimediaTab': 'MultimediaClicked'
            };

            wrapperElem.on('click', '.tab-trigger', function() {
                var tab = $(this).attr('data-tab');

                if (tab in trackedTabActions) {
                    sendTrackingData(22, "View", trackedTabActions[tab], window.location.href, "", false);
                    //console.log(trackedTabActions[tab]);
                }
            });
        },


        // Shares
        trackShares: function (){
            var wrapperElem = $('#ShareDrop');
            var trackedShareActions = {
                'addthis_button_email': 'EmailClicked',
                'addthis_button_share': 'TwitterClicked',
                'addthis_button_facebook': 'FacebookClicked',
                'addthis_button_compact': 'CompactClicked',
            };

            wrapperElem.on('click', 'a', function() {
                // make this more robust so if people add class names it doesn't break
                var shareLink = $(this).attr('class');

                if (shareLink in trackedShareActions) {
                    sendTrackingData(22, "Share", trackedShareActions[shareLink], window.location.href, "", false);
                    //console.log(trackedShareActions[shareLink]);
                }
            });
        },

        trackSingleAction: function($elem, actionType, actionDescription){
            $elem.on('click', function () { // GetCitation
                sendTrackingData(22, actionType, actionDescription, window.location.href, "", false);
            });
        }

    };

})(jQuery);


$(window).on('load', function(){
    SCM.ClientStatsMaster.trackContentTabEvents();
    SCM.ClientStatsMaster.trackShares();
    SCM.ClientStatsMaster.trackSingleAction($('a[data-reveal-id="getCitation"]'), 'Tools', 'GetCitationClicked');
    SCM.ClientStatsMaster.trackSingleAction($('div.toolboxGetAlertsWidget'), 'Tools', 'AlertsClicked');
    SCM.ClientStatsMaster.trackSingleAction($('div#getAlertsConfirmation'), 'Tools', 'AlertAdded');
    SCM.ClientStatsMaster.trackSingleAction($('#PermissionsLink'), 'Tools', 'GetPermissionsClicked');
    SCM.ClientStatsMaster.trackSingleAction($("a.tablelink").filter(":parent"), 'ViewLargeImage', 'ViewLargeImageClicked');
});
var SCM = SCM || {};
SCM.JumpLinks = SCM.JumpLinks || {};

SCM.JumpLinks = (function($){
    var $body,
        $jumpLinks,
        offset = 0,
        lastScrollPosY = 0,
        jumplinkHash = [],
        $jsJumpLinkTargetIds = [];
        ticking = false,
        firstScroll = true;

    /**
    * Returns module API
    * @returns {object}
    */
    return {
        init: init
    }

    function init() {
        $body = $('html, body');
        $jumpLinks = $('.js-jumplink, .sectionLink');

        // Highlight active jumplink on scroll - step 1
        // Load position & associated jumplink for each section/abstract title into a hash-table-like object
        if ($body.hasClass('pg_article') || $body.hasClass('pg_issue')) {
            // jumplinkHash declared above so we can use it here & in on("scroll") block
            $jumpLinks.each(function(){
                var $this = $(this),
                    $jumplinkTarget = findJumplinkTarget($this.attr('href'));

                jumplinkHash.push({
                    jumplink: $this,
                    target: $jumplinkTarget
                });

            });

            $(window).on('scroll', handleScroll);
        }

        if ($body.hasClass('pg_chapterstandard')) {
            // jumplinkHash declared above so we can use it here & in on("scroll") block
            $jumpLinks.each(function () {
                var $this = $(this);
                var targetIdValue = $($this.attr('href').split('#').pop().trim());
                $target = findJumplinkTarget('#' + targetIdValue.selector);
                $jumplinkTarget = findJumplinkTarget($target);

                jumplinkHash.push({
                    jumplink: $this,
                    target: $jumplinkTarget
                });

            });

            $(window).on('scroll', handleScroll);

            if ($body.hasClass('pg_chapterstandard')) {
                $('.tocLink-label').each(function () {
                    if ($('.chapter-label').text().trim().toLowerCase() === $(this).text().trim().toLowerCase()) {
                        $(this).closest('.js-tocLink').addClass('active');
                    }
                });
            }
        }


        $jumpLinks.on('click', function (e) {
            if ($body.hasClass('pg_issue')) {
                var $target, offset = 0;
                var $link = $(e.target);
                var params = $.deparam.querystring();
                var page = 1;
                if (params.page) {
                    page = Number.parseInt(params.page);
                }

                if ($link.data('page') !== 0 && $link.data('page') !== page) {
                    window.location = '?page=' + $link.data('page') + $link.attr('href');
                }
            }
            else if ($body.hasClass('pg_article')) {
                var href = $(this).attr('href');
                $target = findJumplinkTarget(href);

                var targetOffsetTop = $target.offset().top;

                $body.animate({
                    scrollTop: targetOffsetTop
                }, 400, function () {
                    //console.log('End Columbus: ' + new Date());
                    $(window).off('scroll', handleScroll);
                    $(window).on('scroll', handleScroll);
                });
            }
            else if ($body.hasClass('pg_chapterstandard')) {
                href = $(this).attr('href');
                var targetIdValue = $(href.split('#').pop().trim());
                $target = findJumplinkTarget('#' + targetIdValue.selector);
                targetOffsetTop = $target.offset().top - 50;

                $body.animate({
                    scrollTop: targetOffsetTop
                }, 400, function () {
                    $(window).off('scroll', handleScroll);
                    $(window).on('scroll', handleScroll);
                });
            }
        });


        // changes for splitview
        if ($body.hasClass('pg_articlesplitview')) {
            
            // hide References jumplink in Contents tab
            $(".js-jumplink:contains('References')").parents(".section-jump-link").hide();
        }

    }

    /**
    * Differentiate between jumplink targeting id attr vs data-legacy-id attr
    * @param targetID {string}
    * @return $target {object}
    */
    function findJumplinkTarget(targetID) {
        if (targetID && targetID.length) {
            var $target = $(targetID);

            if ($target.length === 0 && targetID.startsWith("#")) {
                var hrefWithoutHash = targetID.substring(1);
                $target = $("[data-legacy-id='" + hrefWithoutHash + "']");
            }
            return $target;
        }
        return null;
    }

    /**
    * Handle window scroll, and capture current scroll position Y
    */
    function handleScroll() {
        lastScrollPosY = window.scrollY;
        requestTick();
    }

    /**
    * Request new rAF if not active
    */
    function requestTick() {
        if (!ticking) {
            rAF = requestAnimationFrame(highlightOnScroll);
            ticking = true;
        }
    }

    /**
    * Highlight jumplink corresponding to current page section in scroll frame
    */
    function highlightOnScroll() {
        var $jsTocLinks = $('.js-tocLink');
        var $jsJumplinks = $('.js-jumplink');
        var params = $.deparam.querystring();

        //highlighting on scroll
        $(window).on('scroll', function () {
            var scrollTop = $(this).scrollTop();

            $('.articleClientType').each(function () {
                var topDistance = $(this).offset().top;
                var subheadingArticleId = $(this).attr('id');
                var scrollToLink = $('.section-jump-link__link-wrap a[href="#' + subheadingArticleId + '"]');

                // if section is in view
                if ((topDistance - 90) < scrollTop) {
                    if ($(scrollToLink).length) {
                        $('.list-issue-jumplinks li').removeClass('active');
                    }
                    $jsJumplinks.removeClass('active');
                    $(scrollToLink).closest('.js-jumplink').addClass('active');
                }
            });

            if ($body.hasClass('pg_issue') && !$jsJumplinks.hasClass('active')) {
                var pageSize = $('#ArticleListPageSize').val();
                var page = 0;
                if (params.page) {
                    page = Number.parseInt(params.page) - 1;
                }

                var find = (page * pageSize);

                var prev;
                var links = $('.section-jump-link__link-wrap a');
                links.each(function (idx, elem) {
                    if (elem.dataset.ordinal > find) {
                        $(prev).closest('.js-jumplink').addClass('active');
                        return false;
                    } else if (links.length-1 === idx) {
                        $(elem).closest('.js-jumplink').addClass('active'); 
                    }
                    prev = elem;
                });
            }

            if ($('.article-body').length) {
                $('#ContentColumn h2').each(function () {
                    var topDistance = $(this).offset().top;
                    var subheadingArticleId = $(this).attr('id');
                    var scrollToLink = $('#InfoColumn .section-jump-link__link-wrap a[href="#' + subheadingArticleId + '"]');
                    // if section is in view
                    if ((topDistance - 90) < scrollTop) {
                        if ($(scrollToLink).length) {
                            $('.jumplink-list li').removeClass('active');
                        }
                        $jsJumplinks.removeClass('active');
                        $(scrollToLink).closest('.js-jumplink').addClass('active');
                    }
                });
            }

            if ($('.book-chapter-body').length) {
                if (!$jsJumpLinkTargetIds.length) {
                    $('#ContentColumn h2').each(function () {
                        $jsJumpLinkTargetIds.push($(this));
                    });

                    $('#ContentColumn h3').each(function () {
                        $jsJumpLinkTargetIds.push($(this));
                    });
                }

                $($jsJumpLinkTargetIds).each(function () {
                    var topDistance = $(this).offset().top;
                    var scrollToLink, subheadingChapterId;
                    if ($(this).data('magellan-destination')) {
                        subheadingChapterId = parseInt($(this).data('magellan-destination'));
                    }
                    else {
                        subheadingChapterId = parseInt($(this).prevAll('a').eq(1).attr('id'));
                        
                    }
                    scrollToLink = $('#InfoColumn .section-title-wrap a[data-sectionid="' + subheadingChapterId + '"]');
                    // if section is in view
                    if ((topDistance - 90) < scrollTop) {
                        if ($(scrollToLink).length) {
                            $('.jumplink-list li').removeClass('active');
                        }
                        $jsJumplinks.removeClass('active');
                        $(scrollToLink).closest('.js-jumplink').addClass('active');
                        $(scrollToLink).closest('ul.js-headings-placeholder').prev('.toggleArea.expandable').find('.js-tocLink').addClass('active');
                        $(scrollToLink).closest('ul.js-headings-placeholder').prev('.toggleArea.expandable').find('.js-jumplink').addClass('active');
                    }
                });
            }
        });

    }

})(jQuery);
var SCM = SCM || {};

(function (ns, $) {
    var currPage = '';
    var lastScrollPosY = window.scrollY || window.pageYOffset;
    var ticking = false;
    var $body;
    var $articleBrowseMobileNav;
    var $issueBrowseMobileNav;
    var $leftNavColumn;
    var $toolbarWrap;
    var toolbarHeight;
    var $stickyElements;
    var $stickyToolbar;
    var $header;
    var $adBannerTop;
    var $adTopConfig;
    var $adRightConfig;
    var $adDelayMilliseconds;
    var $useAdTopDelay;
    var $mainPage;
    var $rightRail;
    var $rightRailAd;
    var $scrollHeight;
    var articleLeftNavStickyOffset = 0;

    ns.init = function () {
        $body = $('body');
        $mainPage = $(".js-master-container");
        $leftNavColumn = $(".js-left-nav-col");
        $leftNav = $(".js-left-nav");
        $toolbarWrap = $(".js-toolbar-wrap");
        toolbarHeight = $toolbarWrap.height();
        $stickyElements = $(".js-left-nav-col, .js-toolbar-wrap, .sr-filters, .js-article-browse-mobile-nav");
        $stickyToolbar = $('.js-sticky-toolbar');
        $header = $(".js-master-header");
        $adBannerTop = $(".js-ad-banner-header");
        $adDelayMilliseconds = $("#hdnAdDelaySeconds").val();
        $adTopConfig = $("#hdnAdConfigurationTop").val();
        $adRightConfig = $("#hdnAdConfigurationRightRail").val();
        $rightRail = $("#Sidebar.page-column--right");
        $rightRailAdContainer = $("#Sidebar>div:last-of-type");
        $rightRailAd = $("#Sidebar>div:last-of-type>div");

        var $articleLeftNavStickyOffsetHiddenField = $('#hfArticleLeftNavStickyOffset');
        if ($articleLeftNavStickyOffsetHiddenField.length) {
            articleLeftNavStickyOffset = parseInt($articleLeftNavStickyOffsetHiddenField.val());
        }

        if ($adDelayMilliseconds > 0 && $adTopConfig === "scrolldelay") {
            $useAdTopDelay = true;
            setTimeout(function () {
                $useAdTopDelay = false;
                $adBannerTop.removeClass("fixed");
                $mainPage.removeClass("master-container-sticky");
            }, $adDelayMilliseconds);
        }

        setCurrentPage();

        $(window).on('scroll', onScroll);
        updateStickyElements();
    };

    /**
    * Handle window scroll, and capture current scroll position Y
    */
    function onScroll() {
        lastScrollPosY = window.scrollY || window.pageYOffset;
        requestTick();
    }

    /**
    * Request new rAF if not active
    */
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateStickyElements);
            ticking = true;
        }
    }

    function setCurrentPage() {
        // Article page
        if ($body.hasClass('pg_article')) {
            currPage = 'article';
            $articleBrowseMobileNav = $(".js-article-browse-mobile-nav");
        }

        // Articles By Group (Advance Articles) page
        if ($body.hasClass('pg_articlesbygroup')) {
            currPage = 'articlebygroup';
        }

        // Issue Results
        if ($body.hasClass("pg_issue")) {
            currPage = 'issue';
            $issueBrowseMobileNav = $(".js-issue-browse-mobile-nav");
        }

        // Search Results
        if ($body.hasClass("pg_solr/searchresults")) {
            currPage = 'search';
            $srFilters = $(".sr-filters");
        }

        // Pages self-serve
        if ($body.hasClass("pg_selfserve/sspage")) {
            currPage = 'selfserve';
        }

        // Book page
        if ($body.hasClass("pg_book")) {
            currPage = 'book';
        }

        // Book page
        if ($body.hasClass("pg_chapterstandard")) {
            currPage = 'chapter';
        }
    }

    function updateStickyElements() {
        ticking = false;

        // Article page article toolbar
        updateStickyToolbar();
        updateRightRail();
        updateArticleLeftNav();
        updateSearchStickyToolbar();

        if (currPage === "issue") {
            updateIssueLeftNav();
        }

        updateAdvertScrollDelay();
        updateAdvertGuardian();
    }

    // checking every time because google ads aren't always loaded by document.ready()
    var _hasTopAd = null;
    function hasTopAd() {
        if (!_hasTopAd) {
            _hasTopAd = $("#adBlockHeader iframe").length;
        }
        return _hasTopAd;
    }

    var _hasRightRailAd = null;
    function hasRightRailAd() {
        if (!_hasRightRailAd) {
            _hasRightRailAd = $("#Sidebar>div:last-of-type iframe").length;
        }
        return _hasRightRailAd;
    }

    function updateStickyToolbar() {
        if (SCM.SiteJS.getViewportWidth() > 1023) {
            if (currPage === "article") {
                if (lastScrollPosY >= $('.article-body').offset().top + toolbarHeight) {
                    $stickyToolbar.addClass("stuck");
                } else {
                    $stickyToolbar.removeClass("stuck");
                }
            }
            else if (currPage === "chapter") {
                if (lastScrollPosY >= $('.book-chapter-body').offset().top + toolbarHeight) {
                    $stickyToolbar.addClass("stuck");
                } else {
                    $stickyToolbar.removeClass("stuck");
                }
            }
        }
    }

    function updateRightRail() {
        // Right Rail Bottom Ad Sticky
        // For layouts with Desktop size breakpoint for Right Sidebar response
        if ($adRightConfig === "sticky" && hasRightRailAd()) {
            var adBreakScrollPosY;
            if (hasRightRailAd() && SCM.SiteJS.getViewportWidth() > 1200) {
                if (currPage === "article") { // Article page with fixed top menu
                    $scrollHeight =
                        50 +
                        $rightRail.height() +
                        $header.height(); // +50 for main padding
                    adBreakScrollPosY =
                        $scrollHeight -
                        $rightRailAd.height() -
                        80; // account for fixed article menu, top: 80 for Ad w/ fixed menu.

                    if (lastScrollPosY >= adBreakScrollPosY) {
                        $rightRail.css('height', $rightRail.height());
                        $rightRailAdContainer.addClass("fixed");
                    } else {
                        $rightRail.css('height', 'auto');
                        $rightRailAdContainer.removeClass("fixed");
                    }
                }

                if (currPage === "issue" || currPage === "search" || currPage === "book" || currPage === "chapter") { // Issue, Search Pages
                    $scrollHeight =
                        50 +
                        $rightRail.height() +
                        $header.height(); // +50 for main padding
                    adBreakScrollPosY = $scrollHeight - $rightRailAd.height() - 24; // top: 24 for Ad w/out fixed menu.
                    if (lastScrollPosY >= adBreakScrollPosY) { // padding, including responsive article menu
                        $rightRail.css('height', $rightRail.height());
                        $rightRailAdContainer.addClass("fixed");
                    } else {
                        $rightRail.css('height', 'auto');
                        $rightRailAdContainer.removeClass("fixed");
                    }
                }
            } else {
                $rightRailAdContainer.removeClass("fixed");
            }

            // Right Rail Bottom Ad Sticky
            // For layouts with Tablet size breakpoint for Right Sidebar response
            if (hasRightRailAd() && SCM.SiteJS.getViewportWidth() > 1023) {
                if (currPage === "articlebygroup") {
                    // Undo CSS bottom margin for bottom Ad on articles by group.
                    $(".pg_articlesbygroup #Sidebar .widget:last-of-type").css('margin-bottom', '0');
                }
                if (currPage === "articlebygroup" || currPage === "selfserve") { // Issue, Search Pages
                    $scrollHeight =
                        50 +
                        $rightRail.height() +
                        $header.height(); // +50 for main padding
                    adBreakScrollPosY = $scrollHeight - $rightRailAdContainer.height() - 24; // top: 24 for Ad w/out fixed menu.
                    if (lastScrollPosY >= adBreakScrollPosY) { // padding, including responsive article menu
                        $rightRail.css('height', $rightRail.height());
                        $rightRailAdContainer.addClass("fixed");
                    } else {
                        $rightRail.css('height', 'auto');
                        $rightRailAdContainer.removeClass("fixed");
                    }
                }
            } else {
                $rightRailAdContainer.removeClass("fixed");
            }
        }

    }

    // Cache value
    var _isToolbarCloned = null;
    function isToolbarCloned() {
        if (_isToolbarCloned === null) {
            _isToolbarCloned = $stickyToolbar.children().length;
        }
        return _isToolbarCloned;
    }

    function cloneToolbarToStickyToolbar() {
        if (!isToolbarCloned()) {
            var $clone = $toolbarWrap.clone();
            $stickyToolbar.append($clone);
            if (typeof addthis !== "undefined") {
                addthis.toolbox(".js-sticky-toolbar");
            }
            _isToolbarCloned = true;
        }
    }

    function updateArticleLeftNav() {

        var guardianAdHeight = 0;
        if ($adTopConfig === "guardian" && hasTopAd()) {
            guardianAdHeight = $adBannerTop.height();
        }

        if (lastScrollPosY >= $header.height()
                            + $header.offset().top
                            + guardianAdHeight
                            - articleLeftNavStickyOffset) {

            // Article page
            if (currPage === "article") {

                cloneToolbarToStickyToolbar();

                $leftNavColumn.addClass("stuck");
                $leftNav.css('top', '55px');
                $articleBrowseMobileNav.addClass("stuck");
            }

            //Standard Chapter page
            if (currPage === "chapter") {
                cloneToolbarToStickyToolbar();

                $leftNavColumn.addClass("stuck");
                $leftNav.css('top', '55px');
            }

            // Search Results (only for tablet/mobile)
            if (currPage === "search" && SCM.SiteJS.getViewportWidth() <= 1023) {
                $srFilters.addClass("stuck");
            }

        } else {
            // remove fixed from all 'sticky' elements
            if (currPage === "article" || currPage === "search" || currPage === "chapter") {
                $leftNav.css('top', '0px');
                $stickyElements.removeClass("stuck");
            }
        }
    }

    function updateSearchStickyToolbar() {
        if (currPage === "search" && SCM.SiteJS.getViewportWidth() <= 1023) {
            if (lastScrollPosY >= $header.height() + 148 + 70) {
                // Search Results (only for tablet/mobile)
                $srFilters.addClass("stuck");
                $srFilters.next().css('margin-top', '70px');

            } else {
                // remove fixed from all 'sticky' elements
                $stickyElements.removeClass("stuck");
                $srFilters.next().css('margin-top', '0px');
            }
        }
    }

    function updateIssueLeftNav() {
        var $issueDropdownWrap = $('.js-issue-dropdown-wrap');
        var issueDropdownBottomMargin = parseInt($issueDropdownWrap.css('margin-bottom').replace('px', ''));

        if (SCM.SiteJS.getViewportWidth() > 1023) {
            if (lastScrollPosY >= $header.height()
                                + $issueDropdownWrap.height()
                                + issueDropdownBottomMargin * 2
                                + $header.offset().top) {
                // Issue Results
                $leftNavColumn.addClass("stuck");
            } else if (currPage === "issue") {
                $leftNavColumn.removeClass("stuck");
            }
        }

        if (lastScrollPosY >= $header.height()
                            + $issueDropdownWrap.height()
                            + issueDropdownBottomMargin * 2
                            + $header.offset().top
                            + $leftNavColumn.height() + 30) {

            $issueBrowseMobileNav.addClass("stuck");
            if (SCM.SiteJS.getViewportWidth() <= 1023) {
                $issueBrowseMobileNav.parent().css('padding-top', ($issueBrowseMobileNav.height() + 32) + 'px');
            }

        } else if (currPage === "issue") {

            $issueBrowseMobileNav.removeClass("stuck");
            if (SCM.SiteJS.getViewportWidth() <= 1023) {
                $issueBrowseMobileNav.parent().css('padding-top', '0px');
            }

        }// >= 620
    }

    function updateAdvertScrollDelay() {
        if ($adTopConfig === "scrolldelay" && $useAdTopDelay === true && hasTopAd()) {
            if (lastScrollPosY >= $header.height() - 290) {
                $adBannerTop.addClass("fixed");
                $mainPage.addClass("master-container-sticky");
            }
            else {
                $adBannerTop.removeClass("fixed");
                $mainPage.removeClass("master-container-sticky");
            }
        }
    }

    function updateAdvertGuardian() {
        if ($adTopConfig === "guardian" && hasTopAd()) {
            if (lastScrollPosY >= $header.height() - 290 && lastScrollPosY < 220) {
                $adBannerTop.addClass("fixed");
                $adBannerTop.removeClass("guardian-scrolled");
                $mainPage.addClass("master-container-sticky");
                $(".journal-header").show();
            }
            else if (lastScrollPosY >= 220) {
                $adBannerTop.removeClass("fixed");
                $adBannerTop.addClass("guardian-scrolled");
                $mainPage.addClass("master-container-sticky");
                $(".journal-header").hide();
            }
            else {
                $adBannerTop.removeClass("fixed");
                $adBannerTop.removeClass("guardian-scrolled");
                $mainPage.removeClass("master-container-sticky");
                $(".journal-header").show();
            }
        }
    }

})(SCM.StickyElements = SCM.StickyElements || {}, jQuery);
/**
* Society Links Module
* Any Society Links related Javascript will go here.
*/
var SCM = SCM || {};
SCM.Utilities = SCM.Utilities || {};

// replace place holder origurl query string parameter value with the current url
SCM.AddReturnUrlToSocietyLinks = (function () {
    var returnUrl = encodeURIComponent(window.location.href);
    $('.society-links-logo, .society-links-url').each(function () {
        if (typeof placeholderReturnUrlValue !== 'undefined' && placeholderReturnUrlValue.length > 0)
        {
            $(this).attr('href', $(this).attr('href').replace(placeholderReturnUrlValue, returnUrl));
        }
    });
});
// ----
// This is where all of the site-specific JS goes. This is the site's main JS file, so make your JS defensive.
// It's created using the JS Module Pattern (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
// Usage: SCM.SiteJS.functionName();  Can be used anywhere in the application.
// ----

var SCM = SCM || {};

(function (ns, $, accessIcons) {

    // ----
    // private variables and functions
    // ----
    var $body = $('body'),
        $articleBrowseMobileNav = $('.js-article-browse-mobile-nav'),
        $articleBrowseMobileInner = $('.js-article-browse-mobile-nav-inner'),
        $filterList = $('.search-wrap-filters'),
        $fullMobileReset = false,
        $mobileMenuOpen = false,
        $mobileSearchOpen = false,
        $navbarSearch = $(".navbar-search"),
        $navbarSearchContainer = $(".navbar-search-container"),
        $closeNavSearch = $(".js_close-navsearch"),
        $expandNavSearch = $(".js_expand-navsearch"),
        $navbarMenu = $(".navbar-menu, .navbar-search-collapsed"), // fade these in/out from 931px to 1100px
        $navbarSearchElements = $(".navbar-search-advanced, .navbar-search-close, .navbar-search"), // fade these in/out from 931px to 1100px
        $toolbarWrap = $('.toolbar-wrap'),
        $toolbarInnerWrap = $('.toolbar-inner-wrap'),
        $viewOption = "Basic"; $('#hfViewOption').val(); //Based on Client's configuration setting, set the appropriate default value.

    // ----
    // Many Pages / Global
    // ----

    ns.setBlockLink = function () {
        $(document).on('click', '.js-widget-dynamic-entry', function (e) {
            var destination = $(e.currentTarget).data('resource-url');
            if (destination) {
                window.location = destination;
            }
        });
    }

    ns.setAllLinksTarget = function () {
        $('a[target]').not('.openInAnotherWindow').each(function () {
            $(this).attr('target',"");
        });
    };

    ns.getNewSelectedFilter = function () {
        var $listItems = $filterList.children('li');
        $listItems.on('click', function () {
            var $this = $(this);
            $listItems.removeClass('selected');
            $this.addClass('selected');
            SCM.SiteJS.setSelectedSearchFilter();
        });
    };

    ns.initSelfServeNavigation = function () {
        var $currentLink = $('.js-selfserve-navigation-menu a[href="' + window.location.pathname + '"]');
        $currentLink.addClass('ss-currentPage');
        $currentLink.parents('ul.selfserve-nav-menu-child-list').addClass('open');
        $currentLink.parents('ul.selfserve-nav-menu-child-list').siblings('button.selfserve-subnav-toggle').removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down');
    }

    ns.toggleSelfServeNavigation = function () {
        $(".selfserve-subnav-toggle, .selfserve-parent-toggle").on('click', function (e) {
            var $this = $(this),
                $nearestSublist = $(this).siblings('.selfserve-sublist');

            e.preventDefault(); // stop button from submitting the page form

            $this.hasClass('icon-general-arrow-filled-right') ? $this.removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down') : $this.removeClass('icon-general-arrow-filled-down').addClass('icon-general-arrow-filled-right');
            $nearestSublist.hasClass('open') ? $nearestSublist.removeClass('open') : $nearestSublist.addClass('open');
        });
    };


    ns.getViewportWidth = function () {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    };


    ns.initLazyLoad = function () {
        $("img.contentFigures, img.inlineGraphics, img.lazy").lazyload(
            { skip_invisible: false }
        );
    };


    ns.initFoundation = function () {
        $(document).foundation();
    };
    
    ns.loadAllImagesIfUserIsAboutToUseJumpLinks = function () {
        $('#LeftNavSticker').hover(function () {
            $(".lazy").each(function () {
                var $this = $(this);

                $this.attr('src', $this.attr('data-original'));
            });
        });
    };


    ns.showAuthorInfo = function () {
        $(".al-author-name .linked-name, .al-author-name-more .linked-name, .linked-name-byline, .al-author-footnotes .js-linked-footnotes").on('click', function (e) {
            e.stopPropagation();
            $('.al-author-info-wrap').removeAttr('style');
            $(this).siblings('.al-author-info-wrap').show();

            SCM.ScholarlyiQ.trackOnPageEvent('article-author-' + $(this).text());
        });
        $(document).click(function () {
            $('.al-author-info-wrap').hide().removeAttr('style');
        });
    };

    ns.addAuthorFootnote = function() {
        $(".al-author-name, .al-author-name-more").each(function() {
            var $authorNote = $(this).find('.info-card-note .xref-fn');
            if ($authorNote.length && $authorNote.text() === "*") {
                var $footNote = $('<sup/>').append($authorNote.html());
                $footNote.insertAfter($(this).find('.linked-name'));
                $authorNote.remove();
            }
            if ($(this).find('.info-author-correspondence').length) {
                // Need to account for hidden delimiters as well
                var $authorDelim = $(this).find('span[class^="delimiter"]');
                if ($authorDelim.length) {
                    $authorDelim.prepend('<i class="icon-general-mail"></i>');
                }
                else {
                    $(this).find('.linked-name').append('<i class="icon-general-mail"></i>');
                }
            }
        });
    };


    ns.showHideDropDown = function () {
        $('.selectDropdown').on('click', function (e) {
            $('.dropdown').hide().removeClass('open');
            e.stopPropagation();
            $(this).siblings('.dropdown').slideToggle('300', 'linear').toggleClass('open');
        });

        $(document).click(function () {
            $('.dropdown').hide().removeClass('open');
        });
    };


    ns.showMoreRelatedContent = function (viewMoreSelector, hideMeSelector) {
        $(viewMoreSelector).click(function () {
            var $this = $(this);
            $this.closest('.related-section-box, .widget-RelatedBookContent').find(hideMeSelector).toggleClass('show-item');
            $this.toggleClass('show-less').find('i').toggleClass('icon-show').toggleClass('icon-hide');
            $this.hasClass('show-less') ? $this.find('span').text('See Less') : $this.find('span').text('See More');
        });
    };


    ns.showRelatedBookWidgetIfHasContent = function () {
        // This may (or may not) be a temporary function. We able to standardize the related book widget with the other related widgets (relatedgbos, relatedmultimedia).
        // Those widgets are such that if there is no content, a particular div is never output and so no styles appear on the page. However,
        // relatedbook widget was already being used by WK
        $('.widget-RelatedBookContent').each(function () {
            var $this = $(this);

            if ($this.find('*').length > 5) {
                $this.addClass('show');
            }
        });
    };


    ns.showSpinner = function () {
        function spinner() {
            $('.preloader-wrap').removeClass('hide').addClass('active');
        };

        SCM.QueryBuilder.defaults.beforeSearch = spinner;
        $(".pagination").on('click', spinner);
    };


    ns.setSelectedSearchFilter = function () {
        var selected = $filterList.children('.selected').text();
        $('.selected-text').text(selected);
    };


    ns.initFilterClickEvent = function () {
        $('.filter-wrap').on('click', function (e) {
            $filterList.hide();
            e.stopPropagation();
            $filterList.toggle();
        });

        $(document).click(function () {
            $filterList.hide();
        });
    };

    ns.launchGetCitationModal = function () {
        $('[data-reveal-id="getCitation"]').click(function () {
            $('#getCitation').foundation('reveal-modal', 'open');
        });
    };
    ns.launchAddAlertModal = function () {
        $('[data-reveal-id="addArticleUpdateAlert"]').click(function () {
            $('#AddAlert').foundation('reveal-modal', 'open');
        });
    };
    ns.launchEmailUserModal = function () {
        $('[data-reveal-id="emailUsernameModal"]').click(function () {
            $('#emailUserName').foundation('reveal-modal', 'open');
        });
    };

    ns.showFullDisclaimer = function () {
        $(document).on('click', '.disclaimer-text', function () {
            $(this).closest('.disclaimer-text').find('.js-disclaimer').toggleClass('hide');
        });
    };


    // ----
    // START: Mobile Site Nav & Search
    // ----
   

    /**********************************************************************
    * Close expanded navbar search between 931px and 1100px
    **********************************************************************/
    ns.closeNavbarSearch = function () {

        $closeNavSearch.on('click', function () {
            $navbarMenu.fadeToggle(); // fade in
            $navbarSearchElements.fadeToggle(); // fade out
            $navbarSearchContainer.toggleClass('active');
        });
    };

    /**********************************************************************
     * Expands hidden navbar search between 931px and 1100px
     **********************************************************************/
    ns.expandNavbarSearch = function () {

        $expandNavSearch.on('click', function () {
            $navbarSearchContainer.toggleClass('active');
            $navbarMenu.fadeToggle(); // fade out
            $navbarSearchElements.fadeToggle(); // fade in
        });
    };

    ns.toggleSearchCover = function () {
        if ($('.sf-facet').length) {
            $('.sf-facet').click(function(){ 
                $(document).ajaxStart(function(){
                    $('.info-inner-cover').removeClass("uncovered");
                    $('.info-inner-cover').addClass("covered");
                });
                $(document).ajaxComplete(function () {
                    $('.info-inner-cover').removeClass("covered");
                    $('.info-inner-cover').addClass("uncovered");
                });
            });
        };
    };

    ns.calculateResetState = function ($otherMenuState) {
        $otherMenuState ? $fullMobileReset = true : $fullMobileReset = false;
        SCM.SiteJS.resetMobileSiteNav($fullMobileReset);
    };


    ns.toggleMobileLanguageSubmenu = function () {
        $('.mobile-header-language').on('click', function () {
            $('.mobile-language-submenu').slideToggle();
        });
    };


    ns.toggleMobileSiteMenuSubnav = function () {
        $('div.dropdown-menu ul.site-menu li.site-menu-item').on('click', function () {
            var $this = $(this),
                $thisArrow = $this.children('.mobile-nav-arrow');
            $this.children('ul.site-menu').slideToggle();
            $thisArrow.hasClass('icon-general_arrow-right') ? $thisArrow.removeClass('icon-general_arrow-right').addClass('icon-general_arrow-down') : $thisArrow.removeClass('icon-general_arrow-down').addClass('icon-general_arrow-right');
        });
    };


    ns.toggleMobileSignInForm = function () {
        var $mobileLogin = $('.mobile-login'),
            $mobileSigninNavArrow = $('.mobile-signin-nav-arrow');

        // The mobile login form works a little differently - can't have it toggle closed when the li is clicked
        $('.mobile-menu-link-wrap').on('click', function () {
            if (!$mobileLogin.hasClass('open')) {
                $mobileLogin.addClass('open').slideToggle();
                $mobileSigninNavArrow.hide();
                //$thisArrow.removeClass('icon-general_arrow-right').addClass('icon-general_arrow-down');
            }
        });

        // close button for mobile login form
        $('.site-menu .mobile-login-form').on('click', '.mobile-login-icon', function () {
            $mobileLogin.removeClass('open').slideToggle();
            $mobileSigninNavArrow.show();
        });
    };


    ns.resetMobileSearchFilters = function () {
        $('.sf-facets, .sf-facet-list').removeAttr('style');
        $('.sf-group-header-icon').removeClass('icon-general_arrow-down').addClass('icon-general_arrow-right');
    };

    ns.resetMobileSiteNav = function ($fullReset) {
        // for Global Header
        $('.header-bottom, .navigation, #MicrositeSearch, .arrow-nav, .arrow-search, .mobile-language-submenu').removeAttr('style');
        $('.mobile-search-toggle, .mobile-menu-toggle, .arrow-nav, .arrow-search').removeClass('active');
        $('#MicrositeSearch').removeClass('active-tablet');
        if ($fullReset) {
            // if $fullReset == true, user scrolled or resized
            $mobileMenuOpen = false;
            $mobileSearchOpen = false;
            // otherwise, we're just toggling between mobile menu items
        }
    };


    ns.toggleMobileSearch = function () {
        $('.mobile-search-toggle').on('click', function () {
            SCM.SiteJS.calculateResetState($mobileMenuOpen, $mobileSearchOpen);
            $mobileSearchOpen === false ? $mobileSearchOpen = true : $mobileSearchOpen = false;
            SCM.SiteJS.toggleResponsiveMenus($('.mobile-search-toggle, .arrow-search'), $mobileSearchOpen, $('#MicrositeSearch'));
        });
    };


    // ----
    // START: Responsive Left Column
    // ----
    ns.toggleResponsiveLeftColumn = function () {
        var $pageColLeft = $(".page-column--left");

            $(document.body).removeClass('noscroll'); // remove if page reloads as a result of a filter being selected
            
            $('.js-main').on('click', '.toggle-left-col__search, .toggle-left-col__article', function (e) {
                e.preventDefault();
                $(document.body).addClass('noscroll');
                $pageColLeft.show().addClass('js-filters-open');
                if (!navigator.userAgent.toLowerCase().includes('mozilla')) {
                    $(document).bind('touchmove', function (e) {
                        e.preventDefault();
                    });
                }

                $(document).ajaxComplete(function () {
                    $(document.body).removeClass('noscroll');
                    $pageColLeft.removeClass('js-filters-open');
                    $(document).unbind('touchmove');
                    ns.initFoundation();
                });
                
            });


            // due to designs, Issue has a different mobile layout
            $('.toggle-left-col__issue').on('click', function (e) {
                e.preventDefault();
                $(document.body).addClass('noscroll');
                $('.issue-dropdown-wrap').hide();
                $(".responsive-issue-nav").show();
                if (!navigator.userAgent.toLowerCase().includes('mozilla')) {
                    $(document).bind('touchmove', function (e) {
                        e.preventDefault();
                    });
                }
            });

            $('.toggle-left-col__close').on('click', function (e) {
                e.preventDefault();
                $(document.body).removeClass('noscroll');
                $pageColLeft.removeClass('js-filters-open');
                $(".page-column--left, .responsive-issue-nav, .issue-dropdown-wrap").removeAttr('style');
                $(document).unbind('touchmove');
                ns.initFoundation(); // reactivate sticky/topbar
            });
        };

    // ----
    // END: Responsive Left Column
    // ----
    


    ns.toggleMobileMenu = function () {
        $('.mobile-menu-toggle').on('click', function () {
            SCM.SiteJS.calculateResetState($mobileSearchOpen, $mobileMenuOpen);
            $mobileMenuOpen === false ? $mobileMenuOpen = true : $mobileMenuOpen = false;
            SCM.SiteJS.toggleResponsiveMenus($('.mobile-menu-toggle, .arrow-nav'), $mobileMenuOpen, $('.navigation'));
        });
    };


    ns.toggleResponsiveMenus = function ($makeActive, $openState, $classesToToggle) {
        var $headerBottom = $('.header-bottom');
        if ($openState) {
            // open responsive menu
            $makeActive.addClass('active');
            $classesToToggle.show();
            $headerBottom.slideToggle();
        } else {
            // close responsive menu
            $makeActive.removeClass('active');
            $headerBottom.toggle();
            $classesToToggle.delay(50).hide();
            // make sure menu is hidden before contents inside disappear
        }
    };

    // ----
    // END: Mobile Site Nav & Search
    // ----

    // ----
    // END: Mobile Article Navigation
    // ----


    // ----
    // Content Pages
    // ----

    ns.showFullAuthorList = function () {
        var $showMoreLink = $('.meta-authors--etal');
        var $remainingAuthors = $('.meta-authors--remaining');
        var $limitedAuthors = $('.meta-authors--limited');
        var $hiddenDelimiter = $limitedAuthors.find('.delimiter-hidden');

        $showMoreLink.on('click', function (e) {
            e.preventDefault();
            $showMoreLink.removeClass('is-active');
            $showMoreLink.attr('aria-hidden', true);
            $remainingAuthors.addClass('is-active');
            $remainingAuthors.attr('aria-hidden', false);

            if ($hiddenDelimiter) {
                $hiddenDelimiter.removeClass("delimiter-hidden")
                $hiddenDelimiter.addClass("delimiter")
            }

        });
    };

    // lazy load is triggered by scroll. If we append this content into a modal -- it might not appear.
    // This forces the images to appear
    ns.showImages = function ($obj) {
        $obj.find('.contentFigures').each(function () {
            var elem = $(this);
            if (elem.attr('src').toLowerCase().indexOf("grey.gif") >= 0) {
                elem.attr('src', elem.attr('data-original'));
            }
        });
    };


    // There is generic modal div wrapper in site.master where we append any content that needs to be put in a modal
    ns.openRevealModal = function ($obj) {
        var modal = $('#revealModal');
        modal.find('#revealContent').empty().prepend($obj.children().clone());
        modal.foundation('reveal', 'open');
        SCM.SiteJS.showImages(modal);
        SCM.SiteJS.restrictedImages();
    };


    ns.revealFigsTablesInModal = function () {
        var modalTriggerElems = '.xref-bibr, .xref-fn, .link-reveal, .table-graphic, .caption-title';
        var needSubscriptionModal = $('#NeedSubscription');

        $body.on('click', modalTriggerElems, function () {
            var $this = $(this);
            var revealId = $this.attr('reveal-id') ? $this.attr('reveal-id') : $this.attr('data-id');
            var revealContent = $('[content-id="' + revealId + '"]').first();
            revealContent = revealContent.length ? revealContent : $('[content-id="' + revealId.toLowerCase() + '"]').first();

            // Handle range of references. Ex: (7-10)
            if (revealId.length && !revealContent.length) {
                var resArry = revealId.split(" ");
                if (resArry.length >= 3) {
                    var rangeContent = $('<div/>');
                    var startItem = resArry[0];
                    var endItem = resArry[resArry.length-1];

                    var rangeRevealContent = $('[content-id="' + startItem + '"]').first();
                    rangeRevealContent = rangeRevealContent.length ? rangeRevealContent : $('[content-id="' + startItem.toLowerCase() + '"]').first();
                    if (rangeRevealContent.length) {
                        rangeContent.append(rangeRevealContent.children().clone());
                        rangeContent = ns.getAllReferencesInRange(rangeRevealContent, rangeContent, endItem);
                    }
                    revealContent = rangeContent.html().length > 0 ? rangeContent : "";
                }
            }

            // Brightcove HTML5 player doesn't work with cloned content
            if ($(revealContent).hasClass('video-modal') || $(revealContent).hasClass('audio-modal')){
                revealContent.foundation('reveal', 'open');
            }
            else {
                // Found the figure or table? Open it in reveal modal. Otherwise, you must not have access to the content and
                // we'll show you the need account message.
                revealContent.length ? SCM.SiteJS.openRevealModal(revealContent) : needSubscriptionModal.foundation('reveal', 'open');
            }
        });

    };

    ns.revealFeaturedFigureInModal = function () {
        $('.issue-featured-image a').on('click', function () {
            //clone the HTML then replace small image url with regular size image url
            var revealContent = $(this).closest('.image-synopsis-wrap').html();
            var modal = $('#revealModal');
            var featuredfigureurl = $(this).data("featuredfigureurl")
            if (featuredfigureurl) {
                modal.find('#revealContent').empty().prepend(revealContent);
                $('#revealContent img').attr('src', featuredfigureurl);
                modal.foundation('reveal', 'open');
            }
        });
    }


    ns.getAllReferencesInRange = function (elem, content, endValue) {
        var nextElem = elem.next();
        var revealId = nextElem.attr('content-id');
        if (revealId.length) {
            content.append(nextElem.children().clone());
            var endRange = (revealId === endValue) || (revealId === endValue.toLowerCase());
            if (!endRange) {
                ns.getAllReferencesInRange(nextElem, content, endValue);
            }
        }
        return content;
    };


    ns.showUnAuthenticatedSpans = function () {
        // For un-authenticated users, replace reveal-modal links with spans, since target of link is 99.99% likely to be missing
        $(document).ready(function () {
            var hasAccess = $('div[data-widgetname="ArticleFulltext"] span#UserHasAccess').attr('data-userHasAccess');
            if (hasAccess && hasAccess.length && hasAccess.toLowerCase() === 'false') {
                var revealModalLinks = $('div[data-widgetname="ArticleFulltext"] a[data-reveal-id]');
                revealModalLinks.each(function () {
                    $(this).replaceWith(function () {
                        var anchorHtml = this.innerHTML;
                        return '<span>' + anchorHtml + '</span>';
                    });
                });
            }
        });
        // TODO: OP: implement for book chapters too
    };
 
    // ----
    // START: Site Header
    // ----

    // Mobile Nav Dropdowns
    ns.oupHeaderDropdowns = function () {

        $(".mobile-search-toggle").on('click', function (e) {
            e.preventDefault();
            var $thisParameter = $(this);

            SCM.SiteJS.manageMobileDropdowns($thisParameter, ".mobile-search-dropdown");
        });

        $(".mobile-account-toggle").on('click', function (e) {
            e.preventDefault();
            var $thisParameter = $(this);

            SCM.SiteJS.manageMobileDropdowns($thisParameter, ".mobile-account-dropdown");
        });

        $(".mobile-nav-toggle").on('click', function (e) {
            e.preventDefault();
            var $thisParameter = $(this);

            SCM.SiteJS.manageMobileDropdowns($thisParameter, ".mobile-nav-dropdown");
        });
    };

    ns.manageMobileDropdowns = function (thisObject, dropdownClass) {
       
            if ($(".dropdown-panel").hasClass('is-active')) {
                // a panel is already active
                if (thisObject.hasClass('is-active')) {
                    // the clicked panel is already active - slideToggle to close it
                    $(dropdownClass).slideToggle().removeClass('is-active');
                    thisObject.removeClass('is-active');
                } else {
                    // a different panel is activated ...
                    $(".mobile-dropdown-toggle").removeClass('is-active');
                    $(".dropdown-panel-wrap").children(".is-active").slideToggle().removeClass('is-active');
                    // ... and open this one
                    thisObject.addClass('is-active');
                    $(dropdownClass).delay(400).slideToggle().addClass('is-active');
                }
            } else {
                // no panels were open - make this one active
                thisObject.addClass('is-active');
                $(dropdownClass).slideToggle().addClass('is-active');
            }
       
    };

    //Don't confuse with: toggleMobileSiteMenuSubnav() - which is for page-level mobile nav
    ns.toggleMobileDropdownSubnav = function () {

        // Due to the way links are generated for the header, $(".mobile-nav-arrow") is outside the <a> and thus targeted separately
        var $navLink = $(".dummy-link, .mobile-nav-dropdown .site-menu-item .mobile-nav-arrow, .mobile-account-dropdown .site-menu-item .mobile-nav-arrow");

        $navLink.on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                $targetArrow = $this;

                // Determine if $(".mobile-nav-arrow") was clicked directly, or is a sibling of the clicked element - for the purposes of changing the icon
                $this.hasClass("mobile-nav-arrow") ? $targetArrow = $this : $targetArrow = $this.siblings(".mobile-nav-arrow");

                $this.siblings(".site-menu-lvl-1").slideToggle();
                $targetArrow.hasClass('icon-general_arrow-down') ? $targetArrow.removeClass('icon-general_arrow-down').addClass('icon-general_arrow-up') : $targetArrow.removeClass('icon-general_arrow-up').addClass('icon-general_arrow-down');
        });
    };

    ns.toggleArticleToolbarDropdown = function () {
        var $toolbarLink = $(".drop-trigger");

        $toolbarLink.on('click', function (e) {
            e.preventDefault();

            var $this = $(this);

            $this.siblings("ul").slideToggle();
        });
    };

    //Login constants to indicate which source login form initiated login activity
    var SourceSignIn = 'signin';
    var SourceMobile = 'mobile';
    var SourceDesktop = 'desktop';

    ns.initSigninForm = function () {
            $mobileSignInLink = $('.mobile-account-dropdown ul li .mobile-account-signin'),
            $mobileSignInArrow = $(".mobile-account-dropdown ul li i.mobile-nav-arrow"),
            $mobileSignInForm = $(".mobile-account-dropdown ul li ul.individual-menu"),
            $desktopSignInForm = $(".dropdown-panel-signin"),
            $desktopInstitution = $(".dropdown-panel-institution");

        var loadSignInForm = function (source) {

            $desktopSignInForm.hasClass('active') ? $(".dropdown-panel-signin").hide().removeClass('active') : $(".dropdown-panel-signin").show().addClass('active');

            var loginUrl = SCM.SiteJS.GetLoginUrl(source);
            var captchaInstNum = SCM.SiteJS.GetCaptchaInstanceNumber(source);
            // Get the login form markup with AJAX
            $.ajax({
                url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + loginUrl,
                cache: false,
                data: {
                    captchaInstanceNumber: captchaInstNum
                },
                success: function (data) {
                    // Insert markup into appropriate desktop or mobile panels
                    SCM.SiteJS.UpdateLoginForm(source, data);
                    SCM.AddReturnUrlToSocietyLinks();
                }
            });
        };

        //DESKTOP signin from dropdown
        $(".oup-header-menu-item.desktop .dropdown-toggle.signin").on('click', function (e) {
            e.preventDefault();
            loadSignInForm(SourceDesktop);
        });

        //DESKTOP institution dropdown
        $(".dropdown-toggle.institution").on('click', function (e) {
            e.preventDefault();
            $desktopInstitution.hasClass('active') ? $desktopInstitution.hide().removeClass('active')  : $desktopInstitution.show().addClass('active');
        });

        var clickStartedOutsideLoginBox = false;
        $(document).mousedown(function (e) {
            var hideOnClick = $(".dropdown-panel-signin, .dropdown-panel-institution");

            clickStartedOutsideLoginBox = !$(hideOnClick).is(e.target) // if the target of the click isn't the container...
                && $(hideOnClick).has(e.target).length === 0; // ... nor a descendant of the container
        });

        // close the desktop signin form if clicking outside of it
        $(document).mouseup(function (e) {

            var hideOnClick = $(".dropdown-panel-signin, .dropdown-panel-institution");

            if (clickStartedOutsideLoginBox && !$(hideOnClick).is(e.target) // if the target of the click isn't the container...
                && $(hideOnClick).has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(hideOnClick).hide();
                hideOnClick.removeClass('active');
            }

            clickStartedOutsideLoginBox = false;
        });

        //MOBILE signin form
        $mobileSignInLink.on('click', function (e) {
            e.preventDefault();
            
            loadSignInForm(SourceMobile);

            //$mobileSignInForm.slideToggle();
            $mobileSignInArrow.hasClass('icon-general_arrow-down') ? $mobileSignInArrow.removeClass('icon-general_arrow-down').addClass('icon-general_arrow-up') : $mobileSignInArrow.removeClass('icon-general_arrow-up').addClass('icon-general_arrow-down');
            $mobileSignInLink.hasClass('active') ? $mobileSignInLink.removeClass('active') : $mobileSignInLink.addClass('active');
        });


        // button login
        $(document).on('click', '.signin-form .signin-button', function (e) {
            var $closestSigninForm = $(this).closest('.signin-form'),
                $closestSpinner = $closestSigninForm.find('.preloader-wrap');
            e.preventDefault();
            e.stopPropagation();

            SCM.SiteJS.Login($closestSigninForm, $closestSpinner);

            if (location.pathname !== '/sign-in') {
                SCM.ScholarlyiQ.trackOnPageEvent('site-signin');
            }
        });

        // Enter key login
        $(document).on('keypress', '.signin-form input.username, .signin-form input.password', function (e) {
            var $closestSigninForm = $(this).closest('.signin-form'),
                $closestSpinner = $closestSigninForm.find('.preloader-wrap');
            var code = e.keyCode || e.which;
            if (code === 13) {
                e.preventDefault();
                SCM.SiteJS.Login($closestSigninForm, $closestSpinner);
            }
        });

        // Log Out
        $(document).on('click', '.signout-button', function () {
            var returnUrl;

            // certain pages requires login
            if (location.pathname.toLowerCase().indexOf('/my-account') === 0) {
                returnUrl = '/';
            }
            else {
                returnUrl = location.pathname + location.search;
            }

            $.get('/LOGOUT', { dest: '/HTTPHandlers/SAMs/LogoutHandler.ashx' })
                .done(function () {
                    window.top.location.assign(returnUrl);
                }).fail(function () {
                    //temporary fix for shibboleth error
                    window.top.location.assign(returnUrl);
                });

            SCM.ScholarlyiQ.trackOnPageEvent('site-signout');
        });

        // Shibboleth login
        $(document).on('click', 'a.shibboleth-signin', function (e) {
            var currLocation = window.top.location;
            var shibbolethHandlerUrl = currLocation.origin + '/SHIBBOLETH?dest=' + encodeURIComponent(currLocation.pathname + currLocation.search);
            var shibbolethUrl = $(this).data('target').replace('{0}', encodeURIComponent(shibbolethHandlerUrl));

            window.top.location = shibbolethUrl;
        });

    };

    ns.initLoginFormDropdown = function () {
        $('.signin-form').on('click', 'a[data-target="register"]', function (e) {
            e.preventDefault();

            var returnUrl = $.deparam.querystring()["returnUrl"];
            if (returnUrl === undefined || returnUrl === null) {
                returnUrl = location.pathname + location.search;
            }

            window.top.location.assign('/my-account/register?returnUrl=' + encodeURIComponent(returnUrl));
        });
    };

    /* Note:  loginInstanceName referenced in the html input element is setup in the LoginForm
     * widget and if changed here will need to be changed in that widget as well.  The input
     * element is used to designate which login form captcha element on a page with multiple 
     * login forms is accessed by the user */
    ns.Login = function ($formContainer, $formSpinner) {

        var username = $formContainer.find('input.username').val();
        var password = $formContainer.find('input.password').val();
        var honeypotValue = $formContainer.find('#hpcName').val();

        if (honeypotValue.length > 0) {
            console.log('Honeypot captcha triggered. Are you a bot?');
            return;
        }

        if (username.length === 0 || password.length === 0) {
            $formContainer.find('.error').show();
            return;
        }

        var simpleCaptchaEnabled = $('div.register-captcha-text-simple-lf').length > 0;
        var normalCaptchaEnabled = $formContainer.find('div.register-captcha-text-normal-lf').length > 0;
        var source = $formContainer.find('input.loginInstanceName').val();
        $formSpinner.removeClass('hide');
        var captchaInstanceId = 0;
        var simpleCaptchaIdName = "txtCaptchaInputId";
        if (normalCaptchaEnabled) {
            switch (source) {
                case SourceSignIn:
                    captchaInstanceId = captcha0;
                    break;
                case SourceMobile:
                    captchaInstanceId = captcha1;
                    break;
                case SourceDesktop:
                    captchaInstanceId = captcha2;
                    break;
                default:
                    captchaInstanceId = 0;
                    break;
            }
        }
        else if (simpleCaptchaEnabled) {
            simpleCaptchaIdName += "-" + SCM.SiteJS.GetCaptchaInstanceNumber(source).toString();
        }
        $.post((App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/OUP/ValidateCaptcha',
            {
                captchaResponse: normalCaptchaEnabled ? grecaptcha.getResponse(captchaInstanceId) : '',
                simpleCaptchaResponse: simpleCaptchaEnabled ? document.getElementById(simpleCaptchaIdName).value : '',
                captchaInstanceNumber: SCM.SiteJS.GetCaptchaInstanceNumber(source)
            })
            .done(function (result) {
                if (result === '1' || (!normalCaptchaEnabled && !simpleCaptchaEnabled)) {
                    $.post('/LOGIN', { user: username, pass: password, dest: '/HTTPHandlers/SAMs/LoginHandler.ashx' })
                        .done(function (result) {
                            if (result === '1') {
                                if (location.pathname.toLowerCase() === '/sign-in' && $.deparam.querystring()["handoff_url"] !== null) { // Rievent SSO
                                    window.location.reload(); // the reload will trigger the redirect
                                }
                                else {
                                    SCM.SiteJS.loginReturnBack();
                                }
                            }
                            else {
                                $.post('/OUP/LoginFormIncrementFailedAttempts')
                                    .done(function () {
                                        var loginUrl = SCM.SiteJS.GetLoginUrl(source);
                                        var captchaInstNum = SCM.SiteJS.GetCaptchaInstanceNumber(source);
                                        $.ajax({
                                            url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + loginUrl,
                                            cache: false,
                                            data: {
                                                captchaInstanceNumber: captchaInstNum
                                            },
                                            success: function (data) {
                                                SCM.SiteJS.UpdateLoginForm(source, data);
                                                SCM.AddReturnUrlToSocietyLinks();
                                                $('.error').show();
                                                $formSpinner.addClass('hide');
                                            }
                                        });
                                    });
                            }
                        });
                }
                else {
                    var loginUrl = SCM.SiteJS.GetLoginUrl(source);
                    var captchaInstNum = SCM.SiteJS.GetCaptchaInstanceNumber(source);
                    $.ajax({
                        url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + loginUrl,
                        cache: false,
                        data: {
                            captchaInstanceNumber: captchaInstNum
                        },
                        success: function (data) {
                            SCM.SiteJS.UpdateLoginForm(source, data);
                            SCM.AddReturnUrlToSocietyLinks();
                            $('.error').show();
                            $formSpinner.addClass('hide');
                        }
                    });
                }
            });
    };

    ns.UpdateLoginForm = function(source, data) {

        // Insert markup into sign-in form that initiated the sign-in operation
        var normalCaptchaEnabled = false;
        if (source === SourceDesktop) {
            var $desktopSignInElement = $('.dropdown-panel-signin');
            $desktopSignInElement.html(data);
            // set the source value into the html hidden input so source can be detected when submitting
            $desktopSignInElement.find('input.loginInstanceName').val(SourceDesktop);
            /* Note:  the suffix -lf in register-captcha-text-normal-lf is hardcoded in LoginForm widget
             * so any changes here need a corresponding change in that widget */
            normalCaptchaEnabled = $desktopSignInElement.find('div.register-captcha-text-normal-lf').length > 0;
            if (normalCaptchaEnabled) {
                resetCaptchaElement2();
            }
        }
        else if (source === SourceMobile) {
            var $mobileSignInElement = $('.mobile-account-dropdown ul li ul.individual-menu');
            $mobileSignInElement.html(data);
            $mobileSignInElement.find('input.loginInstanceName').val(SourceMobile);
            normalCaptchaEnabled = $mobileSignInElement.find('div.register-captcha-text-normal-lf').length > 0;
            if (normalCaptchaEnabled) {
                resetCaptchaElement1();
            }
        }
        else if (source === SourceSignIn) {
            var $signInElement = $(".unauth-column.account");
            $signInElement.html(data);
            $signInElement.find('input.loginInstanceName').val(SourceSignIn);
            normalCaptchaEnabled = $signInElement.find('div.register-captcha-text-normal-lf').length > 0;
            if (normalCaptchaEnabled) {
                resetCaptchaElement();
            }
        }
    };

    ns.GetLoginUrl = function (source) {
        var loginUrl = '/OUP/LoginForm/LoginFormPopup';
        // Sign-in uses default configuration wherea other login forms use LoginFormPopup instance configuration
        if (source == SourceSignIn) {
            loginUrl = '/OUP/LoginForm/OUP_SignInPage_LoginForm';
        }
        return loginUrl;
    };

    ns.GetCaptchaInstanceNumber = function (source) {
        var captchaInstNum = 0;
        switch (source) {
            case SourceSignIn:
                captchaInstNum = 0
                break;
            case SourceMobile:
                captchaInstNum = 1;
                break;
            case SourceDesktop:
                captchaInstNum = 2;
                break;
            default:
                captchaInstNum = 0;
                break;
        }
        return captchaInstNum;
    };

    ns.loginReturnBack = function () {
        var returnUrl = $.deparam.querystring()["returnUrl"];

        if (returnUrl === undefined || returnUrl === null) {
            returnUrl = $.deparam.querystring()["redirectUrl"]; // for backward compatibility
        }

        // by default come back / refresh current page
        if (returnUrl === undefined || returnUrl === null || returnUrl === "") {
            returnUrl = window.top.location.pathname + window.top.location.search;
        }

        // exclude URLs which can only be accessed before sign-in
        var regex = /^\/((\w+\/)?sign-in|my-account\/forgot-password|my-account\/reset-password|my-account\/register)/i;
        if (regex.test(returnUrl)) {
            returnUrl = '/';
        }
       
        else if (/^\/[^\/]+/.test(returnUrl)) {
            // do nothing to the return url
        }     // check for a domain that we can validate

        // Special case for secureacademic.oup.com NARN-13051 HOTFIX
        else if (returnUrl.indexOf("secureacademic.oup.com") < 0) {
            // match a (candidate) domain name preceded by two slashes.
            // See the RFC 1738 (URL) and RFC 3492 (Punycode).  We observe a less strict format for our diagnostic.

            var returnDomainTest = returnUrl.match(/\/\/([^/]+(?:\.[^./]+)*)/i);
            if (returnDomainTest === null) {
                // NARN-5928: sanitize if no match for the known format
                returnUrl = "/";
            }
            else {
                // otherwise, make sure the domain matches our current domain
                var returnHostnameLower = returnDomainTest[1].toLowerCase();
                var windowHostname = window.top.location.hostname.toLowerCase();
                if (returnHostnameLower !== windowHostname) {
                    returnUrl = '/';
                }
                else {
                    // accept the URL with the same domain
                }
            }
        }


        // only allow same domain
        if (returnUrl !== '/' && returnUrl.indexOf("secureacademic.oup.com") < 0) {
            var returnDomainTest = returnUrl.match(/\/\/([^/]+\.)?([^./]+\.[^./]+)/i);
            if (returnDomainTest !== null && returnDomainTest[2].toLowerCase() !== window.top.location.hostname.match(/(.*\.)?([^.]+\.[^.]+)/i)[2].toLowerCase()) {
                returnUrl = '/';
            }
        }

        window.top.location.assign(returnUrl);
    };

    ns.alertLinks = function () {
        $('.userAlert a').each(function () {
            var userAlert = $(this);
            userAlert.on('click', function () {
                var marketingUrl = userAlert.data('additionalurl');
                var isUserLoggedIn = userAlert.data('userloggedin');
                var alerttype = userAlert.data('alerttype');
                if (isUserLoggedIn !== undefined && isUserLoggedIn.toLowerCase() === 'false') {
                    var returnUrl = $.deparam.querystring()["returnUrl"];

                    //override the returnUrl for New Issue Alert and Marketing Alert
                    if (userAlert.parent().hasClass('alertType-MarketingLink')) {
                        returnUrl = marketingUrl;
                    }

                    if (returnUrl === undefined || returnUrl === null) {
                        returnUrl = location.pathname + location.search;
                    }
                    if (alerttype !== undefined)
                    {
                        returnUrl = returnUrl + "#trigger-alerttype=" + alerttype;
                    }
                    window.location = '/sign-in?returnUrl=' + encodeURIComponent(returnUrl);
                } else if (marketingUrl !== undefined && marketingUrl.length) {
                    window.location = marketingUrl;
                }
                else {
                    SCM.SiteJS.showSignUpAlertInfo(userAlert);
                }
            });
        });
    };

    ns.showSignUpAlertInfo = function (userAlert) {
        $.ajax({
            url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/Toolbox/AlertsSignUp/AlertsSignUpPopup',
            cache: false,
            data: {
                alertType: userAlert.data('alerttype'),
                resourceId: userAlert.data('alertresourceid'),
                resourceType: userAlert.data('alertresourcetype'),
                email: userAlert.data('alertuseremail'),
                resourceName: userAlert.data('alertresourcename'),
                taxonomyName: userAlert.data('alerttaxonomyname')
            },
            dataType:'html',
            success: function (data) {
                $('.userAlertSignUp').html(data);
                var userAlertSignUpmodal = $('.userAlertSignUpModal');
                userAlertSignUpmodal.foundation('reveal', 'open');
                var scheduleSelect = $('.userAlertSignUp').find("#selectAlertFreqeuncy");
                var taxSelect = $('.userAlertSignUp').find("input.js-taxonomy-checkbox:checked");

                SCM.SiteJS.initTaxonomyArrows($('.userAlertSignUp'));
                
                $('.addUserAlert').on('click', function () {
                    var mainForm = $(this).parent();
                    var alertName = $(this).parent().find('.js-alert-name').val();
                    var taxonomies = $(this).parent().find('.js-taxonomy-checkbox:checked');

                    var error = false;
                    var errorMessage;
                    if (userAlert.data('alerttype') == 33) { // if it's a taxonomy search alert
                        if (!alertName) {
                            error = true;
                            SCM.SiteJS.showErrorMessage(mainForm, $('#errorAlertNameRequired'));
                                                    }
                        else if (taxonomies.length < 1) {
                            error = true;
                            SCM.SiteJS.showErrorMessage(mainForm, $('#errorSelectionRequired'));
                        }
                    }

                    // get all toplevel checked taxonomies (taxonomy search will automatically fill in child taxonomies)
                    var taxonomiesFiltered = taxonomies.filter(SCM.SiteJS.taxonomyFilterFunction);
                    var taxonomyIds = SCM.SiteJS.processTaxonomies(taxonomiesFiltered);

                    if (!error) {
                        SCM.SiteJS.addSignUpAlert(userAlert, scheduleSelect, alertName, taxonomyIds, mainForm);
                    }
                });
                $('.userAlertClose').on('click', function () {
                    userAlertSignUpmodal.foundation('reveal', 'close');
                });
            }
        });
    }

    ns.showEditAlertInfo = function (alertLink) {
        var userAlert = alertLink.parents(".email-alerts-content-row");
        $.ajax({
            url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/Toolbox/AlertsSignUp/AlertsSignUpPopup',
            cache: false,
            data: {
                alertType: userAlert.data('alerttype'),
                resourceId: userAlert.data('alertresourceid'),
                resourceType: userAlert.data('alertresourcetype'),
                email: userAlert.data('alertuseremail'),
                resourceName: userAlert.data('alertresourcename'),
                taxonomyName: userAlert.data('alerttaxonomyname'),
                existingAlert: userAlert.data('alert')
            },
            dataType: 'html',
            success: function (data) {
                $('.userAlertSignUp').html(data);
                var userAlertSignUpmodal = $('.userAlertSignUpModal');
                userAlertSignUpmodal.foundation('reveal', 'open');
                var scheduleSelect = $('.userAlertSignUp').find("#selectAlertFreqeuncy");
                var taxSelect = $('.userAlertSignUp').find("input.js-taxonomy-checkbox:checked");

                SCM.SiteJS.initTaxonomyArrows($('.userAlertSignUp'));

                $('.js-edit-user-alert').on('click', function () {
                    var mainForm = $(this).parent();
                    var alertName = $(this).parent().find('.js-alert-name').val();
                    var taxonomies = $(this).parent().find('.js-taxonomy-checkbox:checked');
                    var alertId = $("#AlertSignUp_AlertId").val();

                    var error = false;
                    var errorMessage;
                    if (userAlert.data('alerttype') == 33) { // if it's a taxonomy search alert
                        if (!alertName) {
                            error = true;
                            SCM.SiteJS.showErrorMessage(mainForm, $('#errorAlertNameRequired'));
                        }
                        else if (taxonomies.length < 1) {
                            error = true;
                            SCM.SiteJS.showErrorMessage(mainForm, $('#errorSelectionRequired'));
                        }
                    }

                    // get all toplevel checked taxonomies (taxonomy search will automatically fill in child taxonomies)
                    var taxonomiesFiltered = taxonomies.filter(SCM.SiteJS.taxonomyFilterFunction);
                    var taxonomyIds = SCM.SiteJS.processTaxonomies(taxonomiesFiltered);

                    if (!error) {
                        SCM.SiteJS.editTaxonomyAlert(alertId, userAlert, scheduleSelect, alertName, taxonomyIds, mainForm);
                    }
                });
                $('.userAlertClose').on('click', function () {
                    userAlertSignUpmodal.foundation('reveal', 'close');
                });
            }
        });
    }

    ns.taxonomyFilterFunction = function()
    {
        return $(this).parents('.taxonomy-child-list-item').parents('.taxonomy-child-list-item').children('.taxonomy-parent-label').find('.js-taxonomy-checkbox:checked').length < 1;
    }

    ns.initTaxonomyArrows = function(parentWindow)
    {
        parentWindow.find('.taxonomy-parent-arrow').on('click', function () {
            var $this = $(this);

            $this.parents('.taxonomy-label-wrap').siblings('.taxonomy-child-list').slideToggle();
            $this.hasClass('icon-general-arrow-filled-right') ?
                $this.removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down') :
                $this.removeClass('icon-general-arrow-filled-down').addClass('icon-general-arrow-filled-right');
        });

        parentWindow.find('.js-taxonomy-checkbox').on('click', function () {
            if ($(this).is(":checked")) {
                // check all descendants
                var parentContainer = $(this).parent().parent();
                parentContainer.find('.js-taxonomy-checkbox').prop('checked', true);
            }
            else {
                // uncheck all descendants
                var parentContainer = $(this).parent().parent();
                parentContainer.find('.js-taxonomy-checkbox').prop('checked', false);

                // uncheck toplevel node (special case)
                $(this).closest('.taxonomy-node').children('.taxonomy-parent-label').find('.js-taxonomy-checkbox').prop('checked', false);

                // uncheck parent nodes that aren't the toplevel node
                $(this).parents('.taxonomy-child-list-item').children('.taxonomy-parent-label').find('.js-taxonomy-checkbox').prop('checked', false);
            }
        });
    }

    ns.showErrorMessage = function(main, messageDiv)
    {
        main.find('.js-message').hide();
        messageDiv.removeClass('hide');
        messageDiv.show();
    }

    ns.processTaxonomies = function(taxonomies)
    {
        var list = new Array();
        for(i = 0; i < taxonomies.length; i++)
        {
            var taxonomy = taxonomies[i];
            var id = taxonomy.attributes['data-id'].value;
            list.push(id);
        }

        return list;
    }

    ns.addSignUpAlert = function (userAlert, scheduleSelect, alertName, taxonomies, mainForm) {
        var scheduleId;
        if (scheduleSelect != null)
        {
            scheduleId = scheduleSelect.val();
        }
        $.ajax({
            url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/Toolbox/AddAlertsSignUpForTaxonomySearch/AddAlertsSignUpPopup',
            cache: false,
            data: {
                alertType: userAlert.data('alerttype'),
                resourceId: userAlert.data('alertresourceid'),
                resourceType: userAlert.data('alertresourcetype'),
                email: userAlert.data('alertuseremail'),
                resourceName: userAlert.data('alertresourcename'),
                scheduleId: scheduleId,
                alertName: alertName,
                taxonomyName: userAlert.data('alerttaxonomyname'),
                taxonomies: JSON.stringify(taxonomies)
            },
            dataType: 'html',
            success: function (data) {
                if (data != null) {
                    if (data.trim() === 'name-exists') {
                        // hardcoded in AlertsSignUp.cshtml
                        // The existing model doesn't allow for robust error types, and refactoring it would cause more problems than it solves
                        SCM.SiteJS.showErrorMessage(mainForm, $('#errorAlertNameExists'));
                    }
                    else if (data.trim() === 'search-exists') {
                        SCM.SiteJS.showErrorMessage(mainForm, $('#errorAlertSearchExists'));
                    }
                    else {
                        $('.userAlertSignUp').html(data);
                        var userAlertSignUpmodal = $('.userAlertSignUpModal');
                        userAlertSignUpmodal.foundation('reveal', 'open');
                        $('.userAlertClose').on('click', function () {
                            userAlertSignUpmodal.foundation('reveal', 'close');
                        });
                    }
                }
            }
        });
    }

    ns.editTaxonomyAlert = function (alertId, userAlert, scheduleSelect, alertName, taxonomies, mainForm) {
        var scheduleId;
        if (scheduleSelect != null) {
            scheduleId = scheduleSelect.val();
        }
        $.ajax({
            url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/Toolbox/EditAlertForTaxonomySearch/AddAlertsSignUpPopup',
            cache: false,
            type: 'POST',
            data: {
                alertId: alertId,
                scheduleId: scheduleId,
                alertName: alertName,
                taxonomyName: userAlert.data('alerttaxonomyname'),
                taxonomies: JSON.stringify(taxonomies)
            },
            dataType: 'html',
            success: function (data) {
                var responseObj = JSON.parse(data);
                if (responseObj != null) {
                    var messageElement;
                    if (responseObj.Success)
                    {
                        messageElement = $("#messageCustom");
                    }
                    else
                    {
                        messageElement = $("#errorCustom");
                    }

                    messageElement.html(responseObj.Message);
                    SCM.SiteJS.showErrorMessage(mainForm, messageElement);
                }
            }
        });
    }

    // ----
    // Search Results
    // ----
    ns.initSearchResultsSort = function () {
        var $sortOrderSelectOption = $(".sort-order-select-option"),
            $sortOrderSelect = $(".sort-order-select"),
            $preloaderWrap = $('.preloader-wrap');

        $sortOrderSelect.on('change', function () {
            var routename = $('#routename').val();
            var $newSortOrder = (routename === "")
                            ? '/search-results?' + $(this).val()
                            : '/' + routename + '/search-results?' + $(this).val();
            //console.log($newSortOrder);
            window.location = $newSortOrder;
        }); // END sortOrderSelect.on('change')

        $sortOrderSelectOption.on('click', function () {
            var lnk = $(this).find('option[value]');
            if (lnk.length) {
                $preloaderWrap.removeClass('hide');
            }
            // save selected sort order & details state to sessionStorage
            sessionStorage.detailsState = $viewOption;
        }); // END sortOrderListItem.on('click')

        $('.al-pageNumber,.sr-nav-previous,.sr-nav-next').on('click', function () {
            if (!$(this).hasClass('currentPage')) {
                $preloaderWrap.removeClass('hide');
                var url = $(this).attr('data-url')
                window.location = "search-results?"+ url;
            }
        });
    };

    // Disable rightclick on figure context for restricted images.
    ns.restrictedImages = function () {
        $('div.graphic-wrap[restricted]').each(function () {
            var copyrightMessage = $(this).children('.copy-right-statement');
            $(copyrightMessage).toggle(false);
            $(this).off('contextmenu').on('contextmenu', function () { // right click
                $(copyrightMessage).toggle();
                return false;
            });
            $(this).off('click').click(function() { // left click on link around image
                $(copyrightMessage).toggle();
                return false;
            });
            $(copyrightMessage).off('click').click(function () { // left click on copyright message
                $(copyrightMessage).toggle();
                return false;
            });
        });
    };

    ns.registerArticleListNewAndPopularCombinedMode = function() {
        $('.articleListNewAndPopular-mode').each(function() {
            var linkNewAndPopularMode = $(this);
            linkNewAndPopularMode.on('click',
                function (e) {
                    e.preventDefault();
                    $('.articleListNewAndPopular-mode').removeClass('active');
                    linkNewAndPopularMode.addClass('active');
                    var mode = linkNewAndPopularMode.data('mode');
                    var articleListNewPopContent = $('.articleListNewAndPopular-ContentView-' + mode);
                    if (!articleListNewPopContent.hasClass('hasContent')) {
                        SCM.SiteJS.getArticleListNewAndPopularContent(mode, articleListNewPopContent);
                        articleListNewPopContent.addClass('hasContent');
                    }
                    $('section[class*="articleListNewAndPopular-ContentView-"]').hide();
                    articleListNewPopContent.removeClass('hide');
                    articleListNewPopContent.show();
                });
        });
    }

    ns.getArticleListNewAndPopularContent = function (mode, articleListNewPopContent) {
        $.ajax({
            url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/PlatformArticle/ArticleListNewAndPopularContent/',
            cache: false,
            data: {
                mode: mode
            },
            dataType: 'html',
            success: function (data) {
                articleListNewPopContent.html(data);
            }
        });
    }

    // move submitcomment link.
    ns.moveSubmitCommentLink = function() {
        var $placeHolderSubmitComment = $('.submitCommentPlaceHolder');
        var $userComment = $('.widget-UserComment');
        $placeHolderSubmitComment.append($userComment);
    };

    // add user comment jumplink into article left nav
    ns.addUserCommentJumpLink = function() {
        var $articleLeftNav = $('.content-nav');
        if ($articleLeftNav.length) {
            var $jumplink = $('.comments-jumplink');
            $articleLeftNav.append($jumplink);
        }
    }


    // NARN-11152 support relocating and displaying special jump links even if section jump links are not present
    var relocateJumpLinks = function ($jumpLinks) {
        if ($jumpLinks.length) {
            // make sure the article contents title is visible
            $(".contents-title").show();

            // relocate the jump links
            // NOTE: the article left navigation element should always be present.
            var $articleLeftNav = $('.jumplink-list');
            $articleLeftNav.append($jumpLinks);
        }
    }

    ns.addDataSupplementsJumpLink = function () {
        var $dataSupplements = $('.dataSupplements-jumplink'); // typically in .widget-ArticleDataSupplements
        relocateJumpLinks($dataSupplements);
    }
    ns.addDataRepositoriesJumpLink = function () {
        var $dataRepos = $('.dataRepositories-jumplink'); // typically in .widget-ArticleDataRepositories
        relocateJumpLinks($dataRepos);
    }
    ns.addAuthorNotesJumpLink = function () {
        var $authorNotesTitle = $('.authorNotes-section-title');
        if ($authorNotesTitle.length) {
            var $authorLink = $(
                "<li class=\"section-jump-link head-1\"><div class=\"section-jump-link__link-wrap\">" +
                "<a class=\"jumplink js-jumplink scrollTo\" href=\"#authorNotesSectionTitle\">" + $authorNotesTitle.text() +
                "</a></div></li>"
            );
            relocateJumpLinks($authorLink);
        }
    }

    ns.toggleSearchResultsDetails = function () {

        var $switchContainer = $("#switch-container"),
             $switchPost = $("#switch-post"),
             $expandedView = $(".sri-expandedView");

        // Determine display setting
        if (sessionStorage.detailsState) {
            $viewOption = sessionStorage.detailsState;
        } else {
            if (typeof clientViewOption !== "undefined" && clientViewOption !== '') {
                $viewOption = clientViewOption;
            } else {
                $viewOption = $('#hfViewOption').val(); //Based on Client's configuration setting, set the appropriate default value.
            }
        }

        // Adjust DOM elements based on display setting
        if ($viewOption === "Expanded") {
            $switchContainer.removeClass("off").addClass("on");
            $switchPost.removeClass("off").addClass("on");
            $expandedView.removeClass("hide");
        } else if ($viewOption === "Basic") {
            $expandedView.addClass("hide");
        }

        // Save current display setting when clicking a pagination link
        $(".pagination").on('click', function () {
            if (typeof Storage !== 'undefined') {
                sessionStorage.detailsState = $viewOption;
            } else {
                sessionStorage.detailsState = $viewOption;
            }
        });

        // Change toggle button & display setting when it's clicked
        $switchContainer.unbind('click').on('click', function (e) {
            e.stopPropagation();
            $viewOption === "Expanded" ? $viewOption = "Basic" : $viewOption = "Expanded";
            $switchContainer.toggleClass("on off");
            $switchPost.toggleClass("on off");
            $expandedView.hasClass("hide") ? $expandedView.removeClass("hide") : $expandedView.addClass("hide");
        });
    };

    var isFinishedAdjustRelatedTagsDisplay = false;
    ns.adjustRelatedTagsDisplay = function () {
        // step 1: create a variable for each type/row of tags (Keywords, Topic, Subject, etc)
        $('.article-metadata-panel:not(.solr-resource-metadata):not(:last)').remove();
        var $articleMetadataPanel = $('.article-metadata-panel:not(.solr-resource-metadata)').last(),
            $keywordGroupSection = $('.kwd-group'), //output through XSLT template <kwd-group>
            $relatedTopicTags = $('.related-topic-tags'),
            $taxonomies = $('.article-metadata-taxonomies'),
            $tocSections = $('.article-metadata-tocSections'),
            $editor = $('.wi-editors');
            $openScienceBadge = $('.wi-open-science-badge');

        // step 2: put those variables into an array
        var $tagContainerArray = [$keywordGroupSection, $relatedTopicTags, $taxonomies, $tocSections, $editor, $openScienceBadge];
        if (!$articleMetadataPanel.length) {
            // no abstract, use the standalone metadata panel
            $articleMetadataPanel = $('.article-metadata-standalone-panel');
            // make sure the standalone panel isn't empty before showing

            // NARN-7484: Position metadata-panel before main article text
            $('.widget-items').prepend($articleMetadataPanel);
        }

        // step 3: cycle through $tagContainerArray 
        for (i = 0; i < $tagContainerArray.length; i++) {
            // step 3b: if current item has content, append to $articleMetadataPanel
            if ($tagContainerArray[i].length) {
                $articleMetadataPanel.append($tagContainerArray[i]);
            }
        }

        if ($articleMetadataPanel.html()) {
            $articleMetadataPanel.show();
        }

        // remove empty metadata panels (client requirement)
        ns.removeEmpty(".article-metadata-panel");
        ns.removeEmpty(".article-metadata-standalone-panel");
        ns.removeEmpty(".access-state-logos");
        ns.removeEmpty(".article-pubstate");

        isFinishedAdjustRelatedTagsDisplay = true;
        window.dispatchEvent(new CustomEvent('adjustRelatedTagsDisplay.complete'));
    };

    ns.isFinishedAdjustRelatedTagsDisplay = function () { return isFinishedAdjustRelatedTagsDisplay; };

    ns.removeEmpty = function (selector) {
        var $elements = $(selector);
        for (var i = 0; i < $elements.length; i++) {
            var $element = $elements.eq(i);
            if ($element.children().length === 0) {
                var text = $element.text();
                if (!text || !text.trim()) {
                    $element.remove();
                }
            }
        }
    }

    ns.showPdfOnlyLink = function () {
        if($('.PdfOnlyLink').length && $('.toolbar-item.item-pdf').length){
            $('.toolbar-item.item-pdf').children().clone().appendTo('.PdfOnlyLink');
        }
    }

    ns.triggerAlertModalOnRedirect = function () {
        var alertType = $.bbq.getState("trigger-alerttype");
        if (alertType !== undefined)
        {
            $('.userAlert a[data-userloggedin="True"][data-alerttype=' + alertType + ']').click();
            $.bbq.removeState("trigger-alerttype");
        }
    }

    ns.triggerSaveSearchModelOnRedirect = function() {
        var saveSearch = $.bbq.getState("triggerSaveSearch");
        if (saveSearch === '1') {
            $('.lnkSaveSolrSearch').click();
            $.bbq.removeState("triggerSaveSearch");
        }
    }

    ns.configureMathjax = function () {
        MathJax.Hub.Config({
            CommonHTML: { linebreaks: { automatic: true } },
            "HTML-CSS": { linebreaks: { automatic: true } },
            SVG: { linebreaks: { automatic: true } },
            tex2jax: {
                // NARN-11771 : support '|$ mathematics $|'.  Note that \(...\) is retained since it was the default value of this field, though we don't necessarily support it.
                // See https://docs.mathjax.org/en/latest/options/preprocessors/tex2jax.html .
                inlineMath: [['|$', '$|'], ['\\(', '\\)']]
            }
        });

        if ($('#hdnAdConfigurationRightRail').val() === 'sticky') {
            return;
        }

        MathJax.Hub.Register.StartupHook("End", function () {
            if (screen.width < 1024) {
                return;
            }

            var columnWidth = $('.page-column-wrap').width();

            $('#ContentTab').on('click', '.js-mathjax-view-large', function (e) {
                var math = $(e.currentTarget);

                if (!math.hasClass('js-mathjax-view-large-expanded') && !math.prev().hasClass('js-mathjax-view-large-expanded')) {
                    var cloned = math.clone(false);
                    cloned.css('position', 'absolute');
                    cloned.addClass('js-mathjax-view-large-clone');
                    cloned.addClass('mathjax-view-large-expanded');
                    cloned.addClass('js-mathjax-view-large-expanded');
                    math.before(cloned);

                    var width = e.currentTarget.dataset.targetWidth;
                    var height = math.height();

                    var leftBound = $('.page-column-wrap').offset().left;
                    var rightBound = leftBound + columnWidth;

                    var margin = e.currentTarget.dataset.widthDifference;
                    var change = Math.ceil(margin / 2);
                    
                    var innerLeft = math.offset().left;
                    var innerRight = innerLeft + math.width();

                    var leftMax = innerLeft - leftBound;
                    var rightMax = rightBound - innerRight;

                    if (change < leftMax && change < rightMax) {
                        cloned.css('marginLeft', -change + "px");
                        cloned.css('marginRight', -change + "px");
                    }
                    else if (change < leftMax) {
                        var shift = margin - rightMax;
                        cloned.css('marginLeft', -shift + "px");
                    }

                    cloned.css('minHeight', Math.ceil(height) + "px");
                    cloned.css('width', width + "px");
                }

                if (math.hasClass('js-mathjax-view-large-expanded')) {
                    math.css('visibility', 'hidden');
                    math.next().css('visibility', '')
                } else {
                    math.css('visibility', 'hidden');
                    math.prev().css('visibility', '');
                }
            });

            $('#ContentTab .math span.MathJax').each(function (idx, elem) {
                var elemWidth = elem.offsetWidth + 2;
                var wrap = $(elem).parents('.formula-wrap');
                var width = wrap.width();
                if (elemWidth > width) {
                    wrap.addClass('js-mathjax-view-large')
                        .addClass('mathjax-view-large');

                    elemWidth = Math.min(elemWidth, 1200, columnWidth);
                    wrap[0].dataset.widthDifference = elemWidth - width;
                    wrap[0].dataset.targetWidth = elemWidth;
                }
            });

            $('#ContentTab .tex-math').each(function (idx, elem) {
                var elemWidth = elem.offsetWidth + 5;
                var wrap = $(elem).parents('.formula-wrap');
                var width = wrap.width();
                if (elemWidth > width) {
                    wrap.addClass('js-mathjax-view-large')
                        .addClass('mathjax-view-large');

                    elemWidth = Math.min(elemWidth, 1200, columnWidth);
                    wrap[0].dataset.widthDifference = elemWidth - width;
                    wrap[0].dataset.targetWidth = elemWidth;
                }
            });

            var checkScreenSize = function (m) {
                if (m.matches) {
                    $('.mathjax-view-large').removeClass('js-mathjax-view-large');
                } else {
                    $('.mathjax-view-large').addClass('js-mathjax-view-large');
                }
            }

            var mobileBreakpoint = window.matchMedia("(max-width: 1023px)");
            mobileBreakpoint.addListener(checkScreenSize);
            checkScreenSize(mobileBreakpoint);
        });
    }
    

    // ----
    // START: Acessibility Functions (ARIA)
    // ----

    ns.ariaToggleTable = function (ariaTarget) {
        var $ariaControl = $(ariaTarget + '-button'),
            $ariaIcon = $ariaControl.children('.collapse-icon');

        $ariaControl.on('click', function (e) {
            e.preventDefault();
            //toggle aria-expanded attribute
            $ariaControl.attr('aria-expanded') === 'true' ?  $ariaControl.attr('aria-expanded', 'false') : $ariaControl.attr('aria-expanded', 'true');
            // toggle arrow
            $ariaIcon.hasClass('icon-general-arrow-filled-down') ? $ariaIcon.removeClass('icon-general-arrow-filled-down').addClass('icon-general-arrow-filled-right') : $ariaIcon.removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down');
            //toggle active class & state on the target table to show/hide it
            $(ariaTarget).toggleClass('hide');
            $(ariaTarget).attr('aria-hidden') === 'false' ? $(ariaTarget).attr('aria-hidden', 'true') : $(ariaTarget).attr('aria-hidden', 'false');
        });
    };
    
    ns.initAriaControls = function () {
        //tables on: academic.oupdev.silverchair.com/[JOURNAL]/subscribe/SingleIssue & CurrentYear
        var $tables = $('[id^=collapsible-table-]');
        $tables.each(function (index) {
            SCM.SiteJS.ariaToggleTable("#collapsible-table-" + index);
        });
    };

    // ----
    // START: Issue Page: ArticleListAccess.cshtml
    // ----
    ns.abstractMathJax = function () {
        if ($('.abstract-response-placeholder').length) {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,".abstract-response-placeholder"]);
        }
    }

    ns.setAccessIcons = function () {

        var currentArticleList = $('#ArticleList h5.item-title, .al-article-list-group .al-article-items');
        if (currentArticleList.length && accessIcons !== undefined) {
            currentArticleList.each(function (index, item) {
                var articleId = $(this).data('articleidaccess');

                var articleAccessIcon = SCM.SiteJS.getAccessIcon(articleId, accessIcons);
                if (articleAccessIcon !== undefined) {
                    var $thisIcon = $(this).find('i.access-icon'),
                        iconTitle = "Available to Purchase";

                    $thisIcon.removeClass(articleAccessIcon.icon).addClass(articleAccessIcon.icon);

                    switch (articleAccessIcon.icon) {
                        case "icon-availability_open": 
                            iconTitle = "Open Access"
                            break;
                        case "icon-availability_free":
                            iconTitle = "Free"
                            break;
                        case "icon-availability_unlocked":
                            iconTitle = "Available"
                            break;
                        case "icon-availability_cart":
                            iconTitle = "Available to Purchase"
                            break;
                        default:
                            iconTitle = "Available to Purchase"
                    }

                    $thisIcon.attr('title', iconTitle);
                }
            });
        }
    };

    ns.getAccessIcon = function (articleId, articleAccessIcons) {
        var accessIcon;
        articleAccessIcons.map(function (x, y) { if (x.id === articleId) { accessIcon = x; return false; } });
        return accessIcon;
    };

    // ----
    // End: Issue Page: ArticleListAccess.cshtml
    // ----

    // ----
    // END: Acessibility Functions (ARIA)
    // ----

    // ----
    // START: Article Page: UserComment.cshtml
    // ----
    ns.articleUserComments = function (isSplitView) {

        isSplitView = isSplitView === true;

        var $commentModalSpinner = $('.comment-form__modal .preloader-wrap'),
            $commentFormError = $('.content-form__response--error');

        $('#comment-modal-opener' + (isSplitView ? '-sv':'')).click(function (e) {
            e.preventDefault();
            if (SCM.UserCommentView.isUserLoggedIn !== "True") {
                var returnUrl = $.deparam.querystring()["returnUrl"];
                if (returnUrl === undefined || returnUrl === null) {
                    returnUrl = location.pathname + location.search;
                }
                window.location = '/sign-in?returnUrl=' + encodeURIComponent(returnUrl);
            } else {
                resetCommentForm();
                $.ajax({
                    url: (App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '') + '/Content/SelfServeContent',
                    type: 'GET',
                    data: {
                        selfServeContentId: 'CommentsTermsAndConditions',
                        selfServeVersionId: 0
                    }
                }).success(function (data) {
                    showTermsAndConditions(data);
                });

            }
        });

        $('#btnUserAgreeTerms').click(function (e) {
            e.preventDefault();
            if (validateTermsCheckbox()) {
                $('#TermsAndConditionsContainer, #termsAgreeRow, #termsButtonRow').hide();
                $('#divUserCommentForm').show();
            }
        });


        $('#divCommentModal .btnUserCommentSubmit').click(function(e) {
            e.preventDefault();
            //Validate Form and Submit
            if (validateCommentForm()) {
                //$('.pleaseWait').show(); // INSTEAD OF THIS, USE PRELOADER/SPINNER
                $commentModalSpinner.removeClass('hide');
                submitCommentValues();
            };
        });


        $('#divCommentModal .btnModalCancel, #divCommentModal .btnCommentModalExit, .comment-form__close').click(function (e) {
            e.preventDefault();
            $('#divCommentModal').foundation('reveal', 'close');
        });


        $('input[name="NoConflicts"]').change(function () {
            if ($(this).is(':checked')) {
                $('.disclosureBox').show();
            } else {
                $('.disclosureBox').hide();
            }
        });


        showTermsAndConditions = function (data) {
            $('#termsAgreeRow .lblTermsAndConditions.errors').hide();
            $('#TermsAndConditionsContainer').html(data);
            $('#TermsAndConditionsContainer, #termsAgreeRow, #termsButtonRow').show()
            $('#divCommentModal').foundation('reveal', 'open');
        }

        validateTermsCheckbox = function () {

            var $termsCondition = $('#termsAgreeRow #termsAndConditionsCheckbox');

            if ($termsCondition.length && !$termsCondition.is(':checked')) {
                $('#termsAgreeRow .lblTermsAndConditions.errors').show();
                return false;
            }
            else {
                $('#termsAgreeRow .lblTermsAndConditions.errors').hide();
                return true;
            }
        };


        //Validate Form Data
        validateCommentForm = function() {

            var isValid = false;

            resetCommentFormValidation();
            //Validate Form Using Validity Plugin
            $.validity.setup({ outputMode: "label" });
            $.validity.start();
            $("#divCommentModal .required").require();

            var result = $.validity.end();

            // Enforce the comment textarea maxlength for none html5 browsers. @*it also would be nice to have a real time char counter*@
            var comment = $('#divUserCommentForm').find('textarea#Comment');
            var commentBody = comment.val();
            var commentBodyCharLimit = parseInt(comment.attr('maxlength'));
            if (commentBodyCharLimit > 0 && commentBody.length > commentBodyCharLimit) {
                commentBody = commentBody.substring(0, commentBodyCharLimit);
            }

            //Additional Validation required for Disclosure Input and Checkbox 
            if (SCM.UserCommentView.bShowDisclosure === 'true' && $('input[name="NoConflicts"]').is(':checked') && $('textarea[name="Disclosure"]').val() === '') {
                $('#divCommentModal .lbldisclosure.errors').show();
                isValid = false;
            } else {
                isValid = result.valid;
            }

            return isValid;
        };


        resetCommentForm = function () {

            $('#divUserCommentForm').hide();
            var commentForm = $('#divCommentModal');
            commentForm.find("input, textarea").val('');
            commentForm.find('#displayAlert, div.captchaAlert').hide();
            $('input[name="NoConflicts"]').removeAttr('checked');
            $('#termsAndConditionsCheckbox').attr('checked', false);
            $('.disclosureBox').hide();
            $('#divCommentModal .btnCommentModalExit').hide();
            $('#recaptcha_reload').trigger('click');
            var authorInput = commentForm.find('#Author');
            authorInput.attr('value',authorInput.attr('dataauthorvalue'));
            resetCommentFormValidation();
        };


        //Clear Error Messages
        resetCommentFormValidation = function () {

            var commentForm = $('#divCommentModal');

            commentForm.find('.error')
                .not('.lbldisclosure.errors')
                .remove();

            $commentFormError.hide();
            commentForm.find('.lbldisclosure.errors').hide();
            $('#termsAgreeRow .lblTermsAndConditions.errors').hide();
            $commentFormError.text("");
        };


        submitCommentValues = function() {

            var commentForm = $('#divUserCommentForm');
            var articleId = SCM.UserCommentView.articleId;
            var affiliation = '';
            var disclosures = '';

            if (SCM.UserCommentView.showAffiliations === "true") {
                affiliation = commentForm.find('input#AffInstitution').val();
            }

            if (SCM.UserCommentView.bShowDisclosure === "true") {
                disclosures = commentForm.find('textarea#Disclosure').val();
            }

            $.ajax({
                type: "POST",
                url: "/Content/SubmitUserComment",
                data: {
                    author: commentForm.find('input#Author').val(),
                    affInstitutions: affiliation,
                    disclosure: disclosures,
                    title: commentForm.find('input#Title').val(),
                    comment: commentForm.find('textarea#Comment').val(),
                    articleid: articleId,
                    recaptchaChallege: $('#recaptcha_challenge_field').val(),
                    recaptchaResponse: $('#recaptcha_response_field').val(),
                    instanceName: SCM.UserCommentView.InstanceName
                },
                success: function (result) {
                    console.log(["success", result]);
                    //$('.pleaseWait').hide();
                    $commentModalSpinner.addClass('hide');
                    if (result.Success === true) {
                        commentForm.hide();
                        $('#divCommentModal #displayAlert').show();
                        $('#divCommentModal .btnCommentModalExit').show();

                        //For clients that don't moderate comments (such as ASHA)...
                        //they want to refresh page after comment is submitted so that the new comment appears.
                        //For clients that do moderate comments (such as ASA)...
                        //we don't want to refresh the page so that the user can see the Success modal.

                        if (SCM.UserCommentView.isNotModerated.toLowerCase() === "true") {
                            location.reload();
                        }

                    } else {
                        $commentModalSpinner.addClass('hide');
                        $('div.captchaAlert').show();
                    }
                },
                error: function (evt) {
                    // NARN-11087 as a special case, if we get a 401, we assume the user isn't allowed anymore, and we redirect to the sign on page
                    if (evt.status == "401") {
                        $commentFormError.html('You must be logged in to submit a comment.');
                        window.location = '/sign-in?returnUrl=' + encodeURIComponent(window.location.pathname + window.location.search);
                    }
                    else                     {
                        $commentFormError.html('Comments not saved. Please Try Again.');
                    }

                    $commentModalSpinner.addClass('hide');
                    
                    $commentFormError.show();
                }
            });
        };
    };
    // ----
    // END: Article Page: UserComment.cshtml
    // ----


    // ----
    // Initialization functions
    // ----
    ns.init = function () {
        ns.articleUserComments();
        ns.closeNavbarSearch();
        ns.expandNavbarSearch();
        ns.initAriaControls();
        ns.initFilterClickEvent();
        ns.initSearchResultsSort();
        ns.initFoundation();
        ns.initLazyLoad();
        ns.showAuthorInfo();
        ns.showFullAuthorList();
        ns.addAuthorFootnote();
        ns.showHideDropDown();
        ns.showRelatedBookWidgetIfHasContent();
        ns.showMoreRelatedContent('.grw-viewmorelink', '.grw-hide-me');
        ns.showMoreRelatedContent('.mrw-viewmorelink', '.mrw-hide-me');
        ns.showSpinner();
        ns.toggleMobileLanguageSubmenu();
        ns.toggleMobileMenu();
        SCM.SiteJS.toggleMobileSignInForm();
        ns.toggleArticleToolbarDropdown();
        ns.toggleMobileDropdownSubnav(); // site level nav
        ns.toggleMobileSiteMenuSubnav(); // page level nav
        ns.toggleMobileSearch();
        ns.toggleResponsiveLeftColumn(); // renamed
        SCM.ArticlePubHistory.togglePubHistory();
        ns.restrictedImages();
        ns.moveSubmitCommentLink();
        ns.addAuthorNotesJumpLink();
        ns.addDataSupplementsJumpLink();
        ns.addDataRepositoriesJumpLink();
        ns.addUserCommentJumpLink();
        ns.alertLinks();
        ns.registerArticleListNewAndPopularCombinedMode();
        ns.oupHeaderDropdowns();
        ns.initSigninForm(); // AJAX
        ns.initSelfServeNavigation();
        ns.toggleSelfServeNavigation();
        ns.setAllLinksTarget();
        ns.showPdfOnlyLink();
        ns.setBlockLink();
        ns.showFullDisclaimer();
    };

    ns.windowLoadInit = function () {
        ns.revealFigsTablesInModal();
        ns.revealFeaturedFigureInModal();
        ns.launchGetCitationModal();
        ns.setSelectedSearchFilter();
        ns.getNewSelectedFilter();
        ns.loadAllImagesIfUserIsAboutToUseJumpLinks();
        ns.showUnAuthenticatedSpans();
        ns.toggleSearchResultsDetails();
        ns.toggleSearchCover();
    };

    ns.initArticleTopInfoAccessOptions = function () {
        // e.g. /acn
        var siteName = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
        var signInUrl = siteName + '/sign-in?returnUrl=' + encodeURIComponent(window.location.pathname + window.location.search);

        var $options = $('.article-top-info-user-restricted-options');

        $options.find('.article-top-info-sign-in').attr('href', signInUrl);

    }


})(SCM.SiteJS = SCM.SiteJS || {}, jQuery, SCM.ArticleAccessIcons);

// ----
// Where all modules get initialized
// ----
// A closure around doc.ready, window.load, window resize, and Ajax Complete so we can safely use $
(function ($, undefined) {
    var $resizeTimer,
        $pageColumnLeft = $(".page-column--left"),
        $datepickerInput = $(".datepicker__input"),
        $micrositeSearch = $(".microsite-search"),
        $mobileSearchDropdown = $(".mobile-search-dropdown"),
        $navbarMenu = $(".navbar-menu, .navbar-search-collapsed"),
        $navbarSearchElements = $(".navbar-search-advanced, .navbar-search-close, .navbar-search"),
        $currentHeaderHeight = $(".js-master-header").height(),
        viewportWidth = SCM.SiteJS.getViewportWidth();
        
    // all functions contained within the the resize & scroll events should be throttled or debounced in some way.
    // Example in SCM.JSUtility.js;

    // set z-index for page navigation (Article, Search Results, Issue TOC)
    var setMobileClass = function () {
        SCM.SiteJS.getViewportWidth() <= 1023 ? $pageColumnLeft.addClass("mobile") : $pageColumnLeft.removeClass("mobile");
    };

    // Window Resize Event
    $(window).on("resize", function (e) {

        clearTimeout($resizeTimer);
        $resizeTimer = setTimeout(function () {
            setMobileClass();

            var newWidth = SCM.SiteJS.getViewportWidth();

            // fire re-size events ONLY if the width changes
            // this check is for mobile browsers (Chrome, Safari), which have resizing toolbars
            if (viewportWidth != newWidth) {

                // reset mobile site nav when going to desktop
                if (viewportWidth >= 1023) {
                    $(".dropdown-panel, .site-menu").removeAttr('style');
                }

                if (!$pageColumnLeft.hasClass("js-filters-open")) {
                    //reset mobile on search results & article pages
                    $(document.body).removeClass('noscroll');
                    $pageColumnLeft.hide();
                    $(".responsive-issue-nav").hide();
                    $(".page-column--left, .responsive-issue-nav, .issue-dropdown-wrap").removeAttr('style');

                    viewportWidth = SCM.SiteJS.getViewportWidth(); // record the new width, if it changed
                }                
                else if (viewportWidth < newWidth && newWidth > 1023)
                {   
                    // This is an additional case where, like in the above code, we drop noscroll
                    // but do not perform the other actions. In other cases, we don't want to drop the noscroll.
                    $(document.body).removeClass('noscroll');
                }

                // unhide collapsible navbar search if resizing above/below the range in which it is active
                if (viewportWidth <= 930 || viewportWidth >= 1101) {
                    $navbarMenu.removeAttr('style');
                    $navbarSearchElements.removeAttr('style');
                }

                // mobile search needs to be disabled above 930
                if (viewportWidth >= 931) {
                    $mobileSearchDropdown.removeAttr('style');
                    $micrositeSearch.removeAttr('style');
                }
            }

        }, 10); // in milliseconds
    });

    // Listen for orientation changes; some browswers use resize instead
    window.addEventListener("orientationchange", function () {
        var scrollOffset = $(window).scrollTop();

        $('body').animate({
            scrollTop: scrollOffset
        }, 0);
    }, false);

    // Window Load Event: Images done loading
    $(window).on('load', function () {
        SCM.SiteJS.windowLoadInit();
        SCM.SiteJS.adjustRelatedTagsDisplay();
    });

    // Document Ready Event: DOM fully loaded
    $(function () {
        setMobileClass(); 
        SCM.SiteJS.init(); // init general JS module for site
        SCM.Toolbar.init(); // init Toolbar module from client.toolbar.js
        SCM.PDFAccess.init(); // init PDF module from scm.sharedcontrols.pdfaccess.js
        SCM.SiteJS.setAccessIcons();
        SCM.StickyElements.init();
        SCM.AddReturnUrlToSocietyLinks();
        SCM.JumpLinks.init();
        $('.custom-scroll').jScrollPane();
        if ($('.widget-ArticleFulltext').length > 0) {
            SCM.ArticleFulltext.init();
        }
        if ($('.widget-BookChapterMainView').length > 0) {
            SCM.BookChapterMainView.init();
        }
        SCM.SiteJS.triggerAlertModalOnRedirect();
        SCM.SiteJS.triggerSaveSearchModelOnRedirect();
        SCM.SiteJS.configureMathjax();
        SCM.SplitScreen.init();
    });
      
    // Ajax Complete Event
    $(document).ajaxStart(function () {
        $('body').css('cursor', 'wait');

    }).ajaxComplete(function (event, xhr, settings) {
        // init foundation for new DOM elements after new HTML loaded through AJAX
        SCM.SiteJS.initFoundation();
        SCM.SiteJS.initSearchResultsSort();
        SCM.SolrSearch.ajaxComplete();
        SCM.SiteJS.setAccessIcons();
        SCM.SiteJS.setAllLinksTarget();
        SCM.SiteJS.toggleResponsiveLeftColumn();
        $('body').css('cursor', 'default');
        SCM.SiteJS.abstractMathJax();
        SCM.SiteJS.alertLinks();
    });

})(jQuery);
var SCM = SCM || {};

(function (ns, $) {
   
    ns.initTestPassword = function (passwordField, confirmPasswordField, submitBtnID) {
        // check for case regex is generated using this site http://apps.timwhitlock.info/js/regex#
        var $checkForCase = /[A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸ-ŹŻŽƁ-ƂƄƆ-ƇƉ-ƋƎ-ƑƓ-ƔƖ-ƘƜ-ƝƟ-ƠƢƤƦ-ƧƩƬƮ-ƯƱ-ƳƵƷ-ƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺ-ȻȽ-ȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎ-ΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹ-ϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀ-ӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԱ-ՖႠ-ჅḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾ-ℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱯⱲⱵⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽ-ꝾꞀꞂꞄꞆꞋＡ-Ｚ]|\ud801[\udc00-\udc27]|\ud835[\udc00-\udc19\udc34-\udc4d\udc68-\udc81\udc9c\udc9e-\udc9f\udca2\udca5-\udca6\udca9-\udcac\udcae-\udcb5\udcd0-\udce9\udd04-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd38-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd6c-\udd85\udda0-\uddb9\uddd4-\udded\ude08-\ude21\ude3c-\ude55\ude70-\ude89\udea8-\udec0\udee2-\udefa\udf1c-\udf34\udf56-\udf6e\udf90-\udfa8\udfca]/,
            $checkForNumber = /[0-9]/,
            $existingPasswordInput = "",
            $initialPasswordInputWrap = $('.password-input-check-wrap'), // initial password input
            $iconCase = $initialPasswordInputWrap.find('.icon-case'),
            $iconInitialConfirm = $initialPasswordInputWrap.find('.password-confirm-icon'),
            $iconInput = $initialPasswordInputWrap.find('.password-input-icon'),
            $iconLength = $initialPasswordInputWrap.find('.icon-length'),
            $iconNumber = $initialPasswordInputWrap.find('.icon-number'),
            $minSize = 10,
            $passwordValidator = $initialPasswordInputWrap.find('.password-check-wrap'), // the verification card that shows up 
            $passwordConfirmWrap = $('.password-confirm-wrap'), // secondary password input 
            $iconSecondaryConfirm = $passwordConfirmWrap.find('.password-confirm-icon'),
            $validPassword = false;

        $initialPasswordInputWrap.on("keyup", passwordField, function () {

            var $currentInputEntry = $(this).val();

            $existingPasswordInput = $currentInputEntry; // for comparison with confirmation input

            // only show requirements if the password doesn't meet them
            $validPassword ? $passwordValidator.hide() : $passwordValidator.show();

            // test the number of characters
            $currentInputEntry.length >= $minSize ? SCM.MyAccount.showValidPasswordCriteria($iconLength) : SCM.MyAccount.showInvalidPasswordCriteria($iconLength);

            // test for presence of an uppercase character
            $checkForCase.test($currentInputEntry) ? SCM.MyAccount.showValidPasswordCriteria($iconCase) : SCM.MyAccount.showInvalidPasswordCriteria($iconCase);

            // test for presence of a number
            $checkForNumber.test($currentInputEntry) ? SCM.MyAccount.showValidPasswordCriteria($iconNumber) : SCM.MyAccount.showInvalidPasswordCriteria($iconNumber);

            // if all criteria are met, hide the requirements
            if ($iconLength.hasClass('green') && $iconCase.hasClass('green') && $iconNumber.hasClass('green')) {
                $validPassword = true;
                $passwordValidator.fadeOut(1500);
                $iconInput.hide();

                // in case current input actually matches the confirm
                if ($currentInputEntry === $initialPasswordInputWrap.find(confirmPasswordField).val()) {
                    $iconConfirm.hide();
                    $initialPasswordInputWrap.find(submitBtnID).addClass('btn-green');
                    $initialPasswordInputWrap.find('.register-button-overlay').hide();
                }
            }
            else {
                $validPassword = false;
                $passwordValidator.show();
                SCM.MyAccount.lockRegistrationButton();
                $iconInput.show();
            }

            if ($currentInputEntry === "" || $currentInputEntry === null) {
                // hide if input is empty
                $passwordValidator.hide();
                $iconInput.hide();
            }
        });

        $passwordConfirmWrap.on("keyup", confirmPasswordField, function () {

            var $currentConfirmEntry = $(this).val();

            if ($existingPasswordInput === $currentConfirmEntry) {
                // passwords match: hide the icon
                $iconSecondaryConfirm.hide();
                if ($validPassword) {
                    // passwords match & are valid: uncover the button
                    $passwordConfirmWrap.find(submitBtnID).addClass('btn-green');
                    $passwordConfirmWrap.find('.register-button-overlay').hide();
                }
            } else if ($currentConfirmEntry === "" || $currentConfirmEntry === null) {
                // empty input: hide the icon, but cover the button
                $iconSecondaryConfirm.hide();
                SCM.MyAccount.lockRegistrationButton();
            } else {
                // input doesn't match: show the icon & cover the button
                $iconSecondaryConfirm.show();
                SCM.MyAccount.lockRegistrationButton();
            }
        });

        $(document).on('click', function () {
            $passwordValidator.hide();
        });
    };

  
})(SCM.TestPassword = SCM.TestPassword || {}, jQuery);

var SCM = SCM || {};

(function (issues, $, undefined) {
     issues.setActiveJumplink = function () {
        $('.section-jump-link').on('click', function () {
            $('.section-jump-link').removeClass('active');
            $(this).closest('.section-jump-link').addClass('active');
        });
    };

    issues.toggleNestedJumplinks = function() {
        var $jumplinkArrow = $('.section-jump-link .list-toggle, .section-jump-link .mobile-list-toggle');

        $jumplinkArrow.on('click', function (e) {
            e.preventDefault();
            var $this = $(this),
                $nearestSublist = $this.parents(".section-jump-link__link-wrap").siblings('ul.section-jump-link__sublist'),
                $arrowRightClass = "icon-general-arrow-filled-right",
                $arrowDownClass = "icon-general-arrow-filled-down",
                $mobileArrowRight = "icon-general_arrow-right",
                $mobileArrowDown = "icon-general_arrow-down";

            if ($this.hasClass('list-toggle')) {
                $this.hasClass($arrowRightClass) ? $this.removeClass($arrowRightClass).addClass($arrowDownClass) : $this.removeClass($arrowDownClass).addClass($arrowRightClass);
            }
           
            if ($this.hasClass('mobile-list-toggle')) {
                $this.hasClass($mobileArrowRight) ? $this.removeClass($mobileArrowRight).addClass($mobileArrowDown) : $this.removeClass($mobileArrowDown).addClass($mobileArrowRight);
            }

            $this.attr('aria-expanded') === 'false' ? $this.attr('aria-expanded', 'true') : $this.attr('aria-expanded', 'false');
            $nearestSublist.slideToggle();
            $nearestSublist.attr('aria-hidden') === 'false' ? $nearestSublist.attr('aria-hidden', 'true') : $nearestSublist.attr('aria-hidden', 'false');
        });
    };

    // Hide everything that doesn't match what is entered into the .issue-topic__input textbox
    issues.filterTopicTerms = function () {
        $(".issue-topic__input").keyup(function () {
            $(".issue-topic__term").hide();
            var term = $(this).val();
            var allLower = term.toLowerCase();

            $.extend($.expr[":"], {
                "containsIN": function (elem, i, match, array) {
                    return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
                }
            });

            $(".issue-topic__term:containsIN('" + allLower + "')").show();

            if (term === null || term === "") {
                $(".issue-topic__term").show();
            }
        });
    };

    
    // go to selected Issue/Year/Decade as determined by option value (URL)
    issues.updateIssueBrowseOnChange = function () {
        $(".issue-browse-select").on("change", function () {
            window.location.href = $(this).val();
        });
    };

})(SCM.Issues = SCM.Issues || {}, jQuery);

jQuery(document).ready(function ($) {
    SCM.Issues.filterTopicTerms();
    //SCM.Issues.setActiveJumplink();
    SCM.Issues.toggleNestedJumplinks();
    SCM.Issues.updateIssueBrowseOnChange();

    if (window.location.hash) {
        $('a[href="' + window.location.hash + '"]')
            .addClass('active')
            .parents('.section-jump-link')
            .slice(1)
            .children('.section-jump-link__link-wrap')
            .children('.list-toggle')
            .click();
    }

    var viewportWidth = SCM.SiteJS.getViewportWidth();
    var isMobile = viewportWidth <= 900;
    if (isMobile)
    {
        $("#IssuesList > option").each(function () {
            var text = $(this).text();
            var length = text.length;
            var cutoffIndex = 47;

            if (length > cutoffIndex)
            {
                var lastSpace = text.substr(0, cutoffIndex).lastIndexOf(" ");
                if (lastSpace > 0)
                {
                    var truncatedText = text.substr(0, lastSpace) + "...";
                    $(this).text(truncatedText);
                }
            }
        });
    }
});
var SCM = SCM || {};

(function (ns, $) {
    var baseSiteUrl = $("#hfSiteURL");
    // init tab
    ns.initMyAccount = function () {

        var $myAcctTabsInnerWrap = $('.myaccount-tabs-inner-wrap'),
            $mobileNavIcon = $('.mobile-nav-icon'),
            $resizeTimer;

        // mobile page navigation
        $(document).on('click', '.myaccount-mobile-nav', function (e) {
            e.stopPropagation();
            $myAcctTabsInnerWrap.toggle();
            if ($mobileNavIcon.hasClass('icon-general-arrow-filled-down')) {
                $mobileNavIcon.removeClass('icon-general-arrow-filled-down').addClass('icon-general-arrow-filled-up');
            } else {
                $mobileNavIcon.removeClass('icon-general-arrow-filled-up').addClass('icon-general-arrow-filled-down');
            }
        });

        $(document).click(function () {
            $myAcctTabsInnerWrap.hide().removeAttr('style');
        });

        // Scroll
        $(window).on("scroll", function (e) {
            clearTimeout($resizeTimer);
            $resizeTimer = setTimeout(function () {
                $myAcctTabsInnerWrap.removeAttr('style'); // reset mobile page nav
            }, 50); // in milliseconds
        });

        // Resize
        $(window).on("resize", function (e) {
            clearTimeout($resizeTimer);
            $resizeTimer = setTimeout(function () {
                $myAcctTabsInnerWrap.removeAttr('style'); // reset mobile page nav
            }, 50); // in milliseconds
        });

        // highlight active tab
        var activeTabUrl = location.pathname;
        // the pathname should be like: /my-account/{tabName}/{mode}, while the mode is optional and should be ignored when highlighting the main tab
        var modeIndex = activeTabUrl.indexOf('/', '/my-account/'.length);
        if (modeIndex > 0) {
            activeTabUrl = activeTabUrl.substring(0, modeIndex);
        }

        var $activeTab = $('.myaccount-tabs-inner-wrap').find('li').has('a[href="' + activeTabUrl + '"]')
        $activeTab.addClass('is-active');

        $('#myaccount-tabs').find('.myaccount-current-label').html($activeTab.text());

        //edit personal details
        $(document).on('click', '#myaccount-tabs-content #updatePersonalDetailsBtn', function () {
            var $formContainer = $('#myaccount-tabs-content');

            $formContainer.find('.success-message').html('').hide();
            $formContainer.find('.error-message').html('').hide();

            var title = $formContainer.find('#Title').val();
            var firstName = $formContainer.find('#FirstName').val();
            var lastName = $formContainer.find('#LastName').val();
            var phone = $formContainer.find('#Phone').val();
            var country = $formContainer.find('#CountryList').val();
            var token = $("#myaccount-tabs-content").find("#MyAccountToken").val();

            var brackets = /[<>]/;
            if (brackets.test(title) || brackets.test(firstName) || brackets.test(lastName) || brackets.test(phone)) {
                var bracketErr = $formContainer.find('#err-message-angle-brackets').html();
                $formContainer.find('.error-message').html(bracketErr).show();
                $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);

                return;
            }

            $.post('/OUPMyAccount/UpdateAccount',
                { title: title, firstName: firstName, lastName: lastName, phone: phone, country: country, token: token },
                function (data) {
                    if (data != null) {
                        if (data.ReturnId) {
                            $("#myaccount-tabs-content").find("#MyAccountToken").val(data.ReturnId);
                        }

                        if (data.Success) {
                            $('#header-account-info-user-fullname').html(firstName + ' ' + lastName);
                            $formContainer.find('.success-message').html(data.Html).show();
                        }
                        else {
                            $formContainer.find('.error-message').html(data.Html).show();
                            $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                        }
                    }
                });

        });

        //change password
        var initialErrorMessage = $('#change-password').find('.error-message').html();

        SCM.TestPassword.initTestPassword('#newPassword', '#confirmNewPassword', '#changePasswordBtn');

        $(document).on('click', '#changePasswordBtn', function () {
            var $formContainer = $('#change-password');

            var $successMsg = $formContainer.find('.success-message');
            $successMsg.hide();

            var $errMsg = $formContainer.find('.error-message');
            $errMsg.html(initialErrorMessage).hide();

            var errors = {};
            var currentPassword = $formContainer.find('#currentPassword').val();
            var noInput = false;
            if (currentPassword === "")
            {
                errors["currentPassword"] = $("label[for=currentPassword]").text().replace("*", "")
                noInput = true;
            }
            var newPassword = $formContainer.find('#newPassword').val();
            if (newPassword === "") {
                errors["newPassword"] = $("label[for=newPassword]").text().replace("*", "")
                noInput = true;
            }
            var confirmNewPassword = $formContainer.find('#confirmNewPassword').val();
            if (confirmNewPassword === "") {
                errors["confirmNewPassword"] = $("label[for=confirmNewPassword]").text().replace("*", "")
                noInput = true;
            }
            if (noInput)
            {
                for (var key in errors)
                {
                    $errMsg.append("<p> * " + errors[key] + "</p>").show();
                }
                $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                return;
            }
            $errMsg.html('');

            var token = $("#myaccount-tabs-content").find("#MyAccountToken").val();

            $.post('/OUPMyAccount/ChangePassword',
                { currentPassword: currentPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword, token: token },
                function (result) {
                    if (result != null) {
                        if (result.ReturnId) {
                            $("#myaccount-tabs-content").find("#MyAccountToken").val(result.ReturnId);
                        }

                        if (result.Messages != null && result.Messages[0] == '1') {
                            $successMsg.show();

                            // redo a login to refresh un/pw cookie. 
                            $.post('/LOGIN', { user: result.Messages[1], pass: newPassword, dest: '/HTTPHandlers/SAMs/LoginHandler.ashx' })
                                .done(function (result) {
                                    if (result !== '1') { // just in case
                                        location.href = '/sign-in';
                                    }
                                    else
                                    {
                                        $.post('/OUPMyAccount/RefreshToken', {},
                                            function (result) {
                                                if (result != null) {
                                                    if (result.ReturnId) {
                                                        $("#myaccount-tabs-content").find("#MyAccountToken").val(result.ReturnId);
                                                    }
                                                }
                                            }
                                        );
                                    }
                                });

                        } else {
                            if (result.Messages != null && result.Messages[1] != null) {
                                $errMsg.html(result.Messages[1]).show();
                            }
                            $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                        }
                    }
                });
        });

        //change email address
        var initialChangeEmailErrorMessage = $('#change-email-address').find('.error-message').html();
        $(document).on('click', '#changeEmailBtn', function () {
            var $formContainer = $('#change-email-address');

            var $successMsg = $formContainer.find('.success-message');
            $successMsg.html('');

            var $errMsg = $formContainer.find('.error-message');
            $errMsg.html(initialChangeEmailErrorMessage).hide();
            var errors = {};
            var noInput = false;

            var newEmailAddress = $formContainer.find('#newEmailAddress').val();
            if (newEmailAddress === "") {
                errors["newEmailAddress"] = $("label[for=newEmailAddress]").text().replace("*", "")
                noInput = true;
            }
            var confirmNewEmailAddress = $formContainer.find('#confirmNewEmailAddress').val();
            if (confirmNewEmailAddress === "") {
                errors["confirmNewEmailAddress"] = $("label[for=confirmNewEmailAddress]").text().replace("*", "")
                noInput = true;
            }
            var password = $formContainer.find('#currentPassword').val();
            if (password === "") {
                errors["password"] = $("label[for=currentPassword]").text().replace("*", "")
                noInput = true;
            }
            if (noInput) {
                for (var key in errors) {
                    $errMsg.append("<p> * " + errors[key] + "</p>").show();
                }
                $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                return;
            }
            $errMsg.html('');

            var token = $("#myaccount-tabs-content").find("#MyAccountToken").val();

            $.post('/OUPMyAccount/RequestEmailAddressChange',
                { newEmailAddress: newEmailAddress, confirmNewEmailAddress: confirmNewEmailAddress, password: password, token: token },
                function (data) {
                    if (data != null) {
                        if (data.ReturnId) {
                            $("#myaccount-tabs-content").find("#MyAccountToken").val(data.ReturnId);
                        }

                        if (data.Messages == null || data.Messages[0] == null || data.Messages[0] == '') {
                            $formContainer.children('.change-email-address-form').hide();
                            $formContainer.children('.change-email-address-verification').show();
                        }
                        else {
                            $errMsg.html(data.Messages[0]).show();
                        }
                    }
                });
        });

        $(document).on('click', '#changeEmailVerificationBtn', function () {
            var $formContainer = $('#change-email-address');

            var $successMsg = $formContainer.find('.success-message');
            $successMsg.html('').hide();

            var $errMsg = $formContainer.find('.error-message');
            $errMsg.html('').hide();
            var verificationCode = $formContainer.find('#changeEmailVerificationCode').val();

            if (verificationCode.length > 0) {
                $.post('/OUPMyAccount/VerifyEmailAddressChange',
                    {verificationCode: verificationCode },
                    function (result) {
                        if (result[0] == '1')
                        {
                            $successMsg.html(result[1]).show();

                            //log out user after email address change
                            $.get('/LOGOUT', { dest: '/HTTPHandlers/SAMs/LogoutHandler.ashx' }).done(function () {}).fail(function () {});
                        }
                        else {
                            $errMsg.html(result[1]).show();
                            $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                        }
                    });
            }
        });
        
    };

    ns.initSavedSearches = function () {
        // sort
        $(".solrSearchSaveWidget table.tablesorter").tablesorter({
            theme: 'default',
            delayInit: true,
            ignoreCase: true,
            headers: { 4: { sorter: false } },
            sortList: [[0, 0]]
        });

        // delete
        $('.solrSearchSaveWidget .save-search-delete').click(function () {
            SCM.MyAccount.deleteSaveSearch($(this));
        });

        // alert
        $('.solrSearchSaveWidget .ddlSearchAlertFrequencyMyAccount').change(function () {
            SCM.MyAccount.changeUserAlert($(this));
        });

        // rename
        $('.solrSearchSaveWidget .save-search-rename-rename').click(function () {
            var $parentElem = $(this).closest('td');
            var $searchNameLnk = $parentElem.find('.save-search-name-link');

            $searchNameLnk.hide();
            $parentElem.find('.save-search-input').val($searchNameLnk.text()).css('display', 'inline-block').focus();
            $parentElem.find('.save-search-rename-cancel').show();
            $parentElem.find('.save-search-rename-save').show();
            $(this).hide();
        });

        // cancel rename
        $('.solrSearchSaveWidget .save-search-rename-cancel').click(function () {
            var $parentElem = $(this).closest('td');

            $parentElem.find('.save-search-name-link').show();
            $parentElem.find('.save-search-input').hide();
            $parentElem.find('.save-search-rename-rename').show();
            $parentElem.find('.save-search-rename-save').hide();
            $(this).hide();
        });

        // save rename
        $('.solrSearchSaveWidget .save-search-rename-save').click(function () {
            var $saveLnk = $(this);
            var $parentElem = $saveLnk.closest('td');
            var $searchNameInput = $parentElem.find('.save-search-input');
            var $userSearchId = $saveLnk.closest('tr').data('usersearchid');
            var $newSearchName = $searchNameInput.val();

            if ($newSearchName.length) {
                SCM.MyAccount.renameSaveSearch($newSearchName, $userSearchId);
                $searchNameInput.hide();
                $parentElem.find('.save-search-name-link').text($newSearchName).show();
                $parentElem.find('.save-search-rename-rename').show();
                $parentElem.find('.save-search-rename-cancel').hide();
                $(this).hide();
            }            
        });

        // save rename on key press
        $('.solrSearchSaveWidget .save-search-input').on('keypress', function (e) {
            var $parentElem = $(this).closest('td');
            var $newSearchName = $(this).val();

            var code = e.keyCode || e.which;
            if (code === 13) {
                e.preventDefault();

                if ($newSearchName.length) {
                    var $usersearchid = $parentElem.closest('tr').data('usersearchid');

                    SCM.MyAccount.renameSaveSearch($newSearchName, $usersearchid);

                    $(this).hide();
                    $parentElem.find('.save-search-name-link').text($newSearchName).show();
                    $parentElem.find('.save-search-rename-rename').show();
                    $parentElem.find('.save-search-rename-save').hide();
                    $parentElem.find('.save-search-rename-cancel').hide();
                }
            }
        });
    };

    ns.bindTableSorter = function (updatedTable) {
        $(updatedTable).trigger('update');
        var $sort = $(updatedTable).get(0).config.sortList;
        $(updatedTable).trigger("sorton", [$sort]);
    }

    ns.deleteSaveSearch = function (delElem) {
        $('.alerts-wrap-cover').removeClass("uncovered");
        $('.alerts-wrap-cover').addClass("covered");

        var ajaxUrl = "//" + baseSiteUrl.val() + "/Solr/DeleteSolrSearchInfoWithToken";
        var parentElem = delElem.closest('tr');
        var id = parentElem.data('usersearchid');
        var userAlertId = parentElem.data('useralertid');
        var token = $("#SolrSearchAuthToken").val();
        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            dataType: 'json',
            cache: false, // to defeat browser URL caching
            data: { userSearchId: id, userAlertId: userAlertId, token: token },
            success: function (result) {
                if (result != null) {
                    if (result.ReturnId) {
                        $("#SolrSearchAuthToken").val(result.ReturnId);
                    }
                    $('.solrSearchSaveWidget .solrSearchSaveModel .message').html(result.Html).parent().foundation('reveal', 'open');
                    if (result.Success) {
                        parentElem.remove();
                    }
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (window.console) {
                    var err = eval("(" + xmlHttpRequest.responseText + ")");
                    console.log('error: ' + err);
                    console.log('status: ' + textStatus);
                }
            }
        }).done(function () {
            SCM.MyAccount.bindTableSorter($('.saved-searches-table.tablesorter'));
            $('.alerts-wrap-cover').removeClass("covered");
            $('.alerts-wrap-cover').addClass("uncovered");
        });
    };

    ns.changeUserAlert = function (upElem) {
        var ajaxUrl = "//" + baseSiteUrl.val() + "/Solr/UpdateUserAlertWithToken";
        var parentElem = upElem.closest('tr');
        var id = parentElem.data('usersearchid');
        var userAlertId = parentElem.data('useralertid');
        var scheduleId = upElem.val();
        var token = $("#SolrSearchAuthToken").val();
        $('.alerts-wrap-cover').removeClass("uncovered");
        $('.alerts-wrap-cover').addClass("covered");

        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            dataType: 'json',
            cache: false, // to defeat browser URL caching
            data: { userSearchId: id, userAlertId: userAlertId, scheduleId: scheduleId, token: token },
            success: function (result) {
                if (result != null) {
                    var resultIdObj = JSON.parse(result.ReturnId);
                    if (resultIdObj != null && resultIdObj.Token != null) {
                        $("#SolrSearchAuthToken").val(resultIdObj.Token);
                    }

                    $('.solrSearchSaveWidget .solrSearchSaveModel .message').html(result.Html).parent().foundation('reveal', 'open');
                    if (result.Success && resultIdObj != null && resultIdObj.ReturnId != null) {
                        // if a user toggles switching on/off alert in same session
                        parentElem.data('useralertid', resultIdObj.ReturnId);
                    }
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (window.console) {
                    var err = eval("(" + xmlHttpRequest.responseText + ")");
                    console.log('error: ' + err);
                    console.log('status: ' + textStatus);
                };
            }
        })
        .done(function () {
            $('.alerts-wrap-cover').removeClass("covered");
            $('.alerts-wrap-cover').addClass("uncovered");
        });
    };

    ns.renameSaveSearch = function (searchName, userSearchId) {
        var ajaxUrl = "//" + baseSiteUrl.val() + "/Solr/RenameSolrSearchInfoWithToken";
        var token = $("#SolrSearchAuthToken").val();
        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            dataType: 'json',
            cache: false, // to defeat browser URL caching
            data: { searchName: searchName, userSearchId: userSearchId, token: token },
            success: function (result) {
                if (result != null) {
                    if (result.ReturnId) {
                        $("#SolrSearchAuthToken").val(result.ReturnId);
                    }
                    $('.solrSearchSaveWidget .solrSearchSaveModel .message').html(result.Html).parent().foundation('reveal', 'open');
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (window.console) {
                    var err = eval("(" + xmlHttpRequest.responseText + ")");
                    console.log('error: ' + err);
                    console.log('status: ' + textStatus);
                }
            }
        }).done(function () {
            SCM.MyAccount.bindTableSorter($('.saved-searches-table.tablesorter'));
        });
    };

    ns.initRegister = function (lastError) {
        var $formContainer = $('.widget-Register');

        if (lastError != null && lastError.length > 0) {
            $formContainer.find('.error-message').html(lastError).show();
            SCM.MyAccount.clearLastErrorMessage();
        }

        //show password
        $formContainer.on('click', '#showPassword', function () {
            $formContainer.find('#Password, #ConfirmPassword').each(function () {
                var $newInput = $(this).clone();
                $newInput.attr('type', 'text');
                $newInput.attr('autocomplete', 'off');
                $newInput.attr('value', $(this).val());

                $(this).after($newInput);
                $(this).remove();
            });

            $(this).hide();
            $(this).siblings('#hidePassword').show();
        });

        //hide password
        $formContainer.on('click', '#hidePassword', function () {
            $formContainer.find('#Password, #ConfirmPassword').each(function () {
                var $newInput = $(this).clone();
                $newInput.attr('type', 'password');
                $newInput.removeAttr('autocomplete');
                $newInput.attr('value', $(this).val());

                $(this).after($newInput);
                $(this).remove();
            });


            $(this).hide();
            $(this).siblings('#showPassword').show();
        });

        $formContainer.on('click', '#registerBtn', function () {
            $formContainer.find('.error-message').html().hide;

            var email = $formContainer.find('#EmailAddress').val();
            var password = $formContainer.find('#Password').val();
            var confirmPassword = $formContainer.find('#ConfirmPassword').val();
            var title = $formContainer.find('#Title').val();
            var firstName = $formContainer.find('#FirstName').val();
            var lastName = $formContainer.find('#LastName').val();
            var country = $formContainer.find('#CountryList').val();
            var phone = $formContainer.find('#Telephone').val();
            var honeypotValue = $formContainer.find('#hpcName').val();
            var captchaValue = $formContainer.find('.txtCaptchaInput').val();
            var recaptchaChallege = $('#recaptcha_challenge_field').val();
            var recaptchaResponse = $('#recaptcha_response_field').val();
            var registerIssueAlert = $formContainer.find('#registerIssueAlert');
            var alertChecked = false;
            if (registerIssueAlert != undefined) {
                alertChecked = registerIssueAlert.is(":checked") ? true: false;
            }
            var hfAlertJournalId = $formContainer.find('#hfAlertJournalId');
            var alertJournalId = hfAlertJournalId != undefined && hfAlertJournalId.length > 0 ? hfAlertJournalId.val() : 0;
            var hfAlertSiteId = $formContainer.find('#hfAlertSiteId');
            var alertSiteId = hfAlertSiteId != undefined && hfAlertSiteId.length > 0 ? hfAlertSiteId.val() : 0;
            var queryParam = alertChecked ? '?siteId=' + alertSiteId + '&journalId=' + alertJournalId : '';

            if (honeypotValue.length > 0) {
                console.log('Honeypot captcha triggered. Are you a bot?');
            } else {
                $.post('/OUPMyAccount/Register',
                {
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    title: (title === undefined ? null : title),
                    firstName: (firstName === undefined ? null : firstName),
                    lastName: (lastName === undefined ? null : lastName),
                    country: (country === undefined ? null : country),
                    phone: (phone === undefined ? null : phone),
                    captchaResponse: captchaEnabled ? grecaptcha.getResponse():''
                },
                function (result) {
                    if (result === 'OK') {
                        $.post('/LOGIN', { user: email, pass: password, dest: '/HTTPHandlers/SAMs/LoginHandler.ashx' + queryParam })
                            .done(function (result) {
                                if (result === '1') {
                                    SCM.SiteJS.loginReturnBack();
                                } else {
                                    $formContainer.find('.error-message').html('The account has been created, but the login failed. Please try login again.').show();
                                }
                            });
                    } else {
                        window.location.reload();
                    }
                });
            }

        });

        SCM.TestPassword.initTestPassword('#Password', '#ConfirmPassword', '#registerBtn');
    };

    ns.clearLastErrorMessage = function () {
        $.post('/OUPMyAccount/ClearLastErrorMessage');
    }

    // check if email input is empty
    ns.lockRegistrationButton = function () {
        $('.register-form-wrap').find('#registerBtn').removeClass('btn-green');
        $('.register-form-wrap').find('.register-button-overlay').show();
    };

    // for VALID password criteria
    ns.showValidPasswordCriteria = function (icon) {
        icon.removeClass('icon-general-close red').addClass('icon-general-check green');
        icon.siblings('.password-check-label').addClass('fade');
    };

    // for INVALID password criteria
    ns.showInvalidPasswordCriteria = function (icon) {
        icon.removeClass('icon-general-check green').addClass('icon-general-close red');
        icon.siblings('.password-check-label').removeClass('fade');
    };

    ns.initForgotPassword = function () {
        var initialForgotPasswordErrorMessage = $('#forgot-password').find('.error-message').html();
        $('#forgotPasswordBtn').on('click', function () {
            var $formContainer = $('#forgot-password');

            var $successMsg = $formContainer.find('.success-message');
            var $errMsg = $formContainer.find('.error-message');

            $successMsg.html('').hide();
            $errMsg.html(initialForgotPasswordErrorMessage).hide();

            var email = $formContainer.find('#contactEmail').val();

            if (email.length > 0) {
                $.post('/OUPMyAccount/ForgotPassword',
                { email: email },
                function (err) {
                    if (err == null || err == '') {
                        var confirmMsg = $formContainer.find('.success-message-template').html().replace("{0}", email);
                         $successMsg.html(confirmMsg).show();
                   }
                    else {
                        $errMsg.html(err).show();
                        $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                    }
                },
                'html');
            }
            else
            {
                $errMsg.append("<p> * " + $("label[for=contactEmail]").text().replace("*", "") + "</p>").show();
                $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
            }
        });
    };

    ns.initResetPassword = function () {
        $('#changePasswordBtn').on('click', function () {
            var $formContainer = $('#change-password');
            var $successMsg = $formContainer.find('.success-message');
            var $errMsg = $formContainer.find('.error-message');

            var token = $.deparam.querystring()["t"];
            var newPassword = $formContainer.find('#newPassword').val();
            var confirmNewPassword = $formContainer.find('#confirmNewPassword').val();

            $.post('/OUPMyAccount/ResetPassword',
            { token: token, newPassword: newPassword, confirmNewPassword: confirmNewPassword },
            function (err) {
                if (err == null || err == '') {
                    $successMsg.show();
                    $errMsg.hide();
                }
                else {
                    $successMsg.hide();
                    $errMsg.html(err).show();
                    $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                }
            },
            'html');
        });

        SCM.TestPassword.initTestPassword('#newPassword', '#confirmNewPassword', '#changePasswordBtn');
    };
    
    ns.countSubjectChoices = function () {
        $('#communication-preferences-subject-choices').find('.topics-selected-wrap').each(function () {
            var $totelOptions = $(this).closest('li').find('input[type=checkbox]');
            var $selectedOptions = $totelOptions.filter(':checked');

            $(this).find('.totalCount').html($totelOptions.length);
            $(this).find('.checkedTotal').html($selectedOptions.length);
            $(this).show();
        });
    };

    ns.changeUserTypeSubjects = function (reset) {
        var $container = $('#communication-preferences');
        $('#userTypeSubjectHeader').hide();
        var classificationId = $container.find('#userTypes').val();
        if (classificationId === '3') { // Show this heading only for Librarian 
            $('#userTypeSubjectHeader').show();
        }

        $container.find('ul#userTypeSubjects > li').each(function () {
            var $checkbox = $(this).find('input[type=checkbox]');
            //selected subject
            if ($(this).attr('data-classification-id') === classificationId){
                $(this).show();

                // reset to original choice
                if (reset) {
                    $checkbox.prop('checked', $checkbox.data('checked'));
                }
            }
            else {
                $(this).hide();

                // uncheck all
                if (reset) {
                    $checkbox.prop('checked', false);
                }
            }
        });
    };

    ns.initCommunicationPreferences = function (defaultClassificationId) {

        SCM.MyAccount.countSubjectChoices();

        // automatically expand subjects with selected items
        // NOTE: Removed at OUP's request, but code is being preserved in likely event that the requirement changes
        //$('#communication-preferences-subject-choices').find('ul').each(function() {
        //    if ($(this).find('input[type=checkbox]:checked').length) {
        //        $(this).show();
        //    }
        //});

        // expand child subjects per main subject click
        $('#communication-preferences-subject-choices').on('click', '.mainSubjects > a', function () {
            $(this).siblings('ul').slideToggle();
            $(this).children('i').hasClass('icon-general-arrow-filled-down') ? $(this).children('i').removeClass('icon-general-arrow-filled-down').addClass('icon-general-arrow-filled-right') : $(this).children('i').removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down');
        });

        // subject checkbox click
        $('#communication-preferences-subject-choices').on('click', 'input[type=checkbox]', function () {
            // just in case it has child subjects
            $(this).next('ul').find('input[type=checkbox]').prop('checked', !($(this).is(':checked')));

            SCM.MyAccount.countSubjectChoices(); //for simplicity, just recount the whole tree
        });

        // set the user type specific subjects, e.g. librarian
        // page init
        if (defaultClassificationId != null && defaultClassificationId > 0) {
            $('#communication-preferences #userTypes').val(defaultClassificationId);
        }
        SCM.MyAccount.changeUserTypeSubjects(false);

        // change
        $('#communication-preferences #userTypes').change(function () {
            SCM.MyAccount.changeUserTypeSubjects(true);
        });

        // send an email if checked
        $('#communication-preferences #btnConfirmOptIn').on('click', function () {
            var btnConfirmOptIn = $(this);
            $.ajax({
                url: '/OUPMyAccount/SendEmailForOptInCommPref',
                type: 'GET',
                dataType: "json"
            }).done(function (data) {
                if (data.Success) {
                    $('#communication-preferences').find('.success-message').html(data.Html).show();
                } else {
                    $('#communication-preferences').find('.error-message').html(data.Html).show();
                }

                btnConfirmOptIn.hide();
                $('#communication-preferences .send-verify-email').hide();
            });
        });

        // update button
        $('#communication-preferences #updatePreferencesBtn').click(function (e) {
            var $container = $('#communication-preferences');
            var optInMarketEmail = !$container.find('#confirmOptOut').is(":checked");
            var subjectIds = [];
            $container.find('input[type=checkbox][data-type=subjectId]').filter(':checked').each(function () {
                subjectIds.push($(this).val());
            });
            var classificationId = $container.find('#userTypes').val();
            $.ajax({
                url: '/OUPMyAccount/UpdateCommunicationPreferences',
                type: 'POST',
                traditional: true,
                data: { optInMarketEmail: optInMarketEmail, subjectIds: subjectIds, classificationId: classificationId },
                dataType: "html"
            }).done(function (data) {
                $container.find('.success-message').html(data).show();
                if (optInMarketEmail) {
                    $container.find('.optedIn-message').show();
                    $container.find('.optedOut-message').hide();
                }
                else {
                    $container.find('.optedIn-message').hide();
                    $container.find('.optedOut-message').show();
                }
                // now the choices have been persisted, we should update data-checked attributes for further selections
                $container.find('#userTypeSubjects input[type=checkbox][data-type=subjectId]').each(function () {
                    $(this).data('checked', $(this).is(":checked"));
                });
            });
            e.preventDefault();
        });

        //NARN-6431
        $("#communication-preferences #communication-preferences-subject-choices input[type=checkbox][data-type=subjectId]").click(function (e)
        {
            var $container = $('#communication-preferences');
            $container.find('.success-message').hide();
        });
};

    ns.initActivateSubscription = function (lastError) {

        var $formContainer = $('.activate-subscription-wrap');

        if (lastError != null && lastError.length > 0) {
            $formContainer.find('.error-message').html(lastError).show();
            SCM.MyAccount.cleanLastErrorMessage();
        }
        var simpleCaptchaEnabled = $('div.register-captcha-text-simple-sub').length > 0;
        var normalCaptchaEnabled = $('div.register-captcha-text-normal-sub').length > 0;

        var simpleCaptchaIdName = "txtCaptchaInputId"

        if (normalCaptchaEnabled) {
            resetCaptchaElement();
        }
        else if (simpleCaptchaEnabled) {
            simpleCaptchaIdName += "-0";
        }

        $('#activateSubscriptionBtn').on('click', function () {
            var $formContainer = $('.activate-subscription-wrap');

            var $errMsg = $formContainer.find('.error-message');
            $errMsg.html('').hide();

            if ($('#activateSubscriptionTermsConditions').is(':checked') == false) {
                $errMsg.html($('#activateSubErrTermsConditions').html()).show();
                $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
            }
            else {
                var token = $('#activateSubscriptionToken').val();

                if (token.length > 0) {
                    $.post('/OUPMyAccount/ActivateSubscriptionSubmitToken',
                    {
                            token: token,
                            captchaResponse: normalCaptchaEnabled ? grecaptcha.getResponse(0) : '',
                            simpleCaptchaResponse: simpleCaptchaEnabled ? document.getElementById(simpleCaptchaIdName).value : '',
                            captchaInstanceNumber: 0
                    },
                    function (result) {
                        if (result == 'subscriptions') {
                            location.href = "/my-account/subscriptions";
                        }
                        else if (result == 'institutional-settings') {
                            // delay to make sure that the SGK is refreshed
                            setTimeout(function () { location.href = "/my-account/institutional-settings" }, 1000);
                        }

                        else {
                            window.location.reload();
                        }
                    },
                    'html').fail(function (xhr, status, error) {
                        $errMsg.html("We encountered a problem when trying to activate your subscription. Please try again. " +
                                     "If the problem continues, please contact <a href=\"/journals/pages/contact_us/customer_services\">customer services</a>.").show();
                    });
                }
            }
        });

        $('#activateSubscriptionToken').on('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                e.preventDefault();
                $('#activateSubscriptionBtn').click();
            }
        });
    };

    ns.cleanLastErrorMessage = function () {
        $.post('/OUPMyAccount/CleanLastErrorMessage');
    }

    ns.initInstitutionalSettings = function () {
        //update institutional Account Info
        var initialErrorSummaryValue = $('.error-summary').html();
        $('#institutionalAccountInfo').on('click', '#saveInstitutionalSettingsBtn', function () {
            var $formContainer = $(this).closest('#institutionalAccountInfo');
            var $errorSummary = $formContainer.find('.error-summary');
            $errorSummary.html(initialErrorSummaryValue);
            var $successMsg = $formContainer.find('.instUpdate-success');

            // hide previous msgs
            $successMsg.hide();
            $errorSummary.hide();
            $formContainer.find('.instUpdate-error').html('').removeClass('is-active');

            var instName = $formContainer.find('#instSet-InstitutionName').val();
            var ipAddresses = $formContainer.find('#instSet-IpAddresses').val();
            var orgId = $formContainer.find('#instSet-OrgId').val();
            var entityId = $formContainer.find('#instSet-EntityId').val();
            var openUrl = $formContainer.find('#instSet-OpenUrl').val();
            var openUrlButton = $formContainer.find('#instSet-OpenUrlButton').val();
            var instUrl = $formContainer.find('#instSet-InstUrl').val();
            var instLogoUrl = $formContainer.find('#instSet-InstLogo').val();
            var token = $("#myaccount-tabs-content").find("#MyAccountToken").val();

            $.post('/OUPMyAccount/UpdateInstitutionalAccountInfo',
            {
                institutionName: instName,
                ipAddresses: ipAddresses,
                orgId: orgId,
                entityId: entityId,
                openUrl: openUrl,
                openUrlButton: openUrlButton,
                instUrl: instUrl,
                instLogoUrl: instLogoUrl,
                token: token
            },
            function (data) {
                if (data != undefined && data != null) {
                    if (data.ReturnId) {
                        $("#myaccount-tabs-content").find("#MyAccountToken").val(data.ReturnId);
                    }

                    if (!$.isEmptyObject(data.Errors)) {
                        for (var key in data.Errors) {
                            var inputId = null;

                            switch (key) {
                                case 'general':
                                    inputId = 'general';
                                    break;
                                case 'institutionName':
                                    inputId = 'instSet-InstitutionName';
                                    break;
                                case 'ipAddressList':
                                    inputId = 'instSet-IpAddresses';
                                    break;
                                case 'orgId':
                                    inputId = 'instSet-OrgId';
                                    break;
                                case 'entityId':
                                    inputId = 'instSet-EntityId';
                                    break;
                                case 'openUrl':
                                    inputId = 'instSet-OpenUrl';
                                    break;
                                case 'openUrlButton':
                                    inputId = 'instSet-OpenUrlButton';
                                    break;
                                case 'instUrl':
                                    inputId = 'instSet-InstUrl';
                                    break;
                                case 'instLogoUrl':
                                    inputId = 'instSet-InstLogo';
                                    break;
                            }

                            if (inputId != null) {
                                if (inputId === 'general') {
                                    $formContainer.find('.instUpdate-error.general-error').html(data.Errors[key]).addClass('is-active');
                                }
                                else {
                                    $formContainer.find('#' + inputId).next('.instUpdate-error').html(data.Errors[key]).addClass('is-active');
                                    $errorSummary.append("<p> * " + $("label[for=" + inputId + "]").text().replace("*", "") + "</p>");
                                    $errorSummary.show();
                                }
                            }
                        }

                        $('html, body').animate({ scrollTop: $formContainer.offset().top }, 10);
                    }
                    else {
                        $successMsg.show();

                        if ($.trim(openUrlButton).length) {
                            $('#instSet-OpenUrlButtonImg').attr("src", openUrlButton).show();
                        }
                        else {
                            $('#instSet-OpenUrlButtonImg').hide();
                        }

                        if ($.trim(instLogoUrl).length) {
                            $('#instSet-InstLogoImg').attr("src", instLogoUrl).show();
                        }
                        else {
                            $('#instSet-InstLogoImg').hide();
                        }
                    }
                }
            });
        });

        // copy corresponding help text to modal
        $(document).on('click', '#institutionalAccountInfo .question-icon', function (e) {
            e.preventDefault();

            var helpText = $(this).next('[data-type="help-text"]').html();

            $('#institutionalSettingsModalBody').html(helpText);
            $('#institutionalSettingsModal').foundation('reveal', 'open');
        });
    };

    ns.initSubscriptions = function () {
        $(".subscriptions-wrap table.tablesorter").tablesorter({
            theme: 'default',
            delayInit: true,
            ignoreCase: true,
            sortList: [[0, 0]]
        });

        $('.subscriptions-wrap .view-expired-link').click(function () {
            $(this).hide();

            $subTypeContainer = $(this).closest('.subscription-type').find('.subscription-type-table');
            $subTypeContainer.show();
            $subTypeContainer.children('tbody').children('tr').show();
        });

        $('.subscriptions-wrap .subscription-resource-link').click(function () {
            var resourceId = $(this).data("resource-id");
            var resourceType = $(this).data("resource-type");

            $.get('/OUPMyAccount/GetResourceUrl',
                { resourceId: resourceId, resourceType: resourceType },
                function (resourceUrl) {
                    top.location = resourceUrl;
                },
                'text');
        });
    };
})(SCM.MyAccount = SCM.MyAccount || {}, jQuery);


/******************************************************************
Copied from MyAccount.aspx, need to be revised
*******************************************************************/
$(document).ready(function () {
    var $emailAlertModal = $("#journalAddEditDiv"),
        $checkboxRows = $("#journalAddEditDiv .add-new-alert .new-alert-row-wrap"),
        currentModalContents;

    // show that myaccounts is doing something
    $(document).on('click', '.myaccount-tabs-inner-wrap div', function () {
        $('.tabbed-content-overlay').show();
    });

    //hide the overlay when the new tab is loaded
    $('#myaccount-tabs-content').bind("DOMSubtreeModified", function () {
        $('.tabbed-content-overlay').hide();
    });

    $('#institutionalLogoURL').keyup(function () {
        $('.logoPreview').attr("src", $(this).val());
        $('.logoPreview').error(function () {
            $(this).attr('src', '/Images/grey.gif');
        });
    });

    /**
     * Restores checkbox states for Email Alert Modals when user closes the modal without clicking the submit button
     * 
     * @param  click target
     */
    var restoreCheckboxes = function (target) {
        // if the modal is open AND something other than the submit button was clicked (closed without save) ...
        if ($emailAlertModal.hasClass("open") && !target.hasClass("js-save-alerts")) {
            // once the modal is closed ...
            $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
                // copy the HTML stored in currentModalContents into the modal
                $checkboxRows.html(currentModalContents);
            });
        }
    };

    // capture contents of Email Alert Modals modal when one opens
    $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
        currentModalContents = $checkboxRows.html();

        $(document).on('mouseup.myAccount', function (e) {
            var $target = $(e.target);
            restoreCheckboxes($target);
        });

        // for keyboard users (accessibility)
        $(document).on('keyup.myAccount', function (e) {
            var $target = $(e.target);
            restoreCheckboxes($target);
        });
    });

    // unbind when modal closes
    $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
        $(document).unbind('mouseup.myAccount');
        $(document).unbind('keyup.myAccount');
    });

});
var SCM = SCM || {};

(function (ns, $, bc) {
    function tabs(tabs, item) {
        // tabs = the element that is clicked
        // item = the content revealed by the clicked item (sybling element named tabs + '-content')
        var $tabs = $(tabs);
        var $container = $tabs.parents('.js-abstract-response-placeholder');
        $container.addClass('removePad');
        $tabs.on('click', item, function (e) {
            var $target = $(e.target),
                $parent = $target.parents('.js-abstract-response-placeholder'),
                $content = $parent.find(tabs + '-content'),
                tabNum = $target.index(),
                $targetContent = $(item, $content);
            $parent.find('li').removeClass('is-active');
            $target.addClass('is-active');
            $targetContent.eq(tabNum).addClass('is-active');
        });
    }

    function handleClickEvent(abstractLocation, ajaxUrl, triedFetch, triedFetchDiv, abstractLinks, wrapperDiv, articleId, layAbstact) {
        var baseSiteUrl = $("#hfSiteURL");

        abstractLocation.parent().toggleClass('tabExpand');

        if (typeof baseSiteUrl !== "undefined" && typeof baseSiteUrl.val() !== "undefined" && baseSiteUrl !== '') {
            ajaxUrl = "//" + baseSiteUrl.val() + ajaxUrl;
        }

        $(abstractLocation).closest('li').toggleClass('abstractExpanded');
        $(abstractLocation).append('<div class="spinner"></div>');

        if (!triedFetch) {
            $.ajax({
                url: ajaxUrl,
                type: 'GET',
                data: { articleId: articleId, layAbstract: layAbstact },
                success: function (data) {
                    abstractLocation.html(data.Html);
                    abstractLocation.append(abstractLinks.html());
                    tabs('.js-tabs', ' > li');
                    bc.init();
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    $(abstractLocation).find('.spinner').remove();
                    if (window.console) {
                        var err = eval("(" + xmlHttpRequest.responseText + ")");
                        console.log('error: ' + err);
                        console.log('status: ' + textStatus);
                    };
                }
            });
            $(triedFetchDiv).data("tried-to-fetch-abstract", "true");
        }

        abstractLocation.toggle();


        // Toggle Abstract Icon (moved in from client.issue.js)
        var $thisAbstractIcon = wrapperDiv.find('.abstract-toggle-icon'),
            downArrow = 'icon-general-arrow-filled-down',
            upArrow = 'icon-general-arrow-filled-up';

        $thisAbstractIcon.hasClass(downArrow) ? $thisAbstractIcon.removeClass(downArrow).addClass(upArrow) : $thisAbstractIcon.removeClass(upArrow).addClass(downArrow);
    }

    ns.initAbstractClickEvent = function () {
        $(".master-main").on('click', "a.showAbstractLink", function () { //div[data-article-abstract-2b-fetched-wrapper] > div[data-link-article-abstract-get] a
            var wrapperDiv = $(this).closest('div[data-article-abstract-fetched-wrapper]');
            var articleId = $(wrapperDiv).data('articleid-abstract');
            var triedFetchDiv = $(wrapperDiv).children('div[data-tried-to-fetch-abstract]').first();
            var triedFetch = $(triedFetchDiv).data("tried-to-fetch-abstract") === "true";
            var abstractLocation = $('#abstract-' + articleId);

            var abstractLinks = $('#abstract-' + articleId + '-links');
            var ajaxUrl = $(this).closest('div.abstract-link').data('link-article-abstract-type') === 'extract' ? "/PlatformArticle/ArticleAbstractOrExtractAjax" : "/PlatformArticle/ArticleAbstractAjax";

            handleClickEvent(abstractLocation, ajaxUrl, triedFetch, triedFetchDiv, abstractLinks, wrapperDiv, articleId, false);
        });
    };

    ns.initLayAbstractClickEvent = function() {
        $(".master-main").on('click', "a.showLayAbstractLink", function () {
            var wrapperDiv = $(this).closest('div[data-article-layabstract-fetched-wrapper]');
            var articleId = $(wrapperDiv).data('articleid-layabstract');
            var triedFetchDiv = $(wrapperDiv).children('div[data-tried-to-fetch-layabstract]').first();
            var triedFetch = $(triedFetchDiv).data("tried-to-fetch-layabstract") === "true";
            var abstractLocation = $('#layabstract-' + articleId);
            
            var abstractLinks = $('#layabstract-' + articleId + '-links');
            var ajaxUrl = "/PlatformArticle/ArticleAbstractAjax";

            handleClickEvent(abstractLocation, ajaxUrl, triedFetch, triedFetchDiv, abstractLinks, wrapperDiv, articleId, true);
        });
    };
})(SCM.ArticleAbstract = SCM.ArticleAbstract || {}, jQuery, SCM.Utilities.Brightcove);

jQuery(document).ready(function ($) {
    SCM.ArticleAbstract.initAbstractClickEvent();
    SCM.ArticleAbstract.initLayAbstractClickEvent();
});
var SCM = SCM || {};

SCM.SearchResults = {};

SCM.SearchResults.defaults = {
    controller: 'Solr',
    action: 'SolrSearch',
    instanceName: 'Search',
    baseSiteUrl: '',
    updateTargetSelector: '#divSearch'
};

$(function () {

    $(document).on('click', '.facetShowMore', function (event) {
        if ($(this).closest('.sf-facet-list').find('.sf-facet:gt(11):visible').length) {
            $(this).closest('.sf-facet-list').find('.sf-facet:gt(11):visible').animate({ height: 'toggle' }, 400);
            $(this).text('Show more');
        }
        else {
            $(this).closest('.sf-facet-list').find('.sf-facet').not(':visible').animate({ height: 'toggle' }, 400);
            $(this).text('Show less');
        }
        event.preventDefault();
    });
    $('#searchResultsPage').on('click', '.journal-description-container a', function (e) {
        e.preventDefault();
        $(this).closest('.journal-description-container').find('.journal-description').toggleClass('hide');
    });

    function collapseFacets() {
        $('.collapsible-facet .sf-facet-list').each(function () {
            if ($(this).find('.sf-facet').length > 12) {
                $(this).find('.facetShowMoreLi').remove();
                $(this).find('.sf-facet:gt(11)').hide();
                $(this).append('<li class="facetShowMoreLi"><a href="" class="facetShowMore">Show more</a></li>');
            }
        });
    }
    collapseFacets();

    function toggleTaxonomyChildren() {
        $('.taxonomy-parent-arrow').on('click', function () {
            var $this = $(this);

            $this.parents('.taxonomy-label-wrap').siblings('.taxonomy-child-list').slideToggle();
            $this.hasClass('icon-general-arrow-filled-right') ?
                $this.removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down') :
                $this.removeClass('icon-general-arrow-filled-down').addClass('icon-general-arrow-filled-right');
        });

        // if taxonomy is already selected expand its parents
        if ($('.taxonomy-child-list .queryitem').length > 0) {
            $('.taxonomy-child-list .queryitem').parents('.taxonomy-child-list .taxonomy-child-list-item').each(function () {
                var $selectedElement = $(this).find('.queryitem');
                if ($selectedElement.length > 0) {
                    // expand this child list
                    var $arrowElement = $(this).find('.taxonomy-parent-arrow').first();
                    if ($arrowElement !== undefined && $arrowElement.length > 0 && $arrowElement.hasClass('icon-general-arrow-filled-right')) {
                        $arrowElement.parents('.taxonomy-label-wrap').siblings('.taxonomy-child-list').slideToggle();
                        $arrowElement.removeClass('icon-general-arrow-filled-right').addClass('icon-general-arrow-filled-down');
                    }
                }
            });
        }
    }; // END: toggleTaxonomyChildren()
    toggleTaxonomyChildren(); // run the function when page loads (also called in doSolrSearch ajax below)

    var cache = {};
    //push the current state into the cache and into the history
    var initialQueryString = window.location.search.substring(1);


    window.onpopstate = function (e) {
        if (e.state) {
            SCM.SearchResults.doSolrSearch(e.state);
        }
    };

    SCM.PublicationDateFilter.init();

    //bind actions
    (function() {
        var $updateTarget = $(SCM.SearchResults.defaults.updateTargetSelector);

        cache[initialQueryString] = { results: $updateTarget.html() };
        window.history.replaceState({ queryString: initialQueryString }, null, null);

        var isAlertPostCompleted = true;

        $updateTarget.on('click', '.chkSelect', function (e) {
            SCM.SearchResults.doSolrSearch({ queryString: $(this).data('redirectUrl') });
        });

        $updateTarget.on('click', '.js-sf-facet__link', function (e) {
            var url = $(this).attr('data-url');
            if (!(url === null || url === '#' || url === '')) {
                e.preventDefault();

                SCM.SearchResults.doSolrSearch({ queryString: url });
            }
        });

        $updateTarget.on('click', 'a.close', function(e) {
            var url = $(this).attr('data-url');
            if (!(url == null || url == '#' || url == '')) {
                e.preventDefault();

                SCM.SearchResults.doSolrSearch({ queryString: url });
            }
        });


        $updateTarget.on('click', '.rbShowFacet', function(e) {
            e.preventDefault();
            var previousStatus = $(this).attr('previous-status');
            // alert(this.checked);
            // alert(previousStatus);
            if (previousStatus == 'False') {
                var dataurl = $(this).attr('data-url');
                SCM.SearchResults.doSolrSearch({ queryString: dataurl });
            }


        });


        $updateTarget.on('click', '#solrSearchBtn', function(e) {
            var queryText = $('#txtSearch').val();

            if (!queryText || queryText === '') {
                alert("Please enter a term to perform search");
            } else {
                queryText = encodeURIComponent(queryText);
                SCM.SearchResults.doSolrSearch({ queryString: 'q=' + queryText });
            }
        });

        // Publication Date Filter
        $updateTarget.on('click', '#btnRangeSearch', function(e) {
            var fromYear = parseInt(SCM.PublicationDateFilter.$fromYear.val());
            var toYear = parseInt(SCM.PublicationDateFilter.$toYear.val());
            var fromMonth = parseInt(SCM.PublicationDateFilter.$fromMonth.val());
            var toMonth = parseInt(SCM.PublicationDateFilter.$toMonth.val());
            var validationResponse = '';
            
            if (SCM.PublicationDateFilter.isSingleDateSelected) {
                validationResponse = SCM.PublicationDateFilter.getValidationResponseTextForSingleDate(fromYear);
            } else {
                validationResponse = SCM.PublicationDateFilter.getValidationResponseTextForDateRange(fromYear, toYear, fromMonth, toMonth);
            }
            if (validationResponse && validationResponse.length) {
                // Uh-oh! User did something bad!
                $('.js-publication-date-filter-validation').text(validationResponse);
                $('#js-publication-date-filter-modal').foundation('reveal', 'open');
                return;
            }

            var dateString = SCM.PublicationDateFilter.getSolrDateString(fromYear, toYear, fromMonth, toMonth);
            dateString = dateString
                         + '&dateFilterType='
                         + (SCM.PublicationDateFilter.isSingleDateSelected ? 'single' : 'range');
            var searchUrl = $(this).attr('data-url')
                .replace('&dateFilterType=single', '')
                .replace('&dateFilterType=range', '')
                .replace('queryText', dateString);

            SCM.SearchResults.doSolrSearch({ queryString: searchUrl });
        });

        var isTrue = function(input) {
            if (typeof input === 'string') {
                return input.toLowerCase() === 'true';
            }

            return !!input;
        };

        var signUpForAlerts = function() {
            var modelValues = {
                UserEmail: $('#UserEmail').val(),
                ResourceTitle: $('#ResourceTitle').val(),
                AlertType: $('#AlertType').val(),
                CurrentUserEmail: $('#CurrentUserEmail').val(),
                IsUserAlreadySubscribed: isTrue($('#IsUserAlreadySubscribed').val()),
                SuccessfulUpdate: $('#SuccessfulUpdate').val(),
                ResourceId: $('#ResourceId').val(),
                ResourceType: $('#ResourceType').val(),
                SearchTerm: $('#SearchTerm').val(),
                SearchUrl: $('#SearchUrl').val(),
                CurrentAlertContextSiteId: $("#CurrentAlertContextSiteId").val(),
                ShowSaveSearchToUnauthenticatedUser: isTrue($('#ShowSaveSearchToUnauthenticatedUser').val()),
                UserIsLoggedIn: isTrue($('#UserIsLoggedIn').val())
            };
            if (modelValues.IsUserAlreadySubscribed != null && modelValues.IsUserAlreadySubscribed) {
                var myAccountUrl = $('#Config_SearchAlertMyAccoutUrl').val();
                window.location.href = myAccountUrl;
            } else if (modelValues.ShowSaveSearchToUnauthenticatedUser && !modelValues.UserIsLoggedIn) {
                ShowSignInForSearchAlertSignUp();
                isAlertPostCompleted = true;
            } else {
                $.post("/Toolbox/ToolboxGetAlertsUpdateMessage", modelValues, function(data) {
                    isAlertPostCompleted = true;
                    alert("Alert Saved Sucessfully. Visit My Account page to manage your email alerts");
                    // alert(data);
                    $('#divSearchAlerts').html(data);
                    $('#divSearchAlerts a').on('click', function(e) {
                        e.preventDefault();
                        signUpForAlerts();
                    });
                });
            }

        }

        $updateTarget.on('click', '#divSearchAlerts a', function(e) {
            e.preventDefault();
            //alert(isAlertPostCompleted);
            if (isAlertPostCompleted) {
                isAlertPostCompleted = false;
                signUpForAlerts();
            }
        });
        
    }());

    function initFigureModalContainer(openModal, modalItemToOpen) {
        SCM.ArticleImageDetails.init("sr-item-image", openModal, modalItemToOpen);
    }
    initFigureModalContainer(false, "0");
    //add search functions to SCM.SearchResults
    SCM.SearchResults = $.extend(SCM.SearchResults, function ($, undefined) {

        var doSolrSearch = function (myobject) {

            /* The openModal section of code below is needed by SCM.SharedWidgets.ArticleImageDetails.js
             * to control opening the next or previous image modal after reloading search results for 
             * the next or previous page respectively.  The value of myobject.openModal indicates
             * which modal to open.  Typically, this will be 0 for the next page and the index of
             * the last image on the previous page (ex. 23 when 0 to 23 items are on a search page).
             * After completing the search ajax call, theopenModal state is passed to 
             * InitFigureModalContainer function which determines whether the image modal is 
             * opened. 
             */
            var openModal = false;
            var modalItemToOpen;
            if (typeof myobject.openModal !== "undefined") {
                openModal = true;
                modalItemToOpen = myobject.openModal;
            }

            // only trigger it on search result page (still not ideal to assume that hash tag is always for search though)
            var searchUrlPatt = /\/(search-results|advanced-search)$/i;
            if (!searchUrlPatt.test(location.pathname)) {
                return;
            }
            var settings = $.extend(SCM.SearchResults.defaults, myobject);

            var advancedSearchUrlPattern = /\/advanced-search$/i;
            if (advancedSearchUrlPattern.test(location.pathname)) {
                // User is on the Advanced Search page. Redirect to the Search Results page
                var newUrl = '/search-results';
                if (typeof settings.baseSiteUrl !== "undefined" && settings.baseSiteUrl !== '') {
                    newUrl = "//" + settings.baseSiteUrl + newUrl;
                }
                newUrl += "?" + myobject.queryString;
                window.location = newUrl;
                return;
            }

            var $updateTarget = $(settings.updateTargetSelector);

            if (cache[myobject.queryString]) {
                if (!myobject.cacheSearchWithoutUpdatingDom) {
                    //no need hit the server, we've run the query before in the context of this page
                    $updateTarget.html(cache[myobject.queryString].results).show();
                    //need to rebind things that would normally rebind after the ajax post
                    SCM.SolrSearch.ajaxComplete();
                    bindObjectsOnUpdate(myobject, $updateTarget);
                    initFigureModalContainer(openModal, modalItemToOpen);
                }
                return;
            }

            // change instance name if image tab is showing and add image tab query string if not already there
            var imageTabActive = false;
            var multimediaGalleryQueryStringValue = $.deparam.querystring()["mg"];
            if (typeof multimediaGalleryQueryStringValue !== 'undefined') {
                imageTabActive = multimediaGalleryQueryStringValue.toLowerCase() === "true";
            }
            if (imageTabActive) {
                settings.instanceName = "OUP_SearchResults_MG";
                if (myobject.queryString !== null) {
                    if (!(myobject.queryString.toLowerCase().indexOf("mg=true") > 0)) {
                        myobject.queryString = myobject.queryString + "&mg=true";
                    }
                }
            }

            var ajaxUrl = '/' + settings.controller + '/' + settings.action + '/' + settings.instanceName;
            if (typeof settings.baseSiteUrl !== "undefined" && settings.baseSiteUrl !== '') {
                ajaxUrl = "//" + settings.baseSiteUrl + ajaxUrl;
            }
            ajaxUrl += "?" + myobject.queryString;

            if (myobject.functionToDoWhileAjaxLoading) {
                myobject.functionToDoWhileAjaxLoading(myobject.currentItem);
            }
            
            $.get(ajaxUrl).done(function (results) {
                if (!myobject.cacheSearchWithoutUpdatingDom) {
                    $updateTarget.html(results);
                }
                
                cache[myobject.queryString] = {
                    results: results,
                    updateTargetSelector: settings.updateTargetSelector
                };

                if (!myobject.cacheSearchWithoutUpdatingDom) {
                    bindObjectsOnUpdate(myobject, $updateTarget);
                    initFigureModalContainer(openModal, modalItemToOpen);
                }
            })
                .fail(handleAjaxError)
                .always(function () {
                    if (myobject.functionToDoWhileAjaxLoading) {
                        myobject.functionToDoWhileAjaxLoading(myobject.currentItem);
                    }
                });

        }; // END: doSolrSearch(myobject)

        function handleAjaxError(xmlHttpRequest, textStatus, errorThrown) {
            if (window.console) {
                console.error(errorThrown);
            }
        }

        // function to bind objects after ajax call to SOLR or retrieve results from cache
        function bindObjectsOnUpdate(myobject, $updateTarget) {
            
            scrollIfNotInView($updateTarget[0]);
            
            // Below code is to retain the viewoption selected by client
            if (typeof clientViewOption !== "undefined" && clientViewOption !== '') {
                var $sriExpandedView = $('.sri-expandedView');
                if (clientViewOption === 'Expanded') {
                    $sriExpandedView.show();
                } else {
                    $sriExpandedView.hide();
                }
            }

            toggleTaxonomyChildren();

            collapseFacets();

            // verify if browser supports history.state before using - not supported in Edge
            if (window.history.state) {
                if (window.history.state.queryString != myobject.queryString) {
                    window.history.pushState(myobject,
                        null,
                        window.location.pathname + '?' + myobject.queryString);
                }
            }
            else {
                window.history.pushState(myobject,
                    null,
                    window.location.pathname + '?' + myobject.queryString);
            }

            if (SCM.JournalCitationFilter) {
                SCM.JournalCitationFilter.init();
            }

        }

        var scrollIfNotInView = function (target) {
            var rect = target.getBoundingClientRect();

            if (rect.top < 0) {
                $('html, body').animate({
                    scrollTop: target.offsetTop
                }, 1000);
            }
        }

        return { doSolrSearch: doSolrSearch };
    }(jQuery));

});
var SCM = SCM || {};
(function (SolrSearch, $, undefined) {

    // ----
    // private variables and functions
    // ----
    var bodyVar = $('body'),
        hfSolrJournalID = $("#hfSolrJournalID"),
        hfParentSiteName = $("#hfParentSiteName").val(),
        hfGlobalSearchSiteURL = $("#hfGlobalSearchSiteURL").val(),
        currentSearchScope = $("#navbar-search-filter :selected").val(),
        hfjournalSiteScope = $('#hfjournalSiteScope').val(),
        hfparentSiteScope = $('#hfparentSiteScope').val(),
        searchSiteID = $("#hfsiteID").val(),
        hfParentSiteURL = $("#hfparentSiteUrl").val(),
        hfparentSiteID = $("#hfparentSiteID").val(),
        siteUrl = $("#hfSiteURL").val(),
        hfdefaultSearchURL = $("#hfdefaultSearchURL").val(),
        defaultAdvancedSearchUrl = $('#hfDefaultAdvancedSearchUrl').val(),
        hfIssueSearch = $('#hfIssueSearch').val(),
        hfIssueSiteScope = $('#hfIssueSiteScope').val(),
        queryText = "";

    $('#navbar-search-filter, #mobile-navbar-search-filter').change(function () {
        currentSearchScope = $(this).val();
        setAdvancedSearchLinkToCurrentSearchScope();
    });

    function setAdvancedSearchLinkToCurrentSearchScope() /* void */ {
        if (currentSearchScope === hfparentSiteScope) {
            // Parent site
            $('.js-advanced-search').attr('href', getBaseUrl(hfParentSiteURL) + '/' + getSearchUrl(defaultAdvancedSearchUrl));
        } else if (currentSearchScope === hfjournalSiteScope) {
            // Journals site
            $('.js-advanced-search').attr('href', getBaseUrl() + '/journals/' + getSearchUrl(defaultAdvancedSearchUrl, null, null, null, true));
        } else if (currentSearchScope !== '') {
            // Taxonomy search
            $('.js-advanced-search').attr('href', getBaseUrl(siteUrl) + '/' + getSearchUrl(defaultAdvancedSearchUrl, null, searchSiteID, currentSearchScope));
        } else {
            // Current site
            $('.js-advanced-search').attr('href', getBaseUrl(siteUrl) + '/' + getSearchUrl(defaultAdvancedSearchUrl, null, searchSiteID));
        }
    }

    function getBaseUrl(/*string?*/ override) /* -> string */ {
        if (!isNullOrEmpty(override)) {
            return getUrlProtocol() + override;
        } else {
            return getUrlProtocol() + window.location.hostname;
        }
    }

    function getUrlProtocol() /* -> string */ {
        return window.location.protocol + '//';
    }

    // Used in both iconClickSearch() and keydownSearch()
    var testSearchInput = function (inputToTest, scope) {
        var autoSuggestRunning = false;

        if (hfParentSiteName !== "") {
            doSolrSearch(inputToTest, scope);
        } else {
            //search term should not be blank
            if ($.trim(inputToTest) === "" || inputToTest === null || inputToTest === "Search OUP") {
                alert('Please enter a term to search: ');
                return false;
            } else if (!autoSuggestRunning && inputToTest) {
                doSolrSearch(inputToTest, scope);
                return true;
            } else {
                console.error('Search failed');
                return false;
            }
        }

    }; // END: testSearchInput()

    var doKeywordsSearch = function (keyword) {
        // make sure keyword is wrapped in quotes
        if (keyword[0] !== '"' && keyword[keyword.length - 1] !== '"') {
            keyword = '"' + keyword + '"';
        }
        var searchUrl = 'search-results?page=1&qb=%7B"Keywords1":' +
            encodeURIComponent(keyword) +
            "%7D&SearchSourceType=1";

        if (hfGlobalSearchSiteURL === undefined ||
            (hfGlobalSearchSiteURL !== undefined && hfGlobalSearchSiteURL === "")) {
            var hfSiteURL = $("#hfSiteURL");
            if (hfSiteURL.length) {
                searchUrl = "//" + hfSiteURL.val() + '/' + searchUrl; // + boostQueryParm; //new
            }
        } else {
            searchUrl = "//" + hfGlobalSearchSiteURL.val() + searchUrl; // + boostQueryParm; //new  
        }

        window.location.href = searchUrl;
    };
    var testKeypress = function (e, scopeToPass, inputToPass) {
        if (e.keyCode === 13) {
            e.preventDefault();
            testSearchInput(inputToPass, scopeToPass);
        }
    }; // END: testKeypress()


    function doSolrSearch(inquiry, searchScope) {
        queryText = encodeURIComponent(inquiry);

        //For Stats purposes, passing in JournalID consistently.
        //JournalIDs are expected even when none of the journals is selected.
        //Pass the extram parameter to handle Relevancy
        var q = '"' + queryText + '"';

        //Per TE-6432, removing v=$q from the boost query parameter
        //var boostQueryParm = "&exPrm_qqq={!payloadDisMaxQParser pf=Tags qf=Tags^0.0000001 payloadFields=Tags bf=}" + q;
        var boostQueryParm = "" + q;
        var searchUrl = "";
        var hfSiteURL = "";
        if (hfGlobalSearchSiteURL === undefined ||
            (hfGlobalSearchSiteURL !== undefined && hfGlobalSearchSiteURL === "")) {
            hfSiteURL = $("#hfSiteURL");
        } else {
            hfSiteURL = hfGlobalSearchSiteURL;
        }
        if (searchScope === $("#hfjournalSiteScope").val()) { //Search is done across all journals.
            searchUrl = "/../journals/" + hfdefaultSearchURL + queryText + "&SearchSourceType=1";
            window.location.href = searchUrl;
        } else if (isNullOrEmpty(searchScope)) { //No Scope
            //for Stats purposes, we need to pass in all the journalIDs.
            //STATS:instead of passing in all the Journal IDs, just pass allJournals=1 in the querystring
            searchUrl = getSearchUrl(hfdefaultSearchURL, queryText, searchSiteID, null, true);
            if (hfSiteURL.length) {
                searchUrl = "//" + hfSiteURL.val() + '/' + searchUrl;
            }
            window.location.href = searchUrl;
        } else if (searchScope === $("#hfparentSiteScope").val()) { //Parent Site
            searchUrl = getSearchUrl(hfdefaultSearchURL, queryText, hfparentSiteID);
            searchUrl = "//" + hfParentSiteURL + '/' + searchUrl;
            window.location.href = searchUrl;
        } else if (searchScope === hfIssueSiteScope) {  //In Issue Search
            searchUrl = getSearchUrl(hfdefaultSearchURL, queryText, hfparentSiteID, null, false, true);
            if (hfSiteURL.length) {
                searchUrl = "//" + hfSiteURL.val() + '/' + searchUrl;
            }
            window.location.href = searchUrl;
        } else { //Taxonomy 
            searchUrl = getSearchUrl(hfdefaultSearchURL, queryText, searchSiteID, searchScope);
            if (hfSiteURL.length) {
                searchUrl = "//" + hfSiteURL.val() + '/' + searchUrl; // + boostQueryParm; //new
            }
            window.location.href = searchUrl;
        }

    }; // END: doSolrSearch(inquiry, searchScope)

    function getSearchUrl(/*string*/ baseUrl, /*string*/ queryText, /*string*/ searchSiteId, /*string*/ taxonomy, /*bool*/ passAllJournals, /*bool*/issueSearch) /* -> string */ {
        // Validate parameters
        if (isNullOrEmpty(passAllJournals)) {
            passAllJournals = false;
        }
        var searchUrl = baseUrl;
        if (isNullOrEmpty(queryText)) {
            searchUrl = searchUrl.replace('&q=', '');
        } else {
            searchUrl += queryText;
        }
        if (!isNullOrEmpty(searchSiteId)) {
            searchUrl += "&fl_SiteID=" + searchSiteId;
        }
        searchUrl += "&SearchSourceType=1";
        if (passAllJournals === true) {
            searchUrl += "&allJournals=1";
        }
        if (issueSearch) {
            if (!isNullOrEmpty(hfIssueSearch)) {
                searchUrl += hfIssueSearch;
            }
        }
        if (!isNullOrEmpty(taxonomy)) {
            searchUrl += '&' + getTaxonomyParameter(taxonomy);
        }
        return searchUrl;
    }

    function isNullOrEmpty(element) {
        return typeof element === 'undefined' || element === undefined || element == null || element == '';
    }

    function getTaxonomyParameter(/*string*/ taxonomy) /* -> string */ {
        return 'tax=' + taxonomy;
    }

    var openSaveSolrSearch = function (solrSearchSaveModel) {
        solrSearchSaveModel.foundation('reveal', 'open');
    };

    var saveSolrSearchInfo = function (solrSearchSaveModel) {
        var txtSolrSearchName = $('.txtSolrSearchName');
        var ddlSearchAlertFrequency = $('#ddlSearchAlertFrequency');

        if ($.trim(txtSolrSearchName.val()) === "" || txtSolrSearchName.val() === null) {
            alert('Please enter a name');
            return false;
        }

        var redirectUrl = $('#hdnSearchSaveRedirectUrl');
        var currentUrl = window.location.href;

        var token = $("#SolrSearchAuthToken").val();
        var data = JSON.stringify({
            searchName: txtSolrSearchName.val(),
            url: currentUrl,
            scheduleId: ddlSearchAlertFrequency.val(),
            redirectUrl: redirectUrl.val(),
            token: token
        });
        var ajaxUrl = "//" + SCM.SearchResults.defaults.baseSiteUrl + "/Solr/SaveSolrSearchInfoWithToken";

        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            dataType: 'json',
            cache: false, // to defeat browser URL caching
            data: data,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != null) {
                    if (result.ReturnId) {
                        $("#SolrSearchAuthToken").val(result.ReturnId);
                    }

                    if (result.RedirectUrl && result.RedirectUrl.length) {
                        window.location = result.RedirectUrl;
                    } else {
                        alert(result.Html);
                        solrSearchSaveModel.foundation('reveal', 'close');
                    }
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (window.console) {
                    var err = eval("(" + xmlHttpRequest.responseText + ")");
                    console.log('error: ' + err);
                    console.log('status: ' + textStatus);
                }
            }
        });
    };

    function buildSaveSearchUiEvent() {
        var lnkSaveSolrSearch = $('.lnkSaveSolrSearch'),
            solrSearchSaveModel = $('.solrSearchSaveModel'),
            btnSolrSearchSave = $('.btnSolrSearchSave'),
            txtSolrSearchName = $('.txtSolrSearchName');

        // save solr search. Unbind event before register click event to prevent multiple clicks.
        lnkSaveSolrSearch.unbind("click").on("click", function () {
            var isUserLoggedIn = $(this).attr('data-userloggedin');
            if (isUserLoggedIn !== undefined && isUserLoggedIn.toLowerCase() === 'false') {
                var redirectUrl = $('#hdnSearchSaveRedirectUrl');
                var currentUrl = window.location.href;
                window.location = redirectUrl.val() + "?returnUrl=" + encodeURIComponent(currentUrl + "#triggerSaveSearch=1");
            } else {
                openSaveSolrSearch(solrSearchSaveModel);
            }
        });
        btnSolrSearchSave.unbind("click").on("click", function () { saveSolrSearchInfo(solrSearchSaveModel); });
        txtSolrSearchName.off('keypress')
            .on("keypress",
                function (e) {
                    var code = e.keyCode || e.which;
                    if (code === 13) {
                        saveSolrSearchInfo(solrSearchSaveModel);
                    }
                });
    }



    function restrictedImagesSearch() {
        $('div.sri-figure[restricted]')
            .each(function () {
                $(this).unbind('contextmenu').bind('contextmenu', function () { return false; });
            });
    }

    //------------------TAXONOMY------------------------------
    //TaxonomyBrowse
    $('body')
        .on('click',
            '.taxonomy-label',
            function () {
                var currentDataUrl = $('#TaxonomyCurrentDataUrl').val();
                currentDataUrl = decodeURIComponent(currentDataUrl);

                //check if this is the root node (for now, we're not executing any query for root node)
                var rootNodeSelectedId = $(this).attr("data-parentid");
                if (rootNodeSelectedId === "") {
                    return;
                }

                //get root node
                var rootNodeId = $('.taxonomy-node').attr("data-id");
                //alert('ROOT NODE: ' + rootNodeId);

                //selected taxonomy node
                //var curTaxonomyNodeId = $(this).attr("data-id");
                var curTaxonomyNodeId = $(this).parent('.taxonomy-label-wrap').attr("data-id");
                //alert('TAX NODE: ' + curTaxonomyNodeId);
                //alert('Current Data Url: ' + currentDataUrl);

                //check if any taxonomy filters have been applied already.
                var taxQsPos = currentDataUrl.indexOf("tax");
                var taxQsPresent = (taxQsPos === -1) ? false : true;

                if (!taxQsPresent) {
                    //filter applied for the first time.
                    currentDataUrl += "&tax=" + curTaxonomyNodeId;

                } else {
                    //taxonomy filter applied previously
                    var taxQueryTerm = currentDataUrl.substring(taxQsPos);
                    if (taxQueryTerm !== null && taxQueryTerm !== "") {
                        //check if taxonomy query was executed via Subject Dropdown, which is based on the rootNode.
                        if (taxQueryTerm.indexOf("=" + rootNodeId) > -1) {
                            //remove the root node and just use the selected node to expedite the query execution
                            currentDataUrl = currentDataUrl.replace(taxQueryTerm, "tax=" + curTaxonomyNodeId);

                        } else if ($
                            .inArray(curTaxonomyNodeId,
                                decodeURIComponent(taxQueryTerm
                                    .slice(4))
                                    .split(',')) ===
                            -1) {
                            //taxonomy query was executed from the facet section and has not already been selected
                            var newQuery = taxQueryTerm + "," + curTaxonomyNodeId;
                            currentDataUrl = currentDataUrl.replace(taxQueryTerm, newQuery);
                        }
                    }
                }

                SCM.SearchResults.doSolrSearch({ queryString: currentDataUrl });
            });

    function bindUiEvents() {
        var micrositeSearchIcon = $('.js-master-header').find(".microsite-search-icon"),
            micrositeSearchTerm = $('.js-master-header').find(".microsite-search-term"),
            mobileMicrositeSearchIcon = $('.js-master-header').find(".mobile-microsite-search-icon"),
            mobileMicrositeSearchTerm = $('.js-master-header').find(".mobile-microsite-search-term"),
            umbrellaSearchIcon = $('#UmbrellaSearchIcon'), // icon
            umbrellaHomeSearchIcon = $('#UmbrellaHomeSearchIcon'), // home icon
            umbrellaSearchTerm = $("#UmbrellaSearchTerm"), // term 
            umbrellaHomeSearchTerm = $("#UmbrellaHomeSearchTerm"), // home term
            articleKeywordSearchTerm = $(".kwd-part"), // article page keyword term
            umbrellaScope = "J*"; // J* = all journals (umbrella search) 

        // Searches performed when a search icon is clicked
        umbrellaSearchIcon
            .on("click", function () { testSearchInput(umbrellaSearchTerm.val(), umbrellaScope); });
        umbrellaHomeSearchIcon.on("click",
            function () { testSearchInput(umbrellaHomeSearchTerm.val(), umbrellaScope); });
        micrositeSearchIcon.on("click",
            function () { testSearchInput(micrositeSearchTerm.val(), currentSearchScope); });
        mobileMicrositeSearchIcon.on("click",
            function () { testSearchInput(mobileMicrositeSearchTerm.val(), currentSearchScope); });
        $(document.body).on("click", ".toolbar-search .microsite-search-icon",
            function () { testSearchInput($(this).siblings(".microsite-search-term").val(), currentSearchScope); });

        $('.searchLi .icon-search')
            .on("click", function () { testSearchInput(micrositeSearchTerm.val(), currentSearchScope); });
        articleKeywordSearchTerm.on("click", function () { doKeywordsSearch($(this).attr("data-keyword")); });

        // Searches performed when 'Enter' is pressed
        umbrellaSearchTerm.bind("keypress",
            function (e) { testKeypress(e, umbrellaScope, umbrellaSearchTerm.val()); });
        umbrellaHomeSearchTerm.bind("keypress",
            function (e) { testKeypress(e, umbrellaScope, umbrellaHomeSearchTerm.val()); });
        micrositeSearchTerm.bind("keypress",
            function (e) { testKeypress(e, currentSearchScope, micrositeSearchTerm.val()); });
        mobileMicrositeSearchTerm.bind("keypress",
            function (e) { testKeypress(e, currentSearchScope, mobileMicrositeSearchTerm.val()); });
        $(document.body).on("keypress", ".toolbar-search .microsite-search-term",
            function (e) { testKeypress(e, currentSearchScope, $(this).val()); });

    } // END: bindUiEvents


    // ----
    // public methods and properties accessible by SCM.[module_name].[method_name]
    // ----
    SolrSearch.init = function () {

        var searchScope = "";
        //$sortDropdown = $('.sort-dropdown'),
        //$sortOption = $('.sort-dropdown-option');

        bindUiEvents();
        buildSaveSearchUiEvent();
        restrictedImagesSearch();

        setAdvancedSearchLinkToCurrentSearchScope()

        // Mobile Search Filters
        $('body').on('click', '.sf-group-header', function () {
            //Search filters are only collapsible on mobile/table viewports
            if ($(window).outerWidth() < 1024) {
                var $this = $(this);
                var $facetHeaderIcon = $this.children('.sf-group-header-icon');

                $this.siblings('fieldset').children('.sf-facets, .sf-facet-list').slideToggle();
                $this.siblings('.taxonomy-node').slideToggle();
                $facetHeaderIcon.hasClass('icon-general_arrow-right')
                    ? $facetHeaderIcon.removeClass('icon-general_arrow-right')
                        .addClass('icon-general_arrow-down')
                    : $facetHeaderIcon
                        .removeClass('icon-general_arrow-down')
                        .addClass('icon-general_arrow-right');
            }
        });

        // configure Query Builder on page load
        SCM.QueryBuilder.configure();

        if ($(SCM.SearchResults.defaults.updateTargetSelector).length > 0) {
            //we're on the search results page so all searches should call the search results search method
            SCM.QueryBuilder.defaults.runSearch = function (queryString) {
                SCM.SearchResults.doSolrSearch({ queryString: queryString });
            };
        } else {

            //configure querybuilder for advance search
            $(".querybuilder-submit").attr('value', 'Search');
            $(".querybuilder-title").text("Build a query");

            SCM.QueryBuilder.defaults.runSearch = function (redirectUrl) {
                var searchSiteUrl = $("#hfSiteURL").val();
                if (redirectUrl.indexOf("q=") === -1) {
                    redirectUrl = "q=" + redirectUrl;
                }
                window.location = window.location
                    .protocol +
                    '//' +
                    searchSiteUrl +
                    '/search-results?' +
                    redirectUrl;
            };
        }

        // give initial sort order selection a class of 'selected'
        $('.sort-dropdown-option:selected').addClass('selected');


        bodyVar.on('click',
            '.sriTopiclink',
            function (e) {
                queryText = $(this).text();
                var searchTerm = queryText.replace(",", ""); // if string ends with coma remove it.
                searchScope = currentSearchScope; // hfSolrJournalID.val();
                if (searchScope === '' || searchScope === null) {
                    doSolrSearch(searchTerm, null);
                } else {
                    doSolrSearch(searchTerm, searchScope);
                }
                e.preventDefault();
            }); // END: $body.on('click', '.sriTopiclink', function (e) {})

        //CollectionLink Click (collections.aspx)
        $("a.categoryLink").each(function () {
                var _href = $(this).attr("href");
                var journalId = hfSolrJournalID.val();
                if (isNullOrEmpty(journalId)) {
                    $(this).attr("href", hfGlobalSearchSiteURL + _href);
                } else {
                    //microsite
                    var journalIdParm = journalId.substr(1, journalId.length);
                    $(this).attr("href", "/" + _href + '&fd_JournalID=' + journalIdParm);
                }
            }); // END: $.each("a.categoryLink", function () {})


        bodyVar.on('click',
            '#topicResultsWire',
            function (e) {
                var query = location.search;
                //journalId needs to be removed from query -- it's the last param
                query = query.substring(0, query.indexOf("&fd_JournalID"));
                window.location.href = hfGlobalSearchSiteURL.val() + "solr/topicresults.aspx" + query;
            }); // END: $body.on('click', '#topicResultsWire', function (e) {})

        bodyVar.on('click',
            '.mg-tab',
            function (e) {
                var tabName = $(this).data("tab");
                /* When transitioning between tabs, clear all parameters except free search, siteId, searchSourceType and allJournals elements if present */
                var freeSearchValue = $.deparam.querystring()["q"];
                var freeSearchQueryElement = "";
                if (typeof freeSearchValue !== 'undefined') {
                    freeSearchQueryElement = "&q=" + freeSearchValue;
                }
                var siteIdElement = "";
                var siteIdValue = $.deparam.querystring()["fl_SiteID"];
                if (typeof siteIdValue !== 'undefined') {
                    siteIdElement = "&fl_SiteID=" + siteIdValue;
                }
                var searchSourceTypeElement = "";
                var searchSourceTypeValue = $.deparam.querystring()["SearchSourceType"];
                if (typeof searchSourceTypeValue !== 'undefined') {
                    searchSourceTypeElement = "&SearchSourceType=" + searchSourceTypeValue;
                }
                var allJournalsElement = "";
                var allJournalsValue = $.deparam.querystring()["allJournals"];
                if (typeof allJournalsValue !== 'undefined') {
                    allJournalsElement = "&allJournals=" + allJournalsValue;
                }
                var imageQueryStringValue = $.deparam.querystring()["mg"];
                var imageTabActive = false;
                if (typeof imageQueryStringValue !== 'undefined') {
                    imageTabActive = (imageQueryStringValue.toLowerCase() === "true");
                }

                var articleDateQueryStringElement = '';
                var articleDateQueryStringValue = $.deparam.querystring()['rg_ArticleDate'];
                if (articleDateQueryStringValue) {
                    articleDateQueryStringElement = '&rg_ArticleDate=' + articleDateQueryStringValue;
                }

                var articleDateFilterTypeElement = '';
                var articleDateFilterTypeValue = $.deparam.querystring()['dateFilterType'];
                if (articleDateFilterTypeValue) {
                    articleDateFilterTypeElement = '&dateFilterType=' + articleDateFilterTypeValue;
                }

                var baseUrl = window.location.href.split('?')[0];
                var fullUrl = baseUrl + "?page=1" + freeSearchQueryElement + siteIdElement +
                              searchSourceTypeElement + allJournalsElement + articleDateQueryStringElement +
                              articleDateFilterTypeElement;
                if (tabName === "Images" && !imageTabActive) {
                    window.location.href = fullUrl + "&mg=true";
                }
                else if (tabName === "AllResults" && imageTabActive) {
                    window.location.href = fullUrl;
                }
            }); // END: $body.on('click', '.mg-tab', function (e) {})

    }; // END: SolrSearch.init()

    SolrSearch.ajaxComplete = function () {
        buildSaveSearchUiEvent();
        restrictedImagesSearch();
        SCM.QueryBuilder.configure();
        SCM.SiteJS.initSearchResultsSort();
        SCM.PublicationDateFilter.init();
    };


    SCM.SearchResults.defaults.instanceName = "OUP_SearchResults";
    SCM.SearchResults.defaults
        .updateTargetSelector = '#searchResultsPage'; // overwrite default value of '#divSearch'

    var baseSiteURL = $("#hfSiteURL");

    if (typeof baseSiteURL !== 'undefined' && baseSiteURL.val() !== "") {
        SCM.SearchResults.defaults.baseSiteUrl = baseSiteURL.val();
    }

    SCM.SolrSearch.init();

})(SCM.SolrSearch = SCM.SolrSearch || {}, jQuery);


var SCM = SCM || {};
var App = App || {};

(function(iou, $, ls, undefined) {
    var instOpenUrlKey = 'instOpenUrlKey_';
    var instOpenUrlNoDOIKey = 'instOpenUrlNoDOIKey_';
    var instOpenUrlBaseUrlKey = 'instOpenUrlBaseUrlKey_';
    
    iou.replaceOpenUrlPlaceHolders = function ($openUrlPlaceHolderElements, replaceLinkHtml) {
        if (replaceLinkHtml !== null && replaceLinkHtml !== '' && $openUrlPlaceHolderElements !== null) {
            $openUrlPlaceHolderElements.each(function () {
                var targetId = $(this).attr('data-targetId');
                var finalLinkHtml = replaceLinkHtml.replace('{openUrlTargetId}', targetId);
                $(this).html(finalLinkHtml);
                $(this).parent().show();
            });
        }
    };

    iou.replaceOpenUrlNonDOIPlaceHolders = function ($openUrlPlaceHoldersNoDOIElements, baseUrl, replaceHtml) {
        if (replaceHtml !== null && replaceHtml !== '' && $openUrlPlaceHoldersNoDOIElements !== null) {
            $openUrlPlaceHoldersNoDOIElements.each(function () {
                var $target = $(this).find(".js-open-url-link");
                if ($target && $target.length) {
                    var targetUrl = $target.attr('data-href-template');
                    if (targetUrl && targetUrl.length) {
                        targetUrl = targetUrl.replace('{targetURL}', baseUrl);
                        $target.attr('href', targetUrl);
                        $target.removeAttr('data-href-template');
                        $target.html(replaceHtml);
                        // display the link
                        $(this).parent().show();
                    }                    
                }
                
            });
        }
    };
    
    iou.getAndReplaceOpenUrlPlaceHolders = function ($openUrlPlaceHolderElements, $openUrlPlaceHoldersNoDOIElements) {
        var ajaxUrl = "/ThirdParty/InstitutionOpenUrlTemplate";
        $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: 'json',
            success: function (resultObject) {
                if (resultObject !== null && resultObject !== 'undefined') {
                    // json result object properties
                    // TargetUrl , DisplayOpenUrlLink , HasOpenUrlImage, LinkImageSource ,LinkImageText, BaseUrl
                    var replacelink = '';
                    var nonDOIreplaceLink = '';
                    if (resultObject.DisplayOpenUrlLink == true) {
                        if (resultObject.LinkImageSource !== null && resultObject.LinkImageSource !== '') {
                            replacelink = " <a target='_blank' href='" + resultObject.TargetUrl + "'><img src='" + resultObject.LinkImageSource + "'/></a> ";
                            nonDOIreplaceLink = "<img src='" + resultObject.LinkImageSource + "'/>";
                        } else {
                            replacelink = " <a target='_blank' href='" + resultObject.TargetUrl + "'> " + resultObject.LinkImageText + " </a> ";
                            nonDOIreplaceLink = "<img src='" + resultObject.LinkImageSource + "'/> ";
                        }
                    }
                    // now loop through each placeholders to 
                    iou.replaceOpenUrlPlaceHolders($openUrlPlaceHolderElements, replacelink);
                    iou.replaceOpenUrlNonDOIPlaceHolders($openUrlPlaceHoldersNoDOIElements, resultObject.BaseUrl, nonDOIreplaceLink);
                    // now that we determined replacement link, store it in session storage
                    if (ls !== null && window.sessionStorage !== null && typeof window.App.LoginUserInfo !== 'undefined' && typeof window.App.LoginUserInfo.currentSessionId !== 'undefined') {
                        ls.setItem(instOpenUrlKey + window.App.LoginUserInfo.currentSessionId, replacelink, window.sessionStorage);
                        ls.setItem(instOpenUrlNoDOIKey + window.App.LoginUserInfo.currentSessionId, nonDOIreplaceLink, window.sessionStorage);
                        ls.setItem(instOpenUrlBaseUrlKey + window.App.LoginUserInfo.currentSessionId, resultObject.BaseUrl, window.sessionStorage);
                    }
                }
            },
            error: function (errdata) {

            }
        });
    };
    
    iou.checkAndReplaceOpenUrlPlaceHolders = function () {

        // 1) it depends on App.LoginUserInfo.IsInstLoggedIn value to determine if institution is logged in
        // that object should be initialized and values set at master page level.
        // 2) If institution is logged in and also if there are any instOpenUrlPlaceHolders
        // then do ajax call to get openUrlTemplate for logged in institution

        if (typeof window.App.LoginUserInfo !== 'undefined' && window.App.LoginUserInfo.isInstLoggedIn > 0) {
            // check if article has any openurl templates wtih dois
            var $openUrlPlaceHolders = $('span[class="inst-open-url-holders"]');
            // Doing this to simplify checks for null/undefined later 
            var $openUrlDOIs = (
                    $openUrlPlaceHolders
                    && $openUrlPlaceHolders.length
                )  ? $openUrlPlaceHolders : null;

            // check if article has any openurl templates wtih no dois
            var $openUrlPlaceHoldersNoDOI = $('span[class="js-inst-open-url-holders-nodoi"]');
            // DOing this to simplify checks for null/undefined later 
            var $openUrlNoDOIs = (
                        $openUrlPlaceHoldersNoDOI
                        && $openUrlPlaceHoldersNoDOI.length
                    ) ? $openUrlPlaceHoldersNoDOI : null;

            // now check html5 session storage
            // if value exists get replacementLinkHtml, if not go get
            var storedLink = null;
            if (ls !== null && window.sessionStorage !== null && typeof window.App.LoginUserInfo.currentSessionId !== 'undefined') {
                //if we have one, we should have the other
                var storedLink = ls.getItem(instOpenUrlKey + window.App.LoginUserInfo.currentSessionId, window.sessionStorage);
                var storedNoDOILink = ls.getItem(instOpenUrlNoDOIKey + window.App.LoginUserInfo.currentSessionId, window.sessionStorage);
                var storedUrl = ls.getItem(instOpenUrlBaseUrlKey + window.App.LoginUserInfo.currentSessionId, window.sessionStorage);
            }
            // Need to have all 3 since they are stored together.  If one is gone, should re-fetch them
            if (storedLink && storedNoDOILink && storedUrl) {
                iou.replaceOpenUrlPlaceHolders($openUrlDOIs, storedLink);
                iou.replaceOpenUrlNonDOIPlaceHolders($openUrlNoDOIs, storedUrl, storedNoDOILink);
            }
            else {
                iou.getAndReplaceOpenUrlPlaceHolders($openUrlDOIs, $openUrlNoDOIs);
            }
        }
    };

    iou.init = function () {
        // articleFullText widget will leave placeholders for each openUrl token found in reference sectionxml
        // if an institution logged in, this script will get a urltemplate based institutionOpenUrl settings and 
        // replace these placeholders with template populated with appropriate values
        iou.checkAndReplaceOpenUrlPlaceHolders();
    };
})(SCM.InstitutionOpenUrl = SCM.InstitutionOpenUrl || {},jQuery,SCM.Utilities.LocalStorage)
var SCM = SCM || {};

(function (aft, $, iou, bc) {
    var widgetWrap = $('#ArticleFullTextWrap');
    var hasAccess = false;

    if (widgetWrap && widgetWrap.attr('data-userHasAccess')) {
        hasAccess = widgetWrap.attr('data-userHasAccess').toLowerCase() === 'true';
    }

    // for un-authenticated users, replace reveal-modal links (such as links to references) with spans
    // since the target of the link is likely to be missing when the user is only viewing an abstract
    aft.replaceContentLinks = function() {
        if (!hasAccess) {
            var contentLinks = widgetWrap.find('a[data-reveal-id]');
            contentLinks.each(function () {
                $(this).replaceWith(function () {
                    var anchorHtml = this.innerHTML;
                    return '<span>' + anchorHtml + '</span>';
                });
            });
        }
    };
    // initialize functionality
    aft.init = function () {
        aft.replaceContentLinks();
        bc.init();
        iou.init();
    };
})(SCM.ArticleFulltext = SCM.ArticleFulltext || {}, jQuery, SCM.InstitutionOpenUrl, SCM.Utilities.Brightcove);

var SCM = SCM || {};

(function (bcmv, $, iou) {

    // new class created for future functionality
    // initialize functionality
    bcmv.init = function () {
        iou.init();
    };
})(SCM.BookChapterMainView = SCM.BookChapterMainView || {}, jQuery, SCM.InstitutionOpenUrl);

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * Credit goes to jquery.fancybox.js
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

		try{
			var _cookiepolicyfancybox = jQuery;                     
		}catch(e){
		try{
			var _cookiepolicyfancybox = $;                         
		}catch(e){
			}
		}      
        // resolve jQuery conflict
		if ($ !== jQuery) {
		    _cookiepolicyfancybox = _cookiepolicyfancybox.noConflict();
		}
		
		//alert('_cookiepolicyfancybox :'+_cookiepolicyfancybox);
;(function(_cookiepolicyfancybox) {
        var tmp, loading, overlay, wrap, outer, content, close, title, nav_left, nav_right,

                selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

                ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

                loadingTimer, loadingFrame = 1,

                titleHeight = 0, titleStr = '', start_pos, final_pos, busy = false, fx = _cookiepolicyfancybox.extend(_cookiepolicyfancybox('<div/>')[0], { prop: 0 }),

                /*
                 * Private methods 
                 */

                _abort = function() {
                        loading.hide();

                        imgPreloader.onerror = imgPreloader.onload = null;

                        if (ajaxLoader) {
                                ajaxLoader.abort();
                        }

                        tmp.empty();
                },

                _error = function() {
                        if (false === selectedOpts.onError(selectedArray, selectedIndex, selectedOpts)) {
                                loading.hide();
                                busy = false;
                                return;
                        }

                        selectedOpts.titleShow = false;

                        selectedOpts.width = 'auto';
                        selectedOpts.height = 'auto';

                        tmp.html( '<p id="oupcookiepolicy_fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>' );

                        _process_inline();
                },

                _start = function() {
                        var obj = selectedArray[ selectedIndex ],
                                href, 
                                type, 
                                title,
                                str,
                                emb,
                                ret;

                        _abort();

                        selectedOpts = _cookiepolicyfancybox.extend({}, _cookiepolicyfancybox.fn.oupcookiepolicy_fancybox.defaults, (typeof _cookiepolicyfancybox(obj).data('oupcookiepolicy_fancybox') == 'undefined' ? selectedOpts : _cookiepolicyfancybox(obj).data('oupcookiepolicy_fancybox')));

                        ret = selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts);

                        if (ret === false) {
                                busy = false;
                                return;
                        } else if (typeof ret == 'object') {
                                selectedOpts = _cookiepolicyfancybox.extend(selectedOpts, ret);
                        }

                        title = selectedOpts.title || (obj.nodeName ? _cookiepolicyfancybox(obj).attr('title') : obj.title) || '';

                        if (obj.nodeName && !selectedOpts.orig) {
                                selectedOpts.orig = _cookiepolicyfancybox(obj).children("img:first").length ? _cookiepolicyfancybox(obj).children("img:first") : _cookiepolicyfancybox(obj);
                        }

                        if (title === '' && selectedOpts.orig && selectedOpts.titleFromAlt) {
                                title = selectedOpts.orig.attr('alt');
                        }

                        href = selectedOpts.href || (obj.nodeName ? _cookiepolicyfancybox(obj).attr('href') : obj.href) || null;

                        if ((/^(?:javascript)/i).test(href) || href == '#') {
                                href = null;
                        }

                        if (selectedOpts.type) {
                                type = selectedOpts.type;

                                if (!href) {
                                        href = selectedOpts.content;
                                }

                        } else if (selectedOpts.content) {
                                type = 'html';

                        } else if (href) {
                                if (href.match(imgRegExp)) {
                                        type = 'image';

                                } else if (href.match(swfRegExp)) {
                                        type = 'swf';

                                } else if (_cookiepolicyfancybox(obj).hasClass("iframe")) {
                                        type = 'iframe';

                                } else if (href.indexOf("#") === 0) {
                                        type = 'inline';

                                } else {
                                        type = 'ajax';
                                }
                        }

                        if (!type) {
                                _error();
                                return;
                        }

                        if (type == 'inline') {
                                obj     = href.substr(href.indexOf("#"));
                                type = _cookiepolicyfancybox(obj).length > 0 ? 'inline' : 'ajax';
                        }

                        selectedOpts.type = type;
                        selectedOpts.href = href;
                        selectedOpts.title = title;

                        if (selectedOpts.autoDimensions) {
                                if (selectedOpts.type == 'html' || selectedOpts.type == 'inline' || selectedOpts.type == 'ajax') {
                                        selectedOpts.width = 'auto';
                                        selectedOpts.height = 'auto';
                                } else {
                                        selectedOpts.autoDimensions = false;    
                                }
                        }

                        if (selectedOpts.modal) {
                                selectedOpts.overlayShow = true;
                                selectedOpts.hideOnOverlayClick = false;
                                selectedOpts.hideOnContentClick = false;
                                selectedOpts.enableEscapeButton = false;
                                selectedOpts.showCloseButton = false;
                        }

                        selectedOpts.padding = parseInt(selectedOpts.padding, 10);
                        selectedOpts.margin = parseInt(selectedOpts.margin, 10);

                        tmp.css('padding', (selectedOpts.padding + selectedOpts.margin));

                        _cookiepolicyfancybox('.oupcookiepolicy_fancybox-inline-tmp').unbind('oupcookiepolicy_fancybox-cancel').bind('oupcookiepolicy_fancybox-change', function() {
                                _cookiepolicyfancybox(this).replaceWith(content.children());                                
                        });

                        switch (type) {
                                case 'html' :
                                        tmp.html( selectedOpts.content );
                                        _process_inline();
                                break;

                                case 'inline' :
                                        if ( _cookiepolicyfancybox(obj).parent().is('#oupcookiepolicy_fancybox-content') === true) {
                                                busy = false;
                                                return;
                                        }

                                        _cookiepolicyfancybox('<div class="oupcookiepolicy_fancybox-inline-tmp" />')
                                                .hide()
                                                .insertBefore( _cookiepolicyfancybox(obj) )
                                                .bind('oupcookiepolicy_fancybox-cleanup', function() {
                                                        _cookiepolicyfancybox(this).replaceWith(content.children());
                                                }).bind('oupcookiepolicy_fancybox-cancel', function() {
                                                        _cookiepolicyfancybox(this).replaceWith(tmp.children());
                                                });

                                        _cookiepolicyfancybox(obj).appendTo(tmp);

                                        _process_inline();
                                break;

                                case 'image':
                                        busy = false;

                                        _cookiepolicyfancybox.oupcookiepolicy_fancybox.showActivity();

                                        imgPreloader = new Image();

                                        imgPreloader.onerror = function() {
                                                _error();
                                        };

                                        imgPreloader.onload = function() {
                                                busy = true;

                                                imgPreloader.onerror = imgPreloader.onload = null;

                                                _process_image();
                                        };

                                        imgPreloader.src = href;
                                break;

                                case 'swf':
                                        selectedOpts.scrolling = 'no';

                                        str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
                                        emb = '';

                                        _cookiepolicyfancybox.each(selectedOpts.swf, function(name, val) {
                                                str += '<param name="' + name + '" value="' + val + '"></param>';
                                                emb += ' ' + name + '="' + val + '"';
                                        });

                                        str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

                                        tmp.html(str);

                                        _process_inline();
                                break;

                                case 'ajax':
                                        busy = false;

                                        _cookiepolicyfancybox.oupcookiepolicy_fancybox.showActivity();

                                        selectedOpts.ajax.win = selectedOpts.ajax.success;

                                        ajaxLoader = _cookiepolicyfancybox.ajax(_cookiepolicyfancybox.extend({}, selectedOpts.ajax, {
                                                url     : href,
                                                data : selectedOpts.ajax.data || {},
                                                error : function(XMLHttpRequest, textStatus, errorThrown) {
                                                        if ( XMLHttpRequest.status > 0 ) {
                                                                _error();
                                                        }
                                                },
                                                success : function(data, textStatus, XMLHttpRequest) {
                                                        var o = typeof XMLHttpRequest == 'object' ? XMLHttpRequest : ajaxLoader;
                                                        if (o.status == 200) {
                                                                if ( typeof selectedOpts.ajax.win == 'function' ) {
                                                                        ret = selectedOpts.ajax.win(href, data, textStatus, XMLHttpRequest);

                                                                        if (ret === false) {
                                                                                loading.hide();
                                                                                return;
                                                                        } else if (typeof ret == 'string' || typeof ret == 'object') {
                                                                                data = ret;
                                                                        }
                                                                }

                                                                tmp.html( data );
                                                                _process_inline();
                                                        }
                                                }
                                        }));

                                break;

                                case 'iframe':
                                        _show();
                                break;
                        }
                },

                _process_inline = function() {
                        var
                                w = selectedOpts.width,
                                h = selectedOpts.height;

                        if (w.toString().indexOf('%') > -1) {
                                w = parseInt( (_cookiepolicyfancybox(window).width() - (selectedOpts.margin * 2)) * parseFloat(w) / 100, 10) + 'px';

                        } else {
                                w = w == 'auto' ? 'auto' : w + 'px';    
                        }

                        if (h.toString().indexOf('%') > -1) {
                                h = parseInt( (_cookiepolicyfancybox(window).height() - (selectedOpts.margin * 2)) * parseFloat(h) / 100, 10) + 'px';

                        } else {
                                h = h == 'auto' ? 'auto' : h + 'px';    
                        }

                        tmp.wrapInner('<div style="width:' + w + ';height:' + h + ';overflow: ' + (selectedOpts.scrolling == 'auto' ? 'auto' : (selectedOpts.scrolling == 'yes' ? 'scroll' : 'hidden')) + ';position:relative;"></div>');

                        selectedOpts.width = tmp.width();
                        selectedOpts.height = tmp.height();

                        _show();
                },

                _process_image = function() {
                        selectedOpts.width = imgPreloader.width;
                        selectedOpts.height = imgPreloader.height;

                        _cookiepolicyfancybox("<img />").attr({
                                'id' : 'oupcookiepolicy_fancybox-img',
                                'src' : imgPreloader.src,
                                'alt' : selectedOpts.title
                        }).appendTo( tmp );

                        _show();
                },

                _show = function() {
                        var pos, equal;

                        loading.hide();

			//alert('currentOpts.onCleanup :'+currentOpts.onCleanup);
                      if (wrap.is(":visible") && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
                                _cookiepolicyfancybox.event.trigger('oupcookiepolicy_fancybox-cancel');

                                busy = false;
                                return;
                        }

                        busy = true;

                        _cookiepolicyfancybox(content.add( overlay )).unbind();

                        _cookiepolicyfancybox(window).unbind("resize.fb scroll.fb");
                        _cookiepolicyfancybox(document).unbind('keydown.fb');

                        currentArray = selectedArray;
                        currentIndex = selectedIndex;
                        currentOpts = selectedOpts;

                        if (wrap.is(":visible") && currentOpts.titlePosition !== 'outside') {
                                wrap.css('height', wrap.height());
                        }


                        if (currentOpts.overlayShow) {
                                overlay.css({
                                        'background-color' : currentOpts.overlayColor,
                                        'opacity' : currentOpts.overlayOpacity,
                                        'cursor' : currentOpts.hideOnOverlayClick ? 'pointer' : 'auto',
                                        'height' : _cookiepolicyfancybox(document).height()
                                });

                                if (!overlay.is(':visible')) {
                                        overlay.show();
                                }
                        } else {
                                overlay.hide();
                        }

                        final_pos = _get_zoom_to();

                        _process_title();

                        if (wrap.is(":visible")) {
                                _cookiepolicyfancybox( close.add( nav_left ).add( nav_right ) ).hide();

                                pos = wrap.position(),

                                start_pos = {
                                        top      : pos.top,
                                        left : pos.left,
                                        width : wrap.width(),
                                        height : wrap.height()
                                };

                                equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

                                content.fadeTo(currentOpts.changeFade, 0.3, function() {
                                        var finish_resizing = function() {
                                                content.html( tmp.contents() ).fadeTo(currentOpts.changeFade, 1, _finish);
                                        };

                                        _cookiepolicyfancybox.event.trigger('oupcookiepolicy_fancybox-change');

                                        content
                                                .empty()
                                                .removeAttr('filter')
                                                .css({
                                                        'border-width' : currentOpts.padding,
                                                        'width' : final_pos.width - currentOpts.padding * 2,
                                                        'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
                                                });

                                        if (equal) {
                                                finish_resizing();

                                        } else {
                                                fx.prop = 0;

                                                _cookiepolicyfancybox(fx).animate({prop: 1}, {
                                                         duration : currentOpts.changeSpeed,
                                                         easing : currentOpts.easingChange,
                                                         step : _draw,
                                                         complete : finish_resizing
                                                });
                                        }
                                });

                                return;
                        }

                        wrap.removeAttr("style");

                        content.css('border-width', currentOpts.padding);

                        if (currentOpts.transitionIn == 'elastic') {
                                start_pos = _get_zoom_from();

                                content.html( tmp.contents() );

                                wrap.show();

                                if (currentOpts.opacity) {
                                        final_pos.opacity = 0;
                                }

                                fx.prop = 0;

                                _cookiepolicyfancybox(fx).animate({prop: 1}, {
                                         duration : currentOpts.speedIn,
                                         easing : currentOpts.easingIn,
                                         step : _draw,
                                         complete : _finish
                                });

                                return;
                        }

                        if (currentOpts.titlePosition == 'inside' && titleHeight > 0) { 
                                title.show();   
                        }

                        content
                                .css({
                                        'width' : final_pos.width - currentOpts.padding * 2,
                                        'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
                                })
                                .html( tmp.contents() );

                        wrap
                                .css(final_pos)
                                .fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
                },

                _format_title = function(title) {
                        if (title && title.length) {
                                if (currentOpts.titlePosition == 'float') {
                                        return '<table id="oupcookiepolicy_fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="oupcookiepolicy_fancybox-title-float-left"></td><td id="oupcookiepolicy_fancybox-title-float-main">' + title + '</td><td id="oupcookiepolicy_fancybox-title-float-right"></td></tr></table>';
                                }

                                return '<div id="oupcookiepolicy_fancybox-title-' + currentOpts.titlePosition + '">' + title + '</div>';
                        }

                        return false;
                },

                _process_title = function() {
                        titleStr = currentOpts.title || '';
                        titleHeight = 0;

                        title
                                .empty()
                                .removeAttr('style')
                                .removeClass();

                        if (currentOpts.titleShow === false) {
                                title.hide();
                                return;
                        }

                        titleStr = _cookiepolicyfancybox.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(titleStr, currentArray, currentIndex, currentOpts) : _format_title(titleStr);

                        if (!titleStr || titleStr === '') {
                                title.hide();
                                return;
                        }

                        title
                                .addClass('oupcookiepolicy_fancybox-title-' + currentOpts.titlePosition)
                                .html( titleStr )
                                .appendTo( 'body' )
                                .show();

                        switch (currentOpts.titlePosition) {
                                case 'inside':
                                        title
                                                .css({
                                                        'width' : final_pos.width - (currentOpts.padding * 2),
                                                        'marginLeft' : currentOpts.padding,
                                                        'marginRight' : currentOpts.padding
                                                });

                                        titleHeight = title.outerHeight(true);

                                        title.appendTo( outer );

                                        final_pos.height += titleHeight;
                                break;

                                case 'over':
                                        title
                                                .css({
                                                        'marginLeft' : currentOpts.padding,
                                                        'width' : final_pos.width - (currentOpts.padding * 2),
                                                        'bottom' : currentOpts.padding
                                                })
                                                .appendTo( outer );
                                break;

                                case 'float':
                                        title
                                                .css('left', parseInt((title.width() - final_pos.width - 40)/ 2, 10) * -1)
                                                .appendTo( wrap );
                                break;

                                default:
                                        title
                                                .css({
                                                        'width' : final_pos.width - (currentOpts.padding * 2),
                                                        'paddingLeft' : currentOpts.padding,
                                                        'paddingRight' : currentOpts.padding
                                                })
                                                .appendTo( wrap );
                                break;
                        }

                        title.hide();
                },

                _set_navigation = function() {
                        if (currentOpts.enableEscapeButton || currentOpts.enableKeyboardNav) {
                                _cookiepolicyfancybox(document).bind('keydown.fb', function(e) {
                                        if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
                                                e.preventDefault();
                                                _cookiepolicyfancybox.oupcookiepolicy_fancybox.close();

                                        } else if ((e.keyCode == 37 || e.keyCode == 39) && currentOpts.enableKeyboardNav && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
                                                e.preventDefault();
                                                _cookiepolicyfancybox.oupcookiepolicy_fancybox[ e.keyCode == 37 ? 'prev' : 'next']();
                                        }
                                });
                        }

                        if (!currentOpts.showNavArrows) { 
                                nav_left.hide();
                                nav_right.hide();
                                return;
                        }

                        if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
                                nav_left.show();
                        }

                        if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
                                nav_right.show();
                        }
                },

                _finish = function () {
                        if (!_cookiepolicyfancybox.support.opacity) {
                                content.get(0).style.removeAttribute('filter');
                                wrap.get(0).style.removeAttribute('filter');
                        }

                        if (selectedOpts.autoDimensions) {
                                content.css('height', 'auto');
                        }

                        wrap.css('height', 'auto');

                        if (titleStr && titleStr.length) {
                                title.show();
                        }

                        if (currentOpts.showCloseButton) {
                                close.show();
                        }

                        _set_navigation();
        
                        if (currentOpts.hideOnContentClick)     {
                                content.bind('click', _cookiepolicyfancybox.oupcookiepolicy_fancybox.close);
                        }

                        if (currentOpts.hideOnOverlayClick)     {
                                overlay.bind('click', _cookiepolicyfancybox.oupcookiepolicy_fancybox.close);
                        }

                        _cookiepolicyfancybox(window).bind("resize.fb", _cookiepolicyfancybox.oupcookiepolicy_fancybox.resize);

                        if (currentOpts.centerOnScroll) {
                                _cookiepolicyfancybox(window).bind("scroll.fb", _cookiepolicyfancybox.oupcookiepolicy_fancybox.center);
                        }

                        if (currentOpts.type == 'iframe') {
                                _cookiepolicyfancybox('<iframe id="oupcookiepolicy_fancybox-frame" name="oupcookiepolicy_fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + 'allowtransparency="true"' + ' scrolling="' + selectedOpts.scrolling + '" src="' + currentOpts.href + '"></iframe>').appendTo(content);
                        }

                        wrap.show();

                        busy = false;

                        _cookiepolicyfancybox.oupcookiepolicy_fancybox.center();

                        currentOpts.onComplete(currentArray, currentIndex, currentOpts);

                        _preload_images();
                },

                _preload_images = function() {
                        var href, 
                                objNext;

                        if ((currentArray.length -1) > currentIndex) {
                                href = currentArray[ currentIndex + 1 ].href;

                                if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                                        objNext = new Image();
                                        objNext.src = href;
                                }
                        }

                        if (currentIndex > 0) {
                                href = currentArray[ currentIndex - 1 ].href;

                                if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                                        objNext = new Image();
                                        objNext.src = href;
                                }
                        }
                },

                _draw = function(pos) {
                        var dim = {
                                width : parseInt(start_pos.width + (final_pos.width - start_pos.width) * pos, 10),
                                height : parseInt(start_pos.height + (final_pos.height - start_pos.height) * pos, 10),

                                top : parseInt(start_pos.top + (final_pos.top - start_pos.top) * pos, 10),
                                left : parseInt(start_pos.left + (final_pos.left - start_pos.left) * pos, 10)
                        };

                        if (typeof final_pos.opacity !== 'undefined') {
                                dim.opacity = pos < 0.5 ? 0.5 : pos;
                        }

                        wrap.css(dim);

                        content.css({
                                'width' : dim.width - currentOpts.padding * 2,
                                'height' : dim.height - (titleHeight * pos) - currentOpts.padding * 2
                        });
                },

                _get_viewport = function() {
                        return [
                                _cookiepolicyfancybox(window).width() - (currentOpts.margin * 2),
                                _cookiepolicyfancybox(window).height() - (currentOpts.margin * 2),
                                _cookiepolicyfancybox(document).scrollLeft() + currentOpts.margin,
                                _cookiepolicyfancybox(document).scrollTop() + currentOpts.margin
                        ];
                },

                _get_zoom_to = function () {
                        var view = _get_viewport(),
                                to = {},
                                resize = currentOpts.autoScale,
                                double_padding = currentOpts.padding * 2,
                                ratio;

                        if (currentOpts.width.toString().indexOf('%') > -1) {
                                to.width = parseInt((view[0] * parseFloat(currentOpts.width)) / 100, 10);
                        } else {
                                to.width = currentOpts.width + double_padding;
                        }

                        if (currentOpts.height.toString().indexOf('%') > -1) {
                                to.height = parseInt((view[1] * parseFloat(currentOpts.height)) / 100, 10);
                        } else {
                                to.height = currentOpts.height + double_padding;
                        }

                        if (resize && (to.width > view[0] || to.height > view[1])) {
                                if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
                                        ratio = (currentOpts.width ) / (currentOpts.height );

                                        if ((to.width ) > view[0]) {
                                                to.width = view[0];
                                                to.height = parseInt(((to.width - double_padding) / ratio) + double_padding, 10);
                                        }

                                        if ((to.height) > view[1]) {
                                                to.height = view[1];
                                                to.width = parseInt(((to.height - double_padding) * ratio) + double_padding, 10);
                                        }

                                } else {
                                        to.width = Math.min(to.width, view[0]);
                                        to.height = Math.min(to.height, view[1]);
                                }
                        }

                        to.top = parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - to.height - 40) * 0.5)), 10);
                        to.left = parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - to.width - 40) * 0.5)), 10);

                        return to;
                },

                _get_obj_pos = function(obj) {
                        var pos = obj.offset();

                        pos.top += parseInt( obj.css('paddingTop'), 10 ) || 0;
                        pos.left += parseInt( obj.css('paddingLeft'), 10 ) || 0;

                        pos.top += parseInt( obj.css('border-top-width'), 10 ) || 0;
                        pos.left += parseInt( obj.css('border-left-width'), 10 ) || 0;

                        pos.width = obj.width();
                        pos.height = obj.height();

                        return pos;
                },

                _get_zoom_from = function() {
                        var orig = selectedOpts.orig ? _cookiepolicyfancybox(selectedOpts.orig) : false,
                                from = {},
                                pos,
                                view;

                        if (orig && orig.length) {
                                pos = _get_obj_pos(orig);

                                from = {
                                        width : pos.width + (currentOpts.padding * 2),
                                        height : pos.height + (currentOpts.padding * 2),
                                        top     : pos.top - currentOpts.padding - 20,
                                        left : pos.left - currentOpts.padding - 20
                                };

                        } else {
                                view = _get_viewport();

                                from = {
                                        width : currentOpts.padding * 2,
                                        height : currentOpts.padding * 2,
                                        top     : parseInt(view[3] + view[1] * 0.5, 10),
                                        left : parseInt(view[2] + view[0] * 0.5, 10)
                                };
                        }

                        return from;
                },

                _animate_loading = function() {
                        if (!loading.is(':visible')){
                                clearInterval(loadingTimer);
                                return;
                        }

                        _cookiepolicyfancybox('div', loading).css('top', (loadingFrame * -40) + 'px');

                        loadingFrame = (loadingFrame + 1) % 12;
                };

        /*
         * Public methods 
         */


        _cookiepolicyfancybox.fn.oupcookiepolicy_fancybox = function(options) {
                if (!_cookiepolicyfancybox(this).length) {
                        return this;
                }

                _cookiepolicyfancybox(this)
                        .data('oupcookiepolicy_fancybox', _cookiepolicyfancybox.extend({}, options, (_cookiepolicyfancybox.metadata ? _cookiepolicyfancybox(this).metadata() : {})))
                        .unbind('click.fb')
                        .bind('click.fb', function(e) {
                                e.preventDefault();

                                if (busy) {
                                        return;
                                }

                                busy = true;

                                _cookiepolicyfancybox(this).blur();

                                selectedArray = [];
                                selectedIndex = 0;

                                var rel = _cookiepolicyfancybox(this).attr('rel') || '';

                                if (!rel || rel == '' || rel === 'nofollow') {
                                        selectedArray.push(this);

                                } else {
                                        selectedArray = _cookiepolicyfancybox("a[rel=" + rel + "], area[rel=" + rel + "]");
                                        selectedIndex = selectedArray.index( this );
                                }

                                _start();

                                return;
                        });

                return this;
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox = function(obj) {
                var opts;

                if (busy) {
                        return;
                }

                busy = true;
                opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

                selectedArray = [];
                selectedIndex = parseInt(opts.index, 10) || 0;

                if (_cookiepolicyfancybox.isArray(obj)) {
                        for (var i = 0, j = obj.length; i < j; i++) {
                                if (typeof obj[i] == 'object') {
                                        _cookiepolicyfancybox(obj[i]).data('oupcookiepolicy_fancybox', _cookiepolicyfancybox.extend({}, opts, obj[i]));
                                } else {
                                        obj[i] = _cookiepolicyfancybox({}).data('oupcookiepolicy_fancybox', _cookiepolicyfancybox.extend({content : obj[i]}, opts));
                                }
                        }

                        selectedArray = jQuery.merge(selectedArray, obj);

                } else {
                        if (typeof obj == 'object') {
                                _cookiepolicyfancybox(obj).data('oupcookiepolicy_fancybox', _cookiepolicyfancybox.extend({}, opts, obj));
                        } else {
                                obj = _cookiepolicyfancybox({}).data('oupcookiepolicy_fancybox', _cookiepolicyfancybox.extend({content : obj}, opts));
                        }

                        selectedArray.push(obj);
                }

                if (selectedIndex > selectedArray.length || selectedIndex < 0) {
                        selectedIndex = 0;
                }

                _start();
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.showActivity = function() {
                clearInterval(loadingTimer);

                loading.show();
                loadingTimer = setInterval(_animate_loading, 66);
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.hideActivity = function() {
                loading.hide();
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.next = function() {
                return _cookiepolicyfancybox.oupcookiepolicy_fancybox.pos( currentIndex + 1);
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.prev = function() {
                return _cookiepolicyfancybox.oupcookiepolicy_fancybox.pos( currentIndex - 1);
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.pos = function(pos) {
                if (busy) {
                        return;
                }

                pos = parseInt(pos);

                selectedArray = currentArray;

                if (pos > -1 && pos < currentArray.length) {
                        selectedIndex = pos;
                        _start();

                } else if (currentOpts.cyclic && currentArray.length > 1) {
                        selectedIndex = pos >= currentArray.length ? 0 : currentArray.length - 1;
                        _start();
                }

                return;
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.cancel = function() {
                if (busy) {
                        return;
                }

                busy = true;

                _cookiepolicyfancybox.event.trigger('oupcookiepolicy_fancybox-cancel');

                _abort();

                selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);

                busy = false;
        };

        // Note: within an iframe use - parent._cookiepolicyfancybox.oupcookiepolicy_fancybox.close();
        _cookiepolicyfancybox.oupcookiepolicy_fancybox.close = function() {
                if (busy || wrap.is(':hidden')) {
                        return;
                }

                busy = true;

			//alert('currentOpts.onCleanup  1 :'+currentOpts.onCleanup);

                if (currentOpts && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
                        busy = false;
                        return;
                }

                _abort();

                _cookiepolicyfancybox(close.add( nav_left ).add( nav_right )).hide();

                _cookiepolicyfancybox(content.add( overlay )).unbind();

                _cookiepolicyfancybox(window).unbind("resize.fb scroll.fb");
                _cookiepolicyfancybox(document).unbind('keydown.fb');

                content.find('iframe').attr('src', 'about:blank');

                if (currentOpts.titlePosition !== 'inside') {
                        title.empty();
                }

                wrap.stop();

                function _cleanup() {
                        overlay.fadeOut('fast');

                        title.empty().hide();
                        wrap.hide();

                        _cookiepolicyfancybox.event.trigger('oupcookiepolicy_fancybox-cleanup');

                        content.empty();

                        //currentOpts.onClosed(currentArray, currentIndex, currentOpts);

                        currentArray = selectedOpts     = [];
                        currentIndex = selectedIndex = 0;
                        currentOpts = selectedOpts      = {};

                        busy = false;
                }

                if (currentOpts.transitionOut == 'elastic') {
                        start_pos = _get_zoom_from();

                        var pos = wrap.position();

                        final_pos = {
                                top      : pos.top ,
                                left : pos.left,
                                width : wrap.width(),
                                height : wrap.height()
                        };

                        if (currentOpts.opacity) {
                                final_pos.opacity = 1;
                        }

                        title.empty().hide();

                        fx.prop = 1;

                        _cookiepolicyfancybox(fx).animate({ prop: 0 }, {
                                 duration : currentOpts.speedOut,
                                 easing : currentOpts.easingOut,
                                 step : _draw,
                                 complete : _cleanup
                        });

                } else {
                        wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
                }
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.resize = function() {
                if (overlay.is(':visible')) {
                        overlay.css('height', _cookiepolicyfancybox(document).height());
                }

                _cookiepolicyfancybox.oupcookiepolicy_fancybox.center(true);
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.center = function() {
                var view, align;

                if (busy) {
                        return; 
                }

                align = arguments[0] === true ? 1 : 0;
                view = _get_viewport();

                if (!align && (wrap.width() > view[0] || wrap.height() > view[1])) {
                        return; 
                }

                wrap
                        .stop()
                        .animate({
                                'top' : parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - content.height() - 40) * 0.5) - currentOpts.padding)),
                                'left' : parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - content.width() - 40) * 0.5) - currentOpts.padding))
                        }, typeof arguments[0] == 'number' ? arguments[0] : 200);
        };

        _cookiepolicyfancybox.oupcookiepolicy_fancybox.init = function() {
                if (_cookiepolicyfancybox("#oupcookiepolicy_fancybox-wrap").length) {
                        return;
                }

                _cookiepolicyfancybox('body').append(
                        tmp     = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-tmp"></div>'),
                        loading = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-loading"><div></div></div>'),
                        overlay = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-overlay"></div>'),
                        wrap = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-wrap"></div>')
                );

                outer = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-outer"></div>')
                        .append('<div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-n"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-ne"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-e"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-se"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-s"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-sw"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-w"></div><div class="oupcookiepolicy_fancybox-bg" id="oupcookiepolicy_fancybox-bg-nw"></div>')
                        .appendTo( wrap );

                outer.append(
                        content = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-content"></div>'),
                        close = _cookiepolicyfancybox('<a id=""></a>'),
                        title = _cookiepolicyfancybox('<div id="oupcookiepolicy_fancybox-title"></div>'),

                        nav_left = _cookiepolicyfancybox('<a href="javascript:;" id="oupcookiepolicy_fancybox-left"><span class="fancy-ico" id="oupcookiepolicy_fancybox-left-ico"></span></a>'),
                        nav_right = _cookiepolicyfancybox('<a href="javascript:;" id="oupcookiepolicy_fancybox-right"><span class="fancy-ico" id="oupcookiepolicy_fancybox-right-ico"></span></a>')
                );

                close.click(_cookiepolicyfancybox.oupcookiepolicy_fancybox.close);
                loading.click(_cookiepolicyfancybox.oupcookiepolicy_fancybox.cancel);

                nav_left.click(function(e) {
                        e.preventDefault();
                        _cookiepolicyfancybox.oupcookiepolicy_fancybox.prev();
                });

                nav_right.click(function(e) {
                        e.preventDefault();
                        _cookiepolicyfancybox.oupcookiepolicy_fancybox.next();
                });

                if (_cookiepolicyfancybox.fn.mousewheel) {
                        wrap.bind('mousewheel.fb', function(e, delta) {
                                if (busy) {
                                        e.preventDefault();

                                } else if (_cookiepolicyfancybox(e.target).get(0).clientHeight == 0 || _cookiepolicyfancybox(e.target).get(0).scrollHeight === _cookiepolicyfancybox(e.target).get(0).clientHeight) {
                                        e.preventDefault();
                                        _cookiepolicyfancybox.oupcookiepolicy_fancybox[ delta > 0 ? 'prev' : 'next']();
                                }
                        });
                }

                if (!_cookiepolicyfancybox.support.opacity) {
                        wrap.addClass('oupcookiepolicy_fancybox-ie');
                }
        };


        _cookiepolicyfancybox.fn.oupcookiepolicy_fancybox.defaults = {
                padding : 10,
                margin : 40,
                opacity : false,
                modal : false,
                cyclic : false,
                scrolling : 'auto',     // 'auto', 'yes' or 'no'

                width : 560,
                height : 340,

                autoScale : true,
                autoDimensions : true,
                centerOnScroll : false,

                ajax : {},
                swf : { wmode: 'transparent' },

                hideOnOverlayClick : true,
                hideOnContentClick : false,

                overlayShow : true,
                overlayOpacity : 0.7,
                overlayColor : '#777',

                titleShow : true,
                titlePosition : 'float', // 'float', 'outside', 'inside' or 'over'
                titleFormat : null,
                titleFromAlt : false,

                transitionIn : 'fade', // 'elastic', 'fade' or 'none'
                transitionOut : 'fade', // 'elastic', 'fade' or 'none'

                speedIn : 300,
                speedOut : 300,

                changeSpeed : 300,
                changeFade : 'fast',

                easingIn : 'swing',
                easingOut : 'swing',

                showCloseButton  : true,
                showNavArrows : true,
                enableEscapeButton : false,
                enableKeyboardNav : true,

                onStart : function(){},
                onCancel : function(){},
                onComplete : function(){},
                onCleanup : function(){},
                onClosed : function(){},
                onError : function(){}
        };



        _cookiepolicyfancybox(document).ready(function() {
                _cookiepolicyfancybox.oupcookiepolicy_fancybox.init();
        });




})(jQuery);
		var domain = "//global.oup.com";
		//var domain = "http://global.uat.oup.com";
		//var domain = "http://global.edt.uk.oup.com";
		var cookieWsUrl = domain+"/cookiealert";
		var cookiePolicyUrl = domain+"/cookiepolicy/";
		var version = "/0";
		var cookieDate = "/01-01-2000";
		var preferredLanguage = "";
		var cookieName = "oup-cookie";
		var databaseVersion = "0";
		var cookieOlderThanSpecificDays = true;

		var ie6Message = "<div id=\"oupcookiepolicy_message\" class=\"cookiepolicyimplied\"><div class=\"cookiepolicytext\">We use cookies to enhance your experience on our website. By clicking 'continue' or by continuing to use our website, you are agreeing to our use of cookies. You can change your cookie settings at any time.</div><ul class=\"cookiepolicylinks\"><li><a href=\"#\" onClick=\"window.location.reload( true );\" class=\"cookiepolicycontinue\" title=\"Close this message\">Continue</a></li><li><a href=\"http://global.oup.com/cookiepolicy/\" target=\"_blank\" class=\"cookiepolicymore\" title=\"How we use cookies on this site\">Find out more</a></li></ul><div class=\"cookiepolicyend\"></div></div>";

		try {
			var _cookiepolicy = jQuery;                     
		} catch(e) {
		try {
			var _cookiepolicy = $;                         
		} catch(e) {
			}
		}   
		//_cookiepolicy = _cookiepolicy.noConflict();		
		//alert('pointing to : '+domain);		
		//alert(' variable conflict. =====>  :'+_cookiepolicy +'    cookiePolicyUrl :'+cookiePolicyUrl+'   oupcookiepolicy_messagetype :'+oupcookiepolicy_messagetype);

		// uncomment the below line for testing with implied consent.

		//oupcookiepolicy_messagetype='explicit';

		_cookiepolicy(document).ready(function() {

		writeTheElements();
		getTheCookie();

		if(oupcookiepolicy_messagetype == 'explicit'){

			if (typeof _cookiepolicy.oupcookiepolicy_fancybox == 'function') {
				//alert('allready loaded');
				_cookiepolicy("a#cookiepolicy_link").oupcookiepolicy_fancybox({
					'hideOnContentClick': false,
					'hideOnOverlayClick':false
				});
				_cookiepolicy("a.group").oupcookiepolicy_fancybox({
					'transitionIn'	:	'elastic',
					'transitionOut'	:	'elastic',
					'speedIn'		:	600, 
					'speedOut'		:	200, 
					'overlayShow'	:	false
				});							
			} else {
				//alert('fancybox object not available.');
			}
		}

			try{
				if(cookieOlderThanSpecificDays){
					checkForAlertMessage();
				}else{
				}
			}catch(e){
				var keyword= '/cookiepolicy/';
				alertMessageToDisplay=htmlDecode(ie6Message);
				if(alertMessageToDisplay.indexOf(keyword) != -1) {
						var alertMessageToDisplay1= alertMessageToDisplay.substring(0, alertMessageToDisplay.indexOf(keyword));
						var alertMessageToDisplay2= alertMessageToDisplay.substring(alertMessageToDisplay.indexOf(keyword)+keyword.length, alertMessageToDisplay.length);
						alertMessageToDisplay = alertMessageToDisplay1+keyword+"?siteid="+oupcookiepolicy_siteid+alertMessageToDisplay2;
				}
				var p = document.createElement("div");
				p.innerHTML = alertMessageToDisplay;
				document.body.insertBefore(p, document.body.firstChild);
				saveCookie(1);
			}
		});	
		
		function writeTheElements(){
			var element = document.createElement("div");
			element.innerHTML = "<div id=\"cookiepolicy_div\"><a id=\"cookiepolicy_link\" href=\"#cookiepolicy_data\"></a><div id=\"cookiepolicy_parent\"style=\"display:none\"><div id=\"cookiepolicy_data\"></div></div></div>";
			document.body.insertBefore(element, document.body.firstChild);
		}
		
		
		function getTheCookie(){
			var  browserLanguage = window.navigator.userLanguage;
			if(browserLanguage==undefined){
				browserLanguage = window.navigator.language;
			}		
			browserLanguage = browserLanguage.substring(0,2); 
			//preferredLanguage = "/"+browserLanguage;
			var metaLanguage = metaKeywords();
			if(oupcookiepolicy_preferredlanguage != '' && oupcookiepolicy_preferredlanguage != ' ' && oupcookiepolicy_preferredlanguage != "undefined" && oupcookiepolicy_preferredlanguage.length > 0)	{
				preferredLanguage = "/"+oupcookiepolicy_preferredlanguage;
				//alert('oupcookiepolicy_preferredlanguage :'+preferredLanguage);				
			} else if(metaLanguage != '' && metaLanguage != "undefined") {
				metaLanguage = metaLanguage.substring(0,2); 			
				preferredLanguage = "/"+metaLanguage;
				//alert('metaLanguage :'+preferredLanguage);				
			} else if(browserLanguage != '' && browserLanguage != "undefined") {
				browserLanguage = browserLanguage.substring(0,2); 
				preferredLanguage = "/"+browserLanguage;
				//alert('browserLanguage :'+preferredLanguage);
			}
			if(preferredLanguage == '' || preferredLanguage =='undefined') {
				preferredLanguage = '/en';
			}
			//alert('final preferredLanguage :'+preferredLanguage);

			var allcookies = document.cookie; 
			//alert('The Cookies ' + allcookies);
			cookiearray  = allcookies.split(';');
		    for(var i=0; i<cookiearray.length; i++){				  
				var name = cookiearray[i].split('=')[0];
				var value = cookiearray[i].split('=')[1];
				if(name.indexOf(cookieName) != -1)
				{	
					if(value.split('_')[0] == ""){
						version = "/0";
					}else{
					version = "/"+ value.split('_')[0]; 
					}
					var deviceCookieDate = value.split('_')[1];
					var deviceCookieDateString = constructDateString(deviceCookieDate); 
					var deviceDate = new Date(deviceCookieDateString);
					var currentDate = new Date(); 
					var difference = currentDate - deviceDate; 
					if(difference > 90*24*60*60*1000){						
						cookieOlderThanSpecificDays = true;
					}else{										
						cookieOlderThanSpecificDays = false;
					}
					cookieDate = "/"+ value.split('_')[1];
				}
		   }
		}
		
		function metaKeywords() { 
			var metaLang = '';
			metaCollection = document.getElementsByTagName('meta'); 

			for (i=0;i<metaCollection.length;i++) { 
				nameAttribute = metaCollection[i].name.search(/language/);
				if (nameAttribute!= -1) { 
					metaLang = metaCollection[i].content;
					//alert(metaCollection[i].content); 
				} 
			} 
			return metaLang;
		} 
			
		function constructDateString(date){
			try{
				var day = date.split('-')[0];
				var month = date.split('-')[1];
				var year = date.split('-')[2];
				return (year+","+month+","+day);
			}catch(e){
				
			}
		}
		

		function checkForAlertMessage(){
			var request1 = null;
			var wsresponse = false;
			request1 = createCORSRequest("GET",cookieWsUrl + preferredLanguage + version + cookieDate,true);
			//alert('checkForAlertMessage request2 after : '+request1);
			if (typeof XDomainRequest != "undefined") {
				//alert('XDomainRequest 1 : '+XDomainRequest);
				request1.onprogress = function () { };
				request1.ontimeout = function () { };
				request1.onerror = function () { };
				
				request1.onload=function()	{
						wsresponse = request1.responseText;
						//alert(' wsresponse XDomainRequest 12 : '+wsresponse);
						if(wsresponse == 'true'){
							getAlertMessage();						
						} else {
						}
				};
				setTimeout(function () {
					request1.send();
				}, 0);
			} 
			else if(window.ActiveXObject) // for IE 7, 8 
			{
				//alert('inside checkForAlertMessage else window.ActiveXObject request1.readyState :'+request1);
				request1.onreadystatechange=function() {
					//alert('request1.readyState 213 :'+request1.readyState);
					//alert('request1.status 123:'+request1.status);					
					if (request1.readyState==4 && request1.status== 200 ) {
						wsresponse = request1.responseText;
						//alert(' wsresponse XDomainRequest 123456 : '+wsresponse);
						if(wsresponse == 'true') {
							getAlertMessage();						
						} else {
						}
					}
				};
				request1.send();	
			} else {
				try	{
					request1.onreadystatechange=function()	{
						//alert('5 request2.readyState :'+request1.readyState);
						//alert('5 request2.status :'+request1.status);					
						if (request1.readyState==4  ) {    
							wsresponse = request1.responseText;
							//alert(' 5 wsresponse XDomainRequest 123 : '+wsresponse);
							if(wsresponse == 'true'){
								getAlertMessage();						
							}else{ 
							}
						}
					};
					request1.send();	
				} catch(e) {
				//alert('5 Exception : '+e);
				}
			}
			
		}
		
		function getAlertMessage(){	
			var request2 = null;
			var response = "";
			var isMessagePrinted= false;
			request2 = createCORSRequest("GET",cookieWsUrl + preferredLanguage +"/"+ oupcookiepolicy_messagetype ,true);
			//alert('getAlertMessage request2 after 123: '+request2);
			 
			if (typeof XDomainRequest != "undefined"){
				//alert('XDomainRequest : '+XDomainRequest);
				request2.onload = function()
				{
					if (!isMessagePrinted)
					{
						isMessagePrinted = true;
						response = request2.responseText;
						//alert('response 1 1 :'+response);
						generateAlertMessage(response);
					}
				};
				request2.send();
			}  else	if(window.ActiveXObject) // for IE 7, 8 
			{
				//alert('getAlertMessage with window.ActiveXObjec 123:'+request2);
				request2.onreadystatechange=function()	{			
					if (request2.readyState==4 && request2.status== 200 )
					{
						isMessagePrinted = true;
						response = request2.responseText;
						//alert('response 1 2 :'+response);
						generateAlertMessage(response);
					}
				};
				request2.send();
			}
			else {
				request2.onreadystatechange=function()
				{
					//alert('request2.readyState :'+request2.readyState);
					//alert('request2.status :'+request2.status);
					if (request2.readyState==4 && request2.status == 200 && !isMessagePrinted)
					{
						isMessagePrinted = true;
						response = request2.responseText;
						//alert('response 1 3 :'+response);
						generateAlertMessage(response);
					}
				};
				request2.send();
			}
			//request2.send();
		}
		
		// The funciton to generate CROS request
		function createCORSRequest(method, url){
			var version = navigator.userAgent;	
			var xhr = new XMLHttpRequest();
			if ("withCredentials" in xhr) {	// For Chrome/ Firefox
				//alert('withCredentials 3');
				xhr.open(method, url, true);
			} else if (typeof XDomainRequest != "undefined") {    // IE8, 
				try{
					xhr = new XDomainRequest();
					//alert(' else if in try with 2 :'+xhr);
					xhr.open(method, url);
				}catch(e){	
					xhr = new XMLHttpRequest();	
					//alert(' else catch in try with  2:'+xhr);
					xhr.open(method, url, true);
				}
			} else if(window.ActiveXObject) // for IE 7, 8 
			{
				//alert(' testing inside last  with :'+xhr);
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
					//xhr = new ActiveXObject("Microsoft.XMLHTTP");
					//alert(' with xhr changed inside last ELSE WITH TRY BLOCK WITH  Microsoft.XMLHTTP Msxml2.XMLHTTP 456 :'+xhr);
					xhr.open(method, url);
					//alert('testing 1');					
					} catch(e) {
					try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
					//alert('Exception 1: '+e.message);
					xhr.open(method, url);
					} catch(e1) {
						//Something went wrong
						//alert('Exception :2 '+e1.message);
						//xhr = new XMLHttpRequest();
						xhr.open(method, url, true);
						//alert("Your browser broke 2!");
					}
				}
			} else 	{
				try{
					xhr = new XDomainRequest();
					//alert(' else if in try with 2 :'+xhr);
					xhr.open(method, url);
				}catch(e){	
					xhr = new XMLHttpRequest();	
					//alert(' else catch in try with  2:'+xhr);
					//alert(' exception  2:'+e);
					xhr.open(method, url, true);
				}
			}			
			return xhr;
		}
				

		// The funciton to display Alert Message to the Browser
		function generateAlertMessage(alertMessage){
			var keyword= '/cookiepolicy/';
			var messageSeperatorkeyword= '____';
			var langSeperator=",";
			var dbCookieVersion ='1';
			//var dbCookieVersion = alertMessage.substring(0, alertMessage.indexOf('|'));
			var languages = preferredLanguage.substring(1,preferredLanguage.length);
			var lLangArry = languages.split(",");
			//alert('lLangArry  :'+lLangArry);
			var lLangCounter =0;
			var lFinalMessage='';

			var lDisplayCookieMessage='';

			//alert('generateAlertMessage '+ alertMessage);
			
			if(alertMessage.length && alertMessage.length > 0){
				var lLangArrLength = lLangArry.length;
				
				if(alertMessage.indexOf(messageSeperatorkeyword) != -1){
					var lCookieMessagePart = alertMessage.split(messageSeperatorkeyword);
					//alert('lCookieMessagePart : '+lCookieMessagePart);					
					var lCookieMessageLength = lCookieMessagePart.length-1;
					//alert('lCookieMessageLength : '+lCookieMessageLength);					
					
					for(var lCounter =0; lCounter < lCookieMessageLength; lCounter++ ) {
							//alert('cookie message : '+lCookieMessagePart[lCounter])
							var dbCookieVersionJS = lCookieMessagePart[lCounter].substring(0, alertMessage.indexOf('|'));
							//alert('dbCookieVersionJS :'+dbCookieVersionJS);
							lFinalMessage = lCookieMessagePart[lCounter].substring(lCookieMessagePart[lCounter].indexOf('|')+1, lCookieMessagePart[lCounter].length );
							//alert('lFinalMessage :'+lFinalMessage);
							var langCountryCode = FindNewLangWithCountryCode(lLangArry[lLangCounter++]);
							//alert(lCounter + ' : ' +langCountryCode);
							var lCookieMessagePartMain = lFinalMessage.split(keyword);
							//alert('lCookieMessagePartMain :'+lCookieMessagePartMain);
							var lCookieMessageLengthMain = lCookieMessagePartMain.length;
							//alert('lCookieMessageLengthMain :'+lCookieMessageLengthMain);
							var tempCookieMessage = '';
							
							for(var lCounter1 =0; lCounter1 < lCookieMessageLengthMain; lCounter1++ ) {
								//alert('testing : '+lCookieMessagePartMain[lCounter1]);
								if(lCounter1 != 0) {
									if(oupcookiepolicy_messagetype == 'explicit') {
										tempCookieMessage = tempCookieMessage + keyword + "?siteid="+oupcookiepolicy_siteid+"&lang="+langCountryCode + lCookieMessagePartMain[lCounter1]+ "<br/>" ;							
									} else {
										tempCookieMessage = tempCookieMessage + keyword + "?siteid="+oupcookiepolicy_siteid+"&lang="+langCountryCode + lCookieMessagePartMain[lCounter1];
									}
								} else {
									tempCookieMessage = lCookieMessagePartMain[lCounter1];									
								}
								//alert('tempCookieMessage :'+tempCookieMessage);
							}
							tempCookieMessage = tempCookieMessage.replace('dbCookieVersion',dbCookieVersionJS);
							lDisplayCookieMessage = lDisplayCookieMessage +tempCookieMessage;
							//alert('final tempCookieMessagewith version :'+tempCookieMessage);
					}
				} else {
					if(alertMessage.length && alertMessage.length > 0) {
						if(alertMessage.indexOf('|') != -1) {
							var dbCookieVersionJS = alertMessage.substring(0, alertMessage.indexOf('|'));
							//alert('else dbCookieVersionJS :'+dbCookieVersionJS);
							lFinalMessage = alertMessage.substring(alertMessage.indexOf('|')+1, alertMessage.length );
							//alert('else lFinalMessage :'+lFinalMessage);				
							lDisplayCookieMessage = lFinalMessage;
						}
					}
				}
				if(dbCookieVersion == '' || dbCookieVersion ==' '){
					dbCookieVersion = '1';
				}	
				alertMessageToDisplay = lDisplayCookieMessage;
				//alert('alertMessageToDisplay  :'+alertMessageToDisplay);				
				
				if(oupcookiepolicy_messagetype == 'implied'){
					alertMessageToDisplay=htmlDecode(alertMessageToDisplay);
					//alert('alertMessageToDisplay  :'+alertMessageToDisplay);	
					
					var p = document.createElement("div");
					p.innerHTML = alertMessageToDisplay;
					document.body.insertBefore(p, document.body.firstChild);
					saveCookie(dbCookieVersion);
				}else{
					//alertMessageToDisplay = alertMessageToDisplay+"<a id='cookie_accpt_button' href='javascript:saveCookie("+dbCookieVersion+")'>I accept</a>";
					document.getElementById('cookiepolicy_data').innerHTML = alertMessageToDisplay;
					//alert('alertMessageToDisplay  : '+alertMessageToDisplay);
					try{
						document.getElementById('cookiepolicy_link').click();							
					}catch(e){
						_cookiepolicy('#cookiepolicy_link').click();
					}
				}
			}
		}		
		
		function cookiePolicy(){
			var cookieWindow = window.open(cookiePolicyUrl,'_blank');
		}
		
		function saveCookie(version){
			var currentDate = new Date(); 
			var expiryDate = new Date();
			expiryDate.setDate( expiryDate.getDate() +365 );
			var savedDate = currentDate.getDate()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getFullYear();
			var expiryDateUtc = expiryDate.toGMTString();
			
		//	var cookieToSave = cookieName+","+version+","+savedDate+", expires="+expiryDateUtc;
		//	var cookieToSave = "name="+cookieName+"; value= version:"+version+",date:"+savedDate+"; expires="+expiryDateUtc;
			var cookieToSave = cookieName+"="+version+"_"+savedDate+"; expires="+expiryDateUtc+"; path="+oupcookiepolicy_documentroot ;
			var domainName = document.domain;

			if(oupcookiepolicy_siteid != null && oupcookiepolicy_siteid !='' && oupcookiepolicy_siteid =='journals')
			{
				if(domainName != null  && domainName != 'undefine' && domainName != '')
				{
					var containsDot =".";
					var firstPart='';
					var secondPart='';
					var domainToSetCookie='';
					//alert(domainName);
					if(domainName.indexOf(containsDot) !=  -1)
					{
						var str_array = domainName.split(containsDot);
						if(str_array.length > 2)
						{
							domainToSetCookie = '.'+str_array[str_array.length-2] +'.'+str_array[str_array.length-1]
						}
						//alert('contains dot '+domainToSetCookie);
						cookieToSave = cookieToSave +"; "+"domain="+domainToSetCookie;				
					} else {
						//alert('does not contains.');	
					}				
				}
			}
			document.cookie=cookieToSave;
			//alert(_cookiepolicy.oupcookiepolicy_fancybox);
			if(_cookiepolicy.oupcookiepolicy_fancybox){
				//alert('close it :'+_cookiepolicy.oupcookiepolicy_fancybox);
				_cookiepolicy.oupcookiepolicy_fancybox.close();
			}
			/*
			if(oupcookiepolicy_style == 'desktop'){
				_cookiepolicy.oupcookiepolicy_fancybox.close();
			}
			if(oupcookiepolicy_style == 'mobile'){
				document.location.reload(true);
			}
			*/
		}
		
		function closeImplied(){
			document.location.reload(true);
		}	
		
		_cookiepolicy(document).keydown(function(e) {
			if (e.keyCode == 27) {
			if (e.keyCode == 27 && !e.disableEscape) {
			return false;
				//$(document).unbind("keydown");
		}}});
		
		// Start Decode Functions
		/*
		Credit for htmlDecode goes to author  2a6a325068cf by Doug Fritz <dougfr...@google.com> on May 12, 2011   Diff tech
		Referred from : http://code.google.com/r/jimboyeah-3dreams/source/browse/deploy/tech/js/encoder.js?r=2a6a325068cf0aaf720bdba1acc2266449042e38
		*/
		function htmlDecode(s){
			var c,m,d = s;		
			if(this.isEmpty(d)) return "";

			// convert HTML entites back to numerical entites first
			d = this.HTML2Numerical(d);
		
			// look for numerical entities &#34;
			arr=d.match(/&#[0-9]{1,5};/g);			
			// if no matches found in string then skip
			if(arr!=null){
				for(var x=0;x<arr.length;x++){
					m = arr[x];
					c = m.substring(2,m.length-1); //get numeric part which is refernce to unicode character
					// if its a valid number we can decode
					if(c >= -32768 && c <= 65535){
						// decode every single match within string
						d = d.replace(m, String.fromCharCode(c));
					}else{
						d = d.replace(m, ""); //invalid so replace with nada
					}
				}			
			}	
			return d;
		}
		
		function isEmpty  (val){
			if(val){
				return ((val===null) || val.length==0 || /^\s+$/.test(val));
			}else{
				return true;
			}
		}
		
		function HTML2Numerical(s){
			return swapArrayVals(s,this.arr1,this.arr2);
		}
		
		// arrays for conversion from HTML Entities to Numerical values
		var arr1 = ['&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&Agrave;','&Aacute;','&Acirc;','&Atilde;','&Auml;','&Aring;','&AElig;','&Ccedil;','&Egrave;','&Eacute;','&Ecirc;','&Euml;','&Igrave;','&Iacute;','&Icirc;','&Iuml;','&ETH;','&Ntilde;','&Ograve;','&Oacute;','&Ocirc;','&Otilde;','&Ouml;','&times;','&Oslash;','&Ugrave;','&Uacute;','&Ucirc;','&Uuml;','&Yacute;','&THORN;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&OElig;','&oelig;','&Scaron;','&scaron;','&Yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&Dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&Alpha;','&Beta;','&Gamma;','&Delta;','&Epsilon;','&Zeta;','&Eta;','&Theta;','&Iota;','&Kappa;','&Lambda;','&Mu;','&Nu;','&Xi;','&Omicron;','&Pi;','&Rho;','&Sigma;','&Tau;','&Upsilon;','&Phi;','&Chi;','&Psi;','&Omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&Prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&lArr;','&uArr;','&rArr;','&dArr;','&hArr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;'];
		var arr2 = ['&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;'];

		
		function swapArrayVals (s,arr1,arr2){
		if(this.isEmpty(s)) return "";
		var re;
		if(arr1 && arr2){
				//ShowDebug("in swapArrayVals arr1.length = " + arr1.length + " arr2.length = " + arr2.length)
				// array lengths must match
				if(arr1.length == arr2.length){
					for(var x=0,i=arr1.length;x<i;x++){
						re = new RegExp(arr1[x], 'g');
						s = s.replace(re,arr2[x]); //swap arr1 item with matching item from arr2	
					}
				}
			}
		return s;
		}
		
		// End Decode Functions

		// Function to find country code respective to language to match OUP countryCodeTag functionality
		function FindNewLangWithCountryCode(lLangCode)	{
			//alert('Inside FindNewLangWithCountryCode function');
			var lRowCount=10;
			var lColCount=2;
			var lDefaultLang='en';
			var bLangMatchFound=false;
			var lCountryCode='GB';
			var LangCountryArray = new Array(lRowCount);

			LangCountryArray [0] = new Array(lColCount);

			LangCountryArray [0][0] = "ja";

			LangCountryArray [0][1] = "JP";

			LangCountryArray [1] = new Array(lColCount);

			LangCountryArray [1][0] = "en";

			LangCountryArray [1][1] = "GB";

			LangCountryArray [2] = new Array(lColCount);

			LangCountryArray [2][0] = "zh";

			LangCountryArray [2][1] = "TW";

			LangCountryArray [3] = new Array(lColCount);

			LangCountryArray [3][0] = "de";

			LangCountryArray [3][1] = "DE";

			LangCountryArray [4] = new Array(lColCount);

			LangCountryArray [4][0] = "fr";

			LangCountryArray [4][1] = "FR";
			
			LangCountryArray [5] = new Array(lColCount);

			LangCountryArray [5][0] = "es";

			LangCountryArray [5][1] = "ES";
			
			LangCountryArray [6] = new Array(lColCount);

			LangCountryArray [6][0] = "nl";

			LangCountryArray [6][1] = "NL";
			
			LangCountryArray [7] = new Array(lColCount);

			LangCountryArray [7][0] = "it";

			LangCountryArray [7][1] = "IT";
			
			LangCountryArray [8] = new Array(lColCount);

			LangCountryArray [8][0] = "pt";

			LangCountryArray [8][1] = "PT";
			
			LangCountryArray [9] = new Array(lColCount);

			LangCountryArray [9][0] = "sk";

			LangCountryArray [9][1] = "SK";
			
			var arrayRow='';
			var countryCode='';
			for (var i=0;i<10; i++) {
				for (var j=0;j<2; j++) {
					//alert(LangCountryArray[i][j]);
					arrayRow='Array['+i+', '+j+']:= '+'\"'+LangCountryArray[i][j]+'\" ';
					if(j == 0 && LangCountryArray[i][j] == lLangCode)	{
						//alert(LangCountryArray[i][j+1]);
						lCountryCode = LangCountryArray[i][j+1];
						lLangCode = lLangCode +'_'+lCountryCode;
						bLangMatchFound = true;
						break;
					}
					//alert(arrayRow);
				}
			}
			// Match Found for language
			if(bLangMatchFound) {
				//alert('Matched Language Code : '+lLangCode);
			} else {
				lLangCode = lDefaultLang +'_'+lCountryCode;
			}
			return lLangCode;
		}

var SCM = SCM || {};
SCM.BookToc = SCM.BookToc || {};

(function (ns, $) {

    ns.init = function () {
        ns.registerHeadingsClick();
    };

    ns.registerHeadingsClick = function () {
        $('body').on('click', '.js-show-headings-button', onHeadingsClick);

        if ($('#hfIsBookTocSlim').val()) {
            $('body').on('click', '.js-tocLink', onHeadingsClick);
        }
    };

    function onHeadingsClick(e) {
        var $icon = $(this).find('.js-show-headings-icon');
        if (!$icon.length) {
            $icon = $(this).parent().find('.js-show-headings-icon');
        }
        if (!$icon.length) {
            console.error('.js-show-headings-icon not found');
            return;
        }
        var sectionId = $icon.data('sectionid');
        if (!sectionId) {
            console.error('sectionid not found');
            return;
        }
        var targetUrl = $icon.data('targeturl');
        if (!targetUrl) {
            console.error('targeturl not found');
            return;
        }
        var $placeholder = $('.js-headings-placeholder[data-sectionid=' + sectionId + ']');
        if (!$placeholder.length) {
                console.error('.js-headings-placeholder not found');
            return;
        }

        // If we expanded to show the headings
        if ($icon.hasClass('icon-general-arrow-filled-right')) {
            
            // If we haven't fetched the headings yet
            if (!$placeholder.children().length) {
                var url = window.location.origin + '/Book/ChapterHeadings';
                $.ajax({
                    url: url,
                    data: { chapterId: sectionId, targetUrl: targetUrl}
                }).done(function (ajaxResponse) {
                    if (!ajaxResponse || !ajaxResponse.length) {
                        return;
                    }
                    $placeholder.append(ajaxResponse);
                }).fail(function (xmlHttpRequest, textStatus) {
                    if (window.console && window.console.error) {                    
                        console.error('error: ' + xmlHttpRequest.responseText);
                        console.error('status: ' + textStatus);
                    }
                });
            }

            $icon.removeClass('icon-general-arrow-filled-right');
            $icon.addClass('icon-general-arrow-filled-down');

        } else if ($icon.hasClass('icon-general-arrow-filled-down')) {
            
            $icon.removeClass('icon-general-arrow-filled-down');
            $icon.addClass('icon-general-arrow-filled-right');

        }

        $placeholder.toggleClass('hide');

    }

})(SCM.BookToc.Headings = SCM.BookToc.Headings || {}, jQuery);
var SCM = SCM || {};

(function (ns, headings, $) {
        
    ns.init = function () {
        headings.init();
    };

    ns.goToPageHandler = function () {
        $("#goToPageNumberBook, #goToPageNumber").on('click', function (e) {
            $(".pageError").hide();
            var pageNumber = $("#pageNumberEntry").val();
            if (pageNumber.length) {
                var $page = $("a[name='page-" + pageNumber + "']");
                // If it's on this page, don't need to find the chapter on the server side
                if ($page && $page.length) {
                    window.location.hash = "page-" + pageNumber;
                    $("#pageNumberEntry").val("");
                } else {
                    var baseUrl = App.CurrentSubdomain.length ? '/' + App.CurrentSubdomain : '';
                    $.ajax({
                        url: baseUrl + '/Content/GoToBookPage',
                        cache: false,
                        data: {
                            bookId: $("#pageNumberEntry").attr("data-bookid"),
                            pageNum: pageNumber
                        },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Success) {
                                window.location = baseUrl + response.RedirectURL;
                            }
                            else {
                                $(".pageError").text(response.ErrorMessage).show();
                            }
                        }
                    });
                }
            }
            else {
                // nothing entered
                $(".pageError").text("Please enter a page number").show();
            }
        });
    }

    // On Document.Ready - init
    $(function () {
        ns.init();
        ns.goToPageHandler();     
        
    });
   
})(SCM.BookToc = SCM.BookToc || {},
   SCM.BookToc.Headings = SCM.BookToc.Headings || {}, jQuery);

var SCM = SCM || {};

(function (ns, $) {
    ns.initChapterAbstractClickEvent = function () {
        $(".master-main").on('click', "a.showChapterAbstractLink", function () { //div[data-chapter-abstract-2b-fetched-wrapper] > div[data-link-chapter-abstract-get] a
            var wrapperDiv = $(this).closest('div[data-chapter-abstract-2b-fetched-wrapper]');
            var chapterId = $(wrapperDiv).data('chapterid-abstract');
            var bookId = $(wrapperDiv).data('bookid-abstract');
            var triedFetchDiv = $(wrapperDiv).children('div[data-tried-to-fetch-abstract]').first();
            var triedFetch = $(triedFetchDiv).data("tried-to-fetch-abstract") === "true";
            var abstractLocation = $('#abstract-' + chapterId);
            var baseSiteUrl = $("#hfSiteURL");
            var abstractLinks = $('#abstract-' + chapterId + '-links');
            var ajaxUrl = $(this).parent().data('link-chapter-abstract-type') == 'extract' ? "/Book/ChapterAbstractOrExtractAjax" : "/Book/ChapterAbstractAjax";

            if (typeof baseSiteUrl !== "undefined" && typeof baseSiteUrl.val() !== "undefined" && baseSiteUrl !== '') {
                ajaxUrl = "//" + baseSiteUrl.val() + ajaxUrl;
            }

            $(abstractLocation).closest('li').toggleClass('abstractExpanded');
            $(abstractLocation).append('<div class="spinner"></div>');

            if (!triedFetch) {
                $.ajax({
                    url: ajaxUrl,
                    type: 'GET',
                    data: { chapterId: chapterId, bookId: bookId },
                    success: function (data) {
                        abstractLocation.html(data.Html);
                        abstractLocation.append(abstractLinks.html());
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        $(abstractLocation).find('.spinner').remove();
                        if (window.console) {
                            var err = eval("(" + xmlHttpRequest.responseText + ")");
                            console.log('error: ' + err);
                            console.log('status: ' + textStatus);
                        };
                    }
                });
                $(triedFetchDiv).data("tried-to-fetch-abstract", "true");
            }

            abstractLocation.toggle();


            // Toggle Abstract Icon (moved in from client.issue.js)
            var $thisAbstractIcon = wrapperDiv.find('.abstract-toggle-icon'),
                $downArrow = 'icon-general-arrow-filled-down',
                $upArrow = 'icon-general-arrow-filled-up';

            $thisAbstractIcon.hasClass($downArrow) ? $thisAbstractIcon.removeClass($downArrow).addClass($upArrow) : $thisAbstractIcon.removeClass($upArrow).addClass($downArrow);

        });
    };
})(SCM.ArticleAbstract = SCM.ArticleAbstract || {}, jQuery);

jQuery(document).ready(function ($) {
    SCM.ArticleAbstract.initChapterAbstractClickEvent();
});
/*
 * Script to show or hide the "Google Preview" links based on the value of the client configuration parameter
 * called "System.EnableOupOnlineProductsFeatures"
 whose value will be stored in the "hfEnableOupOnlineProductsFeatures" hidden field.
*/

$(function () {
    var enableOnlineFeatures = $("#hfEnableOupOnlineProductsFeatures");
    if (enableOnlineFeatures && enableOnlineFeatures.val() === 'True') {
        $(".js-google-preview-ref-link").show();
        $(".js-worldcat-preview-ref-link").show();
        $(".js-copac-preview-ref-link").show();
    }
});


//# sourceMappingURL=footer.min.js.map
