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