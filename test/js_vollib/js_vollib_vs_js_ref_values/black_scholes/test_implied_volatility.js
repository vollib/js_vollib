(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_implied_volatility");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var js_ref_black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    var implied_volatility = js_vollib.black_scholes.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes.implied_volatility.implied_volatility;

    var S = 100, K = 100, sigma = 0.232323232, t = 0.5, r = 0.01;
    var flags = ['c', 'p'];

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i){
            var price = black_scholes(flag, S, K, t, r, sigma);
            var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);

            var iv = implied_volatility(price, S, K, t, r, flag);
            var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, flag);

            assertEquals(iv, js_ref_iv, 1e-15);
        });
    });

}).call(this);