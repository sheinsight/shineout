const path = require('path')

module.exports = {
  appName: 'Shineout',
  dev: {
    publishPort: 3000,
    webpackPort: 3001,
    scriptPath: '/*.*',
    scripts: [
      '/react.min.js',
      '/react-dom.min.js',
      '/prop-types.min.js',
    ],
  },
  webpack: {
    entry: {
      app: './site/index.js',
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
    },
    // for site/
    alias: { shineout: path.resolve(__dirname, 'src') },
    devtool: 'cheap-module-source-map',
    externals: { react: 'React', 'react-dom': 'ReactDOM', 'prop-types': 'PropTypes' },
    // less modifyVars
    modifyVars: {
      'doc-prefix': 'doc',
      'so-prefix': 'shineout',
      'so-theme': 'default',
    },
    cssModule: {
      // less: '[local]--[hash:base64:5]',
    },
    extractTextPluginPath: '',
    imagePath: './images/[name].[ext]',
  },
}
