import React, { PureComponent } from 'react'
import { getUidStr } from '../utils/uid'
import { paginationClass } from './styles'
import Input from '../Input'
import { getDirectionClass } from '../utils/classname'
import { JumperProps } from './Props'

const inputStyle = { width: 60, display: 'inline-block' }
const nofunc = () => {}

class Jumper extends PureComponent<JumperProps> {
  renderRequire: string

  autoFocus: boolean

  constructor(props: JumperProps) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.renderRequire = getUidStr()
  }

  getMax() {
    const { total, pageSize } = this.props
    return Math.ceil(total / pageSize) || 1
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      let current = parseInt((e.target as HTMLInputElement).value, 10)
      this.autoFocus = true

      if (!Number.isFinite(current)) return
      if (current < 1) current = 1
      this.renderRequire = getUidStr()

      const max = this.getMax()
      if (current > max) current = max

      if (current === this.props.current) {
        this.forceUpdate()
      }
      this.props.onChange(current)
    }
  }

  render() {
    const { current, text, size, isSimple } = this.props

    let txt: string[] | React.ReactNode[] = text.jumper ? text.jumper.split('{input}') : []
    if (isSimple) {
      const spanClass = paginationClass('simple-span')
      txt = [
        [],
        [
          <span key="separator" className={spanClass}>
            /
          </span>,
          <span key="pageMax" className={spanClass}>
            {this.getMax()}
          </span>,
        ],
      ]
    }
    return (
      <div className={paginationClass(getDirectionClass('section'))}>
        {txt[0] ? <span>{txt[0]}</span> : undefined}
        <Input
          key={this.renderRequire}
          value={String(current)}
          onChange={nofunc}
          autoFocus={this.autoFocus}
          onKeyDown={this.handleKeyDown}
          digits={0}
          type="number"
          style={inputStyle}
          size={size}
          className={paginationClass(isSimple && 'simple-input')}
          delay={400}
        />
        {txt[1] ? <span>{txt[1]}</span> : undefined}
      </div>
    )
  }
}

export default Jumper
