import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const iframeStyle = {
  position: 'absolute', left: 0, width: 0, height: '100%', border: 0,
}

class Expand extends PureComponent {
  constructor(props) {
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

  bindElement(el) {
    this.element = el
  }

  bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = this.setHeight
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

Expand.propTypes = {
  children: PropTypes.any,
  colSpan: PropTypes.number,
  setExpandHeight: PropTypes.func,
}

export default Expand
