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