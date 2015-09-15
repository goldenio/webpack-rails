const path = require('path');

module.exports = {
  resolve: {
    root: [
      path.join(__dirname, '../assets/fonts'),
    ],
    extensions: [
      '.woff', '.woff2', '.ttf', '.eot', '.svg'
    ]
  },
  module: {
    loaders: [
      // The url-loader uses DataUrls.
      { test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      // The file-loader emits files.
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' }
    ]
  },
};
