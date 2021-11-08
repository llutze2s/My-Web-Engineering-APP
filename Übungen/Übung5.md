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
```

```