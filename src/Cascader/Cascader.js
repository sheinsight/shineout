import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import DatumTree from '../Datum/Tree'
import { cascaderClass, selectClass } from '../styles'
import Result from './Result'
import CascaderList from './List'
import { docSize } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import absoluteList from '../List/AbsoluteList'

const OptionList = absoluteList(({ focus, ...other }) => (focus ? <div {...other} /> : null))

const isDescendent = (el, id) => {
  if (el.getAttribute('data-id') === id) return true
  if (!el.parentElement) return false
  return isDescendent(el.parentElement, id)
}

class Cascader extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
      path: [],
      position: 'drop-down',
      listStyle: props.data.length === 0 ? { height: 'auto', width: '100%' } : { height: props.height },
    }

    this.datum = new DatumTree({
      data: props.data,
      loader: props.loader,
      keygen: props.keygen,
      mode: props.mode,
      onChange: props.onChange,
      value: props.value || props.defaultValue,
      disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
    })

    this.isRendered = false

    this.selectId = `select_${getUidStr()}`
    this.handleClick = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.shouldFocus = this.shouldFocus.bind(this)
    this.bindRef = this.bindRef.bind(this)
    this.resetPosition = this.resetPosition.bind(this)
  }

  componentDidUpdate(prevProps) {
    this.datum.mode = this.props.mode
    if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])
    if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  bindRef(el) {
    this.ref = el
  }

  bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway)
  }

  clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway)
  }

  shouldFocus(el) {
    if (el.getAttribute('data-id') === this.selectId) return true
    if (getParent(el, `.${cascaderClass('result')}`)) return true
    return false
  }

  handleClickAway(e) {
    const desc = isDescendent(e.target, this.selectId)
    if (!desc) {
      this.clearClickAway()
      this.props.onBlur()
      this.handleState(false)
    }
  }

  handlePathChange(id, data, path) {
    setTimeout(() => {
      this.setState({ path: [...path, id] })
    }, 50)
  }

  handleFocus(e) {
    if (!this.shouldFocus(e.target)) return
    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleClear() {
    const { mode, onChange } = this.props
    if (mode === undefined) this.setState({ path: [] })
    else this.datum.setValue([])
    onChange([])

    // force close
    setTimeout(() => this.handleState(false), 10)
  }

  handleState(focus, e) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return

    // click close icon
    if (focus && e && e.target.classList.contains(cascaderClass('close'))) return

    const { height } = this.props
    let { position } = this.props
    if (!position) {
      const windowHeight = docSize.height
      const bottom = height + this.element.getBoundingClientRect().bottom
      if (bottom > windowHeight) position = 'drop-up'
    }

    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.renderPending = false
      this.bindClickAway()
    }
    // } else if (blur) {
    //   this.clearClickAway()
    //   onBlur()
    // }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.handleState(!this.state.focus)
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur()
      // e.preventDefault()
      if (this.state.focus) {
        this.handleState(false)
      } else {
        this.clearClickAway()
      }
    }
  }

  resetPosition() {
    if (!this.ref) return

    const { listStyle } = this.state
    const { data, height } = this.props
    const { width } = this.ref.getBoundingClientRect()
    const { left } = this.ref.parentElement.getBoundingClientRect()

    if (data.length === 0) {
      if (listStyle.height === 'auto') return
      this.setState({ listStyle: { height: 'auto', width: '100%' } })
      return
    }

    if (left + width > docSize.width) {
      if (listStyle.left === 'auto') return
      this.setState({ listStyle: { height, left: 'auto', right: 0 } })
    } else {
      if (listStyle.right === undefined) return
      this.setState({ listStyle: { height } })
    }
  }

  renderList() {
    const { data, keygen, renderItem, mode, onChange, loader, onItemClick, expandTrigger } = this.props
    const { path, listStyle } = this.state

    const props = {
      datum: this.datum,
      renderItem,
      keygen,
      loader,
      onPathChange: this.handlePathChange,
      onChange,
      onItemClick,
      multiple: mode !== undefined,
      expandTrigger,
    }
    const className = classnames(selectClass('options'), cascaderClass('options'))

    let tempData = data

    setTimeout(() => {
      this.resetPosition()
    })

    return (
      <div className={className} ref={this.bindRef} style={listStyle}>
        <CascaderList {...props} key="root" data={tempData} id={path[0]} parentId="" path={[]} />
        {path.map((p, i) => {
          tempData = tempData.find(d => {
            const nid = this.datum.getKey(d, path[i - 1])
            return nid === p
          })
          if (tempData && tempData.children && tempData.children.length > 0) {
            tempData = tempData.children
            return (
              <CascaderList
                {...props}
                key={p}
                data={tempData}
                id={path[i + 1]}
                parentId={path[i]}
                path={path.slice(0, i + 1)}
              />
            )
          }
          return null
        })}
      </div>
    )
  }

  renderAbsoluteList() {
    const { absolute, zIndex } = this.props
    const { focus, position } = this.state
    const className = classnames(cascaderClass(focus && 'focus'), selectClass(this.state.position))
    if (!focus && !this.isRendered) return null
    this.isRendered = true
    return (
      <OptionList
        rootClass={className}
        position={position}
        absolute={absolute}
        focus={focus}
        parentElement={this.element}
        data-id={this.selectId}
        zIndex={zIndex}
        fixed="min"
      >
        {this.renderList()}
      </OptionList>
    )
  }

  render() {
    const { placeholder, disabled, size, ...other } = this.props
    const className = classnames(
      cascaderClass(
        '_',
        size,
        this.state.focus && 'focus',
        other.mode !== undefined && 'multiple',
        disabled === true && 'disabled'
      ),
      selectClass(this.state.position)
    )

    return (
      <div
        // eslint-disable-next-line
        tabIndex={ disabled === true ? -1 : 0}
        className={className}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        data-id={this.selectId}
        onKeyDown={this.handleKeyDown}
        ref={el => {
          this.element = el
        }}
      >
        <Result
          {...other}
          multiple={other.mode !== undefined}
          datum={this.datum}
          placeholder={placeholder}
          onClear={this.handleClear}
          onPathChange={this.handlePathChange}
        />

        {this.renderAbsoluteList()}
      </div>
    )
  }
}

Cascader.propTypes = {
  clearable: PropTypes.bool,
  data: PropTypes.array,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  expandTrigger: PropTypes.oneOf(['click', 'hover', 'hover-only']),
  height: PropTypes.number,
  keygen: PropTypes.any,
  loader: PropTypes.func,
  mode: PropTypes.oneOf([0, 1, 2, 3]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onItemClick: PropTypes.func,
  placeholder: PropTypes.any,
  position: PropTypes.string,
  renderItem: PropTypes.any,
  size: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.array,
  absolute: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Cascader.defaultProps = {
  clearable: true,
  expandTrigger: 'click',
  height: 300,
  data: [],
}

export default Cascader
