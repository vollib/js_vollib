class ImpliedVolatility

  black = js_vollib.js_ref.black.black
  brent = js_vollib.helpers.brent

  @implied_volatility: (price, F, K, r, t, flag) ->
    f = (sigma) ->
      return price - black(flag, F, K, t, r, sigma)

    return brent(f)

js_vollib.js_ref.black.implied_volatility = ImpliedVolatility
