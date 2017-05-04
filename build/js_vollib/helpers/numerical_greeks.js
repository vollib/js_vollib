(function() {
  var NumericalGreeks;

  NumericalGreeks = (function() {
    var dS;

    function NumericalGreeks() {}

    dS = 0.01;

    NumericalGreeks.delta = function(flag, S, K, t, r, sigma, b, pricing_function) {
      if (t === 0.0) {
        if (S === K) {
          return {
            'c': 0.5,
            'p': -0.5
          }[flag];
        } else if (S > K) {
          return {
            'c': 1.0,
            'p': 0.0
          }[flag];
        } else {
          return {
            'c': 0.0,
            'p': -1.0
          }[flag];
        }
      } else {
        return (pricing_function(flag, S + dS, K, t, r, sigma, b) - pricing_function(flag, S - dS, K, t, r, sigma, b)) / (2 * dS);
      }
    };

    NumericalGreeks.theta = function(flag, S, K, t, r, sigma, b, pricing_function) {
      if (t <= 1.0 / 365.0) {
        return pricing_function(flag, S, K, 0.00001, r, sigma, b) - pricing_function(flag, S, K, t, r, sigma, b);
      } else {
        return pricing_function(flag, S, K, t - 1.0 / 365.0, r, sigma, b) - pricing_function(flag, S, K, t, r, sigma, b);
      }
    };

    NumericalGreeks.vega = function(flag, S, K, t, r, sigma, b, pricing_function) {
      return (pricing_function(flag, S, K, t, r, sigma + 0.01, b) - pricing_function(flag, S, K, t, r, sigma - 0.01, b)) / 2.0;
    };

    NumericalGreeks.rho = function(flag, S, K, t, r, sigma, b, pricing_function) {
      return (pricing_function(flag, S, K, t, r + 0.01, sigma, b + 0.01) - pricing_function(flag, S, K, t, r - 0.01, sigma, b - 0.01)) / 2.0;
    };

    NumericalGreeks.gamma = function(flag, S, K, t, r, sigma, b, pricing_function) {
      var ref;
      if (t === 0) {
        if ((ref = S === K) != null ? ref : {
          Infinity: 0.0
        }) {
          return;
        }
      }
      return (pricing_function(flag, S + dS, K, t, r, sigma, b) - 2.0 * pricing_function(flag, S, K, t, r, sigma, b) + pricing_function(flag, S - dS, K, t, r, sigma, b)) / Math.pow(dS, 2.0);
    };

    return NumericalGreeks;

  })();

  js_vollib.helpers.numerical_greeks = NumericalGreeks;

}).call(this);
