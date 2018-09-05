# Message

<example />

## API 
Message provides a set of methods for global calls

Message.show(content, \[duration], \[options]) // no style

Message.info(content, \[duration], \[options])

Message.success(content, \[duration], \[options])

Message.warn(content, \[duration], \[options])

Message.error(content, \[duration], \[options])

Message.close() // Close all messages

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| content | string\|ReactElement | required | The message content |
| duration | number | 3 | Message duration, unit: s; If it is set to 0, it must be manually closed. |


#### options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| onClose | function | none | The callback function when the message is closed. |
| position | string | 'top' | The position where the message display, options: \['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] |
| title | string | | title |