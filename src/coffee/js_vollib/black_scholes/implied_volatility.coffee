class ImpliedVolatility

  helpers = js_vollib.helpers
  binary_flag = helpers.binary_flag
  PriceIsAboveMaximum = helpers.exceptions.PriceIsAboveMaximum
  PriceIsBelowIntrinsic = helpers.exceptions.PriceIsBelowIntrinsic

  FLOAT_MAX = helpers.constants.FLOAT_MAX
  MINUS_FLOAT_MAX = helpers.constants.MINUS_FLOAT_MAX

  forward_price = helpers.forward_price

  iv = js_lets_be_rational.implied_volatility_from_a_transformed_rational_guess

  @implied_volatility: (price, S, K, t, r, flag) ->
    deflater = Math.exp(-r * t)
    undiscounted_option_price = price / deflater
    F = forward_price(S, t, r)
    sigma_calc = iv(undiscounted_option_price, F, K, t, binary_flag[flag])
    if sigma_calc == FLOAT_MAX
      throw PriceIsAboveMaximum()
    else if sigma_calc == MINUS_FLOAT_MAX
      throw PriceIsBelowIntrinsic()
    return sigma_calc

js_vollib.black_scholes.implied_volatility = ImpliedVolatility