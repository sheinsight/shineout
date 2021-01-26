import * as React from 'react'

type ReactNode = React.ReactNode;

declare class Divider extends React.Component<DividerProps, {}> { 
  
  render(): JSX.Element;
}

export interface DividerProps {
  
    /**
     * desc: Content, text or react component
     * default: -
     */
    children?: ReactNode;
  
    /**
     * desc: Extend className
     * default: -
     */
    className?: string;
  
    /**
     * desc: Container element style
     * default: -
     */
    style?: React.CSSProperties;
  
    /**
     * desc: mode of divider
     * default: *horizontal*
     */
    mode?: 'horizontal' | 'vertical';
  
    /**
     * desc: The position of title inside divider
     * default: *center*
     */
    orientation?: 'center' | 'left' | 'right';
  
}

export default Divider
