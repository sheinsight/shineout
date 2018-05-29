import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { treeClass } from '../styles'
import Node from './Node'

class Root extends PureComponent {
  constructor(props) {
    super(props)

    this.renderNode = this.renderNode.bind(this)
  }

  renderNode() {
    const { renderItem } = this.props
    if (typeof renderItem === 'function') {
      return renderItem
    }
    return d => d[renderItem]
  }

  render() {
    const {
      data, keygen, onToggle, line,
    } = this.props

    const className = classnames(
      treeClass('_'),
      this.props.className,
    )

    return (
      <div className={className}>
        {
          data.map((d, i) => (
            <Node
              data={d}
              keygen={keygen}
              line={line}
              onToggle={onToggle}
              key={getKey(d, keygen, i)}
              id={getKey(d, keygen, i)}
              renderNode={this.renderNode()}
            />
          ))
        }
      </div>
    )
  }
}

Root.propTypes = {
  ...getProps(),
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  data: PropTypes.array,
  line: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
}

Root.defaultProps = {
  data: [],
}

export default Root
