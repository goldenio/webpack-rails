const path = require('path');
var config = require('./common');
<%- if options.reactjs? -%>
var react_config = require('./react');
<%- end -%>

config.output = {
  path: path.join(__dirname, '../../../app/assets/javascripts/generated'),
  // filename: '[name]-bundle.js',
  filename: '<%= name %>-bundle.js',
  publicPath: '/assets/'
}

// load jQuery from cdn or rails asset pipeline
config.externals = { jquery: 'var jQuery' };
config.module.loaders.push(
  // expose jQuery and $ to any JavaScript files loaded after <%= name %>-bundle.js in the Rails Asset Pipeline.
  { test: require.resolve('jquery'), loader: 'expose?jQuery' },
  { test: require.resolve('jquery'), loader: 'expose?$' }
);

<%- if options.reactjs? -%>
// Handle common react files in hot-reload
config.resolve.root.push(react_config.resolve.root);
config.resolve.extensions.push(react_config.resolve.extensions);
config.module.loaders.push(react_config.module.loaders);
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
);
<%- end -%>

// Add more entry points specific to rails
// config.entry.rails_only = path.join(__dirname, '../rails_only.js');
<%- if options.reactjs? -%>
// config.entry.app2 = path.join(__dirname, '../../assets/javascripts/app2.jsx');
<%- end -%>

module.exports = config;
