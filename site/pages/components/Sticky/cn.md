# Sticky *附着*

类似于 position: sticky，在屏幕滚动时，保持元素在屏幕可见区域内。

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bottom | number | 无 | 距离底部多少偏移量触发 |
| className | string | 无 | 扩展className |
| style | object | 无 | 扩展样式。触发浮动后的默认zIndex为900，修改style的zIndex来改变。 |
| target | string \| HTMLElement | 无 | 附着的目标，默认为document.body。可以传入HTMLElement或者css selector，target 必须为 Sticky 组件的祖先节点 |
| top | number | 无 | 距离顶部多少偏移量触发 |