class ImpliedVolatility

  black_scholes = js_vollib.js_ref.black_scholes.black_scholes
  brent = js_vollib.helpers.brent

  @implied_volatility: (price, S, K, t, r, flag) ->
    f = (sigma) ->
      return price - black_scholes(flag, S, K, t, r, sigma)

    return brent(f)

js_vollib.js_ref.black_scholes.implied_volatility = ImpliedVolatility
