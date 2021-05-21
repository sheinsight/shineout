import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface CarouselProps extends StandardProps {

    /**
     * animation effects, options: <br />slide - horizontal sliding<br />slide-y - vertical sliding<br />fade - fading
     * 
     * 动画效果，可选值为 slide - 横向滑动 ，slide-y - 垂直滑动 ，fade - 淡入淡出
     * 
     * default: 'slide'
     */
     animation?: string;
  
     /**
      * the position of indicator
      * 
      * 指示标示位置
      * 
      * default: 'center'
      */
     indicatorPosition?: 'left' | 'center' | 'right';
   
     /**
      * the style of indicator, string options: ['circle', 'number', 'line'], using function for custom styles
      * 
      * 指示标示样式，字符串可以是：['circle', 'number', 'line']，函数则可以自定义样式: (current, moveTo) => (<Component />)
      * 
      * default: 'circle'
      */
     indicatorType?: ((current: number, moveTo: () => void) => ReactNode) | string;
   
     /**
      * the interval of animation, When it is not 0, play automatically
      * 
      * 动画间隔时间，为 0 时，不自动播放
      * 
      * default: 0
      */
     interval?: number;

     /**
      * move callback
      * 
      * 轮播后的回调
      * 
      * default: none
      */
     onMove?: (current: number, extra: { prev: number, direction: 'forward' | 'backward', moveTo: (n: number) => void}) => void;
}


declare class Carousel extends React.Component<CarouselProps> {
  render(): JSX.Element
}

export default Carousel