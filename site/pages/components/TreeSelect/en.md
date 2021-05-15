# TreeSelect

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| width | number | null | width |
| clearable | boolean | false | If clearable is true, show clear value icon |
| multiple | boolean | false | if it is true, it will be multiple selection |
| data | any[] | [] | data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node. |
| value | string \| string[] | | In the Form, the value will be taken over by the form and the value will be invalid. |
| defaultValue | string \| string[] | | Initial value |
| defaultExpanded | string[] | - | Default expanded node key. |
| disabled | (data: object) => boolean \| boolean | false | When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function. |
| filterDelay | number | 400 | ms. The delay of user input triggering filter events |
| name | string | - | The name of a Form that accesses data |
| keygen | ((data: object) => string) \| string \| true | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| expanded | string[] | - | Expanded node key (controlled) |
| loader | (key: string) => void | - | If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node. |
| mode | 0 \| 1 \| 2 \| 3 | 1 | mode <br />0: Returns only the fully selected node including the parent node. <br />1: Returns all selected nodes and semi-selected nodes. <br />2: Return only the selected child nodes. <br />3: If the parent node is full selected, only return the parent node. |
| onExpand | (expanded: string[]) => void | - | The callback function for expanding the node. The parameter is the key array of the currently expanded nodes. |
| onChange | (value: string[]) => void | - | value is your picker now |
| onFilter | (text: string) => (data: any) => boolean | - | When the onFilter is not empty, you can filter data by input.<br />If the onFilter returns a function, use this function as a front-end filter.<br />If return undefined, you can do your own backend filtering. |
| renderItem | (data: object) => ReactNode | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| renderResult | (data: object) => ReactNode | renderItem | The content displayed in the result after selecting, if not set, use renderItem |
| compressed | boolean \| 'no-repeat' | false | Merges selected values, valid only in multiselect mode; the first value will not appear in the Popover when it is'no-repeat'. |
| absolute | boolean | false | When it is true, the pop-up layer of option append into document.body. |
| zIndex | number | 1000 | options z-index |
| childrenKey | string | 'children' | the key of the children data name | 
| defaultExpandAll | boolean | false | default expand all node |
| showHitDescendants | boolean | false | Whether to show the descendant nodes of the hit node after filtering |
| renderUnmatched | (data: any) => ReactNode | none | render unmatched value |
| onCollapse | (collapse: boolean) => void | none | option collapse callback |
| rules | any[] | null | Validation rules |
| unmatch | boolean | none | render unmatch value |
| underline | boolean | false | only display border bottom  |
