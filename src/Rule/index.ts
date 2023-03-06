import { deepMerge, objectValues } from '../utils/objects'
import { isObject } from '../utils/is'
import required from './required'
import length from './length'
import type from './type'
import regExp from './regExp'
import { RuleParams, RuleTypeEnum, MessageType, ValidFunc, RuleResult, RuleCommonResult, RuleFuncResult } from './Props'
import { ObjectType } from '../@types/common'

export const RULE_TYPE = 'RULE_OBJECT'
const innerType: RuleTypeEnum[] = ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']

const mergeOptions = (opts: ObjectType = {}, ...args: RuleParams[]): ObjectType => {
  if (!isObject(opts)) {
    console.error(new Error(`rules expect an object, got ${typeof opts}`))
    return {}
  }

  if (args.length === 0) return opts
  const arg = args.shift()!
  Object.keys(arg).forEach(k => {
    if (typeof arg[k] === 'function') arg[k] = { func: arg[k] as ValidFunc }
  })
  const a = deepMerge(opts, arg)
  return mergeOptions(a, ...args)
}

export default function Rule(): RuleCommonResult

export default function Rule<A extends RuleParams>(a: A): { [P in keyof A]: RuleFuncResult } & RuleCommonResult

export default function Rule<A extends RuleParams, B extends RuleParams>(
  a: A,
  b: B
): { [P in keyof (A & B)]: RuleFuncResult } & RuleCommonResult

export default function Rule<A extends RuleParams, B extends RuleParams, C extends RuleParams>(
  a: A,
  b: B,
  c: C
): { [P in keyof (A & B & C)]: RuleFuncResult } & RuleCommonResult

export default function Rule<A extends RuleParams, B extends RuleParams, C extends RuleParams, D extends RuleParams>(
  a: A,
  b: B,
  c: C,
  d: D
): { [P in keyof (A & B & C & D)]: RuleFuncResult } & RuleCommonResult

export default function Rule(...opts: RuleParams[]) {
  const options = mergeOptions({}, ...opts)
  const rules: ObjectType = {
    required: required(options.required),
    max: length('max', options.max),
    min: length('min', options.min),
    regExp: regExp(options.regExp),
    type: (t: RuleTypeEnum) => type(t, options.type),
  }

  rules.length = (min: number, max: number, msg: MessageType) => [rules.min(min, msg), rules.max(max, msg)]
  rules.range = (min: number, max: number, msg: MessageType) => [rules.min(min, msg), rules.max(max, msg)]

  innerType.forEach(k => {
    rules[k] = type(k, options[k] || options.type)
  })

  const ruleKeys = Object.keys(rules)
  Object.keys(options).forEach(k => {
    if (!ruleKeys.includes(k)) {
      if (isObject(options[k])) {
        rules[k] = (args: ValidFunc) => Object.assign({}, options[k], { args })
      } else {
        console.error(new Error(`Rule ${k} is invalid, expect a function or an object.`))
      }
    }
  })

  objectValues(rules).forEach(rule => {
    rule.isInnerValidator = true
  })

  rules.$$type = RULE_TYPE
  return rules as RuleResult
}
