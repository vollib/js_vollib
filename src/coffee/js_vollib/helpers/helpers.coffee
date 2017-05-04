class Helpers

  ONE_OVER_SQRT_TWO_PI = 0.3989422804014326779399460599343818684758586311649

  _brent = new Brent(1e-15)
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
    return _brent.getRoot(func, 1e-12, 100)

js_vollib.helpers = Helpers