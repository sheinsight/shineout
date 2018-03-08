import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { curry } from '../utils/func'
import { inputClass } from '../styles'

export default curry((Tag, Origin) => class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    hasError: PropTypes.bool,
    border: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    border: true,
  }

  constructor(props) {
    super(props)
    this.state = { focus: props.autoFocus }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleBlur() {
    this.setState({ focus: false })
    const { onBlur } = this.props
    if (onBlur) onBlur()
  }

  handleFocus() {
    this.setState({ focus: true })
    const { onFocus } = this.props
    if (onFocus) onFocus()
  }

  render() {
    const {
      className, hasError, border, style, size, ...other
    } = this.props
    const { focus } = this.state

    const newClassName = classnames(
      inputClass(
        '_',
        focus && 'focus',
        size,
        !border && 'no-border',
        hasError && 'has-error',
      ),
      this.props.className,
    )

    return (
      <Tag className={newClassName} style={style}>
        <Origin {...other} onFocus={this.handleFocus} onBlur={this.handleBlur} />
      </Tag>
    )
  }
})
