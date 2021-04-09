import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import Checkbox from '../Checkbox'
import Spin from '../Spin'
import { cascaderClass } from '../styles'
import Caret from '../icons/Caret'
import { getParent } from '../utils/dom/element'
import { checkinputClass } from '../styles'
import { isRTL } from '../config'

const checkBoxStyle = { marginRight: 8, marginTop: -1, verticalAlign: 'top' }

class Node extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  checkDisabled() {
    const { datum, id, disabled } = this.props
    if (disabled) return true

    return datum.isDisabled(id)
  }

  handleClick() {
    const { id, data, path, onChange, onPathChange, loader, multiple, datum } = this.props
    onPathChange(id, data, path, true)

    if (!multiple) {
      onChange([...path, id], datum.getDataById(id))
    }

    if (loader && !this.state.loading) {
      this.setState({ loading: true })
      loader(id, data)
    }
  }

  handlePathChange() {
    const { id, data, path, onPathChange } = this.props
    // if (active) return
    onPathChange(id, data, path)
  }

  handleChange(_, checked) {
    const { datum, id, onChange } = this.props
    datum.set(id, checked ? 1 : 0)
    onChange(datum.getValue(), datum.getDataById(id))
  }

  handleSelect(e) {
    const { datum, id } = this.props
    if (getParent(e.target, `.${checkinputClass('_')}`)) return
    const checked = datum.getChecked(id)
    this.handleChange(null, !checked)
  }

  renderContent() {
    const { id, active, data, renderItem } = this.props
    const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]
    return render(data, active, id)
  }

  render() {
    const { active, data, multiple, datum, id, loader, expandTrigger, childrenKey } = this.props
    const { loading } = this.state
    const disabled = this.checkDisabled()
    const children = data[childrenKey]
    const hasChildren = children && children.length > 0
    const mayChildren = loader && !loading && children === undefined
    const className = cascaderClass(
      'node',
      active && 'active',
      disabled && 'disabled',
      hasChildren && 'has-children',
      mayChildren && 'may-be-children'
    )

    const style = {}

    const events = {}
    if (!disabled && (expandTrigger !== 'hover-only' || !children || children.length === 0)) {
      events.onClick = this.handleClick
      style.cursor = 'pointer'
    }
    if (expandTrigger === 'hover' || expandTrigger === 'hover-only') {
      events.onMouseEnter = this.handlePathChange
      if (multiple) events.onClick = this.handleSelect
    }
    const caret = <span className={cascaderClass('caret')}>{<Caret />}</span>

    if (isRTL() && checkBoxStyle.marginRight !== 0) {
      checkBoxStyle.marginRight = 0
    }

    return (
      <div className={className} style={style} {...events}>
        {multiple && (
          <Checkbox
            checked={datum.getChecked(id)}
            disabled={disabled}
            onChange={this.handleChange}
            style={checkBoxStyle}
          />
        )}

        {this.renderContent()}
        {loading && children === undefined && <Spin className={cascaderClass('loading')} size={10} name="ring" />}
        {(hasChildren || mayChildren) && caret}
      </div>
    )
  }
}

Node.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  expandTrigger: PropTypes.string,
  id: PropTypes.string,
  loader: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onPathChange: PropTypes.func,
  path: PropTypes.array,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  childrenKey: PropTypes.string,
}

export default Node
