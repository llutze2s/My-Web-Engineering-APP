import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

var Rliste = [];

export class Rednerliste extends LitElement {
  static styles = css`p { 
                        display: inline-block;
                        }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
    setInterval(this.refresh, 1000);
  }

  refresh(){
    if(Rliste.length != 0){
        Rliste.forEach(redner => {
            if(redner.isStopped != false){
                redner.refresh();
            }
        });
    }
  }

  render() {
    return html`
       <h1>Rednerliste</h1>
        <p>
            <form>
                Neuer Redner: 
                <input id="redner">
                <button id="button" type="button" @click=${this._AddItem}>Hinzufügen</button>
            </form>
        </p>
        <ul id="liste">
        </ul>
    `;
  }

  get _input() {
    return (this.___input ??= this.renderRoot?.querySelector('input') ?? null);
  }
  get _liste() {
    return (this.___ul ??= this.renderRoot?.querySelector('ul') ?? null);
  }

  _AddItem(e){
    var item = this._input;

    var li = document.createElement('li');  // Baue Listenelement
    li.innerHTML = item.value;          // Fülle mit Inhalt
    li.id = item.value;
    item.value = "";                    // leere Feld

    var timer = document.createElement('p');
    timer.innerHTML = "0000";
    li.appendChild(timer)

    var stop = document.createElement('button');
    stop.innerHTML = "Stopp!";

    li.appendChild(stop);

    var ul = this._liste;  // Hole Liste 
    ul.appendChild(li);    

    var newRedner = new Redner(li.id,this.Rliste,this.shadowRoot);
    stop.addEventListener('click', function(){newRedner.toogle();});
    Rliste.push(newRedner);
  }
}
customElements.define('redner-liste', Rednerliste);

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
    liste;
    shadowRoot;

    constructor(name,liste,shadowRoot){
        this.name = name;
        this.liste = liste;
        this.shadowRoot = shadowRoot;

        var dom = this.shadowRoot.getElementById(this.name);
        this.timerText = dom.querySelector('p');
        this.button = dom.querySelector('button');

        this.button.click();
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
            this.liste.forEach(item => {item.stop();}); // Alle anderen anhalten
            this.button.innerHTML = "Stop";
            this.stopped = false;
        } else {
            this.stopped = true;
            this.button.innerHTML = "Start";
        }
    }
}
