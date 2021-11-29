# Übung 8

## 8.1. Web-Komponenten erstellen (4 Punkte)
Verpacken Sie Ihre Lösungen aus LE04 in wiederverwendbare Web-Komponenten. Dabei können Sie alle Hilfsmittel aus Lit verwenden.

Geben Sie hier Ihre Web-Komponente für die Einkaufsliste (Ü4.1) ein:
```js
import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

export class Einkaufsliste extends LitElement {
  static styles = css`p { display: inline-block; }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <p>
        <form>
            Enter a new item: 
            <input id="item" />
            <button id="button" type="button" @click=${this._AddItem}>Add item</button>
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
    li.innerHTML = item.value+" ";          // Fülle mit Inhalt
    item.value = "";                       // leere Feld

    var del = document.createElement('button');
    del.innerHTML = "delete";
    del.addEventListener('click', function(){li.remove();});
    li.appendChild(del);

    var ul = this._liste;  // Hole Liste

    ul.appendChild(li);                     // An Liste anhängen
  }
}
customElements.define('einkaufs-liste', Einkaufsliste);
```

Geben Sie hier Ihre Web-Komponente für die Rednerliste (Ü4.2) ein:
```js
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
```

Geben Sie hier Ihre Web-Komponente für die Tabellenkalkulation (Ü4.3) ein:
```js
import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

const Column_Index = ['A','B','C','D','E','F','G'];
var DOM;

export class Tabellenkalkulation extends LitElement {
  static styles = css`td {  border: 1px solid black; }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <h1>Tabellenkalkulator mit contentEditable</h1>
        <p>=SUM(X1,Y2) rechnet</p>
        <table id="table">
            <tr>
                <th id="add_col"><button @click=${this._addcolumn}>+</button></th>
                <th id="rem_col"><button @click=${this._removecolumn}>-</button></th>
            </tr>
            <tr>
                <th id="add_row"><button @click=${this._addrow}>+</button></th>
            </tr>
            <tr>
                <th id="rem_row"><button @click=${this._removerow}>-</button></th>
            </tr>
        </table>
    `;
  }
 
  _addcolumn(){
    var table = this.shadowRoot.getElementById('table');
    DOM = table;

    for (let i = 0; i < table.rows.length-2; i++) {
        let x;
        if(i == 0){
            x = table.rows[i].insertCell(table.rows[0].cells.length-2);
        } else {
            x = table.rows[i].insertCell(table.rows[i].cells.length);
            x.contentEditable = true;
            x.id = Column_Index[table.rows[i].cells.length-2]+i;
            x.addEventListener("focusout", this._calc);
            x.addEventListener("focusin", this._sum);
            //x.innerHTML = x.id;
        }
        if(i == 0 && table.rows[i].cells.length > 3){
            x.innerHTML = Column_Index[table.rows[0].cells.length-4];
        }
    }
  }

  _removecolumn(){
    var table = this.shadowRoot.getElementById('table');
    
    if(table.rows[0].cells.length > 3){
        for (let i = 0; i < table.rows.length; i++) {
            if(i == 0){
                table.rows[i].deleteCell(table.rows[0].cells.length-3);
            } else {
                table.rows[i].deleteCell(table.rows[0].cells.length-2);
            }
        }
    }
 }

 _addrow(){
    var table = this.shadowRoot.getElementById('table');
    var row_count = table.rows.length;
    var column_count = table.rows[0].cells.length-2;

    var row = table.insertRow(row_count-2); //-2 da Buttons auf 0 / -2 liegen
    for(let i=0; i<column_count; i++){
        let x = row.insertCell(i);
        if(i==0){
            x.innerHTML = row_count-2;
        } else {
            x.contentEditable = true;
            x.id = Column_Index[i-1]+(row_count-2);
            x.addEventListener("focusout", this._calc);
            x.addEventListener("focusin", this._sum);
            //x.innerHTML = x.id;
        }
    }
 }

 _removerow(){
    let row_count = this.shadowRoot.getElementById('table').rows.length;

    if(row_count > 3){
        this.shadowRoot.getElementById('table').deleteRow(row_count-3); //-2 da Buttons auf -1 / -2 liegen
    }
 }

 _calc(cell){
    if(cell.path[0].childNodes[0].data.startsWith("=")){
        if(cell.path[0].childNodes[0].data.match(/^=SUM\([A-Z][1-9]+\,[A-Z][1-9]+\)/)){
            var data = cell.path[0].childNodes[0].data;
            cell.path[0].setAttribute("formel", data.toString()); //Formel abspeichern
            let tmp = data.split(/[\(,\)]/);
            let x = tmp[1];
            let y = tmp[2];
            cell.path[0].childNodes[0].data = parseInt(cell.path[4].getElementById(x).innerHTML) + parseInt(cell.path[4].getElementById(y).innerHTML);
        }
    }
 }

 _sum(cell){
    if(cell.path[0].getAttribute("formel") != undefined){
        cell.path[0].childNodes[0].data = cell.path[0].getAttribute("formel");
    }
 }
}
customElements.define('tabellen-kalk', Tabellenkalkulation);
```

Geben Sie hier Ihre Web-Komponente für das Statistik-Balkendiagramm in SVG (Ü6.1) ein:
```js
import {LitElement, html, css, svg} from 'https://mkaul.github.io/lit/lib/lit.js';

export class SVGDiagram extends LitElement {
  static styles = css`tr,td,th {
                        border: 1px solid black;
                    }
                    table{
                        border-collapse: collapse;
                        margin-left:auto; 
                        margin-right:auto;
                    }
                    svg{
                        width: 50%; 
                        height: 30%;
                        display: block;
                        margin: auto;
                        border: 1px solid gray;
                    }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render(){
      return html`
      <div>
      <h1 style="text-align: center;">Sitzverteilung 18. Bundestag</h1>

        <table>
            <tr>
                <th>Fraktion</th>
                <th>Anzahl</th>
            </tr>
            <tr>
                <td>CDU/CSU</td>
                <td>310</td>
            </tr>
            <tr>
                <td>SPD</td>
                <td>193</td>
            </tr>
            <tr>
                <td>Die Linke</td>
                <td>64</td>
            </tr>
            <tr>
                <td>Grüne</td>
                <td>63</td>
            </tr>
            <tr>
                <td>Gesamt</td>
                <td>630</td>
            </tr>
        </table>
        <p style="text-align: center;">
            Quelle <a href="http://webarchiv.bundestag.de/cgi/show.php?id=1284&jahr=2016">Webarchiv Bundestag</a>
        </p>
        <svg viewbox="0 0 130 100" id="svg">
            ${this.printDiag()}
        </svg>
    </div>`;
  }

  printDiag() {
    fetch("sitze.json")
    .then(response => response.json())
    .then(json => createDiagram(json.data, this.shadowRoot));

    function createDiagram(data, shadowRoot){
        let svg = shadowRoot.getElementById("svg");

        for(let i = 0; i < Object.keys(data).length - 1; i++){
            var rect =  document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", 25);
            rect.setAttribute("y", Math.ceil((100/Object.keys(data).length)*(i)+10));
            rect.setAttribute("height", Math.ceil((100/Object.keys(data).length)-10));
            rect.setAttribute("width", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100));
            rect.setAttribute("fill",  data[i].farbe);

            svg.appendChild(rect);

            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", 1);
            text.setAttribute("y", Math.ceil((100/Object.keys(data).length)*(i)+16));
            text.innerHTML = data[i].fraktion;
            text.style = "font-size: 5px";

            svg.appendChild(text);
 
            var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text2.setAttribute("x", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100)+30);
            text2.setAttribute("y", Math.ceil((100/Object.keys(data).length)*(i)+16));
            text2.innerHTML = data[i].sitze;
            text2.style = "font-size: 5px";

            svg.appendChild(text2);
        }
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 25);
        line.setAttribute("x2", 25);
        line.setAttribute("y1", 5);
        line.setAttribute("y2", 95);
        line.style = "stroke: lightgray";
    }
  };
}
customElements.define('svg-diagram', SVGDiagram);
```

Geben Sie hier Ihre Web-Komponente für Bezier-Animation (Ü6.2) ein:
```js
import {LitElement, html, css, svg} from 'https://mkaul.github.io/lit/lib/lit.js';

export class SVGBezier extends LitElement {
  static styles = css` svg{
                            width: 40%; 
                            display: block;
                            margin: auto;
                            border: 1px solid gray;
                        }
                        .center{
                            margin-left: auto;
                            margin-right: auto;
                        }`;

  static properties = {
    //name: {type: String},
  };

  constructor() {
    super();
  }

  render(){
      return html`${this.printDiag()}`;
  }

  printDiag() {
    class point{
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
    }
    var points = [];
    // Punkte anlegen
    points.push(new point(10,25,"blue"));
    points.push(new point(10,80,"green"));
    points.push(new point(80,10,"red"));

    this.shadowRoot.innerHTML = `
    <div class="center">
    <h1 style="text-align: center;">Animationswerkzeug für Bezierkurven</h1>
    <svg viewbox="0 0 100 100" id="svg">
    </svg>
    </div>`

    var diag = this.shadowRoot.getElementById("svg");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id","path");
    path.setAttribute("fill","none");
    path.setAttribute("stroke", "grey");
    path.setAttribute("stroke-width", "0.3px");
    path.setAttribute("d", "M"+points[0].x+","+points[0].y+" L"+points[2].x+","+points[2].y+" L"+points[1].x+","+points[1].y+" S"+points[2].x+","+points[2].y+" "+points[0].x+","+points[0].y);
    diag.appendChild(path);

    for(let i=0;i<Object.keys(points).length;i++){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("id",i);
        circle.setAttribute("cx", points[i].x);
        circle.setAttribute("cy", points[i].y);
        circle.setAttribute("r", 1);
        circle.setAttribute("fill", points[i].color);
        circle.setAttribute("class", "draggable")
        circle.addEventListener('mousedown', start);
        circle.addEventListener('mousemove', drag);
        circle.addEventListener('mouseup', end);
        diag.appendChild(circle);

        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("id","t"+i);
        text.setAttribute("x", points[i].x+2);
        text.setAttribute("y", points[i].y+2);
        text.innerHTML = "x:"+points[i].x+" y:"+points[i].y;
        text.style = "font-size: 5px";
        diag.appendChild(text);       
    }

    let currelement;
    function start(e) {
        if (e.target.classList.contains('draggable')) {
            currelement = e.target;
        }
    }
    function drag(e) {
        if (e.target == currelement) {
            let i = e.path[0].id;
            let oldx = points[i].x;
            let oldy = points[i].y;
            let pos = convert(e.x,e.y);
            e.path[0].setAttribute("cx", points[i].x += (oldx - pos.x));
            e.path[0].setAttribute("cy", points[i].y += (oldy - pos.y));
            let text = diag.getElementById("t"+i);
            text.setAttribute("x", points[i].x+2);
            text.setAttribute("y", points[i].y+2);
            updatepath();
        }
    }
    function end(e){
        currelement = null;
    }

    function convert(x,y){
        let point = diag.createSVGPoint();
        point.x = x;
        point.y = y;

        return point.matrixTransform(diag.getScreenCTM().inverse());
    }
    
    function updatepath(){
        diag.getElementById("path");
        path.setAttribute("d", "M"+points[0].x+","+points[0].y+" L"+points[2].x+","+points[2].y+" L"+points[1].x+","+points[1].y+" S"+points[2].x+","+points[2].y+" "+points[0].x+","+points[0].y);
    }
  };
}
customElements.define('svg-bezier', SVGBezier);
```

Geben Sie hier Ihre Web-Komponente für den Kalligraphie-Editor (Ü6.3) ein:
```js
import {LitElement, html, css, svg} from 'https://mkaul.github.io/lit/lib/lit.js';

export class SVGKalligraphie extends LitElement {
static styles = css`  
                    svg{
                        width: 40%; 
                        display: block;
                        margin: auto;
                        border: 1px solid gray;
                    }
                    .center{
                        margin-left: auto;
                        margin-right: auto;
                    }`;

static properties = {
//name: {type: String},
};

constructor() {
super();
}

render(){
    return html`${this.printDiag()}`;
}

printDiag() {
    this.shadowRoot.innerHTML = `
    <div class="center">
        <h1 style="text-align: center;">Kalligraphie-Editor in SVG</h1>
        <svg viewbox="0 0 100 100" id="svg">
        </svg>
    </div>`

    let diag = this.shadowRoot.getElementById("svg");

    let color = "gray";

    let last_x = 0;
    let last_y = 0;
    let isDrawing = false;

    diag.addEventListener('mousedown', start);
    diag.addEventListener('mousemove', drag);
    diag.addEventListener('mouseup', end);

    function convert(x,y){
        let point = diag.createSVGPoint();
        point.x = x;
        point.y = y;

        return point.matrixTransform(diag.getScreenCTM().inverse());
    }

    function start(e){
        if(last_x == 0 && last_y == 0){
            let pos = convert(e.x,e.y);
            last_x = pos.x;
            last_y = pos.y;
            isDrawing = true;
        }
    }
    function drag(e){
        if(isDrawing){
            let pos = convert(e.x,e.y);
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill","none");
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", "0.3px");
            path.setAttribute("d", "M"+last_x+","+last_y+" L"+pos.x+","+pos.y);
            diag.appendChild(path);
            last_x = pos.x;
            last_y = pos.y;
        }
    }    
    function end(e){
        last_x = 0;
        last_y = 0;
        isDrawing = false;
    }
};
}
customElements.define('svg-kalligraphie', SVGKalligraphie);
```

## 8.2. LitElement Menü-Komponente (2 Punkte)
Schreiben Sie mit LitElement eine flexible Menü-Komponente, die sich sowohl für horizontale als auch für vertikale Menüs eignet, wie sie sie in Ihrem WWW-Navigator gebrauchen könnten.

Geben Sie hier den vollständigen Quellcode Ihrer Menü-Komponente ein:
```js

```

## 8.3. LitElement WWW-Navigator (4 Punkte)
Zerlegen Sie Ihren WWW-Navigator (aus Ü5.4) in wiederverwendbare Web-Komponenten. Implementieren Sie diese mit LitElement.

Geben Sie hier den vollständigen Quellcode Ihres WWW-Navigators ein:
```js

```
