module.exports = function(app, socket) {
  const tryModel = require('../model/try')();

  socket.on('api:try', () => {
    tryModel.then((response) => {
      socket.emit('api:try', {
        data: response,
        status: 200
      });
    }).catch((err) => {
      socket.emit('api:try', {
        text: err,
        status: 500
      });
    });
  });
};
