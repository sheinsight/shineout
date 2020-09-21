# list

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | any[] | [] | render data |
| className | string | 无 | expand container className |
| renderItem | function | 无 | render item |
| onChange | (rowData, rowIndex) => void | 无 | Select the row. <br />rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format. |
| keygen | ((data: object) => any) \| string \| boolean | null | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| format | (data: object) => any \| string | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format]<br />When it is a function, use its return value. |
| value | any[] | none | The current selected value. |
| footer | ReactNode | - | The content at the bottom |