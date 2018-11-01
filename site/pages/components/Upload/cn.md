# Upload

<br />

本页中的示例服务端限制为 10 KB，大于此限制的文件会上传失败

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accept | string | 无 | 上传文件类型 |
| action | string | 必填 | 上传地址 |
| children | any | 必填 | 上传占位内容 |
| className | string | 无 | 扩展className |
| defaultValue | array | 无 | 默认值 |
| headers | object | 无 | 请求头部信息 |
| htmlName | string | 无 | 服务端接收的 filename，不填使用 name |
| limit | number | 100 | 最大上传文件数 |
| name | string | 无 | Form 内存取数据的 key |
| onChange | func(values) | 无 | 值改变回调(上传成功，删除)<br />values: 数组 |
| onSuccess | func(res, file):value | 无 | 上传成功回调，返回结果作为新的 value<br />res: 上传接口返回结果<br />file: 选择的文件 |
| onError | func(xhr):string | 无 | 上传失败时回调，返回结果作为错误内容提示 |
| params | object | 无 | 提交到服务端的额外参数 |
| recoverAble | bool | false | 是否可以恢复已删除的value |
| renderResult | func | a => a | 结果展示 |
| validator | object | 无 | 上传前文件校验 |
| value | array | \[] | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |
| withCredentials | bool | false | 是否携带 cookie |


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
