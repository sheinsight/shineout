import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { inputClass } from '../Input/styles'
import cleanProps from '../utils/cleanProps'
import InputTitle from '../InputTitle'
import { inputTitleClass } from '../InputTitle/styles'

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
    this.defaultInfo = this.defaultInfo.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    if (this.props.autosize) this.resize()
  }

  componentDidUpdate(prevProps) {
    if (this.props.autosize && prevProps.value !== this.props.value) this.resize(this.props.value)
  }

  defaultInfo = value => {
    if (!value || value.length === 0) return null
    const { info } = this.props
    const text = `${value.length} / ${info}`
    if (value.length <= info) return text
    return new Error(text)
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
      onEnterPress(e.target.value, e)
    }
  }

  handleBlur(e) {
    const { value } = e.target
    const { forceChange, onBlur } = this.props
    if (onBlur) onBlur(e)
    forceChange(value)
  }

  renderFooter() {
    const { renderFooter, value } = this.props
    if (!(renderFooter && typeof renderFooter === 'function')) return null
    return (
      <div key="footer" className={inputClass('footer')}>
        {renderFooter(value)}
      </div>
    )
  }

  renderInfo() {
    const { info } = this.props
    const notNumber = typeof info !== 'number'

    if (typeof info !== 'function' && notNumber) return null

    const textInfo = notNumber ? info : this.defaultInfo
    const res = textInfo(this.props.value)

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
    const {
      autosize,
      onChange,
      maxHeight,
      info,
      onEnterPress,
      resize,
      renderFooter,
      inputFocus,
      innerTitle,
      placeTitle,
      ...props
    } = this.props
    const value = props.value == null ? '' : props.value
    const height = this.state.height || 'auto'
    const footerEl = this.renderFooter()
    const className = autosize ? inputClass('auto-size') : inputClass(resize && 'textarea-resize')
    const cs = classnames(className, innerTitle && inputTitleClass('hidable', 'item'))
    const ts = [
      <textarea
        {...cleanProps(props)}
        key="t"
        value={value}
        className={cs}
        style={{ height, maxHeight, overflow: 'auto' }}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
      />,
      footerEl,
      this.renderInfo(),
    ]

    const cs2 = classnames(inputClass('shadow'), innerTitle && inputTitleClass('hidable', 'item'))

    if (autosize) {
      ts.push(<textarea key="s" ref={this.bindShadow} className={cs2} rows={props.rows} defaultValue={value} />)
    }

    return (
      <InputTitle innerTitle={innerTitle} open={!!value || !!inputFocus} placeTitle={placeTitle}>
        {ts}
      </InputTitle>
    )
  }
}

Textarea.propTypes = {
  autosize: PropTypes.bool,
  forceChange: PropTypes.func,
  info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  maxHeight: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  rows: PropTypes.number,
  value: PropTypes.string,
  resize: PropTypes.bool,
  renderFooter: PropTypes.func,
  innerTitle: PropTypes.node,
  inputFocus: PropTypes.bool,
  placeTitle: PropTypes.node,
}

Textarea.defaultProps = {
  rows: 4,
  resize: false,
}

export default Textarea
