import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { curry } from '../utils/func'
import { buttonClass, inputClass } from '../styles'

export default curry((options, Origin) => class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    border: PropTypes.bool,
    onBlur: PropTypes.func,
    onError: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
    tip: PropTypes.any,
    tipPosition: PropTypes.oneOf(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']),
  }

  static defaultProps = {
    border: true,
    tipPosition: 'bottom-left',
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
    const { tip, tipPosition } = this.props
    if (!tip || !focus) return null

    const className = inputClass('tip', tipPosition)
    return <div className={className}>{tip}</div>
  }

  render() {
    const {
      className, border, style, size, tip, tipPosition, ...other
    } = this.props
    const { errors, focus } = this.state
    const Tag = options.tag || 'label'

    const newClassName = classnames(
      inputClass(
        '_',
        focus && 'focus',
        options.isGroup && 'group',
        size,
        !border && 'no-border',
        Object.keys(errors).length > 0 && 'invalid',
      ),
      buttonClass(options.isGroup && 'group'),
      this.props.className,
    )

    return (
      <Tag className={newClassName} style={style}>
        <Origin
          {...other}
          onError={this.handleError}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderHelp(focus)}
      </Tag>
    )
  }
})
