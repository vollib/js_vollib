"use strict";
(function(undefined){
var globalScope = (typeof global !== 'undefined') ? global : this;
var hasModule = (typeof module !== 'undefined') && module.exports;

var abs = Math.abs;

function Bisection(accuracy){
  this.maxIter = 100;
  this.zero = 1e-16;
  this.accuracy = accuracy||1e-15;
}

Bisection.prototype.getRoot = function(fct,x1,x2){
  var y1 = fct(x1);
  var y = fct(x2);
  if(abs(y) < this.accuracy) return x2;
  if(abs(y1) < this.accuracy) return x1;

  var dx, xRoot, xMid;
  if(y1 < 0){
    dx = x2 - x1;
    xRoot = x1;
  }else{
    dx = x1 - x2;
    xRoot = x2;
  }
  for(var i=0;i<this.maxIter;i++){
    dx *= 0.5;
    xMid = xRoot + dx;
    y = fct(xMid);
    if(y <= 0) xRoot = xMid;
    if (abs(dx) < this.accuracy || abs(y) < this.zero) return xRoot;
  }
  throw Error("Could not find root in " + this.maxIter + " attempts");
}

function Newton(accuracy){
  this.maxIter = 1000;
  this.zero = 1e-16;
  this.accuracy = accuracy||1e-12;
}

Newton.prototype.getRoot = function(fct,dfct,x){
  var root = x;
  for(var i=0;i<this.maxIter;i++){
    var y = fct(root);
    var dy = dfct(root);
    var dx = y / dy;
    if(abs(dx) <= this.accuracy) return root - dx;
    root -= dx;
  }
  throw Error("Could not find root in " + this.maxIter + " attempts");
}

Newton.prototype.getRootBracket = function(fct,dfct,x1,x2){
  var y1 = fct(x1);
  if(abs(y1) < this.accuracy) return x1;
  var y2 = fct(x2);
  if(abs(y2) < this.accuracy) return x2;
  var x = (x1 + x2) / 2;
  var x3 = y2 < 0 ? x2 : x1;
  var x4 = y2 < 0 ? x1 : x2;
  var xLower = x1 > x2 ? x2 : x1;
  var xUpper = x1 > x2 ? x1 : x2;
  for(var i=0;i<this.maxIter;i++){
    var y = fct(x);
    var dy = dfct(x);
    var dx = -y / dy;
    if(abs(dx) <= this.accuracy) return x + dx;
    x += dx;
    if(x < xLower || x > xUpper){
      dx = (x4 - x3) / 2;
      x = x3 + dx;
    }
    if(y < 0) x3 = x;
    else x4 = x;
  }
  throw Error("Could not find root in " + this.maxIter + " attempts");
}
  
function Brent(accuracy){
  this.maxIter = 100;
  this.zero = 1e-16;
  this.accuracy = accuracy||1e-15;
}


Brent.prototype.getRoot = function(fct,xLower,xUpper){
  if(xLower == xUpper) return xLower;
  var x1 = xLower;
  var x2 = xUpper;
  var x3 = xUpper;
  var delta = 0;
  var oldDelta = 0;
  var f1 = fct(x1);
  var f2 = fct(x2);
  var f3 = f2;
  var r1, r2, r3, r4, eps, xMid, min1, min2;
  for(var i=0;i<this.maxIter;i++){
    if (f2 > 0 && f3 > 0 || f2 < 0 && f3 < 0) {
      x3 = x1;
      f3 = f1;
      delta = x2 - x1;
      oldDelta = delta;
    }
    if (abs(f3) < abs(f2)) {
      x1 = x2;
      x2 = x3;
      x3 = x1;
      f1 = f2;
      f2 = f3;
      f3 = f1;
    }
    eps = 2 * this.zero * abs(x2) + 0.5 * this.accuracy;
    xMid = (x3 - x2) / 2;
    if(abs(xMid) <= eps) return x2;
    if(abs(oldDelta) >= eps && abs(f1) > abs(f2)){
      r4 = f2 / f1;
      if(abs(x1 - x3) < this.zero){
        r1 = 2 * xMid * r4;
        r2 = 1 - r4;
      }else{
        r2 = f1 / f3;
        r3 = f2 / f3;
        r1 = r4 * (2 * xMid * r2 * (r2 - r3) - (x2 - x1) * (r3 - 1));
        r2 = (r2 - 1) * (r3 - 1) * (r4 - 1);
      }
      if(r1 > 0) r2 *= -1;
      r1 = abs(r1);
      min1 = 3 * xMid * r2 - abs(eps * r2);
      min2 = abs(oldDelta * r2);
      if(2 * r1 < (min1 < min2 ? min1 : min2)){
        oldDelta = delta;
        delta = r1 / r2;
      }else{
        delta = xMid;
        oldDelta = delta;
      }
    }else{
      delta = xMid;
      oldDelta = delta;
    }
    x1 = x2;
    f1 = f2;
    if(abs(delta) > eps)
      x2 += delta;
    else
      x2 += (xMid<0?-eps:eps);
    f2 = fct(x2);
  }
  throw Error("Could not find root in " + this.maxIter + " attempts");
}


var dest = hasModule?exports:globalScope;
dest.Newton = Newton;
dest.Brent = Brent;
dest.Bisection = Bisection;
function test(){
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
}
if(hasModule && require.main === module) return test();
}).call(this);
