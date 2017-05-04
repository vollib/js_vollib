(function() {
  window.LetsBeRational = {};

}).call(this);

(function() {
  var constants;

  constants = (function() {
    var _DBL_EPSILON, _DBL_MAX, _DBL_MIN, _EIGHTH_ROOT_DBL_EPSILON, _FOURTH_ROOT_DBL_EPSILON, _SQRT_DBL_EPSILON;

    function constants() {}

    _DBL_EPSILON = 2.2204460492503131e-16;

    _DBL_MIN = 2.2250738585072014e-308;

    _DBL_MAX = 1.7976931348623157e+308;

    _SQRT_DBL_EPSILON = Math.sqrt(_DBL_EPSILON);

    _FOURTH_ROOT_DBL_EPSILON = Math.sqrt(_SQRT_DBL_EPSILON);

    _EIGHTH_ROOT_DBL_EPSILON = Math.sqrt(_FOURTH_ROOT_DBL_EPSILON);

    constants.prototype.DBL_EPSILON = _DBL_EPSILON;

    constants.prototype.DBL_MIN = _DBL_MIN;

    constants.prototype.DBL_MAX = _DBL_MAX;

    constants.prototype.SQRT_DBL_EPSILON = _SQRT_DBL_EPSILON;

    constants.prototype.FOURTH_ROOT_DBL_EPSILON = _FOURTH_ROOT_DBL_EPSILON;

    constants.prototype.EIGHTH_ROOT_DBL_EPSILON = _EIGHTH_ROOT_DBL_EPSILON;

    constants.prototype.SIXTEENTH_ROOT_DBL_EPSILON = Math.sqrt(_EIGHTH_ROOT_DBL_EPSILON);

    constants.prototype.SQRT_DBL_MIN = Math.sqrt(_DBL_MIN);

    constants.prototype.SQRT_DBL_MAX = Math.sqrt(_DBL_MAX);

    constants.prototype.DENORMALIZATION_CUTOFF = 0;

    constants.prototype.VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_BELOW_INTRINSIC = -_DBL_MAX;

    constants.prototype.VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_ABOVE_MAXIMUM = _DBL_MAX;

    constants.prototype.ONE_OVER_SQRT_TWO = 0.7071067811865475244008443621048490392848359376887;

    constants.prototype.ONE_OVER_SQRT_TWO_PI = 0.3989422804014326779399460599343818684758586311649;

    constants.prototype.SQRT_TWO_PI = 2.506628274631000502415765284811045253006986740610;

    constants.prototype.TWO_PI = 6.283185307179586476925286766559005768394338798750;

    constants.prototype.SQRT_PI_OVER_TWO = 1.253314137315500251207882642405522626503493370305;

    constants.prototype.SQRT_THREE = 1.732050807568877293527446341505872366942805253810;

    constants.prototype.SQRT_ONE_OVER_THREE = 0.577350269189625764509148780501957455647601751270;

    constants.prototype.TWO_PI_OVER_SQRT_TWENTY_SEVEN = 1.209199576156145233729385505094770488189377498728;

    constants.prototype.PI_OVER_SIX = 0.523598775598298873077107230546583814032861566563;

    return constants;

  })();

  window.LetsBeRational.constants = new constants();

}).call(this);

(function() {
  var AboveMaximumError, BelowIntrinsicError, VolatilityValueError,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  VolatilityValueError = (function() {
    function VolatilityValueError(message, value) {
      this.name = this.constructor.name;
      this.message = message;
      this.value = value;
      this.stack = (new Error).stack;
    }

    VolatilityValueError.prototype = new Error;

    VolatilityValueError.prototype.constructor = VolatilityValueError;

    return VolatilityValueError;

  })();

  BelowIntrinsicError = (function(superClass) {
    extend(BelowIntrinsicError, superClass);

    function BelowIntrinsicError() {
      BelowIntrinsicError.__super__.constructor.call(this, 'The volatility is below the intrinsic value.', LetsBeRational.constants.VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_BELOW_INTRINSIC);
    }

    return BelowIntrinsicError;

  })(VolatilityValueError);

  AboveMaximumError = (function(superClass) {
    extend(AboveMaximumError, superClass);

    function AboveMaximumError() {
      AboveMaximumError.__super__.constructor.call(this, 'The volatility is above the maximum value.', LetsBeRational.constants.VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_ABOVE_MAXIMUM);
    }

    return AboveMaximumError;

  })(VolatilityValueError);

  window.VolatilityValueError = VolatilityValueError;

  window.BelowIntrinsicError = BelowIntrinsicError;

  window.AboveMaximumError = AboveMaximumError;

}).call(this);

(function() {
  var erf_cody;

  erf_cody = (function() {
    var A, B, C, D, FOUR, HALF, ONE, P, Q, SIXTEEN, SQRPI, THRESH, TWO, XBIG, XHUGE, XINF, XMAX, XNEG, XSMALL, ZERO, calerf, d_int, fix_up_for_negative_argument_erf_etc;

    function erf_cody() {}

    d_int = function(x) {
      if (x > 0) {
        return Math.floor(x);
      } else {
        return -Math.floor(-x);
      }
    };

    A = [3.1611237438705656, 113.864154151050156, 377.485237685302021, 3209.37758913846947, 0.185777706184603153];

    B = [23.6012909523441209, 244.024637934444173, 1282.61652607737228, 2844.23683343917062];

    C = [0.564188496988670089, 8.88314979438837594, 66.1191906371416295, 298.635138197400131, 881.95222124176909, 1712.04761263407058, 2051.07837782607147, 1230.33935479799725, 2.15311535474403846e-8];

    D = [15.7449261107098347, 117.693950891312499, 537.181101862009858, 1621.38957456669019, 3290.79923573345963, 4362.61909014324716, 3439.36767414372164, 1230.33935480374942];

    P = [0.305326634961232344, 0.360344899949804439, 0.125781726111229246, 0.0160837851487422766, 6.58749161529837803e-4, 0.0163153871373020978];

    Q = [2.56852019228982242, 1.87295284992346047, 0.527905102951428412, 0.0605183413124413191, 0.00233520497626869185];

    ZERO = 0.0;

    HALF = 0.5;

    ONE = 1.0;

    TWO = 2.0;

    FOUR = 4.0;

    SQRPI = 0.56418958354775628695;

    THRESH = 0.46875;

    SIXTEEN = 16.0;

    XINF = 1.79e308;

    XNEG = -26.628;

    XSMALL = 1.11e-16;

    XBIG = 26.543;

    XHUGE = 6.71e7;

    XMAX = 2.53e307;

    calerf = function(x, jint) {
      var _del, d__1, i, i__, j, k, result, xden, xnum, y, ysq;
      y = Math.abs(x);
      if (y <= THRESH) {
        ysq = ZERO;
        if (y > XSMALL) {
          ysq = y * y;
        }
        xnum = A[4] * ysq;
        xden = ysq;
        for (i__ = i = 0; i < 3; i__ = ++i) {
          xnum = (xnum + A[i__]) * ysq;
          xden = (xden + B[i__]) * ysq;
        }
        result = x * (xnum + A[3]) / (xden + B[3]);
        if (jint !== 0) {
          result = ONE - result;
        }
        if (jint === 2) {
          result *= Math.exp(ysq);
        }
        return result;
      } else if (y <= FOUR) {
        xnum = C[8] * y;
        xden = y;
        for (i__ = j = 0; j < 7; i__ = ++j) {
          xnum = (xnum + C[i__]) * y;
          xden = (xden + D[i__]) * y;
        }
        result = (xnum + C[7]) / (xden + D[7]);
        if (jint !== 2) {
          d__1 = y * SIXTEEN;
          ysq = d_int(d__1) / SIXTEEN;
          _del = (y - ysq) * (y + ysq);
          d__1 = Math.exp(-ysq * ysq) * Math.exp(-_del);
          result *= d__1;
        }
      } else {
        result = ZERO;
        if (y >= XBIG) {
          if (jint !== 2 || y >= XMAX) {
            return fix_up_for_negative_argument_erf_etc(jint, result, x);
          }
          if (y >= XHUGE) {
            result = SQRPI / y;
            return fix_up_for_negative_argument_erf_etc(jint, result, x);
          }
        }
        ysq = ONE / (y * y);
        xnum = P[5] * ysq;
        xden = ysq;
        for (i__ = k = 0; k < 4; i__ = ++k) {
          xnum = (xnum + P[i__]) * ysq;
          xden = (xden + Q[i__]) * ysq;
        }
        result = ysq * (xnum + P[4]) / (xden + Q[4]);
        result = (SQRPI - result) / y;
        if (jint !== 2) {
          d__1 = y * SIXTEEN;
          ysq = d_int(d__1) / SIXTEEN;
          _del = (y - ysq) * (y + ysq);
          d__1 = Math.exp(-ysq * ysq) * Math.exp(-_del);
          result *= d__1;
        }
      }
      return fix_up_for_negative_argument_erf_etc(jint, result, x);
    };

    fix_up_for_negative_argument_erf_etc = function(jint, result, x) {
      var _del, d__1, y, ysq;
      if (jint === 0) {
        result = (HALF - result) + HALF;
        if (x < ZERO) {
          result = -result;
        }
      } else if (jint === 1) {
        if (x < ZERO) {
          result = TWO - result;
        }
      } else {
        if (x < ZERO) {
          if (x < XNEG) {
            result = XINF;
          } else {
            d__1 = x * SIXTEEN;
            ysq = d_int(d__1) / SIXTEEN;
            _del = (x - ysq) * (x + ysq);
            y = Math.exp(ysq * ysq) * Math.exp(_del);
            result = y + y - result;
          }
        }
      }
      return result;
    };

    erf_cody.prototype.erf_cody = function(x) {
      return calerf(x, 0);
    };

    erf_cody.prototype.erfc_cody = function(x) {
      return calerf(x, 1);
    };

    erf_cody.prototype.erfcx_cody = function(x) {
      return calerf(x, 2);
    };

    return erf_cody;

  })();

  window.LetsBeRational.erf_cody = new erf_cody();

}).call(this);

(function() {
  var normaldistribution;

  normaldistribution = (function() {
    var A0, A1, A2, A3, A4, A5, A6, A7, B1, B2, B3, B4, B5, B6, B7, C0, C1, C2, C3, C4, C5, C6, C7, D1, D2, D3, D4, D5, D6, D7, DBL_EPSILON, DBL_MAX, E0, E1, E2, E3, E4, E5, E6, E7, F1, F2, F3, F4, F5, F6, F7, ONE_OVER_SQRT_TWO, ONE_OVER_SQRT_TWO_PI, const1, const2, constants, erf_cody, norm_cdf_asymptotic_expansion_first_threshold, norm_cdf_asymptotic_expansion_second_threshold, split1, split2;

    function normaldistribution() {}

    erf_cody = window.LetsBeRational.erf_cody;

    constants = window.LetsBeRational.constants;

    DBL_EPSILON = constants.DBL_EPSILON;

    DBL_MAX = constants.DBL_MAX;

    ONE_OVER_SQRT_TWO_PI = constants.ONE_OVER_SQRT_TWO_PI;

    ONE_OVER_SQRT_TWO = constants.ONE_OVER_SQRT_TWO;

    norm_cdf_asymptotic_expansion_first_threshold = -10.0;

    norm_cdf_asymptotic_expansion_second_threshold = -1 / Math.sqrt(DBL_EPSILON);

    split1 = 0.425;

    split2 = 5.0;

    const1 = 0.180625;

    const2 = 1.6;

    A0 = 3.3871328727963666080e0;

    A1 = 1.3314166789178437745e+2;

    A2 = 1.9715909503065514427e+3;

    A3 = 1.3731693765509461125e+4;

    A4 = 4.5921953931549871457e+4;

    A5 = 6.7265770927008700853e+4;

    A6 = 3.3430575583588128105e+4;

    A7 = 2.5090809287301226727e+3;

    B1 = 4.2313330701600911252e+1;

    B2 = 6.8718700749205790830e+2;

    B3 = 5.3941960214247511077e+3;

    B4 = 2.1213794301586595867e+4;

    B5 = 3.9307895800092710610e+4;

    B6 = 2.8729085735721942674e+4;

    B7 = 5.2264952788528545610e+3;

    C0 = 1.42343711074968357734e0;

    C1 = 4.63033784615654529590e0;

    C2 = 5.76949722146069140550e0;

    C3 = 3.64784832476320460504e0;

    C4 = 1.27045825245236838258e0;

    C5 = 2.41780725177450611770e-1;

    C6 = 2.27238449892691845833e-2;

    C7 = 7.74545014278341407640e-4;

    D1 = 2.05319162663775882187e0;

    D2 = 1.67638483018380384940e0;

    D3 = 6.89767334985100004550e-1;

    D4 = 1.48103976427480074590e-1;

    D5 = 1.51986665636164571966e-2;

    D6 = 5.47593808499534494600e-4;

    D7 = 1.05075007164441684324e-9;

    E0 = 6.65790464350110377720e0;

    E1 = 5.46378491116411436990e0;

    E2 = 1.78482653991729133580e0;

    E3 = 2.96560571828504891230e-1;

    E4 = 2.65321895265761230930e-2;

    E5 = 1.24266094738807843860e-3;

    E6 = 2.71155556874348757815e-5;

    E7 = 2.01033439929228813265e-7;

    F1 = 5.99832206555887937690e-1;

    F2 = 1.36929880922735805310e-1;

    F3 = 1.48753612908506148525e-2;

    F4 = 7.86869131145613259100e-4;

    F5 = 1.84631831751005468180e-5;

    F6 = 1.42151175831644588870e-7;

    F7 = 2.04426310338993978564e-15;

    normaldistribution.prototype.norm_pdf = function(x) {
      return ONE_OVER_SQRT_TWO_PI * Math.exp(-0.5 * x * x);
    };

    normaldistribution.prototype.norm_cdf = function(z) {
      var a, g, i, lasta, sum, x, y, zsqr;
      if (z <= norm_cdf_asymptotic_expansion_first_threshold) {
        sum = 1;
        if (z >= norm_cdf_asymptotic_expansion_second_threshold) {
          zsqr = z * z;
          i = 1;
          g = 1;
          x = 0;
          y = 0;
          a = DBL_MAX;
          lasta = a;
          x = (4 * i - 3) / zsqr;
          y = x * ((4 * i - 1) / zsqr);
          a = g * (x - y);
          sum -= a;
          g *= y;
          i += 1;
          a = Math.abs(a);
          while ((lasta > a && a >= Math.abs(sum * DBL_EPSILON))) {
            lasta = a;
            x = (4 * i - 3) / zsqr;
            y = x * ((4 * i - 1) / zsqr);
            a = g * (x - y);
            sum -= a;
            g *= y;
            i += 1;
            a = Math.abs(a);
          }
        }
        return -this.norm_pdf(z) * sum / z;
      }
      return 0.5 * erf_cody.erfc_cody(-z * ONE_OVER_SQRT_TWO);
    };

    normaldistribution.prototype.inverse_norm_cdf = function(u) {
      var q, r, ret;
      if (u <= 0) {
        return Math.log(u);
      }
      if (u >= 1) {
        return Math.log(1 - u);
      }
      q = u - 0.5;
      if (Math.abs(q) <= split1) {
        r = const1 - q * q;
        return q * (((((((A7 * r + A6) * r + A5) * r + A4) * r + A3) * r + A2) * r + A1) * r + A0) / (((((((B7 * r + B6) * r + B5) * r + B4) * r + B3) * r + B2) * r + B1) * r + 1.0);
      } else {
        r = q < 0.0 ? u : 1.0 - u;
        r = Math.sqrt(-Math.log(r));
        if (r < split2) {
          r -= const2;
          ret = (((((((C7 * r + C6) * r + C5) * r + C4) * r + C3) * r + C2) * r + C1) * r + C0) / (((((((D7 * r + D6) * r + D5) * r + D4) * r + D3) * r + D2) * r + D1) * r + 1.0);
        } else {
          r -= split2;
          ret = (((((((E7 * r + E6) * r + E5) * r + E4) * r + E3) * r + E2) * r + E1) * r + E0) / (((((((F7 * r + F6) * r + F5) * r + F4) * r + F3) * r + F2) * r + F1) * r + 1.0);
        }
        if (q < 0.0) {
          return -ret;
        } else {
          return ret;
        }
      }
    };

    return normaldistribution;

  })();

  window.LetsBeRational.normaldistribution = new normaldistribution();

}).call(this);

(function() {
  var rationalcubic;

  rationalcubic = (function() {
    var DBL_EPSILON, DBL_MAX, DBL_MIN, _is_zero, constants, maximum_rational_cubic_control_parameter_value, minimum_rational_cubic_control_parameter_value;

    function rationalcubic() {}

    constants = window.LetsBeRational.constants;

    DBL_EPSILON = constants.DBL_EPSILON;

    DBL_MAX = constants.DBL_MAX;

    DBL_MIN = constants.DBL_MIN;

    minimum_rational_cubic_control_parameter_value = -(1 - Math.sqrt(DBL_EPSILON));

    maximum_rational_cubic_control_parameter_value = 2 / (DBL_EPSILON * DBL_EPSILON);

    _is_zero = function(x) {
      return Math.abs(x) < DBL_MIN;
    };

    rationalcubic.prototype.rational_cubic_control_parameter_to_fit_second_derivative_at_left_side = function(x_l, x_r, y_l, y_r, d_l, d_r, second_derivative_l) {
      var denominator, h, numerator;
      h = x_r - x_l;
      numerator = 0.5 * h * second_derivative_l + (d_r - d_l);
      if (_is_zero(numerator)) {
        return 0;
      }
      denominator = (y_r - y_l) / h - d_l;
      if (_is_zero(denominator)) {
        return maximum_rational_cubic_control_parameter_value(numerator > 0 ? void 0 : minimum_rational_cubic_control_parameter_value);
      }
      return numerator / denominator;
    };

    rationalcubic.prototype.minimum_rational_cubic_control_parameter = function(d_l, d_r, s, preferShapePreservationOverSmoothness) {
      var concave, convex, d_r_m_d_l, d_r_m_s, monotonic, r1, r2, s_m_d_l;
      monotonic = d_l * s >= 0 && d_r * s >= 0;
      convex = (d_l <= s && s <= d_r);
      concave = (d_l >= s && s >= d_r);
      if (!monotonic && !convex && !concave) {
        return minimum_rational_cubic_control_parameter_value;
      }
      d_r_m_d_l = d_r - d_l;
      d_r_m_s = d_r - s;
      s_m_d_l = s - d_l;
      r1 = -DBL_MAX;
      r2 = r1;
      if (monotonic) {
        if (!_is_zero(s)) {
          r1 = (d_r + d_l) / s;
        } else if (preferShapePreservationOverSmoothness) {
          r1 = maximum_rational_cubic_control_parameter_value;
        }
      }
      if (convex || concave) {
        if (!(_is_zero(s_m_d_l) || _is_zero(d_r_m_s))) {
          r2 = Math.max(Math.abs(d_r_m_d_l / d_r_m_s), Math.abs(d_r_m_d_l / s_m_d_l));
        } else if (preferShapePreservationOverSmoothness) {
          r2 = maximum_rational_cubic_control_parameter_value;
        }
      } else if (monotonic && preferShapePreservationOverSmoothness) {
        r2 = maximum_rational_cubic_control_parameter_value;
      }
      return Math.max(minimum_rational_cubic_control_parameter_value, Math.max(r1, r2));
    };

    rationalcubic.prototype.rational_cubic_control_parameter_to_fit_second_derivative_at_right_side = function(x_l, x_r, y_l, y_r, d_l, d_r, second_derivative_r) {
      var denominator, h, numerator;
      h = x_r - x_l;
      numerator = 0.5 * h * second_derivative_r + (d_r - d_l);
      if (_is_zero(numerator)) {
        return 0;
      }
      denominator = d_r - (y_r - y_l) / h;
      if (_is_zero(denominator)) {
        return maximum_rational_cubic_control_parameter_value(numerator > 0 ? void 0 : minimum_rational_cubic_control_parameter_value);
      }
      return numerator / denominator;
    };

    rationalcubic.prototype.convex_rational_cubic_control_parameter_to_fit_second_derivative_at_right_side = function(x_l, x_r, y_l, y_r, d_l, d_r, second_derivative_r, preferShapePreservationOverSmoothness) {
      var r, r_min;
      r = this.rational_cubic_control_parameter_to_fit_second_derivative_at_right_side(x_l, x_r, y_l, y_r, d_l, d_r, second_derivative_r);
      r_min = this.minimum_rational_cubic_control_parameter(d_l, d_r, (y_r - y_l) / (x_r - x_l), preferShapePreservationOverSmoothness);
      return Math.max(r, r_min);
    };

    rationalcubic.prototype.rational_cubic_interpolation = function(x, x_l, x_r, y_l, y_r, d_l, d_r, r) {
      var h, omt, omt2, t, t2;
      h = x_r - x_l;
      if (Math.abs(h) <= 0) {
        return 0.5 * (y_l + y_r);
      }
      t = (x - x_l) / h;
      if (r < maximum_rational_cubic_control_parameter_value) {
        t = (x - x_l) / h;
        omt = 1 - t;
        t2 = t * t;
        omt2 = omt * omt;
        return (y_r * t2 * t + (r * y_r - h * d_r) * t2 * omt + (r * y_l + h * d_l) * t * omt2 + y_l * omt2 * omt) / (1 + (r - 3) * t * omt);
      }
      return y_r * t + y_l * (1 - t);
    };

    rationalcubic.prototype.convex_rational_cubic_control_parameter_to_fit_second_derivative_at_left_side = function(x_l, x_r, y_l, y_r, d_l, d_r, second_derivative_l, preferShapePreservationOverSmoothness) {
      var r, r_min;
      r = this.rational_cubic_control_parameter_to_fit_second_derivative_at_left_side(x_l, x_r, y_l, y_r, d_l, d_r, second_derivative_l);
      r_min = this.minimum_rational_cubic_control_parameter(d_l, d_r, (y_r - y_l) / (x_r - x_l), preferShapePreservationOverSmoothness);
      return Math.max(r, r_min);
    };

    return rationalcubic;

  })();

  window.LetsBeRational.rationalcubic = new rationalcubic();

}).call(this);

(function() {
  var lets_be_rational;

  lets_be_rational = (function() {
    var DBL_EPSILON, DBL_MAX, DBL_MIN, DENORMALIZATION_CUTOFF, EIGHTH_ROOT_DBL_EPSILON, FOURTH_ROOT_DBL_EPSILON, ONE_OVER_SQRT_TWO, ONE_OVER_SQRT_TWO_PI, PI_OVER_SIX, SIXTEENTH_ROOT_DBL_EPSILON, SQRT_DBL_EPSILON, SQRT_DBL_MAX, SQRT_DBL_MIN, SQRT_ONE_OVER_THREE, SQRT_PI_OVER_TWO, SQRT_THREE, SQRT_TWO_PI, TWO_PI, TWO_PI_OVER_SQRT_TWENTY_SEVEN, VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_ABOVE_MAXIMUM, VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_BELOW_INTRINSIC, _asymptotic_expansion_of_normalized_black_call, _black, _compute_f_lower_map_and_first_two_derivatives, _compute_f_upper_map_and_first_two_derivatives, _householder_factor, _implied_volatility_from_a_transformed_rational_guess_with_limited_iterations, _inverse_f_lower_map, _inverse_f_upper_map, _is_below_horizon, _normalised_black, _normalised_black_call, _normalised_black_call_using_erfcx, _normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations, _normalised_intrinsic, _normalised_intrinsic_call, _normalised_vega, _normalized_black_call_using_norm_cdf, _small_t_expansion_of_normalized_black_call, _square, _unchecked_normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations, asymptotic_expansion_accuracy_threshold, constants, erf_cody, implied_volatility_maximum_iterations, normaldistribution, rationalcubic, small_t_expansion_of_normalized_black_threshold;

    function lets_be_rational() {}

    normaldistribution = window.LetsBeRational.normaldistribution;

    erf_cody = window.LetsBeRational.erf_cody;

    rationalcubic = window.LetsBeRational.rationalcubic;

    constants = window.LetsBeRational.constants;

    DBL_EPSILON = constants.DBL_EPSILON;

    DBL_MIN = constants.DBL_MIN;

    DBL_MAX = constants.DBL_MAX;

    SQRT_DBL_EPSILON = constants.SQRT_DBL_EPSILON;

    FOURTH_ROOT_DBL_EPSILON = constants.FOURTH_ROOT_DBL_EPSILON;

    EIGHTH_ROOT_DBL_EPSILON = constants.EIGHTH_ROOT_DBL_EPSILON;

    SIXTEENTH_ROOT_DBL_EPSILON = constants.SIXTEENTH_ROOT_DBL_EPSILON;

    SQRT_DBL_MIN = constants.SQRT_DBL_MIN;

    SQRT_DBL_MAX = constants.SQRT_DBL_MAX;

    DENORMALIZATION_CUTOFF = constants.DENORMALIZATION_CUTOFF;

    VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_BELOW_INTRINSIC = constants.VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_BELOW_INTRINSIC;

    VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_ABOVE_MAXIMUM = constants.VOLATILITY_VALUE_TO_SIGNAL_PRICE_IS_ABOVE_MAXIMUM;

    ONE_OVER_SQRT_TWO = constants.ONE_OVER_SQRT_TWO;

    ONE_OVER_SQRT_TWO_PI = constants.ONE_OVER_SQRT_TWO_PI;

    SQRT_TWO_PI = constants.SQRT_TWO_PI;

    TWO_PI = constants.TWO_PI;

    SQRT_PI_OVER_TWO = constants.SQRT_PI_OVER_TWO;

    SQRT_THREE = constants.SQRT_THREE;

    SQRT_ONE_OVER_THREE = constants.SQRT_ONE_OVER_THREE;

    TWO_PI_OVER_SQRT_TWENTY_SEVEN = constants.TWO_PI_OVER_SQRT_TWENTY_SEVEN;

    PI_OVER_SIX = constants.PI_OVER_SIX;

    implied_volatility_maximum_iterations = 2;

    asymptotic_expansion_accuracy_threshold = -10;

    small_t_expansion_of_normalized_black_threshold = 2 * SIXTEENTH_ROOT_DBL_EPSILON;

    _householder_factor = function(newton, halley, hh3) {

      /*
      
      :param newton:
      :param halley:
      :param hh3:
      
      :return:
       */
      return (1 + 0.5 * halley * newton) / (1 + newton * (halley + hh3 * newton / 6));
    };

    _compute_f_lower_map_and_first_two_derivatives = function(x, s) {

      /*
      
      :param x:
      :type x: float
      :param s:
      :type s: float
      
      :return:
      :rtype: float
       */
      var Phi, Phi2, ax, f, fp, fpp, phi, s2, y, z;
      ax = Math.abs(x);
      z = SQRT_ONE_OVER_THREE * ax / s;
      y = z * z;
      s2 = s * s;
      Phi = normaldistribution.norm_cdf(-z);
      phi = normaldistribution.norm_pdf(z);
      fpp = PI_OVER_SIX * y / (s2 * s) * Phi * (8 * SQRT_THREE * s * ax + (3 * s2 * (s2 - 8) - 8 * x * x) * Phi / phi) * Math.exp(2 * y + 0.25 * s2);
      if (_is_below_horizon(s)) {
        fp = 1;
        f = 0;
      } else {
        Phi2 = Phi * Phi;
        fp = TWO_PI * y * Phi2 * Math.exp(y + 0.125 * s * s);
        if (_is_below_horizon(x)) {
          f = 0;
        } else {
          f = TWO_PI_OVER_SQRT_TWENTY_SEVEN * ax * (Phi2 * Phi);
        }
      }
      return [f, fp, fpp];
    };

    _compute_f_upper_map_and_first_two_derivatives = function(x, s) {

      /*
      
      :param x:
      :type x: float
      :param s:
      :type s: float
      
      :return:
      :rtype: float
       */
      var f, fp, fpp, w;
      f = normaldistribution.norm_cdf(-0.5 * s);
      if (_is_below_horizon(x)) {
        fp = -0.5;
        fpp = 0;
      } else {
        w = _square(x / s);
        fp = -0.5 * Math.exp(0.5 * w);
        fpp = SQRT_PI_OVER_TWO * Math.exp(w + 0.125 * s * s) * w / s;
      }
      return [f, fp, fpp];
    };

    _square = function(x) {

      /*
      
      :param x:
      :type x: float
      :return:
      :rtype: float
       */
      return x * x;
    };

    _inverse_f_lower_map = function(x, f) {

      /*
      
      :param x:
      :type x: float
      :param f:
      :type f: float
      
      :return:
      :rtype: float
       */
      var is_below;
      is_below = _is_below_horizon(f);
      if (is_below) {
        return 0;
      } else {
        return Math.abs(x / (SQRT_THREE * normaldistribution.inverse_norm_cdf(Math.pow(f / (TWO_PI_OVER_SQRT_TWENTY_SEVEN * Math.abs(x)), 1.0 / 3.0))));
      }
    };

    _inverse_f_upper_map = function(f) {

      /*
      
      :param f:
      :type f: float
      
      :return:
      :rtype: float
       */
      return -2.0 * normaldistribution.inverse_norm_cdf(f);
    };

    _is_below_horizon = function(x) {

      /*
      This weeds out denormalized (a.k.a. 'subnormal') numbers.
      
      :param x:
      :type x: float
      
      :return:
      :rtype: bool
       */
      return Math.abs(x) < DENORMALIZATION_CUTOFF;
    };

    _normalized_black_call_using_norm_cdf = function(x, s) {

      /*
              b(x,s)  =  Φ(x/s+s/2)·Math.exp(x/2)  -   Φ(x/s-s/2)·Math.exp(-x/2)
                  =  Φ(h+t)·Math.exp(x/2)      -   Φ(h-t)·Math.exp(-x/2)
      with
                  h  =  x/s   and   t  =  s/2
      
      :param x:
      :type x: float
      :param s:
      :type s: float
      
      :return:
      :rtype: float
       */
      var b, b_max, h, t;
      h = x / s;
      t = 0.5 * s;
      b_max = Math.exp(0.5 * x);
      b = normaldistribution.norm_cdf(h + t) * b_max - normaldistribution.norm_cdf(h - t) / b_max;
      return Math.abs(Math.max(b, 0.0));
    };

    _asymptotic_expansion_of_normalized_black_call = function(h, t) {

      /*
      Asymptotic expansion of
      
                   b  =  Φ(h+t)·Math.exp(x/2) - Φ(h-t)·Math.exp(-x/2)
      with
                   h  =  x/s   and   t  =  s/2
      which makes
                   b  =  Φ(h+t)·Math.exp(h·t) - Φ(h-t)·Math.exp(-h·t)
      
                         Math.exp(-(h²+t²)/2)
                      =  ---------------  ·  [ Y(h+t) - Y(h-t) ]
                             √(2π)
      with
                Y(z) := Φ(z)/φ(z)
      
      for large negative (t-|h|) by the aid of Abramowitz & Stegun (26.2.12) where Φ(z) = φ(z)/|z|·[1-1/z^2+...].
      We define
                          r
              A(h,t) :=  --- · [ Y(h+t) - Y(h-t) ]
                          t
      
      with r := (h+t)·(h-t) and give an expansion for A(h,t) in q:=(h/r)² expressed in terms of e:=(t/h)².0
      
      :param h:
      :type h: float
      :param t:
      :type t: float
      
      :return:
      :rtype: float
       */
      var asymptotic_expansion_sum, b, e, q, r;
      e = (t / h) * (t / h);
      r = (h + t) * (h - t);
      q = (h / r) * (h / r);
      asymptotic_expansion_sum = 2.0 + q * (-6.0e0 - 2.0 * e + 3.0 * q * (1.0e1 + e * (2.0e1 + 2.0 * e) + 5.0 * q * (-1.4e1 + e * (-7.0e1 + e * (-4.2e1 - 2.0 * e)) + 7.0 * q * (1.8e1 + e * (1.68e2 + e * (2.52e2 + e * (7.2e1 + 2.0 * e))) + 9.0 * q * (-2.2e1 + e * (-3.3e2 + e * (-9.24e2 + e * (-6.6e2 + e * (-1.1e2 - 2.0 * e)))) + 1.1e1 * q * (2.6e1 + e * (5.72e2 + e * (2.574e3 + e * (3.432e3 + e * (1.43e3 + e * (1.56e2 + 2.0 * e))))) + 1.3e1 * q * (-3.0e1 + e * (-9.1e2 + e * (-6.006e3 + e * (-1.287e4 + e * (-1.001e4 + e * (-2.73e3 + e * (-2.1e2 - 2.0 * e)))))) + 1.5e1 * q * (3.4e1 + e * (1.36e3 + e * (1.2376e4 + e * (3.8896e4 + e * (4.862e4 + e * (2.4752e4 + e * (4.76e3 + e * (2.72e2 + 2.0 * e))))))) + 1.7e1 * q * (-3.8e1 + e * (-1.938e3 + e * (-2.3256e4 + e * (-1.00776e5 + e * (-1.84756e5 + e * (-1.51164e5 + e * (-5.4264e4 + e * (-7.752e3 + e * (-3.42e2 - 2.0 * e)))))))) + 1.9e1 * q * (4.2e1 + e * (2.66e3 + e * (4.0698e4 + e * (2.3256e5 + e * (5.8786e5 + e * (7.05432e5 + e * (4.0698e5 + e * (1.08528e5 + e * (1.197e4 + e * (4.2e2 + 2.0 * e))))))))) + 2.1e1 * q * (-4.6e1 + e * (-3.542e3 + e * (-6.7298e4 + e * (-4.90314e5 + e * (-1.63438e6 + e * (-2.704156e6 + e * (-2.288132e6 + e * (-9.80628e5 + e * (-2.01894e5 + e * (-1.771e4 + e * (-5.06e2 - 2.0 * e)))))))))) + 2.3e1 * q * (5.0e1 + e * (4.6e3 + e * (1.0626e5 + e * (9.614e5 + e * (4.08595e6 + e * (8.9148e6 + e * (1.04006e7 + e * (6.53752e6 + e * (2.16315e6 + e * (3.542e5 + e * (2.53e4 + e * (6.0e2 + 2.0 * e))))))))))) + 2.5e1 * q * (-5.4e1 + e * (-5.85e3 + e * (-1.6146e5 + e * (-1.77606e6 + e * (-9.37365e6 + e * (-2.607579e7 + e * (-4.01166e7 + e * (-3.476772e7 + e * (-1.687257e7 + e * (-4.44015e6 + e * (-5.9202e5 + e * (-3.51e4 + e * (-7.02e2 - 2.0 * e)))))))))))) + 2.7e1 * q * (5.8e1 + e * (7.308e3 + e * (2.3751e5 + e * (3.12156e6 + e * (2.003001e7 + e * (6.919458e7 + e * (1.3572783e8 + e * (1.5511752e8 + e * (1.0379187e8 + e * (4.006002e7 + e * (8.58429e6 + e * (9.5004e5 + e * (4.7502e4 + e * (8.12e2 + 2.0 * e))))))))))))) + 2.9e1 * q * (-6.2e1 + e * (-8.99e3 + e * (-3.39822e5 + e * (-5.25915e6 + e * (-4.032015e7 + e * (-1.6934463e8 + e * (-4.1250615e8 + e * (-6.0108039e8 + e * (-5.3036505e8 + e * (-2.8224105e8 + e * (-8.870433e7 + e * (-1.577745e7 + e * (-1.472562e6 + e * (-6.293e4 + e * (-9.3e2 - 2.0 * e)))))))))))))) + 3.1e1 * q * (6.6e1 + e * (1.0912e4 + e * (4.74672e5 + e * (8.544096e6 + e * (7.71342e7 + e * (3.8707344e8 + e * (1.14633288e9 + e * (2.07431664e9 + e * (2.33360622e9 + e * (1.6376184e9 + e * (7.0963464e8 + e * (1.8512208e8 + e * (2.7768312e7 + e * (2.215136e6 + e * (8.184e4 + e * (1.056e3 + 2.0 * e))))))))))))))) + 3.3e1 * (-7.0e1 + e * (-1.309e4 + e * (-6.49264e5 + e * (-1.344904e7 + e * (-1.4121492e8 + e * (-8.344518e8 + e * (-2.9526756e9 + e * (-6.49588632e9 + e * (-9.0751353e9 + e * (-8.1198579e9 + e * (-4.6399188e9 + e * (-1.6689036e9 + e * (-3.67158792e8 + e * (-4.707164e7 + e * (-3.24632e6 + e * (-1.0472e5 + e * (-1.19e3 - 2.0 * e))))))))))))))))) * q))))))))))))))));
      b = ONE_OVER_SQRT_TWO_PI * Math.exp(-0.5 * (h * h + t * t)) * (t / r) * asymptotic_expansion_sum;
      return Math.abs(Math.max(b, 0.0));
    };

    _small_t_expansion_of_normalized_black_call = function(h, t) {

      /*
      Calculation of
      
                   b  =  Φ(h+t)·Math.exp(h·t) - Φ(h-t)·Math.exp(-h·t)
      
                         Math.exp(-(h²+t²)/2)
                      =  --------------- ·  [ Y(h+t) - Y(h-t) ]
                             √(2π)
      with
                Y(z) := Φ(z)/φ(z)
      
      using an expansion of Y(h+t)-Y(h-t) for small t to twelvth order in t.
      Theoretically accurate to (better than) precision  ε = 2.23E-16  when  h<=0  and  t < τ  with  τ := 2·ε^(1/16) ≈ 0.21.
      The main bottleneck for precision is the coefficient a:=1+h·Y(h) when |h|>1.0
      
      :param h:
      :type h: float
      :param t:
      :type t: float
      
      :return:
      :rtype: float
       */
      var a, b, expansion, h2, w;
      a = 1 + h * (0.5 * SQRT_TWO_PI) * erf_cody.erfcx_cody(-ONE_OVER_SQRT_TWO * h);
      w = t * t;
      h2 = h * h;
      expansion = 2 * t * (a + w * ((-1 + 3 * a + a * h2) / 6 + w * ((-7 + 15 * a + h2 * (-1 + 10 * a + a * h2)) / 120 + w * ((-57 + 105 * a + h2 * (-18 + 105 * a + h2 * (-1 + 21 * a + a * h2))) / 5040 + w * ((-561 + 945 * a + h2 * (-285 + 1260 * a + h2 * (-33 + 378 * a + h2 * (-1 + 36 * a + a * h2)))) / 362880 + w * ((-6555 + 10395 * a + h2 * (-4680 + 17325 * a + h2 * (-840 + 6930 * a + h2 * (-52 + 990 * a + h2 * (-1 + 55 * a + a * h2))))) / 39916800 + ((-89055 + 135135 * a + h2 * (-82845 + 270270 * a + h2 * (-20370 + 135135 * a + h2 * (-1926 + 25740 * a + h2 * (-75 + 2145 * a + h2 * (-1 + 78 * a + a * h2)))))) * w) / 6227020800.0))))));
      b = ONE_OVER_SQRT_TWO_PI * Math.exp(-0.5 * (h * h + t * t)) * expansion;
      return Math.abs(Math.max(b, 0.0));
    };

    _normalised_black_call_using_erfcx = function(h, t) {

      /*
      Given h = x/s and t = s/2, the normalised Black function can be written as
      
          b(x,s)  =  Φ(x/s+s/2)·Math.exp(x/2)  -   Φ(x/s-s/2)·Math.exp(-x/2)
                  =  Φ(h+t)·Math.exp(h·t)      -   Φ(h-t)·Math.exp(-h·t).0                     (*)
      
      It is mentioned in section 4 (and discussion of figures 2 and 3) of George Marsaglia's article "Evaluating the
      Normal Distribution" (available at http:#www.jstatsoft.org/v11/a05/paper) that the error of any cumulative normal
      function Φ(z) is dominated by the hardware (or compiler implementation) accuracy of Math.exp(-z²/2) which is not
      reliably more than 14 digits when z is large. The accuracy of Φ(z) typically starts coming down to 14 digits when
      z is around -8. For the (normalised) Black function, as above in (*), this means that we are subtracting two terms
      that are each products of terms with about 14 digits of accuracy. The net result, in each of the products, is even
      less accuracy, and then we are taking the difference of these terms, resulting in even less accuracy. When we are
      using the asymptotic expansion asymptotic_expansion_of_normalized_black_call() invoked in the second branch at the
      beginning of this function, we are using only *one* exponential instead of 4, and this improves accuracy. It
      actually improves it a bit more than you would expect from the above logic, namely, almost the full two missing
      digits (in 64 bit IEEE floating point).  Unfortunately, going higher order in the asymptotic expansion will not
      enable us to gain more accuracy (by extending the range in which we could use the expansion) since the asymptotic
      expansion, being a divergent series, can never gain 16 digits of accuracy for z=-8 or just below. The best you can
      get is about 15 digits (just), for about 35 terms in the series (26.2.12), which would result in an prohibitively
      long expression in function asymptotic expansion asymptotic_expansion_of_normalized_black_call(). In this last branch,
      here, we therefore take a different tack as follows.
          The "scaled complementary error function" is defined as erfcx(z) = Math.exp(z²)·erfc(z). Cody's implementation of this
      function as published in "Rational Chebyshev approximations for the error function", W. J. Cody, Math. Comp., 1969, pp.
      631-638, uses rational functions that theoretically approximates erfcx(x) to at least 18 significant decimal digits,
      *without* the use of the exponential function when x>4, which translates to about z<-5.66 in Φ(z). To make use of it,
      we write
                  Φ(z) = Math.exp(-z²/2)·erfcx(-z/√2)/2
      
      to transform the normalised black function to
      
        b   =  ½ · Math.exp(-½(h²+t²)) · [ erfcx(-(h+t)/√2) -  erfcx(-(h-t)/√2) ]
      
      which now involves only one exponential, instead of three, when |h|+|t| > 5.66 , and the difference inside the
      square bracket is between the evaluation of two rational functions, which, typically, according to Marsaglia,
      retains the full 16 digits of accuracy (or just a little less than that).
      
      :param h:
      :type h: float
      :param t:
      :type t: float
      
      :return:
      :rtype: float
       */
      var b;
      b = 0.5 * Math.exp(-0.5 * (h * h + t * t)) * (erf_cody.erfcx_cody(-ONE_OVER_SQRT_TWO * (h + t)) - erf_cody.erfcx_cody(-ONE_OVER_SQRT_TWO * (h - t)));
      return Math.abs(Math.max(b, 0.0));
    };

    _unchecked_normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(beta, x, q, N) {

      /*
      See http://en.wikipedia.org/wiki/Householder%27s_method for a detailed explanation of the third order Householder iteration.
      
      Given the objective function g(s) whose root x such that 0 = g(s) we seek, iterate
      
          s_n+1  =  s_n  -  (g/g') · [ 1 - (g''/g')·(g/g') ] / [ 1 - (g/g')·( (g''/g') - (g'''/g')·(g/g')/6 ) ]
      
      Denoting  newton:=-(g/g'), halley:=(g''/g'), and hh3:=(g'''/g'), this reads
      
          s_n+1  =  s_n  +  newton · [ 1 + halley·newton/2 ] / [ 1 + newton·( halley + hh3·newton/6 ) ]
      
      
      NOTE that this function returns 0 when beta<intrinsic without any safety checks.
      
      :param beta:
      :type beta: float
      :param x:
      :type x: float
      :param q: q=±1
      :type q:
      :param N:
      :type N: int
      
      :return:
      :rtype: float
       */
      var b, b_c, b_h, b_halley, b_hh3, b_l, b_max, b_max_minus_b, bp, bpob, d2_f_lower_map_l_d_beta2, d2_f_upper_map_h_d_beta2, d_f_lower_map_l_d_beta, d_f_upper_map_h_d_beta, direction_reversal_count, ds, ds_previous, f, f_lower_map_l, f_upper_map_h, fl, fu, g, gp, h, halley, hh3, iterations, ln_b, ln_beta, newton, r_hh, r_hm, r_ll, r_lm, s, s_c, s_h, s_l, s_left, s_right, t, v_c, v_h, v_l;
      if (q * x > 0) {
        beta = Math.abs(Math.max(beta - _normalised_intrinsic(x, q), 0.0));
        q = -q;
      }
      if (q < 0) {
        x = -x;
        q = -q;
      }
      if (beta <= 0) {
        return 0;
      }
      if (beta < DENORMALIZATION_CUTOFF) {
        return 0;
      }
      b_max = Math.exp(0.5 * x);
      if (beta >= b_max) {
        throw new AboveMaximumError();
      }
      iterations = 0;
      direction_reversal_count = 0;
      f = -DBL_MAX;
      s = -DBL_MAX;
      ds = s;
      ds_previous = 0;
      s_left = DBL_MIN;
      s_right = DBL_MAX;
      s_c = Math.sqrt(Math.abs(2 * x));
      b_c = _normalised_black_call(x, s_c);
      v_c = _normalised_vega(x, s_c);
      if (beta < b_c) {
        s_l = s_c - b_c / v_c;
        b_l = _normalised_black_call(x, s_l);
        if (beta < b_l) {
          fl = _compute_f_lower_map_and_first_two_derivatives(x, s_l);
          f_lower_map_l = fl[0];
          d_f_lower_map_l_d_beta = fl[1];
          d2_f_lower_map_l_d_beta2 = fl[2];
          r_ll = rationalcubic.convex_rational_cubic_control_parameter_to_fit_second_derivative_at_right_side(0.0, b_l, 0.0, f_lower_map_l, 1.0, d_f_lower_map_l_d_beta, d2_f_lower_map_l_d_beta2, true);
          f = rationalcubic.rational_cubic_interpolation(beta, 0.0, b_l, 0.0, f_lower_map_l, 1.0, d_f_lower_map_l_d_beta, r_ll);
          if (f <= 0) {
            t = beta / b_l;
            f = (f_lower_map_l * t + b_l * (1 - t)) * t;
          }
          s = _inverse_f_lower_map(x, f);
          s_right = s_l;
          while (iterations < N && Math.abs(ds) > DBL_EPSILON * s) {
            if (ds * ds_previous < 0) {
              direction_reversal_count += 1;
            }
            if (iterations > 0 && (3 === direction_reversal_count || !(s > s_left && s < s_right))) {
              s = 0.5 * (s_left + s_right);
              if (s_right - s_left <= DBL_EPSILON * s) {
                break;
              }
              direction_reversal_count = 0;
              ds = 0;
            }
            ds_previous = ds;
            b = _normalised_black_call(x, s);
            bp = _normalised_vega(x, s);
            if (b > beta && s < s_right) {
              s_right = s;
            } else if (b < beta && s > s_left) {
              s_left = s;
            }
            if (b <= 0 || bp <= 0) {
              ds = 0.5 * (s_left + s_right) - s;
            } else {
              ln_b = Math.log(b);
              ln_beta = Math.log(beta);
              bpob = bp / b;
              h = x / s;
              b_halley = h * h / s - s / 4;
              newton = (ln_beta - ln_b) * ln_b / ln_beta / bpob;
              halley = b_halley - bpob * (1 + 2 / ln_b);
              b_hh3 = b_halley * b_halley - 3 * _square(h / s) - 0.25;
              hh3 = b_hh3 + 2 * _square(bpob) * (1 + 3 / ln_b * (1 + 1 / ln_b)) - 3 * b_halley * bpob * (1 + 2 / ln_b);
              ds = newton * _householder_factor(newton, halley, hh3);
            }
            ds = Math.max(-0.5 * s, ds);
            s += ds;
            iterations += 1;
          }
          return s;
        } else {
          v_l = _normalised_vega(x, s_l);
          r_lm = rationalcubic.convex_rational_cubic_control_parameter_to_fit_second_derivative_at_right_side(b_l, b_c, s_l, s_c, 1 / v_l, 1 / v_c, 0.0, false);
          s = rationalcubic.rational_cubic_interpolation(beta, b_l, b_c, s_l, s_c, 1 / v_l, 1 / v_c, r_lm);
          s_left = s_l;
          s_right = s_c;
        }
      } else {
        s_h = v_c > DBL_MIN ? s_c + (b_max - b_c) / v_c : s_c;
        b_h = _normalised_black_call(x, s_h);
        if (beta <= b_h) {
          v_h = _normalised_vega(x, s_h);
          r_hm = rationalcubic.convex_rational_cubic_control_parameter_to_fit_second_derivative_at_left_side(b_c, b_h, s_c, s_h, 1 / v_c, 1 / v_h, 0.0, false);
          s = rationalcubic.rational_cubic_interpolation(beta, b_c, b_h, s_c, s_h, 1 / v_c, 1 / v_h, r_hm);
          s_left = s_c;
          s_right = s_h;
        } else {
          fu = _compute_f_upper_map_and_first_two_derivatives(x, s_h);
          f_upper_map_h = fu[0];
          d_f_upper_map_h_d_beta = fu[1];
          d2_f_upper_map_h_d_beta2 = fu[2];
          if (d2_f_upper_map_h_d_beta2 > -SQRT_DBL_MAX && d2_f_upper_map_h_d_beta2 < SQRT_DBL_MAX) {
            r_hh = rationalcubic.convex_rational_cubic_control_parameter_to_fit_second_derivative_at_left_side(b_h, b_max, f_upper_map_h, 0.0, d_f_upper_map_h_d_beta, -0.5, d2_f_upper_map_h_d_beta2, true);
            f = rationalcubic.rational_cubic_interpolation(beta, b_h, b_max, f_upper_map_h, 0.0, d_f_upper_map_h_d_beta, -0.5, r_hh);
          }
          if (f <= 0) {
            h = b_max - b_h;
            t = (beta - b_h) / h;
            f = (f_upper_map_h * (1 - t) + 0.5 * h * t) * (1 - t);
          }
          s = _inverse_f_upper_map(f);
          s_left = s_h;
          if (beta > 0.5 * b_max) {
            while (iterations < N && Math.abs(ds) > DBL_EPSILON * s) {
              if (ds * ds_previous < 0) {
                direction_reversal_count += 1;
              }
              if (iterations > 0 && (3 === direction_reversal_count || !(s > s_left && s < s_right))) {
                s = 0.5 * (s_left + s_right);
              }
              if (s_right - s_left <= DBL_EPSILON * s) {
                break;
              }
              direction_reversal_count = 0;
              ds = 0;
              ds_previous = ds;
              b = _normalised_black_call(x, s);
              bp = _normalised_vega(x, s);
              if (b > beta && s < s_right) {
                s_right = s;
              } else if (b < beta && s > s_left) {
                s_left = s;
              }
              if (b >= b_max || bp <= DBL_MIN) {
                ds = 0.5 * (s_left + s_right) - s;
              } else {
                b_max_minus_b = b_max - b;
                g = Math.log((b_max - beta) / b_max_minus_b);
                gp = bp / b_max_minus_b;
                b_halley = _square(x / s) / s - s / 4;
                b_hh3 = b_halley * b_halley - 3 * _square(x / (s * s)) - 0.25;
                newton = -g / gp;
                halley = b_halley + gp;
                hh3 = b_hh3 + gp * (2 * gp + 3 * b_halley);
                ds = newton * _householder_factor(newton, halley, hh3);
              }
              ds = Math.max(-0.5 * s, ds);
              s += ds;
              iterations += 1;
            }
            return s;
          }
        }
      }
      while (iterations < N && Math.abs(ds) > DBL_EPSILON * s) {
        if (ds * ds_previous < 0) {
          direction_reversal_count += 1;
        }
        if (iterations > 0 && (3 === direction_reversal_count || !(s > s_left && s < s_right))) {
          s = 0.5 * (s_left + s_right);
          if (s_right - s_left <= DBL_EPSILON * s) {
            break;
          }
          direction_reversal_count = 0;
          ds = 0;
        }
        ds_previous = ds;
        b = _normalised_black_call(x, s);
        bp = _normalised_vega(x, s);
        if (b > beta && s < s_right) {
          s_right = s;
        } else if (b < beta && s > s_left) {
          s_left = s;
        }
        newton = (beta - b) / bp;
        halley = _square(x / s) / s - s / 4;
        hh3 = halley * halley - 3 * _square(x / (s * s)) - 0.25;
        ds = Math.max(-0.5 * s, newton * _householder_factor(newton, halley, hh3));
        s += ds;
        iterations += 1;
      }
      return s;
    };

    lets_be_rational.prototype.normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(beta, x, q, N) {
      return _normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(beta, x, q, N);
    };

    _normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(beta, x, q, N) {

      /*
      
      :param beta:
      :type beta: float
      :param x:
      :type x: float
      :param q: q=±1
      :type q: float
      :param N:
      :type N: int
      
      :return:
       */
      if (q * x > 0) {
        beta -= _normalised_intrinsic(x, q);
        q = -q;
      }
      if (beta < 0) {
        throw new BelowIntrinsicError();
      }
      return _unchecked_normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(beta, x, q, N);
    };

    lets_be_rational.prototype.implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(price, F, K, T, q, N) {
      return _implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(price, F, K, T, q, N);
    };

    _implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(price, F, K, T, q, N) {

      /*
      
      :param price:
      :type price: float
      :param F:
      :type F: float
      :param K:
      :type K: float
      :param T:
      :type T: float
      :param q: q=±1
      :type q:float
      :param N:
      :type N:int
      
      :return:
      :rtype: float
       */
      var intrinsic, max_price, x;
      intrinsic = Math.abs(Math.max((q < 0 ? K - F : F - K), 0.0));
      if (price < intrinsic) {
        throw new BelowIntrinsicError();
      }
      max_price = q < 0 ? K : F;
      if (price >= max_price) {
        throw new AboveMaximumError();
      }
      x = Math.log(F / K);
      if (q * x > 0) {
        price = Math.abs(Math.max(price - intrinsic, 0.0));
        q = -q;
      }
      return _unchecked_normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(price / (Math.sqrt(F) * Math.sqrt(K)), x, q, N) / Math.sqrt(T);
    };

    lets_be_rational.prototype.normalised_implied_volatility_from_a_transformed_rational_guess = function(beta, x, q) {

      /*
      
      :param beta:
      :type beta: float
      :param x:
      :type x: float
      :param q:
      :type q: float
      
      :return:
      :rtype: float
       */
      return _normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(beta, x, q, implied_volatility_maximum_iterations);
    };

    lets_be_rational.prototype.implied_volatility_from_a_transformed_rational_guess = function(price, F, K, T, q) {

      /*
      
      :param price:
      :type price: float
      :param F:
      :type F: float
      :param K:
      :type K: float
      :param T:
      :type T: float
      :param q:
      :type q: float
      
      :return:
      :rtype: float
       */
      return _implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(price, F, K, T, q, implied_volatility_maximum_iterations);
    };

    lets_be_rational.prototype.normalised_vega = function(x, s) {
      return _normalised_vega(x, s);
    };

    _normalised_vega = function(x, s) {

      /*
      
      :param x:
      :type x: float
      :param s:
      :type s: float
      
      :return:
      :rtype
       */
      var ax;
      ax = Math.abs(x);
      if (ax <= 0) {
        return ONE_OVER_SQRT_TWO_PI * Math.exp(-0.125 * s * s);
      } else {
        if (s <= 0 || s <= ax * SQRT_DBL_MIN) {
          return 0;
        } else {
          return ONE_OVER_SQRT_TWO_PI * Math.exp(-0.5 * (_square(x / s) + _square(0.5 * s)));
        }
      }
    };

    _normalised_intrinsic = function(x, q) {

      /*
      
      :param x:
      :type x: float
      :param q:
      :type q: float
      
      :return:
      :rtype: float
       */
      var b_max, one_over_b_max, x2;
      if (q * x <= 0) {
        return 0;
      }
      x2 = x * x;
      if (x2 < 98 * FOURTH_ROOT_DBL_EPSILON) {
        return Math.abs(Math.max((q < 0 ? -1 : 1) * x * (1 + x2 * ((1.0 / 24.0) + x2 * ((1.0 / 1920.0) + x2 * ((1.0 / 322560.0) + (1.0 / 92897280.0) * x2)))), 0.0));
      }
      b_max = Math.exp(0.5 * x);
      one_over_b_max = 1 / b_max;
      return Math.abs(Math.max((q < 0 ? -1 : 1) * (b_max - one_over_b_max), 0.0));
    };

    _normalised_intrinsic_call = function(x) {

      /*
      
      :param x:
      :type x: float
      
      :return:
      :rtype: float
       */
      return _normalised_intrinsic(x, 1);
    };

    lets_be_rational.prototype.normalised_black_call = function(x, s) {
      return _normalised_black_call(x, s);
    };

    _normalised_black_call = function(x, s) {

      /*
      
      :param x:
      :type x: float
      :param s:
      :type x: float
      
      :return:
      :rtype: float
       */
      var ax;
      if (x > 0) {
        return _normalised_intrinsic_call(x) + _normalised_black_call(-x, s);
      }
      ax = Math.abs(x);
      if (s <= ax * DENORMALIZATION_CUTOFF) {
        return _normalised_intrinsic_call(x);
      }
      if (x < s * asymptotic_expansion_accuracy_threshold && 0.5 * s * s + x < s * (small_t_expansion_of_normalized_black_threshold + asymptotic_expansion_accuracy_threshold)) {
        return _asymptotic_expansion_of_normalized_black_call(x / s, 0.5 * s);
      }
      if (0.5 * s < small_t_expansion_of_normalized_black_threshold) {
        return _small_t_expansion_of_normalized_black_call(x / s, 0.5 * s);
      }
      if (x + 0.5 * s * s > s * 0.85) {
        return _normalized_black_call_using_norm_cdf(x, s);
      }
      return _normalised_black_call_using_erfcx(x / s, 0.5 * s);
    };

    lets_be_rational.prototype.normalised_black = function(x, s, q) {
      return _normalised_black(x, s, q);
    };

    _normalised_black = function(x, s, q) {

      /*
      
      :param x:
      :type x: float
      :param s:
      :type s: float
      :param q: q=±1
      :type q: float
      
      :return:
      :rtype: float
       */
      return _normalised_black_call((q < 0 ? -x : x), s);
    };

    lets_be_rational.prototype.black = function(F, K, sigma, T, q) {
      return _black(F, K, sigma, T, q);
    };

    _black = function(F, K, sigma, T, q) {

      /*
      
      :param F:
      :type F: float
      :param K:
      :type K: float
      :param sigma:
      :type sigma: float
      :param T:
      :type T: float
      :param q: q=±1
      :type q: float
      
      :return:
      :rtype: float
       */
      var intrinsic;
      intrinsic = Math.abs(Math.max((q < 0 ? K - F : F - K), 0.0));
      if (q * (F - K) > 0) {
        return intrinsic + _black(F, K, sigma, T, -q);
      }
      return Math.max(intrinsic, (Math.sqrt(F) * Math.sqrt(K)) * _normalised_black(Math.log(F / K), sigma * Math.sqrt(T), q));
    };

    return lets_be_rational;

  })();

  window.LetsBeRational.lets_be_rational = new lets_be_rational();

}).call(this);

(function() {
  var js_lets_be_rational;

  js_lets_be_rational = (function() {
    var getLetsBeRational, lets_be_rational, normaldistribution;

    function js_lets_be_rational() {}

    lets_be_rational = window.LetsBeRational.lets_be_rational;

    normaldistribution = window.LetsBeRational.normaldistribution;

    getLetsBeRational = function() {
      if ((typeof lets_be_rational === "undefined" && lets_be_rational === null)) {
        lets_be_rational = new lets_be_rational();
      }
      return lets_be_rational;
    };

    js_lets_be_rational.prototype.black = function(F, K, sigma, T, q) {
      return getLetsBeRational().black(F, K, sigma, T, q);
    };

    js_lets_be_rational.prototype.implied_volatility_from_a_transformed_rational_guess = function(price, F, K, T, q) {
      return getLetsBeRational().implied_volatility_from_a_transformed_rational_guess(price, F, K, T, q);
    };

    js_lets_be_rational.prototype.implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(price, F, K, T, q, N) {
      return getLetsBeRational().implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(price, F, K, T, q, N);
    };

    js_lets_be_rational.prototype.normalised_black = function(x, s, q) {
      return getLetsBeRational().normalised_black(x, s, q);
    };

    js_lets_be_rational.prototype.normalised_black_call = function(x, s) {
      return getLetsBeRational().normalised_black_call(x, s);
    };

    js_lets_be_rational.prototype.normalised_implied_volatility_from_a_transformed_rational_guess = function(beta, x, q) {
      return getLetsBeRational().normalised_implied_volatility_from_a_transformed_rational_guess(beta, x, q);
    };

    js_lets_be_rational.prototype.normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations = function(beta, x, q, N) {
      return getLetsBeRational().normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(beta, x, q, N);
    };

    js_lets_be_rational.prototype.normalised_vega = function(x, s) {
      return getLetsBeRational().normalised_vega(x, s);
    };

    js_lets_be_rational.prototype.norm_cdf = function(z) {
      return normaldistribution.norm_cdf(z);
    };

    return js_lets_be_rational;

  })();

  window.js_lets_be_rational = new js_lets_be_rational();

}).call(this);
