const path = require('path')

module.exports = {
  appName: 'Shineout',
  dev: {
    publishPort: 3000,
    webpackPort: 3001,
    scriptPath: '/*.*',
    scripts: [
      '/react/16.2.0/umd/react.production.min.js',
      '/react-dom/16.2.0/umd/react-dom.production.min.js',
      '/prop-types/15.6.0/prop-types.min.js',
      '/highlight.js/9.12.0/highlight.min.js',
    ],
    styles: [
      '/highlight.js/9.12.0/styles/github.min.css',
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
