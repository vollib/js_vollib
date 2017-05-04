class Analytical

  N = js_lets_be_rational.norm_cdf
  pdf = js_vollib.helpers.pdf

  d1 = js_vollib.js_ref.black_scholes.d1
  d2 = js_vollib.js_ref.black_scholes.d2

  @delta: (flag, S, K, t, r, sigma) ->
    d_1 = d1(S, K, t, r, sigma)

    if flag == 'p'
      return N(d_1) - 1.0
    else
      return N(d_1)

  @theta: (flag, S, K, t, r, sigma) ->
    two_sqrt_t = 2 * Math.sqrt(t)

    D1 = d1(S, K, t, r, sigma)
    D2 = d2(S, K, t, r, sigma)

    first_term = (-S * pdf(D1) * sigma) / two_sqrt_t

    if flag == 'c'
      second_term = r * K * Math.exp(-r*t) * N(D2)
      return (first_term - second_term)/365.0

    if flag == 'p'
      second_term = r * K * Math.exp(-r*t) * N(-D2)
      return (first_term + second_term)/365.0

  @gamma: (flag, S, K, t, r, sigma) ->
    d_1 = d1(S, K, t, r, sigma)
    return pdf(d_1)/(S*sigma*Math.sqrt(t))

  @vega: (flag, S, K, t, r, sigma) ->
    d_1 = d1(S, K, t, r, sigma)
    return S * pdf(d_1) * Math.sqrt(t) * 0.01

  @rho: (flag, S, K, t, r, sigma) ->
    d_2 = d2(S, K, t, r, sigma)
    e_to_the_minus_rt = Math.exp(-r*t)
    if flag == 'c'
      return t*K*e_to_the_minus_rt * N(d_2) * .01
    else
      return -t*K*e_to_the_minus_rt * N(-d_2) * .01

js_vollib.black_scholes.greeks.analytical = Analytical