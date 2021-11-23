console.time("file");
const fs = require('fs');

var file1 = fs.readFileSync(process.argv[2],'utf-8').split('\n').filter(Boolean);
var file2 = fs.readFileSync(process.argv[3],'utf-8').split('\n').filter(Boolean);

var text = "";

for(var i = 0; i<file1.length;i++){
    text+=file1[i]+file2[i]+"\n"; 
}

fs.writeFile("merge.txt", text, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('Geschrieben');
    console.timeEnd("file");
});