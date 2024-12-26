const PIXEL_STEP = 10
const LINE_HEIGHT = 40
const PAGE_HEIGHT = 800
const DELTA_LENGTH = 120

// wheelDeltaX, wheelDelta, and wheelDeltaZ have all been removed as they is a deprecated properties on WheelEvents
// https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#typescript-32

interface OldWheelEvent extends WheelEvent {
  axis?: number
  wheelDelta?: number
  wheelDeltaY?: number
  wheelDeltaX?: number
  HORIZONTAL_AXIS?: number
}

// 确保 spinX 和 spinY 是 -1, 0, 或 1
const normalizeSpin = (value: number) => {
  if (value > 0) return 1
  if (value < 0) return -1
  return 0
}

export default function(event: OldWheelEvent) {
  let sX = 0
  let sY = 0
  let pX = 0
  let pY = 0

  if ('detail' in event) {
    sY = event.detail
  }
  if ('wheelDelta' in event && event.wheelDelta) {
    sY = -event.wheelDelta / DELTA_LENGTH
  }
  if ('wheelDeltaY' in event && event.wheelDeltaY) {
    sY = -event.wheelDeltaY / DELTA_LENGTH
  }
  if ('wheelDeltaX' in event && event.wheelDeltaX) {
    sX = -event.wheelDeltaX / DELTA_LENGTH
  }

  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY
    sY = 0
  }

  pX = sX * PIXEL_STEP
  pY = sY * PIXEL_STEP

  if ('deltaY' in event) {
    pY = event.deltaY
  }
  if ('deltaX' in event) {
    pX = event.deltaX
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode === 1) {
      pX *= LINE_HEIGHT
      pY *= LINE_HEIGHT
    } else {
      pX *= PAGE_HEIGHT
      pY *= PAGE_HEIGHT
    }
  }

  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1
  }

  const result = {
    spinX: normalizeSpin(sX),
    spinY: normalizeSpin(sY),
    pixelX: pX,
    pixelY: pY,
  }

  // 判断滚动方向
  if (Math.abs(result.pixelX) > Math.abs(result.pixelY)) {
    // 水平方向变化更大
    result.spinY = 0
    result.pixelY = 0
  } else {
    // 垂直方向变化更大
    result.spinX = 0
    result.pixelX = 0
  }

  return result
}
