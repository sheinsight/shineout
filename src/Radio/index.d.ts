import * as React from 'react'
import { StandardProps,StructDataStandardProps,ListItemStandardProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface RadioProps<Item = any> extends StandardProps {

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


}

export interface RadioGroupProps<Item, Value> extends StandardProps,ListItemStandardProps<Item, Value>,
  Pick<StructDataStandardProps<Item>,'data','renderItem'> {


  /**
   * The name of a Form that accesses data
   *
   * Form 存取数据的名称
   *
   * default: null
   */
  name?: string;


  /**
   * value is the datum.getValue()
   *
   * value 为 datum.getValue()
   *
   * default: null
   */
  onChange?: (value: Value) => void;


  /**
   * 在Form中，value会被表单接管，value无效
   *
   * 是否禁用
   *
   * default: null
   */
  value?: any;


  /**
   * When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: ((data: Value) => boolean) | boolean;

}

declare class RadioGroup<Value, Data> extends React.Component<RadioGroupProps<Value, Data>, {}> {
  render(): JSX.Element;
}


declare class Radio<Value> extends React.Component<RadioProps<Value>, {}> {
  static Group: typeof RadioGroup;

  render(): JSX.Element;
}


export default Radio
