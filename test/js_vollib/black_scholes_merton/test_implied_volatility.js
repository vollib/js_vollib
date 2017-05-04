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