# Tree

##

#### The data used on this page is as follows (the amount of data is large, please be careful)
<example name="data" />

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| data | array[{children:[]}] | [] | data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node. |
| defaultExpanded | array\[key] | - | Default expanded node key. |
| disabled | boolean \| function(d) | false | When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function. |
| expanded | array\[key] | - | Expanded node key (controlled) |
| keygen | string \| function(obj, parentKey):string | required | Auxiliary method for generating key. <br />When it is a function, use the return value of this function. <br /> When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id. |
| line | boolean | true | Whether to display the connection line. |
| loader | function(key) | - | If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node. |
| mode | \[0\|1\|2\|3\|4] | 1 | mode <br />0: Returns only the fully selected node including the parent node. <br />1: Returns all selected nodes and semi-selected nodes. <br />2: Return only the selected child nodes. <br />3: If the parent node is full selected, only return the parent node. |
| onChange | function(array) | - | When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property. |
| onExpand | function(array) | - | The callback function for expanding the node. The parameter is the key array of the currently expanded nodes. |
| renderItem | string \| function(d) | required | When it is a string, return d\[string].<br /> When it is a function, return the result of this function. |
| defaultValue | array\[key] | - | Default selected key (not controlled) | 
| value | array\[key] | - | Selected key (controlled) |
| onDrop | function(data, key, targetKey, position) | - | It is draggable when setting the onDrop property. <br />data: Full data after dragging.<br />key: the key of dragged node<br />targetKey: the key of target node<br />position: The position of the target node. start at 0. | 
| defaultExpandAll | boolean | false | default expand all nodes | 
| childrenKey | string | 'children' | the key of the children data name | 
| expandIcons | \[Element, Element\] | none | custom expand/collapse button |
| dragImageSelector | string: Selector \| function(data) | - | the selector of drag image |
| dragImageStyle | object | - | the style of drag Image |
| leafClass | string \| function(data) | - | the class of lead, the params of function is data |
| dragHoverExpand | bool | false | auto expand the node when drag over |
| doubleClickExpand | bool | false | expand node while double click |
| onClick | func | none | node click |