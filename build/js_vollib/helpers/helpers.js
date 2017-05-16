(function() {
  var Helpers;

  Helpers = (function() {
    var AboveMaximumError, BelowIntrinsicError, ONE_OVER_SQRT_TWO_PI, _brent;

    function Helpers() {}

    ONE_OVER_SQRT_TWO_PI = 0.3989422804014326779399460599343818684758586311649;

    Helpers.BRENT_MIN = 1e-12;

    Helpers.BRENT_MAX = 100;

    BelowIntrinsicError = js_lets_be_rational.BelowIntrinsicError;

    AboveMaximumError = js_lets_be_rational.AboveMaximumError;

    _brent = new Brent(0);

    _brent.maxIter = 1000;

    Helpers.binary_flag = {
      'c': 1,
      'p': -1
    };

    Helpers.pdf = function(x) {
      return ONE_OVER_SQRT_TWO_PI * Math.exp(-0.5 * x * x);
    };

    Helpers.forward_price = function(S, t, r) {
      return S / Math.exp(-r * t);
    };

    Helpers.norm_cdf = function(x) {
      var mean, stdev;
      mean = 0.0;
      stdev = 1.0;
      return jStat.normal.cdf(x, mean, stdev);
    };

    Helpers.brent = function(func) {
      var functionalValueAccuracy, initial, max, min, yInitial, yMax, yMin;
      min = Helpers.BRENT_MIN;
      max = Helpers.BRENT_MAX;
      initial = min + 0.5 * (max - min);
      functionalValueAccuracy = 0.0;
      yInitial = func(initial);
      if (Math.abs(yInitial) <= functionalValueAccuracy) {
        return initial;
      } else {
        yMin = func(min);
        if (Math.abs(yMin) <= functionalValueAccuracy) {
          return min;
        } else if (yInitial * yMin < 0.0) {
          return _brent.getRoot(func, min, initial);
        } else {
          yMax = func(max);
          if (Math.abs(yMax) <= functionalValueAccuracy) {
            return max;
          } else if (yInitial * yMax < 0.0) {
            return _brent.getRoot(func, initial, max);
          }
          return false;
        }
      }
    };

    Helpers.validate_price = function(price, F, K, q) {
      var intrinsic, max_price;
      intrinsic = Math.abs(Math.max((q < 0 ? K - F : F - K), 0.0));
      if (price < intrinsic) {
        throw new js_vollib.helpers.exceptions.PriceIsBelowIntrinsic();
      }
      max_price = q < 0 ? K : F;
      if (price >= max_price) {
        throw new js_vollib.helpers.exceptions.PriceIsAboveMaximum();
      }
    };

    return Helpers;

  })();

  js_vollib.helpers = Helpers;

}).call(this);
