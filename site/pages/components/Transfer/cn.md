# Transfer *穿梭框*

<example />

## API

** *为了统一及方便使用, 与勾选有关的 api 均使用 keygen 作为结果, 所以需要必填 keygen 且保证不会出现重复的 keygen**


| 属性 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| value | any[] | 无 | 显示在右侧框数据的值集合 | |
| titles | ReactNode[] | 无 | 两侧的标题, 顺序是从左到右 | |
| data | any[] | 无 | 数据源 | |
| format | (data: any) => any \| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d\[format\]<br /> 为函数时，以函数返回结果作为 value | |
| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 | |
| keygen | ((data: any) => string) \| string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) | |
| renderItem | (data: any) => ReactNode \| string | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 | |
| footers | ReactNode[] | 无 | 底部元素, 顺序是从左到右 | |
| operations | ReactNode[] | 无 | 操作元素, 顺序是从上到下 | |
| operationIcon | boolean | true |  是否显示操作按钮的图标 | |
| className | string | 无 | 扩展的 class | |
| style | object | 无 |  扩展的样式 | |
| listClassName | string | 无 | 列表扩展的 class | |
| listStyle | object | 无 | 列表扩展的样式 | |
| selectedKeys | any[] | 无 |  被勾选的列表 | |
| defaultSelectedKeys | any[] | 无 |  默认被勾选的列表 | |
| onSelectChange | (sourceKeys: any[], targetKeys: any[]) => void | 无 |   勾选触发的方法 | |
| disabled | (data: any) => boolean \| boolean| false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 | |
| empty | ReactNode | "无数据" | 无内容的展示 | |
| onFilter | (text: string, value: any, isSource: boolean) => boolean | 无 | 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据 | |
| loading| boolean \| boolean[] | 无 | 加载中, 如果需要两侧加载中状态不一致, 需要传入数组 | |
| onSearch | (text: string, isSource: boolean) => void | 无 | 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据 | 1.4.4 |
| rowsInView | number | 20 | 一次加载的数据条数 |
| listHeight | number | 180 | 列表高度 |
| lineHeight | number | 32 | 列表行高 |
| children | (({onSelected, selectedKeys, value, direction, filterText}) => ReactNode) | null | 自定义渲染内容 |
