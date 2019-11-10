"use strict";

var Echo = Echo || {};

Echo.sendMessage = function(){
    var message =  $('#message');
    var message = message.val();
    if (message != '') {
        Echo.socket.send(message);
        message.val('');
    }
};

Echo.connect = function(host){
    if ('WebSocket' in window) {
        Echo.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        Echo.socket = new MozWebSocket(host);
    } else {
        console.log('Error: WebSocket is not supported by this browser.');
        return;
    }

    Echo.socket.onopen = function(){
        console.log("Info: connection opened");
        $('#message').keydown(function (evt) {
            if (evt.keyCode == 13) {
                Echo.sendMessage();
            }
        });
    };

    Echo.socket.onclose = function(){
        console.log("Info: connection closed");
    };

    Echo.socket.onmessage = function(message){
        console.log("message: " + message.data);
        $('#echoBack').text(message.data);
    };
};

Echo.initialize = function(){
    var ep = '/websocket/echoa';

    if(window.location.protocol == 'http:'){
        Echo.connect('ws://' + window.location.host + ep);
    } else{
        Echo.connect('wss://' + window.location.host + ep);
    }
};

Echo.initialize();
