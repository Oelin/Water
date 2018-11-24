var io = require('socket.io')(80);
var net = require('net');



io.on('connection', function(socket) 
{
    var remote;
    
    
    
    socket.on('create', function(address) 
    {
        remote = net.createConnection(address);
    
        remote.on('data', function(buffer) 
        {
            var text = buffer.toString('utf-8');
            
            socket.emit('reply', text);
        });
    });
    
    
    
    socket.on('send', function(text) 
    {
        remote.write(text);
    });
    
    
    
    socket.on('end', function()
    {
        remote.end();
    });
});
