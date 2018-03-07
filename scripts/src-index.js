const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const rootPath = path.resolve(__dirname, '../src')
const files = fs.readdirSync(rootPath).filter(n => /^[A-Z]/.test(n))

const line = `<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './<%= name %>'
<% }) -%>`

const text = ejs.render(line, { files })
fs.writeFileSync(`${rootPath}/index.js`, text)
