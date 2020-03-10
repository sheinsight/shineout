import cssInject from './vars-inject'
import { capitalize } from './strings'
import { getDOMStyle } from './expose'

function setOptions(options, setter) {
  if (!options) return
  for (const [key, value] of Object.entries(options)) {
    if (key === setter) continue
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
        if (item.value) return item.value
        const res = getStyleAttr(className, attr)
        return parser(res)
      },
      // eslint-disable-next-line no-return-assign
      set: v => {
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
}

for (const [key, value] of Object.entries(accessors)) {
  const setterName = `set${capitalize(key)}`
  value[setterName] = options => setOptions.call(value, options, setterName)
  genAccessors(value, cssInject[key])
}

export default accessors
