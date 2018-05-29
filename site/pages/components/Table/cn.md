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
| datum | object | 无 | 数据处理，可以传入一个 [Datum.List](#/components/Datum.List) 对象，或者 Datum.List 配置 |
| fixed | string | 无 | 可填值 \['both', 'x', 'y'] 
| loading | bool \| element | false | 数据加载中，为true时会展示一个默认的[Spin](#/components/Spin)组件，可以传入一个自定义的Spin代替 |
| keygen | string \| function(obj):string | index | 生成每一行key的辅助方法<br />不填的情况下，会使用index(不推荐，在某些情况下可能会有问题)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |
| onScroll | function(x, y) | 无 | 滚动条滚动后回调函数；<br />x: 横向滚动比(0 <= x <= 1)<br />y: 纵向滚动比(0 <= y <= 1) |
| onRowSelect | function(rows) | 无 | 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议使用 datum |
| rowHeight | number | 40 | 单行表格的预期高度，只是一个大概的估值，用来展示滚动条 |
| rowsInView | number | 20 | 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值 |
| striped | bool | false | 是否显示交错斑马底纹 |
| style | object | 无 | 扩展样式 |

### Column
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colSpan | function(row) | 无 | 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数 |
| fixed | string | 无 | 可选\['left', 'right']；<br />需要设置Table的fixed为'x'或'both'才生效；<br />如果相邻的多列需要锁定，只需指定最外侧的column即可 |
| group | string \| string\[] | 无 | 表头分组，相邻的相同 group 会生成一个新的表头 |
| render | string \| function(d,i) | 必填 | 表格内容生成函数；<br />d: 当前行数据<br />i: 当前行索引<br />为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
| rowSpan | function(a, b) \| boolean | 无 | 值为函数时，根据函数返回的结果（bool）判断是否合并行，a、b为相邻的两行数据。<br />值为true时，根据render的结果自动判断是否合并行 |
| sorter | function(order) | 无 | sorter 不为空时，这一列会出现排序 icon。order的值为\['asc', 'desc']<br />前端排序，返回一个排序函数，参考 Array.sort。<br />服务端排序，不要返回值，自行处理即可。
| title | string \| ReactElement | 无 | 表头显示内容 |
| type | string | 无 | 特殊用途列，可选值为 \['expand', 'checkbox']<br />expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果<br />checkbox: 选择列，用于仅固定选择列的场景 |
| width | number | 无 | 列宽 |