const path = require('path');
var config = require('./common');
var font_config = require('./font');
var image_config = require('./image');
var sass_config = require('./sass');
<%- if options.reactjs? -%>
var react_config = require('./react');
<%- end -%>

config.output = {
  path: path.join(__dirname, '../../public/assets/'),
  filename: '[name]-bundle.js',
  publicPath: '/assets/'
}

// the CLI have access to your webpack configuration
// the API doesn't have access to your webpack configuration
config.devServer = {
  contentBase: './public',
  host: '127.0.0.1',
  port: '4000',
  hot: true, // it doesnot work, use --hot in CLI
  inline: true,
  colors: true,
  info: true,
  quiet: false
}

config.devtool = 'eval-source-map';

// Handle common web font files in hot-reload
config.resolve.root.push(font_config.resolve.root);
config.resolve.extensions.push(font_config.resolve.extensions);
config.module.loaders.push(font_config.module.loaders);

// Handle common image files in hot-reload
config.resolve.root.push(image_config.resolve.root);
config.resolve.extensions.push(image_config.resolve.extensions);
config.module.loaders.push(image_config.module.loaders);

// All the styling loaders only apply to hot-reload, not rails
// Handle common css/sass files in hot-reload
config.resolve.root.push(sass_config.resolve.root);
config.resolve.extensions.push(sass_config.resolve.extensions);
config.module.loaders.push(sass_config.module.loaders);

<%- if options.reactjs? -%>
// Handle common react files in hot-reload
config.resolve.root.push(react_config.resolve.root);
config.resolve.extensions.push(react_config.resolve.extensions);
config.module.loaders.push(react_config.module.loaders);
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] }
);
<%- end -%>

// Add more entry points specific to webpack hot server
config.entry.webpack_only = path.join(__dirname, '../webpack_only.js');
<%- if options.reactjs? -%>
// config.entry.app2 = path.join(__dirname, '../../assets/javascripts/app2.jsx');
<%- end -%>

module.exports = config;
