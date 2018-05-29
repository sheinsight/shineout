import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { treeClass } from '../styles'
import { consumer } from './context'
import Content from './Content'

const Node = consumer(class extends PureComponent {
  static propTypes = {
    ...getProps(),
    listComponent: PropTypes.func,
    data: PropTypes.object,
    expanded: PropTypes.bool,
    keygen: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    line: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
    renderNode: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    const { id, onToggle } = this.props
    onToggle(id)
  }

  render() {
    const {
      data, renderNode, expanded, listComponent, ...other
    } = this.props
    const hasChildren = data.children && data.children.length > 0

    const listProps = {
      ...other,
      data: data.children,
      expanded,
      renderNode,
    }

    return (
      <div className={treeClass('node')}>
        <Content
          data={data}
          onClick={this.handleToggle}
          expanded={expanded}
          renderNode={renderNode}
        />
        { hasChildren && createElement(listComponent, listProps) }
      </div>
    )
  }
})

export default Node
