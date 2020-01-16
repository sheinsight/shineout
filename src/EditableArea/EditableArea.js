import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import classnames from 'classnames'
import { editableAreaClass } from '../styles'
import Clear from '../Input/clear'
import { getParent } from '../utils/dom/element'

function formatPreTagValue(value) {
  if (!value && value !== 0) return '\u00a0'
  const arr = String(value).split('\n')
  const len = arr.length
  const last = arr[len - 1]
  if (last === '') arr[len - 1] = '\u00a0'
  return arr.join('\n')
}

function formatShowValue(value) {
  if (!value && value !== 0) return '\u00a0'
  const arr = String(value).split('\n')
  const len = arr.length
  if (len > 1) return `${arr[0]}...`
  return String(value)
}

class EditableArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue,
      showTextarea: false,
      height: 0,
      showClear: false,
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMousedown = this.handleMousedown.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  componentDidMount() {
    this.handleResize()
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMousedown)
  }

  getValue() {
    const { value, onChange } = this.props
    if (onChange && value !== undefined) return value
    return this.state.value
  }

  getPreTagValue(value) {
    const { showTextarea } = this.state
    const { placeholder } = this.props
    if (!value && value !== 0 && placeholder) {
      return <span className={editableAreaClass('textarea-placeholder')}>{placeholder}</span>
    }
    return showTextarea ? formatPreTagValue(value) : formatShowValue(value)
  }

  bindElement(el) {
    this.container = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  showClear() {
    const { showTextarea, showClear } = this.state
    const { clearable } = this.props
    const value = this.getValue()
    return value && showClear && !showTextarea && clearable
  }

  handleResize() {
    let height
    if (this.placeholder) {
      height = this.placeholder.offsetHeight || 0
    }
    this.setState(
      immer(state => {
        state.height = height
      })
    )
  }

  handleFocus(e) {
    const { onFocus } = this.props
    document.addEventListener('mousedown', this.handleMousedown)
    this.handleToggle(true)
    if (onFocus) onFocus(e)
  }

  handleMousedown(e) {
    const isChild = getParent(e.target, this.container)
    if (!isChild) {
      this.handleToggle(false)
      document.removeEventListener('mousedown', this.handleMousedown)
    }
  }

  handleToggle(show) {
    this.setState(
      immer(state => {
        state.showTextarea = show
        state.showClear = false
      }),
      this.handleResize
    )
  }

  handleChange(e) {
    const { value } = e.target
    const { onChange } = this.props
    if (onChange) onChange(value)
    this.setState(
      immer(state => {
        state.value = value
      }),
      this.handleResize
    )
  }

  handleMouseEnter() {
    this.setState(
      immer(state => {
        state.showClear = true
      })
    )
  }

  handleMouseLeave() {
    this.setState(
      immer(state => {
        state.showClear = false
      })
    )
  }

  renderItem() {
    const { showTextarea, height } = this.state
    const { style, placeholder, onBlur } = this.props
    const value = this.getValue()
    return [
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <pre
        key="pre"
        ref={this.bindPlaceholder}
        className={editableAreaClass('placeholder', !showTextarea && 'placeholder-one-line')}
      >
        {this.getPreTagValue(value)}
      </pre>,
      <textarea
        key="t"
        placeholder={placeholder}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={onBlur}
        spellCheck="false"
        style={{ height, lineHeight: (style || {}).lineHeight }}
        rows={1}
        className={editableAreaClass('textarea', showTextarea ? 'edit' : 'show')}
        value={showTextarea ? value : formatShowValue(value)}
      />,
      this.showClear() && (
        <div key="d" style={{ height }} className={editableAreaClass('clear-wrapper')}>
          <Clear
            onClick={() => {
              this.handleChange({ target: { value: '' } })
            }}
            key="c"
          />
        </div>
      ),
    ]
  }

  render() {
    const { style, className } = this.props
    const cls = classnames(className, editableAreaClass('_'))
    return (
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        className={cls}
        ref={this.bindElement}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.renderItem()}
      </div>
    )
  }
}

EditableArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
}

EditableArea.defaultProps = {
  defaultValue: '',
  clearable: true,
}

export default EditableArea
