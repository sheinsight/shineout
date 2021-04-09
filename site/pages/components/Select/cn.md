# Select *选择框*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | number | null | 宽度 |
| style | object | null | 扩展外层style |
| absolute | boolean | false | 为 true 时，选项弹出层在 DOM 中独立 render |
| autoAdapt | boolean | false | 下拉列表宽度根据内容自由展开 |
| clearable | boolean | false | 是否可清除值 |
| multiple | boolean | false | 是否是多选 |
| columns | number | 1 | columns 大于 1 时，选项展示为多列布局模式 |
| columnWidth | number | 160 | column 单列宽度，仅在 columns 大于 1 时有效 |
| data | any[] | 必填 | 数据项，单条数据作为 value 的数据必须是唯一的 |
| treeData | any[] | 无 | 树形结构数据项，\[{children: []}\] |
| defaultValue | any[] | | 初始值 |
| disabled | (data: any) => boolean \| boolean | false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |
| filterDelay | number | 400 | 毫秒。用户输入触发 fitler 事件的延时 |
| format | (data: any) => any \| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d\[format\]<br /> 为函数时，以函数返回结果作为 value |
| name | string | 无 | Form 存取数据的名称 |
| keygen | ((data: any) => string) \| string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |
| onChange | (value: any, data: any, checked: boolean) => void | 无 | value 为 datum.getValue() |
| onCreate | (input: string) => any \| boolean | 无 | 如果设置了 onCreate 事件，组件为可输入状态<br />onCreate为函数时，将此函数返回值作为新的选项拆入最上方<br />onCreate为true时，使用默认函数 text => text |
| onFilter | (text: string) => (data: any) => boolean | 无 | onFilter 不为空时，可以输入过滤数据<br />onFilter 如果返回一个函数，使用这个函数做前端过滤<br />如果不返回，可以自行做后端过滤 |
| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |
| renderItem | (data: any) => ReactNode \| string | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |
| renderResult | (data: any) => ReactNode \| string | renderItem | 选中后在结果中显示的内容，默认和 renderItem 相同 |
| value | any[] \| string \| object | | 在Form中，value会被表单接管，value无效 |
| compressed | boolean \| 'no-repeat' | false | 将选中值合并，只在多选模式下有效；为'no-repeat'时第一个值不会出现在弹出框中。 |
| zIndex | number | 1000 | 选项列表 z-index 值 |
| groupBy | (record: any, index: number, data: any) => any | 无 | 分组 | 
| filterSingleSelect | boolean | false | 当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效。 |
| separator | string | 无 | 多选情况下设置后，value 会处理为 separator 分隔的字符串 |
| childrenKey | string | 'children' | 树形数据下，指定子数据的属性名 | 
| defaultExpandAll| boolean | false | 默认展开全部子节点, 仅树形数据下有效 | 
| renderUnmatched | (data: any) => ReactNode | 无 | 渲染未匹配值的方式 |
| emptyAfterSelect | boolean | false | 选中后是否清空输入框内容（在多选情况下适用） |
| showArrow | boolean | true | 是否显示下拉箭头，仅针对单选情况 |
| showHitDescendants | boolean | false | 筛选后是否展示命中节点的后代节点 |
| focusSelected | boolean | true | onCreate 或 onFilter 在单选情况下单击值后是否选中值 |
| noCache | boolean | false | 是否开启数据缓存，如果数据存在动态更新的情况建议开启 |
| compressedClassName | string | 无 | 多选合并展示弹出框的类名 |
| onCollapse | (collapse: boolean) => void | 无 | 下拉列表展开/收起回调 | 
| resultClassName | ((value: any) => string) \| string | 无 | 选中结果内容容器的className | 
| columnsTitle | ReactNode | 无 | 多列选项多选时的标题文字 |
| reFocus | boolean | 无 | 存在onFilter和onCreate，选中 Option，自动focus Input |
| header | () => ReactNode \| ReactNode | 无 | 自定义渲染 Option List Header |
| lineHeight | number | 34 | 选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度 |
| hideCreateOption | boolean | false | 在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中该值 |