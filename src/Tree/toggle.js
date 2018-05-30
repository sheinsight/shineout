import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default function (Origin) {
  class Toggle extends PureComponent {
    constructor(props) {
      super(props)

      this.nodes = new Map()
      this.handleToggle = this.handleToggle.bind(this)
      this.bindNode = this.bindNode.bind(this)
      this.unbindNode = this.unbindNode.bind(this)
    }

    componentDidUpdate(prevProps) {
      if (prevProps.expanded !== this.props.expanded) {
        this.handleExpanded(this.props.expanded)
      }
    }

    bindNode(id, update) {
      if (this.nodes.has(id)) {
        console.error(`Node with '${id}' key has already been added. Tree node's key must be unique.`)
        return false
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
      const { expanded, onExpand, ...props } = this.props
      const onToggle = onExpand ? this.handleToggle : undefined

      return (
        <Origin
          {...props}
          bindNode={this.bindNode}
          unbindNode={this.unbindNode}
          onToggle={onToggle}
        />
      )
    }
  }

  Toggle.propTypes = {
    defaultExpanded: PropTypes.array,
    expanded: PropTypes.array,
    onExpand: PropTypes.func,
  }

  Toggle.defaultProps = {
    defaultExpanded: [],
  }

  return Toggle
}
