# Upload

<br />

本页中的示例服务端限制为 10 KB，大于此限制的文件会上传失败

<example />

## API

### Upload

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accept | string | 无 | 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |
| action | ((file: File) => string) \| string | 必填 | 上传地址 |
| children | ReactNode | 必填 | 上传占位内容 |
| className | string | 无 | 扩展className |
| defaultValue | any[] | 无 | 默认值 |
| headers | object | 无 | 请求头部信息 |
| htmlName | string | 无 | 服务端接收的 filename，不填使用 name |
| limit | number | 100 | 最大上传文件数 |
| disabled | boolean | false | 是否禁用上传行为 | 
| name | string | 无 | Form 内存取数据的 key |
| request | (options: object) => void | 无 | 自定义上传方法<br /> options: 上传的配置 |
| onChange | (values: any[]) => void | 无 | 值改变回调(上传成功，删除)<br />values: 数组, 其每个值是 onSuccess 的返回值 |
| onSuccess | (res: string, file: File, data: any, xhr: any) => any | 无 | 上传成功回调，返回结果作为新的 value<br />res: 上传接口返回结果<br />file: 选择的文件<br />data: 请求的数据<br />xhr: 返回的 response |
| onHttpError | (xhr: any) => string | 无 | 上传失败时回调，返回结果作为错误内容提示 |
| params | object | 无 | 提交到服务端的额外参数 |
| recoverAble | boolean | false | 是否可以恢复已删除的value |
| renderResult | (data: any) => ReactNode | a => a | 结果展示 |
| validator | object | 无 | 上传前文件校验 |
| value | any[] | \[] | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |
| withCredentials | boolean | false | 是否携带 cookie |
| multiple | boolean | false | 是否支持多选文件 |
| renderContent | (res: any, value: any, index: number, values: any[]) => ReactNode | - | 自定义结果的内容 |
| validatorHandle | ((error: any, file: File) => boolean) \| boolean | false | 是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error |
| drop | boolean | false | 是否开启拖拽上传文件 |
| filesFilter | (fileList: any[]) => boolean | 无 | 文件选中后的筛选，用户可自定义最终需要上传的文件列表<br />需返回一个新的文件列表 |
| onErrorRemove | (xhr: XMLHttpRequest, file: Blob) => void | 无 | 上传失败文件删除之后的回调 |
| forceAccept | string | 无 | 在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept） |
| showUploadList | boolean | true | 是否展示上传列表 |


### Upload.Image

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | 无 | 上传按钮内容，可为空 |
| renderResult | (data: any) => ReactNode | a => a | 返回图片 url 链接地址 |
| onErrorRemove | (xhr: XMLHttpRequest, file: Blob) => void | none | 上传失败图片删除之后的回调 |
| leftHandler | boolean | false | 添加图片视图是否在左侧展示 |
| onPreview | (url, value, index, values) => void | none | 预览图片操作，默认为画廊展示 |
| ignorePreview | boolean | false | 是否忽略上传图片预览 |

### Upload.Button

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | 'primary' \| success' \| 'info' \| 'warning' \| 'danger' | primary | 按钮类型 |
| placeholder | ReactNode | 无 | 按钮默认内容 |
| loading | ReactNode | 无 | 上传中按钮的内容，如果是字符串默认会有spin loading |


### UploadOptions 

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| file |  File | 无 |  传入的文件 |
| onLoad | function | 无 | 上传事件 |
| onError | function | 无| 上传出错事件(props 中为 onHttpError) |
| onProgress | function | 无 | 上传中进度 |
| onSuccess | function | 无 | 上传成功事件 |
| params | object | 无 | 上传参数 |
| onStart | function | 无 | 开始上传事件 |
| headers | object | 无 | 请求头部信息 |


### validator 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| ext | func(string):Error | 判断后缀名，传入参数为文件后缀，校验失败返回 Error |
| size | func(number):Error | 判断文件大小，校验失败返回 Error |
| imageSize | func(Image):Error | 只对 Image 有效，判断图片尺寸，校验失败返回 Error |
| customValidator | func(File):Error | 自定义校验 |
