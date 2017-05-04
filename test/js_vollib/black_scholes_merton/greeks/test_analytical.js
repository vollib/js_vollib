(function () {
    QUnit.module("js_vollib.black_scholes_merton.greeks.test_analytical");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var analytical = js_vollib.black_scholes_merton.greeks.analytical;

    var EPSILON = 0.000001;

    QUnit.test("test_delta", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c', q = 0;
        var delta_calc = analytical.delta(flag, S, K, t, r, sigma, q);
        assertEquals(delta_calc, 0.521601633972, EPSILON);
    });

    QUnit.test("test_theta", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c', q = 0;
        var annual_theta_calc = analytical.theta(flag, S, K, t, r, sigma, q) * 365;
        assertEquals(annual_theta_calc, -4.30538996455, EPSILON);

        flag = 'p';
        annual_theta_calc = analytical.theta(flag, S, K, t, r, sigma, q) * 365;
        assertEquals(annual_theta_calc, -1.8530056722, EPSILON);
    });

    QUnit.test("test_gamma", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c', q = 0;
        var gamma_calc = analytical.gamma(flag, S, K, t, r, sigma, q);
        assertEquals(gamma_calc, 0.0655453772525, EPSILON);
    });

    QUnit.test("test_vega", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c', q = 0;
        var vega_calc = analytical.vega(flag, S, K, t, r, sigma, q);
        assertEquals(vega_calc, 0.121052427542, EPSILON);
    });

    QUnit.test("test_rho", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c', q = 0;
        var rho_calc = analytical.rho(flag, S, K, t, r, sigma, q);
        assertEquals(rho_calc, 0.089065740988, EPSILON);
    });

}).call(this);