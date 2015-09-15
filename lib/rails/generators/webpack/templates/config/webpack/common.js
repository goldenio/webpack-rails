const path = require('path');
var webpack = require('webpack');

var devFlag = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsChunk = new webpack.optimize.CommonsChunkPlugin('common.js')

module.exports = {
  context: path.join(__dirname, '../..'),
  entry: {
    app: './assets/javascripts/app.js'
  },
  output: {
    path: path.join(__dirname, '../../public/assets/'),
    filename: '[name]-bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    root: [
      path.join(__dirname, '../../assets/javascripts'),
    ],
    extensions: [
      '', '.js', '.json', '.coffee'
    ]
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
    ]
  },
  plugins: [
    devFlag, commonsChunk
  ]
};
