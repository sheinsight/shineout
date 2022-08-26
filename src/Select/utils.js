import { isFunc } from '../utils/is'

export const getCustomList = (list, renderOptionList, loading) => {
  if (renderOptionList && isFunc(renderOptionList)) return renderOptionList(list, { loading })
  return list
}
