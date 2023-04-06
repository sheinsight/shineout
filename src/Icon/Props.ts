import * as React from 'react'
import { StandardProps } from '../@types/common'

/**
 * @title Icon
 * @subTitle function(url, fontFamily, prefix):ReactClass
 * @en Function, returns a new component. A project can create more than one, but fontFamily must be the unique.
 * @cn 函数，返回一个新的组件，一个项目内可以创建多个，但是 fontFamily 不能相同
 */
interface IconArgs {
  /**
   * @en The address of css or js file of the icon. If it has been introduced in the link/script tag, it can be empty.
   * @cn 图标css或js文件地址，使用在线地址，不需要引入到项目中。如果在 link或script 中已经引用过，可以为空字符串
   */
  url: string
  /**
   * @en The font-family needs to be the same as the font-family in the introduced CSS/JS file
   * @cn font-family 需要和引入的css/js文件内的font-family一致
   * @default "iconfont"
   */
  fontFamily?: string
  /**
   * @en The prefix of the class
   * @cn 类名前缀
   * @default "icon"
   */
  prefix?: string
}

/**
 * @title MyIcon
 * @en Component created by the Icon function
 * @cn Icon函数创建的图标组件
 */
export interface IconCompProps extends StandardProps {
  /**
   * @en The unicode code of the icon.
   * @cn 图标 unicode 编码，和 name 二选一
   */
  children?: React.ReactNode

  /**
   * @en Icon class name (the part without the prefix)
   * @cn 图标类名（去除前缀的部分），值参照具体使用的图标库
   * @default ''
   */
  name?: string

  /**
   * @en Icon size, same as style.fontsize
   * @cn 图标大小，和 style.fontSize 相同
   */
  fontSize?: string | number

  /**
   * @en Built-in color type
   * @cn 内置颜色类型
   * @default 'default'
   */
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'

  /**
   * @inner 内部属性
   */
  prefix?: string

  /**
   * @inner 内部属性
   */
  fontFamily?: string

  /**
   * @inner 内部属性
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
declare function Icon(url: IconArgs['url'], fontFamily?: IconArgs['fontFamily'], prefix?: IconArgs['prefix']): IconComp

export default Icon
