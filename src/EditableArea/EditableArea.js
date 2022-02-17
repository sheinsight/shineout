import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Textarea from '../Textarea'
import Input from '../Input'
import Popover from '../Popover'
import { editableAreaClass } from './styles'
import icons from '../icons'
import { focusElement, getParent } from '../utils/dom/element'
import { inputClass } from '../Input/styles'
import InputTitle from '../InputTitle'
import { inputTitleClass } from '../InputTitle/styles'

const noop = () => {}

function formatShowValue(value) {
  if (!value && value !== 0) return ''
  const arr = String(value).split('\n')
  const len = arr.length
  if (len > 1) return `${arr[0]}...`
  return String(value)
}

class Editable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showTextarea: false,
    }

    this.bindContainer = this.bindElement.bind(this, 'container')
    this.bindInput = this.bindElement.bind(this, 'input')
    this.renderInput = this.renderInput.bind(this)
    this.renderPlace = this.renderPlace.bind(this)
    this.renderTextarea = this.renderTextarea.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.autoFocus = this.autoFocus.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.showPop = this.updateShowTextarea.bind(this, true)
    this.hidePop = this.updateShowTextarea.bind(this, false)
    this.handleClear = this.onChange.bind(this, '')
  }

  componentDidUpdate(prevProps, prevState) {
    const { showTextarea } = this.state
    if (prevState.showTextarea !== showTextarea && showTextarea) {
      this.autoFocus()
    }
  }

  onChange(value) {
    const { onChange } = this.props
    if (typeof onChange === 'function') onChange(value)
  }

  onBlur(e) {
    const { onBlur } = this.props
    this.hidePop()
    if (typeof onBlur === 'function') onBlur(e)
  }

  updateShowTextarea(flag) {
    if (flag && this.input) {
      this.width = getParent(this.input, `.${editableAreaClass('input')}`).offsetWidth
    }
    this.setState({ showTextarea: flag })
    if (this.props.onShowTextareaChange) {
      this.props.onShowTextareaChange(flag)
    }
  }

  handleFocus(e) {
    const { onFocus } = this.props
    if (typeof onFocus === 'function') onFocus(e)
  }

  bindElement(type, el) {
    this[type] = el
  }

  autoFocus() {
    if (!this.container) return
    const target = this.container.querySelector(`.${editableAreaClass('text-area')} textarea.so-input-auto-size`)
    if (target) focusElement.end(target)
  }

  renderTextarea() {
    const { showTextarea } = this.state
    const { delay, placeholder, maxHeight, value, innerTitle, placeTitle, renderFooter } = this.props
    if (!showTextarea) return null

    return (
      <div ref={this.bindContainer}>
        <Textarea
          className={editableAreaClass('text-area')}
          autosize
          innerTitle={innerTitle}
          placeTitle={placeTitle}
          value={value}
          rows={1}
          delay={0}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.handleFocus}
          placeholder={placeholder}
          maxHeight={maxHeight}
          renderFooter={renderFooter}
        />
      </div>
    )
  }

  renderResult() {
    const { placeholder, disabled, value, renderResult, placeTitle, innerTitle } = this.props
    const result = renderResult(value)
    return (
      <div
        tabIndex={disabled ? -1 : 0}
        className={classnames(editableAreaClass('input'), inputClass('_'))}
        onFocus={this.showPop}
      >
        <InputTitle placeTitle={placeTitle} innerTitle={innerTitle} open={!!value}>
          <div className={classnames(inputClass('spare'), inputTitleClass('hidable'))} ref={this.bindInput}>
            {result || <div className={inputClass('placeholder')}>{placeholder || <br />}</div>}
          </div>
        </InputTitle>
      </div>
    )
  }

  renderInput() {
    const { placeholder, disabled, value, innerTitle, placeTitle } = this.props
    return (
      <Input
        innerTitle={innerTitle}
        placeTitle={placeTitle}
        forwardedRef={this.bindInput}
        placeholder={placeholder}
        value={formatShowValue(value)}
        onChange={noop}
        className={editableAreaClass('input')}
        onFocus={this.showPop}
        disabled={disabled}
      />
    )
  }

  renderPlace() {
    const { renderResult } = this.props
    if (renderResult && typeof renderResult === 'function') {
      return this.renderResult()
    }
    return this.renderInput()
  }

  render() {
    const { showTextarea } = this.state
    const { width, style, className, bordered, clearable, getPopupContainer, value } = this.props
    const cls = classnames(className, editableAreaClass('_', !bordered && 'none-bordered'))
    const ms = Object.assign({ width }, style)
    const popStyle = { width: this.width }
    return (
      <div className={cls} style={ms}>
        {this.renderPlace()}
        <Popover
          visible={showTextarea}
          showArrow={false}
          className={editableAreaClass('popover')}
          position="cover"
          style={popStyle}
          getPopupContainer={getPopupContainer}
        >
          {this.renderTextarea()}
        </Popover>
        {clearable && value ? (
          <div className={editableAreaClass('clear')} onClick={this.handleClear}>
            {icons.CloseCircle}
          </div>
        ) : null}
      </div>
    )
  }
}

Editable.defaultProps = {
  bordered: false,
}

Editable.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  delay: PropTypes.number,
  bordered: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerTitle: PropTypes.node,
  placeTitle: PropTypes.node,
  renderFooter: PropTypes.func,
  renderResult: PropTypes.func,
  onShowTextareaChange: PropTypes.func,
}

export default Editable
