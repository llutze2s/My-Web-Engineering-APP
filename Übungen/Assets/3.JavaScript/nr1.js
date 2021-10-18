
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
document.getElementById("ausgabe1.8").innerHTML = "Aufgabe 3.1.8: " + composeu(double, square)(3);