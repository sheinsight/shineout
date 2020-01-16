# Tooltip

Tooltip is used to display text prompts, and if you need to more content, use [Popover](/components/Popover).

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| children | ReactElement | required | The child element can only be a ReactElement. |
| position | string | 'top' | The position of the pop-up layer, options: \['left', 'top', 'right', 'bottom'] |
| tip | string | required | Pop up texts |
| trigger| string | "hover" | Pop-up type, one of  \["hover", "click"]
| disabledChild | bool | false | make disabled element work |


## Note
Please ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.