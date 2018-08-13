# Rate

<example />

## API

#### Rate function(background, front):ReactClass

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| background | ReactElement \| string \| array | required | Pending item |
| front | ReactElement \| string \| array | front | Selected item. If it is not filled in value, it is the same as the pending item |

### Rate

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | number | | Default value |
| disabled | bool | false | Whether to be read-only |
| max | number | 5 | The maximum value of the option, Integer |
| onChange | function(d) | | The callback function when the value is changing |
| repeat | bool | true | 
| size | number \| string | 20 | the size of the icon |
| value | number | 0 | As an inputable component, it is an integer. When it is read-only, it can take decimals. |