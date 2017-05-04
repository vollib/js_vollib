(function () {
    QUnit.module("js_vollib.js_ref.black.test_black");

    var black = js_vollib.js_ref.black;

    QUnit.test("test_d1", function () {
        var F = 20, K = 20, r = 0.09, t = 4/12.0, sigma = 0.25;
        var calculated_value = black.d1(F, K, t, r, sigma);
        assertEquals(calculated_value, 0.0721687836487, 1e-12);
    });

    QUnit.test("test_d2", function () {
        var F = 20, K = 20, r = 0.09, t = 4/12.0, sigma = 0.25;
        var calculated_value = black.d2(F, K, t, r, sigma);
        assertEquals(calculated_value, -0.0721687836487, 1e-12);
    });

    QUnit.test("test_black_call", function () {
        var F = 620, K = 600, r = 0.05, sigma = 0.2, t = 0.5;
        var calculated_value = black.black_call(F, K, t, r, sigma);
        assertEquals(calculated_value, 44.1868533121, 1e-10);
    });

    QUnit.test("test_black_put", function () {
        var F = 20, K = 20, r = 0.09, sigma = 0.25, t = 4/12.0;
        var calculated_value = black.black_put(F, K, t, r, sigma);
        assertEquals(calculated_value, 1.11664145656, 1e-10);
    });

    QUnit.test("test_black", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', r = 0.02, t = 0.5;
        var expected = 5.5811067246048118;
        var actual = black.black(flag, F, K, t, r, sigma);
        assertEquals(actual, expected, 1e-12);
    });

}).call(this);