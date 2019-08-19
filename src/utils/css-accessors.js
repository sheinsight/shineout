import cssInject from './vars-inject'
import { capitalize } from './strings'
import { getDOMStyle } from './expose'

const cssVarSupported = window.CSS && window.CSS.supports && window.CSS.supports('--css-var-support', 0)

function setOptions(options) {
  if (!options || !cssVarSupported) return
  for (const [key, value] of Object.entries(options)) {
    this[key] = value
  }
}

function getStyleAttr(className, key = 'color') {
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div)[key]
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
}

for (const [key, value] of Object.entries(accessors)) {
  const setterName = `set${capitalize(key)}`
  value[setterName] = options => setOptions.call(value, options)
  genAccessors(value, cssInject[key])
}

export default accessors
