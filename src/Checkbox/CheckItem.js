import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getProps, defaultProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { isEnterPress } from '../utils/is'
import Input from '../Input'
import { checkinputClass } from '../styles'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'

export default function(type) {
  class CheckItem extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        checked: props.checked,
      }

      this.id = `cb_${getUidStr()}`
      this.input = null
      this.el = null
      this.handleChange = this.handleChange.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleEnter = this.handleEnter.bind(this)
      this.bindRef = this.bindRef.bind(this)
    }

    componentDidUpdate(prevProps) {
      const { checked, inputable, value, htmlValue } = this.props
      if (prevProps.value !== value && checked === undefined) {
        // eslint-disable-next-line
        this.setState({ checked: inputable ? !!value : value === htmlValue })
      }
    }

    getChecked() {
      const { checked, value, htmlValue } = this.props
      if (typeof checked === 'function') return checked(htmlValue)
      if (checked !== undefined) return checked
      if (this.state.checked === undefined) return value === htmlValue
      return this.state.checked
    }

    getProp(key) {
      if (this.props[key] !== undefined) return this.props[key]
      return this.state[key]
    }

    bindRef(el) {
      if (el) this.el = el
    }

    handleEnter(e) {
      if (isEnterPress(e)) {
        this.handleChange({
          target: {
            checked: !this.getChecked(),
          },
        })
        // e.target.click()
        // if (this.el) this.el.focus()
      }
    }

    handleChange(e) {
      const { onChange, onRawChange, index, inputable } = this.props
      const { checked } = e.target
      this.setState({ checked }, () => this.el.focus())

      if (type === 'switch' && onChange) {
        onChange(checked)
        return
      }

      let value = inputable ? this.props.value : this.props.htmlValue

      if (onRawChange) onRawChange(value, checked)

      value = checked ? value : undefined
      if (onChange) onChange(value, checked, index)
    }

    handleInputChange(val) {
      const { onChange, index } = this.props
      const checked = val.length > 0
      if (onChange) onChange(val, checked, index)
    }

    render() {
      const { disabled, style, content, size, children, inputable, onClick } = this.props

      const rtl = isRTL()

      const checked = this.getChecked()
      const isSwitch = type === 'switch'

      const className = classnames(
        checkinputClass(
          '_',
          disabled && 'disabled',
          checked === true && 'checked',
          checked === 'indeterminate' && 'indeterminate',
          isSwitch && 'switch',
          `${type}-container`,
          rtl && 'rtl',
          {
            large: size === 'large',
            small: size === 'small',
          }
        ),
        this.props.className
      )

      const [checkedChildren, uncheckedChildren] = content
      const switchChildren =
        isSwitch && size !== 'small' ? (
          <span className={checkinputClass('switch-children')}>{checked ? checkedChildren : uncheckedChildren}</span>
        ) : null

      const value = typeof this.props.value === 'string' ? this.props.value : ''

      return (
        <label
          onKeyDown={this.handleEnter}
          className={className}
          style={style}
          htmlFor={this.id}
          tabIndex={disabled ? undefined : 0}
          ref={this.bindRef}
          disabled={disabled}
          {...getDataset(this.props)}
        >
          {switchChildren}
          <input
            id={this.id}
            disabled={disabled}
            tabIndex={-1}
            type={isSwitch ? 'checkbox' : type}
            onClick={onClick}
            onChange={this.handleChange}
            checked={checked}
          />
          <i className={checkinputClass('indicator', type)} />
          {children && !isSwitch && <span className={checkinputClass('desc')}>{children}</span>}
          {inputable && !isSwitch && checked && (
            <Input className={checkinputClass('text')} onChange={this.handleInputChange} value={value} />
          )}
          {isSwitch && <span className={checkinputClass('switch-indicator')} />}
        </label>
      )
    }
  }

  CheckItem.propTypes = {
    ...getProps(PropTypes, 'disabled'),
    checked: PropTypes.oneOfType([PropTypes.oneOf([true, false, 'indeterminate']), PropTypes.func]),
    inputable: PropTypes.bool,
    htmlValue: PropTypes.any,
    index: PropTypes.number,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.any,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    content: PropTypes.array,
  }

  CheckItem.defaultProps = {
    ...defaultProps,
    htmlValue: true,
    onClick: undefined,
    content: [],
  }

  return CheckItem
}
