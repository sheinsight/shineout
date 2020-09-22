import { compose } from '../utils/func'
import Datum from '../Datum'
import DList from './List'
import Meta from './Meta'

const List = compose(
  Datum.hoc({
    bindProps: ['disabled', 'limit', 'format'],
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  })
)(DList)

List.Meta = Meta

export default List
