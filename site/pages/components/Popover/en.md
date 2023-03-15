# Popover

<example />

## API

### Popover

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| background | string | '#fff' | Pop-up background-color(with arrows) |
| visible | boolean | - | is visible (controlled) |
| onVisibleChange | (visible: boolean) => void | - | the event of visible change |
| mouseEnterDelay | number | 0 | the show delay of mouseenter(ms) |
| mouseLeaveDelay | number | 0 | the hidden delay of mouseleave (ms) |
| border | string | '#dee2e6' | The color of pop-up border(with arrows) |
| className | string | - | Extend className |
| children | ReactNode | required | Pop-up content. |
| onClose | () => void | - | Callback event when close. |
| onOpen | () => void | - | Callback event when open. |
| position | 'top-left' \| 'top' \| 'top-right' \| 'left-top' \| 'left' \| 'left-bottom' \| 'right-top' \| 'right' \| 'right-bottom' \| 'bottom-left' \| 'bottom' \| 'bottom-right' | none | The position of pop-up layer. Default auto. |
| style | object | - | The pop-up container style |
| trigger | 'click' \| 'hover' | 'hover' | type of show |
| type | 'success' \| 'info' \| 'warning' \| 'danger' | none | type of popover |
| content | (close: () => void) => void \| ReactNode | - | Old API, out of date. |
| priorityDirection | string | 'vertical' | Popup location priority, default is top and bottom priority, only valid when position is not set, Options: \['vertical', 'horizontal', 'auto'] |
| getPopupContainer | () => HTMLElement | none | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |
| scrollDismiss |  () => HTMLElement \| boolean| false | scroll to dismiss, return el to order scroller |
| showArrow | boolean | true | show arrow |
| okType | string | *primary* |  ok button's type, same with Button type |
| zIndex | number | 1060 | z-index of popover |
| clickToCancelDelay | boolean | false | Cancel the popup after clicking the element in mouseEnterDelay |
| useTextStyle | boolean | - | Using inner styles |
| destroy | boolean | false | delete dom when close |

### Popover.Confirm

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| onOk | () => void | none | ok button click callback, will close tooltip while returned promise resolve |
| onCancel | () => void | none | cancel button click callback, will close tooltip while returned promise resolve |
| text | object | { ok: 'Ok', cancel: 'Cancel' } | button text |
| type | string |  *confirmwarning* |  icon type \[*success*, *info*, *warning*, *danger(error)*, *confirmwarning*] |
| icon | ReactNode | none |  custom icon |

### Popover.Content
The property is the same as Popover, but does not support the *content* property

### PopoverNote
Please ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
