import React from 'react'
import { FormError } from '../utils/errors'
import FormDatum from '../Datum/Form'
import { ForceAdd, ObjectType } from '../@types/common'
import { FormItemRule } from '../Rule/interface'

export interface FieldSetProviderValueType {
  path?: string
  val?: () => Promise<FormError | true>
}

export interface FieldSetProps<Value extends any[]> {
  defaultValue?: Value
  empty?: (Insert: (index: number, value: Value) => void) => React.ReactNode
  formDatum: FormDatum<ObjectType>
  name: string
  onError: (error?: Error) => void
  rules: FormItemRule<any>
}

export type GetFieldSetConsumerProps<U> = Omit<U, 'innerFormNamePath' | 'fieldSetValidate'>

export interface FormContextValue {
  formDatum: FormDatum<ObjectType>
  formMode?: string
  disabled?: any
  labelAlign?: 'top' | 'left' | 'right'
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  size?: 'small' | 'default' | 'large'
  labelWidth?: string | number
  combineRules: <U>(name: string, rule: FormItemRule<U>) => FormItemRule<U>
  keepErrorHeight: boolean
}
export interface FormProviderProps<V extends ObjectType> {
  datum: FormDatum<V>
  disabled?: boolean | ((...args: any) => boolean)
  labelAlign?: 'top' | 'left' | 'right'
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  size?: 'small' | 'default' | 'large'
  labelWidth?: number | string
  mode?: string
  pending?: boolean
  rules?: FormItemRule<any>
  keepErrorHeight: boolean
}

type FilterFormContextValue =
  | 'formDatum'
  | 'formMode'
  | 'labelAlign'
  | 'labelVerticalAlign'
  | 'labelWidth'
  | 'combineRules'
  | 'keepErrorHeight'
export type GetFormProviderConsumerProps<U> = Omit<U, FilterFormContextValue>

export interface FormItemContextValue {
  onItemError?: (id: string, error?: Error) => void
  bindInputToItem?: (name: string) => void
  unbindInputFromItem?: (name: string) => void
}

export type GetFormItemConsumerProps<U> = Omit<U, keyof FormItemContextValue>

export interface BaseInputProps {
  value?: any
  onChange?: any
}

export interface InputableProps<Value> {
  beforeChange?: (value: Value | undefined, datum: FormDatum<ObjectType>) => Value | undefined
  onChange?: (value: Value | undefined, ...rest: any) => void
  onError?: (e?: Error) => void
  popover?: string
  value?: Value
  error?: Error
  // readOnly?: boolean
  disabled?: boolean
  filterSameChange?: boolean
  combineRules?: (name: string, rules?: FormItemRule<Value>) => FormItemRule<Value>
  required?: boolean
  bind?: string[]
  onItemError?: (id: string, error?: Error) => void
  bindInputToItem?: (name: string) => void
  unbindInputFromItem?: (name: string) => void
  scuSkip?: string[]
  defaultValue?: Value
  reserveAble?: boolean
  rules?: FormItemRule<Value>
  formDatum?: FormDatum<ObjectType>
  fieldSetValidate?: (validator: boolean) => void
  name?: string | string[]
  forceChangeOnValueSet?: boolean
}
// export type InputableFilterType =
//   | 'required'
//   | 'bind'
//   | 'onItemError'
//   | 'bindInputToItem'
//   | 'unbindInputFromItem'
//   | 'scuSkip'
//   | 'defaultValue'
//   | 'reserveAble'

// 过滤掉原生属性required
type InputablePropsFiltered<Value> = Omit<InputableProps<Value>, 'required'>
// value 和 onChange 变为可选属性
type HandleValueProps<Props extends BaseInputProps> = Omit<Props, 'value' | 'onChange'> &
  Partial<Pick<Props, 'value' | 'onChange'>>
// inputable 中增加一些属性
type AddInputProps<Props extends BaseInputProps, Value> = ForceAdd<
  HandleValueProps<Props>,
  InputablePropsFiltered<Value>
>
// consumer
export type GetInputableProps<Props extends BaseInputProps, Value> = GetFormItemConsumerProps<
  GetFieldSetConsumerProps<GetFormProviderConsumerProps<AddInputProps<Props, Value>>>
>
