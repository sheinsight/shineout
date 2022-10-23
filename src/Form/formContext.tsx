import React, { ComponentType, PureComponent } from "react"
import createReactContext from '../context'
import { deepGet } from '../utils/objects'
import { isObject, isArray } from '../utils/is'
import {  RuleParamsType } from "../Rule"
import { ObjectType } from "../@types/common"
import { FormContextValue, FormProviderProps, GetFormProviderConsumerProps } from './Props'


// 去掉独有的属性
const context = createReactContext<FormContextValue>({} as FormContextValue)

// eslint-disable-next-line
export const Provider = context.Provider
// eslint-disable-next-line
export const Consumer = context.Consumer

export const formProvider = <FormValue, U extends FormProviderProps<FormValue>,>(Origin: React.ComponentType<U>): ComponentType<U> => {
  class FormProvider extends PureComponent<U> {
    constructor(props:U) {
      super(props)
      this.combineRules = this.combineRules.bind(this)
      // this.groupValidate = this.groupValidate.bind(this)
    }


    combineRules<ItemValue>(name: string, propRules: RuleParamsType<ItemValue>) {
      const { rules } = this.props
      let newRules: RuleParamsType<ItemValue> = []
      if (isObject(rules) && name) {
        newRules = (deepGet(rules as ObjectType, name) || []) as RuleParamsType<ItemValue>
      } else if (isArray(rules)) {
        newRules = rules
      }

      if (isArray(propRules)) {
        newRules = newRules.concat(propRules)
      }

      return newRules
    }

    // groupValidate(name) {
    // not implement...
    // }

    render() {
      const {
        datum,
        labelAlign,
        labelVerticalAlign,
        labelWidth,
        disabled,
        pending,
        mode,
        size,
        keepErrorHeight,
      } = this.props
      const value = {
        formDatum: datum,
        formMode: mode,
        disabled: !!(disabled || pending),
        labelAlign,
        labelVerticalAlign,
        labelWidth,
        size,
        combineRules: this.combineRules,
        // groupValidate: this.groupValidate,
        keepErrorHeight,
      }

      return (
        <Provider value={value}>
          <Origin {...this.props} />
        </Provider>
      )
    }
  }

  return FormProvider
}

export interface FormConsumerProps {
  disabled?: boolean | ((...args: any) => boolean)
}


export const formConsumer =

  (keys: (keyof FormContextValue)[]) =>
    <U extends FormConsumerProps>(Origin: ComponentType<U>): React.FC<GetFormProviderConsumerProps<U>> => (props:U) => {
  const filterProps = (value?: ObjectType) => {
    const cps: ObjectType = {}
    if (!value) return cps
    if (!keys) return value

    keys.forEach((k) => {
      const val = value[k as any]
      if (val !== undefined) cps[k as any] = val
    })
    return cps
  }

  return (
    <Consumer>
      {value => {
        const formProps = filterProps(value)
        return <Origin {...formProps as U} {...props} disabled={formProps.disabled || props.disabled} />
      }}
    </Consumer>
  )
}
