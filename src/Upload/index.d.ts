import * as React from 'react';

export type UploadAction = string | ((...args: any[]) => any);

export type UploadOnProgress = boolean | ((...args: any[]) => any);

export type UploadRecoverAble = boolean | number;

export type UploadCustomResult = React.ReactElement<any> | ((...args: any[]) => any);

export type UploadValidatorHandle = boolean | ((...args: any[]) => any);

export type UploadWebkitdirectory = boolean | string;

export interface UploadProps {
    accept?: string;
    action?: UploadAction;
    beforeUpload?: (...args: any[]) => any;
    children?: any;
    className?: string;
    cors?: boolean;
    imageStyle?: Object;
    headers?: Object;
    htmlName?: string;
    limit?: number;
    multiple?: boolean;
    name?: string;
    onChange?: (...args: any[]) => any;
    onProgress?: UploadOnProgress;
    onSuccess?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onHttpError?: (...args: any[]) => any;
    params?: Object;
    recoverAble?: UploadRecoverAble;
    renderResult?: (...args: any[]) => any;
    request?: (...args: any[]) => any;
    validateHook?: (...args: any[]) => any;
    validator?: Object;
    value?: any[];
    customResult?: UploadCustomResult;
    style?: Object;
    withCredentials?: boolean;
    onStart?: (...args: any[]) => any;
    showUploadList?: boolean;
    validatorHandle?: UploadValidatorHandle;
    disabled?: boolean;
    webkitdirectory?: UploadWebkitdirectory;
    renderContent?: (...args: any[]) => any;
    drop?: boolean;
}

export default class Upload extends React.Component<UploadProps, any> {
    render(): JSX.Element;

}