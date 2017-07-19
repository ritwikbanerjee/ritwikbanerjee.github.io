module.exports = function(app, socket) {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('Socket.JS required');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  require('./socket/initialTry.js')(app, socket);

  io.on('connection', (connection) => {
    connection.on('disconnect', function() {
    });
  });
};
