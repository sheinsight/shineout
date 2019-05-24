import { isObject } from './is'
import { exposeClass } from '../styles/expose'

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

export function getDOMStyle(dom) {
  document.body.appendChild(dom)
  const style = window.getComputedStyle(dom)
  setTimeout(() => {
    dom.parentElement.removeChild(dom)
  })
  return style
}

function getColor(type) {
  // insert to body make render
  const className = exposeClass(`location-${type}`)
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div).color
}

function toRGB(c) {
  const el = document.createElement('div')
  el.style.color = c
  return getDOMStyle(el).color
}

export const color = {
  get primary() {
    return getColor('primary')
  },
  get warning() {
    return getColor('warning')
  },
  get danger() {
    return getColor('danger')
  },
  get success() {
    return getColor('success')
  },
  get secondary() {
    return getColor('secondary')
  },
  // {primary: 'red'}
  setColor(options) {
    if (!options) return
    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case 'primary':
      }
    }
  },
}

export const style = {
  getClassname,
}
