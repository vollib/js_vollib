class ImpliedVolatility

  black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton
  brent = js_vollib.helpers.brent

  @implied_volatility: (price, S, K, t, r, q, flag) ->
    f = (sigma) ->
      return price - black_scholes_merton(flag, S, K, t, r, sigma, q)

    return brent(f)

js_vollib.js_ref.black_scholes_merton.implied_volatility = ImpliedVolatility
