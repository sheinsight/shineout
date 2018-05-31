import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { treeClass } from '../styles'
import Node from './Node'

class List extends PureComponent {
  constructor(props) {
    super(props)

    this.setLine = this.setLine.bind(this)
    this.bindLines = this.bindElement.bind(this, 'lines')
    this.bindElement = this.bindElement.bind(this, 'element')
    this.renderNode = this.renderNode.bind(this)
  }

  componentDidMount() {
    if (this.props.expanded) this.setLine()
  }

  setLine() {
    if (!this.props.line || !this.lines || this.lineLocked) return
    this.lineLocked = true

    setTimeout(() => {
      this.lineLocked = false
    }, 500)

    const lines = Array.from(this.lines.querySelectorAll('path'))

    let index = 0
    let maxHeight = 0
    let first = 0
    Array.from(this.element.children).forEach((el) => {
      if (el.className.indexOf(treeClass('node')) >= 0) {
        if (index === 0) first = el.offsetTop - 4
        index += 1
        const top = el.offsetTop + 10
        lines[index].setAttribute('d', `M7 ${top} L16 ${top}`)
        maxHeight = top
      }
    })

    // root first===0
    if (first < 10) first = 10
    lines[0].setAttribute('d', `M6 ${first} L6 ${maxHeight}`)

    if (this.props.setLine) this.props.setLine()
  }

  getKey(data, index) {
    const { id, keygen } = this.props
    if (typeof keygen === 'function') return keygen(data, id)
    else if (keygen) return data[keygen]
    return id + (id ? ',' : '') + index
  }

  bindElement(name, el) {
    this[name] = el
  }

  renderNode(child, index) {
    const {
      data, isRoot, expanded, keygen, line, className, ...other
    } = this.props
    const id = this.getKey(child, index)
    return (
      <Node
        {...other}
        data={child}
        id={id}
        key={id}
        line={line}
        keygen={keygen}
        setLine={this.setLine}
        listComponent={List}
      />
    )
  }

  render() {
    const {
      data, expanded, line, className,
    } = this.props
    const lineProps = {
      strokeDasharray: line ? '1' : undefined,
      stroke: '#999',
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
        { data.map(this.renderNode) }
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
  id: PropTypes.string,
  isRoot: PropTypes.bool,
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  line: PropTypes.bool,
  setLine: PropTypes.func,
}

List.defaultProps = {
  id: '',
  line: true,
  className: treeClass('children'),
}

export default List
