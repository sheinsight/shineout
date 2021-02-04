import * as React from 'react'
import { RuleParamsType } from '../Rule'
import { FormItemStandardProps, StandardProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface RadioProps<T = any> extends StandardProps {

  /**
   * if not set, use (value === htmlValue).
   * 
   * checked 传入时为受控组件
   * 
   * default: -
   */
  checked?: boolean | 'indeterminate';

  /**
   * disable checkbox
   * 
   * 是否禁用
   * 
   * default: false
   */
  disabled?: boolean;

  /**
   * Specifies the result
   * 
   * 选中时返回值
   * 
   * default: true
   */
  htmlValue?: any;

  /**
   * Validation rules
   * 
   * 校验规则
   * 
   * default: -
   */
  rules?: RuleParamsType<T, RadioProps>;

}

export interface RadioGroupProps<T, D> extends StandardProps, FormItemStandardProps<Array<T>> {


  /**
   * the data items
   * 
   * 数据项
   * 
   * default: required
   */
  data?: D[];

  /**
   * When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * 
   * 是否禁用
   * 
   * default: false
   */
  disabled?: ((data: D) => boolean) | boolean;

  /**
   * Format value. Default value, return original data. When it is a string, it will get the value from the original data as a key .The same as (d) => d[format]. When it is a function, the result returned by the function will be the value.
   * 
   * 格式化 value。默认值，返回原始数据。为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。 为函数时，以函数返回结果作为 value
   * 
   * default: d => d
   */
  format?: ((data: D) => any) | string;

  /**
   * Key generator. When it is true, the data itself is used as the key equivalent to (d => d). When it is a function, use its return value. When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   * 
   * 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)。为函数时，使用此函数返回值。为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * 
   * default: required
   */
  keygen?: ((data: D) => string) | string | true;

  /**
   * By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function used to determine whether match.
   * 
   * (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 
   * 
   * default: (val, d) => val===format(d)
   */
  prediction?: (value: T, data: D) => boolean;

  /**
   * When it is a string, return d[string] When it is a function, return the result of the function.
   * 
   * 为 string 时，返回 d[string] 为 function 时，返回函数结果
   * 
   * default: required
   */
  renderItem?: ((data: D) => ReactNode) | string;

}

declare class RadioGroup<Value, Data> extends React.Component<RadioGroupProps<Value, Data>, {}> {
  render(): JSX.Element;
}


declare class Radio<Value> extends React.Component<RadioProps<Value>, {}> {
  static Group: typeof RadioGroup;

  render(): JSX.Element;
}


export default Radio
