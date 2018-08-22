# Breadcrumb  *面包屑*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | ---|
| data | Array | [] | 面包屑对象数组，见 data |
| separator | String\|ReactNode | "/" | 面包屑分隔符,可以是字符串或自定义的元素|
| keygen | string \| function(obj):string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |

### data

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | ---|
| title | string\|ReactElement | 无 | 显示内容 |
| url | string | 无 | 链接地址，onClick 属性二选一 |
| onClick | function | 无 | 点击事件 |