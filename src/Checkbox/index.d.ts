import * as React from 'react'
import { RuleParamsType } from '../Rule'
import { StandardProps, FormItemStandardProps, ListItemStandardProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface CheckboxProps<T> extends StandardProps, FormItemStandardProps<T> {

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
  rules?: RuleParamsType<T, CheckboxProps>

}

// attention: checkbox group value is array

export interface CheckboxGroupProps<Data, T> extends ListItemStandardProps<Data, T> {

  /**
   * The data item
   * 
   * 数据项
   * 
   * default: required
   */
  data?: Data[];

  /**
   * If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](/components/Datum.List) object or the Datum.List configuration to process data.
   * 
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * 
   * default: -
   */
  datum?: object;

  /**
   * Initial value
   * 
   * 初始值
   * 
   * default: []
   */
  defaultValue?: T[];

  /**
   * value is datum.getValue()
   * 
   * value 为 datum.getValue()
   * 
   * default: -
   */
  onChange?: (value: T[]) => void;

  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   * 
   * 为 string 时，返回 d[string]。为 function 时，返回函数结果
   * 
   * default: required
   */
  renderItem?: ((data: Data) => ReactNode) | string;

  /**
   * In the Form, the value will be taken over by the form and the value will lose efficacy.
   * 
   * 在Form中，value会被表单接管，value无效
   * 
   * default: -
   */
  value?: T[];

}


declare class CheckboxGroup<Data = any, T = any> extends React.Component<CheckboxGroupProps<Data, T>, {}> {
  render(): JSX.Element;
}


declare class Checkbox<T = any> extends React.Component<CheckboxProps<T>, {}> {
  static Group: typeof CheckboxGroup;

  render(): JSX.Element;
}

export default Checkbox
