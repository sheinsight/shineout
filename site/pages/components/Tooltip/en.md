# Tooltip

Tooltip is used to display text prompts, and if you need to more content, use [Popover](/components/Popover).

<example />

## API

### Tooltip

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| animation | boolean | true | use animation |
| className | string | none | Extend className |
| children | ReactNode | required | The child element can only be a ReactElement. |
| position | 'left' \| 'top' \| 'right' \| 'bottom' | 'top' | The position of the pop-up layer, options: \['left', 'top', 'right', 'bottom'] |
| style | object | null | extend style |
| tip | ReactNode | required | Pop up texts |
| trigger| string | "hover" | Pop-up type, one of  \["hover", "click"]
| disabledChild | boolean | false | make disabled element work |


### TooltipNote
Please ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
