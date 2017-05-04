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