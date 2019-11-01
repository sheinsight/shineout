# Transfer

<example />

## API

** *For uniformity and ease of use, keygen is used as the result for the apis associated with the check, so keygen is required and no duplicate keygen is guaranteed.**


| Property | Type | Default | Description |
| --- | --- | --- | --- |
| value | array | - | The set of values ​​displayed in the box data on the right |
| titles | array | - | Title on both sides, order from left to right |
| data | array | - | datasource |
| format | string \| function | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format\]<br />When it is a function, use its return value. |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| keygen | string \| function(obj):string | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| renderItem | string \| function(d) | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| footers | array | - | Bottom element, order from left to right |
| operations | array | - | Operational elements, the order is from top to bottom |
| operationIcon | bool | true |  Whether to display the icon of the action button |
| value | array |  - |  Target value |
| className | string | - | Expanded class |
| style | object | - |  Expanded style |
| listClassName | string | - | List extended class |
| listStyle | object | - | List extension style |
| selectedKeys | array | - |  Checked list |
| defaultSelectedKeys | array | - | Default checked list |
| onSelectChange | function: (souceKeys, targetKeys) => void | - |  Check the trigger method |
| disabled | bool \| function | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| empty | element \| string | "no data" | Contentless display |
| onFilter | function: (text, value) => bool | - | Filter function |