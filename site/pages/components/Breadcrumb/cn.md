# Breadcrumb  *面包屑*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | ---|
| data | Array | [] | 面包屑对象数组，见 data |
| separator | String\|ReactNode | "/" | 面包屑分隔符,可以是字符串或自定义的元素|
| keygen | String \| Function | 无 | key生成规则，如果为function，参数为单条数据, 并以返回值作为key，不填使用 index |

### data

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | ---|
| title | string\|ReactElement | 无 | 显示内容 |
| url | string | 无 | 链接地址，onClick 属性二选一 |
| onClick | function | 无 | 点击事件 |