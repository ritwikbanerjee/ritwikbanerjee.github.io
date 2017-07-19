'use strict';
// modules =================================================
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config/webpack.dev.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// set our port
var port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  console.log('Production Mode');
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

// routes ==================================================
require('./server/routes/routes')(app); // configure our routes
require('./config/webpack.dev.js');

// Socket connection
io.on('connection', (socket)=> {
  require('./server/socket')(app, socket);
  socket.on('disconnect', function(){
    console.log('Socket Disconnected');
  });
});

// startup our app at http://localhost:3000
server.listen(port, ()=> {                 
  console.log('App running on Port:  ' + port);
});
exports = module.exports = app;