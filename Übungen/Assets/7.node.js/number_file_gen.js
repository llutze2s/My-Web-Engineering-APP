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