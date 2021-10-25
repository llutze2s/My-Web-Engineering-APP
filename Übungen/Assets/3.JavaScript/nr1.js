
//Aufgabe 3.1.1
function identity_function(param) {
    return function() {
        return param;
    }
}

document.getElementById("ausgabe1.1").innerHTML = "Aufgabe 3.1.1: Ergebnis: " + identity_function("hallo")();

//Aufgabe 3.1.2
function add(x,y){
    return x+y;
}

function addf(x) {
    return function (y) {
        return add(x,y);
    }
}

document.getElementById("ausgabe1.2").innerHTML = "Aufgabe 3.1.2: Ergebnis: " + addf(2)(4);

//Aufgabe 3.1.3
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

//Aufgabe 3.1.4
function curry(operant, number) {
    return function(y){
        return operant(number,y);
    }
}

document.getElementById("ausgabe1.4").innerHTML = "Aufgabe 3.1.4: Ergebnis: " + curry(mul, 5)(6);

//Aufgabe 3.1.5
function inc(x){
    return addf(x)(1);
}

document.getElementById("ausgabe1.5").innerHTML = "Aufgabe 3.1.5: Ergebnis: " + inc(1);

//Aufgabe 3.1.6
function methodize(operant){
    return function(y){
        return operant(this.valueOf(), y);
    }
}

Number.prototype.add = methodize(add);

document.getElementById("ausgabe1.6").innerHTML = "Aufgabe 3.1.6: Ergebnis: " + (3).add(4);

//Aufgabe 3.1.7
function demethodize(operant){
    return function(x,y){
        return operant.call(x,y);
    }
}

document.getElementById("ausgabe1.7").innerHTML = "Aufgabe 3.1.7: Ergebnis: " + demethodize(Number.prototype.add)(5, 6);

//Aufgabe 3.1.8
var double = twice(add);
var square = twice(mul);
function twice(operant){
    return function(x){
        return operant(x,x);
    }
}

document.getElementById("ausgabe1.8").innerHTML = "Aufgabe 3.1.8: Ergebnis: 11^2 = " + square(11) + " 11+11 = " + double(11);

//Aufgabe 3.1.9
function composeu(operant1, operant2){
    return function(x){
        return operant2(operant1(x));
    }
}

document.getElementById("ausgabe1.9").innerHTML = "Aufgabe 3.1.9: " + composeu(double, square)(3);

//Aufgabe 3.1.10
function composeb(operant1, operant2){
    return function(x,y,z){
        return operant2(operant1(x,y),z);
    }
}

document.getElementById("ausgabe1.10").innerHTML = "Aufgabe 3.1.10: " + composeb(add, mul)(2, 3, 5);

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

//Aufgabe 3.1.12
var counter = counterf(10);

function counterf(x){
    return{
        inc: function() { return x = x + 1;},
        dec: function() { return x = x - 1;}
    }
}

document.getElementById("ausgabe1.12").innerHTML = "Aufgabe 3.1.12: inc: " + counter.inc() + " dec: " + counter.dec();

//Aufgabe 3.1.13
var temp = revocable(mul);  //mul statt alert damit man es besser in die Seite einbinden kann

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

document.getElementById("ausgabe1.13").innerHTML = "Aufgabe 3.1.13: "+ temp.invoke(7,3) + ", " + temp.revoke() + ", " + temp.invoke(8,2);

//Aufgabe 3.1.14
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
