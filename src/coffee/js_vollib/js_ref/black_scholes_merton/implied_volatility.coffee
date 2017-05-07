class ImpliedVolatility

  black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton
  brent = js_vollib.helpers.brent
  binary_flag = js_vollib.helpers.binary_flag

  @implied_volatility: (price, S, K, t, r, q, flag) ->
    f = (sigma) ->
      return price - black_scholes_merton(flag, S, K, t, r, sigma, q)

    result = brent(f)
    if !result
      F = S * Math.exp(r*t)# Se^bt
      js_vollib.helpers.validate_price(price, F, K, binary_flag[flag])
    else
      return result


js_vollib.js_ref.black_scholes_merton.implied_volatility = ImpliedVolatility
