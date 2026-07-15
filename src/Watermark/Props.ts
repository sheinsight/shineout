import * as React from 'react'
import { StandardProps } from '../@types/common'

export interface WatermarkFont {
  color?: CanvasFillStrokeStyles['fillStyle']
  fontSize?: number
  fontWeight?: 'normal' | 'lighter' | 'bold' | 'bolder' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
  textAlign?: CanvasTextAlign
}

export interface WatermarkText {
  text: string
  font?: WatermarkFont
}

export type WatermarkContent = string | WatermarkText

/**
 * @title Watermark
 */
export interface WatermarkProps extends StandardProps {
  /**
   * @en Protected content
   * @cn 需要添加水印的内容
   */
  children?: React.ReactNode

  /**
   * @en Watermark text. An array renders multiple lines, and each line can override the font.
   * @cn 水印文本。数组会渲染为多行，每行可以单独覆盖字体样式
   */
  content?: WatermarkContent | WatermarkContent[]

  /**
   * @en Image source. It has higher priority than content, and falls back to content when loading fails.
   * @cn 水印图片地址，优先级高于 content，加载失败时回退显示 content
   */
  image?: string

  /**
   * @en Watermark width. Text uses its measured width by default, while images default to 120.
   * @cn 单个水印的宽度。文本默认使用测量宽度，图片默认为 120
   */
  width?: number

  /**
   * @en Watermark height. Text uses its measured height by default, while images default to 64.
   * @cn 单个水印的高度。文本默认使用测量高度，图片默认为 64
   */
  height?: number

  /**
   * @en Rotation angle in degrees
   * @cn 水印旋转角度，单位为度
   * @default -22
   */
  rotate?: number

  /**
   * @en Watermark layer z-index
   * @cn 水印层的 z-index
   * @default 999
   */
  zIndex?: number

  /**
   * @en Horizontal and vertical gaps between watermarks
   * @cn 水印之间的水平和垂直间距
   * @default [100, 100]
   */
  gap?: [number, number]

  /**
   * @en Offset from the container's top-left corner. Defaults to half of gap.
   * @cn 水印相对容器左上角的偏移量，默认值为 gap 的一半
   * @default [gap[0] / 2, gap[1] / 2]
   */
  offset?: [number, number]

  /**
   * @en Text font configuration
   * @cn 文本字体配置
   * @default { color: 'rgba(0, 0, 0, 0.15)', fontSize: 16, fontWeight: 'normal', fontStyle: 'normal', fontFamily: 'sans-serif', textAlign: 'center' }
   */
  font?: WatermarkFont

  /**
   * @en Whether portal Modal and Drawer components inherit the watermark
   * @cn Portal 模式的 Modal 和 Drawer 是否继承水印
   * @default true
   */
  inherit?: boolean

  /**
   * @en Callback fired when an externally removed watermark layer is restored
   * @cn 水印层被外部删除并恢复时触发的回调
   */
  onRemove?: () => void
}
