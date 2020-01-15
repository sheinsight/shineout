import * as React from 'react';

export type FormScrollToError = boolean | number;

export interface FormProps {
    datum?: Object;
    disabled?: boolean;
    inline?: boolean;
    layout?: string;
    pending?: boolean;
    onError?: (...args: any[]) => any;
    onReset?: (...args: any[]) => any;
    onSubmit?: (...args: any[]) => any;
    rules?: Object;
    scrollToError?: FormScrollToError;
    setFormStatus?: (...args: any[]) => any;
    throttle?: number;
}

export default class Form extends React.Component<FormProps, any> {
    render(): JSX.Element;

}