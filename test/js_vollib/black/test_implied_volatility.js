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