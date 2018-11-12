import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import DatumTree from '../Datum/Tree'
import { cascaderClass, selectClass } from '../styles'
import Result from './Result'
import List from './List'

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
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  componentDidUpdate(prevProps) {
    this.datum.mode = this.props.mode
    if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])
    if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
  }

  componentWillUnmount() {
    this.clearClickAway()
  }

  bindClickAway() {
    document.addEventListener('click', this.handleClickAway)
  }

  clearClickAway() {
    document.removeEventListener('click', this.handleClickAway)
  }

  handleClickAway(e) {
    const desc = isDescendent(e.target, this.selectId)
    if (!desc) this.handleState(false)
  }

  handlePathChange(id, data, path) {
    setTimeout(() => {
      this.setState({ path: [...path, id] })
    }, 50)
  }

  handleClear() {
    const { mode, onChange } = this.props
    if (mode === undefined) this.setState({ path: [] })
    else this.datum.setValue([])
    onChange([])

    // force close
    setTimeout(() => this.handleState(false), 10)
  }

  handleState(focus) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return

    const { onBlur, onFocus, height } = this.props
    let { position } = this.props
    if (!position) {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const bottom = height + this.element.getBoundingClientRect().bottom
      if (bottom > windowHeight) position = 'drop-up'
    }

    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.bindClickAway()
      this.renderPending = false
      onFocus()
    } else {
      this.clearClickAway()
      onBlur()
    }
  }

  renderList() {
    const {
      data, keygen, renderItem, height, mode, onChange, loader, onItemClick, expandTrigger,
    } = this.props
    const { focus, path } = this.state

    if (!focus && !this.isRendered) return null
    this.isRendered = true

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
    return (
      <div className={className} style={{ height }}>
        <List {...props} key="root" data={tempData} id={path[0]} parentId="" path={[]} />
        {
          path.map((p, i) => {
            tempData = tempData.find((d) => {
              const nid = this.datum.getKey(d, path[i - 1])
              return nid === p
            })
            if (tempData && tempData.children && tempData.children.length > 0) {
              tempData = tempData.children
              return <List {...props} key={p} data={tempData} id={path[i + 1]} parentId={path[i]} path={path.slice(0, i + 1)} />
            }
            return null
          })
        }
      </div>
    )
  }

  render() {
    const {
      placeholder, disabled, size, ...other
    } = this.props
    const className = classnames(
      cascaderClass(
        '_',
        size,
        this.state.focus && 'focus',
        disabled && 'disabled',
      ),
      selectClass(this.state.position),
    )

    return (
      <div
        className={className}
        // onFocus={this.handleFocus}
        onClick={this.handleFocus}
        data-id={this.selectId}
        ref={(el) => { this.element = el }}
      >
        <Result
          {...other}
          multiple={other.mode !== undefined}
          datum={this.datum}
          placeholder={placeholder}
          onClear={this.handleClear}
          onPathChange={this.handlePathChange}
        />

        {
          this.renderList()
        }
      </div>
    )
  }
}

Cascader.propTypes = {
  clearable: PropTypes.bool,
  data: PropTypes.array,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  expandTrigger: PropTypes.oneOf(['click', 'hover']),
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
}

Cascader.defaultProps = {
  clearable: true,
  expandTrigger: 'click',
  height: 300,
}

export default Cascader
