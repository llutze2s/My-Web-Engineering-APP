# Übung 6

## 6.1. Statistik-Balkendiagramm in SVG (2 Punkte)
Implementieren Sie ein Balkendiagramm mit Inline SVG. Geben Sie die Daten für das Balkendiagramm im JSON-Format vor. Nehmen Sie als Beispieldaten die Sitzverteilung im Deutschen Bundestag. Animieren Sie die Grafik ähnlich wie im Highchart Bar Chart. 

```html
<!DOCTYPE html>
<head>
    <title>Sitzverteilung Bundestag</title>
    <style>
        tr,td,th {
            border: 1px solid black;
        }
        table{
            border-collapse: collapse;
            margin-left:auto; 
            margin-right:auto;
        }
        svg{
            width: 50%; 
            height: 40%;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <div class="centerd">
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
        <p>
            Quelle <a href="http://webarchiv.bundestag.de/cgi/show.php?id=1284&jahr=2016">Webarchiv Bundestag</a>
        </p>

        <svg viewbox="0 0 130 100"></svg>
    </div>

    <script>
        var diag = d3.select('svg')

        fetch("sitze.json")
        .then(response => response.json())
        .then(json => createDiagram(json.data));

        function createDiagram(data){
            for(let i = 0;i < Object.keys(data).length-1; i++){
                diag.append("rect")
                    .attr("x", 25)
                    .attr("y", Math.ceil((100/Object.keys(data).length)*(i)+10))
                    .transition()
                    .duration(800)  //Dauer Animation
                    .attr("width", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100))
                    .attr("height", Math.ceil((100/Object.keys(data).length)-10))
                    .attr("fill",  data[i].farbe);
                diag.append("text")
                    .attr("x", 0)
                    .attr("y", Math.ceil((100/Object.keys(data).length)*(i)+16))
                    .text(data[i].fraktion)
                    .style("font-size", "5px")
                diag.append("text")
                    .attr("x", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100)+30)
                    .attr("y", Math.ceil((100/Object.keys(data).length)*(i)+16))
                    .text(data[i].sitze)
                    .style("font-size", "5px")
            }
            diag.append("line")
                .attr("x1", 25)
                .attr("x2", 25)
                .attr("y1", 5)
                .attr("y1", 95)
                .style("stroke", "lightgray");
        }
    </script>
</body>
</html>
```

## 6.2. SVG Bezier-Animation (3 Punkte)
Schreiben Sie mit SVG ein Animationswerkzeug für Bezierkurven, wie unter §1 - A lightning introduction vorgegeben.

```html

```

## 6.3. Kalligraphie-Editor in SVG (5 Punkte)
Schreiben Sie mit SVG einen Kalligraphie-Editor mit folgenden Features:

Im Zeichenbereich kann man mit der Maus Linien erzeugen.
Eine durchgehende Linie wird nur erzeugt, solange man die Maus gedrückt hält.
Je langsamer man den Cursor bewegt, desto dicker wird die Linie (so als ob das Papier an der Stelle die Tinte schneller aufsaugt).

```html

```