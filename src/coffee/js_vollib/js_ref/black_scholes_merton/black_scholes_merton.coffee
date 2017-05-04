class BlackScholesMerton
  N = js_vollib.helpers.norm_cdf

  @d1: (S, K, t, r, sigma, q) ->
    numerator = Math.log(S / K) + ((r - q) + sigma * sigma / 2.0) * t
    denominator = sigma * Math.sqrt(t)
    return numerator / denominator

  @d2: (S, K, t, r, sigma, q) ->
    return BlackScholesMerton.d1(S, K, t, r, sigma, q) - sigma * Math.sqrt(t)

  @bsm_call: (S, K, t, r, sigma, q) ->
    D1 = BlackScholesMerton.d1(S, K, t, r, sigma, q)
    D2 = BlackScholesMerton.d2(S, K, t, r, sigma, q)
    return S * Math.exp(-q * t) * N(D1) - K * Math.exp(-r * t) * N(D2)

  @bsm_put: (S, K, t, r, sigma, q) ->
    D1 = BlackScholesMerton.d1(S, K, t, r, sigma, q)
    D2 = BlackScholesMerton.d2(S, K, t, r, sigma, q)
    return K * Math.exp(-r * t) * N(-D2) - S * Math.exp(-q * t) * N(-D1)

  @black_scholes_merton: (flag, S, K, t, r, sigma, q) ->
    if flag == 'c'
      return BlackScholesMerton.bsm_call(S, K, t, r, sigma, q)
    else
      return BlackScholesMerton.bsm_put(S, K, t, r, sigma, q)

js_vollib.js_ref.black_scholes_merton = BlackScholesMerton