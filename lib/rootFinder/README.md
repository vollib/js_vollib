#rootFinder

root finders, Brent, Newton and Bisection

##Bisection use:

```js
var bisection = new Bisection(accuracy);
```

accuracy: stop when the bracket length is below this number, default: 1e-15
bisection.maxIter: stop when this number of iteration have been done, default: 100
bisection.zero: stop when the absolute value of the result of the function is below this number, default: 1e-16

```js
bisection.getRoot(f,x1,x2);
```

f: function on which we want to found the root

x1: lower bracket

x2: upper bracket

##Newton use:

```js
var newton = new Newton(accuracy);
```

accuracy: stop when the iteration step move is below this number, default: 1e-12

newton.maxIter: stop when this number of iteration have been done, default: 1000

newton.zero: not used, just here to add confusion

```js
newton.getRoot(f,df,x);
```

f: function on which we want to found the root

df: derivative of f

x: initial guess

```js
newton.getRootBracket(f,df,x1,x2);
```

f: function on which we want to found the root

df: derivative of f

x1: lower bracket

x2: upper bracket

##Brent use:

```js
var brent = new Brent(accuracy);
```

accuracy: used to compute stop criteria, default: 1e-15
brent.maxIter: stop when this number of iteration have been done, default: 100
brent.zero: used to compute stop criteria, default: 1e-16

```js
brent.getRoot(f,x1,x2);
```

f: function on which we want to found the root

x1: lower bracket

x2: upper bracket

##example


```js
var who = "";
function f(x){
  console.log(who,"function",x);
  return x*x-2;
}
function df(x){
  console.log(who,"derivate",x);
  return 2*x;
}

var newton = new Newton();
var brent = new Brent();
var bisection = new Bisection();

who = "newton";
newton.getRoot(f,df,2);
who = "brent";
brent.getRoot(f,0,2);
who = "bisection";
bisection.getRoot(f,0,2);
```
