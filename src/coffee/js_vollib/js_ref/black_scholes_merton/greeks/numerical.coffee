class Numerical

  numerical = js_vollib.helpers.numerical_greeks
  black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton

  f = (flag, S, K, t, r, sigma, b) ->
    return black_scholes_merton(flag, S, K, t, r, sigma, r-b)

  @delta: (flag, S, K, t, r, sigma, q) ->
    b = r-q
    return numerical.delta(flag, S, K, t, r, sigma, b, f)

  @theta: (flag, S, K, t, r, sigma, q) ->
    b = r-q
    return numerical.theta(flag, S, K, t, r, sigma, b, f)

  @vega: (flag, S, K, t, r, sigma, q) ->
    b = r-q
    return numerical.vega(flag, S, K, t, r, sigma, b, f)

  @rho: (flag, S, K, t, r, sigma, q) ->
    b = r-q
    return numerical.rho(flag, S, K, t, r, sigma, b, f)

  @gamma: (flag, S, K, t, r, sigma, q) ->
    b = r-q
    return numerical.gamma(flag, S, K, t, r, sigma, b, f)

js_vollib.js_ref.black_scholes_merton.greeks.numerical = Numerical