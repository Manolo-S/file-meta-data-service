var express = require('express');
var port = process.env.PORT || 3000;
var multer = require('multer');
var app = express();

app.set('views', (__dirname + '/views'));
app.set('view engine', 'jade');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


function index(req, res) {
	res.setHeader('Content-type', 'text/html');
	res.render('index');
}

function analyseFile(req, res) {
	var fileSize = JSON.stringify({"file size": req.file.size})
	res.setHeader('Content-type', 'text/plain');
	res.send(fileSize);
	
}


app.get('/', index);

// app.post('/api/fileanalyse', multer({dest: './uploads/'}).single('upload'), analyseFile);
app.post('/api/fileanalyse', upload.single('upload'), analyseFile);

app.listen(port, function(){console.log('listening on localhost port: ' + port)});