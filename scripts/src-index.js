const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const rootPath = path.resolve(__dirname, '../src')
const files = fs
  .readdirSync(rootPath)
  .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))

const line = `// Created by scripts/src-index.js.
import './styles/normalize.less'
import * as utils from './utils'

export default { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'

<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './<%= name %>'
<% }) -%>`

const text = ejs.render(line, { files })
fs.writeFileSync(`${rootPath}/index.js`, text)
