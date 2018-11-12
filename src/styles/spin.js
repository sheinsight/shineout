// Created by scripts/create-style.js.
import genaration from '../utils/classname'

import defaultLess from './spin/default.less'
import ringLess from './spin/ring.less'
import planeLess from './spin/plane.less'
import pulseLess from './spin/pulse.less'
import waveLess from './spin/wave.less'
import chasingDotsLess from './spin/chasing-dots.less'
import doubleBounceLess from './spin/double-bounce.less'
import cubeGridLess from './spin/cube-grid.less'
import chasingRingLess from './spin/chasing-ring.less'
import scaleCircleLess from './spin/scale-circle.less'
import threeBounceLess from './spin/three-bounce.less'
import fourDotsLess from './spin/four-dots.less'

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
