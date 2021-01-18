# CardGroup

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | extend className |
| style | object | none | wrapper style |
| height | number | none | group height |
| cardWidth | number | none | card min width |
| columns | number | 3 | items count each row, not work while cardWidth setted |
| gridStyle | object | none | grid style |
| gutter | number | 16 | gutter width horizontal and vertical, if diff shoud set gridStyle |

### CardGroup.Item

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | extend className |
| style | object | none | card style | 
| placeholder | ReactNode | none | lazy load placeholder, enable lazy load while set |
| checked | boolean \| undefined | - | checked status, hide while not set |
| disabled | boolean | false | disable checkbox |
| value | any | true | Specifies the result |
| onChange | (checked: boolean, value: any) => void | - | check changed, value is the value props |

