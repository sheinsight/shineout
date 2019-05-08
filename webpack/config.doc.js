const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const pkg = require('../package.json')
const cssConf = require('./utils/theme.css')

const dir = pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)

const cssConfig = config.themes.map(name =>
  cssConf({
    name,
    entry: [
      './src/styles/normalize.less',
      './src/styles/expose.js',
      './src/styles/index.js',
      './src/styles/spin.js',
      // site style
      './site/styles/index.js',
      './site/less-entry.js',
    ],
    output: { path: path.join(__dirname, `../gh-pages/${dir}x`) },
    clean: true,
    prefix: '',
  })
)

const jsConfig = merge(common({ ...config.webpack, DEV: true }), {
  stats: { children: false },
  devtool: config.webpack.devtool,
  entry: config.webpack.entry,
  output: {
    path: path.join(__dirname, `../gh-pages/${dir}x`),
    publicPath: '../../',
    libraryTarget: 'umd',
    library: 'ShineoutDoc',
  },
  mode: 'production',
})

module.exports = [jsConfig, ...cssConfig]
