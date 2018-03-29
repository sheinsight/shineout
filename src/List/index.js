import List from './List'
import hidable from '../hoc/hidable'

export default List
List.Collapse = hidable(List, ['collapse'])
List.Fade = hidable(List, ['fade'])
List.Translate = hidable(List, ['translate'])
