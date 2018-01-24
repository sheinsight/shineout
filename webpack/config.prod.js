const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const common = require('./config.common')

function getCompiler(name, conf) {
  const wf = Object.assign({}, conf, {
    extractTextPluginPath: `${name}.css`,
    modifyVars: Object.assign({}, conf.modifyVars, {
      'so-theme': name,
    }),
  })
  return merge(common(wf), {
    name,
    entry: wf.entry,
    output: wf.output,
    plugins: [
      new UglifyJSPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  })
}

module.exports = config.themes.map(name => getCompiler(name, config.webpack))
