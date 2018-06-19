import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Panel from './Panel'

class Wrapper extends PureComponent {
  render() {
    const { active, id, ...other } = this.props
    return (
      <Panel {...other} isActive={id === active} />
    )
  }
}

Wrapper.propTypes = {
  active: PropTypes.any,
  children: PropTypes.any,
  id: PropTypes.any,
}

export default Wrapper
