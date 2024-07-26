var url = require('url'); 
var fs = require('fs'); 

renderHTML = (path, res) => {
    fs.readFile(path, null, (err, data) => {
        if(err){
            console.log(`Error: ${err.message}`);
            res.writeHead(404, {'Content-Type': 'text/plain'}); 
            res.write('File Not Found'); 
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data); 
        }
        res.end(); 
    })
}


module.exports = {
    handleRequest: (req, res) => {
        var path = req.url; 
        switch(path){
            case '/':
                renderHTML('../login.html', res);
                break; 
            case '/lobby':
                renderHTML('../lobby.html', res); 
                break; 
            case '/game':
                renderHTML('../game.html', res);
                break; 
            default: 
                res.writeHead(404); 
                res.end('Route not defined'); 
        }
    }
}