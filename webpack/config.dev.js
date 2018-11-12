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

function getCompiler(name, conf) {
  const wf = Object.assign({}, conf, {
    extractTextPluginPath: `${name}.css`,
    modifyVars: {
      'so-theme': name,
    },
  })
  return merge(common(wf), {
    name,
    devtool: wf.devtool,
    entry: getEntry(wf.entry),
    output: {
      filename: '[name].js',
      publicPath: getPublishPath(),
      libraryTarget: 'umd',
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  })
}

module.exports = config.themes.map(name => getCompiler(name, config.webpack))
