const path = require('path')
const fs = require('fs')

const versions = {}
;['react', 'react-dom', 'jszip', 'docsearch.js'].forEach(lib => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'node_modules/', lib, 'package.json')))
  versions[lib] = pkg.version
})

module.exports = {
  appName: 'Shineout',
  dev: {
    publishPort: 4000,
    webpackPort: 4001,
    scriptPath: '/*.*',
    scripts: [
      `/react@${versions.react}/umd/react.production.min.js`,
      `/react-dom@${versions['react-dom']}/umd/react-dom.production.min.js`,
      `/jszip@${versions.jszip}/dist/jszip.min.js`,
    ],
    styles: [
      // '/prism/1.15.0/themes/prism.min.css',
      `/docsearch.js@${versions['docsearch.js']}/dist/cdn/docsearch.css`,
    ],
  },
  themes: ['default', 'antd', 'antd2', 'shineout'],
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
    },
  },
}
