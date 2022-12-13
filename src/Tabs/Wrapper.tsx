import React, { PureComponent } from 'react'
import Panel from './Panel'
import { Provider } from '../Sticky/context'
import { WrapperProps } from './Props'

class Wrapper extends PureComponent<WrapperProps> {
  render() {
    const { active, id, ...other } = this.props
    return (
      <Provider value={{ needResetPostion: id === active }}>
        <Panel {...other} isActive={id === active} />
      </Provider>
    )
  }
}

export default Wrapper
