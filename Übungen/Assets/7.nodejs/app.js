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

  fs.writeFile('merge.txt', text, function(err) {
      if(err) {
          return console.log(err);
      }
      res.download('merge.txt');
  });
});

app.listen(3000,function() {});