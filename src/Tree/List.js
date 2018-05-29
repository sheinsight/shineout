import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getKey } from '../utils/uid'
import { treeClass } from '../styles'
import Node from './Node'

class List extends PureComponent {
  constructor(props) {
    super(props)

    this.setPath = this.setPath.bind(this)
    this.bindLines = this.bindElement.bind(this, 'lines')
    this.bindElement = this.bindElement.bind(this, 'element')
  }

  componentDidMount() {
    if (this.props.isRoot) this.setPath()
  }

  componentDidUpdate(prevProps) {
    if (this.props.expanded !== prevProps.expanded) {
      this.setPath()
    }
  }

  setPath() {
    if (!this.element) return

    const lines = Array.from(this.lines.querySelectorAll('path'))

    let index = 0
    let maxHeight = 0
    Array.from(this.element.children).forEach((el) => {
      if (el.className.indexOf(treeClass('node')) >= 0) {
        index += 1
        const top = el.offsetTop + 10
        lines[index].setAttribute('d', `M7 ${top} L16 ${top}`)
        maxHeight = top
      }
    })

    lines[0].setAttribute('d', `M6 20 L6 ${maxHeight}`)

    if (this.props.setPath) this.props.setPath()
  }

  bindElement(name, el) {
    this[name] = el
  }

  render() {
    const {
      data, expanded, keygen, line, className, ...other
    } = this.props
    const lineProps = {
      strokeDasharray: line === 'dashed' ? '1' : undefined,
      stroke: '#aaa',
      strokeWidth: 1,
    }

    if (!expanded && !this.hasExpanded) return null

    this.hasExpanded = true

    return (
      <div
        className={className}
        ref={this.bindElement}
        style={{ display: expanded ? 'block' : 'none' }}
      >
        {
          data.map((child, i) => (
            <Node
              {...other}
              data={child}
              id={getKey(child, keygen, i)}
              key={getKey(child, keygen, i)}
              line={line}
              keygen={keygen}
              setPath={this.setPath}
              listComponent={List}
            />
          ))
        }
        {
          line &&
          <div className={treeClass('line')}>
            <svg ref={this.bindLines}>
              <path {...lineProps} />
              {data.map((c, i) => <path {...lineProps} key={i} />)}
            </svg>
          </div>
        }
      </div>
    )
  }
}

List.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  expanded: PropTypes.bool,
  isRoot: PropTypes.bool,
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  line: PropTypes.string,
  renderNode: PropTypes.func.isRequired,
  setPath: PropTypes.func,
}

List.defaultProps = {
  line: 'dashed',
  className: treeClass('children'),
}

export default List
