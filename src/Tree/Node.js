import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { treeClass } from '../styles'
import Content from './Content'

class Node extends PureComponent {
  static propTypes = {
    ...getProps(),
    bindNode: PropTypes.func.isRequired,
    unbindNode: PropTypes.func.isRequired,
    listComponent: PropTypes.func,
    data: PropTypes.object,
    keygen: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  }

  constructor(props) {
    super(props)

    const expanded = props.bindNode(props.id, this.update.bind(this))

    this.state = { expanded }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillUnmount() {
    this.props.unbindNode(this.props.id)
  }

  update(expanded) {
    if (this.state.expanded !== expanded) this.setState({ expanded })
  }

  handleToggle() {
    const { id, onToggle } = this.props
    const expanded = !this.state.expanded
    this.setState({ expanded })
    if (onToggle) onToggle(id, expanded)
  }

  render() {
    const {
      id, data, renderItem, expandedMap, listComponent, ...other
    } = this.props

    const hasChildren = data.children && data.children.length > 0
    const { expanded } = this.state

    const listProps = {
      ...other,
      data: data.children,
      expanded,
      renderItem,
      expandedMap,
    }

    return (
      <div className={treeClass('node')}>
        <Content
          data={data}
          onClick={this.handleToggle}
          expanded={expanded}
          renderItem={renderItem}
        />
        { hasChildren && createElement(listComponent, listProps) }
      </div>
    )
  }
}

export default Node
