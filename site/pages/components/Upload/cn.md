# Upload

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accept | string | 无 | 上传文件类型 |
| action | string | 必填 | 上传地址 |
| children | any | 必填 | 上传占位内容 |
| className | string | 无 | 扩展className |
| htmlName | string | 无 | 服务端接收的 filename，不填使用 name |
| limit | number | 0 | 最大上传文件数，0 为不限 |
| name | string | 无 | Form 内存取数据的 key |
| onChange | func(values) | 无 | 值改变回调(上传成功，删除)<br />values: 数组 |
| onUpload | func(res, file):value | 无 | 上传成功回调，返回结果作为新的 value<br />res: 上传接口返回结果<br />file: 选择的文件 |
| onUploadError | func(xhr):string | 无 | 上传失败时回调，返回结果作为错误内容提示 |
| params | object | 无 | 提交到服务端的额外参数 |
| reconverAble | bool | true | 是否可以删除已删除的value |
| renderResult | func | a => a | 结果展示 |
| validator | object | 无 | 上传前文件校验 |
| value | array | \[] | 值 |
| withCredentials | bool | false | 是否携带 cookie |


### Image

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | any | 无 | 上传按钮内容，可为空 |
| renderResult | func | a => a | 返回图片 url 链接地址 |


### validator 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- | --- |
| size | func(number):Error | 判断文件大小，校验失败返回 Error |
| imageSize | func(Image):Error | 只对 Image 有效，判断图片尺寸，校验失败返回 Error |