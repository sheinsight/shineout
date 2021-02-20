import * as React from 'react'
import { StandardProps, RegularAttributes } from '../@types/common'


export interface IconComProps extends StandardProps {

  /**
   * The unicode code of the icon.
   *
   * 图标 unicode 编码，和 name 二选一
   *
   * default: -
   */
  children?: React.ReactNode;

  /**
   * desc: Icon class name (the part without the prefix)
   * 
   * 图标类名（去除前缀的部分），值参照具体使用的图标库
   * 
   * default:
   */
  name?: string;

  /**
   * desc: Icon size, same as style.fontsize
   * 
   * 图标大小，和 style.fontSize 相同
   * 
   * default:
   */
  fontSize?: string | number;

  /**
   * desc: Built-in color type
   * 
   *内置颜色类型

   * default: 'default'
   */
  type?: RegularAttributes.Type;

  /**
   * Size of pagination
   * 
   * 尺寸
   * 
   * default: 'default'
   */
  size?: RegularAttributes.Size;

}

export type IconCom = React.FC<IconComProps>

/**
 * Function, returns a new component. A project can create more than one, but fontFamily must be the unique.
 * 
 * 函数，返回一个新的组件，一个项目内可以创建多个，但是 fontFamily 不能相同
 * 
 * @param url 图标css或js文件地址，使用在线地址，不需要引入到项目中。如果在 link或script 中已经引用过，可以为空(null)
 * @param fontFamily font-family 需要和引入的css/js文件内的font-family一致
 * @param prefix 类名前缀
 */
declare function Icon(url: string, fontFamily = 'iconfont', prefix = 'icon'): IconCom

export default Icon
