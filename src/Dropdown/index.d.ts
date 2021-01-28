import * as React from 'react'

import { StandardProps, RegularAttributes, StructDataStandardProps } from '../@types/common'

type TriggerType = 'click' | 'hover';

interface DropdownNode {
    content?: React.ReactNode
    children?: DropdownItem[]
    onClick?: (data: DropdownNode) => void
    renderItem?: (data: DropdownNode) => void
    target?: string
    url?: string
    [key: string]: any
}

export type DropdownItem = DropdownNode | React.ReactNode

export interface DropdownProps extends StandardProps, Pick<StructDataStandardProps<DropdownNode>, 'renderItem'>{
    /**
     * Specifies the dropdown should be disabled
     * 
     * 是否开启动画
     * 
     * default: true
     */
    animation?: boolean;

    /**
     * Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately.
     * 
     * 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度
     * 
     * default: -
     */
    columns?: number;

    /**
     * data of dropdown
     * 
     * 下拉数据
     * 
     * default: []
     */
    data: DropdownItem[];
    
    /**
     * Specifies the dropdown should be disabled
     * 
     * 禁用
     * 
     * default: false
     */
    disabled?: boolean;

    /**
     * The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called.
     * 
     * 点击事件。参数为渲染的数据,注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick
     * 
     * default: -
     */
    onClick?: (data: DropdownNode) => void;

    /**
     * same as Button
     * 
     * 同 Button
     * 
     * default: -
     */
    outline?: boolean;

    /**
     * Displayed content of the button
     * 
     * 按钮显示内容
     * 
     * default: -
     */
    placeholder?: React.ReactNode;

    /**
     * same as Button
     * 
     * 同 Button
     * 
     * default: 'default'
     */
    size?: RegularAttributes.Size;

    /**
     * Toggle mode
     * 
     * 触发方式
     * 
     * default: 'click'
     */
    trigger?: TriggerType;

    /**
     * type of Dropdown
     * 
     * 类型
     * 
     * default: -
     */
    type?: RegularAttributes.Type;
    
    /**
     * The width of the pop-up option layer
     * 
     * 弹出选项层的宽度
     * 
     * default: -
     */
    width?: number;    
}

declare class Dropdown extends React.Component<DropdownProps> {}

export default Dropdown