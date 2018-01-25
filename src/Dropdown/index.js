import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { styleProps, placeholderProps, styleDefaultProps } from '../utils/proptypes'

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { placeholder } = this.props

    return (
      <div>
        {placeholder}
        <div>
          some text.
        </div>
      </div>
    )
  }
}

Dropdown.displayName = 'Dropdown'

Dropdown.propTypes = {
  children: PropTypes.any,
  ...placeholderProps,
  ...styleProps,
}

Dropdown.defaultProps = {
  ...styleDefaultProps,
}

export default Dropdown
