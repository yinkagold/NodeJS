// const path = require('path'); 

// var objPath = path.parse(__filename);

// console.log(objPath);

// const os = require('os');

// var totalMem = os.totalmem();
// var freeMem = os.freemem();

// console.log(`Total Memory: ${totalMem}`);
// console.log(`Free Memory: ${freeMem}`);
// console.log('Total Memory : ' + totalMem);

const fs = require('fs');
// Asynchronous method 
// const files = fs.readdirSync('./'); // returns all the files and folders 

// console.log(files);
// synchronous method 
fs.readdir('./', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result', files)
})