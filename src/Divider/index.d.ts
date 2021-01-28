import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface DividerProps extends StandardProps{
  
    /**
     * desc: Content, text or react component
     * 
     * 分割线中文字内容
     * 
     * default: -
     */
    children?: ReactNode;
  
    /**
     * desc: mode of divider
     * 
     * 分割线排布模式
     * 
     * default: *horizontal*
     */
    mode?: 'horizontal' | 'vertical';
  
    /**
     * desc: The position of title inside divider
     * 
     * 水平分割线的文字排布位置
     * 
     * default: *center*
     */
    orientation?: 'center' | 'left' | 'right';
  
}



declare class Divider extends React.Component<DividerProps, {}>  {}
export default Divider