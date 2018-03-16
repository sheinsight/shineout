import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { curry } from '../utils/func'
import { buttonClass, inputClass } from '../styles'

export default curry((options, Origin) => class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    hasError: PropTypes.bool,
    border: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
    tip: PropTypes.any,
    tipPosition: PropTypes.string,
  }

  static defaultProps = {
    border: true,
    tipPosition: 'bottom',
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

  renderHelp(focus) {
    const { tip, tipPosition } = this.props
    if (!tip || !focus) return null
    return <div className={inputClass('tip', `tip-${tipPosition}`)}>{tip}</div>
  }

  render() {
    const {
      className, hasError, border, style, size, tip, tipPosition, ...other
    } = this.props
    const { focus } = this.state
    const Tag = options.tag || 'label'

    const newClassName = classnames(
      inputClass(
        '_',
        focus && 'focus',
        options.isGroup && 'group',
        size,
        !border && 'no-border',
        hasError && 'has-error',
      ),
      buttonClass(options.isGroup && 'group'),
      this.props.className,
    )

    return (
      <Tag className={newClassName} style={style}>
        <Origin {...other} onFocus={this.handleFocus} onBlur={this.handleBlur} />
        {this.renderHelp(focus)}
      </Tag>
    )
  }
})
