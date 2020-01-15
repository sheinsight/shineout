import * as React from 'react';

export type SwitchSize = "small" | "default" | "large";

export interface SwitchProps {
    clearable?: boolean;
    inputable?: boolean;
    htmlValue?: any;
    index?: number;
    onChange?: (...args: any[]) => any;
    onRawChange?: (...args: any[]) => any;
    value?: any;
    onClick?: (...args: any[]) => any;
    size?: SwitchSize;
    content?: any[];
}

export default class Switch extends React.Component<SwitchProps, any> {
    render(): JSX.Element;

}