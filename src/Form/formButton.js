import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../Button'
import Spin from '../Spin'
import { getParent, dispatchEvent } from '../utils/dom/element'
import { formConsumer } from './formContext'

const spinStyle = { display: 'inline-block', marginRight: 8 }

export default htmlType => formConsumer(['disabled'], class FormButton extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string,
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
    if (htmlType === 'button') {
      const form = getParent(this.button, 'form')
      dispatchEvent(form, 'submit')
    }

    if (this.props.onClick) this.props.onClick()
  }

  render() {
    const {
      children, loading, disabled, onClick, ...other
    } = this.props
    const type = this.props.type || (htmlType === 'reset' ? 'default' : 'primary')

    return (
      <Button
        {...other}
        disabled={loading || disabled}
        type={type}
        htmlType={htmlType}
        ref={this.bindElement}
        onClick={this.handleClick}
      >
        {
          loading &&
          <span style={spinStyle}>
            <Spin size={12} name="ring" color="#fff" />
          </span>
        }
        {children}
      </Button>
    )
  }
})
