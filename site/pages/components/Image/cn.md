# Image *图片*

图片组件用来处理指定尺寸的图片，实现占位，异常处理，拉伸、填充，延时加载等功能。

<example />

## API

| 属性 | 类型 | 默认值 | 说明 | 可用版本 | 
| --- | --- | --- | --- | --- |
| className | string | 无 | 扩展className | |
| height | string \| number | '100%' | 图片高度(值为百分比时，对比值为图片宽度) | |
| href | string | 无 | 原始图片地址 | |
| lazy | bool | false | 是否延迟加载 | |
| src | string | 必填 | 图片地址 | |
| style | object | 无 | 最外层扩展样式 | |
| target | string | '_modal' | 可选值为 \['_modal', '_blank', '_self', '_download'] | |
| width | string \| number | '100%' | 图片宽度 | |
| placeholder | ReactElement \| string | '加载中' | 图片加载中占位内容 | |
| container | string | - | 对特定元素进行懒加载判断的选择器, 如: '#id', '.class' | 1.4.2  |
 
### Image.Group

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| height | string \| number | '100%' | 单个图片高度(值为百分比时，对比值为图片宽度) |
| lazy | bool | false | 是否延迟加载 |
| pile | bool | false | 是否堆叠 |
| target | string | '_modal' | 可选值为 \['_modal', '_blank', '_self'] |
| width | string \| number | '100%' | 单个图片宽度 |
