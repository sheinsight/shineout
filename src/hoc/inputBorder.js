import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Component } from '../component'
import { curry } from '../utils/func'
import { buttonClass, inputClass, popoverClass } from '../styles'
import Popover from '../Popover'

export default curry(
  (options, Origin) =>
    class extends Component {
      static propTypes = {
        autoFocus: PropTypes.bool,
        border: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        error: PropTypes.object,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        size: PropTypes.string,
        style: PropTypes.object,
        tip: PropTypes.any,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        popover: PropTypes.oneOf(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']),
        popoverProps: PropTypes.object,
      }

      static defaultProps = {
        border: true,
        style: {},
        popoverProps: {},
      }

      constructor(props) {
        super(props)
        this.el = null
        this.state = {
          focus: props.autoFocus,
        }
        this.bindRef = this.bindRef.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        // this.enterPress = this.enterPress.bind(this)
      }

      bindRef(el) {
        this.el = el
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
        const { error, tip, popover, popoverProps } = this.props
        const classList = ['input-tip']
        const position = popover || 'bottom-left'
        let styles
        if (popoverProps.style && popoverProps.style.width) {
          styles = popoverProps.style
        } else {
          styles = { minWidth: 200, maxWidth: 400 }
          if (popoverProps.style) {
            Object.assign(styles, popoverProps.style)
          }
        }

        if (error && popover) {
          classList.push('input-error')
          return (
            <Popover
              key="error"
              getPopupContainer={() => this.el}
              {...popoverProps}
              visible
              style={styles}
              className={popoverClass(...classList)}
              position={position}
            >
              {error.message}
            </Popover>
          )
        }

        if (!tip || !focus) return null
        return (
          <Popover
            key="tip"
            getPopupContainer={() => this.el}
            {...popoverProps}
            visible
            style={styles}
            className={popoverClass(...classList)}
            position={position}
          >
            {tip}
          </Popover>
        )
      }

      render() {
        const { className, border, size, tip, popover, width, style, error, popoverProps, ...other } = this.props
        const { focus } = this.state
        const Tag = options.tag || 'label'
        const newStyle = Object.assign({ width }, style)
        const newClassName = classnames(
          inputClass(
            '_',
            focus && other.disabled !== true && 'focus',
            other.disabled === true && 'disabled',
            options.isGroup && 'group',
            size,
            newStyle.width && 'inline',
            !border && 'no-border',
            options.overflow && `overflow-${options.overflow}`,
            error && 'invalid',
            popover && error && 'focus'
          ),
          buttonClass(options.isGroup && 'group'),
          typeof options.className === 'function' ? options.className(this.props) : options.className,
          this.props.className
        )

        return (
          <Tag
            ref={this.bindRef}
            className={newClassName}
            style={newStyle}
            tabIndex={options.enterPress ? '0' : undefined}
          >
            <Origin {...other} size={size} onFocus={this.handleFocus} onBlur={this.handleBlur} />
            {this.renderHelp(focus)}
          </Tag>
        )
      }
    }
)
