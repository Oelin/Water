var io = require('socket.io')(80)
var net = require('net')



io.on('connection', function(socket) 
{
    let remote
    
    socket.on('create', function(address) 
    {
        remote = net.createConnection(address)
    
        remote.on('data', function(buffer) 
        {
            let data = buffer.toString()
            socket.emit('reply', data)
        })
    })
    
    socket.on('send', function(data) 
    {
        remote.write(data)
    });   
   
    socket.on('end', function()
    {
        remote.end()
    })
})
