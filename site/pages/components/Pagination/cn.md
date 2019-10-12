# Pagination *分页*

<example />

## API 
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align | string | 'left' | 可选值为 \['left', 'center', 'right'] |
| className | string | 无 | 扩展className |
| current | number | 无 | 当前页，如果传入值，组件为受控组件，必须通过onChange来处理回调 |
| defaultCurrent | number | 1 | 初始页码 |
| disabled | bool | false | 禁用 |
| layout | array | \['links'] | 子组件布局，可选值为:<br />'links': 页码<br />'simple': 简约页码(和links不要同时使用)<br />'list': 每页数量选择<br />'jumper': 跳转页码<br />function({ current, total, pageSize }): 匿名函数，用来信息展示 |
| onChange | function(current, pageSize) | 无 | 页码或每页显示数量改变时回调<br />current: 新的页码<br />pageSize: 每页数量 |
| pageSize | number | 10 | 每页数量 |
| pageSizeList | number\[] | \[10, 20, 30, 50, 100] | 每页数量可选列表 |
| size | string | 'default' | 可选值 \['large', 'default', 'small'] |
| text | object | 无 | 替换文案<br />prev: 上一页<br />next: 下一页<br />page: pageSizeList文字<br />jumper: 跳转输入框文字, '{input}' 为输入框占位 |
| total | number | 0 | 总条目数。如果 total 小于 0，隐藏分页。 |
| sizeListProps| object | 无 | 需要给分页数量的选择框的额外的属性 | 