import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox'
import { cascaderClass } from '../styles'

const checkBoxStyle = { marginRight: 8, marginTop: -1, verticalAlign: 'top' }

class Node extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  checkDisabled() {
    const { datum, id, disabled } = this.props
    if (disabled) return true

    return datum.isDisabled(id)
  }

  handleClick() {
    const {
      id, data, path, onNodeClick,
    } = this.props
    onNodeClick(id, data, path)
  }

  handleChange(_, checked) {
    const { datum, id, onChange } = this.props
    datum.set(id, checked ? 1 : 0)
    onChange(datum.getValue())
  }

  renderContent() {
    const {
      id, active, data, renderItem,
    } = this.props
    const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]
    return render(data, active, id)
  }

  render() {
    const {
      active, data, multiple, datum, id,
    } = this.props
    const disabled = this.checkDisabled()
    const className = cascaderClass(
      'node',
      active && 'active',
      disabled && 'disabled',
      data.children && data.children.length > 0 && 'has-children',
    )

    return (
      <div className={className} onClick={disabled ? undefined : this.handleClick}>
        {
          multiple &&
          <Checkbox
            checked={datum.getChecked(id)}
            disabled={disabled}
            onChange={this.handleChange}
            style={checkBoxStyle}
          /> }

        { this.renderContent() }
      </div>
    )
  }
}

Node.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onNodeClick: PropTypes.func,
  path: PropTypes.array,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
}

export default Node
