var PF_VERSION = "2018-07-10-063749380";

!function() {
  var e = document.getElementById("printfriendly-data");
  if (e) {
    var t = JSON.parse(e.getAttribute("data"));
    window.pfstyle = t.pfstyle, window.pfOptions = t.pfOptions;
  }
  if (window.wrappedJSObject && window.wrappedJSObject.extensionPath) {
    var n = window.wrappedJSObject;
    window.extensionPath = n.extensionPath, window.pfstyle = n.pfstyle, window.pfOptions = n.pfOptions;
  }
}();

var pfMod = window.pfMod || function(l, e) {
  var r = l.document, t = "https:";
  function o(e) {
    coreIframe.contentWindow.postMessage(e, "*");
  }
  l.addEventListener("message", function(e) {
    try {
      if (e.data) {
        var t = e.data.payload;
        switch (e.data.type) {
         case "PfCoreLoaded":
          o({
            type: "PfStartCore",
            payload: {
              pfData: m.pfData
            }
          });
          break;

         case "PfExtensionCoreLoaded":
          o({
            type: "PfLoadCore",
            payload: {
              pfData: m.pfData
            }
          });
          break;

         case "PfClosePreview":
          m.closePreview();
          break;

         case "PfAddCSS":
          c.addCSS(t.css, t.useBody);
          break;

         case "PfRestoreStyles":
          c.restoreStyles();
          break;

         case "PfAddViewPortTag":
          c.addViewPortTag();
          break;

         case "PfScrollTop":
          l.scrollTo(0, 0);
          break;

         case "PfTwitterCopyEmbeded":
          u.copyEmbeded();
          break;

         case "PfCreateByAdType":
          a.createAdByType(t.adType);
          break;

         case "PfShowAds":
          a.show();
          break;

         case "PfHideAds":
          a.hide();
          break;

         case "PfFinished":
          m.hasContent = t.hasContent, m.finished = !0;
          break;

         case "PfRedirectIfNecessary":
          m.dsData = t.dsData, m.isRedirectNecessary() ? m.redirect() : o({
            type: "PfLaunchCore"
          });
        }
      }
    } catch (e) {
      y.log(e);
    }
  });
  var a = {
    createAdByType: function(e) {
      if (!document.getElementById("gaiframe")) {
        var t = a.isMobile() ? "_mobile" : "", n = m.config.hosts.cdn + m.config.filePath + m.version + "/ads/" + e + t + ".html", i = document.createElement("iframe");
        i.id = "gaiframe", i.name = "gaiframe", i.style = "border: 0!important; position:absolute!important; height:280px!important; margin-left: auto!important; margin-right: auto!important; left: 0!important; right:0!important; z-index: 2147483647!important; display:none;", 
        i.src = n, i.scrolling = "no", r.body.appendChild(i), a.setupSetStyle();
      }
    },
    isMobile: function() {
      return l.innerWidth <= 700;
    },
    setupSetStyle: function() {
      a.setStyle(), l.addEventListener("resize", function() {
        a.setStyle();
      });
    },
    setStyle: function() {
      var e = document.getElementById("gaiframe");
      if (e) {
        var t = 860 < l.innerWidth ? "284px" : "250px", n = 730 < l.innerWidth ? "700px" : l.innerWidth;
        e.style.removeProperty("width"), e.style.removeProperty("top"), e.style.setProperty("width", n, "important"), 
        e.style.setProperty("top", t, "important");
      }
    },
    show: function() {
      var e = document.getElementById("gaiframe");
      e && (e.style.display = "block");
    },
    hide: function() {
      var e = document.getElementById("gaiframe");
      e && (e.style.display = "none");
    }
  }, n = function(e, t, n) {
    o({
      type: "PfGaEvent",
      payload: {
        category: e,
        action: t,
        label: n
      }
    });
  }, s = {
    environment: "production",
    disableUI: !1,
    protocol: t,
    dir: "ltr",
    usingBM: !1,
    maxImageWidth: 750,
    filePath: "/assets/versions/",
    platform: "unknown",
    hosts: {
      cdn: t + "//cdn.printfriendly.com",
      pf: "https://www.printfriendly.com",
      ds: "https://www.printfriendly.com",
      translations: "https://www.printfriendly.com",
      ds_cdn: "https://ds-4047.kxcdn.com",
      pdf: "https://pdf.printfriendly.com",
      email: "https://www.printfriendly.com",
      page: l.location.host.split(":")[0],
      ravenDsn: "https://5463b49718cd4266911eab9e5c0e114d@sentry.io/22091"
    },
    domains: {
      page: l.location.host.split(":")[0].split("www.").pop()
    }
  }, p = {
    removeEmailsFromUrl: function(e) {
      for (var t = (e = e.split("?")[0]).split("/"), n = t.length; 0 < n--; ) -1 !== t[n].indexOf("@") && t.splice(n, 1);
      return t.join("/");
    },
    isDynamicPage: function() {
      return !!(l.React || l.angular || l.ng && l.ng.coreTokens || l.Backbone || l.Ember || l.Vue || document.querySelector && (document.querySelector("[ng-version]") || document.querySelector("*[data-reactroot]")));
    },
    ogImageUrl: function() {
      var e = "", t = document.querySelector && document.querySelector('meta[property="og:image"]');
      return t && t.content && (e = t.content), e;
    },
    isWix: function() {
      return -1 !== p.ogImageUrl().indexOf("wixstatic.com");
    },
    isOverBlog: function() {
      return -1 !== p.ogImageUrl().indexOf("over-blog-kiwi.com");
    },
    isLocalHost: function() {
      var e = l.location.host, t = l.location.hostname;
      return -1 !== e.indexOf(":") || !!t.match(/\d+\.\d+\.\d+\.\d+/) || "localhost" === t || !!t.split(".").pop().match(/invalid|test|example|localhost|dev/);
    }
  }, c = {
    addViewPortTag: function() {
      var e = r.getElementsByTagName("head")[0], t = r.querySelector("meta[name=viewport]");
      t || ((t = r.createElement("meta")).name = "viewport"), t.content = "width=device-width, initial-scale=1", 
      e.appendChild(t);
    },
    addCSS: function(e, t) {
      var n = t ? "body" : "head", i = r.getElementsByTagName(n)[0], o = r.createElement("style");
      o.type = "text/css", o.setAttribute("name", "pf-style"), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(r.createTextNode(e)), 
      i.appendChild(o);
    },
    restoreStyles: function() {
      for (var e = document.getElementsByName("pf-style"), t = e.length - 1; 0 <= t; t--) e[t].parentNode.removeChild(e[t]);
    }
  }, d = {
    isReady: !1,
    readyBound: !1,
    ready: function() {
      if (!d.isReady) {
        if (!document.body) return setTimeout(d.ready, 13);
        d.isReady = !0, d.readyFunc.call();
      }
    },
    doScrollCheck: function() {
      if (!d.isReady) {
        try {
          document.documentElement.doScroll("left");
        } catch (e) {
          return setTimeout(d.doScrollCheck, 50);
        }
        d.detach(), d.ready();
      }
    },
    detach: function() {
      document.addEventListener ? (document.removeEventListener("DOMContentLoaded", d.completed, !1), 
      l.removeEventListener("load", d.completed, !1)) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", d.completed), 
      l.detachEvent("onload", d.completed));
    },
    completed: function(e) {
      (document.addEventListener || "load" === e.type || "complete" === document.readyState) && (d.detach(), 
      d.ready());
    },
    bindReady: function() {
      if (!d.readyBound) {
        if (d.readyBound = !0, "complete" === document.readyState) return d.ready();
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", d.completed, !1), 
        l.addEventListener("load", d.completed, !1); else if (document.attachEvent) {
          document.attachEvent("onreadystatechange", d.completed), l.attachEvent("onload", d.completed);
          var e = !1;
          try {
            e = null == l.frameElement && document.documentElement;
          } catch (e) {}
          e && e.doScroll && d.doScrollCheck();
        }
      }
    },
    domReady: function(e) {
      this.readyFunc = e, this.bindReady();
    },
    canonicalize: function(e) {
      if (e) {
        var t = document.createElement("div");
        return t.innerHTML = "<a></a>", t.firstChild.href = e, t.innerHTML = t.innerHTML, 
        t.firstChild.href;
      }
      return e;
    }
  }, f = {
    headerImageUrl: d.canonicalize(l.pfHeaderImgUrl),
    headerTagline: l.pfHeaderTagline,
    imageDisplayStyle: l.pfImageDisplayStyle,
    customCSSURL: d.canonicalize(l.pfCustomCSS),
    disableClickToDel: l.pfdisableClickToDel,
    disablePDF: l.pfDisablePDF,
    disablePrint: l.pfDisablePrint,
    disableEmail: l.pfDisableEmail
  };
  -1 !== "|full-size|remove-images|large|medium|small|".indexOf("|" + l.pfImagesSize + "|") ? f.imagesSize = l.pfImagesSize : f.imagesSize = 1 == l.pfHideImages ? "remove-images" : "full-size";
  var m = {
    version: PF_VERSION,
    initialized: !1,
    finished: !1,
    onServer: !1,
    hasContent: !1,
    messages: [],
    errors: [],
    waitDsCounter: 0,
    autoStart: !1,
    stats: {},
    init: function(e) {
      try {
        this.initialized = !0, this.configure(e), this.onServerSetup(), m.onServer || this.config.isExtension || this.getAdSettingsFromPFServer(), 
        this.setVariables(), this.detectBrowser(), this.startIfNecessary(), l.print = function() {
          m.start();
        };
      } catch (e) {
        y.log(e);
      }
    },
    configure: function(e) {
      if (this.config = s, e) {
        for (var t in this.config.environment = e.environment || "development", e.hosts) this.config.hosts[t] = e.hosts[t];
        e.filePath && (this.config.filePath = e.filePath), e.ssLocation && (this.config.ssLocation = e.ssLocation), 
        e.ssStyleSheetHrefs && (this.config.ssStyleSheetHrefs = e.ssStyleSheetHrefs);
      }
      this.userOptions = {
        redirect: {
          disableForiPad: !!this.getVal(l.pfUserOptions, "redirect.disableForiPad")
        }
      }, this.config.isExtension = !!l.extensionPath;
    },
    getVal: function(e, t) {
      for (var n = t.split("."); void 0 !== e && n.length; ) e = e[n.shift()];
      return e;
    },
    startIfNecessary: function() {
      (l.pfstyle || this.autoStart) && this.start();
    },
    urlHasAutoStartParams: function() {
      return -1 !== this.config.urls.page.indexOf("pfstyle=wp");
    },
    start: function() {
      if (m.onServer || m.config.isExtension) m.launch(); else {
        if (m.waitDsCounter += 1, m.waitDsCounter < 20 && !m.dsData) return setTimeout(function() {
          m.start();
        }, 100);
        m.isRedirectNecessary() ? m.redirect() : m.supportedSiteType() && m.launch();
      }
    },
    launch: function() {
      d.domReady(function() {
        try {
          m.startTime = new Date().getTime(), g.run(), m.pfData = h.get(), m.config.disableUI || (m.sanitizeLocation(), 
          m.createMask()), m.loadCore();
        } catch (e) {
          y.log(e);
        }
      });
    },
    sanitizeLocation: function() {
      url = document.location.href.split("?")[0], url = p.removeEmailsFromUrl(url), url !== document.location.href && (history && "function" == typeof history.pushState ? history.pushState({
        pf: "sanitized"
      }, document.title, url) : m.urlHasPII = !0);
    },
    unsanitizeLocation: function() {
      history && history.state && "sanitized" == history.state.pf && history.back();
    },
    onServerSetup: function() {
      l.onServer && (this.onServer = !0, this.config.disableUI = !0);
    },
    setVariables: function() {
      var e = this, t, n = "";
      "production" !== this.config.environment && (n = "?_=" + Math.random());
      var i = e.config.hosts.cdn + e.config.filePath + e.version, o = this.config.disableUI ? "" : i + "/pf-app/main.css" + n, r = this.config.disableUI ? "" : i + "/content/main.css" + n;
      this.config.urls = {
        version: i,
        js: {
          jquery: "https://cdn.printfriendly.com/assets/unversioned/jquery/1.12.4.min.js",
          raven: "https://cdn.ravenjs.com/3.19.1/raven.min.js",
          core: i + "/core.js" + n,
          algo: i + "/algo.js" + n
        },
        css: {
          pfApp: o,
          content: r
        },
        pdfMake: e.config.hosts.pdf + "/pdfs/make",
        email: e.config.hosts.email + "/email/new"
      };
      try {
        t = top.location.href;
      } catch (e) {
        t = l.location.href;
      }
      this.config.urls.page = t, this.userSettings = f, this.config.pfstyle = l.pfstyle, 
      !l.pfstyle || "bk" !== l.pfstyle && "nbk" !== l.pfstyle && "cbk" !== l.pfstyle || (this.config.usingBM = !0), 
      this.autoStart = this.urlHasAutoStartParams();
    },
    detectBrowser: function() {
      this.browser = {};
      var e = navigator.appVersion;
      e && -1 !== e.indexOf("MSIE") ? (this.browser.version = parseFloat(e.split("MSIE")[1]), 
      this.browser.isIE = !0) : this.browser.isIE = !1;
    },
    loadScript: function(e, t) {
      var n = document.getElementsByTagName("head")[0], i = document.createElement("script");
      i.type = "text/javascript", i.src = e, i.onreadystatechange = t, i.onload = t, n.appendChild(i);
    },
    createIframe: function(e) {
      var t = e.createElement("iframe");
      return t.frameBorder = "0", t.allowTransparency = "true", t;
    },
    loadHtmlInIframe: function(t, n, e) {
      var i, o;
      try {
        o = n.contentWindow.document;
      } catch (e) {
        i = t.domain, o = n.contentWindow.document;
      }
      o.write(e), o.close();
    },
    redirect: function() {
      var e = [ "source=cs", "url=" + encodeURIComponent(top.location.href) ], t;
      for (var n in f) void 0 !== f[n] && e.push(n + "=" + encodeURIComponent(f[n]));
      t = this.config.hosts.pf + "/print/?" + e.join("&"), this.autoStart ? top.location.replace(t) : top.location.href = t;
    },
    supportedSiteType: function() {
      return "about:blank" !== m.config.urls.page && ("http:" === m.config.protocol || "https:" === m.config.protocol);
    },
    isRedirectNecessary: function() {
      var e = l.pfstyle && "wp" != l.pfstyle, t = p.isDynamicPage(), n = p.isLocalHost(), i = p.isWix() || p.isOverBlog();
      if (m.stats.page = {
        bm: e,
        dynamic: t,
        local: n,
        unSupported: i
      }, m.dsData) {
        var o = m.dsData.domain_settings.ad_free, r = m.dsData.domain_settings.redirect, a = m.dsData.domain_settings.bk_redirect, s, c;
        if (!o && !t && !n && !i && (!e && r || e && a)) return !0;
      }
      try {
        var d = navigator.userAgent.match(/Edge\/(\d+.\d+)/);
        return !!(!history || "function" != typeof history.pushState || navigator.userAgent.match(/(ipod|opera.mini|blackberry|playbook|bb10)/i) || this.browser.isIE && this.browser.version < 11 || this.browser.isIE && l.adsbygoogle || "undefined" != typeof $ && $.jcarousel && this.browser.isIE || d && 2 === d.length && parseFloat(d[1]) < 13.10586);
      } catch (e) {
        return y.log(e), !1;
      }
    },
    createMask: function() {
      var e = document.createElement("div");
      e.innerHTML = '<div id="pf-mask" style="z-index: 2147483627!important; position: fixed !important; top: 0pt !important; left: 0pt !important; background-color: rgb(0, 0, 0) !important; opacity: 0.8 !important;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80); height: 100% !important; width: 100% !important;"></div>', 
      document.body.appendChild(e.firstChild);
    },
    closePreview: function() {
      d.readyBound = !1, d.isReady = !1, m.unsanitizeLocation();
      var e = document.getElementById("pf-core");
      e && e.parentElement && e.parentElement.removeChild(e);
      var t = document.getElementById("pf-mask");
      t && t.parentElement && t.parentElement.removeChild(t);
      var n = document.getElementById("gaiframe");
      n && n.parentElement && n.parentElement.removeChild(n);
    },
    removeDoubleSemiColon: function(e) {
      return e.replace(/;{2}/g, ";");
    },
    loadCore: function() {
      l.coreIframe = this.createIframe(document), coreIframe.id = "pf-core", coreIframe.name = "pf-core", 
      document.body.appendChild(coreIframe);
      var e = coreIframe.style.cssText + ";width: 100% !important;max-width:100% !important;height: 100% !important; display: block !important; overflow: hidden !important; position: absolute !important; top: 0px !important; left: 0px !important; background-color: transparent !important; z-index: 2147483647!important";
      if (coreIframe.style.cssText = this.removeDoubleSemiColon(e), this.config.isExtension) coreIframe.src = extensionPath + "/core.html", 
      coreIframe.onload = function() {
        try {
          coreIframe.contentWindow && coreIframe.contentWindow.postMessage ? coreIframe.contentWindow.postMessage({
            type: "PfLoadCore",
            payload: {
              pfData: m.pfData
            }
          }, "*") : this.contentWindow.parent.postMessage({
            type: "PfExtensionCoreLoaded"
          }, "*");
        } catch (e) {}
      }; else {
        var t = '<!DOCTYPE html><html><head><base target="_parent"><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1"><script src="' + this.config.urls.js.jquery + '"><\/script>';
        m.onServer || (t += '<script src="' + this.config.urls.js.raven + '"><\/script>'), 
        t += '<script src="' + this.config.urls.js.core + '"><\/script><link media="screen" type="text/css" rel="stylesheet" href="' + this.config.urls.css.pfApp + '"></head><body class="cs-core-iframe" onload="core.init();"></body>', 
        this.loadHtmlInIframe(document, coreIframe, t);
      }
    },
    getAdSettingsFromPFServer: function() {
      var e = document.createElement("script");
      e.src = m.config.hosts.ds_cdn + "/api/v3/domain_settings/a?callback=pfMod.saveAdSettings&hostname=" + m.config.hosts.page + "&client_version=" + m.version, 
      document.getElementsByTagName("head")[0].appendChild(e);
    },
    saveAdSettings: function(e) {
      m.dsData = e, l.coreIframe && coreIframe.contentWindow && o({
        type: "PfConfigureAdSettings",
        payload: {
          dsData: e
        }
      });
    }
  }, h = {
    emailText: function() {
      var e = document.getElementsByClassName("pf-email");
      return e.length ? e[0].textContent : "";
    },
    csStyleSheetHrefs: function() {
      var e = [];
      for (i = 0; i < r.styleSheets.length; i++) e.push(r.styleSheets[i].href);
      return e;
    },
    metas: function() {
      var e = r.getElementsByTagName("meta"), t = [];
      for (i = 0; i < e.length; i++) t.push({
        name: e[i].getAttribute("name"),
        content: e[i].getAttribute("content"),
        property: e[i].getAttribute("property"),
        itemprop: e[i].getAttribute("itemprop")
      });
      return t;
    },
    screen: function() {
      return {
        x: void 0 !== l.top.screenX ? l.top.screenX : l.top.screenLeft,
        y: void 0 !== l.top.screenY ? l.top.screenY : l.top.screenTop,
        width: void 0 !== l.top.outerWidth ? l.top.outerWidth : l.top.document.documentElement.clientWidth,
        height: void 0 !== l.top.outerHeight ? l.top.outerHeight : l.top.document.documentElement.clientHeight - 22
      };
    },
    language: function() {
      var e = document.getElementsByTagName("html")[0].getAttribute("lang");
      if (!e) {
        var t = document.querySelector("meta[http-equiv=Content-Language]");
        t && (e = t.getAttribute("content"));
      }
      return e;
    },
    canvasDataUrls: function() {
      for (var e = [], t = r.getElementsByTagName("canvas"), n = 0; n < t.length; n++) try {
        var i = t[n], o = i.toDataURL("image/png");
        i.setAttribute("pf-dataurl-index", e.length), e.push(o);
      } catch (e) {}
      return e;
    },
    favicon: function() {
      for (var e, t = document.getElementsByTagName("link"), n = 0; n < t.length; n++) {
        var i = t[n], o = i.getAttribute("rel");
        if ("icon" === o || "shortcut icon" === o) {
          e = i.getAttribute("href");
          break;
        }
      }
      return 0 !== (e = e || "favicon.ico").indexOf("http") && (e = l.location.protocol + "//" + l.location.host + "/" + e), 
      e;
    },
    get: function() {
      m.config.extensionPath = l.extensionPath;
      var e = this.canvasDataUrls(), t = document.location;
      return page = {
        dir: r.body.getAttribute("dir") || r.querySelector("html").getAttribute("dir") || getComputedStyle(r.body).getPropertyValue("direction") || "ltr",
        bodyClassList: [].slice.call(r.body.classList),
        emailText: this.emailText(),
        screen: this.screen(),
        metas: this.metas(),
        csStyleSheetHrefs: this.csStyleSheetHrefs(),
        location: {
          href: t.href,
          host: t.host,
          pathname: t.pathname,
          protocol: t.protocol
        },
        hasPrintOnly: 0 !== r.querySelectorAll("#print-only, .print-only").length,
        title: document.title,
        body: document.body.innerHTML,
        language: this.language(),
        canvasDataUrls: e,
        favicon: this.favicon()
      }, {
        startTime: m.startTime,
        config: m.config,
        userSettings: m.userSettings,
        version: m.version,
        onServer: m.onServer,
        browser: m.browser,
        urlHasPII: m.urlHasPII,
        dsData: m.dsData,
        stats: m.stats,
        page: page
      };
    }
  }, u = {
    copyEmbeded: function() {
      var e, t, n;
      for (n = (e = r.querySelectorAll("twitterwidget.twitter-tweet-rendered")).length - 1; 0 <= n; n--) o({
        type: "PfTwitterWidgetShadowDom",
        payload: {
          id: (t = e[n]).id,
          innerHTML: t.shadowRoot.innerHTML,
          cssText: t.style.cssText
        }
      });
      for (n = (e = r.querySelectorAll("iframe.twitter-tweet-rendered")).length - 1; 0 <= n; n--) e = e[n], 
      o({
        type: "PfTwitterTweetRendered",
        payload: {
          id: t.id,
          head: t.contentDocument.head.innerHTML,
          body: t.contentDocument.body.innerHTML,
          cssText: t.style.cssText
        }
      });
    }
  }, g = {
    LARGE_IMAGE_WIDTH: 300,
    LARGE_IMAGE_HEIGHT: 200,
    run: function() {
      this.processChildren(document.body);
    },
    processChildren: function(e) {
      for (var t, n, i = e.firstChild; i; ) {
        if (!i.classList || !i.classList.contains("comment-list")) {
          if (i.nodeType === Node.ELEMENT_NODE) try {
            t = i.nodeName.toLowerCase(), "none" === (n = i.currentStyle || l.getComputedStyle(i)).display || "hidden" === n.visibility ? i.classList.add("hidden-originally") : i.classList.contains("hidden-originally") && i.classList.remove("hidden-originally"), 
            "a" === t ? (href = i.getAttribute("href") || "", "#" !== href.charAt(0) && (i.href = i.href)) : "img" !== t && "svg" !== t || (i.src = i.src, 
            pfMod.onServer || (!i.getAttribute("width") && i.clientWidth && i.setAttribute("width", i.clientWidth), 
            !i.getAttribute("height") && i.clientHeight && i.setAttribute("height", i.clientHeight)), 
            "img" === t && !i.classList.contains("hidden-originally") && i.clientWidth > this.LARGE_IMAGE_WIDTH && i.clientHeight > this.LARGE_IMAGE_HEIGHT && i.classList.add("pf-large-image"));
          } catch (e) {}
          i.hasChildNodes() && this.processChildren(i);
        }
        i = i.nextSibling;
      }
    }
  }, y = {
    _window: l.top,
    _doc: l.top.document,
    installInitiated: !1,
    validFile: /d3nekkt1lmmhms|printfriendly\.com|printnicer\.com|algo\.js|printfriendly\.js|core\.js/,
    setVars: function() {
      this._window.frames["pf-core"] && this._window.frames["pf-core"].document && (this._window = this._window.frames["pf-core"], 
      this._doc = this._window.document);
    },
    install: function() {
      if (this.installInitiated) return !0;
      this.installInitiated = !0, this.setVars();
      var e = this._doc.createElement("script"), t = this._doc.getElementsByTagName("script")[0];
      e.src = this.config.urls.js.raven, t.parentNode.appendChild(e), this.wait();
    },
    wait: function() {
      if (!this._window.Raven) return setTimeout(function() {
        y.wait();
      }, 100);
      this.configure(), this.pushExistingErrors();
    },
    configure: function() {
      var e = {
        dataCallback: function(e) {
          var t, n;
          try {
            (t = e.stacktrace.frames[0]).filename.match(y.validFile) && "onload" !== t.function || e.stacktrace.frames.shift();
          } catch (e) {}
          return e;
        },
        shouldSendCallback: function(e) {
          return !!(e && e.extra && e.extra.file);
        },
        release: m.version
      };
      this._window.Raven.config(m.config.hosts.ravenDsn, e).install();
    },
    sendError: function(e, t) {
      (t = void 0 !== t ? {
        file: t.file
      } : {
        file: "printfriendly.js"
      }).usingBM = m.config.usingBM, t.url = m.config.urls.page, "production" === m.config.environment && this._window.Raven.captureException(e, {
        extra: t
      });
    },
    pushExistingErrors: function() {
      for (var e = 0; e < m.errors.length; e++) this.sendError(m.errors[e].err, m.errors[e].opts);
    },
    log: function(e, t) {
      "development" === m.config.environment && console.error(e), m.finished = !0, t = t || {
        file: "printfriendly.js"
      };
      try {
        this._window.Raven ? this.sendError(e, t) : (m.errors.push({
          err: e,
          opts: t
        }), this.install(), m.messages.push(e.name + " : " + e.message), m.messages.push(e.stack));
      } catch (e) {}
    }
  };
  return m.exTracker = y, m;
}(window), priFri = pfMod;

pfMod.initialized && (document.getElementById("printfriendly-data") || window.extensionPath) ? pfMod.start() : "algo" === window.name || "pf-core" === window.name || pfMod.initialized || pfMod.init(window.pfOptions);