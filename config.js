const path = require('path')

module.exports = {
  appName: 'Shineout',
  dev: {
    publishPort: 3000,
    webpackPort: 3001,
    scriptPath: '/*.*',
    scripts: [
      '/babel-polyfill/7.0.0-beta.49/polyfill.min.js',
      '/fetch/2.0.4/fetch.min.js',
      '/react/16.4.1/umd/react.production.min.js',
      '/react-dom/16.4.1/umd/react-dom.production.min.js',
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
      chunkFilename: '[name].chunk.js',
      filename: '[name].js',
    },
    // for site/
    alias: {
      shineout: path.resolve(__dirname, 'src'),
      docs: path.resolve(__dirname, 'site/Components'),
      doc: path.resolve(__dirname, 'site'),
    },
    devtool: 'cheap-module-source-map',
    externals: { react: 'React', 'react-dom': 'ReactDOM', 'prop-types': 'PropTypes' },
  },
}
