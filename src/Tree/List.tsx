import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { treeClass } from './styles'
import { empty } from '../utils/func'
import Node from './Node'
import { ListProps } from './Props'
import { keyType } from '../@types/common'

class List<DataItem, Value extends any[]> extends PureComponent<ListProps<DataItem, Value>> {
  static defaultProps = {
    id: '',
    line: true,
    className: treeClass('children'),
  }

  bindLines: (el: HTMLDivElement) => void

  bindList: (el: HTMLDivElement) => void

  lines: HTMLDivElement

  element: HTMLDivElement

  hasExpanded: boolean

  constructor(props: ListProps<DataItem, Value>) {
    super(props)

    this.bindLines = this.bindElement.bind(this, 'lines')
    this.bindList = this.bindElement.bind(this, 'element')
    this.renderNode = this.renderNode.bind(this)
  }

  getKey(data: DataItem, index: number) {
    const { id = '', keygen } = this.props
    if (typeof keygen === 'function') return keygen(data, id)
    if (keygen) return data[keygen]
    return id + (id ? ',' : '') + index
  }

  bindElement(name: 'lines' | 'element', el: HTMLDivElement) {
    this[name] = el
  }

  renderNode(child: DataItem, index: number) {
    const { data, isRoot, expanded, keygen, line, className, style, ...other } = this.props
    const id = this.getKey(child, index) as keyType
    return (
      <Node<DataItem, Value>
        {...other}
        data={child}
        id={id}
        index={index}
        key={id}
        line={line}
        keygen={keygen}
        listComponent={List}
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
        ref={this.bindList}
        onDrop={empty}
        onDragOver={empty}
        style={newStyle}
      >
        {data.map(this.renderNode)}
      </div>
    )
  }
}

export default List
