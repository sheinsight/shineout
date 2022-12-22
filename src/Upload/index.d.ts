import * as React from 'react'
import { StandardProps, FormItemStandardProps } from "../@types/common"
import { PopoverConfirmProps } from '../Popover/Props'
import {GapProps} from '../Gap/interface'

import { ButtonType } from '../Button/Props'

type ReactNode = React.ReactNode;

type OmitFormProps<value> = Omit<FormItemStandardProps<value>, 'placeholder'>;

interface BaseParams {
  [propName: string]: any
}

export interface Validator {
  customValidator?: (file: File) => (void | Error | Promise<any>)
  ext?: (ext: string) => (void | Error | Promise<any>),
  imageSize?: (image: {width: number, height: number}) => (void | Error),
  size?: (size: number) => (void | Error | Promise<any>),
}

export interface Options<T> {
  /**
   * File
   *
   * 传入文件
   *
   * default: -
   */
  file:  File;
  /**
   * header
   *
   * 请求头部信息
   *
   * default: -
   */
  headers?: BaseParams;
  /**
   * onError callback
   *
   * 上传出错事件(props 中为 onHttpError)
   *
   * default: -
   */
  onError: (xhr?: XMLHttpRequest | object ) => void;
  /**
   * onLoad
   *
   * 上传事件
   *
   * default: -
   */
  onLoad: (xhr?: XMLHttpRequest | object) => void;
  /**
   * onProgress
   *
   * 上传中进度
   *
   * default: -
   */
  onProgress: (event?: ProgressEvent, msg?: string) => any;
  /**
   * onStart
   *
   * 开始上传事件
   *
   * default: -
   */
  onStart?: () => void;
  /**
   * onSuccess
   *
   * 上传成功事件
   *
   * default: -
   */
  onSuccess?: (res?: string, file?: File, data?: any, xhr?: any) => T;
  /**
   * params
   *
   * 上传参数
   *
   * default: -
   */
  params?: BaseParams;
}

export interface UploadProps<T> extends StandardProps, OmitFormProps<T[]> {

  /**
   * The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   *
   * 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   *
   * default: none
   */
  accept?: string;

  /**
   * The address for uploading
   *
   * 上传地址
   *
   * default: required
   */
  action?: string | ((file: File) => string);

  /**
   * Upload placeholder
   *
   * 上传占位内容
   *
   * default: required
   */
  children?: ReactNode;

  /**
   * Request headers
   *
   * 请求头部信息
   *
   * default: none
   */
  headers?: BaseParams;

  /**
   * The filename received by the server. If it is not filled in, use the name.
   *
   * 服务端接收的 filename，不填使用 name
   *
   * default: none
   */
  htmlName?: string;

  /**
   * Maximum number of uploaded files
   *
   * 最大上传文件数
   *
   * default: 100
   */
  limit?: number;

  /**
   * disabled upload action
   *
   * 是否禁用上传行为
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * Custom upload method. options: the options of upload
   *
   * 自定义上传方法。 options: 上传的配置
   *
   * default: -
   */
  request?: (options: Options<T>) => void;

  /**
   * The callback function when the value is changing(Upload successfully, delete). values: Array, the value is the onSuccess returns
   *
   * 值改变回调(上传成功，删除)。values: 数组, 其每个值是 onSuccess 的返回值
   *
   * default: none
   */
  onChange?: (values: T[]) => void;

  /**
   * The callback function when to upload successfully. The returned result is as the new value. res: the result that the upload interface returns。file: selected file. data: the request data. xhr: reponse
   *
   * 上传成功回调，返回结果作为新的 value。res: 上传接口返回结果。file: 选择的文件。data: 请求的数据。xhr: 返回的 response
   *
   * default: none
   */
  onSuccess?: (res: string, file: File, data: any, xhr: any) => T;

  /**
   * The callback function when to upload unsuccessfully. The returned result is as the error message.
   *
   * 上传失败时回调，返回结果作为错误内容提示
   *
   * default: none
   */
  onHttpError?: (xhr: any) => string;

  /**
   * The callback function before cancel upload file.
   *
   * 取消文件上传前的回调
   *
   * default: none
   */
   beforeCancel?: (xhr: any) => void;

  /**
   * Additional parameters submitted to the server
   *
   * 提交到服务端的额外参数
   *
   * default: none
   */
  params?: BaseParams;

  /**
   * Whether to recover deleted values.
   *
   * 是否可以恢复已删除的value
   *
   * default: true
   */
  recoverAble?: boolean;

  /**
   * Display results
   *
   * 结果展示
   *
   * default: a => a
   */
  renderResult?: (data: any) => ReactNode;

  /**
   * Check file before uploading
   *
   * 上传前文件校验
   *
   * default: none
   */
  validator?: Validator;

  /**
   * Whether to take the cookie
   *
   * 是否携带 cookie
   *
   * default: false
   */
  withCredentials?: boolean;

  /**
   * Whether multi-select files are supported
   *
   * 是否支持多选文件
   *
   * default: false
   */
  multiple?: boolean;

  /**
   * Custom content of result
   *
   * 自定义结果的内容
   *
   * default: -
   */
  renderContent?: (res: any, value: T, index: number, values: T[]) => ReactNode;

  /**
   * Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function.
   *
   * 是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error
   *
   * default: true
   */
  validatorHandle?: ((error: any, file: File) => boolean) | boolean;

  /**
   * drop to update
   *
   * 是否开启拖拽上传文件
   *
   * default: false
   */
  drop?: boolean;

  /**
   * Filter after file selection, users can customize the list of files that need to be uploaded eventually. Need to return a new file list
   *
   * 文件选中后的筛选，用户可自定义最终需要上传的文件列表。需返回一个新的文件列表
   *
   * default: none
   */
  filesFilter?: (fileList: any[]) => boolean;

  /**
   * remove update failed callback
   *
   * 上传失败文件删除之后的回调
   *
   * default: none
   */
  onErrorRemove?: (xhr: XMLHttpRequest, file: File) => void;

  /**
   * After disabled the file type filtering provided by accept, it is mandatory to check the file type, value same as accept
   *
   * 在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept
   *
   * default: none
   */
  forceAccept?: string;

  /**
   * Custom error prompt after forceAccept type verification fails
   *
   * forceAccept 类型校验失败后自定义错误提示
   *
   * default: none
   */
  forceAcceptErrorMsg?: string;

  /**
   * show upload list
   *
   * 是否展示上传列表
   *
   * default: true
   */
  showUploadList?: boolean;

  /**
   * Confirmation before deletion
   *
   * 是否在删除文件和图片前弹出确认
   *
   * default: -
   */
  removeConfirm?: string | PopoverConfirmProps;

  /**
   * callback before remove
   *
   * 删除前的确认，返回一个Promise用于最终确定是否删除
   *
   * default: none
   */
  beforeRemove?: (value: T) => Promise<any>;

  /**
   *  Can the file be deleted
   *
   *  文件是否可以删除
   *
   *  default: true
   *
   */
  canDelete?: ((value: T, index: number) => boolean) | boolean,


  /**
   *  set xhr.responseType
   *
   *  设置 xhr.responseType
   *
   *  default: none
   *
   */
  responseType?: string

  // 暂时屏蔽该类型
  /**
   *  The callback of before upload
   *
   *  上传前的回调
   *
   *  default: -
   *
   */
  // beforeUpload?: (file: File) => Promise<any>


  /**
   *  The same as the native webkitdirectory tag
   *
   *  同原生 input 标签的 webkitdirectory 属性
   *
   *  default: -
   *
   */
  webkitdirectory?: boolean | string

  /**
   *  The same as the native webkitdirectory tag
   *
   *  同原生 input 标签的 webkitdirectory 属性
   *
   *  default: -
   *
   */
  onStart?: (file: File) => void
}


export interface UploadImageProps<T> extends UploadProps<T>{
  width?: number;
  height?: number;

  /**
   * The content of the upload button. It can be empty.
   *
   * 上传按钮内容，可为空
   *
   * default: none
   */
  children?: ReactNode;

  /**
   * Add image view is displayed on the left
   *
   * 添加图片视图是否在左侧展示
   *
   * default: false
   */
  leftHandler?: boolean;

  /**
   * Return the link address of the url of the image.
   *
   * 返回图片 url 链接地址
   *
   * default: a => a
   */
  renderResult?: (data: any) => string;

  /**
   * remove update failed callback
   *
   * 上传失败图片删除之后的回调
   *
   * default: none
   */
  onErrorRemove?: (xhr: XMLHttpRequest, file: File) => void;

  /**
   *  how to preview the image
   *
   *  自定义预览图片操作，默认为画廊展示
   *
   *  default: none
   */
  onPreview?:(url: string, value: T, index: number, values: T[], fun: {preview: () => void }) => void;

  /**
   * ignore image preview
   *
   * 是否忽略上传图片预览
   *
   * defualt: false
   */
  ignorePreview?: boolean;

  /**
   * Adjust the spacing to be consistent with the Gap props
   *
   *  调整间距 同 Gap 属性
   *
   *  default: {column: 12, row: 12}
   */

  gapProps?: GapProps

}

export interface UploadImageHandlerProps extends StandardProps {
  /**
   * is disabled
   *
   * 是否禁用
   *
   * default: false
   *
   */
  disabled?: boolean;

  /**
   * custom children
   *
   * 自定义内容
   *
   * default: plus
   */
  children?: ReactNode;

  /**
   * width of element
   *
   * 宽度
   *
   * default: 80
   */
  width?: number;

  /**
   * height of element
   *
   * 高度
   *
   * default: 80
   */
  height?: number;

  /**
   * click callback
   *
   * 点击事件回调
   *
   * default: -
   *
   */
  onClick?: (e: MouseEvent) => void;
}

export interface UploadButtonProps<T> extends UploadProps<T> {

  /**
   * As same as Button type
   *
   * 按钮类型详见按钮Button type属性
   *
   * default: 'primary'
   */
  type?: ButtonType

  /**
   * button default content
   *
   * 按钮默认内容
   *
   * default: none
   */
  placeholder?: ReactNode;

  /**
   * content of uploading, will have spin if a string
   *
   * 上传中按钮的内容，如果是字符串默认会有spin loading
   *
   * default: none
   */
  loading?: ReactNode;

}

// 暂时停用该类型
// type OmitUploadProps<T> = Omit<UploadProps<T>, ('showUploadList' | 'limit')>;
// todo  这儿如果使用 OmitUploadProps 就无法继承
declare class UploadButton<T> extends React.Component<UploadButtonProps<T>, {}> {
  render(): JSX.Element;
}

declare class UploadImage<T> extends React.Component<UploadImageProps<T>, {}> {
  render(): JSX.Element;
}

declare class UploadImageHandler extends React.Component<UploadImageHandlerProps, {}> {
  render(): JSX.Element;
}



export declare class Upload<T> extends React.Component<UploadProps<T>, {}> {
  static Image: typeof UploadImage;

  static ImageHandler: typeof UploadImageHandler;

  static Button: typeof UploadButton;

  render(): JSX.Element;
}

export default Upload
