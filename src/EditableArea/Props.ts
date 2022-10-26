import React from 'react'
import { StandardProps, FormItemStandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import { TrimProps, GetTrimProps } from '../hoc/trim'

export interface EditableAreaProps extends StandardProps, FormItemStandardProps<string> {
  error?: Error
  bordered?: boolean
  disabled?: boolean
  clearable?: boolean
  placeholder: string
  width?: number | string
  maxHeight?: number | string
  innerTitle: React.ReactNode
  placeTitle: React.ReactNode
  onBlur?: (e: MouseEvent) => void
  onFocus?: (e: MouseEvent) => void
  getPopupContainer?: () => HTMLElement
  onShowTextareaChange: (value: boolean) => void
  renderFooter?: (value: string) => React.ReactNode
  renderResult?: (value: string) => React.ReactNode
}

export type Props<Value> = GetInputableProps<GetTrimProps<a>, Value>

export class EditableAreaClass<Value> extends React.Component<Props<Value>, {}> {
  // @ts-ignore
  render(): JSX.Element
}

export type EditableAreaType = typeof EditableAreaClass
