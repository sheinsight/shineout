import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import DatumTree from '../Datum/Tree'
import Root from './Root'

class Tree extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { active: null }

    this.nodes = new Map()
    this.datum = new DatumTree({
      data: props.data,
      keygen: props.keygen,
      mode: props.mode,
      onChange: props.onChange,
      value: props.value || props.defaultValue,
    })

    this.handleToggle = this.handleToggle.bind(this)
    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.bindNode = this.bindNode.bind(this)
    this.unbindNode = this.unbindNode.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.handleExpanded(this.props.expanded)
    }
    if (prevProps.active !== this.props.active) {
      this.handleActive(this.props.active)
    }

    if (this.props.onChange) {
      this.datum.mode = this.props.mode
      if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value)
      if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
    }
  }

  getActive() {
    const { active } = this.props
    return active === undefined ? this.state.active : active
  }

  bindNode(id, update) {
    if (this.nodes.has(id)) {
      console.error(`Node with '${id}' key has already been added. Tree node's key must be unique.`)
      return {}
    }
    this.nodes.set(id, update)

    const active = this.props.active === id
    const expanded = this.props.expanded || this.props.defaultExpanded

    return { active, expanded: expanded && expanded.indexOf(id) >= 0 }
  }

  unbindNode(id) {
    this.nodes.delete(id)
  }

  handleExpanded(expanded) {
    const temp = new Set(expanded)
    for (const [id, update] of this.nodes) {
      update('expanded', temp.has(id))
    }
  }

  handleActive(active) {
    for (const [id, update] of this.nodes) {
      update('active', id === active)
    }
  }

  handleNodeClick(node, id) {
    const { active, onClick } = this.props
    if (active === undefined) {
      this.setState({ active: id }, () => {
        this.handleActive(id)
      })
    }
    if (onClick) {
      onClick(node, id)
    }
  }

  handleToggle(id) {
    const { expanded, onExpand } = this.props
    let newExpanded
    if (expanded.indexOf(id) >= 0) {
      newExpanded = expanded.filter(e => e !== id)
    } else {
      newExpanded = [...expanded, id]
    }
    if (onExpand) onExpand(newExpanded)
  }

  render() {
    const {
      data, line, keygen, onExpand, onChange, renderItem, mode,
    } = this.props
    const onToggle = onExpand ? this.handleToggle : undefined

    return (
      <Root
        data={data}
        datum={this.datum}
        bindNode={this.bindNode}
        keygen={keygen}
        line={line}
        mode={mode}
        unbindNode={this.unbindNode}
        onChange={onChange}
        onToggle={onToggle}
        onNodeClick={this.handleNodeClick}
        renderItem={renderItem}
      />
    )
  }
}

Tree.propTypes = {
  ...getProps(),
  active: PropTypes.string,
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  expanded: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.oneOf([0, 1, 2, 3]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
}

Tree.defaultProps = {
  defaultExpanded: [],
  defaultValue: [],
  mode: 0,
}

export default Tree
