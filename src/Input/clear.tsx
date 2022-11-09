import React, { Component } from 'react'
import { inputClass } from './styles'
import { ClearProps } from './Props'

class Clear extends Component<ClearProps> {
  constructor(props: ClearProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: React.MouseEvent) {
    // do not blur
    e.preventDefault()

    const { onClick, clearResult } = this.props
    if (onClick) onClick({ target: { value: clearResult } } as any, true)
  }

  render() {
    return (
      <div onMouseDown={this.handleClick} className={inputClass('clear-wrapper')}>
        <div className={inputClass('clear')} />
      </div>
    )
  }
}

export default Clear
