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

function getDiv(id) {
  const mod = containers[id]
  return mod ? mod.div : null
}

function hasVisible() {
  return Object.keys(containers).some(k => containers[k].visible)
}

export function destroy(id) {
  const div = getDiv(id)
  if (!div) return
  delete containers[id]
  ReactDOM.unmountComponentAtNode(div)
  document.body.removeChild(div)
}

export function close(props) {
  const { id } = props
  const modal = containers[props.id]

  if (!modal || modal.visible === false) return
  modal.visible = false

  const { div } = modal
  div.classList.remove(modalClass('show'))

  setTimeout(() => {
    div.style.display = 'none'
    if (props.destroy) destroy(id)

    if (!hasVisible()) {
      const doc = document.body.parentNode
      doc.style.overflow = ''
      doc.style.paddingRight = ''
    }
  }, DURATION)
}

export function createDiv(props) {
  const { id } = props
  let div = getDiv(props.id)
  if (div) return div

  div = document.createElement('div')
  document.body.appendChild(div)
  div.className = classnames(modalClass('_'))

  containers[id] = { div }

  return div
}

export function open(props) {
  const { content, onClose, ...otherProps } = props
  const div = createDiv(props)

  if (div.style.display === 'block') return
  div.style.display = 'block'

  const scrollWidth = window.innerWidth - document.body.clientWidth
  const doc = document.body.parentNode
  doc.style.overflow = 'hidden'
  doc.style.paddingRight = `${scrollWidth}px`

  const handleClose = () => {
    if (onClose) onClose()
    close(props)
  }

  const maskOpacity = hasVisible() ? 0.01 : props.maskOpacity
  containers[props.id].visible = true

  ReactDOM.render(
    <Panel {...otherProps} maskOpacity={maskOpacity} onClose={handleClose}>
      {content}
    </Panel>,
    div,
  )

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
