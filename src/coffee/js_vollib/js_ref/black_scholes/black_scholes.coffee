class BlackScholes

  N = js_vollib.helpers.norm_cdf

  @d1: (S, K, t, r, sigma) ->
    sigma_squared = sigma * sigma
    numerator = Math.log(S / K) + (r + sigma_squared / 2.0) * t
    denominator = sigma * Math.sqrt(t)

    return numerator / denominator

  @d2: (S, K, t, r, sigma) ->
    return BlackScholes.d1(S, K, t, r, sigma) - sigma * Math.sqrt(t)

  @black_scholes: (flag, S, K, t, r, sigma) ->
    e_to_the_minus_rt = Math.exp(-r * t)
    D1 = BlackScholes.d1(S, K, t, r, sigma)
    D2 = BlackScholes.d2(S, K, t, r, sigma)
    if flag == 'c'
      return S * N(D1) - K * e_to_the_minus_rt * N(D2)
    else
      return -S * N(-D1) + K * e_to_the_minus_rt * N(-D2)

js_vollib.js_ref.black_scholes = BlackScholes