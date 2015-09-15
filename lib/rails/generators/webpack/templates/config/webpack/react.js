const path = require('path');

module.exports = {
  resolve: {
    root: [
      path.join(__dirname, '../../assets/javascripts')
    ],
    extensions: [
      '.js', '.jsx'
    ]
  },
  module: {
    loaders: [
      { test: require.resolve('react'), loader: 'expose?React' },
      // { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      // { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
    ]
  },
};
