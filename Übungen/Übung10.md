# Übung 10

# Aufgabe 10.1: Komponente in Vue.js (2 Punkte)
Schreiben Sie eine Vue.js Single File Component mit einem Text-Eingabefeld und 3 Ausgabefeldern, in denen man während des Tippens sehen kann, 
1. wie viele Buchstaben 
2. wie viele Leerzeichen 
3. wie viele Worte

man in das Text-Eingabefeld bereits eingegeben hat.

Betten Sie Ihre Komponente in eine Webseite zweimal ein und testen Sie, ob beide Komponenten unabhängig voneinander sind.

Geben Sie Ihre Vue.js Single File Component hier ein:
```js
import textEingabe from "./textEingabe.mjs";

export default {
    template: `
        <div>
            <input @input="analysis" ref="input">
            <p>a) Buchstaben: {{buchstaben}}</p>
            <p>b) Leerzeichen: {{leerzeichen}}</p>
            <p>c) Wörter: {{woerter}}</p>
        </div>
    `,

    data () {
        return {
            buchstaben: 0,
            leerzeichen: 0,
            woerter: 0
        }
    },

    methods:{
        analysis() {
            let input = this.$refs.input.value;
            this.buchstaben = input.length;
            input = input.split(/\s/);
            this.leerzeichen = input.length-1;
            this.buchstaben = this.buchstaben - this.leerzeichen;
            this.woerter = input.length;
        }
    }
}

new Vue({
    el: "#app",
    components: {
        textEingabe
    }
});
```

Geben Sie die Webseite, auf der Sie Ihre Komponente mehrfach testen, hier ein:
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <title>Text Analyse</title>
    <script src="https://unpkg.com/vue"></script>   <!-- VUE einbinden -->
    <script type="module" src="textEingabe.mjs"></script> <!-- Modul -->
</head>
<body>
    <h1>Text Analyse</h1>
    <p>Bitte den zu analysierenden Text eingeben</p>
    <div id="app">
        <text-eingabe></text-eingabe>
        <hr>
        <text-eingabe></text-eingabe>
    </div>
</body>
</html>
```

# Aufgabe 10.2: Menü-Komponente (3 Punkte)
Schreiben Sie eine möglichst flexible Vue.js Single File Component für Menüs und wenden Sie diese in derselben Webseite zweimal an, einmal horizontal, das andere Mal vertikal.

Geben Sie die Inhalte aller Dateien Ihrer Lösung inkl. JS-Quelltext hintereinander ein. Schreiben Sie vor jede Datei deren Dateiname:
```js

```

# Aufgabe 10.3: Vue.js WWW-Navigator (5 Punkte)
Schreiben Sie Ihren WWW-Navigator als SPA in Vue.js (optional: mit Vue Router und/oder mit Vuex als State Manager).

Dokumentieren Sie Ihren Entscheidungsprozess: In welche Komponenten wollen Sie Ihre App zerlegen? Wie soll das State Management implementiert werden?
```

```

Geben Sie die Inhalte aller Dateien (ohne node_modules) Ihrer Lösung inkl. JS-Quelltext hintereinander ein. Schreiben Sie vor jede Datei deren Dateiname:
```

```