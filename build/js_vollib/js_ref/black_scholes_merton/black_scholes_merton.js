(function() {
  var BlackScholesMerton;

  BlackScholesMerton = (function() {
    var N;

    function BlackScholesMerton() {}

    N = js_vollib.helpers.norm_cdf;

    BlackScholesMerton.d1 = function(S, K, t, r, sigma, q) {
      var denominator, numerator;
      numerator = Math.log(S / K) + ((r - q) + sigma * sigma / 2.0) * t;
      denominator = sigma * Math.sqrt(t);
      return numerator / denominator;
    };

    BlackScholesMerton.d2 = function(S, K, t, r, sigma, q) {
      return BlackScholesMerton.d1(S, K, t, r, sigma, q) - sigma * Math.sqrt(t);
    };

    BlackScholesMerton.bsm_call = function(S, K, t, r, sigma, q) {
      var D1, D2;
      D1 = BlackScholesMerton.d1(S, K, t, r, sigma, q);
      D2 = BlackScholesMerton.d2(S, K, t, r, sigma, q);
      return S * Math.exp(-q * t) * N(D1) - K * Math.exp(-r * t) * N(D2);
    };

    BlackScholesMerton.bsm_put = function(S, K, t, r, sigma, q) {
      var D1, D2;
      D1 = BlackScholesMerton.d1(S, K, t, r, sigma, q);
      D2 = BlackScholesMerton.d2(S, K, t, r, sigma, q);
      return K * Math.exp(-r * t) * N(-D2) - S * Math.exp(-q * t) * N(-D1);
    };

    BlackScholesMerton.black_scholes_merton = function(flag, S, K, t, r, sigma, q) {
      if (flag === 'c') {
        return BlackScholesMerton.bsm_call(S, K, t, r, sigma, q);
      } else {
        return BlackScholesMerton.bsm_put(S, K, t, r, sigma, q);
      }
    };

    return BlackScholesMerton;

  })();

  js_vollib.js_ref.black_scholes_merton = BlackScholesMerton;

}).call(this);
