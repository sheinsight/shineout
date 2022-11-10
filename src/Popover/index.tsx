import _Popover from './Panel'
import Confirm from './Panel'
import Content from './Content'

import { PopoverType } from './Props'

const Popover: any = _Popover
Popover.displayName = 'ShineoutPopover'
Popover.Confirm = Confirm
Popover.Confirm.displayName = 'ShineoutPopoverConfirm'
Popover.Content = Content
Popover.Content.displayName = 'ShineoutPopoverContent'

export default Popover as PopoverType
