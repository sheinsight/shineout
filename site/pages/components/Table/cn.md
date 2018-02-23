# Table

<example />

## API 

### Table
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | bool | false | 是否显示外边框 |
| className | string | 无 | 扩展className |
| columns | Column\[] | 无 | 数组，见Column |
| data | object\[] | 无 | 数据 |
| fixed | string | 无 | 可填值 \['both', 'x', 'y'] |
| loading | bool \| element | false | 数据加载中，为true时会展示一个默认的[Spin](#/components/Spin)组件，可以传入一个自定义的Spin代替 |
| onScroll | function(x, y) | 无 | 滚动条滚动后回调函数；<br />x: 横向滚动比(0 <= x <= 1)<br />y: 纵向滚动比(0 <= y <= 1) |
| rowsInView | number | 20 | 单次render的最大行数 |
| striped | bool | false | 是否显示交错斑马底纹 |
| style | object | 无 | 扩展样式 |

- 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值 

### Column
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fixed | string | 无 | 可选\['left', 'right']；<br />需要设置Table的fixed为'x'或'both'才生效；<br />如果相邻的多列需要锁定，只需指定最外侧的column即可 |
| group | string \| string\[] | 无 | 表头分组，相邻的相同 group 会生成一个新的表头 |
| render | string \| function(d,i) | 必填 | 表格内容生成函数；<br />d: 当前行数据<br />i: 当前行索引<br />为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
| title | string \| ReactElement | 无 | 表头显示内容 |
| width | number | 无 | 列宽 |