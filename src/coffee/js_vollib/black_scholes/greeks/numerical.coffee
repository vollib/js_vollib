class Numerical

  numerical = js_vollib.helpers.numerical_greeks
  black_scholes = js_vollib.black_scholes.black_scholes

  f = (flag, S, K, t, r, sigma, b) ->
    return black_scholes(flag, S, K, t, r, sigma)

  @delta: (flag, S, K, t, r, sigma) ->
    b = r
    return numerical.delta(flag, S, K, t, r, sigma, b, f)

  @theta: (flag, S, K, t, r, sigma) ->
    b = r
    return numerical.theta(flag, S, K, t, r, sigma, b, f)

  @vega: (flag, S, K, t, r, sigma) ->
    b = r
    return numerical.vega(flag, S, K, t, r, sigma, b, f)

  @rho: (flag, S, K, t, r, sigma) ->
    b = r
    return numerical.rho(flag, S, K, t, r, sigma, b, f)

  @gamma: (flag, S, K, t, r, sigma) ->
    b = r
    return numerical.gamma(flag, S, K, t, r, sigma, b, f)

js_vollib.black_scholes.greeks.numerical = Numerical