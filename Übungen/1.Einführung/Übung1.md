# Übung 1

## 1.1 Fachliche Argumentation über Erfolgsprinzipien des WWW (2 Punkte)
Mit welchen fachlichen Argumenten wurde das WWW-Proposal von TBL abgelehnt?

```
Das WWW-Proposal war dem Chef zu vage. Des Weiteren war sich die Wissenschaftliche Community sicher, dass das Proposal ein Rückschritt gewesen währe im Bezug auf "broken links".
```
Was sind die fachlichen Argumente, warum das WWW dennoch ein Erfolg wurde?

```
Die Evolvierbarkeit des Proposals die zuvor vom Chef als zu vage gedeutet wurde.
```

Was wäre der Preis für die garantierte Verhinderung von “broken links”?

```
Um zu verhindern das Links ins "leere" zeigen würde eine zentrale Datenbank benötigt oder falls ein Link ungültig wird müsste dieser alle Referenzen entfernen. Stichwort: "Referentiellen Integrität".
```

## 1.2 HTTP (2 Punkte)
Sie bekommen im Browser den HTTP Status Code 200. Was bedeutet das?

```
Der HTTP Request wurde er erfolgreich bearbeitet und es wird die Webseite zurückgeliefert.
```

Sie bekommen im Browser den HTTP Status Code 301. Was hat das zu bedeuten?

```
Dies ist eine Redirect Antwort. Das bedeutet das die angeforderte Webseite nun unter einem anderen Link zur Verfügung steht. Die neue URL wird zurückgeliefert.
```

Sie bekommen im Browser den HTTP Status Code 400. Was hat das zu bedeuten? Was können Sie dagegen tun?

```
Der HTTP Request ist fehlerhaft.
```

Sie bekommen im Browser den HTTP Status Code 403. Was hat das zu bedeuten? Was können Sie dagegen tun?

```
Diese Antwort bekommt man, falls man nicht auf die Webressource zugreifen darf, die angefragt wurde. 
Dies wird gerne benutzt wenn sich ein User nicht angemeldet hat und auf einen geschützten Bereich zugreifen möchte.
```
<i>Quelle: https://de.wikipedia.org/wiki/HTTP-Statuscode</i>

In einer Webanwendung benötigen Sie eine OPTIONS-Anfrage, die die Optionen des Servers vor dem eigentlichen Zugriff erfragen soll. Aus Performanzgründen soll die Abfrage jedoch cacheable sein. Wie könnten Sie dafür eine Lösung angehen?

```
Options ist nicht cacheable.  ("Responses to this method are not cacheable." Quelle: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)

Die einfachste Möglichkeit wäre es einen Request zu bauen der cacheable ist, zum Beispiel ein GET Request.
```

## 1.3. Wireframe with HTML and CSS: Tribute Page (2 Punkte)
Gegeben ist folgendes HTML-Wireframe (Tribute Page):
![](./Assets/tribute.png)
Mit welchem HTML- und CSS-Code kann man diesen Wireframe möglichst exakt nachbilden?
Schreiben Sie Ihren CSS-Code direkt in die HTML-Datei. Für das Bild dürfen Sie die URL /wem/assets/img/tribute-img.png verwenden.
Geben Sie Ihren HTML- und CSS-Quellcode zusammen in dieses Textfeld ein:

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            h1 {
                text-align: center;
                margin: 0;
                font-family: Montserrat;
                color:black;
                font-size: 22px;
                padding-top: 20px;
                padding-bottom: 10px;
            }

            h2 {
                text-align: center;
                margin: 0;
                font-size: 12px;
                font-family: Montserrat;
                color:black;
                padding-bottom: 10px;
            }

            .main{
                width: 800px;
                margin: auto;
                background-color: #eeeeee;
            }

            .header {
                background-color: dimgray;
                height: fit-content;
            }
            .content {
                width: fit-content;
                margin: auto;
                background-color: #eeeeee;
            }
        </style>

    </head>
    <body>
        <div class="main">
            <div class ="header">
                <h1>Dr. Norman Borlaug</h1>
                <h2>The man who save a billion lives</h2>
            </div>
            <div class="content">
                <!-- Probleme mit lokalem Bild ./assets/tribute-img.png -->
                <center> 
                    <img src="https://kaul.inf.h-brs.de/wem/assets/img/tribute-img.png" style="width: 70%;">
                </center>
            </div>
        </div>
    </body>
</html>
```

## 1.4. Wireframe with HTML and CSS (Survey Form) (2 Punkte)
Gegeben ist folgendes HTML-Wireframe (Survey Form):
![](./Assets/survey.png)
Hinweis zu den Farben: Firefox DevTools anthalten eine Pipette namens "Eyedropper", mit der man die Farben aus einer Webseite auslesen kann. Die grünliche Farbe im Rahmen des Wireframes ist demnach #b2d6d1,

Hinweis zu den Schriften (Fonts): Die größte Sammlung an "kostenlosen" Web-Schriften stammt von Google und ist unter Google Fonts zu finden. Wer lieber aus dem Vorrat an vorhanden Schriften auswählt, wird unter websichere Schriften fündig.

Mit welchem HTML- und CSS-Code kann man diesen Wireframe möglichst exakt nachbilden?
Schreiben Sie Ihren CSS-Code direkt in die HTML-Datei. Geben Sie Ihren HTML- und CSS-Quellcode zusammen in dieses Textfeld ein:

```html
<html>
    <head>
        <style>
            body {
                background-color: #A8D7D1;
                font: Montserrat;
            }

            .box {
                background-color: #ffffff;
                margin: auto;
                padding: 5px;
                width: 90%;
                border-radius: 2%;
            }

            h1 {
                text-align: center;
                font-size: 40px;
                color: #000000
            }

            table {
                border: 0px black;
                margin: auto;
                width: 90%;
                color: black;
            }

            td {
                border: 0px black;
                padding: 5px;
                vertical-align: top;
            }

            td.left {
                width: 49%;
                text-align: right;
            }
            
            td.right {
                width: 49%;
                text-align: left;
            }

            td.middle {
                width: 2%;
            }

            input.text {
                height: 25px;
                width: 60%;
            }

            input.radio {
                margin: 5px;
            }

            input.checkbox {
                margin: 5px;
            }

        </style>
    </head>
    <body>
        <h1>Survey Form</h1>
        
        <div class="box">
            <!-- center ist nicht mehr aktuell https://developer.mozilla.org/de/docs/Web/HTML/Element/center -->
            <p style="color: black; text-align:center">Let us know how we can improve freeCodeCamp</p>
            <table>
                <tr><td class="left">* Name:</td> <td class="mid"></td> <td><input class="text" type="text"></td></tr>
                <tr><td class="left">* Email:</td> <td class="mid"></td> <td><input class="text" type="text"></td></tr>
                <tr><td class="left">* Age:</td> <td class="mid"></td> <td><input class="text" type="number"></td></tr>
                <tr><td class="left">Which option best describe your current role?</td class="middle"> <td></td>
                    <td>
                        <select>
                            <option selected> Student </option>
                            <option selected> Employee </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="left">* How likely is that you would recomend<br/> free CodeCamp to a friend?</td> 
                    <td class="mid"></td>
                    <td>
                        <input type="radio" class="radio" name="recomend" id="definitly"><label for="definitly">Definitly</label><br>
                        <input type="radio" class="radio" name="recomend" id="maybe"><label for="maybe">Maybe</label><br>
                        <input type="radio" class="radio" name="recomend" id="notSure"><label for="notSure">Not sure</label>
                    </td>
                </tr>
                <tr>
                    <td class="left">What do you like most in FFC:</td>
                    <td class="mid"></td>
                    <td>
                        <select>
                            <option selected> Select an option</option>
                            <option> All </option>
                            <option> Nothing </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="left">Things that should be improved in the future<br>(Check all that apply):</td> 
                    <td class="mid"></td>
                    <td>
                        <input type="checkbox" class="checkbox" name="future" id="fend"><label for="fend">Front-end Projects</label><br>
                        <input type="checkbox" class="checkbox" name="future" id="bend"><label for="bend">Back-end Projects</label><br>
                        <input type="checkbox" class="checkbox" name="future" id="dvis"><label for="dvis">Data Visualization</label>
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>
```