(function () {
    QUnit.module("js_vollib.black_scholes_merton.test_black_scholes_merton");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;

    QUnit.test("test_black_scholes_merton", function () {
        var S = 100, K = 95, q = 0.05, t = 0.5, r = 0.1, sigma = 0.2;
        assertEquals(black_scholes_merton('p', S, K, t, r, sigma, q), 2.4648, 0.0001);
    });

}).call(this);