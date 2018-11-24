var io = require('socket.io')(80);
var net = require('net');



io.on('connection', function(socket)
{
    socket.on('create', function(address)
    {
        var remote = net.createConnection(address);
    
        remote.on('data', function(buffer)
        {
            let text = buffer.toString('utf-8');
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
