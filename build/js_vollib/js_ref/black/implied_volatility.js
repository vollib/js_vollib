(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var black, brent;

    function ImpliedVolatility() {}

    black = js_vollib.js_ref.black.black;

    brent = js_vollib.helpers.brent;

    ImpliedVolatility.implied_volatility = function(price, F, K, r, t, flag) {
      var f;
      f = function(sigma) {
        return price - black(flag, F, K, t, r, sigma);
      };
      return brent(f);
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black.implied_volatility = ImpliedVolatility;

}).call(this);
