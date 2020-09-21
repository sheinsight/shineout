import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CheckboxAll from '../Table/CheckboxAll'
import { listClass } from '../styles'

class Header extends Component {
  constructor(props) {
    super(props)
    this.getChecked = this.getChecked.bind(this)
  }

  getChecked(checked) {
    const { datum } = this.props
    if (checked === 0 || !checked) return 0
    console.log(datum.length)
    return 1
  }

  render() {
    const { disabled, datum, data, checked } = this.props
    return (
      <div className={listClass('header')}>
        <CheckboxAll disabled={disabled} data={data} datum={datum} getChecked={this.getChecked} />
        <div className={listClass('checked-text')}>{`已选择${checked || 0}个`}</div>
      </div>
    )
  }
}

Header.propTypes = {
  disabled: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object,
  checked: PropTypes.number,
}

export default Header
