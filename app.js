// const path = require('path')

// var pathObj = path.parse(__filename)

// console.log(pathObj)

// fs.appendFile('greetings.txt', 'Hellow World!', function (err) {
//     if(err){
//         console.log('Unable to write to file');
//     }
// });

// fs.appendFileSync('greetings.txt', `Hello ${user.username}!`);

const os = require('os');
var totalMem = os.totalmem();
var freeMem = os.freemem();

console.log('Total Memory: ' + totalMem);

console.log(`Total Memory: ${totalMem}`);
// console.log(`Free Memory: ${freeMem}`);