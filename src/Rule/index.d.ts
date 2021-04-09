type TypeEnum  = 'email' | 'integer' | 'number' | 'url' | 'json' | 'hex' | 'rgb' | 'ipv4';
export interface Required {
  required?: boolean;
  message?: string;
}

export interface Max {
  max?: number;
  message?: string;
}

export interface Min {
  min?: number;
  message?: string;
}

export interface Range extends Min, Max {}

export interface Type {
  type?:  TypeEnum
  message?: string;
}

export interface RegExpParams {
  regExp?: RegExp | string;
  message?: string;
}

export interface RuleParams extends Required, Max, Min, Range, Type, RegExpParams {}


export type RuleParamsType<Value, P = any, FormData = any> = Array<RuleParams | ((value?: Value, formData?: FormData, callback?: ((cbArgs: true | Error) => void), props?: P) => void)>


declare class Rule {
  constructor(params?: RuleParams): void {};

  required (message?: string): Required;

  min(number?: number): Min;

  max(number?: number): Max;

  range(min?: number, max: number): Range;

  type(type?: TypeEnum): Type;

  regExp(reg?: RegExp | string): RegExpParams;
}


export default Rule