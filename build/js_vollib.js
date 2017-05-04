(function() {
  window.js_vollib = {};

}).call(this);

(function() {
  var Helpers;

  Helpers = (function() {
    var ONE_OVER_SQRT_TWO_PI, _brent;

    function Helpers() {}

    ONE_OVER_SQRT_TWO_PI = 0.3989422804014326779399460599343818684758586311649;

    _brent = new Brent(1e-15);

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
      return _brent.getRoot(func, 1e-12, 100);
    };

    return Helpers;

  })();

  js_vollib.helpers = Helpers;

}).call(this);

(function() {
  var Constants;

  Constants = (function() {
    function Constants() {}

    Constants.FLOAT_MAX = Number.MAX_VALUE;

    Constants.MINUS_FLOAT_MAX = -Constants.FLOAT_MAX;

    return Constants;

  })();

  js_vollib.helpers.constants = Constants;

}).call(this);

(function() {
  var PriceIsAboveMaximum, PriceIsBelowIntrinsic;

  PriceIsAboveMaximum = (function() {
    function PriceIsAboveMaximum() {
      this.name = this.constructor.name;
      this.stack = (new Error).stack;
    }

    PriceIsAboveMaximum.prototype = new Error;

    PriceIsAboveMaximum.prototype.constructor = PriceIsAboveMaximum;

    return PriceIsAboveMaximum;

  })();

  PriceIsBelowIntrinsic = (function() {
    function PriceIsBelowIntrinsic() {
      this.name = this.constructor.name;
      this.stack = (new Error).stack;
    }

    PriceIsBelowIntrinsic.prototype = new Error;

    PriceIsBelowIntrinsic.prototype.constructor = PriceIsBelowIntrinsic;

    return PriceIsBelowIntrinsic;

  })();

  js_vollib.helpers.exceptions = {};

  js_vollib.helpers.exceptions.PriceIsAboveMaximum = PriceIsAboveMaximum;

  js_vollib.helpers.exceptions.PriceIsBelowIntrinsic = PriceIsBelowIntrinsic;

}).call(this);

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

(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var FLOAT_MAX, MINUS_FLOAT_MAX, PriceIsAboveMaximum, PriceIsBelowIntrinsic, binary_flag, lets_be_rational;

    function ImpliedVolatility() {}

    binary_flag = js_vollib.helpers.binary_flag;

    PriceIsAboveMaximum = js_vollib.helpers.exceptions.PriceIsAboveMaximum;

    PriceIsBelowIntrinsic = js_vollib.helpers.exceptions.PriceIsBelowIntrinsic;

    FLOAT_MAX = js_vollib.helpers.constants.FLOAT_MAX;

    MINUS_FLOAT_MAX = js_vollib.helpers.constants.MINUS_FLOAT_MAX;

    lets_be_rational = js_lets_be_rational;

    ImpliedVolatility.implied_volatility_of_discounted_option_price = function(discounted_option_price, F, K, r, t, flag) {
      var deflater, sigma_calc, undiscounted_option_price;
      deflater = Math.exp(-r * t);
      undiscounted_option_price = discounted_option_price / deflater;
      sigma_calc = js_lets_be_rational.implied_volatility_from_a_transformed_rational_guess(undiscounted_option_price, F, K, t, binary_flag[flag]);
      if (sigma_calc === FLOAT_MAX) {
        throw PriceIsAboveMaximum();
      } else if (sigma_calc === MINUS_FLOAT_MAX) {
        throw PriceIsBelowIntrinsic();
      }
      return sigma_calc;
    };

    ImpliedVolatility.implied_volatility = function(discounted_option_price, F, K, r, t, flag) {
      return ImpliedVolatility.implied_volatility_of_discounted_option_price(discounted_option_price, F, K, r, t, flag);
    };

    ImpliedVolatility.normalised_implied_volatility = function(beta, x, flag) {
      var q;
      q = binary_flag[flag];
      return lets_be_rational.normalised_implied_volatility_from_a_transformed_rational_guess(beta, x, q);
    };

    ImpliedVolatility.normalised_implied_volatility_limited_iterations = function(beta, x, flag, N) {
      var q;
      q = binary_flag[flag];
      return lets_be_rational.normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(beta, x, q, N);
    };

    ImpliedVolatility.implied_volatility_of_undiscounted_option_price = function(undiscounted_option_price, F, K, t, flag) {
      return lets_be_rational.implied_volatility_from_a_transformed_rational_guess(undiscounted_option_price, F, K, t, binary_flag[flag]);
    };

    ImpliedVolatility.implied_volatility_of_undiscounted_option_price_limited_iterations = function(undiscounted_option_price, F, K, t, flag, N) {
      return lets_be_rational.implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(undiscounted_option_price, F, K, t, binary_flag[flag], N);
    };

    return ImpliedVolatility;

  })();

  js_vollib.black.implied_volatility = ImpliedVolatility;

}).call(this);

(function() {
  var BlackScholes;

  BlackScholes = (function() {
    var undiscounted_black;

    function BlackScholes() {}

    undiscounted_black = js_vollib.black.undiscounted_black;

    BlackScholes.black_scholes = function(flag, S, K, t, r, sigma) {
      var F, deflater;
      deflater = Math.exp(-r * t);
      F = S / deflater;
      return undiscounted_black(F, K, sigma, t, flag) * deflater;
    };

    return BlackScholes;

  })();

  js_vollib.black_scholes = BlackScholes;

}).call(this);

(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var FLOAT_MAX, MINUS_FLOAT_MAX, PriceIsAboveMaximum, PriceIsBelowIntrinsic, binary_flag, forward_price, helpers, iv;

    function ImpliedVolatility() {}

    helpers = js_vollib.helpers;

    binary_flag = helpers.binary_flag;

    PriceIsAboveMaximum = helpers.exceptions.PriceIsAboveMaximum;

    PriceIsBelowIntrinsic = helpers.exceptions.PriceIsBelowIntrinsic;

    FLOAT_MAX = helpers.constants.FLOAT_MAX;

    MINUS_FLOAT_MAX = helpers.constants.MINUS_FLOAT_MAX;

    forward_price = helpers.forward_price;

    iv = js_lets_be_rational.implied_volatility_from_a_transformed_rational_guess;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, flag) {
      var F, deflater, sigma_calc, undiscounted_option_price;
      deflater = Math.exp(-r * t);
      undiscounted_option_price = price / deflater;
      F = forward_price(S, t, r);
      sigma_calc = iv(undiscounted_option_price, F, K, t, binary_flag[flag]);
      if (sigma_calc === FLOAT_MAX) {
        throw PriceIsAboveMaximum();
      } else if (sigma_calc === MINUS_FLOAT_MAX) {
        throw PriceIsBelowIntrinsic();
      }
      return sigma_calc;
    };

    return ImpliedVolatility;

  })();

  js_vollib.black_scholes.implied_volatility = ImpliedVolatility;

}).call(this);

(function() {
  var BlackScholesMerton;

  BlackScholesMerton = (function() {
    var binary_flag, black;

    function BlackScholesMerton() {}

    black = js_lets_be_rational.black;

    binary_flag = js_vollib.helpers.binary_flag;

    BlackScholesMerton.black_scholes_merton = function(flag, S, K, t, r, sigma, q) {
      var F, deflater;
      F = S * Math.exp((r - q) * t);
      deflater = Math.exp(-r * t);
      return black(F, K, sigma, t, binary_flag[flag]) * deflater;
    };

    return BlackScholesMerton;

  })();

  js_vollib.black_scholes_merton = BlackScholesMerton;

}).call(this);

(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var FLOAT_MAX, MINUS_FLOAT_MAX, PriceIsAboveMaximum, PriceIsBelowIntrinsic, binary_flag, forward_price, helpers, iv;

    function ImpliedVolatility() {}

    helpers = js_vollib.helpers;

    binary_flag = helpers.binary_flag;

    PriceIsAboveMaximum = helpers.exceptions.PriceIsAboveMaximum;

    PriceIsBelowIntrinsic = helpers.exceptions.PriceIsBelowIntrinsic;

    FLOAT_MAX = helpers.constants.FLOAT_MAX;

    MINUS_FLOAT_MAX = helpers.constants.MINUS_FLOAT_MAX;

    forward_price = helpers.forward_price;

    iv = js_lets_be_rational.implied_volatility_from_a_transformed_rational_guess;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, q, flag) {
      var F, deflater, sigma_calc, undiscounted_option_price;
      deflater = Math.exp(-r * t);
      undiscounted_option_price = price / deflater;
      F = S * Math.exp((r - q) * t);
      sigma_calc = iv(undiscounted_option_price, F, K, t, binary_flag[flag]);
      if (sigma_calc === FLOAT_MAX) {
        throw PriceIsAboveMaximum();
      } else if (sigma_calc === MINUS_FLOAT_MAX) {
        throw PriceIsBelowIntrinsic();
      }
      return sigma_calc;
    };

    return ImpliedVolatility;

  })();

  js_vollib.black_scholes_merton.implied_volatility = ImpliedVolatility;

}).call(this);

(function() {
  js_vollib.js_ref = {};

}).call(this);

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

(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var black, brent;

    function ImpliedVolatility() {}

    black = js_vollib.js_ref.black.black;

    brent = js_vollib.helpers.brent;

    ImpliedVolatility.implied_volatility = function(price, F, K, r, t, flag) {
      var f;
      f = function(sigma) {
        return price - black(flag, F, K, t, r, sigma);
      };
      return brent(f);
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black.implied_volatility = ImpliedVolatility;

}).call(this);

(function() {
  var BlackScholes;

  BlackScholes = (function() {
    var N;

    function BlackScholes() {}

    N = js_vollib.helpers.norm_cdf;

    BlackScholes.d1 = function(S, K, t, r, sigma) {
      var denominator, numerator, sigma_squared;
      sigma_squared = sigma * sigma;
      numerator = Math.log(S / K) + (r + sigma_squared / 2.0) * t;
      denominator = sigma * Math.sqrt(t);
      return numerator / denominator;
    };

    BlackScholes.d2 = function(S, K, t, r, sigma) {
      return BlackScholes.d1(S, K, t, r, sigma) - sigma * Math.sqrt(t);
    };

    BlackScholes.black_scholes = function(flag, S, K, t, r, sigma) {
      var D1, D2, e_to_the_minus_rt;
      e_to_the_minus_rt = Math.exp(-r * t);
      D1 = BlackScholes.d1(S, K, t, r, sigma);
      D2 = BlackScholes.d2(S, K, t, r, sigma);
      if (flag === 'c') {
        return S * N(D1) - K * e_to_the_minus_rt * N(D2);
      } else {
        return -S * N(-D1) + K * e_to_the_minus_rt * N(-D2);
      }
    };

    return BlackScholes;

  })();

  js_vollib.js_ref.black_scholes = BlackScholes;

}).call(this);

(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var black_scholes, brent;

    function ImpliedVolatility() {}

    black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    brent = js_vollib.helpers.brent;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, flag) {
      var f;
      f = function(sigma) {
        return price - black_scholes(flag, S, K, t, r, sigma);
      };
      return brent(f);
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black_scholes.implied_volatility = ImpliedVolatility;

}).call(this);

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

(function() {
  var ImpliedVolatility;

  ImpliedVolatility = (function() {
    var black_scholes_merton, brent;

    function ImpliedVolatility() {}

    black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    brent = js_vollib.helpers.brent;

    ImpliedVolatility.implied_volatility = function(price, S, K, t, r, q, flag) {
      var f;
      f = function(sigma) {
        return price - black_scholes_merton(flag, S, K, t, r, sigma, q);
      };
      return brent(f);
    };

    return ImpliedVolatility;

  })();

  js_vollib.js_ref.black_scholes_merton.implied_volatility = ImpliedVolatility;

}).call(this);

(function() {
  js_vollib.js_ref.black.greeks = {};

}).call(this);

(function() {
  var Analytical;

  Analytical = (function() {
    var N, black, d1, d2, pdf;

    function Analytical() {}

    N = js_vollib.helpers.norm_cdf;

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

  js_vollib.js_ref.black.greeks.analytical = Analytical;

}).call(this);

(function() {
  var Numerical;

  Numerical = (function() {
    var black, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black = js_vollib.js_ref.black.black;

    f = function(flag, F, K, t, r, sigma, b) {
      return black(flag, F, K, t, r, sigma);
    };

    Numerical.delta = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.delta(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.theta = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.theta(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.vega = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.vega(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.rho = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.rho(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.gamma = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.gamma(flag, F, K, t, r, sigma, b, f);
    };

    return Numerical;

  })();

  js_vollib.js_ref.black.greeks.numerical = Numerical;

}).call(this);

(function() {
  js_vollib.js_ref.black_scholes.greeks = {};

}).call(this);

(function() {
  var Analytical;

  Analytical = (function() {
    var N, d1, d2, pdf;

    function Analytical() {}

    N = js_vollib.helpers.norm_cdf;

    pdf = js_vollib.helpers.pdf;

    d1 = js_vollib.js_ref.black_scholes.d1;

    d2 = js_vollib.js_ref.black_scholes.d2;

    Analytical.delta = function(flag, S, K, t, r, sigma) {
      var d_1;
      d_1 = d1(S, K, t, r, sigma);
      if (flag === 'p') {
        return N(d_1) - 1.0;
      } else {
        return N(d_1);
      }
    };

    Analytical.theta = function(flag, S, K, t, r, sigma) {
      var D1, D2, first_term, second_term, two_sqrt_t;
      two_sqrt_t = 2 * Math.sqrt(t);
      D1 = d1(S, K, t, r, sigma);
      D2 = d2(S, K, t, r, sigma);
      first_term = (-S * pdf(D1) * sigma) / two_sqrt_t;
      if (flag === 'c') {
        second_term = r * K * Math.exp(-r * t) * N(D2);
        return (first_term - second_term) / 365.0;
      }
      if (flag === 'p') {
        second_term = r * K * Math.exp(-r * t) * N(-D2);
        return (first_term + second_term) / 365.0;
      }
    };

    Analytical.gamma = function(flag, S, K, t, r, sigma) {
      var d_1;
      d_1 = d1(S, K, t, r, sigma);
      return pdf(d_1) / (S * sigma * Math.sqrt(t));
    };

    Analytical.vega = function(flag, S, K, t, r, sigma) {
      var d_1;
      d_1 = d1(S, K, t, r, sigma);
      return S * pdf(d_1) * Math.sqrt(t) * 0.01;
    };

    Analytical.rho = function(flag, S, K, t, r, sigma) {
      var d_2, e_to_the_minus_rt;
      d_2 = d2(S, K, t, r, sigma);
      e_to_the_minus_rt = Math.exp(-r * t);
      if (flag === 'c') {
        return t * K * e_to_the_minus_rt * N(d_2) * 0.01;
      } else {
        return -t * K * e_to_the_minus_rt * N(-d_2) * 0.01;
      }
    };

    return Analytical;

  })();

  js_vollib.js_ref.black_scholes.greeks.analytical = Analytical;

}).call(this);

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

(function() {
  js_vollib.js_ref.black_scholes_merton.greeks = {};

}).call(this);

(function() {
  var Analytical;

  Analytical = (function() {
    var N, d1, d2, pdf;

    function Analytical() {}

    N = js_vollib.helpers.norm_cdf;

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

  js_vollib.js_ref.black_scholes_merton.greeks.analytical = Analytical;

}).call(this);

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

(function() {
  js_vollib.black.greeks = {};

}).call(this);

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

(function() {
  var Numerical;

  Numerical = (function() {
    var black, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black = js_vollib.black.black;

    f = function(flag, F, K, t, r, sigma, b) {
      return black(flag, F, K, t, r, sigma);
    };

    Numerical.delta = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.delta(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.theta = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.theta(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.vega = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.vega(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.rho = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.rho(flag, F, K, t, r, sigma, b, f);
    };

    Numerical.gamma = function(flag, F, K, t, r, sigma) {
      var b;
      b = 0;
      return numerical.gamma(flag, F, K, t, r, sigma, b, f);
    };

    return Numerical;

  })();

  js_vollib.black.greeks.numerical = Numerical;

}).call(this);

(function() {
  js_vollib.black_scholes.greeks = {};

}).call(this);

(function() {
  var Analytical;

  Analytical = (function() {
    var N, d1, d2, pdf;

    function Analytical() {}

    N = js_lets_be_rational.norm_cdf;

    pdf = js_vollib.helpers.pdf;

    d1 = js_vollib.js_ref.black_scholes.d1;

    d2 = js_vollib.js_ref.black_scholes.d2;

    Analytical.delta = function(flag, S, K, t, r, sigma) {
      var d_1;
      d_1 = d1(S, K, t, r, sigma);
      if (flag === 'p') {
        return N(d_1) - 1.0;
      } else {
        return N(d_1);
      }
    };

    Analytical.theta = function(flag, S, K, t, r, sigma) {
      var D1, D2, first_term, second_term, two_sqrt_t;
      two_sqrt_t = 2 * Math.sqrt(t);
      D1 = d1(S, K, t, r, sigma);
      D2 = d2(S, K, t, r, sigma);
      first_term = (-S * pdf(D1) * sigma) / two_sqrt_t;
      if (flag === 'c') {
        second_term = r * K * Math.exp(-r * t) * N(D2);
        return (first_term - second_term) / 365.0;
      }
      if (flag === 'p') {
        second_term = r * K * Math.exp(-r * t) * N(-D2);
        return (first_term + second_term) / 365.0;
      }
    };

    Analytical.gamma = function(flag, S, K, t, r, sigma) {
      var d_1;
      d_1 = d1(S, K, t, r, sigma);
      return pdf(d_1) / (S * sigma * Math.sqrt(t));
    };

    Analytical.vega = function(flag, S, K, t, r, sigma) {
      var d_1;
      d_1 = d1(S, K, t, r, sigma);
      return S * pdf(d_1) * Math.sqrt(t) * 0.01;
    };

    Analytical.rho = function(flag, S, K, t, r, sigma) {
      var d_2, e_to_the_minus_rt;
      d_2 = d2(S, K, t, r, sigma);
      e_to_the_minus_rt = Math.exp(-r * t);
      if (flag === 'c') {
        return t * K * e_to_the_minus_rt * N(d_2) * .01;
      } else {
        return -t * K * e_to_the_minus_rt * N(-d_2) * .01;
      }
    };

    return Analytical;

  })();

  js_vollib.black_scholes.greeks.analytical = Analytical;

}).call(this);

(function() {
  var Numerical;

  Numerical = (function() {
    var black_scholes, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black_scholes = js_vollib.black_scholes.black_scholes;

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

  js_vollib.black_scholes.greeks.numerical = Numerical;

}).call(this);

(function() {
  js_vollib.black_scholes_merton.greeks = {};

}).call(this);

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

(function() {
  var Numerical;

  Numerical = (function() {
    var black_scholes_merton, f, numerical;

    function Numerical() {}

    numerical = js_vollib.helpers.numerical_greeks;

    black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;

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

  js_vollib.black_scholes_merton.greeks.numerical = Numerical;

}).call(this);
