const express = require('express');
const db = require('./connection');
const App = express();
const Path = require('path'); 
const port = 3000;
App.use(express.json());

App.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/pages/login.html')); 
  res.redirect('/pages/login.html');
})

App.post('/pages/login.html', async (req, res) => {
  const { email, password } = req.body; 
  const result = await db.getUsers(email, password); 
  if(!result){
    return res.json({ success: false, message: 'Username is incorrect' });
  }
  return res.json({ success: true, message: 'Login successful' });
})

App.post('/pages/signup.html', async (req, res) => {
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

App.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
})

App.use(express.static(__dirname + '/public')); 


module.exports = App; 