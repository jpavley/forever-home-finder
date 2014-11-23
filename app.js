var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.all('*', function(req,res) {
	res.render('index', {msg: 'Welcome to the Forever Home Search Engine'});
});

http
	.createServer(app)
	.listen(
		app.get('port'),
		function() {
			console.log(
				'Node/Express server listening on port: ' + app.get('port')
			);
		}
	);