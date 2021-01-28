import * as React from 'react'
import { StandardProps, RegularAttributes } from '../@types/common'


export interface IconProps extends StandardProps {

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


  /**
   * desc: Icon CSS file addresses, using online addresses, don't need to be included in the project if it's already referenced in the link, it can be null
   * 图标css文件地址，使用在线地址，不需要引入到项目中。如果在 link 中已经引用过，可以为空(null)
   * default:
   */
  url?: string;

}

declare class Icon extends React.Component<IconProps> {}
export default Icon
