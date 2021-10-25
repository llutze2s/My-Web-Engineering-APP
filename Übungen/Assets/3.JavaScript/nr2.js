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

document.getElementById("ausgabe2.5").innerHTML = "Aufgabe 3.2.5: ";