# Table

## API 

### Table
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | bool | false | 是否显示外边框 |
| columns | array&lt;Column> | 无 | 数组，见Column |
| data | array | 无 | 数据 |
| fixed | bool | false | 固定表头或列 |
| onScroll | function(x, y) | 无 | 滚动条滚动后回调函数；x: 横向滚动比(0 <= x <= 1)，y: 纵向滚动比(0 <= y <= 1) |
| rowsInView | number | 20 | 单次render的最大行数 |
| scrollX | bool | =fixed | 横向滚动条 |
| scrollY | bool | =fixed | 纵向滚动条 |
| striped | bool | false | 是否显示交错斑马底纹 |

- 出于性能的考虑，横向和纵向滚动条在fixed为true时，会默认显示，可以设置scrollX/scrollY为false关闭
- 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度很大，一次超出了20条，可以调整rowsInView的值 

### Column
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fixed | string | 无 | 可选\['left', 'right']，如果相邻的多列需要锁定，只需指定最外侧的column即可 |
| group | string | 无 | 表头分组，相邻的相同 group 会生成一个新的表头，暂时只支持2级分组 |
| render | string \| function(d,i) | 必填 | 表格内容生成函数；d: 当前行数据，i: 当前行索引；为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
| title | string \| ReactElement | 无 | 表头显示内容 |
| width | number | 无 | 列宽 |

<example />