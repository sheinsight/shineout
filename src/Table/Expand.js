import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Expand extends PureComponent {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
  }

  componentDidMount() {
    this.props.setExpandHeight(this.element.clientHeight)
  }

  componentWillUnmount() {
    this.props.setExpandHeight(0)
  }

  bindElement(el) {
    this.element = el
  }

  render() {
    const { colSpan, children } = this.props
    return <tr ref={this.bindElement}><td colSpan={colSpan}>{children}</td></tr>
  }
}

Expand.propTypes = {
  children: PropTypes.any,
  colSpan: PropTypes.number,
  setExpandHeight: PropTypes.func,
}

export default Expand
