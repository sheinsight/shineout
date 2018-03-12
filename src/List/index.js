import List from './List'
import hidable from '../hoc/hidable'

export default List
List.Collapse = hidable(List, 216, ['collapse'])
List.Fade = hidable(List, 216, ['fade'])

