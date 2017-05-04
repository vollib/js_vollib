(function() {
  var BlackScholes;

  BlackScholes = (function() {
    var undiscounted_black;

    function BlackScholes() {}

    undiscounted_black = js_vollib.black.undiscounted_black;

    BlackScholes.black_scholes = function(flag, S, K, t, r, sigma) {
      var F, deflater;
      deflater = Math.exp(-r * t);
      F = S / deflater;
      return undiscounted_black(F, K, sigma, t, flag) * deflater;
    };

    return BlackScholes;

  })();

  js_vollib.black_scholes = BlackScholes;

}).call(this);
