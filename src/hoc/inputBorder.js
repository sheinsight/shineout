import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Component } from '../component'
import { curry } from '../utils/func'
import { buttonClass, inputClass } from '../styles'

export default curry((options, Origin) => class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    border: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    error: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
    tip: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    popover: PropTypes.oneOf(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']),
  }

  static defaultProps = {
    border: true,
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      focus: props.autoFocus,
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleBlur(event) {
    this.setState({ focus: false })
    const { onBlur } = this.props
    if (onBlur) onBlur(event)
  }

  handleFocus(event) {
    this.setState({ focus: true })
    const { onFocus } = this.props
    if (onFocus) onFocus(event)
  }

  renderHelp(focus) {
    const { error, tip, popover } = this.props
    const classList = ['tip', popover || 'bottom-left']

    if (error && popover) {
      classList.push('error')
      return <div className={inputClass(...classList)}>{error.message}</div>
    }

    if (!tip || !focus) return null
    return <div className={inputClass([...classList])}>{tip}</div>
  }

  render() {
    const {
      className, border, size, tip, popover, width, style, error, ...other
    } = this.props
    const { focus } = this.state
    const Tag = options.tag || 'label'
    const newStyle = Object.assign({ width }, style)
    const newClassName = classnames(
      inputClass(
        '_',
        focus && !other.disabled && 'focus',
        other.disabled === true && 'disabled',
        options.isGroup && 'group',
        size,
        newStyle.width && 'inline',
        !border && 'no-border',
        options.overflow && `overflow-${options.overflow}`,
        error && 'invalid',
        popover && error && 'focus',
      ),
      buttonClass(options.isGroup && 'group'),
      typeof options.className === 'function' ? options.className(this.props) : options.className,
      this.props.className,
    )

    return (
      <Tag className={newClassName} style={newStyle}>
        <Origin
          {...other}
          size={size}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderHelp(focus)}
      </Tag>
    )
  }
})
