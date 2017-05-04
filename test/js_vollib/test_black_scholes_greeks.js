(function () {

    QUnit.module("js_vollib.test_black_scholes_greeks");

    var analytical = js_vollib.black_scholes.greeks.analytical;
    var numerical = js_vollib.black_scholes.greeks.numerical;

    var N = 10;

    var flags = ['c', 'p'];
    var S = 100;
    var Ks = linspace(20, 200, N);
    var ts = linspace(0.01, 2, N);
    var rs = linspace(0, 0.2, N);
    var sigmas = linspace(0.1, 0.5, N);

    var EPSILON = 0.001;

    QUnit.test("test_theta", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_theta = analytical.theta(flag, S, K, t, r, sigma);
                var n_theta = numerical.theta(flag, S, K, t, r, sigma);
                assertEquals(a_theta, n_theta, EPSILON);
            }

        });
    });

    QUnit.test("test_delta", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_delta = analytical.delta(flag, S, K, t, r, sigma);
                var n_delta = numerical.delta(flag, S, K, t, r, sigma);
                assertEquals(a_delta, n_delta, EPSILON);
            }

        });
    });

    QUnit.test("test_gamma", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_gamma = analytical.gamma(flag, S, K, t, r, sigma);
                var n_gamma = numerical.gamma(flag, S, K, t, r, sigma);
                assertEquals(a_gamma, n_gamma, EPSILON);
            }

        });
    });

    QUnit.test("test_vega", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_vega = analytical.vega(flag, S, K, t, r, sigma);
                var n_vega = numerical.vega(flag, S, K, t, r, sigma);
                assertEquals(a_vega, n_vega, EPSILON);
            }

        });
    });

    QUnit.test("test_rho", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_rho = analytical.rho(flag, S, K, t, r, sigma);
                var n_rho = numerical.rho(flag, S, K, t, r, sigma);
                assertEquals(a_rho, n_rho, EPSILON);
            }

        });
    });

}).call(this);