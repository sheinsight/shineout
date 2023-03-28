import { CSSProperties, ReactNode } from 'react'

export interface InputTitleProps {
  open?: boolean
  /**
   * @en inner title
   * @cn 内嵌标题
   */
  innerTitle?: ReactNode

  /**
   * @en Placeholder title, which needs to be used together with innerTitle
   * @cn 占位标题，需要配合 innerTitle 一起使用
   */
  placeTitle?: ReactNode
  children: ReactNode
  className?: string
  style?: CSSProperties
  titleClass?: string
  contentClass?: string
}
