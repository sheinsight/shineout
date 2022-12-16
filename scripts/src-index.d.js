const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pack = require('../package')

const NAMESPACE = 'TYPE'
const prefix = '__'
const rootPath = path.resolve(__dirname, '../src')

const components = {}

const sortProps = props => {
  props.sort((a, b) => a.length - b.length)
  return props
}

const getProps = (file, name, mainProps = true) => {
  const expDefault = /(?<=export[ ]+?(declare[ ]+?)?interface[ ]+?).*?(?=[ ]+?(extends)|{)/g
  const exportProps = file.match(expDefault)
  const props = (exportProps || []).map(i => i.trim())
  if (mainProps) {
    return [...new Set(props)].filter(p => p.indexOf(`${name}Props`) > -1)
  }
  return [...new Set(props)].filter(p => p.indexOf(`${name}Props`) === -1)
}

const getTypes = file => {
  const exp = /(?<=export[ ]+?type[ ]+?)[a-zA-Z]+?(<.*?>)?(?=[ ]+?=)/g
  return file.match(exp) || []
}

const getArgs = (types, withDefault) => {
  const exp = /(?<=<).*(?=>)/
  const matches = types.toString().match(exp)
  if (!matches) return ''
  if (withDefault) {
    const result = matches[0]
      .split(',')
      .map(item => {
        const r = item.split('=')
        if (r[1] && r[1].indexOf(withDefault) !== -1) {
          r[1] = ` ${prefix}${r[1].trim()}`
        }
        return r.join('=')
      })
      .join(',')
    return `<${result}>`
  }
  const result = matches[0]
    .split(',')
    .map(item => item.split(/(=)|(extends)/)[0].trim())
    .join(', ')
  return `<${result}>`
}

const getTypeName = types => types.toString().split('<')[0]

const getOtherTypeName = (types, name) => types.split(name)[1] || types

const getAsName = types => {
  if (Array.isArray(types) && types.length > 0) {
    return types.map(i => `${getTypeName(i)} as ${prefix}${getTypeName(i)}`).join(', ')
  }
  if (typeof types === 'string' && types) {
    return `${types} as ${prefix}${types}`
  }
  return ''
}

// 组件白名单
// 白名单内组件不会被解析
const whiteList = ['List', 'DataList', 'InputTitle']

const files = fs
  .readdirSync(rootPath)
  .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))
  .filter(v => !whiteList.includes(v))
files.forEach(f => {
  const dirFiles = fs.readdirSync(path.resolve(rootPath, f))
  const formInterface = dirFiles.includes('interface.ts')
  if (dirFiles.includes('index.d.ts') || formInterface) {
    const tsPath = formInterface
      ? path.resolve(rootPath, `${f}/interface.ts`)
      : path.resolve(rootPath, `${f}/index.d.ts`)
    const tsFile = fs.readFileSync(tsPath).toString()
    const props = getProps(tsFile, f, true)
    const other = getProps(tsFile, f, false)
    const types = getTypes(tsFile, f)
    components[f] = {
      props: sortProps(props),
      other: sortProps(other),
      types: sortProps(types),
      formInterface,
    }
  } else {
    components[f] = {
      hideProps: true,
      props: [],
      other: [],
      types: [],
    }
  }
})

const line = `// Created by scripts/src-index.d.js.
import * as utils from './utils'

declare const ${prefix}default: {
  utils: typeof utils,
  version: '<%= version %>'
}

export default ${prefix}default
export { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig, isRTL } from './config'

export { default as LazyList } from './AnimationList/LazyList'

export { default as List } from './DataList'
import { ListProps as ${prefix}ListProps , ListBaseItemProps as ${prefix}ListBaseItemProps } from './DataList/interface'

<% for(let key in components){ -%>
export { default as <%= key %> } from './<%= key %>'
<% if(!components[key].hideProps){ -%>
import { <%- getAsName(getTypeName(components[key].props)) -%><%- components[key].props.length>0 ? ', ' :'' -%><%- getAsName(components[key].other) -%><%- components[key].other.length>0 ? ', ' :'' -%><%- getAsName(components[key].types) -%> } from './<%=  components[key].formInterface ? key+'/interface': key %>'
<% } -%>

<% } -%>

export namespace <%= NAMESPACE -%> {

  export namespace List {
    export type Props<Item,Value> = ${prefix}ListProps<Item , Value>
    export type BaseItemProps = ${prefix}ListBaseItemProps
  }

<% for(let key in components){ -%>
<% if(!components[key].hideProps) { -%>
  export namespace <%= key -%> {
<% if(components[key].props.length>0){ -%>
    export type Props<%- getArgs(components[key].props, key) -%> = ${prefix}<%= key -%>Props<%- getArgs(components[key].props) -%>
<% } -%>
<% if(components[key].other.length>0){ -%>
<% components[key].other.forEach( name =>{ -%>

    export type <%- getOtherTypeName(getTypeName(name),key) -%><%- getArgs(name, key) -%> = ${prefix}<%- getTypeName(name)+getArgs(name) -%>
<% }) -%>
<% } -%>
<% if(components[key].types.length>0){ -%>
  <% components[key].types.forEach( name =>{ -%>

    export type <%- getOtherTypeName(getTypeName(name),key) -%><%- getArgs(name, key) -%> = ${prefix}<%- getTypeName(name)+getArgs(name) -%>
<% }) -%>
<% } -%>

  }
<% } -%>
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
fs.writeFileSync(`${rootPath}/index.d.ts`, text)
