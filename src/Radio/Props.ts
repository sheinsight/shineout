import { PropsWithChildren } from "react"
import { GetInputableProps } from "../Form/Props"
import { GetDatumListProps } from "../Datum/Props"
import { RegularAttributes } from "../@types/common"
import {
  SimpleRadioProps
} from "../Checkbox/Props"
import { keygenType, StandardProps, StructDataStandardProps } from "../@types/common"
import ListDatum from "../Datum/List"
import * as React from "react"

export interface RadioGroupProps<DataItem, Value > extends StandardProps,  Pick<StructDataStandardProps<DataItem>, 'renderItem'> {
  keygen: keygenType<DataItem>
  block?: boolean,
  button?: boolean | 'outline',
  datum: ListDatum<DataItem, Value>,
  data?: DataItem[]
  size?: RegularAttributes.Size
  onChange?: (value: Value, Data: DataItem) => void
}





export type RadioProps = PropsWithChildren<SimpleRadioProps>

export type GroupDatumArgsType = 'disabled' | 'format' | 'prediction'

export type InputRadioGroupProps<DataItem, Value> = PropsWithChildren<
  GetInputableProps<GetDatumListProps<RadioGroupProps<DataItem, Value>, DataItem, Value, GroupDatumArgsType>, Value>
  >

export class RadioGroup<DataItem, Value> extends React.Component<InputRadioGroupProps<DataItem, Value>, {}> {
  // @ts-ignore
  render(): JSX.Element;
}


export class Radio extends React.Component<RadioProps, {}> {
  static Group: typeof RadioGroup;

  // @ts-ignore
  render(): JSX.Element;
}


export type RadioType = typeof Radio
