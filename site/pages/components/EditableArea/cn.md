# EditableArea *可编辑域*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | string | 无 | 设置初始值 |
| value | string | 无 | 受控时，传入的value |
| className | string | 无 | 扩展外层className |
| onChange | (value: string) => void | 无 | 值改变时的回调函数，和value一起设置时使组件受控 |
| style | object | 无 | 组件最外层的扩展样式 |
| bordered | boolean | false | 是否显示外边框 |
| disabled | boolean | false | 是否禁用 |
| clearable | boolean | true | 是否展示清除按钮 |
| placeholder | string | 无 | 同原生 textarea 标签的 placeholder |
| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒 |
| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符 |
| onBlur | (e: MouseEvent) => void | 无 | 失去焦点事件 |
| onFocus | (e: MouseEvent) => void | 无 | 聚焦事件 |
| maxHeight | number \| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 |
| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |
| width | number \| string | 无 | 编辑域宽度 |
| innerTitle | string | - | 内嵌标题 |
