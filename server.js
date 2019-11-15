const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const logger = require('morgan');
const net = require('net');

const hostname = '127.0.0.1';
const port = 3000;

//app.use(logger('dev'));

users= [];
connections= [];


server.listen(process.env.PORT || port);
app.get('/', function (req, res) {
    res.sendFile (__dirname + '/index.html')
});

app.use(bodyParser.json(), bodyParser.urlencoded({
    extended: true
}));



io.sockets.on('connection', function(socket) {
    connections.push(socket);//coloca as conexões no array
    console.log('Connected: %s sockets connected', connections.length);//imprime o número de conexões do array
   
         //disconnect
    socket.on('disconnect', function(data){
        users.splice(users.indexOf(socket.username),1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);//remove do array
        console.log('Disconnected: %s sockets connected', connections.length);//quando alguém disconeta imprime o nr de conexões
    });

    //send messages
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, user: socket.username});

    });
    //New user
    socket.on('new user', function(data, callback){
       callback(true);
       socket.username = data; //dados que foram recolhidos
       users.push(socket.username);
       updateUsernames();
});
    function updateUsernames(){
        io.sockets.emit('get users', users); 
    };
});
console.log(`Server running at  http://${hostname}:${port}/`);