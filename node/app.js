var url = require('url'); 
var fs = require('fs'); 
var path = require('path'); 

renderHTML = (path, res) => {
    fs.readFile(path, null, (err, data) => {
        if(err){
            console.log(`Error from HTML render: ${err.message}`);
            res.writeHead(404, {'Content-Type': 'text/plain'}); 
            res.write('File Not Found'); 
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data); 
        }
        res.end(); 
    })
}

serveCSS = (path, res) => {
    fs.readFile(path, null, (err, data) => {
        if(err){
            console.log(`Error: ${err.message}`);
            res.writeHead(404, {'Content-Type': 'text/plain'}); 
            res.write('File Not Found'); 
        }else {
            res.write(data); 
        }
        res.end();
    })
}

serveJS = (path, res) => {
    fs.readFile(path, null, (err, data) => {
        if(err){
            console.log(`Error: ${err.message}`);
            res.writeHead(404, {'Content-Type': 'text/plain'}); 
            res.write('File Not Found'); 
        }else {
            res.write(data); 
        }
        res.end();
    })
}

module.exports = {
    handleRequest: (req, res) => {
        const parsedUrl = url.parse(req.url);
        const pathname = parsedUrl.pathname;
        console.log(`pathname: ${pathname}`); 

        switch (pathname) {
            case '/':
                renderHTML(path.join(__dirname, '../login.html'), res);
                break; 
            case '/lobby':
                renderHTML(path.join(__dirname, '../lobby.html'), res); 
                break; 
            case '/game':
                renderHTML(path.join(__dirname, '../game.html'), res);
                break; 
            default:
                if (pathname.endsWith('.css')) {
                    serveCSS(path.join(__dirname, '..', pathname), res);
                } else if (pathname.endsWith('.js')){
                    serveJS(path.join(__dirname, '..', pathname), res)
                    console.log(path.join(__dirname, pathname));
                } else {
                    res.writeHead(404); 
                    res.end('Route not defined'); 
                }
        }
    }
}