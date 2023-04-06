import React from 'react'
import { RegularAttributes } from '../@types/common'

export const defaultProps: {
  className: string
  size: RegularAttributes.Size
  style: React.CSSProperties
  type: string
} = {
  className: '',
  size: 'default',
  style: {},
  type: 'default',
}
