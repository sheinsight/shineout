import React, { ReactElement } from 'react'
import { isFunc } from '../utils/is'

export const getCustomList = (
  list: React.ReactNode,
  renderOptionList?: (list: React.ReactNode, info: { loading: React.ReactNode }) => ReactElement,
  loading?: React.ReactNode
) => {
  if (renderOptionList && isFunc(renderOptionList)) return renderOptionList(list, { loading })
  return list
}
