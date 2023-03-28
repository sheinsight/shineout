import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import cssAccessors, { cleanCache } from './css-accessors'
import { capitalize } from './strings'
import { entries } from './objects'
import { setInjectType, injectTag, getInjectType, cleanStyleObj, setThemeConfig, ThemeConfig } from './vars-inject'

const types = ['primary', 'warning', 'danger', 'success', 'secondary']
const attrs = ['background', 'color', 'border']

type ObjectProps = { [x: string]: any }

type Module = {
  [x: string]: any
}

type CssAccessorsKey = keyof typeof cssAccessors

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
    .map((attr: keyof ObjectProps) => exposeClass(`${data[attr]}-${attr}`))
    .join(' ')
}

function resetTheme() {
  Object.keys(cssAccessors).forEach((module: CssAccessorsKey) => {
    const setterName = `set${capitalize(module)}`
    const setter = (cssAccessors[module] as Module)[setterName] as Function
    setter(
      Object.keys(cssAccessors[module]).reduce((obj: Module, key: CssAccessorsKey) => {
        obj[key] = undefined
        return obj
      }, {})
    )
  })
}

function setStyle(options: ObjectProps, custom?: ObjectProps, config: Partial<ThemeConfig> = {}) {
  setThemeConfig(config)
  cleanStyleObj()
  if (!options) {
    resetTheme()
  } else {
    for (const [key, values] of entries(options)) {
      const setterName = `set${capitalize(key)}`
      const module: Module = cssAccessors[key as CssAccessorsKey]
      if (module && module[setterName]) module[setterName](values)
    }
  }
  if (config.injectType === 'tag') {
    const id = injectTag(custom)
    return () => {
      const target = document.getElementById(id)
      if (target) target.remove()
    }
  }
  return () => {}
}

const style = {
  getClassname,
  setStyle,
  cleanCache,
  setInjectType,
  getInjectType,
}

const { color } = cssAccessors
export { color, style, types }
