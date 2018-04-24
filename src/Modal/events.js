import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from '../Button'
import { getUidStr } from '../utils/uid'
import { modalClass } from '../styles'
import Panel from './Panel'
import { getText } from './text'

const containers = {}
const DURATION = 300

export function destroy(id) {
  const div = containers[id]
  if (!div) return
  delete containers[id]
  ReactDOM.unmountComponentAtNode(div)
  document.body.removeChild(div)
}

export function close(props) {
  const { id } = props
  const div = containers[id]
  div.classList.remove(modalClass('show'))

  setTimeout(() => {
    div.style.display = 'none'
    if (props.destroy) destroy(id)

    const doc = document.body.parentNode
    doc.style.overflow = ''
    doc.style.paddingRight = ''
  }, DURATION)
}

export function createDiv(props) {
  const { id } = props
  let div = containers[id]
  if (div) return div

  const divClass = classnames(modalClass('_'))
  div = document.createElement('div')
  document.body.appendChild(div)

  /*
  const divMasks = document.querySelectorAll(`.${divClass}`)
  divMasks.forEach((item) => {
    if (item.style.display === 'block') div.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
  })
  */

  div.className = divClass

  containers[id] = div

  return div
}

export function open(props) {
  const { content, onClose, ...otherProps } = props
  const div = createDiv(props)
  div.style.display = 'block'

  const scrollWidth = window.innerWidth - document.body.clientWidth
  const doc = document.body.parentNode
  doc.style.overflow = 'hidden'
  doc.style.paddingRight = `${scrollWidth}px`

  const handleClose = () => {
    if (onClose) onClose()
    close(props)
  }
  ReactDOM.render(<Panel {...otherProps} onClose={handleClose}>{content}</Panel>, div)

  setTimeout(() => {
    div.classList.add(modalClass('show'))
  }, 10)
}

const btnOk = (option) => {
  const onClick = () => {
    close(option)
    if (option.onOk) option.onOk()
  }

  return <Button key="ok" onClick={onClick} type="primary">{getText('ok', option.text)}</Button>
}

const btnCancel = (option) => {
  const onClick = () => {
    close(option)
    if (option.onCancel) option.onCancel()
  }

  return <Button key="cancel" onClick={onClick}>{getText('cancel', option.text)}</Button>
}

export const method = type => (option) => {
  const props = Object.assign({}, option, {
    id: getUidStr(),
    destroy: true,
    width: 420,
    type,
  })

  if (type === 'confirm') {
    props.footer = [btnCancel(props), btnOk(props)]
  } else {
    props.footer = [btnOk(props)]
  }

  open(props)
  return () => close(props)
}
