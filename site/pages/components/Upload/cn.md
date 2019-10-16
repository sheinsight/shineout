# Upload

<br />

本页中的示例服务端限制为 10 KB，大于此限制的文件会上传失败

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accept | string | 无 | 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |
| action | string | 必填 | 上传地址 |
| children | any | 必填 | 上传占位内容 |
| className | string | 无 | 扩展className |
| defaultValue | array | 无 | 默认值 |
| headers | object | 无 | 请求头部信息 |
| htmlName | string | 无 | 服务端接收的 filename，不填使用 name |
| limit | number | 100 | 最大上传文件数 |
| disabled | bool | false | 是否禁用上传行为 | 
| name | string | 无 | Form 内存取数据的 key |
| request | func(options) | 无 | 自定义上传方法<br /> options: 上传的配置 |
| onChange | func(values) | 无 | 值改变回调(上传成功，删除)<br />values: 数组, 其每个值是 onSuccess 的返回值 |
| onSuccess | func(res, file, data, xhr):value | 无 | 上传成功回调，返回结果作为新的 value<br />res: 上传接口返回结果<br />file: 选择的文件<br />data: 请求的数据<br />xhr: 返回的 response |
| onHttpError | func(xhr):string | 无 | 上传失败时回调，返回结果作为错误内容提示 |
| params | object | 无 | 提交到服务端的额外参数 |
| recoverAble | bool | false | 是否可以恢复已删除的value |
| renderResult | func | a => a | 结果展示 |
| validator | object | 无 | 上传前文件校验 |
| value | array | \[] | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |
| withCredentials | bool | false | 是否携带 cookie |
| multiple | bool | false | 是否支持多选文件 |
| renderContent | func(res, value, index, values) | - | 自定义结果的内容 |
| validatorHandle | bool \| func(error, file) | false | 是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error |
| drop | bool | false | 是否开启拖拽上传文件 |


### options 

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| file |  object | 无 |  传入的文件 |
| onLoad | string | 无 | 上传事件 |
| onError | any | 无| 上传出错事件(props 中为 onHttpError) |
| onProgress | string | 无 | 上传中进度 |
| onSuccess | array | 无 | 上传成功事件 |
| params | object | 无 | 上传参数 |
| onStart | object | 无 | 开始上传事件 |
| headers | object | 无 | 请求头部信息 |


### Image

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | any | 无 | 上传按钮内容，可为空 |
| renderResult | func | a => a | 返回图片 url 链接地址 |


### validator 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| ext | func(string):Error | 判断后缀名，传入参数为文件后缀，校验失败返回 Error |
| size | func(number):Error | 判断文件大小，校验失败返回 Error |
| imageSize | func(Image):Error | 只对 Image 有效，判断图片尺寸，校验失败返回 Error |

### Button

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | string | primary | 可选值为，\['primary', success', 'info', 'warning', 'danger'\] |
| placeholder | string \| ReactElement | 无 | 按钮默认内容 |
| loading | string \| ReactElement | 无 | 上传中按钮的内容，如果是字符串默认会有spin loading |
