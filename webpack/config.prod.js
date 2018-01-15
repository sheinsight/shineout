const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const common = require('./config.common')

module.exports = merge(common, {
  entry: config.webpack.entry,

  output: config.webpack.output,

  plugins: [
    new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
})
