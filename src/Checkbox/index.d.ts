import * as React from 'react';

export type CheckboxChecked = any | any | "indeterminate" | ((...args: any[]) => any);

export type CheckboxSize = "small" | "default" | "large";

export interface CheckboxProps {
    clearable?: boolean;
    checked?: CheckboxChecked;
    inputable?: boolean;
    htmlValue?: any;
    index?: number;
    onChange?: (...args: any[]) => any;
    onRawChange?: (...args: any[]) => any;
    value?: any;
    onClick?: (...args: any[]) => any;
    size?: CheckboxSize;
    content?: any[];
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
    render(): JSX.Element;

}