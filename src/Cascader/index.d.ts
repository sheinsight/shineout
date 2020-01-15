import * as React from 'react';

export type CascaderDisabled = boolean | ((...args: any[]) => any);

export type CascaderExpandTrigger = "click" | "hover" | "hover-only";

export type CascaderMode = 0 | 1 | 2 | 3;

export type CascaderZIndex = number | string;

export interface CascaderProps {
    clearable?: boolean;
    data?: any[];
    defaultValue?: string[];
    disabled?: CascaderDisabled;
    expandTrigger?: CascaderExpandTrigger;
    height?: number;
    keygen?: any;
    loader?: (...args: any[]) => any;
    mode?: CascaderMode;
    onBlur?: (...args: any[]) => any;
    onChange?: (...args: any[]) => any;
    onFocus?: (...args: any[]) => any;
    onItemClick?: (...args: any[]) => any;
    placeholder?: any;
    position?: string;
    renderItem?: any;
    size?: string;
    style?: Object;
    value?: any[];
    absolute?: boolean;
    zIndex?: CascaderZIndex;
    childrenKey?: string;
}

export default class Cascader extends React.Component<CascaderProps, any> {
    render(): JSX.Element;

}