# Sticky

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | number | - | Offsets from the bottom. |
| className | string | - | Extend className |
| style | object | - | Extend style. The default z-Index after triggering the float is 900, and you can modify the z-Index of the style to change. |
| target | string \| HTMLElement | none | Attached target. the default is the document.body. You can pass in an HTMLElement or css selector, and the target must be an ancestor node of the Sticky component. |
| top | number | none | Offsets from the top. |
| css | bool | true | use css position:sticky while target is ordered |
| onChange | (isSticky: boolean) => void | null | When the adsorption effect, trigger the callback |
