import React, { PropsWithChildren, ReactNode } from 'react'
import { keygenType, StandardProps, StructDataStandardProps } from '../@types/common'
import ListDatum from '../Datum/List'
import { GetInputableProps } from '../Form/Props'
import { GetDatumListProps } from '../Datum/Props'

export type CheckValueType = boolean | 'indeterminate'
export type CheckType = 'radio' | 'switch' | 'checkbox'
export interface CheckItemProps extends StandardProps {
  disabled?: boolean
  checked?: CheckValueType | ((htmlValue: any) => CheckValueType)
  inputable?: boolean
  htmlValue?: any
  index?: number
  onChange: ((value: any, checked?: CheckValueType, index?: number) => void)
  onRawChange?: (value: any, checked: CheckValueType) => void
  value?: any
  onClick?: React.MouseEventHandler<HTMLInputElement>
  size?: 'small' | 'default' | 'large'
  content?: [ReactNode, ReactNode] | []
}

export type SimpleCheckProps = Omit<CheckItemProps, 'content' | 'onChange'> & {
  onChange: ((value: any, checked: CheckValueType, index?: number) => void)
}
export type SimpleRadioProps = Omit<CheckItemProps, 'content' | 'onChange' | 'onRawChange' | 'inputable' | 'value'> & {
  checked?: boolean | ((htmlValue: any) => boolean)
  onChange?: ((value: any, checked: CheckValueType, index?: number) => void)
}
export type SimpleSwitchProps = Omit<CheckItemProps, 'onChange' | 'onRawChange' | 'inputable' | 'value'> & {
  checked?: boolean | ((htmlValue: any) => boolean)
  onChange: ((value: boolean) => void)
}

export interface CheckboxContextProvider {
  onRawChange: (value: any, checked: boolean | 'indeterminate') => void
  checked: boolean | 'indeterminate'
}

export type CheckboxProviderProps<U> = Omit<U, 'onRawChange'>

export interface CheckboxGroupProps<DataItem, Value>
  extends StandardProps,
    Pick<StructDataStandardProps<DataItem>, 'renderItem'> {
  keygen: keygenType<DataItem>
  block?: boolean
  datum: ListDatum<DataItem, Value>
  value?: Value
  data?: DataItem[]
  onChange: (value: Value) => void
}
export type GroupDatumArgsType = 'disabled' | 'format' | 'prediction' | 'separator'

export type InputCheckboxProps<Value> = PropsWithChildren<GetInputableProps<SimpleCheckProps, Value>>
export type InputCheckboxGroupProps<DataItem, Value> = PropsWithChildren<
  GetInputableProps<GetDatumListProps<CheckboxGroupProps<DataItem, Value>, DataItem, Value, GroupDatumArgsType>, Value>
>

export class CheckboxGroup<DataItem = any, Value = any> extends React.Component<
  InputCheckboxGroupProps<DataItem, Value>,
  {}
> {
  // @ts-ignore
  render(): JSX.Element
}

export declare class CheckboxClass<Value = any> extends React.Component<InputCheckboxProps<Value>, {}> {
  static Group: typeof CheckboxGroup

  render(): JSX.Element
}

export type CheckboxType = typeof CheckboxClass
