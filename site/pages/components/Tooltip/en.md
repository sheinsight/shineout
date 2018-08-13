# Tooltip

Tooltip is primarily used to display text prompts, and if you need to display more, please use [Popover](#/components/Popover)

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| children | ReactElement | required | The child element can only be a ReactElement. |
| position | string | 'top' | The position of the pop-up layer, options: \['left', 'top', 'right', 'bottom'] |
| style | object | none | The outermost extension style |
| tip | string | required | Pop up texts |