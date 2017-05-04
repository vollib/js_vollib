(function () {
    QUnit.module("js_vollib.black_scholes.greeks.test_numerical");

    var analytical = js_vollib.black_scholes.greeks.analytical;
    var numerical = js_vollib.black_scholes.greeks.numerical;

    var EPSILON = 0.01;
    
    var S = 1000.0, K = 1000.0, t = 0.1, r = 0.05, sigma = 0.3;

    QUnit.test("test_call", function () {
        var flag = 'c';
        
        var adelta = analytical.delta(flag, S, K, t, r, sigma);
        var ndelta = numerical.delta(flag, S, K, t, r, sigma);
        assertEquals(ndelta, adelta, EPSILON);

        var agamma = analytical.gamma(flag, S, K, t, r, sigma);
        var ngamma = numerical.gamma(flag, S, K, t, r, sigma);
        assertEquals(ngamma, agamma, EPSILON);

        var arho = analytical.rho(flag, S, K, t, r, sigma);
        var nrho = numerical.rho(flag, S, K, t, r, sigma);
        assertEquals(nrho, arho, EPSILON);

        var avega = analytical.vega(flag, S, K, t, r, sigma);
        var nvega = numerical.vega(flag, S, K, t, r, sigma);
        assertEquals(nvega, avega, EPSILON);

        var atheta = analytical.theta(flag, S, K, t, r, sigma);
        var ntheta = numerical.theta(flag, S, K, t, r, sigma);
        assertEquals(ntheta, atheta, EPSILON);
        
    });

    QUnit.test("test_put", function () {
        var flag = 'p';

        var adelta = analytical.delta(flag, S, K, t, r, sigma);
        var ndelta = numerical.delta(flag, S, K, t, r, sigma);
        assertEquals(ndelta, adelta, EPSILON);

        var agamma = analytical.gamma(flag, S, K, t, r, sigma);
        var ngamma = numerical.gamma(flag, S, K, t, r, sigma);
        assertEquals(ngamma, agamma, EPSILON);

        var arho = analytical.rho(flag, S, K, t, r, sigma);
        var nrho = numerical.rho(flag, S, K, t, r, sigma);
        assertEquals(nrho, arho, EPSILON);

        var avega = analytical.vega(flag, S, K, t, r, sigma);
        var nvega = numerical.vega(flag, S, K, t, r, sigma);
        assertEquals(nvega, avega, EPSILON);

        var atheta = analytical.theta(flag, S, K, t, r, sigma);
        var ntheta = numerical.theta(flag, S, K, t, r, sigma);
        assertEquals(ntheta, atheta, EPSILON);

    });

    QUnit.test("test_hull_book_values", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';

        var delta_calc = numerical.delta(flag, S, K, t, r, sigma);
        var delta_text_book = 0.522;
        assertEquals(delta_calc, delta_text_book, 0.01);

        var theta_calc = numerical.theta(flag, S, K, t, r, sigma) * 365;
        var theta_text_book = -4.31;
        assertEquals(theta_calc, theta_text_book, 0.01);

        var gamma_calc = numerical.gamma(flag, S, K, t, r, sigma);
        var gamma_text_book = 0.066;
        assertEquals(gamma_calc, gamma_text_book, 0.001);

        var vega_calc = numerical.vega(flag, S, K, t, r, sigma);
        var vega_text_book = 0.121;
        assertEquals(vega_calc, vega_text_book, 0.01);

        var rho_calc = numerical.rho(flag, S, K, t, r, sigma);
        var rho_text_book = 0.0891;
        assertEquals(rho_calc, rho_text_book, 0.0001);
    });

}).call(this);