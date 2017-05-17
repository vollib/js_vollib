<h6>Sample Usage:</h6>
```html

<!DOCTYPE html>
<head>
    <!-- js_vollib dependencies -->
    
    <!-- brent : https://github.com/croquelois/rootFinder.git -->
    <script type="text/javascript" src="lib/rootFinder/rootFinder.js"></script>
    
    <!-- Jmat : https://github.com/lvandeve/jmat.git -->
    <script type="text/javascript" src="lib/jmat/jmat.min.js"></script>
    
    <!-- js_lets_be_rational : git@git.quantycarlo.biz:vollib/js_lets_be_rational.git-->
    <script type="text/javascript" src="lib/js_lets_be_rational/build/js_lets_be_rational.js"></script>

    <!-- --- -->
   
   
    <!-- js_vollib -->
    <script type="text/javascript" src="build/js_vollib.js"></script>
    
    <!-- test_utils : linspace -->
    <script type="text/javascript" src="test/test_utils.js"></script>
    
    <script>
        linspace(2, 6, 10).forEach(function(d, di){

            var n = parseInt(Math.pow(10, d));
            var K = linspace(145, 150, n);

            var price = 0.001;
            var F = 100;
            var flag = 'c';
            var r = 0.01;
            var t = 0.5;

            var start = performance.now();
            K.forEach(function(k, ki){
                js_vollib.black.implied_volatility.implied_volatility(price, F, k, r, t, flag);
            });
            var end = performance.now();

            var seconds = (end - start) / 1000;
            var message = K.length + " calls in " + seconds + "  seconds.";
            console.log(message);

        });
    </script>
    
</head>
<body>
</body>
</html>

```
<br/>
<br/>
<h6>To run the tests:</h6>
```
    open js_vollib/test/test_runner.html
```

<br/>
<br/>
<h6>To re-build:</h6>
```
    npm install
    gulp default
```
