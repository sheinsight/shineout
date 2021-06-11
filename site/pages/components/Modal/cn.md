# Modal *对话框*
在不跳转页面的前提下，可以使用 Modal 展示次要内容或者操作。

<example />

## API

### Modal

| 属性 | 类型 | 默认值 | 说明 | 可用版本 |
| --- | --- | --- | --- | --- |
| className | string | 无 | 扩展className | |
| bodyStyle | object | - | 扩展 modal body 的样式 | |
| footer | ReactNode | 无 | 底部内容 | |
| maskCloseAble | boolean | true | 点击遮罩层是否关闭对话框 | |
| maskOpacity | number | 0.25 | 遮罩层透明度 | |
| padding | number \| string | 16 | 内容内边距 | |
| position | string | 无 | 弹出位置，可选值为 \['top', 'right', 'bottom', 'left'] | |
| style | object | 无 | 最外层扩展样式 | |
| title | ReactNode | 无 | 弹出层的标题 | |
| usePortal | boolean | true | 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render<br />函数式调用时使用 ReactDOM.render | |
| visible | boolean | false | 是否显示 | |
| width | number \| string | 500 | 对话框宽度 | |
| zIndex | number | 1050 | 对话框 z-index 值，注意：如 Modal 嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index的值 | |
| rootClassName | string | - | modal 的根元素类名, 为遮罩层的父元素 | 1.4.2 |
| container | () => HTMLElement \| HTMLElement | document.body | 渲染的目标节点 | |
| moveable | boolean | false | 是否可移动 | |
| resizable | boolean | false | 是否可调整大小 | |
| maskBackground | string | 无 | 遮罩背景色，设置后透明度将失效 | |
| onClose | () => void | 无 | 模态框关闭回调 | |
| destroy | boolean | false | 关闭时是否销毁元素 | |
| hideClose | boolean | 无 | 是否隐藏关闭按钮 | |
| type | 'info' \| 'success' \| 'warning' \| 'error' \| 'normal' | 无 | Modal title 显示状态icon | 1.6.1 |
| zoom | boolean | false | 是否开启 zoom 动画效果 | |
| esc | boolean | true | 是否支持 esc 键关闭 | |
| events | object | 无 | 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡 | |
| fullScreen | boolean | false | 是否全屏展示 | |
| top | number \| string | 10vh | 距离顶部距离 | |

### ModalMethods

Modal 提供了一组方法供全局调用，这些方法生成的元素，会在关闭后销毁。该组方法应仅供展示所用, 如果需要数据交互, 请使用 Modal

Modal.info(options) // 提示信息

Modal.success(options) // 成功提示框

Modal.error(options) // 错误提示框

Modal.confirm(options) // 确认提示框

Modal.show(options) // 默认弹窗 没有图标

#### Options参数

** *options 支持 Modal除了 usePortal 和 destory 的其他任何属性, 此外还有如下的额外属性**

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | string \| ReactElement | 无 | 提示内容主体 |
| title | string | 无 | 标题 |
| onCancel | function | 无 | 点击取消按钮时触发事件，仅在 confirm 方法中有效 |
| onClose | function | 无 | 关闭Modal时触发 |
| onOk | function | 无 | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal |
| text | object | { ok: 'Ok', cancel: 'Cancel' } | 按钮文字 |
| autoFocusButton | string | 无 | 默认聚焦的按钮, 可选值 \['ok', 'cancel'] |
