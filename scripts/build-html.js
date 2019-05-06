const fs = require('fs')
const path = require('path')
const ejs = require('./ejs')
const pkg = require('../package.json')
const config = require('../config')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`
const cdn = 'https://unpkg.com'
const dir = `gh-pages/${version}`
const componentPaths = path.resolve(__dirname, '../site/pages/components')
const documentPaths = path.resolve(__dirname, '../site/pages/documentation')

function createDir(lang) {
  if (!lang) return
  fs.mkdirSync(`${dir}/${lang}`)
  fs.mkdirSync(`${dir}/${lang}/index`)
  fs.mkdirSync(`${dir}/${lang}/components`)
  fs.mkdirSync(`${dir}/${lang}/documentation`)
}

function getDocumentation() {
  const result = []
  const docus = fs.readdirSync(documentPaths)
  docus.forEach(d => {
    if (d === 'changelog') {
      fs.readdirSync(`${documentPaths}/changelog`).forEach(c => result.push(c.substring(0, c.length - 3)))
    } else {
      const sd = d.split('.')[0]
      if (sd.startsWith('api')) result.push(sd.split('-')[1].toLowerCase())
      else result.push(sd)
    }
  })
  return result
}

const renderEjs = (scripts, styles, description) =>
  ejs.renderFile(`./site/index.html`, {
    description,
    scripts,
    styles,
    appName: `Shineout api document ${version}`,
  })

async function buildRedirect(lang) {
  const inner = await ejs.renderFile(`./site/redirect.html`, {
    inner: true,
  })
  const outer = await ejs.renderFile(`./site/redirect.html`, {
    inner: false,
  })
  fs.writeFileSync(`${dir}/index.html`, outer)
  fs.writeFileSync(`${dir}/${lang}/index.html`, inner)
}

async function buildHtml(lang) {
  createDir(lang)

  const components = fs.readdirSync(componentPaths).map(c => c.split('.')[0])
  const documents = getDocumentation()
  const styles = config.dev.styles.map(p => cdn + p)
  const scripts = config.dev.scripts.map(p => cdn + p)

  Object.keys(config.webpack.entry).forEach(s => {
    scripts.push(`../../${s}.js`)
  })

  const html = await renderEjs(scripts, styles, '')

  fs.writeFileSync(`${dir}/${lang}/index/index.html`, html)

  components.forEach(async c => {
    if (c === 'group') return
    const comHtml = await renderEjs(scripts, styles, `react-${c}`)
    fs.writeFileSync(`${dir}/${lang}/components/${c}.html`, comHtml)
  })

  documents.forEach(async c => {
    if (c === 'index') return
    const dHtml = await renderEjs(scripts, styles, `shineout-${c}`)
    fs.writeFileSync(`${dir}/${lang}/documentation/${c}.html`, dHtml)
  })

  buildRedirect(lang)
}

buildHtml('en')
buildHtml('cn')
