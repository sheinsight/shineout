import * as React from 'react'
import { StandardProps, RegularAttributes } from '../@types/common'


export interface IconComProps extends StandardProps {

  /**
   * Content, text or react component
   *
   * 内容，文字或react组件
   *
   * default: -
   */
  children?: React.ReactNode;

  /**
   * desc: Icon class name (prefix part)
   * 图标类名（前缀部分）
   * default: 'icon'
   */
  prefix?: string;

  /**
   * desc: Icon class name (the part without the prefix)
   * 图标类名（去除前缀的部分）
   * default:
   */
  name?: string;

  /**
   * desc: Need to be consistent with the font-family in the imported css file
   * 需要和引入的css文件内的font-family一致
   * default: 'iconfont'
   */
  fontFamily?: string;

  /**
   * desc: Icon size, same as style.fontsize
   * 图标大小，和 style.fontSize 相同
   * default:
   */
  fontSize?: string | number;

  /**
   * desc: Built-in color type
   *内置颜色类型
   * default: 'default'
   */
  type?: RegularAttributes.Type;

  /**
   * Size of pagination
   * 尺寸
   * default: 'default'
   */
  size?: RegularAttributes.Size;

}

export type IconCom = React.FC<IconComProps>

declare function Icon(url: string, fontFamily?: string = 'iconfont', prefix?: string = 'icon'): IconCom

export default Icon
