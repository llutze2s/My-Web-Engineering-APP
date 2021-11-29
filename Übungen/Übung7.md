# Übung 7

## 7.1. File Generatoren (4 Punkte) 
Schreiben Sie in Node.js zwei Kommandozeilen-Tools, um große Dateien zu erzeugen. 1. node number_file_gen.js 20_000 soll eine Datei mit 20.000 Zeilen erzeugen. In jeder Zeile soll die Zeilennummer und ein Punkt stehen. 20.000 ist dabei ein Parameter des Tools. Jede andere Zahl soll ebenfalls erlaubt sein. 2. node alpha_file_gen.js 123456 soll eine Datei mit 123456 Zeilen erzeugen. In jeder Zeile soll eine Kombination von Großbuchstaben (ohne Umlaute) in folgender Reihenfolge stehen: A B C ... Z AA AB AC AD ... usw. Implementieren Sie Ihre Kommandozeilen-Tools in modernem ECMAScript 2020. 

Geben Sie hier Ihren ECMAScript 2020-Quellcode für number_file_gen.js ein:

```js
var lines = process.argv[2];

//https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
const fs = require('fs');  //Filesystem einbinden
var stream = fs.createWriteStream("number.txt");

//https://stackoverflow.com/questions/2496710/writing-files-in-node-js
// FileAppend und WriteFile haben nicht das erwünschte Ergebnis gebracht

stream.once('open', function(fd) {
    for(let i = 0; i< lines;i++){
        stream.write((i+1)+".\n");
    }
    stream.end();
});

console.log('Geschrieben');
```

 Geben Sie hier Ihren ECMAScript 2020-Quellcode für alpha_file_gen.js ein:

```js
var lines = process.argv[2];

//https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
const fs = require('fs');  //Filesystem einbinden
var stream = fs.createWriteStream("alpha.txt");

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getLetter(n) {  
    var string = "";
    while(n >= 0) {
        string = alphabet[n % alphabet.length] + string; //String hinten anhängen da sonst falschrum
        n = Math.floor(n / alphabet.length) - 1;
    }
    return string;
}

stream.once('open', function(fd) {
    for(let i = 0; i< lines;i++){
        stream.write(getLetter(i)+"\n");
    }
    stream.end();
});

console.log('Geschrieben');
```

## 7.2. Performance Merge (4 Punkte)
Schreiben Sie in Node.js zwei Programme merge_files.js und merge_streams.js, um große Dateien zu zeilenweise zusammenzuführen, merge_files.js mit fs.readFile und merge_streams.js mit Streams, also createReadFileStream und pipeline. 1. node merge_files.js big_file1.txt big_file2.txt 2. node merge_streams.js big_file1.txt big_file2.txt Implementieren Sie Ihre beiden Programme merge_files.js und merge_streams.js in modernem ECMAScript 2020. Messen Sie anschließend die Performanz beider Programme. 

Geben Sie hier Ihren ECMAScript 2020-Quellcode für merge_files.js ein: 

```js
console.time("file");
const fs = require('fs');

var file1 = fs.readFileSync(process.argv[2],'utf-8').split('\n').filter(Boolean);
var file2 = fs.readFileSync(process.argv[3],'utf-8').split('\n').filter(Boolean);

var text = "";

console.log(file2);
for(var i = 0; i<file1.length;i++){
    text+=file1[i]+file2[i]+"\n"; 
}

fs.writeFile("merge.txt", text, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('Geschrieben');
    console.log(console.timeEnd("file")+" ms hat das Programm benötigt")
});
```

Geben Sie hier Ihren ECMAScript 2020-Quellcode für merge_streams.js ein: 

```js
console.time("stream");
const fs = require('fs');

var streamr1 = fs.createReadStream(process.argv[2]);
var streamr2 = fs.createReadStream(process.argv[3]);

var streamw = fs.createWriteStream("merge.txt");

var text1 = "";
var text2 = "";

var text = [];

streamr1.on('data', function (chunk) {
    text1 += chunk;
});

streamr2.on('data', function (chunk) {
    text2 += chunk;
});

streamr1.on("end", () => {
    var tmp = text1.toString().split("\n");
    for(let i=0; i < tmp.length;i++){
        text[i] = tmp[i];
    }
    var tmp = text2.toString().split("\n");
    for(let i=0; i < tmp.length;i++){
        text[i] += tmp[i];
    }
    for(let i=0; i < text.length;i++){
        streamw.write(text[i]+"\n");
    }
    streamw.end();
    console.log('Geschrieben');
    console.timeEnd("stream");
});
```

Geben Sie hier die Ergebnisse Ihrer Performanz-Messungen ein:

```js
file: 23.599ms
stream: 46.484ms
```

## 7.3. Express
Schreiben Sie einen lokalen Express.js-HTTP-Server für den Merge-Dienst, d.h. auf der lokal angezeigten Webseite kann man zwei Dateien auswählen, um diese zeilenweise zu mergen. Das Ergebnis soll dann in der Webseite erscheinen und zum Download angeboten werden. Arbeiten Sie lokal auf Ihrem Notebook mit localhost. Der Web-Server des Fachbereichs www2.inf.h-brs.de bietet keinen Node.js-Dienst an (nur Apache mit PHP).

```js
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { exec } = require('child_process');

var app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.writeHead(200, {"Content-Type":"text/html"});
  res.end(`
    <h1>Webserver mit Express.js</h1>
    <p>Upload zweier Dateien und download der Merge Datei</p>
    
    <div>
      <!-- https://github.com/richardgirges/express-fileupload/tree/master/example -->
        <form action='/post/' method='post' enctype="multipart/form-data">
          <input name="datei1" type="file"/>
          <input name="datei2" type="file"/>
          <input type="submit" value="senden"/>
        </form>
    </div>
  `)
});

app.post ('/post', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  var file1 = req.files.datei1.data.toString().split('\n').filter(Boolean);
  var file2 = req.files.datei2.data.toString().split('\n').filter(Boolean);

  var text="";
  for(var i = 0; i<file1.length;i++){
    text+=file1[i]+file2[i]+"\n"; 
  }

  fs.writeFile("merge.txt", text, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('Geschrieben');
      res.download(`${__dirname}/merge.txt`);
  });
});

var server = app.listen(3000,function() {});
```