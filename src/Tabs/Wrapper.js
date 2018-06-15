import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Panel from './Panel'

class Wrapper extends PureComponent {
  render() {
    const { active, id, children } = this.props
    return (
      <Panel isActive={id === active}>{children}</Panel>
    )
  }
}

Wrapper.propTypes = {
  active: PropTypes.any,
  children: PropTypes.any,
  id: PropTypes.any,
}

export default Wrapper
