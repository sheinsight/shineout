import { isObject } from './is'
import { exposeClass } from '../styles'

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

export function getClassname(data) {
  if (!validateFormat(data)) return ''
  return Object.keys(data)
    .map(attr => exposeClass(`${data[attr]}-${attr}`))
    .join(' ')
}

export function getColor(type) {
  if (types.indexOf(type) === -1) {
    console.error(new Error(`The type your entered does not exist need[${types.join('/')}]`))
    return ''
  }
  // insert to body make render
  const className = exposeClass(`location-${type}`)
  const div = document.createElement('div')
  div.className = className
  document.body.appendChild(div)
  // get color
  const color = window.getComputedStyle(document.querySelector(`.${className}`)).borderColor
  div.parentElement.removeChild(div)
  return color
}
