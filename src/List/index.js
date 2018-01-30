import List from './List'
import hidable from '../hoc/hidable'

export default List

export const CollapseList = hidable(List, 216, ['collapse', 'fade'])
export const FadeList = hidable(List, 450, ['fade'])
