import { CSSProperties } from 'react'
import { WatermarkContent, WatermarkFont, WatermarkText } from './Props'

export interface WatermarkContentLine {
  text: string
  font: Required<WatermarkFont>
}

export const FontGap = 3

function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function getStyleString(style: CSSProperties) {
  return Object.keys(style)
    .map(key => `${toLowercaseSeparator(key)}: ${style[key as keyof CSSProperties]};`)
    .join(' ')
}

export function getCanvasFont(font: Required<WatermarkFont>, ratio = 1) {
  return `${font.fontStyle} normal ${font.fontWeight} ${font.fontSize * ratio}px ${font.fontFamily}`
}

export function getMarkSize(
  context: CanvasRenderingContext2D,
  content: WatermarkContentLine[],
  image: string | undefined,
  width?: number,
  height?: number
): [number, number] {
  let defaultWidth = 120
  let defaultHeight = 64

  if (!image && context.measureText) {
    if (content.length) {
      const sizes = content.map(line => {
        context.font = getCanvasFont(line.font)
        const metrics = context.measureText(line.text)
        const measuredHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        return [metrics.width, Number.isFinite(measuredHeight) ? measuredHeight : line.font.fontSize]
      })
      defaultWidth = Math.ceil(Math.max(...sizes.map(size => size[0])))
      defaultHeight = Math.ceil(sizes.reduce((total, size) => total + size[1], 0)) + (content.length - 1) * FontGap
    } else {
      defaultWidth = 0
      defaultHeight = 0
    }
  }

  return [width === undefined ? defaultWidth : width, height === undefined ? defaultHeight : height]
}

function prepareCanvas(width: number, height: number, ratio = 1) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const realWidth = width * ratio
  const realHeight = height * ratio
  canvas.width = Math.ceil(realWidth)
  canvas.height = Math.ceil(realHeight)
  if (context) context.save()
  return { canvas, context, realWidth, realHeight }
}

function getRotatePosition(x: number, y: number, angle: number) {
  return [x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle)]
}

export function drawWatermark(
  content: WatermarkContentLine[] | HTMLImageElement,
  rotate: number,
  ratio: number,
  width: number,
  height: number,
  gapX: number,
  gapY: number
) {
  const contentCanvas = prepareCanvas(width, height, ratio)
  const { canvas, context, realWidth, realHeight } = contentCanvas
  if (!context) return null

  if (content instanceof HTMLImageElement) {
    context.drawImage(content, 0, 0, realWidth, realHeight)
  } else {
    context.textBaseline = 'top'
    let top = 0
    content.forEach(line => {
      context.font = getCanvasFont(line.font, ratio)
      context.fillStyle = line.font.color
      context.textAlign = line.font.textAlign
      let textLeft = realWidth / 2
      if (line.font.textAlign === 'left' || line.font.textAlign === 'start') textLeft = 0
      if (line.font.textAlign === 'right' || line.font.textAlign === 'end') textLeft = realWidth
      context.fillText(line.text, textLeft, top)
      top += (line.font.fontSize + FontGap) * ratio
    })
  }

  const angle = (Math.PI / 180) * rotate
  let left = 0
  let right = 0
  let top = 0
  let bottom = 0
  const halfWidth = realWidth / 2
  const halfHeight = realHeight / 2
  const points = [
    [-halfWidth, -halfHeight],
    [halfWidth, -halfHeight],
    [halfWidth, halfHeight],
    [-halfWidth, halfHeight],
  ]
  points.forEach(point => {
    const [targetX, targetY] = getRotatePosition(point[0], point[1], angle)
    left = Math.min(left, targetX)
    right = Math.max(right, targetX)
    top = Math.min(top, targetY)
    bottom = Math.max(bottom, targetY)
  })

  const cutWidth = right - left
  const cutHeight = bottom - top
  const rotateCanvas = prepareCanvas(cutWidth, cutHeight)
  if (!rotateCanvas.context) return null
  rotateCanvas.context.translate(rotateCanvas.canvas.width / 2, rotateCanvas.canvas.height / 2)
  rotateCanvas.context.rotate(angle)
  if (realWidth > 0 && realHeight > 0) {
    rotateCanvas.context.drawImage(canvas, -realWidth / 2, -realHeight / 2)
  }

  const realGapX = gapX * ratio
  const realGapY = gapY * ratio
  const filledWidth = (cutWidth + realGapX) * 2
  const filledHeight = cutHeight + realGapY
  const filledCanvas = prepareCanvas(filledWidth, filledHeight)
  if (!filledCanvas.context) return null

  const drawImage = (targetX: number, targetY: number) => {
    filledCanvas.context!.drawImage(
      rotateCanvas.canvas,
      0,
      0,
      rotateCanvas.canvas.width,
      rotateCanvas.canvas.height,
      targetX,
      targetY,
      cutWidth,
      cutHeight
    )
  }
  if (cutWidth > 0 && cutHeight > 0) {
    const markLeft = realGapX / 2
    const markTop = realGapY / 2
    drawImage(markLeft, markTop)
    drawImage(markLeft + cutWidth + realGapX, markTop - cutHeight / 2 - realGapY / 2)
    drawImage(markLeft + cutWidth + realGapX, markTop + cutHeight / 2 + realGapY / 2)
  }

  return {
    dataURL: filledCanvas.canvas.toDataURL(),
    width: filledWidth / ratio,
    height: filledHeight / ratio,
  }
}

function isWatermarkText(content: WatermarkContent): content is WatermarkText {
  return typeof content === 'object' && content !== null
}

export function mergeFont(font: Required<WatermarkFont>, customFont: WatermarkFont = {}): Required<WatermarkFont> {
  return Object.keys(customFont).reduce(
    (result, key) => {
      const value = customFont[key as keyof WatermarkFont]
      if (value !== undefined) (result as any)[key] = value
      return result
    },
    { ...font }
  )
}

export function getContentLines(
  content: WatermarkContent | WatermarkContent[] | undefined,
  font: Required<WatermarkFont>
): WatermarkContentLine[] {
  if (content === undefined || content === null) return []
  const contents = Array.isArray(content) ? content : [content]

  return contents.map(item => {
    if (isWatermarkText(item)) {
      return {
        text: item.text || '',
        font: mergeFont(font, item.font),
      }
    }
    return { text: item || '', font }
  })
}
