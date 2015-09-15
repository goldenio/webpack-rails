const path = require('path');

module.exports = {
  resolve: {
    root: [
      path.join(__dirname, '../assets/images'),
    ],
    extensions: [
      '.png', '.jpg'
    ]
  },
  module: {
    loaders: [
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ]
  },
};
