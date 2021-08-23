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

export interface validFunc {
  (value: any, formData: any, callback: (cbArgs: true | Error) => void, props: any) : (void | Promise);
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
    message?: string
    [propName: string]: any;
  } | validFunc);
}


export interface RuleResult {
  required (message?: string): Required;

  min(number?: number, message?: string): Min;

  max(number?: number, message?: string): Max;

  range(min?: number, max: number, message?: string): Range;

  regExp(reg?: RegExp | string): RegExpParams;

  email(message?: string): Type;

  integer(message?: string): Type;

  number(message?: string): Type;

  url(message?: string): Type;

  json(message?: string): Type;

  hex(message?: string): Type;

  rgb(message?: string):Type;

  ipv4(message?: string): Type;

}

 declare function Rule(...options: RuleParams[]) : RuleResult


export default Rule
