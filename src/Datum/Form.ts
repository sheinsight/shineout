import deepEqual from 'deep-eql'
import { unflatten, insertValue, spliceValue, getSthByName } from '../utils/flat'
import { fastClone, deepClone } from '../utils/clone'
import { deepGet, deepSet, deepRemove, objectValues, deepHas } from '../utils/objects'
import { isObject, isArray } from '../utils/is'
import { promiseAll, FormError } from '../utils/errors'
import { RuleParamsType } from "../Rule"
import {
  updateSubscribe,
  errorSubscribe,
  changeSubscribe,
  VALIDATE_TOPIC,
  RESET_TOPIC,
  CHANGE_TOPIC,
  FORCE_PASS,
  ERROR_TYPE,
  IGNORE_VALIDATE,
  ValidType, PublishType
} from "./types"
import {FormDatumOptions, ValidFunc} from './Props'
import {ObjectType} from '../@types/common'


export default class<V extends ObjectType> {
  rules: FormDatumOptions<V>['rules']
  onChange: FormDatumOptions<V>['onChange']
  removeUndefined: FormDatumOptions<V>['removeUndefined']
  $defaultValues: V
  $inputNames: {[name: string]: boolean}
  $values: Partial<V>
  $validator:ObjectType<ValidFunc>
  $events:ObjectType<((...args: any)=> void)[]>
  $errors:ObjectType
  updateLock: boolean
  deepSetOptions: {removeUndefined: boolean, forceSet: boolean}
  formUnmount: boolean
  constructor(options:FormDatumOptions<V> = {}) {
    const { removeUndefined = true, rules, onChange, value, error, initValidate, defaultValue } = options
    this.rules = rules
    this.onChange = onChange
    this.removeUndefined = removeUndefined

    // store names
    this.$inputNames = {}
    // store values
    this.$values = {}
    // store default value, for reset
    this.$defaultValues = { ...defaultValue } as V
    this.$validator = {}
    this.$events = {}
    // handle global errors
    this.$errors = {}
    this.updateLock = false

    this.deepSetOptions = { removeUndefined, forceSet: true }
    const initValue = 'value' in options ? value : defaultValue

    if (initValue) this.setValue(initValue, initValidate ? undefined : IGNORE_VALIDATE)
    if (error) this.resetFormError(error)
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  reset() {
    this.$errors = {}
    this.setValue(unflatten(fastClone(this.$defaultValues)), FORCE_PASS, true)
    this.handleChange()
    this.dispatch(RESET_TOPIC)
  }

  setLock(lock: boolean) {
    this.updateLock = lock
  }

  get(name: string | (string[])): any {
    if (Array.isArray(name)) return name.map(n => this.get(n))
    return deepGet(this.$values, name)
  }
  set(value: ObjectType): void
  set(name: string| string[] , value: any, pub?: boolean) : void
  set(name: string | string[] | ObjectType, value?: any, pub?: boolean) {
    if (isObject(name)) {
      value = objectValues(name as ObjectType)
      name = Object.keys(name)
    }

    if (isArray(name)) {
      this.setArrayValue(name, value)
      return
    }

    if (typeof name === 'string') {
      if (value === this.get(name)) return
      deepSet(this.$values, name, value, this.deepSetOptions)

      if (this.$inputNames[name]) {
        this.dispatch(updateSubscribe(name), value, name)
        this.dispatch(changeSubscribe(name))
      }

      if ((value !== null && typeof value === 'object') || pub) this.publishValue(name, FORCE_PASS)

      this.dispatch(CHANGE_TOPIC)
      this.handleChange()
    }

  }

  setArrayValue(names: string[], values: any[]) {
    names.forEach((name, index) => {
      deepSet(this.$values, name, values[index], this.deepSetOptions)
    })

    names.forEach((name, index) => {
      if (this.$inputNames[name]) {
        this.dispatch(updateSubscribe(name), values[index], name)
        this.dispatch(changeSubscribe(name))
      }
    })

    this.dispatch(CHANGE_TOPIC)
    this.handleChange()
  }

  insert(name: string, index: number, value: any) {
    this.insertError(name, index, undefined)
    const val = this.get(name)
    if (val) {
      val.splice(index, 0, value)
      this.publishValue(name, IGNORE_VALIDATE)
      this.publishError(name)
      // insert value into Form in onAppend will trigger Form onChange
      this.handleChange()
    } else {
      this.set(name, [value])
    }
  }

  splice(name: string, index: number) {
    this.spliceError(name, index)
    const list = this.get(name)
    list.splice(index, 1)
    this.publishValue(name, IGNORE_VALIDATE)
    this.publishError(name)
    // remove value from Form in onRemove will trigger Form onChange
    this.handleChange()
  }

  remove(name: string) {
    deepRemove(this.$values, name)
  }

  publishValue(name: string, type: PublishType) {
    const na = `${name}[`
    const no = `${name}.`
    Object.keys(this.$inputNames)
      .filter(n => n.indexOf(na) === 0 || n.indexOf(no) === 0)
      .forEach(n => {
        this.dispatch(updateSubscribe(n), this.get(n), n, type)
      })
  }

  getError(name: string, firstHand?: boolean) {
    if (firstHand) return this.$errors[name]
    return getSthByName(name, this.$errors)
  }

  resetFormError(error: ObjectType<string | Error> = {}) {
    if (!this.$errors['']) this.$errors[''] = {}
    let items: ObjectType
    if (Object.keys(error).length) {
      items = Object.keys(error).reduce((data, item) => {
        data[item] = error[item] instanceof Error ? (error[item] as Error) : new Error(error[item] as string)
        return data
      }, {} as ObjectType<Error>)
    } else {
      items = Object.keys(this.$errors['']).reduce((data, name) => {
        data[name] = undefined
        return data
      }, {} as ObjectType)
    }
    Object.keys(items).map(n => this.setFormError(n, items[n]))
  }

  removeFormError(name: string) {
    if (!this.$errors[''] || !this.$errors[''][name]) return
    this.setFormError(name, undefined)
  }

  setFormError(name: string, error?: Error) {
    if (!this.$errors['']) return
    if (error === undefined) delete this.$errors[''][name]
    else this.$errors[''][name] = error
    this.dispatch(errorSubscribe(name), this.getError(name), name, ERROR_TYPE)
    this.dispatch(updateSubscribe(name))
  }

  setError(name: string, error?: Error, pub?: boolean) {
    if (error === undefined) delete this.$errors[name]
    else this.$errors[name] = error

    this.dispatch(errorSubscribe(name), this.getError(name), name, ERROR_TYPE)
    if (pub) this.publishError(name)
  }

  insertError(name: string, index: number, error?: Error) {
    insertValue(this.$errors, name, index, error)
  }

  spliceError(name: string, index: number) {
    spliceValue(this.$errors, name, index)
  }

  publishError(name: string) {
    const na = `${name}[`
    const no = `${name}.`
    Object.keys(this.$inputNames)
      .filter(n => n.indexOf(na) === 0 || n.indexOf(no) === 0)
      .forEach(n => {
        this.dispatch(errorSubscribe(n), this.getError(n), n, ERROR_TYPE)
      })
  }

  getRule(name: string): RuleParamsType<any> {
    if (!this.rules) return []
    const a  = deepGet(this.rules, name) as RuleParamsType<any>
    return a || []
  }

  getValue() {
    return deepClone(this.$values)
  }

  setValue(v: any = {}, type?: typeof IGNORE_VALIDATE | typeof FORCE_PASS, forceSet?: boolean) {
    const values = isObject(v) ? v : {}
    if (values !== v) {
      console.warn('Form value must be an Object')
    }
    // 兼容 value 传入 null 等错误等值
    if (!forceSet && deepEqual(values, this.$values)) return
    this.$values = deepClone(values)

    // wait render end.
    setTimeout(() => {
      Object.keys(this.$inputNames)
        .sort((a, b) => a.length - b.length)
        .forEach(name => {
          this.dispatch(updateSubscribe(name), this.get(name), name, type)
          this.dispatch(changeSubscribe(name))
        })

      // for flow
      this.dispatch(CHANGE_TOPIC)
    })
  }

  bind(name: string, fn:  (...args: any)=> void, value: any, validate: ValidFunc ) {
    if (this.$inputNames[name]) {
      console.warn(`There is already an item with name "${name}" exists. The name props must be unique.`)
    }

    if (value !== undefined && this.get(name) == null) {
      this.set(name, value, true)
      this.dispatch(changeSubscribe(name))
      this.dispatch(CHANGE_TOPIC)
    }

    if (!(name in this.$defaultValues) && value) this.$defaultValues[name as keyof V] = fastClone(value)

    this.$validator[name] = validate
    this.$inputNames[name] = true
    this.subscribe(updateSubscribe(name), fn)
    this.subscribe(errorSubscribe(name), fn)
  }

  unbind(name: string| string[], _cb?: any, reserveAble?: boolean) {
    if (Array.isArray(name)) {
      name.forEach(n => this.unbind(n))
      return
    }

    this.unsubscribe(updateSubscribe(name))
    this.unsubscribe(errorSubscribe(name))
    delete this.$inputNames[name]
    delete this.$validator[name]
    delete this.$errors[name]
    delete this.$defaultValues[name]
    // when  setData due to unmount not delete value
    if (this.updateLock) return
    if (!deepHas(this.$values, name)) return
    if (reserveAble) return
    deepRemove(this.$values, name)

    if (!this.formUnmount) {
      setTimeout(() => {
        this.handleChange()
      })
    }
  }

  dispatch(name: string, ...args: any) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  subscribe(name: string, fn: (...args: any)=> void) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (events.includes(fn)) return
    events.push(fn)
  }

  unsubscribe(name: string, fn?:  (...args: any)=> void) {
    if (!this.$events[name]) return

    if (fn) this.$events[name] = this.$events[name].filter(e => e !== fn)
    else delete this.$events[name]
  }

  validate(type: ValidType) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      const values = this.getValue()

      const validates = [
        ...keys.map(k => this.$validator[k](this.get(k), values, type)),
        ...(this.$events[VALIDATE_TOPIC] || []).map(fn => fn()),
      ]

      Promise.all(validates)
        .then(res => {
          const error = res.find(r => r !== true)
          if (error === undefined) resolve(true)
          else reject(error)
        })
        .catch(e => {
          reject(new FormError(e))
        })
    })
  }

  validateFieldsByName(name: string, type: ValidType) {
    if (!name || typeof name !== 'string') {
      return Promise.reject(new Error(`Name expect a string, get "${name}"`))
    }

    const validations: Promise<any>[]  = []
    const values = this.getValue()
    Object.keys(this.$validator).forEach(n => {
      if (n === name || n.indexOf(name) === 0) {
        validations.push(this.$validator[n](this.get(n), values, type))
      }
    })

    return promiseAll(validations)
  }

  validateFields(names: string[], type: ValidType) {
    if (!Array.isArray(names)) names = [names]
    const validates = names.map(n => this.validateFieldsByName(n, type))
    return promiseAll(validates)
  }

  validateClear() {
    const keys = Object.keys(this.$validator)
    const validates = keys.map(k => this.$validator[k](FORCE_PASS))
    Promise.all(validates)
    this.$errors = {}
  }
}
