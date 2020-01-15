import * as React from 'react';

export type TransferKeygen = string | ((...args: any[]) => any);

export type TransferRenderItem = string | ((...args: any[]) => any);

export type TransferDisabled = boolean | ((...args: any[]) => any);

export type TransferEmpty = string | Object;

export type TransferLoading = boolean | any[];

export interface TransferProps {
    titles?: any[];
    data?: any[];
    datum?: Object;
    keygen?: TransferKeygen;
    renderItem?: TransferRenderItem;
    footers?: any[];
    operations?: any[];
    operationIcon?: boolean;
    value?: any[];
    className?: string;
    style?: Object;
    listClassName?: string;
    listStyle?: Object;
    selectedKeys?: any[];
    defaultSelectedKeys?: any[];
    onSelectChange?: (...args: any[]) => any;
    disabled?: TransferDisabled;
    empty?: TransferEmpty;
    onFilter?: (...args: any[]) => any;
    itemClass?: string;
    loading?: TransferLoading;
}

export default class Transfer extends React.Component<TransferProps, any> {
    render(): JSX.Element;

}