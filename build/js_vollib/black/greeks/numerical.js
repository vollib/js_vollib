(function() {
  var Numerical;

  Numerical = (function() {
    var black, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black = js_vollib.black.black;

    f = function(flag, F, K, t, r, sigma, b) {
      return black(flag, F, K, t, r, sigma);
    };

    Numerical.delta = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.delta(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.theta = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.theta(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.vega = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.vega(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.rho = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.rho(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.gamma = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.gamma(flag, F, K, t, r, sigma, b, f);
    };

    return Numerical;

  })();

  js_vollib.black.greeks.numerical = Numerical;

}).call(this);
