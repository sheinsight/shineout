import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from '../utils/uid'
import { paginationClass } from '../styles'
import Input from '../Input'

const inputStyle = { width: 60, display: 'inline-block' }

class Jumper extends PureComponent {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.renderRequire = getUidStr()
  }

  getMax() {
    const { total, pageSize } = this.props
    return Math.ceil(total / pageSize)
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      let current = parseInt(e.target.value, 10)

      if (!Number.isFinite(current)) return
      if (current < 1) current = 1

      const max = this.getMax()
      if (current > max) current = max

      if (current === this.props.current) {
        this.renderRequire = getUidStr()
        this.forceUpdate()
      }
      this.props.onChange(current)
    }
  }

  render() {
    const { current, text, size } = this.props
    const txt = text.jumper ? text.jumper.split('{input}') : []

    return (
      <div className={paginationClass('section')}>
        {txt[0]}
        <Input
          data-unique={this.renderRequire}
          value={current}
          onKeyDown={this.handleKeyDown}
          digits={0}
          type="number"
          style={inputStyle}
          size={size}
        />
        {txt[1]}
      </div>
    )
  }
}

Jumper.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
  size: PropTypes.string,
}

export default Jumper
