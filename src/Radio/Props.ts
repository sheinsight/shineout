import * as React from 'react'
import { GetInputableProps } from '../Form/Props'
import { GetDatumListProps } from '../Datum/Props'
import { RegularAttributes } from '../@types/common'
import { SimpleRadioProps } from '../Checkbox/Props'
import { KeygenType, StandardProps, StructDataStandardProps } from '../@types/common'
import ListDatum from '../Datum/List'

export interface RadioGroupProps<DataItem, Value>
  extends StandardProps,
    Pick<StructDataStandardProps<DataItem>, 'renderItem'> {
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
  RadioGroupProps<DataItem, Value>,
  DataItem,
  Value,
  GroupDatumArgsType
>
export type InputRadioGroupPropsWidthInputable<DataItem, Value> = GetInputableProps<
  InputRadioGroupPropsWidthDatum<DataItem, Value>,
  Value
>
export type InputRadioGroupProps<DataItem, Value> = InputRadioGroupPropsWidthInputable<DataItem, Value>

export declare class RadioGroup<DataItem, Value> extends React.Component<InputRadioGroupProps<DataItem, Value>, {}> {
  render(): JSX.Element
}

export declare class Radio extends React.Component<RadioProps, {}> {
  static Group: typeof RadioGroup

  render(): JSX.Element
}

export type RadioType = typeof Radio
