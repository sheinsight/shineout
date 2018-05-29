import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './context'

export default function (Origin) {
  class Toggle extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        expanded: [...props.defaultExpanded],
      }

      this.handleToggle = this.handleToggle.bind(this)
    }

    getExpanded() {
      const { expanded } = this.props
      return expanded === undefined ? this.state.expanded : expanded
    }

    handleToggle(id) {
      const { onToggle } = this.props
      const expanded = this.getExpanded()
      let newExpanded
      if (expanded.indexOf(id) >= 0) {
        newExpanded = expanded.filter(e => e !== id)
      } else {
        newExpanded = [...expanded, id]
      }
      if (onToggle) onToggle(newExpanded)
      else this.setState({ expanded: newExpanded })
    }

    render() {
      return (
        <Provider value={this.getExpanded()}>
          <Origin {...this.props} onToggle={this.handleToggle} />
        </Provider>
      )
    }
  }

  Toggle.propTypes = {
    defaultExpanded: PropTypes.array,
    expanded: PropTypes.array,
    onToggle: PropTypes.func,
  }

  Toggle.defaultProps = {
    defaultExpanded: [],
  }

  return Toggle
}
