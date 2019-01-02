import React from 'react'
import PureComponent from '../PureComponent'
import Input from '../Input'
import { tagClass } from '../styles'

class TagInput extends PureComponent {
  render() {
    const {
      className, ...props
    } = this.props

    let inputClassName = tagClass('input')
    if (className) inputClassName = `${inputClassName} ${className}`

    return (
      <Input
        className={inputClassName}
        size="small"
        width={100}
        {...props}
      />
    )
  }
}

export default TagInput
