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
            height: 30%;
            display: block;
            margin: auto;
            border: 1px solid gray;
        }
    </style>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
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
                    .attr("height", Math.ceil((100/Object.keys(data).length)-10))
                    .transition()
                    .duration(800)  //Dauer Animation
                    .attr("width", Math.ceil((data[i].sitze/data.at(-1).gesamt)*100))
                    .attr("fill",  data[i].farbe);
                diag.append("text")
                    .attr("x", 1)
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
                .attr("y2", 95)
                .style("stroke", "lightgray");
        }
    </script>
</body>
</html>
```

## 6.2. SVG Bezier-Animation (3 Punkte)
Schreiben Sie mit SVG ein Animationswerkzeug für Bezierkurven, wie unter [§1 - A lightning introduction](https://pomax.github.io/bezierinfo/#introduction) vorgegeben.

```html
<!DOCTYPE html>
<head>
    <title>Animationswerkzeug für Bezierkurven</title>
    <style>
        svg{
            width: 40%; 
            display: block;
            margin: auto;
            border: 1px solid gray;
        }
        .center{
            margin-left: auto;
            margin-right: auto;
        }
    </style>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <div class="center">
        <h1 style="text-align: center;">Animationswerkzeug für Bezierkurven</h1>
        <svg viewbox="0 0 100 100"></svg>
    </div>

    <script>
        class point{
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
            }
        }
        var points = [];
        var diag = d3.select('svg');
        const handler = d3.drag();

        // Punkte anlegen
        points.push(new point(10,25,"blue"));
        points.push(new point(10,80,"green"));
        points.push(new point(80,10,"red"));

        diag.append("path")
            .attr("id","path")
            .attr("fill","none") //keine Fläche
            .attr("stroke", "grey") //Strichfarbe
            .attr("stroke-width", "0.3px")
            .attr("d", "M"+points[0].x+","+points[0].y+" L"+points[2].x+","+points[2].y+" L"+points[1].x+","+points[1].y+" S"+points[2].x+","+points[2].y+" "+points[0].x+","+points[0].y);

        // Punkte einzeichen
        for(let i=0;i<Object.keys(points).length;i++){
            diag.append("circle")
                .attr("id",i)
                .attr("cx", points[i].x)
                .attr("cy", points[i].y)
                .attr("r", 1)
                .attr("fill",  points[i].color)
                .attr("draggable", "true")
                .raise()
                .call(d3.drag()
                    .on("drag", function(d) {
                        d3.select(this)
                            .attr("cx", points[i].x = d.x)
                            .attr("cy", points[i].y = d.y)
                            .raise();
                        d3.select("#t"+this.id)
                            .attr("x", d.x+2)
                            .attr("y", d.y+2)
                            .text("x:"+Math.ceil(points[i].x)+" y:"+Math.ceil(points[i].y));
                        d3.select("#path")
                            .attr("d", "M"+points[0].x+","+points[0].y+" L"+points[2].x+","+points[2].y+" L"+points[1].x+","+points[1].y+" S"+points[2].x+","+points[2].y+" "+points[0].x+","+points[0].y);
                    })
                );

            diag.append("text")
                .attr("id","t"+i)
                .attr("x", points[i].x+2)
                .attr("y", points[i].y+2)
                .text("x:"+points[i].x+" y:"+points[i].y)
                .style("font-size", "2px");
        }
    </script>
</body>
</html>
```

## 6.3. Kalligraphie-Editor in SVG (5 Punkte)
Schreiben Sie mit SVG einen Kalligraphie-Editor mit folgenden Features:

Im Zeichenbereich kann man mit der Maus Linien erzeugen.
Eine durchgehende Linie wird nur erzeugt, solange man die Maus gedrückt hält.
Je langsamer man den Cursor bewegt, desto dicker wird die Linie (so als ob das Papier an der Stelle die Tinte schneller aufsaugt).

```html

```