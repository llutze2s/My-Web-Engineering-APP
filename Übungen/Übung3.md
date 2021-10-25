# Übung 3

## 3.1. Funktionen in JavaScript (5 Punkte)
Schreiben Sie eine Funktion `identity_function()`, die ein Argument als Parameter entgegen nimmt und eine Funktion zurück gibt, die dieses Argument zurück gibt.

```js
function identity_function(param) {
    return function() {
        return param;
    }
}

document.getElementById("ausgabe1.1").innerHTML = "Aufgabe 3.1.1: Ergebnis: " + identity_function("hallo")();
```
Schreiben Sie eine Addier-Funktion `addf()`, so dass `addf(x)(y)` genau x + y zurück gibt. (Es haben also zwei Funktionsaufrufe zu erfolgen. `addf(x)` liefert eine Funktion, die auf y angewandt wird.)

```js
function add(x,y){
    return x+y;
}

function addf(x) {
    return function (y) {
        return add(x,y);
    }
}

document.getElementById("ausgabe1.2").innerHTML = "Aufgabe 3.1.2: Ergebnis: " + addf(2)(4);
```

Schreiben Sie eine Funktion `applyf()`, die aus einer binären Funktion wie `add(x,y)` eine Funktion addf berechnet, die mit zwei Aufrufen das gleiche Ergebnis liefert, z.B. `addf = applyf(add); addf(x)(y)` soll `add(x,y)` liefern. Entsprechend `applyf(mul)(5)(6)` soll 30 liefern, wenn mul die binäre Multiplikation ist.

```js
function mul(x,y){
    return x*y;
}

function applyf(operant) {
    return function (x) {
        return function (y) {
            return operant(x,y);
        }
    }
}

document.getElementById("ausgabe1.3").innerHTML = "Aufgabe 3.1.3: Ergebnis: " + applyf(mul)(5)(6);
```

Schreiben Sie eine Funktion `curry()` (von Currying), die eine binäre Funktion und ein Argument nimmt, um daraus eine Funktion zu erzeugen, die ein zweites Argument entgegen nimmt, z.B. `add3 = curry(add, 3);add3(4)` ergibt 7. `curry(mul, 5)(6)` ergibt 30.

```js
function curry(operant, number) {
    return function(y){
        return operant(number,y);
    }
}

document.getElementById("ausgabe1.4").innerHTML = "Aufgabe 3.1.4: Ergebnis: " + curry(mul, 5)(6);
```

Erzeugen Sie die inc-Funktion mit Hilfe einer der Funktionen `addf, applyf` und `curry` aus den letzten Aufgaben, ohne die Funktion `inc()` selbst zu implementieren. (`inc(x)` soll immer x + 1 ergeben und lässt sich natürlich auch direkt implementieren. Das ist aber hier nicht die Aufgabe.) Vielleicht schaffen Sie es auch, drei Varianten der `inc()`-Implementierung zu schreiben?

```js
function inc(x){
    return addf(x)(1);
}

document.getElementById("ausgabe1.5").innerHTML = "Aufgabe 3.1.5: Ergebnis: " + inc(1);
```

Schreiben Sie eine Funktion methodize(), die eine binäre Funktion (z.B. add, mul) in eine unäre Methode verwandelt. Nach `Number.prototype.add = methodize(add);` soll `(3).add(4)` genau 7 ergeben.

```js
function methodize(operant){
    return function(y){
        return operant(this.valueOf(), y);
    }
}

Number.prototype.add = methodize(add);
document.getElementById("ausgabe1.6").innerHTML = "Aufgabe 3.1.6: Ergebnis: " + (3).add(4);
```

Schreiben Sie eine Funktion `demethodize()`, die eine unäre Methode (z.B. add, mul) in eine binäre Funktion umwandelt. `demethodize(Number.prototype.add)(5, 6)` soll 11 ergeben.

```js
function demethodize(operant){
    return function(x,y){
        return operant.call(x,y);
    }
}

document.getElementById("ausgabe1.7").innerHTML = "Aufgabe 3.1.7: Ergebnis: " + demethodize(Number.prototype.add)(5, 6);
```

Schreiben Sie eine Funktion `twice()`, die eine binäre Funktion in eine unäre Funktion umwandelt, die den einen Parameter zweimal weiter reicht. Z.B. `var double = twice(add); double(11)` soll 22 ergeben; `var square = twice(mul); square(11) soll mul(11,11) === 121` ergeben.

```js
var double = twice(add);
var square = twice(mul);
function twice(operant){
    return function(x){
        return operant(x,x);
    }
}

document.getElementById("ausgabe1.8").innerHTML = "Aufgabe 3.1.8: Ergebnis: 11^2 = " + square(11) + " 11+11 = " + double(11);
```

Schreiben Sie eine Funktion `composeu()`, die zwei unäre Funktionen in eine einzelne unäre Funktion transformiert, die beide nacheinander aufruft, z.B. soll `composeu(double, square)(3)` genau 36 ergeben.

```js
function composeu(operant1, operant2){
    return function(x){
        return operant2(operant1(x));
    }
}

document.getElementById("ausgabe1.8").innerHTML = "Aufgabe 3.1.8: " + composeu(double, square)(3);
```

Schreiben Sie eine Funktion `composeb()`, die zwei binäre Funktionen in eine einzelne Funktion transformiert, die beide nacheinander aufruft, z.B. `composeb(add, mul)(2, 3, 5)` soll 25 ergeben.

```js
function composeb(operant1, operant2){
    return function(x,y,z){
        return operant2(operant1(x,y),z);
    }
}

document.getElementById("ausgabe1.10").innerHTML = "Aufgabe 3.1.10: " + composeb(add, mul)(2, 3, 5);
```

Schreiben Sie eine Funktion `once()`, die einer anderen Funktion nur einmal erlaubt, aufgerufen zu werden, z.B. `add_once = once(add); add_once(3, 4)` soll beim ersten Mal 7 ergeben, beim zweiten Mal soll jedoch `add_once(3, 4)` einen Fehlerabbruch bewirken.

```js
//Aufgabe 3.1.11
var add_once = once(add);
var text1 = add_once(3,4);
var text2 = "";

function once(operant){
    var bereitsaufgerufen = false;
    return function(x,y){
        if(!bereitsaufgerufen){   
                bereitsaufgerufen = true;
                return operant(x,y);
        } else {
            throw 'bereits aufgerufen!';
        }
    }
}

try{
    text2 = add_once(3,4);
}catch(e){
    text2 = e;
}

document.getElementById("ausgabe1.11").innerHTML = "Aufgabe 3.1.11: " + text1 + ", zweites Mal: " + text2;
```

Schreiben Sie eine Fabrik-Funktion `counterf()`, die zwei Funktionen `inc()` und `dec()` berechnet, die einen Zähler hoch- und herunterzählen. Z.B. `counter = counterf(10);` Dann soll counter.`inc() 11` und `counter.dec()` wieder 10 ergeben.

```js
var counter = counterf(10);

function counterf(x){
    return{
        inc: function() { return x = x + 1;},
        dec: function() { return x = x - 1;}
    }
}

document.getElementById("ausgabe1.12").innerHTML = "Aufgabe 3.1.12: inc: " + counter.inc() + " dec: " + counter.dec();
```

Schreiben Sie eine rücknehmbare Funktion revocable(), die als Parameter eine Funktion nimmt und diese bei Aufruf ausführt. Sobald die Funktion aber mit revoke() zurück genommen wurde, führt ein erneuter Aufruf zu einem Fehler. Z.B.
`temp = revocable(alert);`
`temp.invoke(7); // führt zu alert(7);`
`temp.revoke();`
`temp.invoke(8); // Fehlerabbruch!`

```js
var temp = revocable(mul)  //mul statt alert damit man es besser in die Seite einbinden kann

function revocable(fun) {
    var error = false;
    return {
        invoke: function () {
            if(error){
                return "Fehler !";
            } else {
                return fun.apply(this, arguments);
            }
        },
        revoke: function () {
            error = true;
            fun = null;
        }
    }
}

document.getElementById("ausgabe1.13").innerHTML = "Aufgabe 3.1.13: "+ temp.invoke(7) + ", " + temp.revoke() + ", " + temp.invoke(8);
```

Implementieren Sie ein "Array Wrapper"-Objekt mit den Methoden get, store und append, so dass ein Angreifer keinen Zugriff auf das innere, private Array hat.
`my_vector = vector();`
`my_vector.append(7);`
`my_vector.store(1, 8);`
`my_vector.get(0) // 7`
`my_vector.get(1) // 8`

```js
var my_vector = vector();

function vector(){
    var array = [];
    return{
        append:function (value) {
            return array[length] = value;
        },
        store:function (key, value) {
            return array[key] = value;
        },
        get:function (key) {
            return array[key];
        }
    }
}

document.getElementById("ausgabe1.14").innerHTML = "Aufgabe 3.1.14: 7 anhängen: "+ my_vector.append(7) + ",\n Stelle 1 eine 8 einfügen: " + my_vector.store(1, 8) +", \n Array an Stelle 1 ausgeben: " + my_vector.get(0) + ", \n Array an Stelle 2 ausgeben: " + my_vector.get(1);
```

## 3.2 Advanced Functional JavaScript Programming (5 Punkte)
Make a function that makes a publish/subscribe object. It will reliably deliver all publications to all subscribers in the right order.
`my_pubsub = pubsub();`
`my_pubsub.subscribe(alert);`
`my_pubsub.publish("It works!"); // alert("It works!")`

```js
var text;

function pubsub() {
    subs = [];
    return {
        publish: function (str) {
            for(i=0;i<subs.length;i++) {    //subs.forEach(element => {
                subs[i](str);               //    element(str);
            }                               //});
        },
        subscribe: function (sub) {
            subs.push(sub);
        }
    }
}

function message(msg) {
    text = msg;
}

my_pubsub = pubsub();
my_pubsub.subscribe(message); //Geändert von alert zu message
my_pubsub.publish("It works!"); // alert("It works!")

document.getElementById("ausgabe2.1").innerHTML = "Aufgabe 3.2.1: "+text;
```

Make a factory that makes functions that generate unique symbols.
`gensym = gensymf('G');`
`gensym() // 'G0'`
`gensym() // 'G1'`
`gensym() // 'G2'`
`gensym() // 'G3'`

```js
function gensymf(symb){
    var count = 0;
    return function () {
        count++;
        return symb+count; 
    }
}

gensym = gensymf('G');

document.getElementById("ausgabe2.2").innerHTML = "Aufgabe 3.2.2: "+gensym()+", "+gensym()+", "+gensym()+", "+gensym();
```

Make a function that returns a function that will return the next fibonacci number.
var fib = fibonaccif(0, 1);
`fib() // 0`
`fib() // 1`
`fib() // 1`
`fib() // 2`
`fib() // 3`
`fib() // 5`

```js
var fib = fibonaccif(0, 1);

function fibonaccif(x,y){
    v1 = x;
    v2 = y;
    return function() {
        tmp=v1;
        v1=v2;
        v2=v2+tmp;
        return tmp;
    }
}

document.getElementById("ausgabe2.3").innerHTML = "Aufgabe 3.2.3: "+fib()+", "+fib()+", "+fib()+", "+fib()+", "+fib()+", "+fib();
```

Write a function that adds from many invocations, until it sees an empty invocation.
`addg(3)(4)(5)() // 12`
`addg(1)(2)(4)(8)() // 15`

```js
function addg(x) {
    var sum = x;
    return function(y) {
        if(typeof y === "undefined"){
            return sum;
        } else {
            return addg(x+y);
        }
    }
}

document.getElementById("ausgabe2.4").innerHTML = "Aufgabe 3.2.4: " +addg(3)(4)(5)()+", "+addg(1)(2)(4)(8)();
```

Write a function that will take a binary function and apply it to many invocations.
`applyg(add)(3)(4)(5)() // 12`
`applyg(add)(1)(2)(4)(8)() // 15`

```js
function add(x,y) {
    return x+y;
}
function applyg(fun) {
    return function calc (x) {
        var sum = x;
        return function(y) {
            if(typeof y === "undefined"){
                return sum;
            } else {
                return calc(fun(sum,y));
            }
        }
    }
}

document.getElementById("ausgabe2.5").innerHTML = "Aufgabe 3.2.5: "+ applyg(add)(3)(4)(5)()+", "+applyg(add)(1)(2)(4)(8)();
```

Write a function `m` that takes a value and an optional source string and returns them in an object.
`JSON.stringify(m(1)) // {"value": 1, "source": "1"}`
`JSON.stringify(m(Math.PI, "pi")) // {"value": 3.14159..., "source": "pi"}`

```js
function m(value,source){
    return {'value':value,'source':(typeof source==="undefined"?value:source)};
}

document.getElementById("ausgabe2.6").innerHTML = "Aufgabe 3.2.6: "+JSON.stringify(m(1))+", "+JSON.stringify(m(Math.PI, "pi"));
```

Write a function `addm` that takes two m objects and returns an m object.
`JSON.stringify(addm(m(3), m(4))) // {"value": 7, "source": "(3+4)"}`

```js
function m(value,source){
    return {'value':value,'source':(typeof source==="undefined"?value:source)};
}

function addm(m1,m2){
    return {'value':m1.value+m2.value,'source':"("+m1.value+"+"+m2.value+")"};
}

document.getElementById("ausgabe2.7").innerHTML = "Aufgabe 3.2.7: "+JSON.stringify(addm(m(3), m(4)));
```

Write a function `binarymf` that takes a binary function and a string and returns a function that acts on m objects.
`addm = binarymf(add, "+");`
`JSON.stringify(addm(m(3), m(4))) // {"value": 7, "source": "(3+4)"}`

```js
addm2 = binarymf(add, "+");

function binarymf(fun,operator){
    return function(x,y){
        return {'value':fun(x,y),'source':"("+x+operator+y+")"};
    }
}

document.getElementById("ausgabe2.8").innerHTML = "Aufgabe 3.2.8: "+JSON.stringify(addm2(3, 4));
```

Modify function binarymf so that the functions it produces can accept arguments that are either numbers or m objects.
`addm = binarymf(add, "+");`
`JSON.stringify(addm(3, 4)) // {"value": 7, "source": "(3+4)"}`

```js
addm3 = binarymf3(add, "+");

function binarymf3(fun,operator){
    return function(x,y){
        if(typeof x === "number"){
            x = m(x);
        }
        if(typeof y === "number"){
            y = m(y);
        }
        return {'value':fun(x.value,y.value),'source':"("+x.value+operator+y.value+")"};
    }
}

document.getElementById("ausgabe2.9").innerHTML = "Aufgabe 3.2.9: "+JSON.stringify(addm3(m(3), 4));
```

Write function `unarymf`, which is like binarymf except that it acts on unary functions.
`squarem = unarymf(square, "square");`
`JSON.stringify(squarem(4)) // {"value": 16, "source": "(square 4)"}`

```js
squarem = unarymf(square, "square");

function square(x){
    return x*x;
}

function unarymf(fun,operator){
    return function(x){
        return {'value':fun(x),'source':"("+operator+" "+x+")"};
    }
}

document.getElementById("ausgabe2.10").innerHTML = "Aufgabe 3.2.10: "+JSON.stringify(squarem(4));
```

Write a function that takes the lengths of two sides of a triangle and computes the length of the hypotenuse. `(Hint: c2 = a2 + b2)`
`hyp(3, 4) // 5`

```js
function hyp(a,b){
    return Math.sqrt(square(a)+square(b));
}

document.getElementById("ausgabe2.11").innerHTML = "Aufgabe 3.2.11: "+hyp(3, 4);
```

Write a function that evaluates array expressions.
`hypa = [ Math.sqrt, [ add, [mul, 3, 3], [mul, 4, 4] ] ];`
`exp(hypa) // 5`

```js
function mul(x,y){
    return x*y;
}

hypa = [ Math.sqrt, [ add, [mul, 3, 3], [mul, 4, 4] ] ];

function exp(array){
    if(typeof array === "number"){return array;}
    else if(array.length === 2){
        return array[0](exp(array[1]));
    }
    else if(array.length === 3){
        return array[0](exp(array[1]),exp(array[2])); //[ add, [mul, 3, 3], [mul, 4, 4] ]
    }
}

document.getElementById("ausgabe2.12").innerHTML = "Aufgabe 3.2.12: "+exp(hypa);
```

Make a function that stores a value in a variable.
`var variable; store(5); // variable === 5`

```js
var variable;

function store(x){
   variable = x;
}

store(5);

document.getElementById("ausgabe2.13").innerHTML = "Aufgabe 3.2.13: "+(variable === 5);
```

Make a function that takes a binary function, two functions that provide operands, and a function that takes the result.
`quatre( add, identityf(3), identityf(4), store ); // variable === 7`

```js
function identityf(param) {
    return function() {
        return param;
    }
}

function quatre(operator,x,y,task){
    task(operator(x(),y()));
}

quatre( add, identityf(3), identityf(4), store)

document.getElementById("ausgabe2.14").innerHTML = "Aufgabe 3.2.14: "+variable;
```

Make a function that takes a unary function, and returns a function that takes an argument and a callback.
`sqrtc = unaryc(Math.sqrt); sqrt(81, store) // variable === 9`

```js
sqrtc = unaryc(Math.sqrt);
sqrtc(81, store);

function unaryc(operator){
    return function(x,task){
        task(operator(x));
    }
}

document.getElementById("ausgabe2.15").innerHTML = "Aufgabe 3.2.15: "+variable;
```

Make a function that takes a binary function, and returns a function that takes two arguments and a callback.
`addc = binaryc(add); addc(4, 5, store) // variable === 9`
`mulc = binaryc(mul); mulc(2, 3, store) // variable === 6`

```js
var tmp = 0;
addc = binaryc(add); addc(4, 5, store)
tmp = variable;
mulc = binaryc(mul); mulc(2, 3, store)

function binaryc(operator){
    return function(x,y,task){
        task(operator(x,y));
    }
}

document.getElementById("ausgabe2.16").innerHTML = "Aufgabe 3.2.16: "+tmp+", "+variable;
```