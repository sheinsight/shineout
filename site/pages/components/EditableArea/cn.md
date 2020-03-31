# EditableArea *可编辑域*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | string | 无 | 设置初始值 |
| value | string | 无 | 受控时，传入的value |
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
| absolute | boolean | false | 为 true 时，选项弹出层在 DOM 中独立 render |
