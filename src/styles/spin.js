import genaration from '../utils/classname'

export const defaultClass = genaration(require('./spin/default.less'), 'spin-default')
export const ringClass = genaration(require('./spin/ring.less'), 'spin-ring')
export const planeClass = genaration(require('./spin/plane.less'), 'spin-plane')
export const pulseClass = genaration(require('./spin/pulse.less'), 'spin-pulse')

export const chasingDotsClass = genaration(require('./spin/chasing-dots.less'), 'chasing-dots')
export const doubleBounceClass = genaration(require('./spin/double-bounce.less'), 'double-bounce')
export const waveClass = genaration(require('./spin/wave.less'), 'spin-wave')
export const cubeGridClass = genaration(require('./spin/cube-grid.less'), 'cube-grid')
export const chasingRingClass = genaration(require('./spin/chasing-ring.less'), 'chasing-ring')
export const scaleCircleClass = genaration(require('./spin/twelve-circle.less'), 'twelve-circle')
export const threeBounceClass = genaration(require('./spin/three-bounce.less'), 'three-bounce')
export const fourDotsClass = genaration(require('./spin/four-dots.less'), 'four-dots')
