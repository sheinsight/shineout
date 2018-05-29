import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { treeClass } from '../styles'
import { consumer } from './context'
import Content from './Content'

const Node = consumer(class extends PureComponent {
  static propTypes = {
    ...getProps(),
    data: PropTypes.object,
    expanded: PropTypes.bool,
    keygen: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    line: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
    renderNode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    line: 'dashed',
  }

  constructor(props) {
    super(props)

    this.state = { points: [] }
    this.handleToggle = this.handleToggle.bind(this)
    this.setPath = this.setPath.bind(this)
    this.bindLines = this.bindElement.bind(this, 'lines')
    this.bindChildren = this.bindElement.bind(this, 'children')
  }

  componentDidUpdate(prevProps) {
    if (this.props.expanded !== prevProps.expanded) {
      this.setPath()
    }
  }

  setPath() {
    const { data } = this.props
    if (!data.children || data.children.length === 0) return
    if (!this.children) return

    const lines = Array.from(this.lines.querySelectorAll('path'))

    let index = 0
    let maxHeight = 0
    Array.from(this.children.children).forEach((el) => {
      if (el.className.indexOf(treeClass('node')) >= 0) {
        index += 1
        const top = el.offsetTop + 9
        lines[index].setAttribute('d', `M7 ${top} L14 ${top}`)
        maxHeight = top
      }
    })

    lines[0].setAttribute('d', `M6 20 L6 ${maxHeight}`)

    if (this.props.setPath) this.props.setPath()
  }

  bindElement(name, el) {
    this[name] = el
  }

  handleToggle() {
    const { id, onToggle } = this.props
    onToggle(id)
  }

  renderChildren() {
    const {
      data, expanded, keygen, renderNode, onToggle, line,
    } = this.props
    const { children } = data
    const lineProps = {
      strokeDasharray: line === 'dashed' ? '1' : undefined,
      stroke: '#aaa',
      strokeWidth: 1,
    }

    if (!expanded && !this.hasExpanded) return undefined

    this.hasExpanded = true

    return (
      <div
        className={treeClass('children')}
        ref={this.bindChildren}
        style={{ display: expanded ? 'block' : 'none' }}
      >
        {
          children.map((child, i) => (
            <Node
              data={child}
              id={getKey(child, keygen, i)}
              line={line}
              key={getKey(child, keygen, i)}
              keygen={keygen}
              renderNode={renderNode}
              onToggle={onToggle}
              setPath={this.setPath}
            />
          ))
        }
        {
          line &&
          <div className={treeClass('line')}>
            <svg ref={this.bindLines}>
              <path {...lineProps} />
              {children.map((c, i) => <path {...lineProps} key={i} />)}
            </svg>
          </div>
        }
      </div>
    )
  }

  render() {
    const { data, renderNode, expanded } = this.props
    const hasChildren = data.children && data.children.length > 0

    return (
      <div className={treeClass('node')}>
        <Content
          data={data}
          onClick={this.handleToggle}
          expanded={expanded}
          renderNode={renderNode}
        />
        {hasChildren && this.renderChildren()}
      </div>
    )
  }
})

export default consumer(Node)
