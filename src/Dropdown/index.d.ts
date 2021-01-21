import * as React from 'react'

type DropdownType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link';
type triggerType = 'click' | 'hover';

export interface DropDownProps<T = any>{
    /**
     * Specifies the dropdown should be disabled
     * 是否开启动画
     * default: true
     */
    animation?: boolean;

    /**
     * extend className
     * 扩展className
     * default: -
     */
    className?: string;

    /**
     * Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately.
     * 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度
     * default: -
     */
    columns?: number;

    /**
     * data of dropdown
     * 下拉数据
     * default: false
     */
    data: Array<T>;
    
    /**
     * Specifies the dropdown should be disabled
     * 禁用
     * default: false
     */
    disabled?: boolean;

    /**
     * The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called.
     * 点击事件。参数为渲染的数据,注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick
     * default: -
     */
    onClick?: ( data: object) => void;

    /**
     * same as Button
     * 同 Button；
     * default: -
     */
    outline?: boolean;

    /**
     * Displayed content of the button
     * 按钮显示内容
     * default: -
     */
    placeholder: string | React.ReactNode;

    /**
     * Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data.
     * 设置显示的内容,如果是字符串,则为对应的值<br />如果是函数,则返回值为显示的内容,参数为当条数据
     * default: -
     */
    renderItem?: (data: T) => (React.ReactNode | string);

    /**
     * same as Button
     * 同 Button；
     * default: 'default'
     */
    size?: string;

    /**
     * Toggle mode
     * 触发方式；
     * default: 'click'
     */
    trigger?: triggerType;

    /**
     * type of Dropdown
     * 类型
     * default: -
     */
    type?: DropdownType;
    
    /**
     * The width of the pop-up option layer
     * 弹出选项层的宽度
     * default: -
     */
    width?: number;    
}

declare class DropDown extends React.Component<DropDownProps> {
    render(): JSX.Element
}

export default DropDown