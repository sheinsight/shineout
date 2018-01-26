import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import { dropdownClass } from '../styles'

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { className, placeholder } = this.props

    let wrapClassName = dropdownClass('_')
    if (className) wrapClassName += ` ${className}`

    return (
      <div className={wrapClassName}>
        {placeholder}
        <div className={dropdownClass('menu')}>
          some text.
        </div>
      </div>
    )
  }
}

Dropdown.displayName = 'Dropdown'

Dropdown.propTypes = {
  children: PropTypes.any.isRequired,
  ...getProps('placeholder', 'type'),
}

Dropdown.defaultProps = {
  ...defaultProps,
  type: 'link',
}

export default Dropdown
