# Popover

<example />

## API

### Popover 

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| background | string | '#fff' | Pop-up background-color(with arrows) |
| visible | bool | - | is visible (controlled) |
| onVisibleChange | func | - | the event of visible change | 
| mouseEnterDelay | number | 0 | the show delay of mouseenter(ms) | 
| mouseLeaveDelay | number | 500 | the hidden delay of mouseleave (ms) | 
| border | string | '#dee2e6' | The color of pop-up border(with arrows) |
| className | string | - | Extend className |
| children | ReactElement | required | Pop-up content. |
| onClose | function | - | Callback event when close. |
| onOpen | function | - | Callback event when open. |
| position | string | 'top' | The position of pop-up layer, options:  \['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right'] |
| style | object | - | The pop-up container style |
| trigger | string | 'hover' | options: \['click', 'hover'] |
| type | string | none | Options: \['success', 'info', 'warning', 'danger'] |
| * content | ReactElement \| function | | Old API, out of date. | 

### Popover.Confirm

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| onOk | func | none | ok button click callback, will close tooltip while returned promise resolve |
| onCancel | func | none | cancel button click callback, will close tooltip while returned promise resolve |
| text | object | { ok: 'Ok', cancel: 'Cancel' } | button text |
| type | string | *warning* |  icon type \[*success*, *info*, *warning*, *danger(error)*] |


## Note
Please ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
