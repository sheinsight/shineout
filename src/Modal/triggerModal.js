import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { modalClass } from '../styles'
import Panel from './panel'

/**
 * 获取modal所需要的div,如果存在,则返回;如果不存在,则创建一个
 * @param visible modal是否可见
 * @returns {Element} div元素
 */
function getModalDiv(visible) {
  let div = document.querySelector('[role=_MODAL_DIV]')
  if (!div) {
    const divClass = classnames(modalClass('mask'))
    div = document.createElement('div')
    document.body.appendChild(div)
    div.className = divClass
    div.setAttribute('role', '_MODAL_DIV')
  }
  div.style.display = visible ? 'block' : 'none'
  document.body.parentNode.style.overflow = visible ? 'hidden' : 'auto'
  return div
}

export function triggerModal(props) {
  const { content, ...otherProps } = props
  const div = getModalDiv(props.visible)
  ReactDOM.render(<Panel {...otherProps}>{ content }</Panel>, div)
}

