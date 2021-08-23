import React from 'react'
import {FormItemStandardProps} from '../@types/common'

export interface SwitchProps extends
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

}

declare class Switch extends React.Component<SwitchProps, any>{}

export default Switch
