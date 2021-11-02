# Übung 4

## 4.1. Einkaufsliste (2 Punkte)
Implementieren Sie die interaktive Anwendung "Einkaufsliste" selbstständig in JavaScript durch Nutzung der DOM API. Jeder Punkt auf der Einkaufsliste soll sich individuell löschen lassen. Suchen Sie eine möglichst kurze und elegante Lösung. Denken Sie außerdem über Usability nach: Welche User Interaktionen sollten ebenfalls erlaubt sein? Implementieren Sie dann auch diese.

<img src="./Assets/4.DOM/Einkaufsliste.png" width="400" height="300">

```html
<!DOCTYPE html>
<head>
    <title>Einkaufsliste</title>
    <script src="einkauf.js"></script>
</head>
<body onload="init()">
    <h1>Einkaufsliste</h1>
    <p style="display: inline-block;">
        <form>
            Enter a new item: 
            <input id="item">
            <button id="button" type="button" >Add item</button>
        </form>
    </p>
    <ul id="liste">
    </ul>
</body>
</html>
```

```js
function init(){
    var add = document.getElementById('button');
    add.addEventListener('click', AddItem); //hier ohne ()
}

function AddItem(){
    var item = document.getElementById('item'); //Hole Item

    var li = document.createElement('li');  // Baue Listenelement
    li.innerHTML = item.value+" ";             // Fülle mit Inhalt
    item.value = "";                       // leere Feld

    var del = document.createElement('button');
    del.innerHTML = "delete";
    del.addEventListener('click', function(){li.remove();});
    li.appendChild(del);

    var ul = document.getElementById('liste');  // Hole Liste

    ul.appendChild(li);                     // An Liste anhängen
}
```

## 4.2. Rednerliste mit Zeitmessung (2 Punkte)
Implementieren Sie die interaktive Anwendung "Rednerliste mit Zeitmessung" selbstständig in JavaScript durch Nutzung der DOM API und der Timer-Funktionen. Neue Redner sollen auf Knopfdruck hinzugefügt werden können. Deren Uhr wird dann sofort automatisch gestartet und alle anderen Uhren angehalten. Bei jedem Redner soll die individuelle, gemessene Redezeit sekundengenau angezeigt werden. Für jeden Redner soll es einen eigenen Start-/Stopp-Button geben. Es soll immer nur eine Uhr laufen. Angezeigt werden sollen die bisherigen Summenzeiten aller Redebeiträge der betreffenden Person. Suchen Sie eine möglichst kurze und elegante Lösung. Achten Sie gleichzeitig auf gute Usability: z.B. wenn die Eingabe mit einem Return beendet wird, soll der Button-Click nicht mehr erforderlich sein, usw.

<img src="./Assets/4.DOM/Rednerliste.png" width="400" height="300">

```html
<!DOCTYPE html>
<head>
    <title>Rednerliste</title>
    <script src="redner.js"></script>

    <style>
        p{
          display: inline;
          padding: 10px;
        }
        li{
          padding: 5px;
        }
    </style>
</head>
<body onload="init()">
    <h1>Rednerliste</h1>
    <p>
        <form>
            Neuer Redner: 
            <input id="redner">
            <button id="button" type="button" >Hinzufügen</button>
        </form>
    </p>
    <ul id="liste">
    </ul>
</body>
</html>
```

```js
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
```

## 4.3. Tabellenkalkulation mit den Bordmitteln des Webs (3 Punkte)
Schreiben Sie eine Tabellenkalkulation mit den Bordmitteln des Webs. In die Tabelle soll man Zahlen und Formeln eintragen können. Die Formeln sollen berechnet werden, sobald sie fertig eingegeben sind, aber auch immer wieder editiert werden können. Beginnen Sie mit einfachen Summenformeln wie `=SUM(A2:D2)`.

<img src="./Assets/4.DOM/excel_formel.png" width="400" height="300">
<img src="./Assets/4.DOM/excel.png" width="400" height="300">


```html
<!DOCTYPE html>
<head>
    <title>Tabellenkalkulator</title>
    <script src="tabellenkalkulator.js"></script>

    <style>
        td {
            border: 1px solid black;
        }
    </style>
</head>
<body onload="init()">
    <h1>Tabellenkalkulator mit contentEditable</h1>
    <p>=SUM(X1,Y2) rechnet</p>
    <table id="table">
        <tr>
            <th id="add_col"></th>
            <th id="rem_col"></th>
        </tr>
        <tr>
            <th id="add_row"></th>
        </tr>
        <tr>
            <th id="rem_row"></th>
        </tr>
    </table>
</body>
</html>
```

```js
function init(){
    var add_col = document.createElement('button');
    add_col.innerHTML = "+";
    add_col.addEventListener('click', addcolumn);
    document.getElementById('add_col').appendChild(add_col);

    var rem_col = document.createElement('button');
    rem_col.innerHTML = "-";
    rem_col.addEventListener('click', removecolumn);
    document.getElementById('rem_col').appendChild(rem_col);
    
    var add_row = document.createElement('button');
    add_row.innerHTML = "+";
    add_row.addEventListener('click', addrow);
    document.getElementById('add_row').appendChild(add_row);

    var rem_row = document.createElement('button');
    rem_row.innerHTML = "-";
    rem_row.addEventListener('click', removerow);
    document.getElementById('rem_row').appendChild(rem_row);
}

const Column_Index = ['A','B','C','D','E','F','G'];

function addcolumn(){
    var table = document.getElementById('table');

    for (i = 0; i < table.rows.length-2; i++) {
        if(i == 0){
            x = table.rows[i].insertCell(table.rows[0].cells.length-2);
        } else {
            x = table.rows[i].insertCell(table.rows[i].cells.length);
            x.contentEditable = true;
            x.id = Column_Index[table.rows[i].cells.length-2]+i;
            x.addEventListener("focusout", calc);
            x.addEventListener("focusin", sum);
            //x.innerHTML = x.id;
        }
        if(i == 0 && table.rows[i].cells.length > 3){
            x.innerHTML = Column_Index[table.rows[0].cells.length-4];
        }
    }
}
function removecolumn(){
    var table = document.getElementById('table');
    
    if(table.rows[0].cells.length > 3){
        for (i = 0; i < table.rows.length; i++) {
            if(i == 0){
                table.rows[i].deleteCell(table.rows[0].cells.length-3);
            } else {
                table.rows[i].deleteCell(table.rows[0].cells.length-2);
            }
        }
    }
}
function addrow(){          //https://www.w3schools.com/jsref/met_table_insertrow.asp
    var table = document.getElementById('table');
    var row_count = table.rows.length;
    var column_count = table.rows[0].cells.length-2;

    var row = table.insertRow(row_count-2); //-2 da Buttons auf 0 / -2 liegen
    for(i=0; i<column_count; i++){
        x = row.insertCell(i);
        if(i==0){
            x.innerHTML = row_count-2;
        } else {
            x.contentEditable = true;
            x.id = Column_Index[i-1]+(row_count-2);
            x.addEventListener("focusout", calc);
            x.addEventListener("focusin", sum);
            //x.innerHTML = x.id;
        }
    }
}

function removerow(){       //https://www.w3schools.com/jsref/met_table_deleterow.asp
    var row_count = document.getElementById('table').rows.length;

    if(row_count > 3){
        document.getElementById('table').deleteRow(row_count-3); //-2 da Buttons auf -1 / -2 liegen
    }
}

function calc(cell){
    if(cell.path[0].childNodes[0].data.startsWith("=")){
        if(cell.path[0].childNodes[0].data.match(/^=SUM\([A-Z][1-9]+\,[A-Z][1-9]+\)/)){
            var data = cell.path[0].childNodes[0].data;
            cell.path[0].setAttribute("formel", data.toString()); //Formel abspeichern
            tmp = data.split(/[\(,\)]/);
            console.log(tmp);
            x = tmp[1];
            y = tmp[2];
            cell.path[0].childNodes[0].data = parseInt(document.getElementById(x).innerHTML) + parseInt(document.getElementById(y).innerHTML);
        }
    }
};

function sum(cell){
    if(cell.path[0].getAttribute("formel") != undefined){
        cell.path[0].childNodes[0].data = cell.path[0].getAttribute("formel");
    }
};
```

## 4.4. HTML-Editor (3 Punkte)
Arbeiten Sie das Tutorial Create a WYSIWYG Editor With the contentEditable Attribute durch und erstellen Sie Ihren eigenen HTML-Editor.

(Optional: Versuchen Sie dabei ohne Frameworks auszukommen, also ohne jQuery etc. Arbeiten Sie nur mit Vanilla JS.)


```html
<!DOCTYPE html>
<head>
    <title>HTML-Edior</title>
    <script src="html-editor.js"></script>
    <style>
      td, th {
        border: 1px solid rgb(88, 86, 86);
        padding: 5px;
      }
      th {
        text-align: center;
      }
      table {
        border-collapse: collapse;
      }
      a{
        background-color:lightslategray;
        border-radius: 5px;
        padding: 5px;
        text-decoration: none;
        color: black;
      }
    </style>
</head>
<body>
    <h1 style="text-align: center;">HTML Editor</h1>
    <table style="margin: 0 auto">
        <thead>
          <tr>
            <th colspan="4">Commands</th>
            <th colspan="3">Überschrift</th>
            <th colspan="5">Text</th>
            <th colspan="2">Mathe</th>
          </tr>
        </thead>
        <tbody>
          <tr> <!--https://www.w3schools.com/charsets/ref_utf_arrows.asp Unicode Symbole-->
            <th><a href="#" onclick="command('undo');return false;">&#8634;</a></th>
            <th><a href="#" onclick="command('redo');return false;">&#8635;</a></th>
            <th><a href="#" onclick="command('createlink');return false;">Link</a></th>
            <th><a href="#" onclick="command('insertImage');return false;">Bild</a></th>
            <th><a href="#" onclick="command('h1');return false;">H1</a></th>
            <th><a href="#" onclick="command('h2');return false;">H2</a></th>
            <th><a href="#" onclick="command('h3');return false;">H3</a></th>
            <th><a href="#" onclick="command('justifyLeft');return false;">&lArr;</a></th>
            <th><a href="#" onclick="command('justifyCenter');return false;">&dArr;</a></th>
            <th><a href="#" onclick="command('justifyRight');return false;">&rArr;</a></th>
            <th><a href="#" onclick="command('bold');return false;"><b>Fett</b></a></th>
            <th><a href="#" onclick="command('italic');return false;"><i>Kursiv</i></a></th>
            <th><a href="#" onclick="command('superscript');return false;">x<sup>y</sup></a></th>
            <th><a href="#" onclick="command('subscript');return false;">x<sub>y</sub></a></th>
          </tr>
          <tr>
            <td colspan="15" style="height: 300px; background-color: lightblue; padding: 5px;" contenteditable></td>
          </tr>
        </tbody>
    </table>
</body>
</html>
```

```js
//document.execCommand(CommandName, ShowDefaultUI, ValueArgument); //Eigentlich veraltet aber keine Alternative

function command (com){
    switch (com) {
        case 'h1':
        case 'h2':
        case 'h3':
            document.execCommand('formatBlock', false, com);
            break;
        case 'justifyLeft':
        case 'justifyRight': 
        case 'justifyCenter':
        case 'superscript':
        case 'subscript':
        case 'bold':
        case 'italic':
            document.execCommand(com, false, false);
            break;
        case 'createlink':
            url = prompt('Enter URL: ', 'https:\/\/');
            document.execCommand(com, false, url);
            break;
        case 'insertImage':
            url = prompt('Enter URL: ', 'https:\/\/');
            url.height='100px';
            url.width='50px';
            document.execCommand(com, false, url);
            break;
        default:
            alert('Befehl nicht gefunden!');
    }
}
```