import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { PureComponent } from '../component'
import Button from '../Button'
import { getUidStr } from '../utils/uid'
import { modalClass } from './styles'
import Panel from './Panel'
import { getLocale } from '../locale'
import { getParent } from '../utils/dom/element'
import ready from '../utils/dom/ready'
import { docSize } from '../utils/dom/document'
import { isRTL, getDefaultContainer } from '../config'
import { Methods, Options } from './Props'

const containers: {
  [id: string]: { div: HTMLElement; container: HTMLElement; visible?: boolean; props: Options }
} = {}
const DURATION = 300

function getDiv(id?: string) {
  const mod = containers[id!]
  return mod ? mod.div : null
}

function getContainer(id: string) {
  const mod = containers[id]
  return mod ? mod.container : null
}

function hasVisible() {
  return Object.keys(containers).some(k => containers[k].visible)
}

function isMask(id: string) {
  const ids = Object.keys(containers).filter(k => containers[k].visible)
  if (ids.length === 0) return true
  return ids[0] === id
}

export function destroy(id: string, unmount: boolean) {
  const div = getDiv(id)
  const container = getContainer(id)
  if (!div || !container) return
  delete containers[id]
  if (unmount) ReactDOM.unmountComponentAtNode(div)
  if (div && div.parentNode) div.parentNode.removeChild(div)
}

export function close(props: Options, callback?: Function) {
  const { id } = props
  const modal = containers[props.id!]

  if (!modal || modal.visible === false) return
  modal.visible = false

  const { div } = modal
  div.classList.remove(modalClass('show'), modalClass('start'))
  if (!props.position) div.classList.add(modalClass('end'))

  setTimeout(() => {
    div.style.display = 'none'
    div.classList.remove(modalClass('end'))
    if (props.destroy) destroy(id!, !props.usePortal)

    if (!hasVisible()) {
      const doc = document.body.parentNode as HTMLElement
      doc.style.overflow = ''
      doc.style.paddingRight = ''
    }
    if (callback) callback()
  }, DURATION)
}

export function createDiv(props: Options) {
  const defaultContainer = getDefaultContainer()
  const { id, position, fullScreen, container = defaultContainer } = props
  let div = getDiv(props.id)
  if (div) return div

  const parent = typeof container === 'function' ? container() : container
  div = document.createElement('div')
  parent.appendChild(div)
  div.className = classnames(
    modalClass('_', position && 'position', isRTL() && 'rtl', fullScreen && 'full-screen'),
    props.rootClassName
  )

  containers[id!] = { div, container: parent, props }

  return div
}

// eslint-disable-next-line
export function open(props: Options, isPortal?: boolean) {
  const { content, onClose, zIndex, forceMask, ...otherProps } = props
  const options = { ...props, usePortal: isPortal }
  const div = createDiv(options)
  div.style.display = 'block'
  const parsed = parseInt(String(zIndex), 10)
  if (!Number.isNaN(parsed)) div.style.zIndex = (parsed as unknown) as string
  const doc = document.body.parentNode as HTMLElement
  if (!doc.style.paddingRight) {
    const scrollWidth = window.innerWidth - docSize.width
    doc.style.overflow = 'hidden'
    doc.style.paddingRight = `${scrollWidth}px`
  }
  const handleClose = () => {
    if (onClose) onClose()
    if (!isPortal) close(options)
  }

  const opacityDefault = props.maskOpacity === undefined ? 0.25 : props.maskOpacity
  const maskOpacity = isMask(props.id!) || forceMask ? opacityDefault : 0.01
  div.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`

  containers[props.id!].visible = true

  const panel = (
    <Panel {...otherProps} onClose={handleClose} container={div}>
      {content}
    </Panel>
  )

  if (isPortal) return ReactDOM.createPortal(panel, div)
  if (document.activeElement && !getParent(document.activeElement, div)) (document.activeElement as HTMLElement).blur()

  ReactDOM.render(panel, div)
  return null
}

const closeCallback = <T extends Function>(fn: T, option: Options, setLoading?: Function) => () => {
  let callback
  if (fn) callback = fn()
  if (callback && typeof callback.then === 'function') {
    if (setLoading) {
      setLoading(true)
    }
    callback
      .then(() => {
        close(option)
      })
      .catch(() => {
        if (setLoading) {
          setLoading(false)
        }
      })
  } else {
    close(option)
  }
}
interface LoadingOkProps {
  option: Options
}
interface LoadingOkState {
  loading: boolean
}
class LoadingOk extends PureComponent<LoadingOkProps, LoadingOkState> {
  setLoading: (loading: boolean) => void

  constructor(props: LoadingOkProps) {
    super(props)
    this.state = {
      loading: false,
    }
    this.setLoading = loading => {
      this.setState({ loading })
    }
  }

  render() {
    const { option } = this.props
    const { loading } = this.state
    const onClick = closeCallback(option.onOk!, option, this.setLoading)
    return (
      <Button loading={loading} key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
        {getLocale('ok', option.text)}
      </Button>
    )
  }
}

// const btnOk = option => {
//   const onClick = closeCallback(option.onOk, option)
//   return (
//     <Button.Once key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
//       {getLocale('ok', option.text)}
//     </Button.Once>
//   )
// }

const btnCancel = (option: Options) => {
  const onClick = closeCallback(option.onCancel!, option)
  return (
    <Button.Once id={`${option.id}-cancel`} key="cancel" onClick={onClick}>
      {getLocale('cancel', option.text)}
    </Button.Once>
  )
}

export const method = (type: Methods) => (option: Options) => {
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
    props.footer = [btnCancel(props), <LoadingOk option={props} key="ok" />]
  } else {
    props.footer = 'footer' in props ? props.footer : [<LoadingOk option={props} key="ok" />]
  }

  open(props)
  return () => close(props)
}

export const closeAll = () => {
  Object.keys(containers)
    .filter(id => containers[id].props.from === 'method' && containers[id].visible)
    .forEach(id => {
      const { onClose, usePortal } = containers[id].props
      if (onClose) onClose()
      if (!usePortal) close(containers[id].props)
    })
}

ready(() => {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return
    const ids = Object.keys(containers).reverse()
    const opened = ids.find(id => containers[id].visible && containers[id].props.esc)
    if (!opened) return
    const { props } = containers[opened]
    const { onClose, usePortal } = props
    if (onClose) onClose()
    if (!usePortal) close(props)
  })
})
