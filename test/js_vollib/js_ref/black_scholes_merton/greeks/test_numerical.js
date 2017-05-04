(function () {
    QUnit.module("js_vollib.js_ref.black_scholes_merton.greeks.test_numerical");

    var analytical = js_vollib.js_ref.black_scholes_merton.greeks.analytical;
    var numerical = js_vollib.js_ref.black_scholes_merton.greeks.numerical;

    var EPSILON = 0.0001;

    var S = 49.0, K = 50.0, t = 0.3846, r = 0.05, sigma = 0.2, q = 0.05;

    QUnit.test("test_call", function () {
        var flag = 'c';

        var adelta = analytical.delta(flag, S, K, t, r, sigma, q);
        var ndelta = numerical.delta(flag, S, K, t, r, sigma, q);
        assertEquals(ndelta, adelta, EPSILON);

        var agamma = analytical.gamma(flag, S, K, t, r, sigma, q);
        var ngamma = numerical.gamma(flag, S, K, t, r, sigma, q);
        assertEquals(ngamma, agamma, EPSILON);

        var arho = analytical.rho(flag, S, K, t, r, sigma, q);
        var nrho = numerical.rho(flag, S, K, t, r, sigma, q);
        assertEquals(nrho, arho, EPSILON);

        var avega = analytical.vega(flag, S, K, t, r, sigma, q);
        var nvega = numerical.vega(flag, S, K, t, r, sigma, q);
        assertEquals(nvega, avega, EPSILON);

        var atheta = analytical.theta(flag, S, K, t, r, sigma, q);
        var ntheta = numerical.theta(flag, S, K, t, r, sigma, q);
        assertEquals(ntheta, atheta, EPSILON);

    });

    QUnit.test("test_put", function () {
        var flag = 'p';

        var adelta = analytical.delta(flag, S, K, t, r, sigma, q);
        var ndelta = numerical.delta(flag, S, K, t, r, sigma, q);
        assertEquals(ndelta, adelta, EPSILON);

        var agamma = analytical.gamma(flag, S, K, t, r, sigma, q);
        var ngamma = numerical.gamma(flag, S, K, t, r, sigma, q);
        assertEquals(ngamma, agamma, EPSILON);

        var arho = analytical.rho(flag, S, K, t, r, sigma, q);
        var nrho = numerical.rho(flag, S, K, t, r, sigma, q);
        assertEquals(nrho, arho, EPSILON);

        var avega = analytical.vega(flag, S, K, t, r, sigma, q);
        var nvega = numerical.vega(flag, S, K, t, r, sigma, q);
        assertEquals(nvega, avega, EPSILON);

        var atheta = analytical.theta(flag, S, K, t, r, sigma, q);
        var ntheta = numerical.theta(flag, S, K, t, r, sigma, q);
        assertEquals(ntheta, atheta, EPSILON);

    });

    QUnit.test("test_hull_book_values", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c', q = 0;

        var delta_calc = numerical.delta(flag, S, K, t, r, sigma, q);
        var delta_text_book = 0.522;
        assertEquals(delta_calc, delta_text_book, 0.01);

        var theta_calc = numerical.theta(flag, S, K, t, r, sigma, q) * 365;
        var theta_text_book = -4.31;
        assertEquals(theta_calc, theta_text_book, 0.01);

        var gamma_calc = numerical.gamma(flag, S, K, t, r, sigma, q);
        var gamma_text_book = 0.066;
        assertEquals(gamma_calc, gamma_text_book, 0.001);

        var vega_calc = numerical.vega(flag, S, K, t, r, sigma, q);
        var vega_text_book = 0.121;
        assertEquals(vega_calc, vega_text_book, 0.01);

        var rho_calc = numerical.rho(flag, S, K, t, r, sigma, q);
        var rho_text_book = 0.0891;
        assertEquals(rho_calc, rho_text_book, 0.0001);
    });

}).call(this);