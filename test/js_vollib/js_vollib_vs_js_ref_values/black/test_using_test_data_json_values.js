(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black.test_using_test_data.json_values");

    var black = js_vollib.black.black;
    var js_ref_black = js_vollib.js_ref.black.black;

    var implied_volatility = js_vollib.black.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black.implied_volatility.implied_volatility;

    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
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

                assertEquals(js_ref_price, price, 1e-11);

            });
        });
    });

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.0012;
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

                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });


    QUnit.test("test_implied_volatility_with_exceptions", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.001;
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var decimal_places = 1e10;
                var F = S * Math.exp(r*t);
                F = Math.round(F * decimal_places) / decimal_places;

                var price = black(flag, F, K, t, r, sigma);
                price = Math.round(price * decimal_places) / decimal_places;

                var js_ref_price = js_ref_black(flag, F, K, t, r, sigma);
                js_ref_price = Math.round(js_ref_price * decimal_places) / decimal_places;

                var iv = null;
                var iv_err = null;
                try {
                    iv = implied_volatility(price, F, K, r, t, flag);
                } catch (err) {
                    iv_err = err.name;
                }

                var js_ref_iv = null;
                var ref_iv_err = null;
                try {
                    js_ref_iv = js_ref_implied_volatility(js_ref_price, F, K, r, t, flag);
                } catch (err) {
                    ref_iv_err = err.name;
                }

                var message = "Expected Exception: ".concat(iv_err, "\ Actual Exception: ", ref_iv_err);
                QUnit.assert.deepEqual(iv_err, ref_iv_err, message);

                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });


}).call(this);