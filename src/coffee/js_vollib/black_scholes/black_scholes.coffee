class BlackScholes

  undiscounted_black = js_vollib.black.undiscounted_black

  @black_scholes: (flag, S, K, t, r, sigma) ->
    deflater = Math.exp(-r * t)
    F = S / deflater
    return undiscounted_black(F, K, sigma, t, flag) * deflater

js_vollib.black_scholes = BlackScholes