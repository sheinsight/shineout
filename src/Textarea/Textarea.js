import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
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
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    if (this.props.autosize) this.resize()
  }

  componentDidUpdate(prevProps) {
    if (this.props.autosize && prevProps.value !== this.props.value) this.resize(this.props.value)
  }

  bindShadow(el) {
    this.shadow = el
  }

  resize(value) {
    if (value || value === '') this.shadow.value = value
    const height = this.shadow ? this.shadow.scrollHeight : 0
    this.setState({ height })
  }

  handleChange(e) {
    this.props.onChange(e.target.value)

    if (this.props.autosize) {
      this.resize(e.target.value)
    }
  }

  handleKeyUp(e) {
    const { onEnterPress } = this.props
    if (e.keyCode === 13 && onEnterPress) {
      onEnterPress(e.target.value)
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
    return (
      <div key="info" style={{ minWidth: 'auto' }} className={inputClass('bottom-right', isError ? 'error' : 'tip')}>
        {text}
      </div>
    )
  }

  render() {
    const { autosize, onChange, maxHeight, info, onEnterPress, ...props } = this.props
    const value = props.value == null ? '' : props.value
    const height = this.state.height || 'auto'
    const className = autosize ? inputClass('auto-size') : ''

    const ts = [
      <textarea
        {...cleanProps(props)}
        key="t"
        value={value}
        className={className}
        style={{ height, maxHeight, overflow: 'auto' }}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
      />,

      this.renderInfo(),
    ]

    if (autosize) {
      ts.push(
        <textarea
          key="s"
          ref={this.bindShadow}
          className={inputClass('shadow')}
          rows={props.rows}
          defaultValue={value}
        />
      )
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
  onEnterPress: PropTypes.func,
  rows: PropTypes.number,
  value: PropTypes.string,
}

Textarea.defaultProps = {
  rows: 4,
}

export default Textarea
