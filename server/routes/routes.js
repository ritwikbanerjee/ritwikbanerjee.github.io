// app/routes.js
'use strict';
const path = require('path');
module.exports = function(app) {
  app.get('*', function(req, res) {
    console.log('listen to stuff from server');
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html')); // load our public/index.html file
  });
};
