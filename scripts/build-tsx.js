const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pack = require('../package')

const NAMESPACE = 'TYPE'

const rootPath = path.resolve(__dirname, '../src')

const components = {}

const sortProps = props => {
  props.sort((a, b) => a.length - b.length)
  return props
}

const getProps = (file, name, mainProps = true) => {
  const expExtends = /(?<=export( declare)? interface ).*(?= extends)/g
  const expDefault = /(?<=export interface ).*(?= {)/g
  const extendProps = file.match(expExtends)
  const defaultProps = file.match(expDefault)?.filter(f => f.indexOf('extends') == -1)
  const props = []
  if (extendProps) props.push(...extendProps)
  if (defaultProps) props.push(...defaultProps)
  if (mainProps) {
    return [...new Set(props)]?.filter(p => p.indexOf(`${name}Props`) > -1)
  } else {
    return [...new Set(props)]?.filter(p => p.indexOf(`${name}Props`) === -1)
  }
}

const getTypes = (file, name) => {
  const exp = /(?<=export type ).*(?= =)/g
  return file.match(exp) || []
}

const getArgs = types => {
  const exp = /(?<=<).*(?=>)/
  const result = types.toString().match(exp)
  return result ? `<${result[0].split('=')[0].trim()}>` : ''
}

const getTypeName = types => {
  return types.toString().split('<')[0]
}

const getOtherTypeName = (types, name) => {
  return types.split(name)[1] || types
}

const getAsName = types => {
  if (Array.isArray(types) && types.length > 0) {
    return types.map(i => `${getTypeName(i)} as __${getTypeName(i)}`)
  }
  if (typeof types === 'string' && types) {
    return `${types} as __${types}`
  }
  return ''
}

const files = fs
  .readdirSync(rootPath)
  .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))
  .filter(v => v !== 'List' && v !== 'DataList')
  .filter(f => fs.readdirSync(path.resolve(rootPath, f)).includes('index.d.ts'))
files.forEach(f => {
  if (fs.readdirSync(path.resolve(rootPath, f)).includes('index.d.ts')) {
    const tsPath = path.resolve(rootPath, `${f}/index.d.ts`)
    const tsFile = fs.readFileSync(tsPath).toString()
    const props = getProps(tsFile, f, true)
    const other = getProps(tsFile, f, false)
    const types = getTypes(tsFile, f)
    components[f] = {
      props: sortProps(props),
      other: sortProps(other),
      types: sortProps(types),
    }
  }
})
const line = `// Created by scripts/src-index.js.
import * as utils from './utils'

export default { utils, version: '<%= version %>' }
export { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig, isRTL } from './config'

export { default as LazyList } from './AnimationList/LazyList'
export { default as List } from './DataList'

<% for(let key in components){ -%>
export { default as <%= key %> } from './<%= key %>'
import { <%- getAsName(getTypeName(components[key].props)) -%><%- components[key].props.length>0 ? ' , ' :'' -%><%- getAsName(components[key].other) -%><%- components[key].other.length>0 ? ' , ' :'' -%><%- getAsName(components[key].types) -%> } from './<%= key %>'

<% } -%>
    
export namespace <%= NAMESPACE -%> {
<% for(let key in components){ -%>
    export namespace <%= key -%> {
    <% if(components[key].props.length>0){ -%>
    export type Props<%- getArgs(components[key].props) -%> = __<%= key -%>Props<%- getArgs(components[key].props) -%>
    <% } -%>
    <% if(components[key].other.length>0){ -%>
    <% components[key].other.forEach( name =>{ -%>

        export type <%- getOtherTypeName(getTypeName(name),key) -%><%- getArgs(name) -%> = __<%- getTypeName(name)+getArgs(name) -%>
    <% }) -%>
    <% } -%>
    <% if(components[key].types.length>0){ -%>
    <% components[key].types.forEach( name =>{ -%>

        export type <%- getOtherTypeName(getTypeName(name),key) -%><%- getArgs(name) -%> = __<%- getTypeName(name)+getArgs(name) -%>
    <% }) -%>
    <% } -%>

    }
<% } -%>
}
`

const text = ejs.render(line, {
  files,
  getArgs,
  getAsName,
  NAMESPACE,
  components,
  getTypeName,
  getOtherTypeName,
  version: pack.version,
})
fs.writeFileSync(`${rootPath}/index.ts`, text)
