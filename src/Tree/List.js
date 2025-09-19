import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { treeClass } from './styles'
import { empty } from '../utils/func'
import Node from './Node'

class List extends PureComponent {
  constructor(props) {
    super(props)

    this.bindLines = this.bindElement.bind(this, 'lines')
    this.bindElement = this.bindElement.bind(this, 'element')
    this.renderNode = this.renderNode.bind(this)
    this.checkIsNoChildren = this.checkIsNoChildren.bind(this)
  }

  getKey(data, index) {
    const { id, keygen } = this.props
    if (typeof keygen === 'function') return keygen(data, id)
    if (keygen) return data[keygen]
    return id + (id ? ',' : '') + index
  }

  // 检查节点是否全都没有 children
  checkIsNoChildren() {
    const { data, childrenKey = 'children' } = this.props
    return data.every(d => !d[childrenKey] || d[childrenKey].length === 0)
  }

  bindElement(name, el) {
    this[name] = el
  }

  renderNode(child, index) {
    const { data, isRoot, expanded, keygen, line, className, style, ...other } = this.props
    const id = this.getKey(child, index)
    const isNoChildren = isRoot && this.checkIsNoChildren()

    return (
      <Node
        {...other}
        data={child}
        id={id}
        index={index}
        key={id}
        line={line}
        keygen={keygen}
        listComponent={List}
        isNoChildren={isNoChildren}
      />
    )
  }

  render() {
    const { data, expanded, className, style, childrenClassName } = this.props

    if (!expanded && !this.hasExpanded) return null
    this.hasExpanded = true

    const newStyle = Object.assign({}, style, { display: expanded ? 'block' : 'none' })

    return (
      <div
        className={classnames(className, childrenClassName)}
        ref={this.bindElement}
        onDrop={empty}
        onDragOver={empty}
        style={newStyle}
      >
        {data.map(this.renderNode)}
      </div>
    )
  }
}

List.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  expanded: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRoot: PropTypes.bool,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  line: PropTypes.bool,
  setLine: PropTypes.func,
  style: PropTypes.object,
  childrenClassName: PropTypes.string,
  childrenKey: PropTypes.string,
}

List.defaultProps = {
  id: '',
  line: true,
  className: treeClass('children'),
}

export default List
