import Button  from './Button'
import Once from './Once'
import Group from './Group'

class SuperButton extends Button {
  static Group = Group
  static Once = Once
  static displayName = 'ShineoutButton'
}

export default SuperButton
