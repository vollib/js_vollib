(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_price");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    QUnit.test("test_price", function () {
        var F = 100, K = 90, sigma = 0.2, r = 0.02, t = 0.5;

        (['c', 'p']).forEach(function (flag, flag_i){
            var price = black(flag, F, K, t, r, sigma);
            var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);
            assertEquals(price, js_ref_price, 1e-13);
        });
    });

}).call(this);