import cssInject, { Injects } from './vars-inject'
import { capitalize } from './strings'
import { entries } from './objects'

type ObjectProps = { [x: string]: any }

type Accessors = { [U in keyof typeof cssInject]: {} }

function setOptions(options: any, setter: any) {
  if (!options) return
  for (const [key, value] of entries(options)) {
    if (key === setter) continue
    this[key] = value
  }
}

function getDOMStyle(dom: HTMLElement) {
  document.body.appendChild(dom)
  const style = window.getComputedStyle(dom)
  Promise.resolve().then(() => {
    if (dom.parentElement) dom.parentElement.removeChild(dom)
  })
  return style
}

function getStyleAttr(className: string, key = 'color') {
  const div = document.createElement('div')
  div.className = className
  return (getDOMStyle as any)(div)[key]
}

let cache: ObjectProps = {}

interface conf {
  name: string
  attr?: string
  value?: string
  parser?: Function
  className: string
}

function genAccessors(obj: object, data: Accessors) {
  data.conf.forEach((item: conf) => {
    const { name, className, attr, parser = (v: any) => v } = item
    const { info } = data
    const cacheKey = `${info.name}-${name}`
    Object.defineProperty(obj, name, {
      enumerable: true,
      get: () => {
        if (cache[cacheKey]) return cache[cacheKey]
        if (item.value) return item.value
        const res = getStyleAttr(className, attr)
        cache[cacheKey] = parser(res)
        return cache[cacheKey]
      },
      // eslint-disable-next-line no-return-assign
      set: v => {
        delete cache[cacheKey]
        if (item.value) item.value = v
        data[name] = v
      },
    })
  })
}

// const accessors = {
//   table: {},
//   tag: {},
//   pagination: {},
//   button: {},
//   color: {},
//   tooltip: {},
//   input: {},
//   select: {},
//   datepicker: {},
//   slider: {},
//   menu: {},
//   form: {},
//   checkbox: {},
//   radio: {},
//   alert: {},
//   message: {},
//   card: {},
//   modal: {},
//   popover: {},
//   tree: {},
//   dropdown: {},
//   common: {},
//   switch: {},
//   tabs: {},
//   cascader: {},
//   list: {},
//   progress: {},
// }

const accessors = Object.keys(cssInject).reduce((obj, key) => ({ ...obj, [key]: {} }), {})

for (const [key, value] of entries(accessors)) {
  const setterName = `set${capitalize(key)}`
  value[setterName] = (options: any) => setOptions.call(value, options, setterName)
  genAccessors(value, cssInject[key])
}

export function cleanCache() {
  cache = {}
}

export default accessors as Accessors
