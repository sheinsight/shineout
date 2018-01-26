const fs = require('fs')
const swig = require('swig')
const rimraf = require('rimraf')
const pkg = require('../package.json')
const config = require('../config')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`
const cdn = '//cdnjs.cloudflare.com/ajax/libs'

function buildHtml() {
  const template = swig.compileFile('./site/index.html')
  const scripts = config.dev.scripts.map(p => cdn + p)
  const styles = config.dev.styles.map(p => cdn + p)
  const dir = `gh-pages/${version}`

  Object.keys(config.webpack.entry).forEach((s) => {
    scripts.push(`./${s}.js`)
  })

  const html = template({ scripts, styles, appName: `Shineout api document ${version}` })

  if (fs.existsSync(dir)) {
    rimraf.sync(dir)
  }

  fs.mkdirSync(dir)
  fs.writeFileSync(`${dir}/index.html`, html)
}

buildHtml()
