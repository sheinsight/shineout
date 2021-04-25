# Popover *气泡*

<example />

## API

### Popover

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| background | string | '#fff' | 弹出层背景色（含箭头） |
| visible | boolean | 无 | 是否显示(受控) |
| onVisibleChange | (visible: boolean) => void | 无 | 显示隐藏改变时事件 | 
| mouseEnterDelay | number | 0 | 移入显示延迟(毫秒) | 
| mouseLeaveDelay | number | 0 | 移除隐藏延迟(毫秒) | 
| border | string | '#dee2e6' | 弹出层边框颜色（含箭头） |
| className | string | 无 | 扩展className |
| children | ReactNode | 必填 | 弹出显示内容 |
| onClose | () => void | 无 | Popover 关闭时回调事件 |
| onOpen | () => void | 无 | Popover 弹出回调事件 |
| position | 'top-left' \| 'top' \| 'top-right' \| 'left-top' \| 'left' \| 'left-bottom' \| 'right-top' \| 'right' \| 'right-bottom' \| 'bottom-left' \| 'bottom' \| 'bottom-right' | 'top' | 弹出层位置 |
| style | object | 无 | 最外层扩展样式 |
| trigger | 'click' \| 'hover' | 'hover' | 触发方式 |
| type | 'success' \| 'info' \| 'warning' \| 'danger' | 无 | 类型 |
| content | (close: () => void) => void \| ReactNode | | 旧接口，如果content为空，父组件作为触发元素 | 
| priorityDirection | string | 'vertical' | 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效, 可选值\['vertical', 'horizontal'] |
| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |
| scrollDismiss | () => HTMLElement \| boolean | false | 滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回 |
| showArrow | boolean | true | 是否显示箭头 |

### Popover.Confirm
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| onOk | () => void | 无 | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |
| onCancel | () => void | 无 | 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |
| text | object | { ok: 'Ok', cancel: 'Cancel' } | 按钮文字 |
| type | string | *warning* |  icon的类型，4 选 1，\[*success*, *info*, *warning*, *danger(error)*] |
| okType | string | *primary* |  确认按钮类型，与Button类型相同 |

## 注意
请确保 Popover 的父元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。
