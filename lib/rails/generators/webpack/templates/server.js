var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./config/webpack/hot');

// var bodyParser = require('body-parser');
// var sleep = require('sleep');

var server = new WebpackDevServer(webpack(config), {
  contentBase: './public',
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

server.listen(4000, 'localhost', function(error) {
  if (error) {
    console.log(error);
  }
  console.log('Listening at http://localhost:4000 ...');
});
