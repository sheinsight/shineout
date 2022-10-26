import { ValueOf } from "../@types/common"

type TypeEnum  = 'email' | 'integer' | 'number' | 'url' | 'json' | 'hex' | 'rgb' | 'ipv4';
type MessageType = string | ((props: any) => string)
export interface Required {
  required?: boolean;
  message?: MessageType;
}

export interface Max {
  max?: number;
  message?: MessageType;
}

export interface Min {
  min?: number;
  message?: MessageType;
}

export interface Range extends Min, Max {}

export interface Type {
  type?:  TypeEnum
  message?: MessageType;
}

export interface RegExpParams {
  regExp?: RegExp | string;
  message?: MessageType;
}


export interface validFunc {
  (value: any, formData: any, callback: (cbArgs: (true | Error)|(true | Error)[]) => void, props: any) : (void | Promise<any>);
}

export type RuleItemResult = Type & RegExpParams & Range & Min & Max & Required & {
  func?: validFunc;
}


export interface RuleParams {
  required?: Required;
  min?: Min;
  max?: Max;
  range?: Range;
  regExp?: RegExpParams;
  email?: Type;
  integer?: Type;
  number?: Type;
  url?: Type;
  json?: Type;
  hex?: Type;
  rgb?:Type;
  ipv4?: Type;
  [propName: string]: ({
    func?: validFunc;
    message?: MessageType
    [propName: string]: any;
  } | validFunc | any) ;
}

// rules: RuleParamsType = []
export type RuleCommonValue = ValueOf<RuleCommon>

export type RuleParamsType<Value, FormData = any, Props = any> = Array<RuleCommonValue | RuleItemResult  | ((value: Value, formData: FormData, callback: ((cbArgs: true | Error) => void), props?: Props) => void) >

export type InnerRuleFunc<U> =  U & {isInnerValidator: true}

export type RuleCommon =  {
  [key: string]: paramFunc
 } & RuleResult

export interface RuleResult {
  required: InnerRuleFunc<(message?: MessageType) => Required>;

  min: InnerRuleFunc<(number?: number, message?: MessageType) => Min>;

  max: InnerRuleFunc<(number?: number, message?: MessageType)=> Max>;

  range: InnerRuleFunc<(min?: number, max?: number, message?: MessageType)=> Range>;

  regExp: InnerRuleFunc<(reg?: RegExp | string, message?: MessageType)=> RegExpParams>;

  email: InnerRuleFunc<(message?: MessageType)=> Type>;

  integer: InnerRuleFunc<(message?: MessageType)=> Type>;

  number: InnerRuleFunc<(message?: MessageType)=> Type>;

  url: InnerRuleFunc<(message?: MessageType)=> Type>;

  json: InnerRuleFunc<(message?: MessageType)=> Type>;

  hex: InnerRuleFunc<(message?: MessageType)=> Type>;

  rgb: InnerRuleFunc<(message?: MessageType)=>Type>;

  ipv4: InnerRuleFunc<(message?: MessageType)=> Type>;

}

export interface paramFunc {
  <U>(args?: U ): {args: U, func: validFunc, message?: MessageType}
  isInnerValidator: true
}

declare function Rule() : RuleResult

declare function Rule<A extends RuleParams>(a: A) : {
  [P in keyof A]: paramFunc
} & RuleResult

declare function Rule<A extends RuleParams, B extends RuleParams>(a: A, b: B) : {
  [P in keyof (A & B)]: paramFunc
} & RuleResult

declare function Rule<A extends RuleParams, B extends RuleParams, C extends RuleParams>(a: A, b: B, c: C) : {
  [P in keyof (A & B & C)]: paramFunc
} & RuleResult

declare function Rule<A extends RuleParams, B extends RuleParams, C extends RuleParams, D extends RuleParams>(a: A, b: B, c: C, d: D) : {
  [P in keyof (A & B & C & D)]: paramFunc
} & RuleResult

 declare function Rule(...args: RuleParams[]) :RuleCommon


export declare const RULE_TYPE: "RULE_OBJECT"
export default Rule
