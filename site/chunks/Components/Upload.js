/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Upload/cn.md'
import en from 'doc/pages/components/Upload/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange',
      'Base \n Basic usage for uploading file, the onSuccess\'s returns will be the onChange params'
    ),
    component: require('doc/pages/components/Upload/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-01-base.tsx'),

  },
  {
    name: '01-onChange',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义结果 \n 默认展示的结果和 value 里面所存储的值是一样的, 如果有需求需要, 可以用 renderResult 自行处理',
      'Custom result \n The result of the default display is the same as the value stored in the value. If there is a need, you can use the renderResult to handle it yourself.'
    ),
    component: require('doc/pages/components/Upload/example-01-onChange.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-01-onChange.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-01-onChange.tsx'),

  },
  {
    name: '02-image',
    isTs: true,
    isTest: false,
    title: locate(
      '上传图片 \n 使用 Upload.Image 处理带预览的图片上传',
      'Image \n Use Upload.Image to upload and preview images.'
    ),
    component: require('doc/pages/components/Upload/example-02-image.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-02-image.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-02-image.tsx'),

  },
  {
    name: '02-show-image',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义结果内容 \n 使用  renderContent 可以自定义上传之后的图片结果.',
      'Custom result content \n Use renderContent to customize the image results after uploading.'
    ),
    component: require('doc/pages/components/Upload/example-02-show-image.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-02-show-image.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-02-show-image.tsx'),

  },
  {
    name: '03-button',
    isTs: true,
    isTest: false,
    title: locate(
      '按钮上传 \n 使用 Upload.Button 展示单个文件的上传进度',
      'Button \n Use Upload.Button to show the upload progress of individual files'
    ),
    component: require('doc/pages/components/Upload/example-03-button.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-03-button.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-03-button.tsx'),

  },
  {
    name: '03-confirm',
    isTs: true,
    isTest: false,
    title: locate(
      '删除确认 \n 设置 removeConfirm 属性来开启删除前确认',
      'Remove Confirm \n Set the removeConfirm property to enable confirmation before deleting'
    ),
    component: require('doc/pages/components/Upload/example-03-confirm.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-03-confirm.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-03-confirm.tsx'),

  },
  {
    name: '04-validator',
    isTs: true,
    isTest: false,
    title: locate(
      '校验 \n 通过 validator.imageSize 校验图片长宽，本例为 200px * 100px',
      'Validator \n Set validator.imageSize to validate the width and height of the image.'
    ),
    component: require('doc/pages/components/Upload/example-04-validator.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-04-validator.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-04-validator.tsx'),

  },
  {
    name: '05-filesize',
    isTs: true,
    isTest: false,
    title: locate(
      '文件大小 \n 文件大小校验，本例为 10KB',
      ' \n Set validator.size to validate the size of the file. This example is 10KB.'
    ),
    component: require('doc/pages/components/Upload/example-05-filesize.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-05-filesize.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-05-filesize.tsx'),

  },
  {
    name: '06-error',
    isTs: true,
    isTest: false,
    title: locate(
      '异常处理 \n onHttpError 用来处理上传到服务器返回的异常',
      'Error \n Set onHttpError to handle exceptions returned by uploading to the server.'
    ),
    component: require('doc/pages/components/Upload/example-06-error.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-06-error.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-06-error.tsx'),

  },
  {
    name: '08-request-a',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义上传 \n 通过 request 函数，替代默认上传方法',
      'Custom Request \n Set request property to use your own XMLHttpRequest.'
    ),
    component: require('doc/pages/components/Upload/example-08-request-a.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-08-request-a.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-08-request-a.tsx'),

  },
  {
    name: '08-request-ignore',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 使用 request 略过上传过程',
      ' \n ignore request with request'
    ),
    component: require('doc/pages/components/Upload/example-08-request-ignore.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-08-request-ignore.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-08-request-ignore.tsx'),

  },
  {
    name: '09-zip',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 此事例演示通过自定义函数压缩文件后上传',
      ' \n Zip file and upload.'
    ),
    component: require('doc/pages/components/Upload/example-09-zip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-09-zip.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-09-zip.tsx'),

  },
  {
    name: '10-defaultValue',
    isTs: true,
    isTest: false,
    title: locate(
      '默认值 \n 默认值示例',
      'defaultValue \n defaultValue example'
    ),
    component: require('doc/pages/components/Upload/example-10-defaultValue.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-10-defaultValue.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-10-defaultValue.tsx'),

  },
  {
    name: '11-dragger',
    isTs: true,
    isTest: false,
    title: locate(
      '拖拽上传 \n 设置 drop 来支持拖拽上传',
      'Drag and Drop \n set drop to Drag files to upload.'
    ),
    component: require('doc/pages/components/Upload/example-11-dragger.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/example-11-dragger.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/example-11-dragger.tsx'),

  },
  {
    name: 'test-001-tip',
    isTs: true,
    isTest: true,
    title: locate(
      'Tip不恢复问题 \n 修复删除错误后Tip不恢复的问题',
      ''
    ),
    component: require('doc/pages/components/Upload/test-001-tip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Upload/test-001-tip.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Upload/test-001-tip.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Upload","properties":[{"name":"children","tag":{"cn":"上传占位内容","en":"Upload placeholder","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"disabled","tag":{"cn":"是否禁用","en":"is disabled","default":"false","version":""},"required":false,"type":"boolean "},{"name":"value","tag":{"cn":"defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖 在 Form 中，value会被表单接管，value 无效","en":"value","default":"","version":""},"required":false,"type":"any[]"},{"name":"onChange","tag":{"cn":"值改变回调(上传成功，删除)。values: 数组, 其每个值是 onSuccess 的返回值","en":"The callback function when the value is changing(Upload successfully, delete). values: Array, the value is the onSuccess returns","default":"","version":""},"required":false,"type":"(values: ValueItem[]) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"上传出错事件(props 中为 onHttpError)","en":"onError callback","default":"","version":""},"required":false,"type":"((xhr: Xhr, file: File) => string ) "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"Form 内存取数据的 key","en":"The key access data in the Form","default":"","version":""},"required":false,"type":"string "},{"name":"renderResult","tag":{"cn":"结果展示","en":"Display results","default":"a => a","version":""},"required":false,"type":"((data: any) => ReactNode) "},{"name":"limit","tag":{"cn":"最大上传文件数","en":"Maximum number of uploaded files","default":"100","version":""},"required":false,"type":"number "},{"name":"htmlName","tag":{"cn":"服务端接收的 filename，不填使用 name","en":"The filename received by the server. If it is not filled in, use the name.","default":"","version":""},"required":false,"type":"string "},{"name":"multiple","tag":{"cn":"是否支持多选文件","en":"Whether multi-select files are supported","default":"false","version":""},"required":false,"type":"boolean "},{"name":"forceAccept","tag":{"cn":"在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept)","en":"After disabled the file type filtering provided by accept, it is mandatory to check the file type, value same as accept","default":"","version":""},"required":false,"type":"string "},{"name":"accept","tag":{"cn":"上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)","en":"The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)","default":"","version":""},"required":false,"type":"string "},{"name":"action","tag":{"cn":"上传地址","en":"The address for uploading","default":"","version":""},"required":false,"type":"string | ((file: File) => string) "},{"name":"beforeUpload","tag":{"cn":"上传前的回调","en":"The callback of before upload","default":"","version":""},"required":false,"type":"((file: File, validatorHandle: (error: Error, file: File) => boolean) => Promise<any>) "},{"name":"headers","tag":{"cn":"请求头部信息","en":"Request headers","default":"","version":""},"required":false,"type":"{ [name: string]: V } "},{"name":"onProgress","tag":{"cn":"上传中进度","en":"onProgress","default":"","version":""},"required":false,"type":"false | ((fileInfo: {  name: string, process: number, status: number, blob: File, xhr?: void | Xhr , message?: string  }) => any) "},{"name":"onSuccess","tag":{"cn":"上传成功事件","en":"onSuccess","default":"","version":""},"required":false,"type":"((res: any, file: File, data?: any, xhr?: Xhr ) => Error | ValueItem) "},{"name":"onHttpError","tag":{"cn":"上传失败时回调，返回结果作为错误内容提示","en":"The callback function when to upload unsuccessfully. The returned result is as the error message.","default":"","version":""},"required":false,"type":"((xhr: Xhr, file: File) => string ) "},{"name":"beforeCancel","tag":{"cn":"取消文件上传前的回调","en":"The callback function before cancel upload file.","default":"","version":""},"required":false,"type":"((xhr: Xhr) => void) "},{"name":"params","tag":{"cn":"提交到服务端的额外参数","en":"Additional parameters submitted to the server","default":"","version":""},"required":false,"type":"{ [name: string]: V } "},{"name":"recoverAble","tag":{"cn":"是否可以恢复已删除的value","en":"Whether to recover deleted values.","default":"true","version":""},"required":false,"type":"boolean "},{"name":"request","tag":{"cn":"自定义上传方法。 options: 上传的配置","en":"Custom upload method. options: the options of upload","default":"","version":""},"required":false,"type":"(options: UploadOptions) => Xhr | void"},{"name":"validator","tag":{"cn":"上传前文件校验","en":"Check file before uploading","default":"","version":""},"required":false,"type":"Validator"},{"name":"customResult","tag":{"cn":"自定义Result 组件","en":"custom Result component","default":"","version":""},"required":false,"type":"ComponentType<{ value: any; files: any; onValueRemove: (index: number) => void; onFileRemove: (id: string) => void; }> "},{"name":"withCredentials","tag":{"cn":"是否携带 cookie","en":"Whether to take the cookie","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onStart","tag":{"cn":"开始上传的回调函数","en":"callback when start","default":"","version":""},"required":false,"type":"((file: File) => void) "},{"name":"showUploadList","tag":{"cn":"是否展示上传列表","en":"show upload list","default":"true","version":""},"required":false,"type":"boolean "},{"name":"validatorHandle","tag":{"cn":"是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error","en":"Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function.","default":"true","version":""},"required":false,"type":"boolean | ((error: any, file: File) => boolean) "},{"name":"webkitdirectory","tag":{"cn":"同原生 input 标签的 webkitdirectory 属性","en":"The same as the native webkitdirectory tag","default":"","version":""},"required":false,"type":"string | boolean "},{"name":"renderContent","tag":{"cn":"自定义结果的内容","en":"Custom content of result","default":"","version":""},"required":false,"type":"((res: any, value: ValueItem, index: number, values: ValueItem[]) => ReactNode) "},{"name":"drop","tag":{"cn":"是否开启拖拽上传文件","en":"drop to update","default":"false","version":""},"required":false,"type":"boolean "},{"name":"filesFilter","tag":{"cn":"文件选中后的筛选，用户可自定义最终需要上传的文件列表。需返回一个新的文件列表","en":"Filter after file selection, users can customize the list of files that need to be uploaded eventually. Need to return a new file list","default":"","version":""},"required":false,"type":"((fileList: File[]) => File[]) "},{"name":"onErrorRemove","tag":{"cn":"上传失败图片删除之后的回调","en":"remove update failed callback","default":"","version":""},"required":false,"type":"((xhr: Xhr, file: File, fileInfo?: any) => void) "},{"name":"onPreview","tag":{"cn":"自定义预览图片操作，默认为画廊展示","en":"how to preview the image","default":"","version":""},"required":false,"type":"((url: string, value: ValueItem, index: number, values: ValueItem[], fun: { preview: () => void; }) => void) "},{"name":"removeConfirm","tag":{"cn":"是否在删除文件和图片前弹出确认","en":"Confirmation before deletion","default":"","version":""},"required":false,"type":"string | PopoverConfirmProps "},{"name":"beforeRemove","tag":{"cn":"删除前的确认，返回一个Promise用于最终确定是否删除","en":"callback before remove","default":"","version":""},"required":false,"type":"((value: ValueItem) => Promise<any>) "},{"name":"forceAcceptErrorMsg","tag":{"cn":"forceAccept 类型校验失败后自定义错误提示","en":"Custom error prompt after forceAccept type verification fails","default":"","version":""},"required":false,"type":"string "},{"name":"canDelete","tag":{"cn":"文件是否可以删除","en":"Can the file be deleted","default":"true","version":""},"required":false,"type":"boolean | ((value: ValueItem, index: number) => boolean) "},{"name":"gapProps","tag":{"cn":"调整间距 同 [Gap](/components/Gap) 属性","en":"Adjust the spacing to be consistent with the [Gap](/components/Gap) props","default":"{column: 12, row: 12}","version":""},"required":false,"type":"GapProps "},{"name":"responseType","tag":{"cn":"设置 xhr.responseType","en":"set xhr.responseType","default":"","version":""},"required":false,"type":"XMLHttpRequestResponseType "}],"cn":"","en":""},{"title":"Upload.Image","properties":[{"name":"leftHandler","tag":{"cn":"添加图片视图是否在左侧展示","en":"Add image view is displayed on the left","default":"false","version":""},"required":false,"type":"boolean "},{"name":"height","tag":{"cn":"同 style.height","en":"same as style.height","default":"","version":""},"required":false,"type":"number "},{"name":"width","tag":{"cn":"同 style.width","en":"same as style.width","default":"","version":""},"required":false,"type":"number "},{"name":"ignorePreview","tag":{"cn":"是否忽略上传图片预览","en":"ignore image preview","default":"false","version":""},"required":false,"type":"boolean "}],"cn":"基本 API 和 Upload 相同，特定的 API 如下：","en":"The basic API is the same as Upload, and the specific API is as follows:"},{"title":"Upload.Button","properties":[{"name":"placeholder","tag":{"cn":"按钮默认内容","en":"button default content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"loading","tag":{"cn":"上传中按钮的内容，如果是字符串默认会有spin loading","en":"content of uploading, will have spin if a string","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"type","tag":{"cn":"同 [Button](/components.Button) type","en":"same as [Button](/components.Button) type","default":"\\\"primary\\\"","version":""},"required":false,"type":"\\\"default\\\" | \\\"primary\\\" | \\\"secondary\\\" | \\\"success\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"link\\\" "},{"name":"size","tag":{"cn":"按钮尺寸","en":"size of button","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"outline","tag":{"cn":"outline 为 true 时，显示透明背景的按钮","en":"When outline is true, the background is transparent.","default":"false","version":""},"required":false,"type":"boolean "}],"cn":"基本 API 和 Upload 相同，特定的 API 如下：","en":"The basic API is the same as Upload, and the specific API is as follows:"},{"title":"UploadOptions","isDetail":"true","properties":[{"name":"url","tag":{"cn":"上传地址从 action 中获取","en":"The upload address can be obtained from action","default":"","version":""},"required":true,"type":"string"},{"name":"name","tag":{"cn":"formData 中存的字段名","en":"key of formData","default":"","version":""},"required":true,"type":"string"},{"name":"withCredentials","tag":{"cn":"同 props 中的 withCredentials","en":"same as withCredentials in props","default":"","version":""},"required":true,"type":"boolean "},{"name":"responseType","tag":{"cn":"同 props 中的 responseType","en":"same as responseType in props","default":"","version":""},"required":true,"type":"XMLHttpRequestResponseType "},{"name":"file","tag":{"cn":"传入文件","en":"incoming file","default":"","version":""},"required":true,"type":"File"},{"name":"headers","tag":{"cn":"请求头部信息","en":"request header information","default":"","version":""},"required":false,"type":"object"},{"name":"onError","tag":{"cn":"上传出错事件(props 中为 onHttpError)","en":"onError callback","default":"","version":""},"required":true,"type":"(xhr: Partial<Xhr>) => void"},{"name":"onLoad","tag":{"cn":"上传事件","en":"onLoad","default":"","version":""},"required":true,"type":"(xhr?: Xhr ) => void"},{"name":"onProgress","tag":{"cn":"上传中进度","en":"onProgress","default":"","version":""},"required":true,"type":"(event?: ProgressEvent<EventTarget> , msg?: string ) => any"},{"name":"onStart","tag":{"cn":"开始上传事件","en":"onStart","default":"","version":""},"required":false,"type":"((file: File) => void) "},{"name":"onSuccess","tag":{"cn":"上传成功事件","en":"onSuccess","default":"","version":""},"required":false,"type":"((res?: string , file?: File , data?: any, xhr?: Xhr ) => Error | T) "},{"name":"params","tag":{"cn":"上传参数","en":"params","default":"","version":""},"required":false,"type":"{ [name: string]: V } "}],"cn":"","en":""},{"title":"Validator","properties":[{"name":"customValidator","tag":{"cn":"自定义校验","en":"custom validator","default":"","version":""},"required":false,"type":"((file: File) => void | Error | Promise<any>) "},{"name":"ext","tag":{"cn":"判断后缀名，传入参数为文件后缀，校验失败返回 Error","en":"Judge the file extension, return the Error when the verification fails.","default":"","version":""},"required":false,"type":"((ext: string) => void | Error | Promise<any>) "},{"name":"imageSize","tag":{"cn":"只对 Image 有效，判断图片尺寸，校验失败返回 Error","en":"It is only valid for Image to determine the size of images and return the Error when the verification fails.","default":"","version":""},"required":false,"type":"(image: { width: number; height: number; }) => void | Error"},{"name":"size","tag":{"cn":"判断文件大小，校验失败返回 Error","en":"Judge the size of the file and return the Error when the verification fails.","default":"","version":""},"required":false,"type":"((size: number) => void | Error | Promise<any>) "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
