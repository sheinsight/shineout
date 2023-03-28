import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

/**
 * @title Carousel
 */
export interface CarouselProps extends StandardProps {
  /**
   * @en animation effects, options: \nslide - horizontal sliding\nslide-y - vertical sliding\nfade - fading
   * @cn 动画效果，可选值为 slide - 横向滑动 ，slide-y - 垂直滑动 ，fade - 淡入淡出
   * @default 'slide'
   */
  animation?: 'slide' | 'slide-y' | 'fade'

  /**
   * @en the position of indicator
   * @cn 指示标示位置
   * @default 'center'
   */
  indicatorPosition?: 'left' | 'center' | 'right'

  /**
   * @en the style of indicator, using function for custom styles
   * @cn 指示标示样式, 函数则可以自定义样式: (current, moveTo) => (<Component />)
   * @default 'circle'
   */
  indicatorType?: ((current: number, moveTo: (index: number) => void) => ReactNode) | 'circle' | 'number' | 'line'

  /**
   * @en the interval of animation, When it is not 0, play automatically
   * @cn 动画间隔时间，为 0 时，不自动播放
   * @default 0
   */
  interval?: number

  /**
   * @en move callback
   * @cn 轮播后的回调
   */
  onMove?: (
    current: number,
    extra: { prev: number; direction: 'forward' | 'backward'; moveTo: (n: number) => void }
  ) => void

  /**
   * @en children
   * @cn 子元素
   *
   */
  children?: ReactNode

  /**
   * @en When to show the switch trigger
   * @cn 切换箭头显示时机
   *
   */
  showArrow?: 'always' | 'hover'
  /**
   * @en The additional css class for arrow
   * @cn 箭头扩展 class
   */
  arrowClassName?: string
}
