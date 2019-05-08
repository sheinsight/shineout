# Card *卡片*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| collapsible | bool \| 'bottom' | false | 是否可折叠，'bottom' 表示从下方点击折叠 |
| collapsed | bool | 无 | 是否折叠，用于受控状态 |
| defaultCollapsed | bool | true | 初始折叠状态（仅在 collapsible 为 true 时有效） |
| onCollapse | function | 无 | 折叠状态改变时回调事件 |
| shadow | \[true, false, 'hover'] | false | 是否显示阴影<br />'hover' - 鼠标移到元素上显示<br />true - 总是显示<br />false - 从不显示 |
| style | object | 无 | 最外层扩展样式 |

<br />

#### Card.Header, Card.Body, Card.Footer

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| style | object | 无 | 最外层扩展样式 |

<br />

### Card.Accordion

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| active | number | 无 | 打开的索引，全关闭时为 -1，用于受控状态 |
| defaultActive | number | 0 | 默认打开的索引，用于非受控状态 |
| onChange | function | 无 | 面板打开回调 |

<br />

#### Card.Submit

同 [Button](/components/Button)
