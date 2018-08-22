# Alert

<example />

## API

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| children | any  | - | Content, text or react component |
| className | string | - | Extend className |
| icon | ReactElement \| boolean | - | When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement. |
| iconSize | number | 14 | The size for icon |
| onClose | func \| boolean | - | When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true. |
| style | object | - | Container element style |
| type | string | *warning* | options: \[*success*, *info*, *warning*, *danger(error)*] |