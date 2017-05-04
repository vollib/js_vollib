(function () {
    QUnit.module("js_vollib.black.greeks.test_numerical");

    var analytical = js_vollib.black.greeks.analytical;
    var numerical = js_vollib.black.greeks.numerical;

    var EPSILON = 0.0001;

    var F = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2;

    QUnit.test("test_call", function () {
        var flag = 'c';

        var adelta = analytical.delta(flag, F, K, t, r, sigma);
        var ndelta = numerical.delta(flag, F, K, t, r, sigma);
        assertEquals(ndelta, adelta, EPSILON);

        var agamma = analytical.gamma(flag, F, K, t, r, sigma);
        var ngamma = numerical.gamma(flag, F, K, t, r, sigma);
        assertEquals(ngamma, agamma, EPSILON);

        var arho = analytical.rho(flag, F, K, t, r, sigma);
        var nrho = numerical.rho(flag, F, K, t, r, sigma);
        assertEquals(nrho, arho, EPSILON);

        var avega = analytical.vega(flag, F, K, t, r, sigma);
        var nvega = numerical.vega(flag, F, K, t, r, sigma);
        assertEquals(nvega, avega, EPSILON);

        var atheta = analytical.theta(flag, F, K, t, r, sigma);
        var ntheta = numerical.theta(flag, F, K, t, r, sigma);
        assertEquals(ntheta, atheta, EPSILON);

    });

    QUnit.test("test_put", function () {
        var flag = 'p';

        var adelta = analytical.delta(flag, F, K, t, r, sigma);
        var ndelta = numerical.delta(flag, F, K, t, r, sigma);
        assertEquals(ndelta, adelta, EPSILON);

        var agamma = analytical.gamma(flag, F, K, t, r, sigma);
        var ngamma = numerical.gamma(flag, F, K, t, r, sigma);
        assertEquals(ngamma, agamma, EPSILON);

        var arho = analytical.rho(flag, F, K, t, r, sigma);
        var nrho = numerical.rho(flag, F, K, t, r, sigma);
        assertEquals(nrho, arho, EPSILON);

        var avega = analytical.vega(flag, F, K, t, r, sigma);
        var nvega = numerical.vega(flag, F, K, t, r, sigma);
        assertEquals(nvega, avega, EPSILON);

        var atheta = analytical.theta(flag, F, K, t, r, sigma);
        var ntheta = numerical.theta(flag, F, K, t, r, sigma);
        assertEquals(ntheta, atheta, EPSILON);

    });

}).call(this);