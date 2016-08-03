//Create the server, and manage the socket


var express = require('express');
var app = express();
var http = require( "http" ).createServer( app );

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Send index.html to localhost:8080/ease
app.get('/ease', function (req, res) {
    res.sendFile(__dirname+'/views/index.html');
});

app.get('/ease/connection/:website', function(req,res){
    var website = req.params.website;
    res.sendFile(__dirname+'/connectionJson/'+website+'.json');
});


app.get('/ease/connection.json', function (req, res) {
    res.sendFile(__dirname+'/views/connection.json');
});

http.listen(8080, "127.0.0.1");






