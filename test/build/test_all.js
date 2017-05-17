(function () {

    QUnit.module("js_vollib.test_black_scholes");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var analytical = js_vollib.black_scholes.greeks.analytical;
    var numerical = js_vollib.black_scholes.greeks.numerical;
    var implied_volatility = js_vollib.black_scholes.implied_volatility.implied_volatility;

    QUnit.test("test_prices", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_bs_call = values[test_data.columns.indexOf('bs_call')];
            var expected_bs_put = values[test_data.columns.indexOf('bs_put')];

            var bs_call = black_scholes('c', S, K, t, r, sigma);
            var bs_put = black_scholes('p', S, K, t, r, sigma);

            assertEquals(bs_call, expected_bs_call, 0.000001);
            assertEquals(bs_put, expected_bs_put, 0.000001);
        });

    });

    QUnit.test("test_analytical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = analytical.delta('c', S, K, t, r, sigma);
            var pd = analytical.delta('p', S, K, t, r, sigma);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_analytical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = analytical.theta('c', S, K, t, r, sigma);
            var pt = analytical.theta('p', S, K, t, r, sigma);

            assertEquals(ct, expected_ct, 0.000001);
            assertEquals(pt, expected_pt, 0.000001);
        });

    });

    QUnit.test("test_analytical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = analytical.gamma('c', S, K, t, r, sigma);
            var pg = analytical.gamma('p', S, K, t, r, sigma);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_analytical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = analytical.vega('c', S, K, t, r, sigma);
            var pv = analytical.vega('p', S, K, t, r, sigma);

            assertEquals(cv, expected_cv, 0.000001);
            assertEquals(pv, expected_pv, 0.000001);
        });

    });

    QUnit.test("test_analytical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = analytical.rho('c', S, K, t, r, sigma);
            var pr = analytical.rho('p', S, K, t, r, sigma);

            assertEquals(cr, expected_cr, 0.000000001);
            assertEquals(pr, expected_pr, 0.000000001);
        });

    });

    QUnit.test("test_numerical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = numerical.delta('c', S, K, t, r, sigma);
            var pd = numerical.delta('p', S, K, t, r, sigma);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_numerical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = numerical.theta('c', S, K, t, r, sigma);
            var pt = numerical.theta('p', S, K, t, r, sigma);

            assertEquals(ct, expected_ct, 1);
            assertEquals(pt, expected_pt, 1);
        });

    });

    QUnit.test("test_numerical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = numerical.gamma('c', S, K, t, r, sigma);
            var pg = numerical.gamma('p', S, K, t, r, sigma);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_numerical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = numerical.vega('c', S, K, t, r, sigma);
            var pv = numerical.vega('p', S, K, t, r, sigma);

            assertEquals(cv, expected_cv, 0.01);
            assertEquals(pv, expected_pv, 0.01);
        });

    });

    QUnit.test("test_numerical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = numerical.rho('c', S, K, t, r, sigma);
            var pr = numerical.rho('p', S, K, t, r, sigma);

            assertEquals(cr, expected_cr, 0.001);
            assertEquals(pr, expected_pr, 0.001);
        });

    });

    QUnit.test("test_implied_volatility", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var C = black_scholes('c', S, K, t, r, sigma);
            var P = black_scholes('p', S, K, t, r, sigma);

            var expected_iv_c = sigma;
            var expected_iv_p = sigma;

            var iv_c = implied_volatility(C, S, K, t, r, 'c');
            var iv_p = implied_volatility(P, S, K, t, r, 'p');

            assertEquals(iv_c, expected_iv_c, 0.0001);

            assertImpliedVolatilityPUTValue(iv_p, expected_iv_p, 0.0, 0.001);

        });

    });

}).call(this);
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
(function () {

    QUnit.module("js_vollib.test_black_scholes_merton");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var analytical = js_vollib.black_scholes_merton.greeks.analytical;
    var numerical = js_vollib.black_scholes_merton.greeks.numerical;
    var implied_volatility = js_vollib.black_scholes_merton.implied_volatility.implied_volatility;
    var q = 0;

    QUnit.test("test_prices", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_bs_call = values[test_data.columns.indexOf('bs_call')];
            var expected_bs_put = values[test_data.columns.indexOf('bs_put')];

            var bs_call = black_scholes_merton('c', S, K, t, r, sigma, q);
            var bs_put = black_scholes_merton('p', S, K, t, r, sigma, q);

            assertEquals(bs_call, expected_bs_call, 0.000001);
            assertEquals(bs_put, expected_bs_put, 0.000001);
        });

    });

    QUnit.test("test_analytical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = analytical.delta('c', S, K, t, r, sigma, q);
            var pd = analytical.delta('p', S, K, t, r, sigma, q);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_analytical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = analytical.theta('c', S, K, t, r, sigma, q);
            var pt = analytical.theta('p', S, K, t, r, sigma, q);

            assertEquals(ct, expected_ct, 0.000001);
            assertEquals(pt, expected_pt, 0.000001);
        });

    });

    QUnit.test("test_analytical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = analytical.gamma('c', S, K, t, r, sigma, q);
            var pg = analytical.gamma('p', S, K, t, r, sigma, q);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_analytical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = analytical.vega('c', S, K, t, r, sigma, q);
            var pv = analytical.vega('p', S, K, t, r, sigma, q);

            assertEquals(cv, expected_cv, 0.000001);
            assertEquals(pv, expected_pv, 0.000001);
        });

    });

    QUnit.test("test_analytical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = analytical.rho('c', S, K, t, r, sigma, q);
            var pr = analytical.rho('p', S, K, t, r, sigma, q);

            assertEquals(cr, expected_cr, 0.000000001);
            assertEquals(pr, expected_pr, 0.000000001);
        });

    });

    QUnit.test("test_numerical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = numerical.delta('c', S, K, t, r, sigma, q);
            var pd = numerical.delta('p', S, K, t, r, sigma, q);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_numerical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = numerical.theta('c', S, K, t, r, sigma, q);
            var pt = numerical.theta('p', S, K, t, r, sigma, q);

            assertEquals(ct, expected_ct, 1);
            assertEquals(pt, expected_pt, 1);
        });

    });

    QUnit.test("test_numerical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = numerical.gamma('c', S, K, t, r, sigma, q);
            var pg = numerical.gamma('p', S, K, t, r, sigma, q);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_numerical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = numerical.vega('c', S, K, t, r, sigma, q);
            var pv = numerical.vega('p', S, K, t, r, sigma, q);

            assertEquals(cv, expected_cv, 0.01);
            assertEquals(pv, expected_pv, 0.01);
        });

    });

    QUnit.test("test_numerical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = numerical.rho('c', S, K, t, r, sigma, q);
            var pr = numerical.rho('p', S, K, t, r, sigma, q);

            assertEquals(cr, expected_cr, 0.001);
            assertEquals(pr, expected_pr, 0.001);
        });

    });

    QUnit.test("test_implied_volatility", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var C = black_scholes_merton('c', S, K, t, r, sigma, q);
            var P = black_scholes_merton('p', S, K, t, r, sigma, q);

            var expected_iv_c = sigma;
            var expected_iv_p = sigma;

            var iv_c = implied_volatility(C, S, K, t, r, q, 'c');
            var iv_p = implied_volatility(P, S, K, t, r, q, 'p');

            assertEquals(iv_c, expected_iv_c, 0.0001);

            assertImpliedVolatilityPUTValue(iv_p, expected_iv_p, 0.0, 0.001);

        });

    });

}).call(this);
(function () {

    QUnit.module("js_vollib.test_black_scholes_merton_greeks");

    var analytical = js_vollib.black_scholes_merton.greeks.analytical;
    var numerical = js_vollib.black_scholes_merton.greeks.numerical;

    var N = 10;

    var flags = ['c', 'p'];
    var S = 100;
    var Ks = linspace(20, 200, N);
    var ts = linspace(0.01, 2, N);
    var rs = linspace(0, 0.2, N);
    var sigmas = linspace(0.1, 0.5, N);
    var q = 0.5;

    var EPSILON = 0.001;

    QUnit.test("test_theta", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_theta = analytical.theta(flag, S, K, t, r, sigma, q);
                var n_theta = numerical.theta(flag, S, K, t, r, sigma, q);
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
                var a_delta = analytical.delta(flag, S, K, t, r, sigma, q);
                var n_delta = numerical.delta(flag, S, K, t, r, sigma, q);
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
                var a_gamma = analytical.gamma(flag, S, K, t, r, sigma, q);
                var n_gamma = numerical.gamma(flag, S, K, t, r, sigma, q);
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
                var a_vega = analytical.vega(flag, S, K, t, r, sigma, q);
                var n_vega = numerical.vega(flag, S, K, t, r, sigma, q);
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
                var a_rho = analytical.rho(flag, S, K, t, r, sigma, q);
                var n_rho = numerical.rho(flag, S, K, t, r, sigma, q);
                assertEquals(a_rho, n_rho, EPSILON);
            }

        });
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black.test_black");

    var black = js_vollib.black;

    QUnit.test("test_black", function () {

        var F = 100, K = 100, sigma = 0.2, flag = 'c', r = 0.02, t = 0.5;
        assertEquals(black.black(flag, F, K, t, r, sigma), 5.5811067246048118);

    });

    QUnit.test("test_undiscounted_black", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5;
        assertEquals(black.undiscounted_black(F, K, sigma, t, flag), 5.637197779701664);
    });

    QUnit.test("test_normalised_black", function () {
        var F = 100, K = 95, x = Math.log(F/K), t = 0.5, v = 0.3, s = v * Math.sqrt(t);
        assertEquals(black.normalised_black(x,s,'p'), 0.061296663817558904);
        assertEquals(black.normalised_black(x,s,'c'), 0.11259558142181655);

        normalised_intrinsic = function(F, K, flag) {
            if (flag == 'c') {
                return Math.max(F-K,0)/Math.pow((F*K),0.5);
            } else {
                return Math.max(K-F,0)/Math.pow((F*K),0.5);
            }
        };

        QUnit.assert.ok((black.normalised_black(x,s,'p') - (black.normalised_black(x,s,'c') - normalised_intrinsic(F,K,'c')))<1e-12);
        assertEquals(Math.abs(black.normalised_black(x,s,'p') - black.normalised_black(x,s,'c')), normalised_intrinsic(F,K,'c'), 1e-12);

    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black.test_implied_volatility");

    var black = js_vollib.black;

    QUnit.test("test_implied_volatility_of_discounted_option_price", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5, r = 0.02;
        var discounted_call_price = black.black(flag, F, K, t, r, sigma);
        var iv = black.implied_volatility.implied_volatility_of_discounted_option_price(discounted_call_price, F, K, r, t, flag);

        assertEquals(discounted_call_price, 5.5811067246, 0.00001);
        assertEquals(iv, 0.2, 0.00001);
    });

    QUnit.test("test_implied_volatility", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5, r = 0.02;
        var discounted_call_price = black.black(flag, F, K, t, r, sigma);
        var iv = black.implied_volatility.implied_volatility(discounted_call_price, F, K, r, t, flag);

        assertEquals(discounted_call_price, 5.5811067246, 0.00001);
        assertEquals(iv, 0.2, 0.00001);
    });

    QUnit.test("test_normalised_implied_volatility", function() {
        var beta_call = black.normalised_black(0.0, 0.2, 'c');
        var beta_put = black.normalised_black(0.1, 0.23232323888, 'p');
        var normalized_b76_iv_call = black.implied_volatility.normalised_implied_volatility(beta_call, 0.0, 'c');
        var normalized_b76_iv_put = black.implied_volatility.normalised_implied_volatility(beta_put, 0.1, 'p');

        var expected_price = 0.0796556745541;
        var expected_iv = 0.2;

        assertEquals(beta_call, expected_price, 0.00001);
        assertEquals(normalized_b76_iv_call, expected_iv, 0.00001);

        expected_price = 0.0509710222785;
        expected_iv = 0.23232323888;

        assertEquals(beta_put, expected_price, 0.00001);
        assertEquals(normalized_b76_iv_put, expected_iv, 0.00001);
    });

    QUnit.test("test_normalised_implied_volatility", function () {
        var beta_call = black.normalised_black(0.0, 0.2, 'c');
        var beta_put = black.normalised_black(0.1,0.23232323888,'p');
        var normalized_b76_iv_call = black.implied_volatility.normalised_implied_volatility(beta_call, 0.0, 'c');
        var normalized_b76_iv_put = black.implied_volatility.normalised_implied_volatility(beta_put, 0.1, 'p');

        var expected_price = 0.0796556745541;
        var expected_iv = 0.2;

        assertEquals(beta_call, expected_price, 0.00001);
        assertEquals(normalized_b76_iv_call, expected_iv, 0.00001);

        expected_price = 0.0509710222785;
        expected_iv = 0.23232323888;

        assertEquals(beta_put, expected_price, 0.00001);
        assertEquals(normalized_b76_iv_put, expected_iv, 0.00001);
    });

    QUnit.test("test_normalised_implied_volatility_limited_iterations", function () {
        var beta_call = black.normalised_black(0.0, 0.2, 'c');
        var beta_put = black.normalised_black(0.1,0.23232323888,'p');
        var normalized_b76_iv_call = black.implied_volatility.normalised_implied_volatility_limited_iterations(beta_call, 0.0, 'c',1);
        var normalized_b76_iv_put = black.implied_volatility.normalised_implied_volatility_limited_iterations(beta_put, 0.1, 'p',1);

        var expected_price = 0.0796556745541;
        var expected_iv = 0.2;

        assertEquals(beta_call, expected_price, 0.00001);
        assertEquals(normalized_b76_iv_call, expected_iv, 0.00001);

        expected_price = 0.0509710222785;
        expected_iv = 0.23232323888;

        assertEquals(beta_put, expected_price, 0.00001);
        assertEquals(normalized_b76_iv_put, expected_iv, 0.00001);

    });

    QUnit.test("test_implied_volatility_of_undiscounted_option_price", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5;

        var undiscounted_call_price = black.undiscounted_black(F, K, sigma, t, flag);
        var iv = black.implied_volatility.implied_volatility_of_undiscounted_option_price(undiscounted_call_price, F, K, t, flag);

        var expected_price = 5.6371977797;
        var expected_iv = 0.2;

        assertEquals(undiscounted_call_price, expected_price, 0.00001);
        assertEquals(iv, expected_iv, 0.00001);
    });

    QUnit.test("test_implied_volatility_of_undiscounted_option_price_limited_iterations", function () {
        var F = 100, K = 100, sigma = 0.232323232, flag = 'c', t = 0.5;

        var price = black.undiscounted_black(F, K, sigma, t, flag);
        var iv = black.implied_volatility.implied_volatility_of_undiscounted_option_price_limited_iterations(price, F, K, t, flag, 1);

        var expected_price = 6.54635543387;
        var expected_iv = 0.232323232;

        assertEquals(price, expected_price, 0.0001);
        assertEquals(iv, expected_iv, 0.00001);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black_scholes.test_black_scholes");

    var black_scholes = js_vollib.black_scholes.black_scholes;

    var EPSILON = 0.000001;

    QUnit.test("testBlack_scholes_call", function () {
        assertEquals(black_scholes('c', 100, 90, 0.5, 0.01, 0.2), 12.111581435, EPSILON);
    });

    QUnit.test("testBlack_scholes_put", function () {
        assertEquals(black_scholes('p', 100, 90, 0.5, 0.01, 0.2), 1.66270456231, EPSILON);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black_scholes.test_implied_volatility");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var implied_volatility = js_vollib.black_scholes.implied_volatility.implied_volatility;

    QUnit.test("test_implied_volatility", function () {
        var S = 100, K = 100, sigma = 0.2, r = 0.01, flag = 'c', t = 0.5;

        var price = black_scholes(flag, S, K, t, r, sigma);
        var iv = implied_volatility(price, S, K, t, r, flag);

        var expected_price = 5.87602423383;
        var expected_iv = 0.2;

        assertEquals(price, expected_price, 0.00001);
        assertEquals(iv, expected_iv, 0.00001);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black_scholes_merton.test_black_scholes_merton");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;

    QUnit.test("test_black_scholes_merton", function () {
        var S = 100, K = 95, q = 0.05, t = 0.5, r = 0.1, sigma = 0.2;
        assertEquals(black_scholes_merton('p', S, K, t, r, sigma, q), 2.4648, 0.0001);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black_scholes_merton_merton.test_implied_volatility");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var implied_volatility = js_vollib.black_scholes_merton.implied_volatility.implied_volatility;

    QUnit.test("test_implied_volatility", function () {
        var S = 100, K = 100, sigma = 0.2, r = 0.01, flag = 'c', t = 0.5, q = 0;

        var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
        var iv = implied_volatility(price, S, K, t, r, q, flag);

        var expected_price = 5.87602423383;
        var expected_iv = 0.2;

        assertEquals(price, expected_price, 0.00001);
        assertEquals(iv, expected_iv, 0.00001);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.helpers.test_helpers");

    QUnit.test("test_forward_price", function () {
        var S = 95, t = 0.5, r = 0.02;
        var F = js_vollib.helpers.forward_price(S, t, r);
        var pre_calculated = 95.95476587299596;
        assertEquals(F, pre_calculated, 0.000000001);
    });

    QUnit.test("test_norm_cdf", function () {
        var z = 0.302569738839;
        var actual = js_vollib.helpers.norm_cdf(z);
        var expected = js_lets_be_rational.norm_cdf(z);//0.618891110513;
        assertEquals(actual, expected, 1e-12);

        z = 0.161148382602;
        actual = js_vollib.helpers.norm_cdf(z);
        expected = js_lets_be_rational.norm_cdf(z);//0.564011732814;
        assertEquals(actual, expected, 1e-12);

        z = -10.6305730761;
        actual = js_vollib.helpers.norm_cdf(z);
        expected = js_lets_be_rational.norm_cdf(z);//1.0739427439219852e-26;
        assertEquals(actual, expected, 1e-41);
    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_ref.test_black_scholes");

    var black_scholes = js_vollib.js_ref.black_scholes.black_scholes;
    var analytical = js_vollib.js_ref.black_scholes.greeks.analytical;
    var numerical = js_vollib.js_ref.black_scholes.greeks.numerical;
    var implied_volatility = js_vollib.js_ref.black_scholes.implied_volatility.implied_volatility;

    QUnit.test("test_prices", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_bs_call = values[test_data.columns.indexOf('bs_call')];
            var expected_bs_put = values[test_data.columns.indexOf('bs_put')];

            var bs_call = black_scholes('c', S, K, t, r, sigma);
            var bs_put = black_scholes('p', S, K, t, r, sigma);

            assertEquals(bs_call, expected_bs_call, 0.000001);
            assertEquals(bs_put, expected_bs_put, 0.000001);
        });

    });

    QUnit.test("test_analytical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = analytical.delta('c', S, K, t, r, sigma);
            var pd = analytical.delta('p', S, K, t, r, sigma);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_analytical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = analytical.theta('c', S, K, t, r, sigma);
            var pt = analytical.theta('p', S, K, t, r, sigma);

            assertEquals(ct, expected_ct, 0.000001);
            assertEquals(pt, expected_pt, 0.000001);
        });

    });

    QUnit.test("test_analytical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = analytical.gamma('c', S, K, t, r, sigma);
            var pg = analytical.gamma('p', S, K, t, r, sigma);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_analytical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = analytical.vega('c', S, K, t, r, sigma);
            var pv = analytical.vega('p', S, K, t, r, sigma);

            assertEquals(cv, expected_cv, 0.000001);
            assertEquals(pv, expected_pv, 0.000001);
        });

    });

    QUnit.test("test_analytical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = analytical.rho('c', S, K, t, r, sigma);
            var pr = analytical.rho('p', S, K, t, r, sigma);

            assertEquals(cr, expected_cr, 0.000000001);
            assertEquals(pr, expected_pr, 0.000000001);
        });

    });

    QUnit.test("test_numerical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = numerical.delta('c', S, K, t, r, sigma);
            var pd = numerical.delta('p', S, K, t, r, sigma);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_numerical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = numerical.theta('c', S, K, t, r, sigma);
            var pt = numerical.theta('p', S, K, t, r, sigma);

            assertEquals(ct, expected_ct, 1);
            assertEquals(pt, expected_pt, 1);
        });

    });

    QUnit.test("test_numerical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = numerical.gamma('c', S, K, t, r, sigma);
            var pg = numerical.gamma('p', S, K, t, r, sigma);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_numerical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = numerical.vega('c', S, K, t, r, sigma);
            var pv = numerical.vega('p', S, K, t, r, sigma);

            assertEquals(cv, expected_cv, 0.01);
            assertEquals(pv, expected_pv, 0.01);
        });

    });

    QUnit.test("test_numerical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = numerical.rho('c', S, K, t, r, sigma);
            var pr = numerical.rho('p', S, K, t, r, sigma);

            assertEquals(cr, expected_cr, 0.001);
            assertEquals(pr, expected_pr, 0.001);
        });

    });

    QUnit.test("test_implied_volatility", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var C = black_scholes('c', S, K, t, r, sigma);
            var P = black_scholes('p', S, K, t, r, sigma);

            var expected_iv_c = sigma;
            var expected_iv_p = sigma;

            var iv_c = implied_volatility(C, S, K, t, r, 'c');
            var iv_p = implied_volatility(P, S, K, t, r, 'p');

            assertEquals(iv_c, expected_iv_c, 0.0001);

            assertImpliedVolatilityPUTValue(iv_p, expected_iv_p, js_vollib.helpers.BRENT_MIN, 0.001);

        });

    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_ref.test_black_scholes_greeks");

    var analytical = js_vollib.js_ref.black_scholes.greeks.analytical;
    var numerical = js_vollib.js_ref.black_scholes.greeks.numerical;

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
(function () {

    QUnit.module("js_vollib.js_ref.test_black_scholes_merton");

    var black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;
    var analytical = js_vollib.js_ref.black_scholes_merton.greeks.analytical;
    var numerical = js_vollib.js_ref.black_scholes_merton.greeks.numerical;
    var implied_volatility = js_vollib.js_ref.black_scholes_merton.implied_volatility.implied_volatility;
    var q = 0;

    QUnit.test("test_prices", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_bs_call = values[test_data.columns.indexOf('bs_call')];
            var expected_bs_put = values[test_data.columns.indexOf('bs_put')];

            var bs_call = black_scholes_merton('c', S, K, t, r, sigma, q);
            var bs_put = black_scholes_merton('p', S, K, t, r, sigma, q);

            assertEquals(bs_call, expected_bs_call, 0.000001);
            assertEquals(bs_put, expected_bs_put, 0.000001);
        });

    });

    QUnit.test("test_analytical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = analytical.delta('c', S, K, t, r, sigma, q);
            var pd = analytical.delta('p', S, K, t, r, sigma, q);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_analytical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = analytical.theta('c', S, K, t, r, sigma, q);
            var pt = analytical.theta('p', S, K, t, r, sigma, q);

            assertEquals(ct, expected_ct, 0.000001);
            assertEquals(pt, expected_pt, 0.000001);
        });

    });

    QUnit.test("test_analytical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = analytical.gamma('c', S, K, t, r, sigma, q);
            var pg = analytical.gamma('p', S, K, t, r, sigma, q);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_analytical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = analytical.vega('c', S, K, t, r, sigma, q);
            var pv = analytical.vega('p', S, K, t, r, sigma, q);

            assertEquals(cv, expected_cv, 0.000001);
            assertEquals(pv, expected_pv, 0.000001);
        });

    });

    QUnit.test("test_analytical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = analytical.rho('c', S, K, t, r, sigma, q);
            var pr = analytical.rho('p', S, K, t, r, sigma, q);

            assertEquals(cr, expected_cr, 0.000000001);
            assertEquals(pr, expected_pr, 0.000000001);
        });

    });

    QUnit.test("test_numerical_delta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cd = values[test_data.columns.indexOf('CD')];
            var expected_pd = values[test_data.columns.indexOf('PD')];

            var cd = numerical.delta('c', S, K, t, r, sigma, q);
            var pd = numerical.delta('p', S, K, t, r, sigma, q);

            assertEquals(cd, expected_cd, 0.000001);
            assertEquals(pd, expected_pd, 0.000001);
        });

    });

    QUnit.test("test_numerical_theta", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_ct = values[test_data.columns.indexOf('CT')] / 365.0;
            var expected_pt = values[test_data.columns.indexOf('PT')] / 365.0;

            var ct = numerical.theta('c', S, K, t, r, sigma, q);
            var pt = numerical.theta('p', S, K, t, r, sigma, q);

            assertEquals(ct, expected_ct, 1);
            assertEquals(pt, expected_pt, 1);
        });

    });

    QUnit.test("test_numerical_gamma", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cg = values[test_data.columns.indexOf('CG')];
            var expected_pg = values[test_data.columns.indexOf('PG')];

            var cg = numerical.gamma('c', S, K, t, r, sigma, q);
            var pg = numerical.gamma('p', S, K, t, r, sigma, q);

            assertEquals(cg, expected_cg, 0.000001);
            assertEquals(pg, expected_pg, 0.000001);
        });

    });

    QUnit.test("test_numerical_vega", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cv = values[test_data.columns.indexOf('CV')] * 0.01;
            var expected_pv = values[test_data.columns.indexOf('PV')] * 0.01;

            var cv = numerical.vega('c', S, K, t, r, sigma, q);
            var pv = numerical.vega('p', S, K, t, r, sigma, q);

            assertEquals(cv, expected_cv, 0.01);
            assertEquals(pv, expected_pv, 0.01);
        });

    });

    QUnit.test("test_numerical_rho", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var expected_cr = values[test_data.columns.indexOf('CR')] * 0.01;
            var expected_pr = values[test_data.columns.indexOf('PR')] * 0.01;

            var cr = numerical.rho('c', S, K, t, r, sigma, q);
            var pr = numerical.rho('p', S, K, t, r, sigma, q);

            assertEquals(cr, expected_cr, 0.001);
            assertEquals(pr, expected_pr, 0.001);
        });

    });

    QUnit.test("test_implied_volatility", function () {

        test_data.data.forEach(function (values, index) {
            var S = values[test_data.columns.indexOf('S')];
            var K = values[test_data.columns.indexOf('K')];
            var t = values[test_data.columns.indexOf('t')];
            var r = values[test_data.columns.indexOf('R')];
            var sigma = values[test_data.columns.indexOf('v')];

            var C = black_scholes_merton('c', S, K, t, r, sigma, q);
            var P = black_scholes_merton('p', S, K, t, r, sigma, q);

            var expected_iv_c = sigma;
            var expected_iv_p = sigma;

            var iv_c = implied_volatility(C, S, K, t, r, q, 'c');
            var iv_p = implied_volatility(P, S, K, t, r, q, 'p');

            assertEquals(iv_c, expected_iv_c, 0.0001);

            assertImpliedVolatilityPUTValue(iv_p, expected_iv_p, js_vollib.helpers.BRENT_MIN, 0.001);

        });

    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_ref.test_black_scholes_merton_greeks");

    var analytical = js_vollib.js_ref.black_scholes_merton.greeks.analytical;
    var numerical = js_vollib.js_ref.black_scholes_merton.greeks.numerical;

    var N = 10;

    var flags = ['c', 'p'];
    var S = 100;
    var Ks = linspace(20, 200, N);
    var ts = linspace(0.01, 2, N);
    var rs = linspace(0, 0.2, N);
    var sigmas = linspace(0.1, 0.5, N);
    var q = 0.5;

    var EPSILON = 0.001;

    QUnit.test("test_theta", function () {
        flags.forEach(function (flag, flag_i) {
            for (i = 0; i < N; i++) {
                var K = Ks[i];
                var t = ts[i];
                var r = rs[i];
                var sigma = sigmas[i];
                var a_theta = analytical.theta(flag, S, K, t, r, sigma, q);
                var n_theta = numerical.theta(flag, S, K, t, r, sigma, q);
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
                var a_delta = analytical.delta(flag, S, K, t, r, sigma, q);
                var n_delta = numerical.delta(flag, S, K, t, r, sigma, q);
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
                var a_gamma = analytical.gamma(flag, S, K, t, r, sigma, q);
                var n_gamma = numerical.gamma(flag, S, K, t, r, sigma, q);
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
                var a_vega = analytical.vega(flag, S, K, t, r, sigma, q);
                var n_vega = numerical.vega(flag, S, K, t, r, sigma, q);
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
                var a_rho = analytical.rho(flag, S, K, t, r, sigma, q);
                var n_rho = numerical.rho(flag, S, K, t, r, sigma, q);
                assertEquals(a_rho, n_rho, EPSILON);
            }

        });
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.black.greeks.test_analytical");

    var black = js_vollib.black.black;
    var analytical = js_vollib.black.greeks.analytical;

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
(function () {
    QUnit.module("js_vollib.black_scholes.greeks.test_analytical");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var analytical = js_vollib.black_scholes.greeks.analytical;

    var EPSILON = 0.000001;

    QUnit.test("test_delta", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var delta_calc = analytical.delta(flag, S, K, t, r, sigma);
        assertEquals(delta_calc, 0.521601633972, EPSILON);
    });

    QUnit.test("test_theta", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var annual_theta_calc = analytical.theta(flag, S, K, t, r, sigma) * 365;
        assertEquals(annual_theta_calc, -4.30538996455, EPSILON);

        flag = 'p';
        annual_theta_calc = analytical.theta(flag, S, K, t, r, sigma) * 365;
        assertEquals(annual_theta_calc, -1.8530056722, EPSILON);
    });

    QUnit.test("test_gamma", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var gamma_calc = analytical.gamma(flag, S, K, t, r, sigma);
        assertEquals(gamma_calc, 0.0655453772525, EPSILON);
    });

    QUnit.test("test_vega", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var vega_calc = analytical.vega(flag, S, K, t, r, sigma);
        assertEquals(vega_calc, 0.121052427542, EPSILON);
    });

    QUnit.test("test_rho", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var rho_calc = analytical.rho(flag, S, K, t, r, sigma);
        assertEquals(rho_calc, 0.089065740988, EPSILON);
    });

}).call(this);
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
(function () {
    QUnit.module("js_vollib.black_scholes_merton.greeks.test_numerical");

    var analytical = js_vollib.black_scholes_merton.greeks.analytical;
    var numerical = js_vollib.black_scholes_merton.greeks.numerical;

    var EPSILON = 0.01;

    var S = 1000.0, K = 1000.0, t = 0.1, r = 0.05, sigma = 0.2, q = 0.05;

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
(function () {
    QUnit.module("js_vollib.js_ref.black.test_black");

    var black = js_vollib.js_ref.black;

    QUnit.test("test_d1", function () {
        var F = 20, K = 20, r = 0.09, t = 4/12.0, sigma = 0.25;
        var calculated_value = black.d1(F, K, t, r, sigma);
        assertEquals(calculated_value, 0.0721687836487, 1e-12);
    });

    QUnit.test("test_d2", function () {
        var F = 20, K = 20, r = 0.09, t = 4/12.0, sigma = 0.25;
        var calculated_value = black.d2(F, K, t, r, sigma);
        assertEquals(calculated_value, -0.0721687836487, 1e-12);
    });

    QUnit.test("test_black_call", function () {
        var F = 620, K = 600, r = 0.05, sigma = 0.2, t = 0.5;
        var calculated_value = black.black_call(F, K, t, r, sigma);
        assertEquals(calculated_value, 44.1868533121, 1e-10);
    });

    QUnit.test("test_black_put", function () {
        var F = 20, K = 20, r = 0.09, sigma = 0.25, t = 4/12.0;
        var calculated_value = black.black_put(F, K, t, r, sigma);
        assertEquals(calculated_value, 1.11664145656, 1e-10);
    });

    QUnit.test("test_black", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', r = 0.02, t = 0.5;
        var expected = 5.5811067246048118;
        var actual = black.black(flag, F, K, t, r, sigma);
        assertEquals(actual, expected, 1e-12);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black.test_implied_volatility");

    var black = js_vollib.js_ref.black;

    QUnit.test("test_implied_volatility_put", function () {
        var F = 101.0, K = 102.0, sigma_in = 0.2, flag = 'p', t = 0.5, r = 0.01;
        var price = black.black(flag, F, K, t, r, sigma_in);
        var sigma_out = black.implied_volatility.implied_volatility(price, F, K, r, t, flag);

        var expected_price = 6.20451158097;
        assertEquals(price, expected_price, 0.00001);
        assertEquals(sigma_out, sigma_in, 0.00001);
    });

    QUnit.test("test_implied_volatility_call", function () {
        var F = 100, K = 100, sigma_in = 0.2, flag = 'c', t = 0.5, r = 0.02;
        var price = black.black(flag, F, K, t, r, sigma_in);
        var sigma_out = black.implied_volatility.implied_volatility(price, F, K, r, t, flag);

        var expected_price = 5.5811067246;
        assertEquals(price, expected_price, 0.00001);
        assertEquals(sigma_out, sigma_in, 0.00001);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes.test_black_scholes");

    var black_scholes = js_vollib.js_ref.black_scholes;

    QUnit.test("test_d1", function () {
        var S = 42, K = 40, r = 0.10, sigma = 0.20, t = 0.5;
        var calculated_d1 = black_scholes.d1(S, K, t, r, sigma);
        var text_book_d1 = 0.7693;
        assertEquals(calculated_d1, text_book_d1, 0.0001);
    });

    QUnit.test("test_d2", function () {
        var S = 42, K = 40, r = 0.10, sigma = 0.20, t = 0.5;
        var calculated_d2 = black_scholes.d2(S, K, t, r, sigma);
        var text_book_d2 = 0.6278;
        assertEquals(calculated_d2, text_book_d2, 0.0001);
    });

    QUnit.test("test_black_scholes", function () {
        var S = 60, K = 65, t = 0.25, r = 0.08, sigma = 0.3;
        var actual = black_scholes.black_scholes('c', S, K, t, r, sigma);
        var expected = 2.13336844492;
        assertEquals(actual, expected, 1e-11);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes.test_implied_volatility");

    var black_scholes = js_vollib.js_ref.black_scholes;

    QUnit.test("test_implied_volatility_put", function () {
        var S = 100.0, K = 1000.0, sigma = 0.3, flag = 'p', t = 0.5, r = 0.05;
        var price = black_scholes.black_scholes(flag, S, K, t, r, sigma);
        var iv = black_scholes.implied_volatility.implied_volatility(price, S, K, t, r, flag);

        var expected_price = 875.309912028;
        assertEquals(price, expected_price, 0.00001);
        assertEquals(iv, 0.0, 01);
    });

    QUnit.test("test_implied_volatility_call", function () {
        var S = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5, r = 0.01;
        var price = black_scholes.black_scholes(flag, S, K, t, r, sigma);
        var iv = black_scholes.implied_volatility.implied_volatility(price, S, K, t, r, flag);

        var expected_price = 5.87602423383;
        assertEquals(price, expected_price, 0.00001);
        assertEquals(iv, 0.2, 0.01);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes_merton.test_black_scholes_merton");

    var black_scholes_merton = js_vollib.js_ref.black_scholes_merton;

    QUnit.test("test_d1", function () {
        var S = 100, K = 95, q = 0.05, r = 0.10, sigma = 0.20, t = 0.5;
        var calculated_d1 = black_scholes_merton.d1(S, K, t, r, sigma, q);
        var text_book_d1 = 0.6102;
        assertEquals(calculated_d1, text_book_d1, 0.0001);
    });

    QUnit.test("test_d2", function () {
        var S = 100, K = 95, q = 0.05, r = 0.10, sigma = 0.20, t = 0.5;
        var calculated_d2 = black_scholes_merton.d2(S, K, t, r, sigma, q);
        var text_book_d2 = 0.4688;
        assertEquals(calculated_d2, text_book_d2, 0.0001);
    });

    QUnit.test("test_black_scholes_merton", function () {
        var S = 100, K = 95, q = 0.05, r = 0.10, sigma = 0.20, t = 0.5;
        var actual = black_scholes_merton.black_scholes_merton('p', S, K, t, r, sigma, q);
        var expected = 2.4648;
        assertEquals(actual, expected, 0.0001);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes_merton.test_implied_volatility");

    var black_scholes_merton = js_vollib.js_ref.black_scholes_merton;
    var EPSILON = 1e-10;

    QUnit.test("test_implied_volatility_put", function () {
        var S = 100.0, K = 100.0, sigma = 0.3, flag = 'p', t = 0.5, r = 0.01, q = 0.02;
        var price = black_scholes_merton.black_scholes_merton(flag, S, K, t, r, sigma, q);
        var iv = black_scholes_merton.implied_volatility.implied_volatility(price, S, K, t, r, q, flag);

        var expected_price = 8.6343656245353273;
        assertEquals(price, expected_price, EPSILON);
        assertEquals(iv, 0.29999999999999954, EPSILON);
    });

    QUnit.test("test_implied_volatility_call", function () {
        var S = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5, r = 0.01, q = 0.02;
        var price = black_scholes_merton.black_scholes_merton(flag, S, K, t, r, sigma, q);
        var iv = black_scholes_merton.implied_volatility.implied_volatility(price, S, K, t, r, q, flag);

        var expected_price = 5.3504528963456579;
        assertEquals(price, expected_price, EPSILON);
        assertEquals(iv, 0.20000000000000018, EPSILON);
    });

}).call(this);
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
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_implied_volatility");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    var implied_volatility = js_vollib.black.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black.implied_volatility.implied_volatility;

    QUnit.test("test_implied_volatility", function () {
        var F = 100, K = 100, sigma = 0.2, t = 0.5, r = 0.02;

        (['c', 'p']).forEach(function (flag, flag_i) {
            var price = black(flag, F, K, t, r, sigma);
            var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);

            var iv = implied_volatility(price, F, K, r, t, flag);
            var js_ref_iv = js_ref_implied_volatility(js_ref_price, F, K, r, t, flag);

            assertEquals(iv, js_ref_iv, 1e-15);
        });
    });

    QUnit.test("test_below_intrinsic_volatility_error", function () {
        var price = -1.0;
        var F = 100;
        var K = 100;
        var t = 0.5;
        var flag = 'c';

        QUnit.assert.throws(
            function () {
                implied_volatility(price, F, K, 0, t, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );

        QUnit.assert.throws(
            function () {
                js_ref_implied_volatility(price, F, K, 0, t, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );
    });

    QUnit.test("test_above_maximum_volatility_error", function () {
        var price = 200;
        var F = 100;
        var K = 100;
        var T = 0.5;
        var flag = 'c';

        QUnit.assert.throws(
            function () {
                implied_volatility(price, F, K, 0, T, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );

        QUnit.assert.throws(
            function () {
                js_ref_implied_volatility(price, F, K, 0, T, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );


    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_price");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    QUnit.test("test_price", function () {
        var F = 100, K = 90, sigma = 0.2, r = 0.02, t = 0.5;

        (['c', 'p']).forEach(function (flag, flag_i){
            var price = black(flag, F, K, t, r, sigma);
            var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);
            assertEquals(price, js_ref_price, 1e-13);
        });
    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_using_test_data.json_values");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    var implied_volatility = js_vollib.black.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black.implied_volatility.implied_volatility;

    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function (flag, flag_i) {
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var F = S * Math.exp(r*t);
                F = Math.round(F * 100) / 100;

                var price = black(flag, F, K, t, r, sigma);
                var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);

                assertEquals(js_ref_price, price, 1e-11);

            });
        });
    });

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.0012;
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var F = S * Math.exp(r*t);
                F = Math.round(F * 100) / 100;

                var price = black(flag, F, K, t, r, sigma);
                var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);

                var iv = implied_volatility(price, F, K, r, t, flag);
                var js_ref_iv = js_ref_implied_volatility(js_ref_price, F, K, r, t, flag);

                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });


    QUnit.test("test_implied_volatility_with_exceptions", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.001;
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var decimal_places = 1e10;
                var F = S * Math.exp(r*t);
                F = Math.round(F * decimal_places) / decimal_places;

                var price = black(flag, F, K, t, r, sigma);
                price = Math.round(price * decimal_places) / decimal_places;

                var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);
                js_ref_price = Math.round(js_ref_price * decimal_places) / decimal_places;

                var iv = null;
                var iv_err = null;
                try {
                    iv = implied_volatility(price, F, K, r, t, flag);
                } catch (err) {
                    iv_err = err.name;
                }

                var js_ref_iv = null;
                var ref_iv_err = null;
                try {
                    js_ref_iv = js_ref_implied_volatility(js_ref_price, F, K, r, t, flag);
                } catch (err) {
                    ref_iv_err = err.name;
                }

                var message = "Expected Exception: ".concat(iv_err, "\ Actual Exception: ", ref_iv_err);
                QUnit.assert.deepEqual(iv_err, ref_iv_err, message);

                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });


}).call(this);
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
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_implied_volatility");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var js_ref_black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    var implied_volatility = js_vollib.black_scholes.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes.implied_volatility.implied_volatility;

    var S = 100, K = 100, sigma = 0.232323232, t = 0.5, r = 0.01;
    var flags = ['c', 'p'];

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            var price = black_scholes(flag, S, K, t, r, sigma);
            var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);

            var iv = implied_volatility(price, S, K, t, r, flag);
            var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, flag);

            assertEquals(iv, js_ref_iv, 1e-15);
        });
    });


    QUnit.test("test_below_intrinsic_volatility_error", function () {
        var price = -1.0;
        var S = 100;
        var K = 100;
        var t = 0.5;
        var r = 0;
        var flag = 'c';

        QUnit.assert.throws(
            function () {
                implied_volatility(price, S, K, t, r, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );

        QUnit.assert.throws(
            function () {
                js_ref_implied_volatility(price, S, K, t, r, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );
    });

    QUnit.test("test_above_maximum_volatility_error", function () {
        var price = 200;
        var S = 100;
        var K = 100;
        var t = 0.5;
        var r = 0;
        var flag = 'c';

        QUnit.assert.throws(
            function () {
                implied_volatility(price, S, K, t, r, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );

        QUnit.assert.throws(
            function () {
                js_ref_implied_volatility(price, S, K, t, r, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );
    });


}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_price");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var js_ref_black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    var S = 100, K = 90, r = 0.01, t = 0.5, sigma = 0.2;
    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function(flag, flag_i){
            var price = black_scholes(flag, S, K, t, r, sigma);
            var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);
            assertEquals(price, js_ref_price, 1e-13);
        });
    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_using_test_data.json_values");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var js_ref_black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    var implied_volatility = js_vollib.black_scholes.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes.implied_volatility.implied_volatility;

    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function (flag, flag_i) {
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var price = black_scholes(flag, S, K, t, r, sigma);
                var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);

                assertEquals(js_ref_price, price, 1e-11);

            });
        });
    });

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.001;
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var price = black_scholes(flag, S, K, t, r, sigma);
                var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);

                var iv = implied_volatility(price, S, K, t, r, flag);
                var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, flag);

                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes_merton.test_greeks");

    var analytical = js_vollib.black_scholes_merton.greeks.analytical;
    var js_ref_analytical = js_vollib.js_ref.black_scholes_merton.greeks.analytical;
    
    var numerical = js_vollib.black_scholes_merton.greeks.numerical;
    var js_ref_numerical = js_vollib.js_ref.black_scholes_merton.greeks.numerical;
    
    var S = 49, K = 50, sigma = 0.2, r = 0.05, t = 0.3846, q = 0.2;
    var flags = ['c', 'p'];
    
    var EPSILON = 1e-15;
    var nEPSILON = 1e-9;

    QUnit.test("test_analytical_delta", function () {
        flags.forEach(function(flag, flag_i){
            var delta = analytical.delta(flag, S, K, t, r, sigma, q);
            var js_ref_delta = js_ref_analytical.delta(flag, S, K, t, r, sigma, q);
            assertEquals(delta, js_ref_delta, EPSILON);
        });
    });

    QUnit.test("test_analytical_gamma", function () {
        flags.forEach(function(flag, flag_i){
            var gamma = analytical.gamma(flag, S, K, t, r, sigma, q);
            var js_ref_gamma = js_ref_analytical.gamma(flag, S, K, t, r, sigma, q);
            assertEquals(gamma, js_ref_gamma, EPSILON);
        });
    });

    QUnit.test("test_analytical_rho", function () {
        flags.forEach(function(flag, flag_i){
            var rho = analytical.rho(flag, S, K, t, r, sigma, q);
            var js_ref_rho = js_ref_analytical.rho(flag, S, K, t, r, sigma, q);
            assertEquals(rho, js_ref_rho, EPSILON);
        });
    });

    QUnit.test("test_analytical_theta", function () {
        flags.forEach(function(flag, flag_i){
            var theta = analytical.theta(flag, S, K, t, r, sigma, q);
            var js_ref_theta = js_ref_analytical.theta(flag, S, K, t, r, sigma, q);
            assertEquals(theta, js_ref_theta, EPSILON);
        });
    });

    QUnit.test("test_analytical_vega", function () {
        flags.forEach(function(flag, flag_i){
            var vega = analytical.vega(flag, S, K, t, r, sigma, q);
            var js_ref_vega = js_ref_analytical.vega(flag, S, K, t, r, sigma, q);
            assertEquals(vega, js_ref_vega, EPSILON);
        });
    });
    
    QUnit.test("test_numerical_delta", function () {
        flags.forEach(function(flag, flag_i){
            var delta = numerical.delta(flag, S, K, t, r, sigma, q);
            var js_ref_delta = js_ref_numerical.delta(flag, S, K, t, r, sigma, q);
            assertEquals(delta, js_ref_delta, nEPSILON);
        });
    });

    QUnit.test("test_numerical_gamma", function () {
        flags.forEach(function(flag, flag_i){
            var gamma = numerical.gamma(flag, S, K, t, r, sigma, q);
            var js_ref_gamma = js_ref_numerical.gamma(flag, S, K, t, r, sigma, q);
            assertEquals(gamma, js_ref_gamma, nEPSILON);
        });
    });

    QUnit.test("test_numerical_rho", function () {
        flags.forEach(function(flag, flag_i){
            var rho = numerical.rho(flag, S, K, t, r, sigma, q);
            var js_ref_rho = js_ref_numerical.rho(flag, S, K, t, r, sigma, q);
            assertEquals(rho, js_ref_rho, nEPSILON);
        });
    });

    QUnit.test("test_numerical_theta", function () {
        flags.forEach(function(flag, flag_i){
            var theta = numerical.theta(flag, S, K, t, r, sigma, q);
            var js_ref_theta = js_ref_numerical.theta(flag, S, K, t, r, sigma, q);
            assertEquals(theta, js_ref_theta, nEPSILON);
        });
    });

    QUnit.test("test_numerical_vega", function () {
        flags.forEach(function(flag, flag_i){
            var vega = numerical.vega(flag, S, K, t, r, sigma, q);
            var js_ref_vega = js_ref_numerical.vega(flag, S, K, t, r, sigma, q);
            assertEquals(vega, js_ref_vega, nEPSILON);
        });
    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes_merton.test_implied_volatility");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var js_ref_black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    var implied_volatility = js_vollib.black_scholes_merton.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes_merton.implied_volatility.implied_volatility;

    var S = 100, K = 100, sigma = 0.232323232, t = 0.5, r = 0.01, q = 0.05;
    var flags = ['c', 'p'];

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function(flag, flag_i){
            var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
            var js_ref_price = js_ref_black_scholes_merton(flag, S, K, t, r, sigma, q);

            var iv = implied_volatility(price, S, K, t, r, q, flag);
            var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, q, flag);

            assertEquals(iv, js_ref_iv, 1e-15);
        });
    });


    QUnit.test("test_below_intrinsic_volatility_error", function(){
        var price = -1.0;
        var S = 100;
        var K = 100;
        var t = 0.5;
        var r = 0;
        var q = 0.05;
        var flag = 'c';

        QUnit.assert.throws(
            function() {
                implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );

        QUnit.assert.throws(
            function() {
                js_ref_implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );
    });

    QUnit.test("test_above_maximum_volatility_error", function(){
        var price = 200;
        var S = 100;
        var K = 100;
        var t = 0.5;
        var r = 0;
        var flag = 'c';

        QUnit.assert.throws(
            function() {
                implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );

        QUnit.assert.throws(
            function() {
                js_ref_implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );
    });


}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes_merton.test_price");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var js_ref_black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    var S = 100, K = 95, r = 0.01, q = 0.05, t = 0.5, sigma = 0.2;
    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function(flag, flag_i){
            var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
            var js_ref_price = js_ref_black_scholes_merton(flag, S, K, t, r, sigma, q);
            assertEquals(price, js_ref_price, 1e-13);
        });
    });

}).call(this);
(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes_merton.test_using_test_data.json_values");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var js_ref_black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    var implied_volatility = js_vollib.black_scholes_merton.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes_merton.implied_volatility.implied_volatility;

    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function (flag, flag_i) {
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];
                var q = 0.3;

                var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
                var js_ref_price = js_ref_black_scholes_merton(flag, S, K, t, r, sigma, q);

                assertEquals(js_ref_price, price, 1e-11);

            });
        });
    });

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.001;
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];
                var q = 0;

                var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
                var js_ref_price = js_ref_black_scholes_merton(flag, S, K, t, r, sigma, q);

                var iv = implied_volatility(price, S, K, t, r, q, flag);
                var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, q, flag);


                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes.greeks.test_analytical");

    var black_scholes = js_vollib.js_ref.black_scholes.black_scholes;
    var analytical = js_vollib.js_ref.black_scholes.greeks.analytical;

    var EPSILON = 0.000001;

    QUnit.test("test_delta", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var delta_calc = analytical.delta(flag, S, K, t, r, sigma);
        assertEquals(delta_calc, 0.521601633972, EPSILON);
    });

    QUnit.test("test_theta", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var annual_theta_calc = analytical.theta(flag, S, K, t, r, sigma) * 365;
        assertEquals(annual_theta_calc, -4.30538996455, EPSILON);

        flag = 'p';
        annual_theta_calc = analytical.theta(flag, S, K, t, r, sigma) * 365;
        assertEquals(annual_theta_calc, -1.8530056722, EPSILON);
    });

    QUnit.test("test_gamma", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var gamma_calc = analytical.gamma(flag, S, K, t, r, sigma);
        assertEquals(gamma_calc, 0.0655453772525, EPSILON);
    });

    QUnit.test("test_vega", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var vega_calc = analytical.vega(flag, S, K, t, r, sigma);
        assertEquals(vega_calc, 0.121052427542, EPSILON);
    });

    QUnit.test("test_rho", function () {
        var S = 49, K = 50, r = 0.05, t = 0.3846, sigma = 0.2, flag = 'c';
        var rho_calc = analytical.rho(flag, S, K, t, r, sigma);
        assertEquals(rho_calc, 0.089065740988, EPSILON);
    });

}).call(this);
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes.greeks.test_numerical");

    var analytical = js_vollib.js_ref.black_scholes.greeks.analytical;
    var numerical = js_vollib.js_ref.black_scholes.greeks.numerical;

    var EPSILON = 0.0001;

    var S = 49.0, K = 50.0, t = 0.3846, r = 0.05, sigma = 0.2;

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
(function () {
    QUnit.module("js_vollib.js_ref.black.greeks.test_numerical");

    var analytical = js_vollib.js_ref.black.greeks.analytical;
    var numerical = js_vollib.js_ref.black.greeks.numerical;

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
(function () {
    QUnit.module("js_vollib.js_ref.black_scholes_merton.greeks.test_analytical");

    var black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;
    var analytical = js_vollib.js_ref.black_scholes_merton.greeks.analytical;

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