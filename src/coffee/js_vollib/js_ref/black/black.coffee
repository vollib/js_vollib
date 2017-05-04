class Black

  N = js_vollib.helpers.norm_cdf

  @d1: (F, K, t, r, sigma) ->
    sigma_squared = sigma * sigma
    numerator = Math.log(F / K) + sigma_squared * t / 2.0
    denominator = sigma * Math.sqrt(t)

    return numerator / denominator

  @d2: (F, K, t, r, sigma) ->
    return Black.d1(F, K, t, r, sigma) - sigma * Math.sqrt(t)

  @black_call: (F, K, t, r, sigma) ->
    deflater = Math.exp(-r * t)
    N_d1 = N(Black.d1(F, K, t, r, sigma))
    N_d2 = N(Black.d2(F, K, t, r, sigma))

    return deflater * (F * N_d1 - K * N_d2)

  @black_put: (F, K, t, r, sigma) ->
    deflater = Math.exp(-r * t)
    N_of_minus_d1 = N(-Black.d1(F, K, t, r, sigma))
    N_of_minus_d2 = N(-Black.d2(F, K, t, r, sigma))

    return deflater * (-F * N_of_minus_d1 + K * N_of_minus_d2)

  @black: (flag, F, K, t, r, sigma) ->
    if flag == 'c'
      return Black.black_call(F, K, t, r, sigma)
    else
      return Black.black_put(F, K, t, r, sigma)

js_vollib.js_ref.black = Black