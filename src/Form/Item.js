import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getGrid } from '../Grid/utils'
import { getProps, defaultProps } from '../utils/proptypes'
import { formClass } from '../styles'

class Item extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      children, grid, label, labelWidth,
    } = this.props

    const className = classnames(
      getGrid(grid),
      formClass('item'),
      this.props.className,
    )

    /* eslint-disable */
    return (
      <div className={className}>
        <label style={{width: labelWidth}} className={formClass('label')}>
          {label}
        </label>
        <div className={formClass('control')}>
          {children}
        </div>
      </div>
    )
    /* eslint-enable */
  }
}

Item.propTypes = {
  ...getProps('children', 'grid'),
  className: PropTypes.string,
  label: PropTypes.string,
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Item.defaultProps = {
  ...defaultProps,
}

export default Item
