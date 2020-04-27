# Tag

<example />

## API

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| children | ReactNode  | - | Content, text or react component |
| className | string | - | Extend className |
| backgroundColor | string | - | background color,can set the tag's background color by it |
| onClose | () => void \| boolean | - | When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true. |
| onClick | (e: MouseEvent) => void | - | the click callback | 
| style | object | - | Container element style |
| disabled | boolean | false | is disabled | 
| type | 'success' \| 'info' \| 'warning' \| 'danger' \| 'error' | *default* | types |
