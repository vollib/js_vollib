(function(){

    console.log("\n\nStart speed benchmarking (js_vollib.js_ref):");
    var diff = 5;
    linspace(2, 6, 10).forEach(function(d, di){

        var n = parseInt(Math.pow(10, d));
        var K = linspace(105+diff+1, 110+diff, n);
        diff += 5;

        var price = 0.001;
        var F = 100;
        var flag = 'c';
        var r = 0.01;
        var t = 0.5;

        var start = performance.now();
        K.forEach(function(k, ki){
            js_vollib.js_ref.black.implied_volatility.implied_volatility(price, F, k, r, t, flag);
        });
        var end = performance.now();

        var seconds = (end - start) / 1000;
        var message = K.length + " calls in " + seconds + "  seconds.";
        console.log(message);

    });

}).call(this);
