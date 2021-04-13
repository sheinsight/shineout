import * as React from 'react'

export interface StandardProps {
    /**
     * extend className
     * 
     * 扩展className
     * 
     * default: -
     */
    className?: string;

    /**
     * style object
     * 
     * 内联样式
     * 
     * default: none
     */
    style?: React.CSSProperties;

    [key: string]: any;
}

export type keyType = string | number | symbol

export interface FormItemStandardProps<Value = any> {

    /**
     * The name of a Form that accesses data
     *
     * Form 存取数据的名称
     *
     * default: -
     */
    name?: string;

    /**
     * select default content
     *
     * 默认占位内容 placeholder
     *
     * default: none
     */
    placeholder?: React.ReactNode;
    
    /**
     * Default selected key (not controlled)
     * 
     * 默认选中的 key （非受控）
     * 
     * default: 无
     */
    defaultValue?: Value;

    /**
     * Selected key (controlled)
     * 
     * 选中的 key （受控)
     * 
     * default: -
     */
    value?: Value;

    /**
     * value change callback
     * 
     * 值改变回调
     * 
     * default: -
     */
    onChange?: (value: Value) => void;
}
export interface ListItemStandardProps<Item = any, Value = any> {
    /**
     * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
     * 
     * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
     * 
     * default: index
     */
    keygen: ((data: Item) => keyType) | string | true;


    /**
     * When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
     *
     * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
     *
     * default: false
     */
    disabled?: ((data: Item) => boolean) | boolean;

    /**
     * Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value.
     *
     * 格式化 value。 默认值，返回原始数据。 为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。为函数时，以函数返回结果作为 value。
     *
     * default: d => d
     */
    format?: ((data: Item) => any) | string;

    /**
     * By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
     *
     * (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
     *
     * default: (val, d) => val===format(d)
     */
    prediction?: (value: Value extends any[] ? Value[0] : Value, data: Item) => boolean;
}

export interface StructDataStandardProps<Item = any> {
    /**
     * When it is a string, return d[string]. When it is a function, return the result of the function.
     * 
     * 为 string 时，返回 d[string]。 为 function 时，返回函数结果
     * 
     * default: d => d
     */
    renderItem?: ((data: Item, index: number) => React.ReactNode) | string;

    /**
     * The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
     * 
     * 选中后在结果中显示的内容，默认和 renderItem 相同
     * 
     * default: renderItem
     */
    renderResult?: ((data: Item, index: number) => React.ReactNode) | string;

    /**
     * data
     * 
     * 数据
     * 
     * default: empty data
     */
    data?: Item[],
}

export interface CommonProps {
    /**
     * When it is true, the pop-up layer of option append into document.body.
     *
     * 为 true 时，选项弹出层在 DOM 中独立 render
     *
     * default: false
     */
    absolute?: boolean;


    /**
     * If clearable is true, show clear value icon
     *
     * 是否可清除值
     *
     * default: false
     */
    clearable?: boolean;


    /**
     * options z-index
     *
     * 选项列表 z-index 值
     *
     * default: 1000
     */
    zIndex?: number;

}
export declare namespace RegularAttributes {
    type Size = 'small' | 'default' | 'large';
    type Type = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' ;
    type Position = 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
    type Align = 'left' | 'center' | 'right';
}