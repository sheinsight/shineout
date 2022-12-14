import * as React from 'react'
import { StandardProps, StructDataStandardProps, ListItemStandardProps, FormItemStandardProps } from '../@types/common'
import { ReactNode } from "react"


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
  Pick<StructDataStandardProps<Item>,'data' | 'renderItem'> {
  /**
   * setting the block property can changed it to be vertical layout.
   *
   * 设置 block 属性可以改为垂直布局
   *
   * default: false
   */
  block?: boolean;

  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode;

}

declare class RadioGroup<Value, Data> extends React.Component<RadioGroupProps<Value, Data>, {}> {
  render(): JSX.Element;
}


declare class Radio<Value> extends React.Component<RadioProps<Value>, {}> {
  static Group: typeof RadioGroup;

  render(): JSX.Element;
}


export default Radio
