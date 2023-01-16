import React, { ChangeEvent, KeyboardEvent, FocusEvent } from 'react'
import classnames from 'classnames'
import config, { isRTL } from '../config'
import { PureComponent } from '../component'
import { inputClass } from '../Input/styles'
import cleanProps from '../utils/cleanProps'
import InputTitle from '../InputTitle'
import { inputTitleClass } from '../InputTitle/styles'
import { OriginTextareaProps } from './props'

interface TextareaState {
  height: number
}

const DefaultProps = {
  rows: 4,
  resize: false,
}
class Textarea extends PureComponent<OriginTextareaProps, TextareaState> {
  shadow: HTMLTextAreaElement

  static defaultProps = DefaultProps

  constructor(props: OriginTextareaProps) {
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

  componentDidUpdate(prevProps: OriginTextareaProps) {
    if (this.props.autosize && prevProps.value !== this.props.value) this.resize(this.props.value)
  }

  getTrim() {
    const { trim } = this.props
    if (trim !== undefined) return trim
    if (config.trim !== undefined) return config.trim
    return false
  }

  defaultInfo = (value?: string) => {
    if (!value || value.length === 0) return null
    const { info } = this.props
    const text = `${value.length} / ${info}`
    if (value.length <= (info as number)) return text
    return new Error(text)
  }

  bindShadow(el: HTMLTextAreaElement) {
    this.shadow = el
  }

  resize(value?: string) {
    if (value || value === '') this.shadow.value = value
    const height = this.shadow ? this.shadow.scrollHeight : 0
    this.setState({ height })
  }

  handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    this.props.onChange(e.target.value)

    if (this.props.autosize) {
      this.resize(e.target.value)
    }
  }

  handleKeyUp(e: KeyboardEvent<HTMLTextAreaElement>) {
    const { onEnterPress } = this.props
    if (e.keyCode === 13 && onEnterPress) {
      onEnterPress((e.target as HTMLTextAreaElement).value, e)
    }
  }

  handleBlur(e: FocusEvent<HTMLTextAreaElement>) {
    let newValue = e.target.value
    const { forceChange, onBlur } = this.props
    if (this.getTrim()) {
      newValue = newValue.trim()
      e.target.value = newValue
    }
    forceChange(newValue)
    if (onBlur) onBlur(e)
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
      <div
        key="info"
        style={{ minWidth: 'auto' }}
        className={inputClass(isRTL() ? 'bottom-left' : 'bottom-right', isError ? 'error' : 'tip')}
      >
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

export default Textarea
