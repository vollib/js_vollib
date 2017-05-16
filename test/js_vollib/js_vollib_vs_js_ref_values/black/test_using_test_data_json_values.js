(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_using_test_data.json_values");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    var implied_volatility = js_vollib.black.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black.implied_volatility.implied_volatility;

    var flags = ['c', 'p'];

    var EPSILON = 0.0015;

    QUnit.test("test_price", function () {
        flags.forEach(function (flag, flag_i) {
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var F = S * Math.exp(r*t);

                var price = black(flag, F, K, t, r, sigma);
                var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);

                assertEquals(js_ref_price, price, EPSILON);

            });
        });
    });

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var F = S * Math.exp(r*t);
                F = Math.round(F * 100) / 100;

                var price = black(flag, F, K, t, r, sigma);
                var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);

                var iv = implied_volatility(price, F, K, r, t, flag);
                var js_ref_iv = js_ref_implied_volatility(js_ref_price, F, K, r, t, flag);

                assertEquals(js_ref_iv, iv, EPSILON);

            });
        });
    });

}).call(this);