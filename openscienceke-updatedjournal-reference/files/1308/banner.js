var bannerIframe;

var iframeOnLoad = function() {
    function displayBanner(eventData) {
        var removeListeners = function() {
            window.removeEventListener("message", displayBanner);
            document.removeEventListener("DOMContentLoaded",  bannerCallback);

            if('remove' in Element.prototype) {
                bannerIframe.remove();
            }
            else {
                document.body.removeChild(bannerIframe);
            }

            bannerIframe = null;
        };

        if(eventData.origin === "https://static.ithaka.org") {
            try {
                if (eventData.data.showBanner) {
                    var parser = new DOMParser(),
                        bannerDocument = parser.parseFromString(eventData.data.bannerHTML, "text/html"),
                        closeButton = bannerDocument.getElementById("cookieBannerClose"),
                        bannerContents = bannerDocument.body.childNodes[0],
                        closeListener = function(event) {
                            event.preventDefault();

                            if ('remove' in Element.prototype) {
                                bannerContents.remove();
                            }
                            else { // IE and Mobile Safari
                                document.body.removeChild(bannerContents);
                            }

                            closeButton.removeEventListener("click", closeListener);
                            bannerIframe.contentWindow.postMessage({status: "closedBanner"}, "https://static.ithaka.org");
                        };

                    console.log("inserting banner");
                    document.body.insertBefore(bannerContents, document.body.firstChild);
                    closeButton.addEventListener("click", closeListener);
                }
                else {
                    removeListeners();
                }
            } catch (error) {
                console.error(error);
                removeListeners();
            }
        }
    }

    window.addEventListener("message", displayBanner);
    bannerIframe.contentWindow.postMessage({status: "checkBanner"}, "https://static.ithaka.org");
    bannerIframe.removeEventListener("load", iframeOnLoad)
};

var bannerCallback = function() {
    bannerIframe = document.createElement("iframe");

    bannerIframe.src = "https://static.ithaka.org/gdpr-banner/cookie-notification.html";
    bannerIframe.id = "cookieBannerDisplay";
    bannerIframe.height = bannerIframe.width = 0;
    bannerIframe.style.display = "none";
    bannerIframe.addEventListener("load", iframeOnLoad);
    document.body.appendChild(bannerIframe);
};

document.addEventListener("DOMContentLoaded",  bannerCallback);
