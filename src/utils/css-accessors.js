import cssInject from './vars-inject'
import { capitalize } from './strings'
import { entries } from './objects'

function setOptions(options, setter) {
  if (!options) return
  for (const [key, value] of entries(options)) {
    if (key === setter) continue
    this[key] = value
  }
}

function getDOMStyle(dom) {
  document.body.appendChild(dom)
  const style = window.getComputedStyle(dom)
  Promise.resolve().then(() => {
    dom.parentElement.removeChild(dom)
  })
  return style
}

function getStyleAttr(className, key = 'color') {
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div)[key]
}

let cache = {}
function genAccessors(obj, data) {
  data.conf.forEach(item => {
    const { name, className, attr, parser = v => v } = item
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

const accessors = {
  table: {},
  tag: {},
  pagination: {},
  button: {},
  color: {},
  tooltip: {},
  input: {},
  select: {},
  datepicker: {},
  slider: {},
  menu: {},
  form: {},
  checkbox: {},
  radio: {},
  alert: {},
  message: {},
  card: {},
  modal: {},
  popover: {},
  tree: {},
  dropdown: {},
  common: {},
  switch: {},
  tabs: {},
  cascader: {},
  list: {},
  progress: {},
}

for (const [key, value] of entries(accessors)) {
  const setterName = `set${capitalize(key)}`
  value[setterName] = options => setOptions.call(value, options, setterName)
  genAccessors(value, cssInject[key])
}

export function cleanCache() {
  cache = {}
}

export default accessors
