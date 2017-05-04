(function () {
    QUnit.module("js_vollib.black_scholes.test_black_scholes");

    var black_scholes = js_vollib.black_scholes.black_scholes;

    var EPSILON = 0.000001;

    QUnit.test("testBlack_scholes_call", function () {
        assertEquals(black_scholes('c', 100, 90, 0.5, 0.01, 0.2), 12.111581435, EPSILON);
    });

    QUnit.test("testBlack_scholes_put", function () {
        assertEquals(black_scholes('p', 100, 90, 0.5, 0.01, 0.2), 1.66270456231, EPSILON);
    });

}).call(this);