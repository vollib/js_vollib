(function() {
  var Black;

  Black = (function() {
    var N;

    function Black() {}

    N = js_vollib.helpers.norm_cdf;

    Black.d1 = function(F, K, t, r, sigma) {
      var denominator, numerator, sigma_squared;
      sigma_squared = sigma * sigma;
      numerator = Math.log(F / K) + sigma_squared * t / 2.0;
      denominator = sigma * Math.sqrt(t);
      return numerator / denominator;
    };

    Black.d2 = function(F, K, t, r, sigma) {
      return Black.d1(F, K, t, r, sigma) - sigma * Math.sqrt(t);
    };

    Black.black_call = function(F, K, t, r, sigma) {
      var N_d1, N_d2, deflater;
      deflater = Math.exp(-r * t);
      N_d1 = N(Black.d1(F, K, t, r, sigma));
      N_d2 = N(Black.d2(F, K, t, r, sigma));
      return deflater * (F * N_d1 - K * N_d2);
    };

    Black.black_put = function(F, K, t, r, sigma) {
      var N_of_minus_d1, N_of_minus_d2, deflater;
      deflater = Math.exp(-r * t);
      N_of_minus_d1 = N(-Black.d1(F, K, t, r, sigma));
      N_of_minus_d2 = N(-Black.d2(F, K, t, r, sigma));
      return deflater * (-F * N_of_minus_d1 + K * N_of_minus_d2);
    };

    Black.black = function(flag, F, K, t, r, sigma) {
      if (flag === 'c') {
        return Black.black_call(F, K, t, r, sigma);
      } else {
        return Black.black_put(F, K, t, r, sigma);
      }
    };

    return Black;

  })();

  js_vollib.js_ref.black = Black;

}).call(this);
