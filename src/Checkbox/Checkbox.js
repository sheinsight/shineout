import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { checkboxClass } from '../styles'

class Checkbox extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked,
    }

    this.id = `cb_${getUidStr()}`

    this.handleChange = this.handleChange.bind(this)
  }

  get checked() {
    const { checked, value, htmlValue } = this.props
    if (checked !== undefined) return checked
    if (this.state.checked === undefined) return value === htmlValue
    return this.state.checked
  }

  getProp(key) {
    if (this.props[key] !== undefined) return this.props[key]
    return this.state[key]
  }

  handleChange(e) {
    const { htmlValue, onChange, index } = this.props
    const { checked } = e.target
    this.setState({ checked })
    const value = checked ? htmlValue : undefined
    if (onChange) onChange(value, checked, index)
  }

  render() {
    const { checked, disabled, style } = this.props
    const className = classnames(
      checkboxClass(
        '_',
        checked === true && 'checked',
        checked === 'indeterminate' && 'indeterminate',
      ),
      this.props.className,
    )

    return (
      <label className={className} style={style} htmlFor={this.id}>
        <i className={checkboxClass('indicator')} />
        <input
          id={this.id}
          disabled={disabled}
          type="checkbox"
          onChange={this.handleChange}
          checked={this.checked}
        />
      </label>
    )
  }
}

Checkbox.propTypes = {
  ...getProps('disabled'),
  checked: PropTypes.oneOf([true, false, 'indeterminate']),
  htmlValue: PropTypes.any,
  index: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.any,
}

Checkbox.defaultProps = {
  ...defaultProps,
  checked: false,
  htmlValue: true,
}

export default Checkbox
