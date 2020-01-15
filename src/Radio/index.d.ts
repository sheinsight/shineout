import * as React from 'react';

export type RadioChecked = any | any | "indeterminate" | ((...args: any[]) => any);

export type RadioSize = "small" | "default" | "large";

export interface RadioProps {
    clearable?: boolean;
    checked?: RadioChecked;
    inputable?: boolean;
    htmlValue?: any;
    index?: number;
    onChange?: (...args: any[]) => any;
    onRawChange?: (...args: any[]) => any;
    value?: any;
    onClick?: (...args: any[]) => any;
    size?: RadioSize;
    content?: any[];
}

export default class Radio extends React.Component<RadioProps, any> {
    render(): JSX.Element;

}