(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes_merton.test_price");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var js_ref_black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    var S = 100, K = 95, r = 0.01, q = 0.05, t = 0.5, sigma = 0.2;
    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function(flag, flag_i){
            var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
            var js_ref_price = js_ref_black_scholes_merton(flag, S, K, t, r, sigma, q);
            assertEquals(price, js_ref_price, 1e-13);
        });
    });

}).call(this);