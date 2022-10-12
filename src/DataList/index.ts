import { compose } from '../utils/func'
import Datum from '../Datum'
import DList from './List'
import BaseItem from './BaseItem'
import Pagination from './Pagination'
import { ListProps } from './interface'

const List: React.ComponentType<ListProps<any, any>> & { BaseItem: typeof BaseItem } = compose(
  Datum.hoc({
    bindProps: ['disabled', 'limit', 'format', 'prediction', 'distinct'],
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  }),
  Pagination
)(DList)

List.BaseItem = BaseItem

export default List
