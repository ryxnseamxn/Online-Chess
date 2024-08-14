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
//Serve static files `
app.use(express.static(__dirname + '/public')); 

//GET requests

app.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/pages/login.html')); 
  res.redirect('/pages/login.html');
})

app.get('/pages/test.html', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/pages/test.html')); 
})

//POST requests 

app.post('/pages/login.html', async (req, res) => {
  const { email, password } = req.body; 
  const result = await db.getUsers(email, password); 
  if(!result){
    return res.json({ success: false, message: 'Username is incorrect' });
  }
  return res.json({ success: true, message: 'Login successful' });
})

app.post('/pages/signup.html', async (req, res) => {
  const { email, password } = req.body; 
  const exists = await db.getUsers(email, password); 
  if(exists){
    return res.json({ success: false, message: 'Email already exists' });
  }
  const result = await db.newUser(email, password); 
  if(!result){
    return res.json({ success: false, message: 'Sign up failed' });
  }
  return res.json({ success: true, message: 'Sign up successful' });
})


//socket handling 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected'); 
  });
});

//start server 
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


module.exports = app; 