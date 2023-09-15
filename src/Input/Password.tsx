import React, { PureComponent } from 'react'
import Input from './Input'
import { InputPassword } from './Props'

const DefaultValue = {
  value: '',
  point: '•',
}

class Password extends PureComponent<InputPassword> {
  static defaultProps = DefaultValue

  constructor(props: InputPassword) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val: string) {
    const { value = DefaultValue.value, point = DefaultValue.point, clearToUndefined } = this.props
    if (val === undefined && clearToUndefined) {
      this.props.onChange(undefined)
      return
    }
    const newValue: string[] = []
    val.split('').forEach((v, i) => {
      newValue.push(v === point ? value[i] : v)
    })

    this.props.onChange(newValue.join(''))
  }

  render() {
    const { point = DefaultValue.point, value = DefaultValue.value, ...others } = this.props
    const transValue = Array.from({ length: (value || '').length }, () => point).join('')
    return <Input {...others} type="text" value={transValue} onChange={this.handleChange} />
  }
}

export default Password
