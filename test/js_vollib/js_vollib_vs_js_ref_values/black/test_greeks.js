(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_greeks");

    var EPSILON = 1e-16;
    var nEPSILON = 1e-9;
    
    var analytical = js_vollib.black.greeks.analytical;
    var js_ref_analytical = js_vollib.js_ref.black.greeks.analytical;
    
    var numerical = js_vollib.black.greeks.numerical;
    var js_ref_numerical = js_vollib.js_ref.black.greeks.numerical;

    var F = 100, K = 90, sigma = 0.2, r = 0.02, t = 0.5;
    var flags = ['c', 'p'];

    QUnit.test("test_analytical_delta", function () {
        flags.forEach(function(flag, flag_i){
            var value = analytical.delta(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_analytical.delta(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, 1e-15);
        });
    });

    QUnit.test("test_analytical_gamma", function () {
        flags.forEach(function(flag, flag_i){
            var value = analytical.gamma(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_analytical.gamma(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, EPSILON);
        });
    });

    QUnit.test("test_analytical_rho", function () {
        flags.forEach(function(flag, flag_i){
            var value = analytical.rho(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_analytical.rho(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, EPSILON);
        });
    });

    QUnit.test("test_analytical_theta", function () {
        flags.forEach(function(flag, flag_i){
            var value = analytical.theta(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_analytical.theta(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, EPSILON);
        });
    });

    QUnit.test("test_analytical_vega", function () {
        flags.forEach(function(flag, flag_i){
            var value = analytical.vega(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_analytical.vega(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, EPSILON);
        });
    });

    QUnit.test("test_numerical_delta", function () {
        flags.forEach(function(flag, flag_i){
            var value = numerical.delta(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_numerical.delta(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, nEPSILON);
        });
    });

    QUnit.test("test_numerical_gamma", function () {
        flags.forEach(function(flag, flag_i){
            var value = numerical.gamma(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_numerical.gamma(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, nEPSILON);
        });
    });

    QUnit.test("test_numerical_rho", function () {
        flags.forEach(function(flag, flag_i){
            var value = numerical.rho(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_numerical.rho(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, nEPSILON);
        });
    });

    QUnit.test("test_numerical_theta", function () {
        flags.forEach(function(flag, flag_i){
            var value = numerical.theta(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_numerical.theta(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, nEPSILON);
        });
    });

    QUnit.test("test_numerical_vega", function () {
        flags.forEach(function(flag, flag_i){
            var value = numerical.vega(flag, F, K, t, r, sigma);
            var js_ref_value = js_ref_numerical.vega(flag, F, K, t, r, sigma);
            assertEquals(value, js_ref_value, nEPSILON);
        });
    });
    
}).call(this);