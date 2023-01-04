import * as React from 'react'
import { ObjectType, StandardProps } from '../@types/common'
import { PopoverConfirmProps } from '../Popover/Props'
import { GapProps } from '../Gap/interface'
import { ButtonProps } from '../Button/Props'
import { GetInputableProps } from '../Form/Props'

export interface FileRecord {
  name: string
  process: number
  status: number
  blob: File
  xhr?: XhrType | void
  message?: string
}
export interface Validator {
  customValidator?: (file: File) => void | Error | Promise<any>
  ext?: (ext: string) => void | Error | Promise<any>
  imageSize?: (image: { width: number; height: number }) => void | Error
  size?: (size: number) => void | Error | Promise<any>
}

export interface XhrType {
  status: number
  statusText?: string
  responseType?: XMLHttpRequestResponseType
  responseText?: string
  response?: any
  abort?: () => void
  [key: string]: any
}

export interface UploadOptions<T> {
  url: string
  name: string
  cors?: SimpleUploadProps<T>['cors']
  withCredentials: SimpleUploadProps<T>['withCredentials']
  responseType: SimpleUploadProps<T>['responseType']
  /**
   * File
   *
   * 传入文件
   *
   * default: -
   */
  file: File
  /**
   * header
   *
   * 请求头部信息
   *
   * default: -
   */
  headers?: ObjectType
  /**
   * onError callback
   *
   * 上传出错事件(props 中为 onHttpError)
   *
   * default: -
   */
  onError: (xhr: Partial<XhrType>) => void
  /**
   * onLoad
   *
   * 上传事件
   *
   * default: -
   */
  onLoad: (xhr?: XhrType) => void
  /**
   * onProgress
   *
   * 上传中进度
   *
   * default: -
   */
  onProgress: (event?: ProgressEvent, msg?: string) => any
  /**
   * onStart
   *
   * 开始上传事件
   *
   * default: -
   */
  onStart?: (file: File) => void
  /**
   * onSuccess
   *
   * 上传成功事件
   *
   * default: -
   */
  onSuccess?: (res?: string, file?: File, data?: any, xhr?: XhrType) => T | Error
  /**
   * params
   *
   * 上传参数
   *
   * default: -
   */
  params?: ObjectType
}
export interface SimpleUploadProps<ValueItem> extends StandardProps {
  /**
   * The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   *
   * 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   *
   * default: none
   */
  accept?: string
  /**
   * The address for uploading
   *
   * 上传地址
   *
   * default: required
   */
  action?: string | ((file: File) => string)
  // 暂时屏蔽该类型
  /**
   *  The callback of before upload
   *
   *  上传前的回调
   *
   *  default: -
   *
   */
  beforeUpload?: (file: File, validatorHandle: (error: Error, file: File) => boolean) => Promise<any>
  /**
   * Upload placeholder
   *
   * 上传占位内容
   *
   * default: required
   */
  children?: React.ReactNode
  cors?: boolean
  imageStyle?: React.CSSProperties
  /**
   * Request headers
   *
   * 请求头部信息
   *
   * default: none
   */
  headers?: ObjectType
  /**
   * The filename received by the server. If it is not filled in, use the name.
   *
   * 服务端接收的 filename，不填使用 name
   *
   * default: none
   */
  htmlName?: string
  /**
   * Maximum number of uploaded files
   *
   * 最大上传文件数
   *
   * default: 100
   */
  limit?: number
  /**
   * Whether multi-select files are supported
   *
   * 是否支持多选文件
   *
   * default: false
   */
  multiple?: boolean
  name?: string
  /**
   * The callback function when the value is changing(Upload successfully, delete). values: Array, the value is the onSuccess returns
   *
   * 值改变回调(上传成功，删除)。values: 数组, 其每个值是 onSuccess 的返回值
   *
   * default: none
   */
  onChange: (values: ValueItem[]) => void
  /**
   * onProgress
   *
   * 上传中进度
   *
   * default: -
   */
  onProgress?: ((fileInfo: FileRecord) => any) | false
  /**
   * onSuccess
   *
   * 上传成功事件
   *
   * default: -
   */
  onSuccess?: (res: any, file: File, data?: any, xhr?: XhrType) => ValueItem | Error
  /**
   * onError callback
   *
   * 上传出错事件(props 中为 onHttpError)
   *
   * default: -
   */
  onError?: (xhr: XhrType, file: File) => string | undefined
  /**
   * The callback function when to upload unsuccessfully. The returned result is as the error message.
   *
   * 上传失败时回调，返回结果作为错误内容提示
   *
   * default: none
   */
  onHttpError?: (xhr: XhrType, file: File) => string | undefined
  /**
   * The callback function before cancel upload file.
   *
   * 取消文件上传前的回调
   *
   * default: none
   */
  beforeCancel?: (xhr: XhrType) => void
  /**
   * Additional parameters submitted to the server
   *
   * 提交到服务端的额外参数
   *
   * default: none
   */
  params?: ObjectType
  /**
   * Whether to recover deleted values.
   *
   * 是否可以恢复已删除的value
   *
   * default: true
   */
  recoverAble?: boolean
  /**
   * Display results
   *
   * 结果展示
   *
   * default: a => a
   */
  renderResult?: (data: any) => React.ReactNode
  /**
   * Custom upload method. options: the options of upload
   *
   * 自定义上传方法。 options: 上传的配置
   *
   * default: -
   */
  request?: (options: UploadOptions<ValueItem>) => XhrType | void

  validateHook: (func: () => Promise<any>) => void
  /**
   * Check file before uploading
   *
   * 上传前文件校验
   *
   * default: none
   */
  validator?: Validator
  value: ValueItem[]
  customResult?: React.ComponentType<{
    value: any
    files: any
    onValueRemove: (index: number) => void
    onFileRemove: (id: string) => void
  }>
  /**
   * Whether to take the cookie
   *
   * 是否携带 cookie
   *
   * default: false
   */
  withCredentials?: boolean
  /**
   *  callback when start
   *
   *  开始上传的回调函数
   *
   *  default: -
   *
   */
  onStart?: (file: File) => void
  /**
   * show upload list
   *
   * 是否展示上传列表
   *
   * default: true
   */
  showUploadList?: boolean
  /**
   * Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function.
   *
   * 是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error
   *
   * default: true
   */
  validatorHandle?: ((error: any, file: File) => boolean) | boolean
  /**
   * is disabled
   *
   * 是否禁用
   *
   * default: false
   *
   */
  disabled?: boolean
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
   * Custom content of result
   *
   * 自定义结果的内容
   *
   * default: -
   */
  renderContent?: (res: any, value: ValueItem, index: number, values: ValueItem[]) => React.ReactNode
  /**
   * drop to update
   *
   * 是否开启拖拽上传文件
   *
   * default: false
   */
  drop?: boolean
  /**
   * Filter after file selection, users can customize the list of files that need to be uploaded eventually. Need to return a new file list
   *
   * 文件选中后的筛选，用户可自定义最终需要上传的文件列表。需返回一个新的文件列表
   *
   * default: none
   */
  filesFilter?: (fileList: File[]) => File[]
  /**
   * remove update failed callback
   *
   * 上传失败图片删除之后的回调
   *
   * default: none
   */
  onErrorRemove?: (xhr: XhrType, file: File, fileInfo?: any) => void
  forceAccept?: boolean
  /**
   * Add image view is displayed on the left
   *
   * 添加图片视图是否在左侧展示
   *
   * default: false
   */
  leftHandler?: boolean
  /**
   *  how to preview the image
   *
   *  自定义预览图片操作，默认为画廊展示
   *
   *  default: none
   */
  onPreview?: (url: string, value: ValueItem, index: number, values: ValueItem[], fun: { preview: () => void }) => void
  /**
   * Confirmation before deletion
   *
   * 是否在删除文件和图片前弹出确认
   *
   * default: -
   */
  removeConfirm?: string | PopoverConfirmProps
  /**
   * callback before remove
   *
   * 删除前的确认，返回一个Promise用于最终确定是否删除
   *
   * default: none
   */
  beforeRemove?: (value: ValueItem) => Promise<any>
  /**
   * Custom error prompt after forceAccept type verification fails
   *
   * forceAccept 类型校验失败后自定义错误提示
   *
   * default: none
   */
  forceAcceptErrorMsg?: string
  /**
   *  Can the file be deleted
   *
   *  文件是否可以删除
   *
   *  default: true
   *
   */
  canDelete?: ((value: ValueItem, index: number) => boolean) | boolean
  /**
   * Adjust the spacing to be consistent with the Gap props
   *
   *  调整间距 同 Gap 属性
   *
   *  default: {column: 12, row: 12}
   */

  gapProps?: GapProps
  /**
   *  set xhr.responseType
   *
   *  设置 xhr.responseType
   *
   *  default: none
   *
   */
  responseType?: XMLHttpRequestResponseType
}

export interface FileInputProps extends Pick<SimpleUploadProps<any>, 'webkitdirectory' | 'accept' | 'multiple'> {
  onChange: (e: any) => void
}

export interface AcceptUpload<ValueItem> extends Omit<SimpleUploadProps<ValueItem>, 'forceAccept'> {
  /**
   * After disabled the file type filtering provided by accept, it is mandatory to check the file type, value same as accept
   *
   * 在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept
   *
   * default: none
   */
  forceAccept?: string
}

export interface DropProps<ValueItem> extends Pick<AcceptUpload<ValueItem>, 'drop' | 'accept' | 'disabled'> {
  multiple?: boolean
  dropData?: any
  onDrop?: (files: File[], index: number) => void
  className?: string
}

export interface FileProps {
  id: string
  message?: string
  name: string
  onRemove: (id: string) => void
  process: number
  status: number
}

export interface ImageFileProps {
  id: string
  message?: string
  onRemove: (id: string) => void
  process: number
  status: number
  style?: React.CSSProperties
  data?: string
}

export interface SimpleUploadImageProps<ValueItem> extends AcceptUpload<ValueItem> {
  height?: number
  width?: number
  /**
   * ignore image preview
   *
   * 是否忽略上传图片预览
   *
   * defualt: false
   */
  ignorePreview?: boolean
}

export interface UploadImageHandlerProps {
  className?: string
  disabled?: boolean
  urlInvalid?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  width?: number
  height?: number
  onKeyDown?: React.KeyboardEventHandler
  onMouseDown?: React.MouseEventHandler
  [key: string]: any
}

export interface UploadImageResultProps {
  index: number
  value: any
  values: any[]
  onRecover?: (index: number, value: any) => void
  recoverAble?: boolean
  showRecover?: boolean
  style?: React.CSSProperties
  onRemove?: (index: number) => void
  renderResult?: AcceptUpload<any>['renderResult']
  renderContent?: AcceptUpload<any>['renderContent']
  onPreview?: AcceptUpload<any>['onPreview']
  removeConfirm?: AcceptUpload<any>['removeConfirm']
}

// Upload.Button
export interface UploadProgressProps<ValueItem>
  extends AcceptUpload<ValueItem>,
    Pick<ButtonProps, 'type' | 'size' | 'outline'> {
  placeholder?: React.ReactNode
  loading?: React.ReactNode
}

export interface UploadRemoveConfirmProps {
  confirm?: AcceptUpload<any>['removeConfirm']
  onRemove?: () => void
  onVisibleChange?: (v: boolean) => void
}

export interface UploadResultProps {
  index: number
  value: any
  onRecover?: (index: number, value: any) => void
  recoverAble?: boolean
  showRecover?: boolean
  style?: React.CSSProperties
  onRemove?: (index: number) => void
  renderResult?: AcceptUpload<any>['renderResult']
  renderContent?: AcceptUpload<any>['renderContent']
  onPreview?: AcceptUpload<any>['onPreview']
  removeConfirm?: AcceptUpload<any>['removeConfirm']
}

// export
export type UploadImageProps<ValueItem> = GetInputableProps<SimpleUploadImageProps<ValueItem>, ValueItem[]>

export declare class Image<ValueItem> extends React.Component<UploadImageProps<ValueItem>, any> {
  render: () => JSX.Element
}

export declare class ImageHandler extends React.Component<UploadImageHandlerProps, any> {
  render: () => JSX.Element
}

export type UploadButtonProps<ValueItem> = GetInputableProps<UploadProgressProps<ValueItem>, ValueItem[]>

export declare class UploadButton<ValueItem> extends React.Component<UploadButtonProps<ValueItem>, any> {
  render: () => JSX.Element
}

// 废弃
export declare class UploadDragger extends React.Component<any, any> {
  render: () => JSX.Element
}

export type UploadProps<ValueItem> = GetInputableProps<AcceptUpload<ValueItem>, ValueItem[]>

export declare class Upload<ValueItem> extends React.Component<UploadProps<ValueItem>, any> {
  static Image: typeof Image

  static ImageHandler: typeof ImageHandler

  static Button: typeof UploadButton

  static Dragger: typeof UploadDragger

  render: () => JSX.Element
}

export type UploadType = typeof Upload
