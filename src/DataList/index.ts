import { compose } from '../utils/func'
import Datum from '../Datum'
import DList from './List'
import BaseItem from './BaseItem'
import Pagination from './Pagination'
import { DataListDatumKey, ListType } from './Props'

const bindKeys: DataListDatumKey[] = ['disabled', 'limit', 'format', 'prediction', 'distinct']
const List: any = compose(
  Datum.hoc({
    bindProps: bindKeys,
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  }),
  Pagination
)(DList)

List.BaseItem = BaseItem

export default List as ListType
