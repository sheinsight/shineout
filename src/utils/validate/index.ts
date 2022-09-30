import Datum from '../../Datum'
import { wrapFormError } from '../errors'
import { substitute } from '../strings'
import { flattenArray } from '../flat'
import range from './range'
import rangeLength from './rangeLength'
import required from './required'
import typeOf from './type'
import { RuleType } from './type'
import regTest from './regExp'
import { RuleParams, validFunc, RegExpParams, Required, Max, Min, Range, RuleResult } from '../../Rule'

type RulesInnerValidator = Rule & {
  isInnerValidator: boolean
}

type RulePropsFn = (() => Rule) & RulesInnerValidator

type Props = (Required | Max | Min | Range | RuleResult) & {
  type?: RuleType
  message?: string | ((props?: Props) => string)
}

export interface Rule extends RuleParams {
  type: RuleType
  func: validFunc
  regExp: RegExpParams
  message: string | ((props?: Props) => string)
}

function getRule(rules: Rule, props: Props = {}) {
  if (typeof rules === 'function') {
    if ((rules as RulePropsFn).isInnerValidator) rules = (rules as RulePropsFn)()
    else return rules
  }
  if (typeof props === 'string') props = { type: props }
  const { type = props.type, message, regExp, func, ...other } = rules

  props = Object.assign({}, props, other)

  props.message = typeof message === 'function' ? message(props) : substitute(message, props)

  if (func)
    return (value: unknown, formData: any, callback: ((cbArgs: true | Error) => void), props?: Props) =>
      func(value, formData, callback, props)

  if (other.required !== undefined) return required(props as Required)

  if (regExp) return regTest(regExp as RegExpParams['regExp'], props as RegExpParams)

  if (other.min !== undefined || other.max !== undefined) {
    if (type === 'number' || type === 'integer') {
      return range({ ...props, min: other.min, max: other.max } as Range)
    }
    return rangeLength(props as Range)
  }

  if (type) return typeOf(type, props.message)

  const err = new Error(`Rule ${JSON.stringify(rules)} is not valid.`)
  console.error(err)
  throw err
}

const validate = <T, U extends RuleParams>(value: keyof T, formdata: T, rules: U[keyof U][], props: Props) =>
  new Promise((resolve, reject) => {
    const $rules = flattenArray(rules)
    const rule = $rules.shift()
    if (rule === undefined) {
      resolve(true)
      return
    }
    if (!rule) {
      validate(value, formdata, $rules, props).then(resolve, reject)
      return
    }

    const callback = (result: boolean | Error | Error[]) => {
      if (result !== true) {
        reject(wrapFormError(result))
        return
      }

      validate(value, formdata, $rules, props).then(resolve, reject)
    }

    const fn = getRule(rule, props)
    let val = value
    if (fn === rule && (value instanceof Datum.List || value instanceof Datum.Form)) {
      val = value.getValue()
    }
    const cb = fn(val as string, formdata, callback)
    if (cb && cb.then) {
      cb.then(callback.bind(null, true)).catch((e: Error) => {
        reject(wrapFormError(e))
      })
    }
  })

export default validate
