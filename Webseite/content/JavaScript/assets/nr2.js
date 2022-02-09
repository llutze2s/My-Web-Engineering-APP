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

function gensymf(symb){
    var count = 0;
    return function () {
        count++;
        return symb+count; 
    }
}

gensym = gensymf('G');

document.getElementById("ausgabe2.2").innerHTML = "Aufgabe 3.2.2: "+gensym()+", "+gensym()+", "+gensym()+", "+gensym();

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

function m(value,source){
    return {'value':value,'source':(typeof source==="undefined"?value:source)};
}

document.getElementById("ausgabe2.6").innerHTML = "Aufgabe 3.2.6: "+JSON.stringify(m(1))+", "+JSON.stringify(m(Math.PI, "pi"));

function addm(m1,m2){
    return {'value':m1.value+m2.value,'source':"("+m1.value+"+"+m2.value+")"};
}

document.getElementById("ausgabe2.7").innerHTML = "Aufgabe 3.2.7: "+JSON.stringify(addm(m(3), m(4)));

addm2 = binarymf(add, "+");

function binarymf(fun,operator){
    return function(x,y){
        return {'value':fun(x,y),'source':"("+x+operator+y+")"};
    }
}

document.getElementById("ausgabe2.8").innerHTML = "Aufgabe 3.2.8: "+JSON.stringify(addm2(3, 4));3

addm3 = binarymf3(add, "+");

function binarymf3(fun,operator="+"){
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

function hyp(a,b){
    return Math.sqrt(square(a)+square(b));
}

document.getElementById("ausgabe2.11").innerHTML = "Aufgabe 3.2.11: "+hyp(3, 4);

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

var variable;

function store(x){
   variable = x;
}

store(5);

document.getElementById("ausgabe2.13").innerHTML = "Aufgabe 3.2.13: "+(variable === 5);

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

sqrtc = unaryc(Math.sqrt);
sqrtc(81, store);

function unaryc(operator){
    return function(x,task){
        task(operator(x));
    }
}

document.getElementById("ausgabe2.15").innerHTML = "Aufgabe 3.2.15: "+variable;

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


