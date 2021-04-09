# CardGroup *卡片组*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| style | object | 无 | 外层样式 |
| height | number | 无 | 卡片组高度 |
| cardWidth | number | 无 | 卡片最小宽度 |
| columns | number | 3 | 列数，设置 cardWidth 后该属性将失效 |
| gridStyle | object | 无 | 卡片网格样式 |
| gutter | number | 16 | 卡片横向纵向间距，如果两个间距相互独立可以通过 gridStyle 调整 |

### CardGroup.Item

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| style | object | 无 | 卡片的样式 | 
| disabled | boolean | false | 是否禁用选择框 |
| placeholder | ReactNode | 无 | 懒加载占位元素，设置后卡片将开启懒加载 |
| checked | boolean \| undefined | 无 | checked 表示选中状态，不设置则不显示选择框 |
| value | any | true | 选中时返回值 |
| onChange | (checked: boolean, value: any) => void | 无 | 选中状态变化事件，checked表示选中状态，value代表对应的值 |

