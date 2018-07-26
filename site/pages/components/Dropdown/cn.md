# Dropdown *下拉菜单*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | \[] | 必填 | 下拉数据，详见data |
| renderItem | func \| string | 'content' | 设置显示的内容,如果是字符串,则为对应的值<br />如果是函数,则返回值为显示的内容,参数为当条数据
| className | string | 无 | 扩展className |
| disabled | bool | false | 禁用 |
| hover | boolean | false | 为 true 时，通过 mouseenter 触发选项弹出  |
| outline | boolean | false | 同 [Button](#/components/Button) |
| placeholder | string \| ReactElement | 必填 | 按钮显示内容 |
| columns | number | 无 | 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度
| size | string | 'default' | 同 [Button](#/components/Button) |
| type | string | 'default' | 可选值 \['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| width | number | 无 | 弹出选项层的宽度 |
| onClick | func | 无 | 点击事件。参数为渲染的数据, <br /> 注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick |

### data

data 项为 ReactElement 时，不做处理，为object时，参数如下

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | string \| element | | 默认从content获取内容 |
| url | string | 无 | url属性不为空时，render为一个链接 |
| target | string | 无 | url 不为空时有效 |
| onClick | function | 无 | 点击事件 |