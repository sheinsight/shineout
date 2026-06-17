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
import { isRTL, getDefaultContainer, getRTLPosition } from '../config'
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

function hasVisibleMask() {
  return Object.keys(containers).some(k => containers[k].visible && !containers[k].props.hideMask)
}

function isMask(id: string) {
  const ids = Object.keys(containers).filter(k => containers[k].visible && !containers[k].props.hideMask)
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

    if (!hasVisibleMask()) {
      const doc = document.body.parentNode as HTMLElement
      doc.style.overflow = ''
      doc.style.paddingRight = ''
    }
    if (callback) callback()
  }, DURATION)
}

export function createDiv(props: Options) {
  const defaultContainer = getDefaultContainer()
  const { id, position, fullScreen, container = defaultContainer, hideMask } = props
  let div = getDiv(props.id)
  if (div) return div

  const parent = typeof container === 'function' ? container() : container
  div = document.createElement('div')
  if (!parent) return null
  parent.appendChild(div)
  div.className = classnames(
    modalClass('_', position && 'position', isRTL() && 'rtl', fullScreen && 'full-screen', hideMask && 'hide-mask'),
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
  if (!div) return null
  div.style.display = 'block'
  const parsed = parseInt(String(zIndex), 10)
  if (!Number.isNaN(parsed)) div.style.zIndex = (parsed as unknown) as string
  const doc = document.body.parentNode as HTMLElement
  if (!props.hideMask) {
    if (!doc.style.paddingRight) doc.style.paddingRight = `${window.innerWidth - docSize.width}px`
    doc.style.overflow = 'hidden'
  }
  const handleClose = () => {
    if (onClose) onClose()
    if (!isPortal) close(options)
  }

  const opacityDefault = props.maskOpacity === undefined ? 0.25 : props.maskOpacity
  const maskOpacity = isMask(props.id!) || forceMask ? opacityDefault : 0.01
  if (!props.hideMask) div.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`

  containers[props.id!].visible = true

  const panel = (
    <Panel {...otherProps} onClose={handleClose} container={div} position={getRTLPosition(props.position || '') as any}>
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

// PR #1908 (commit 76cba77d) 在 closeAll 中新增了同步调用 onClose 的逻辑，
// 这引发了两个问题：
//
// 1. 无限递归 —— 用户在 onClose 中再次调用 closeAll() 会导致栈溢出
//    (RangeError: Maximum call stack size exceeded)，
//    后续 commit eb355ef4 通过 closingAll 重入守卫修复了此问题。
//
// 2. Breaking Change —— 与 V1 行为不一致。
//    典型场景：用户在 Modal.show 的 content 中通过 onClick 调用
//    closeAll() + resolve(true)，同时在 onClose 中调用
//    closeAll() + resolve(false)。
//    V1: closeAll 不触发 onClose → resolve(true) 先执行 → 结果为 true。
//    V2(同步): closeAll 同步触发 onClose → resolve(false) 抢先执行 → 结果为 false。
//    这对 V1 升级 V2 的用户是一个 Breaking Change。
//
// 修复方案：将 onClose 改为 setTimeout 异步触发。
// - 保留 PR #1908 "closeAll 触发 onClose" 的 feature（通知业务层做清理）。
// - closeAll 同步完成所有 close() 调用后，调用者的后续代码先执行，
//   onClose 在下一个事件循环才触发，不会抢占调用者的 resolve。
// - close() 同步将 visible 置为 false，onClose 异步执行时即使再调
//   closeAll()，filter 结果为空数组，天然不会递归，无需重入守卫。
export const closeAll = () => {
  Object.keys(containers)
    .filter(id => containers[id].props.from === 'method' && containers[id].visible)
    .forEach(id => {
      const { onClose, usePortal } = containers[id].props
      if (onClose) setTimeout(() => onClose(), 0)
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
