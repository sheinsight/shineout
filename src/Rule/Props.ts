import { ValueOf } from '../@types/common'

export type RuleTypeEnum = 'email' | 'integer' | 'number' | 'url' | 'json' | 'hex' | 'rgb' | 'ipv4'
export type MessageType = string | ((props: any) => string)

export interface Required {
  required?: boolean
  message?: MessageType
}

export interface Max {
  max?: number
  message?: MessageType
}

export interface Min {
  min?: number
  message?: MessageType
}

export interface Range extends Min, Max {}

export interface Type {
  type?: RuleTypeEnum
  message?: MessageType
}

export interface RegExpParams {
  regExp?: RegExp | string
  message?: MessageType
}

// 自定义校验函数
export interface ValidFunc {
  (
    value: any,
    formData: any,
    callback: (cbArgs: (true | Error) | (true | Error)[]) => void,
    props: any
  ): void | Promise<any>
}

// Rule 的内置结果
export interface RuleCommonResult {
  required: InnerRuleFunc<(message?: MessageType) => Required>

  min: InnerRuleFunc<(number?: number, message?: MessageType) => Min>

  max: InnerRuleFunc<(number?: number, message?: MessageType) => Max>

  range: InnerRuleFunc<(min?: number, max?: number, message?: MessageType) => Range>

  regExp: InnerRuleFunc<(reg?: RegExp | string, message?: MessageType) => RegExpParams>

  email: InnerRuleFunc<(message?: MessageType) => Type>

  integer: InnerRuleFunc<(message?: MessageType) => Type>

  number: InnerRuleFunc<(message?: MessageType) => Type>

  url: InnerRuleFunc<(message?: MessageType) => Type>

  json: InnerRuleFunc<(message?: MessageType) => Type>

  hex: InnerRuleFunc<(message?: MessageType) => Type>

  rgb: InnerRuleFunc<(message?: MessageType) => Type>

  ipv4: InnerRuleFunc<(message?: MessageType) => Type>
}

// rule 的自定义校验结构
export interface RuleFuncResult {
  <U>(args?: U): { args: U; func: ValidFunc; message?: MessageType }
  isInnerValidator: true
}

// rule 的所有结果
export type RuleResult = ({ [key: string]: RuleFuncResult }) | RuleCommonResult

// rule结果值
export type RuleResultValue = ValueOf<RuleResult>

// 表单项校验传的对象rule
export type FormItemObjectRule = Type &
  RegExpParams &
  Range &
  Min &
  Max &
  Required & {
    func?: ValidFunc
  }
// 表单项校验传的rule 数组
export type FormItemRule<Value, FormData = any, Props = any> = Array<
  | RuleResultValue
  | FormItemObjectRule
  | ((value: Value, formData: FormData, callback: ((cbArgs: boolean | Error) => void), props?: Props) => void)
>

// Rule 构造函数的参数
export interface RuleParams {
  required?: Required
  min?: Min
  max?: Max
  range?: Range
  regExp?: RegExpParams
  email?: Type
  integer?: Type
  number?: Type
  url?: Type
  json?: Type
  hex?: Type
  rgb?: Type
  ipv4?: Type
  [propName: string]:
    | {
        func?: ValidFunc
        message?: MessageType
      }
    | ValidFunc
    | undefined
}

// 内置rule
export type InnerRuleFunc<U> = U & { isInnerValidator: true }
