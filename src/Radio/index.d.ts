import * as React from 'react'
import { RuleParamsType } from '../Rule'
import { StandardProps, StructDataStandardProps, ListItemStandardProps, FormItemStandardProps } from '../@types/common'

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

export interface RadioGroupProps<Value, Item> extends StandardProps, ListItemStandardProps<Item, Value>, FormItemStandardProps<Value>,
  Pick<StructDataStandardProps<Item>,'data','renderItem'> {
}

declare class RadioGroup<Value, Data> extends React.Component<RadioGroupProps<Value, Data>, {}> {
  render(): JSX.Element;
}


declare class Radio<Value> extends React.Component<RadioProps<Value>, {}> {
  static Group: typeof RadioGroup;

  render(): JSX.Element;
}


export default Radio
