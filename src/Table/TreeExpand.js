import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getKey } from '../utils/uid'
import { getProps } from '../utils/proptypes'

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

    handleTreeExpand(data, index) {
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
      } else {
        children.forEach((child, i) => {
          this.expandLevel.set(getKey(child, keygen, index + i + 1), parentLevel + 1)
        })

        this.expandKeys.set(key, true)
        this.setState(
          immer(state => {
            state.data.splice(index + 1, 0, ...children)
          })
        )
      }
    }

    render() {
      const { data, ...other } = this.props
      const rootTree = this.state.data.filter(v => v && v[other.treeColumnsName] && v[other.treeColumnsName].length).length === 0
      return (
        <WrappedComponent
          data={this.state.data}
          onTreeExpand={this.handleTreeExpand}
          treeExpandKeys={this.expandKeys}
          treeExpandLevel={this.expandLevel}
          treeRoot={rootTree}
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
