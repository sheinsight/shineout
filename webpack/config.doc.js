const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const common = require('./config.common')
const pkg = require('../package.json')

const dir = pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)

function getCompiler(name, conf) {
  const wf = Object.assign({}, conf, {
    extractTextPluginPath: `${name}.css`,
    modifyVars: {
      'so-theme': name,
    },
    output: Object.assign({}, conf.output, {
      path: path.join(__dirname, `../gh-pages/${dir}x`),
    }),
  })
  return merge(common(wf), {
    name,
    stats: { children: false },
    entry: wf.entry,
    output: wf.output,
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
