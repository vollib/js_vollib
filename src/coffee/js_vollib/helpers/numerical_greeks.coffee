class NumericalGreeks

  dS = 0.01

  @delta: (flag, S, K, t, r, sigma, b, pricing_function) ->
    if t == 0.0
      if S == K
        return ({'c':0.5, 'p':-0.5})[flag]
      else if S > K
        return ({'c':1.0, 'p':0.0})[flag]
      else
        return ({'c':0.0, 'p':-1.0})[flag]
    else
      return (pricing_function(flag, S + dS, K, t, r, sigma, b) - pricing_function(flag, S - dS, K, t, r, sigma, b)) / (2 * dS)

  @theta: (flag, S, K, t, r, sigma, b, pricing_function) ->
    if t <= 1.0 / 365.0
      return pricing_function(flag, S, K, 0.00001, r, sigma, b) - pricing_function(flag, S, K, t, r, sigma, b)
    else
      return pricing_function(flag, S, K, t - 1.0 / 365.0, r, sigma, b) - pricing_function(flag, S, K, t, r, sigma, b)

  @vega: (flag, S, K, t, r, sigma, b, pricing_function) ->
    return (pricing_function(flag, S, K, t, r, sigma + 0.01, b) - pricing_function(flag, S, K, t, r, sigma - 0.01, b)) / 2.0

  @rho: (flag, S, K, t, r, sigma, b, pricing_function) ->
    return (pricing_function(flag, S, K, t, r + 0.01, sigma,  b + 0.01) - pricing_function(flag, S, K, t, r - 0.01, sigma, b - 0.01)) / 2.0

  @gamma: (flag, S, K, t, r, sigma, b, pricing_function) ->
    if t == 0
      return if S == K ? Infinity : 0.0
    return (pricing_function(flag, S + dS, K, t, r, sigma, b) - 2.0 * pricing_function(flag, S, K, t, r, sigma, b) + pricing_function(flag, S - dS, K, t, r, sigma, b)) / Math.pow(dS, 2.0)

js_vollib.helpers.numerical_greeks = NumericalGreeks