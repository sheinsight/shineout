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
      prefix: 'shineout',
      theme: 'default',
    },
    extractTextPluginPath: '',
    imagePath: './images/[name].[ext]',
  },
}
