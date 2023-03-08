import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode
export interface ImageProps extends StandardProps {
  /**
   * @en the height of the image(When the value is percentage, the ratio is the width of the image)
   * @cn 图片高度(值为百分比时，对比值为图片宽度)
   * @default '100%'
   * @override union
   */
  height?: string | number

  /**
   * @en original picture address
   * @cn 原始图片地址
   */
  href?: string

  /**
   * @en whether to delay loading, number to set lazy offset
   * @cn 是否延迟加载，如果为数字则表示懒加载偏移量
   * @default false
   * @override union
   */
  lazy?: boolean | number

  /**
   * @en the picture address
   * @cn 图片地址
   * @default required
   */
  src?: string

  /**
   * @en Alternate address, applied when src is invalid
   * @cn 备用地址，src无效时会应用
   */
  alt?: string

  /**
   * @en callback of image src or alt request fail
   * @cn src或alt 地址请求出错回调
   */
  onError?: (error: Event, type?: number) => void

  /**
   * @en target of image
   * @cn 图片打开方式
   * @default '_modal'
   * @override union
   */
  target?: '_modal' | '_blank' | '_self' | '_download'

  /**
   * @en the width of the image
   * @cn 图片宽度
   * @default '100%'
   * @override union
   */
  width?: string | number

  /**
   * @en loading image placeholder content
   * @cn 图片加载中占位内容
   * @default 'loading'
   */
  placeholder?: ReactNode

  /**
   * @en the special element selector witch container the lazy image, such as: '#id', '.class'
   * @cn 对特定元素进行懒加载判断的选择器, 如: '#id', '.class'
   * @override union
   */
  container?: string | Element

  /**
   * @en image error placeholder
   * @cn 图片载入错误的文案
   */
  error?: ReactNode

  /**
   * @en auto transform protocol
   * @cn 是否根据页面自动转换协议
   * @default false
   */
  autoSSL?: boolean

  /**
   * @en fit the container
   * @cn 适应容器的方式
   * @override union
   */
  fit?: 'fill' | 'fit' | 'stretch' | 'center'

  /**
   * @en shape of image
   * @cn 图片样式
   * @default 'rounded'
   * @override union
   */
  shape?: 'rounded' | 'circle' | 'thumbnail'

  /**
   * @en The callback of click
   * @cn 点击图片的回调
   */
  onClick?: (e: React.MouseEvent) => void

  /**
   * @en The original property of html
   * @cn 原生 title 属性
   */
  title?: string

  /**
   * @en The original property of html
   * @cn 是否禁止 img 元素原生 draggable 属性
   * @default false
   */
  noImgDrag?: boolean
}

export interface ImageGroupProps extends StandardProps {
  /**
   * @en the height of single image(When the value is percentage, the ratio is the width of the image)
   * @cn 单个图片高度(值为百分比时，对比值为图片宽度)
   * @default '100%'
   * @override union
   */
  height?: string | number

  /**
   * @en whether to delay loading
   * @cn 是否延迟加载
   * @default false
   */
  lazy?: boolean

  /**
   * @en whether to stack
   * @cn 是否堆叠
   * @default false
   */
  pile?: boolean

  /**
   * @en target of image
   * @cn 图片打开方式
   * @default '_modal'
   * @override union
   */
  target?: '_modal' | '_blank' | '_self' | '_download'

  /**
   * @en the width of single picture
   * @cn 单个图片宽度
   * @default '100%'
   * @override union
   */
  width?: string | number

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}
