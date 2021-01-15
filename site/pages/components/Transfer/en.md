# Transfer

<example />

## API

** *For uniformity and ease of use, keygen is used as the result for the apis associated with the check, so keygen is required and no duplicate keygen is guaranteed.**


| Property | Type | Default | Description | Version |
| --- | --- | --- | --- | -- |
| value | any[] | - | The set of values ​​displayed in the box data on the right | |
| titles | ReactNode[] | - | Title on both sides, order from left to right | |
| data | any[] | - | data source | |
| format | (data: any) => any \| string | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format\]<br />When it is a function, use its return value. | |
| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match | |
| keygen | ((data: any) => string) \| string \| true | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. | |
| renderItem | (data: any) => ReactNode \| string | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. | |
| footers | ReactNode[] | - | Bottom element, order from left to right | |
| operations | ReactNode[] | - | Operational elements, the order is from top to bottom | |
| operationIcon | boolean | true |  Whether to display the icon of the action button | |
| className | string | - | Expanded class | |
| style | object | - |  Expanded style | |
| listClassName | string | - | List extended class | |
| listStyle | object | - | List extension style | |
| selectedKeys | any[] | - |  Checked list | |
| defaultSelectedKeys | any[] | - | Default checked list | |
| onSelectChange | (sourceKeys: any[], targetKeys: any[]) => void | - |  Check the trigger method | |
| disabled | (data: any) => boolean \| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. | |
| empty | ReactNode | "no data" | Contentless display | |
| onFilter | (text: string, value: any, isSource: boolean) => boolean | - | Filter function. params: input text, the data, is data in left |
| loading| boolean \| boolean[] | - | Loading, if you need to have inconsistent states on both sides of the load, you need to pass in the array | |
| onSearch | (text: string, isSource: boolean) => void | - | the callback of input change, params: input text, is data in the left | 1.4.4 |
| rowsInView | number | 20 | loaded rows |
| listHeight | number | 180 | list height |
| lineHeight | number | 32 | list line height |
| children | (({onSelected, selectedKeys, value, direction, filterText}) => ReactNode) | null | custom render content |