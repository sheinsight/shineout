const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')

function getEntry(entry) {
  const newEntry = {}
  Object.keys(entry).forEach((key) => {
    newEntry[key] = [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${config.dev.webpackPort}`,
      'webpack/hot/only-dev-server',
      entry[key],
    ]
  })
  return newEntry
}

function getPublishPath() {
  if (config.dev.publishPort === 80) return 'http://localhost/'
  return `http://localhost:${config.dev.publishPort}/`
}

module.exports = merge(common, {
  devtool: config.webpack.devtool,
  entry: getEntry(config.webpack.entry),
  output: {
    filename: '[name].js',
    publicPath: getPublishPath(),
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
