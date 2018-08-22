# Popover *气泡*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| background | string | '#fff' | 弹出层背景色（含箭头） |
| border | string | '#dee2e6' | 弹出层边框颜色（含箭头） |
| className | string | 无 | 扩展className |
| children | ReactElement | 必填 | 子元素只能为一个 ReactElement |
| content | ReactElement \| function | 必填 | 弹出内容 | 
| position | string | 'top' | 弹出层位置，可选值为 \['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right'] |
| style | object | 无 | 最外层扩展样式 |
| trigger | string | 'hover' | 触发方式，可选值为 \['click', 'hover'] |
| type | string | 无 | 可选值为，\['success', 'info', 'warning', 'danger'] |
