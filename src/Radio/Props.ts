import * as React from 'react'
import { ReactNode } from 'react'
import { GetInputableProps } from '../Form/Props'
import { GetDatumListProps } from '../Datum/Props'
import { ObjectKey, RegularAttributes } from '../@types/common'
import { SimpleRadioProps } from '../Checkbox/Props'
import { KeygenType, StandardProps } from '../@types/common'
import ListDatum from '../Datum/List'

export interface BaseRadioGroupProps<DataItem, Value> extends StandardProps {
  children?: ReactNode
  /**
   * @en When it is a string, return d[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * @default  d => d
   */
  renderItem?: ObjectKey<DataItem> | ((data: DataItem, index?: number) => React.ReactNode)
  keygen: KeygenType<DataItem>
  block?: boolean
  button?: boolean | 'outline'
  datum: ListDatum<DataItem, Value>
  data?: DataItem[]
  size?: RegularAttributes.Size
  onChange: (value: Value, Data: DataItem) => void
  value: Value
}

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
export type RadioGroupProps<DataItem, Value> = InputRadioGroupProps<DataItem, Value>

export declare class RadioGroup<DataItem, Value> extends React.Component<RadioGroupProps<DataItem, Value>, {}> {
  render(): JSX.Element
}

export declare class Radio extends React.Component<RadioProps, {}> {
  static Group: typeof RadioGroup

  render(): JSX.Element
}

export type RadioType = typeof Radio
