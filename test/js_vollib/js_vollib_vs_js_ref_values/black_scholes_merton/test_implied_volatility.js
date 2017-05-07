(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes_merton.test_implied_volatility");

    var black_scholes_merton = js_vollib.black_scholes_merton.black_scholes_merton;
    var js_ref_black_scholes_merton = js_vollib.js_ref.black_scholes_merton.black_scholes_merton;

    var implied_volatility = js_vollib.black_scholes_merton.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes_merton.implied_volatility.implied_volatility;

    var S = 100, K = 100, sigma = 0.232323232, t = 0.5, r = 0.01, q = 0.05;
    var flags = ['c', 'p'];

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function(flag, flag_i){
            var price = black_scholes_merton(flag, S, K, t, r, sigma, q);
            var js_ref_price = js_ref_black_scholes_merton(flag, S, K, t, r, sigma, q);

            var iv = implied_volatility(price, S, K, t, r, q, flag);
            var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, q, flag);

            assertEquals(iv, js_ref_iv, 1e-15);
        });
    });


    QUnit.test("test_below_intrinsic_volatility_error", function(){
        var price = -1.0;
        var S = 100;
        var K = 100;
        var t = 0.5;
        var r = 0;
        var q = 0.05;
        var flag = 'c';

        QUnit.assert.throws(
            function() {
                implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );

        QUnit.assert.throws(
            function() {
                js_ref_implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );
    });

    QUnit.test("test_above_maximum_volatility_error", function(){
        var price = 200;
        var S = 100;
        var K = 100;
        var t = 0.5;
        var r = 0;
        var flag = 'c';

        QUnit.assert.throws(
            function() {
                implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );

        QUnit.assert.throws(
            function() {
                js_ref_implied_volatility(price, S, K, t, r, q, flag);
            }, function(error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );
    });


}).call(this);