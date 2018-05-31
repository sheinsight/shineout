import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Root from './Root'

class Tree extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { active: null }

    this.nodes = new Map()

    this.handleToggle = this.handleToggle.bind(this)
    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.bindNode = this.bindNode.bind(this)
    this.unbindNode = this.unbindNode.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.handleExpanded(this.props.expanded)
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

    const expanded = this.props.expanded || this.props.defaultExpanded
    if (!expanded) return false

    return expanded.indexOf(id) >= 0
  }

  unbindNode(id) {
    this.nodes.delete(id)
  }

  handleExpanded(expanded) {
    const temp = new Set(expanded)
    for (const [id, update] of this.nodes) {
      update(temp.has(id))
    }
  }

  handleNodeClick(node, id) {
    const { onClick } = this.props
    if (onClick) onClick(node)
    else this.setState({ active: id })
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
      expanded, onExpand, defaultExpanded, ...props
    } = this.props
    const onToggle = onExpand ? this.handleToggle : undefined

    console.log(this.getActive())

    return (
      <Root
        {...props}
        active={this.getActive()}
        bindNode={this.bindNode}
        unbindNode={this.unbindNode}
        onToggle={onToggle}
        onNodeClick={this.handleNodeClick}
      />
    )
  }
}

Tree.propTypes = {
  active: PropTypes.string,
  defaultExpanded: PropTypes.array,
  expanded: PropTypes.array,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
}

Tree.defaultProps = {
  defaultExpanded: [],
}

export default Tree
