import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { modalClass } from '../styles'
import Panel from './Panel'

/**
 * 获取modal所需要的div,如果存在,则返回;如果不存在,则创建一个
 * @param visible modal是否可见
 * @param id modal的唯一标识
 * @returns {Element} div元素
 */
function getModalDiv({ visible, id, special }) {
  let div = document.querySelector(`[role=_MODAL_DIV_${id}]`)
  if (!div) {
    const divClass = classnames(modalClass('mask'))
    div = document.createElement('div')
    document.body.appendChild(div)
    //  用于多级modal时判断,如果存在modal且显示,则新modal遮罩层为高透明色.如不需要可删除
    //  start
    const divMasks = document.querySelectorAll(`.${divClass}`)
    divMasks.forEach((item) => {
      if (item.style.display === 'block') div.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    })
    // end
    div.className = divClass
    div.setAttribute('role', `_MODAL_DIV_${id}`)
  }
  div.style.display = visible ? 'block' : 'none'
  if (!visible && special) document.body.removeChild(div)
  document.body.parentNode.style.overflow = visible ? 'hidden' : 'auto'
  return div
}

export function triggerModal(props) {
  const { content, ...otherProps } = props
  const div = getModalDiv(props)
  ReactDOM.render(<Panel {...otherProps}>{ content }</Panel>, div)
}

