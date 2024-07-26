const http = require('node:http'); 
const app = require('./app');

const hostname = '127.0.0.1'; 
const port = 3000; 

const server = http.createServer(app.handleRequest);


server.listen(port, hostname, () => {
    console.log(`Server running at http:${hostname}:${port}/`); 
});