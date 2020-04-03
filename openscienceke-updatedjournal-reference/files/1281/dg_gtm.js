DG_GTM = { 
	enabled: false,
	called: false,
	runThis: [],
	enable: function(reg, subject, pageType, ct, page, lang, ci, pub) {
		if(DG_GTM.called) {
			return; // prevent this from being executed twice... because for some reason we are adding the ads to the page multiple times
		}
		DG_GTM.called = true;
		var targeting = function() {
			var gt = function(key, value) {
				if(value != "") {
					if(console && console.log) { 
						console.log("Setting target for pubads: ", key, value);
					}
					googletag.pubads().setTargeting(key, value)
				}
			}
			gt("reg", reg);
			gt("Subject", subject);
			gt("PageType", pageType);
			gt("ct", ct);
			gt("Page", page);
			gt("lang", lang);
			gt("ci", ci);
			gt("Publisher", pub);
		};
		DG_GTM.pollApi(function() {
			var gt = googletag, 
				gpa = gt.pubads(),
				g = function(name, index, size) {
					gt.cmd.push(function() {
						var id = 'div-gpt-ad-1330474464430-' + index;
						gt.defineSlot('/17457055/'+name, (size ? size : [180, 610]), id).addService(gpa);
					});
				},
				rechts = function(ri, i) {
					g('Rechts_' + ri + '_all_pages', i)
				};
			
			g('BetaLeaderboard-AllPages', 0, [728, 90]);
			rechts(10, 1); rechts(11, 2); rechts(12, 3);
			//g('Rechts_1_all_pages', 4) through g('Rechts_9_all_pages', 12)
			for(var i = 1; i <= 9; i++) {
				rechts(i, i + 3);
			}
		
			gpa.enableAsyncRendering();
			targeting();
			gpa.enableSingleRequest();
			gpa.collapseEmptyDivs();
			gt.enableServices();
		});
	}, 
	// will run once the API is ready... googletag.apiReady
	pollApi: function(codeToRun) {
		$(function() {
			var attemptsRemaining = 10,
			attempt = function() {
				var w = window, gt = w.googletag;
				attemptsRemaining--;
				if(console && console.log && gt) { 
					console.log(gt, gt.apiReady)
				}
				if (gt && gt.apiReady) {
					if(console && console.log) { 
						console.log("Googletag api ready");
					}
					codeToRun();
					DG_GTM.pollEnabled();
					return;
				} else if(attemptsRemaining != 0) {
					setTimeout(attempt, 500);
				} else if(console && console.log) { 
					console.log("Waited for googletag for 5 seconds, giving up");
				}
			}
			setTimeout(attempt, 500);
		})();
	},
	// will run once the pubad services are ready... googletag.pubadsReady
	pollEnabled: function() {
		$(function() {
			var attemptsRemaining = 20,
			attempt = function() {
				var w = window, gt = w.googletag, ready = gt.pubadsReady;
				attemptsRemaining--;
				if (ready) {
					if(console && console.log) { 
						console.log("Googletag pubads ready");
					}
					var codeToRun = DG_GTM.runThis;
					while(codeToRun.length > 0) {
						var method = codeToRun.shift()
						if(console && console.log) { 
							console.log("Pushing googletag code: ", method);
						}
						gt.cmd.push(method);
					}
					DG_GTM.enabled = true;
				} else if (attemptsRemaining != 0) {
					setTimeout(attempt, 200);
				} else if(console && console.log) { 
					console.log("Waited for googletag pubad services for for the allotted time");
				}
			}
			setTimeout(attempt, 200);
		})();
	},
	
	wait: function(codeToRun) {
		if (DG_GTM.enabled) {
			var w = window, gt = w.googletag;
			if(console && console.log) { 
				console.log("Pushing googletag code: ", codeToRun);
			}
			gt.cmd.push(codeToRun);
			return;
		} else {
			if(console && console.log) { 
				console.log("Queing googletag code: ", codeToRun);
			}
			DG_GTM.runThis.push(codeToRun);
		}
	},
	
	display: function() {
		DG_GTM.wait(function() {
			var $ = jQuery;
			$("div[id^='div-gpt-ad-1330474464430-']").each(function() {
				googletag.display($(this).attr('id'));
			});
		});
	}
};

(function($) {
	$(DG_GTM.display); // run once the DOM is ready
})
(jQuery);
