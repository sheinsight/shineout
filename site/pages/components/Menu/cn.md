# Alert *提示框*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | any | 无 | 内容，文字或react组件 |
| className | string | 无 | 扩展className |
| icon | ReactElement \| boolean | 无 | 为true时，根据type属性显示状态图标。如果需要显示自定义图标，传入ReactElement。 |
| iconSize | number | 14 | icon 的尺寸 |
| onClose | func \| boolean | 无 | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可 |
| style | object | 无 | 最外层扩展样式 |
| type | string | *warning* |  4 选 1，\[*success*, *info*, *warning*, *danger(error)*] |