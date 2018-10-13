import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cascaderClass } from '../styles'
import Node from './Node'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  getKey(data, index) {
    const { keygen, parentId } = this.props
    if (typeof keygen === 'function') return keygen(data, parentId)
    else if (keygen) return data[keygen]
    return parentId + (parentId ? ',' : '') + index
  }

  render() {
    const { data, ...other } = this.props
    return (
      <div className={cascaderClass('list')}>
        {
          data.map((d, i) => {
            const id = this.getKey(d, i)
            return (
              <Node
                {...other}
                key={id}
                active={other.id === id}
                id={id}
                data={d}
              />
            )
          })
        }
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
}

List.defaultProps = {
  id: '',
  parentId: '',
}

export default List
