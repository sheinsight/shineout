import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import Input from '../Input'
import { checkinputClass } from '../styles'

export default function (type) {
  class CheckItem extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        checked: props.checked,
      }

      this.id = `cb_${getUidStr()}`
      this.handleChange = this.handleChange.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
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

    handleChange(e) {
      const {
        onChange, onRawChange, index, inputable,
      } = this.props
      const { checked } = e.target
      this.setState({ checked })
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
      const {
        disabled, style, children, inputable,
      } = this.props

      const checked = this.getChecked()

      const className = classnames(
        checkinputClass(
          '_',
          disabled && 'disabled',
          checked === true && 'checked',
          checked === 'indeterminate' && 'indeterminate',
        ),
        this.props.className,
      )

      const value = typeof this.props.value === 'string' ? this.props.value : ''

      return (
        <label className={className} style={style} htmlFor={this.id}>
          <input
            id={this.id}
            disabled={disabled}
            type={type}
            onChange={this.handleChange}
            checked={checked}
          />
          <i className={checkinputClass('indicator', type)} />
          {children && <span>{children}</span>}
          {
            inputable && checked &&
            <Input
              className={checkinputClass('text')}
              onChange={this.handleInputChange}
              value={value}
            />
          }
        </label>
      )
    }
  }

  CheckItem.propTypes = {
    ...getProps(PropTypes, 'disabled'),
    checked: PropTypes.oneOfType([
      PropTypes.oneOf([true, false, 'indeterminate']),
      PropTypes.func,
    ]),
    inputable: PropTypes.bool,
    htmlValue: PropTypes.any,
    index: PropTypes.number,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.any,
  }

  CheckItem.defaultProps = {
    ...defaultProps,
    htmlValue: true,
  }

  return CheckItem
}
