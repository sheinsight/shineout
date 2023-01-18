import React from 'react'
import {FormItemStandardProps, StandardProps} from '../@types/common'

export interface SwitchProps extends
  StandardProps,
  Pick<FormItemStandardProps<boolean>, 'defaultValue' | 'value' | 'onChange' | 'name' >{

  /**
   * checked status，will in control when pass
   *
   * 当前选中状态，checked 传入时为受控组件
   *
   * default: none
   */
  checked?: boolean;

  /**
   * content with checked and unchecked
   *
   * 选中和未选中时的内容
   *
   * default: none
   */
  content?: React.ReactNodeArray;

  /**
   * disable switch
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * size of switch
   *
   * 开关大小
   *
   * default: 'default'
   */
  size?: 'default' | 'small' | 'large';

  /**
   * Whether to keep the content displayed when the Size is small
   *
   * 在 size 为 small 时，是否保持内容显示
   *
   * default: 'default'
   */
   keepContentShow?: boolean

}

declare class Switch extends React.Component<SwitchProps, any>{
  render(): JSX.Element
}

export default Switch
