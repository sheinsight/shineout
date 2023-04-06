import * as React from 'react'
import { ReactNode } from 'react'
import { GetInputableProps } from '../Form/Props'
import { GetDatumListProps } from '../Datum/Props'
import { ObjectKey, RegularAttributes } from '../@types/common'
import { SimpleRadioProps } from '../Checkbox/Props'
import { KeygenType, StandardProps } from '../@types/common'
import ListDatum from '../Datum/List'

export interface BaseRadioGroupProps<DataItem, Value> extends StandardProps {
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en You can pass in a set of Radio
   * @cn 可以传入一组Radio
   */
  children?: ReactNode
  /**
   * @en When it is a string, return d\\[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d\\[string]。 为 function 时，返回函数结果
   * @default  d => d
   */
  renderItem?: ObjectKey<DataItem> | ((data: DataItem, index?: number) => React.ReactNode)
  /**
   * @en Key generator
   * When it is true, the data itself is used as the key equivalent to (d => d)
   * When it is a function, use its return value.
   * When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   *
   * @cn 生成每一项key的辅助方法
   * 为 true 时，以数据项本身作为key，相当于 (d => d)
   * 为函数时，使用此函数返回值
   * 为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   */
  keygen: KeygenType<DataItem>
  /**
   * @en The default is horizontal layout and setting the block property can changed it to be vertical layout.
   * @cn 默认为水平布局，设置 block 属性可以改为垂直布局
   */
  block?: boolean
  /**
   * @en set button to show button style
   * @cn 设置 button 属性可以展示为按钮样式
   */
  button?: boolean | 'outline'
  datum: ListDatum<DataItem, Value>
  /**
   * @en the data items
   * @cn 数据项
   * @override any[]
   */
  data?: DataItem[]
  /**
   * @en size
   * @cn 尺寸
   * @override union
   * @default 'defaule'
   */
  size?: RegularAttributes.Size
  /**
   * @en The callback function for changing value
   * @cn 值改变回调函数
   */
  onChange: (value: Value, Data: DataItem) => void
  /**
   * @en In the Form, value is taken over by the Form and the value will be invalid.
   * @cn 在 Form中，value 会被表单接管，value 无效
   * @override any
   */
  value: Value
}

/**
 * @title Radio
 * @en Radio cannot be used alone.
 * @cn Radio 不能单独使用
 */
export type RadioProps = SimpleRadioProps

export type GroupDatumArgsType = 'disabled' | 'format' | 'prediction'

export type InputRadioGroupPropsWidthDatum<DataItem, Value> = GetDatumListProps<
  BaseRadioGroupProps<DataItem, Value>,
  DataItem,
  Value,
  GroupDatumArgsType
>
export type InputRadioGroupPropsWidthInputable<DataItem, Value> = GetInputableProps<
  InputRadioGroupPropsWidthDatum<DataItem, Value>,
  Value
>
export type InputRadioGroupProps<DataItem, Value> = InputRadioGroupPropsWidthInputable<DataItem, Value>
/**
 * @title Radio.Group
 */
export type RadioGroupProps<DataItem, Value> = Omit<InputRadioGroupProps<DataItem, Value>, 'filterSameChange'>

export declare class RadioGroup<DataItem, Value> extends React.Component<RadioGroupProps<DataItem, Value>, {}> {
  render(): JSX.Element
}

export declare class Radio extends React.Component<RadioProps, {}> {
  static Group: typeof RadioGroup

  render(): JSX.Element
}

export type RadioType = typeof Radio
