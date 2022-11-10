import {GetInputableProps} from "../Form/Props"
import {SimpleSwitchProps, CheckboxProviderProps} from '../Checkbox/Props'
import React, { PropsWithChildren } from "react"




export type InputSwitchProps = PropsWithChildren<GetInputableProps<CheckboxProviderProps<SimpleSwitchProps>, boolean>>

export class Switch extends React.Component<InputSwitchProps, any>{
  // @ts-ignore
  render(): JSX.Element
}

export type SwitchType = typeof Switch
