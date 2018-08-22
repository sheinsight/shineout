import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { inputClass } from '../styles'
import cleanProps from '../utils/cleanProps'

class Textarea extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      height: 0,
    }

    this.bindShadow = this.bindShadow.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  bindShadow(el) {
    this.shadow = el
  }

  handleChange(e) {
    this.props.onChange(e.target.value)

    if (this.props.autosize) {
      this.shadow.value = e.target.value
      const height = this.shadow.scrollHeight
      this.setState({ height })
    }
  }

  handleBlur(e) {
    const { value } = e.target
    const { forceChange, onBlur } = this.props
    if (onBlur) onBlur(e)
    forceChange(value)
  }

  renderInfo() {
    const { info } = this.props
    if (typeof info !== 'function') return null
    const res = info(this.props.value)

    // empty
    if (!res) return null

    const isError = res instanceof Error
    const text = isError ? res.message : res
    return <div key="info" style={{ minWidth: 'auto' }} className={inputClass('bottom-right', isError ? 'error' : 'tip')}>{text}</div>
  }

  render() {
    const {
      autosize, onChange, maxHeight, info, ...props
    } = this.props
    const height = this.state.height || 'auto'

    const className = autosize ? inputClass('auto-size') : ''

    const ts = [
      <textarea
        {...cleanProps(props)}
        key="t"
        className={className}
        style={{ height, maxHeight, overflow: 'auto' }}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />,

      this.renderInfo(),
    ]

    if (autosize) {
      ts.push((
        <textarea
          key="s"
          ref={this.bindShadow}
          className={inputClass('shadow')}
          rows={props.rows}
          defaultValue={props.value}
        />
      ))
    }

    return ts
  }
}

Textarea.propTypes = {
  autosize: PropTypes.bool,
  forceChange: PropTypes.func,
  info: PropTypes.func,
  maxHeight: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  value: PropTypes.string,
}

Textarea.defaultProps = {
  value: '',
  rows: 4,
}

export default Textarea
