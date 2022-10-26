import { compose } from '../utils/func'
import Datum from '../Datum'
import DList from './List'
import BaseItem from './BaseItem'
import Pagination from './Pagination'
import { ListType } from './Props'

const List: any = compose(
  Datum.hoc({
    bindProps: ['disabled', 'limit', 'format', 'prediction', 'distinct'],
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  }),
  Pagination
)(DList)

List.BaseItem = BaseItem

export default List as ListType
