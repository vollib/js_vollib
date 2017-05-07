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
      var F, deflater, error, sigma_calc, undiscounted_option_price;
      deflater = Math.exp(-r * t);
      undiscounted_option_price = price / deflater;
      F = forward_price(S, t, r);
      try {
        sigma_calc = iv(undiscounted_option_price, F, K, t, binary_flag[flag]);
        if (sigma_calc === FLOAT_MAX) {
          throw new PriceIsAboveMaximum();
        } else if (sigma_calc === MINUS_FLOAT_MAX) {
          throw new PriceIsBelowIntrinsic();
        }
        return sigma_calc;
      } catch (error1) {
        error = error1;
        if (error instanceof js_lets_be_rational.AboveMaximumError) {
          throw new PriceIsAboveMaximum();
        } else if (error instanceof js_lets_be_rational.BelowIntrinsicError) {
          throw new PriceIsBelowIntrinsic();
        } else {
          throw error;
        }
      }
    };

    return ImpliedVolatility;

  })();

  js_vollib.black_scholes.implied_volatility = ImpliedVolatility;

}).call(this);
