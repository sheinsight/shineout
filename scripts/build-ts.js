const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const glob = require('glob').sync
const ts = require('typescript')

const srcPath = path.resolve(__dirname, '../src')
const libPath = path.resolve(__dirname, '../publish/lib')
const sitePath = path.resolve(__dirname, '../site/pages/components')
const temp = fs.readFileSync(path.resolve(__dirname, './component-declare.ejs'), 'utf-8')
const sep = '-- |'
const ignoreModule = [
  'Datum',
  'hoc',
  'Icons',
  'List',
  'locale',
  'styles',
  'utils',
  'Datum.List',
  'Datum.Form',
  'GetStart',
]
if (!fs.existsSync(libPath)) fs.mkdirSync(libPath, { recursive: true })

function parseTable(c) {
  const header = c.lastIndexOf(sep)
  const content = header === -1 ? c : c.substring(header + sep.length)
  const lines = content.split('\n')
  const list = []
  if (c.indexOf('| ') === -1) return []
  lines.forEach(line => {
    if (!line.trim()) return
    const replaced = String.raw`${line}`.replace(/\\\|/g, '#REP#')
    const [attribute, type, def, desc] = replaced
      .split('|')
      .filter(v => !!v)
      .map(v => v.trim())
      .map(d => d.replace(/#REP#/g, '|'))
      .map(d => d.replace('\\[', '['))
    list.push({
      attribute,
      type,
      def,
      desc,
    })
  })
  return list
}

function readMarkdown(c, name) {
  const data = []
  let content = c
  const dataDclare = content.search(new RegExp(`### ${name}[a-zA-Z].`))
  if (dataDclare >= 0) content = content.substring(0, dataDclare)
  const index = content.search(new RegExp(`### ${name}[. \n]`))
  if (index === -1) {
    // only one component
    const table = content.substring(content.lastIndexOf(sep) + sep.length)
    data.push({
      name,
      props: parseTable(table),
    })
  } else {
    const apis = content
      .substring(index)
      .split('###')
      .filter(v => !!v)
    apis.forEach(api => {
      let componentName = api.substring(0, api.indexOf('\n')).trim()
      if (componentName.indexOf('*') !== -1) {
        componentName = componentName.substring(0, componentName.indexOf('*')).trim()
      }
      // multiple components inline
      if (componentName.indexOf(',') !== -1) {
        const names = componentName.split(',').map(v => v.trim())
        names.forEach(item => {
          data.push({
            name: item.replace('.', ''),
            props: parseTable(api.substring(api.indexOf('\n'))),
          })
        })
        return
      }
      data.push({
        name: componentName.replace('.', ''),
        props: parseTable(api.substring(api.indexOf('\n'))),
      })
    })
  }
  return data
}

const markdown = glob('**/en.md', {
  cwd: sitePath,
})

markdown.forEach(p => {
  const componentName = path.dirname(p)
  if (ignoreModule.includes(componentName)) return
  const componentDir = path.resolve(libPath, componentName)
  if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir)
  // Determine whether src exists index.d.ts
  const srcIndexDTs = path.resolve(srcPath, componentName, 'index.d.ts')
  const fullPath = path.resolve(componentDir, 'index.d.ts')
  if (fs.existsSync(srcIndexDTs)) {
    fs.copyFileSync(srcIndexDTs, fullPath, fs.constants.COPYFILE_FICLONE)
  } else {
    const content = fs.readFileSync(path.resolve(sitePath, p), 'utf-8')
    const data = readMarkdown(content, componentName)
    const declare = ejs.render(temp, { data })
    fs.writeFileSync(fullPath, declare)
    // validator
    const dangerous = ts.createProgram([fullPath], { allowJs: true }).getSyntacticDiagnostics()
    if (dangerous.length)
      throw new Error(
        `The generated declaration file: <${fullPath}> does not meet the standards, please check your api documentation: <${p}>`
      )
  }
})

// copy index
fs.copyFileSync(path.resolve(srcPath, 'index.js'), path.resolve(libPath, 'index.d.ts'))
