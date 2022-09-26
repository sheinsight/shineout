import Datum from "../../Datum"
import { wrapFormError } from "../errors"
import { substitute } from "../strings"
import { flattenArray } from "../flat"
import range from "./range"
import rangeLength from "./rangeLength"
import required from "./required"
import typeOf, { regs } from "./type"
import regTest from "./regExp"

type RegsKeys = keyof typeof regs

export declare interface RuleProps {
  type?: keyof typeof regs
  regExp?: RegExp
  func?: Function
  min?: number
  max?: number
  required?: boolean
  message?: string | Function
}

interface Rules {
  type: keyof typeof regs
  regExp: RegExp
  func: Function
  min: number
  max: number
  required: boolean
  message: string | Function
}

interface RulesFnOption {
  isInnerValidator: boolean
}

type RulesFn = (() => Rules) & RulesFnOption

function getRule(rules: Rules | RulesFn, props: RuleProps | RegsKeys = {}) {
  if (typeof rules === "function") {
    if ((rules as RulesFn).isInnerValidator) {
      rules = (rules as RulesFn)()
    } else {
      return rules
    }
  }

  if (typeof props === "string") props = { type: props }

  const { type = props.type, message, regExp, func, ...other } = rules as Rules

  props = Object.assign({}, props, other)
  props.message = typeof message === "function" ? message(props) : substitute(message, props)

  if (func) return (...args: unknown[]) => func(...args, props)

  if (other.required !== undefined) return required(props)

  if (regExp) return regTest(regExp, props)

  if (other.min !== undefined || other.max !== undefined) {
    if (type === "number" || type === "integer") {
      return range({ ...props, min: other.min, max: other.max })
    }
    return rangeLength(props)
  }

  if (type) return typeOf(type, props.message)

  const err = new Error(`Rule ${JSON.stringify(rules)} is not valid.`)
  console.error(err)
  throw err
}

const validate = (value: unknown, formdata: any, rules: Rules, props: RuleProps) =>
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

    const callback = (result: boolean) => {
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
    const cb = fn(val, formdata, callback)
    if (cb && cb.then) {
      cb.then(callback.bind(null, true)).catch((e: Error) => {
        reject(wrapFormError(e))
      })
    }
  })

export default validate
