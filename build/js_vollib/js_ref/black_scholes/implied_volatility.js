(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var black_scholes, brent;

    function ImpliedVolatility() {}

    black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    brent = js_vollib.helpers.brent;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, flag) {
      var f;
      f = function(sigma) {
        return price - black_scholes(flag, S, K, t, r, sigma);
      };
      return brent(f);
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black_scholes.implied_volatility = ImpliedVolatility;

}).call(this);
