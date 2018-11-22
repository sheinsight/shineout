const path = require('path')

module.exports = {
  appName: 'Shineout',
  dev: {
    publishPort: 3000,
    webpackPort: 3001,
    scriptPath: '/*.*',
    scripts: [
      '/react/16.6.3/umd/react.production.min.js',
      '/react-dom/16.6.3/umd/react-dom.production.min.js',
      '/prop-types/15.6.0/prop-types.min.js',
      '/highlight.js/9.12.0/highlight.min.js',
      '/jszip/3.1.5/jszip.min.js',
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
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].js',
    },
    // for site/
    alias: {
      shineout: path.resolve(__dirname, 'src'),
      docs: path.resolve(__dirname, 'site/Components'),
      doc: path.resolve(__dirname, 'site'),
    },
    devtool: 'cheap-module-source-map',
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      },
    },
  },
}
