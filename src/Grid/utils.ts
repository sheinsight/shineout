import config from '../config'

const CACHES: {
  [className: string]: boolean
} = {}
const RESPONSIVE = {
  sm: '568',
  md: '768',
  lg: '992',
  xl: '1200',
}
type Responsive = keyof typeof RESPONSIVE

const GridClassName = `${config.prefix}-grid`
const GridFullClassName = `${config.prefix}-grid-full`
const defaultResponsive = 'md'

function createStyle(text: string, id: string) {
  let style = document.head.querySelector(`#${id}`) as Element & { type: string }
  if (style) {
    return
  }

  style = document.createElement('style')
  style.type = 'text/css'
  style.id = id
  style.innerHTML = text
  document.head.appendChild(style)
}

function generateGrid(width: number | string, className: string, responsive: Responsive) {
  const minWidth = RESPONSIVE[responsive]
  const text = `@media screen and (min-width: ${minWidth}px) { .${className}{width: ${width}%} }`
  createStyle(text, className)
}

function generateOffset(width: number | string, className: string, responsive: Responsive) {
  const minWidth = RESPONSIVE[responsive]
  const text = `@media screen and (min-width: ${minWidth}px) { .${className}{margin-left: ${width}%} }`
  createStyle(text, className)
}

function generate(w: number | string, type: 'grid' | 'offset', res: Responsive) {
  let width = w
  const responsive = res || defaultResponsive

  if (!width || width <= 0) {
    return ''
  }

  if (width > 1) {
    width = 1
  }
  width = ((width as number) * 100).toFixed(4)
  width = width.substr(0, width.length - 1)

  const className = `${config.prefix}-${type}-${responsive}-${width.replace('.', '-')}`
  if (!CACHES[className]) {
    if (type === 'grid') {
      generateGrid(width, className, responsive)
    } else {
      generateOffset(width, className, responsive)
    }
    CACHES[className] = true
  }
  return className
}

export function getGrid(
  opt?:
    | number
    | {
        width?: number
        offset?: number | string
        responsive?: Responsive
      }
) {
  let options = opt
  if (!options) {
    return ''
  }
  if (typeof options === 'number') {
    options = { width: options }
  }

  const { width, offset, responsive } = options
  const gridClass = generate(width!, 'grid', responsive!)
  const offsetClass = generate(offset!, 'offset', responsive!)

  return `${GridClassName} ${GridFullClassName} ${gridClass} ${offsetClass}`
}

function init() {
  const text = []

  text.push(`
.${GridClassName} {
  position: relative;
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
  box-sizing: border-box;
}`)

  text.push(`.${GridFullClassName}{width:100%}`)
  createStyle(text.join(''), GridClassName)
}

init()
