import { tooltipClass } from '../styles'

const div = document.createElement('div')
div.style.display = 'none'
document.body.appendChild(div)

const arrow = document.createElement('div')
arrow.className = tooltipClass('arrow')
div.appendChild(arrow)

const inner = document.createElement('div')
inner.className = tooltipClass('inner')
div.appendChild(inner)

export function hide() {
  div.style.display = 'none'
  div.className = ''
}

function clickaway() {
  hide()
  document.removeEventListener('click', clickaway)
}

export function show(props) {
  const {
    position, style, tip, trigger,
  } = props

  div.style.cssText = 'display: none'
  Object.keys(style).forEach((k) => {
    div.style[k] = style[k]
  })

  const className = tooltipClass('_', 'in', position)

  // fix safari
  setTimeout(() => {
    div.style.display = 'block'
    div.className = className
  }, 0)

  inner.innerText = tip

  if (trigger === 'click') {
    document.addEventListener('click', clickaway)
  }
}
