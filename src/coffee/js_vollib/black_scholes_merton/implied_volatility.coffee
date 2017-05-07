class ImpliedVolatility

  helpers = js_vollib.helpers
  binary_flag = helpers.binary_flag
  PriceIsAboveMaximum = helpers.exceptions.PriceIsAboveMaximum
  PriceIsBelowIntrinsic = helpers.exceptions.PriceIsBelowIntrinsic

  FLOAT_MAX = helpers.constants.FLOAT_MAX
  MINUS_FLOAT_MAX = helpers.constants.MINUS_FLOAT_MAX

  forward_price = helpers.forward_price

  iv = js_lets_be_rational.implied_volatility_from_a_transformed_rational_guess

  @implied_volatility: (price, S, K, t, r, q, flag) ->
    deflater = Math.exp(-r * t)
    undiscounted_option_price = price / deflater
    F = S * Math.exp((r-q)*t)
    try
      sigma_calc = iv(undiscounted_option_price, F, K, t, binary_flag[flag])

      if sigma_calc == FLOAT_MAX
        throw new PriceIsAboveMaximum()
      else if sigma_calc == MINUS_FLOAT_MAX
        throw new PriceIsBelowIntrinsic()
      return sigma_calc
    catch error
      if error instanceof js_lets_be_rational.AboveMaximumError
        throw new PriceIsAboveMaximum()
      else if error instanceof js_lets_be_rational.BelowIntrinsicError
        throw new PriceIsBelowIntrinsic()
      else
        throw error

js_vollib.black_scholes_merton.implied_volatility = ImpliedVolatility