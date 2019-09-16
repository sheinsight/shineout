# Progress *进度条*

<example />

## API 

| 属性 | 类型 | 默认值 | 说明 | 可用版本 |
| --- | --- | --- | --- | --- |
| background | string | '#e9ecef' | 背景色 | |
| className | string | - | 扩展className | |
| children | string \| ReactElement | - | 附加内容 | |
| color | string \| object: {from, to} \| {0%, 100%} | primary | 前景色, 可以设置为对象变成渐变.  | 渐变色: 1.4.2 |
| shape | string | 'line' | 样式，可选值为 \['line', 'circle'] | |
| size | number | 100 | 进度条大小，仅对 circle 有效 | |
| strokeWidth | number | 8 | 线框宽度 | |
| style | object | 无 | 最外层扩展样式 | |
| type | string | 无 | 内置配色，可选值为，\['success', 'info', 'warning', 'danger'] | |
| value | number | 0 | 百分比值，0 <= value <= 100 | |