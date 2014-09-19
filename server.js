var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.sendfile('./app/views/index.html');
});

app.listen(8080);
console.log('Listening on port 8080');