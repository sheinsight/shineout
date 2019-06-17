import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import cssInject from './vars-inject'

const types = ['primary', 'warning', 'danger', 'success', 'secondary']
const attrs = ['background', 'color', 'border']

const cssVarSupported = window.CSS && window.CSS.supports && window.CSS.supports('--css-var-support', 0)

function validateFormat(data) {
  if (!isObject(data)) {
    console.error(new Error('Should enter a json data with attrs(key) and types(types)'))
    return false
  }
  // attributes
  if (Object.keys(data).filter(v => attrs.indexOf(v) === -1).length > 0) {
    console.error(new Error(`The attribute your entered does not exist need[${attrs.join('/')}]`))
    return false
  }
  // types
  if (Object.values(data).filter(v => types.indexOf(v) === -1).length > 0) {
    console.error(new Error(`The type your entered does not exist need[${types.join('/')}]`))
    return false
  }
  return true
}

function getClassname(data) {
  if (!validateFormat(data)) return ''
  return Object.keys(data)
    .map(attr => exposeClass(`${data[attr]}-${attr}`))
    .join(' ')
}

function getDOMStyle(dom) {
  document.body.appendChild(dom)
  const style = window.getComputedStyle(dom)
  setTimeout(() => {
    dom.parentElement.removeChild(dom)
  })
  return style
}

function getStyleAttr(className, key = 'color') {
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div)[key]
}

function toRGB(c) {
  const el = document.createElement('div')
  el.style.color = c
  return getDOMStyle(el).color
}

function setOptions(options) {
  if (!options || !cssVarSupported) return
  for (const [key, value] of Object.entries(options)) {
    this[key] = value
  }
}

function genAccessors(obj, data) {
  data.conf.forEach(item => {
    const { name, className, attr, parser = v => v } = item
    Object.defineProperty(obj, name, {
      enumerable: true,
      get: () => {
        const res = getStyleAttr(className, attr)
        return parser(res)
      },
      // eslint-disable-next-line no-return-assign
      set: v => (data[name] = v),
    })
  })
}

const style = {
  getClassname,
}

const color = {}
const button = {}
const pagination = {}
const table = {}
const tag = {}

const cssVarAccessors = {
  table,
  tag,
  pagination,
  button,
  color,
}
for (const [key, value] of Object.entries(cssVarAccessors)) {
  const setterName = `set${key.replace(/^\S/, s => s.toUpperCase())}`
  value[setterName] = options => setOptions.call(value, options)
  genAccessors(value, cssInject[key])
}

export { table, tag, pagination, button, color, style, getDOMStyle, toRGB, types }
