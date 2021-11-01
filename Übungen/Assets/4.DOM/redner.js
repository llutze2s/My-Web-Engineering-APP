//https://www.w3schools.com/js/js_timing.asp

function init(){
    var add = document.getElementById('button');
    add.addEventListener('click', AddRedner); //hier ohne ()
    setInterval(refresh, 1000);
}

var RednerListe = [];

function refresh(){
    if(RednerListe.length != 0){
        RednerListe.forEach(redner => {
            if(redner.isStopped != false){
                redner.refresh();
            }
        });
    }
}

function AddRedner(){
    var item = document.getElementById('redner'); //Hole Rednername

    var li = document.createElement('li');  // Baue Listenelement
    li.innerHTML = item.value;          // Fülle mit Inhalt
    item.value = "";                        // leere Feld

    var timer = document.createElement('p');
    timer.innerHTML = "0000";
    li.appendChild(timer)

    var stop = document.createElement('button');
    stop.innerHTML = "Stopp!";

    var newRedner = new Redner(li.innerHTML,timer,stop);
    RednerListe.push(newRedner);

    stop.addEventListener('click', function(){newRedner.toogle();});
    li.appendChild(stop);

    var ul = document.getElementById('liste');  // Hole Liste

    ul.appendChild(li);                     // An Liste anhängen
}


// https://gist.github.com/endel/321925f6cafa25bbfbde
// Nur für schönere Zeitausgabe
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
/////////////////////////////////////////////////////
  

class Redner {
    timer = 0;
    name = "";
    timerText;
    button;
    stopped = true;

    constructor(name,timer,button){
        this.name = name;
        this.timerText = timer;
        this.button = button;
        button.click();
    }

    get timer(){return this.timer;}
    
    get name(){return this.name;}

    get isStopped(){return this.stopped;}
    
    stop(){
        this.stopped = true;
        this.button.innerHTML = "Start";
    }
    refresh(){
        this.timer++;
        this.timerText.innerHTML = this.timer.pad(4)+"s";
    }
    toogle(){
        if (this.stopped === true) {
            RednerListe.forEach(item => {item.stop();}); // Alle anderen anhalten
            this.button.innerHTML = "Stop";
            this.stopped = false;
        } else {
            this.stopped = true;
            this.button.innerHTML = "Start";
        }
    }
}
