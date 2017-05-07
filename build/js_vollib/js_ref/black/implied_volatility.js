(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var binary_flag, black, brent;

    function ImpliedVolatility() {}

    black = js_vollib.js_ref.black.black;

    brent = js_vollib.helpers.brent;

    binary_flag = js_vollib.helpers.binary_flag;

    ImpliedVolatility.implied_volatility = function(price, F, K, r, t, flag) {
      var f, result;
      f = function(sigma) {
        return price - black(flag, F, K, t, r, sigma);
      };
      result = brent(f);
      if (!result) {
        return js_vollib.helpers.validate_price(price, F, K, binary_flag[flag]);
      } else {
        return result;
      }
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black.implied_volatility = ImpliedVolatility;

}).call(this);
