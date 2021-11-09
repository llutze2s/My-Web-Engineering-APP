# Übung 5

## 5.1. Promises (2 Punkte)
Erstellen Sie auf Ihrem Server www2.inf.h-brs.de (oder localhost) zwei Text-Dateien A.txt und B.txt mit ungefähr gleich vielen Zeilen. Laden Sie mit der fetch-API parallel beide Text-Dateien vom Server. Geben Sie auf einer Webseite den Inhalt beider Dateien zeilenweise aus, wobei der Anfang der Zeile aus A.txt und das Ende aus B.txt stammen soll. Die beiden Dateien sollen also zeilenweise konkateniert werden. Erzielen Sie max. Geschwindigkeit durch maximale Parallelität. Achten Sie gleichzeitig auf Korrektheit. Verwenden Sie dabei ausschließlich die Promise API ohne async / await.

```html
<!DOCTYPE html>
    <head>
        <title>Promises</title>

        <script>
            // https://developer.mozilla.org/en-US/docs/Web/API/Response/text
            var TextA = " ";
            var TextB = " ";

            function init(){
                Promise.all([       //Probleme in die Var schreiben
                    fetch( "https://llutze2s.github.io/My-Web-Engineering-APP/%C3%9Cbungen/Assets/5.async/textA.txt" ).then(response =>
                        response.text().then(function(text) {
                            TextA = text;
                    })),
                    fetch( "https://llutze2s.github.io/My-Web-Engineering-APP/%C3%9Cbungen/Assets/5.async/textB.txt" ).then(response =>
                        response.text().then(function(text) {
                            TextB = text;
                    }))
                ]).then(()=>writetext());
            }

            function writetext(){
                textA = TextA.split("\n");  //Bei Zeilenumbruch trennen
                textB = TextB.split("\n");
                para = document.getElementById("Text");

                counter = 0;

                textA.forEach(element => {
                    var tmp = document.createElement("p");
                    tmp.innerHTML = element + textB[counter];
                    para.appendChild(tmp);
                    counter += 1;
                });
                if(textB.length > textA.length){
                    for(i = textA.length+1; i < textB.length; i++){
                        var tmp = document.createElement("p");
                        tmp.innerHTML = textB[counter];
                        para.appendChild(tmp);
                    }
                }
            }
        </script>
    </head>
    <body onload="init()">

        <h1>Promises</h1>
        
        <p>Erstellen Sie auf Ihrem Server www2.inf.h-brs.de (oder localhost) zwei Text-Dateien A.txt und B.txt mit ungefähr gleich vielen Zeilen. Laden Sie mit der fetch-API parallel beide Text-Dateien vom Server.<br> 
            Geben Sie auf einer Webseite den Inhalt beider Dateien zeilenweise aus, wobei der Anfang der Zeile aus A.txt und das Ende aus B.txt stammen soll. Die beiden Dateien sollen also zeilenweise konkateniert werden.<br> 
            Sie max. Geschwindigkeit durch maximale Parallelität. Achten Sie gleichzeitig auf Korrektheit. Verwenden Sie dabei ausschließlich die Promise API ohne async / await.</p>

        <h2>Text:</h2>
        <p id="Text">

        </p>
    </body>
</html>
```

## 5.2. async / await (2 Punkte)
Lösen Sie die letzte Aufgabe mit async / await statt Promise.

```html
<!DOCTYPE html>
    <head>
        <title>Async/Await</title>

        <script>
            // https://developer.mozilla.org/en-US/docs/Web/API/Response/text
            var TextA = " ";
            var TextB = " ";

            async function init(){
                await fetch( "https://llutze2s.github.io/My-Web-Engineering-APP/%C3%9Cbungen/Assets/5.async/textA.txt" ).then(response =>
                    response.text().then(function(text) {
                        TextA = text;
                }));
                await fetch( "https://llutze2s.github.io/My-Web-Engineering-APP/%C3%9Cbungen/Assets/5.async/textB.txt" ).then(response =>
                    response.text().then(function(text) {
                        TextB = text;
                }));
                writetext();
            }

            function writetext(){
                textA = TextA.split("\n");  //Bei Zeilenumbruch trennen
                textB = TextB.split("\n");
                para = document.getElementById("Text");

                counter = 0;

                textA.forEach(element => {
                    var tmp = document.createElement("p");
                    tmp.innerHTML = element + textB[counter];
                    para.appendChild(tmp);
                    counter += 1;
                });
                if(textB.length > textA.length){
                    for(i = textA.length+1; i < textB.length; i++){
                        var tmp = document.createElement("p");
                        tmp.innerHTML = textB[counter];
                        para.appendChild(tmp);
                    }
                }
            }
        </script>
    </head>
    <body onload="init()">

        <h1>Async Await</h1>
        
        <p>Erstellen Sie auf Ihrem Server www2.inf.h-brs.de (oder localhost) zwei Text-Dateien A.txt und B.txt mit ungefähr gleich vielen Zeilen. Laden Sie mit der fetch-API parallel beide Text-Dateien vom Server.<br> 
            Geben Sie auf einer Webseite den Inhalt beider Dateien zeilenweise aus, wobei der Anfang der Zeile aus A.txt und das Ende aus B.txt stammen soll. Die beiden Dateien sollen also zeilenweise konkateniert werden.<br> 
            Sie max. Geschwindigkeit durch maximale Parallelität. Achten Sie gleichzeitig auf Korrektheit. Verwenden Sie dabei ausschließlich die Promise API ohne async / await.</p>

        <h2>Text:</h2>
        <p id="Text">

        </p>
    </body>
</html>
```

## 5.3. Web Worker (3 Punkte)
Schreiben Sie eine Webseite, die Primzahlen berechnet und fortlaufend neu berechnete Primzahlen hinzufügt. Verwenden Sie dabei die BigNum-Arithmetik. Auf der Webseite soll außerdem ein Ladebalken ständig hin- und herlaufen, damit man feststellen kann, ob die Anzeige ruckelfrei abläuft. Stellen Sie fest, ab welcher Zahl der Ladebalken anfängt zu ruckeln.

Schreiben Sie dann einen Web Worker, der Primzahlen berechnet und diese mittels postMessage an die EventLoop in der Webseite sendet, damit diese dort angezeigt werden können.

```js
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
```

```html
<!DOCTYPE html>
<head>
    <title>Primzahlen</title>
    <script src="prim.js"></script>
    <style>
        #Progress {
            width: 80%;
            height: 30px;
            padding: 5px;
            background-color: lightblue;
            margin: auto;
        }

        #Bar {
            width: 1%;
            height: 30px;
            background-color: blue;
        }
    </style>
</head>
<body onload="init()">
    <h1>Primzahlen: </h1>
    <div id="Progress">
        <div id="Bar"></div>
    </div>
    <p id="liste">
    </p>
</body>
</html>
```

Mit Worker:

```html
<!DOCTYPE html>
<head>
    <title>Primzahlen</title>
    <script>
        function init(){
            //https://www.html5rocks.com/de/tutorials/workers/basics/
            const worker = new Worker('primwebworker.js');

            worker.addEventListener('message', function(e) {
                document.getElementById("liste").innerHTML +=", "+e.data;
            });

            worker.postMessage("");   //Webworker starten
            
            // Progess Bar
            var i = 0;
            var item = document.getElementById("Bar");
            var width = 1;
            var countup = true;
            setInterval(frame, 16); //60Hz
            function frame() {
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
    </script>
    <style>
        #Progress {
            width: 80%;
            height: 30px;
            padding: 5px;
            background-color: lightblue;
            margin: auto;
        }

        #Bar {
            width: 1%;
            height: 30px;
            background-color: blue;
        }
    </style>
</head>
<body onload="init()">
    <h1>Primzahlen: </h1>
    <div id="Progress">
        <div id="Bar"></div>
    </div>
    <p id="liste">
    </p>
</body>
</html>
```

```js
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
```

## 5.4. WWW-Navigator (3 Punkte)
Schreiben Sie einen Navigator für die Fachbegriffe des WWW zu den Oberthemen HTML, CSS und JavaScript. Im Hauptmenü sollen diese 3 Oberthemen zur Auswahl stehen. Im Untermenü soll eine zugehörige Liste von Fachbegriffen zum jeweiligen ausgewählten Oberthema stehen. In der Mitte soll eine Dokumentation zum ausgewählten Fachbegriff erscheinen mit Hyperlinks zu den anderen Fachbegriffen. Wird auf einen solchen Hyperlink geklickt, so sollen sich auch die beiden Menüs anpassen. Mit dem Back-Button des Browsers soll ein Zurücksprung möglich sein.

<img src="./Assets/5.async/www.navigator.png" width="400" height="300">

```html
<!DOCTYPE html>
<head>
    <title>WWW Navi</title>
    <script src="navigator.js"></script>
    <style>
        .page {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 3fr 1fr 1fr;
            background-color: white;
            grid-gap: 1px;
            justify-content: stretch; 
        }

        .menuband {
            display: flex;
            flex-direction: row;
        }

        .headline {
            grid-row: 1;
            grid-column: span 3;
            text-align: center;
            background-color: #C04F4F;
            color: white;
        }

        .left{
            grid-row: 2;
            grid-column: span 2;
            text-align: center;
            background-color: #C28281;
        }

        .content{
            grid-row: 3;
            grid-column: span 2;
            text-align: center;
            background-color: #6A9EBD;
        }
        
        .right{
            grid-row: 4;
            grid-column: span 2;
            text-align: center;
            background-color: #C28281;
        }

        .footer{
            grid-row: 5;
            grid-column: span 2;
            background-color: #000000;
            text-align: center;
            color: white;
        }

        button{
            background-color: #6A709F;
            color: black;
            font-weight: bold;
            border-radius: 20px;
            box-shadow: 15px;
            margin: 5px;
        }

        /* joegalley.com/articles/mobile-first-vs-desktop-first-media-queries */
        @media (min-width: 992px) {	
            .page {
                display: grid;
                grid-template-rows: 1fr 2fr 1fr 1fr;
                grid-template-columns: 1fr 2fr;
                background-color: white;
                grid-gap: 1px;
                justify-content: stretch;
            }

            .left{
                grid-row: 2;
                grid-column: 1;
            }

            .content{
                grid-row: 2;
                grid-column: 2;
            }
            
            .right{
                grid-row: 3;
                grid-column: span 3;
            }

            .footer{
                grid-row: 4;
                grid-column: span 3;
            }
        }
        
        @media (min-width: 1200px) {
            .page {
                display: grid;
                grid-template-rows: 1fr 3fr 1fr;
                grid-template-columns: 1fr 2fr 1fr;
                background-color: white;
                grid-gap: 1px;
                justify-content: stretch;
            }

            .left{
                grid-row: 2;
                grid-column: 1;
            }

            .content{
                grid-row: 2;
                grid-column: 2;
            }
            
            .right{
                grid-row: 2;
                grid-column: 3;
            }

            .footer{
                grid-row: 3;
                grid-column: span 3;
            }
        }
    </style>
</head>
<body onload="init()">
    <div class="page">
        <div class="headline">
            <h1>WWW-Navigator</h1>
            <div class="menuband" id="menuband">

            </div>
        </div>
        <div class="left" id="sidebar"></div>
        <div class="content" id="content"></div>
        <div class="right" id="additional"></div>
        <div class="footer">
            <b>Footer: </b> <u>Sidemap</u> <u>Home</u> <u>News</u> <u>Contact</u> <u>About</u>
        </div>
    </div>
</body>
</html>
```

```js
var menuband = "";
var sidebar = "";
var additional = "";
var content = "";
var json = "";

async function init(){
    menuband = document.getElementById("menuband");
    sidebar = document.getElementById("sidebar");
    additional = document.getElementById("additional");
    content = document.getElementById("content");

    json = JSON.parse(await fetch("navigator_contents.json").then(response => response.text()));
    build();
}

function build(){
    for(let i=0;i<Object.keys(json).length;i++){
        let tmp = document.createElement("button");
        tmp.innerText = Object.keys(json)[i];
        tmp.addEventListener('click', function(){
            onpresssidebar(tmp);
            tmp.style.background = "grey";
            content.innerText = "";
            additional.innerHTML = "";
        });
        menuband.appendChild(tmp);
    }
}

function onpresssidebar( button ){
    sidebar.innerText = "";
    for(let i=0;i<Object.keys(json[button.innerText]).length; i++){
        let tmp = document.createElement("button");
        tmp.innerText = Object.keys(json[button.innerText])[i];
        tmp.addEventListener('click', function(){
            onpresscontent(button,tmp);
            setcolor();
            button.style.background = "grey";
        });
        sidebar.appendChild(tmp);
    }
}

function onpresscontent( topic , subtopic ){
    content.innerText = json[topic.innerText][subtopic.innerText].content;
    setcolor();
    topic.style.background = "grey";
    subtopic.style.background = "grey";
    for(let i=0; i < json[topic.innerText][subtopic.innerText].references.length; i++){
        additional.innerHTML='<a href='+json[topic.innerText][subtopic.innerText].references[i]+'>'+json[topic.innerText][subtopic.innerText].references[i]+'</a><br>'
    }
}

function setcolor(){
    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "#6A709F";
    }
}
```