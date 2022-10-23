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
import {
  RuleParams,
  validFunc,
  RegExpParams,
  RuleItemResult,
  RuleParamsType,
   RuleCommonValue
} from "../../Rule"
import { ObjectType } from "../../@types/common"

type Props = RuleItemResult & {
  type?: RuleType
  message?: string
  [name: string]: any
}

export interface Rule extends RuleParams {
  type: RuleType
  func: validFunc
  regExp: RegExpParams
  message: string | ((props?: Props) => string)
}

function getRule<Value>(rules: RuleParamsType<Value>[number], props: Props = {}) {
  if (typeof rules === 'function') {
    if ((rules as RuleCommonValue).isInnerValidator) rules = (rules as RuleCommonValue)()
    else return rules
  }
  if (typeof props === 'string') props = { type: props }
  const { type = props.type, message, regExp, func, ...other } = rules

  props = Object.assign({}, props, other)

  props.message = typeof message === 'function' ? message(props) : substitute(message!, props) as string

  if (func)
    return (value: unknown, formData: any, callback: ((cbArgs: true | Error) => void), props?: Props) =>
      func(value, formData, callback, props)

  if (other.required !== undefined) return required({message: props.message, required: this.props.required})

  if (regExp) return regTest(regExp as RegExpParams['regExp'], {message: props.message})

  if (other.min !== undefined || other.max !== undefined) {
    if (type === 'number' || type === 'integer') {
      return range({message: props.message, min: other.min, max: other.max })
    }
    return rangeLength({message: props.message, min: other.min, max: other.max })
  }

  if (type) return typeOf(type, props.message)

  const err = new Error(`Rule ${JSON.stringify(rules)} is not valid.`)
  console.error(err)
  throw err
}

const validate = <Value, Props extends ObjectType>(value: Value, formdata: ObjectType, rules: RuleParamsType<Value>, props: Props) =>

  new Promise((resolve, reject) => {
    const $rules = flattenArray<RuleParamsType<any>[number]>(rules)
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
    const cb = fn(val, formdata, callback) as unknown as {then?: any}
    if (cb && (cb as any).then) {
      cb.then(callback.bind(null, true)).catch((e: Error) => {
        reject(wrapFormError(e))
      })
    }
  })

export default validate
