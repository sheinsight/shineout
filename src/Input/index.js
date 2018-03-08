import Input from './Input'
import Number from './Number'
import itemHoc from '../Form/itemHoc'
import wrapper from './wrapper'
import { compose } from '../utils/func'

const wrap = component => compose(itemHoc, wrapper('label'))(component)

const exports = wrap(Input)
exports.Number = wrap(Number)

export default exports
