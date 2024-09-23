import { getCurrentCSSZoom } from './document'

const getZoomBoundingClientRect = (element: HTMLElement) => {
  const currentCSSZoom = getCurrentCSSZoom()
  if (currentCSSZoom !== 1) {
    const isNotZoom = currentCSSZoom === 1 || !currentCSSZoom

    if (isNotZoom) {
      return element.getBoundingClientRect()
    }

    const zoomRatio = 1 / currentCSSZoom
    const rect = element.getBoundingClientRect()

    return {
      x: rect.x * zoomRatio,
      y: rect.y * zoomRatio,
      top: rect.top * zoomRatio,
      right: rect.right * zoomRatio,
      bottom: rect.bottom * zoomRatio,
      left: rect.left * zoomRatio,
      width: rect.width * zoomRatio,
      height: rect.height * zoomRatio,
    }
  }
  return element.getBoundingClientRect()
}

export default getZoomBoundingClientRect
