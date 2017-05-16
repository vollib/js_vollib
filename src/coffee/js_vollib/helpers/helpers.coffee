class Helpers

  ONE_OVER_SQRT_TWO_PI = 0.3989422804014326779399460599343818684758586311649

  @BRENT_MIN: 1e-12
  @BRENT_MAX: 100

  BelowIntrinsicError = js_lets_be_rational.BelowIntrinsicError
  AboveMaximumError = js_lets_be_rational.AboveMaximumError

  _brent = new Brent(0)
  _brent.maxIter = 1000

  @binary_flag: {'c':1,'p':-1}

  @pdf : (x) ->
    return ONE_OVER_SQRT_TWO_PI * Math.exp(-0.5*x*x)

  @forward_price: (S, t, r) ->
    return S/Math.exp(-r*t)

  @norm_cdf: (x) ->
    mean = 0.0
    stdev = 1.0
    return jStat.normal.cdf(x, mean, stdev)

  @brent: (func) ->
    #  scipy.optimize.brentq(
    #    func,
    #    a=1e-12,
    #    b=100,
    #    xtol=1e-15,
    #    rtol=1e-15,
    #    maxiter=1000,
    #    full_output=False
    #  )
#    return _brent.getRoot(func, 0.01, 100.0)

    min = Helpers.BRENT_MIN
    max = Helpers.BRENT_MAX
    initial = min + 0.5 * (max - min)
    functionalValueAccuracy = 0.0
    yInitial = func(initial)

    if Math.abs(yInitial) <= functionalValueAccuracy
      return initial
    else
      yMin = func(min)
      if Math.abs(yMin) <= functionalValueAccuracy
        return min
      else if yInitial * yMin < 0.0
        return _brent.getRoot(func, min, initial)
      else
        yMax = func(max)
        if Math.abs(yMax) <= functionalValueAccuracy
          return max
        else if yInitial * yMax < 0.0
          return _brent.getRoot(func, initial, max)

        return false

  @validate_price: (price, F, K, q) ->
    intrinsic = Math.abs(Math.max((if q < 0 then K - F else F - K), 0.0))
    if price < intrinsic
      throw new js_vollib.helpers.exceptions.PriceIsBelowIntrinsic()
    max_price = if q < 0 then K else F
    if price >= max_price
      throw new js_vollib.helpers.exceptions.PriceIsAboveMaximum()


js_vollib.helpers = Helpers