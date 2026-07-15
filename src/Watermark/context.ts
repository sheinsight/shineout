import createReactContext from '../context'

export interface WatermarkContextValue {
  add: (element: HTMLElement) => void
  remove: (element: HTMLElement) => void
}

const noop = () => {}

export const DisabledWatermarkContext: WatermarkContextValue = {
  add: noop,
  remove: noop,
}

const WatermarkContext = createReactContext<WatermarkContextValue>(DisabledWatermarkContext)

export default WatermarkContext
