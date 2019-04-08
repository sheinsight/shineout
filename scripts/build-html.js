const fs = require('fs')
const ejs = require('./ejs')
const pkg = require('../package.json')
const config = require('../config')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`
const cdn = 'https://unpkg.com'
const dir = `gh-pages/${version}`

async function buildHtml(lang) {
  const scripts = config.dev.scripts.map(p => cdn + p)
  const styles = config.dev.styles.map(p => cdn + p)

  Object.keys(config.webpack.entry).forEach(s => {
    scripts.push(`./${s}.js`)
  })
  const html = await ejs.renderFile(`./site/index.html`, {
    scripts,
    styles,
    appName: `Shineout api document ${version}`,
  })

  fs.writeFileSync(`${dir}/${lang}.html`, html)
}

async function buildRedirect() {
  const html = await ejs.renderFile(`./site/redirect.html`, {
    version,
  })
  fs.writeFileSync(`${dir}/index.html`, html)
}

buildHtml('en')
buildHtml('cn')
buildRedirect()
