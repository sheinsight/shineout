import React from 'react'
import { StandardProps, FormItemStandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'

export interface EditableAreaProps extends StandardProps, FormItemStandardProps<string> {
  error?: Error
  bordered?: boolean
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  width?: number | string
  maxHeight?: number | string
  innerTitle?: React.ReactNode
  placeTitle?: React.ReactNode
  onBlur?: (e: React.FocusEvent) => void
  onFocus?: (e: React.FocusEvent) => void
  getPopupContainer?: () => HTMLElement
  onShowTextareaChange?: (value: boolean) => void
  renderFooter?: (value: string) => React.ReactNode
  renderResult?: (value: string) => React.ReactNode
}

export type Props = GetInputableProps<EditableAreaProps, string>

export declare class EditableAreaClass extends React.Component<Props, {}> {
  render(): JSX.Element
}

export type EditableAreaType = typeof EditableAreaClass
