const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const rootPath = path.resolve(__dirname, '../src/styles')
const indexFiles = ([
  'alert',
  'button',
  'dropdown',
  'hidable',
  'list',
  'message',
  'table',
  'scroll',
  'pagination',
  'breadcrumb',
  'icon',
  'menu',
  'checkinput',
  'form',
  ['input', 'form'],
  'select',
  'modal',
  'card',
  'datepicker',
  'rate',
  'image',
  'tooltip',
  'popover',
  'tree',
  'slider',
  'tabs',
  'progress',
  'upload',
  'carousel',
  'cascader',
]).map((item) => {
  const name = Array.isArray(item) ? item[0] : item
  const file = Array.isArray(item) ? item[1] : item
  return { name, file }
})

const indexTemp = `// Created by scripts/create-style.js.
import genaration from '../utils/classname'

<% files.forEach(function (item) { -%>
import <%= item.name %>Less from './<%= item.file %>.less'
<% }) -%>

<% files.forEach(function (item) { -%>
export const <%= item.name %>Class = genaration(<%= item.name %>Less, '<%= item.name %>')
<% }) -%>
`

const text = ejs.render(indexTemp, { files: indexFiles })
fs.writeFileSync(`${rootPath}/index.js`, text)

const spinFiles = ([
  ['default', 'spin-default'],
  ['ring', 'spin-ring'],
  ['plane', 'spin-plane'],
  ['pulse', 'spin-pulse'],
  ['wave', 'spin-wave'],

  ['chasing-dots', 'chasing-dots'],
  ['double-bounce', 'double-bounce'],
  ['cube-grid', 'cube-grid'],
  ['chasing-ring', 'chasing-ring'],
  ['scale-circle', 'scale-circle'],
  ['three-bounce', 'three-bounce'],
  ['four-dots', 'four-dots'],
]).map(([file, module]) => {
  const name = file.replace(/-([a-z])/g, g => g[1].toUpperCase())
  return {
    name,
    file,
    module,
  }
})

const spinTemp = `// Created by scripts/create-style.js.
import genaration from '../utils/classname'

<% files.forEach(function (item) { -%>
import <%= item.name %>Less from './spin/<%= item.file %>.less'
<% }) -%>

<% files.forEach(function (item) { -%>
export const <%= item.name %>Class = genaration(<%= item.name %>Less, '<%= item.module %>')
<% }) -%>
`

fs.writeFileSync(`${rootPath}/spin.js`, ejs.render(spinTemp, { files: spinFiles }))
