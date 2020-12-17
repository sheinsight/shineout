import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getKey } from '../utils/uid'
import { getProps } from '../utils/proptypes'
import { keysToArray } from '../utils/transform'

const TREE_TABLE_DEFAULT_INDENT = 15
export default WrappedComponent => {
  class TreeExpand extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        expandKeys: this.getMapFromArray(props.defaultTreeExpandKeys),
      }

      this.handleTreeExpand = this.handleTreeExpand.bind(this)
    }

    componentDidUpdate() {
      this.changedByExpand = false
    }

    getTreeIndent() {
      const { columns } = this.props
      for (let i = 0; i < columns.length; i++) {
        if (typeof columns[i].treeIndent === 'number') return columns[i].treeIndent
      }
      return TREE_TABLE_DEFAULT_INDENT
    }

    getExpandKeys() {
      const { treeExpandKeys } = this.props
      if (!treeExpandKeys) return this.state.expandKeys
      return this.getMapFromArray(treeExpandKeys)
    }

    getMapFromArray(arr) {
      return arr.reduce((map, key) => {
        map.set(key, true)
        return map
      }, new Map())
    }

    getChildrenLength(children) {
      const { treeColumnsName, keygen } = this.props
      const { expandKeys } = this.state
      if (!children) return 0
      let { length = 0 } = children
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        const key = getKey(child, keygen)
        if (!expandKeys.get(key)) continue
        expandKeys.delete(key)
        if (child[treeColumnsName] && child[treeColumnsName].length) {
          length += this.getChildrenLength(child[treeColumnsName])
        }
      }
      return length
    }

    getExpandData() {
      const { data, keygen, treeColumnsName } = this.props
      const expandKeys = this.getExpandKeys()
      this.expandLevel = new Map()
      if (expandKeys.size === 0) return data

      const storeExpandKeys = new Map()
      expandKeys.forEach((value, key) => storeExpandKeys.set(key, value))

      return immer(data, draft => {
        let dataCo = draft
        for (let i = 0; i < dataCo.length; i++) {
          if (storeExpandKeys.size === 0) break
          const item = dataCo[i]
          const key = getKey(item, keygen, i)
          const parentLevel = this.expandLevel.get(key) || 0
          if (storeExpandKeys.get(key) && item[treeColumnsName]) {
            item[treeColumnsName].forEach(child => {
              this.expandLevel.set(getKey(child, keygen), parentLevel + 1)
            })
            draft.splice(i + 1, 0, ...item[treeColumnsName])
            dataCo = draft
            storeExpandKeys.delete(key)
          }
        }
      })
    }

    handleTreeExpand(data, index) {
      const { keygen, treeExpandKeys, onTreeExpand } = this.props
      const expandKeys = this.getExpandKeys()
      const key = getKey(data, keygen, index)
      const changedKeys = immer(expandKeys, draft => {
        // eslint-disable-next-line no-unused-expressions
        expandKeys.get(key) ? draft.delete(key) : draft.set(key, true)
      })
      if (treeExpandKeys && onTreeExpand) {
        onTreeExpand(keysToArray(changedKeys), data, !!expandKeys.get(key), index)
        return
      }
      this.changedByExpand = true
      this.setState({
        expandKeys: changedKeys,
      })
    }

    render() {
      const { treeColumnsName } = this.props
      const expandKeys = this.getExpandKeys()
      const data = this.getExpandData()
      const rootTree = data.filter(v => v && v[treeColumnsName] && v[treeColumnsName].length).length === 0
      const treeIndent = this.getTreeIndent()
      return (
        <WrappedComponent
          {...this.props}
          changedByExpand={this.changedByExpand}
          data={data}
          onTreeExpand={this.handleTreeExpand}
          treeExpandKeys={expandKeys}
          treeExpandLevel={this.expandLevel}
          treeRoot={rootTree}
          treeIndent={treeIndent}
        />
      )
    }
  }

  TreeExpand.propTypes = {
    ...getProps(PropTypes, 'keygen'),
    data: PropTypes.arrayOf(PropTypes.object),
    treeColumnsName: PropTypes.string,
    defaultTreeExpandKeys: PropTypes.array,
    treeExpandKeys: PropTypes.array,
    onTreeExpand: PropTypes.func,
  }

  TreeExpand.defaultProps = {
    defaultTreeExpandKeys: [],
  }

  return TreeExpand
}
