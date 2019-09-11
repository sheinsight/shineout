# Popover *气泡*

<example />

## API

### Popover

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| background | string | '#fff' | 弹出层背景色（含箭头） |
| visible | bool | 无 | 是否显示(受控) |
| onVisibleChange | func | 无 | 显示隐藏改变时事件 | 
| mouseEnterDelay | number | 0 | 移入显示延迟(毫秒) | 
| mouseLeaveDelay | number | 500 | 移除隐藏延迟(毫秒) | 
| border | string | '#dee2e6' | 弹出层边框颜色（含箭头） |
| className | string | 无 | 扩展className |
| children | ReactElement | 必填 | 弹出显示内容 |
| onClose | function | 无 | Popover 关闭时回调事件 |
| onOpen | function | 无 | Popover 弹出回调事件 |
| position | string | 'top' | 弹出层位置，可选值为 \['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right'] |
| style | object | 无 | 最外层扩展样式 |
| trigger | string | 'hover' | 触发方式，可选值为 \['click', 'hover'] |
| type | string | 无 | 可选值为，\['success', 'info', 'warning', 'danger'] |
| * content | ReactElement \| function | | 旧接口，如果content为空，父组件作为触发元素 | 

### Popover.Confirm
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| onOk | func | 无 | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |
| onCancel | func | 无 | 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |
| text | object | { ok: 'Ok', cancel: 'Cancel' } | 按钮文字 |
| type | string | *warning* |  icon的类型，4 选 1，\[*success*, *info*, *warning*, *danger(error)*] |


## 注意
请确保 Popover 的父元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。
