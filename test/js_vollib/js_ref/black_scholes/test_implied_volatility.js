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