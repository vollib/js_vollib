class Black

  binary_flag = js_vollib.helpers.binary_flag

  @black: (flag, F, K, t, r, sigma) ->
    deflater = Math.exp(-r * t)
    return Black.undiscounted_black(F, K, sigma, t, flag) * deflater

  @normalised_black: (x, s, flag) ->
    q = binary_flag[flag]

    return js_lets_be_rational.normalised_black(x, s, q)

  @undiscounted_black : (F, K, sigma, t, flag) ->
    q = binary_flag[flag]
    F = F
    K = K
    sigma = sigma
    t = t

    return js_lets_be_rational.black(F, K, sigma, t, q)

js_vollib.black = Black