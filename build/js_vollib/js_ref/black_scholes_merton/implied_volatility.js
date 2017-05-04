(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var black_scholes_merton, brent;

    function ImpliedVolatility() {}

    black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    brent = js_vollib.helpers.brent;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, q, flag) {
      var f;
      f = function(sigma) {
        return price - black_scholes_merton(flag, S, K, t, r, sigma, q);
      };
      return brent(f);
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black_scholes_merton.implied_volatility = ImpliedVolatility;

}).call(this);
