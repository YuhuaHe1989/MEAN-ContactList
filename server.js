var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

app.use('/contactlist', require('./router/contactlist'));

app.listen(3000);
console.log("server running on PORT 3000");



