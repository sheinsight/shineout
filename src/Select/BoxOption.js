import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getGrid } from '../Grid/utils'
import Checkbox from '../Checkbox/Checkbox'
import { selectClass } from '../styles'

class BoxOption extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const {
      data, onClick, isActive, index, disabled,
    } = this.props

    if (this.locked || disabled) return
    this.locked = true

    onClick(!isActive, data, index)

    setTimeout(() => {
      this.locked = false
    }, 200)
  }

  render() {
    const {
      data, index, isActive, renderItem, columns,
    } = this.props

    const className = classnames(selectClass('option'), getGrid(1 / columns))

    return (
      <Checkbox checked={isActive} className={className} onChange={this.handleClick}>
        {renderItem(data, index)}
      </Checkbox>
    )
  }
}

BoxOption.propTypes = {
  columns: PropTypes.number,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
}

export default BoxOption
