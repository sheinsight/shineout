import icons from './index'
import config from '../config'

const { CaretLine, CaretFill } = icons
export default () => {
  if (config.caret === 'line') return CaretLine
  return CaretFill
}
