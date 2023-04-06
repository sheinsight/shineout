import icons from './index'
import config from '../config'
import configable from '../hoc/config'
import cssAccessor from '../utils/css-accessors'
import { CartType } from './Props'

let cachedCaret: JSX.Element
const caretMap: Record<CartType, JSX.Element> = {
  line: icons.CaretLine,
  fill: icons.CaretFill,
}
export default configable(() => {
  if (config.caret) return caretMap[config.caret]
  if (cachedCaret) return cachedCaret
  cachedCaret = caretMap[cssAccessor.common.caret as CartType]
  return cachedCaret || icons.CaretFill
}, 'caret')
