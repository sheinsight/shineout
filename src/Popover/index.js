import React from 'react'
import Container from '../Tooltip/Container'
import * as events from './events'
import Panel from './Panel'

const Component = Container(events)

function Popover(props) {
  // eslint-disable-next-line
  if (props.content) return <Component {...props} />
  return <Panel {...props} />
}

Popover.displayName = 'ShineoutPopover'

export default Popover
