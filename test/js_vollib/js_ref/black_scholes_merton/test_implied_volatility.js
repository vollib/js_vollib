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