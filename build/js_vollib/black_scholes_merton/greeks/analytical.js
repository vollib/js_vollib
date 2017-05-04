(function() {
  var Analytical;

  Analytical = (function() {
    var N, d1, d2, pdf;

    function Analytical() {}

    N = js_lets_be_rational.norm_cdf;

    pdf = js_vollib.helpers.pdf;

    d1 = js_vollib.js_ref.black_scholes_merton.d1;

    d2 = js_vollib.js_ref.black_scholes_merton.d2;

    Analytical.delta = function(flag, S, K, t, r, sigma, q) {
      var D1;
      D1 = d1(S, K, t, r, sigma, q);
      if (flag === 'p') {
        return -Math.exp(-q * t) * N(-D1);
      } else {
        return Math.exp(-q * t) * N(D1);
      }
    };

    Analytical.theta = function(flag, S, K, t, r, sigma, q) {
      var D1, D2, first_term, second_term, third_term;
      D1 = d1(S, K, t, r, sigma, q);
      D2 = d2(S, K, t, r, sigma, q);
      first_term = (S * Math.exp(-q * t) * pdf(D1) * sigma) / (2 * Math.sqrt(t));
      if (flag === 'c') {
        second_term = -q * S * Math.exp(-q * t) * N(D1);
        third_term = r * K * Math.exp(-r * t) * N(D2);
        return -(first_term + second_term + third_term) / 365.0;
      } else {
        second_term = -q * S * Math.exp(-q * t) * N(-D1);
        third_term = r * K * Math.exp(-r * t) * N(-D2);
        return (-first_term + second_term + third_term) / 365.0;
      }
    };

    Analytical.gamma = function(flag, S, K, t, r, sigma, q) {
      var D1, denominator, numerator;
      D1 = d1(S, K, t, r, sigma, q);
      numerator = Math.exp(-q * t) * pdf(D1);
      denominator = S * sigma * Math.sqrt(t);
      return numerator / denominator;
    };

    Analytical.vega = function(flag, S, K, t, r, sigma, q) {
      var D1;
      D1 = d1(S, K, t, r, sigma, q);
      return S * Math.exp(-q * t) * pdf(D1) * Math.sqrt(t) * 0.01;
    };

    Analytical.rho = function(flag, S, K, t, r, sigma, q) {
      var D2;
      D2 = d2(S, K, t, r, sigma, q);
      if (flag === 'c') {
        return t * K * Math.exp(-r * t) * N(D2) * 0.01;
      } else {
        return -t * K * Math.exp(-r * t) * N(-D2) * 0.01;
      }
    };

    return Analytical;

  })();

  js_vollib.black_scholes_merton.greeks.analytical = Analytical;

}).call(this);
