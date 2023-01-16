import React, { PropsWithChildren } from 'react'
import { GetInputableProps } from '../Form/Props'
import { SimpleSwitchProps, CheckboxProviderProps } from '../Checkbox/Props'

export type SwitchProps = PropsWithChildren<GetInputableProps<CheckboxProviderProps<SimpleSwitchProps>, boolean>>

export declare class Switch extends React.Component<SwitchProps, any> {
  render(): JSX.Element
}

export type SwitchType = typeof Switch
