export interface RuleObjectParams {
  max?: number,
  min?: number,
  message?: string,
  regExp?: string | RegExp,
  required?: boolean,
  type?: 'email' | 'json' | 'url' | 'hex' | 'number'
}

export type RuleParamsType<Value> = Array<RuleObjectParams | ((value?: any, formData?: Value, callback?: ((cbArgs: true | Error) => void), props?: any) => void)>
