const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const common = require('./config.common')

function getCompiler(name, conf) {
  const wf = Object.assign({}, conf, {
    extractTextPluginPath: `theme.${name}.css`,
    modifyVars: {
      'so-theme': name,
    },
  })
  return merge(common(wf), {
    name,
    stats: { children: false },
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '../publish/dist'),
      libraryTarget: 'umd',
      library: 'Shineout',
      filename: 'shineout.min.js',
    },
    plugins: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  })
}

module.exports = config.themes.map(name => getCompiler(name, config.webpack))
