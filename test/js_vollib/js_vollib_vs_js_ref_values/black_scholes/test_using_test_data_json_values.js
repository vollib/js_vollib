(function () {

    QUnit.module("js_vollib.js_vollib_vs_js_ref_values.black_scholes.test_using_test_data.json_values");

    var black_scholes = js_vollib.black_scholes.black_scholes;
    var js_ref_black_scholes = js_vollib.js_ref.black_scholes.black_scholes;

    var implied_volatility = js_vollib.black_scholes.implied_volatility.implied_volatility;
    var js_ref_implied_volatility = js_vollib.js_ref.black_scholes.implied_volatility.implied_volatility;

    var flags = ['c', 'p'];

    QUnit.test("test_price", function () {
        flags.forEach(function (flag, flag_i) {
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var price = black_scholes(flag, S, K, t, r, sigma);
                var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);

                assertEquals(js_ref_price, price, 1e-11);

            });
        });
    });

    QUnit.test("test_implied_volatility", function () {
        flags.forEach(function (flag, flag_i) {
            var epsilon = flag === 'c' ? 0.0001 : 0.001;
            test_data.data.forEach(function (values, index) {
                var S = values[test_data.columns.indexOf('S')];
                var K = values[test_data.columns.indexOf('K')];
                var t = values[test_data.columns.indexOf('t')];
                var r = values[test_data.columns.indexOf('R')];
                var sigma = values[test_data.columns.indexOf('v')];

                var price = black_scholes(flag, S, K, t, r, sigma);
                var js_ref_price = js_ref_black_scholes(flag, S, K, t, r, sigma);

                var iv = implied_volatility(price, S, K, t, r, flag);
                var js_ref_iv = js_ref_implied_volatility(js_ref_price, S, K, t, r, flag);

                assertEquals(js_ref_iv, iv, epsilon);

            });
        });
    });

}).call(this);