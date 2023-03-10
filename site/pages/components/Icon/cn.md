# Icon *图标*
组件库没有内置图标集，而是提供了一个函数生成一个新的图标组件。<br />
一个项目内可以创建多个不同名称的图标组件。

<example />

<apis />

### MyIcon *Icon函数创建的图标组件*
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | string | 无 | 图标 unicode 编码，和 name 二选一 |
| name | string | '' | 图标类名（去除前缀的部分），值参照具体使用的图标库 |
| fontSize | string | 无 | 图标大小，和 style.fontSize 相同 |
| style | object | 无 | 扩展样式，可以用来设定特定的大小和颜色等 |
| type | string | 'default' | 内置颜色，可选值为 \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |