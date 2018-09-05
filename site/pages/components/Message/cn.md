# Message 消息

<example />

## API 
Message 提供了一组方法供全局调用

Message.show(content, \[duration], \[options]) // 无样式

Message.info(content, \[duration], \[options])

Message.success(content, \[duration], \[options])

Message.warn(content, \[duration], \[options])

Message.error(content, \[duration], \[options])

Message.close() // 关闭所有消息

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | string\|ReactElement | 必填 | 消息内容 |
| duration | number | 3 | 消息持续时间，单位秒；如果设置为 0，必须手动关闭 |


#### options

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| onClose | function | 无 | 关闭后回调事件 |
| position | string | 'top' | 消息显示的位置，可选值 \['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] |
| title | string | - | 标题文字 |