import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import cssAccessors, { cleanCache } from './css-accessors'
import { capitalize } from './strings'
import { entries } from './objects'

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

function resetTheme() {
  Object.keys(cssAccessors).forEach(module => {
    const setter = `set${capitalize(module)}`
    cssAccessors[module][setter](
      Object.keys(cssAccessors[module]).reduce((obj, key) => {
        obj[key] = undefined
        return obj
      }, {})
    )
  })
}

const style = {
  getClassname,
  setStyle(options) {
    if (!options) {
      resetTheme()
      return
    }
    for (const [key, values] of entries(options)) {
      const setterName = `set${capitalize(key)}`
      if (cssAccessors[key] && cssAccessors[key][setterName]) cssAccessors[key][setterName](values)
    }
  },
  cleanCache,
}

const { color } = cssAccessors
export { color, style, types }
