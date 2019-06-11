import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import { darken, fade } from './color'
import { buttonClass } from '../styles'

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

function getBtnHoverDarken() {
  return (
    getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim() || '5%'
  )
}

function toRGB(c) {
  const el = document.createElement('div')
  el.style.color = c
  return getDOMStyle(el).color
}

function setBodyProperty(colors) {
  for (const [cssVar, cssValue] of Object.entries(colors)) {
    document.body.style.setProperty(cssVar, cssValue)
  }
}

const color = {
  get primary() {
    return getStyleAttr(exposeClass('location-primary'))
  },
  set primary(v) {
    const colors = {
      '--primary-color': v,
      '--primary-color-dark-5': darken(v, 5),
      '--primary-color-dark-15': darken(v, 15),
      '--primary-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
      '--primary-color-lighten-40': darken(v, -40),
      '--primary-color-fade-60': fade(v, 0.6),
      '--primary-color-fade-50': fade(v, 0.5),
      '--primary-color-fade-10': fade(v, 0.1),
      '--primary-color-fade-0': fade(v, 0),
      '--primary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
      '--primary-color-dark-5_fade-0': fade(darken(v, 5), 0),
    }
    setBodyProperty(colors)
  },
  get warning() {
    return getStyleAttr(exposeClass('location-warning'))
  },
  set warning(v) {
    const colors = {
      '--warning-color': v,
      '--warning-color-dark-5': darken(v, 5),
      '--warning-color-fade-60': fade(v, 0.6),
      '--warning-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
      '--warning-color-fade-0': fade(v, 0),
      '--warning-color-dark-5_fade-0': fade(darken(v, 5), 0),
      '--warning-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
    }
    setBodyProperty(colors)
  },
  get danger() {
    return getStyleAttr(exposeClass('location-danger'))
  },
  set danger(v) {
    const colors = {
      '--danger-color': v,
      '--danger-color-fade-25': fade(v, 0.25),
      '--danger-color-dark-5': darken(v, 5),
      '--danger-color-fade-60': fade(v, 0.6),
      '--danger-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
      '--danger-color-fade-0': fade(v, 0),
      '--danger-color-dark-5_fade-0': fade(darken(v, 5), 0),
      '--danger-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
    }
    setBodyProperty(colors)
  },
  get success() {
    return getStyleAttr(exposeClass('location-success'))
  },
  set success(v) {
    const colors = {
      '--success-color': v,
      '--success-color-dark-5': darken(v, 5),
      '--success-color-fade-60': fade(v, 0.6),
      '--success-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
      '--success-color-fade-0': fade(v, 0),
      '--success-color-dark-5_fade-0': fade(darken(v, 5), 0),
      '--success-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
    }
    setBodyProperty(colors)
  },
  get secondary() {
    return getStyleAttr(exposeClass('location-secondary'))
  },
  set secondary(v) {
    const colors = {
      '--secondary-color': v,
      '--secondary-color-dark-5': darken(v, 5),
      '--secondary-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
      '--secondary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
      '--secondary-color-dark-5_fade-0': fade(darken(v, 5), 0),
    }
    setBodyProperty(colors)
  },
  setColor(options) {
    if (!options || !cssVarSupported) return
    for (const [key, value] of Object.entries(options)) {
      if (types.includes(key)) {
        color[key] = value
      }
    }
  },
}

const button = {
  get borderRadius() {
    return getStyleAttr(buttonClass('_'), 'borderRadius')
  },
  set borderRadius(v) {
    setBodyProperty({
      '--button-border-radius': `${parseInt(v, 10)}px`,
    })
  },
  setButton(options) {
    if (!options || !cssVarSupported) return
    for (const [key, value] of Object.entries(options)) {
      button[key] = value
    }
  },
}

const style = {
  getClassname,
}

export { color, button, style, getDOMStyle, toRGB, types }
