const path = require('path');

module.exports = {
  resolve: {
    root: [
      path.join(__dirname, '../../assets/stylesheets')
    ],
    extensions: [
      '.css', '.sass', '.scss'
    ]
  },
  module: {
    loaders: [
      // sass-loader
      { test: /\.css$/, loader: 'style!css' }, // use ! to chain loaders
      {
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax&outputStyle=expanded&imagePath=/assets/images&' +
          'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../assets/stylesheets')),
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&imagePath=/assets/images&' +
          'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../assets/stylesheets')),
      }
    ]
  },
};
