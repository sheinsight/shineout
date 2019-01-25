import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { markdownClass } from 'doc/styles'

class Console extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { expanded: false }
  }

  toggle = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { children } = this.props
    const { expanded } = this.state

    const text = children.map(t =>
      t
        .replace(/"fn#fn/g, '')
        .replace(/fn#fn"/g, '')
        .replace(/\\n/g, '\n')
    )
    const Tag = expanded ? 'pre' : 'div'
    return (
      <div onClick={this.toggle} className={markdownClass('console')}>
        <Tag>{text}</Tag>
      </div>
    )
  }
}

Console.propTypes = {
  children: PropTypes.array,
}

Console.defaultProps = {
  children: [],
}

export default Console
