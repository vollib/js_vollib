(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_price");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var js_ref_black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    var S = 100, K = 90, r = 0.01, t = 0.5, sigma = 0.2;
    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function(flag, flag_i){
            var price = black_scholes(flag, S, K, t, r, sigma);
            var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);
            assertEquals(price, js_ref_price, 1e-13);
        });
    });

}).call(this);