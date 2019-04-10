const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const cssConf = require('./utils/theme.css')

const cssConfig = config.themes.map(name =>
  cssConf({
    name,
    entry: ['./src/styles/normalize.less', './src/styles/expose.js', './src/styles/index.js', './src/styles/spin.js'],
    output: { path: path.join(__dirname, '../publish/dist') },
    clean: true,
  })
)

const jsConfig = merge(common({ ...config.webpack, IGNORE_LESS: true }), {
  stats: { children: false },
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../publish/dist'),
    libraryTarget: 'umd',
    library: 'Shineout',
    filename: 'shineout.js',
  },
  mode: 'development',
})
module.exports = [jsConfig, ...cssConfig]
