import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import { buttonClass, paginationClass, tagClass } from '../styles'
import cssInject from './vars-inject'

const types = ['primary', 'warning', 'danger', 'success', 'secondary']
const attrs = ['background', 'color', 'border']

const cssVarSupported = window.CSS && window.CSS.supports && window.CSS.supports('--css-var-support', 0)

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

function getDOMStyle(dom) {
  document.body.appendChild(dom)
  const style = window.getComputedStyle(dom)
  setTimeout(() => {
    dom.parentElement.removeChild(dom)
  })
  return style
}

function getStyleAttr(className, key = 'color') {
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div)[key]
}

function toRGB(c) {
  const el = document.createElement('div')
  el.style.color = c
  return getDOMStyle(el).color
}

function setOptions(options) {
  if (!options || !cssVarSupported) return
  for (const [key, value] of Object.entries(options)) {
    this[key] = value
  }
}

const color = {
  primary: null,
  warning: null,
  danger: null,
  secondary: null,
  success: null,
  setColor: options => setOptions.call(color, options),
}
types.forEach(type => {
  Object.defineProperty(color, type, {
    enumerable: true,
    get: () => getStyleAttr(buttonClass(type), 'backgroundColor'),
    set: v => {
      cssInject.color[type] = v
    },
  })
})

const button = {
  paddingBaseHorizontal: null,
  paddingLargeHorizontal: null,
  paddingSmallHorizontal: null,
  paddingBaseVertical: null,
  paddingLargeVertical: null,
  paddingSmallVertical: null,
  get borderRadius() {
    return parseInt(getStyleAttr(buttonClass('_'), 'borderRadius'), 10)
  },
  set borderRadius(v) {
    cssInject.button.borderRadius = v
  },
  setButton: options => setOptions.call(button, options),
}

;[
  'paddingBaseHorizontal._.1',
  'paddingLargeHorizontal.large.1',
  'paddingSmallHorizontal.small.1',
  'paddingBaseVertical._.0',
  'paddingLargeVertical.large.0',
  'paddingSmallVertical.small.0',
].forEach(item => {
  const [attr, className, index] = item.split('.')
  Object.defineProperty(button, attr, {
    enumerable: true,
    get: () => parseInt(getStyleAttr(buttonClass(className), 'padding').split(' ')[index], 10),
    // eslint-disable-next-line no-return-assign
    set: v => (cssInject.button[attr] = v),
  })
})

const pagination = {
  borderRadius: null,
  borderWidth: null,
  setPagination: options => setOptions.call(pagination, options),
}
;['borderRadius', 'borderWidth'].forEach(attr => {
  Object.defineProperty(pagination, attr, {
    enumerable: true,
    get: () => parseInt(getStyleAttr(paginationClass('item'), attr), 10),
    // eslint-disable-next-line no-return-assign
    set: v => (cssInject.pagination[attr] = v),
  })
})

const table = {
  headBg: null,
  headColor: null,
  borderColor: null,
  hoverBg: null,
  get borderRadiusTop() {
    return parseInt(getStyleAttr(exposeClass('table-head'), 'borderTopLeftRadius'), 10)
  },
  set borderRadiusTop(v) {
    cssInject.table.borderRadiusTop = v
  },
  setTable: options => setOptions.call(table, options),
}
;['headBg.backgroundColor', 'headColor.color', 'borderColor.borderColor', 'hoverBg.backgroundColor.hover'].forEach(
  item => {
    const [name, attr, c] = item.split('.')
    const className = `table-head${c ? `-${c}` : ''}`
    Object.defineProperty(table, name, {
      enumerable: true,
      get: () => getStyleAttr(exposeClass(className), attr),
      // eslint-disable-next-line no-return-assign
      set: v => (cssInject.table[name] = v),
    })
  }
)

const tag = {
  get bg() {
    return getStyleAttr(tagClass('_'), 'backgroundColor')
  },
  set bg(v) {
    cssInject.tag.bg = v
  },
  get borderColor() {
    return getStyleAttr(tagClass('default'), 'borderColor')
  },
  set borderColor(v) {
    cssInject.tag.borderColor = v
  },
  get borderRadius() {
    return parseInt(getStyleAttr(tagClass('_'), 'borderRadius'), 10)
  },
  set borderRadius(v) {
    cssInject.tag.borderRadius = v
  },
  get paddingHorizontal() {
    return parseInt(getStyleAttr(tagClass('_'), 'paddingLeft'), 10)
  },
  set paddingHorizontal(v) {
    cssInject.tag.paddingHorizontal = v
  },
  get paddingVertical() {
    return parseInt(getStyleAttr(tagClass('_'), 'paddingTop'), 10)
  },
  set paddingVertical(v) {
    cssInject.tag.paddingVertical = v
  },
  setTag: options => setOptions.call(tag, options),
}

const style = {
  getClassname,
}

export { color, button, pagination, table, tag, style, getDOMStyle, toRGB, types }
