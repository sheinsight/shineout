import * as React from 'react';

export type TextareaInfo = ((...args: any[]) => any) | number;

export interface TextareaProps {
    autosize?: boolean;
    forceChange?: (...args: any[]) => any;
    info?: TextareaInfo;
    maxHeight?: number;
    onBlur?: (...args: any[]) => any;
    onChange: (...args: any[]) => any;
    onEnterPress?: (...args: any[]) => any;
    rows?: number;
    value?: string;
}

export default class Textarea extends React.Component<TextareaProps, any> {
    render(): JSX.Element;

}