import { PureComponent } from 'react'

export default class extends PureComponent {
  componentWillUnmount() {
    this.$willUnmount = true
  }

  setState(...args) {
    if (this.$willUnmount) return
    super.setState(...args)
  }
}
