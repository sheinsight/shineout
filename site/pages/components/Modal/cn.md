# Modal *对话框*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| destroy | boolean | false | 关闭时是否销毁元素 |
| footer | ReactElement \| null | 无 | 底部内容 |
| maskCloseAble | bool | true | 点击遮罩层是否关闭对话框 |
| maskOpacity | number | 0.25 | 遮罩层透明度 |
| padding | number\|string | 16 | 内容内边距 |
| position | string | 无 | 弹出位置，可选值为 \['top', 'right', 'bottom', 'left'] |
| style | object | 无 | 最外层扩展样式 |
| title | string \| ReactElement | 无 | 弹出层的标题 |
| visible | bool | false | 是否显示 |
| width | number \| string | 500 | 对话框宽度 |

### Methods

Modal 提供了一组方法供全局调用，这些方法生成的元素，会在关闭后销毁。

Modal.info(options) // 提示信息

Modal.success(options) // 成功提示框

Modal.error(options) // 错误提示框

Modal.confirm(options) // 确认提示框

#### Options参数

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | string \| ReactElement | 无 | 提示内容主体 |
| title | string | 无 | 标题 |
| onCancel | function | 无 | 点击取消按钮时触发事件，仅在 confirm 方法中有效 |
| onClose | function | 无 | 关闭Modal时触发 |
| onOk | function | 无 | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal |
| text | object | { ok: 'Ok', cancel: 'Cancel' } | 按钮文字 |