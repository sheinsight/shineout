import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Panel from './Panel'
import { Provider } from '../Sticky/context'

class Wrapper extends PureComponent {
  render() {
    const { active, id, ...other } = this.props
    return (
      <Provider value={{ needResetPostion: id === active }}>
        <Panel {...other} isActive={id === active} />
      </Provider>
    )
  }
}

Wrapper.propTypes = {
  active: PropTypes.any,
  children: PropTypes.any,
  id: PropTypes.any,
}

export default Wrapper
