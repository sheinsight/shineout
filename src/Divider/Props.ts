import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

/**
 * @title Divider
 */
export interface DividerProps extends StandardProps {
  /**
   * @en Content, text or react component
   * @cn 分割线中文字内容
   */
  children?: ReactNode

  /**
   * @en mode of divider
   * @cn 分割线排布模式
   * @default "horizontal"
   */
  mode?: 'horizontal' | 'vertical'

  /**
   * @en The position of title inside divider
   * @cn 水平分割线的文字排布位置
   * @default "center"
   */
  orientation?: 'center' | 'left' | 'right'
}
