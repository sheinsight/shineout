import * as React from 'react';

export type DatePickerDisabled = boolean | ((...args: any[]) => any);

export type DatePickerRange = boolean | number;

export type DatePickerDefaultTime = string | any[];

export type DatePickerValue = number | string | Object | any[];

export type DatePickerZIndex = number | string;

export type DatePickerChildren = string | Object;

export type DatePickerMin = number | string | Object;

export type DatePickerMax = number | string | Object;

export interface DatePickerProps {
    clearable?: boolean;
    disabled?: DatePickerDisabled;
    format?: string;
    formatResult?: string;
    inputable?: boolean;
    placeholder?: any;
    onBlur: (...args: any[]) => any;
    onChange: (...args: any[]) => any;
    onFocus: (...args: any[]) => any;
    position?: string;
    range?: DatePickerRange;
    size?: string;
    type?: string;
    allowSingle?: boolean;
    defaultTime?: DatePickerDefaultTime;
    value?: DatePickerValue;
    absolute?: boolean;
    zIndex?: DatePickerZIndex;
    onValueBlur?: (...args: any[]) => any;
    children?: DatePickerChildren;
    quickSelect?: any[];
    min?: DatePickerMin;
    max?: DatePickerMax;
    defaultRangeMonth?: any[];
}

export default class DatePicker extends React.Component<DatePickerProps, any> {
    render(): JSX.Element;

}