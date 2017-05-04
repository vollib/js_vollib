(function() {
  var BlackScholesMerton;

  BlackScholesMerton = (function() {
    var binary_flag, black;

    function BlackScholesMerton() {}

    black = js_lets_be_rational.black;

    binary_flag = js_vollib.helpers.binary_flag;

    BlackScholesMerton.black_scholes_merton = function(flag, S, K, t, r, sigma, q) {
      var F, deflater;
      F = S * Math.exp((r - q) * t);
      deflater = Math.exp(-r * t);
      return black(F, K, sigma, t, binary_flag[flag]) * deflater;
    };

    return BlackScholesMerton;

  })();

  js_vollib.black_scholes_merton = BlackScholesMerton;

}).call(this);
