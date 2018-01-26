const fs = require('fs')
const path = require('path')
const swig = require('swig')
const chokidar = require('chokidar')

const pagesPath = path.resolve(__dirname, '../site/pages')
const componentPath = path.resolve(pagesPath, './Components')

const componentsCache = {}

function getComment(text, key) {
  const index = text.indexOf(key)
  if (index >= 0) {
    return text.substr(index + key.length).trim()
  }

  return null
}

function getPage(name, file) {
  const pagePath = path.resolve(componentPath, name)

  let page = componentsCache[name]
  if (page && file.indexOf(pagePath) < 0) {
    return page
  }

  try {
    page = JSON.parse(fs.readFileSync(path.resolve(pagePath, './info.json')))
  } catch (e) {
    page = {}
  }

  page.name = name
  page.examples = []
  page.group = page.group || ''

  fs.readdirSync(pagePath)
    .filter(n => n.indexOf('example-') === 0)
    .forEach((e) => {
      const text = fs.readFileSync(path.resolve(pagePath, e))
      const comment = /(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/.exec(text)
      const exam = { path: e }

      if (comment) {
        comment[0].split('\n').forEach((t) => {
          const cn = getComment(t, '* cn -')
          const en = getComment(t, '* en -')
          if (cn) exam.cn = cn
          if (en) exam.en = en
        })
      }

      page.examples.push(exam)
    })

  componentsCache[name] = page

  return page
}

function generateComponents(file = '') {
  const template = swig.compileFile(path.resolve(__dirname, './components.tpl'))

  const groups = {};
  (['', 'General', 'Form', 'Feedback', 'Layout']).forEach((key) => {
    groups[key] = []
  })

  fs.readdirSync(componentPath).forEach((dirName) => {
    const state = fs.lstatSync(`${componentPath}/${dirName}`)
    if (state.isDirectory()) {
      const page = getPage(dirName, file)
      if (page) {
        const group = groups[page.group] || groups['']
        group.push(page)
      }
    }
  })

  const text = template({ groups })

  fs.writeFile(path.resolve(componentPath, './index.js'), text, (err) => {
    if (err) console.log(err)
  })
}

function init() {
  generateComponents()

  console.log('watch site/pages')

  chokidar.watch(componentPath, { ignored: /index\.js$/, ignoreInitial: true })
    .on('all', (e, p) => {
      generateComponents(p)
    })
}

module.exports = {
  init,
}

init()
