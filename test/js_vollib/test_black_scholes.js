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