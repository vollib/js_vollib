class Analytical

  N = js_lets_be_rational.norm_cdf
  pdf = js_vollib.helpers.pdf

  d1 = js_vollib.js_ref.black_scholes_merton.d1
  d2 = js_vollib.js_ref.black_scholes_merton.d2

  @delta: (flag, S, K, t, r, sigma, q) ->
    D1 = d1(S, K, t, r, sigma, q)

    if flag == 'p'
      return -Math.exp(-q*t) * N(-D1)
    else
      return Math.exp(-q*t) * N(D1)

  @theta: (flag, S, K, t, r, sigma, q) ->
    D1 = d1(S, K, t, r, sigma, q)
    D2 = d2(S, K, t, r, sigma, q)

    first_term = (S * Math.exp(-q*t) * pdf(D1) * sigma) / (2 * Math.sqrt(t))

    if flag == 'c'
      second_term = -q * S * Math.exp(-q*t) * N(D1)
      third_term = r * K * Math.exp(-r*t) * N(D2)
      return -(first_term + second_term + third_term) / 365.0
    else
      second_term = -q * S * Math.exp(-q*t) * N(-D1)
      third_term = r * K * Math.exp(-r*t) * N(-D2)
      return (-first_term + second_term + third_term) / 365.0

  @gamma: (flag, S, K, t, r, sigma, q) ->
    D1 = d1(S, K, t, r, sigma, q)
    numerator = Math.exp(-q*t) * pdf(D1)
    denominator = S * sigma * Math.sqrt(t)
    return numerator / denominator

  @vega: (flag, S, K, t, r, sigma, q) ->
    D1 = d1(S, K, t, r, sigma, q)
    return S * Math.exp(-q*t) * pdf(D1) * Math.sqrt(t) * 0.01

  @rho: (flag, S, K, t, r, sigma, q) ->
    D2 = d2(S, K, t, r, sigma, q)
    if flag == 'c'
      return t * K * Math.exp(-r*t) * N(D2) * 0.01
    else
      return -t * K * Math.exp(-r*t) * N(-D2) * 0.01

js_vollib.black_scholes_merton.greeks.analytical = Analytical