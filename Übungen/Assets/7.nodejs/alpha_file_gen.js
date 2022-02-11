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