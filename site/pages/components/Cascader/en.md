# Cascader

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| clearable | bool | false | If clearable is true, show clear value icon |
| data | array[{children:[]}] | [] | data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node. |
| disabled | boolean \| function(d) | false | When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function. |
| expandTrigger | string | 'click' | Expand mode, options: \['click', 'hover'] |
| keygen | string \| function(obj, parentKey):string | required | Auxiliary method for generating key. <br />When it is a function, use the return value of this function. <br /> When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id. |
| loader | function(key) | - | If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node. |
| mode | \[0\|1\|2\|3\] | none | mode <br />0: Returns only the fully selected node including the parent node. <br />1: Returns all selected nodes and semi-selected nodes. <br />2: Return only the selected child nodes. <br />3: If the parent node is full selected, only return the parent node. |
| onChange | function(array) | - | When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property. |
| renderItem | string \| function(d) | required | When it is a string, return d\[string].<br /> When it is a function, return the result of this function. |
| renderResult | string \| function(d) | renderItem | The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected |
| defaultValue | array\[key] | - | Default selected key (not controlled) | 
| value | array\[key] | - | Selected key (controlled) |
| absolute | bool | false | When it is true, the pop-up layer of option append into document.body. |
| compressed | bool | false | Merges selected values |
| childrenKey | string | 'children' | the key of the children data name | 