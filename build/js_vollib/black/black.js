(function() {
  var Black;

  Black = (function() {
    var binary_flag;

    function Black() {}

    binary_flag = js_vollib.helpers.binary_flag;

    Black.black = function(flag, F, K, t, r, sigma) {
      var deflater;
      deflater = Math.exp(-r * t);
      return Black.undiscounted_black(F, K, sigma, t, flag) * deflater;
    };

    Black.normalised_black = function(x, s, flag) {
      var q;
      q = binary_flag[flag];
      return js_lets_be_rational.normalised_black(x, s, q);
    };

    Black.undiscounted_black = function(F, K, sigma, t, flag) {
      var q;
      q = binary_flag[flag];
      F = F;
      K = K;
      sigma = sigma;
      t = t;
      return js_lets_be_rational.black(F, K, sigma, t, q);
    };

    return Black;

  })();

  js_vollib.black = Black;

}).call(this);
