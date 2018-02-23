const net = require('net');
const fs = require('fs');

var client;

function connectToServer() {

    client = new net.Socket();
    client.connect(1337, '127.0.0.1', function() {
        console.log('Connected');
        client.write('Hello, server! Love, Client.');
    });
    
    client.on('data', function(data) {
        console.log('Received: ' + data);
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
}

// This is the function that generates an appender function
function socketAppender(config, layout) {
    return function (loggingEvent) {
      //logEventBuffer.push(loggingEvent);
        client.write('Logging event: ' + loggingEvent);
        client.setEncoding('utf8');
        client.pipe(client);
    };
    //return appender;

    function shutdown(cb){
        client.destroy();
    }
}

// stdout configure doesn't need to use findAppender, or levels
function configure(config, layouts) {
    connectToServer();

    // the default layout for the appender
    let layout = layouts.basic;

    //create a new appender instance
    return socketAppender(config, layout);
}

//export the only function needed
module.exports.configure = configure;