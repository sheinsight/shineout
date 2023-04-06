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
   * @en whether to be required
   * @cn 是否必填
   */
  required: InnerRuleFunc<(message?: MessageType) => Required>

  /**
   * @en The minimum value. When type is 'number', validate the value. Otherwise, validate the value.length.
   * @cn 最小值，type 为 'number' 时，判断数值大小，其他类型判断 length
   */
  min: InnerRuleFunc<(number?: number, message?: MessageType) => Min>

  /**
   * @en The maximum value. When type is 'number', validate the value. Otherwise, validate the value.length.
   * @cn 最大值，type 为 'number' 时，判断数值大小，其他类型判断 length
   */
  max: InnerRuleFunc<(number?: number, message?: MessageType) => Max>

  /**
   * @en Range check, automatically determines whether the check type is a string, number, or option base on the field type.
   * @cn 数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
   */
  range: InnerRuleFunc<(min?: number, max?: number, message?: MessageType) => Range>

  /**
   * @en regular expression
   * @cn 正则表达式
   */
  regExp: InnerRuleFunc<(reg?: RegExp | string, message?: MessageType) => RegExpParams>

  /**
   * @en Email check
   * @cn 邮箱校验
   */
  email: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Integer check
   * @cn 整数校验
   */
  integer: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Number check
   * @cn 数值校验
   */
  number: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Url check
   * @cn Url 校验
   */
  url: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Json check
   * @cn Json 校验
   */
  json: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Hex check
   * @cn Hex 校验
   */
  hex: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Rgb check
   * @cn Rgb 校验
   */
  rgb: InnerRuleFunc<(message?: MessageType) => Type>

  /**
   * @en Ipv4 check
   * @cn Ipv4 校验
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
