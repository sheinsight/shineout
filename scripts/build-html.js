const fs = require('fs')
const path = require('path')
const ejs = require('./ejs')
const pkg = require('../package.json')
const config = require('../config')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`
const cdn = 'https://unpkg.com'
const dir = `gh-pages/${version}`
const componentPaths = path.resolve(__dirname, '../site/pages/components')

function createDir(lang) {
  if (!lang) return
  fs.mkdirSync(`${dir}/${lang}`)
  fs.mkdirSync(`${dir}/${lang}/components`)
}

const renderEjs = (scripts, styles, description) =>
  ejs.renderFile(`./site/index.html`, {
    description,
    scripts,
    styles,
    appName: `Shineout api document ${version}`,
  })

async function buildHtml(lang) {
  createDir(lang)

  const components = await fs.readdirSync(componentPaths).map(c => c.split('.')[0])
  const styles = config.dev.styles.map(p => cdn + p)
  const scripts = config.dev.scripts.map(p => cdn + p)
  const comScripts = config.dev.scripts.map(p => cdn + p)

  Object.keys(config.webpack.entry).forEach(s => {
    scripts.push(`../${s}.js`)
    comScripts.push(`../../${s}.js`)
  })

  const html = await renderEjs(scripts, styles, '')

  fs.writeFileSync(`${dir}/${lang}/index.html`, html)

  components.forEach(async c => {
    if (c === 'group') return
    const comHtml = await renderEjs(comScripts, styles, `react-${c}`)
    fs.writeFileSync(`${dir}/${lang}/components/${c}.html`, comHtml)
  })
}

function buildRedirect() {
  const html = fs.readFileSync(`./site/redirect.html`)
  fs.writeFileSync(`${dir}/index.html`, html)
}

buildHtml('en')
buildHtml('cn')
buildRedirect()
