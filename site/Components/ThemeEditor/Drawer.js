import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ready from '../../../src/utils/dom/ready'
import { docSize } from '../../../src/utils/dom/document'
import { headerClass, mainClass } from '../../styles'

const div = document.createElement('div')
div.className = headerClass('editor-drawer')

ready(() => {
  document.body.appendChild(div)
})

export default class Drawer extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.element,
  }

  componentDidMount() {
    this.adjustContent()
  }

  componentDidUpdate() {
    this.adjustContent()
  }

  adjustContent() {
    const content = document.querySelector('#root > div')
    if (!content) return
    const { visible } = this.props
    const drawerWidth = div.clientWidth
    const width = visible ? `${parseInt(docSize.width, 10) - parseInt(drawerWidth, 10)}px` : 'auto'
    const method = visible ? content.classList.add : content.classList.remove
    method.call(content.classList, mainClass('drawer'))
    content.style.width = width
  }

  render() {
    const { visible, children } = this.props
    if (!visible) return null
    return ReactDOM.createPortal(children, div)
  }
}
