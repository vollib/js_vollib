class ImpliedVolatility

  black = js_vollib.js_ref.black.black
  brent = js_vollib.helpers.brent
  binary_flag = js_vollib.helpers.binary_flag

  @implied_volatility: (price, F, K, r, t, flag) ->
    f = (sigma) ->
      return price - black(flag, F, K, t, r, sigma)

    result = brent(f)
    if !result
      js_vollib.helpers.validate_price(price, F, K, binary_flag[flag])
    else
      return result

js_vollib.js_ref.black.implied_volatility = ImpliedVolatility
