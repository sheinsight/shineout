import React from 'react'
import Container from '../Tooltip/Container'
import * as events from './events'
import Panel from './Panel'
import Confirm from './Confirm'
import Content from './Content'

const Component = Container(events)

function Popover(props) {
  // eslint-disable-next-line
  if (props.content) return <Component {...props} />
  return <Panel {...props} />
}

Popover.displayName = 'ShineoutPopover'
Popover.Confirm = Confirm
Popover.Confirm.displayName = 'ShineoutPopoverConfirm'
Popover.Content = Content

export default Popover
