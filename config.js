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
    styles: [
      '/app.css',
    ],
  },
  themes: ['default', 'antd'],
  webpack: {
    entry: {
      app: './site/index.js',
    },
    output: {
      path: path.join(__dirname, '/dist'),
      // chunkFilename: '[name].[chunkhash:5].chunk.js',
      chunkFilename: '[name].chunk.js',
      filename: '[name].js',
    },
    // for site/
    alias: {
      doc: path.resolve(__dirname, 'site'),
      docs: path.resolve(__dirname, 'site/components'),
      shineout: path.resolve(__dirname, 'src'),
    },
    devtool: 'cheap-module-source-map',
    externals: { react: 'React', 'react-dom': 'ReactDOM', 'prop-types': 'PropTypes' },
    // less modifyVars
    modifyVars: {
      'doc-prefix': 'doc',
      'so-prefix': 'shineout',
    },
    cssModule: {
      // less: '[local]--[hash:base64:5]',
    },
    extractTextPluginPath: '[name].css',
    imagePath: './images/[name].[ext]',
  },
}
