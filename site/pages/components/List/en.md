# List

<example />

## API

### List

| Property | Type | Default | required | Description |
| --- | --- | --- | -- | --- |
| data | any[] | [] | true | render data |
| className | string | null | false | expand container className |
| renderItem | ((rowData, index) => React.node) \| string | null | false | render item |
| onChange | (rowData, rowIndex) => void | null | false | Select the row. <br />rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format. |
| keygen | ((data) => any) \| string \| boolean | null | false | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| format | (data) => any \| string | d => d | false | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format]<br />When it is a function, use its return value. |
| value | any[] | none | false | The current selected value. |
| footer | ReactNode | null | false | The content at the bottom |
| style | object | null | false | expand container style |
| scrollLoading | (() => void) | null | false | Triggered when scrolling to the bottom |
| loading | boolean \| React.node | null | false | loading |
| rowClassName | ((rowData, index) => string) \| string | null | false | custom row className |
| bordered | boolean | null | false | show border |
| prediction | (v: any, data) => boolean | (val, d) => val===format(d) | false | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| empty | string \| React.node | null | false | What to display when no data |
| fixed | boolean | false | false | virtualized list |
| rowsInView | number | 10 | false | Number of list items displayed at the same time |
| lineHeight | number | 32 | false | height of item |

### List.BaseItem

| Property | Type | Default | required | Description |
| --- | --- | --- | -- | --- |
| avatar | string \| React.node \| (() => React.node) | null | false | List images |
| title | string | null | false | The title of the list |
| desc | string | null | false | description |
| content | string \| React.node \| (() => React.node) | null | false | list content |
| extra | array \| React.node | null | false | Content area on the right side of the list |
| className | string | null | false | Item className |
