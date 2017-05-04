(function() {
  var Helpers;

  Helpers = (function() {
    var ONE_OVER_SQRT_TWO_PI, _brent, distribution, mean, stdev;

    function Helpers() {}

    ONE_OVER_SQRT_TWO_PI = 0.3989422804014326779399460599343818684758586311649;

    _brent = new Brent(1e-15);

    _brent.maxIter = 1000;

    mean = 0.0;

    stdev = 1.0;

    distribution = gaussian(mean, stdev);

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
      return jStat.normal.cdf(x, mean, stdev);
    };

    Helpers.brent = function(func) {
      return _brent.getRoot(func, 1e-12, 100);
    };

    return Helpers;

  })();

  js_vollib.helpers = Helpers;

}).call(this);
