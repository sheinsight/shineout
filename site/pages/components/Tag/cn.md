# Tag *标签*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | 无 | 内容，文字或react组件 |
| className | string | 无 | 扩展className |
| backgroundColor | string | 无 | 背景色,可以自行的设置标签的背景色 |
| onClose | () => void \| boolean | 无 | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可 |
| onClick | (e: MouseEvent) => void | 无 | 点击tag事件 |
| style | object | 无 | 最外层扩展样式 |
| disabled | boolean | false | 是否禁用 | 
| type | 'success' \| 'info' \| 'warning' \| 'danger' \| 'error' | *default* |  类型 |
| editable | boolean | false |  是否可编辑 |
| value | string | 无 |  Tag 展示的文本（仅 editable 为true可用，注意：该情况下 children 不可用）|
| onBlur | (value) => void | 无 |  失去焦点事件（仅 editable 为true可用） |
| onChange | (value) => void | 无 |  文本发生改变时触发（仅 editable 为true可用）|
