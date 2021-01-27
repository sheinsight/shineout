

export interface Base {
  [key: string]: string
}


declare namespace Datum {

  // Form
  export class Form<Options = Base, N, Values = Base | Array<any>> {
    constructor(options: Options);
    handleChange(): void;
    reset(): void;
    get(name: N): any;
    set(name: N, value: any, pub: void | boolean): void;
    setArrayValue(names: N[], values: Values): void;
    insert(name: N, index: number | void, value: Values): void;
    splice(name: N, index: number): void;
    remove(name: N): void;
    publishValue(name: N, type: any): void;
    getError(name: N, firstHand: any | void): any;
    resetFormError(error: Error):  void;
    removeFormError(name: N): void;
    setFormError(name: N, error: Error): void;
    setError(name: N, error: Error, pub: void | boolean): void;
    insertError(name: N, index: number, error: Error): void;
    spliceError(name: N, index: number): void;
    publishError(name: N): void;
    getRule(name: N): Array<any>;
    getValue(): Values;
    setValue(values: Values, type: string, forceSet: boolean): void;
    bind(name: N, fn: Function, value: any, validate: (name: N, values: Values, type: any) => void): void;
    unbind(name: N): void;
    dispatch(name, ...args: Array<any>): void;
    subscribe(name, fn: Function): void;
    unsubscribe(name: N, fn: Function): void;
    validate(type: any): Promise<boolean | Error>;
    validateFieldsByName(name: N, type: any): Promise<Error | boolean>;
    validateFields(names: N[], type: any): Promise<Error | boolean>;
    validateClear(): void;
  }

}