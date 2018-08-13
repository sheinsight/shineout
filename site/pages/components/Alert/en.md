# Alert

<example />

## API

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| children | any  | none | content, text or react component |
| className | string | none | extend className |
| icon | ReactElement \| boolean | none | When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement. |
| iconSize | number | 14 | the size for icon |
| onClose | func \| boolean | none | When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true. |
| style | object | none | the outermost extension style |
| type | string | *warning* | one out of four, \[*success*, *info*, *warning*, *danger(error)*] |