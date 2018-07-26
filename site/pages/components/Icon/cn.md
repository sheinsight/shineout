# Icon *图标*
组件库没有内置图标集，而是提供了一个函数生成一个新的图标组件。<br />
一个项目内可以创建多个不同名称的图标组件。

<example />

## API

### Icon *function(url, fontFamily, prefix):ReactClass*
函数，返回一个新的组件，一个项目内可以创建多个，但是 fontFamily 不能相同

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| url | string |  | 图标css文件地址，使用在线地址，不需要引入到项目中。如果在 link 中已经引用过，可以为空(null) |
| fontFamily | string | 'iconfont' | font-family 需要和引入的css文件内的font-family一致 |
| prefix | string | 'icon' | 类名前缀 |

### MyIcon *Icon函数创建的图标组件*
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | string | 无 | 图标 unicode 编码，和 name 二选一 |
| name | string | '' | 图标类名（去除前缀的部分），值参照具体使用的图标库 |
| fontSize | string | 无 | 图标大小，和 style.fontSize 相同 |
| style | object | 无 | 扩展样式，可以用来设定特定的大小和颜色等 |
| type | string | 'default' | 内置颜色，可选值为 \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |