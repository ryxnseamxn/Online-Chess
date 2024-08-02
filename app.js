const express = require('express');
const db = require('./connection');
const App = express();
const Path = require('path'); 
const port = 3000;

App.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/pages/login.html')); 
  res.redirect('/pages/login.html');
})

App.post('/public/pages/login.html', async (req, res) => {
  const { username, password } = res.body; 
  const result = db.getUsers(username, password); 
  if(!result){
    return res.json({ success: false, message: 'Username is incorrect' });
  }
  return res.json({ success: true, message: 'Login successful' });
})

App.listen(port, () => {
  console.log(Path.join(__dirname, 'public/pages/login.html'));
  console.log(`Example App listening on port ${port}`);
})

App.use(express.static(__dirname + '/public')); 

module.exports = App; 