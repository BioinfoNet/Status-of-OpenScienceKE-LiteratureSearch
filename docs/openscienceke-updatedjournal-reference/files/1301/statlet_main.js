!function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.Handlebars = a.Handlebars || b();
}(this, function() {
    var a = function() {
        "use strict";
        function a(a) {
            this.string = a;
        }
        var b;
        return a.prototype.toString = function() {
            return "" + this.string;
        }, b = a;
    }(), b = function(a) {
        "use strict";
        function b(a) {
            return i[a];
        }
        function c(a) {
            for (var b = 1; b < arguments.length; b++) for (var c in arguments[b]) Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
            return a;
        }
        function d(a) {
            return a instanceof h ? a.toString() : null == a ? "" : a ? (a = "" + a, k.test(a) ? a.replace(j, b) : a) : a + "";
        }
        function e(a) {
            return a || 0 === a ? n(a) && 0 === a.length ? !0 : !1 : !0;
        }
        function f(a, b) {
            return (a ? a + "." : "") + b;
        }
        var g = {}, h = a, i = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, j = /[&<>"'`]/g, k = /[&<>"'`]/;
        g.extend = c;
        var l = Object.prototype.toString;
        g.toString = l;
        var m = function(a) {
            return "function" == typeof a;
        };
        m(/x/) && (m = function(a) {
            return "function" == typeof a && "[object Function]" === l.call(a);
        });
        var m;
        g.isFunction = m;
        var n = Array.isArray || function(a) {
            return a && "object" == typeof a ? "[object Array]" === l.call(a) : !1;
        };
        return g.isArray = n, g.escapeExpression = d, g.isEmpty = e, g.appendContextPath = f, 
        g;
    }(a), c = function() {
        "use strict";
        function a(a, b) {
            var d;
            b && b.firstLine && (d = b.firstLine, a += " - " + d + ":" + b.firstColumn);
            for (var e = Error.prototype.constructor.call(this, a), f = 0; f < c.length; f++) this[c[f]] = e[c[f]];
            d && (this.lineNumber = d, this.column = b.firstColumn);
        }
        var b, c = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
        return a.prototype = new Error(), b = a;
    }(), d = function(a, b) {
        "use strict";
        function c(a, b) {
            this.helpers = a || {}, this.partials = b || {}, d(this);
        }
        function d(a) {
            a.registerHelper("helperMissing", function() {
                if (1 === arguments.length) return void 0;
                throw new g("Missing helper: '" + arguments[arguments.length - 1].name + "'");
            }), a.registerHelper("blockHelperMissing", function(b, c) {
                var d = c.inverse, e = c.fn;
                if (b === !0) return e(this);
                if (b === !1 || null == b) return d(this);
                if (k(b)) return b.length > 0 ? (c.ids && (c.ids = [ c.name ]), a.helpers.each(b, c)) : d(this);
                if (c.data && c.ids) {
                    var g = q(c.data);
                    g.contextPath = f.appendContextPath(c.data.contextPath, c.name), c = {
                        data: g
                    };
                }
                return e(b, c);
            }), a.registerHelper("each", function(a, b) {
                if (!b) throw new g("Must pass iterator to #each");
                var c, d, e = b.fn, h = b.inverse, i = 0, j = "";
                if (b.data && b.ids && (d = f.appendContextPath(b.data.contextPath, b.ids[0]) + "."), 
                l(a) && (a = a.call(this)), b.data && (c = q(b.data)), a && "object" == typeof a) if (k(a)) for (var m = a.length; m > i; i++) c && (c.index = i, 
                c.first = 0 === i, c.last = i === a.length - 1, d && (c.contextPath = d + i)), j += e(a[i], {
                    data: c
                }); else for (var n in a) a.hasOwnProperty(n) && (c && (c.key = n, c.index = i, 
                c.first = 0 === i, d && (c.contextPath = d + n)), j += e(a[n], {
                    data: c
                }), i++);
                return 0 === i && (j = h(this)), j;
            }), a.registerHelper("if", function(a, b) {
                return l(a) && (a = a.call(this)), !b.hash.includeZero && !a || f.isEmpty(a) ? b.inverse(this) : b.fn(this);
            }), a.registerHelper("unless", function(b, c) {
                return a.helpers["if"].call(this, b, {
                    fn: c.inverse,
                    inverse: c.fn,
                    hash: c.hash
                });
            }), a.registerHelper("with", function(a, b) {
                l(a) && (a = a.call(this));
                var c = b.fn;
                if (f.isEmpty(a)) return b.inverse(this);
                if (b.data && b.ids) {
                    var d = q(b.data);
                    d.contextPath = f.appendContextPath(b.data.contextPath, b.ids[0]), b = {
                        data: d
                    };
                }
                return c(a, b);
            }), a.registerHelper("log", function(b, c) {
                var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                a.log(d, b);
            }), a.registerHelper("lookup", function(a, b) {
                return a && a[b];
            });
        }
        var e = {}, f = a, g = b, h = "2.0.0";
        e.VERSION = h;
        var i = 6;
        e.COMPILER_REVISION = i;
        var j = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        e.REVISION_CHANGES = j;
        var k = f.isArray, l = f.isFunction, m = f.toString, n = "[object Object]";
        e.HandlebarsEnvironment = c, c.prototype = {
            constructor: c,
            logger: o,
            log: p,
            registerHelper: function(a, b) {
                if (m.call(a) === n) {
                    if (b) throw new g("Arg not supported with multiple helpers");
                    f.extend(this.helpers, a);
                } else this.helpers[a] = b;
            },
            unregisterHelper: function(a) {
                delete this.helpers[a];
            },
            registerPartial: function(a, b) {
                m.call(a) === n ? f.extend(this.partials, a) : this.partials[a] = b;
            },
            unregisterPartial: function(a) {
                delete this.partials[a];
            }
        };
        var o = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,
            log: function(a, b) {
                if (o.level <= a) {
                    var c = o.methodMap[a];
                    "undefined" != typeof console && console[c] && console[c].call(console, b);
                }
            }
        };
        e.logger = o;
        var p = o.log;
        e.log = p;
        var q = function(a) {
            var b = f.extend({}, a);
            return b._parent = a, b;
        };
        return e.createFrame = q, e;
    }(b, c), e = function(a, b, c) {
        "use strict";
        function d(a) {
            var b = a && a[0] || 1, c = m;
            if (b !== c) {
                if (c > b) {
                    var d = n[c], e = n[b];
                    throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").");
                }
                throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").");
            }
        }
        function e(a, b) {
            if (!b) throw new l("No environment passed to template");
            if (!a || !a.main) throw new l("Unknown template object: " + typeof a);
            b.VM.checkRevision(a.compiler);
            var c = function(c, d, e, f, g, h, i, j, m) {
                g && (f = k.extend({}, f, g));
                var n = b.VM.invokePartial.call(this, c, e, f, h, i, j, m);
                if (null == n && b.compile) {
                    var o = {
                        helpers: h,
                        partials: i,
                        data: j,
                        depths: m
                    };
                    i[e] = b.compile(c, {
                        data: void 0 !== j,
                        compat: a.compat
                    }, b), n = i[e](f, o);
                }
                if (null != n) {
                    if (d) {
                        for (var p = n.split("\n"), q = 0, r = p.length; r > q && (p[q] || q + 1 !== r); q++) p[q] = d + p[q];
                        n = p.join("\n");
                    }
                    return n;
                }
                throw new l("The partial " + e + " could not be compiled when running in runtime-only mode");
            }, d = {
                lookup: function(a, b) {
                    for (var c = a.length, d = 0; c > d; d++) if (a[d] && null != a[d][b]) return a[d][b];
                },
                lambda: function(a, b) {
                    return "function" == typeof a ? a.call(b) : a;
                },
                escapeExpression: k.escapeExpression,
                invokePartial: c,
                fn: function(b) {
                    return a[b];
                },
                programs: [],
                program: function(a, b, c) {
                    var d = this.programs[a], e = this.fn(a);
                    return b || c ? d = f(this, a, e, b, c) : d || (d = this.programs[a] = f(this, a, e)), 
                    d;
                },
                data: function(a, b) {
                    for (;a && b--; ) a = a._parent;
                    return a;
                },
                merge: function(a, b) {
                    var c = a || b;
                    return a && b && a !== b && (c = k.extend({}, b, a)), c;
                },
                noop: b.VM.noop,
                compilerInfo: a.compiler
            }, e = function(b, c) {
                c = c || {};
                var f = c.data;
                e._setup(c), !c.partial && a.useData && (f = i(b, f));
                var g;
                return a.useDepths && (g = c.depths ? [ b ].concat(c.depths) : [ b ]), a.main.call(d, b, d.helpers, d.partials, f, g);
            };
            return e.isTop = !0, e._setup = function(c) {
                c.partial ? (d.helpers = c.helpers, d.partials = c.partials) : (d.helpers = d.merge(c.helpers, b.helpers), 
                a.usePartial && (d.partials = d.merge(c.partials, b.partials)));
            }, e._child = function(b, c, e) {
                if (a.useDepths && !e) throw new l("must pass parent depths");
                return f(d, b, a[b], c, e);
            }, e;
        }
        function f(a, b, c, d, e) {
            var f = function(b, f) {
                return f = f || {}, c.call(a, b, a.helpers, a.partials, f.data || d, e && [ b ].concat(e));
            };
            return f.program = b, f.depth = e ? e.length : 0, f;
        }
        function g(a, b, c, d, e, f, g) {
            var h = {
                partial: !0,
                helpers: d,
                partials: e,
                data: f,
                depths: g
            };
            if (void 0 === a) throw new l("The partial " + b + " could not be found");
            return a instanceof Function ? a(c, h) : void 0;
        }
        function h() {
            return "";
        }
        function i(a, b) {
            return b && "root" in b || (b = b ? o(b) : {}, b.root = a), b;
        }
        var j = {}, k = a, l = b, m = c.COMPILER_REVISION, n = c.REVISION_CHANGES, o = c.createFrame;
        return j.checkRevision = d, j.template = e, j.program = f, j.invokePartial = g, 
        j.noop = h, j;
    }(b, c, d), f = function(a, b, c, d, e) {
        "use strict";
        var f, g = a, h = b, i = c, j = d, k = e, l = function() {
            var a = new g.HandlebarsEnvironment();
            return j.extend(a, g), a.SafeString = h, a.Exception = i, a.Utils = j, a.escapeExpression = j.escapeExpression, 
            a.VM = k, a.template = function(b) {
                return k.template(b, a);
            }, a;
        }, m = l();
        return m.create = l, m["default"] = m, f = m;
    }(d, a, c, b, e);
    return f;
});

(function() {
    atmire = window.atmire || {};
    atmire.Handlebars = atmire.Handlebars || Handlebars;
})();

(function(root, factory) {
    if (typeof exports == "object") module.exports = factory(); else if (typeof define == "function" && define.amd) define(factory); else root.Spinner = factory();
})(this, function() {
    "use strict";
    var prefixes = [ "webkit", "Moz", "ms", "O" ], animations = {}, useCssAnimations;
    function createEl(tag, prop) {
        var el = document.createElement(tag || "div"), n;
        for (n in prop) el[n] = prop[n];
        return el;
    }
    function ins(parent) {
        for (var i = 1, n = arguments.length; i < n; i++) parent.appendChild(arguments[i]);
        return parent;
    }
    var sheet = function() {
        var el = createEl("style", {
            type: "text/css"
        });
        ins(document.getElementsByTagName("head")[0], el);
        return el.sheet || el.styleSheet;
    }();
    function addAnimation(alpha, trail, i, lines) {
        var name = [ "opacity", trail, ~~(alpha * 100), i, lines ].join("-"), start = .01 + i / lines * 100, z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha), prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase(), pre = prefix && "-" + prefix + "-" || "";
        if (!animations[name]) {
            sheet.insertRule("@" + pre + "keyframes " + name + "{" + "0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + .01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}" + "100%{opacity:" + z + "}" + "}", sheet.cssRules.length);
            animations[name] = 1;
        }
        return name;
    }
    function vendor(el, prop) {
        var s = el.style, pp, i;
        if (s[prop] !== undefined) return prop;
        prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        for (i = 0; i < prefixes.length; i++) {
            pp = prefixes[i] + prop;
            if (s[pp] !== undefined) return pp;
        }
    }
    function css(el, prop) {
        for (var n in prop) el.style[vendor(el, n) || n] = prop[n];
        return el;
    }
    function merge(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i];
            for (var n in def) if (obj[n] === undefined) obj[n] = def[n];
        }
        return obj;
    }
    function pos(el) {
        var o = {
            x: el.offsetLeft,
            y: el.offsetTop
        };
        while (el = el.offsetParent) o.x += el.offsetLeft, o.y += el.offsetTop;
        return o;
    }
    function getColor(color, idx) {
        return typeof color == "string" ? color : color[idx % color.length];
    }
    var defaults = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: 1 / 4,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto",
        position: "relative"
    };
    function Spinner(o) {
        if (typeof this == "undefined") return new Spinner(o);
        this.opts = merge(o || {}, Spinner.defaults, defaults);
    }
    Spinner.defaults = {};
    merge(Spinner.prototype, {
        spin: function(target) {
            this.stop();
            var self = this, o = self.opts, el = self.el = css(createEl(0, {
                className: o.className
            }), {
                position: o.position,
                width: 0,
                zIndex: o.zIndex
            }), mid = o.radius + o.length + o.width, ep, tp;
            if (target) {
                target.insertBefore(el, target.firstChild || null);
                tp = pos(target);
                ep = pos(el);
                css(el, {
                    left: (o.left == "auto" ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + "px",
                    top: (o.top == "auto" ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + "px"
                });
            }
            el.setAttribute("role", "progressbar");
            self.lines(el, self.opts);
            if (!useCssAnimations) {
                var i = 0, start = (o.lines - 1) * (1 - o.direction) / 2, alpha, fps = o.fps, f = fps / o.speed, ostep = (1 - o.opacity) / (f * o.trail / 100), astep = f / o.lines;
                (function anim() {
                    i++;
                    for (var j = 0; j < o.lines; j++) {
                        alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);
                        self.opacity(el, j * o.direction + start, alpha, o);
                    }
                    self.timeout = self.el && setTimeout(anim, ~~(1e3 / fps));
                })();
            }
            return self;
        },
        stop: function() {
            var el = this.el;
            if (el) {
                clearTimeout(this.timeout);
                if (el.parentNode) el.parentNode.removeChild(el);
                this.el = undefined;
            }
            return this;
        },
        lines: function(el, o) {
            var i = 0, start = (o.lines - 1) * (1 - o.direction) / 2, seg;
            function fill(color, shadow) {
                return css(createEl(), {
                    position: "absolute",
                    width: o.length + o.width + "px",
                    height: o.width + "px",
                    background: color,
                    boxShadow: shadow,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / o.lines * i + o.rotate) + "deg) translate(" + o.radius + "px" + ",0)",
                    borderRadius: (o.corners * o.width >> 1) + "px"
                });
            }
            for (;i < o.lines; i++) {
                seg = css(createEl(), {
                    position: "absolute",
                    top: 1 + ~(o.width / 2) + "px",
                    transform: o.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: o.opacity,
                    animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
                });
                if (o.shadow) ins(seg, css(fill("#000", "0 0 4px " + "#000"), {
                    top: 2 + "px"
                }));
                ins(el, ins(seg, fill(getColor(o.color, i), "0 0 1px rgba(0,0,0,.1)")));
            }
            return el;
        },
        opacity: function(el, i, val) {
            if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
        }
    });
    function initVML() {
        function vml(tag, attr) {
            return createEl("<" + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
        }
        sheet.addRule(".spin-vml", "behavior:url(#default#VML)");
        Spinner.prototype.lines = function(el, o) {
            var r = o.length + o.width, s = 2 * r;
            function grp() {
                return css(vml("group", {
                    coordsize: s + " " + s,
                    coordorigin: -r + " " + -r
                }), {
                    width: s,
                    height: s
                });
            }
            var margin = -(o.width + o.length) * 2 + "px", g = css(grp(), {
                position: "absolute",
                top: margin,
                left: margin
            }), i;
            function seg(i, dx, filter) {
                ins(g, ins(css(grp(), {
                    rotation: 360 / o.lines * i + "deg",
                    left: ~~dx
                }), ins(css(vml("roundrect", {
                    arcsize: o.corners
                }), {
                    width: r,
                    height: o.width,
                    left: o.radius,
                    top: -o.width >> 1,
                    filter: filter
                }), vml("fill", {
                    color: getColor(o.color, i),
                    opacity: o.opacity
                }), vml("stroke", {
                    opacity: 0
                }))));
            }
            if (o.shadow) for (i = 1; i <= o.lines; i++) seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (i = 1; i <= o.lines; i++) seg(i);
            return ins(el, g);
        };
        Spinner.prototype.opacity = function(el, i, val, o) {
            var c = el.firstChild;
            o = o.shadow && o.lines || 0;
            if (c && i + o < c.childNodes.length) {
                c = c.childNodes[i + o];
                c = c && c.firstChild;
                c = c && c.firstChild;
                if (c) c.opacity = val;
            }
        };
    }
    var probe = css(createEl("group"), {
        behavior: "url(#default#VML)"
    });
    if (!vendor(probe, "transform") && probe.adj) initVML(); else useCssAnimations = vendor(probe, "animation");
    return Spinner;
});

(function(factory) {
    if (typeof exports == "object") {
        factory(require("jquery"), require("spin"));
    } else if (typeof define == "function" && define.amd) {
        define([ "jquery", "spin" ], factory);
    } else {
        if (!window.Spinner) throw new Error("Spin.js not present");
        factory(window.jQuery, window.Spinner);
    }
})(function($, Spinner) {
    $.fn.spin = function(opts, color) {
        return this.each(function() {
            var $this = $(this), data = $this.data();
            if (data.spinner) {
                data.spinner.stop();
                delete data.spinner;
            }
            if (opts !== false) {
                opts = $.extend({
                    color: color || $this.css("color")
                }, $.fn.spin.presets[opts] || opts);
                data.spinner = new Spinner(opts).spin(this);
            }
        });
    };
    $.fn.spin.presets = {
        tiny: {
            lines: 8,
            length: 2,
            width: 2,
            radius: 3
        },
        small: {
            lines: 8,
            length: 4,
            width: 3,
            radius: 5
        },
        large: {
            lines: 10,
            length: 8,
            width: 4,
            radius: 8
        }
    };
});

(function() {
    function a(a) {
        this._value = a;
    }
    function b(a, b, c, d) {
        var e, f, g = Math.pow(10, b);
        return f = (c(a * g) / g).toFixed(b), d && (e = new RegExp("0{1," + d + "}$"), f = f.replace(e, "")), 
        f;
    }
    function c(a, b, c) {
        var d;
        return d = b.indexOf("$") > -1 ? e(a, b, c) : b.indexOf("%") > -1 ? f(a, b, c) : b.indexOf(":") > -1 ? g(a, b) : i(a._value, b, c);
    }
    function d(a, b) {
        var c, d, e, f, g, i = b, j = [ "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], k = !1;
        if (b.indexOf(":") > -1) a._value = h(b); else if (b === q) a._value = 0; else {
            for ("." !== o[p].delimiters.decimal && (b = b.replace(/\./g, "").replace(o[p].delimiters.decimal, ".")), 
            c = new RegExp("[^a-zA-Z]" + o[p].abbreviations.thousand + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), 
            d = new RegExp("[^a-zA-Z]" + o[p].abbreviations.million + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), 
            e = new RegExp("[^a-zA-Z]" + o[p].abbreviations.billion + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), 
            f = new RegExp("[^a-zA-Z]" + o[p].abbreviations.trillion + "(?:\\)|(\\" + o[p].currency.symbol + ")?(?:\\))?)?$"), 
            g = 0; g <= j.length && !(k = b.indexOf(j[g]) > -1 ? Math.pow(1024, g + 1) : !1); g++) ;
            a._value = (k ? k : 1) * (i.match(c) ? Math.pow(10, 3) : 1) * (i.match(d) ? Math.pow(10, 6) : 1) * (i.match(e) ? Math.pow(10, 9) : 1) * (i.match(f) ? Math.pow(10, 12) : 1) * (b.indexOf("%") > -1 ? .01 : 1) * ((b.split("-").length + Math.min(b.split("(").length - 1, b.split(")").length - 1)) % 2 ? 1 : -1) * Number(b.replace(/[^0-9\.]+/g, "")), 
            a._value = k ? Math.ceil(a._value) : a._value;
        }
        return a._value;
    }
    function e(a, b, c) {
        var d, e, f = b.indexOf("$"), g = b.indexOf("("), h = b.indexOf("-"), j = "";
        return b.indexOf(" $") > -1 ? (j = " ", b = b.replace(" $", "")) : b.indexOf("$ ") > -1 ? (j = " ", 
        b = b.replace("$ ", "")) : b = b.replace("$", ""), e = i(a._value, b, c), 1 >= f ? e.indexOf("(") > -1 || e.indexOf("-") > -1 ? (e = e.split(""), 
        d = 1, (g > f || h > f) && (d = 0), e.splice(d, 0, o[p].currency.symbol + j), e = e.join("")) : e = o[p].currency.symbol + j + e : e.indexOf(")") > -1 ? (e = e.split(""), 
        e.splice(-1, 0, j + o[p].currency.symbol), e = e.join("")) : e = e + j + o[p].currency.symbol, 
        e;
    }
    function f(a, b, c) {
        var d, e = "", f = 100 * a._value;
        return b.indexOf(" %") > -1 ? (e = " ", b = b.replace(" %", "")) : b = b.replace("%", ""), 
        d = i(f, b, c), d.indexOf(")") > -1 ? (d = d.split(""), d.splice(-1, 0, e + "%"), 
        d = d.join("")) : d = d + e + "%", d;
    }
    function g(a) {
        var b = Math.floor(a._value / 60 / 60), c = Math.floor((a._value - 60 * b * 60) / 60), d = Math.round(a._value - 60 * b * 60 - 60 * c);
        return b + ":" + (10 > c ? "0" + c : c) + ":" + (10 > d ? "0" + d : d);
    }
    function h(a) {
        var b = a.split(":"), c = 0;
        return 3 === b.length ? (c += 60 * Number(b[0]) * 60, c += 60 * Number(b[1]), c += Number(b[2])) : 2 === b.length && (c += 60 * Number(b[0]), 
        c += Number(b[1])), Number(c);
    }
    function i(a, c, d) {
        var e, f, g, h, i, j, k = !1, l = !1, m = !1, n = "", r = !1, s = !1, t = !1, u = !1, v = !1, w = "", x = "", y = Math.abs(a), z = [ "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], A = "", B = !1;
        if (0 === a && null !== q) return q;
        if (c.indexOf("(") > -1 ? (k = !0, c = c.slice(1, -1)) : c.indexOf("+") > -1 && (l = !0, 
        c = c.replace(/\+/g, "")), c.indexOf("a") > -1 && (r = c.indexOf("aK") >= 0, s = c.indexOf("aM") >= 0, 
        t = c.indexOf("aB") >= 0, u = c.indexOf("aT") >= 0, v = r || s || t || u, c.indexOf(" a") > -1 ? (n = " ", 
        c = c.replace(" a", "")) : c = c.replace("a", ""), y >= Math.pow(10, 12) && !v || u ? (n += o[p].abbreviations.trillion, 
        a /= Math.pow(10, 12)) : y < Math.pow(10, 12) && y >= Math.pow(10, 9) && !v || t ? (n += o[p].abbreviations.billion, 
        a /= Math.pow(10, 9)) : y < Math.pow(10, 9) && y >= Math.pow(10, 6) && !v || s ? (n += o[p].abbreviations.million, 
        a /= Math.pow(10, 6)) : (y < Math.pow(10, 6) && y >= Math.pow(10, 3) && !v || r) && (n += o[p].abbreviations.thousand, 
        a /= Math.pow(10, 3))), c.indexOf("b") > -1) for (c.indexOf(" b") > -1 ? (w = " ", 
        c = c.replace(" b", "")) : c = c.replace("b", ""), g = 0; g <= z.length; g++) if (e = Math.pow(1024, g), 
        f = Math.pow(1024, g + 1), a >= e && f > a) {
            w += z[g], e > 0 && (a /= e);
            break;
        }
        return c.indexOf("o") > -1 && (c.indexOf(" o") > -1 ? (x = " ", c = c.replace(" o", "")) : c = c.replace("o", ""), 
        x += o[p].ordinal(a)), c.indexOf("[.]") > -1 && (m = !0, c = c.replace("[.]", ".")), 
        h = a.toString().split(".")[0], i = c.split(".")[1], j = c.indexOf(","), i ? (i.indexOf("[") > -1 ? (i = i.replace("]", ""), 
        i = i.split("["), A = b(a, i[0].length + i[1].length, d, i[1].length)) : A = b(a, i.length, d), 
        h = A.split(".")[0], A = A.split(".")[1].length ? o[p].delimiters.decimal + A.split(".")[1] : "", 
        m && 0 === Number(A.slice(1)) && (A = "")) : h = b(a, null, d), h.indexOf("-") > -1 && (h = h.slice(1), 
        B = !0), j > -1 && (h = h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + o[p].delimiters.thousands)), 
        0 === c.indexOf(".") && (h = ""), (k && B ? "(" : "") + (!k && B ? "-" : "") + (!B && l ? "+" : "") + h + A + (x ? x : "") + (n ? n : "") + (w ? w : "") + (k && B ? ")" : "");
    }
    function j(a, b) {
        o[a] = b;
    }
    function k(a) {
        var b = a.toString().split(".");
        return b.length < 2 ? 1 : Math.pow(10, b[1].length);
    }
    function l() {
        var a = Array.prototype.slice.call(arguments);
        return a.reduce(function(a, b) {
            var c = k(a), d = k(b);
            return c > d ? c : d;
        }, -1 / 0);
    }
    var m, n = "1.5.3", o = {}, p = "en", q = null, r = "0,0", s = "undefined" != typeof module && module.exports;
    m = function(b) {
        return m.isNumeral(b) ? b = b.value() : 0 === b || "undefined" == typeof b ? b = 0 : Number(b) || (b = m.fn.unformat(b)), 
        new a(Number(b));
    }, m.version = n, m.isNumeral = function(b) {
        return b instanceof a;
    }, m.language = function(a, b) {
        if (!a) return p;
        if (a && !b) {
            if (!o[a]) throw new Error("Unknown language : " + a);
            p = a;
        }
        return (b || !o[a]) && j(a, b), m;
    }, m.languageData = function(a) {
        if (!a) return o[p];
        if (!o[a]) throw new Error("Unknown language : " + a);
        return o[a];
    }, m.language("en", {
        delimiters: {
            thousands: ",",
            decimal: "."
        },
        abbreviations: {
            thousand: "k",
            million: "m",
            billion: "b",
            trillion: "t"
        },
        ordinal: function(a) {
            var b = a % 10;
            return 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
        },
        currency: {
            symbol: "$"
        }
    }), m.zeroFormat = function(a) {
        q = "string" == typeof a ? a : null;
    }, m.defaultFormat = function(a) {
        r = "string" == typeof a ? a : "0.0";
    }, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function(a, b) {
        "use strict";
        if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if ("function" != typeof a) throw new TypeError(a + " is not a function");
        var c, d, e = this.length >>> 0, f = !1;
        for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c) this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], 
        f = !0));
        if (!f) throw new TypeError("Reduce of empty array with no initial value");
        return d;
    }), m.fn = a.prototype = {
        clone: function() {
            return m(this);
        },
        format: function(a, b) {
            return c(this, a ? a : r, void 0 !== b ? b : Math.round);
        },
        unformat: function(a) {
            return "[object Number]" === Object.prototype.toString.call(a) ? a : d(this, a ? a : r);
        },
        value: function() {
            return this._value;
        },
        valueOf: function() {
            return this._value;
        },
        set: function(a) {
            return this._value = Number(a), this;
        },
        add: function(a) {
            function b(a, b) {
                return a + c * b;
            }
            var c = l.call(null, this._value, a);
            return this._value = [ this._value, a ].reduce(b, 0) / c, this;
        },
        subtract: function(a) {
            function b(a, b) {
                return a - c * b;
            }
            var c = l.call(null, this._value, a);
            return this._value = [ a ].reduce(b, this._value * c) / c, this;
        },
        multiply: function(a) {
            function b(a, b) {
                var c = l(a, b);
                return a * c * b * c / (c * c);
            }
            return this._value = [ this._value, a ].reduce(b, 1), this;
        },
        divide: function(a) {
            function b(a, b) {
                var c = l(a, b);
                return a * c / (b * c);
            }
            return this._value = [ this._value, a ].reduce(b), this;
        },
        difference: function(a) {
            return Math.abs(m(this._value).subtract(a).value());
        }
    }, s && (module.exports = m), "undefined" == typeof ender && (this.numeral = m), 
    "function" == typeof define && define.amd && define([], function() {
        return m;
    });
}).call(this);

(function($, Handlebars) {
    if (typeof atmire === "undefined") {
        atmire = {};
    }
    if (typeof DSpace === "undefined") {
        DSpace = {};
    }
    if (typeof atmire.CUA === "undefined") {
        atmire.CUA = {};
    }
    atmire.CUA.getContextPath = function() {
        if (atmire.CUA.contextPath === undefined) {
            atmire.CUA.contextPath = $('[name="contextpath"]').val();
            if (atmire.CUA.contextPath === undefined) {
                atmire.CUA.contextPath = "" + atmire.contextPath;
            }
        }
        return atmire.CUA.contextPath;
    };
    registerHelpers();
    atmire.CUA.getTemplate = function(name) {
        if (DSpace.templates === undefined || DSpace.templates[name] === undefined) {
            if (!$.isFunction(Handlebars.compile)) {
                Handlebars = undefined;
                $.ajax({
                    url: atmire.CUA.getContextPath() + "/aspects/ReportingSuite/handlebars.min.js",
                    async: false,
                    dataType: "script",
                    success: function() {
                        atmire.Handlebars = window.Handlebars;
                        registerHelpers();
                        compileTemplate(name);
                    }
                });
            } else {
                compileTemplate(name);
            }
        }
        return Handlebars.template(DSpace.templates[name]);
    };
    function compileTemplate(name) {
        $.ajax({
            url: atmire.CUA.getContextPath() + "/aspects/ReportingSuite/templates/" + name + ".handlebars",
            async: false,
            dataType: "text",
            success: function(data) {
                if (DSpace.templates === undefined) {
                    DSpace.templates = {};
                }
                DSpace.templates[name] = Handlebars.compile(data);
            }
        });
    }
    function registerHelpers() {
        Handlebars.registerHelper("I18n", function(key) {
            if (typeof $(document).data("i18n") != "undefined" && key in $(document).data("i18n")) {
                return $(document).data("i18n")[key];
            } else {
                return key;
            }
        });
        Handlebars.registerHelper("addContextPath", function(str) {
            if (str.indexOf("/") == 0) {
                return atmire.CUA.getContextPath() + str;
            } else {
                return atmire.CUA.getContextPath() + "/" + str;
            }
        });
    }
})(jQuery, function() {
    if (window.atmire && window.atmire.Handlebars) {
        return window.atmire.Handlebars;
    }
    return Handlebars;
}());

this["DSpace"] = this["DSpace"] || {};

this["DSpace"]["templates"] = this["DSpace"]["templates"] || {};

this["DSpace"]["templates"]["statlet/notifications/loading"] = {
    compiler: [ 6, ">= 2.0.0-beta.1" ],
    main: function(depth0, helpers, partials, data) {
        return '<div class="col-xs-12 col-md-12 col-lg-12">\n    <div class="alert-statistic-loading"><div class="spinner-wrapper"></div><div class="alert-statistic-label">Loading statistics ...</div></div>\n</div>\n';
    },
    useData: true
};

this["DSpace"]["templates"]["statlet/initial_structure"] = {
    compiler: [ 6, ">= 2.0.0-beta.1" ],
    main: function(depth0, helpers, partials, data) {
        return '<div id="aspect_statistics_StatletTransformer_div_statswrapper" class="">\n    <div class="notifications row"></div>\n    <div class="widgets row"></div>\n</div>';
    },
    useData: true
};

$(document).ready(function() {
    combineURL = function(parts) {
        if (parts.length == 0) {
            return "";
        } else {
            var url = parts.join("/");
            url = url.replace(/:\//g, "://");
            url = url.replace(/([^:\s])\/+/g, "$1/");
            url = url.replace(/\/(\?|&|#[^!])/g, "$1");
            url = url.replace(/(\?.+)\?/g, "$1&");
            return url;
        }
    };
    atmire = atmire || {};
    var cua = atmire.CUA = atmire.CUA || {};
    var statletNS = atmire.CUA.statlet = atmire.CUA.statlet || {};
    if (typeof statletNS.constants === "undefined") {
        statletNS.constants = {};
    }
    statletNS.constants.viewports = {
        xs: 0,
        sm: 768,
        md: 992,
        lg: 1200
    };
    statletNS.spinnerOpts = {
        lines: 10,
        length: 0,
        width: 3,
        radius: 5,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: "#333333",
        speed: .5,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: "spinner",
        zIndex: 2e9,
        top: "auto",
        left: "auto"
    };
    statletNS.timeout = 3e4;
});

(function() {
    var hideLabel, showLabel, handle, statsWrapper, widgetWrapper, notificationWrapper, showStats, cua, statletNS, afterInitCallbacks, afterLoadCallbacks, toggleStatletsHook;
    atmire = atmire || {};
    cua = atmire.CUA = atmire.CUA || {};
    statletNS = atmire.CUA.statlet = atmire.CUA.statlet || {};
    afterInitCallbacks = atmire.CUA.statlet.afterInitCallbacks = atmire.CUA.statlet.afterInitCallbacks || [];
    afterLoadCallbacks = atmire.CUA.statlet.afterLoadCallbacks = atmire.CUA.statlet.afterLoadCallbacks || [];
    toggleStatletsHook = atmire.CUA.statlet.toggleStatletsHook = atmire.CUA.statlet.toggleStatletsHook || [];
    statletNS.initStatlet = function(additionLoader) {
        var i, fn;
        showStats = $("div#aspect_statistics_StatletTransformer_div_showStats .btn");
        hideLabel = $("#aspect_statistics_StatletTransformer_field_statlet-ms-hide").val();
        handle = $("#aspect_statistics_StatletTransformer_field_statlet-ajax-handle").val();
        showLabel = showStats.html();
        showStats.bind("click", function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            try {
                matchHeights(1e3);
            } catch (e) {}
            statsWrapper = $("div#aspect_statistics_StatletTransformer_div_statswrapper");
            var showStats = !statsWrapper.is(":visible");
            if (showStats) {
                $(this).html(hideLabel);
                if (statsWrapper.length === 0) {
                    var html = atmire.CUA.getTemplate("statlet/initial_structure")();
                    $(html).insertAfter($("div#aspect_statistics_StatletTransformer_div_showStats")).promise().done(function(element) {
                        statsWrapper = element;
                        notificationWrapper = $(".notifications", statsWrapper);
                        widgetWrapper = $(".widgets", statsWrapper);
                        startSpinner(notificationWrapper);
                        additionLoader(statletNS.loadStatlet);
                    });
                } else {
                    statsWrapper.fadeIn(333);
                }
            } else {
                statsWrapper.fadeOut(333);
                $(this).html(showLabel);
            }
            if (typeof toggleStatletsHook === "function") {
                toggleStatletsHook(showStats);
            }
            return false;
        });
        $("div#aspect_statistics_StatletTransformer_div_showStats img").bind("click", function() {
            $("div#aspect_statistics_StatletTransformer_div_showStats .btn").click();
            return false;
        });
        for (i = 0; i < afterInitCallbacks.length; i++) {
            fn = afterInitCallbacks[i];
            if (typeof fn === "function") {
                fn();
            }
        }
    };
    statletNS.loadStatlet = function(paramdata, timeout) {
        var html, statlet, isOutOfDate, isUserUpdateRequest, hasData;
        if (typeof timeout === "undefined") {
            timeout = statletNS.timeout;
        }
        if (typeof paramdata === "undefined") {
            paramdata = {};
            paramdata.handle = handle;
        }
        $.ajax({
            cache: false,
            url: statletNS.restEndpoint,
            type: "GET",
            dataType: "json",
            data: paramdata,
            timeout: timeout,
            success: function successFunction(json) {
                var i, fn;
                widgetWrapper.empty();
                isOutOfDate = false;
                isUserUpdateRequest = false;
                hasData = false;
                for (i = 0; i < json.length; i++) {
                    statlet = json[i];
                    statletNS.preProcess(statlet);
                    if (statlet.hasData) {
                        html = statletNS.template[statlet.type](statlet);
                        $(html).appendTo(widgetWrapper).promise().done(function(value) {
                            statletNS.postRender(statlet, value, function() {
                                var container = document.querySelector(".widgets");
                                window.msnry = new Masonry(container, {
                                    itemSelector: ".widget"
                                });
                            });
                        });
                        if (typeof statlet.outOfDate !== "undefined" && statlet.outOfDate) {
                            isOutOfDate = true;
                        }
                        if (typeof paramdata.forceupdate !== "undefined" && paramdata.forceupdate) {
                            isUserUpdateRequest = true;
                        }
                    }
                    hasData = statlet.hasData || hasData;
                }
                notificationWrapper.empty();
                if (isOutOfDate) {
                    html = atmire.CUA.getTemplate("statlet/notifications/outdated")();
                    notificationWrapper.html(html).promise().done(function() {
                        var spinnerWrapper = $(".spinner-wrapper", statsWrapper);
                        spinnerWrapper.spin(statletNS.spinnerOpts);
                        paramdata.forceupdate = true;
                        statletNS.loadStatlet(paramdata, 0);
                    });
                } else if (isUserUpdateRequest) {
                    html = atmire.CUA.getTemplate("statlet/notifications/updated")();
                    notificationWrapper.html(html).promise().done(function() {
                        setTimeout(function() {
                            notificationWrapper.slideUp();
                        }, 1e4);
                    });
                } else if (!hasData) {
                    html = atmire.CUA.getTemplate("statlet/notifications/no_data")();
                    notificationWrapper.html(html).promise().done(function() {});
                }
                for (i = 0; i < afterLoadCallbacks.length; i++) {
                    fn = afterLoadCallbacks[i];
                    if (typeof fn === "function") {
                        fn(true, paramdata, json, successFunction);
                    }
                }
            },
            error: function(x, t, m) {
                var i, fn;
                if (t === "timeout") {
                    notificationWrapper.empty();
                    html = atmire.CUA.getTemplate("statlet/notifications/error")();
                    notificationWrapper.html(html).promise().done(function() {
                        $("a.retry", notificationWrapper).bind("click", function(e) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            notificationWrapper.empty();
                            startSpinner(notificationWrapper);
                            statletNS.loadStatlet();
                        });
                    });
                } else {
                    var data = $("<p>" + $("#aspect_statistics_StatletTransformer_field_statlet-ms-ajax-error").val() + "</p>");
                    statsWrapper.html(data);
                }
                statsWrapper.css("height", "");
                for (i = 0; i < afterLoadCallbacks.length; i++) {
                    fn = afterLoadCallbacks[i];
                    if (typeof fn === "function") {
                        fn(false, paramdata);
                    }
                }
            }
        });
    };
    function startSpinner(elem) {
        elem.html(atmire.CUA.getTemplate("statlet/notifications/loading")()).promise().done(function() {
            $(".alert-statistic-loading .spinner-wrapper").spin(statletNS.spinnerOpts);
        });
    }
})();

(function() {
    atmire = atmire || {};
    var cua = atmire.CUA = atmire.CUA || {};
    var statletNS = atmire.CUA.statlet = atmire.CUA.statlet || {};
    var maxRequests = 3;
    var dsos = [];
    statletNS.initEmbeddedWidgets = function(additionLoader) {
        var load = false;
        $(".embed-cua-widget").each(function(index) {
            var type = $(this).data("dso-type");
            var id = $(this).data("dso-id");
            var priority = parseInt($(this).data("priority")) || 10;
            var data = dsos[priority];
            if (!data) {
                data = dsos[priority] = {};
            }
            var dso = data[type + ":" + id];
            if (!dso) {
                dso = data[type + ":" + id] = {
                    dsotype: type,
                    dsoid: id,
                    ids: []
                };
            }
            dso.ids.push($(this).data("widget-id"));
            load = true;
        });
        if (load) {
            additionLoader(init);
        }
    };
    function init(priority) {
        if (typeof priority === "undefined") {
            priority = 0;
        }
        if (priority < dsos.length) {
            if (typeof dsos[priority] === "undefined") {
                init(++priority);
            } else {
                startPriority(priority, function() {
                    init(priority + 1);
                });
            }
        }
    }
    function startPriority(priority, callback) {
        var priority_data = dsos[priority];
        var data = [];
        for (var dso in priority_data) {
            if (priority_data.hasOwnProperty(dso)) {
                data.push(priority_data[dso]);
            }
        }
        indexPriority(data, 0, callback);
    }
    function indexPriority(prioritydata, index, callback, requestdata) {
        if (typeof requestdata === "undefined") {
            requestdata = [];
        }
        var partialrequestnb = Math.min(prioritydata.length - index, maxRequests);
        var done = 0;
        for (var j = 0; j < maxRequests && index < prioritydata.length; j++) {
            var data = prioritydata[index];
            request(data, function(json) {
                requestdata.push({
                    json: json,
                    data: data
                });
                done++;
                if (requestdata.length == prioritydata.length) {
                    for (var i = 0; i < requestdata.length; i++) {
                        render(requestdata[i].json, requestdata[i].data);
                    }
                    if (typeof callback !== "undefined") {
                        callback();
                    }
                } else if (done == partialrequestnb) {
                    if (prioritydata.length > index) {
                        indexPriority(prioritydata, index, callback, requestdata);
                    }
                }
            });
            index++;
        }
    }
    function render(json, data) {
        for (var i = 0; i < json.length; i++) {
            var statlet = json[i];
            var wrapper = $('.embed-cua-widget[data-widget-id="' + statlet.id + '"][data-dso-id="' + statlet.variables.id + '"][data-dso-type="' + statlet.variables.type + '"]');
            if (wrapper.length) {
                statletNS.preProcess(statlet);
                var html = statletNS.template[statlet.type](statlet);
                wrapper.html(html).promise().done(function(value) {
                    statletNS.postRender(statlet, value, function() {});
                });
                if (typeof statlet.outOfDate !== "undefined" && statlet.outOfDate) {
                    if (data) {
                        data.forceupdate = true;
                        request(data, render);
                    }
                }
            }
        }
    }
    function request(data, callback) {
        $.ajax({
            cache: false,
            url: statletNS.restEndpoint,
            type: "GET",
            dataType: "json",
            data: data,
            timeout: statletNS.timeout,
            success: function(json) {
                callback(json);
            },
            error: function(x, t, m) {}
        });
    }
})();

(function() {
    atmire = atmire || {};
    var cua = atmire.CUA = atmire.CUA || {};
    var statletNS = atmire.CUA.statlet = atmire.CUA.statlet || {};
    var afterLoadAdditionsCallbacks = atmire.CUA.statlet.afterLoadAdditionsCallbacks = atmire.CUA.statlet.afterLoadAdditionsCallbacks || [];
    var configLoaded, additionsLoaded = false;
    $(document).ready(function() {
        $.getJSON(cua.getContextPath() + "/JSON/cua/i18n", undefined, function(json) {
            var i18n = {};
            $.extend(i18n, $(document).data("i18n"), json);
            $(document).data("i18n", i18n);
            statletNS.initStatlet(loadConfig);
            statletNS.initEmbeddedWidgets(loadConfig);
        });
    });
    jQuery.cachedScript = function(url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax(options);
    };
    function loadConfig(callback) {
        if (!configLoaded) {
            $.when($.getScript(cua.getContextPath() + "/cua/config.js"), $.Deferred(function(deferred) {
                $(deferred.resolve);
            })).done(function() {
                configLoaded = true;
                statletNS.restEndpoint = combineURL([ window.atmire.rest.host, window.atmire.rest.namespace, "statlets" ]);
                loadAdditions(callback);
            });
        } else {
            loadAdditions(callback());
        }
    }
    function loadAdditions(callback) {
        if (!additionsLoaded) {
            $.when(loadLanguageFile(), $.cachedScript(cua.getContextPath() + "/aspects/ReportingSuite/scripts/statlet_addons.js"), $.Deferred(function(deferred) {
                $(deferred.resolve);
            })).done(function() {
                additionsLoaded = true;
                var fn, i;
                for (i = 0; i < afterLoadAdditionsCallbacks.length; i++) {
                    fn = afterLoadAdditionsCallbacks[i];
                    if (typeof fn === "function") {
                        fn();
                    }
                }
                callback();
            });
        } else {
            callback();
        }
    }
    function loadLanguageFile() {
        if (numeral.language() != window.atmire.locale) {
            $.getScript(cua.getContextPath() + "/cua/language/" + window.atmire.locale);
        }
    }
    Modernizr.addTest("firefox", function() {
        return !!navigator.userAgent.match(/firefox/i);
    });
})();