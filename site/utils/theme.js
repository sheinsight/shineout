import getParameterByName from './param'

let theme = 'default'
let link
// const pathReg = /(cn\/?)$/

export const THEMES = ['default', 'antd']

function init(callback) {
  theme = getParameterByName('theme') || 'shineout'
  link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', `../../${theme}.css`)
  link.onload = callback

  document.head.appendChild(link)
}

function change(next) {
  theme = next
  link.setAttribute('href', `${theme}.css`)
}

export default {
  init,
  change,
  getTheme: () => theme,
}
