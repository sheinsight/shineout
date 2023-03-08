import * as React from 'react'
import { StandardProps, RegularAttributes } from '../@types/common'

export interface IconCompProps extends StandardProps {
  /**
   * @en The unicode code of the icon.
   * @cn 图标 unicode 编码，和 name 二选一
   */
  children?: React.ReactNode

  /**
   * @en Icon class name (the part without the prefix)
   * @cn 图标类名（去除前缀的部分），值参照具体使用的图标库
   */
  name?: string

  /**
   * @en Icon size, same as style.fontsize
   * @cn 图标大小，和 style.fontSize 相同
   * @override union
   */
  fontSize?: string | number

  /**
   * @en Built-in color type
   * @cn 内置颜色类型
   * @default 'default'
   * @override union
   */
  type?: RegularAttributes.Type | 'info'

  /**
   * @en Size of pagination
   * @cn 尺寸
   * @default 'default'
   */
  size?: RegularAttributes.Size

  /**
   * @en Size of pagination
   * @cn 类名前缀
   * @default 'default'
   */
  prefix?: string

  /**
   * @en Size of pagination
   * @cn font-family 需要和引入的css/js文件内的font-family一致
   * @default 'iconfont'
   */
  fontFamily?: string

  /**
   * -
   *
   * -
   *
   * -
   */
  ext?: string
}

type IconComp = React.FC<IconCompProps>

/**
 * Function, returns a new component. A project can create more than one, but fontFamily must be the unique.
 *
 * 函数，返回一个新的组件，一个项目内可以创建多个，但是 fontFamily 不能相同
 *
 * @param url 图标css或js文件地址，使用在线地址，不需要引入到项目中。如果在 link或script 中已经引用过，可以为空(null)
 * @param fontFamily font-family 需要和引入的css/js文件内的font-family一致
 * @param prefix 类名前缀
 */

declare function Icon(url: string, fontFamily?: string, prefix?: string): IconComp

export default Icon
