var net = require('net');

var io = require('socket.io')(80);



io.on('connection', (socket) => {
    var remote;

    socket.on('create', (address) => {
        remote = net.createConnection(address);
    
        remote.on('data', (buffer) => {
            let text = buffer.toString('utf-8');
            
            socket.emit('reply', text);
        });
    });
    
    socket.on('send', (text) => {
        remote.write(text);
    });
    
    socket.on('end', () => {
        remote.end();
    });
});