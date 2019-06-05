import { isObject } from './is'
import { exposeClass } from '../styles/expose'
import { darken, fade } from './color'

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

function getColor(type) {
  // insert to body make render
  const className = exposeClass(`location-${type}`)
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div).color
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
    return getColor('primary')
  },
  set primary(v) {
    v = toRGB(v)
    const btnHoverDarken = getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim()
    const colors = {
      '--primary-color': v,
      '--primary-color-dark-5': darken(v, 5),
      '--primary-color-dark-15': darken(v, 15),
      '--primary-color-dark-btn-hover': darken(v, btnHoverDarken),
      '--primary-color-lighten-40': darken(v, -40),
      '--primary-color-fade-60': fade(v, 0.6),
      '--primary-color-fade-50': fade(v, 0.5),
      '--primary-color-fade-10': fade(v, 0.1),
      '--primary-color-fade-0': fade(v, 0),
      '--primary-color-dark-5_fade-60': fade(toRGB(darken(v, 5)), 0.6),
      '--primary-color-dark-5_fade-0': fade(toRGB(darken(v, 5)), 0),
    }
    setBodyProperty(colors)
  },
  get warning() {
    return getColor('warning')
  },
  set warning(v) {
    v = toRGB(v)
    const btnHoverDarken = getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim()
    const colors = {
      '--warning-color': v,
      '--warning-color-dark-5': darken(v, 5),
      '--warning-color-fade-60': fade(v, 0.6),
      '--warning-color-dark-5_fade-60': fade(toRGB(darken(v, 5)), 0.6),
      '--warning-color-fade-0': fade(v, 0),
      '--warning-color-dark-5_fade-0': fade(toRGB(darken(v, 5)), 0),
      '--warning-color-dark-btn-hover': darken(v, btnHoverDarken),
    }
    setBodyProperty(colors)
  },
  get danger() {
    return getColor('danger')
  },
  set danger(v) {
    v = toRGB(v)
    const btnHoverDarken = getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim()
    const colors = {
      '--danger-color': v,
      '--danger-color-fade-25': fade(v, 0.25),
      '--danger-color-dark-5': darken(v, 5),
      '--danger-color-fade-60': fade(v, 0.6),
      '--danger-color-dark-5_fade-60': fade(toRGB(darken(v, 5)), 0.6),
      '--danger-color-fade-0': fade(v, 0),
      '--danger-color-dark-5_fade-0': fade(toRGB(darken(v, 5)), 0),
      '--danger-color-dark-btn-hover': darken(v, btnHoverDarken),
    }
    setBodyProperty(colors)
  },
  get success() {
    return getColor('success')
  },
  set success(v) {
    v = toRGB(v)
    const btnHoverDarken = getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim()
    const colors = {
      '--success-color': v,
      '--success-color-dark-5': darken(v, 5),
      '--success-color-fade-60': fade(v, 0.6),
      '--success-color-dark-5_fade-60': fade(toRGB(darken(v, 5)), 0.6),
      '--success-color-fade-0': fade(v, 0),
      '--success-color-dark-5_fade-0': fade(toRGB(darken(v, 5)), 0),
      '--success-color-dark-btn-hover': darken(v, btnHoverDarken),
    }
    setBodyProperty(colors)
  },
  get secondary() {
    return getColor('secondary')
  },
  set secondary(v) {
    v = toRGB(v)
    const btnHoverDarken = getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim()
    const colors = {
      '--secondary-color': v,
      '--secondary-color-dark-5': darken(v, 5),
      '--secondary-color-dark-btn-hover': darken(v, btnHoverDarken),
      '--secondary-color-dark-5_fade-60': fade(toRGB(darken(v, 5)), 0.6),
      '--secondary-color-dark-5_fade-0': fade(toRGB(darken(v, 5)), 0),
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

const style = {
  getClassname,
}

export { color, style, getDOMStyle }
