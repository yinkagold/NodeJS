
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url ==='/') {
        res.write('Hello world');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});


// // Register a listener 
// server.on('connection', (Socket) => {
//     console.log('New connection...');
// });
//Raising a listening 
server.listen(2000);

console.log('Listening on port 2000...');