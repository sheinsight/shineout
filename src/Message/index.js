import { destroy, getComponent } from './messager'

const create = type => (content, duration = 3, options = {}) => {
  const { onClose, position = 'top' } = options
  const messager = getComponent(position)
  messager.addMessage({
    content,
    duration,
    type,
    onClose,
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
  close: () => {
    destroy('top')
    destroy('middle')
  },
}
