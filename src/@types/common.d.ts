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

export interface FormItemStandardProps<Value = any> {
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

export interface ListItemStandardProps<Item = any> {
  /**
   * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * 
   * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   * 
   * default: index
   */
  keygen: ((data: Item) => string) | string;
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

export type keyType = string | number | symbol

export declare namespace RegularAttributes {
    type Size = 'small' | 'default' | 'large';
    type Type = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' 
}