//Create the server, and manage the socket


var express = require('express');
var app = express();
var http = require( "http" ).createServer( app );

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var phantom = require('./getPhantom.js');


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


//Create the socket and wait for clients
var io = require('socket.io').listen(http);

io.sockets.on('connection', function (socket) {
    
    console.log('Client connected');
    
    socket.on('getCookies', function (message) { //when a client ask for cookies
        
        console.log('Client ask for cookies for facebook');
        
        //The following function calls getPhantom to get cookies and then emit them to client
        phantom.getCookies(function(cookies){
            socket.emit('setCookies', cookies);
        });
    
    });
    
});






