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