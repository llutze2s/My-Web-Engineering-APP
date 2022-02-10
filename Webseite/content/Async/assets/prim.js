var i = 0;
var prim = 9000000; //2

// https://www.w3schools.com/howto/howto_js_progressbar.asp
function init(){
    var item = document.getElementById("Bar");
    var width = 1;
    var countup = true;
    setInterval(frame, 16); //60Hz
    function frame() {
        nextprimZahlen()
        if (width >= 100){
            countup = false;
        } else if (width <=0) {
            countup = true;
        }

        if(countup == true){
            width++;
            item.style.width = width + "%";
        } else {
            width--;
            item.style.width = width + "%";
        }
    }
}


function nextprimZahlen(){
    var display = document.getElementById("liste");

    for(var x = prim+1; x < 10000000 ; x++){ //Alle Zahlen durchgehen für Prim check
        if(primtext(x)){
            display.innerHTML +=", "+x;
            prim = x;
            console.log(prim);
            break;
        }
    }
}

function primtext(x){
    for(let y=2; y < x; y++){ //Alle Zahlen bis dahin prüfen
        if (x%y === 0) {
           return false;
        }
    }
    return true;
}