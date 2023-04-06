import '../../styles/normalize.less'
import spinLess from './spin.less'
import genaration from '../../utils/classname'

import defaultLess from './default.less'
import ringLess from './ring.less'
import planeLess from './plane.less'
import pulseLess from './pulse.less'
import waveLess from './wave.less'
import chasingDotsLess from './chasing-dots.less'
import doubleBounceLess from './double-bounce.less'
import cubeGridLess from './cube-grid.less'
import chasingRingLess from './chasing-ring.less'
import scaleCircleLess from './scale-circle.less'
import threeBounceLess from './three-bounce.less'
import fourDotsLess from './four-dots.less'

export const spinClass = genaration(spinLess, 'spin')

export const defaultClass = genaration(defaultLess, 'spin-default')
export const ringClass = genaration(ringLess, 'spin-ring')
export const planeClass = genaration(planeLess, 'spin-plane')
export const pulseClass = genaration(pulseLess, 'spin-pulse')
export const waveClass = genaration(waveLess, 'spin-wave')
export const chasingDotsClass = genaration(chasingDotsLess, 'chasing-dots')
export const doubleBounceClass = genaration(doubleBounceLess, 'double-bounce')
export const cubeGridClass = genaration(cubeGridLess, 'cube-grid')
export const chasingRingClass = genaration(chasingRingLess, 'chasing-ring')
export const scaleCircleClass = genaration(scaleCircleLess, 'scale-circle')
export const threeBounceClass = genaration(threeBounceLess, 'three-bounce')
export const fourDotsClass = genaration(fourDotsLess, 'four-dots')
