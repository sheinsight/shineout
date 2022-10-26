import React from 'react'
import { StandardProps, RegularAttributes, CommonProps, StructDataStandardProps } from '../@types/common'

export type TriggerType = 'click' | 'hover'

export type DropdownItem = DropdownNode | React.ReactNode

export interface DropdownNode {
  url?: string
  target?: string
  disabled?: boolean
  content?: React.ReactNode
  children?: DropdownItem[]
  onClick?: (data: DropdownNode) => void
  renderItem?: (data: DropdownNode) => void
}

export interface DropdownProps
  extends StandardProps,
    Pick<StructDataStandardProps<DropdownNode>, 'renderItem'>,
    Pick<CommonProps, 'absolute'> {
  hover?: boolean
  isSub?: boolean
  columns?: number
  outline?: boolean
  disabled?: boolean
  animation?: boolean
  data: DropdownItem[]
  trigger?: TriggerType
  placeholder?: React.ReactNode
  size?: RegularAttributes.Size
  type?: RegularAttributes.Type | 'link'
  onClick?: (data: DropdownNode) => void
  width?: number
  position?:
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'auto'
}


export class DropdownClass extends React.Component<DropdownProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}

export type DropdownType = typeof DropdownClass