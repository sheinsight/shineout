import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox/Checkbox'
import Radio from '../Radio/Radio'
import { selectClass } from '../styles'

class BoxOption extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { data, onClick, isActive, index, disabled } = this.props

    if (this.locked || disabled) return
    this.locked = true

    onClick(!isActive, data, index)

    setTimeout(() => {
      this.locked = false
    }, 200)
  }

  render() {
    const { data, index, isActive, renderItem, columns, multiple, disabled } = this.props

    const className = selectClass('option')
    const width = `${(1 / columns) * 100}%`
    const Input = multiple ? Checkbox : Radio

    const result = renderItem(data, index)
    const title = typeof result === 'string' ? result : undefined

    return (
      <Input disabled={disabled} style={{ width }} checked={isActive} className={className} onChange={this.handleClick}>
        <span title={title}>{result}</span>
      </Input>
    )
  }
}

BoxOption.propTypes = {
  columns: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  multiple: PropTypes.bool,
  onClick: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
}

export default BoxOption
