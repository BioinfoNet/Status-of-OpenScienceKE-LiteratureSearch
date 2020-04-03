/**
 * Minified by jsDelivr using UglifyJS v3.4.4.
 * Original file: /npm/get-root-node-polyfill@1.0.0/index.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";function getRootNode(o){return"object"==typeof o&&Boolean(o.composed)?getShadowIncludingRoot(this):getRoot(this)}function getShadowIncludingRoot(o){var t=getRoot(o);return isShadowRoot(t)?getShadowIncludingRoot(t.host):t}function getRoot(o){return null!=o.parentNode?getRoot(o.parentNode):o}function isShadowRoot(o){return"#document-fragment"===o.nodeName&&"ShadowRoot"===o.constructor.name}"object"==typeof module&&module.exports&&(module.exports=getRootNode);
//# sourceMappingURL=/sm/09cbe7d646232945026a6c1aaac1d97bd71b634baedc10a05501b2e1e07e619e.map