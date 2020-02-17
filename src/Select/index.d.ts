import * as React from 'react';

export interface SelectProps {
    clearable?: any;
    data?: any;
    height?: any;
    itemsInView?: any;
    lineHeight?: any;
    loading?: any;
    multiple?: any;
    renderItem?: any;
    text?: any;
    compressed?: any;
    trim?: any;
    autoAdapt?: any;
    showArrow?: any;
    focusSelected?: any;
    noCache?: boolean;
}

export default class Select extends React.Component<SelectProps, any> {
    render(): JSX.Element;

}