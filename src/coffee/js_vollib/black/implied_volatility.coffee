class ImpliedVolatility

  binary_flag = js_vollib.helpers.binary_flag
  PriceIsAboveMaximum = js_vollib.helpers.exceptions.PriceIsAboveMaximum
  PriceIsBelowIntrinsic = js_vollib.helpers.exceptions.PriceIsBelowIntrinsic

  FLOAT_MAX = js_vollib.helpers.constants.FLOAT_MAX
  MINUS_FLOAT_MAX = js_vollib.helpers.constants.MINUS_FLOAT_MAX

  lets_be_rational = js_lets_be_rational

  @implied_volatility_of_discounted_option_price: (discounted_option_price, F, K, r, t, flag) ->
    deflater = Math.exp(-r * t)
    undiscounted_option_price = discounted_option_price / deflater

    try
      sigma_calc = js_lets_be_rational.implied_volatility_from_a_transformed_rational_guess(
        undiscounted_option_price,
        F,
        K,
        t,
        binary_flag[flag]
      )

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

  @implied_volatility: (discounted_option_price, F, K, r, t, flag) ->
    return ImpliedVolatility.implied_volatility_of_discounted_option_price(discounted_option_price, F, K, r, t, flag)

  @normalised_implied_volatility: (beta, x, flag) ->
    q = binary_flag[flag]
    return lets_be_rational.normalised_implied_volatility_from_a_transformed_rational_guess(
      beta, x, q)

  @normalised_implied_volatility_limited_iterations: (beta, x, flag, N) ->
    q = binary_flag[flag]
    return lets_be_rational.normalised_implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(
      beta, x, q, N)

  @implied_volatility_of_undiscounted_option_price: (undiscounted_option_price,
                                                    F,
                                                    K,
                                                    t,
                                                    flag) ->
    return lets_be_rational.implied_volatility_from_a_transformed_rational_guess(
      undiscounted_option_price,
      F,
      K,
      t,
      binary_flag[flag]
    )

  @implied_volatility_of_undiscounted_option_price_limited_iterations: (undiscounted_option_price, F, K, t, flag, N) ->
    return lets_be_rational.implied_volatility_from_a_transformed_rational_guess_with_limited_iterations(
      undiscounted_option_price,
      F,
      K,
      t,
      binary_flag[flag],
      N
    )

js_vollib.black.implied_volatility = ImpliedVolatility