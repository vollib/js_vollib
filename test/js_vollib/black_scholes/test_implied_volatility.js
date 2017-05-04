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