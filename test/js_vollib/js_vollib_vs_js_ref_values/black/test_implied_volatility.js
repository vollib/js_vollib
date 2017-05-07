(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_implied_volatility");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    var implied_volatility = js_vollib.black.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black.implied_volatility.implied_volatility;

    QUnit.test("test_implied_volatility", function () {
        var F = 100, K = 100, sigma = 0.2, t = 0.5, r = 0.02;

        (['c', 'p']).forEach(function (flag, flag_i) {
            var price = black(flag, F, K, t, r, sigma);
            var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);

            var iv = implied_volatility(price, F, K, r, t, flag);
            var js_ref_iv = js_ref_implied_volatility(js_ref_price, F, K, r, t, flag);

            assertEquals(iv, js_ref_iv, 1e-15);
        });
    });

    QUnit.test("test_below_intrinsic_volatility_error", function () {
        var price = -1.0;
        var F = 100;
        var K = 100;
        var t = 0.5;
        var flag = 'c';

        QUnit.assert.throws(
            function () {
                implied_volatility(price, F, K, 0, t, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );

        QUnit.assert.throws(
            function () {
                js_ref_implied_volatility(price, F, K, 0, t, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic && !(error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum);
            }
        );
    });

    QUnit.test("test_above_maximum_volatility_error", function () {
        var price = 200;
        var F = 100;
        var K = 100;
        var T = 0.5;
        var flag = 'c';

        QUnit.assert.throws(
            function () {
                implied_volatility(price, F, K, 0, T, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );

        QUnit.assert.throws(
            function () {
                js_ref_implied_volatility(price, F, K, 0, T, flag);
            }, function (error) {
                return error instanceof js_vollib.helpers.exceptions.PriceIsAboveMaximum && !(error instanceof js_vollib.helpers.exceptions.PriceIsBelowIntrinsic);
            }
        );


    });

}).call(this);