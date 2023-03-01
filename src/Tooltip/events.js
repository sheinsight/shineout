import classnames from 'classnames'
import ReactDOM from 'react-dom'
import { tooltipClass } from './styles'
import getCommonContainer from '../utils/dom/popContainer'

let div = null
let timer
let arrow = null
let inner = null
let currentId

export function hide() {
  if (timer) clearTimeout(timer)
  if (div) {
    div.style.display = 'none'
    div.className = ''
  }
  currentId = undefined
}

function clickaway() {
  hide()
  document.removeEventListener('click', clickaway)
}

export function show(props, id, innerStyle) {
  const { position, style, tip, trigger, animation, className: cn } = props
  const container = getCommonContainer()
  // create
  if (!container.contains(div)) {
    div = null
    arrow = null
    inner = null
  }

  if (!div) {
    div = document.createElement('div')
    div.style.display = 'none'
    container.appendChild(div)
  }

  if (!arrow) {
    arrow = document.createElement('div')
    arrow.className = tooltipClass('arrow')
    div.appendChild(arrow)
  }

  if (!inner) {
    inner = document.createElement('div')
    inner.className = tooltipClass('inner')
    div.appendChild(inner)
  }
  //

  currentId = id

  div.style.cssText = 'display: none'
  Object.keys(style).forEach(k => {
    div.style[k] = style[k]
  })

  const className = tooltipClass('_', 'in', position, animation && 'animation')

  // fix safari
  timer = setTimeout(() => {
    div.style.display = 'block'
    div.className = classnames(className, cn)
  }, 0)

  ReactDOM.render(tip, inner)

  inner.setAttribute('style', false)
  if (innerStyle) {
    Object.keys(innerStyle).forEach(k => {
      inner.style[k] = typeof innerStyle[k] === 'number' ? `${innerStyle[k]}px` : innerStyle[k]
    })
  }

  if (trigger === 'click') {
    document.addEventListener('click', clickaway)
  }
}

export function move(id, pos) {
  if (id === currentId) {
    // eslint-disable-next-line no-return-assign
    Object.keys(pos).map(key => (div.style[key] = pos[key]))
  }
}

export function isCurrent(id) {
  return id === currentId
}
