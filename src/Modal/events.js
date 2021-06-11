import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from '../Button'
import { getUidStr } from '../utils/uid'
import { modalClass } from '../styles'
import Panel from './Panel'
import { getLocale } from '../locale'
import { getParent } from '../utils/dom/element'
import ready from '../utils/dom/ready'
import { docSize } from '../utils/dom/document'

const containers = {}
const DURATION = 300

function getDiv(id) {
  const mod = containers[id]
  return mod ? mod.div : null
}

function getContainer(id) {
  const mod = containers[id]
  return mod ? mod.container : null
}

function hasVisible() {
  return Object.keys(containers).some(k => containers[k].visible)
}

function isMask(id) {
  const ids = Object.keys(containers).filter(k => containers[k].visible)
  if (ids.length === 0) return true
  return ids[0] === id
}

export function destroy(id, unmount) {
  const div = getDiv(id)
  const container = getContainer(id)
  if (!div || !container) return
  delete containers[id]
  if (unmount) ReactDOM.unmountComponentAtNode(div)
  container.removeChild(div)
}

export function close(props, callback) {
  const { id } = props
  const modal = containers[props.id]

  if (!modal || modal.visible === false) return
  modal.visible = false

  const { div } = modal
  div.classList.remove(modalClass('show'), modalClass('start'))
  if (!props.position) div.classList.add(modalClass('end'))

  setTimeout(() => {
    div.style.display = 'none'
    div.classList.remove(modalClass('end'))
    if (props.destroy) destroy(id, !props.usePortal)

    if (!hasVisible()) {
      const doc = document.body.parentNode
      doc.style.overflow = ''
      doc.style.paddingRight = ''
    }
    if (callback) callback()
  }, DURATION)
}

export function createDiv(props) {
  const { id, position, fullScreen, container = document.body } = props
  let div = getDiv(props.id)
  if (div) return div

  const parent = typeof container === 'function' ? container() : container
  div = document.createElement('div')
  parent.appendChild(div)
  div.className = classnames(modalClass('_', position && 'position', fullScreen && 'full-screen'), props.rootClassName)

  containers[id] = { div, container: parent, props }

  return div
}

// eslint-disable-next-line
export function open(props, isPortal) {
  const { content, onClose, zIndex, ...otherProps } = props
  const div = createDiv(props)
  div.style.display = 'block'
  const parsed = parseInt(zIndex, 10)
  if (!Number.isNaN(parsed)) div.style.zIndex = parsed

  const scrollWidth = window.innerWidth - docSize.width
  const doc = document.body.parentNode
  doc.style.overflow = 'hidden'
  doc.style.paddingRight = `${scrollWidth}px`

  const handleClose = () => {
    if (onClose) onClose()
    if (!isPortal) close(props)
  }

  const opacityDefault = props.maskOpacity === undefined ? 0.25 : props.maskOpacity
  const maskOpacity = isMask(props.id) ? opacityDefault : 0.01
  div.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`

  containers[props.id].visible = true

  const panel = (
    <Panel {...otherProps} onClose={handleClose} container={div}>
      {content}
    </Panel>
  )

  if (isPortal) return ReactDOM.createPortal(panel, div)
  if (document.activeElement && !getParent(document.activeElement, div)) document.activeElement.blur()

  ReactDOM.render(panel, div)
  return null
}

const closeCallback = (fn, option) => () => {
  let callback
  if (fn) callback = fn()
  if (callback && typeof callback.then === 'function') {
    callback.then(() => {
      close(option)
    })
  } else {
    close(option)
  }
}

const btnOk = option => {
  const onClick = closeCallback(option.onOk, option)
  return (
    <Button.Once key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
      {getLocale('ok', option.text)}
    </Button.Once>
  )
}

const btnCancel = option => {
  const onClick = closeCallback(option.onCancel, option)
  return (
    <Button.Once id={`${option.id}-cancel`} key="cancel" onClick={onClick}>
      {getLocale('cancel', option.text)}
    </Button.Once>
  )
}

export const method = type => option => {
  const props = Object.assign(
    {
      width: 420,
      esc: true,
    },
    option,
    {
      id: getUidStr(),
      destroy: true,
      type,
      from: 'method',
    }
  )

  if (type === 'confirm') {
    props.footer = [btnCancel(props), btnOk(props)]
  } else {
    props.footer = 'footer' in props ? props.footer : [btnOk(props)]
  }

  open(props)
  return () => close(props)
}

ready(() => {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return
    const ids = Object.keys(containers).reverse()
    const opened = ids.find(id => containers[id].visible && containers[id].props.esc)
    if (!opened) return
    const { props } = containers[opened]
    const { onClose, isPortal } = props
    if (onClose) onClose()
    if (!isPortal) close(props)
  })
})
