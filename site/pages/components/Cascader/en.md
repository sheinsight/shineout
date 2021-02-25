# Cascader

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| clearable | boolean | false | If clearable is true, show clear value icon |
| data | any[] | [] | data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node. |
| disabled | (data: any) => boolean \| boolean | false | When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function. |
| expandTrigger | 'click' \| 'hover' \| 'hover-only'  | 'click' | Expand mode |
| keygen | ((data: any, parentKey: any) => string) \| string | required | Auxiliary method for generating key. <br />When it is a function, use the return value of this function. <br /> When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id. |
| loader | (key: any, data: any) => void | - | If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node. |
| mode | 0 \| 1 \| 2 \| 3 | none | mode <br />0: Returns only the fully selected node including the parent node. <br />1: Returns all selected nodes and semi-selected nodes. <br />2: Return only the selected child nodes. <br />3: If the parent node is full selected, only return the parent node. |
| onChange | (value: any[], selected: boolean) => void | - | When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property. |
| renderItem | (data: any) => ReactNode \| string | required | When it is a string, return d\[string].<br /> When it is a function, return the result of this function. |
| renderResult | (data: any, result: any[]) => ReactNode \| string | renderItem | The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected |
| defaultValue | any[] | - | Default selected key (not controlled) | 
| value | any[] | - | Selected key (controlled) |
| absolute | boolean | false | When it is true, the pop-up layer of option append into document.body. |
| compressed | boolean | false | Merges selected values |
| childrenKey | string | 'children' | the key of the children data name | 
| finalDismiss | boolean | false | close options after chose the final node |
| onCollapse | (collapse: boolean) => void | none | options collapse callback |
| onFilter | (text: string) => (data: any) => boolean | - | When the onFilter is not empty, you can filter data by input.<br />If the onFilter returns a function, use this function as a front-end filter.<br />If return undefined, you can do your own backend filtering.<br /> support in single selection state |
| height | number | 300 | height of dropdown options |
| filterDelay | number | 400 | ms. The delay of user input triggering filter events |
| size | string | none | size |