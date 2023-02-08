import React, { PropsWithChildren, ReactNode } from 'react'
import { KeygenType, LiteralUnion, StandardProps } from '../@types/common'
import ListDatum from '../Datum/List'
import { GetInputableProps } from '../Form/Props'
import { GetDatumListProps } from '../Datum/Props'

export type CheckValueType = boolean | 'indeterminate'
export type CheckType = 'radio' | 'switch' | 'checkbox'
export interface CheckItemProps extends StandardProps {
  children?: ReactNode
  /**
   * disable checkbox
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean

  /**
   * if not set, use (value === htmlValue).
   *
   * checked 传入时为受控组件
   *
   * default: -
   */
  checked?: CheckValueType | ((htmlValue: any) => CheckValueType)

  /**
   * Show input
   *
   * 开启后出现输入框
   *
   * default: false
   */
  inputable?: boolean

  /**
   * Specifies the result
   *
   * 选中时返回值
   *
   * default: true
   */
  htmlValue?: any
  index?: number

  /**
   * value is datum.getValue()
   *
   * value 为 datum.getValue()
   *
   * default: -
   */
  onChange?: ((value: any, checked?: CheckValueType, index?: number) => void)
  onRawChange?: (value: any, checked: CheckValueType) => void
  value?: any

  /**
   * Checkbox click callback
   *
   * 勾选框点击回调
   *
   * default: false
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>
  size?: 'small' | 'default' | 'large'
  content?: [ReactNode, ReactNode] | []
}

export type SimpleCheckProps = Omit<CheckItemProps, 'content' | 'onChange'> & {
  onChange?: ((value: any, checked: CheckValueType, index?: number) => void)
}
export type SimpleRadioProps = Omit<CheckItemProps, 'content' | 'onChange' | 'onRawChange' | 'inputable' | 'value'> & {
  checked?: boolean | ((htmlValue: any) => boolean)
  onChange?: ((value: any, checked: CheckValueType, index?: number) => void)
}
export type SimpleSwitchProps = Omit<
  CheckItemProps,
  'onChange' | 'onRawChange' | 'inputable' | 'value' | 'children'
> & {
  checked?: boolean | ((htmlValue: any) => boolean)
  onChange?: ((value: boolean) => void)
}

export interface CheckboxContextProvider {
  onRawChange: (value: any, checked: boolean | 'indeterminate') => void
  checked: boolean | 'indeterminate'
}

export type CheckboxProviderProps<U> = Omit<U, 'onRawChange'>

export interface BaseCheckboxGroupProps<DataItem, Value> extends StandardProps {
  children?: ReactNode
  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   *
   * 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   *
   * default: d => d
   */
  renderItem?: LiteralUnion<DataItem> | ((data: DataItem, index?: number) => React.ReactNode)
  keygen: KeygenType<DataItem>

  /**
   * The default is horizontal layout, and setting the block property can change it to be vertical layout.
   *
   * 垂直布局
   *
   * default: false
   */
  block?: boolean
  datum: ListDatum<DataItem, Value>

  /**
   * In the Form, the value will be taken over by the form and the value will lose efficacy.
   *
   * 在Form中，value会被表单接管，value无效
   *
   * default: -
   */
  value?: Value
  data?: DataItem[]
  onChange: (value: Value) => void
}
export type GroupDatumArgsType = 'disabled' | 'format' | 'prediction' | 'separator'

type InputCheckboxProps<Value> = PropsWithChildren<GetInputableProps<SimpleCheckProps, Value>>
export type CheckboxProps<Value> = InputCheckboxProps<Value>
type InputCheckboxGroupProps<DataItem, Value> = PropsWithChildren<
  GetInputableProps<
    GetDatumListProps<BaseCheckboxGroupProps<DataItem, Value>, DataItem, Value, GroupDatumArgsType>,
    Value
  >
>
export type CheckboxGroupProps<DataItem, Value> = InputCheckboxGroupProps<DataItem, Value>

export class CheckboxGroup<DataItem = any, Value = any> extends React.Component<
  CheckboxGroupProps<DataItem, Value>,
  {}
> {
  // @ts-ignore
  render(): JSX.Element
}

export declare class CheckboxClass<Value = any> extends React.Component<CheckboxProps<Value>, {}> {
  static Group: typeof CheckboxGroup

  render(): JSX.Element
}

export type CheckboxType = typeof CheckboxClass
