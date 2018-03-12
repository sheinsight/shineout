import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../Button'
import { getParent, dispatchEvent } from '../utils/dom/element'

export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  bindElement(e) {
    this.button = findDOMNode(e)
  }

  handleClick() {
    const form = getParent(this.button, 'form')
    dispatchEvent(form, 'submit')
  }

  render() {
    const { children } = this.props
    return (
      <Button ref={this.bindElement} onClick={this.handleClick} type="primary">
        {children}
      </Button>
    )
  }
}
