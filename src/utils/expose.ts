import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import cssAccessors, { cleanCache } from './css-accessors'
import { capitalize } from './strings'
import { entries } from './objects'
import { setInjectType, injectTag, getInjectType, cleanStyleObj } from './vars-inject'

const types = ['primary', 'warning', 'danger', 'success', 'secondary']
const attrs = ['background', 'color', 'border']

type ObjectProps = { [x: string]: any }

function validateFormat(data: object) {
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

function getClassname(data: ObjectProps) {
  if (!validateFormat(data)) return ''
  return Object.keys(data)
    .map((attr: keyof ObjectProps) => {
      exposeClass(`${data[attr]}-${attr}`)
    })
    .join(' ')
}

function resetTheme() {
  Object.keys(cssAccessors).forEach((module: keyof typeof cssAccessors) => {
    const setter = `set${capitalize(module as string)}`
    if (typeof cssAccessors[module][setter] === 'function') {
      cssAccessors[module][setter](
        Object.keys(cssAccessors[module]).reduce((obj, key: keyof typeof obj) => {
          obj[key] = undefined
          return obj
        }, {})
      )
    }
  })
}

function setStyleWithTag(options: ObjectProps, custom?: ObjectProps) {
  cleanStyleObj()
  if (!options) {
    resetTheme()
  } else {
    for (const [key, values] of entries(options)) {
      const setterName = `set${capitalize(key)}`
      if (cssAccessors[key] && cssAccessors[key][setterName]) cssAccessors[key][setterName](values)
    }
  }
  injectTag(custom)
}

const style = {
  getClassname,
  setStyle(options: ObjectProps, custom: ObjectProps = {}) {
    if (getInjectType() === 'tag') {
      setStyleWithTag(options, custom)
      return
    }
    if (!options) {
      resetTheme()
      return
    }
    for (const [key, values] of entries(options)) {
      const setterName = `set${capitalize(key)}`
      if (cssAccessors[key] && cssAccessors[key][setterName]) (cssAccessors[key][setterName] as Function)(values)
    }
  },
  cleanCache,
  setInjectType,
  getInjectType,
}

const { color } = cssAccessors
export { color, style, types }
