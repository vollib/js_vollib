class Numerical

  numerical = js_vollib.helpers.numerical_greeks
  black = js_vollib.js_ref.black.black

  f = (flag, F, K, t, r, sigma, b) ->
    return black(flag, F, K, t, r, sigma)

  @delta: (flag, F, K, t, r, sigma) ->
    b = 0
    return numerical.delta(flag, F, K, t, r, sigma, b, f)

  @theta: (flag, F, K, t, r, sigma) ->
    b = 0
    return numerical.theta(flag, F, K, t, r, sigma, b, f)

  @vega: (flag, F, K, t, r, sigma) ->
    b = 0
    return numerical.vega(flag, F, K, t, r, sigma, b, f)

  @rho: (flag, F, K, t, r, sigma) ->
    b = 0
    return numerical.rho(flag, F, K, t, r, sigma, b, f)

  @gamma: (flag, F, K, t, r, sigma) ->
    b = 0
    return numerical.gamma(flag, F, K, t, r, sigma, b, f)

js_vollib.js_ref.black.greeks.numerical = Numerical