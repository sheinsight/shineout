const path = require('path')
const merge = require('webpack-merge')
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
      libraryTarget: 'umd',
      library: 'ShineoutDoc',
    }),
  })
  return merge(common(wf), {
    name,
    stats: { children: false },
    entry: wf.entry,
    output: wf.output,
    mode: 'production',
  })
}

module.exports = config.themes.map(name => getCompiler(name, config.webpack))
