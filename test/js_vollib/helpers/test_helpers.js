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
        assertEquals(actual, expected, 0);
    });

}).call(this);