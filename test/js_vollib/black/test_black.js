(function () {
    QUnit.module("js_vollib.black.test_black");

    var black = js_vollib.black;

    QUnit.test("test_black", function () {

        var F = 100, K = 100, sigma = 0.2, flag = 'c', r = 0.02, t = 0.5;
        assertEquals(black.black(flag, F, K, t, r, sigma), 5.5811067246048118);

    });

    QUnit.test("test_undiscounted_black", function () {
        var F = 100, K = 100, sigma = 0.2, flag = 'c', t = 0.5;
        assertEquals(black.undiscounted_black(F, K, sigma, t, flag), 5.637197779701664);
    });

    QUnit.test("test_normalised_black", function () {
        var F = 100, K = 95, x = Math.log(F/K), t = 0.5, v = 0.3, s = v * Math.sqrt(t);
        assertEquals(black.normalised_black(x,s,'p'), 0.061296663817558904);
        assertEquals(black.normalised_black(x,s,'c'), 0.11259558142181655);

        normalised_intrinsic = function(F, K, flag) {
            if (flag == 'c') {
                return Math.max(F-K,0)/Math.pow((F*K),0.5);
            } else {
                return Math.max(K-F,0)/Math.pow((F*K),0.5);
            }
        };

        QUnit.assert.ok((black.normalised_black(x,s,'p') - (black.normalised_black(x,s,'c') - normalised_intrinsic(F,K,'c')))<1e-12);
        assertEquals(Math.abs(black.normalised_black(x,s,'p') - black.normalised_black(x,s,'c')), normalised_intrinsic(F,K,'c'), 1e-12);

    });

}).call(this);