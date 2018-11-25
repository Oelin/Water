/* relay.js, mediates a virtual link between a clients (browsers) and remote Internet hosts. 
This is achived by mapping data sent via web sockets to TCP stream sockets and visa-versa. As 
the Internet's principle technology is TCP/IP, such a mapping provides a channel by which 
communication with any accessable Internet device, service or application is possible. */

var io = require('socket.io')(2020);

var net = require('net');



io.on('connection', function(socket) 
{
    var remote;
    
    socket.on('create', function(address) 
    {
        remote = net.createConnection(address);
    
        remote.on('data', function(buffer) 
        {
            var data = buffer.toString();
            
            socket.emit('reply', data);
        });
    });
    
    socket.on('send', function(data) 
    {
        remote.write(data);
    });    
   
    socket.on('end', function()
    {
        remote.end();
    });
});
