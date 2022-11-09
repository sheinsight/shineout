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
    const { value = DefaultValue.value, point = DefaultValue.point } = this.props
    const newValue: string[] = []
    val.split('').forEach((v, i) => {
      newValue.push(v === point ? value[i] : v)
    })

    this.props.onChange(newValue.join(''))
  }

  render() {
    const { point = DefaultValue.point, ...others } = this.props
    const value = Array.from({ length: this.props.value.length }, () => point).join('')
    return <Input {...others} type="text" value={value} onChange={this.handleChange} />
  }
}

export default Password
