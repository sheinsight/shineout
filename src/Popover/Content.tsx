import React from 'react'
import Panel from './Panel'
import { PopoverContentProps } from './Props'

function Content(props: PopoverContentProps) {
  // eslint-disable-next-line
  return <Panel {...props} useTextStyle />
}

export default Content
