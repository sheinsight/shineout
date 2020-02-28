import * as React from 'react';

export interface TableProps {
    columns?: any[];
    data?: any[];
    striped?: boolean;
    style?: object;
    onRowSelect?: (...args: any[]) => any;
    datum?: Object;
    sorter?: (...args: any[]) => any;
    onSortCancel?: (...args: any[]) => any;
    loading?: boolean;
    pagination: Object;
    treeColumnsName?: string;
    defaultTreeExpandKeys?: any[];
    treeExpandKeys?: any[];
    onTreeExpand?: (...args: any[]) => any;
    onScroll?: (x: number, y: number) => void;
    rowClassName?: (record: any, index: number) => string;
    rowsInView?: number;
}

export default class Table extends React.Component<TableProps, any> {
    render(): JSX.Element;

}