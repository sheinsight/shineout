import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import cssAccessors from './css-accessors'
import { capitalize } from './strings'

const types = ['primary', 'warning', 'danger', 'success', 'secondary']
const attrs = ['background', 'color', 'border']

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

function toRGB(c) {
  const el = document.createElement('div')
  el.style.color = c
  return getDOMStyle(el).color
}

const style = {
  getClassname,
  setStyle(options) {
    for (const [key, values] of Object.entries(options)) {
      const setterName = `set${capitalize(key)}`
      if (cssAccessors[key] && cssAccessors[key][setterName]) cssAccessors[key][setterName](values)
    }
  },
}

const { color } = cssAccessors

export { color, style, getDOMStyle, toRGB, types }
