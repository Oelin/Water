let server = require('socket.io')
let net = require('net')


server.on('connection', socket => {
  let remote
    
  socket.on('create', address => {
    remote = net.createConnection(address)
    remote.on('data', data => socket.emit('data', data.toString()))
  })
    
  socket.on('send', remote.write)
  socket.on('end', remote.end)
})


module.exports = server

