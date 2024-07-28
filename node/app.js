var url = require('url'); 
var fs = require('fs'); 
var path = require('path'); 
const dirname = 'C:\\Users\\Ryan\\documents\\online-chess'; 

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
        var pathname = req.url
        var folder = pathname.split('/')[1];
        var file = pathname.split('/')[3]; 
        console.log(folder); 

        switch (folder) {
            case '':
                renderHTML(path.join(dirname, 'pages\\login.html'), res);
                break; 
            case 'pages':
                renderHTML(path.join(dirname, pathname + ".html"), res);
                break; 
            case 'styles': 
                serveCSS(path.join(dirname, pathname), res);
                break; 
            case 'scripts':
                serveJS(path.join(dirname, pathname), res);
                break; 
        }
    }
}