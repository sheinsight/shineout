import React, { ComponentType } from 'react'
import immer from 'immer'
import { Component } from '../component'
import { promiseAll, isSameError } from '../utils/errors'
import shallowEqual from '../utils/shallowEqual'
import { filterProps } from '../utils/objects'
import { getUidStr } from '../utils/uid'
import { isArray } from '../utils/is'
import validate from '../utils/validate'
import { FORCE_PASS, ERROR_TYPE, IGNORE_VALIDATE, errorSubscribe, IGNORE_BIND, ValidType } from '../Datum/types'
import { formConsumer } from './formContext'
import { itemConsumer } from './Item'
import { fieldSetConsumer } from './FieldSet'
import ListDatum from '../Datum/List'
import { ObjectType } from '../@types/common'
import { FormItemRule } from '../Rule/interface'
import { InputableProps, BaseInputProps, GetInputableProps, InputableFormConsumerKey } from './Props'

interface CustomValidateType {
  (...args: any): Promise<any>
}

const types: InputableFormConsumerKey[] = ['formDatum', 'disabled', 'combineRules', 'size']

const tryValue = (val: unknown, def: unknown) => (val === undefined ? def : val)

const beforeValueChange = <Value extends any>(fn: InputableProps<Value>['onChange']) => (
  value: InputableProps<Value>['value'],
  datum: InputableProps<Value>['formDatum']
) => {
  if (!fn) return value
  const newValue = fn(value, datum)
  return newValue === undefined ? value : newValue
}

interface InputableState<Value> {
  value?: Value
  error: any
}

export default <Value, U extends BaseInputProps, Item = any>(Origin: ComponentType<U>) => {
  class InputableInner extends Component<InputableProps<Value>, InputableState<Value>> {
    static defaultProps: any = {
      rules: [] as FormItemRule<Value>,
      scuSkip: ['onChange', 'rules'],
    }

    itemName: string

    lastValue?: Value

    updateTimer: NodeJS.Timeout

    datum?: ListDatum<Item, Value>

    lastError?: boolean

    errorChange: boolean

    customValidate: CustomValidateType

    constructor(props: InputableProps<Value>) {
      super(props)

      const { formDatum, name, defaultValue } = props

      this.state = {
        error: undefined,
        value: props.value || defaultValue,
      }

      this.itemName = getUidStr()

      this.handleChange = this.handleChange.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
      this.handleDatumBind = this.handleDatumBind.bind(this)
      this.handleError = this.handleError.bind(this)
      this.validate = this.validate.bind(this)
      this.validateHook = this.validateHook.bind(this)

      this.lastValue = formDatum && name ? formDatum.get(name) || {} : {}
    }

    componentDidMount() {
      super.componentDidMount()
      // @ts-ignore
      const { readOnly } = this.props
      const { onChange, disabled } = this.props
      if ('value' in this.props && !onChange && disabled !== true && readOnly !== true) {
        console.error(
          'warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly` or `disabled`'
        )
      }
      const { formDatum, name, defaultValue, bindInputToItem, popover } = this.props

      if (formDatum && name) {
        if (Array.isArray(name)) {
          const dv = ((defaultValue || []) as unknown) as Value extends any[] ? Value : any[]

          name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, dv[i], this.validate))

          // @ts-ignore
          this.state.value = name.map(n => formDatum.get(n))
          formDatum.subscribe(errorSubscribe(this.errorName!), this.handleUpdate)
        } else {
          formDatum.bind(name, this.handleUpdate, defaultValue, this.validate)
          // @ts-ignore
          this.state.value = formDatum.get(name)
        }
        this.lastValue = this.state.value
      }

      if (bindInputToItem && name && !popover) bindInputToItem(this.errorName!)
    }

    shouldComponentUpdate(nextProps: InputableProps<Value>, nextState: InputableState<Value>) {
      const skip = [...(this.props.scuSkip || []), 'formDatum']
      const isFormDatum = this.props.formDatum && this.props.name
      if (isFormDatum) skip.push('value')
      const options = { skip, deep: ['data', 'defaultValue', 'datum', 'name', 'rule', 'style'] }
      if (!isFormDatum && !shallowEqual(this.getValue(), nextState.value)) return true

      return !(shallowEqual(nextProps, this.props, options) && shallowEqual(nextState, this.state))
    }

    componentWillUnmount() {
      super.componentWillUnmount()

      const { formDatum, name, unbindInputFromItem, reserveAble } = this.props
      clearTimeout(this.updateTimer)
      if (formDatum && name) {
        formDatum.unbind(name, this.handleUpdate, reserveAble)
        if (Array.isArray(name)) {
          formDatum.unsubscribe(errorSubscribe(this.errorName!), this.handleUpdate)
          formDatum.setError(this.errorName!)
        }
      }
      if (unbindInputFromItem && name) unbindInputFromItem(this.errorName!)
    }

    get errorName(): string | undefined {
      const { name } = this.props
      return Array.isArray(name) ? name.join('|') : name
    }

    getValue() {
      const { formDatum, name, value, defaultValue } = this.props
      if (formDatum && name) {
        if (Array.isArray(name)) {
          const dv = ((defaultValue || []) as unknown) as Value extends any[] ? Value : any[]
          return name.map((n, i) => tryValue(formDatum.get(n), dv[i]))
        }
        return tryValue(formDatum.get(name), defaultValue)
      }
      const hasValue = 'value' in this.props || 'checked' in this.props
      return !hasValue ? this.state.value : value
    }

    getError() {
      const { formDatum, name, error } = this.props
      if ('error' in this.props) {
        return error
      }
      if (formDatum && name) {
        return formDatum.getError(this.errorName!)
      }

      return this.state.error
    }

    handleDatumBind(datum: ListDatum<Item, Value>) {
      this.datum = datum
    }

    handleError(error?: Error) {
      const { formDatum, name, onItemError, onError } = this.props
      if (formDatum && name) {
        if (!isSameError(error, formDatum.getError(this.errorName!, true))) {
          formDatum.setError(this.errorName!, error, true)
        }
      } else {
        this.setState({ error })
      }

      const hasError = error !== undefined
      this.errorChange = hasError !== this.lastError
      this.lastError = hasError

      if (onError) onError(error)
      if (onItemError && !name) onItemError(this.itemName, error)
    }

    validateHook(customValidate: CustomValidateType) {
      this.customValidate = customValidate
    }

    validate(type: unknown): Promise<any>

    validate(value: any, data: ObjectType | undefined, type?: ValidType): Promise<any>

    validate(value: any, data?: ObjectType, type?: ValidType) {
      const { name, formDatum, combineRules, bind } = this.props
      const names = Array.isArray(name) ? name : [name]

      const validates = []
      const validateProps = filterProps(this.props, v => typeof v === 'string' || typeof v === 'number')

      if (this.datum) {
        const datumValue = this.datum.formatValue(value)
        value = this.datum.limit === 1 ? datumValue[0] : datumValue
        // @ts-ignore
        validateProps.type = 'array'
      }

      if (type === FORCE_PASS || value === FORCE_PASS) {
        this.handleError()
        return Promise.resolve(true)
      }

      if (value === undefined || Array.isArray(name)) value = this.getValue()
      if (!Array.isArray(name)) value = [value]
      if (this.customValidate) validates.push(this.customValidate())
      if (formDatum && bind && type !== IGNORE_BIND) {
        // console.error(new Error('Use "bind" props to combine validate is not recommend. Use Form "groups" props instead.'))
        formDatum.validateFields(bind, IGNORE_BIND).catch(() => {})
      }
      if (!data && formDatum) data = formDatum.getValue()

      let { rules } = this.props
      names.forEach((n, i) => {
        if (formDatum && combineRules) {
          rules = combineRules(n!, rules)
        }

        if (isArray(rules) && rules.length > 0) {
          validates.push(validate(value[i], data!, rules, validateProps))
        }
      })

      return promiseAll(validates)
        .then((res: true | Error) => {
          this.handleError(res === true ? undefined : res)
          return res
        })
        .catch(e => {
          this.handleError(e)
          return e
        })
    }

    handleChange(value: Value | undefined, ...args: any) {
      const { formDatum, name, fieldSetValidate, onChange, filterSameChange } = this.props
      const currentValue = this.getValue()
      if ((args.length === 0 || filterSameChange) && shallowEqual(value, currentValue)) {
        return
      }
      const beforeChange = beforeValueChange(this.props.beforeChange!)
      if (formDatum && name) {
        value = beforeChange(value, formDatum)
        formDatum.set(name, value)
        formDatum.removeFormError(this.errorName!)
      } else {
        value = beforeChange(value, undefined)
        this.setState({ value }, () => {
          this.validate(value).catch(() => {})
        })
      }

      if (onChange) onChange(value, ...args)
      if (fieldSetValidate) fieldSetValidate(true)
    }

    handleUpdate(value: Value, sn: string, type?: typeof ERROR_TYPE | typeof FORCE_PASS | typeof IGNORE_VALIDATE) {
      if (type === ERROR_TYPE) {
        if (!isSameError(value, this.state.error)) this.setState({ error: value })
        return
      }

      const { name, onChange, forceChangeOnValueSet } = this.props
      const newValue = !Array.isArray(name)
        ? value
        : (immer(this.getValue(), (draft: any) => {
            name.forEach((n, i) => {
              if (n === sn) draft[i] = value
            })
          }) as Value)

      if (!this.errorChange && shallowEqual(newValue, this.lastValue)) return
      this.lastValue = newValue

      if (type === FORCE_PASS) {
        this.handleError()
        this.setState({ error: undefined })
        this.forceUpdate()
        return
      }

      if (onChange && forceChangeOnValueSet) onChange(newValue)

      if (type !== IGNORE_VALIDATE) {
        if (this.updateTimer) clearTimeout(this.updateTimer)
        this.updateTimer = setTimeout(() => {
          this.validate(newValue, undefined, type).catch(() => {})
        }, 0)
      }
      this.forceUpdate()
    }

    render() {
      const {
        formDatum,
        value,
        required,
        bind,
        onItemError,
        bindInputToItem,
        unbindInputFromItem,
        scuSkip,
        defaultValue,
        reserveAble,
        ...other
      } = this.props
      return (
        <Origin
          {...other as any}
          formDatum={formDatum}
          error={this.getError()}
          value={this.getValue()}
          onChange={this.handleChange}
          onDatumBind={this.handleDatumBind}
          validateHook={this.validateHook}
        />
      )
    }
  }

  const WithFiledSetConsumer = fieldSetConsumer(InputableInner)
  const WidthItemConsumer = itemConsumer(WithFiledSetConsumer)
  const WidthFormConsumer = formConsumer(types)(WidthItemConsumer)
  return WidthFormConsumer as ComponentType<GetInputableProps<U, Value>>
}
