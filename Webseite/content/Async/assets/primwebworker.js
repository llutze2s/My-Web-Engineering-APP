var prim = 9000000; //Letze gefunden Prim / erste Prim

self.addEventListener('message',function(e) {
    for(var x = prim+1; x < 10000000 ; x++){ //Alle Zahlen durchgehen für Prim check
        if(primtext(x)){
            self.postMessage(x);
        }
    }
});

function primtext(x){
    for(let y=2; y < x; y++){ //Alle Zahlen bis dahin prüfen
        if (x%y === 0) {
           return false;
        }
    }
    return true;
}