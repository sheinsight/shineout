import { destroy, getComponent } from './messager'
import { MessageType, MessageOptions, PositionType, MessageFuncArg } from './Props'

let defaultOptions: MessageOptions & {
  duration?: number
  top?: string
} = {}

const create = (type: MessageType) => (
  content: MessageFuncArg['content'],
  duration?: MessageFuncArg['duration'],
  options?: MessageOptions
) => {
  const mo = Object.assign({}, defaultOptions, options)
  duration = [duration, defaultOptions.duration, 3].find(d => typeof d === 'number')!
  const { onClose, position = 'top', title, className = '', top = 'auto', hideClose, container } = mo
  return getComponent({ position, container }).then(messager =>
    messager.addMessage({
      content,
      duration,
      type,
      onClose,
      title,
      className,
      top,
      position,
      hideClose,
    })
  )
}

export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warn: create('warning'),
  warning: create('warning'),
  danger: create('danger'),
  error: create('danger'),
  close: (key?: PositionType) => {
    if (key) destroy(key)
    else {
      ;(['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as PositionType[]).forEach(k => {
        destroy(k)
      })
    }
  },
  setOptions: (options: MessageOptions) => {
    defaultOptions = options
  },
}
