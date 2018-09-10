import { destroy, getComponent } from './messager'

const create = type => (content, duration = 3, options = {}) => {
  const { onClose, position = 'top', title } = options
  getComponent(position).then((messager) => {
    messager.addMessage({
      content,
      duration,
      type,
      onClose,
      title,
    })
  })
}

export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warn: create('warning'),
  warning: create('warning'),
  danger: create('danger'),
  error: create('danger'),
  close: (key) => {
    if (key) destroy(key)
    else {
      ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((k) => {
        destroy(k)
      })
    }
  },
}
