# Message 消息

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | number\|string | 256 | 模态框宽度 |
| title | string \|ReactElement | 'Modal' | 弹出层的标题 |
| closable | boolean | true | 是否显示右上的关闭按钮 |
| closeDestroy | boolean | false | 关闭时是否清空Modal的子元素 |
| maskStyle | object | {} | 遮罩层样式 |
| cancelType | string | 'default' | 可选值 \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| footer | ReactElement\|null | 无 | 底部的内容,如果设置了,则显示设置的内容,如果不设置,则默认显示两个按钮,如果不想要,可以设置为null |
| cancelText | string | 'cancel' | 取消按钮的内容 |
| cancelType | string | 'default' | 可选值 \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| okText | string | 'ok' | 确定按钮的内容 |
| okType | string | 'primary' | 可选值 \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| onCancel | function | 无 | 点击取消的事件 |
| onOk | function | 无 | 点击确定的事件 |

## Modal.methods(options)

Modal 提供了一组方法供全局调用,此方法生成的模态框会有一些不同,只会提供一个确定按钮供点击(确认框有取消按钮)

Modal.info(options) //提示信息

Modal.success(options) //成功提示框

Modal.error(options) // 错误提示框

Modal.confirm(options) //  确认提示框

## options

options 的属性包括上面的所有属性,也有些额外的属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | string \| ReactElement | 无 | 提示内容主体 |
| icon | ReactElement | 无 | 显示的图标,如果不设置,默认使用内置的图标 |