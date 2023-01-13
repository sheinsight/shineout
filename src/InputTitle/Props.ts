import { CSSProperties, ReactNode } from 'react'

export interface InputTitleProps {
  open?: boolean
  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode
  /**
   * Placeholder title, which needs to be used together with innerTitle
   *
   * 占位标题，需要配合 innerTitle 一起使用
   *
   * default: -
   */
  placeTitle?: ReactNode
  children: ReactNode
  className?: string
  style?: CSSProperties
  titleClass?: string
  contentClass?: string
}
