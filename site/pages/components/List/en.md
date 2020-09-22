# list

<example />

## API

### List

| Property | Type | Default | required | Description |
| --- | --- | --- | -- | --- |
| data | any[] | [] | true | render data |
| className | string | null | false | expand container className |
| renderItem | function | null | true | render item |
| onChange | (rowData, rowIndex) => void | null | false | Select the row. <br />rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format. |
| keygen | ((data: object) => any) \| string \| boolean | null | false | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| format | (data: object) => any \| string | d => d | false | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format]<br />When it is a function, use its return value. |
| value | any[] | none | false | The current selected value. |
| footer | ReactNode | null | false | The content at the bottom |
| style | object | null | false | expand container style |
| scrollLoading | (() => void) | null | false | Triggered when scrolling to the bottom |
| loading | boolean | null | false | loading |
| rowClassName | ((rowData, index) => string) \| string | null | false | custom row className |


### List.Meta

| Property | Type | Default | required | Description |
| --- | --- | --- | -- | --- |
| avatar | string \| React.node \| (() => React.node) | null | false | List images |
| title | string | null | false | The title of the list |
| desc | string | null | false | description |
| content | string \| React.node \| (() => React.node) | null | false | list content |
| className | string | null | false | Item className |