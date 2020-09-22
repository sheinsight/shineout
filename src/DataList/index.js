import { compose } from '../utils/func'
import Datum from '../Datum'
import List from './List'

export default compose(
  Datum.hoc({
    bindProps: ['disabled', 'limit', 'format'],
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  })
)(List)
