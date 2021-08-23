# Drawer
A panel which slides in from the edge of the screen.

<example />

## API

### Drawer

| Property | Type | Default | Description | version |
| --- | --- | --- | --- | --- |
| className | string | - | Extend className | |
| bodyStyle | object | - | Extend Drawer body style | |
| footer | ReactNode | - | The content at the bottom | |
| maskCloseAble | boolean | true | Whether to close the mask when the mask is clicked | |
| maskOpacity | number | 0.25 | The opacity of the mask | |
| position | string | - | Pop-up position, one of \['top', 'right', 'bottom', 'left'] | |
| style | object | - | Extend style | |
| title | ReactNode | - | the title of the pop-up layer | |
| usePortal | boolean | true | When the usePortal is true, use ReactDOM.createPortal to create the pop-up layer, otherwise use ReactDOM.render.<br /> Use ReactDOM.render while func call. | |
| visible | boolean | false |  | |
| width | number \| string | 'auto' | the width of the Drawer | |
| height | number \| string | 'auto' | the height of the Drawer | |
| zIndex | number | 1050 | Drawer z-index | |
| rootClassName | string | - | the root element of Drawer, the mask parent element | 1.4.2 |
| container | () => HTMLElement \| HTMLElement | document.body | target element | |
| maskBackground | string | null | mask background | |
| onClose | () => void | none | Drawer close callback | |
| destroy | boolean | false | Whether to destroy elements when it is closed | |
| hideClose | boolean | none | hide the close button | |
| type | 'info' \| 'success' \| 'warning' \| 'error' \| 'normal' | null | Drawer Title show status icon | 1.6.1 |
| zoom | boolean | false | toggle zoom animation | |
| esc | boolean | true | esc to close | |
| events | object | none | Drawer events list, use stopPropagation at createPortal | |
| fullScreen | boolean | false | display Drawer with full screen | |
| forceMask | boolean | false | Whether to force the mask transparency (in multi-layer Drawer, the transparency of other Drawer masks except the first layer will be adjusted to 0.01) | |
