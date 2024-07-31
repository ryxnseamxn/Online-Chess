const express = require('express')
const app = express()
const port = 3000
const path = require('path'); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/login.html')); 
})

app.listen(port, () => {
  console.log(path.join(__dirname, 'public/pages/login.html'));
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static(__dirname + '/public')); 

module.exports = app; 