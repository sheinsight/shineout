import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { treeClass } from '../styles'
import Content from './Content'

class Node extends PureComponent {
  constructor(props) {
    super(props)

    const { active, expanded } = props.bindNode(props.id, this.update.bind(this))
    this.state = { active, expanded }

    this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillUnmount() {
    this.props.unbindNode(this.props.id)
  }

  update(key, value) {
    if (this.state[key] !== value) this.setState({ [key]: value })
  }

  handleToggle() {
    const { id, onToggle } = this.props
    const expanded = !this.state.expanded
    this.setState({ expanded })
    if (onToggle) onToggle(id, expanded)
  }

  render() {
    const {
      data, expandedMap, listComponent, ...other
    } = this.props

    const hasChildren = data.children && data.children.length > 0
    const { expanded } = this.state

    const listProps = {
      ...other,
      data: data.children,
      expanded,
      expandedMap,
    }

    return (
      <div className={treeClass('node')}>
        <Content
          {...other}
          active={this.state.active}
          data={data}
          onClick={this.handleToggle}
          expanded={expanded}
        />
        { hasChildren && createElement(listComponent, listProps) }
      </div>
    )
  }
}

Node.propTypes = {
  ...getProps(),
  bindNode: PropTypes.func.isRequired,
  unbindNode: PropTypes.func.isRequired,
  data: PropTypes.object,
  listComponent: PropTypes.func,
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
}

export default Node
