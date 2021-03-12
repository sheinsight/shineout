# Select

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| width | number | null | width |
| style | object | null | expand style |
| absolute | boolean | false | When it is true, the pop-up layer of option append into document.body. |
| autoAdapt | boolean | false | option list is auto adapt |
| clearable | boolean | false | If clearable is true, show clear value icon |
| multiple | boolean | false | if it is true, it will be multiple selection |
| columns | number | 1 | Option columns.  |
| columnWidth | number | 160 | Option column width, only effective when columns > 1 |
| data | any[] | required | Options data |
| treeData | any[] | - | tree select data，\[{children: []}\] |
| defaultValue | any[] | | Initial value |
| disabled | (data: any) => boolean \| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| filterDelay | number | 400 | ms. The delay of user input triggering filter events |
| format | (data: any) => any \| string | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format\]<br />When it is a function, use its return value. |
| name | string | - | The name of a Form that accesses data |
| keygen | ((data: any) => string) \| string \| true | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| onChange | (value: any, data: any, checked: boolean) => void | - | value is the datum.getValue(). |
| onCreate | (input: string) => any \| boolean | - | If the onCreate event is set, the component is inputable.<br />When onCreate is a function, the return value of this function is diaplay at the top as a new option.<br />When onCreate is true, use the built-in functuon text => text. |
| onFilter | (text: string) => (data: any) => boolean | - | When the onFilter is not empty, you can filter data by input.<br />If the onFilter returns a function, use this function as a front-end filter.<br />If return undefined, you can do your own backend filtering. |
| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| renderItem | (data: any) => ReactNode \| string | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| renderResult | (data: any) => ReactNode \| string | renderItem | The content displayed in the result after selecting, if not set, use renderItem |
| value | any[] \| string \| object | | In the Form, the value will be taken over by the form and the value will be invalid. |
| compressed | boolean \| 'no-repeat' | false | Merges selected values, valid only in multiselect mode; the first value will not appear in the Popover when it is'no-repeat'. |
| zIndex | number | 1000 | options z-index |
| groupBy | (record: any, index: number, data: any) => any | - | group by | 
| filterSingleSelect | boolean | false | blur to select the data when filter data has only single. only work in filter. |
| separator | string | none | set with multiple, value will separator by this |
| childrenKey | string | 'children' | treeData，the key of the children data name | 
| defaultExpandAll| boolean | false | expand all node, only in can be use in treeData | 
| renderUnmatched | (data: any) => ReactNode | none | the way to render not matched data value |
| emptyAfterSelect | boolean | false | empty input after select value |
| showArrow | boolean | true | show dropdown arrow, only single select |
| showHitDescendants | boolean | false | Whether to show the descendant nodes of the hit node after filtering |
| focusSelected | boolean | true | selected value while click under onCreate or onFilter |
| noCache | boolean | false | data cache, if data change asynchronously, better set true |
| compressedClassName | string | none | compressed popover classname |
| onCollapse | (collapse: boolean) => void | none | option list collapse callback |
| resultClassName | ((value: any) => string) \| string | none | The className of the selected result content container |
| columnsTitle | ReactNode | none | title of columns multiple select |
| reFocus | boolean | false | There are onFilter and onCreate, select Option, automatically focus Input |
| header | () => ReactNode \| ReactNode | null | Custom render option list header |
| lineHeight | number | 34 | Option height. List items are rendered using virtual lists, and when the option height changes, the correct height should be specified via lineHeight |
| hideCreateOption | boolean | false | hide the creat option while set onCreate |