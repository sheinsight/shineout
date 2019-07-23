# Tabs *标签*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| active | string \| int | 0 | 当前选中标签页（受控） |
| align | string | 无 | 设置标签对齐方式，可选值 \['left', 'right', 'vertical-left', 'vertical-right'] |
| background | string | '#fff' | 选中标签背景色 |
| border | string | '#ddd' | 边框颜色 |
| className | string | - | 扩展className |
| collapsible | bool | false | 是否可折叠 |
| defaultActive | string \| int | 0 | 默认选中标签页（非受控） |
| tabBarExtraContent | string \| ReactElement | - | tab bar 上额外的元素 | 
| tabBarStyle | style | - | tab bar 的样式对象 |
| inactiveBackground | string | 'transparent' | 未选中标签背景色 |
| onChange | function(key) | - | 标签选中时触发回调事件 |
| shape | string | - | 可选值为 \['line', 'button']，shape 不为空时，background 等颜色参数将会无效 |
| style | object | - | 最外层扩展样式 |

<br />

### Panel

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | - | 扩展className |
| background | string | - | 背景色，会覆盖 Tabs 的background |
| border | string | - | 边框颜色，会覆盖 Tabs 的border |
| disabled | bool | false | 是否禁用 |
| id | string \| number | - | 选填，默认为 index |
| style | object | - | 内容样式 |
| tab | string \| ReactElement | 必填 | 标签标题内容 |