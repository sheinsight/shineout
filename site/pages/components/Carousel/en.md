# Carousel

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| animation | string | 'slide' | animation effects, options: <br />slide - horizontal sliding<br />slide-y - vertical sliding<br />fade - fading |
| className | string | none | extend className |
| indicatorPosition | 'left' \| 'center' \| 'right'  | 'center' | the position of indicator |
| indicatorType | (current: number, moveTo: () => void) => ReactNode \| string | 'circle' | the style of indicator, string options: \['circle', 'number', 'line'], using function for custom styles |
| interval | number | 0 | the interval of animation, When it is not 0, play automatically |
| onMove | (current: number, extra: object) => void | none | move callback |