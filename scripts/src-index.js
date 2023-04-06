const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pack = require('../package')

const IgnoreList = ['DataList', 'InputTitle']

const rootPath = path.resolve(__dirname, '../src')
const files = fs
  .readdirSync(rootPath)
  .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))
  .filter(v => !IgnoreList.includes(v))

const typeFiles = files.filter(n => fs.existsSync(path.resolve(rootPath, `${n}/interface.ts`)))

const line = isTs => {
  const nameSpaceAdd = isTs
    ? `<% typeFiles.forEach(function (name) { -%>
import * as <%= name %>Type from './<%= name %>/interface'
<% }) -%>
export declare namespace TYPE {
<% typeFiles.forEach(function (name) { -%>
  export import <%= name %> = <%= name %>Type
<% }) -%>
}`
    : ''
  const defaultExport = isTs
    ? `declare const __default: {
  utils: typeof utils,
  version: number
}
export default __default
  `
    : "export default { utils, version: '<%= version %>' }"

  return `// Created by scripts/src-index.js.
${nameSpaceAdd}
import * as utils from './utils'

${defaultExport}
export { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig, isRTL } from './config'

export { default as LazyList } from './AnimationList/LazyList'
<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './<%= name %>'
<% }) -%>
`
}

const text = ejs.render(line(), { files, typeFiles, version: pack.version })
const definedText = ejs.render(line(true), { files, typeFiles, version: pack.version })
fs.writeFileSync(`${rootPath}/index.js`, text)
fs.writeFileSync(`${rootPath}/index.d.ts`, definedText)
