class BlackScholesMerton

  black = js_lets_be_rational.black
  binary_flag = js_vollib.helpers.binary_flag

  @black_scholes_merton: (flag, S, K, t, r, sigma, q) ->
    F = S * Math.exp((r-q)*t)
    deflater = Math.exp(-r * t)
    return black(F, K, sigma, t, binary_flag[flag]) * deflater

js_vollib.black_scholes_merton = BlackScholesMerton