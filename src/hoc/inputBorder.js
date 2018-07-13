import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { curry } from '../utils/func'
import { buttonClass, inputClass } from '../styles'

function firstError(errors) {
  const keys = Object.keys(errors)
  if (keys.length === 0) return false
  return errors[keys[0]]
}

export default curry((options, Origin) => class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    border: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    onBlur: PropTypes.func,
    onError: PropTypes.func,
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
      errors: {},
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentWillUnmount() {
    this.$willUnmount = true
  }

  setState(...args) {
    if (this.$willUnmount) return
    super.setState(...args)
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

  handleError(name, error) {
    if (this.state.errors[name] === error) return

    this.setState(immer((state) => {
      if (!error) {
        delete state.errors[name]
      } else {
        state.errors[name] = error
      }
    }))

    if (this.props.onError) this.props.onError(name, error)
  }

  renderHelp(focus) {
    const { errors } = this.state
    const { tip, popover } = this.props
    const classList = ['tip', popover || 'bottom-left']

    const error = firstError(errors)
    if (error && popover) {
      classList.push('error')
      return <div className={inputClass(...classList)}>{error.message}</div>
    }

    if (!tip || !focus) return null
    return <div className={inputClass([...classList])}>{tip}</div>
  }

  render() {
    const {
      className, border, size, tip, popover, width, style, ...other
    } = this.props
    const { errors, focus } = this.state
    const Tag = options.tag || 'label'

    const newStyle = Object.assign({ width }, style)

    const newClassName = classnames(
      inputClass(
        '_',
        focus && 'focus',
        other.disabled === true && 'disabled',
        options.isGroup && 'group',
        size,
        newStyle.width && 'inline',
        !border && 'no-border',
        options.overflow && `overflow-${options.overflow}`,
        Object.keys(errors).length > 0 && 'invalid',
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
          onError={this.handleError}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderHelp(focus)}
      </Tag>
    )
  }
})
