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
  console.log(`DB result: ${result}`); 
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