import React from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes';

class SubMenu extends React.Component {
  render() {
    return (
      <li>{this.props.data.content}
        <ul>
          {
            this.props.children
          }
        </ul>
      </li>
    )
  }
}

SubMenu.propTypes = {
  ...getProps(),
  data: PropTypes.object,
}

SubMenu.defaultProps = {
  ...defaultProps,
  data: {},
}

export default SubMenu