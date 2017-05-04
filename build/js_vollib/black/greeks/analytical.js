(function() {
  var Analytical;

  Analytical = (function() {
    var N, black, d1, d2, pdf;

    function Analytical() {}

    N = js_lets_be_rational.norm_cdf;

    pdf = js_vollib.helpers.pdf;

    d1 = js_vollib.js_ref.black.d1;

    d2 = js_vollib.js_ref.black.d2;

    black = js_vollib.black.black;

    Analytical.delta = function(flag, F, K, t, r, sigma) {
      var D1;
      D1 = d1(F, K, t, r, sigma);
      if (flag === 'p') {
        return -Math.exp(-r * t) * N(-D1);
      } else {
        return Math.exp(-r * t) * N(D1);
      }
    };

    Analytical.theta = function(flag, F, K, t, r, sigma) {
      var D1, D2, N_d2, e_to_the_minus_rt, first_term, pdf_d1, second_term, third_term, two_sqrt_t;
      e_to_the_minus_rt = Math.exp(-r * t);
      two_sqrt_t = 2 * Math.sqrt(t);
      D1 = d1(F, K, t, r, sigma);
      D2 = d2(F, K, t, r, sigma);
      pdf_d1 = pdf(D1);
      N_d2 = N(D2);
      first_term = F * e_to_the_minus_rt * pdf(D1) * sigma / two_sqrt_t;
      if (flag === 'c') {
        second_term = -r * F * e_to_the_minus_rt * N(D1);
        third_term = r * K * e_to_the_minus_rt * N(D2);
        return -(first_term + second_term + third_term) / 365.0;
      } else {
        second_term = -r * F * e_to_the_minus_rt * N(-D1);
        third_term = r * K * e_to_the_minus_rt * N(-D2);
        return (-first_term + second_term + third_term) / 365.0;
      }
    };

    Analytical.gamma = function(flag, F, K, t, r, sigma) {
      var D1;
      D1 = d1(F, K, t, r, sigma);
      return pdf(D1) * Math.exp(-r * t) / (F * sigma * Math.sqrt(t));
    };

    Analytical.vega = function(flag, F, K, t, r, sigma) {
      var D1;
      D1 = d1(F, K, t, r, sigma);
      return F * Math.exp(-r * t) * pdf(D1) * Math.sqrt(t) * 0.01;
    };

    Analytical.rho = function(flag, F, K, t, r, sigma) {
      return -t * black(flag, F, K, t, r, sigma) * .01;
    };

    return Analytical;

  })();

  js_vollib.black.greeks.analytical = Analytical;

}).call(this);
