import React from 'react'
import { GetInputableProps } from '../Form/Props'
import { SimpleSwitchProps, CheckboxProviderProps } from '../Checkbox/Props'

export type SwitchPropsWithInput = GetInputableProps<CheckboxProviderProps<SimpleSwitchProps>, boolean>
/**
 * @title Switch
 */
export type SwitchProps = Omit<SwitchPropsWithInput, 'filterSameChange'>

export declare class Switch extends React.Component<SwitchProps, any> {
  render(): JSX.Element
}

export type SwitchType = typeof Switch
