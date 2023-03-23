import React, { PropsWithChildren, ReactNode } from 'react'
import { KeygenType, ObjectKey, RegularAttributes, StandardProps } from '../@types/common'
import ListDatum from '../Datum/List'
import { GetInputableProps } from '../Form/Props'
import { GetDatumListProps } from '../Datum/Props'

export type CheckValueType = boolean | 'indeterminate'
export type CheckType = 'radio' | 'switch' | 'checkbox'
export interface CheckItemProps extends StandardProps {
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en content
   * @cn 内容
   */
  children?: ReactNode
  /**
   * @en disable checkbox
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @en loading
   * @cn 加载中
   * @default false
   */
  loading?: boolean
  /**
   * @en if not set, use (value === htmlValue).
   * @cn checked 传入时为受控组件
   */
  checked?: CheckValueType | ((htmlValue: any) => CheckValueType)

  /**
   * @en Show input
   * @cn 开启后出现输入框
   * @default false
   */
  inputable?: boolean

  /**
   * @en Specifies the result
   * @cn 选中时返回值
   * @default true
   */
  htmlValue?: any
  /**
   * @inner 内部属性
   */
  index?: number
  /**
   * @en When selected, value is htmlValue and checked is true.\nWhen not selected, value is undefined and checked is false.
   * @cn 选中时，value 为 htmlValue，checked 为 true\n未选中时，value 为 undefined，checked 为 false
   *
   */
  onChange?: ((value: any, checked?: CheckValueType, index?: number) => void)
  /**
   * @inner 内部属性
   */
  onRawChange?: (value: any, checked: CheckValueType) => void
  /**
   * @en If checked is not set, checked status is value === htmlValue
   * @cn 如果 checked 未设置，checked 状态为 value === htmlValue
   *
   */
  value?: any

  /**
   * @en Checkbox click callback
   * @cn 勾选框点击回调
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>
  /**
   * @en size
   * @cn 尺寸
   * @default 'default'
   * @override union
   */
  size?: RegularAttributes.Size
  /**
   * @en content with checked and unchecked
   * @cn 选中和未选中时的内容
   */
  content?: [ReactNode, ReactNode] | []
}

export type SimpleCheckProps = Omit<CheckItemProps, 'content' | 'onChange' | 'loading' | 'small'> & {
  /**
   * @en value chane callback
   * @cn 值改变回调函数
   */
  onChange?: ((value: any, checked: CheckValueType, index?: number) => void)
}
export type SimpleRadioProps = Omit<
  CheckItemProps,
  'content' | 'onChange' | 'onRawChange' | 'inputable' | 'value' | 'loading'
> & {
  checked?: boolean | ((htmlValue: any) => boolean)
  /**
   * @inner 内部属性
   */
  onChange?: ((value: any, checked: CheckValueType, index?: number) => void)
}
export type SimpleSwitchProps = Omit<
  CheckItemProps,
  'onChange' | 'onRawChange' | 'inputable' | 'value' | 'children' | 'checked' | 'htmlValue'
> & {
  /**
   * @en checked status，will in control when pass
   * @cn 当前选中状态，checked 传入时为受控组件
   */
  checked?: boolean
  /**
   * @en checked is status
   * @cn checked 表示选中状态
   */
  onChange?: ((value: boolean) => void)
  /**
   * @en set while no checked
   * @cn checked 未设置的情况下， checked = value
   */
  value?: boolean
}

export interface CheckboxContextProvider {
  onRawChange: (value: any, checked: boolean | 'indeterminate') => void
  checked: boolean | 'indeterminate'
}

export type CheckboxProviderProps<U> = Omit<U, 'onRawChange'>

export interface BaseCheckboxGroupProps<DataItem, Value> extends StandardProps {
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en Checkbox instance
   * @cn Checkbox 实例
   */
  children?: ReactNode
  /**
   * @en When it is a string, return d\\[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d\\[string]。 为 function 时，返回函数结果
   * @default d => d
   */
  renderItem?: ObjectKey<DataItem> | ((data: DataItem, index?: number) => React.ReactNode)
  /**
   * @en Key generator\nWhen it is true, the data itself is used as the key equivalent to (d => d)\nWhen it is a function, use its return value.\nWhen it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成每一项key的辅助方法\n为 true 时，以数据项本身作为key，相当于 (d => d)\n为函数时，使用此函数返回值\n为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   */
  keygen: KeygenType<DataItem>
  /**
   * @en The default is horizontal layout, and setting the block property can change it to be vertical layout.
   * @cn 垂直布局
   * @default false
   */
  block?: boolean
  /**
   * @inner 内部属性
   */
  datum: ListDatum<DataItem, Value>
  /**
   * @en In the Form, the value will be taken over by the form and the value will lose efficacy.
   * @cn 在Form中，value会被表单接管，value无效
   * @override any
   */
  value?: Value
  /**
   * @en data
   * @cn 数据项
   * @override any[]
   */
  data?: DataItem[]
  /**
   * @en value change callback
   * @cn 值改变回调
   */
  onChange: (value: Value) => void
}
export type GroupDatumArgsType = 'disabled' | 'format' | 'prediction' | 'separator'

type InputCheckboxProps<Value> = PropsWithChildren<GetInputableProps<SimpleCheckProps, Value>>
/**
 * @title Checkbox
 */
export type CheckboxProps<Value> = Omit<InputCheckboxProps<Value>, 'filterSameChange' | 'popover'>
type InputCheckboxGroupProps<DataItem, Value> = PropsWithChildren<
  GetInputableProps<
    GetDatumListProps<BaseCheckboxGroupProps<DataItem, Value>, DataItem, Value, GroupDatumArgsType>,
    Value
  >
>

/**
 * @title Checkbox.Group
 */
export type CheckboxGroupProps<DataItem, Value> = Omit<
  InputCheckboxGroupProps<DataItem, Value>,
  'filterSameChange' | 'popover'
>

export declare class CheckboxGroup<DataItem = any, Value = any> extends React.Component<
  CheckboxGroupProps<DataItem, Value>,
  {}
> {
  render(): JSX.Element
}

export declare class CheckboxClass<Value = any> extends React.Component<CheckboxProps<Value>, {}> {
  static Group: typeof CheckboxGroup

  render(): JSX.Element
}

export type CheckboxType = typeof CheckboxClass
