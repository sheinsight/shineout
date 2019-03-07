import Container from '../Tooltip/Container'
import * as events from './events'
import Inside from './Inside'

const Popover = Container(events)
Popover.Inside = Inside

Popover.displayName = 'ShineoutPopover'

export default Popover
