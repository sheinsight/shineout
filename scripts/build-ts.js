const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const glob = require('glob').sync

const libPath = path.resolve(__dirname, '../publish/lib')
const sitePath = path.resolve(__dirname, '../site/pages/components')
const temp = fs.readFileSync(path.resolve(__dirname, './component-declare.ejs'), 'utf-8')
const sep = '-- |'

function parseTable(c) {
  const header = c.lastIndexOf(sep)
  const content = header === -1 ? c : c.substring(header + sep.length)
  const lines = content.split('\n')
  const list = []
  if (c.indexOf('| ') === -1) return []
  lines.forEach(line => {
    if (!line) return
    const replaced = String.raw`${line}`.replace(/\\\|/g, '#REP#')
    const [attribute, type, def, desc] = replaced
      .split('|')
      .filter(v => !!v)
      .map(v => v.trim())
      .map(d => d.replace(/#REP#/g, '\|'))
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
      const componentName = api.substring(0, api.indexOf('\n')).trim()
      // multiple components inline
      if (componentName.indexOf(',')) {
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
  const componentDir = path.resolve(libPath, componentName)
  if (!fs.existsSync(componentDir)) return
  const content = fs.readFileSync(path.resolve(sitePath, p), 'utf-8')
  const data = readMarkdown(content, componentName)
  const declare = ejs.render(temp, { data })
  const fullPath = path.resolve(componentDir, 'index.d.ts')
  fs.writeFileSync(fullPath, declare)
})
