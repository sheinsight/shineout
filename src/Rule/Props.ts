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
  /**
   * whether to be required
   *
   * 是否必填
   *
   * default: -
   */
  required: InnerRuleFunc<(message?: MessageType) => Required>

  /**
   * The minimum value. When type is 'number', validate the value. Otherwise, validate the value.length.
   *
   * 最小值，type 为 'number' 时，判断数值大小，其他类型判断 length
   *
   * default: -
   */
  min: InnerRuleFunc<(number?: number, message?: MessageType) => Min>

  /**
   * The maximum value. When type is 'number', validate the value. Otherwise, validate the value.length.
   *
   * 最大值，type 为 'number' 时，判断数值大小，其他类型判断 length
   *
   * default: -
   */
  max: InnerRuleFunc<(number?: number, message?: MessageType) => Max>

  /**
   * Range check, automatically determines whether the check type is a string, number, or option base on the field type.
   *
   * 数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
   *
   * default: -
   */
  range: InnerRuleFunc<(min?: number, max?: number, message?: MessageType) => Range>

  /**
   * regular expression
   *
   * 正则表达式
   *
   * default: -
   */
  regExp: InnerRuleFunc<(reg?: RegExp | string, message?: MessageType) => RegExpParams>

  /**
   * Email check
   *
   * 邮箱校验
   *
   * default: -
   */
  email: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Integer check
   *
   * 整数校验
   *
   * default: -
   */
  integer: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Number check
   *
   * 数值校验
   *
   * default: -
   */
  number: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Url check
   *
   * Url 校验
   *
   * default: -
   */
  url: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Json check
   *
   * Json 校验
   *
   * default: -
   */
  json: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Hex check
   *
   * Hex 校验
   *
   * default: -
   */
  hex: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Rgb check
   *
   * Rgb 校验
   *
   * default: -
   */
  rgb: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * Ipv4 check
   *
   * Ipv4 校验
   *
   * default: -
   */
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
