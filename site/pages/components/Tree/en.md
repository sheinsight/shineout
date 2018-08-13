# Tree

##

#### The data used on this page is as follows (the amount of data is relatively large, please be careful)
<example name="data" />

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| onChange | function(array) | none | When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property. |
| data | array[{children:[]}] | [] | data. The child node is children. If the children value is null or its length is 0, it is considered a leaf node. |
| defaultExpanded | array\[key] | none | Default expanded node key. |
| disabled | boolean \| function(d) | false | When the selection box is displayed, it is valid; when it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function. |
| expanded | array\[key] | none | Expanded node key (controlled) |
| keygen | string \| function(obj, parentKey):string | required | Auxiliary method for generating key. <br />When it is a function, use the return value of this function. <br /> When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id. |
| line | boolean | true | Whether to display the connection line. |
| loader | function(key) | none | After setting the loader attribute, the node that does not define children is regarded as loading node dynamically. Click expanded button to trigger the loader event. Children are null or its length is 0 will be regarded as a leaf node. |
| mode | \[1\|2\|3\|4] | 1 | mode <br />1: Returns only the fully selected node including the parent node. <br />2: Returns all selected nodes and semi-selected parent nodes. <br />3: Return only the selected child nodes. <br />4: If the parent node is selected, only the parent node is returned. |
| onExpanded | function(array) | none | The callback function for expanding the node. The parameter is the key array of the currently expanded node. |
| renderItem | string \| function(d) | required | When it is a string, return d\[string].<br /> When it is a function, return the result of this function. |
| defaultValue | array\[key] | none | Default selected key (not controlled) | 
| value | array\[key] | none | Selected key (controlled) |
| onDrop | function(data, key, targetKey, position) | none | It is draggable when setting the onDrop property. <br />data: Full data after dragging.<br />key: the key of dragged node<br />targetKey: the key of target node<br />position: The position of the target node. start at 0. | 