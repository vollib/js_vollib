(function () {
    QUnit.module("js_vollib.js_ref.black.greeks.test_analytical");

    var black = js_vollib.js_ref.black.black;
    var analytical = js_vollib.js_ref.black.greeks.analytical;

    var EPSILON = 0.000001;

    QUnit.test("test_delta", function () {
        var F = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var delta_calc = analytical.delta(flag, F, K, t, r, sigma);
        assertEquals(delta_calc, 0.45107017482201828, EPSILON);
    });

    QUnit.test("test_theta", function () {
        var F = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var annual_theta_calc = analytical.theta(flag, F, K, t, r, sigma);
        assertEquals(annual_theta_calc, -0.00816236877462, EPSILON);

        flag = 'p';
        annual_theta_calc = analytical.theta(flag, F, K, t, r, sigma);
        assertEquals(annual_theta_calc, -0.00802799155312, EPSILON);
    });

    QUnit.test("test_gamma", function () {
        var F = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var gamma_calc = analytical.gamma(flag, F, K, t, r, sigma);
        assertEquals(gamma_calc, 0.0640646705882, EPSILON);
    });

    QUnit.test("test_vega", function () {
        var F = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var vega_calc = analytical.vega(flag, F, K, t, r, sigma);
        assertEquals(vega_calc, 0.118317785624, EPSILON);
    });

    QUnit.test("test_rho", function () {
        var F = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var rho_calc = analytical.rho(flag, F, K, t, r, sigma);
        assertEquals(rho_calc, -0.0074705380059582258, EPSILON);

        flag = 'p';
        rho_calc = analytical.rho(flag, F, K, t, r, sigma);
        assertEquals(rho_calc, -0.011243286001308292, EPSILON);
    });

}).call(this);