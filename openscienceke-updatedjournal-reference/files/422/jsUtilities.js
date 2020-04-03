 /*------------------------------------------------------------------------------
    Excerpts from the jsUtilities Library
    Version:        2.1
    Homepage:       http://www.easy-designs.net/code/jsUtilities/
    License:        Creative Commons Attribution-ShareAlike 2.0 License
                    http://creativecommons.org/licenses/by-sa/2.0/
    Note:           If you change or improve on this script, please let us know.
    ------------------------------------------------------------------------------*/
    if(Array.prototype.push == null) {
      Array.prototype.push = function(item) {
        this[this.length] = item;
        return this.length;
      };
    };
    // ---------------------------------------------------------------------
    //                  function.apply (if unsupported)
    //           Courtesy of Aaron Boodman - http://youngpup.net
    // ---------------------------------------------------------------------
    if (!Function.prototype.apply) {
      Function.prototype.apply = function(oScope, args) {
        var sarg = [];
        var rtrn, call;
        if (!oScope) oScope = window;
        if (!args) args = [];
        for (var i = 0; i < args.length; i++) {
          sarg[i] = "args["+i+"]";
        };
        call = "oScope.__applyTemp__(" + sarg.join(",") + ");";
        oScope.__applyTemp__ = this;
        rtrn = eval(call);
        oScope.__applyTemp__ = null;
    	return rtrn;
      };
    };
    function inArray(needle) {
      for (var i=0; i < this.length; i++) {
        if (this[i] === needle) {
          return i;
        }
      }
      return false;
    }
    function addClass(theClass) {
      if (this.className != '') {
        this.className += ' ' + theClass;
      } else {
        this.className = theClass;
      }
    }
    function lastChildContainingText() {
      var testChild = this.lastChild;
      var contentCntnr = ['p','li','dd'];
      while (testChild.nodeType != 1) {
        testChild = testChild.previousSibling;
      } 
      var tag = testChild.tagName.toLowerCase();
      var tagInArr = inArray.apply(contentCntnr, [tag]);
      if (!tagInArr && tagInArr!==0) {
        testChild = lastChildContainingText.apply(testChild);
      }
      return testChild;
    }