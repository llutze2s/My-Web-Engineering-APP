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

```

```js

```

## 4.3. Tabellenkalkulation mit den Bordmitteln des Webs (3 Punkte)
Schreiben Sie eine Tabellenkalkulation mit den Bordmitteln des Webs. In die Tabelle soll man Zahlen und Formeln eintragen können. Die Formeln sollen berechnet werden, sobald sie fertig eingegeben sind, aber auch immer wieder editiert werden können. Beginnen Sie mit einfachen Summenformeln wie `=SUM(A2:D2)`.

<img src="./Assets/4.DOM/excel_formel.png" width="400" height="300">
<img src="./Assets/4.DOM/excel.png" width="400" height="300">


```html

```

```js

```

## 4.4. HTML-Editor (3 Punkte)
Arbeiten Sie das Tutorial Create a WYSIWYG Editor With the contentEditable Attribute durch und erstellen Sie Ihren eigenen HTML-Editor.

(Optional: Versuchen Sie dabei ohne Frameworks auszukommen, also ohne jQuery etc. Arbeiten Sie nur mit Vanilla JS.)


```html

```

```js

```