import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from '../utils/uid'
import { paginationClass } from './styles'
import Input from '../Input'
import { getDirectionClass } from '../utils/classname'

const inputStyle = { width: 60, display: 'inline-block' }
const inheritStyle = { color: 'inherit' }

const nofunc = () => {}

class Jumper extends PureComponent {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.renderRequire = getUidStr()
  }

  getMax() {
    const { total, pageSize } = this.props
    return Math.ceil(total / pageSize) || 1
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      let current = parseInt(e.target.value, 10)
      this.autoFocus = true

      if (!Number.isFinite(current)) return
      if (current < 1) current = 1
      this.renderRequire = getUidStr()

      const max = this.getMax()
      if (current > max) current = max

      if (current === this.props.current) {
        this.forceUpdate()
      }
      this.props.onChange(current)
    }
  }

  render() {
    const { current, text, size, isSimple } = this.props

    let txt = text.jumper ? text.jumper.split('{input}') : []
    if (isSimple) {
      const spanClass = paginationClass('simple-span')
      txt = [
        [],
        [
          <span key="separator" className={spanClass}>
            /
          </span>,
          <span key="pageMax" className={spanClass}>
            {this.getMax()}
          </span>,
        ],
      ]
    }

    return (
      <div className={paginationClass(getDirectionClass('section'))}>
        <span style={inheritStyle}>{txt[0]}</span>
        <Input
          key={this.renderRequire}
          value={current}
          onChange={nofunc}
          autoFocus={this.autoFocus}
          onKeyDown={this.handleKeyDown}
          digits={0}
          type="number"
          style={inputStyle}
          size={size}
          className={paginationClass(isSimple && 'simple-input')}
          delay={400}
        />
        <span style={inheritStyle}>{txt[1]}</span>
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
  isSimple: PropTypes.bool,
}

export default Jumper
