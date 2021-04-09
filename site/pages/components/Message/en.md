# Message

Display message about operational feedback.

- Displays **success**, **warnings**, **errors**, and **general** information
- It is an immersive interactive experience that is lightweight, multi-location, and customizable.

<example />

## API 

### Message

Message provides a set of methods for global calls

Message.show(content, \[duration], \[options]) // No icon, pure message display

Message.info(content, \[duration], \[options])  // With basic style and icon

Message.success(content, \[duration], \[options])

Message.warn(content, \[duration], \[options])

Message.error(content, \[duration], \[options])

Message.close() // Close all messages

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| content | ReactNode | required | The message content |
| duration | number | 3 | Message duration, unit: s; If it is set to 0, it must be manually closed. |


### MessageOptions

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| onClose | function | none | The callback function when the message is closed. |
| position | string | 'top' | The position where the message display, options: \['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] |
| title | string | | title |
| className | string | none | class name |
| hideClose | boolean | false | hide close button |