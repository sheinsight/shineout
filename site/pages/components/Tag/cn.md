# Tag *标签*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | any | 无 | 内容，文字或react组件 |
| className | string | 无 | 扩展className |
| backgroundColor | string | 无 | 背景色,可以自行的设置标签的背景色 |
| onClose | func \| boolean | 无 | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可 |
| onClick | func | 无 | 点击tag事件 |
| style | object | 无 | 最外层扩展样式 |
| disabled | boolean | false | 是否禁用 | 
| type | string | *default* |  4 选 1，\[*success*, *info*, *warning*, *danger(error)*] |