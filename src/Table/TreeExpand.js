import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getKey } from '../utils/uid'
import { getProps } from '../utils/proptypes'

const TREE_TABLE_DEFAULT_INDENT = 25
export default WrappedComponent => {
  class TreeExpand extends React.Component {
    constructor(props) {
      super(props)
      this.handleTreeExpand = this.handleTreeExpand.bind(this)

      this.state = {
        data: props.data,
      }
      this.expandKeys = new Map()
      this.expandLevel = new Map()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) {
        this.reExpand()
      }
    }

    getTreeIndent() {
      const { columns } = this.props
      for (let i = 0; i < columns.length; i++) {
        if (typeof columns[i].treeIndent === 'number') return columns[i].treeIndent
      }
      return TREE_TABLE_DEFAULT_INDENT
    }

    getChildrenLength(children) {
      const { treeColumnsName, keygen } = this.props
      if (!children) return 0
      let { length = 0 } = children
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        const key = getKey(child, keygen)
        if (!this.expandKeys.get(key)) continue
        this.expandKeys.delete(key)
        if (child[treeColumnsName] && child[treeColumnsName].length) {
          length += this.getChildrenLength(child[treeColumnsName])
        }
      }
      return length
    }

    reExpand() {
      const { data, keygen, treeColumnsName } = this.props
      this.expandLevel.clear()
      if (this.expandKeys.size === 0) {
        this.setState({ data: this.props.data })
        return
      }

      this.storeExpandKeys = new Map()
      this.expandKeys.forEach((value, key) => this.storeExpandKeys.set(key, value))
      this.expandKeys.clear()
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const key = getKey(item, keygen, i)
        if (this.storeExpandKeys.get(key) && item[treeColumnsName]) {
          this.handleTreeExpand(item, i, data)
        }
      }
      this.storeExpandKeys.clear()
      this.setState({ data })
    }

    handleTreeExpand(data, index, list) {
      const { treeColumnsName, keygen } = this.props
      const children = data[treeColumnsName]
      const key = getKey(data, keygen, index)
      const parentLevel = this.expandLevel.get(key) || 0

      if (this.expandKeys.get(key)) {
        const delLength = this.getChildrenLength(children)
        this.expandKeys.delete(key)
        this.setState(
          immer(state => {
            state.data.splice(index + 1, delLength)
          })
        )
        return
      }

      children.forEach((child, i) => {
        this.expandLevel.set(getKey(child, keygen, index + i + 1), parentLevel + 1)
      })

      this.expandKeys.set(key, true)
      if (!list) {
        this.setState(
          immer(state => {
            state.data.splice(index + 1, 0, ...children)
          })
        )
      } else list.splice(index + 1, 0, ...children)
    }

    render() {
      const { data, ...other } = this.props
      const rootTree =
        this.state.data.filter(v => v && v[other.treeColumnsName] && v[other.treeColumnsName].length).length === 0
      const treeIndent = this.getTreeIndent()
      return (
        <WrappedComponent
          data={this.state.data}
          onTreeExpand={this.handleTreeExpand}
          treeExpandKeys={this.expandKeys}
          treeExpandLevel={this.expandLevel}
          treeRoot={rootTree}
          treeIndent={treeIndent}
          {...other}
        />
      )
    }
  }

  TreeExpand.propTypes = {
    ...getProps(PropTypes, 'keygen'),
    data: PropTypes.arrayOf(PropTypes.object),
    treeColumnsName: PropTypes.string,
  }

  return TreeExpand
}
