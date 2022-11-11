import classnames from 'classnames'
import ReactDOM from 'react-dom'
import { CSSProperties, ReactElement } from 'react'
import { tooltipClass } from './styles'
import getCommonContainer from '../utils/dom/popContainer'
import { ContainerOptions } from './Props'

const div = document.createElement('div')
let timer: NodeJS.Timeout
div.style.display = 'none'

const transStyle = (value: number | string = '') => (typeof value === 'number' ? `${value}px` : value)

getCommonContainer().appendChild(div)

const arrow = document.createElement('div')
arrow.className = tooltipClass('arrow')
div.appendChild(arrow)

const inner = document.createElement('div')
inner.className = tooltipClass('inner')
div.appendChild(inner)

let currentId: string | undefined

export function hide() {
  if (timer) clearTimeout(timer)
  div.style.display = 'none'
  div.className = ''
  currentId = undefined
}

function clickaway() {
  hide()
  document.removeEventListener('click', clickaway)
}

export const show: ContainerOptions['show'] = (props, id, innerStyle) => {
  const { position, style = {}, tip, trigger, animation, className: cn } = props

  currentId = id

  div.style.cssText = 'display: none'
  Object.keys(style).forEach((k: keyof CSSProperties) => {
    div.style[k as any] = transStyle(style[k])
  })

  const className = tooltipClass('_', 'in', position, animation && 'animation')

  // fix safari
  timer = setTimeout(() => {
    div.style.display = 'block'
    div.className = classnames(className, cn)
  }, 0)

  ReactDOM.render(tip as ReactElement, inner)

  inner.setAttribute('style', '')
  if (innerStyle) {
    Object.keys(innerStyle).forEach((k: keyof CSSProperties) => {
      inner.style[k as any] = transStyle(innerStyle[k])
    })
  }

  if (trigger === 'click') {
    document.addEventListener('click', clickaway)
  }
}

export const move: ContainerOptions['move'] = (id, pos) => {
  if (id === currentId) {
    // eslint-disable-next-line no-return-assign
    Object.keys(pos).map((key: keyof typeof pos) => (div.style[key] = transStyle(pos[key])))
  }
}

export const isCurrent: ContainerOptions['isCurrent'] = id => id === currentId
