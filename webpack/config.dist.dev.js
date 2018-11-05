const path = require('path')
const merge = require('webpack-merge')
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
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, '../publish/dist'),
      libraryTarget: 'umd',
      library: 'Shineout',
      filename: 'shineout.js',
    },
  })
}

module.exports = config.themes.map(name => getCompiler(name, config.webpack))
