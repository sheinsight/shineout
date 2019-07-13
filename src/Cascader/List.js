import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cascaderClass } from '../styles'
import Node from './Node'
import { getLocale } from '../locale'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.getText = this.getText.bind(this)
  }

  getKey(data, index) {
    const { keygen, parentId } = this.props
    if (typeof keygen === 'function') return keygen(data, parentId)
    if (keygen) return data[keygen]
    return parentId + (parentId ? ',' : '') + index
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  render() {
    const { data, ...other } = this.props
    if (!data || data.length === 0) return <span className={cascaderClass('no-data')}>{this.getText('noData')}</span>
    return (
      <div className={cascaderClass('list')}>
        {data.map((d, i) => {
          const id = this.getKey(d, i)
          return <Node {...other} key={id} active={other.id === id} id={id} data={d} />
        })}
      </div>
    )
  }
}

List.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  keygen: PropTypes.any,
  onNodeClick: PropTypes.func,
  parentId: PropTypes.string,
  text: PropTypes.object,
}

List.defaultProps = {
  id: '',
  parentId: '',
  text: {},
}

export default List
