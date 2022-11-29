import React, { PureComponent, CSSProperties } from 'react'
import { throttleWrapper } from '../utils/lazyload'
import { ExpandProps } from './Props'

const iframeStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  width: 0,
  height: '100%',
  border: 0,
}

class Expand extends PureComponent<ExpandProps> {
  element: HTMLTableRowElement

  constructor(props: ExpandProps) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.bindIframe = this.bindIframe.bind(this)
    this.setHeight = this.setHeight.bind(this)
  }

  componentDidMount() {
    this.setHeight()
  }

  componentWillUnmount() {
    this.props.setExpandHeight(0)
  }

  setHeight() {
    if (this.element) {
      this.props.setExpandHeight(this.element.clientHeight)
    }
  }

  bindElement(el: HTMLTableRowElement) {
    this.element = el
  }

  bindIframe(el: HTMLIFrameElement) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = throttleWrapper(this.setHeight)
    }
  }

  render() {
    const { colSpan, children } = this.props
    return (
      <tr ref={this.bindElement}>
        <td style={{ padding: 0 }} colSpan={colSpan}>
          <iframe title="scroll" ref={this.bindIframe} style={iframeStyle} />
          {children}
        </td>
      </tr>
    )
  }
}

export default Expand
