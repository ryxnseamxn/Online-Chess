//express declarations 
const express = require('express');
const app = express();
const Path = require('path'); 
//http declarations 
const http = require('http'); 
const server = http.createServer(app); 
const port = 3000;
//socket.io declarations
const { Server } = require('socket.io'); 
const io = new Server(server); 
const db = require('./connection');
//Parse files with json payloads 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Serve static files `
app.use(express.static(__dirname + '/public')); 
//cookies 
const cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 
//routing 
const authRouter = require('./routes/auth');
app.use(authRouter); 
//GET requests

app.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/pages/login.html')); 
  res.redirect('/pages/login.html');
})


//socket handling 
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected'); 
  });
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('chess move', (move) => {
    io.emit('chess move', move)
  });
});

//start server 
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


module.exports = app; 