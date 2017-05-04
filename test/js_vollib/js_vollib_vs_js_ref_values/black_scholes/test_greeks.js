(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_greeks");

    var analytical = js_vollib.black_scholes.greeks.analytical;
    var js_ref_analytical = js_vollib.js_ref.black_scholes.greeks.analytical;
    
    var numerical = js_vollib.black_scholes.greeks.numerical;
    var js_ref_numerical = js_vollib.js_ref.black_scholes.greeks.numerical;
    
    var EPSILON = 1e-17;
    var nEPSILON = 1e-9;
    
    var S = 49, K = 50, sigma = 0.2, r = 0.05, t = 0.3846;
    
    var flags = ['c', 'p'];
    
    QUnit.test("test_analytical_delta", function () {
        
        flags.forEach(function(flag, flag_i){
            var delta = analytical.delta(flag, S, K, t, r, sigma);
            var js_ref_delta = js_ref_analytical.delta(flag, S, K, t, r, sigma);
            assertEquals(delta, js_ref_delta, EPSILON);
        });

    });

    QUnit.test("test_analytical_gamma", function () {

        flags.forEach(function(flag, flag_i){
            var gamma = analytical.gamma(flag, S, K, t, r, sigma);
            var js_ref_gamma = js_ref_analytical.gamma(flag, S, K, t, r, sigma);
            assertEquals(gamma, js_ref_gamma, EPSILON);
        });

    });

    QUnit.test("test_analytical_rho", function () {

        flags.forEach(function(flag, flag_i){
            var rho = analytical.rho(flag, S, K, t, r, sigma);
            var js_ref_rho = js_ref_analytical.rho(flag, S, K, t, r, sigma);
            assertEquals(rho, js_ref_rho, EPSILON);
        });

    });

    QUnit.test("test_analytical_theta", function () {

        flags.forEach(function(flag, flag_i){
            var theta = analytical.theta(flag, S, K, t, r, sigma);
            var js_ref_theta = js_ref_analytical.theta(flag, S, K, t, r, sigma);
            assertEquals(theta, js_ref_theta, EPSILON);
        });

    });

    QUnit.test("test_analytical_vega", function () {

        flags.forEach(function(flag, flag_i){
            var vega = analytical.vega(flag, S, K, t, r, sigma);
            var js_ref_vega = js_ref_analytical.vega(flag, S, K, t, r, sigma);
            assertEquals(vega, js_ref_vega, EPSILON);
        });

    });

    QUnit.test("test_numerical_delta", function () {

        flags.forEach(function(flag, flag_i){
            var delta = numerical.delta(flag, S, K, t, r, sigma);
            var js_ref_delta = js_ref_numerical.delta(flag, S, K, t, r, sigma);
            assertEquals(delta, js_ref_delta, nEPSILON);
        });

    });

    QUnit.test("test_numerical_gamma", function () {

        flags.forEach(function(flag, flag_i){
            var gamma = numerical.gamma(flag, S, K, t, r, sigma);
            var js_ref_gamma = js_ref_numerical.gamma(flag, S, K, t, r, sigma);
            assertEquals(gamma, js_ref_gamma, nEPSILON);
        });

    });

    QUnit.test("test_numerical_rho", function () {

        flags.forEach(function(flag, flag_i){
            var rho = numerical.rho(flag, S, K, t, r, sigma);
            var js_ref_rho = js_ref_numerical.rho(flag, S, K, t, r, sigma);
            assertEquals(rho, js_ref_rho, nEPSILON);
        });

    });

    QUnit.test("test_numerical_theta", function () {

        flags.forEach(function(flag, flag_i){
            var theta = numerical.theta(flag, S, K, t, r, sigma);
            var js_ref_theta = js_ref_numerical.theta(flag, S, K, t, r, sigma);
            assertEquals(theta, js_ref_theta, nEPSILON);
        });

    });

    QUnit.test("test_numerical_vega", function () {

        flags.forEach(function(flag, flag_i){
            var vega = numerical.vega(flag, S, K, t, r, sigma);
            var js_ref_vega = js_ref_numerical.vega(flag, S, K, t, r, sigma);
            assertEquals(vega, js_ref_vega, nEPSILON);
        });

    });

}).call(this);