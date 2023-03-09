import * as React from 'react'
import { ReactNode } from 'react'
import { ObjectType, StandardProps } from '../@types/common'
import { PopoverConfirmProps } from '../Popover/Props'
import { GapProps } from '../Gap/Props'
import { ButtonProps } from '../Button/Props'
import { GetInputableProps } from '../Form/Props'

/**
 * @title Upload
 */
export interface FileRecord {
  name: string
  process: number
  status: number
  blob: File
  xhr?: XhrType | void
  message?: string
}
/**
 * @title Validator
 */
export interface Validator {
  /**
   * @en custom validator
   * @cn 自定义校验
   * @override union
   */
  customValidator?: (file: File) => void | Error | Promise<any>
  /**
   * @en Judge the file extension, return the Error when the verification fails.
   * @cn 判断后缀名，传入参数为文件后缀，校验失败返回 Error
   * @override union
   */
  ext?: (ext: string) => void | Error | Promise<any>
  /**
   * @en It is only valid for Image to determine the size of images and return the Error when the verification fails.
   * @cn 只对 Image 有效，判断图片尺寸，校验失败返回 Error
   * @override union
   */
  imageSize?: (image: { width: number; height: number }) => void | Error
  /**
   * @en Judge the size of the file and return the Error when the verification fails.
   * @cn 判断文件大小，校验失败返回 Error
   * @override union
   */
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
   * @en incoming file
   * @cn 传入文件
   */
  file: File
  /**
   * @en request header information
   * @cn 请求头部信息
   */
  headers?: ObjectType
  /**
   * @en onError callback
   * @cn 上传出错事件(props 中为 onHttpError)
   */
  onError: (xhr: Partial<XhrType>) => void
  /**
   * @en onLoad
   * @cn 上传事件
   */
  onLoad: (xhr?: XhrType) => void
  /**
   * @en onProgress
   * @cn 上传中进度
   */
  onProgress: (event?: ProgressEvent, msg?: string) => any
  /**
   * @en onStart
   * @cn 开始上传事件
   */
  onStart?: (file: File) => void
  /**
   * @en onSuccess
   * @cn 上传成功事件
   * @override union
   */
  onSuccess?: (res?: string, file?: File, data?: any, xhr?: XhrType) => T | Error
  /**
   * @en params
   * @cn 上传参数
   */
  params?: ObjectType
}
export interface SimpleUploadProps<ValueItem> extends StandardProps {
  /**
   * @en The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   * @cn 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   */
  accept?: string
  /**
   * @en The address for uploading
   * @cn 上传地址
   * @default 'required'
   * @override union
   */
  action?: string | ((file: File) => string)
  /**
   * @en The callback of before upload
   * @cn 上传前的回调
   */
  beforeUpload?: (file: File, validatorHandle: (error: Error, file: File) => boolean) => Promise<any>
  /**
   * @en Upload placeholder
   * @cn 上传占位内容
   * @default 'required'
   */
  children?: React.ReactNode
  cors?: boolean
  imageStyle?: React.CSSProperties
  /**
   * @en Request headers
   * @cn 请求头部信息
   */
  headers?: ObjectType
  /**
   * @en The filename received by the server. If it is not filled in, use the name.
   * @cn 服务端接收的 filename，不填使用 name
   */
  htmlName?: string
  /**
   * @en Maximum number of uploaded files
   * @cn 最大上传文件数
   * @default 100
   */
  limit?: number
  /**
   * @en Whether multi-select files are supported
   * @cn 是否支持多选文件
   * @default false
   */
  multiple?: boolean
  name?: string
  /**
   * @en The callback function when the value is changing(Upload successfully, delete). values: Array, the value is the onSuccess returns
   * @cn 值改变回调(上传成功，删除)。values: 数组, 其每个值是 onSuccess 的返回值
   */
  onChange: (values: ValueItem[]) => void
  /**
   * @en onProgress
   * @cn 上传中进度
   * @override union
   */
  onProgress?: ((fileInfo: FileRecord) => any) | false
  /**
   * @en onSuccess
   * @cn 上传成功事件
   * @override union
   */
  onSuccess?: (res: any, file: File, data?: any, xhr?: XhrType) => ValueItem | Error
  /**
   * @en onError callback
   * @cn 上传出错事件(props 中为 onHttpError)
   * @override union
   */
  onError?: (xhr: XhrType, file: File) => string | undefined
  /**
   * @en The callback function when to upload unsuccessfully. The returned result is as the error message.
   * @cn 上传失败时回调，返回结果作为错误内容提示
   * @override union
   */
  onHttpError?: (xhr: XhrType, file: File) => string | undefined
  /**
   * @en The callback function before cancel upload file.
   * @cn 取消文件上传前的回调
   */
  beforeCancel?: (xhr: XhrType) => void
  /**
   * @en Additional parameters submitted to the server
   * @cn 提交到服务端的额外参数
   */
  params?: ObjectType
  /**
   * @en Whether to recover deleted values.
   * @cn 是否可以恢复已删除的value
   * @default true
   */
  recoverAble?: boolean
  /**
   * @en Display results
   * @cn 结果展示
   * @default a => a
   */
  renderResult?: (data: any) => React.ReactNode
  /**
   * @en Custom upload method. options: the options of upload
   * @cn 自定义上传方法。 options: 上传的配置
   * @override union
   */
  request?: (options: UploadOptions<ValueItem>) => XhrType | void

  validateHook: (func: () => Promise<any>) => void
  /**
   * @en Check file before uploading
   * @cn 上传前文件校验
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
   * @en Whether to take the cookie
   * @cn 是否携带 cookie
   * @default false
   */
  withCredentials?: boolean
  /**
   * @en callback when start
   * @cn 开始上传的回调函数
   */
  onStart?: (file: File) => void
  /**
   * @en show upload list
   * @cn 是否展示上传列表
   * @default true
   */
  showUploadList?: boolean
  /**
   * @en Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function.
   * @cn 是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error
   * @default true
   * @override union
   */
  validatorHandle?: ((error: any, file: File) => boolean) | boolean
  /**
   * @en is disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @en The same as the native webkitdirectory tag
   * @cn 同原生 input 标签的 webkitdirectory 属性
   * @override union
   */
  webkitdirectory?: boolean | string
  /**
   * @en Custom content of result
   * @cn 自定义结果的内容
   */
  renderContent?: (res: any, value: ValueItem, index: number, values: ValueItem[]) => React.ReactNode
  /**
   * @en drop to update
   * @cn 是否开启拖拽上传文件
   * @default false
   */
  drop?: boolean
  /**
   * @en Filter after file selection, users can customize the list of files that need to be uploaded eventually. Need to return a new file list
   * @cn 文件选中后的筛选，用户可自定义最终需要上传的文件列表。需返回一个新的文件列表
   */
  filesFilter?: (fileList: File[]) => File[]
  /**
   * @en remove update failed callback
   * @cn 上传失败图片删除之后的回调
   */
  onErrorRemove?: (xhr: XhrType, file: File, fileInfo?: any) => void
  forceAccept?: boolean
  /**
   * @en Add image view is displayed on the left
   * @cn 添加图片视图是否在左侧展示
   * @default false
   */
  leftHandler?: boolean
  /**
   * @en how to preview the image
   * @cn 自定义预览图片操作，默认为画廊展示
   */
  onPreview?: (url: string, value: ValueItem, index: number, values: ValueItem[], fun: { preview: () => void }) => void
  /**
   * @en Confirmation before deletion
   * @cn 是否在删除文件和图片前弹出确认
   * @override union
   */
  removeConfirm?: string | PopoverConfirmProps
  /**
   * @en callback before remove
   * @cn 删除前的确认，返回一个Promise用于最终确定是否删除
   */
  beforeRemove?: (value: ValueItem) => Promise<any>
  /**
   * @en Custom error prompt after forceAccept type verification fails
   * @cn forceAccept 类型校验失败后自定义错误提示
   */
  forceAcceptErrorMsg?: string
  /**
   * @en Can the file be deleted
   * @cn 文件是否可以删除
   * @default true
   * @override union
   */
  canDelete?: ((value: ValueItem, index: number) => boolean) | boolean
  /**
   * @en Adjust the spacing to be consistent with the Gap props
   * @cn 调整间距 同 Gap 属性
   * @default {column: 12, row: 12}
   */

  gapProps?: GapProps
  /**
   * @en set xhr.responseType
   * @cn 设置 xhr.responseType
   */
  responseType?: XMLHttpRequestResponseType
}

export interface FileInputProps extends Pick<SimpleUploadProps<any>, 'webkitdirectory' | 'accept' | 'multiple'> {
  onChange: (e: any) => void
}

export interface AcceptUpload<ValueItem> extends Omit<SimpleUploadProps<ValueItem>, 'forceAccept'> {
  /**
   * @en After disabled the file type filtering provided by accept, it is mandatory to check the file type, value same as accept
   * @cn 在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept
   */
  forceAccept?: string
}

export interface DraggerProps {
  children: React.ReactNode
  multiple: boolean
  addFile: (...args: any) => void
  accept: string
  disabled?: boolean
  limit: number
}

export interface DropProps<ValueItem> extends Pick<AcceptUpload<ValueItem>, 'drop' | 'accept' | 'disabled'> {
  multiple?: boolean
  dropData?: any
  onDrop?: (files: File[], index: number) => void
  className?: string
  children?: ReactNode
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
   * @en ignore image preview
   * @cn 是否忽略上传图片预览
   * @default false
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
/**
 * @title Button
 */
export interface UploadProgressProps<ValueItem>
  extends AcceptUpload<ValueItem>,
    Pick<ButtonProps, 'type' | 'size' | 'outline'> {
  /**
   * @en button default content
   * @cn 按钮默认内容
   */
  placeholder?: React.ReactNode
  /**
   * @en content of uploading, will have spin if a string
   * @cn 上传中按钮的内容，如果是字符串默认会有spin loading
   */
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
