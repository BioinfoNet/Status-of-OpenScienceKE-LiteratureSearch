/**
 * Created by Anas Imam on 4/11/2017.
 */
window._colwizStylesPath_ = {
    "webpdf/button-chrome.css": "webpdf/button-chrome.de7b064afb13296f5741293880cad5b5.css",
    "webpdf/button-web.css": "webpdf/button-web.de7b064afb13296f5741293880cad5b5.css",
    "webpdf/csl.css": "webpdf/csl.f117b091ee15971a6ab3b9bf5b45a05b.css",
    "webpdf/popup-chrome.css": "webpdf/popup-chrome.022eb6f4ddb7246effd146251275e9a1.css",
    "webpdf/reader-chrome.css": "webpdf/reader-chrome.925eb7fcacaec1fc3e971e64ced160c6.css",
    "webpdf/reader-desktop.css": "webpdf/reader-desktop.925eb7fcacaec1fc3e971e64ced160c6.css",
    "webpdf/reader-web.css": "webpdf/reader-web.925eb7fcacaec1fc3e971e64ced160c6.css"
};
// tslint:disable-next-line:no-var-keyword
var CwZ, CwH;
var CWParser;
// tslint:disable-next-line:no-var-keyword
var CWPDFReaderConfig;
// tslint:disable-next-line:no-var-keyword
var Handlebars;
var define;
var cPDF_Class = /** @class */ (function () {
    function cPDF_Class() {
        this.initErrors = [];
        this.domain = 'app.wizdom.ai';
        this.staticDomainURL = 'app.wizdom.ai/static';
        this.assetsDomainURL = 'app.wizdom.ai/assets';
        this.version = '2.14.0702';
        this.initialized = false;
        this.js = [
            'js/webpdf/extension/all_pubsol.js',
            'js/webpdf/lib/initials-avatar.js',
            'js/webpdf/lib/FileSaver.js',
            'js/webpdf/lib/citation.converter.js',
            'js/webpdf/lib/cwcsl.js',
            'js/webpdf/lib/citeproc.js'
        ];
        this.init();
    }
    cPDF_Class.prototype.init = function () {
        try {
            var bHTML5Support = this.supports_canvas_text();
            var isMobile = this.check_mobile_browser();
            var isIE10 = this.check_for_ie();
            if (publisher && publisher['readerOptions']['mobileModeEnable']) {
                isMobile = false;
            }
            if (bHTML5Support && !isMobile && isIE10) {
                var appID = colwizOptions.appId;
                this.loadJs(0);
                this.addCSS('css/' + window['_colwizStylesPath_']['webpdf/button-web.css']);
            }
        }
        catch (e) {
            this.initErrors.push(e);
        }
    };
    cPDF_Class.prototype.loadJs = function (ind) {
        // tslint:disable-next-line:no-var-keyword
        var Config = Config || {};
        try {
            if (ind < this.js.length) {
                if (this.js[ind] === 'js/webpdf/main/00_config.js' && typeof Config.isBmkLoaded === 'undefined') {
                    if (typeof (CWPDFReaderConfig) === 'undefined') {
                        var file = this.js[ind] + '?v=' + this.version;
                        var _this_1 = this;
                        this.addScript(file, function () {
                            _this_1.loadJs(ind + 1);
                        });
                    }
                    else {
                        this.loadJs(ind + 1);
                    }
                }
                else if (this.js[ind] === 'js/extraction/parsers.js') {
                    if (typeof (CWParser) === 'undefined') {
                        var file = this.js[ind] + '?v=' + this.version;
                        var _this_2 = this;
                        this.addScript(file, function () {
                            _this_2.loadJs(ind + 1);
                        });
                    }
                    else {
                        this.loadJs(ind + 1);
                    }
                }
                else if (this.js[ind] === 'js/webpdf/lib/handlebars.runtime.js') {
                    var tempDefine_1;
                    if (typeof define === 'function' && define.amd) {
                        tempDefine_1 = define;
                        define = {};
                    }
                    var file = this.js[ind] + '?v=' + this.version;
                    var _this_3 = this;
                    this.addScript(file, function () {
                        try {
                            CwH = Handlebars; // Assign the Handlebars instance to custom variable
                            Handlebars.noConflict(); // Removes this Handlebars instance from the global space
                            if (tempDefine_1) {
                                define = tempDefine_1;
                            }
                        }
                        catch (ex) {
                            // console.log(ex);
                        }
                        _this_3.loadJs(ind + 1);
                    });
                }
                else {
                    var file = this.js[ind] + '?v=' + this.version;
                    var _this_4 = this;
                    this.addScript(file, function () {
                        _this_4.loadJs(ind + 1);
                    });
                }
            }
        }
        catch (e) {
            this.initErrors.push(e);
        }
    };
    cPDF_Class.prototype.addScript = function (path, callback) {
        try {
            var sc = document.createElement('script');
            var s = document.getElementsByTagName('script')[0];
            if (callback) {
                sc.onload = callback;
            }
            sc.type = 'text/javascript';
            var domain = this.staticDomainURL;
            if (domain.indexOf('http') >= 0) {
                sc.src = domain + '/' + path;
            }
            else {
                sc.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + domain + '/' + path;
            }
            // s.parentNode.insertBefore(sc, s.nextSibling);
            s.parentNode.appendChild(sc);
        }
        catch (e) {
            this.initErrors.push(e);
        }
    };
    cPDF_Class.prototype.addCSS = function (path) {
        try {
            var sc = document.createElement('link'), s = document.getElementsByTagName('head')[0];
            var filename = void 0;
            if (this.assetsDomainURL.indexOf('http') >= 0) {
                filename = this.assetsDomainURL + '/' + path;
            }
            else {
                filename = ('https:' === document.location.protocol ? 'https://' : 'http://') + this.assetsDomainURL + '/' + path;
            }
            sc.setAttribute('rel', 'stylesheet');
            sc.setAttribute('type', 'text/css');
            sc.setAttribute('href', filename);
            s.appendChild(sc);
        }
        catch (e) {
            this.initErrors.push(e);
        }
    };
    cPDF_Class.prototype.supports_canvas = function () {
        return !!document.createElement('canvas').getContext;
    };
    cPDF_Class.prototype.supports_canvas_text = function () {
        if (!this.supports_canvas()) {
            return false;
        }
        var dummyCanvas = document.createElement('canvas');
        var context = dummyCanvas.getContext('2d');
        return typeof context.fillText === 'function';
    };
    cPDF_Class.prototype.check_mobile_browser = function () {
        var isMobile = false;
        var a = navigator['userAgent'] || navigator['vendor'] || window['opera'];
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            isMobile = true;
        }
        return isMobile;
    };
    cPDF_Class.prototype.check_for_ie = function () {
        var a = navigator.userAgent;
        if (a.indexOf('MSIE') < 0) {
            return true;
        }
        else if (a.indexOf('MSIE 10') >= 0) {
            return true;
        }
        return false;
    };
    return cPDF_Class;
}());
var cPDF = new cPDF_Class();

//# sourceMappingURL=ireader.js.map
