(function() {
  var PriceIsAboveMaximum, PriceIsBelowIntrinsic;

  PriceIsAboveMaximum = (function() {
    function PriceIsAboveMaximum() {
      this.name = this.constructor.name;
      this.stack = (new Error).stack;
    }

    PriceIsAboveMaximum.prototype = new Error;

    PriceIsAboveMaximum.prototype.constructor = PriceIsAboveMaximum;

    return PriceIsAboveMaximum;

  })();

  PriceIsBelowIntrinsic = (function() {
    function PriceIsBelowIntrinsic() {
      this.name = this.constructor.name;
      this.stack = (new Error).stack;
    }

    PriceIsBelowIntrinsic.prototype = new Error;

    PriceIsBelowIntrinsic.prototype.constructor = PriceIsBelowIntrinsic;

    return PriceIsBelowIntrinsic;

  })();

  js_vollib.helpers.exceptions = {};

  js_vollib.helpers.exceptions.PriceIsAboveMaximum = PriceIsAboveMaximum;

  js_vollib.helpers.exceptions.PriceIsBelowIntrinsic = PriceIsBelowIntrinsic;

}).call(this);
