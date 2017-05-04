(function() {
  var Numerical;

  Numerical = (function() {
    var black_scholes_merton, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    f = function(flag, S, K, t, r, sigma, b) {
      return black_scholes_merton(flag, S, K, t, r, sigma, r - b);
    };

    Numerical.delta = function(flag, S, K, t, r, sigma, q) {
      var b;
      b = r - q;
      return numerical.delta(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.theta = function(flag, S, K, t, r, sigma, q) {
      var b;
      b = r - q;
      return numerical.theta(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.vega = function(flag, S, K, t, r, sigma, q) {
      var b;
      b = r - q;
      return numerical.vega(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.rho = function(flag, S, K, t, r, sigma, q) {
      var b;
      b = r - q;
      return numerical.rho(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.gamma = function(flag, S, K, t, r, sigma, q) {
      var b;
      b = r - q;
      return numerical.gamma(flag, S, K, t, r, sigma, b, f);
    };

    return Numerical;

  })();

  js_vollib.js_ref.black_scholes_merton.greeks.numerical = Numerical;

}).call(this);
