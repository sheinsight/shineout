import * as React from 'react';

export type TreeSelectValue = any[] | any;

export type TreeSelectDisabled = boolean | ((...args: any[]) => any);

export type TreeSelectRenderItem = string | ((...args: any[]) => any);

export type TreeSelectMode = 0 | 1 | 2 | 3;

export type TreeSelectZIndex = number | string;

export interface TreeSelectProps {
    value?: TreeSelectValue;
    clearable?: boolean;
    data?: any[];
    datum?: Object;
    disabled?: TreeSelectDisabled;
    filterText?: string;
    renderResult?: (...args: any[]) => any;
    height?: number;
    multiple?: boolean;
    position?: string;
    renderItem?: TreeSelectRenderItem;
    result?: any[];
    size?: string;
    defaultExpanded?: string[];
    expanded?: string[];
    loader?: (...args: any[]) => any;
    mode?: TreeSelectMode;
    line?: boolean;
    onChange?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
    onExpand?: (...args: any[]) => any;
    onBlur?: (...args: any[]) => any;
    onFilter?: (...args: any[]) => any;
    onFocus?: (...args: any[]) => any;
    empty?: string;
    compressed?: boolean;
    absolute?: boolean;
    parentClickExpand?: boolean;
    zIndex?: TreeSelectZIndex;
}

export default class TreeSelect extends React.Component<TreeSelectProps, any> {
    render(): JSX.Element;

}