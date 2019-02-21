import config from '../config'
import { isObject } from './is'

const types = ['primary', 'warning', 'danger', 'success', 'secondary']
const attrs = ['background', 'color', 'border']

function validateClassname(data) {
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
  if (!validateClassname(data)) return ''
  return Object.keys(data)
    .map(attr => `${config.prefix}-${data[attr]}-${attr}`)
    .join(' ')
}
