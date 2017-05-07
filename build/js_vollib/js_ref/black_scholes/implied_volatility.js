(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var binary_flag, black_scholes, brent;

    function ImpliedVolatility() {}

    black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    brent = js_vollib.helpers.brent;

    binary_flag = js_vollib.helpers.binary_flag;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, flag) {
      var F, f, result;
      f = function(sigma) {
        return price - black_scholes(flag, S, K, t, r, sigma);
      };
      result = brent(f);
      if (!result) {
        F = S * Math.exp(r * t);
        return js_vollib.helpers.validate_price(price, F, K, binary_flag[flag]);
      } else {
        return result;
      }
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black_scholes.implied_volatility = ImpliedVolatility;

}).call(this);
