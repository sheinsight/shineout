import { destroy, getComponent } from './messager'

let defaultOptions = {}
const create = type => (content, duration, options) => {
  const mo = Object.assign({}, defaultOptions, options)
  duration = [duration, defaultOptions.duration, 3].find(d => typeof d === 'number')
  const { onClose, position = 'top', title, className = '', top = 'auto', hideClose } = mo
  return getComponent(position).then(messager =>
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
  close: key => {
    if (key) destroy(key)
    else {
      ;['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(k => {
        destroy(k)
      })
    }
  },
  setOptions: options => {
    defaultOptions = options
  },
}
