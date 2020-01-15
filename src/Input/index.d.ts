import * as React from 'react';

export type InputName = string | any[];

export type InputRules = any[] | string;

export type InputDisabled = boolean | ((...args: any[]) => any);

export type InputWidth = number | string;

export type InputPopover = "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right";

export interface InputProps {
    beforeChange?: (...args: any[]) => any;
    defaultValue?: any;
    name?: InputName;
    onChange?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    popover?: string;
    required?: boolean;
    rules?: InputRules;
    value?: any;
    autoFocus?: boolean;
    border?: boolean;
    className?: string;
    disabled?: InputDisabled;
    error?: Object;
    onBlur?: (...args: any[]) => any;
    onFocus?: (...args: any[]) => any;
    size?: string;
    style?: Object;
    tip?: any;
    width?: InputWidth;
    delay?: number;
    trim?: boolean;
    coin?: boolean;
    digits?: number;
    forceChange?: (...args: any[])=>any;
    htmlName?: string;
    onEnterPress?: (...args: any[])=>any;
    onKeyUp?: (...args: any[])=>any;
    type?: string;
    clearable?: boolean;
}

export default class Input extends React.Component<InputProps, any> {
    render(): JSX.Element;

}