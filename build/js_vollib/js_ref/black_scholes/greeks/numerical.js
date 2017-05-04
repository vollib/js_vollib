(function() {
  var Numerical;

  Numerical = (function() {
    var black_scholes, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    f = function(flag, S, K, t, r, sigma, b) {
      return black_scholes(flag, S, K, t, r, sigma);
    };

    Numerical.delta = function(flag, S, K, t, r, sigma) {
      var b;
      b = r;
      return numerical.delta(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.theta = function(flag, S, K, t, r, sigma) {
      var b;
      b = r;
      return numerical.theta(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.vega = function(flag, S, K, t, r, sigma) {
      var b;
      b = r;
      return numerical.vega(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.rho = function(flag, S, K, t, r, sigma) {
      var b;
      b = r;
      return numerical.rho(flag, S, K, t, r, sigma, b, f);
    };

    Numerical.gamma = function(flag, S, K, t, r, sigma) {
      var b;
      b = r;
      return numerical.gamma(flag, S, K, t, r, sigma, b, f);
    };

    return Numerical;

  })();

  js_vollib.js_ref.black_scholes.greeks.numerical = Numerical;

}).call(this);
